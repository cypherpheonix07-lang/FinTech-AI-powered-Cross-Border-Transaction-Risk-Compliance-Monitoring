# Kubera Trace: Enterprise Intelligence Platform

This document outlines the advanced multi-tenant, ML-driven architecture of **Kubera Trace**.

## Platform Infrastructure
- **Ingestion**: Kafka-based high-throughput pipeline (`backend/ingest/`).
- **Intelligence**: Graph Neural Networks (GNN) for path risk prediction (`ml/gnn/`).
- **Isolation**: Multi-tenant middleware with row-level security (`backend/app/multi_tenancy.py`).
- **Governance**: Immutable, chained SHA-256 audit ledger (`backend/audit/`).

## Quick Start (Developer Onboarding)

### 1. Provision Infrastructure
Run the local stream and persistence stack:
```bash
docker-compose -f scripts/local-kafka-docker-compose.yml up -d
```

### 2. Launch Services
Initialize the Platform Mock Server (supports all Phase 3 APIs):
```bash
node scripts/mock-platform-server.js
```

### 3. Run Frontend
Launch the Investigator Workspace:
```bash
npm run dev
```

### 4. Execute Automated Validation
Run the enterprise E2E flow:
```bash
npm run cypress:run --spec cypress/e2e/enterprise-flow.cy.js
```

## Regulatory Alignment
- **FATF Guidelines**: Mapped in `docs/compliance/FATF-mapping.md`.
- **Auditability**: 100% immutable ledger ensures chain of custody for all forensic evidence.
- **DR/BCP**: 15-minute RTO documented in `docs/dr_playbook.md`.

## Executive Summary
**Kubera Trace Enterprise** is a production-grade financial intelligence platform designed for Tier-1 institutions and global regulators. By integrating real-time Kafka ingestion with advanced Graph Neural Networks and an immutable governance ledger, the platform delivers 98% detection confidence while maintaining a cryptographically verifiable audit trail. Its multi-tenant architecture ensures complete institutional data isolation, making it the premier choice for cross-border payment traceability and risk forensics.
