import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

declare global {
  // eslint-disable-next-line no-var
  var __workspaceDbPool__: pg.Pool | undefined;
  // eslint-disable-next-line no-var
  var __workspaceDb__: ReturnType<typeof drizzle<typeof schema>> | undefined;
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

function createPool() {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: Number(process.env.PG_POOL_MAX ?? 10),
    idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT_MS ?? 30_000),
    connectionTimeoutMillis: Number(
      process.env.PG_CONNECTION_TIMEOUT_MS ?? 10_000,
    ),
    keepAlive: true,
    allowExitOnIdle: false,
  });
}

export const pool = globalThis.__workspaceDbPool__ ?? createPool();

if (!globalThis.__workspaceDbPool__) {
  globalThis.__workspaceDbPool__ = pool;
}

export const db = globalThis.__workspaceDb__ ?? drizzle(pool, { schema });

if (!globalThis.__workspaceDb__) {
  globalThis.__workspaceDb__ = db;
}

export async function closeDatabaseConnections(): Promise<void> {
  if (globalThis.__workspaceDbPool__) {
    await globalThis.__workspaceDbPool__.end();
    globalThis.__workspaceDbPool__ = undefined;
    globalThis.__workspaceDb__ = undefined;
  }
}

export * from "./schema";
