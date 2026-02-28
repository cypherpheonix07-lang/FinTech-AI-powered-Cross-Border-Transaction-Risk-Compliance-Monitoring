# PathGuard: Executive Security Summary
**Document Version:** 1.0 (Bank-Grade Security Architecture)

## 1. Executive Vision
PathGuard is engineered to make the travel path of digital money transparent, verifiable, and secure. We operate under the premise that **trust must be visible, not blind**. To achieve this, PathGuard's infrastructure has been designed from the ground up to meet stringent financial security standards (PCI-DSS Level 1, ISO 27001, and GDPR) while protecting user privacy.

This document serves as a high-level overview of the **5-Layer Security Architecture** that protects every transaction, user, and data point within the PathGuard ecosystem.

---

## 2. The 5-Layer Security Architecture
Every technical component in PathGuard—from the mobile app to the core database—is guarded by five non-negotiable security layers.

### Layer 1: Encryption at Rest (The Vault)
**Standard:** AES-256 & Application-Level Encryption
**Purpose:** Ensure that if physical servers or hard drives are ever stolen, the data remains mathematically locked and completely unreadable.
- The entire PostgreSQL database is locked behind Transparent Data Encryption (TDE).
- Hyper-sensitive Personally Identifiable Information (PII), such as National ID numbers, is encrypted at the application level *before* it even reaches the database.

### Layer 2: Encryption in Transit (The Tube)
**Standard:** TLS 1.3 & mTLS (Mutual TLS)
**Purpose:** Prevent hackers on public networks from eavesdropping on or altering money transfers as they travel over the internet.
- The Mobile App enforces **SSL Certificate Pinning**, refusing to connect if it detects fake or intercepted Wi-Fi certificates.
- Internal server communications (Microservices) use mTLS, ensuring that even if one server is breached, the attacker cannot freely talk to other servers.

### Layer 3: Key Management (The Key)
**Standard:** Hardware Security Modules (HSM) & Cloud KMS
**Purpose:** Protect the "master keys" used to lock the vaults.
- Cryptographic keys are never stored in source code or easily accessible text files. 
- They are generated and held within secure hardware enclaves that physically prevent keys from being exported in plaintext.

### Layer 4: Authentication & Authorization (The ID)
**Standard:** OAuth2, OIDC, RBAC, and Hardware MFA
**Purpose:** Guarantee that the person (or employee) attempting an action is exactly who they claim to be.
- **Users:** Enforced biometric authentication (FaceID/TouchID) and Multi-Factor Authentication (MFA) prior to initiating any fund transfer.
- **Admins:** The Admin Dashboard—the most privileged area of the system—is restricted via Zero Trust Networks and strictly requires Hardware Security Keys (e.g., YubiKeys) for access.

### Layer 5: Transaction Integrity & Compliance (The Signature)
**Standard:** ECDSA Digital Signatures & WORM Audit Logs
**Purpose:** Provide indisputable, mathematical proof of who authorized a transfer, and ensure historical records can never be erased.
- Every transaction is cryptographically signed by the user's mobile device. If a hacker alters the amount in transit, the signature breaks, and the system rejects the transfer.
- All actions (both user transfers and employee administrative overrides) are recorded in an **Immutable Ledger (Write-Once-Read-Many)**. Ransomware attackers and rogue employees cannot delete their tracks.

---

## 3. Threat Resilience (Simulation Results)
To validate the architecture, PathGuard underwent rigorous simulated threat modeling against advanced attack vectors. The system successfully blocked all simulated attacks:

1. **Synthetic Identity & Webhook Replay (Blocked):**
   *Attack:* Forging a fake KYC (Know Your Customer) approval.
   *Defense:* HMAC-SHA256 signatures and strict timestamp/idempotency checks prevented the forged approval from being processed.
2. **The Insider Threat (Blocked):**
   *Attack:* A rogue support agent attempts to redirect a $50,000 corporate payment.
   *Defense:* Role-Based Access Control (RBAC) blocked the unauthorized action, and the Immutable Ledger permanently logged the attempt for HR review.
3. **The Coffee Shop MitM Attack (Blocked):**
   *Attack:* A hacker intercepts a transfer on unencrypted public Wi-Fi.
   *Defense:* SSL Certificate Pinning severed the tampered connection instantly, and ECDSA transaction signatures prevented payload alteration.
4. **Database Ransomware & Theft (Recovered/Neutralized):**
   *Attack:* An Advanced Persistent Threat (APT) steals the 500GB database and attempts to hold the data hostage.
   *Defense:* AES-256 Encryption rendered the stolen data useless to the hackers. AWS S3 Object Lock (Immutable Backups) allowed PathGuard to restore the destroyed database in minutes without paying a ransom.

---

## 4. Conclusion
PathGuard's architecture does not rely on a single perimeter wall. By enforcing **Defense-in-Depth** across Identity, Encryption, Integrity, and Audit layers, PathGuard ensures that even if one layer is tested, the remaining layers hold firm. The system is provably secure, fully compliant, and mathematically verifiable.

*✅ Safe. Ready for production implementation.*
