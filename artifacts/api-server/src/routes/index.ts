import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import blogRouter from "./blog.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(blogRouter);

export default router;
