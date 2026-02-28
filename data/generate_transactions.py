import csv
import random
import uuid
import os
from datetime import datetime, timedelta
from faker import Faker
import numpy as np
import pandas as pd

# Ensure data directory exists
os.makedirs("data", exist_ok=True)

fake = Faker()
FRACTION_SUSPICIOUS = 0.05
NUM_ACCOUNTS = 500
NUM_TX = 10000
COUNTRIES = ["IN","US","GB","AE","SG","HK","NG","KE","BR","DE","CN","JP","FR","ES"]

# generate accounts and baseline stats
accounts = []
for i in range(NUM_ACCOUNTS):
    acc = {
        "account_id": f"acct_{100000+i}",
        "mean": max(10, round(np.random.lognormal(4.0, 1.2))), # skewed
        "std": max(1, int(np.random.lognormal(1.0,0.5))),
    }
    accounts.append(acc)

rows = []
start_time = datetime.utcnow() - timedelta(days=7)
for i in range(NUM_TX):
    acc = random.choice(accounts)
    amount = abs(np.random.normal(loc=acc["mean"], scale=acc["std"]))
    
    # inject suspicious spikes
    if random.random() < FRACTION_SUSPICIOUS:
        amount = amount * random.choice([50,100,200])  # big outlier
    
    country_sender = random.choice(COUNTRIES)
    country_receiver = random.choice(COUNTRIES)
    ts = start_time + timedelta(seconds=random.randint(0, 7*24*3600))
    identifier = f"phone_{random.randint(1000,9999)}" if random.random() < 0.6 else f"email_{fake.user_name()}@{fake.free_email_domain()}"
    
    # frequency per hour approximated:
    freq_hour = random.randint(0,10)
    
    rows.append({
        "transaction_id": f"tx_{i+1:06}",
        "account_id": acc["account_id"],
        "sender_country": country_sender,
        "receiver_country": country_receiver,
        "amount": round(float(amount),2),
        "currency": "USD",
        "timestamp": ts.isoformat() + "Z",
        "identifier": identifier,
        "frequency_per_hour": freq_hour,
        "user_mean_amount": acc["mean"],
        "user_std_amount": acc["std"],
        "hop_count": random.choice([0,0,0,1,2]),
        "shared_identifier_count": random.choice([0,0,1,2])
    })

# write CSV
df = pd.DataFrame(rows)
df.to_csv("data/transactions.csv", index=False)
print(f"Successfully wrote {df.shape[0]} transactions to data/transactions.csv")
