# PathGuard Security Specification: Webhook System

## Overview
This document outlines the Bank-Grade Security Layers required to secure the **Webhook System**. A webhook is how external partners (like KYC providers, banks, or payment gateways) tell PathGuard that an event happened (e.g., "Funds Settled" or "KYC Approved"). If an attacker can spoof a webhook, they can trick the system into releasing funds or approving a synthetic identity.

---

## 1. Risk Analysis
**What could go wrong?**
- **Webhook Spoofing:** A hacker discovers your `/api/webhooks/bank` endpoint and sends a fake `{"status": "settled", "amount": 10000}` payload, causing your system to credit a thief's account.
- **Replay Attacks:** A hacker intercepts a legitimate "User KYC Approved" webhook and replays it 1,000 times to approve 1,000 synthetic accounts.
- **Data Exposure:** A misconfigured partner sends unencrypted customer PII in the webhook payload over the internet.

---

## 2. Bank-Grade Solutions (The 5 Layers)

### Layer 1: Transaction Integrity (The Signature)
This is the **absolute most critical** layer for webhooks. You cannot trust the sender's IP address (they can be spoofed) and you cannot trust the payload alone.
- **Requirement:** Every single incoming webhook MUST contain a Cryptographic Signature in its headers (usually `HMAC-SHA256`).
- **Verification:** The PathGuard backend MUST take the raw payload, hash it using a pre-shared secret key known only to PathGuard and the partner, and compare the result to the signature in the header. If it doesn't match perfectly, the request is dropped immediately.

### Layer 2: Key Management (The Key)
- **Requirement:** The shared secrets used to verify the HMAC signatures must be stored securely in a KMS (AWS KMS, Azure Key Vault) or HashiCorp Vault. They must never be hardcoded in the webhook handler logic.

### Layer 3: Authentication & Authorization (The ID)
- **Requirement:** Implement a **Nonce** (Number Used Once) or strict **Timestamp validation** to prevent Replay Attacks.
- **Implementation:** The webhook payload should include a Unix timestamp. The PathGuard server MUST reject any webhook older than 5 minutes. Additionally, it should track processed webhook IDs in a Redis cache (for 24 hours) to guarantee idempotency (meaning if the same exact webhook is received twice, it is only processed once).

### Layer 4: Encryption in Transit (The Tube)
- **Requirement:** PathGuard webhook endpoints MUST strictly enforce **TLS 1.3**. If a partner attempts to send a webhook over `http://`, the firewall or load balancer must drop the connection silently.

### Layer 5: Encryption at Rest (The Vault)
- **Requirement:** If the webhook contains sensitive user data, that data must be extracted and encrypted via AES-256 before being written to the database. The raw webhook payload should never be dumped into a logging database if it contains PII.

---

## 3. Plain English Explanation
**Analogy:** "Think of a webhook like a telegram arriving at the bank telling them to release a million dollars. If the bank just trusted any telegram that showed up, anyone could send one. Instead, the bank and the partner have a secret decoder ring (HMAC Signature). When the telegram arrives, the clerk runs the message through the ring. If the output doesn't perfectly match the seal on the envelope, they throw it in the trash. Furthermore, every telegram has a timestamp, so if a thief finds yesterday's valid telegram and tries to slide it under the door again today, the clerk sees it's old news and ignores it (Idempotency against Replay Attacks)."

---

## 4. Actionable Checklist for Developers
- [ ] **Auth:** Configure the API Gateway to accept webhooks only over HTTPS (TLS 1.3).
- [ ] **Keys:** Store the Webhook Secrets (e.g., Stripe Endpoint Secret, Plaid Secret) in AWS KMS or Azure Key Vault, not in the `.env` code.
- [ ] **Integrity:** Build an HMAC Verification Middleware that runs *before* the JSON payload is parsed. Validate the `x-signature` header against the raw request body.
- [ ] **Idempotency:** Implement a Redis cache that stores incoming Webhook IDs with a TTL of 24 hours to prevent duplicate processing.
- [ ] **Replay Protection:** Verify the timestamp in the webhook payload or header is within a 5-minute tolerance window of the server's current UTC time.
