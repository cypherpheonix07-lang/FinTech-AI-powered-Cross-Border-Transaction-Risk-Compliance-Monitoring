# PathGuard Security Specification: User Onboarding Flow

## Overview
This document outlines the Bank-Grade Security Layers required to secure the **User Onboarding Flow** (the process where a new user signs up, verifies their identity (KYC/AML), and links their fast payment methods). Onboarding is the perimeter wall of the system.

---

## 1. Risk Analysis
**What could go wrong?**
- **Synthetic Identity Fraud:** A bad actor uses a mix of real and fake information to create a ghost account.
- **Data Extortion:** Hackers intercept the user uploading their government ID (passport/license) or raw Social Security Numbers.
- **Account Takeover at Inception:** Attackers abuse weak password creation or lack of multi-factor authentication (MFA) to immediately hijack the account after it is created.

---

## 2. Bank-Grade Solutions (The 5 Layers)

### Layer 1: Encryption in Transit (The Tube)
All PII (Personally Identifiable Information) and identity documents MUST be uploaded over strict **TLS 1.3**.
- **Requirement:** Implement HSTS (HTTP Strict Transport Security) to ensure browsers and apps cannot downgrade the connection to HTTP.
- **Mobile Apps:** Implement SSL Certificate Pinning to prevent attackers from using compromised root certificates to intercept KYC documents.

### Layer 2: Authentication & Authorization (The ID)
During onboarding, we do not just rely on passwords. We enforce modern identity standards.
- **Requirement:** Use **OAuth2 + OIDC** (e.g., Auth0) for the initial signup. 
- **MFA Enrollment:** The very first step after email verification MUST be enrolling in **Multi-Factor Authentication (MFA)** (TOTP App or SMS). No user can complete onboarding without an established second factor.

### Layer 3: Encryption at Rest (The Vault)
When the user submits their KYC data (Driver's License, SSN, Address), it cannot be stored in plaintext.
- **Requirement:** Enable **AES-256** TDE (Transparent Data Encryption) on the database.
- **High-Risk Data:** For extremely sensitive data like SSNs or Tax IDs, use application-level encryption *before* the data hits the database, utilizing a dedicated KMS (Key Management Service) like AWS KMS.

### Layer 4: Key Management (The Key)
The keys used to encrypt user PII and KYC documents must be heavily protected.
- **Requirement:** Encryption keys must be generated and managed inside a **Hardware Security Module (HSM)** or Cloud KMS. Developers must never have access to the master keys in plaintext.

### Layer 5: Transaction Integrity (The Signature)
While this isn't a financial transaction yet, the *approval* of the user's KYC profile must be non-repudiable.
- **Requirement:** When the automated KYC provider (e.g., Onfido, Plaid, or Jumio) approves the user, the approval webhook must be digitally signed. The PathGuard backend must verify this **Digital Signature (ECDSA/RSA)** to ensure the approval wasn't spoofed by an attacker bypassing the KYC check.

---

## 3. Plain English Explanation
**Analogy:** "Think of boarding an international flight. Onboarding is the TSA checkpoint. You don't just walk in; you walk through a sealed, secure tunnel (TLS 1.3) directly to the desk. When you hand over your passport, the agent doesn't leave it lying on the counter—they immediately lock it in a timed, heavy steel safe (AES-256 Encryption) where even the agent doesn't hold the master key (HSM). Finally, before you're allowed into the terminal, you have to set up a private pager (MFA) that the airport will use to ping you before you board any actual planes later."

---

## 4. Actionable Checklist for Developers
- [ ] **Infrastructure:** Enforce TLS 1.3 and HSTS on the API Gateway handling onboarding endpoints.
- [ ] **Auth:** Configure the IdP (Identity Provider) to mandate MFA enrollment immediately after email verification.
- [ ] **Database:** Enable AES-256 encryption on all tables storing PII (`users`, `kyc_documents`, `addresses`).
- [ ] **Application Level:** Implement a library to encrypt ultra-sensitive fields (like Tax IDs) using AWS KMS before the ORM saves it to the database.
- [ ] **Integrity:** Implement signature verification for all incoming webhooks from the 3rd-party KYC/AML providers.
