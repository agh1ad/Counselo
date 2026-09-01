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
