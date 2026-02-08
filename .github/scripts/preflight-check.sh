#!/bin/bash
# Pre-flight validation for code-to-cloud deployments (validation module)
set -euo pipefail

APP_NAME="${1:?Usage: preflight-check.sh <app-name> <tenant> <env>}"
TENANT="${2:?}"
ENV="${3:?}"
ERRORS=0

echo "=== Pre-Flight Check: ${TENANT}-${APP_NAME}-${ENV} ==="

# 1. Check GitHub CLI
command -v gh >/dev/null || { echo "FAIL: gh CLI not installed"; ((ERRORS++)) || true; }

# 2. Check GitHub auth
gh auth status 2>/dev/null || { echo "FAIL: Not authenticated with GitHub"; ((ERRORS++)) || true; }

# 3. Check required secrets
for SECRET in AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY GH_PAT; do
  gh secret list 2>/dev/null | grep -q "$SECRET" || { echo "WARN: Secret $SECRET not found"; }
done

# 4. Check Dockerfile exists
[ -f ".opsera-${APP_NAME}/Dockerfile" ] || [ -f "Dockerfile" ] || { echo "FAIL: No Dockerfile found"; ((ERRORS++)) || true; }

# 5. Check manifests directory
[ -d ".opsera-${APP_NAME}/k8s" ] || echo "INFO: No k8s directory yet (will be created)"

echo "=== Pre-Flight Complete: ${ERRORS} errors ==="
[ "$ERRORS" -eq 0 ] && echo "PASS" || echo "FAIL"
exit $ERRORS
