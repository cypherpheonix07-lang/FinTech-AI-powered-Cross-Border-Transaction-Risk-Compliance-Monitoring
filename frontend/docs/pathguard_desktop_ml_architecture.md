# PathGuard: Desktop Native ML Architecture

## The Pivot: From Cloud App to Local Desktop Software
Based on the updated requirement, PathGuard will not be a typical cloud-hosted mobile/web app. Instead, it will be a **downloadable desktop application** installed locally on the user's system (Windows 11). 

Crucially, this desktop software will run its own **Machine Learning (ML) Engine locally**, ingesting real-time data to train its models and detect anomalies without relying heavily on an external cloud brain.

---

## 1. The Technology Stack for Desktop ML

To build this architecture securely and efficiently for Windows 11 while supporting local ML, we must pivot our technology stack.

### Presentation Layer (The UI)
- **Framework:** **Tauri** (Rust backend, React/Next.js frontend) or **Electron** (Node.js). 
  - *Recommendation:* Tauri. It compiles to much smaller, faster binaries on Windows and is far more secure than Electron because it leverages the OS's native webview and Rust's memory safety.
- **Language:** TypeScript + React + Tailwind CSS.

### The "Local Brain" (The ML Engine)
- **Framework:** **Python** (packaged securely) or **ONNX Runtime**.
- **Local LLM Integration:** Since the user is already running **Ollama** locally, the desktop app will interface directly with the local Ollama API (`http://localhost:11434`) to perform the heavy NLP reasoning (Risk Translation, Compliance Checking).
- **Real-Time Fraud ML:** A lightweight Python background process running **Scikit-Learn** or **PyTorch Mobile/ONNX** for numerical fraud scoring (velocity checks, anomaly detection).

### Local Storage (The Secure Vault)
- **Database:** **SQLite with SQLCipher**.
  - We cannot install PostgreSQL on every user's desktop easily. 
  - Instead, the app generates a local SQLite database that is fully encrypted at rest using AES-256 (SQLCipher). The decryption key is generated from the user's master password / Windows Hello biometrics.

### Real-Time Data Ingestion
- **Protocol:** **WebSockets (WSS)** connecting outward to trusted financial data feeds or the central PathGuard relay server to pull real-time transaction states.

---

## 2. Applying the 5 Bank-Grade Security Layers Locally

Running software on a user's local machine is significantly more dangerous than a locked-down cloud server. A virus on the user's PC could try to steal the data. Here is how we enforce the 5 layers in a desktop environment:

### Layer 1: Encryption at Rest 
- **The Threat:** Malware tries to read the local database files on the `C:\` drive.
- **The Solution:** Use **SQLCipher**. The database file (`pathguard.db`) is encrypted with AES-256. The app prompts the user for their Master Password or Windows Hello fingerprint when it opens to unlock the database in RAM only.

### Layer 2: Key Management
- **The Threat:** The AES-256 database key is left in a configuration file in the app folder.
- **The Solution:** Leverage the **Windows Credential Manager / Windows Data Protection API (DPAPI)**. The app securely stores the decryption keys in the OS's native secure keystore, bound to that specific Windows User Account.

### Layer 3: Encryption in Transit
- **The Threat:** The desktop app pulls real-time training data over an insecure network.
- **The Solution:** The app strictly enforces **TLS 1.3** for all outbound WebSocket and REST API calls to the financial data feeds.

### Layer 4: Authentication & Authorization
- **The Threat:** Someone else sits at the unlocked Windows 11 PC and opens the software.
- **The Solution:** Implement local biometrics. The Tauri app hooks into **Windows Hello** (Face/Fingerprint/PIN) to authenticate the user every time the app is brought to the foreground after 5 minutes of inactivity.

### Layer 5: Transaction Integrity & Execution Isolation
- **The Threat:** A malicious script on the PC alters the transaction payload before the app sends it out.
- **The Solution:** The local app generates a **Hardware-Backed RSA/ECDSA Keypair** via the Windows TPM (Trusted Platform Module). Every transaction the desktop app approves/analyzes is digitally signed by the TPM chip.

---

## 3. The Real-Time ML Training Loop

How the local software gets smarter:

1. **Ingestion:** The app listens to a secure WebSocket stream of real-time market/transaction events.
2. **Local Inference:** The lightweight Python/ONNX model scores the incoming transactions for risk (0-100).
3. **Local Reasoning (Ollama):** If the score > 80, the software pings the local Ollama instance: *"Analyze this high-risk transaction against the user's historical habits."*
4. **Local Continuous Learning:** Every night, the local Python engine uses the day's confirmed clean/fraudulent transactions to retrain the local model weights (Online Learning / Federated Learning approach) without ever uploading the user's private data to the cloud.

---

## 4. Developer Handoff: The Desktop MVP Prompts

To build this with your AI (Ollama/Cursor), feed it these new prompts:

### Prompt 1: The App Shell (Tauri + React)
```text
Task: Initialize a secure Tauri desktop app for Windows 11 using React and TypeScript.
Requirements:
1. Generate the initialization commands and basic architecture.
2. The React frontend should have a dashboard layout mimicking a high-end trading terminal.
3. Configure the `tauri.conf.json` strictly. Disable generic OS shell execution to prevent RCE vulnerabilities.
4. Set up the IPC (Inter-Process Communication) bridge between the React frontend and the Rust backend to handle secure data passing.
```

### Prompt 2: The Local Encrypted Database (SQLCipher)
```text
Task: Configure the local database logic for a Rust-based Tauri desktop app.
Requirements:
1. Integrate `rusqlite` compiled with the `sqlcipher` feature for AES-256 encryption.
2. Write a Rust function that initializes the database file on the local Windows filesystem securely.
3. Create the schema for `transactions` and `ml_training_logs`.
4. Add comments detailing how the key will be securely fetched from the Windows DPAPI (Credential Manager).
```

### Prompt 3: Linking to Local Ollama & Python ML
```text
Task: Build the ML integration layer for a desktop financial app.
Requirements:
1. Write a Rust service that exposes an endpoint to the React frontend.
2. When the frontend sends a transaction object, this Rust service must make an HTTP POST request to a local Ollama instance (`http://localhost:11434/api/generate`) running `llama3.1:8b`.
3. Provide an anomaly detection prompt template for the Ollama request.
4. Return the AI's risk assessment back to the React frontend.
```
