import express, { type Express, type RequestHandler } from "express";
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

// Database-backed public content changes only when the CMS changes. Keep a
// small process-local response cache so repeated visitor/crawler requests do
// not wake PostgreSQL. Admin blog/work writes clear it immediately on the
// serving instance; the short TTL bounds cross-instance staleness.
const PUBLIC_RESPONSE_TTL_MS = 60_000;
type CachedPublicResponse = {
  expiresAt: number;
  statusCode: number;
  body: string | Buffer;
  contentType?: string;
};
const publicResponseCache = new Map<string, CachedPublicResponse>();

function clearPublicResponseCache(): void {
  publicResponseCache.clear();
}

function cachePublicResponse(keyPrefix: string, isEligible: (path: string) => boolean): RequestHandler {
  return (req, res, next) => {
    if (req.method !== "GET" || !isEligible(req.path)) {
      next();
      return;
    }

    const cacheKey = `${keyPrefix}:${req.originalUrl}`;
    const cached = publicResponseCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      res.status(cached.statusCode);
      if (cached.contentType) res.setHeader("Content-Type", cached.contentType);
      res.setHeader("X-CounselO-Response-Cache", "HIT");
      res.send(cached.body);
      return;
    }
    if (cached) publicResponseCache.delete(cacheKey);

    const originalSend = res.send.bind(res);
    res.send = ((body: unknown) => {
      if (
        res.statusCode === 200 &&
        (typeof body === "string" || Buffer.isBuffer(body))
      ) {
        const contentType = res.getHeader("Content-Type");
        publicResponseCache.set(cacheKey, {
          expiresAt: Date.now() + PUBLIC_RESPONSE_TTL_MS,
          statusCode: res.statusCode,
          body,
          contentType: typeof contentType === "string" ? contentType : undefined,
        });
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

function isDatabaseBackedPublicPagePath(path: string): boolean {
  return (
    path === "/blog" ||
    path === "/blog/ar" ||
    path.startsWith("/blog/en/") ||
    path.startsWith("/blog/ar/") ||
    path === "/our-work" ||
    path === "/ar/our-work" ||
    path.startsWith("/our-work/") ||
    path.startsWith("/ar/our-work/") ||
    path === "/sitemap-blog.xml" ||
    path === "/sitemap-work.xml" ||
    path === "/feed.xml"
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
    // Browsers revalidate immediately. Shared caches get a very small reuse
    // window in addition to the process-local cache below.
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
app.use("/api", cachePublicResponse("api", isDatabaseBackedPublicApiPath));
app.use("/api", router);

app.use(cachePublicResponse("page", isDatabaseBackedPublicPagePath));

// Public site routes must be registered after /api so the final site-level
// 404 handler cannot swallow API requests.
registerOgPageRoutes(app);

export default app;
