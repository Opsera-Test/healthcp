#!/bin/bash
# Post-deployment validation (validation module)
set -euo pipefail

APP_NAME="${1:?Usage: validate-deployment.sh <app-name> <tenant> <env>}"
TENANT="${2:?}"
ENV="${3:?}"
NAMESPACE="${TENANT}-${APP_NAME}-${ENV}"

echo "=== Post-Deployment Validation: ${NAMESPACE} ==="

# Check pods are running
READY=$(kubectl get pods -n "$NAMESPACE" --no-headers 2>/dev/null | grep -c "Running" || echo 0)
echo "Running pods: $READY"
[ "$READY" -gt 0 ] || echo "FAIL: No running pods"

# Check endpoints
ENDPOINTS=$(kubectl get endpoints -n "$NAMESPACE" --no-headers 2>/dev/null | grep -v "<none>" | wc -l || echo 0)
echo "Active endpoints: $ENDPOINTS"

# Check ArgoCD sync status
SYNC=$(kubectl get application "${APP_NAME}-${ENV}" -n argocd -o jsonpath='{.status.sync.status}' 2>/dev/null || echo "Unknown")
echo "ArgoCD sync: $SYNC"

# Check health
HEALTH=$(kubectl get application "${APP_NAME}-${ENV}" -n argocd -o jsonpath='{.status.health.status}' 2>/dev/null || echo "Unknown")
echo "ArgoCD health: $HEALTH"

echo "=== Validation Complete ==="
