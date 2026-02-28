# PathGuard Security Simulation: Scenario 4

## Threat Scenario: Database Ransomware & Theft
**Attacker Goal:** An Advanced Persistent Threat (APT) group breaches the underlying server infrastructure hosting the primary PostgreSQL database. They attempt to download the `.mdf` and snapshot files to extort the company, or alternatively, execute a `DROP DATABASE` command to hold the system hostage.

---

## The Attack Execution
1. **The Breach:** The attacker finds a Zero-Day vulnerability in a third-party logging agent running on the same Linux host as the database. They exploit it to gain root shell access to the VM.
2. **The Exfiltration:** The attacker locates the PostgreSQL data directory (`/var/lib/postgresql/data`) and creates a `.tar` archive of the raw database files, downloading the 500GB file to an external server.
3. **The Extortion:** The attacker attempts to read the tables to find user Social Security Numbers and account balances to use as leverage for a ransomware demand.
4. **The Destruction:** As a final act of desperation, the attacker logs into the local database instance using a default `postgres` or `admin` credential they brute-forced, and executes `DROP DATABASE pathguard_prod;`.

---

## How PathGuard Defends It (The 5 Layers in Action)

### Defense 1: Encryption at Rest (TDE & Application-Level Encryption)
The attacker successfully downloads the massive 500GB `.tar` archive containing the raw database files.
- They unzip the archive and attempt to open the files using a hex editor or a local database instance.
- The entire database is encrypted using **Transparent Data Encryption (AES-256)** at the storage level. Because the attacker only stole the files—and not the AWS KMS Master Encryption Key—the files are mathematically indistinguishable from random noise.
- The attacker cannot read the user balances. **The extortion fails.**

### Defense 2: Encryption at Rest (Application-Level)
Let's pretend the attacker somehow managed to steal the TDE Master Key as well, unlocking the database wrapper.
- They query the `users` table looking for Social Security Numbers and routing numbers.
- However, the PathGuard API uses **Application-Level Encryption (ALE)** for highly sensitive columns. The `ssn` column contains data like `enc_kx8923hjd8...`. 
- The key to decrypt these specific columns only exists in the memory of the API containers inside Kubernetes, never on the database server itself. The data remains unreadable. **The secondary extortion fails.**

### Defense 3: Authentication & Authorization (Least Privilege & Bastion Hosts)
The attacker gives up on reading the data and decides to destroy it by executing `DROP DATABASE pathguard_prod;`.
- They try to log in using the `postgres` root account. The root account was disabled during provisioning.
- They try to use the credentials they scraped from the API's environment variables. However, the API uses a restricted service account that only has `SELECT`, `INSERT`, `UPDATE` privileges on specific rows. It does not have `DROP` privileges.
- The command `DROP DATABASE pathguard_prod;` is rejected with a `403 Permission Denied`. **The destructive attack fails.**

### Defense 4: Compliance & Governance (Immutable Backups & WORM Logs)
Let's pretend the attacker somehow gained a full-blown DBA credential and managed to delete the database.
- The PathGuard infrastructure is configured to take continuous, automated backups every 5 minutes.
- These backups are immediately shipped to an isolated AWS S3 bucket with **Object Lock (WORM - Write Once Read Many)** enabled.
- The attacker attempts to delete the backups to maximize the damage. AWS blocks the `DeleteObject` command at the hardware/infrastructure level, even for the root AWS account, until the 30-day retention period expires.
- The PathGuard DevOps team restores the database from the 5-minute-old immutable backup with zero data loss. **The ransomware attack is completely neutralized.**

---

## 🏁 Safety Verdict
❌ **Attack Blocked / Recovered.** 
The combination of layered encryption (TDE + ALE) renders stolen data completely useless to hackers. Strict Principle of Least Privilege prevents catastrophic database deletion from restricted accounts. Finally, immutable, WORM-compliant backups guarantee that even in a worst-case destruction scenario, the data is recoverable and the extortion attempt fails.

---

**Analogy:** "A thief breaks into the underground vault (the Database Server) and manages to steal the giant steel safe containing the bank ledgers. When they pry it open, they find all the numbers have been replaced with a secret code (TDE). Even if they figure out the first code, the most sensitive pages are written in invisible ink that only the bank teller upstairs knows how to read (Application-Level Encryption). Frustrated, the thief tries to burn the vault down (DROP DATABASE), but realizes the bank secretary automatically photocopies every page every 5 minutes and drops it into an indestructible mailbox (Immutable Backups) that even the bank CEO can't open for 30 days."
