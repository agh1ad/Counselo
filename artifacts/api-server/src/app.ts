import express, { type Express, type RequestHandler } from "express";
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

const app: Express = express();

// Database-backed public content changes only when the CMS changes. Keep a
// small process-local response cache so repeated visitor/crawler requests do
// not wake PostgreSQL. User-facing CMS content keeps only a 15-second window;
// discovery documents can safely reuse a response for five minutes.
const PUBLIC_CONTENT_TTL_MS = 15_000;
const DISCOVERY_TTL_MS = 300_000;
const MAX_PUBLIC_RESPONSE_CACHE_ENTRIES = 500;
type CachedPublicResponse = {
  expiresAt: number;
  statusCode: number;
  body: string | Buffer;
  contentType?: string;
  cacheControl?: string;
  pageSource?: string;
};
const publicResponseCache = new Map<string, CachedPublicResponse>();

function clearPublicResponseCache(): void {
  publicResponseCache.clear();
}

function trimPublicResponseCache(): void {
  while (publicResponseCache.size > MAX_PUBLIC_RESPONSE_CACHE_ENTRIES) {
    const oldestKey = publicResponseCache.keys().next().value as string | undefined;
    if (!oldestKey) return;
    publicResponseCache.delete(oldestKey);
  }
}

function isDiscoveryPath(path: string): boolean {
  return (
    path === "/sitemap.xml" ||
    path === "/sitemap-blog.xml" ||
    path === "/sitemap-work.xml" ||
    path === "/feed.xml"
  );
}

function publicResponseTtl(path: string): number {
  return isDiscoveryPath(path) ? DISCOVERY_TTL_MS : PUBLIC_CONTENT_TTL_MS;
}

function publicCacheControl(path: string): string {
  return isDiscoveryPath(path)
    ? "public, max-age=0, s-maxage=300, stale-while-revalidate=600, must-revalidate"
    : "public, max-age=0, s-maxage=15, stale-while-revalidate=30, must-revalidate";
}

function cachePublicResponse(
  keyPrefix: string,
  isEligible: (path: string) => boolean,
): RequestHandler {
  return (req, res, next) => {
    if (
      (req.method !== "GET" && req.method !== "HEAD") ||
      !isEligible(req.path)
    ) {
      next();
      return;
    }

    // Express runs GET handlers for HEAD requests and still builds the same
    // response body before suppressing it on the wire. Share one cache entry
    // so GET and HEAD probes can reuse each other's work.
    const cacheMethod = req.method === "HEAD" ? "GET" : req.method;
    const cacheKey = `${keyPrefix}:${cacheMethod}:${req.originalUrl}`;
    const cached = publicResponseCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      res.status(cached.statusCode);
      if (cached.contentType) res.setHeader("Content-Type", cached.contentType);
      if (cached.cacheControl) res.setHeader("Cache-Control", cached.cacheControl);
      if (cached.pageSource) {
        res.setHeader("X-CounselO-Page-Source", cached.pageSource);
      }
      res.setHeader("X-CounselO-Response-Cache", "HIT");
      res.send(cached.body);
      return;
    }
    if (cached) publicResponseCache.delete(cacheKey);

    const originalSend = res.send.bind(res);
    res.send = ((body: unknown) => {
      const cacheableStatus = res.statusCode === 200 || res.statusCode === 404;
      if (
        cacheableStatus &&
        (typeof body === "string" || Buffer.isBuffer(body))
      ) {
        if (res.statusCode === 200) {
          // These are public, read-only CMS responses. Allow a shared edge cache
          // to absorb repeated requests while keeping browsers on revalidation.
          res.setHeader("Cache-Control", publicCacheControl(req.path));
        }
        const contentType = res.getHeader("Content-Type");
        const cacheControl = res.getHeader("Cache-Control");
        const pageSource = res.getHeader("X-CounselO-Page-Source");
        publicResponseCache.set(cacheKey, {
          expiresAt: Date.now() + publicResponseTtl(req.path),
          statusCode: res.statusCode,
          body,
          contentType: typeof contentType === "string" ? contentType : undefined,
          cacheControl:
            typeof cacheControl === "string" ? cacheControl : undefined,
          pageSource: typeof pageSource === "string" ? pageSource : undefined,
        });
        trimPublicResponseCache();
      }
      return originalSend(body);
    }) as typeof res.send;

    res.setHeader("X-CounselO-Response-Cache", "MISS");
    next();
  };
}

function isDatabaseBackedPublicApiPath(path: string): boolean {
  return (
    path === "/blog/posts" ||
    path === "/blog/posts/discovery" ||
    path.startsWith("/blog/posts/") ||
    path === "/work" ||
    (path.startsWith("/work/") && !path.endsWith("/file"))
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
app.use(express.json({ limit: "12mb" }));
app.use(express.urlencoded({ extended: true, limit: "12mb" }));

// Canonical URL normalization — must run before all route handlers so
// redirects are applied consistently to every path including /api.
app.use(redirectWww);
app.use(redirectTrailingSlash);

app.use("/api", (req, res, next) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");

  if (
    req.method !== "GET" &&
    (req.path.startsWith("/admin/blog/") || req.path.startsWith("/admin/work"))
  ) {
    clearPublicResponseCache();
  }

  if (isDatabaseBackedPublicApiPath(req.path)) {
    res.setHeader("Cache-Control", publicCacheControl(req.path));
  } else {
    // Admin, contact, and other stateful API traffic must never be cached.
    res.setHeader("Cache-Control", PUBLIC_CACHE_POLICY.dynamicHtml);
  }
  next();
});
app.use("/api", cachePublicResponse("api", isDatabaseBackedPublicApiPath));
app.use("/api", router);

app.use(cachePublicResponse("page", isCacheablePublicPagePath));

// Lean crawler discovery routes come first so each child sitemap queries only
// the table it actually needs. The broader public renderer remains the fallback
// for all other pages and legacy routes.
registerDiscoveryRoutes(app);

// Public site routes must be registered after /api so the final site-level
// 404 handler cannot swallow API requests.
registerOgPageRoutes(app);

export default app;
