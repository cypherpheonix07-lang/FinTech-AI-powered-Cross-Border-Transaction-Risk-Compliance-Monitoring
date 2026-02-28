# ENTERPRISE PLATFORM EXPANSION PROMPT: KUBERA TRACE

Act as a Principal Platform Engineer. Implement the following Enterprise-Grade extension for KUBERA TRACE. The project structure is a monorepo: `frontend/`, `backend/`, `ml/`, `infra/`, and `scripts/`.

### 1. Backend Infrastructure (Python/FastAPI)
- `backend/app/multi_tenancy.py`: Middleware to extract `X-Tenant-ID` and scope database queries.
- `backend/services/lineage.py`: Logic to track data provenance (Source ID -> Ingested By -> Timestamp).
- `backend/audit/append_ledger.py`: Implement an append-only, SHA-256 hashed audit log.
- `backend/policy/opa_adapter.py`: Adapter for Open Policy Agent (Rego) to evaluate transaction rules.

### 2. ML & Graph Intelligence
- `ml/gnn/gnn_model.py`: Prototype PyTorch Geometric model for path embedding and risk classification.
- `ml/serving/model_server.py`: FastAPI gateway to serve model inference results.
- `backend/services/explainability.py`: Endpoint returning SHAP-based feature importance/evidence.

### 3. Data Pipeline & CI/CD
- `scripts/local-kafka-docker-compose.yml`: Local Kafka + Zookeeper stack for ingestion testing.
- `backend/ingest/kafka_consumer.py`: Consumer logic feeding Postgres and publishing graph events.
- `.github/workflows/platform-ci.yml`: Comprehensive lint/test/build pipeline for all workspaces.

### 4. Frontend & Enterprise UX (React 18 + Tailwind)
- `frontend/src/pages/InvestigatorWorkspace.jsx`: Advanced dashboard with collaborative live notes.
- `frontend/src/components/explain/AdvancedSHAPView.jsx`: High-fidelity XAI visualizations.
- `frontend/src/components/audit/ImmutableAuditLog.jsx`: Real-time audit stream UI.
- `frontend/src/pages/TenantAdmin.jsx`: Management interface for multi-tenant control.

### 5. DevOps & Compliance
- `infra/prometheus/prometheus.yml`: Monitoring configuration.
- `infra/terraform/backup_restore.tf`: Skeleton for disaster recovery.
- `docs/compliance/FATF-mapping.md`: Mapping platform features to money laundering guidelines.

**CRITICAL**: Every file must be production-ready, no placeholders. Return the full code for all listed components.
