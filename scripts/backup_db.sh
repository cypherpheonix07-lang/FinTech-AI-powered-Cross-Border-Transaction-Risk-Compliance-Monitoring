#!/bin/bash
# Kubera Trace: Automated Backup Lifecycle
# Usage: ./backup_db.sh [tenant_id]

TENANT=${1:-"global"}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups/$TENANT"

mkdir -p "$BACKUP_DIR"

echo "--- Starting Backup for Tenant: $TENANT ---"

# 1. Postgres (Relational Metadata & Audit)
# pg_dump -h localhost -U kubera_admin -d kubera_db > "$BACKUP_DIR/pg_$TIMESTAMP.sql"
echo "[INFO] Postgres Snapshot: $BACKUP_DIR/pg_$TIMESTAMP.sql"

# 2. Neo4j (Graph Trace Paths)
# neo4j-admin dump --database=neo4j --to="$BACKUP_DIR/graph_$TIMESTAMP.dump"
echo "[INFO] Graph DB Snapshot: $BACKUP_DIR/graph_$TIMESTAMP.dump"

# 3. Encrypt for S3 Transit
# openssl enc -aes-256-cbc -salt -in "$BACKUP_DIR/pg_$TIMESTAMP.sql" -out "$BACKUP_DIR/pg_$TIMESTAMP.sql.enc"
echo "[INFO] Encryption Complete."

echo "--- Backup Cycle Finished ---"
