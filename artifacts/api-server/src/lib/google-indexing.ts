import { createSign } from "node:crypto";
import { logger } from "./logger.js";

const BASE = "https://counselo-legal.com";
const INDEXNOW_KEY = "611ed21ca6ffe639fa0e476e8ea1aedb9df6601ed775825f6aa2d75da664ab5a";
const INDEXNOW_URL = "https://api.indexnow.org/indexnow";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SEARCH_CONSOLE_API = "https://www.googleapis.com/webmasters/v3";
const DEFAULT_SITE_URL = `${BASE}/`;
const DEFAULT_SITEMAP_URL = `${BASE}/sitemap.xml`;
const SITEMAP_PATHS = [
  "/sitemap.xml",
  "/sitemap-core.xml",
  "/sitemap-uae-services.xml",
  "/sitemap-sa-services.xml",
  "/sitemap-syr-services.xml",
  "/sitemap-blog.xml",
  "/sitemap-work.xml",
  "/sitemap-legal-updates.xml",
] as const;
const LEGAL_LIBRARY_URLS = [`${BASE}/legal-library`, `${BASE}/ar/legal-library`];
const DISCOVERY_HOMES = [
  `${BASE}/sa`,
  `${BASE}/sa/ar`,
  `${BASE}/syr`,
  `${BASE}/syr/ar`,
  `${BASE}/uae`,
  `${BASE}/uae/ar`,
];

/**
 * Ping IndexNow with the given URLs so Bing, Yandex, and other participating
 * engines can discover changes quickly. Google does not participate in
 * IndexNow; Google discovery is handled by crawlable links and fresh sitemaps.
 */
async function pingIndexNow(urls: string[]): Promise<void> {
  try {
    const res = await fetch(INDEXNOW_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: "counselo-legal.com",
        key: INDEXNOW_KEY,
        keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
    if (res.status === 200 || res.status === 202) {
      logger.info({ count: urls.length }, "[indexnow] accepted");
    } else {
      logger.warn({ status: res.status }, "[indexnow] unexpected response");
    }
  } catch (err) {
    logger.warn({ err }, "[indexnow] ping failed — non-fatal");
  }
}

type GoogleServiceAccount = {
  client_email: string;
  private_key: string;
};

export function googleSitemapUrls(sitemapUrl = DEFAULT_SITEMAP_URL): string[] {
  const origin = new URL(sitemapUrl).origin;
  return [...new Set([sitemapUrl, ...SITEMAP_PATHS.map((path) => `${origin}${path}`)])];
}

function base64Url(value: string | Buffer): string {
  return Buffer.from(value)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function googleSitemapConfig(): {
  key: GoogleServiceAccount;
  siteUrl: string;
  sitemapUrls: string[];
} | undefined {
  const raw = process.env.GOOGLE_INDEXING_SA_KEY?.trim();
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw) as Partial<GoogleServiceAccount>;
    if (
      typeof parsed.client_email !== "string" ||
      typeof parsed.private_key !== "string" ||
      !parsed.private_key.includes("PRIVATE KEY")
    ) {
      throw new Error("Google service-account key is missing client_email or private_key");
    }
    const sitemapUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITEMAP_URL?.trim() || DEFAULT_SITEMAP_URL;
    return {
      key: { client_email: parsed.client_email, private_key: parsed.private_key },
      siteUrl: process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL?.trim() || DEFAULT_SITE_URL,
      sitemapUrls: googleSitemapUrls(sitemapUrl),
    };
  } catch (err) {
    logger.warn({ err }, "[google] Search Console key is invalid; sitemap submission skipped");
    return undefined;
  }
}

let googleSitemapSubmission: Promise<void> | undefined;

