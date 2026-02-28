# PathGuard Security Specification: Kubernetes Deployment Architecture

## Overview
This document outlines the Bank-Grade Security Layers required to secure the **Kubernetes Deployment Infrastructure**. Kubernetes (K8s) orchestrates the entire PathGuard backend. A compromised cluster means total control over the API gateways, identity providers, and the databases.

---

## 1. Risk Analysis
**What could go wrong?**
- **Container Breakout:** An attacker exploits a vulnerability in a web-facing API container (like Node.js or Python FastAPI) and "escapes" the container to gain root access to the underlying Kubernetes worker node.
- **Transversal Attacks:** A hacker breaches the low-security Analytics container and uses the internal K8s network to pivot and attack the high-security Payment Engine container.
- **Secret Exfiltration:** Hardcoded `.env` files or misconfigured K8s Secrets allow a low-level service to read the master database passwords.
- **Supply Chain Attacks:** A developer accidentally pulls a malicious or backdoored Docker image from public DockerHub into the production cluster.

---

## 2. Bank-Grade Solutions (The 5 Layers)

### Layer 1: Authentication & Authorization (The ID)
- **Requirement:** Implement strict **RBAC (Role-Based Access Control)** for both human administrators and Kubernetes Service Accounts.
- **No Default Tokens:** Disable auto-mounting of the default ServiceAccount token for every pod. Only inject K8s API tokens into pods that explicitly require interacting with the K8s API (e.g., an auto-scaler).
- **Human Access:** Developers must NEVER have `cluster-admin` access to the production environment. Access must be granted via an IdP (OIDC integration) with short-lived, Just-In-Time (JIT) credentials and mandatory MFA.

### Layer 2: Key Management (The Key)
- **Requirement:** Kubernetes native Secrets are just base64-encoded strings (not encrypted). You MUST implement an **External Secret Management System** (e.g., HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault).
- **Implementation:** Use a tool like the `External Secrets Operator` to inject secrets from the KMS directly into the pods at runtime, or use a CSI Secret Store driver. Never store secrets in ConfigMaps.

### Layer 3: Encryption in Transit (The Tube)
- **Requirement:** Implement a **Service Mesh** (e.g., Istio or Linkerd) to enforce **mTLS (Mutual TLS)** between *every single microservice* inside the cluster.
- **Explanation:** Even if an attacker breaches the Analytics pod and tries to sniff traffic, they will only see encrypted gibberish. Furthermore, they cannot send requests to the Payment Engine because the Analytics pod will not have the correct cryptographic certificate required by mTLS to prove its identity to the Payment Engine.
- **Network Policies:** Implement strict default-deny Kubernetes Network Policies. The API Gateway pod can talk to the Auth pod, but the Auth pod cannot talk back to the internet.

### Layer 4: Encryption at Rest (The Vault)
- **Requirement:** Encrypt the `etcd` datastore. `etcd` is the brain of the K8s cluster and stores all cluster state and secrets. If the underlying disk is stolen, the cluster state must be unreadable. Enable AES-256 KMS encryption for the API server's `etcd` communication.

### Layer 5: Transaction Integrity & Compliance (The Signature)
- **Requirement:** Implement **Image Signing and Admission Control**.
- **Implementation:** Use a tool like OPA Gatekeeper or Kyverno combined with Sigstore (Cosign). The K8s cluster must cryptographically verify the digital signature of every Docker image before spinning it up. If an image is unsigned or pulled from an untrusted public registry, the cluster must block the deployment.
- **Runtime Security:** Deploy an eBPF-based runtime security tool (like Cilium, Falco or Tetragon) to monitor for malicious activity at the kernel level, such as unexpected child processes (e.g., `bash` or `curl`) spawning inside a production container.

---

## 3. Plain English Explanation
**Analogy:** "Think of the Kubernetes cluster as the massive headquarters building containing all your bank's different departments (containers). Inside the building, no department trusts another (mTLS / Service Mesh). The tellers cannot simply walk into the vault room—the hallways themselves are physically locked and require ID badges for every single step (Network Policies). Furthermore, before any new employee or piece of furniture (a Docker Container) is allowed inside the building by the guards, it is scanned for a cryptographic signature proving it was built by our own trusted team. Finally, security cameras (Falco) watch the employees 24/7; if a teller suddenly pulls out a crowbar (a malicious process), the cameras instantly trigger an alarm and lock them in."

---

## 4. Actionable Checklist for Developers
- [ ] **Network:** Install a Service Mesh (Istio/Linkerd) and enforce strict mTLS between all pods.
- [ ] **Network:** Write default-deny Network Policies. Whitelist traffic specifically from `Ingress -> API -> DB`.
- [ ] **Secrets:** Deploy the External Secrets Operator mapping to AWS KMS / HashiCorp Vault. Do not use native K8s Secrets for production keys.
- [ ] **Access:** Bind the K8s API to your corporate IdP (OIDC) and map AD/Okta groups to strict K8s RBAC Roles. No permanent `cluster-admin` tokens.
- [ ] **Images:** Enforce Image Signing (Cosign) via an Admission Controller (Kyverno/OPA). Block untrusted registries.
- [ ] **Runtime Tools:** Install a runtime threat-detection monitor like Falco, configured to alert on shell execution (`/bin/sh`) inside containers.
- [ ] **Pod Security:** Enforce Pod Security Standards (Restricted). Prevent any pod from running as `root` or mounting the host filesystem.
