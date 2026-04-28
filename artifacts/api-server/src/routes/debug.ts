import { Router, type IRouter } from "express";
import { randomUUID } from "crypto";
import { db, debugSessionsTable, usersTable } from "@workspace/db";
import { eq, and, count, desc, avg, isNotNull } from "drizzle-orm";
import { analyzeCode } from "../lib/ai-engine";
import { buildCacheKey, getCached, setCached } from "../lib/cache";
import { checkRateLimit, hashIp } from "../lib/rate-limiter";
import { AnalyzeRequestSchema } from "@workspace/db";
import { requireAuth } from "../middleware/auth";

const router: IRouter = Router();

function getClientIp(req: import("express").Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress ?? "unknown";
}

router.post("/v1/analyze", requireAuth, async (req, res): Promise<void> => {
  const user = req.user!;

  if (user.credits <= 0) {
    res.status(402).json({
      error: {
        code: "OUT_OF_CREDITS",
        message: "You've used all your credits. Upgrade to continue.",
      },
    });
    return;
  }

  const ip = getClientIp(req);
  const rateCheck = checkRateLimit(`${user.id}:${ip}`);

  if (!rateCheck.allowed) {
    res.status(429).json({
      error: {
        code: "RATE_LIMIT_EXCEEDED",
        message: `Rate limit exceeded. Try again after ${new Date(rateCheck.resetAt).toISOString()}`,
        details: { resetAt: rateCheck.resetAt },
      },
    });
    return;
  }

  const parsed = AnalyzeRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: {
        code: "INVALID_INPUT",
        message: parsed.error.message,
      },
    });
    return;
  }

  const { code, error, language, mode } = parsed.data;

  const cacheKey = buildCacheKey(code, error, language, mode);
  const cached = getCached(cacheKey);

  if (cached) {
    const session = JSON.parse(cached);

    const [updated] = await db
      .update(usersTable)
      .set({ credits: user.credits - 1 })
      .where(eq(usersTable.id, user.id))
      .returning({ credits: usersTable.credits });

    req.log.info({ sessionId: session.id }, "Cache hit — returning cached debug session");
    res.json({
      ...session,
      cached: true,
      creditsRemaining: updated?.credits ?? user.credits - 1,
    });
    return;
  }

  const startMs = Date.now();
  let report: Awaited<ReturnType<typeof analyzeCode>>["report"];
  let tokensUsed = 0;

  try {
    const result = await analyzeCode(code, error, language, mode);
    report = result.report;
    tokensUsed = result.tokensUsed;
  } catch (err) {
    req.log.error({ err }, "AI analysis failed");
    const detail =
      err instanceof Error ? err.message : "Unknown AI provider error";
    res.status(503).json({
      error: {
        code: "AI_UNAVAILABLE",
        message:
          process.env.NODE_ENV === "production"
            ? "The AI analysis service is temporarily unavailable. Please try again."
            : `AI analysis failed: ${detail}`,
      },
    });
    return;
  }

  const durationMs = Date.now() - startMs;
  const sessionId = randomUUID();
  const ipHash = hashIp(ip);

  const [updatedUser] = await db
    .update(usersTable)
    .set({ credits: user.credits - 1 })
    .where(eq(usersTable.id, user.id))
    .returning({ credits: usersTable.credits });

  const sessionData = {
    id: sessionId,
    rootCause: report.root_cause,
    fix: report.fix,
    explanation: report.explanation,
    correctedCode: report.corrected_code,
    proTip: report.pro_tip,
    language,
    severity: report.severity,
    tokensUsed,
    cached: false,
    durationMs,
    createdAt: new Date().toISOString(),
    rawCode: code,
    rawError: error,
    mode,
    creditsRemaining: updatedUser?.credits ?? user.credits - 1,
  };

  setCached(
    cacheKey,
    JSON.stringify({ ...sessionData, creditsRemaining: undefined }),
  );

  db.insert(debugSessionsTable)
    .values({
      id: sessionId,
      userId: user.id,
      ipHash,
      language,
      mode,
      rawCode: code,
      rawError: error,
      cacheKey,
      rootCause: report.root_cause,
      fix: report.fix,
      explanation: report.explanation,
      correctedCode: report.corrected_code,
      proTip: report.pro_tip,
      severity: report.severity,
      tokensUsed,
      durationMs,
      cached: false,
    })
    .then(() => {
      req.log.info({ sessionId }, "Debug session saved to DB");
    })
    .catch((dbErr: unknown) => {
      req.log.error({ err: dbErr, sessionId }, "Failed to persist debug session to DB");
    });

  res.json(sessionData);
});

router.get("/v1/stats", requireAuth, async (req, res): Promise<void> => {
  const user = req.user!;

  try {
    const userFilter = eq(debugSessionsTable.userId, user.id);

    const [totalResult] = await db
      .select({ count: count() })
      .from(debugSessionsTable)
      .where(userFilter);

    const [cachedResult] = await db
      .select({ count: count() })
      .from(debugSessionsTable)
      .where(and(userFilter, eq(debugSessionsTable.cached, true)));

    const byLanguage = await db
      .select({
        language: debugSessionsTable.language,
        count: count(),
      })
      .from(debugSessionsTable)
      .where(userFilter)
      .groupBy(debugSessionsTable.language)
      .orderBy(desc(count()));

    const bySeverity = await db
      .select({
        severity: debugSessionsTable.severity,
        count: count(),
      })
      .from(debugSessionsTable)
      .where(userFilter)
      .groupBy(debugSessionsTable.severity)
      .orderBy(desc(count()));

    const [avgResult] = await db
      .select({
        avgTokens: avg(debugSessionsTable.tokensUsed),
        avgDuration: avg(debugSessionsTable.durationMs),
      })
      .from(debugSessionsTable)
      .where(and(userFilter, isNotNull(debugSessionsTable.tokensUsed)));

    res.json({
      totalSessions: Number(totalResult?.count ?? 0),
      cachedResponses: Number(cachedResult?.count ?? 0),
      byLanguage: byLanguage.map((r) => ({
        language: r.language,
        count: Number(r.count),
      })),
      bySeverity: bySeverity.map((r) => ({
        severity: r.severity,
        count: Number(r.count),
      })),
      avgTokensUsed: avgResult?.avgTokens != null ? Number(avgResult.avgTokens) : null,
      avgDurationMs: avgResult?.avgDuration != null ? Number(avgResult.avgDuration) : null,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch stats");
    res.status(500).json({
      error: { code: "DB_ERROR", message: "Failed to fetch statistics" },
    });
  }
});

export default router;
