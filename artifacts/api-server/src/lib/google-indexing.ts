import { createSign } from "node:crypto";
import { logger } from "./logger.js";

const BASE = "https://counselo-legal.com";
const INDEXNOW_KEY = "fc82de857e07c9a2f89982c0e825dee1";
const INDEXNOW_URL = "https://api.indexnow.org/indexnow";

const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const INDEXING_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";

async function getAccessToken(saJson: string): Promise<string> {
  const sa = JSON.parse(saJson) as { client_email: string; private_key: string };
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      iss: sa.client_email,
      scope: INDEXING_SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  ).toString("base64url");
  const signingInput = `${header}.${payload}`;
  const sign = createSign("RSA-SHA256");
  sign.update(signingInput);
  const sig = sign.sign(sa.private_key, "base64url");
  const jwt = `${signingInput}.${sig}`;
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = (await res.json()) as { access_token?: string; error?: string };
  if (!data.access_token) {
    throw new Error(`Google token exchange failed: ${data.error ?? res.status}`);
  }
  return data.access_token;
}

/**
 * Ping IndexNow with the given URLs so Bing, Yandex, and other participating
 * engines pick them up within minutes. IndexNow is forwarded to Google Search
 * by the other engines but is not a direct Google signal — we also call the
 * Google Indexing API separately for that.
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

export async function notifyGoogleUrls(urls: string[]): Promise<void> {
  const saJson = process.env["GOOGLE_INDEXING_SA_KEY"];
  if (!saJson) {
    logger.warn("GOOGLE_INDEXING_SA_KEY not set — skipping Google Indexing notification");
    return;
  }
  try {
    const token = await getAccessToken(saJson);
    const results = await Promise.allSettled(
      urls.map((url) =>
        fetch(INDEXING_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ url, type: "URL_UPDATED" }),
        }),
      ),
    );
    const failed = results.filter((r) => r.status === "rejected").length;
    logger.info(
      { total: urls.length, failed },
      `[google-indexing] notified ${urls.length - failed}/${urls.length} URLs`,
    );
  } catch (err) {
    logger.warn({ err }, "[google-indexing] notification failed — non-fatal");
  }
}

/**
 * Returns the canonical URLs to notify when a blog post is published.
 * Includes the post page itself and the blog index (which now lists the post).
 * Only the single canonical URL is used — region-prefixed variants redirect
 * and must not be submitted directly to indexing APIs.
 */
export function blogPostUrls(slug: string): string[] {
  return [
    `${BASE}/blog/${slug}`,
    `${BASE}/blog`,
  ];
}

/**
 * Fire-and-forget: notifies both the Google Indexing API and IndexNow
 * immediately when a post is published. Call this after any publish event.
 */
export function notifyPublished(slug: string): void {
  const urls = blogPostUrls(slug);
  void notifyGoogleUrls(urls);
  void pingIndexNow(urls);
}

/** Ask participating engines to recrawl a removed/unpublished article so its
 * new 404 state is discovered promptly. The live sitemap drops it instantly. */
export function notifyRemoved(slug: string): void {
  void pingIndexNow(blogPostUrls(slug));
}

export function workSampleUrls(slug: string): string[] {
  return [
    `${BASE}/our-work/${slug}`,
    `${BASE}/ar/our-work/${slug}`,
    `${BASE}/our-work`,
    `${BASE}/ar/our-work`,
  ];
}

export function notifyWorkPublished(slug: string): void {
  const urls = workSampleUrls(slug);
  void notifyGoogleUrls(urls);
  void pingIndexNow(urls);
}

export function notifyWorkRemoved(slug: string): void {
  void pingIndexNow(workSampleUrls(slug));
}
