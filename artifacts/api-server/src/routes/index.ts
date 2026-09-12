import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import blogRouter from "./blog.js";
import contactRouter from "./contact.js";
import workRouter from "./work.js";

import legalUpdatesRouter from "../legal-updates/routes.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(legalUpdatesRouter);
router.use(contactRouter);
router.use(blogRouter);
router.use(workRouter);

export default router;
