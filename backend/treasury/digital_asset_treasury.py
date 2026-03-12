"""
Digital Asset & Cryptocurrency Treasury
Simulates enterprise treasury management of major crypto assets (BTC, ETH, Stablecoins).
"""
from typing import Dict, Any, List
import datetime

class DigitalAssetTreasury:
    """
    Manages institutional balances of cryptocurrencies and rebalancing logic.
    """
    def __init__(self):
        self.corporate_balances = {
            "BTC": {"amount": 450.5, "avg_entry_usd": 38000.0, "current_price_usd": 68000.0},
            "ETH": {"amount": 3200.0, "avg_entry_usd": 2100.0, "current_price_usd": 3400.0},
            "USDC": {"amount": 15000000.0, "avg_entry_usd": 1.0, "current_price_usd": 1.0}
        }
        
    def generate_treasury_report(self) -> Dict[str, Any]:
        """
        Calculates total treasury value and unrealized PnL.
        """
        total_value_usd = 0.0
        total_cost_basis = 0.0
        details = []
        
        for asset, data in self.corporate_balances.items():
            value = data["amount"] * data["current_price_usd"]
            cost = data["amount"] * data["avg_entry_usd"]
            pnl = value - cost
            
            total_value_usd += value
            total_cost_basis += cost
            
            details.append({
                "asset": asset,
                "holdings": data["amount"],
                "value_usd": round(value, 2),
                "unrealized_pnl_usd": round(pnl, 2),
                "roi_pct": round((pnl / cost) * 100, 2) if cost > 0 else 0
            })
            
        return {
            "total_treasury_aum_usd": round(total_value_usd, 2),
            "total_unrealized_pnl_usd": round(total_value_usd - total_cost_basis, 2),
            "asset_breakdown": details,
            "security_status": "ENTERPRISE_COLD_STORAGE_MULTISIG",
            "timestamp": datetime.datetime.now().isoformat()
        }

if __name__ == "__main__":
    treasury = DigitalAssetTreasury()
    print("Generating Crypto Treasury Report:")
    print(treasury.generate_treasury_report())
