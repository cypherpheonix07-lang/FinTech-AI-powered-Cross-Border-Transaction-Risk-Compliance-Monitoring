import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import joblib
import os

DATA_CSV = "data/transactions.csv"
MODEL_DIR = "fraud-ml-service/models"
os.makedirs(MODEL_DIR, exist_ok=True)

# Country risk mapping logic
COUNTRY_RISK = {
    "IN": 0.3, "US": 0.2, "GB": 0.2, "AE": 0.4, "SG": 0.1, 
    "HK": 0.2, "NG": 0.8, "KE": 0.7, "BR": 0.6, "DE": 0.2, 
    "CN": 0.5, "JP": 0.1, "FR": 0.3, "ES": 0.4
}

def get_country_risk(c):
    return COUNTRY_RISK.get(c, 0.5)

def engineer_features(df):
    X = pd.DataFrame()
    X["log_amount"] = np.log1p(df["amount"].astype(float))
    # amount_usd assuming fx_rate=1
    X["amount_usd"] = df["amount"].astype(float)
    
    # deviation
    eps = 1e-6
    X["amount_deviation"] = (df["amount"] - df["user_mean_amount"]) / (df["user_std_amount"] + eps)
    
    # tx frequencies (placeholders for training if not calculated per-row)
    X["tx_frequency_1h"] = df["frequency_per_hour"].astype(float)
    X["tx_frequency_24h"] = X["tx_frequency_1h"] * 10 # heuristic for training
    
    # time since last (placeholder for training)
    X["time_since_last_tx"] = 3600 # default
    
    X["sender_country_risk"] = df["sender_country"].apply(get_country_risk)
    X["receiver_country_risk"] = df["receiver_country"].apply(get_country_risk)
    
    X["hop_count"] = df["hop_count"].astype(float)
    X["shared_identifier_count"] = df["shared_identifier_count"].astype(float)
    
    return X

if not os.path.exists(DATA_CSV):
    print(f"Error: {DATA_CSV} not found.")
    exit(1)

df = pd.read_csv(DATA_CSV)
X = engineer_features(df).fillna(0.0)

scaler = StandardScaler()
Xs = scaler.fit_transform(X)

# Isolation Forest config from 2.2
model = IsolationForest(
    n_estimators=200, 
    max_samples='auto', 
    contamination=0.01, 
    random_state=42
)
model.fit(Xs)

joblib.dump(model, os.path.join(MODEL_DIR, "isolation_model.joblib"))
joblib.dump(scaler, os.path.join(MODEL_DIR, "scaler.joblib"))

# Save decision function range for normalization
dec_scores = model.decision_function(Xs)
stats = {"min": float(np.min(dec_scores)), "max": float(np.max(dec_scores))}
joblib.dump(stats, os.path.join(MODEL_DIR, "score_stats.joblib"))

print("Model and scaler saved successfully.")
