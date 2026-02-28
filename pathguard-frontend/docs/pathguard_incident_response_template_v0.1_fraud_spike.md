# Incident Response Template v0.1: Fraud Spike

## Incident Scenario
A new fraud pattern is detected: attackers are routing money through 3+ unverified gateways in under 60 seconds to obscure the trail.

## Analysis Summary (Simulation)
- **Transaction ID**: #TX-99999
- **Detected Pattern**: Fast Layering (Multiple hops in short latency)
- **Risk Score**: 88/100

## User Communication Plan (PathGuard Tone)
"Hi there! I’m **PathGuard**, your AI security partner. I noticed your transfer is taking an unusual path—it looks like a 'Hidden Maze'. We've temporarily paused it for a quick human safety check to ensure your funds reach exactly who you intended for, without any interference."

## Recommendation
- **Action**: Flag for Human Review / Temporary Hold
- **Verdict**: ⚠️ Review Needed

## Immutable Log Entry Schema
```json
{
  "timestamp": "ISO-8601",
  "transaction_id": "STRING",
  "event_type": "FRAUD_PATTERN_MATCH",
  "pattern_id": "FAST_LAYERING_V4",
  "indicators": {
    "gateway_hops": "INT",
    "hop_latency_ms": "INT",
    "verification_status": "STRING"
  },
  "risk_score": "INT (0-100)",
  "action_taken": "STRING",
  "regulatory_flag": "STRING",
  "audit_hash": "HEX_STRING"
}
```
