#!/usr/bin/env bash

set -euo pipefail
# Usage: ./deploy.sh <REGION> <SERVICE_NAME>

# Example: ./deploy.sh us-central1 gemini-supabase-connector

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <REGION> <SERVICE_NAME>"
  exit 2
fi

GCP_PROJECT_ID="indigo-muse-484916-t6"
REGION="$1"
SERVICE_NAME="$2"
SUPABASE_URL="https://ivrbpglzldxfpwdslonh.supabase.co"

# Prompt for service role key if not provided in env

if [ -z "${SERVICE_ROLE_KEY:-}" ]; then
  read -rsp "Paste SUPABASE SERVICE ROLE KEY (will not echo): " SERVICE_ROLE_KEY
  echo
fi

gcloud config set project "$GCP_PROJECT_ID"

# Create or update secrets

if ! gcloud secrets describe supabase-service-role-key --project="$GCP_PROJECT_ID" >/dev/null 2>&1; then
  echo -n "$SERVICE_ROLE_KEY" | gcloud secrets create supabase-service-role-key --data-file=- --replication-policy="automatic" --project="$GCP_PROJECT_ID"
else
  echo -n "$SERVICE_ROLE_KEY" | gcloud secrets versions add supabase-service-role-key --data-file=- --project="$GCP_PROJECT_ID"
fi

if ! gcloud secrets describe supabase-url --project="$GCP_PROJECT_ID" >/dev/null 2>&1; then
  echo -n "$SUPABASE_URL" | gcloud secrets create supabase-url --data-file=- --replication-policy="automatic" --project="$GCP_PROJECT_ID"
else
  echo -n "$SUPABASE_URL" | gcloud secrets versions add supabase-url --data-file=- --project="$GCP_PROJECT_ID"
fi

IMAGE="gcr.io/$GCP_PROJECT_ID/$SERVICE_NAME"
echo "Building image $IMAGE ..."
gcloud builds submit --tag "$IMAGE" --project="$GCP_PROJECT_ID"

echo "Deploying to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE" \
  --region "$REGION" \
  --platform managed \
  --no-allow-unauthenticated \
  --set-secrets "SUPABASE_SERVICE_ROLE_KEY=supabase-service-role-key:latest,SUPABASE_URL=supabase-url:latest" \
  --project "$GCP_PROJECT_ID"

echo
echo "Deployment finished. To view logs:"
echo "gcloud logs read --project=$GCP_PROJECT_ID --limit=50 \"resource.type=cloud_run_revision AND resource.labels.service_name=$SERVICE_NAME\" --format='json' | jq -r '.[].textPayload'"
