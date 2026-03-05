"""
Advanced Tax Optimization & Strategy
Simulates international tax liability calculations and algorithmic tax-loss harvesting.
"""
from typing import Dict, Any, List
import random

class TaxStrategyEngine:
    """
    Simulates cross-border tax scenarios to recommend the most efficient routing.
    """
    def __init__(self):
        # Simulated corporate tax rates by jurisdiction
        self.jurisdiction_rates = {
            "US_DE": 0.087, # Delaware state (simplified)
            "IE": 0.125,    # Ireland
            "SG": 0.170,    # Singapore
            "KY": 0.000,    # Cayman Islands
            "BVI": 0.000,   # British Virgin Islands
            "UK": 0.250     # United Kingdom
        }

    def simulate_routing_tax_impact(self, principal_amount_usd: float, origin: str, destinations: List[str]) -> Dict[str, Any]:
        """
        Estimates the tax drag on moving capital through various international corporate structures.
        """
        scenarios = []
        
        # Scenario 1: Direct Transfer
        direct_tax_rate = self.jurisdiction_rates.get(origin, 0.20)
        direct_tax_owed = principal_amount_usd * direct_tax_rate
        scenarios.append({
            "strategy_name": f"Direct Repatriation ({origin})",
            "effective_tax_rate_pct": round(direct_tax_rate * 100, 2),
            "estimated_tax_owed_usd": round(direct_tax_owed, 2),
            "net_capital_retained_usd": round(principal_amount_usd - direct_tax_owed, 2),
            "complexity_level": "LOW",
            "risk_profile": "CONSERVATIVE"
        })

        # Scenario 2: Double Irish with a Dutch Sandwich (Simplified Simulation)
        if "IE" in destinations or "KY" in destinations:
             complex_rate = 0.045 # Highly optimized
             complex_tax_owed = principal_amount_usd * complex_rate
             scenarios.append({
                "strategy_name": "IP Licensing via Irish/Cayman Subsidiary",
                "effective_tax_rate_pct": round(complex_rate * 100, 2),
                "estimated_tax_owed_usd": round(complex_tax_owed, 2),
                "net_capital_retained_usd": round(principal_amount_usd - complex_tax_owed, 2),
                "complexity_level": "HIGH",
                "risk_profile": "AGGRESSIVE"
             })
             
        # Scenario 3: Singapore Holding Company
        if "SG" in destinations:
             sg_rate = 0.085 # Factoring in tax incentives
             sg_tax_owed = principal_amount_usd * sg_rate
             scenarios.append({
                "strategy_name": "Singapore Regional Holding Structuring",
                "effective_tax_rate_pct": round(sg_rate * 100, 2),
                "estimated_tax_owed_usd": round(sg_tax_owed, 2),
                "net_capital_retained_usd": round(principal_amount_usd - sg_tax_owed, 2),
                "complexity_level": "MODERATE",
                "risk_profile": "BALANCED"
             })

        # Sort by retained capital
        scenarios.sort(key=lambda x: x["net_capital_retained_usd"], reverse=True)
        recommended = scenarios[0]

        return {
            "initial_capital_usd": principal_amount_usd,
            "origin_jurisdiction": origin,
            "considered_destinations": destinations,
            "recommended_strategy": recommended["strategy_name"],
            "potential_tax_savings_usd": round(direct_tax_owed - recommended["estimated_tax_owed_usd"], 2),
            "simulation_scenarios": scenarios
        }

    def calculate_tax_loss_harvesting(self, portfolio: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Identifies losing positions to sell to offset capital gains.
        """
        realized_gains_ytd = 150000.0 # Mock $150k in gains already taken
        
        harvestable_losses = 0.0
        recommended_trades = []
        
        for asset in portfolio:
            cost_basis = asset["avg_cost"] * asset["shares"]
            current_value = asset["current_price"] * asset["shares"]
            unrealized_pnl = current_value - cost_basis
            
            if unrealized_pnl < -1000.0: # Material loss
                harvestable_losses += abs(unrealized_pnl)
                recommended_trades.append({
                    "ticker": asset["ticker"],
                    "action": "SELL",
                    "shares": asset["shares"],
                    "estimated_loss_harvested_usd": round(abs(unrealized_pnl), 2),
                    "replacement_asset": f"{asset['ticker']}_PROXY_ETF" # Avoid wash sale
                })
                
        tax_rate = 0.20 # Assume 20% cap gains
        tax_savings = harvestable_losses * tax_rate
        
        return {
            "current_ytd_gains_usd": realized_gains_ytd,
            "total_harvestable_losses_usd": round(harvestable_losses, 2),
            "estimated_tax_savings_usd": round(tax_savings, 2),
            "adjusted_net_gains_usd": max(0, realized_gains_ytd - harvestable_losses),
            "execution_plan": recommended_trades
        }

# For testing
if __name__ == "__main__":
    tax = TaxStrategyEngine()
    
    print("Simulating Repatriation Routing Strategies ($10M):")
    plan = tax.simulate_routing_tax_impact(10000000.0, "US_DE", ["IE", "SG", "KY"])
    print(plan)
    
    print("\nSimulating Tax Loss Harvesting:")
    mock_portfolio = [
        {"ticker": "AAPL", "shares": 1000, "avg_cost": 150, "current_price": 180},
        {"ticker": "SNOW", "shares": 500, "avg_cost": 300, "current_price": 160}, # Losing position
        {"ticker": "TSLA", "shares": 200, "avg_cost": 250, "current_price": 200}  # Losing position
    ]
    harvest = tax.calculate_tax_loss_harvesting(mock_portfolio)
    print(harvest)
