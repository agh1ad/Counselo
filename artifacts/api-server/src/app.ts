import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { registerOgPageRoutes } from "./og-pages.js";
import { enforceCanonicalUrl } from "./lib/canonical-url.js";
import {
  redirectTrailingSlash,
  redirectWww,
} from "./middlewares/normalize.js";
import { PUBLIC_CACHE_POLICY } from "@workspace/api-zod";

const app: Express = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  next();
});
app.use(enforceCanonicalUrl);

app.use(
  pinoHttp({
    logger,
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
app.use(cors());
app.use(express.json({ limit: "12mb" }));
app.use(express.urlencoded({ extended: true, limit: "12mb" }));

// Canonical URL normalization — must run before all route handlers so
// redirects are applied consistently to every path including /api.
app.use(redirectWww);
app.use(redirectTrailingSlash);

app.use("/api", (req, res, next) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");

  const isPublicRead =
    req.method === "GET" &&
    (req.path === "/blog/posts" ||
      req.path === "/blog/posts/discovery" ||
      req.path.startsWith("/blog/posts/") ||
      req.path === "/work" ||
      (req.path.startsWith("/work/") && !req.path.endsWith("/file")));

  if (isPublicRead) {
    // Browsers revalidate immediately, while shared caches may reuse identical
    // public CMS reads for a very short window. This cuts repeated database
    // reads without materially delaying newly published content.
    res.setHeader(
      "Cache-Control",
      "public, max-age=0, s-maxage=15, stale-while-revalidate=30, must-revalidate",
    );
  } else {
    // Admin, contact, and other stateful API traffic must never be cached.
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
  }
  next();
});
app.use("/api", router);

// Public site routes must be registered after /api so the final site-level
// 404 handler cannot swallow API requests.
registerOgPageRoutes(app);

export default app;
