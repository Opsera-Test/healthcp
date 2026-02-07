# hcp-0207 — Deploy to endpoint

Follow these steps in order. Commit is already done locally; push and run workflows from your machine (GitHub auth required).

---

## 1. Push to GitHub

```bash
cd /Users/gayathrikanchinadham/healthcp
git push origin main
```

---

## 2. Run bootstrap (once)

Creates ECR `opsera/hcp-0207` and registers the ArgoCD application.

**GitHub UI:** Actions → **Bootstrap hcp-0207** → Run workflow → Run workflow.

**CLI:**

```bash
gh workflow run "00-bootstrap-hcp-0207.yaml" -f app_name=hcp-0207 -f environment=dev -f aws_region=us-west-2
```

Wait until it completes:

```bash
gh run list --workflow="00-bootstrap-hcp-0207.yaml" --limit 1
gh run view <RUN_ID>  # optional: view logs
```

---

## 3. Run CI/CD (build + deploy)

Builds the image, pushes to ECR, updates Kustomize, and syncs ArgoCD.

**Option A — Push triggers it:**  
If you didn’t push in step 1, push now; the push to `main` will trigger **CI Build Push hcp-0207**.

**Option B — Manual trigger:**

```bash
gh workflow run "01-ci-build-push-hcp-0207.yaml" -f app_name=hcp-0207 -f environment=dev
```

Watch the run:

```bash
gh run list --workflow="01-ci-build-push-hcp-0207.yaml" --limit 1 --watch
```

---

## 4. Get the endpoint

**Expected URL (after DNS is ready):**  
`https://opsera-hcp-0207-dev.agent.opsera.dev`

**If using LoadBalancer (no Ingress DNS yet):**

```bash
# Ensure kubeconfig points to spoke cluster
aws eks update-kubeconfig --name opsera-usw2-np --region us-west-2

# Get the external hostname or IP of the Service
kubectl get svc -n opsera-hcp-0207-dev hcp-0207 -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null || \
kubectl get svc -n opsera-hcp-0207-dev hcp-0207 -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
```

Use that hostname (e.g. `xxxx.elb.amazonaws.com`) with `http://<hostname>` (port 80). HTTPS at `opsera-hcp-0207-dev.agent.opsera.dev` works once ExternalDNS/cert-manager have created the record and cert.

**Check pod is running:**

```bash
kubectl get pods -n opsera-hcp-0207-dev -l app=hcp-0207
```

---

## Required GitHub secrets

- **AWS:** `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (or `AWS_ROLE_ARN` for OIDC)
- **Private repo / ArgoCD:** `GH_PAT` (if ArgoCD needs to pull from GitHub)

---

## Troubleshooting

- **Bootstrap fails (ECR / ArgoCD):** Check AWS credentials and that the EKS clusters `argocd-usw2` (hub) and `opsera-usw2-np` (spoke) exist and are accessible.
- **CI/CD fails on build:** Check Dockerfile and build logs in the Actions run.
- **Pod not starting / ImagePullBackOff:** Ensure ECR pull secret or IRSA is set in the spoke cluster for `opsera-hcp-0207-dev`.
- **503 or no endpoint:** Wait for LoadBalancer to get an address; then use the LB hostname or wait for DNS for `opsera-hcp-0207-dev.agent.opsera.dev`.
