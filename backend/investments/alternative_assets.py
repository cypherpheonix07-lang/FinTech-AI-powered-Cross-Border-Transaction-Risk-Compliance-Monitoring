"""
Alternative Investments Platform
Manages fractional ownership in fine art, vintage collectibles, and illiquid assets.
"""
from typing import Dict, Any, List
import random
import datetime

class AlternativeAssetsTracker:
    """
    Simulates the tracking and valuation of non-standard asset classes.
    """
    def __init__(self):
        self.asset_classes = ["Fine_Art", "Vintage_Wine", "Classic_Cars", "Rare_Collectibles", "IP_Royalties"]
        
        # Mock database of fractional assets
        self.mock_market_assets = [
            {
                "asset_id": "ALT_ART_001",
                "class": "Fine_Art",
                "name": "Untitled (1982) - Basquiat (Fractional)",
                "total_valuation_usd": 110500000.0,
                "shares_outstanding": 1000000,
                "current_price_per_share": 110.50,
                "historical_return_1y": 14.2
            },
            {
                "asset_id": "ALT_CAR_042",
                "class": "Classic_Cars",
                "name": "1962 Ferrari 250 GTO (Fractional)",
                "total_valuation_usd": 48400000.0,
                "shares_outstanding": 100000,
                "current_price_per_share": 484.00,
                "historical_return_1y": 8.5
            },
            {
                "asset_id": "ALT_IP_771",
                "class": "IP_Royalties",
                "name": "Catalog: 80s Rock Anthems Vol 1",
                "total_valuation_usd": 15000000.0,
                "shares_outstanding": 50000,
                "current_price_per_share": 300.00,
                "historical_return_1y": 11.1,
                "dividend_yield_pct": 5.4
            }
        ]

    def get_market_overview(self) -> List[Dict[str, Any]]:
        """
        Returns the current state of available alternative assets.
        """
        # Add some simulated market noise to the current prices
        updated_assets = []
        for asset in self.mock_market_assets:
            volatility = random.uniform(-0.02, 0.02) # +/- 2% daily move
            new_price = asset["current_price_per_share"] * (1 + volatility)
            
            asset_copy = asset.copy()
            asset_copy["current_price_per_share"] = round(new_price, 2)
            asset_copy["daily_change_pct"] = round(volatility * 100, 2)
            updated_assets.append(asset_copy)
            
        return updated_assets

    def calculate_portfolio_value(self, user_holdings: Dict[str, int]) -> Dict[str, Any]:
        """
        Calculates the value of a user's alternative investment portfolio.
        user_holdings: { "asset_id": number_of_shares }
        """
        current_market = {a["asset_id"]: (a["current_price_per_share"], a["name"], a["class"]) for a in self.get_market_overview()}
        
        total_value = 0.0
        detailed_holdings = []
        
        for asset_id, shares in user_holdings.items():
            if asset_id in current_market:
                price, name, cls = current_market[asset_id]
                position_value = shares * price
                total_value += position_value
                
                detailed_holdings.append({
                    "asset_id": asset_id,
                    "name": name,
                    "class": cls,
                    "shares": shares,
                    "current_price": price,
                    "position_value_usd": round(position_value, 2)
                })
                
        # Calculate diversification score
        classes_held = len(set([h["class"] for h in detailed_holdings]))
        div_score = min(100, (classes_held / len(self.asset_classes)) * 100)
                
        return {
            "total_portfolio_value_usd": round(total_value, 2),
            "asset_count": len(detailed_holdings),
            "diversification_score": round(div_score, 1),
            "holdings": detailed_holdings,
            "timestamp": datetime.datetime.now().isoformat()
        }

# For testing
if __name__ == "__main__":
    tracker = AlternativeAssetsTracker()
    
    print("Alternative Market Overview:")
    market = tracker.get_market_overview()
    for item in market:
        print(f"[{item['class']}] {item['name']}: ${item['current_price_per_share']} ({item['daily_change_pct']}%)")
        
    print("\nUser Portfolio Valuation:")
    user_portfolio = {
        "ALT_ART_001": 50, # 50 shares of Basquiat
        "ALT_IP_771": 150  # 150 shares of Music Royalties
    }
    valuation = tracker.calculate_portfolio_value(user_portfolio)
    print(valuation)
