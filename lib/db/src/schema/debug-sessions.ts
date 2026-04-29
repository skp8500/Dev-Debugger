import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { usersTable } from "./users";

export const severityEnum = pgEnum("severity", [
  "syntax_error",
  "runtime_error",
  "logic_error",
  "warning",
]);

export const modeEnum = pgEnum("mode", ["standard", "eli5"]);

export const languageEnum = pgEnum("language", [
  "python",
  "javascript",
  "typescript",
  "c++",
  "java",
  "go",
  "rust",
  "php",
  "ruby",
  "csharp",
]);

export const debugSessionsTable = pgTable("debug_sessions", {
  id: text("id").primaryKey(),
  userId: uuid("user_id").references(() => usersTable.id, {
    onDelete: "cascade",
  }),
  ipHash: text("ip_hash"),
  language: languageEnum("language").notNull(),
  mode: modeEnum("mode").notNull().default("standard"),
  rawCode: text("raw_code"),
  rawError: text("raw_error"),
  cacheKey: text("cache_key"),
  rootCause: text("root_cause").notNull(),
  fix: text("fix").notNull(),
  explanation: text("explanation").notNull(),
  correctedCode: text("corrected_code").notNull(),
  proTip: text("pro_tip").notNull(),
  severity: severityEnum("severity").notNull(),
  tokensUsed: integer("tokens_used"),
  durationMs: integer("duration_ms"),
  cached: boolean("cached").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertDebugSessionSchema = createInsertSchema(debugSessionsTable);
export const selectDebugSessionSchema = createSelectSchema(debugSessionsTable);

export type DebugSessionRecord = typeof debugSessionsTable.$inferSelect;
export type InsertDebugSessionRecord =
  typeof debugSessionsTable.$inferInsert;

export const AnalyzeRequestSchema = z.object({
  code: z.string().min(1).max(10000),
  error: z.string().min(1).max(5000),
  language: z.enum([
    "python",
    "javascript",
    "typescript",
    "c++",
    "java",
    "go",
    "rust",
    "php",
    "ruby",
    "csharp",
  ]),
  mode: z.enum(["standard", "eli5"]).default("standard"),
});

export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;
