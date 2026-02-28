# ml/feature_engineering.py
# Production feature engineering pipeline for fraud detection
# Computes transaction, behavioral, and graph features

import pandas as pd
import numpy as np
from typing import Optional, Dict, List
import json
import os

# Country risk scores (ISO 3166-1 alpha-2 → risk score 0-1)
# Based on FATF gray/black list + Transparency International CPI
HIGH_RISK_COUNTRIES = {
    "AF": 0.95, "IR": 0.95, "KP": 0.98, "MM": 0.90, "SY": 0.95,
    "YE": 0.90, "SO": 0.92, "SD": 0.88, "LY": 0.85, "IQ": 0.82,
    "VE": 0.80, "ZW": 0.78, "NI": 0.70, "PK": 0.72, "NG": 0.75,
    "KH": 0.68, "HT": 0.80, "LA": 0.65, "UG": 0.62, "BD": 0.60,
}

MEDIUM_RISK_COUNTRIES = {
    "RU": 0.55, "CN": 0.45, "TR": 0.50, "PH": 0.48, "TH": 0.42,
    "MX": 0.52, "CO": 0.50, "BR": 0.40, "IN": 0.38, "EG": 0.45,
    "AE": 0.35, "SA": 0.38, "KE": 0.42, "GH": 0.40, "TZ": 0.42,
    "PA": 0.55, "BS": 0.50, "VG": 0.52, "KY": 0.48, "BZ": 0.45,
}


def get_country_risk_score(country_code: Optional[str]) -> float:
    """Get risk score for a country (0 = safe, 1 = very risky)."""
    if not country_code:
        return 0.3  # unknown = moderate risk
    code = str(country_code).upper().strip()
    if code in HIGH_RISK_COUNTRIES:
        return HIGH_RISK_COUNTRIES[code]
    if code in MEDIUM_RISK_COUNTRIES:
        return MEDIUM_RISK_COUNTRIES[code]
    return 0.1  # low-risk default (US, UK, EU, etc.)


def compute_velocity_features(df: pd.DataFrame) -> pd.DataFrame:
    """Compute transaction velocity features per sender account."""
    result = df.copy()

    if "timestamp" in df.columns:
        result["timestamp"] = pd.to_datetime(result["timestamp"], errors="coerce")
        result = result.sort_values(["sender_account", "timestamp"])

        # Velocity: transactions per hour and per 24 hours
        velocity_1h = []
        velocity_24h = []

        for _, group in result.groupby("sender_account"):
            ts = group["timestamp"]
            v1h = []
            v24h = []
            for i, t in enumerate(ts):
                if pd.isna(t):
                    v1h.append(0)
                    v24h.append(0)
                    continue
                window_1h = ts[(ts >= t - pd.Timedelta(hours=1)) & (ts <= t)]
                window_24h = ts[(ts >= t - pd.Timedelta(hours=24)) & (ts <= t)]
                v1h.append(len(window_1h))
                v24h.append(len(window_24h))
            velocity_1h.extend(v1h)
            velocity_24h.extend(v24h)

        result["velocity_1h"] = velocity_1h
        result["velocity_24h"] = velocity_24h
    else:
        result["velocity_1h"] = result.get("frequency_per_hour", 0).astype(float)
        result["velocity_24h"] = result["velocity_1h"] * 4  # estimate

    return result


