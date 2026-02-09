# Workflow triggers – healthcp-0209

## What runs on push to `main`

Only these run automatically on push (and only when listed paths change):

| Workflow | Runs when |
|----------|-----------|
| **CI Build & Deploy (dev)** | Push changes to `src/`, `public/`, `package.json`, `vite.config.ts`, `.opsera-healthcp-0209/Dockerfile`, `nginx.conf` |
| **Quality & Security Gates** | Push or PR changes to `src/`, `public/`, `package.json`, `.github/workflows/` |
| **Deployment Landscape** | After "CI Build & Deploy (dev)" completes (success or failure) |

All other workflows are **manual or called by other workflows** (no push trigger).

## Why runs fail before bootstrap

- **Bootstrap** has not been run yet, so ECR, namespaces, and ArgoCD apps may not exist.
- **Dev CI** needs: AWS secrets, `KUBECONFIG_SPOKE`, and a successful bootstrap.
- **QA / Staging / Deploy** need to be run manually (or via Promotion Chain) with an image tag after dev succeeds.

## Order to run

1. **Once:** Actions → **Bootstrap Infrastructure - healthcp-0209** → Run workflow.
2. **On each deploy:** Push to `main` (with source changes) runs dev CI; or run **CI Build & Deploy (dev)** manually.
3. **To promote:** Run **Promotion Chain - healthcp-0209** with the dev image tag.
