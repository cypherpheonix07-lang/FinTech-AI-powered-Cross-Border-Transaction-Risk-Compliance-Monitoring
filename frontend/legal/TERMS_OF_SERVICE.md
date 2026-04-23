# 🛡️ PathGuard (Project AEGIS): Terms of Service (Omega V2.0)

**DRAFT VERSION - REQUIRES ATTORNEY REVIEW**

☢️ **NUCLEAR WARNING:**
AI IS NOT A LAWYER. Using this document without legal review in your jurisdiction constitutes **Negligence**.

## 1. NATURE OF SERVICE
PathGuard (Project AEGIS) is a **Security & Transparency Infrastructure**. We are NOT a bank, a money transmitter, or a financial advisor. We provide the tools for transparent money movement verification.

## 2. DATA SOVEREIGNTY & ENCRYPTION
- **Client-Side Encryption:** All sensitive PII is encrypted client-side. PathGuard admins do NOT have access to your raw financial data.
- **Lost Keys:** If you lose your master password or encryption keys, the data is **mathematically unrecoverable**. PathGuard cannot Reset your password or access your vault.
- **Geo-Residency:** Data is stored in accordance with the sovereignty islands selected at onboarding (e.g., EU-GDPR nodes).

## 3. AI USAGE & LIMITATION OF LIABILITY
- **Hybrid AI:** PathGuard uses a mix of Local (Ollama) and Cloud (OpenRouter) AI for processing.
- **Hallucinations:** AI outputs are predictive and may contain errors. You agree NOT to rely solely on AI for high-stakes financial decisions.
- **Liability Cap:** PathGuard's liability for AI-related errors is capped at $0.00. Use at your own risk.

## 4. ZERO-TRUST REQUIREMENTS
- Users must maintain a secure device.
- Use of Passkeys (WebAuthn) is mandatory for accounts exceeding $10,000 in transaction volume.
- PathGuard reserves the right to isolate accounts suspected of "Insider Threat" behavior via UBA analysis.

## 5. COMPLIANCE & AML
Users agree to comply with all global AML/KYC regulations. PathGuard will automatically trigger SAR (Suspicious Activity Reports) for transactions flagged by the Omega Risk Engine.

---

# 🤖 PathGuard (Project AEGIS): AI Accountability Policy

## 1. THE HYBRID AI GATEKEEPER
PathGuard implements a hard-coded privacy gatekeeper (`ai-router.ts`). No PII is permitted to exit the local environment to cloud models.

## 2. HUMAN OVERSIGHT
All AI-generated risk alerts must be reviewed by a human compliance officer before a SAR is finalized. AI is a "Co-Pilot," NOT the "Pilot."

## 3. DRIFT MONITORING
We continuously monitor AI models for "Drift"—changes in behavior that could lead to biased or illegal financial decisions.

## 4. OPT-OUT
Enterprise partners may opt-out of cloud reasoning entirely, forcing all logic to local nodes at the cost of reasoning depth.
