# 📝 PathGuard Desktop App: Task Checklist

Use this actionable checklist to track your progress as you build the PathGuard Desktop Native ML Application (Tauri + Rust + React + Local ML). 

---

## 🏗️ Phase 1: Foundation & The UI Shell
- [ ] Install [Ollama](https://ollama.com/) locally and pull `llama3.1:8b`.
- [ ] Test the 4 Core Security Prompts in the local terminal.
- [ ] Install Rust, Node.js, and the Tauri CLI.
- [ ] Initialize the Tauri React/TypeScript app (`npm create tauri-app@latest`).
- [ ] Build the static UI components (Dashboard, Transaction Timeline, Alerts).
- [ ] Set up Inter-Process Communication (IPC) passing mock data from React to Rust.
- [ ] Write the Rust function to POST transaction data to `http://locahost:11434/api/generate`.
- [ ] Connect the Rust Ollama response back to the React UI alert panel.

## 🗄️ Phase 2: The Secure Vault (Local Encrypted DB)
- [ ] Add the `rusqlite` dependency with the `sqlcipher` feature to `Cargo.toml`.
- [ ] Implement a UI screen prompting the user to create a Master Password.
- [ ] Write a Rust function using `argon2` to hash the password into an AES-256 key.
- [ ] Integrate a Windows Credential Manager crate to securely store the hashed key (DPAPI).
- [ ] Write the database initialization logic to create `pathguard.db`.
- [ ] Create the `transactions` schema (ID, amount, path, ML score, status).
- [ ] Create the `audit_logs` append-only schema.
- [ ] Test writing and reading encrypted records upon app restart without exposing plaintext.

## ⚡ Phase 3: Real-Time Data Ingestion
- [ ] Add the `tokio-tungstenite` dependency to `Cargo.toml`.
- [ ] Write a Rust WebSocket listener connecting securely (`wss://`) to a mock data feed.
- [ ] Implement automatic reconnection and exponential backoff on disconnect.
- [ ] Create an asynchronous `mpsc` channel in Rust.
- [ ] Pipe incoming JSON WebSocket messages into the channel buffer.
- [ ] Write a loop consuming the channel to parse the JSON transactions.
- [ ] Emit parsed transaction events via Tauri IPC to the React frontend.
- [ ] Verify the UI updates dynamically with live data streams.

## 🧠 Phase 4: The Local ML Anomaly Engine
- [ ] Obtain a lightweight pre-trained numerical anomaly detection model (e.g., Random Forest converted to `.onnx`).
- [ ] Add the `onnxruntime-rs` or `tract` dependency to `Cargo.toml`.
- [ ] Write a Rust function to load the `.onnx` model into memory on startup.
- [ ] Create a scoring function passing transaction features (Amount, Velocity) to the ONNX model.
- [ ] Integrate the scoring function into the WebSocket ingestion loop (Phase 3).
- [ ] Write logic: If `ML_Score > 0.85`, pause the transaction processing.
- [ ] Connect the paused transaction to the Ollama NLP function (Phase 1) for a plain-English explanation.
- [ ] Display the AI explanation and the blocked transaction explicitly in the UI.

## 🔐 Phase 5: Security Hardening & Packaging
- [ ] Lock down `tauri.conf.json` (disable shell access, restrict window permissions).
- [ ] Verify the `sqlcipher` database cannot be read by external tools (e.g., DB Browser) without the key.
- [ ] (Optional) Integrate Windows TPM logic for hardware-backed ECDSA transaction signing.
- [ ] Implement UI locking after 5 minutes of inactivity (requiring Master Password / Windows Hello).
- [ ] Run the final production build command (`npm run tauri build`).
- [ ] Validate the generated `.msi` or `.exe` installer installs and runs correctly on Windows 11.
