import assert from "node:assert/strict";
import test from "node:test";
import { canonicalDestination } from "./canonical-url.js";

test("redirects www pages to the HTTPS apex hostname", () => {
  assert.equal(
    canonicalDestination({
      method: "GET",
      hostname: "www.counselo-legal.com",
      originalUrl: "/sa/about?source=test",
    }),
    "https://counselo-legal.com/sa/about?source=test",
  );
});

test("removes trailing slashes from public pages and preserves query strings", () => {
  assert.equal(
    canonicalDestination({
      method: "HEAD",
      hostname: "counselo-legal.com",
      originalUrl: "/syr/ar/services///?topic=family",
    }),
    "/syr/ar/services?topic=family",
  );
});

test("leaves canonical pages, API routes, and non-idempotent requests alone", () => {
  assert.equal(
    canonicalDestination({
      method: "GET",
      hostname: "counselo-legal.com",
      originalUrl: "/sa/about",
    }),
    null,
  );
  assert.equal(
    canonicalDestination({
      method: "GET",
      hostname: "counselo-legal.com",
      originalUrl: "/api/work/",
    }),
    null,
  );
  assert.equal(
    canonicalDestination({
      method: "POST",
      hostname: "www.counselo-legal.com",
      originalUrl: "/contact/",
    }),
    null,
  );
});
