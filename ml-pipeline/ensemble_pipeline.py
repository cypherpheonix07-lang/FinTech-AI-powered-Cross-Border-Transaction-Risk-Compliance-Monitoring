import json
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("EnsemblePipeline")

class EnsembleScorer:
    """
    Simulates the weights used in the multi-stage ensemble pipeline.
    Useful for offline evaluation of risk scoring logic.
    """
    RAW_WEIGHT = 0.4
    GRAPH_WEIGHT = 0.6

    @classmethod
    def calculate_final_score(cls, raw_score: float, graph_score: float) -> int:
        """
        Unifies raw metadata score and graph feature score.
        """
        weighted_sum = (raw_score * cls.RAW_WEIGHT) + (graph_score * cls.GRAPH_WEIGHT)
        return int(weighted_sum * 100)

    @classmethod
    def get_risk_level(cls, final_score: int) -> str:
        if final_score >= 80: return "CRITICAL"
        if final_score >= 60: return "HIGH"
        if final_score >= 30: return "MEDIUM"
        return "LOW"

def run_simulation():
    test_cases = [
        {"name": "Low Risk Normal", "raw": 0.1, "graph": 0.1},
        {"name": "High Amount Only", "raw": 0.8, "graph": 0.2},
        {"name": "Graph Ring Only", "raw": 0.2, "graph": 1.0},
        {"name": "Compound Fraud", "raw": 0.9, "graph": 0.9},
    ]

    print("\n--- Ensemble Pipeline Simulation ---")
    print(f"{'Case Name':<20} | {'Raw':<5} | {'Graph':<5} | {'Final':<5} | {'Level':<10}")
    print("-" * 60)

    for case in test_cases:
        final = EnsembleScorer.calculate_final_score(case["raw"], case["graph"])
        level = EnsembleScorer.get_risk_level(final)
        print(f"{case['name']:<20} | {case['raw']:<5} | {case['graph']:<5} | {final:<5} | {level:<10}")

if __name__ == "__main__":
    run_simulation()
