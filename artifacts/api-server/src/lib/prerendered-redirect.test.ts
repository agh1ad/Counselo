import assert from "node:assert/strict";
import test from "node:test";
import { prerenderedRedirect } from "./prerendered-redirect.js";

test("consolidation stubs become same-language, same-service redirects only", () => {
  const source = "/uae/ar/services/contracts/old-question";
  const stub = (target: string) => `<meta name="x-source-route" content="${source}"><meta name="robots" content="noindex, nofollow"><meta http-equiv="refresh" content="0; url=${target}">`;
  assert.equal(prerenderedRedirect(stub("/uae/ar/services/contracts"), source), "/uae/ar/services/contracts");
  assert.equal(prerenderedRedirect(stub("https://counselo-legal.com/uae/ar/services/contracts"), source), "/uae/ar/services/contracts");
  for (const target of ["https://evil.example", "//evil.example", "/uae/services/contracts", "/uae/ar/services/employment"]) assert.equal(prerenderedRedirect(stub(target), source), undefined);
  assert.equal(prerenderedRedirect(stub("/uae/ar/services/contracts"), "/different"), undefined);
  assert.equal(prerenderedRedirect("<h1>Normal page</h1>", source), undefined);
});
