# PathGuard Security Specification: Authentication & Authorization (Option 1)

## 1. Overview
This document outlines the technical requirements for implementing Bank-Grade Authentication and Authorization for the PathGuard platform.

**Security Layer:** Authentication & Authorization (The ID)
**Target Standard:** OAuth2 + OpenID Connect (OIDC)

## 2. Risk Analysis
**Risk:** Account Takeover, Credential Stuffing, Weak Passwords.
If a malicious actor gains access to a user's account, they can initiate unauthorized money transfers. We cannot rely on basic username/password setups, which are easily compromised.

## 3. Bank-Grade Solution
We will implement an **OAuth2 flow with an external Identity Provider (IdP)**.
- **Why?** Relying on specialized providers (like Auth0, AWS Cognito, or Keycloak) offloads the risk of securely storing passwords and managing complex authentication life cycles.
- **OIDC (OpenID Connect):** Adds an identity layer on top of OAuth2, allowing the application to verify the identity of the end-user based on the authentication performed by an authorization server.

## 4. Plain English Explanation
**Analogy:** "Think of OAuth2 like a fiercely guarded VIP entrance to a high-end vault. Instead of the vault making its own easily-copyable front door keys for every customer, it hires a globally trusted security firm (the Identity Provider) to check IDs at the gate. When you arrive, the security firm checks your credentials and, if everything matches, hands you a temporary, tamper-proof VIP badge (a token) that the vault recognizes. If you lose the badge, it expires quickly anyway."

## 5. Technical Specifications for Developers
Please hand this section to your engineering team.

### 5.1 Identity Provider (IdP) Setup
- **Action:** Integrate a certified Identity Provider (e.g., Auth0, AWS Cognito, or self-hosted Keycloak).
- **Requirement:** The platform MUST NOT store user passwords in its local database under any circumstances.

### 5.2 Token Standards & Lifespans
- **Access Tokens:** Use JWT (JSON Web Tokens) signed asymmetrically (e.g., RS256).
- **Expiration:** Access tokens MUST be extremely short-lived (Maximum lifespan: **15 minutes**).
- **Refresh Tokens:** Implement Refresh Token Rotation. When a refresh token is used to get a new access token, issue a new refresh token and invalidate the old one. This prevents replay attacks if a refresh token is compromised.

### 5.3 OIDC Flow
- **Web Applications:** Use the **Authorization Code Flow with PKCE** (Proof Key for Code Exchange). Implicit flow is strictly prohibited.
- **Mobile Applications:** Use the same Authorization Code Flow with PKCE, utilizing custom URI schemes or App Links/Universal Links for the redirect.

### 5.4 Backend Verification
- The PathGuard API MUST verify the JWT signature on every single incoming request using the IdP's public JWKS (JSON Web Key Set).
- The API MUST validate the `aud` (audience), `iss` (issuer), and `exp` (expiration) claims.

## 6. Actionable Checklist
- [ ] Select and provision the Identity Provider (e.g., Auth0/AWS Cognito).
- [ ] Configure the Application in the IdP to strictly allow Authorization Code Flow with PKCE.
- [ ] Set Access Token expiration to 15 minutes.
- [ ] Enable Refresh Token Rotation in the IdP settings.
- [ ] Implement JWT signature verification middleware in all backend routing.

---
**Next Step Recommendation:** 
Once the core OAuth2 foundation is laid, the immediate next step is to enforce **Multi-Factor Authentication (MFA) (Option 2)** for high-risk actions (like transferring money > $0).
