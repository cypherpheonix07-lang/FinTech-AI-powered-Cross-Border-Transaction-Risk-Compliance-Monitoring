"""
Exit Planning & Liquidity Events
Models M&A scenarios, IPO readiness, and secondary market liquidity metrics.
"""
from typing import Dict, Any

class LiquidityEventPlanner:
    """
    Calculates enterprise value and models the financial geometry of an exit event.
    """
    def __init__(self):
        self.financial_metrics = {
            "arr_usd": 45000000.0,
            "ebitda_margin_pct": 18.5,
            "yoy_growth_pct": 85.0
        }
        
    def model_exit_scenarios(self) -> Dict[str, Any]:
        """
        Uses standard SaaS multiples to project exit valuations.
        """
        arr = self.financial_metrics["arr_usd"]
        growth = self.financial_metrics["yoy_growth_pct"]
        
        # Determine ARR Multiple based on growth (Rule of 40 heuristic simulation)
        rule_of_40_score = growth + self.financial_metrics["ebitda_margin_pct"]
        base_multiple = 8.0
        if rule_of_40_score > 100:
            base_multiple = 25.0
        elif rule_of_40_score > 60:
            base_multiple = 15.0
            
        ipo_valuation = arr * base_multiple
        ma_premium = 1.25 # 25% acquisition premium
        ma_valuation = ipo_valuation * ma_premium
        
        return {
            "current_metrics": self.financial_metrics,
            "rule_of_40_score": rule_of_40_score,
            "scenarios": [
                {
                    "type": "IPO (Public Offering)",
                    "estimated_enterprise_value_usd": ipo_valuation,
                    "arr_multiple": base_multiple,
                    "readiness_score": "75/100 (Requires SOX Compliance Audit)"
                },
                {
                    "type": "Strategic M&A",
                    "estimated_enterprise_value_usd": ma_valuation,
                    "arr_multiple": base_multiple * ma_premium,
                    "readiness_score": "90/100 (Highly attractive to Legacy Banks)"
                }
            ]
        }

if __name__ == "__main__":
    planner = LiquidityEventPlanner()
    print("Simulating Exit Scenarios:")
    print(planner.model_exit_scenarios())
