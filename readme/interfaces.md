# PathGuard Interface Specifications: High-Fidelity UX

PathGuard bridges the gap between complex cryptography and intuitive financial control. We provide two primary interfaces: the **Mobile Path-Tracker** for users and the **Admin Sentinel Desk** for institutional auditors.

## 📱 Mobile Path-Tracker (Flutter)

The mobile experience focuses on "Total Visibility."

### 1. Interactive Path Timeline
- **Visual**: A vertical timeline showing every hop.
- **States**:
  - `Grey`: Predicted hop.
  - `Pulsing Blue`: Active verification in progress.
  - `Solid Green + Shield`: Verified & Signed.
- **Interaction**: Tap any node to see the **Public Verification Hash**.

### 2. The Biometric Vault
- **Action**: Slide-to-Confirm for all transfers.
- **Internal Logic**: Triggers a FaceID/TouchID prompt which then unlocks the Secure Enclave to sign the transaction payload with the user's private ECDSA key.

## 🖥️ Admin Sentinel Desk (Next.js)

The professional interface for bank compliance officers and regulators.

### 1. The Global Firehose
- **Visual**: Real-time ticker of all high-risk movements.
- **Logic**: Weighted scoring highlighting anything above an AI Sentinel Score of 75.

### 2. Path Investigation Tool
- **Visual**: A 3D graph (GNN visualizer) showing the connections between accounts.
- **Logic**: Allows auditors to "expand" nodes to see second and third-degree connections (detecting money laundering rings).

---

## 🎨 Design Tokens

| Property | Value | Purpose |
| :--- | :--- | :--- |
| **Primary Cyan** | `#22d3ee` | Action items & System Health. |
| **Alert Magenta** | `#f472b6` | Fraud alerts & Blocked Hops. |
| **Background** | `#0f172a` | Institutional Dark Mode. |
| **Typography** | `Inter / Roboto Mono` | Modern readability & Data precision. |

## 🛠️ Flutter Component Prompt
Use this to generate the core UI widget:
```text
Role: Flutter UI Specialist.
Task: Design the 'PathTimeline' widget. 
Features: Pulsing animations for active hops, safety badges for verified nodes, and a 'View Hash' modal.
```
