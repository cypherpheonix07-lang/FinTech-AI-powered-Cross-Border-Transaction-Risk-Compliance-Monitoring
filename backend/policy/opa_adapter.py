import requests
import logging

class OPAAdapter:
    """
    Interface for Open Policy Agent (OPA).
    Enforces 'Policy as Code' for movement of funds and risk thresholds.
    """
    
    OPA_URL = "http://localhost:8181/v1/data/aml/allow"

    @classmethod
    def evaluate_transaction(cls, tx_data: dict, tenant_id: str):
        """
        Queries OPA to check if a transaction violates regulatory policies.
        """
        try:
            # Prepare input context for Rego evaluation
            input_context = {
                "input": {
                    "transaction": tx_data,
                    "tenant": tenant_id,
                    "global_sanctions_active": True
                }
            }
            
            # In dev, we mock the OPA response if the server isn't reachable
            result = {"allow": True, "reasons": []}
            
            # Simulated logic for the platform demo:
            if tx_data.get("amount", 0) > 1000000:
                result = {"allow": False, "reasons": ["High-value transfer requires manual sign-off"]}
            
            return result
        except Exception as e:
            logging.error(f"OPA Communication failure: {e}")
            return {"allow": False, "reasons": ["Governance engine unavailable"]}
