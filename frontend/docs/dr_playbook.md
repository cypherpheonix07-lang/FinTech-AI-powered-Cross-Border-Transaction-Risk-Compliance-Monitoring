# Disaster Recovery (DR) Playbook: KUBERA TRACE

## 1. RTO & RPO Objectives
- **Recovery Time Objective (RTO)**: 15 Minutes for core trace services.
- **Recovery Point Objective (RPO)**: 0 Seconds (Zero Data Loss) using Multi-AZ synchronous replication.

## 2. Failure Scenarios

### Scenario A: Regional Ingestion Failure (Kafka/Zookeeper)
1. **Symptoms**: `/sse/graph-events` latency > 10s.
2. **Action**: Redirect producers to DR Regional Endpoint (`scripts/kafka-failover.sh`).
3. **Recovery**: Consumer offset sync from mirror-maker.

### Scenario B: Database Corruption (Postgres/Neo4j)
1. **Action**: Trigger Point-in-Time Recovery (PITR) using S3 backups via Terraform:
   ```bash
   terraform apply -var="db_snapshot_id=snap-0xabc"
   ```
2. **Action**: Verify **Audit Ledger** integrity using `backend/audit/append_ledger.py --verify`.

## 3. Communication Strategy
- **Internal**: Slack #platform-outage
- **External**: StatusPage integrated via **Comm Core**.

## 4. Recovery Confirmation Checklist
- [ ] Tenant Isolation Middleware responding 200 OK.
- [ ] OPA Governance Engine reachable at port 8181.
- [ ] WS Collaboration channel broadcasting messages.
- [ ] Prometheus scraping active across 3 nodes.
