# ml/labeling_helpers.py
import pandas as pd
import numpy as np

HIGH_AMOUNT = 50000
HIGH_FREQ = 50
HIGH_SHARED = 3
HIGH_RISK_COUNTRIES = {"NG", "PK", "AF", "SY", "IR", "KP"}  # example

def apply_heuristic_labels(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["label_heuristic"] = 0
    
    # Ensure numeric types
    amt = pd.to_numeric(df["amount"], errors='coerce').fillna(0)
    freq = pd.to_numeric(df["frequency_per_hour"], errors='coerce').fillna(0)
    shared = pd.to_numeric(df["shared_identifier_count"], errors='coerce').fillna(0)
    
    df.loc[amt >= HIGH_AMOUNT, "label_heuristic"] = 1
    df.loc[freq >= HIGH_FREQ, "label_heuristic"] = 1
    df.loc[shared >= HIGH_SHARED, "label_heuristic"] = 1
    
    # Country check
    if "receiver_country" in df.columns:
        df.loc[df["receiver_country"].isin(HIGH_RISK_COUNTRIES) & (amt > 5000), "label_heuristic"] = 1
        
    # final label preference: keep existing canonical label if present (and not NaN), else heuristic
    if "label" in df.columns:
        # If label is NaN, use heuristic. If label is present, use it.
        # Note: In ingest_excel, label is NaN if unknown.
        df["label_final"] = df["label"].fillna(df["label_heuristic"]).astype(int)
    else:
        df["label_final"] = df["label_heuristic"].astype(int)
        
    return df
