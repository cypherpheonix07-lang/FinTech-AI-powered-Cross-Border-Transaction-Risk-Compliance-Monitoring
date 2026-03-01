# PathGuard Database Architecture: Institutional Ledger

PathGuard's data layer is designed for **High-Integrity Financial Auditing**. We employ a Merkle-Chained Audit Ledger to ensure that no transaction hop or administrative action can be altered without breaking the cryptographic chain.

## 🏗️ Core Schema Design (PostgreSQL)

PathGuard uses a strictly relational schema to manage the complex relationships between users, multi-hop transactions, and the immutable audit trail.

### 1. User Persistence Layer (`users`)
Stores verified identities and their cryptographic signatures.
- **`id`**: `UUID` (Primary Key)
- **`phone_number`**: `AES-256 Encrypted String` (Application-level encryption)
- **`kyc_status`**: `Enum(PENDING, VERIFIED, REJECTED)`
- **`public_key`**: `ECDSA String` (Verified against mobile Secure Enclave)

### 2. Transaction Orchestration (`transactions`)
The high-level intent and authorization for a movement of funds.
- **`sender_id` / `recipient_id`**: `UUID` (Foreign Keys)
- **`amount`**: `Decimal` (Bank-grade precision)
- **`client_signature`**: `ECDSA Proof` (The mathematical "Will" of the user)
- **`status`**: `Enum(INITIATED, IN_TRANSIT, COMPLETED, BLOCKED)`

### 3. The Multi-Hop Engine (`transaction_hops`)
*The "Secret Sauce":* Tracks the physical journey through the banking rail.
- **`hop_sequence`**: `Integer` (Ordering for UI Timeline)
- **`entity_name`**: `String` (e.g., "Chase Intermediary", "PathGuard Vault")
- **`cryptographic_proof`**: `HMAC/SHA-256` (Signed receipt from the processing entity)

### 4. Immutable Audit Ledger (`audit_ledger`)
A tamper-proof record of every system event.
- **`previous_hash`**: `SHA-256` (Links to the previous entry, forming a Merkle Chain)
- **`payload`**: `JSONB` (The full state of the change)
- **`immutable_trigger`**: A PostgreSQL rule that blocks all `UPDATE` and `DELETE` operations.

---

## 🔒 Security Constraints

| Layer | Implementation | Purpose |
| :--- | :--- | :--- |
| **At Rest** | Transparent Data Encryption (TDE) | Protects physical disks. |
| **Application** | AES-256-GCM | Encrypts PII (Phone/Names) before DB insertion. |
| **Audit** | Append-Only Triggers | Prevents "Database Zero-Day" internal tampering. |
| **Vault** | HashiCorp Vault | Management of master encryption keys. |

---

## 🛠️ Developer Implementation Sync

To generate the SQL schema for this architecture, use the following prompt in your local AI (Ollama/Llama3):

```text
Role: Senior DB Architect. 
Task: Generate PostgreSQL DDL for PathGuard. 
Include: UUID primary keys, JSONB audit payloads, and a PL/pgSQL trigger to block row updates/deletions on the audit_ledger table.
```
