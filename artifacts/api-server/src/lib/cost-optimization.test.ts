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
  assert.doesNotMatch(entry, /primePublic(?:Data|WorkFile|Snapshots)/);
  assert.doesNotMatch(entry, /prewarmPublic/);
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

test("retired pages bypass caches while active public pages keep publication caching", () => {
  const app = source("artifacts/api-server/src/app.ts");
  const policy = source("artifacts/api-server/src/lib/public-cache-policy.ts");
  assert.ok(
    app.indexOf("isRetiredPublicPath(req.path)") <
      app.indexOf('cachePublicResponses("page", isCacheablePublicPagePath)'),
    "retired pages must respond before any cached public content can be served",
  );
  assert.doesNotMatch(app, /registerLegalUpdatePages/);
  assert.ok(
    app.indexOf('cachePublicResponses("page", isCacheablePublicPagePath)') <
      app.indexOf("registerDiscoveryRoutes(app)"),
  );
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
  assert.match(work, /publishedWorkFileBySlug/);
  assert.match(work, /publishedWork\(\)/);
  assert.ok(
    app.indexOf('cachePublicResponses("document", isCacheablePublicDocumentPath)') <
      app.indexOf('app.use("/documents", createPublicDocumentsRouter'),
    "document cache must wrap the verified public document router",
  );
  assert.match(app, /cachePublicResponses\("api", isDatabaseBackedPublicApiPath\)/);
});

test("private admin queues use bounded summaries and load confidential details on demand", () => {
  const blog = source("artifacts/api-server/src/routes/blog.ts");
  const work = source("artifacts/api-server/src/routes/work.ts");
  const updates = source("artifacts/api-server/src/legal-updates/routes.ts");
  const adminBlogUi = source("artifacts/legal-site/src/pages/admin.tsx");
  const workUi = source("artifacts/legal-site/src/components/admin/WorkSamplesManager.tsx");
  const updatesUi = source("artifacts/legal-site/src/components/admin/legal-updates-manager.tsx");

  assert.match(blog, /select\(adminBlogSummaryColumns\)/);
  assert.match(blog, /\.limit\(ADMIN_PAGE_SIZE \+ 1\)/);
  assert.match(blog, /router\.get\("\/admin\/blog\/posts\/:id"/);
  assert.match(work, /select\(adminWorkSummaryColumns\)/);
  assert.match(work, /\.limit\(ADMIN_PAGE_SIZE \+ 1\)/);
  assert.match(work, /router\.get\("\/admin\/work\/:id"/);
  assert.match(updates, /draft->'en'->>'title' AS title_en/);
  assert.match(updates, /LIMIT \$1 OFFSET \$2/);
  assert.match(updates, /SELECT \* FROM legal_updates WHERE id = \$1 LIMIT 1/);
  assert.match(adminBlogUi, /\/admin\/blog\/posts\/\$\{id\}/);
  assert.match(workUi, /\/admin\/work\/\$\{id\}/);
  assert.match(updatesUi, /request\(`\/\$\{id\}`\)/);
});

test("public work collections use a lean snapshot while details remain publication-gated", () => {
  const content = source("artifacts/api-server/src/lib/published-content.ts");
  const workRoutes = source("artifacts/api-server/src/routes/work.ts");
  const discovery = source("artifacts/api-server/src/discovery-routes.ts");
  const og = source("artifacts/api-server/src/og-pages.ts");
  assert.match(content, /workSummaryColumns/);
  assert.match(content, /publicationDataCache\.read\("work-summaries"/);
  assert.match(content, /publishedWorkBySlug/);
  assert.match(content, /return \(await publishedWork\(\)\)\.find/);
  assert.match(workRoutes, /publishedWorkSummaries/);
  assert.match(workRoutes, /publishedWorkBySlug/);
  assert.match(discovery, /publishedWorkSummaries as loadPublishedWorkSummaries/);
  assert.match(og, /publishedWorkSummaries/);
  assert.match(og, /publishedWorkBySlug/);
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
