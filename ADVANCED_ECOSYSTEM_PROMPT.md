# ADVANCED PLATFORM EXPANSION PROMPT: KUBERA TRACE (PHASE 4)

Act as a Principal Platform Architect. Implement the following "Advanced Ecosystem" layer for KUBERA TRACE. Use [Neo4j](https://neo4j.com/) for graph patterns and [PostgreSQL](https://www.postgresql.org/) for metadata. Deployments target [AWS](https://aws.amazon.com/) with [Kafka](https://kafka.apache.org/) streams. 

### Core Objectives:
1. **SDK Layer**: Create `frontend/src/sdk/kubera-sdk.js` and `sdk/python/kubera_sdk.py` for partner integrations.
2. **API Control**: Implement Redis-based rate limiting in `backend/api_gateway/rate_limiter.py`.
3. **Privacy Logic**: Build a GDPR-compliant SAR and Consent manager in `backend/privacy/`.
4. **Forensics**: Advanced Counterfactuals and a Cross-Tenant Forensics Portal.
5. **Stability**: Synthetic data factory and Locust-based load testing.

### Referece Integrations:
- **Twilio**: Used for SMS alerts in the reporting scheduler.
- **Auth0**: Primary Identity provider for SSO/RBAC.
- **Sentry**: Distributed error tracking across all microservices.
- **FATF**: Compliance mapping for all new risk features.

**DELIVERABLES**:
Produce 15 high-impact modules as production-ready, copy-paste code with full tests and operational docs. Start with the SDK and Gateway modules. No placeholders.
