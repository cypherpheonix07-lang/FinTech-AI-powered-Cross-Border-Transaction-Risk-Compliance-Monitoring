"""
Brain-Computer Interface (BCI) Banking
Simulates neural authentication, emotion-aware spending alerts, 
and cognitive load-based fraud detection.
"""
from typing import Dict, Any, List
import random
import time

class NeuralAuthSimulator:
    """
    Simulates the integration of BCI hardware for high-security financial transactions.
    """
    def __init__(self):
        self.device_connected = True
        self.device_type = "Simulated_fNIRS_Headband_v2"
        self.baseline_established = True
        
        # Simulated cognitive state boundaries
        self.thresholds = {
            "max_cognitive_load": 0.85, # 0.0 to 1.0
            "min_focus_required": 0.60,
            "max_stress_indicator": 0.70
        }

    def _read_neural_state(self) -> Dict[str, float]:
        """
        Polls the (mock) BCI device for current cognitive metrics.
        """
        # Introduce slight artificial delay to mock physical read
        time.sleep(0.1)
        
        return {
            "cognitive_load": round(random.uniform(0.4, 0.95), 2),
            "focus_level": round(random.uniform(0.5, 0.99), 2),
            "stress_indicator": round(random.uniform(0.2, 0.85), 2),
            "decision_fatigue": round(random.uniform(0.1, 0.8), 2)
        }

    def authorize_transaction(self, user_id: str, amount: float, recipient: str) -> Dict[str, Any]:
        """
        Evaluates the user's current cognitive state before approving a transfer.
        Prevents transactions under severe stress, coercion, or intoxication.
        """
        if not self.device_connected:
            return {"status": "FAILED", "reason": "BCI device not detected."}
            
        neural_state = self._read_neural_state()
        
        # 1. Check for extreme stress (potential coercion/duress)
        if neural_state["stress_indicator"] > self.thresholds["max_stress_indicator"]:
            return {
                "status": "DENIED",
                "reason": "Elevated stress detected. Potential duress. Transfer locked.",
                "metrics": neural_state
            }
            
        # 2. Check for high cognitive load or decision fatigue (potential confusion/phishing)
        if neural_state["cognitive_load"] > self.thresholds["max_cognitive_load"] or neural_state["decision_fatigue"] > 0.75:
            # If the amount is high and the user is confused, require classical 2FA fallback
            if amount > 1000:
                return {
                    "status": "FALLBACK_REQUIRED",
                    "reason": "High cognitive load detected for large transfer. Please use hardware key.",
                    "metrics": neural_state
                }
                
        # 3. Check for lack of focus (accidental transfer)
        if neural_state["focus_level"] < self.thresholds["min_focus_required"]:
             return {
                "status": "DENIED",
                "reason": "Insufficient mental focus on transaction. Please concentrate and try again.",
                "metrics": neural_state
            }
            
        # If all checks pass, generate a neural footprint signature
        neural_signature = f"bci_sig_{hash(f'{user_id}{amount}{neural_state}')}"
        
        return {
            "status": "APPROVED",
            "transaction_hash": f"tx_{random.randint(100000, 999999)}",
            "neural_signature": neural_signature,
            "metrics": neural_state
        }

# For testing
if __name__ == "__main__":
    bci = NeuralAuthSimulator()
    print("Initiating Thought-Based Transfer of $5,000...")
    
    # Run a few times to show different simulated cognitive states
    for i in range(3):
        print(f"\nAttempt {i+1}:")
        result = bci.authorize_transaction("user_77xyz", 5000.00, "recipient_account_99")
        print(result)
