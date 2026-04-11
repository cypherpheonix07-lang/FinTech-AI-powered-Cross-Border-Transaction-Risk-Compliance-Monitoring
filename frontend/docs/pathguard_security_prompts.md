# PathGuard Security Prompts Library

These are the core security prompts for testing your PathGuard local AI agent. Paste them into your Ollama terminal (`ollama run llama3.1:8b`) to validate the AI's understanding of our Bank-Grade Security Architecture.

---

## 📋 Prompt 1: Bank-Grade Encryption Simulation
```text
You are PathGuard's Security Module. Simulate bank-grade encryption for a transaction.

INPUT:
- Transaction ID: "TX-12345"
- Amount: "$500"
- Path: Sender → Bank A → Gateway X → Receiver

TASK:
1. Simulate encrypting this data with AES-256. Show a fake ciphertext (e.g., "a3f9...").
2. Explain in plain English: "Why can't someone who steals this ciphertext read the transaction?"
3. Simulate decrypting it with the correct key. Show the original data.
4. Add a warning: "Never share your encryption key. Store it in an HSM."

OUTPUT FORMAT:
- Encrypted: [fake ciphertext]
- Why it's safe: [1-2 simple sentences]
- Decrypted: [original data]
- Key safety tip: [warning]
```

## 📋 Prompt 2: Secure Login Flow (Authentication Gatekeeper)
```text
You are PathGuard's Authentication Gatekeeper. Simulate a secure login flow.

USER ACTION: "I want to send $500 to Maria."

TASK:
1. Walk through these steps:
   a. User enters email/password → system checks credentials
   b. System sends SMS code → user enters it
   c. System checks device fingerprint → is this a known device?
   d. If all pass: grant access. If any fail: block + alert.
2. Explain each step in plain English: "Why do we need the SMS code?"
3. Simulate a failed attempt: "What if the SMS code is wrong?"
4. End with: "Your account is now verified for this session."

OUTPUT FORMAT:
- Step-by-step flow (simple language)
- Why each step matters (1 sentence each)
- Failed attempt simulation
- Final confirmation message
```

## 📋 Prompt 3: Fraud Prevention (Transaction Notary)
```text
You are PathGuard's Transaction Notary. Simulate digital signing for fraud prevention.

TRANSACTION:
- ID: TX-12345
- From: User_A (hashed ID: u_a7f3)
- To: User_B (hashed ID: u_b9e2)
- Amount: $500
- Path Hash: merkle_root_abc123

TASK:
1. Simulate creating a digital signature using ECDSA. Show a fake signature: "sig_9x2k..."
2. Explain: "How does the receiver verify this signature hasn't been changed?"
3. Simulate verification: "Signature matches → transaction is authentic."
4. Add idempotency: "If someone tries to resend TX-12345, the system rejects it as duplicate."

OUTPUT FORMAT:
- Signature: [fake sig]
- Verification explanation: [simple analogy]
- Duplicate protection: [how it works]
- User message: "Your transfer is cryptographically sealed ✅"
```

## 📋 Prompt 4: High-Volume Attack Defense (Security Sentinel)
```text
You are PathGuard's Security Sentinel. Simulate protection against a high-volume attack.

SCENARIO:
- A botnet sends 10,000 fake transaction requests in 60 seconds to overload the system.

TASK:
1. Simulate rate limiting: "After 100 requests/minute from one IP, block further requests."
2. Simulate anomaly detection: "This pattern looks like a DDoS attack → trigger Cloudflare shield."
3. Simulate alerting: "Notify security team + log event immutably."
4. Explain to a non-technical user: "Why did my request get blocked? Is my money safe?"

OUTPUT FORMAT:
- Defense steps taken (bullet points)
- User-friendly explanation (1-2 sentences)
- Reassurance: "Your legitimate transactions are still processing safely."
```

---

## 💡 Developer Extension Prompts

If you want the AI to generate actual backend code based on these concepts, use these follow-up prompts:

### API Handler Conversion Prompt
```text
Convert this prompt logic into a secure Go API handler for transaction path verification.
Include: input validation, encryption stubs, and audit logging.
Target: Windows 11 compatible, state-pilot scale.
```

### Next.js UI Conversion Prompt
```text
Generate a secure Next.js component that displays a transaction path visualization.
Requirements:
- Show hops as a timeline with safety badges (✅ Verified, 🔒 Encrypted)
- Include a "Verify Publicly" button that shows a mock cryptographic proof
- Use TypeScript + Tailwind CSS
- Add comments explaining security considerations
Target: State-pilot scale, Windows 11 compatible
```
