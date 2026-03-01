# PathGuard Infrastructure: High-Availability Cloud

PathGuard is deployed on a **Resilient, Multi-Region Kubernetes Cluster**. Our infrastructure is designed to withstand both physical data center failures and sophisticated digital attacks.

## 🏗️ Orchestration Layer (Kubernetes)

We use **Amazon EKS (or Azure AKS)** to manage our microservices. The cluster is hardened according to the "CIS Kubernetes Benchmark."

- **Micro-Segmentation**: Every pod is isolated using strict Network Policies. The `Payment-Engine` group can only communicate with the `Vault-API`.
- **mTLS (Service Mesh)**: We use **Istio** to enforce Mutual TLS between all services. Even internal traffic is encrypted and verified with certificates.
- **Image Signing**: The cluster will only deploy Docker images that have been cryptographically signed by our CI/CD pipeline (using **Cosign**).

## 🔒 The Security Vault

Master encryption keys and API secrets are never stored in-cluster. We utilize **HashiCorp Vault** (or AWS KMS).

- **Dynamic Secrets**: Vault generates temporary database credentials for each pod that expire after 1 hour, reducing the "Blast Radius" of a potential breach.
- **Hardware Security Modules (HSM)**: Root keys are stored in FIPS 140-2 Level 3 compliant hardware.

## 🌐 Global Resilience Strategy

| Component | Implementation | Disaster Recovery |
| :--- | :--- | :--- |
| **Ingress** | Cloudflare WAF + DDoS Shield | Anycast routing to healthy regions. |
| **Compute** | EKS (3-Region Multi-AZ) | Pods auto-failover if a node/zone dies. |
| **Storage** | RDS (Aurora Multi-Master) | < 30s failover with zero data loss. |
| **Backups** | Immutable S3 (Object Lock) | Guaranteed recovery from ransomware. |

---

## 🛠️ Deploying the Sentinel
To provision the PathGuard infrastructure using Terraform:
```hcl
module "pathguard_cluster" {
  source = "./modules/hardened-eks"
  region = "us-east-1"
  enable_fips_compliance = true
  enable_istio_mtls = true
}
```
