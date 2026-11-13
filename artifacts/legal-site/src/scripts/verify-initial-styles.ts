import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Public HTML is rendered before JavaScript runs. Every emitted stylesheet
// must therefore be discoverable as a blocking stylesheet in the HTML shell,
// including styles imported by lazy routes. Check the actual client output.
const publicDir = fileURLToPath(new URL("../../dist/public/", import.meta.url));
const html = readFileSync(resolve(publicDir, "index.html"), "utf8");
const head = html.slice(0, html.indexOf("</head>"));
const attributes = (tag: string, name: string) =>
  tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"))?.[1];
const initialStyles = [...head.matchAll(/<link\b[^>]*>/gi)]
  .map(([tag]) => ({ tag, href: attributes(tag, "href"), rel: attributes(tag, "rel"), media: attributes(tag, "media") }))
  .filter(({ tag, rel, media }) => rel === "stylesheet" && (!media || media === "all" || media === "screen") && !/\bdisabled\b/i.test(tag))
  .map(({ href }) => new URL(href ?? "", "https://build.invalid").pathname);
const stylesheets = readdirSync(resolve(publicDir, "assets")).filter(name => name.endsWith(".css"));
assert.ok(stylesheets.length, "Client build must emit application styles");
for (const name of stylesheets) {
  assert.ok(initialStyles.some(path => path.endsWith(`/assets/${name}`)), `Stylesheet ${name} waits for JavaScript instead of loading with the initial HTML`);
  assert.ok(readFileSync(resolve(publicDir, "assets", name)).length, `Stylesheet ${name} is empty`);
}
console.log(`Initial styles PASS: all ${stylesheets.length} emitted stylesheet(s) load from the HTML head before rendering.`);
