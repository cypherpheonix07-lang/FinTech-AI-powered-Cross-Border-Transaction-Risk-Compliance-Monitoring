class CounterfactualService:
    """
    Generates 'What-If' scenarios to help investigators understand risk thresholds.
    Suggests minimal changes needed to flip a risk classification.
    """
    
    @staticmethod
    def get_suggestions(tx_id: str, current_risk: float, target_risk: float = 0.3):
        """
        Calculates suggested feature modifications.
        """
        suggestions = []
        
        if not isinstance(current_risk, (int, float)):
            raise ValueError(f"Invalid risk score type: {type(current_risk)}")
        if current_risk < 0 or current_risk > 1.0:
            raise ValueError(f"Risk score must be between 0.0 and 1.0. Got: {current_risk}")

        # Mock logic: Suggesting common AML risk reduction steps
        if current_risk > 0.7:
            suggestions.append({
                "feature": "Transaction Velocity",
                "current_value": "8/hour",
                "suggested_value": "< 3/hour",
                "impact": -0.25
            })
            suggestions.append({
                "feature": "Beneficiary Jurisdiction",
                "current_value": "High Risk (RU)",
                "suggested_value": "Medium Risk (TR)",
                "impact": -0.15
            })
            suggestions.append({
                "feature": "Documentation Completeness",
                "current_value": "Incomplete",
                "suggested_value": "Verified UBO",
                "impact": -0.20
            })
            
        return {
            "tx_id": tx_id,
            "current_risk": current_risk,
            "target_risk": target_risk,
            "estimated_new_risk": round(current_risk + sum(s["impact"] for s in suggestions[:2]), 2),
            "suggestions": suggestions
        }
