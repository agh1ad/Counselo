import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { resolve } from "node:path";

// Exercise the compiled HTTP handlers, with an isolated API that can report
// unavailable or definitively missing content. Run after build:server.
let apiStatus = 503;
const api = createServer((_req, res) => {
  res.writeHead(apiStatus, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: apiStatus === 503 ? "unavailable" : "not found" }));
});
api.listen(0, "127.0.0.1");
await once(api, "listening");
const apiPort = (api.address() as AddressInfo).port;
const port = Number(process.argv[2] ?? "24440");
const server = spawn(process.execPath, [resolve(import.meta.dirname, "../../dist/ssr-server.mjs")], {
  env: { ...process.env, PORT: String(port), API_ORIGIN: `http://127.0.0.1:${apiPort}` },
  stdio: ["ignore", "pipe", "pipe"],
});
let diagnostics = "";
server.stderr.on("data", chunk => { diagnostics = (diagnostics + String(chunk)).slice(-3000); });
try {
  await new Promise<void>((resolveReady, reject) => {
    const timer = setTimeout(() => reject(new Error(`Server did not start: ${diagnostics}`)), 20_000);
    server.once("error", error => { clearTimeout(timer); reject(error); });
    server.once("exit", code => { clearTimeout(timer); reject(new Error(`Server exited ${code}: ${diagnostics}`)); });
    server.stdout.on("data", chunk => {
      if (String(chunk).includes("Legal site SSR server listening")) { clearTimeout(timer); resolveReady(); }
    });
  });
  const routes = ["/blog/en/outage-regression-unpublished", "/blog/ar/outage-regression-unpublished", "/our-work/outage-regression-unpublished", "/ar/our-work/outage-regression-unpublished", "/our-work/ray-qanwny-fy-tlb-aflas", "/ar/our-work/ray-qanwny-fy-tlb-aflas", "/blog/en/contractual-liability-in-commercial-transactions", "/blog/ar/contractual-liability-in-commercial-transactions"];
  for (const status of [503, 404]) {
    apiStatus = status;
    for (const route of routes) {
      const response = await fetch(`http://127.0.0.1:${port}${route}`, { signal: AbortSignal.timeout(15_000), redirect: "manual" });
      const html = await response.text();
      assert.equal(response.status, status, `${route}: ${html.slice(0, 200)}`);
      assert.equal(response.headers.get("cache-control"), "no-store");
      if (status === 503) {
        assert.equal(response.headers.get("retry-after"), "60");
        const arabic = route.includes("/ar/");
        assert.match(html, arabic ? /lang="ar" dir="rtl"/ : /lang="en" dir="ltr"/);
        assert.match(html, arabic ? /<h1>المحتوى غير متاح مؤقتاً<\/h1>/ : /<h1>Content temporarily unavailable<\/h1>/);
        assert.doesNotMatch(html, /noindex|rel="canonical"/);
      } else {
        assert.equal(response.headers.get("retry-after"), null);
        assert.match(html, /noindex/);
      }
    }
  }
  console.log("Passed 16 compiled-handler checks: article/work outages return 503 and removals return 404, including records with existing prerender snapshots.");
} finally {
  if (server.exitCode === null) {
    const stopped = once(server, "exit");
    server.kill("SIGTERM");
    await stopped;
  }
  api.closeAllConnections();
  await new Promise<void>((resolveClose, reject) => api.close(error => error ? reject(error) : resolveClose()));
}
