import { Router, type IRouter } from "express";
import { db, usersTable, toPublicUser } from "@workspace/db";
import { LoginRequestSchema, RegisterRequestSchema } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  COOKIE_NAME,
  getCookieOptions,
  hashPassword,
  signToken,
  verifyPassword,
} from "../lib/auth";

const router: IRouter = Router();

router.post("/auth/register", async (req, res): Promise<void> => {
  const parsed = RegisterRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: { code: "INVALID_INPUT", message: parsed.error.message },
    });
    return;
  }

  const { fullName, email, password } = parsed.data;
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const existing = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, normalizedEmail))
      .limit(1);

    if (existing.length > 0) {
      res.status(409).json({
        error: {
          code: "EMAIL_IN_USE",
          message: "An account with this email already exists.",
        },
      });
      return;
    }

    const passwordHash = await hashPassword(password);

    const [created] = await db
      .insert(usersTable)
      .values({
        fullName: fullName.trim(),
        email: normalizedEmail,
        passwordHash,
        authMethod: "email",
        credits: 100,
      })
      .returning();

    const token = signToken({ userId: created.id });
    res.cookie(COOKIE_NAME, token, getCookieOptions());

    res.status(201).json(toPublicUser(created));
  } catch (err) {
    req.log.error({ err }, "Register failed");
    res.status(500).json({
      error: {
        code: "REGISTER_FAILED",
        message: "Could not complete sign up. Please try again.",
      },
    });
  }
});

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(401).json({
      error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" },
    });
    return;
  }

  const { email, password } = parsed.data;
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, normalizedEmail))
      .limit(1);

    if (!user || !user.passwordHash) {
      res.status(401).json({
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" },
      });
      return;
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      res.status(401).json({
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" },
      });
      return;
    }

    await db
      .update(usersTable)
      .set({ lastLoginAt: new Date() })
      .where(eq(usersTable.id, user.id));

    const token = signToken({ userId: user.id });
    res.cookie(COOKIE_NAME, token, getCookieOptions());

    res.json(toPublicUser({ ...user, lastLoginAt: new Date() }));
  } catch (err) {
    req.log.error({ err }, "Login failed");
    res.status(401).json({
      error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" },
    });
  }
});

router.post("/auth/logout", (req, res): void => {
  res.clearCookie(COOKIE_NAME, { ...getCookieOptions(), maxAge: undefined });
  res.json({ success: true });
});

router.get("/auth/me", async (req, res): Promise<void> => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token || typeof token !== "string") {
    res.status(401).json({
      error: { code: "UNAUTHENTICATED", message: "Not signed in." },
    });
    return;
  }

  const { verifyToken } = await import("../lib/auth");
  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({
      error: { code: "INVALID_TOKEN", message: "Session expired." },
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

    res.json(toPublicUser(user));
  } catch (err) {
    req.log.error({ err }, "Failed to fetch current user");
    res.status(500).json({
      error: { code: "AUTH_ERROR", message: "Could not load profile." },
    });
  }
});

// Google OAuth — only enabled when credentials are configured
const GOOGLE_CLIENT_ID = process.env["GOOGLE_CLIENT_ID"];
const GOOGLE_CLIENT_SECRET = process.env["GOOGLE_CLIENT_SECRET"];
const GOOGLE_OAUTH_ENABLED = Boolean(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET);

function getCallbackUrl(req: import("express").Request): string {
  const proto = req.headers["x-forwarded-proto"]?.toString().split(",")[0] || req.protocol;
  const host = req.headers["x-forwarded-host"]?.toString() || req.get("host");
  return `${proto}://${host}/api/auth/google/callback`;
}

router.get("/auth/google", (req, res): void => {
  if (!GOOGLE_OAUTH_ENABLED) {
    res.redirect("/login?error=google_not_configured");
    return;
  }

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID!,
    redirect_uri: getCallbackUrl(req),
    response_type: "code",
    scope: "openid email profile",
    access_type: "online",
    prompt: "select_account",
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
});

router.get("/auth/google/callback", async (req, res): Promise<void> => {
  if (!GOOGLE_OAUTH_ENABLED) {
    res.redirect("/login?error=google_not_configured");
    return;
  }

  const code = req.query.code;
  if (typeof code !== "string") {
    res.redirect("/login?error=google_oauth_failed");
    return;
  }

  try {
    const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID!,
        client_secret: GOOGLE_CLIENT_SECRET!,
        redirect_uri: getCallbackUrl(req),
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResp.ok) {
      req.log.error(
        { status: tokenResp.status },
        "Google token exchange failed",
      );
      res.redirect("/login?error=google_oauth_failed");
      return;
    }

    const tokenData = (await tokenResp.json()) as { access_token?: string };
    if (!tokenData.access_token) {
      res.redirect("/login?error=google_oauth_failed");
      return;
    }

    const profileResp = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      { headers: { authorization: `Bearer ${tokenData.access_token}` } },
    );
    if (!profileResp.ok) {
      res.redirect("/login?error=google_oauth_failed");
      return;
    }

    const profile = (await profileResp.json()) as {
      sub: string;
      email: string;
      name?: string;
      picture?: string;
    };

    const normalizedEmail = profile.email.trim().toLowerCase();

    const [existing] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, normalizedEmail))
      .limit(1);

    let user = existing;
    if (!user) {
      const [created] = await db
        .insert(usersTable)
        .values({
          fullName: profile.name || normalizedEmail.split("@")[0],
          email: normalizedEmail,
          googleId: profile.sub,
          avatarUrl: profile.picture ?? null,
          authMethod: "google",
          credits: 100,
        })
        .returning();
      user = created;
    } else {
      const updates: Partial<typeof user> = { lastLoginAt: new Date() };
      if (!user.googleId) updates.googleId = profile.sub;
      if (!user.avatarUrl && profile.picture) updates.avatarUrl = profile.picture;
      await db.update(usersTable).set(updates).where(eq(usersTable.id, user.id));
    }

    const token = signToken({ userId: user.id });
    res.cookie(COOKIE_NAME, token, getCookieOptions());

    res.redirect("/dashboard");
  } catch (err) {
    req.log.error({ err }, "Google OAuth callback failed");
    res.redirect("/login?error=google_oauth_failed");
  }
});

export default router;
