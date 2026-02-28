# PathGuard Security Specification: Database Architecture

## Overview
This document outlines the Bank-Grade Security Layers required to secure the **Database Architecture**. The database is the ultimate vault of the PathGuard system. If it is breached, the entire platform is compromised.

---

## 1. Risk Analysis
**What could go wrong?**
- **Data Exfiltration:** A hacker exploits a SQL Injection vulnerability or breaches the server to download the entire database containing user balances, PII, and transaction histories.
- **Ransomware/Destruction:** An attacker deletes the database or holding the data hostage, halting all money transfers and destroying the audit trail.
- **Insider Snooping:** A rogue database administrator queries the database to view VIP customer balances or extract Personal Identifiable Information (PII).

---

## 2. Bank-Grade Solutions (The 5 Layers)

### Layer 1: Encryption at Rest (The Vault)
Encryption at rest is the foundational defense for any database storing financial data.
- **Requirement:** Enable **Transparent Data Encryption (TDE)** at the storage level using AES-256. This ensures that the underlying disk, backups, and snapshots are unreadable without the master key.
- **Application-Level Encryption (ALE):** For highly sensitive fields (e.g., National ID numbers, exact routing numbers), the application must encrypt the data *before* sending it to the database. The database should only see ciphertext.

### Layer 2: Key Management (The Key)
- **Requirement:** Database encryption keys must be managed by a dedicated KMS (Key Management Service) such as AWS KMS, Azure Key Vault, or HashiCorp Vault.
- **Key Rotation:** Implement automated key rotation every 90 days. The database must support reading data with older keys while writing new data with the current key.

### Layer 3: Encryption in Transit (The Tube)
- **Requirement:** All connections from the application servers to the database cluster must be encrypted using **TLS 1.3**.
- **Internal Network:** The database must never be exposed to the public internet. It must reside in a strictly isolated private subnet, accessible only by authorized application servers.

### Layer 4: Authentication & Authorization (The ID)
- **Requirement:** Database access must follow the Principle of Least Privilege.
- **Service Accounts:** The API backend should connect using a restricted service account that can only perform necessary CRUD operations (e.g., no `DROP TABLE` permissions).
- **Human Access (Break-Glass):** If a DBA needs direct access, they must authenticate via a Bastion Host / VPN using MFA, and their temporary credentials should expire after a set time (e.g., 1 hour).

### Layer 5: Transaction Integrity & Auditing (The Ledger)
- **Requirement:** Enable Database Audit Logging to track all access and modifications.
- **WORM Storage:** Send all database audit logs to an immutable Write-Once-Read-Many (WORM) storage system (e.g., AWS S3 Object Lock) to prevent tampering by a compromised DBA account.

---

## 3. Plain English Explanation
**Analogy:** "Think of the database as the main vault deep underground. The vault itself is made of solid steel (Encryption at Rest), and the only way to get to it is through a secure, private tunnel (Encryption in Transit on a private subnet). The people who load money into the vault (the application) have limited access—they can drop money in, but they can't demolish the vault or change the lock (Principle of Least Privilege). If a manager ever needs to go inside for maintenance, they have to wear a body cam that streams directly to an indestructible black box (Database Audit Logging), so we always have a permanent record of what happened."

---

## 4. Actionable Checklist for Developers
- [ ] **Infrastructure:** Deploy the database in an isolated Private Subnet with no public IP.
- [ ] **Encryption:** Enable TDE (AES-256) on the database instance and all automated backups/snapshots.
- [ ] **Data Protection:** Implement Application-Level Encryption for ultra-sensitive PII columns (e.g., `tax_id`, `routing_number`) using a KMS.
- [ ] **Network:** Enforce TLS connections from the application and disable plaintext connections.
- [ ] **Access Control:** Create restricted database roles for the application (read/write only) and disable the root/admin user for daily operations.
- [ ] **Auditing:** Enable native database audit logging (e.g., pgAudit for PostgreSQL) and route the logs to immutable storage.
