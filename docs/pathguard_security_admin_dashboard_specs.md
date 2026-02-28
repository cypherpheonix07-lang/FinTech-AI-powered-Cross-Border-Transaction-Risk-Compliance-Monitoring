# PathGuard Security Specification: Admin Dashboard

## Overview
This document outlines the Bank-Grade Security Layers required to secure the **Admin Dashboard**. The admin panel is the most dangerous component of any fintech system because it possesses God-mode privileges over users and funds. 

---

## 1. Risk Analysis
**What could go wrong?**
- **Insider Threat / Rogue Employee:** An employee with admin access maliciously alters user balances, approves fraudulent KYC, or exports the entire user database.
- **Session Hijacking:** An admin logs in at a coffee shop, steps away, and an attacker takes over their active session.
- **Privilege Escalation:** A low-level support agent finds a hidden API endpoint meant for the SuperAdmin and uses it to initiate a fund transfer.

---

## 2. Bank-Grade Solutions (The 5 Layers)

### Layer 1: Authentication & Authorization (The ID)
The Admin Dashboard requires stricter access controls than the public user App.
- **Requirement:** Admin authorization must use strict **Role-Based Access Control (RBAC)** via OAuth2 scopes.
- **Hardware MFA:** Admins MUST NOT use SMS for MFA. They must use strictly hardware-bound authenticators like YubiKeys (FIDO2/WebAuthn) or strict TOTP apps.
- **Session Lifespans:** Admin JWT access tokens must expire every **5 minutes**. Inactivity timeouts must log the admin out after 15 minutes of idle time.

### Layer 2: Encryption in Transit (The Tube)
- **Requirement:** The Admin Dashboard MUST be hosted on a separate sub-network (e.g., a VPN or Zero Trust Network like Cloudflare Access/Tailscale).
- **Public Internet:** The Admin API MUST NEVER be exposed directly to the public internet without a Zero Trust tunnel, all over strict **TLS 1.3**.

### Layer 3: Key Management (The Key)
- **Requirement:** The Admin panel must never display decryption keys or give admins the ability to extract the master keys from the HSM.

### Layer 4: Transaction Integrity (The Signature)
- **Requirement:** Any destructive or high-risk action taken by an admin (e.g., "Freeze Account", "Override KYC", "Refund Transaction") must be cryptographically signed by the admin's session key. This prevents the admin from later claiming their account was hacked when investigating insider fraud.

### Layer 5: Compliance Audit Logging (The Ledger)
- **Requirement:** **Every single Read, Write, and Update** performed by an Admin must be logged to an **Immutable WORM (Write-Once-Read-Many) Ledger**.
- **Log Contents:** The log must contain the Admin's internal UUID, the exact timeframe, the IP address, the endpoint hit, and the *exact data payload* altered.

---

## 3. Plain English Explanation
**Analogy:** "Think of the Admin Dashboard like the control room of a nuclear power plant. The door to the control room isn't just locked; it requires two employees to turn their physical keys at the exact same time (Hardware MFA + RBAC) to get inside. The room itself is buried in a bunker cut off from the outside world (Zero Trust Network / VPN). Once inside, every single button press, every dial turned, and every camera viewed is permanently recorded by an indestructible black box (Immutable Audit Logs) so that if something goes wrong, investigators know exactly who was sitting in the chair at that exact second."

---

## 4. Actionable Checklist for Developers
- [ ] **Infrastructure:** Host the Admin Panel behind a Zero Trust Gateway (e.g., AWS Client VPN, Cloudflare Zero Trust) rather than the public internet.
- [ ] **Auth:** Configure the IdP to enforce FIDO2/WebAuthn (YubiKeys) for all staff accounts.
- [ ] **Auth:** Implement strict RBAC in the backend middleware (e.g., ensure `role: support` cannot hit `[POST] /admin/fraud/override`).
- [ ] **Sessions:** Set Admin JWT expiry to 5 minutes. Implement strict frontend idle-timeouts (15 mins).
- [ ] **Audit:** Build middleware that intercepts every `POST`, `PUT`, `PATCH`, and `DELETE` on the Admin API and writes the exact payload, user ID, and timestamp to a secure, append-only Audit Log table.
