import assert from "node:assert/strict";
import test from "node:test";
import { verifyPdfPreview } from "./pdf-preview";

test("PDF validation uses HEAD and accepts a genuine PDF without downloading its body", async () => {
  const calls: RequestInit[] = [];
  await verifyPdfPreview("/documents/example.pdf", { fetcher: (async (_url, init) => {
    calls.push(init!);
    return new Response(null, { status: 200, headers: { "content-type": "Application/PDF; charset=binary" } });
  }) as typeof fetch });
  assert.equal(calls.length, 1);
  assert.equal(calls[0]?.method, "HEAD");
  assert.equal(calls[0]?.cache, "no-store");
});

test("PDF validation rejects missing, unavailable, and HTML fallback responses", async () => {
  for (const [status, mime] of [[404, "text/html"], [503, "application/pdf"], [200, "text/html"], [200, "application/json"], [200, ""]] as const) {
    await assert.rejects(verifyPdfPreview("/documents/example.pdf", { fetcher: (async () => new Response(null, { status, headers: { "content-type": mime } })) as typeof fetch }), /unavailable/);
  }
});

const hangingFetch: typeof fetch = async (_url, init) => new Promise((_resolve, reject) => {
  const signal = init!.signal!;
  if (signal.aborted) reject(signal.reason);
  else signal.addEventListener("abort", () => reject(signal.reason), { once: true });
});

test("PDF validation has a bounded timeout and cancels its fetch", async () => {
  await assert.rejects(verifyPdfPreview("/documents/example.pdf", { fetcher: hangingFetch, timeoutMs: 15 }), { name: "TimeoutError" });
});

test("PDF validation honors navigation cancellation, including an already aborted request", async () => {
  const controller = new AbortController();
  const check = verifyPdfPreview("/documents/example.pdf", { fetcher: hangingFetch, signal: controller.signal });
  controller.abort();
  await assert.rejects(check, { name: "AbortError" });
  await assert.rejects(verifyPdfPreview("/documents/other.pdf", { fetcher: hangingFetch, signal: controller.signal }), { name: "AbortError" });
});
