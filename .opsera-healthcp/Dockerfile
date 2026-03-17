# ════════════════════════════════════════════════════════════════════════════
# HEALTHCP - Production Dockerfile
# Multi-stage build for React + Vite application
# RULE 74: Uses nginx-unprivileged for non-root security
# RULE 6: NODE_ENV scoped to runtime only (NOT before npm install)
# Build context: . (repo root) - source code lives there
# Usage: docker build -f .opsera-healthcp/Dockerfile -t image:tag .
# ════════════════════════════════════════════════════════════════════════════

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./
COPY bun.lockb* ./

# RULE 73: Use npm install --legacy-peer-deps
# RULE 6: Do NOT set NODE_ENV before npm install (devDependencies needed for Vite build)
RUN npm install --legacy-peer-deps

# Copy source code (build context is repo root)
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./
COPY vite.config.ts ./
COPY tsconfig*.json ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY components.json ./

# Build the application
RUN npm run build

# Stage 2: Production - RULE 74: nginx-unprivileged for non-root
FROM nginxinc/nginx-unprivileged:alpine AS production

# RULE 3: nginx.conf must ONLY contain server{} blocks (no pid directive here)
# Copy custom nginx config that listens on 8080 for non-root
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# RULE 6: Set NODE_ENV=production ONLY in runtime stage (after build is done)
ENV NODE_ENV=production

# Add healthcheck on port 8080 (non-privileged port)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# RULE 74b: Expose port 8080 (non-privileged port for nginx-unprivileged)
EXPOSE 8080

# nginx-unprivileged runs as non-root by default
