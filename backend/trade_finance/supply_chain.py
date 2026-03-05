"""
Supply Chain & Trade Finance
Provides automated invoice factoring, letters of credit (LoC), and trade insurance APIs.
"""
from typing import Dict, Any
import random

class TradeFinanceEngine:
    """
    Automates supply chain financing concepts, particularly focusing on
    factoring rates and smart-contract based Letters of Credit.
    """
    def __init__(self):
        # Simulated basis points (bps) for factoring based on buyer credit rating
        self.factoring_rates_bps = {
            "AAA": 150, # 1.5%
            "AA": 200,  # 2.0%
            "A": 350,   # 3.5%
            "BBB": 500, # 5.0%
            "BB": 850   # 8.5%
        }

    def quote_invoice_factoring(self, invoice_id: str, face_value: float, buyer_rating: str, days_to_maturity: int) -> Dict[str, Any]:
        """
        Provides a quote to purchase accounts receivable (factoring) at a discount.
        """
        if buyer_rating not in self.factoring_rates_bps:
            return {"status": "DECLINED", "reason": f"Buyer credit rating {buyer_rating} does not meet minimum underwriting standards."}
            
        # Annualized rate divided by days
        annual_rate = self.factoring_rates_bps[buyer_rating] / 10000.0
        term_rate = annual_rate * (days_to_maturity / 365.0)
        
        # Add a small flat processing fee
        processing_fee = face_value * 0.005 
        
        total_discount = (face_value * term_rate) + processing_fee
        advance_amount = face_value - total_discount
        
        return {
            "invoice_id": invoice_id,
            "face_value_usd": face_value,
            "buyer_rating": buyer_rating,
            "days_to_maturity": days_to_maturity,
            "discount_rate_applied": round(term_rate * 100, 3), # as percentage
            "total_fee_usd": round(total_discount, 2),
            "advance_amount_usd": round(advance_amount, 2),
            "effective_apr": round(annual_rate * 100, 2),
            "status": "APPROVED_FOR_FUNDING"
        }

    def generate_smart_loc(self, buyer: str, seller: str, amount: float, conditions: list) -> Dict[str, Any]:
        """
        Simulates the generation of a Smart Contract Letter of Credit.
        """
        contract_id = f"LOC_{random.randint(100000,999999)}"
        
        return {
            "loc_id": contract_id,
            "buyer": buyer,
            "seller": seller,
            "guaranteed_amount_usd": amount,
            "conditions_precedent": conditions,
            "status": "DRAFTED",
            "required_oracles": ["Bill_of_Lading_API", "Customs_Clearance_API"]
        }

# For testing
if __name__ == "__main__":
    tfe = TradeFinanceEngine()
    
    # Factor a $120k invoice due in 60 days from a AA-rated buyer
    quote = tfe.quote_invoice_factoring("INV-9942", 120000.0, "AA", 60)
    print("Invoice Factoring Quote:")
    print(quote)
    
    # Generate an LoC
    loc = tfe.generate_smart_loc(
        buyer="GlobalTech_Corp", 
        seller="Shenzhen_Manufacturing", 
        amount=550000.0,
        conditions=["Goods loaded on vessel", "Export customs cleared"]
    )
    print("\nSmart Letter of Credit:")
    print(loc)
