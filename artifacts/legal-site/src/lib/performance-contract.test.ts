import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const siteRoot = path.resolve(import.meta.dirname, "../..");
const workspaceRoot = path.resolve(siteRoot, "../..");
const readSite = (relativePath: string) =>
  readFileSync(path.join(siteRoot, relativePath), "utf8");

test("the public shell keeps fonts and analytics off render-blocking duplicate paths", () => {
  const html = readSite("index.html");
  assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
  assert.doesNotMatch(html, /id="ga-script"|id="ga-inline"/);

  const app = readSite("src/App.tsx");
  assert.match(app, /function RoutedLanguageBoundary/);
  assert.match(app, /location === "\/" \|\| location === "\/ar"/);
});

test("browser imports exclude server schemas and public images stay compact", () => {
  const browserApi = readFileSync(
    path.join(workspaceRoot, "lib/api-zod/src/browser.ts"),
    "utf8",
  );
  assert.doesNotMatch(
    browserApi,
    /export \* from ".*(?:generated|testimonial-governance|zod)/,
  );

  const optimized = path.join(siteRoot, "public/images/optimized");
  const sizeLimits = {
    "counselo-region-logo.webp": 10_000,
    "saudi-arabia-flag.webp": 2_000,
    "syria-flag.webp": 2_000,
    "counselo-platform-line-art-v1.webp": 225_000,
    "counselo-gold-legal-line-art-v1.webp": 85_000,
  } as const;

  for (const [filename, maxBytes] of Object.entries(sizeLimits)) {
    assert.ok(
      statSync(path.join(optimized, filename)).size <= maxBytes,
      `${filename} must remain at or below ${maxBytes} bytes`,
    );
  }
});
