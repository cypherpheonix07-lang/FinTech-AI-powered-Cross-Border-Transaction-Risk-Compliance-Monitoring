# PathGuard Security Simulation: Scenario 3

## Threat Scenario: The Coffee Shop Attack (Man-in-the-Middle)
**Attacker Goal:** A hacker on a public, unencrypted Wi-Fi network at a coffee shop attempts to intercept a user's PathGuard app traffic to read their account balance or alter the recipient of a $500 transfer.

---

## The Attack Execution
1. **The Setup:** The user sits down at their favorite coffee shop and connects to "Free Public Wi-Fi." The hacker is sitting in the corner running a packet sniffer (like Wireshark or an Evil Twin access point).
2. **The Interception:** The user opens the PathGuard app, logs in, checks their $10,000 balance, and initiates a $500 transfer to their friend "Maria."
3. **The Alteration:** The hacker attempts to intercept the API request containing the transfer details, switch the recipient UUID from Maria's account to their own, and forward the request to the PathGuard server.

---

## How PathGuard Defends It (The 5 Layers in Action)

### Defense 1: Encryption in Transit (TLS 1.3)
As soon as the user opens the app, the connection to `api.pathguard.com` is established over **TLS 1.3**.
- The hacker sees packets flying by on their Wireshark screen, but because they are encrypted using AES-GCM ciphers, the data looks like random noise. 
- The hacker cannot see the $10,000 balance. They cannot see the transfer amount. They cannot read the OAuth2 token. **The eavesdropping fails.**

### Defense 2: Encryption in Transit (SSL Certificate Pinning)
The hacker tries a more advanced tactic: an SSL Stripping attack or a rogue root certificate. They trick the user into installing a "Wi-Fi Security Certificate" on their phone to access the internet.
- The hacker's proxy server intercepts the PathGuard app's request and presents its own fake SSL certificate (signed by the rogue root the user just installed).
- The PathGuard mobile app, however, has **SSL Certificate Pinning** embedded in its code. It compares the hacker's fake certificate against the hardcoded hash of the *real* PathGuard certificate.
- The hashes don't match. The PathGuard app instantly terminates the connection before sending *any* data. **The interception fails.**

### Defense 3: Transaction Integrity (Cryptographic ECDSA Signature)
Let's pretend the hacker somehow pulled off a miracle and achieved a full Man-in-the-Middle position, capturing the plaintext payload:
  `{"amount": 500, "recipient": "maria_uuid"}`
- The hacker intercepts the request and changes it to:
  `{"amount": 500, "recipient": "hacker_uuid"}`
- However, the original PathGuard app generated a digital signature (using the device's Secure Enclave Private Key) over the *original* hash of "500 to Maria." This signature was sent in the `X-Device-Signature` header.
- When the hacker alters the payload body and forwards it to the server, the server recalculates the payload hash (which is now "500 to Hacker") and compares it to the cryptographic signature attached in the header.
- The new hash does not match the signature. The server immediately realizes the payload was tampered with in transit. It drops the request with a `400 Bad Request`. **The alteration fails.**

---

## 🏁 Safety Verdict
❌ **Attack Blocked.** 
The combination of TLS 1.3 and Certificate Pinning renders the public Wi-Fi completely sterile. Even in a worst-case scenario where the tunnel is compromised, the cryptographic signature on the transaction payload itself guarantees that no middleman can alter the destination of the funds.

---

**Analogy:** "The user tries to send a sealed, armored truck down a very dangerous highway (Public Wi-Fi). The thieves looking out their windows cannot see inside the truck (TLS 1.3). Even if they set up a fake toll booth pretending to be the destination (Fake SSL Cert), the truck driver checks a photo ID of the *real* toll booth operator before rolling down the window (Certificate Pinning). Finally, even if they somehow hijack the truck and find the package inside, the package is sealed with a magical wax seal (Digital Signature). If they change the address label, the seal shatters, and the bank will refuse to accept it."
