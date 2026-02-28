# ml/train_xgboost.py
# Production XGBoost training with SHAP explainability
# pip install xgboost shap pandas scikit-learn joblib

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    precision_score, recall_score, f1_score, roc_auc_score,
    confusion_matrix, classification_report
)
import joblib
import json
import os
import sys
import time

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from feature_engineering import extract_features, FEATURE_NAMES
from labeling_helpers import apply_heuristic_labels

# Paths
DATA_CSV = "data/transactions.csv"
MODEL_DIR = "fraud-ml-service/models"
os.makedirs(MODEL_DIR, exist_ok=True)


def train_xgboost_model(X_train, y_train, X_test, y_test):
    """Train XGBoost with optimized hyperparameters for fraud detection."""
    try:
        import xgboost as xgb
    except ImportError:
        print("[WARN] xgboost not installed. pip install xgboost")
        return None, {}

    # Calculate scale_pos_weight for imbalanced data
    n_pos = int(y_train.sum())
    n_neg = int(len(y_train) - n_pos)
    scale_pos_weight = n_neg / max(n_pos, 1)

    params = {
        "n_estimators": 300,
        "max_depth": 6,
        "learning_rate": 0.05,
        "subsample": 0.8,
        "colsample_bytree": 0.8,
        "min_child_weight": 5,
        "scale_pos_weight": min(scale_pos_weight, 20),  # cap at 20
        "use_label_encoder": False,
        "eval_metric": "aucpr",
        "random_state": 42,
        "n_jobs": -1,
    }

    print(f"[XGBoost] Training with scale_pos_weight={params['scale_pos_weight']:.2f}")
    print(f"[XGBoost] Positive samples: {n_pos}, Negative: {n_neg}")

    model = xgb.XGBClassifier(**params)
    model.fit(
        X_train, y_train,
        eval_set=[(X_test, y_test)],
        verbose=50
    )

    # Evaluate
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1] if len(model.classes_) > 1 else y_pred

    metrics = {}
    if len(np.unique(y_test)) > 1:
        metrics = {
            "precision": float(precision_score(y_test, y_pred, zero_division=0)),
            "recall": float(recall_score(y_test, y_pred, zero_division=0)),
            "f1": float(f1_score(y_test, y_pred, zero_division=0)),
            "roc_auc": float(roc_auc_score(y_test, y_prob)),
        }
        cm = confusion_matrix(y_test, y_pred)
        tn, fp, fn, tp = cm.ravel() if cm.size == 4 else (0, 0, 0, 0)
        metrics["true_positives"] = int(tp)
        metrics["false_positives"] = int(fp)
        metrics["true_negatives"] = int(tn)
        metrics["false_negatives"] = int(fn)
        metrics["fpr"] = float(fp / max(fp + tn, 1))
        metrics["fnr"] = float(fn / max(fn + tp, 1))

        print("\n[XGBoost] Classification Report:")
        print(classification_report(y_test, y_pred, target_names=["Legit", "Fraud"], zero_division=0))
    else:
        print("[WARN] Only one class in test set — metrics unavailable")

    # Feature importance
    importance = model.feature_importances_
    feat_importance = {}
    for i, name in enumerate(FEATURE_NAMES[:len(importance)]):
        feat_importance[name] = float(importance[i])
    metrics["feature_importance"] = feat_importance

    print("\n[XGBoost] Top features:")
    for k, v in sorted(feat_importance.items(), key=lambda x: x[1], reverse=True)[:5]:
        print(f"  {k}: {v:.4f}")

    return model, metrics


def compute_shap_explanations(model, X_test, save_dir=None):
    """Compute SHAP values for model explainability."""
    try:
        import shap
    except ImportError:
        print("[WARN] shap not installed. pip install shap")
        return None

    print("\n[SHAP] Computing explanations...")
    explainer = shap.TreeExplainer(model)

    # Use subset for SHAP (can be expensive on large datasets)
    sample_size = min(500, len(X_test))
    X_sample = X_test[:sample_size]
    shap_values = explainer.shap_values(X_sample)

    # Global feature importance via SHAP
    mean_abs_shap = np.abs(shap_values).mean(axis=0)
    shap_importance = {}
    for i, name in enumerate(FEATURE_NAMES[:len(mean_abs_shap)]):
        shap_importance[name] = float(mean_abs_shap[i])

    print("[SHAP] Global feature importance (mean |SHAP|):")
    for k, v in sorted(shap_importance.items(), key=lambda x: x[1], reverse=True)[:5]:
        print(f"  {k}: {v:.4f}")

    # Save SHAP data for dashboards
    if save_dir:
        shap_data = {
            "global_importance": shap_importance,
            "expected_value": float(explainer.expected_value) if np.isscalar(explainer.expected_value) else float(explainer.expected_value[0]),
            "sample_size": sample_size,
        }
        with open(os.path.join(save_dir, "shap_explanations.json"), "w") as f:
            json.dump(shap_data, f, indent=2)
        print(f"[SHAP] Saved explanations to {save_dir}/shap_explanations.json")

    return shap_importance


