import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import blogRouter from "./blog.js";
import workRouter from "./work.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(blogRouter);
router.use(workRouter);

export default router;
