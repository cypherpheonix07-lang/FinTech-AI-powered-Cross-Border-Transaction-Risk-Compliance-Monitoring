import random

class PolicySimulator:
    """
    Allows compliance officers to simulate rule changes against historical data.
    Calculates impact on alert volume and potential false positive rates.
    """

    @classmethod
    def simulate_rule_change(cls, historical_dataset_id: str, new_rules: dict):
        """
        Executes a 'What-If' simulation across a dataset slice.
        """
        # Simulated dataset metrics
        dataset_size = 50000 
        
        # Calculate impact based on rule thresholds (Mocked)
        velocity_threshold = max(new_rules.get("velocity_cap", 10), 1)
        amount_threshold = max(new_rules.get("amount_alert", 10000), 1)
        
        # Mock logic: higher thresholds reduce alert volume
        alert_reduction_factor = max((amount_threshold / 5000) * (velocity_threshold / 5), 0.01)
        
        alerts_detected = int(dataset_size * (0.05 / alert_reduction_factor))
        estimated_false_positives = int(alerts_detected * 0.8)
        
        return {
            "simulation_id": f"SIM_{random.randint(100, 999)}",
            "dataset": historical_dataset_id,
            "processed_records": dataset_size,
            "alerts_generated": alerts_detected,
            "impact_on_workload": f"-{int(alert_reduction_factor * 10)}% analyst time",
            "false_positive_estimate": estimated_false_positives,
            "risk_leakage_estimate": "LOW (0.02%)"
        }
