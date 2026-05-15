import crypto from "node:crypto";
import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import pinoHttp from "pino-http";
import router from "./routes";
import { env } from "./config/env";
import { apiRateLimiter } from "./middleware/rate-limit";
import { requestSanitizer } from "./middleware/request-sanitizer";
import { errorHandler, notFoundHandler } from "./middleware/error-handler";
import { logger } from "./utils/logger";

const app: Express = express();

app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    genReqId(req, res) {
      const incomingId = req.headers["x-request-id"];
      const requestId =
        typeof incomingId === "string" && incomingId.length > 0
          ? incomingId
          : crypto.randomUUID();

      res.setHeader("x-request-id", requestId);
      return requestId;
    },
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

const allowedOrigins = new Set([
  ...env.FRONTEND_URL,
  "http://localhost:3000",
  "http://localhost:5173",
]);

function isAllowedOrigin(origin: string): boolean {
  if (allowedOrigins.has(origin)) {
    return true;
  }

  try {
    const { hostname, protocol } = new URL(origin);
    return protocol === "https:" && hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: env.JSON_BODY_LIMIT }));
app.use(express.urlencoded({ extended: true }));
app.use(requestSanitizer);
app.use(apiRateLimiter);

app.get("/", (_req, res) => {
  res.status(200).json({
    service: "dev-debugger-api",
    status: "ok",
    message: "API server is running.",
    docs: {
      rootHealth: "/health",
      rootVersion: "/version",
      health: "/api/health",
      version: "/api/version",
    },
  });
});

app.get("/ping", (_req, res) => {
  res.status(200).send("OK");
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    platform: env.PLATFORM,
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/version", (_req, res) => {
  res.status(200).json({
    platform: env.PLATFORM,
    version: process.env.npm_package_version ?? "0.0.0",
    commit:
      process.env.COMMIT_SHA ??
      process.env.RENDER_GIT_COMMIT ??
      process.env.RAILWAY_GIT_COMMIT_SHA ??
      "unknown",
  });
});

app.get("/api", (_req, res) => {
  res.status(200).json({
    service: "dev-debugger-api",
    status: "ok",
    routes: {
      health: "/health",
      version: "/version",
      apiHealth: "/api/health",
      apiVersion: "/api/version",
    },
  });
});

app.use("/api", router);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
