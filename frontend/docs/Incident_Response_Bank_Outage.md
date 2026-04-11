# Incident Response Simulation: Bank Outage

## 1. User-Facing Message (App UI)

> **"Hi there! I am PathGuard, keeping an eye on your transfer.**
> 
> **I wanted to give you a quick update on your $200 transfer. The main route we normally use through 'Bank B' is currently experiencing a roadblock (like a highway closure). Because of this, transactions going that way are stuck right now.**
> 
> **To get your money safely to its destination, I've found two verified alternative routes:**
> 
> *   **Option 1 (Fast Route):** Delivers in 10 minutes, but costs an extra $1.50 in routing fees.
> *   **Option 2 (Economy Route):** Delivers tomorrow morning, with no extra fees at all.
> 
> **Since both paths are fully verified and safe, it's completely up to you! Which detour would you like me to take, or would you prefer I hold the transfer until Bank B reopens?"**
> 
> **Status:** 🟡 Waiting User Confirmation

---

## 2. Internal Decision Log (audit_logs table JSON format)

```json
{
  "transaction_id": "tx_20260227_0001",
  "action": "flag_incident_bank_outage",
  "actor_id": "ai_agent_pathguard",
  "timestamp": "2026-02-27T07:35:00Z",
  "details": {
    "detection": "API Health Check Failure: Bank B",
    "trigger_event": "Transfer routing blocked. User intervention required.",
    "proposed_paths": [
      {"path_id": "path_A_express", "risk_score": "low", "estimated_time": "10m", "fee": "$1.50"},
      {"path_id": "path_B_standard", "risk_score": "low", "estimated_time": "12h", "fee": "$0.00"}
    ]
  },
  "previous_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "current_hash": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
}
```

---

## 3. Reflection: Why Seek User Consent?
In finance, predictability is a security feature. Auto-switching paths without consent—even with the best intentions—violates trust and complicates fee structures. If an AI automatically chooses "Path A" and charges the user an extra $1.50 they didn't agree to, it creates friction. Conversely, if it auto-chooses "Path B" and a critical bill payment is late, the user blames the system. 

By pausing the transaction and clearly explaining the "roadblock" analogy, PathGuard reinforces its role as an **advisor and protector**, placing the final financial decision safely in the user's hands.
