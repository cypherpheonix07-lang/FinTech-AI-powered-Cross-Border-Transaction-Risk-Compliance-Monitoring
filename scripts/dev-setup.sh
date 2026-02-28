#!/bin/bash
# Kubera Trace: Enterprise Dev Setup
# Installs all necessary dependencies for backend, frontend, and ml workspaces.

echo "--- Initializing Kubera Trace Enterprise Environment ---"

# 1. Frontend Deps
echo "[INFO] Installing Frontend Dependencies (pnpm)..."
pnpm install

# 2. Backend & ML Deps
echo "[INFO] Configuring Python Virtual-Env..."
python -m venv venv
source venv/bin/activate || source venv/Scripts/activate
pip install fastapi uvicorn aiokafka requests pytest pydantic torch

# 3. Provision Local Infra
echo "[INFO] Spawning Docker Infrastructure (Kafka/Zookeeper)..."
docker-compose -f scripts/local-kafka-docker-compose.yml up -d

echo "--- Setup Complete. Intelligence Engine Ready. ---"
