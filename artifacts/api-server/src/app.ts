import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { registerDiscoveryRoutes } from "./discovery-routes.js";
import { registerOgPageRoutes } from "./og-pages.js";
import { enforceCanonicalUrl } from "./lib/canonical-url.js";
import {
  redirectTrailingSlash,
  redirectWww,
} from "./middlewares/normalize.js";
import { PUBLIC_CACHE_POLICY } from "@workspace/api-zod";
import { cachePublicResponses } from "./lib/public-response-cache.js";
import { handleResendWebhook } from "./lib/resend-webhook.js";

const app: Express = express();

function isDiscoveryPath(path: string): boolean {
  return (
    path === "/sitemap.xml" ||
    path === "/sitemap-blog.xml" ||
    path === "/sitemap-work.xml" ||
    path === "/feed.xml"
  );
}

function publicCacheControl(path: string): string {
  return isDiscoveryPath(path)
    ? "public, max-age=0, s-maxage=300, stale-while-revalidate=600, must-revalidate"
    : "public, max-age=0, s-maxage=15, stale-while-revalidate=30, must-revalidate";
}

function isDatabaseBackedPublicApiPath(path: string): boolean {
  return (
    path === "/blog/posts" ||
    path === "/blog/posts/discovery" ||
    path.startsWith("/blog/posts/") ||
    path === "/work" ||
    path.startsWith("/work/")
  );
}

function isCacheablePublicPagePath(path: string): boolean {
  return (
    path === "/blog" ||
    path === "/blog/ar" ||
    path.startsWith("/blog/en/") ||
    path.startsWith("/blog/ar/") ||
    path === "/our-work" ||
    path === "/ar/our-work" ||
    path.startsWith("/our-work/") ||
    path.startsWith("/ar/our-work/") ||
    isDiscoveryPath(path)
  );
}

function isStaticAssetRequest(url: string | undefined): boolean {
  const path = url?.split("?", 1)[0] ?? "";
  return (
    path.startsWith("/assets/") ||
    path.startsWith("/images/") ||
    /\.(?:css|js|mjs|png|jpe?g|webp|avif|svg|ico|woff2?|map)$/i.test(path)
  );
}

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
    // Immutable static assets are high-volume and already protected by normal
    // HTTP status handling. Skipping per-request info logs removes avoidable
    // stdout/serialization work without changing response behavior.
    autoLogging: {
      ignore: (req) => isStaticAssetRequest(req.url),
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
app.use(cors());
app.post(
  "/api/webhooks/resend",
  express.text({ type: "application/json", limit: "256kb" }),
  handleResendWebhook,
);
app.use(express.json({ limit: "12mb" }));
app.use(express.urlencoded({ extended: true, limit: "12mb" }));

// Canonical URL normalization — must run before all route handlers so
// redirects are applied consistently to every path including /api.
app.use(redirectWww);
app.use(redirectTrailingSlash);

app.use("/api", (req, res, next) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");

  if (isDatabaseBackedPublicApiPath(req.path)) {
    res.setHeader("Cache-Control", publicCacheControl(req.path));
  } else {
    // Admin, contact, and other stateful API traffic must never be cached.
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
  }
  next();
});
app.use("/api", cachePublicResponses("api", isDatabaseBackedPublicApiPath));
app.use("/api", router);

app.use(cachePublicResponses("page", isCacheablePublicPagePath));

// Lean crawler discovery routes come first so each child sitemap queries only
// the table it actually needs. The broader public renderer remains the fallback
// for all other pages and legacy routes.
registerDiscoveryRoutes(app);

// Public site routes must be registered after /api so the final site-level
// 404 handler cannot swallow API requests.
registerOgPageRoutes(app);

export default app;
