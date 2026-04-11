# PathGuard Security Specification: Mobile App Architecture

## Overview
This document outlines the Bank-Grade Security Layers required to secure the **PathGuard Mobile App** (iOS and Android). The mobile device is an untrusted environment—it can be jailbroken, infected with malware, or physically stolen.

---

## 1. Risk Analysis
**What could go wrong?**
- **Physical Device Theft:** A thief steals an unlocked phone and tries to open the PathGuard app to empty the account.
- **Reverse Engineering:** Attackers decompile the app (APK/IPA) to find hardcoded API keys or cryptographic secrets.
- **Man-in-the-Middle (MitM) Attacks:** A user connects to a compromised public Wi-Fi network, and an attacker intercepts the API calls between the app and the server.
- **Screen Overlay Attacks (Android):** Malware draws a transparent window over the PathGuard app to steal the user's PIN or passwords.

---

## 2. Bank-Grade Solutions (The 5 Layers)

### Layer 1: Authentication & Authorization (The ID)
The mobile app must never stay permanently logged in with an active, long-lived access token.
- **Requirement:** Implement Biometric Authentication (FaceID / TouchID / Android Biometrics).
- **Session Rules:** The app must require biometric re-authentication or a strong PIN every time it is brought to the foreground or after 3 minutes of inactivity.
- **Device Binding:** When a user logs in, the backend should issue a refresh token that is kryptographically bound to a secure enclave key on *that specific device*.

### Layer 2: Key Management (The Key)
- **Requirement:** Secrets (like OAuth tokens, user PINs, or ECDSA signing keys) MUST be stored strictly in the hardware-backed Secure Enclave (iOS) or Android Keystore.
- **Anti-Hardcoding:** The application source code must never contain hardcoded API keys for production services.

### Layer 3: Encryption in Transit (The Tube)
- **Requirement:** Implement strict **SSL/TLS Certificate Pinning**.
- **Explanation:** Certificate pinning hardcodes the server's public key hash inside the mobile app. Even if a user is tricked into installing a malicious root certificate on their phone (which would normally bypass TLS), the PathGuard app will refuse to connect because the pinned certificate won't match the attacker's fake certificate.

### Layer 4: Transaction Integrity (The Signature)
- **Requirement:** As detailed in the Order Flow specification, the mobile app must sign high-risk transactions (like initiating a transfer) using a private key locked in the Secure Enclave.
- **Runtime Integrity:** Implement Jailbreak/Root detection. If the app detects the OS has been compromised, it must immediately wipe all local secure storage and refuse to launch.

### Layer 5: Encryption at Rest (The Vault)
- **Requirement:** Any local caching of financial data (e.g., recent transaction history) must be stored in the app's encrypted sandbox. No sensitive data should ever be written to external storage (like an SD card) or the plaintext SQLite database.
- **Screen Privacy:** The app must flag its windows as secure (e.g., `FLAG_SECURE` on Android) so the OS blocks screenshots, screen recordings, and hides the app content in the recent apps switcher.

---

## 3. Plain English Explanation
**Analogy:** "Think of the mobile app like an armored cash box you hand to the user. The box itself is welded shut (Code Obfuscation) and won't even open unless it recognizes the owner's fingerprint (Biometrics) right that second. If someone tries to pick the lock or pry it open with a crowbar (Jailbreaking), the box instantly detonates an ink dye pack, ruining the money and locking itself permanently (Wiping Local Storage). When the box needs to talk to the bank, it checks a unique, unforgeable watermarked ID badge from the bank (Certificate Pinning) to make absolutely sure it's not handing the cash to an imposter."

---

## 4. Actionable Checklist for Developers
- [ ] **Auth:** Require FaceID/Biometrics on app launch and resume.
- [ ] **Storage:** Store all OAuth tokens and cryptographic keys in the Secure Enclave / Android Keystore.
- [ ] **Network:** Implement SSL Certificate Pinning using libraries like `TrustKit` or native networking frameworks.
- [ ] **Privacy:** Implement UI protection to prevent screenshots and obscure the screen in the task switcher.
- [ ] **Integrity:** Integrate a Root/Jailbreak detection library and block app execution on compromised devices.
- [ ] **Obfuscation:** Run ProGuard/R8 (Android) and strip symbols (iOS) before publishing the final builds.
