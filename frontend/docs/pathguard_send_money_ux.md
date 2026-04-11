# PathGuard UI/UX Strategy: "Send Money" Flow (State Pilot MVP)

## Core Philosophy
We are building a "Transparent Money Transfer" experience. The user must feel that their money is moving safely, visibly, and verifiably.

**Analogy:** Handing a package to a trusted courier with a GPS tracker and a padlock.

---

## 📱 Step-by-Step UI Flow

### Step 1: The Destination (Who is getting the money?)
- **UI Element:** Clean input field for "Recipient" (Phone number, Email, or @Username).
- **Security Check (Invisible):** PathGuard verifies the recipient is a registered, KYC-approved user within the State Pilot.
- **Visual Feedback:** A green ✅ appears next to the recipient's name, confirming they are a verified PathGuard user.

### Step 2: The Amount (How much?)
- **UI Element:** Large, prominent numeric keypad to enter the USD amount.
- **Security Limit (Invisible):** Backend checks if the amount exceeds the State Pilot limit (e.g., $1,000 maximum).

### Step 3: The Predicted Path (The "Aha!" Moment)
*This is PathGuard's core differentiator. Before the user hits send, they see exactly how the money will travel.*
- **UI Element:** A simple, 3-node visual timeline appears on the screen:
  1. `[Sender's Bank (e.g., Chase)]` ➔
  2. `[PathGuard State Gateway (Encrypted)]` ➔
  3. `[Recipient's Bank (e.g., Wells Fargo)]`
- **Copy:** "Your funds will take 3 secure, verified hops."

### Step 4: The Vault Key (Authentication)
- **UI Element:** A slide-to-confirm button at the bottom of the screen.
- **Security Action (The ID):** When the user slides the button, the OS prompts for **Biometric Authentication (FaceID/TouchID)**.
- **Security Action (The Signature):** Behind the scenes, the mobile app uses the Secure Enclave to generate an **ECDSA Digital Signature** for this specific transfer amount and recipient.

### Step 5: The Journey (Real-time Tracking)
- **UI Element:** The screen transitions to a "Live Tracker" (similar to a pizza delivery app or Uber ride).
- **Visuals:** The 3 nodes from Step 3 light up green one by one as the backend confirms the hops have been executed and immutably logged.

---

## 🛠️ Developer Handoff (Prompt Templates)

Below are the exact, copy-pasteable prompts you can feed into Ollama/Cursor/ChatGPT to generate the Flutter code for this flow. *No coding required on your end—just pass these instructions to the AI.*

### 📋 Prompt 1: Building the "Send Money" Input Screen
```text
Role: Senior Flutter Developer
Task: Create the "Step 1 & 2" UI for the PathGuard 'Send Money' screen.

Requirements:
1. Use standard Flutter Material Design.
2. The screen needs a clean, large input field for "Recipient Handle" (e.g., @maria).
3. Below that, a massive, centered numeric input for the USD Amount.
4. Include a standard "Next" button at the bottom.
5. Do not write any backend logic or API calls yet—just the static, beautiful UI structure. Keep the code modular.
```

### 📋 Prompt 2: Building the "Predicted Path" Visualization
```text
Role: Senior Flutter UX/UI Developer
Task: Create the "Predicted Path" UI widget for the PathGuard app.

Requirements:
1. Create a stateless Flutter widget called `PredictedPathViewer`.
2. It should visually display a vertical or horizontal timeline with 3 nodes:
   - Node 1: "Your Bank"
   - Node 2: "PathGuard Secure Gateway"
   - Node 3: "Recipient's Bank"
3. Use simple, reassuring icons (like a lock or a shield) for the nodes.
4. Add a text label above it saying: "Your transfer will take 3 secure, verified hops."
5. Keep the code clean, modular, and easy to drop into an existing screen.
```

### 📋 Prompt 3: Building the "Slide to Confirm + Biometrics" Button
```text
Role: Senior Flutter Security Developer
Task: Build the highly secure "Slide to Confirm" button widget for PathGuard.

Requirements:
1. Create a `SlideToConfirmButton` widget. It should require the user to drag a slider from left to right to initiate the transfer (preventing accidental taps).
2. When the slider reaches the end, it must trigger a mock function called `authenticateAndSignTransaction()`.
3. Add comments explicitly defining where the **FaceID/TouchID biometric prompt** and the **Secure Enclave ECDSA signing logic** will be injected later by the security team.
4. Make the UI look premium and trustworthy (e.g., green colors, lock icons).
```