async function submitSitemapToGoogle(): Promise<void> {
  const config = googleSitemapConfig();
  if (!config) return;
  if (googleSitemapSubmission) return googleSitemapSubmission;

  googleSitemapSubmission = (async () => {
    try {
      const issuedAt = Math.floor(Date.now() / 1000);
      const unsigned = `${base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${base64Url(JSON.stringify({
        iss: config.key.client_email,
        scope: "https://www.googleapis.com/auth/webmasters",
        aud: GOOGLE_TOKEN_URL,
        iat: issuedAt,
        exp: issuedAt + 3600,
      }))}`;
      const signer = createSign("RSA-SHA256");
      signer.update(unsigned);
      const assertion = `${unsigned}.${base64Url(signer.sign(config.key.private_key))}`;
      const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion,
        }),
      });
      if (!tokenResponse.ok) {
        throw new Error(`Google OAuth token request failed with HTTP ${tokenResponse.status}`);
      }
      const token = (await tokenResponse.json()) as { access_token?: unknown };
      if (typeof token.access_token !== "string") {
        throw new Error("Google OAuth token response did not contain access_token");
      }

      const results = await Promise.allSettled(
        config.sitemapUrls.map(async (sitemapUrl) => {
          const endpoint = `${GOOGLE_SEARCH_CONSOLE_API}/sites/${encodeURIComponent(config.siteUrl)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
          const submitResponse = await fetch(endpoint, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token.access_token}` },
          });
          if (!submitResponse.ok) {
            const errorBody = await submitResponse.text();
            let googleMessage = "";
            try {
              const parsed = JSON.parse(errorBody) as { error?: { message?: unknown } };
              if (typeof parsed.error?.message === "string") googleMessage = parsed.error.message;
            } catch {
              // Keep the status-only error when Google does not return JSON.
            }
            throw new Error(
              `Google sitemap submission failed for ${sitemapUrl} with HTTP ${submitResponse.status}${googleMessage ? `: ${googleMessage}` : ""}`,
            );
          }
          return sitemapUrl;
        }),
      );
      const failed = results.filter(
        (result): result is PromiseRejectedResult => result.status === "rejected",
      );
      if (failed.length > 0) {
        logger.warn(
          { submitted: config.sitemapUrls.length - failed.length, failed: failed.length },
          "[google] some sitemap submissions failed — non-fatal",
        );
      } else {
        logger.info({ count: config.sitemapUrls.length }, "[google] all sitemaps submitted to Search Console");
      }
    } catch (err) {
      logger.warn({ err }, "[google] sitemap submission failed — non-fatal");
    } finally {
      googleSitemapSubmission = undefined;
    }
  })();
  return googleSitemapSubmission;
}

export function notifySitemapUpdated(): void {
  void submitSitemapToGoogle();
}

/**
 * Returns the canonical URLs to notify when a blog post is published.
 * Includes the post page itself and the blog index (which now lists the post).
 * Both language canonicals are submitted; region-prefixed legacy variants
 * redirect and must not be submitted directly to indexing APIs.
 */
export function blogPostUrls(slug: string): string[] {
  return [
    `${BASE}/blog/en/${slug}`,
    `${BASE}/blog/ar/${slug}`,
    `${BASE}/blog`,
    `${BASE}/blog/ar`,
    ...LEGAL_LIBRARY_URLS,
    ...DISCOVERY_HOMES,
  ];
}

/**
 * Fire-and-forget: notifies IndexNow immediately when a post is published.
 * Google discovers the update through the database-backed sitemap and RSS feed.
 */
export function notifyPublished(slug: string): void {
  const urls = blogPostUrls(slug);
  void pingIndexNow(urls);
  notifySitemapUpdated();
}

/** Ask participating engines to recrawl a removed/unpublished article so its
 * new 404 state is discovered promptly. The live sitemap drops it instantly. */
export function notifyRemoved(slug: string): void {
  void pingIndexNow(blogPostUrls(slug));
  notifySitemapUpdated();
}

export function workSampleUrls(slug: string): string[] {
  return [
    `${BASE}/our-work/${slug}`,
    `${BASE}/ar/our-work/${slug}`,
    `${BASE}/our-work`,
    `${BASE}/ar/our-work`,
    ...LEGAL_LIBRARY_URLS,
    ...DISCOVERY_HOMES,
  ];
}

export function notifyWorkPublished(slug: string): void {
  const urls = workSampleUrls(slug);
  void pingIndexNow(urls);
  notifySitemapUpdated();
}

export function notifyWorkRemoved(slug: string): void {
  void pingIndexNow(workSampleUrls(slug));
  notifySitemapUpdated();
}
