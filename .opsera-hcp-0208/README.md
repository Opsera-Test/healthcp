# Opsera Code-to-Cloud – hcp-0208

Quick Setup: **AWS us-west-2**, tenant **opsera**, env **dev**.

## One-time setup

1. **GitHub secrets** (repo or org): `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `GH_PAT`.
2. **ArgoCD app repo URL**: In `argocd/dev/application.yaml`, replace `REPO_PLACEHOLDER` with your GitHub repo (e.g. `myorg/healthcp`). Or run the **Bootstrap Infrastructure (hcp-0208)** workflow once; it will commit the correct URL.
3. **Bootstrap**: Run workflow **Bootstrap Infrastructure (hcp-0208)** once (Actions → Run workflow, confirm with `yes`).

## Deploy

- Push to `main` runs **CI Build & Push (hcp-0208 dev)** (build → ECR push → manifest update).
- Or trigger **CI Build & Push (hcp-0208 dev)** manually from Actions.

## Debug

- Run **Diagnostics (hcp-0208)** from the Actions tab for a summary and check commands.
- 503 / ImagePull: see [troubleshooting](https://docs.opsera.dev) or run `unified-c2c-troubleshooting` with app name `hcp-0208`.

## Endpoint

| Environment | URL |
|-------------|-----|
| **Dev** | **https://hcp-0208-dev.agent.opsera.dev** |

(Health/root: same URL; no separate `/health` required for routing.)

## ArgoCD

- Hub: argocd-usw2.agent.opsera.dev | Spoke: opsera-usw2-np

## Troubleshooting: "default backend - 404"

This means the request reached the cluster’s Ingress controller but **no Ingress matches the host** `hcp-0208-dev.agent.opsera.dev`. The controller then serves its default backend, which returns 404.

**Fix:**

1. **Apply the ArgoCD Application to the hub (recommended):** Add repo secret **`HUB_KUBECONFIG_B64`** (base64 kubeconfig for hub). Run workflow **Apply ArgoCD Application (hcp-0208)** once. Wait 1–2 min, then open the endpoint.
2. **Or apply manually:** `kubectl apply -f .opsera-hcp-0208/argocd/dev/application.yaml` (against hub).
3. **Private repo:** Add ArgoCD repo credential (e.g. GH_PAT) for this repo.

## Layout

- `opsera-config.yaml` – app/tenant/region/cluster (single source of truth)
- `k8s/base/` – Deployment (port 8080), Service, Ingress
- `k8s/overlays/dev/` – dev overlay and namespace
- `argocd/dev/application.yaml` – ArgoCD Application for dev
