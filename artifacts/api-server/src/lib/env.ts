import { z } from "zod";

/**
 * Central schema for ALL required environment variables.
 * The app will crash immediately on startup if any are missing or invalid.
 *
 * Usage:
 *   import { env } from "./lib/env";
 *   console.log(env.DATABASE_URL);   // fully typed, guaranteed to exist
 */
const envSchema = z.object({
  // ── Server ──────────────────────────────────────────────
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3001),

  // ── Database ────────────────────────────────────────────
  // Note: Zod's z.string().url() rejects postgresql:// connection strings
  // because the URL spec treats the query/password portion differently.
  // We use a custom refinement instead.
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required")
    .refine(
      (s) => s.startsWith("postgresql://") || s.startsWith("postgres://"),
      "DATABASE_URL must be a PostgreSQL connection string (postgresql://...)",
    ),

  // ── AI / LLM ───────────────────────────────────────────
  AI_INTEGRATIONS_OPENAI_API_KEY: z
    .string()
    .min(1, "AI_INTEGRATIONS_OPENAI_API_KEY is required"),
  AI_INTEGRATIONS_OPENAI_BASE_URL: z
    .string()
    .url("AI_INTEGRATIONS_OPENAI_BASE_URL must be a valid URL")
    .optional(),

  // ── Google OAuth (optional — disabled when absent) ──────
  GOOGLE_CLIENT_ID: z.string().min(1).optional(),
  GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),

  // ── Session / JWT ───────────────────────────────────────
  SESSION_SECRET: z
    .string()
    .min(16, "SESSION_SECRET must be at least 16 characters"),
});

// ---------- Parse & fail fast ----------
function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error(
      "\n❌  Invalid environment variables:\n",
      result.error.format(),
    );
    process.exit(1);
  }

  return result.data;
}

/** Validated, typed environment variables — import from anywhere. */
export const env = validateEnv();

/** Re-export the inferred type for downstream typing. */
export type Env = z.infer<typeof envSchema>;
