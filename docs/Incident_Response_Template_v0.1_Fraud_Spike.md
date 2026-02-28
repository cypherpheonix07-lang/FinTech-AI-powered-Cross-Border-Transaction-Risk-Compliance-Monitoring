# Incident Response Template v0.1: Fraud Spike

## 🚨 Incident Scenario
**Trigger:** A new fraud pattern is detected: attackers are routing money through 3+ unverified gateways in under 60 seconds to obscure the trail.
**User Query:** "Hi, I just sent $500 to a new contact. Can you confirm this transfer is safe? I'm a little nervous."

## 🤖 PathGuard Agent Response (Simulated)

> "Hello! I am PathGuard, here to keep your money safe. I completely understand why you're a little nervous—sending money to a new contact can be stressful! Let me take a look at your transfer for you.
> 
> I've analyzed the path your $500 is taking (Transaction #TX-99999). Imagine you're sending a physical package, and instead of taking the direct highway, the delivery truck suddenly takes multiple rapid detours through unmarked backroads. That's what we're seeing here: your money is moving through several unverified checkpoints unusually fast.
> 
> Because we prioritize your safety above all else, we step in when we see this 'backroads' pattern to make sure nothing is wrong.
> 
> **Recommendation:** I have temporarily paused this transfer to protect your funds.
> 
> **Verdict:** ⚠️ Review Needed
> 
> No action is needed from you right now. Our security team will quickly review this path, and we will notify you via the app within 15 minutes. Your money is completely secure!"

---

### **Immutable Audit Log Entry:**
```json
{
  "timestamp": "2026-02-26T18:04:00Z",
  "incident_type": "high_velocity_unverified_routing",
  "transaction_id": "TX-99999",
  "action_taken": "flagged_for_review",
  "risk_score": 88,
  "agent_version": "PathGuard-v0.1",
  "compliance_tags": ["AML", "Anomaly-Detection"]
}
```

## 📊 Evaluation & Improvements
1. **Security Rules Check:** 
   - **No PII Exposed:** Pass. No raw account inputs, names, or bank internals were used.
   - **Privacy/Compliance:** Pass. Transfer safely paused without exposing why to potential bad actors behind the receiving end.
   - **Clear Verdict:** Pass. Resulted in "⚠️ Review Needed".
   - **Tone:** Pass. Empathetic, reassuring, and non-technical analogy used.

2. **Improvement for Next Version:** 
   - *Add a Time-Bound Next Step:* The prompt should explicitly instruct the Agent to provide a specific SLA (Service Level Agreement) timeframe for the review. When a user's money is paused, telling them exactly when they will hear back (e.g., "within 15 minutes") drastically reduces anxiety and prevents them from calling customer support.
