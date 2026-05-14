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

const allowedOrigins = [
  env.FRONTEND_URL,
  "http://localhost:3000",
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: allowedOrigins,
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
  if (env.FRONTEND_URL) {
    res.redirect(env.FRONTEND_URL);
    return;
  }

  res.status(200).json({
    service: "dev-debugger-api",
    status: "ok",
    message: "API server is running.",
    docs: {
      health: "/api/health",
      version: "/api/version",
    },
  });
});

app.get("/ping", (_req, res) => {
  res.status(200).send("OK");
});

app.use("/api", router);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
