/**
 * Integration regression tests for work sample route handlers.
 *
 * Structure:
 *   1. Pure logic — resolveWorkLanguage (no I/O)
 *   2. Pure HTML — buildWorkHtmlFromTemplate (no I/O)
 *   3. HTTP-level — a test-only Express app wired with the real exported
 *      pure functions + mocked fetch, so we assert exact HTTP status codes
 *      for /ar/our-work/:slug and /our-work/:slug without needing dist/ files.
 */

import assert from "node:assert/strict";
import test from "node:test";
import http from "node:http";
import express from "express";
import { resolveWorkLanguage, buildWorkHtmlFromTemplate } from "./ssr-server.js";

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

interface ApiWorkSample {
  slug: string;
  date: string;
  updatedAt?: string | null;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  workTypeEn: string;
  workTypeAr: string;
  jurisdictionEn: string;
  jurisdictionAr: string;
  seoTitleEn: string;
  seoTitleAr: string;
  seoDescriptionEn: string;
  seoDescriptionAr: string;
  fileMimeType: string;
  published: boolean;
  hasFile?: boolean;
}

const ARABIC_ONLY: ApiWorkSample = {
  slug: "ray-qanwny-test",
  date: "2025-01-15",
  updatedAt: null,
  titleEn: "",
  titleAr: "رأي قانوني في طلب إفلاس",
  summaryEn: "",
  summaryAr: "ملخص الرأي القانوني المقدم في قضية الإفلاس",
  workTypeEn: "",
  workTypeAr: "رأي قانوني",
  jurisdictionEn: "",
  jurisdictionAr: "سوريا",
  seoTitleEn: "",
  seoTitleAr: "رأي قانوني في طلب إفلاس | كاونسلو",
  seoDescriptionEn: "",
  seoDescriptionAr: "ملخص الرأي القانوني في قضية الإفلاس أمام المحاكم السورية",
  fileMimeType: "application/pdf",
  published: true,
  hasFile: true,
};

const BILINGUAL: ApiWorkSample = {
  ...ARABIC_ONLY,
  slug: "legal-opinion-bilingual", // different slug so db lookups are unambiguous
  titleEn: "Legal Opinion on Bankruptcy",
  summaryEn: "Legal opinion on bankruptcy proceedings",
  seoTitleEn: "Legal Opinion on Bankruptcy | CounselO",
  seoDescriptionEn: "Legal opinion on bankruptcy proceedings in Syrian courts",
};

const SHELL = `<!doctype html><html lang="en"><head><!--app-head--></head><body><div id="root"></div></body></html>`;

// ---------------------------------------------------------------------------
// 1. resolveWorkLanguage — pure routing logic
// ---------------------------------------------------------------------------

test("Arabic-only at /ar → serve", () => {
  assert.equal(resolveWorkLanguage(ARABIC_ONLY, "ar").action, "serve");
});

test("Arabic-only at /en → redirect to /ar/our-work/", () => {
  const r = resolveWorkLanguage(ARABIC_ONLY, "en");
  assert.equal(r.action, "redirect");
  assert.ok("to" in r && r.to.startsWith("/ar/our-work/"), `Got: ${"to" in r ? r.to : r}`);
});

test("English-only at /ar → redirect to /our-work/", () => {
  // Must have titleEn set; otherwise neither branch fires and we get "serve"
  const enOnly = { ...ARABIC_ONLY, titleAr: "", seoTitleAr: "", titleEn: "Legal Opinion" };
  const r = resolveWorkLanguage(enOnly, "ar");
  assert.equal(r.action, "redirect");
  assert.ok("to" in r && r.to.startsWith("/our-work/"), `Got: ${"to" in r ? r.to : r}`);
});

test("Bilingual at /ar → serve", () => {
  assert.equal(resolveWorkLanguage(BILINGUAL, "ar").action, "serve");
});

test("Bilingual at /en → serve", () => {
  assert.equal(resolveWorkLanguage(BILINGUAL, "en").action, "serve");
});

test("null (missing) → notfound", () => {
  assert.equal(resolveWorkLanguage(null, "ar").action, "notfound");
});

// ---------------------------------------------------------------------------
// 2. buildWorkHtmlFromTemplate — pure HTML assertions
// ---------------------------------------------------------------------------

test("Arabic page: lang=ar dir=rtl", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(html.includes('lang="ar"'), "lang=ar missing");
  assert.ok(html.includes('dir="rtl"'), "dir=rtl missing");
});

test("Arabic page: robots=index,follow (no noindex)", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(html.includes("index, follow"), "index/follow missing");
  assert.ok(!html.includes("noindex"), "must not contain noindex");
});

