import random
import uuid
import json
import csv
from datetime import datetime, timedelta

class SyntheticDataFactory:
    """
    Generates parameterized adversarial payment patterns for load testing and training.
    Scenarios: 'MULE', 'SIPHON', 'LAYERING', 'BENIGN'
    """
    
    def generate_scenario(self, scenario: str, n: int = 100, tenant_id: str = "T1"):
        records = []
        start_time = datetime.now() - timedelta(days=1)
        
        for i in range(n):
            tx_id = f"SYN_{uuid.uuid4().hex[:8]}"
            ts = (start_time + timedelta(seconds=i*30)).isoformat()
            
            if scenario == "MULE":
                # High velocity, small fixed amounts, same beneficiary
                amount = 499.00
                beneficiary = "BENEFICIARY_MULE_HUB"
            elif scenario == "SIPHON":
                # Large outliers, high-risk jurisdiction
                amount = random.uniform(50000, 500000)
                beneficiary = f"CONDUIT_{random.randint(1,10)}"
            else:
                amount = random.uniform(10, 5000)
                beneficiary = f"ACC_{random.randint(100,200)}"
                
            records.append({
                "id": tx_id,
                "ts": ts,
                "amount": round(amount, 2),
                "currency": "USD",
                "beneficiary": beneficiary,
                "tenant_id": tenant_id,
                "scenario_tag": scenario
            })
            
        return records

    def export_csv(self, records, filename="synthetic_transactions.csv"):
        keys = records[0].keys()
        with open(filename, 'w', newline='') as f:
            dict_writer = csv.DictWriter(f, fieldnames=keys)
            dict_writer.writeheader()
            dict_writer.writerows(records)
        return filename

if __name__ == "__main__":
    factory = SyntheticDataFactory()
    data = factory.generate_scenario("MULE", n=500)
    out = factory.export_csv(data)
    print(f"[SUCCESS] Synthetic scenario 'MULE' exported to {out}")
