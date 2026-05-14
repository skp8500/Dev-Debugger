import { Router, type IRouter } from "express";
import { env } from "../config/env";

const router: IRouter = Router();

router.get("/version", (_req, res) => {
  res.json({
    platform: env.PLATFORM,
    version: process.env.npm_package_version ?? "0.0.0",
    commit: process.env.COMMIT_SHA ?? process.env.RENDER_GIT_COMMIT ?? process.env.RAILWAY_GIT_COMMIT_SHA ?? "unknown",
  });
});

export default router;
