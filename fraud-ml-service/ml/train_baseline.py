import pandas as pd
import joblib
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from ml.feature_engineering import extract_features
import os

# Create models directory if not exists
os.makedirs("models", exist_ok=True)

def train_baseline():
    print("Starting Baseline Model Training...")
    
    # 1. Generate Mock Data for training (In production, this would be a real CSV/DB pull)
    data = pd.DataFrame({
        'amount': np.random.uniform(10, 100000, 1000),
        'sender_country': np.random.choice(['US', 'GB', 'IN', 'KP'], 1000),
        'receiver_country': np.random.choice(['US', 'GB', 'IN', 'KP'], 1000),
        'identifier': np.random.choice(['phone_1', 'ring_2', 'web_3'], 1000),
        'label': np.random.choice([0, 1], 1000, p=[0.95, 0.05])
    })
    
    # 2. Add some high-risk patterns to the mock data
    data.loc[data['amount'] > 80000, 'label'] = 1
    data.loc[data['identifier'] == 'ring_2', 'label'] = 1
    
    # 3. Extract Features
    X = extract_features(data)
    y = data['label']
    
    # Pre-process for sklearn (numeric only)
    X_numeric = X.select_dtypes(include=[np.number])
    
    # 4. Train Unsupervised: IsolationForest
    print("  - Training IsolationForest...")
    iso_forest = IsolationForest(contamination=0.05, random_state=42)
    iso_forest.fit(X_numeric)
    joblib.dump(iso_forest, "models/iso_forest.joblib")
    
    # 5. Train Supervised: RandomForest
    print("  - Training RandomForest...")
    rf = RandomForestClassifier(n_estimators=100, random_state=42)
    rf.fit(X_numeric, y)
    joblib.dump(rf, "models/random_forest.joblib")
    
    print("Training Complete. Models saved to models/")

if __name__ == "__main__":
    import numpy as np
    train_baseline()
