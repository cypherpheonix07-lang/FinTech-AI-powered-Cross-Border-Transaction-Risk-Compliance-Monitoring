#!/usr/bin/env bash
# scripts/fast_setup.sh
# Usage: bash scripts/fast_setup.sh
# Quick heavy-force deployment: builds containers, waits for services, ingests datasets, trains models, reloads ML, runs a quick end-to-end test (register/login/tx/sim).
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# Container names (adjust if you changed compose)
FRML_CONTAINER="tt_fraud_ml"
BACK_CONTAINER="tt_backend"
# If docker-compose uses different service names, set them here before running.

# Helper: wait for URL
wait_for_url() {
  url=$1
  timeout=${2:-180}
  echo "Waiting for $url (timeout ${timeout}s)..."
  for i in $(seq 1 $timeout); do
    if curl -s --max-time 3 "$url" >/dev/null 2>&1; then
      echo "  $url is up."
      return 0
    fi
    sleep 1
  done
  echo "Timed out waiting for $url" >&2
  return 1
}

echo "--- Step 1: Docker Compose up (build) ---"
docker-compose down -v || true
docker-compose up -d --build

echo "--- Step 2: wait for core services ---"
wait_for_url "http://localhost:8000/api/health" 180 || true
wait_for_url "http://localhost:4000/api/health" 180 || true
# Neo4j web console quick-check
wait_for_url "http://localhost:7474" 120 || true

echo "--- Step 3: ingest Kaggle Excel files into canonical CSV (if present) ---"
if [ -f ml/ingest_excel.py ]; then
  echo "Running ml/ingest_excel.py..."
  python ml/ingest_excel.py || echo "ingest_excel.py failed — continuing"
else
  echo "No ml/ingest_excel.py — skipping ingestion"
fi

echo "--- Step 4: train models (supervised + iforest) locally ---"
if [ -f ml/train_supervised.py ]; then
  echo "Running ml/train_supervised.py (this may take a few minutes)..."
  python ml/train_supervised.py || echo "train_supervised.py failed — continuing"
else
  echo "No ml/train_supervised.py found — skipping local train"
fi

# Ensure models exist
MODEL_DIR="fraud-ml-service/models"
if [ -d "$MODEL_DIR" ] && ls "$MODEL_DIR"/* >/dev/null 2>&1; then
  echo "Model artifacts found in $MODEL_DIR"
else
  echo "No model artifacts found locally at $MODEL_DIR. If training ran inside container, ensure a model is present in container."
fi

echo "--- Step 5: copy model artifacts into fraud-ml container (if container exists) ---"
# if container not running, try to find container name
if docker ps --format '{{.Names}}' | grep -q "^${FRML_CONTAINER}\$"; then
  echo "Copying models to container ${FRML_CONTAINER}..."
  docker cp "$MODEL_DIR" "${FRML_CONTAINER}:/app/" || echo "docker cp failed — check container name"
else
  echo "Container ${FRML_CONTAINER} not found, attempting to find any container with fraud-ml in name..."
  maybe=$(docker ps --format '{{.Names}}' | grep -i fraud-ml || true)
  if [ -n "$maybe" ]; then
    echo "Found possible container: $maybe"
    docker cp "$MODEL_DIR" "${maybe}:/app/" || echo "docker cp failed with $maybe"
    FRML_CONTAINER="$maybe"
  else
    echo "Fraud-ml container not found; skip docker cp."
  fi
fi

echo "--- Step 6: instruct fraud-ml to reload models ---"
curl -s -X POST http://localhost:8000/api/fraud/reload-models || echo "reload-models endpoint failed or service not ready."

echo "--- Step 7: seed Neo4j (fast) ---"
if [ -f data/neo4j_seed.py ]; then
  python data/neo4j_seed.py || echo "neo4j_seed.py failed — continuing"
else
  echo "No data/neo4j_seed.py found — skipping seeding"
fi

echo "--- Step 8: quick backend migrations (Prisma) ---"
# We need to run this inside the backend container or locally if config is correct
# Running locally requires DATABASE_URL env var.
# Let's try inside container first
if docker ps --format '{{.Names}}' | grep -q "^${BACK_CONTAINER}\$"; then
    echo "Running prisma migration inside ${BACK_CONTAINER}..."
    docker exec "${BACK_CONTAINER}" npx prisma migrate dev --name init_auto || echo "prisma migrate inside container failed"
else
     echo "${BACK_CONTAINER} not found. Trying local."
     if [ -f package.json ]; then
      echo "Generating Prisma client and running migration..."
      npx prisma generate || echo "prisma generate failed"
      # run migrate dev only if DB empty or need; we attempt
      set +e
      npx prisma migrate deploy || echo "prisma migrate deploy failed (ok in CI)"
      set -e
    else
      echo "No package.json found — skipping prisma"
    fi
fi

echo "--- Step 9: quick smoke automated test via Node script ---"
if [ -f scripts/register_and_test.js ]; then
  node scripts/register_and_test.js || echo "register_and_test.js finished with issues — check logs"
else
  echo "scripts/register_and_test.js not found — create and run manually"
fi

echo "--- Setup complete. Check logs and UI. ---"
echo "Tail logs if needed: docker-compose logs -f backend fraud-ml neo4j"
