"""
Identity & Reputation Systems
Simulates calculating a composite on-chain and off-chain reputation score for a corporate entity.
"""
from typing import Dict, Any

class ReputationSystem:
    """
    Synthesizes traditional credit data with decentralized activity to generate a 'Trust Score'.
    """
    def __init__(self):
        self.corporate_identity = {
            "entity_id": "PATH_G_CORP_01",
            "traditional_credit_rating": "AA-",
            "on_chain_tx_count": 14205,
            "smart_contract_defaults": 0,
            "kyb_status": "VERIFIED_TIER_3",
            "esg_score": 88
        }
        
    def calculate_composite_reputation(self) -> Dict[str, Any]:
        """
        Calculates a proprietary 0-1000 reputation score based on blended data.
        """
        base_score = 650 # Assumed baseline
        
        # Credit rating modifier
        if self.corporate_identity["traditional_credit_rating"].startswith("A"):
            base_score += 150
            
        # On-chain history modifier
        if self.corporate_identity["smart_contract_defaults"] == 0 and self.corporate_identity["on_chain_tx_count"] > 10000:
            base_score += 100
            
        # ESG modifier
        if self.corporate_identity["esg_score"] >= 80:
            base_score += 50
            
        final_score = min(base_score, 1000)
        
        status_tier = "PLATINUM_TRUSTED" if final_score >= 900 else "GOLD_VERIFIED"
        
        return {
            "entity_id": self.corporate_identity["entity_id"],
            "composite_reputation_score": final_score,
            "max_score_possible": 1000,
            "trust_tier": status_tier,
            "perks_unlocked": [
                "Undercollateralized DeFi Lending (Up to $5M)",
                "Instant Cross-Border Settlement (Zero Hold Time)",
                "Premium API Rate Limits"
            ]
        }

if __name__ == "__main__":
    rep = ReputationSystem()
    print("Calculating Composite Reputation:")
    print(rep.calculate_composite_reputation())
