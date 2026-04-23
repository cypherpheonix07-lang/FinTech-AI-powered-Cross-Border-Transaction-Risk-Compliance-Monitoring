# 🛡️ PathGuard (Project AEGIS): Infrastructure Setup Guide

**Omega Protocol V2.0 - Production Readiness**

☢️ **NUCLEAR WARNING:** 
Following these instructions is mandatory for security. Leaving ports exposed or hardcoding keys results in **Financial Ruin**.

## 🧠 Hybrid AI Integration

### 1. Local AI: Ollama (Windows 11)
For absolute privacy of PII data.
1. Download Ollama from [ollama.com](https://ollama.com).
2. Start the local server: `ollama serve`.
3. Pull the required models:
   ```bash
   ollama pull llama3.1:8b
   ollama pull mxbai-embed-large
   ```
4. **URGENT SECURITY:** Block external access to port 11434.
   ```ps1
   netsh advfirewall firewall add rule name="Ollama BLOCK External" dir=in action=block protocol=TCP localport=11434
   ```

### 2. Cloud AI: OpenRouter
For regulatory reasoning and non-PII complex analysis.
1. Get an API Key at [openrouter.ai](https://openrouter.ai).
2. Store the key securely in Firebase:
   ```bash
   firebase functions:secrets:set OPENROUTER_API_KEY
   ```
3. Test your connection:
   ```bash
   curl https://openrouter.ai/api/v1/models -H "Authorization: Bearer $OPENROUTER_API_KEY"
   ```

## ⚛️ Crypto Ops & Post-Quantum Prep
1. Install Post-Quantum tools:
   ```bash
   brew install oqs-provider # For macOS
   # Or use the built-in Kyber-1024 stub in lib/crypto.ts
   ```
2. Generate Seed Keys:
   ```bash
   openssl genpkey -algorithm rsa -pkeyopt rsa_keygen_bits:4096 -out legacy_key.pem
   # Prepare for migration to ML-KEM (Kyber)
   ```

## 🛠️ Infrastructure Deployment

### 1. Firebase (Core)
1. Initialize Project: `firebase init`
2. Deploy Rules & Indexes:
   ```bash
   firebase deploy --only firestore:rules,firestore:indexes
   ```
3. Deploy Security Functions:
   ```bash
   firebase deploy --only functions
   ```

### 2. Vercel (Edge)
1. Login: `vercel login`
2. Deploy Prod: `vercel --prod`
3. Verify ZTNA Certs: Ensure mTLS is active for Edge Functions.

## 🕵️ Monitoring & UBA
1. Connect Datadog/Splunk via `monitoring/splunk-config.yml`.
2. Verify UBA (User Behavior Analytics) logs are firing in the browser console.
