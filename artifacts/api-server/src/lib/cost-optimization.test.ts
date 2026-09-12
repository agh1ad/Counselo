import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const apiRoot = path.resolve(import.meta.dirname, "../..");
const workspaceRoot = path.resolve(apiRoot, "../..");
const source = (relativePath: string) =>
  readFileSync(path.resolve(workspaceRoot, relativePath), "utf8");

test("the public server never polls PostgreSQL while idle", () => {
  const entry = source("artifacts/api-server/src/index.ts");
  const notifications = source(
    "artifacts/api-server/src/lib/contact-notifications.ts",
  );
  assert.doesNotMatch(entry, /startContactNotificationWorker/);
  assert.doesNotMatch(notifications, /setInterval|RECOVERY_SCAN_INTERVAL_MS/);
  assert.match(notifications, /scheduleNotificationRetry/);
  assert.match(notifications, /export async function processPendingNotifications/);
});

test("production enables persistent public caching and a manual recovery command", () => {
  const replit = source(".replit");
  const apiArtifact = source(
    "artifacts/api-server/.replit-artifact/artifact.toml",
  );
  const packageJson = source("artifacts/api-server/package.json");
  assert.match(replit, /PUBLIC_RESPONSE_CACHE_BACKEND=object-storage/);
  assert.match(
    apiArtifact,
    /PUBLIC_RESPONSE_CACHE_BACKEND = "object-storage"/,
  );
  assert.match(packageJson, /recover:contact-notifications/);
});

test("legal-update renderers run behind the anonymous publication cache", () => {
  const app = source("artifacts/api-server/src/app.ts");
  const policy = source("artifacts/api-server/src/lib/public-cache-policy.ts");
  assert.ok(
    app.indexOf('cachePublicResponses("page", isCacheablePublicPagePath)') <
      app.indexOf("registerLegalUpdatePages(app)"),
    "regional and legal-update renderers must not query before the page cache",
  );
  assert.match(policy, /path === "\/legal-updates"/);
  assert.match(policy, /path === "\/legal-updates-sitemap"/);
  assert.match(policy, /LEGAL_UPDATE_PAGE_PATH\.test\(path\)/);
  assert.match(policy, /\^\\\/work\\\/\[\^\/\]\+\$\//);
  assert.doesNotMatch(policy, /path\.startsWith\("\/work\/"\)/);
  assert.match(app, /if \(req\.headers\.authorization\)/);
});

test("every public legal-update mutation participates in cache fencing", () => {
  const routes = source("artifacts/api-server/src/legal-updates/routes.ts");
  const monitor = source("artifacts/api-server/src/legal-updates/monitor.ts");
  assert.match(routes, /withPublicContentMutation/);
  assert.match(routes, /invalidatePublicResponseCache/);
  assert.match(monitor, /withPublicContentMutation/);
  assert.match(monitor, /invalidatePublicResponseCache/);
});
