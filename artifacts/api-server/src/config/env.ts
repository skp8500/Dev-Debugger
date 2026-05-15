import { z } from "zod";

function parseFrontendOrigins(value: string | undefined): string[] {
  if (!value) return [];

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required")
    .refine(
      (value: string) =>
        value.startsWith("postgresql://") || value.startsWith("postgres://"),
      "DATABASE_URL must be a PostgreSQL connection string",
    ),
  DIRECT_URL: z
    .string()
    .optional()
    .refine(
      (value: string | undefined) =>
        value == null ||
        value.startsWith("postgresql://") ||
        value.startsWith("postgres://"),
      "DIRECT_URL must be a PostgreSQL connection string",
    ),
  PLATFORM: z.enum(["RENDER", "RAILWAY", "LOCAL", "UNKNOWN"]).default("UNKNOWN"),
  IS_PRIMARY: z
    .string()
    .optional()
    .transform((value: string | undefined) => value === "true"),
  FRONTEND_URL: z
    .string()
    .optional()
    .transform((value) => parseFrontendOrigins(value))
    .pipe(z.array(z.string().url()).default([])),
  LOG_LEVEL: z.string().optional(),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(15 * 60 * 1000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  JSON_BODY_LIMIT: z.string().default("1mb"),
  AI_INTEGRATIONS_OPENAI_API_KEY: z
    .string()
    .min(1, "AI_INTEGRATIONS_OPENAI_API_KEY is required"),
  AI_INTEGRATIONS_OPENAI_BASE_URL: z.string().url().optional(),
  GOOGLE_CLIENT_ID: z.string().min(1).optional(),
  GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
  SESSION_SECRET: z
    .string()
    .min(16, "SESSION_SECRET must be at least 16 characters"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("\nInvalid environment variables:\n", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
