import assert from "node:assert/strict";
import test from "node:test";
import { appendHydrationData } from "./ssr-hydration";

test("large hydration payloads follow CSS and page markup, before deferred modules execute", () => {
  const template = '<html><head><script type="module" src="/app.js"></script><link rel="stylesheet" href="/app.css"></head><body><main>Page content</main></body></html>';
  const scripts = `<script>window.__SSR_POSTS__=${JSON.stringify(["x".repeat(180_000)])};</script>`;
  const html = appendHydrationData(template, scripts);
  assert.ok(html.indexOf("/app.css") < html.indexOf("</head>"));
  assert.ok(html.indexOf("</main>") < html.indexOf("window.__SSR_POSTS__"));
  assert.ok(html.indexOf("window.__SSR_POSTS__") < html.indexOf("</body>"));
  assert.equal(html.slice(0, html.indexOf("</head>")), template.slice(0, template.indexOf("</head>")));
});

test("hydration insertion does not interpret replacement tokens in user content", () => {
  const scripts = '<script>window.__SSR_POST__={"title":"$& $` $\'"};</script>';
  assert.equal(
    appendHydrationData("<body>Page</body>", scripts),
    `<body>Page${scripts}\n</body>`,
  );
});

test("missing body fails explicitly rather than silently omitting hydration data", () => {
  assert.throws(() => appendHydrationData("<html></html>", "<script></script>"), /closing body/);
});
