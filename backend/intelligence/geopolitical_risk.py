"""
Geopolitical Risk & Sanctions Intelligence
Provides real-time scoring for country risk, sanctions monitoring, and supply chain disruptions.
"""
from typing import Dict, Any, List
import random
import datetime

class GeopoliticalRiskIntel:
    """
    Simulates checking international sanctions lists (OFAC, UN, EU) and provides 
    geopolitical stability forecasting.
    """
    def __init__(self):
        # Simulated risk profiles for different jurisdictions (0-100, higher is riskier)
        self.jurisdiction_base_risk = {
            "CH": 12, # Switzerland
            "SG": 15, # Singapore
            "US": 25, # United States
            "BR": 55, # Brazil
            "TR": 68, # Turkey
            "RU": 95, # Russia
            "IR": 98, # Iran
            "KP": 99  # North Korea
        }
        
    def _check_sanctions_lists(self, entity_name: str, jurisdiction: str) -> Dict[str, Any]:
        """
        Mocks screening against OFAC, UN, and EU lists.
        """
        is_sanctioned = jurisdiction in ["RU", "IR", "KP"] or "sanctioned" in entity_name.lower()
        
        lists_matched = []
        if is_sanctioned:
            if jurisdiction == "RU": lists_matched = ["OFAC_SDN", "EU_CONSOLIDATED"]
            elif jurisdiction in ["IR", "KP"]: lists_matched = ["OFAC_SDN", "UN_SECURITY_COUNCIL", "EU_CONSOLIDATED"]
            else: lists_matched = ["OFAC_NON_SDN"]
            
        return {
            "entity_name": entity_name,
            "is_sanctioned": is_sanctioned,
            "matched_lists": lists_matched,
            "last_screened": datetime.datetime.now().isoformat()
        }

    def assess_route_risk(self, sender_country: str, receiver_country: str, intermediaries: List[str]) -> Dict[str, Any]:
        """
        Calculates the overall geopolitical risk of a cross-border money transfer route.
        """
        route_countries = [sender_country] + intermediaries + [receiver_country]
        max_risk_seen = 0
        driving_factor = "Stable Route"
        
        sanction_alerts = []
        
        for country in route_countries:
            country_risk = self.jurisdiction_base_risk.get(country, 40) # Default unknown to moderate risk
            
            # Check for sudden geopolitical spikes (simulated)
            volatility_spike = random.uniform(-10, 20)
            current_risk = min(100, max(0, country_risk + volatility_spike))
            
            if current_risk > max_risk_seen:
                max_risk_seen = current_risk
                if current_risk > 85:
                    driving_factor = f"Extreme Volatility/Sanctions in {country}"
                elif current_risk > 60:
                    driving_factor = f"Elevated Political Instability in {country}"
                    
            # Check sanctions
            sanction_check = self._check_sanctions_lists(f"Bank_in_{country}", country)
            if sanction_check["is_sanctioned"]:
                sanction_alerts.append(sanction_check)

        overall_status = "APPROVED"
        if len(sanction_alerts) > 0:
            overall_status = "BLOCKED_SANCTIONS"
        elif max_risk_seen > 80:
            overall_status = "MANUAL_REVIEW_REQUIRED"
            
        return {
            "route_assessed": route_countries,
            "max_geopolitical_risk_score": round(max_risk_seen, 1),
            "primary_risk_driver": driving_factor,
            "sanctions_alerts": sanction_alerts,
            "recommended_action": overall_status,
            "timestamp": datetime.datetime.now().isoformat()
        }

# For testing
if __name__ == "__main__":
    intel = GeopoliticalRiskIntel()
    
    # Safe Route (US -> CH -> SG)
    print("Assessing Safe Route...")
    print(intel.assess_route_risk("US", "SG", ["CH"]))
    
    # Risky Route with Sanctions (US -> TR -> RU)
    print("\nAssessing High-Risk Route...")
    print(intel.assess_route_risk("US", "RU", ["TR"]))
