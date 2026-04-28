import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import debugRouter from "./debug";
import historyRouter from "./history";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(debugRouter);
router.use(historyRouter);

export default router;
