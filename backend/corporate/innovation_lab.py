"""
Innovation Lab & Experimentation Platform
Simulates a sandbox environment for A/B testing financial logic and UX flows before production deployment.
"""
from typing import Dict, Any
import random

class InnovationLab:
    """
    Manages synthetic A/B testing and algorithmic experiment routing.
    """
    def __init__(self):
        self.active_experiments = {}
        
    def start_experiment(self, experiment_id: str, hypothesis: str, variants: list) -> Dict[str, Any]:
        """
        Initializes a new simulated A/B test on production traffic.
        """
        self.active_experiments[experiment_id] = {
            "hypothesis": hypothesis,
            "variants": {v: {"traffic_allocation_pct": 100/len(variants), "conversion_rate": 0.0} for v in variants},
            "status": "RUNNING",
            "total_simulated_events": 0
        }
        return {"status": "SUCCESS", "message": f"Experiment {experiment_id} launched across {len(variants)} variants."}

    def simulate_results(self, experiment_id: str, sample_size: int = 10000) -> Dict[str, Any]:
        """
        Fast-forwards the experiment to generate statistical results.
        """
        if experiment_id not in self.active_experiments:
            return {"error": "Experiment not found."}
            
        exp = self.active_experiments[experiment_id]
        exp["total_simulated_events"] = sample_size
        
        best_variant = None
        best_cr = 0.0
        
        for v_name, v_data in exp["variants"].items():
            # Inject simulated random conversion rates between 2% and 8%
            cr = random.uniform(2.0, 8.0)
            v_data["conversion_rate"] = round(cr, 2)
            if cr > best_cr:
                best_cr = cr
                best_variant = v_name
                
        exp["status"] = "CONCLUDED"
        exp["winner"] = best_variant
        
        return exp

if __name__ == "__main__":
    lab = InnovationLab()
    lab.start_experiment("EXP_CHECKOUT_FLOW", "Does 1-click crypto payment improve conversion?", ["Control", "1-Click-Crypto", "QR-Code-Only"])
    print(lab.simulate_results("EXP_CHECKOUT_FLOW"))
