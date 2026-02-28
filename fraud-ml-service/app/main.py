from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict
import joblib
import os
import uvicorn
from .graph_service import get_graph_service
import json

app = FastAPI(title="TransactTrace ML Scoring Service")

# Model Registry (Local placeholder, will link to model_versions table later)
models = {}

@app.on_event("startup")
def load_models():
    # Load baseline models if they exist
    model_path = "models/"
    if os.path.exists(os.path.join(model_path, "iso_forest.joblib")):
        models["iso_forest"] = joblib.load(os.path.join(model_path, "iso_forest.joblib"))
    if os.path.exists(os.path.join(model_path, "random_forest.joblib")):
        models["random_forest"] = joblib.load(os.path.join(model_path, "random_forest.joblib"))

class TransactionInput(BaseModel):
    amount: float
    currency: str
    sender_country: Optional[str] = None
    receiver_country: Optional[str] = None
    identifier: Optional[str] = None
    metadata: Optional[Dict] = None

class RiskScoreResponse(BaseModel):
    anomaly_score: float
    supervised_prob: float
    final_risk_score: int
    risk_level: str
    explanation: Dict

@app.get("/api/health")
def health():
    return {"status": "ok", "models_loaded": list(models.keys())}

@app.post("/api/fraud/check", response_model=RiskScoreResponse)
async def check_fraud(tx: TransactionInput):
    # --- Stage 1: Raw/Baseline Scoring ---
    anomaly_score = 0.15
    supervised_prob = 0.10
    
    reasons = []
    if tx.amount > 50000:
        anomaly_score = max(anomaly_score, 0.85)
        supervised_prob = max(supervised_prob, 0.75)
        reasons.append("high_amount")
    else:
        reasons.append("normal_volume")
    
    # --- Stage 2: Graph Enhancement ---
    graph_flag = False
    graph_features = {"cluster_size": 0, "ring_detected": False}
    
    # Try to extract account number from identifier or metadata if available
    account_number = None
    if tx.identifier:
        try:
            # Check if identifier is a JSON string (as sent by IngestionService)
            ident_data = json.loads(tx.identifier)
            account_number = ident_data.get("senderAccount")
        except:
            account_number = tx.identifier

    if account_number:
        gs = get_graph_service()
        graph_features = gs.get_account_features(account_number)
        
        if graph_features["cluster_size"] > 5:
            anomaly_score = min(1.0, anomaly_score + 0.2)
            reasons.append("large_account_cluster")
            graph_flag = True
            
        if graph_features["ring_detected"]:
            anomaly_score = 1.0
            reasons.append("circular_transfer_ring")
            graph_flag = True
            
        if graph_features["shared_id_count"] > 2:
            supervised_prob = min(1.0, supervised_prob + 0.3)
            reasons.append("excessive_shared_identifiers")
            graph_flag = True

    # --- Final Ensemble Scoring ---
    final_score = int((anomaly_score * 0.4 + supervised_prob * 0.6) * 100)
    
    risk_level = "LOW"
    if final_score >= 80: risk_level = "CRITICAL"
    elif final_score >= 60: risk_level = "HIGH"
    elif final_score >= 30: risk_level = "MEDIUM"
    
    return {
        "anomaly_score": anomaly_score,
        "supervised_prob": supervised_prob,
        "final_risk_score": final_score,
        "risk_level": risk_level,
        "graph_flag": graph_flag,
        "explanation": {
            "reasons": reasons,
            "graph_features": graph_features,
            "model_version": "v-ensemble-2.0"
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
