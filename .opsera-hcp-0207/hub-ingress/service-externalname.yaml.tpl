# Generated at CI time: backend points to spoke LoadBalancer (PLACEHOLDER_SPOKE_LB_HOSTNAME)
apiVersion: v1
kind: Service
metadata:
  name: hcp-0207-proxy
  namespace: opsera-hcp-0207-dev
spec:
  type: ExternalName
  externalName: PLACEHOLDER_SPOKE_LB_HOSTNAME
  ports:
    - port: 80
      name: http
      protocol: TCP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: hcp-0207
  namespace: opsera-hcp-0207-dev
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/backend-protocol: "HTTP"
    nginx.ingress.kubernetes.io/upstream-vhost: "opsera-hcp-0207-dev.agent.opsera.dev"
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - opsera-hcp-0207-dev.agent.opsera.dev
      secretName: hcp-0207-dev-tls
  rules:
    - host: opsera-hcp-0207-dev.agent.opsera.dev
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: hcp-0207-proxy
                port:
                  number: 80
