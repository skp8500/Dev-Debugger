# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **AI**: Replit AI Integrations (OpenAI proxy) via `@workspace/integrations-openai-ai-server`

## Application: Smart Dev Debugger

AI-powered code error analysis tool. Users paste broken code + error messages, and the AI returns a structured debug report: root cause, fix steps, explanation, corrected code, and pro tip.

### Features
- Monaco-style code input with language selection (10 languages)
- Standard & ELI5 explanation modes
- Collapsible session history sidebar
- Full history page with language filter and pagination
- Stats dashboard (sessions by language, severity)
- Rate limiting (in-memory, per IP)
- Cache (in-memory, TTL 1 hour) for identical requests
- Dark/light mode toggle (dark by default)
- Copy to clipboard + download corrected code

### Pages
- `/` — Main debugger page
- `/history` — Paginated history

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Architecture

```
Artifacts:
  artifacts/smart-dev-debugger/  — React + Vite frontend (previewPath: /)
  artifacts/api-server/          — Express API server (previewPath: /api)

Lib:
  lib/api-spec/openapi.yaml      — Single source of truth for API contracts
  lib/api-client-react/          — Generated React Query hooks (from codegen)
  lib/api-zod/                   — Generated Zod schemas for server validation
  lib/db/                        — Drizzle ORM + PostgreSQL schema
  lib/integrations-openai-ai-server/ — OpenAI client via Replit AI Integrations

API Routes:
  POST /api/v1/analyze           — Submit code+error for AI analysis
  GET  /api/v1/history           — Paginated debug session history
  GET  /api/v1/history/:id       — Single session
  DELETE /api/v1/history/:id     — Delete session
  DELETE /api/v1/history         — Clear all history
  GET  /api/v1/stats             — Aggregated stats
  GET  /api/healthz              — Health check
```

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
