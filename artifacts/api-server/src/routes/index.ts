import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import debugRouter from "./debug";
import historyRouter from "./history";
import versionRouter from "./version";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(debugRouter);
router.use(historyRouter);
router.use(versionRouter);

export default router;
