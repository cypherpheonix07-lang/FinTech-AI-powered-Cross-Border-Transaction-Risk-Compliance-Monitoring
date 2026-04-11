# PathGuard Security Simulation: Scenario 1

## Threat Scenario: Synthetic Identity & Webhook Replay Attack
**Attacker Goal:** Create a fake "Ghost" account and bypass the automated KYC (Know Your Customer) checks by forging or replaying a successful approval message from the KYC provider.

---

## The Attack Execution
1. **The Setup:** The attacker registers a new account using a mix of stolen information (a real SSN, a fake name, and a burner email). This is known as a Synthetic Identity. 
2. **The KYC Block:** The PathGuard app prompts the user to scan their ID and face. The attacker uploads a deepfake video and a photoshopped driver's license.
3. **The Interception:** The 3rd-party KYC provider (e.g., Onfido) correctly identifies the forgery and sends a `{"status": "REJECTED"}` webhook to the PathGuard backend.
4. **The Spoof:** The attacker, knowing the URL of the PathGuard webhook endpoint, quickly uses a script to fire a fake HTTP POST request to `https://api.pathguard.com/webhooks/kyc`:
   ```json
   {
     "user_id": "ghost_account_99",
     "event": "kyc_completed",
     "status": "APPROVED",
     "timestamp": "1716390000"
   }
   ```
5. **The Replay (Backup Plan):** If the spoof fails, the attacker purchases a stolen, *valid* webhook payload from the dark web (a payload from a previously successful KYC approval for a different user) and replays it, hoping the PathGuard server will just accept the "APPROVED" status.

---

## How PathGuard Defends It (The 5 Layers in Action)

### Defense 1: Encryption in Transit (TLS 1.3)
When the attacker tries to intercept the real "REJECTED" webhook to stop it from reaching PathGuard, they fail. The connection between the KYC provider and PathGuard is secured by an encrypted TLS 1.3 tunnel. The attacker cannot see, drop, or alter the packet in transit.

### Defense 2: Transaction Integrity (HMAC Signature)
When the attacker fires their fake `{"status": "APPROVED"}` webhook, the PathGuard API Gateway receives it and immediately checks the headers for the `X-Signature` field.
- The attacker did not include a signature (or included a random one) because they do not have the **Shared Secret Key** (which is safely locked in the AWS KMS Vault). 
- The PathGuard server hashes the attacker's payload, sees the signatures do not match, and instantly drops the request with a `401 Unauthorized`. **The spoof fails.**

### Defense 3: Authentication & Idempotency (Replay Attack Prevention)
The attacker tries their backup plan: they send the stolen, *valid* webhook payload that has a correct cryptographic signature.
- **Timestamp Check:** The PathGuard server looks at the payload's Unix timestamp. It was from 5 days ago. PathGuard's strict webhook policy drops any payload older than 5 minutes.
- **Idempotency Cache:** Even if the payload was fresh (stolen within 2 minutes), the PathGuard system checks its local Redis cache. It sees that the `webhook_id` has already been processed for the original, legitimate user. It ignores the duplicate request. **The replay fails.**

### Defense 4: Encryption at Rest & Audit Logs (The Aftermath)
- The PathGuard system registers the failed webhook attempts.
- It writes an alert to the **Immutable Audit Log**, flagging the `ghost_account_99` for highly suspicious activity.
- The security team can review the logs, but cannot alter them. 

---

## 🏁 Safety Verdict
❌ **Attack Blocked.** 
The synthetic identity remains unverified. The attacker's attempts to spoof and replay the KYC approval were stopped by cryptographic signatures and strict timestamp validation. The integrity of the onboarding perimeter remains intact.

---

**Analogy:** "The thief tried to send a forged telegram to the bank claiming they were approved for an account. But because the telegram lacked the bank's secret wax seal (HMAC Signature), the teller threw it out. The thief then tried to submit a valid telegram they stole from someone else yesterday, but the teller saw the date was old (Timestamp check) and that the approval number had already been used (Idempotency check)."