def main():
    print("=" * 60)
    print("TransactTrace-Nexus: XGBoost Model Training Pipeline")
    print("=" * 60)

    # Load data
    if not os.path.exists(DATA_CSV):
        print(f"[ERROR] {DATA_CSV} not found. Run data generation first.")
        return

    df = pd.read_csv(DATA_CSV)
    if df.empty:
        print("[ERROR] No data found")
        return

    print(f"\n[Data] Loaded {len(df)} transactions")

    # Apply labels
    df = apply_heuristic_labels(df)
    y = df["label_final"].astype(int)
    print(f"[Data] Label distribution: {dict(y.value_counts())}")

    # Feature extraction
    X = extract_features(df).fillna(0.0)
    print(f"[Data] Feature matrix: {X.shape}")

    # Scale
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Split
    if len(np.unique(y)) < 2:
        print("[WARN] Only one class — training will proceed but metrics will be limited")
        stratify = None
    else:
        stratify = y

    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42, stratify=stratify
    )

    # Train XGBoost
    xgb_model, xgb_metrics = train_xgboost_model(X_train, y_train, X_test, y_test)

    if xgb_model is None:
        print("[ERROR] XGBoost training failed")
        return

    # SHAP Explainability
    shap_importance = compute_shap_explanations(xgb_model, X_test, save_dir=MODEL_DIR)

    # Save model artifacts
    print(f"\n[Save] Writing artifacts to {MODEL_DIR}/")
    joblib.dump(scaler, os.path.join(MODEL_DIR, "scaler.joblib"))
    joblib.dump(xgb_model, os.path.join(MODEL_DIR, "xgboost_model.joblib"))

    # Also retrain IsolationForest with new features
    from sklearn.ensemble import IsolationForest
    print("\n[IsoForest] Training anomaly detector...")
    iforest = IsolationForest(n_estimators=200, contamination=0.02, random_state=42)
    iforest.fit(X_scaled)
    joblib.dump(iforest, os.path.join(MODEL_DIR, "isolation_model.joblib"))

    # Also keep RandomForest (ensemble member)
    from sklearn.ensemble import RandomForestClassifier
    print("[RandomForest] Training ensemble member...")
    rf = RandomForestClassifier(n_estimators=200, class_weight="balanced", random_state=42)
    rf.fit(X_train, y_train)
    joblib.dump(rf, os.path.join(MODEL_DIR, "supervised_model.joblib"))

    # Model metadata
    version = f"v{int(time.time())}"
    meta = {
        "model_version": version,
        "trained_at": pd.Timestamp.now().isoformat(),
        "n_samples": int(len(df)),
        "n_features": int(X.shape[1]),
        "feature_names": FEATURE_NAMES,
        "models": ["xgboost", "isolation_forest", "random_forest"],
        "xgboost_metrics": xgb_metrics,
        "hyperparameters": {
            "xgb_n_estimators": 300,
            "xgb_max_depth": 6,
            "xgb_learning_rate": 0.05,
            "iforest_n_estimators": 200,
            "iforest_contamination": 0.02,
            "rf_n_estimators": 200,
        },
    }

    if shap_importance:
        meta["shap_global_importance"] = shap_importance

    with open(os.path.join(MODEL_DIR, "model_meta.json"), "w") as f:
        json.dump(meta, f, indent=2)

    print(f"\n{'=' * 60}")
    print(f"[DONE] Model {version} saved successfully!")
    print(f"  XGBoost precision: {xgb_metrics.get('precision', 'N/A')}")
    print(f"  XGBoost recall:    {xgb_metrics.get('recall', 'N/A')}")
    print(f"  XGBoost F1:        {xgb_metrics.get('f1', 'N/A')}")
    print(f"  XGBoost ROC-AUC:   {xgb_metrics.get('roc_auc', 'N/A')}")
    print(f"  FPR:               {xgb_metrics.get('fpr', 'N/A')}")
    print(f"  FNR:               {xgb_metrics.get('fnr', 'N/A')}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
