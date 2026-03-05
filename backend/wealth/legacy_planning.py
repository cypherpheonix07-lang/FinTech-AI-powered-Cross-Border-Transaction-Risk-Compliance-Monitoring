"""
High-Net-Worth Legacy Planning
Simulates 'Dead Man's Switch' smart contracts and multi-signature trust administration.
"""
from typing import Dict, Any, List
import datetime
import random

class LegacyTrustManager:
    """
    Manages automated inheritance triggering based on proof of life pings.
    """
    def __init__(self):
         # Simulated state of the creator's proof of life
         self.last_ping_days_ago = random.randint(1, 45) 
         self.ping_threshold_days = 30
         self.is_incapacitated = self.last_ping_days_ago > self.ping_threshold_days

    def get_trust_status(self, trust_id: str) -> Dict[str, Any]:
        """
        Returns the current heartbeat and execution state of a smart trust.
        """
        status = "NOMINAL"
        days_until_trigger = self.ping_threshold_days - self.last_ping_days_ago
        
        if self.is_incapacitated:
            status = "TRIGGER_INITIATED"
            days_until_trigger = 0
        elif days_until_trigger <= 7:
            status = "WARNING_PING_OVERDUE"
            
        return {
            "trust_id": trust_id,
            "creator": "HNW_Client_941",
            "proof_of_life_status": status,
            "last_ping_received_days_ago": self.last_ping_days_ago,
            "critical_threshold_days": self.ping_threshold_days,
            "days_until_execution": days_until_trigger,
            "next_required_action": "Client must authenticate via Biometrics/Hardware Key" if status != "TRIGGER_INITIATED" else "Awaiting Executor Multi-Sig Confirmation"
        }

    def simulate_inheritance_execution(self, total_aum_usd: float, beneficiaries: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Simulates the distribution of assets upon a death switch trigger.
        """
        if not self.is_incapacitated:
            return {"error": "Trust conditions not met. Creator is considered active."}
            
        execution_plan = []
        remaining_aum = total_aum_usd
        
        for ben in beneficiaries:
            # Simple percentage based distribution
            allocation = total_aum_usd * (ben["percentage"] / 100.0)
            remaining_aum -= allocation
            
            # Apply time locks
            unlock_schedule = "Immediate"
            if ben.get("age", 30) < 25:
                unlock_schedule = f"Vested over {25 - ben['age']} years"
                
            execution_plan.append({
                "beneficiary": ben["name"],
                "allocated_amount_usd": round(allocation, 2),
                "asset_type_transfer": ben.get("asset_preference", "USDC_Stablecoin"),
                "smart_contract_lock_conditions": unlock_schedule,
                "status": "QUEUED_FOR_DISPERSAL"
            })
            
        return {
            "trigger_event": "DEAD_MAN_SWITCH_TIMEOUT",
            "total_assets_processed_usd": total_aum_usd,
            "execution_plan": execution_plan,
            "charitable_remainder_usd": round(remaining_aum, 2), # Anything left over
            "timestamp": datetime.datetime.now().isoformat()
        }

# For testing
if __name__ == "__main__":
    trust = LegacyTrustManager()
    
    print("Current Trust Heartbeat:")
    status = trust.get_trust_status("TRUST_OMEGA_77")
    print(status)
    
    # Force incapacitation for testing the execution logic
    trust.is_incapacitated = True
    
    print("\nSimulating Smart Contract Trust Execution ($50M):")
    bens = [
        {"name": "Alice (Daughter)", "percentage": 40, "age": 22, "asset_preference": "Bitcoin_Multisig"},
        {"name": "Bob (Son)", "percentage": 40, "age": 28, "asset_preference": "Vanguard_Index_Tokens"},
        {"name": "XYZ Foundation", "percentage": 15, "age": 99, "asset_preference": "USDC_Stablecoin"}
    ]
    execution = trust.simulate_inheritance_execution(50000000.0, bens)
    print(execution)
