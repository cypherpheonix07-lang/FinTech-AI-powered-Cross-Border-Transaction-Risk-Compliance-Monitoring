"""
Space Economy & Satellite Finance
Provides mechanisms for space industry investments, satellite launch financing, and debris insurance.
"""
import random
from typing import Dict, List, Any

class OrbitalFinanceManager:
    """
    Simulates financial operations related to extraterrestrial assets
    and Low Earth Orbit (LEO) investments.
    """
    def __init__(self):
        self.investment_categories = [
            "Satellite_Constellation",
            "Asteroid_Mining",
            "Space_Tourism",
            "Orbital_Manufacturing"
        ]
        
    def calculate_launch_insurance(self, payload_value: float, provider: str, orbit_type: str) -> Dict[str, float]:
        """
        Calculates predictive insurance premiums for satellite launches.
        """
        # Base failure rate (simulated)
        base_rate = 0.04
        
        provider_modifiers = {
            "SpaceX": -0.015,
            "RocketLab": -0.01,
            "BlueOrigin": 0.005,
            "LegacyCorp": 0.02
        }
        
        orbit_modifiers = {
            "LEO": 0.0,
            "MEO": 0.01,
            "GEO": 0.02,
            "Lunar": 0.05
        }
        
        adjusted_rate = base_rate + provider_modifiers.get(provider, 0.0) + orbit_modifiers.get(orbit_type, 0.0)
        
        # Add risk premium for debris density in specific orbits
        debris_risk = random.uniform(0.001, 0.005)
        
        final_premium_rate = max(0.01, adjusted_rate + debris_risk)
        premium_cost = payload_value * final_premium_rate
        
        return {
            "payload_value_usd": payload_value,
            "premium_rate": round(final_premium_rate, 4),
            "premium_cost_usd": round(premium_cost, 2),
            "debris_risk_factor": round(debris_risk, 4),
            "provider": provider,
            "orbit_type": orbit_type
        }

    def get_space_economy_index(self) -> Dict[str, Any]:
        """
        Returns a customized index fund tracking top space economy entities.
        """
        return {
            "index_name": "PathGuard_Space_Tracker_v1",
            "total_aum_millions": 450.2,
            "ytd_return_pct": 14.5,
            "top_holdings": [
                {"ticker": "ASTS", "weight_pct": 12.5},
                {"ticker": "RKLB", "weight_pct": 10.2},
                {"ticker": "PL", "weight_pct": 8.4},
                {"ticker": "PRIV_SPCX", "weight_pct": 25.0} # Private equity proxy
            ]
        }
        
# For testing
if __name__ == "__main__":
    ofm = OrbitalFinanceManager()
    insurance_quote = ofm.calculate_launch_insurance(
        payload_value=50000000.0, # $50M payload
        provider="SpaceX",
        orbit_type="LEO"
    )
    print(f"Space Launch Insurance Quote:\n{insurance_quote}")
    
    index_data = ofm.get_space_economy_index()
    print(f"\nSpace Economy Index Tracker:\n{index_data}")