def compute_behavioral_features(df: pd.DataFrame) -> pd.DataFrame:
    """Compute behavioral anomaly features."""
    result = df.copy()

    # Cross-border flag
    sender_country = result.get("sender_country", pd.Series(dtype=str)).fillna("")
    receiver_country = result.get("receiver_country", pd.Series(dtype=str)).fillna("")
    result["cross_border_flag"] = (sender_country != receiver_country).astype(int)

    # Country risk scores
    result["sender_risk"] = sender_country.apply(get_country_risk_score)
    result["receiver_risk"] = receiver_country.apply(get_country_risk_score)
    result["corridor_risk"] = (result["sender_risk"] + result["receiver_risk"]) / 2.0

    # IP country mismatch (if available)
    if "ip_country" in result.columns:
        result["ip_mismatch"] = (
            result["ip_country"].fillna("") != sender_country
        ).astype(int)
    else:
        result["ip_mismatch"] = 0

    # Device change flag (if available)
    if "device_id" in result.columns and "sender_account" in result.columns:
        device_counts = result.groupby("sender_account")["device_id"].transform("nunique")
        result["device_change_flag"] = (device_counts > 1).astype(int)
    else:
        result["device_change_flag"] = 0

    # New beneficiary flag
    if "receiver_account" in result.columns and "sender_account" in result.columns:
        # A receiver is "new" if this is the first time sender→receiver pair appears
        pair_key = result["sender_account"].astype(str) + "_" + result["receiver_account"].astype(str)
        pair_first = pair_key.duplicated(keep="first")
        result["new_beneficiary_flag"] = (~pair_first).astype(int)
    else:
        result["new_beneficiary_flag"] = 0

    return result


def compute_account_statistics(df: pd.DataFrame) -> pd.DataFrame:
    """Compute per-account statistics for amount deviation."""
    result = df.copy()
    amount = result["amount"].astype(float)

    if "sender_account" in result.columns:
        account_stats = result.groupby("sender_account")["amount"].agg(["mean", "std"]).reset_index()
        account_stats.columns = ["sender_account", "account_mean_amount", "account_std_amount"]
        result = result.merge(account_stats, on="sender_account", how="left")
    else:
        result["account_mean_amount"] = amount.mean()
        result["account_std_amount"] = amount.std()

    eps = 1e-6
    result["account_mean_amount"] = result["account_mean_amount"].fillna(amount.mean())
    result["account_std_amount"] = result["account_std_amount"].fillna(amount.std() + eps)
    result["amount_deviation"] = (amount - result["account_mean_amount"]) / (result["account_std_amount"] + eps)

    return result


