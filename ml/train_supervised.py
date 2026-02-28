# ml/train_supervised.py
# pip install pandas scikit-learn xgboost joblib

import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import precision_score, recall_score, f1_score, roc_auc_score
import joblib
import os
import sys

# Add current directory to path so we can import labeling_helpers
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from labeling_helpers import apply_heuristic_labels

DATA_CSV = "data/transactions.csv"
MODEL_DIR = "fraud-ml-service/models"
os.makedirs(MODEL_DIR, exist_ok=True)

def fe(df):
    # feature engineering (must be consistent with inference)
    X = pd.DataFrame()
    X["log_amount"] = np.log1p(df["amount"].astype(float))
    X["freq_hour"] = df["frequency_per_hour"].astype(float)
    X["user_mean"] = df["user_mean_amount"].astype(float)
    X["user_std"] = df["user_std_amount"].astype(float)
    
    eps = 1e-6
    X["amount_deviation"] = (df["amount"].astype(float) - X["user_mean"]) / (X["user_std"] + eps)
    X["hop_count"] = df["hop_count"].astype(float)
    X["shared_id_cnt"] = df["shared_identifier_count"].astype(float)
    
    # Simple hash-based country mapping (consistent with main.py fallback)
    def simple_hash_country(series):
        return series.fillna("").apply(lambda x: float(abs(hash(str(x)) % 100)) / 100.0)

    X["sender_country_idx"] = simple_hash_country(df["sender_country"])
    X["receiver_country_idx"] = simple_hash_country(df["receiver_country"])
    
    return X

def main():
    if not os.path.exists(DATA_CSV):
        print(f"Data file {DATA_CSV} not found. Running generation script...")
        # Fallback to generate if empty (optional, but good for hackathon flow)
        pass 

    try:
        df = pd.read_csv(DATA_CSV)
    except FileNotFoundError:
        print("CSV not found.")
        return

    if df.empty:
        print("No data found")
        return

    # apply labeling
    df = apply_heuristic_labels(df)
    y = df["label_final"].astype(int)

    X = fe(df).fillna(0.0)
    scaler = StandardScaler()
    Xs = scaler.fit_transform(X)

    print("Training IsolationForest...")
    # Unsupervised model
    iforest = IsolationForest(n_estimators=200, contamination=0.01, random_state=42)
    iforest.fit(Xs)

    print("Training Supervised Model...")
    # Supervised model (RandomForest for speed in hackathon)
    # Ensure we have at least 2 classes
    if len(np.unique(y)) < 2:
        print("Warning: Only one class detected in labels. Synthetic negative/positive samples might be needed.")
        # Proceed knowing metrics might be weird, or error out. 
        # For hackathon, let's just train (it will likely be all 0s or 1s)

    X_train, X_test, y_train, y_test = train_test_split(Xs, y, test_size=0.2, random_state=42, stratify=y if len(np.unique(y))>1 else None)
    
    clf = RandomForestClassifier(n_estimators=200, class_weight="balanced", random_state=42)
    clf.fit(X_train, y_train)

    # Evaluate
    y_pred = clf.predict(X_test)
    y_prob = clf.predict_proba(X_test)[:,1] if hasattr(clf, "predict_proba") and len(clf.classes_) > 1 else y_pred
    
    # handle single class edge case in metrics
    if len(np.unique(y_test)) > 1:
        precision = precision_score(y_test, y_pred, zero_division=0)
        recall = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)
        roc = roc_auc_score(y_test, y_prob)
    else:
        precision, recall, f1, roc = 0.0, 0.0, 0.0, 0.0

    print("Supervised metrics: precision", precision, "recall", recall, "f1", f1, "roc", roc)

    # Save artifacts
    print(f"Saving artifacts to {MODEL_DIR}...")
    joblib.dump(scaler, os.path.join(MODEL_DIR, "scaler.joblib"))
    joblib.dump(iforest, os.path.join(MODEL_DIR, "isolation_model.joblib"))
    joblib.dump(clf, os.path.join(MODEL_DIR, "supervised_model.joblib"))
    
    # metadata
    meta = {
        "model_version": f"v{int(pd.Timestamp.now().timestamp())}",
        "precision": float(precision),
        "recall": float(recall),
        "f1": float(f1),
        "roc_auc": float(roc),
        "n_samples": int(len(df))
    }
    
    import json
    with open(os.path.join(MODEL_DIR, "model_meta.json"), "w") as f:
        json.dump(meta, f)
        
    print("Saved models & meta:", meta)

if __name__ == "__main__":
    main()
