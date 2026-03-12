"""
Weather & Catastrophe Derivatives
Simulates an oracle-driven smart contract that prices and settles parametric insurance products based on weather events.
"""
from typing import Dict, Any
import random

class ParametricWeatherDerivatives:
    """
    Models risk and triggers automated settlement for extreme weather conditions.
    """
    def __init__(self):
        self.active_contracts = {
            "CAT_BOND_FLORIDA_01": {"location": "Miami, FL", "trigger": "Hurricane Category >= 4", "payout_usd": 50000000.0, "status": "ACTIVE"},
            "DROUGHT_AGRI_CALI_02": {"location": "Fresno, CA", "trigger": "Rainfall < 5mm over 90 days", "payout_usd": 12000000.0, "status": "ACTIVE"}
        }
        
    def fetch_weather_oracle_data(self) -> Dict[str, Any]:
        """
        Simulates pinging a decentralized oracle network (e.g., Chainlink) for real-world API data.
        """
        # Injecting a simulated trigger event for Florida
        oracle_payload = {
            "timestamp": "2026-08-15T14:30:00Z",
            "data": [
                {"location": "Miami, FL", "current_hurricane_category": 4, "windspeed_mph": 135},
                {"location": "Fresno, CA", "days_without_rain": 45, "rainfall_mm": 1.2}
            ]
        }
        return oracle_payload

    def evaluate_contract_triggers(self) -> Dict[str, Any]:
        """
        Cross-references oracle data with smart contract terms to execute parametric payouts.
        """
        oracle_data = self.fetch_weather_oracle_data()
        execution_log = []
        total_payout = 0.0
        
        # Simulating Florida trigger execution
        contract = self.active_contracts["CAT_BOND_FLORIDA_01"]
        miami_data = next(item for item in oracle_data["data"] if item["location"] == "Miami, FL")
        
        if miami_data["current_hurricane_category"] >= 4:
            contract["status"] = "SETTLED_PAYOUT_TRIGGERED"
            total_payout += contract["payout_usd"]
            execution_log.append({
                "contract_id": "CAT_BOND_FLORIDA_01",
                "oracle_verification": f"Windspeed {miami_data['windspeed_mph']} mph (Cat {miami_data['current_hurricane_category']})",
                "action": "Automated Smart Contract Settlement",
                "amount_usd": contract["payout_usd"]
            })
            
        return {
            "oracle_feed_status": "SYNCED_VERIFIED",
            "contracts_evaluated": len(self.active_contracts),
            "triggered_events": execution_log,
            "total_capital_deployed_usd": total_payout
        }

if __name__ == "__main__":
    pwd = ParametricWeatherDerivatives()
    print("Evaluating Weather Derivative Smart Contracts:")
    print(pwd.evaluate_contract_triggers())
