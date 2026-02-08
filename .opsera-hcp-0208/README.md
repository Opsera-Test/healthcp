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

## URLs

- Dev: https://hcp-0208-dev.agent.opsera.dev (once DNS and ingress are ready)
- ArgoCD: argocd-usw2.agent.opsera.dev (spoke: opsera-usw2-np)

## Layout

- `opsera-config.yaml` – app/tenant/region/cluster (single source of truth)
- `k8s/base/` – Deployment (port 8080), Service, Ingress
- `k8s/overlays/dev/` – dev overlay and namespace
- `argocd/dev/application.yaml` – ArgoCD Application for dev
