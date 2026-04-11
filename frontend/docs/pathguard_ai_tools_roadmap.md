# 🗺️ PATHGUARD PROJECT: AI-TOOLS INSTALLATION ROADMAP

**User:** Non-coder, Prompt Engineer, Windows 11
**Project:** Transparent Money Transfer Path Verifier (Fintech Security)

---

## 🚫 SKIP THESE (Not Relevant)
- **Pencil:** Marketing ad generator — not for financial security
- **Moltbot (formerly Clawd-bot):** Only for personal automation, not transaction processing

---

## ✅ PHASED INSTALLATION PLAN

### PHASE 0: FOUNDATION (Week 1) — DO THIS FIRST
- [x] Install Ollama (local AI) — keeps data private
- [x] Pull `llama3.1:8b` model
- [x] Test core security prompts (encryption, auth, signing)
- [x] Save working prompts to `pathguard_security_prompts.md`
**✅ Success Metric:** You can simulate a secure transaction flow via prompting alone.

**Setup Commands:**
1. Download: Go to https://ollama.com → Click "Download for Windows"
2. Install: Run the `.exe` → Follow prompts
3. Verify: Open PowerShell → Type `ollama --version`
4. Pull Model: `ollama pull llama3.1:8b`
5. Test Run: `ollama run llama3.1:8b`

### PHASE 1: CORE AI-AGENT (Weeks 2-3) — VALIDATE LOGIC
- [ ] Refine PathGuard system prompt in Ollama
- [ ] Test fraud detection, compliance explanation, user-friendly outputs
- [ ] Document prompt versions + test results
- [ ] Optional: Add vector memory (ChromaDB) for pattern learning
**✅ Success Metric:** Your Agent consistently gives safe, clear, compliant responses to mock queries.

### PHASE 2: CODE GENERATION (Weeks 4-6) — BUILD SCAFFOLDING
- [ ] Sign up for Google Antigravity IDE: https://antigravityide.net
- [ ] Connect GitHub account
- [ ] Paste your TESTED Ollama prompts → ask Antigravity to generate:
  - Next.js frontend component for path visualization
  - Go/Java API handler stub for transaction verification
  - PostgreSQL schema for immutable audit logs
- [ ] Review generated code with a security expert before deploying
**✅ Success Metric:** You have a working prototype that runs locally with mock data.

**Antigravity Setup:**
1. Sign Up: Go to https://antigravityide.net → Create account
2. Connect GitHub: In Antigravity settings → Connect your GitHub account 
3. Install CLI (Optional but Recommended):
```powershell
# In PowerShell (Run as Administrator)
npm install -g @antigravity/cli
ag login  # Follow auth prompts
```

### PHASE 3: EXTERNAL AI INTEGRATION (Weeks 7-9) — SCALE REASONING
- [ ] Sign up for OpenRouter (unified API for Claude, Gemini, etc.)
- [ ] Add API keys to a secure `.env` file (NEVER commit to GitHub)
- [ ] Update your Agent prompt: "If query requires complex analysis → use OpenRouter with Claude-3"
- [ ] Implement data anonymization: hash user IDs, remove PII before sending to external APIs
- [ ] Add audit logging: record every external API call (anonymized)
**✅ Success Metric:** Your Agent can handle complex fraud analysis while keeping user data private.

**Environment Setup (Windows):**
```powershell
# Create a secure .env file (NEVER commit to GitHub)
notepad .env
# Add this line:
OPENROUTER_API_KEY=your_key_here
# Save to project root.
# Restrict file permissions:
icacls .env /inheritance:r /grant:r "%USERNAME%:R"
```

### PHASE 4: OPTIONAL PRODUCTIVITY (Anytime) — PERSONAL WORKFLOW ONLY
- [ ] Install Moltbot (formerly Clawd-bot) for YOUR personal task automation
- [ ] Use it to: remind you to test prompts, organize your prompt library, schedule security reviews
- [ ] **⚠️ CRITICAL:** Keep Moltbot COMPLETELY ISOLATED from your fintech logic — never let it access transaction data
**✅ Success Metric:** Your personal workflow is more organized — with zero risk to user data.

### PHASE 5: ADVANCED (Months 3-6) — PREPARE FOR SCALE
- [ ] Research compliance requirements for your state (PCI-DSS, data residency laws)
- [ ] Consult a fintech security expert before handling real money
- [ ] Plan migration path: Ollama (local) → Cloud KMS → HSM for key management
- [ ] Document your security architecture for bank/regulator review
**✅ Success Metric:** You have a compliance-ready architecture document + expert validation.

---

## 🧠 THE ROUTING RULE (Core AI Logic)
- If query is about personal data, KYC, or encryption keys → **use LOCAL Ollama model**.
- If query requires complex fraud analysis or regulatory comparison → **use OpenRouter with Claude-3**.
- **ALWAYS anonymize data** before sending externally: hash user IDs, remove names/amounts.
- **Log every external API call** (anonymized) to `audit_trail.json`.
