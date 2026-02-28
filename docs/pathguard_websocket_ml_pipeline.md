# PathGuard Desktop: Real-Time WebSocket & ML Data Pipeline

## Overview
This document details exactly how the PathGuard Windows 11 Desktop Application ingests live transaction data from external partners (banks, clearinghouses) and feeds it securely into the **Local Machine Learning (ML) Engine** for real-time anomaly detection.

Since everything is running on the user's local machine, we must carefully manage memory, network latency, and data privacy.

---

## 1. The Architecture of the Pipeline

The pipeline consists of three sequential stages running inside the desktop app:

### Stage 1: Secure Ingestion (The Net)
- **Protocol:** Enforced `wss://` (WebSocket Secure using TLS 1.3). 
- **The Connection:** The Rust backend of the Tauri application opens a persistent WebSocket connection to the central PathGuard relay server or direct partner feeds.
- **The Payload:** It receives lightweight JSON objects containing real-time market data or transaction hops:
  ```json
  {
    "event_id": "tx_45bc98",
    "timestamp": "2026-02-26T11:00:00Z",
    "type": "HOP_CLEARED",
    "amount_usd": 1500.00,
    "origin_geo": "US-NY",
    "dest_geo": "GB-LDN",
    "velocity_ms": 450
  }
  ```

### Stage 2: The Rust Buffer (The Filter)
- We do not want to overwhelm the local ML engine with every single heartbeat ping.
- **The Buffer:** The Rust backend uses an asynchronous channel (e.g., `tokio::mpsc`) to queue incoming messages.
- **Pre-processing:** Rust parses the JSON. If the event is a simple status heartbeat, it updates the UI immediately. If it is a financial transaction or a hop execution (`HOP_CLEARED`), it passes the structured data to the Python/ONNX ML Engine.

### Stage 3: The Local ML Engine (The Brain)
- **The Model:** A lightweight, pre-trained numerical model (e.g., a Random Forest or XGBoost model converted to ONNX format) runs directly within the Rust process using the `tract` or `onnxruntime` crate. *This completely eliminates the need to install a heavy Python environment on the user's PC.*
- **Scoring:** The ONNX model receives the features (amount, geo-location, velocity) and outputs a "Fraud Suspicion Score" (0.00 to 1.00) in under 5 milliseconds.
- **Ollama Escalation:** If the score exceeds a threshold (e.g., `> 0.85`), the Rust backend pauses the transaction UI and makes an HTTP POST request to the local **Ollama** API (`http://127.0.0.1:11434`), passing the raw data and asking the LLM to generate a plain-English explanation of *why* this looks suspicious.

---

## 2. Bank-Grade Security Measures (The 5 Layers)

1. **Encryption in Transit:** WebSockets must strictly use `wss://`. The Tauri app should pin the SSL certificate of the WebSocket server.
2. **Authentication:** The initial WebSocket handshake must include a short-lived OAuth2 JWT in the `Authorization` header.
3. **Encryption at Rest:** If the ML engine flags a transaction, it is logged into the local SQLite database. That database is encrypted with AES-256 (SQLCipher). No plain-text logs are written to the `C:\` drive.

---

## 3. Developer Handoff: The WebSocket/ML Prompts

Feed these prompts into your local AI (Ollama/Cursor) to generate the exact Rust code for the Tauri backend.

### Prompt 1: The WebSocket Listener (Rust)
```text
Role: Senior Rust Desktop Developer
Task: Build a secure WebSocket listener for a Tauri application backend.

Requirements:
1. Use the `tokio-tungstenite` crate to establish a persistent `wss://` connection to `wss://api.pathguard.com/stream`.
2. Connect securely using TLS 1.3 (e.g., via `native-tls` or `rustls`).
3. Set up an asynchronous listening loop that receives JSON messages.
4. Pass parsed messages into a `tokio::sync::mpsc` channel so other parts of the application can process them without blocking the network thread.
5. Provide automatic reconnection logic with exponential backoff if the connection drops.
6. Return only the Rust code and necessary `Cargo.toml` dependencies.
```

### Prompt 2: The ML Inference Engine Integration (Rust + ONNX)
```text
Role: Senior Rust ML Engineer
Task: Integrate an ONNX machine learning model into a Tauri application to score real-time data.

Requirements:
1. Assume we have a pre-trained model file named `fraud_detector.onnx`.
2. Use the `onnxruntime-rs` crate (or an equivalent like `tract`) to load this model into memory when the Tauri app starts.
3. Write a function `score_transaction(tx_data)` that takes numerical transaction features (amount, geo_code, velocity) and runs inference.
4. The output will be a float between 0.0 and 1.0. 
5. If the score is > 0.80, the function should return an `AnomalyDetected` struct.
6. Keep the code heavily commented with instructions on how to load the `.onnx` file statically.
```

### Prompt 3: The Ollama Escalation (Rust)
```text
Role: Senior AI Integration Engineer
Task: Write a Rust function to query a local Ollama instance for NLP analysis.

Requirements:
1. Write an async function `escalate_to_ollama(anomaly_data)` using `reqwest`.
2. It must make a POST request to `http://127.0.0.1:11434/api/generate`.
3. The prompt should pass the raw anomaly data and instruct the `llama3.1:8b` model to "Respond in exactly 2 sentences explaining why this money transfer looks suspicious to a non-technical user."
4. Parse the JSON response stream and return the generated text so the Tauri frontend can display it in an alert box.
```