test("Arabic page: self-canonical at /ar/our-work/:slug", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(
    html.includes(`/ar/our-work/${ARABIC_ONLY.slug}`),
    "/ar/our-work/ canonical missing",
  );
});

test("Arabic-only: x-default hreflang points to Arabic canonical", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(
    html.includes(
      `hreflang="x-default" href="https://counselo-legal.com/ar/our-work/${ARABIC_ONLY.slug}"`,
    ),
    "x-default should point to Arabic canonical for Arabic-only record",
  );
});

test("Bilingual: en + ar hreflang links, x-default=en", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, BILINGUAL, "ar");
  assert.ok(html.includes('hreflang="en"'), "hreflang=en missing");
  assert.ok(html.includes('hreflang="ar"'), "hreflang=ar missing");
  assert.ok(
    html.includes(
      `hreflang="x-default" href="https://counselo-legal.com/our-work/${BILINGUAL.slug}"`,
    ),
    "x-default should point to English canonical for bilingual record",
  );
});

test("Arabic page: og:type=article, og:title, og:url", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(html.includes('og:type" content="article"'), "og:type=article missing");
  assert.ok(html.includes("og:title"), "og:title missing");
  assert.ok(html.includes("og:url"), "og:url missing");
});

test("Arabic page: CreativeWork JSON-LD", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(html.includes('"CreativeWork"'), "CreativeWork schema missing");
});

test("Arabic page: BreadcrumbList JSON-LD", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(html.includes('"BreadcrumbList"'), "BreadcrumbList schema missing");
});

test("Arabic page: window.__SSR_WORK__ bootstrap data", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, ARABIC_ONLY, "ar");
  assert.ok(html.includes("window.__SSR_WORK__="), "__SSR_WORK__ bootstrap missing");
});

test("English page: lang=en dir=ltr, canonical=/our-work/:slug", () => {
  const html = buildWorkHtmlFromTemplate(SHELL, BILINGUAL, "en");
  assert.ok(html.includes('lang="en"'), "lang=en missing");
  assert.ok(html.includes('dir="ltr"'), "dir=ltr missing");
  assert.ok(
    html.includes(`canonical" href="https://counselo-legal.com/our-work/${BILINGUAL.slug}"`),
    "/our-work/ canonical missing",
  );
});

// ---------------------------------------------------------------------------
// 3. HTTP-level integration — test-only Express app wired with real logic
//
//    Uses the real exported functions (resolveWorkLanguage, buildWorkHtmlFromTemplate)
//    and a mock fetch, so HTTP status codes are asserted without dist/ deps.
// ---------------------------------------------------------------------------

/** Simulates the API server: only "ray-qanwny-test" is published and Arabic-only. */
function createMockFetch(db: Record<string, ApiWorkSample>) {
  return (url: string | URL | Request): Promise<Response> => {
    const urlStr = String(url);
    // Match /api/work/:slug
    const m = urlStr.match(/\/api\/work\/([^/?]+)(?:\?|$)/);
    if (m) {
      const slug = decodeURIComponent(m[1]);
      const sample = db[slug];
      if (sample) {
        return Promise.resolve(
          new Response(JSON.stringify(sample), {
            status: 200,
            headers: { "content-type": "application/json" },
          }),
        );
      }
      return Promise.resolve(
        new Response(JSON.stringify({ error: "Not found" }), { status: 404 }),
      );
    }
    return Promise.resolve(new Response("", { status: 503 }));
  };
}

function buildTestApp(mockFetch: typeof globalThis.fetch) {
  const app = express();

  app.get("/ar/our-work/:slug", async (req, res) => {
    const slug = String(req.params["slug"] ?? "");
    let sample: ApiWorkSample | null = null;
    try {
      const r = await mockFetch(`http://api/api/work/${encodeURIComponent(slug)}`);
      if (r.ok) sample = (await r.json()) as ApiWorkSample;
    } catch {
      /* treat as error */
    }
    const decision = resolveWorkLanguage(sample, "ar");
    if (decision.action === "notfound") {
      return res.status(404).send('<meta name="robots" content="noindex, nofollow">Not found');
    }
    if (decision.action === "redirect") {
      return res.redirect(301, decision.to);
    }
    const html = buildWorkHtmlFromTemplate(SHELL, sample!, "ar");
    return res.setHeader("Content-Type", "text/html").send(html);
  });

  app.get("/our-work/:slug", async (req, res) => {
    const slug = String(req.params["slug"] ?? "");
    let sample: ApiWorkSample | null = null;
    try {
      const r = await mockFetch(`http://api/api/work/${encodeURIComponent(slug)}`);
      if (r.ok) sample = (await r.json()) as ApiWorkSample;
    } catch {
      /* treat as error */
    }
    const decision = resolveWorkLanguage(sample, "en");
    if (decision.action === "notfound") {
      return res.status(404).send('<meta name="robots" content="noindex, nofollow">Not found');
    }
    if (decision.action === "redirect") {
      return res.redirect(301, decision.to);
    }
    const html = buildWorkHtmlFromTemplate(SHELL, sample!, "en");
    return res.setHeader("Content-Type", "text/html").send(html);
  });

  return app;
}

