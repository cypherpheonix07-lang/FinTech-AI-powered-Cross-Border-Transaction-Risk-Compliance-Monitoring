# 🏗️ PathGuard: Architecture & Intelligence
## *The Blueprint of Transparent Money Movement*

PathGuard's architecture is built on three pillars: **Local Intelligence**, **Secure Ingestion**, and **Immutable Governance**. It pivots from traditional cloud-only models to a decentralized, local-first approach that prioritizes user privacy and system resilient.

---

### 🧠 1. Local ML Engine (The Local Brain)
Unlike traditional fintech apps, PathGuard runs its core risk analysis locally on the user's desktop (Windows 11).

- **Framework**: Tauri (Rust) for the core shell, providing a tiny footprint and Rust's memory safety.
- **Local LLM**: Interfaces directly with a local **Ollama** instance (`localhost:11434`) for high-level reasoning and risk translation.
- **Anomaly Detection**: Lightweight ONNX/Python models for real-time numerical scoring of transaction velocity and pattern shifts.
- **Continuous Learning**: Models retrain locally every night based on confirmed transaction outcomes, ensuring the AI evolves without uploading private data.

---

### 🌊 2. Data Ingestion & Pipeline
The system handles high-throughput financial events through a modular stream-processing pipeline.

- **Apache Kafka**: Serves as the high-throughput backbone for transaction events.
- **WebSockets (WSS)**: Real-time, encrypted streams connecting the local desktop app to global financial data relays.
- **Eventual Consistency**: Ensures that the audit ledger remains synchronized across all nodes without blocking transaction performance.

---

### 🔐 3. The 5 Layers of "Bank-Grade" Security
PathGuard implements a defense-in-depth strategy specifically optimized for local environments:

| Layer | Implementation | Threat Mitigated |
| :--- | :--- | :--- |
| **At Rest** | SQLCipher (AES-256) | Malware reading local database files. |
| **In Transit** | TLS 1.3 Strict Enforce | Man-in-the-Middle (MITM) attacks. |
| **Key Mgmt** | Windows DPAPI / TPM | Decryption keys stolen from config files. |
| **Auth** | Windows Hello Biometrics | Unauthorized physical access to the device. |
| **Integrity** | Hardware-Backed Signing | Malicious modification of payloads. |

---

### 📜 4. Immutable Audit Ledger
The foundation of regulatory trust.
- **Merkle Chaining**: Every transaction hop is hashed and chained (SHA-256), creating a tamper-proof history.
- **Zero-Knowledge Evidence**: Allows regulators to verify a transaction's "safe" status without needing to see the underlying PII or sensitive banking data.

---

[Back to Main README](../README.md) | [Whitepaper](whitepaper.md) | [Compliance](compliance.md)
