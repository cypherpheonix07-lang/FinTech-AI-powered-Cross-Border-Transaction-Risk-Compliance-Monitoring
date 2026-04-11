# PathGuard Database Schema: The MVP (State Pilot)

## Core Philosophy
We need to track a transaction, verify its safety across multiple steps ("hops"), and log everything immutably. 
For Phase 1, we are using **PostgreSQL**. We will keep the schema simple but strictly enforce the 5 Bank-Grade Security Layers (Encryption at Rest, immutable logs, etc.).

---

## 🏗️ The 4 Core Tables

Here is the exact schema breakdown you can give to your backend developer or use in an AI prompt.

### 1. `users` (The People)
Stores the profiles of the senders and receivers.
- `id` (UUID, Primary Key)
- `phone_number` (String, **Encrypted at Rest via Application-Level Encryption**)
- `fullname` (String)
- `kyc_status` (Enum: `PENDING`, `VERIFIED`, `REJECTED`)
- `public_key` (String) -> *Stores the user's ECDSA public key. Used to verify the signatures coming from their mobile Secure Enclave.*
- `created_at` (Timestamp)

### 2. `transactions` (The Overall Order)
Stores the high-level intent: "David wants to send $500 to Maria."
- `id` (UUID, Primary Key)
- `sender_id` (UUID, Foreign Key -> `users.id`)
- `recipient_id` (UUID, Foreign Key -> `users.id`)
- `amount` (Decimal)
- `currency` (String, default: "USD")
- `status` (Enum: `INITIATED`, `IN_TRANSIT`, `COMPLETED`, `BLOCKED`)
- `client_signature` (String) -> *The ECDSA mathematical proof that the sender actually requested this exact amount and recipient.*
- `created_at` (Timestamp)

### 3. `transaction_hops` (The Path)
*This is the secret sauce of PathGuard.* It breaks the main transaction down into the actual physical/digital steps the money takes. A single `transaction` will have 2 or 3 `transaction_hops`.
- `id` (UUID, Primary Key)
- `transaction_id` (UUID, Foreign Key -> `transactions.id`)
- `hop_sequence` (Integer) -> *e.g., 1, 2, 3 so the UI knows the exact order to draw the timeline.*
- `entity_name` (String) -> *e.g., "Sender's Bank", "PathGuard Gateway", "Recipient's Bank"*
- `status` (Enum: `PENDING`, `CLEARED`, `FAILED`)
- `cryptographic_proof` (String) -> *The HMAC signature or receipt from the bank proving they actually processed this step.*
- `cleared_at` (Timestamp)

### 4. `audit_ledger` (The Immutable Black Box)
This table tracks `INSERT`, `UPDATE`, and `DELETE` actions across the whole system.
- `id` (UUID, Primary Key)
- `event_type` (String) -> *e.g., "USER_KYC_APPROVED", "TX_HOP_CLEARED", "ADMIN_OVERRIDE"*
- `actor_id` (UUID) -> *Who did it? The user? An Admin? The System?*
- `payload` (JSONB) -> *The exact data that was changed.*
- `previous_hash` (String) -> *Links to the previous log entry. If a hacker deletes a row, the blockchain-style hash chain breaks, immediately alerting the system to tampering.*
- `created_at` (Timestamp, **Strictly Read-Only/Append-Only**)

---

## 📋 Developer Handoff (Prompt Template)

Use this prompt to have your local AI generate the exact SQL commands to create this database securely:

```text
Role: Senior PostgreSQL Database Architect
Task: Generate the SQL schema for the PathGuard MVP.

Requirements:
1. Create 4 tables: `users`, `transactions`, `transaction_hops`, and `audit_ledger`.
2. Use UUIDv4 for all primary keys.
3. Add strict Foreign Key constraints.
4. Add comments to the SQL file indicating that `phone_number` must be encrypted at the application level *before* insertion.
5. Create a PostgreSQL Trigger on the `audit_ledger` table that explicitly blocks any `UPDATE` or `DELETE` commands to ensure it remains an immutable, append-only log.
6. Return only the clean, executable SQL code.
```
