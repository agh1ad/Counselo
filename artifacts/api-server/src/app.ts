import { isRetiredPublicPath, retiredPageHtml, RETIRED_RESPONSE_HEADERS } from "@workspace/api-zod";
import { createPublicDocumentsRouter } from "./lib/public-work-documents.js";
import { adminLoginLimiter } from "./middlewares/admin-login.js";
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
import {
  isCacheablePublicPagePath,
  isCacheablePublicDocumentPath,
  isDatabaseBackedPublicApiPath,
  isDiscoveryPath,
  publicCacheControl,
} from "./lib/public-cache-policy.js";
import { PublicSnapshotUnavailableError } from "./lib/publication-data-cache.js";
import { PublicWorkFileUnavailableError } from "./lib/public-work-file-cache.js";
import { publishedWorkFileBySlug } from "./lib/published-content.js";

const app: Express = express();

app.use((req, res, next) => {
  if (!isRetiredPublicPath(req.path)) return next();
  res.status(410).set(RETIRED_RESPONSE_HEADERS).send(retiredPageHtml(req.path));
});

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
// Rate-limit sign-in before body parsing; editor uploads keep their separate size limit.
app.post("/api/admin/auth", adminLoginLimiter, express.json({ limit: "4kb", type: () => true }));
app.use(express.json({ limit: "12mb" }));
app.use(express.urlencoded({ extended: true, limit: "12mb" }));

// Canonical URL normalization — must run before all route handlers so
// redirects are applied consistently to every path including /api.
app.use(redirectWww);
app.use(redirectTrailingSlash);

app.use("/api", (req, res, next) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");

  if (req.headers.authorization) {
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
  } else if (isDatabaseBackedPublicApiPath(req.path)) {
    res.setHeader("Cache-Control", publicCacheControl(req.path));
  } else {
    // Admin, contact, and other stateful API traffic must never be cached.
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
  }
  next();
});
app.use("/api", cachePublicResponses("api", isDatabaseBackedPublicApiPath));
app.use("/api", router);

// Valid published documents are immutable within a publication epoch. Keep
// client-facing no-store headers, but avoid reloading PDF bytes from
// PostgreSQL after the first verified response. Work mutations rotate the
// publication namespace before cached documents can be reused.
app.use(cachePublicResponses("document", isCacheablePublicDocumentPath));
app.use("/documents", createPublicDocumentsRouter(async (slug) => publishedWorkFileBySlug(slug)));

// Cache public page responses within the current publication namespace.
app.use(cachePublicResponses("page", isCacheablePublicPagePath));

// Lean crawler discovery routes come first so each child sitemap queries only
// the table it actually needs. The broader public renderer remains the fallback
// for all other pages and legacy routes.
registerDiscoveryRoutes(app);

// Public site routes must be registered after /api so the final site-level
// 404 handler cannot swallow API requests.
registerOgPageRoutes(app);

app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if ((error instanceof PublicSnapshotUnavailableError || error instanceof PublicWorkFileUnavailableError) && !res.headersSent) {
    res
      .status(503)
      .setHeader("Cache-Control", "no-store")
      .setHeader("Retry-After", "60")
      .setHeader("X-Robots-Tag", "noindex, nofollow, noarchive")
      .type("text/plain")
      .send("Public content temporarily unavailable");
    return;
  }
  next(error);
});

export default app;
