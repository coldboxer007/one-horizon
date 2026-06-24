#!/usr/bin/env bash
# ============================================================================
# 1 Horizon — Google Cloud Run deploy helper
# ----------------------------------------------------------------------------
# Usage: ./deploy.sh
#
# Requires: gcloud CLI authenticated as a user with roles/run.admin +
#           roles/cloudbuild.builds.editor + roles/artifactregistry.writer
#           on the target project.
# ============================================================================

set -euo pipefail

PROJECT_ID="${PROJECT_ID:-onehorizon-494120}"
REGION="${REGION:-us-central1}"
SERVICE="${SERVICE:-one-horizon}"

echo "────────────────────────────────────────────────────────────────────────"
echo " Deploying ${SERVICE} → ${PROJECT_ID} (${REGION})"
echo "────────────────────────────────────────────────────────────────────────"

# Make sure we're operating on the right project (no-op if already set).
gcloud config set project "${PROJECT_ID}" >/dev/null

# Build the container from source using Cloud Build, then deploy to Cloud Run.
# --source . uses the Dockerfile at the repo root automatically.
gcloud run deploy "${SERVICE}" \
  --source . \
  --region "${REGION}" \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --concurrency 80 \
  --timeout 60s \
  --set-env-vars "NODE_ENV=production,NEXT_TELEMETRY_DISABLED=1"

echo ""
echo "Deploy complete. Service URL:"
gcloud run services describe "${SERVICE}" \
  --region "${REGION}" \
  --format="value(status.url)"
