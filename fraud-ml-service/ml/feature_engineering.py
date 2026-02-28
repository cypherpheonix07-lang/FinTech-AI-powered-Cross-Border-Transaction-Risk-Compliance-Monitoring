import pandas as pd
import numpy as np

def extract_features(data: pd.DataFrame) -> pd.DataFrame:
    """
    Core feature engineering pipeline for TransactTrace-Nexus.
    Extracts velocity, country risk, and indicator features.
    """
    df = data.copy()
    
    # 1. Basic numeric features
    df['amount_log'] = np.log1p(df['amount'])
    
    # 2. Country Risk placeholders (to be expanded with lists)
    high_risk_countries = ['KP', 'IR', 'SY']
    df['is_high_risk_sender'] = df['sender_country'].isin(high_risk_countries).astype(int)
    df['is_high_risk_receiver'] = df['receiver_country'].isin(high_risk_countries).astype(int)
    
    # 3. Indicator flags
    df['is_ring_identifier'] = df['identifier'].str.contains('ring', na=False).astype(int)
    
    # 4. Velocity stubs (Requires time-series windowing in production)
    # For now, we stub these as features that will be calculated by the app
    # df['tx_count_1h'] = ...
    
    return df
