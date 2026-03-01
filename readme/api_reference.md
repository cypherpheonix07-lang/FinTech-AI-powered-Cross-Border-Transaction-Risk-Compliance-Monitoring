# 🔌 PathGuard Sentinel: API Reference
## *Developer Guide for Financial Integration*

The PathGuard Sentinel API provides a secure, modular interface for initiating transactions, querying path integrity, and receiving real-time security events.

---

### 🔐 Authentication
All requests must be authenticated via **JWT (JSON Web Token)**.
- **Header**: `Authorization: Bearer <JWT_ACCESS_TOKEN>`
- **Identity Layer**: Integration with OAuth2 Providers (OIDC ready).
- **Rate Limiting**: Tiered access based on institutional agreement.

---

### 🛠️ Core Endpoints

#### 1. Initiate Transfer
`POST /api/v1/transfers`
- **Purpose**: Start a new transaction with cryptographic signature verification.
- **Body**: `{ amount, recipient_id, client_signature }`
- **Security**: Verifies client signature against TPM-backed public keys.

#### 2. Query Path Integrity
`GET /api/v1/transfers/{tx_id}/path`
- **Purpose**: Retrieve the visual and cryptographic hops for a transaction.
- **Response**: Returns a timeline of signed events, risk scores, and Merkle proofs.

#### 3. Sentinel Webhook (Status Update)
`POST /api/v1/webhooks/bank/status`
- **Purpose**: Intermediary banks push status updates (CLEARED/FAILED).
- **Security Check**: Mandatory **HMAC-SHA256 signature** validation in header `x-bank-signature`.

---

### 🛡️ Security Constraints
- **TLS 1.3 Strict**: Non-encrypted or legacy TLS traffic is violently rejected.
- **HMAC Signatures**: Every webhook must be signed using a shared secret stored in an HSM or KMS.
- **Idempotency**: All mutations require an `Idempotency-Key` to prevent double-spending or duplicate logging.

---

### 📦 Client SDKs
Pre-built components are available for:
- [Tauri / Rust](architecture.md#tauri-core)
- [React / Next.js](landing_page.html)
- [Flutter (Mobile)](tokenomics.md#future-vision)

---

### 🆘 Support & Errors
- `401 Unauthorized`: Missing or invalid JWT.
- `403 Forbidden`: RBAC check failed or transaction ownership mismatch.
- `429 Too Many Requests`: Rate limit exceeded.
- `520 Sentinel Warning`: Anomaly detection engine has paused the route.

---

[Back to Main README](../README.md) | [Whitepaper](whitepaper.md) | [Roadmap](roadmap.md)
