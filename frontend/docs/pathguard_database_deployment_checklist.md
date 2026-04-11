# PathGuard Security: Database Deployment Checklist

## Overview
This checklist provides the exact, copy-pasteable configuration requirements for securely deploying the PathGuard PostgreSQL database for the Phase 1 State Pilot. You can hand this directly to your DevOps/Cloud engineer or use it as a prompt definition for an AI to generate Infrastructure as Code (e.g., Terraform).

---

## 1. Cloud Provider & Network Level (The Moat)
The database must never physically or logically touch the public internet.

- [ ] **Private Subnet Only:** Deploy the PostgreSQL instance (e.g., AWS RDS or Azure Database) into a strictly isolated Private Subnet.
- [ ] **No Public IP:** Ensure the "Publicly Accessible" flag is set to `FALSE`.
- [ ] **VPC Security Groups / Firewall Rules:**
  - `Inbound`: Allow generic PostgreSQL traffic (Port 5432) **ONLY** from the internal security group attached to the Backend API microservices.
  - `Outbound`: Restrict outbound traffic to internal logging services and KMS endpoints only.

## 2. Encryption at Rest (The Vault)
Protecting the physical disk and the backups from theft.

- [ ] **Storage Encryption:** Enable Transparent Data Encryption (TDE) via your cloud provider (e.g., AWS KMS Key Encryption for RDS).
- [ ] **Custom KMS Key:** Do NOT use the default AWS/Azure managed key. Create a Customer Managed Key (CMK) specifically named `pathguard-db-encryption-key` to allow for strict key rotation policies.
- [ ] **Encrypted Backups:** Verify that automated snapshots and cross-region replication backups inherit this encryption setting.

## 3. Encryption in Transit (The Tube)
Protecting data as the API reads/writes to the database.

- [ ] **Require SSL/TLS:** Set the PostgreSQL parameter `rds.force_ssl = 1` (or equivalent) to violently reject any plaintext connections.
- [ ] **API Connection Strings:** Ensure the Go/Java backend includes `sslmode=require` (or `verify-full` if using internal Certificate Authorities) in its connection string.

## 4. Authentication & Authorization (The ID)
Applying the Principle of Least Privilege.

- [ ] **Disable Root After Setup:** Use the default master user (e.g., `postgres`) ONLY for the initial database setup and schema creation. Never use it in the API application.
- [ ] **Application Service Account:** Create a restricted user:
  ```sql
  CREATE ROLE api_service WITH LOGIN PASSWORD '<SECURE_GENERATED_PASSWORD>';
  GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO api_service;
  -- NOTICE: No DROP or DELETE privileges granted.
  ```
- [ ] **Password Management:** Store the `<SECURE_GENERATED_PASSWORD>` directly in an external vault (AWS Secrets Manager) which injects it into the API container at runtime. Never put it in an `.env` file.

## 5. Transaction Integrity & Audit Logging (The Ledger)
Ensuring an immutable trail of DBA actions.

- [ ] **Enable native Audit Logging:** Turn on the `pgaudit` extension for PostgreSQL to log all destructive or sensitive query types (`ROLE`, `DDL`, `MISC`, `READ`, `WRITE`).
- [ ] **Export Logs:** Stream the database access logs to external, centralized logging (e.g., AWS CloudWatch).
- [ ] **Immutable Storage (WORM):** Configure the logging destination (e.g., an S3 Bucket) to use Object Lock in Compliance Mode for a minimum of 30 days. This prevents even a root administrator from terminating the logs.

---

## 📋 Developer Prompt Template (Terraform Generation)

If you want an AI to immediately architect this infrastructure, copy-paste this prompt into your Ollama or LLM:

```text
Role: Senior DevSecOps Engineer
Task: Generate Terraform code to deploy a highly secure AWS RDS PostgreSQL instance for the PathGuard MVP.

Requirements:
1. The RDS instance must reside in a Private Subnet (no public IP).
2. It must use a custom AWS KMS Customer Managed Key for storage encryption.
3. Ingress Security Group rules must only allow Port 5432 from a specific `api_security_group_id`.
4. Enable `storage_encrypted = true`.
5. Require SSL connections via the parameter group.
6. Enable CloudWatch log exports for `postgresql` and `upgrade` logs.
7. Return clean, modular Terraform (.tf) code with comments explaining the security layers.
```
