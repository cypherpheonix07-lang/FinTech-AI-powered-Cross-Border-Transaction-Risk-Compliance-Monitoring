# 🌪️ PathGuard: Incident Response Protocols
## *Resilience in the Face of Opaque Risks*

PathGuard is built for the unexpected. Our AI Sentinel (PathGuard Agent) doesn't just watch; it reacts, reroutes, and resolves.

---

### 🚨 1. The Response Framework
When the Sentinel detects an anomaly, it follows a strict 3-step escalation protocol:

#### Step 1: Detection & Isolation
- **Fraud Spike**: Immediate throttling of high-velocity transactions matching the fraud signature.
- **Bank Outage**: Automatic detection of API health check failures or timeout spikes at intermediary hops.

#### Step 2: Analysis & Translation
- The Sentinel calculates the risk and identifies "Self-Healing" alternatives.
- Complex technical errors are translated into **Plain English** for the end-user (e.g., "Bank B has a highway closure").

#### Step 3: User-Directed Resolution
PathGuard *never* auto-reroutes fees or delayed paths without explicit consent. 
> "Predictability is a security feature."

---

### 🏢 2. Scenario Workflows

| Scenario | Sentinel Action | User Action Required |
| :--- | :--- | :--- |
| **Bank Outage** | Identify alternative verified paths. | Choose: Fast (Extra Fee) vs. Standard (Delay). |
| **Fraud Spike** | Flag transaction for manual investigator review. | Confirm transaction purpose via 2FA. |
| **Regulatory Lock** | Pause transaction at the last safe hop. | Provide additional KYC documents if requested. |
| **Network Chaos** | Switch to "Disaster Mode" (vetted corridors). | None (Platform-wide resilience). |

---

### 📝 3. Immutable Incident Logs
Every incident and the subsequent resolution (choice made by the user/admin) is recorded in the `audit_ledger` with a cryptographic link to the original transaction. This ensures that even in chaos, the chain of trust remains unbroken.

---

### 🛡️ 4. BCP & Disaster Recovery
- **RTO (Recovery Time Objective)**: < 15 minutes for core routing logic.
- **Global Geo-Redundancy**: PathGuard relays are distributed across three independent cloud zones.

---

[Back to Main README](../README.md) | [Architecture](architecture.md) | [Roadmap](roadmap.md)
