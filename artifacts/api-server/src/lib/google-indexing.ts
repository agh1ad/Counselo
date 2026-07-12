import { createSign } from "node:crypto";
import { logger } from "./logger.js";

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

export function blogPostUrls(slug: string): string[] {
  const BASE = "https://counselo-legal.com";
  return [
    `${BASE}/sa/blog/${slug}`,
    `${BASE}/sa/ar/blog/${slug}`,
    `${BASE}/syr/blog/${slug}`,
    `${BASE}/syr/ar/blog/${slug}`,
  ];
}
