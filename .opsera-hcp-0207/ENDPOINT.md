# hcp-0207 endpoint

## Primary (HTTPS, after DNS and cert)

**https://opsera-hcp-0207-dev.agent.opsera.dev**

Use this once:
- DNS for `opsera-hcp-0207-dev.agent.opsera.dev` is live, and  
- cert-manager has issued the TLS cert (usually 1–2 minutes after first deploy).

---

## Fallback (HTTP via LoadBalancer)

If the hostname above is not ready yet, use the spoke Service’s LoadBalancer hostname:

```bash
aws eks update-kubeconfig --name opsera-usw2-np --region us-west-2
kubectl get svc hcp-0207 -n opsera-hcp-0207-dev -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
```

Then open: **http://\<that-hostname\>** (port 80).

Example: `http://k8s-xxxx-xxxx.elb.us-west-2.amazonaws.com`
