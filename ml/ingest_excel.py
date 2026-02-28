# ml/ingest_excel.py
# pip install pandas openpyxl

import os
import pandas as pd
from glob import glob
from pathlib import Path
import numpy as np
import json

DATA_DIR = Path("data/kaggle_excels")
OUT_CSV = Path("data/transactions.csv")

# Ensure output directory exists
os.makedirs(OUT_CSV.parent, exist_ok=True)

# canonical columns we want in final CSV:
CANONICAL = [
    "transaction_id",
    "account_id",
    "sender_country",
    "receiver_country",
    "amount",
    "currency",
    "timestamp",
    "identifier",
    "frequency_per_hour",
    "user_mean_amount",
    "user_std_amount",
    "hop_count",
    "shared_identifier_count",
    "label"  # optional: 0 normal, 1 fraud
]

def map_columns(df):
    # heuristics to find columns
    colmap = {}
    lowercols = {str(c).lower(): c for c in df.columns}
    def find(keys):
        for k in keys:
            if k.lower() in lowercols:
                return lowercols[k.lower()]
        return None

    candidates = {
        "amount": ["amount", "transactionamount", "amt", "value"],
        "timestamp": ["timestamp", "date", "time", "transaction_date"],
        "account_id": ["account", "account_id", "acct", "customer_id", "accountnumber"],
        "sender_country": ["sender_country", "origin_country", "country_from", "country"],
        "receiver_country": ["receiver_country", "dest_country", "country_to", "destination_country"],
        "identifier": ["phone", "email", "identifier", "id"],
        "label": ["isFraud", "class", "fraud", "label"]
    }
    for target, keys in candidates.items():
        found = find(keys)
        if found:
            colmap[target] = found
    return colmap

def canonicalize_one(df, source_name):
    colmap = map_columns(df)
    # create an output DataFrame with canonical columns; fill with defaults
    out = pd.DataFrame(columns=CANONICAL)
    n = len(df)
    out["transaction_id"] = [f"{source_name}_tx_{i+1}" for i in range(n)]
    # account
    if "account_id" in colmap:
        out["account_id"] = df[colmap["account_id"]].astype(str)
    else:
        out["account_id"] = [f"acct_{i+1}" for i in range(n)]
    # amount
    if "amount" in colmap:
        out["amount"] = pd.to_numeric(df[colmap["amount"]], errors="coerce").fillna(0.0)
    else:
        out["amount"] = 0.0
    # timestamp
    if "timestamp" in colmap:
        out["timestamp"] = pd.to_datetime(df[colmap["timestamp"]], errors="coerce").fillna(pd.Timestamp.now())
    else:
        out["timestamp"] = pd.Timestamp.now()
    # countries
    out["sender_country"] = df[colmap["sender_country"]] if "sender_country" in colmap else "XX"
    out["receiver_country"] = df[colmap["receiver_country"]] if "receiver_country" in colmap else "XX"
    # identifier
    out["identifier"] = df[colmap["identifier"]].astype(str) if "identifier" in colmap else None
    # label
    if "label" in colmap:
        out["label"] = pd.to_numeric(df[colmap["label"]], errors="coerce").fillna(0).astype(int)
    else:
        out["label"] = np.nan  # unknown
    # fill missing optional columns with defaults
    out["currency"] = "USD"
    out["frequency_per_hour"] = 0
    # Rolling stats calculation
    if "amount" in colmap:
        amounts = df[colmap["amount"]].astype(float)
        out["user_mean_amount"] = amounts.rolling(window=5, min_periods=1).mean().fillna(amounts.mean()).fillna(0)
        out["user_std_amount"] = amounts.rolling(window=5, min_periods=1).std().fillna(amounts.std()).fillna(1)
    else:
        out["user_mean_amount"] = 0.0
        out["user_std_amount"] = 0.0
        
    out["hop_count"] = 0
    out["shared_identifier_count"] = 0
    return out

def run():
    if not DATA_DIR.exists():
        print(f"Directory {DATA_DIR} does not exist. Please create it and add Excel files.")
        return

    files = glob(str(DATA_DIR/"*.xlsx")) + glob(str(DATA_DIR/"*.xls"))
    pieces = []
    for f in files:
        try:
            df = pd.read_excel(f, engine="openpyxl")
            name = Path(f).stem
            out = canonicalize_one(df, name)
            pieces.append(out)
            print("Processed", f, "->", len(out), "rows")
        except Exception as e:
            print("Error reading", f, e)
    
    if not pieces:
        print("No files processed.")
        # Create empty if needed or just return
        if not OUT_CSV.exists(): 
             print("No CSV generated.")
        return

    combined = pd.concat(pieces, ignore_index=True)
    combined.to_csv(OUT_CSV, index=False)
    print("Wrote unified CSV to", OUT_CSV, "rows:", len(combined))

if __name__ == "__main__":
    run()
