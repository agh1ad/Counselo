import assert from "node:assert/strict";
import test from "node:test";
import type { NextFunction, Request, Response } from "express";
import {
  redirectTrailingSlash,
  redirectWww,
} from "../middlewares/normalize.js";

// ---------------------------------------------------------------------------
// Minimal mock helpers — no external packages required
// ---------------------------------------------------------------------------

function makeReq(
  method: string,
  hostname: string,
  pathWithQuery: string,
): Pick<Request, "method" | "hostname" | "path" | "url"> {
  const qIdx = pathWithQuery.indexOf("?");
  const path = qIdx === -1 ? pathWithQuery : pathWithQuery.slice(0, qIdx);
  return { method, hostname, path, url: pathWithQuery };
}

interface MockRes {
  redirectStatus: number | undefined;
  redirectLocation: string | undefined;
  redirect(status: number, location: string): void;
}

function makeRes(): MockRes {
  const res: MockRes = {
    redirectStatus: undefined,
    redirectLocation: undefined,
    redirect(status: number, location: string) {
      res.redirectStatus = status;
      res.redirectLocation = location;
    },
  };
  return res;
}

function makeNext(): { fn: NextFunction; wasCalled: () => boolean } {
  let called = false;
  return {
    fn: () => { called = true; },
    wasCalled: () => called,
  };
}

// ---------------------------------------------------------------------------
// redirectWww
// ---------------------------------------------------------------------------

test("redirectWww: www apex → https apex, 301", () => {
  const req = makeReq("GET", "www.counselo-legal.com", "/blog");
  const res = makeRes();
  const next = makeNext();
  redirectWww(req as Request, res as unknown as Response, next.fn);
  assert.equal(res.redirectStatus, 301);
  assert.equal(res.redirectLocation, "https://counselo-legal.com/blog");
  assert.equal(next.wasCalled(), false);
});

test("redirectWww: preserves query string", () => {
  const req = makeReq("GET", "www.counselo-legal.com", "/our-work/slug?preview=1");
  const res = makeRes();
  const next = makeNext();
  redirectWww(req as Request, res as unknown as Response, next.fn);
  assert.equal(res.redirectLocation, "https://counselo-legal.com/our-work/slug?preview=1");
});

test("redirectWww: apex hostname passes through unchanged", () => {
  const req = makeReq("GET", "counselo-legal.com", "/blog");
  const res = makeRes();
  const next = makeNext();
  redirectWww(req as Request, res as unknown as Response, next.fn);
  assert.equal(res.redirectStatus, undefined);
  assert.equal(next.wasCalled(), true);
});

test("redirectWww: www redirect applies regardless of method", () => {
  const req = makeReq("POST", "www.counselo-legal.com", "/api/contact");
  const res = makeRes();
  const next = makeNext();
  redirectWww(req as Request, res as unknown as Response, next.fn);
  assert.equal(res.redirectStatus, 301);
  assert.equal(res.redirectLocation, "https://counselo-legal.com/api/contact");
});

// ---------------------------------------------------------------------------
// redirectTrailingSlash
// ---------------------------------------------------------------------------

test("redirectTrailingSlash: /blog/ → /blog, 301", () => {
  const req = makeReq("GET", "counselo-legal.com", "/blog/");
  const res = makeRes();
  const next = makeNext();
  redirectTrailingSlash(req as Request, res as unknown as Response, next.fn);
  assert.equal(res.redirectStatus, 301);
  assert.equal(res.redirectLocation, "/blog");
  assert.equal(next.wasCalled(), false);
});

test("redirectTrailingSlash: /our-work/slug/ → /our-work/slug, 301", () => {
  const req = makeReq("GET", "counselo-legal.com", "/our-work/test-slug/");
  const res = makeRes();
  const next = makeNext();
  redirectTrailingSlash(req as Request, res as unknown as Response, next.fn);
  assert.equal(res.redirectStatus, 301);
  assert.equal(res.redirectLocation, "/our-work/test-slug");
});

test("redirectTrailingSlash: preserves query string", () => {
  const req = makeReq("GET", "counselo-legal.com", "/blog/?page=2");
  const res = makeRes();
  const next = makeNext();
  redirectTrailingSlash(req as Request, res as unknown as Response, next.fn);
  assert.equal(res.redirectStatus, 301);
  assert.equal(res.redirectLocation, "/blog?page=2");
});

test("redirectTrailingSlash: root / is never redirected", () => {
  const req = makeReq("GET", "counselo-legal.com", "/");
  const res = makeRes();
  const next = makeNext();
  redirectTrailingSlash(req as Request, res as unknown as Response, next.fn);
  assert.equal(res.redirectStatus, undefined);
  assert.equal(next.wasCalled(), true);
});

test("redirectTrailingSlash: /api/ paths are never redirected", () => {
  const req = makeReq("GET", "counselo-legal.com", "/api/contact/");
  const res = makeRes();
  const next = makeNext();
  redirectTrailingSlash(req as Request, res as unknown as Response, next.fn);
  assert.equal(res.redirectStatus, undefined);
  assert.equal(next.wasCalled(), true);
});

test("redirectTrailingSlash: POST with trailing slash is never redirected", () => {
  const req = makeReq("POST", "counselo-legal.com", "/blog/");
  const res = makeRes();
  const next = makeNext();
  redirectTrailingSlash(req as Request, res as unknown as Response, next.fn);
  assert.equal(res.redirectStatus, undefined);
  assert.equal(next.wasCalled(), true);
});

test("redirectTrailingSlash: HEAD with trailing slash is redirected", () => {
  const req = makeReq("HEAD", "counselo-legal.com", "/our-work/");
  const res = makeRes();
  const next = makeNext();
  redirectTrailingSlash(req as Request, res as unknown as Response, next.fn);
  assert.equal(res.redirectStatus, 301);
  assert.equal(res.redirectLocation, "/our-work");
});

test("redirectTrailingSlash: slashless path passes through unchanged", () => {
  const req = makeReq("GET", "counselo-legal.com", "/blog");
  const res = makeRes();
  const next = makeNext();
  redirectTrailingSlash(req as Request, res as unknown as Response, next.fn);
  assert.equal(res.redirectStatus, undefined);
  assert.equal(next.wasCalled(), true);
});

test("redirectTrailingSlash: ar our-work trailing slash redirected", () => {
  const req = makeReq("GET", "counselo-legal.com", "/ar/our-work/");
  const res = makeRes();
  const next = makeNext();
  redirectTrailingSlash(req as Request, res as unknown as Response, next.fn);
  assert.equal(res.redirectStatus, 301);
  assert.equal(res.redirectLocation, "/ar/our-work");
});
