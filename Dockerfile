# ── Stage 1: Install dependencies ────────────────────────────
FROM node:22-alpine AS deps

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY lib/ ./lib/
COPY artifacts/api-server/package.json ./artifacts/api-server/

RUN pnpm install --frozen-lockfile --prod=false

# ── Stage 2: Build ───────────────────────────────────────────
FROM deps AS build

COPY . .
RUN pnpm --filter @workspace/api-server run build

# ── Stage 3: Production image ───────────────────────────────
FROM node:22-alpine AS runtime

RUN addgroup -S app && adduser -S app -G app
WORKDIR /app

COPY --from=build --chown=app:app /app/artifacts/api-server/dist ./dist
COPY --from=build --chown=app:app /app/artifacts/api-server/package.json ./

USER app

# Environment variables are injected at runtime via docker-compose env_file
# or Kubernetes secrets — NEVER bake them into the image.
EXPOSE 3001
CMD ["node", "--enable-source-maps", "dist/index.mjs"]
