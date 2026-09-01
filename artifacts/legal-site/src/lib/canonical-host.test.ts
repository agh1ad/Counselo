import assert from "node:assert/strict";
import test from "node:test";
import { canonicalHostRedirect } from "./canonical-host.js";

test("redirects the duplicate www host while preserving path and query", () => {
  assert.equal(
    canonicalHostRedirect(
      "internal.replit.app",
      "www.counselo-legal.com",
      "/sa/services?utm_source=test",
    ),
    "https://counselo-legal.com/sa/services?utm_source=test",
  );
});

test("normalizes forwarded host lists and ports", () => {
  assert.equal(
    canonicalHostRedirect(
      undefined,
      "www.counselo-legal.com:443, internal.replit.app",
      "/ar",
    ),
    "https://counselo-legal.com/ar",
  );
});

test("does not redirect the canonical or hosting-internal host", () => {
  assert.equal(
    canonicalHostRedirect("counselo-legal.com", undefined, "/"),
    null,
  );
  assert.equal(
    canonicalHostRedirect("internal.replit.app", undefined, "/"),
    null,
  );
});

