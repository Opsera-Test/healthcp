# ════════════════════════════════════════════════════════════════════════════
# healthcp-0209 - Production Dockerfile (RULE 28: .opsera-{app}/Dockerfile)
# RULE 74: nginx-unprivileged | RULE 74b: port 8080
# ════════════════════════════════════════════════════════════════════════════
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY bun.lockb* ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1
EXPOSE 8080
