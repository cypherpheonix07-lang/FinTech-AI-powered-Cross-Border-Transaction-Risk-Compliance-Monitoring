# Incident Response Template v0.1: Fraud Spike

## Agent Identity
**Name:** PathGuard
**Version:** 0.1
**Specialty:** Transparent Money Transfer Security

## Trigger Incident
**Condition:** A new fraud pattern is detected: attackers are routing money through 3+ unverified gateways in under 60 seconds to obscure the trail.

---

## Response Template (Simulation)

### 🕵️ Risk Analysis: The "Hidden Maze" Pattern
"Imagine you’re sending a package across town. Normally, the delivery driver takes the main highway directly to the destination. 

However, for this specific transfer, we noticed the 'driver' tried to take five different back-alleys and changed vehicles three times in less than a minute. In the world of digital finance, we call this **Layering**. It’s a technique sometimes used to hide where money is coming from or going to by moving it through too many 'middle-man' banks too quickly. Because these middle-men haven't been verified by our transparency standards, we can't be 100% sure the path is secure."

### 🛡️ Recommendation: **Flag for Review**
"Because we value your safety above all else, I have temporarily paused this transfer. I'm not blocking it entirely yet, but I've asked one of our human security specialists to double-check those middle-man banks. This is a standard safety 'pit stop' to ensure your $500 reaches exactly who you intended it for, without any interference."

### 📑 Immutable Security Log (Encrypted)
```json
{
  "timestamp": "[ISO-8601-TIMESTAMP]",
  "transaction_id": "[TX-ID]",
  "event_type": "FRAUD_PATTERN_MATCH",
  "pattern_id": "FAST_LAYERING_V4",
  "indicators": {
    "gateway_hops": [INT],
    "hop_latency_ms": [INT],
    "verification_status": "UNVERIFIED_NODES_DETECTED"
  },
  "risk_score": [0-100],
  "action_taken": "TEMPORARY_HOLD_FOR_HUMAN_REVIEW",
  "regulatory_flag": "AMLO_SUSPICIOUS_ACTIVITY_RECAP",
  "audit_hash": "[SHA-256-HASH]"
}
```

**Safety Verdict: ⚠️ Review Needed**

---

## Security & Compliance Rules
1. **Never expose raw data**: No raw account numbers, full names, or internal bank names.
2. **Prioritize Privacy**: Only include necessary metadata in logs.
3. **Regulatory Alignment**: Reference AML/KYC standards (e.g., AMLO Recaps) where applicable.
4. **User Experience**: Maintain a friendly, non-technical tone.

## Suggested Improvements
- **Interactive Verification**: Add a step where the agent asks the user to confirm specific recipient details before escalating.
- **Dynamic Risk Score Display**: Show a visual 'Risk Meter' to the user to contextualize the 'Review Needed' status.
