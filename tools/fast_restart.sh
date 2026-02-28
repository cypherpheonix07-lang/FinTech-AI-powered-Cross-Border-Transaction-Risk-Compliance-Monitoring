#!/usr/bin/env bash
# tools/fast_restart.sh
curl -s -X POST http://localhost:8000/api/fraud/reload-models || true
docker restart tt_fraud_ml || true
sleep 3
curl -s -X POST http://localhost:8000/api/fraud/reload-models || true
