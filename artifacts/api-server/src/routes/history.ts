import { Router, type IRouter } from "express";
import { db, debugSessionsTable } from "@workspace/db";
import { desc, eq, count, and, SQL } from "drizzle-orm";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";

const router: IRouter = Router();

const ListHistoryQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  language: z.string().optional(),
});

function sessionToResponse(s: typeof debugSessionsTable.$inferSelect) {
  return {
    id: s.id,
    rootCause: s.rootCause,
    fix: s.fix,
    explanation: s.explanation,
    correctedCode: s.correctedCode,
    proTip: s.proTip,
    language: s.language,
    severity: s.severity,
    tokensUsed: s.tokensUsed,
    cached: s.cached,
    durationMs: s.durationMs,
    createdAt: s.createdAt.toISOString(),
    rawCode: s.rawCode,
    rawError: s.rawError,
    mode: s.mode,
  };
}

router.get("/v1/history", requireAuth, async (req, res): Promise<void> => {
  const user = req.user!;
  const parsed = ListHistoryQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({
      error: { code: "INVALID_QUERY", message: parsed.error.message },
    });
    return;
  }

  const { page, limit, language } = parsed.data;
  const offset = (page - 1) * limit;

  const conditions: SQL[] = [eq(debugSessionsTable.userId, user.id)];
  if (language) {
    const validLanguages = [
      "python", "javascript", "typescript", "c++", "java",
      "go", "rust", "php", "ruby", "csharp",
    ];
    if (validLanguages.includes(language)) {
      conditions.push(
        eq(
          debugSessionsTable.language,
          language as typeof debugSessionsTable.$inferSelect["language"],
        ),
      );
    }
  }

  try {
    const whereClause = and(...conditions);

    const [sessions, totalResult] = await Promise.all([
      db
        .select()
        .from(debugSessionsTable)
        .where(whereClause)
        .orderBy(desc(debugSessionsTable.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: count() })
        .from(debugSessionsTable)
        .where(whereClause),
    ]);

    const total = Number(totalResult[0]?.count ?? 0);

    res.json({
      sessions: sessions.map(sessionToResponse),
      total,
      page,
      limit,
      hasNext: offset + sessions.length < total,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch history");
    res.status(500).json({
      error: { code: "DB_ERROR", message: "Failed to fetch history" },
    });
  }
});

router.delete("/v1/history", requireAuth, async (req, res): Promise<void> => {
  const user = req.user!;
  try {
    const deleted = await db
      .delete(debugSessionsTable)
      .where(eq(debugSessionsTable.userId, user.id))
      .returning({ id: debugSessionsTable.id });

    res.json({ deleted: deleted.length });
  } catch (err) {
    req.log.error({ err }, "Failed to clear history");
    res.status(500).json({
      error: { code: "DB_ERROR", message: "Failed to clear history" },
    });
  }
});

router.get("/v1/history/:sessionId", requireAuth, async (req, res): Promise<void> => {
  const user = req.user!;
  const rawId = Array.isArray(req.params.sessionId)
    ? req.params.sessionId[0]
    : req.params.sessionId;

  if (!rawId) {
    res.status(400).json({
      error: { code: "INVALID_PARAM", message: "Session ID is required" },
    });
    return;
  }

  try {
    const [session] = await db
      .select()
      .from(debugSessionsTable)
      .where(
        and(
          eq(debugSessionsTable.id, rawId),
          eq(debugSessionsTable.userId, user.id),
        ),
      );

    if (!session) {
      res.status(404).json({
        error: { code: "NOT_FOUND", message: "Session not found" },
      });
      return;
    }

    res.json(sessionToResponse(session));
  } catch (err) {
    req.log.error({ err, sessionId: rawId }, "Failed to fetch session");
    res.status(500).json({
      error: { code: "DB_ERROR", message: "Failed to fetch session" },
    });
  }
});

router.delete(
  "/v1/history/:sessionId",
  requireAuth,
  async (req, res): Promise<void> => {
    const user = req.user!;
    const rawId = Array.isArray(req.params.sessionId)
      ? req.params.sessionId[0]
      : req.params.sessionId;

    if (!rawId) {
      res.status(400).json({
        error: { code: "INVALID_PARAM", message: "Session ID is required" },
      });
      return;
    }

    try {
      const [deleted] = await db
        .delete(debugSessionsTable)
        .where(
          and(
            eq(debugSessionsTable.id, rawId),
            eq(debugSessionsTable.userId, user.id),
          ),
        )
        .returning({ id: debugSessionsTable.id });

      if (!deleted) {
        res.status(404).json({
          error: { code: "NOT_FOUND", message: "Session not found" },
        });
        return;
      }

      res.sendStatus(204);
    } catch (err) {
      req.log.error({ err, sessionId: rawId }, "Failed to delete session");
      res.status(500).json({
        error: { code: "DB_ERROR", message: "Failed to delete session" },
      });
    }
  },
);

export default router;