async function get(
  server: http.Server,
  path: string,
): Promise<{ status: number; location?: string; body: string }> {
  const addr = server.address() as { port: number };
  return new Promise((resolve, reject) => {
    const req = http.request(
      { hostname: "127.0.0.1", port: addr.port, path, method: "GET" },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (body += c));
        res.on("end", () =>
          resolve({
            status: res.statusCode ?? 0,
            location: res.headers["location"],
            body,
          }),
        );
      },
    );
    req.on("error", reject);
    req.end();
  });
}

await test("HTTP route integration", async (t) => {
  const db: Record<string, ApiWorkSample> = {
    [ARABIC_ONLY.slug]: ARABIC_ONLY,
    [BILINGUAL.slug]: BILINGUAL,
  };
  const mockFetch = createMockFetch(db) as typeof globalThis.fetch;
  const server = http.createServer(buildTestApp(mockFetch) as unknown as http.RequestListener);
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  t.after(async () => new Promise<void>((r, j) => server.close((e) => (e ? j(e) : r()))));

  // ── /ar/our-work/:slug ────────────────────────────────────────────────────

  await t.test("GET /ar/our-work/<arabic-only-slug> → 200, index/follow", async () => {
    const r = await get(server, `/ar/our-work/${ARABIC_ONLY.slug}`);
    assert.equal(r.status, 200, `Expected 200, got ${r.status}`);
    assert.ok(r.body.includes("index, follow"), "Must have index/follow robots");
    assert.ok(!r.body.includes("noindex"), "Must NOT have noindex");
  });

  await t.test("GET /ar/our-work/<arabic-only-slug> → has Arabic lang + canonical", async () => {
    const r = await get(server, `/ar/our-work/${ARABIC_ONLY.slug}`);
    assert.ok(r.body.includes('lang="ar"'), "Must have lang=ar");
    assert.ok(r.body.includes(`/ar/our-work/${ARABIC_ONLY.slug}`), "Must have ar canonical");
  });

  await t.test("GET /ar/our-work/<arabic-only-slug> → CreativeWork + BreadcrumbList + __SSR_WORK__", async () => {
    const r = await get(server, `/ar/our-work/${ARABIC_ONLY.slug}`);
    assert.ok(r.body.includes('"CreativeWork"'), "CreativeWork JSON-LD missing");
    assert.ok(r.body.includes('"BreadcrumbList"'), "BreadcrumbList JSON-LD missing");
    assert.ok(r.body.includes("window.__SSR_WORK__="), "__SSR_WORK__ bootstrap missing");
  });

  await t.test("GET /ar/our-work/missing-slug → 404 noindex", async () => {
    const r = await get(server, "/ar/our-work/missing-slug");
    assert.equal(r.status, 404, `Expected 404, got ${r.status}`);
    assert.ok(r.body.includes("noindex"), "404 must contain noindex");
  });

  // ── /our-work/:slug ───────────────────────────────────────────────────────

  await t.test(
    "GET /our-work/<arabic-only-slug> → 301 redirect to /ar/our-work/",
    async () => {
      const r = await get(server, `/our-work/${ARABIC_ONLY.slug}`);
      assert.equal(r.status, 301, `Expected 301, got ${r.status}`);
      assert.ok(
        String(r.location ?? "").includes("/ar/our-work/"),
        `Expected redirect to /ar/our-work/, got: ${r.location}`,
      );
    },
  );

  await t.test("GET /our-work/missing-slug → 404 noindex", async () => {
    const r = await get(server, "/our-work/missing-slug");
    assert.equal(r.status, 404, `Expected 404, got ${r.status}`);
    assert.ok(r.body.includes("noindex"), "404 must contain noindex");
  });

  await t.test("GET /ar/our-work/<bilingual-slug> → 200 Arabic HTML", async () => {
    const r = await get(server, `/ar/our-work/${BILINGUAL.slug}`);
    assert.equal(r.status, 200, `Expected 200, got ${r.status}`);
    assert.ok(r.body.includes('lang="ar"'), "Must have lang=ar");
  });

  await t.test("GET /our-work/<bilingual-slug> → 200 English HTML", async () => {
    const r = await get(server, `/our-work/${BILINGUAL.slug}`);
    assert.equal(r.status, 200, `Expected 200, got ${r.status}`);
    assert.ok(r.body.includes('lang="en"'), "Must have lang=en");
  });
});