def extract_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Full feature engineering pipeline.
    Input: raw DataFrame with transaction data.
    Output: DataFrame with all computed features ready for model training.
    """
    print(f"[FeatureEng] Starting feature extraction for {len(df)} rows...")

    # Step 1: Velocity features
    df = compute_velocity_features(df)

    # Step 2: Behavioral features
    df = compute_behavioral_features(df)

    # Step 3: Account statistics
    df = compute_account_statistics(df)

    # Step 4: Build final feature matrix
    feature_cols = []
    X = pd.DataFrame()

    # Transaction features
    X["log_amount"] = np.log1p(df["amount"].astype(float))
    feature_cols.append("log_amount")

    X["velocity_1h"] = df["velocity_1h"].astype(float)
    X["velocity_24h"] = df["velocity_24h"].astype(float)
    feature_cols.extend(["velocity_1h", "velocity_24h"])

    X["amount_deviation"] = df["amount_deviation"].astype(float)
    feature_cols.append("amount_deviation")

    X["cross_border_flag"] = df["cross_border_flag"].astype(float)
    feature_cols.append("cross_border_flag")

    X["sender_risk"] = df["sender_risk"].astype(float)
    X["receiver_risk"] = df["receiver_risk"].astype(float)
    X["corridor_risk"] = df["corridor_risk"].astype(float)
    feature_cols.extend(["sender_risk", "receiver_risk", "corridor_risk"])

    X["new_beneficiary_flag"] = df["new_beneficiary_flag"].astype(float)
    feature_cols.append("new_beneficiary_flag")

    # Behavioral features
    X["ip_mismatch"] = df["ip_mismatch"].astype(float)
    X["device_change_flag"] = df["device_change_flag"].astype(float)
    feature_cols.extend(["ip_mismatch", "device_change_flag"])

    # Graph features (from data if available)
    if "hop_count" in df.columns:
        X["hop_count"] = df["hop_count"].astype(float)
    else:
        X["hop_count"] = 0.0
    feature_cols.append("hop_count")

    if "shared_identifier_count" in df.columns:
        X["shared_id_cnt"] = df["shared_identifier_count"].astype(float)
    else:
        X["shared_id_cnt"] = 0.0
    feature_cols.append("shared_id_cnt")

    # Country indices (backward compatible with existing model)
    def simple_hash_country(series):
        return series.fillna("").apply(lambda x: float(abs(hash(str(x)) % 100)) / 100.0)

    X["sender_country_idx"] = simple_hash_country(df.get("sender_country", pd.Series(dtype=str)))
    X["receiver_country_idx"] = simple_hash_country(df.get("receiver_country", pd.Series(dtype=str)))
    feature_cols.extend(["sender_country_idx", "receiver_country_idx"])

    X = X.fillna(0.0)

    print(f"[FeatureEng] Extracted {len(feature_cols)} features: {feature_cols}")
    return X


# Feature names (for SHAP and explainability)
FEATURE_NAMES = [
    "log_amount", "velocity_1h", "velocity_24h", "amount_deviation",
    "cross_border_flag", "sender_risk", "receiver_risk", "corridor_risk",
    "new_beneficiary_flag", "ip_mismatch", "device_change_flag",
    "hop_count", "shared_id_cnt", "sender_country_idx", "receiver_country_idx"
]


def extract_single_transaction_features(tx: Dict) -> np.ndarray:
    """
    Extract features from a single transaction dict (for real-time inference).
    Returns feature vector compatible with trained models.
    """
    amount = float(tx.get("amount", 0))
    log_amount = np.log1p(max(0, amount))
    velocity_1h = float(tx.get("frequency_per_hour", tx.get("velocity_1h", 1)))
    velocity_24h = float(tx.get("velocity_24h", velocity_1h * 4))

    user_mean = float(tx.get("user_mean_amount", 0))
    user_std = float(tx.get("user_std_amount", 0))
    amount_deviation = (amount - user_mean) / (user_std + 1e-6) if user_std > 0 else 0.0

    sender_country = tx.get("sender_country", "")
    receiver_country = tx.get("receiver_country", "")
    cross_border = 1.0 if sender_country != receiver_country else 0.0
    sender_risk = get_country_risk_score(sender_country)
    receiver_risk = get_country_risk_score(receiver_country)
    corridor_risk = (sender_risk + receiver_risk) / 2.0

    new_beneficiary = float(tx.get("new_beneficiary_flag", 0))
    ip_mismatch = float(tx.get("ip_mismatch", 0))
    device_change = float(tx.get("device_change_flag", 0))
    hop_count = float(tx.get("hop_count", 0))
    shared_id_cnt = float(tx.get("shared_identifier_count", 0))

    sender_idx = float(abs(hash(str(sender_country)) % 100)) / 100.0
    receiver_idx = float(abs(hash(str(receiver_country)) % 100)) / 100.0

    return np.array([
        log_amount, velocity_1h, velocity_24h, amount_deviation,
        cross_border, sender_risk, receiver_risk, corridor_risk,
        new_beneficiary, ip_mismatch, device_change,
        hop_count, shared_id_cnt, sender_idx, receiver_idx
    ], dtype=float).reshape(1, -1)


if __name__ == "__main__":
    # Test with sample data
    sample = pd.DataFrame({
        "amount": [5000, 150000, 200, 75000],
        "sender_country": ["US", "IR", "GB", "NG"],
        "receiver_country": ["GB", "AE", "US", "KY"],
        "sender_account": ["A001", "A002", "A001", "A003"],
        "receiver_account": ["B001", "B002", "B003", "B004"],
        "frequency_per_hour": [1, 5, 1, 8],
        "hop_count": [0, 3, 0, 2],
        "shared_identifier_count": [0, 1, 0, 4],
    })
    X = extract_features(sample)
    print("\nFeature matrix shape:", X.shape)
    print(X)
