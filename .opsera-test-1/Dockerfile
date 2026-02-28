# RULE 6: NODE_ENV scoped to runtime only (AFTER build step)
# RULE 7: Build context is repo root (.); Dockerfile path is .opsera-test-1/Dockerfile
# RULE 73: npm install --legacy-peer-deps for peer dependency compatibility
# RULE 74: Use nginxinc/nginx-unprivileged:alpine (non-root, port 8080)

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine
COPY .opsera-test-1/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
USER 101
