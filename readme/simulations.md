# PathGuard Security Simulations: Chaos Engineering

To ensure the resilience of the PathGuard Sentinel, we perform regular "Chaos Engineering" simulations. These scenarios test our automated response to adversarial attacks and infrastructure failures.

## 🌪️ Scenario 1: The "Flash-Fraud" Spike
- **Trigger**: 50x increase in transaction velocity from a specific geographical region within 60 seconds.
- **Sentinel Response**:
  1. **Identify**: AI Sentinel detects "Smurfing" (many small transfers) patterns.
  2. **Isolate**: Automatically throttles the specific Regional Gateway without affecting global traffic.
  3. **Escalate**: Generates a high-priority "Fraud Alert" in the Admin Sentinel Desk for human review.

## 🏦 Scenario 2: The Intermediary Bank Outage
- **Trigger**: Bank B (a major partner in the transfer path) experiences a complete technical failure.
- **Sentinel Response**:
  1. **Detection**: PathGuard monitors for TCP timeouts or 5xx errors on the Bank B API.
  2. **Auto-Rerouting**: Sentinel logic suggests an alternative "Verified Path" through Bank C.
  3. **User Sync**: Mobile app pushes a notification: *"PathGuard is rerouting your transfer to avoid a known bank outage. Your funds remain 100% secure."*

## 🛡️ Scenario 3: Database Ransomware Simulation
- **Trigger**: Unauthorized root access attempted on the main PostgreSQL node.
- **Sentinel Response**:
  1. **Kill-Switch**: Kubernetes runtime security (Falco) detects an unauthorized shell and immediately kills the pod.
  2. **Data Guard**: Because all PII is AES-256 encrypted *at the application layer*, any exfiltrated raw data is useless noise to the attacker.
  3. **Recovery**: Immutable WORM (Write Once Read Many) backups in S3 ensure the database can be restored to a 5-minute-old known-good state.

---

## 🧪 QA Testing Protocol
All developers must run the following simulation command before pushing to production:
```bash
# Simulate a fraud spike in the dev environment
pathguard-cli simulation --type fraud-spike --amplitude 50 --duration 1m
```
