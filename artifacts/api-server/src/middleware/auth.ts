import type { Request, Response, NextFunction } from "express";
import { db, usersTable, type UserRecord } from "@workspace/db";
import { eq } from "drizzle-orm";
import { COOKIE_NAME, verifyToken } from "../lib/auth";

declare module "express-serve-static-core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Request {
    user?: UserRecord;
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token || typeof token !== "string") {
    res.status(401).json({
      error: { code: "UNAUTHENTICATED", message: "Sign in required." },
    });
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({
      error: {
        code: "INVALID_TOKEN",
        message: "Your session has expired. Please sign in again.",
      },
    });
    return;
  }

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, payload.userId))
      .limit(1);

    if (!user) {
      res.status(401).json({
        error: { code: "USER_NOT_FOUND", message: "Account not found." },
      });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    req.log.error({ err }, "Auth middleware DB lookup failed");
    res.status(500).json({
      error: { code: "AUTH_ERROR", message: "Authentication check failed." },
    });
  }
}
