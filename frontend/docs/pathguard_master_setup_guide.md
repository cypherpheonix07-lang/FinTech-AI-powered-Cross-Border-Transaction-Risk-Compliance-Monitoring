# PathGuard MVP: Master Setup Guide

## Welcome to PathGuard Phase 1
You now possess the complete blueprint, security architecture, database schema, and LLM prompt templates required to build the PathGuard State Pilot MVP.

Because you are acting as the prompt engineer orchestrating this build locally on Windows 11 with Ollama, this guide outlines the **exact order of operations**.

---

## 🛠️ Step 1: Initialize the Frontend (Flutter)
The frontend is the face of PathGuard. We want to build the static UI first so you can click through the "Transparent Money" experience before worrying about databases.

1. **Prerequisites:** Install [Flutter SDK](https://docs.flutter.dev/get-started/install/windows) for Windows.
2. **Create Project:** Open your terminal and run `flutter create pathguard_app`.
3. **Feed Prompts to Ollama/Cursor:**
   - Grab the Prompts from `docs/pathguard_send_money_ux.md`.
   - Paste them to generate the `Send Money` screen, `Predicted Path` visualizer, and the `Slide to Confirm` button.
   - Grab the Prompts from `docs/pathguard_ux_prompts_track_and_verify.md` to generate the `Track Path` timeline.

## 🛠️ Step 2: Initialize the Backend (Go or Java)
The backend acts as the secure middleman enforcing the 5 Bank-Grade Layers.

1. **Pick your language:** Go (Golang) is highly recommended for microservices due to its speed and simplicity, but Java (Spring Boot) is the enterprise banking standard.
2. **Create the Project:**
   - For Go: `go mod init github.com/yourname/pathguard-api`
   - For Java: Use [Spring Initializr](https://start.spring.io/).
3. **Feed Prompts to Ollama/Cursor:**
   - Open `docs/pathguard_backend_api_specs.md`.
   - Ask the AI to build the `POST /api/v1/transfers` endpoint first.
   - Run the backend locally and test it using a tool like Postman or generic `curl` commands.

## 🛠️ Step 3: Stand up the Database (PostgreSQL)
Now you need a place to store the users and the immutable logs.

1. **Local Setup:** Download and install [PostgreSQL for Windows](https://www.postgresql.org/download/windows/) or run it via Docker (`docker run --name pg -e POSTGRES_PASSWORD=pathguard -p 5432:5432 -d postgres`).
2. **Execute Schema:**
   - Open `docs/pathguard_database_mvp_schema.md`.
   - Ask your AI to generate the SQL based on that document.
   - Run the SQL file in your PostgreSQL instance (using a tool like pgAdmin or DBeaver) to create the 4 core tables.

## 🛠️ Step 4: Security & Compliance Integration (The Hard Part)
This is where PathGuard separates itself from standard apps.

1. **Authentication:** Sign up for a free developer account at [Auth0](https://auth0.com/). Ask your AI to generate the integration code to protect your Go/Java endpoints with Auth0 JWT tokens. *(See: `docs/pathguard_oauth2_spec.md`)*
2. **Cryptographic Signatures:** Ask your AI to write a Flutter function that generates an ECDSA keypair on the mobile device, signs a dummy transaction payload, and sends it to the backend for verification.

## 🛠️ Step 5: Test the Incident Response "Brain"
Before deploying to the cloud, validate the AI Agent.

1. Open your local terminal: `ollama run llama3.1:8b`.
2. Grab the simulations from `docs/pathguard_simulation_b_fraud_spike.md` and `docs/pathguard_incident_simulators_2_to_4.md`.
3. Paste them in. Verify the AI replies correctly regarding Bank Outages, Fraud, Regulatory Changes, and Natural Disasters.

## 🚀 Step 6: Cloud Deployment (AWS/Azure)
When you are ready to move off your local Windows machine:
- Open `docs/pathguard_database_deployment_checklist.md`.
- Ask your AI to write the Terraform code to spin up a secure, private AWS RDS instance.
- Deploy your backend code to AWS ECS (Elastic Container Service) or a managed Kubernetes cluster, relying on your `docs/pathguard_security_kubernetes_specs.md` guide.

---

## Final Words
You don't need to write a single line of complex code manually. Open your code editor, boot up your local AI, hand it one of the Markdown documents we generated today, and say: *"Write the code for this."* 

Good luck building the future of transparent finance. 🛡️
