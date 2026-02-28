class ExplainabilityService:
    """
    Provides interpretability metadata for ML model decisions.
    Calculates feature contribution local to specific transaction paths.
    """
    
    @staticmethod
    def get_shap_values(tx_id: str):
        """
        Calculates approximate SHAP values for a transaction decision.
        """
        # Mock high-importance features based on jurisdictional risk and velocity
        return {
            "tx_id": tx_id,
            "base_value": 0.15,
            "prediction": 0.82,
            "contributions": [
                {"feature": "Jurisdiction Risk (RU/KP)", "weight": 0.35},
                {"feature": "Entity Velocity (24h)", "weight": 0.22},
                {"feature": "Amount Outlier", "weight": 0.12},
                {"feature": "Layering Depth", "weight": 0.08},
                {"feature": "Historical Pattern Match", "weight": -0.10} # Negative reduces risk
            ]
        }

    @staticmethod
    def generate_counterfactual(tx_id: str):
        """
        Explains what would need to change for the risk score to drop below threshold.
        """
        return {
            "threshold": 0.5,
            "current_score": 0.82,
            "suggestions": [
                "Reduce transaction frequency by 40%",
                "Verify beneficiary through non-correspondent banking channel"
            ]
        }
