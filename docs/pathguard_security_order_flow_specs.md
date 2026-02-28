# PathGuard Security Specification: Order Flow (Options 2-6)

## Overview
This document outlines the technical requirements for the remaining Bank-Grade Security Layers used to protect the PathGuard Order Flow. 
Developers must implement these layers in tandem with the OAuth2 Authentication standard outlined in Option 1.

---

## Option 2: Multi-Factor Authentication (MFA)
**Security Layer:** Authentication & Authorization (The ID)

1. **Risk Analysis:**
   Even with OAuth2, if a user's session token is hijacked or their device is compromised while unlocked, an attacker could attempt to initiate a transfer.
2. **Bank-Grade Solution:**
   Step-up Authentication. Enforce a mandatory MFA challenge for any order > $0.
3. **Plain English Explanation:**
   *Analogy:* "Even if someone steals your VIP badge to get inside the vault, the vault manager still requires you to scan your fingerprint before they actually open your specific safety deposit box."
4. **Actionable Checklist:**
   - [ ] Configure the Identity Provider (IdP) to require MFA (TOTP Authenticator App or SMS) on the `transfer_initiate` API scope.
   - [ ] Ensure the frontend application gracefully handles the `mfa_required` error by prompting the user for their token.

---

## Option 3: TLS 1.3 Enforcement
**Security Layer:** Encryption in Transit (The Tube)

1. **Risk Analysis:**
   If transaction data (amount, recipient) is sent in plaintext, a Man-in-the-Middle (MitM) attacker on a public Wi-Fi network can intercept and alter the data before it reaches the bank.
2. **Bank-Grade Solution:**
   Strict enforcement of TLS 1.3 across all communication channels.
3. **Plain English Explanation:**
   *Analogy:* "Instead of sending your money order on a postcard that anyone can read or rewrite, you put it in a sealed, armored truck that only the bank has the key to open."
4. **Actionable Checklist:**
   - [ ] Configure the API Gateway / Load Balancer to strictly accept `TLSv1.3`. Disable `TLSv1.2` and older.
   - [ ] Implement HSTS (HTTP Strict Transport Security) headers.
   - [ ] Implement SSL Certificate Pinning in mobile applications to prevent spoofed certificates.

---

## Option 4: Cryptographic Transaction Signing
**Security Layer:** Transaction Integrity (The Signature)

1. **Risk Analysis:**
   Data can be tampered with *after* it arrives at the server, or the sender might later claim they never authorized the transfer (repudiation).
2. **Bank-Grade Solution:**
   The client device generates an ECDSA (Elliptic Curve Digital Signature Algorithm) signature of the exact transaction payload (`{amount, recipient, timestamp, nonce}`) using a private key stored in the device's Secure Enclave.
3. **Plain English Explanation:**
   *Analogy:* "Before the armored truck leaves, a tamper-proof wax seal with your unique, un-copyable stamp is placed on the order. If anyone tries to alter the amount later, the seal breaks and we know it was tampered with."
4. **Actionable Checklist:**
   - [ ] Generate an asymmetric keypair (e.g., Prime256v1) within the user device's hardware enclave (Secure Enclave on iOS, KeyStore on Android/WebCrypto).
   - [ ] Send the public key to the server during device registration.
   - [ ] Build a signing module on the frontend to sign the transaction payload hash (`SHA-256`).
   - [ ] Build verification middleware on the backend to reject any order with an invalid signature.

---

## Option 5: Transparent Data Encryption (TDE)
**Security Layer:** Encryption at Rest (The Vault)

1. **Risk Analysis:**
   If a hacker breaches the database server or steals a physical hard drive, they could extract raw transaction data and user balances.
2. **Bank-Grade Solution:**
   Enable AES-256 Database-Level encryption (TDE) and encrypt specific highly-sensitive columns (like `recipient_account_uuid`) at the application level.
3. **Plain English Explanation:**
   *Analogy:* "Even if a thief manages to unbolt the entire vault and carry it away, the actual safety deposit boxes inside are encased in solid steel and cast in concrete, making the contents useless without the master key."
4. **Actionable Checklist:**
   - [ ] Enable TDE on the production database (e.g., PostgreSQL pgcrypto or AWS RDS KMS Encryption).
   - [ ] Ensure the Master Encryption Key is managed via a dedicated HSM or KMS (AWS KMS / Azure Key Vault).
   - [ ] Ensure keys are NEVER committed to version control (`.env` files are strictly for local dev).

---

## Option 6: Immutable Audit Logs
**Security Layer:** Compliance & Governance

1. **Risk Analysis:**
   If an insider or attacker alters database records to hide fraud, standard logs might be deleted or modified.
2. **Bank-Grade Solution:**
   Cryptographically verifiable, Write-Once-Read-Many (WORM) audit logs for every transaction event.
3. **Plain English Explanation:**
   *Analogy:* "Every time an action is taken, it is written in permanent ink in a ledger that gets locked in a glass display case. Everyone can see it, but nobody can ever erase or change what was written."
4. **Actionable Checklist:**
   - [ ] Route all critical events (`login_success`, `login_failed`, `order_signed`, `order_executed`) to an append-only datastore (like AWS QLDB or a Write-Only S3 bucket).
   - [ ] Ensure logs never contain raw PII or plaintext account numbers (hash them first).
