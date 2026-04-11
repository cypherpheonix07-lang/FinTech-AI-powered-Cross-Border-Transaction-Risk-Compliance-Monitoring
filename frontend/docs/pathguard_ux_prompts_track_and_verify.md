# PathGuard UI/UX Strategy: Track & Verify Flows

## Overview
These are the prompt templates to generate the remaining two core screens for the PathGuard Phase 1 Mobile App: the **"Track Path" Timeline** (where users watch their money move in real-time) and the **"Verify Publicly" Portal** (where users can prove to anyone that the transfer was secure, without exposing their private data).

---

## 📱 Flow 2: "Track Path" (Real-Time Timeline)

**Context:** The user just swiped to send $500. Now they are on the "Ride Tracking" screen watching the transfer happen.

### 📋 Prompt for Developer/AI:
```text
Role: Senior Flutter UI Developer
Task: Create the `TrackPathTimeline` widget for the PathGuard app.

Requirements:
1. Build a vertical stepper / timeline visualization.
2. It needs to look like a premium ride-tracking app (e.g., Uber or a FedEx delivery tracker).
3. The timeline should have 3 distinct steps based on a mock JSON response:
   - Step 1: "Initiated at Your Bank" (Status: Checkmark Green)
   - Step 2: "Clearing via PathGuard Gateway" (Status: Spinner/Yellow 'In Progress')
   - Step 3: "Depositing to Recipient's Bank" (Status: Gray 'Waiting')
4. For each completed step, display a small "Shield" icon indicating cryptographic verification.
5. Create a clean, modern card layout. Do not write any backend logic, just the beautiful static UI.
```

---

## 📱 Flow 3: "Verify Publicly" (The Proof Portal)

**Context:** The user wants to prove to a landlord or a business partner that a payment was successfully sent through secure channels. They share a public link (e.g., `pathguard.com/verify/TX-99999`).

### 📋 Prompt for Developer/AI:
```text
Role: Senior Next.js/React Developer
Task: Create the public-facing "Verify Transaction" web page for PathGuard.

Requirements:
1. Build a clean, minimalist Next.js page using Tailwind CSS.
2. The page takes a 'Transaction Hash' or 'ID' in a search bar.
3. Upon "searching", it displays a simulated "Cryptographic Receipt".
4. CRITICAL PRIVACY: The receipt must NOT show names or bank account numbers. It must only show:
   - Status: "✅ Verified Secure Path"
   - Amount: "$500.00 USD"
   - Path Hops: "3 Hops (Bank A -> Gateway -> Bank B)"
   - Immutable Ledger Hash: "0x89f2a7db... (Copy to Clipboard)"
5. Add a reassuring tooltip explaining: "This transaction path has been cryptographically verified and recorded on our append-only ledger."
```
