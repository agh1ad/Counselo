import assert from "node:assert/strict";
import test from "node:test";
import {
  decodePublicResponseBody,
  encodePublicResponseEntry,
  publicResponseObjectName,
} from "./public-response-cache.js";

test("persistent cache keys are deterministic and do not expose URLs", () => {
  const key = "page:GET:/blog/en/confidential-contract-query?source=test";
  const first = publicResponseObjectName(key);
  const second = publicResponseObjectName(key);
  assert.equal(first, second);
  assert.match(first, /^counselo\/public-response-cache\/v1\/[a-f0-9]{64}\.json$/);
  assert.doesNotMatch(first, /confidential|source=test/);
});

test("persistent cache entries preserve text and binary responses", () => {
  const text = encodePublicResponseEntry({
    statusCode: 200,
    body: "<html>Arabic العربية</html>",
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
  assert.equal(decodePublicResponseBody(text), "<html>Arabic العربية</html>");

  const binaryBody = Buffer.from([0, 1, 2, 250, 255]);
  const binary = encodePublicResponseEntry({
    statusCode: 200,
    body: binaryBody,
    headers: { "Content-Type": "application/pdf" },
  });
  assert.deepEqual(decodePublicResponseBody(binary), binaryBody);
});
