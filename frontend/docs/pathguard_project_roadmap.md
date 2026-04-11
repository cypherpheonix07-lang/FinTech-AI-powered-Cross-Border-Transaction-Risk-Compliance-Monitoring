# 🗺️ PathGuard Desktop App: Development Phase Roadmap

This roadmap outlines the step-by-step execution plan to build the **PathGuard Desktop Application** using Tauri (Rust + React), integrating local ML (ONNX), local LLM reasoning (Ollama), and a secure encrypted database (SQLCipher) for Windows 11.

---

## 🏗️ Phase 1: Foundation & The UI Shell (Weeks 1-2)
**Goal:** Stand up the basic desktop application frame and connect it to your local Ollama instance for NLP testing.

- [ ] **1.1 Tauri Initialization:** Install Rust, Node.js, and Tauri CLI. Scaffold the basic Tauri app (`npm create tauri-app@latest`).
- [ ] **1.2 React/Tailwind Setup:** Configure the React frontend. Build the static UI components (Dashboard, Transaction Timeline, Alerts panel).
- [ ] **1.3 IPC Bridge (React ⟷ Rust):** Establish the Inter-Process Communication so frontend buttons can trigger backend Rust functions.
- [ ] **1.4 Local Ollama Integration:** Write a Rust function to send HTTP POST requests to `http://127.0.0.1:11434` (Ollama) and stream the LLM's response back to the React UI.

**Testing Milestone:** You can type a mock transaction into the desktop app, click "Analyze", and watch the local Llama3.1 model return a security verdict within the UI.

---

## 🗄️ Phase 2: The Secure Vault (Weeks 3-4)
**Goal:** Implement the Bank-Grade locally encrypted database so no transaction data sits in plain text on the Windows hard drive.

- [ ] **2.1 SQLCipher Integration:** Add `rusqlite` with the `sqlcipher` feature array to the Rust backend (`Cargo.toml`).
- [ ] **2.2 Master Key Generation:** Implement a prompt in the UI for a Master Password. Use Argon2id to hash it into an AES-256 decryption key.
- [ ] **2.3 Windows Credential Manager:** Securely store the hashed key in the Windows native DPAPI so the user doesn't have to type it every time.
- [ ] **2.4 Schema Implementation:** Create the `transactions` and `audit_logs` tables securely inside the rust initialization function.

**Testing Milestone:** You can close the app, restart your PC, open the app, authenticate via Windows, and safely retrieve the saved transactions from the encrypted `.db` file.

---

## ⚡ Phase 3: Real-Time Data Ingestion (Weeks 5-6)
**Goal:** Connect the desktop app to external financial data feeds securely.

- [ ] **3.1 Secure WebSockets:** Implement a `tokio-tungstenite` WSS connection in the Rust backend to listen to mock bank data/PathGuard centralized relays.
- [ ] **3.2 TLS 1.3 Enforcement:** Ensure the WebSocket connection violently rejects non-HTTPS/WSS traffic.
- [ ] **3.3 Async Channel Queuing:** Feed the incoming firehose of JSON WebSocket data into a Rust `mpsc` channel to prevent the React UI from freezing.
- [ ] **3.4 UI Data Binding:** Stream the queued transactions up to the React UI to update the "Live Tracker" dashboard in real-time.

**Testing Milestone:** The desktop UI updates dynamically as transactions "flow" in from external sources without user interaction.

---

## 🧠 Phase 4: The Local ML Anomaly Engine (Weeks 7-8)
**Goal:** Embed the lightning-fast numerical fraud detection model directly into the desktop app to score transactions before the LLM sees them.

- [ ] **4.1 ONNX Runtime Setup:** Embed a pre-trained ML anomaly detection model (`.onnx` file) into the Tauri binary using `onnxruntime-rs` or `tract`.
- [ ] **4.2 The Scoring Loop:** As transactions exit the WebSocket queue, pass their features (Amount, Velocity, Geo-code) into the ONNX model.
- [ ] **4.3 The Escalation Trigger:** If the ONNX model returns a Fraud Probability `> 0.85`, block the transaction in UI.
- [ ] **4.4 LLM Handoff:** Pass the blocked transaction data automatically to the local Ollama instance to generate the plain-English explanation for the user.

**Testing Milestone:** The app processes 100+ transactions silently. When it detects a high-velocity fraud spike, it automatically freezes the suspicious transfers and pops up an AI-generated explanation.

---

## 🔐 Phase 5: Security Hardening & Packaging (Weeks 9-10)
**Goal:** Finalize the security layers and compile the desktop software into an installable `.msi` or `.exe` for Windows 11.

- [ ] **5.1 Digital Signatures (ECDSA):** Utilize the Windows TPM (Trusted Platform Module) to cryptographically sign transaction approvals.
- [ ] **5.2 Immutability Checks:** Ensure the local audit logs cannot be modified using hash-chaining logic.
- [ ] **5.3 Release Compilation:** Produce an optimized, stripped release build (`npm run tauri build`).
- [ ] **5.4 Penetration Testing:** Run the Fraud Spike and MitM incident simulators against the compiled binary.

**Testing Milestone:** You successfully install PathGuard via an installer file, and the app connects securely, reasoning locally with zero data leaks.
