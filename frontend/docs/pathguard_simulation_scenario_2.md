# PathGuard Security Simulation: Scenario 2

## Threat Scenario: The Insider Threat (Rogue Admin)
**Attacker Goal:** A disgruntled Senior Support Agent with access to the Admin Dashboard attempts to alter a user's transfer, redirecting a $50,000 corporate payment to their own offshore account, and then tries to delete the logs to cover their tracks.

---

## The Attack Execution
1. **The Setup:** The rogue employee, "Agent Mallory," logs into the Admin Dashboard from their corporate laptop.
2. **The Override:** Mallory finds a pending $50,000 transfer in the queue. They use their support privileges to attempt to edit the `recipient_account_uuid` field, changing it to their own wallet address.
3. **The Cover-Up:** After hitting "Save," Mallory attempts to navigate to the `/admin/logs` endpoint to delete the record of their change.

---

## How PathGuard Defends It (The 5 Layers in Action)

### Defense 1: Authentication & Authorization (RBAC)
When Mallory tries to edit the `recipient_account_uuid`, the backend Authorization middleware intercepts the request.
- The system checks Mallory's OAuth2 JWT token. It sees their role is `Role: Support_Tier_2`.
- The strict **Role-Based Access Control (RBAC)** rules state that only `Role: SuperAdmin` can edit pending transfer destinations. 
- The API immediately returns a `403 Forbidden`. **The redirect fails.**

### Defense 2: Transaction Integrity (Cryptographic Signing)
Let's pretend Mallory *was* a `SuperAdmin` and making this change was technically allowed by their role.
- Before the system accepts the change, the Admin Dashboard requires Mallory to plug in their YubiKey (Hardware MFA) to **cryptographically sign** the override action.
- Mallory signs it. The system now has mathematical proof that Mallory—and *only* Mallory—authorized this exact change.

### Defense 3: Compliance & Governance (Immutable Audit Logs)
Mallory realizes they've made a mistake and attempts to delete the log of their action (whether it was the 403 Forbidden attempt, or the signed SuperAdmin override).
- Mallory sends a `DELETE /admin/logs/transaction_789` request.
- The PathGuard database architecture routes all logs to a **WORM (Write-Once-Read-Many)** storage ledger (like AWS QLDB).
- The WORM ledger physically prohibits `UPDATE` and `DELETE` commands at the storage level, even if the database root user issues them.
- Mallory cannot erase the evidence. **The cover-up fails.**

---

## 🏁 Safety Verdict
❌ **Attack Blocked.** 
The rogue employee is thwarted by strict RBAC constraints. Even if they had the highest privileges, the Hardware MFA signature guarantees non-repudiation (they can't say "I was hacked"), and the Immutable Ledger ensures the evidence is permanently recorded for HR and law enforcement.

---

**Analogy:** "A rogue bank teller tries to walk into the main vault to change a shipping label on a gold bar. First, their ID badge simply doesn't unlock that specific door (RBAC). If they were the vault manager and could open the door, they'd have to use their personal wax seal on the new label (Signature). Finally, when they try to erase the security footage showing them in the vault, they realize the camera feeds directly to an indestructible black box at police headquarters (Immutable Logs)."
