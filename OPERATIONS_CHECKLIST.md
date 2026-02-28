# Kubera Trace: Phase 4 Operations Validation Checklist

This checklist validates the Advanced Platform Ecosystem locally before production deployment.

## Prerequisites
```bash
# Ensure dependencies are installed
pnpm install
pip install pytest requests locust cryptography
```

## 1. SDK Validation (5 min)

### JavaScript SDK
```bash
# Test SDK import and initialization
node -e "const SDK = require('./frontend/src/sdk/kubera-sdk.js').default; console.log('SDK loaded');"
```

### Python SDK
```bash
# Test Python client
python -c "from sdk.python.kubera_sdk import KuberaClient; client = KuberaClient(); print('Client initialized')"
```

## 2. Backend Services (10 min)

### Rate Limiter
```bash
pytest backend/tests/test_ecosystem.py::test_rate_limiter_sliding_window -v
```

### Privacy & Consent
```bash
pytest backend/tests/test_ecosystem.py::test_consent_lifecycle -v
```

### Secure Enclave
```bash
pytest backend/tests/test_ecosystem.py::test_secure_enclave_attestation -v
```

### Counterfactual Engine
```bash
pytest backend/tests/test_ecosystem.py::test_counterfactual_logic -v
```

## 3. Security & Compliance (5 min)

### Threat Model Generation
```bash
python scripts/threat_model/generate_report.py --env dev
# Verify: threat_report_dev.md is created
```

### SOC2 Checklist
```bash
python docs/compliance/soc2_checklist_generator.py
# Verify: soc2_readiness_production.md is created
```

## 4. Data Operations (10 min)

### Synthetic Data Factory
```bash
python tools/synthetic/synthetic_generator.py
# Verify: synthetic_transactions.csv is created with 500 MULE scenario records
```

### Schema Registry
```bash
python -c "from backend.catalog.schema_registry import SchemaRegistry; print(SchemaRegistry.get_datasets())"
```

## 5. Performance Testing (15 min)

### Locust Load Test (Smoke Run)
```bash
# Start mock server first
node scripts/mock-platform-server.js &

# Run short load test
locust -f tools/loadtest/locustfile.py --headless --users 10 --spawn-rate 2 --run-time 30s --host http://localhost:8000
```

## 6. Frontend Components (10 min)

### Storybook Validation
```bash
npm run storybook
# Navigate to: Ecosystem/Components → CounterfactualAnalysis
# Navigate to: Ecosystem/Components → ReportScheduler
```

### Unit Tests
```bash
npm run test:unit
```

## 7. End-to-End Workflows (10 min)

### GDPR SAR Flow
```bash
npm run cypress:run --spec cypress/e2e/sar.cy.js
```

### Enterprise Flow (from Phase 3)
```bash
npm run cypress:run --spec cypress/e2e/enterprise-flow.cy.js
```

## 8. CI/CD Pipeline (5 min)

### Validate Extended Platform CI
```bash
# Check workflow syntax
cat .github/workflows/extended-platform-ci.yml

# Note: GitHub Actions validation requires push to repository
```

## Success Criteria

- [ ] All pytest tests pass (4/4)
- [ ] Threat model and SOC2 reports generated
- [ ] Synthetic data CSV created with correct schema
- [ ] Locust completes without errors
- [ ] Storybook renders both new components
- [ ] Cypress E2E tests pass (2/2)
- [ ] No console errors in browser during Storybook review

## Estimated Total Time: ~60 minutes

## Troubleshooting

**Issue**: `ModuleNotFoundError` for backend modules
**Fix**: Ensure you're running from project root and Python path includes `backend/`

**Issue**: Locust can't connect to host
**Fix**: Verify `mock-platform-server.js` is running on port 8000

**Issue**: Cypress tests fail on auth
**Fix**: Check that mock server implements `/auth` endpoint with demo credentials

## Next Steps After Validation

1. Review generated threat model for production hardening
2. Configure real Twilio credentials in `backend/reports/scheduler.py`
3. Set up Redis for production rate limiting
4. Deploy to staging environment using Helm charts in `helm/kubera-chart/`
