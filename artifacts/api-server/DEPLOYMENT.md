# Dual Deployment Notes

## Architecture

- Deploy the same backend codebase to both Render and Railway.
- Point both deployments at the same Neon database.
- Use Neon pooled `DATABASE_URL` at runtime for both platforms.
- Keep `DIRECT_URL` for manual migrations or admin scripts.
- Mark exactly one deployment as `IS_PRIMARY=true`.
- Prefer `Railway = primary` and `Render = backup` instead of active-active load balancing.

## Recommended env setup

### Railway

- `PLATFORM=RAILWAY`
- `IS_PRIMARY=true`
- `NODE_ENV=production`
- `DATABASE_URL=<Neon pooled connection string>`
- `DIRECT_URL=<Neon direct connection string>`
- `FRONTEND_URL=<your production frontend URL>`

### Render

- `PLATFORM=RENDER`
- `IS_PRIMARY=false`
- `NODE_ENV=production`
- `DATABASE_URL=<same Neon pooled connection string>`
- `DIRECT_URL=<same Neon direct connection string>`
- `FRONTEND_URL=<your production frontend URL>`

## Primary-only protections

Only the primary deployment should run:

- cron jobs
- scheduled tasks
- background workers
- queue consumers
- cleanup jobs
- manual runtime migrations if you ever enable them

Current bootstrap logic gates those services behind `IS_PRIMARY === "true"`.

## Auth consistency

- Both deployments must share the same `SESSION_SECRET`.
- If you later move to JWT-specific env names, keep the value identical on Railway and Render.
- Mixed secrets will cause cross-deployment session failures.

## Frontend failover envs

- `VITE_API_PRIMARY=<primary backend HTTPS URL>`
- `VITE_API_PRIMARY_NAME=railway`
- `VITE_API_BACKUP=<backup backend HTTPS URL>`
- `VITE_API_BACKUP_NAME=render`
- `VITE_API_TIMEOUT_MS=8000`
- `VITE_API_RETRY_COUNT=2`

The frontend API layer is built for primary/backup routing, not round-robin load balancing.

## Migrations

- Do not run migrations automatically on both platforms.
- Run migrations from one place only.
- Prefer a manual release step using `DIRECT_URL`.
- If you later automate migrations in app startup, keep them behind both `IS_PRIMARY=true` and a second explicit opt-in flag.

## Websockets

- The server is prepared for a websocket layer.
- Before enabling Socket.IO across both deployments, add a Redis adapter so events fan out across instances.
- A placeholder is included in `src/services/websocket.ts`.

## File uploads

- Do not store uploads on the local filesystem.
- Use shared object storage such as S3, Cloudinary, or UploadThing.

## Shared limits and queues

- If rate limiting becomes important across both deployments, switch to a shared Redis-backed limiter.
- If heavy work moves out of request handlers, prefer a shared queue such as BullMQ with Redis.

## Health checks

- Primary route: `GET /api/health`
- Backward-compatible alias: `GET /api/healthz`
- Version route: `GET /api/version`

Expected shape:

```json
{
  "status": "ok",
  "platform": "RENDER",
  "uptime": 123.45,
  "timestamp": 1710000000000
}
```

## Start command

- Production: `pnpm --filter @workspace/api-server start`
- Local with root `.env`: `pnpm --filter @workspace/api-server start:local`
