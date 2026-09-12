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
  assert.match(policy, /isCacheablePublicDocumentPath/);
  assert.match(app, /if \(req\.headers\.authorization\)/);
});

test("approved public documents and legacy attachments are cached only after public approval checks", () => {
  const app = source("artifacts/api-server/src/app.ts");
  const policy = source("artifacts/api-server/src/lib/public-cache-policy.ts");
  const work = source("artifacts/api-server/src/routes/work.ts");
  assert.match(policy, /function isCacheablePublicDocumentPath/);
  assert.ok(policy.includes('return /^\\/documents\\/[^/]+\\.pdf$/.test(path);'));
  assert.match(policy, /work\\\/\[\^\/\]\+\\\/file/);
  assert.match(work, /confidentialityConfirmed: workSamplesTable\.confidentialityConfirmed/);
  assert.match(work, /!sample\.confidentialityConfirmed/);
  assert.ok(
    app.indexOf('cachePublicResponses("document", isCacheablePublicDocumentPath)') <
      app.indexOf('app.use("/documents", createPublicDocumentsRouter'),
    "document cache must wrap the verified public document router",
  );
  assert.match(app, /cachePublicResponses\("api", isDatabaseBackedPublicApiPath\)/);
});

test("every public legal-update mutation participates in cache fencing", () => {
  const routes = source("artifacts/api-server/src/legal-updates/routes.ts");
  const monitor = source("artifacts/api-server/src/legal-updates/monitor.ts");
  assert.match(routes, /withPublicContentMutation/);
  assert.match(routes, /invalidatePublicResponseCache/);
  assert.match(monitor, /withPublicContentMutation/);
  assert.match(monitor, /invalidatePublicResponseCache/);
});

test("all public legal-update pages share a snapshot without storing source evidence", () => {
  const store = source("artifacts/api-server/src/legal-updates/store.ts");
  assert.match(store, /publicationDataCache\.read/);
  assert.match(store, /read\(\s*"legal-updates"/);
  assert.match(store, /draft - 'evidence' - 'reason' AS draft/);
  assert.match(store, /legal_update_audit/);
  assert.doesNotMatch(store, /SELECT \* FROM legal_updates/);
});
