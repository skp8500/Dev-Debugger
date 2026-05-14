import { Router, type IRouter } from "express";
import { env } from "../config/env";

const router: IRouter = Router();

function sendHealth(res: import("express").Response): void {
  res.json({
    status: "ok",
    platform: env.PLATFORM,
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
}

router.get("/health", (_req, res) => {
  sendHealth(res);
});

router.get("/healthz", (_req, res) => {
  sendHealth(res);
});

export default router;
