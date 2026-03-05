"""
Sovereign Wealth & Institutional Integration
Provides macro-level deployment tools for giant tranches of capital (Sovereign Wealth Funds, Central Banks)
"""
from typing import Dict, Any, List
import random
import datetime

class SovereignWealthManager:
    """
    Simulates the allocation and tracing of massive capital deployments, focusing on 
    ESG mandates and geopolitical alignment.
    """
    def __init__(self):
        self.deployment_sectors = ["Green_Infrastructure", "Semiconductor_Fab", "Healthcare_R&D", "Emerging_Markets_Fintech"]
        
        # Simulating live ESG scores and alignment metrics for global projects
        self.active_macro_projects = {
            "PROJ_WIND_NORTH_SEA": {"fund_req": 250000000.0, "esg_score": 92, "geo_alignment": "EU_Allied"},
            "PROJ_CHIP_ACT_US": {"fund_req": 1500000000.0, "esg_score": 75, "geo_alignment": "US_Allied"},
            "PROJ_AFRICA_SOLAR": {"fund_req": 50000000.0, "esg_score": 98, "geo_alignment": "Neutral"},
            "PROJ_LATAM_LITHIUM": {"fund_req": 300000000.0, "esg_score": 60, "geo_alignment": "Neutral"}
        }

    def allocate_tranche(self, fund_id: str, investment_thesis: str, total_capital_usd: float, minimum_esg: int) -> Dict[str, Any]:
        """
        Simulates deploying a large tranche of capital across qualified projects.
        """
        allocations = []
        remaining_capital = total_capital_usd
        
        # Filter projects based on mandate
        qualified_projects = []
        for pid, data in self.active_macro_projects.items():
            if data["esg_score"] >= minimum_esg:
                qualified_projects.append((pid, data))
                
        # Sort by ESG score descending
        qualified_projects.sort(key=lambda x: x[1]["esg_score"], reverse=True)
        
        for pid, pdata in qualified_projects:
            if remaining_capital <= 0:
                break
                
            # Allocate up to the project's requirement or what's left
            allocation_amount = min(pdata["fund_req"], remaining_capital)
            remaining_capital -= allocation_amount
            
            allocations.append({
                "project_id": pid,
                "amount_allocated_usd": allocation_amount,
                "esg_rating_achieved": pdata["esg_score"],
                "geopolitical_exposure": pdata["geo_alignment"],
                "status": "FUNDS_LOCKED_IN_ESCROW"
            })
            
        weighted_esg = 0
        if len(allocations) > 0:
             weight_sum = sum([a["amount_allocated_usd"] * a["esg_rating_achieved"] for a in allocations])
             weighted_esg = weight_sum / (total_capital_usd - remaining_capital)
             
        return {
            "fund_id": fund_id,
            "thesis": investment_thesis,
            "total_authorized_usd": total_capital_usd,
            "total_deployed_usd": total_capital_usd - remaining_capital,
            "capital_unallocated_usd": remaining_capital,
            "portfolio_weighted_esg_score": round(weighted_esg, 1),
            "tranches": allocations,
            "timestamp": datetime.datetime.now().isoformat()
        }

# For testing
if __name__ == "__main__":
    swm = SovereignWealthManager()
    
    # Norwegian Sovereign Wealth Fund deploying $500M with strict ESG
    print("Simulating Sovereign Wealth Allocation ($500M, Min ESG 90):")
    deployment = swm.allocate_tranche("NORWAY_SWF_01", "Global Renewables Push", 500000000.0, 90)
    print(deployment)
    
    # Tech focused fund deploying $2B
    print("\nSimulating Tech Sovereign Allocation ($2B, Min ESG 50):")
    tech_deployment = swm.allocate_tranche("TECH_VISION_FUND", "Supply Chain Resilience", 2000000000.0, 50)
    print(tech_deployment)
