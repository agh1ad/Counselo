import assert from "node:assert/strict";
import test from "node:test";
import { once } from "node:events";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import express from "express";
import { createPublicDocumentsRouter } from "../../api-server/src/lib/public-work-documents.js";
import { app, buildBlogHtmlFromTemplate, buildWorkHtmlFromTemplate } from "./ssr-server";

const template = '<html><head><!--app-head--></head><body><div id="root"></div></body></html>';
const payload = 'Legal text </ScRiPt ><img src=x onerror=alert(1)> <!-- <script> \u2028 \u2029';

test("actual standalone server streams canonical documents through the API on a same-origin path router", async () => {
  const bytes = Buffer.from("%PDF-1.7\nSynthetic path-routing fixture\n%%EOF");
  const record = { slug: "routed-work", published: true, updatedAt: "2026-11-13T00:00:00.000Z", fileMimeType: "application/pdf", fileSize: bytes.length, fileData: bytes.toString("base64") };
  let published = true;
  let unavailable = false;
  let htmlInsteadOfFile = false;
  const apiPaths: string[] = [];
  const ranges: Array<string | undefined> = [];
  const api = express();
  api.use("/api", (req, res, next) => {
    apiPaths.push(req.originalUrl);
    ranges.push(req.get("Range"));
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    if (unavailable) { res.status(503).send("Snapshot unavailable"); return; }
    if (htmlInsteadOfFile) { res.type("html").send("<html><script>unexpectedApp()</script></html>"); return; }
    next();
  });
  const text = { slug: record.slug, sourceSHA256: createHash("sha256").update(bytes).digest("hex"), sourceUpdatedAt: record.updatedAt, fileSize: bytes.length, language: "ar" as const, text: "النص القانوني التجريبي\n", checkedPageCount: 1 };
  api.use("/api/documents", createPublicDocumentsRouter(async slug => published && slug === record.slug ? record : undefined, [text]));
  const gateway = express();
  gateway.use(api);
  const server = gateway.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address(); assert.ok(address && typeof address !== "string");
  const origin = `http://127.0.0.1:${address.port}`;
  const previous = process.env.API_ORIGIN;
  try {
    // Both artifacts share one public origin. Only /api routes belong to the
    // API artifact; canonical documents arrive at the real standalone app.
    process.env.API_ORIGIN = origin;
    const { app: standalone } = await import(new URL("./ssr-server.ts?document-path-routing", import.meta.url).href);
    gateway.use(standalone);
    for (const method of ["GET", "HEAD"]) {
      const response = await fetch(`${origin}/documents/routed-work.pdf`, { method });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("content-type"), "application/pdf");
      assert.equal(response.headers.get("content-length"), String(bytes.length));
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal(response.headers.get("x-robots-tag"), null);
      assert.equal(response.headers.get("x-frame-options"), null);
      assert.equal(response.headers.get("content-security-policy"), "frame-ancestors 'self'");
      assert.equal(response.headers.get("link"), '<https://counselo-legal.com/documents/routed-work.pdf>; rel="canonical"');
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), method === "GET" ? bytes : Buffer.alloc(0));
    }
    const download = await fetch(`${origin}/documents/routed-work.pdf?download=1`);
    assert.match(download.headers.get("content-disposition")!, /^attachment;/);
    await download.arrayBuffer();
    const ranged = await fetch(`${origin}/documents/routed-work.pdf`, { headers: { Range: "bytes=0-15" } });
    assert.equal(ranged.status, 200, "an origin without range support may return the complete PDF");
    assert.deepEqual(Buffer.from(await ranged.arrayBuffer()), bytes);
    assert.equal(ranges.at(-1), "bytes=0-15");
    const readable = await fetch(`${origin}/documents/routed-work.txt`);
    assert.equal(await readable.text(), text.text);
    assert.equal(readable.headers.get("content-language"), "ar");
    published = false;
    const missing = await fetch(`${origin}/documents/routed-work.pdf`);
    assert.equal(missing.status, 404);
    assert.match(missing.headers.get("x-robots-tag")!, /noindex/);
    assert.doesNotMatch(await missing.text(), /<html|<script/i);
    unavailable = true;
    const outage = await fetch(`${origin}/documents/routed-work.pdf`);
    assert.equal(outage.status, 503);
    assert.equal(outage.headers.get("retry-after"), "60");
    assert.doesNotMatch(await outage.text(), /<html|<script/i);
    unavailable = false;
    htmlInsteadOfFile = true;
    const wrongType = await fetch(`${origin}/documents/routed-work.pdf`);
    assert.equal(wrongType.status, 502);
    assert.match(wrongType.headers.get("x-robots-tag")!, /noindex/);
    assert.doesNotMatch(await wrongType.text(), /<html|<script/i);
    assert.equal(apiPaths.length, 8, "one API request per document request; no same-origin recursion");
    assert.ok(apiPaths.every(path => path.startsWith("/api/documents/")));
    assert.ok(apiPaths.includes("/api/documents/routed-work.pdf?download=1"));
  } finally {
    if (previous === undefined) delete process.env.API_ORIGIN; else process.env.API_ORIGIN = previous;
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});

test("the production API artifact owns canonical document paths", () => {
  const config = readFileSync(new URL("../../api-server/.replit-artifact/artifact.toml", import.meta.url), "utf8");
  assert.match(config, /paths\s*=\s*\[[^\]]*"\/documents"/);
});

test("unknown and wrong-region services return nonindexable HTTP 404 without fetching CMS data", async () => {
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const origin = `http://127.0.0.1:${address.port}`;
  const originalFetch = globalThis.fetch;
  const unexpectedRequests: string[] = [];
  globalThis.fetch = ((input, init) => {
    const url = input instanceof Request ? input.url : String(input);
    if (!url.startsWith(`${origin}/`)) {
      unexpectedRequests.push(url);
      throw new Error("Unknown services must not request upstream data");
    }
    return originalFetch(input, init);
  }) as typeof fetch;
  try {
    for (const path of [
      "/sa/services/quality-audit-missing-service",
      "/sa/ar/services/quality-audit-missing-service",
      "/syr/services/quality-audit-missing-service",
      "/syr/ar/services/quality-audit-missing-service",
      "/sa/services/civil-procedure",
      "/sa/ar/services/civil-procedure",
    ]) {
      for (const method of ["GET", "HEAD"]) {
        const response = await fetch(`${origin}${path}`, { method });
        assert.equal(response.status, 404, `${method} ${path}`);
        assert.equal(response.headers.get("cache-control"), "no-store");
        if (method === "GET") assert.match(await response.text(), /name="robots" content="noindex, nofollow"/);
      }
    }
    assert.deepEqual(unexpectedRequests, []);
  } finally {
    globalThis.fetch = originalFetch;
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});

function scripts(html: string) {
  assert.doesNotMatch(html, /<img src=x/);
  const blocks = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(match => match[1]);
  for (const block of blocks) assert.doesNotMatch(block, /[<\u2028\u2029]/);
  return blocks;
}

test("fallback blog markup keeps hostile editorial strings inside JSON and hydration data", () => {
  const html = buildBlogHtmlFromTemplate(template, "script-integrity", {
    id: 1, slug: "script-integrity", date: "2026-11-12", titleEn: payload, titleAr: "عنوان",
    excerptEn: payload, excerptAr: "ملخص", bodyEn: payload, bodyAr: "نص",
    categoryEn: "Legal analysis", categoryAr: "تحليل قانوني", readTime: 2, published: true,
  });
  const blocks = scripts(html);
  assert.equal(blocks.length, 3);
  assert.equal(JSON.parse(blocks[0]).headline, payload);
  assert.equal(JSON.parse(blocks[1]).itemListElement[2].name, payload);
  const post = JSON.parse(blocks[2].replace(/^window\.__SSR_POST__=/, "").replace(/;$/, ""));
  assert.equal(post.bodyEn, payload);
});

test("fallback work markup safely serializes Arabic and English editorial content", () => {
  for (const language of ["en", "ar"] as const) {
    const html = buildWorkHtmlFromTemplate(template, {
      slug: "script-integrity", date: "2026-11-12", titleEn: payload, titleAr: payload,
      summaryEn: payload, summaryAr: payload, workTypeEn: "Document review", workTypeAr: "مراجعة مستند",
      jurisdictionEn: "Saudi Arabia", jurisdictionAr: "السعودية", seoTitleEn: payload, seoTitleAr: payload,
      seoDescriptionEn: payload, seoDescriptionAr: payload, fileMimeType: "application/pdf", fileSize: 1, published: true,
    }, language);
    const blocks = scripts(html);
    assert.equal(blocks.length, 3);
    // Metadata titles normalize trailing Unicode whitespace; hydration preserves the original content.
    assert.equal(JSON.parse(blocks[0]).name, payload.trim());
    assert.equal(JSON.parse(blocks[1]).itemListElement[2].name, payload.trim());
    const work = JSON.parse(blocks[2].replace(/^window\.__SSR_WORK__=/, "").replace(/;$/, ""));
    assert.equal(work.titleEn, payload);
    assert.equal(work.titleAr, payload);
  }
});

const workSample: Parameters<typeof buildWorkHtmlFromTemplate>[1] = {
  slug: "fallback-work-metadata", date: "2026-11-12", titleEn: "English case study", titleAr: "دراسة حالة عربية",
  summaryEn: "A published example of document review and legal analysis.", summaryAr: "نموذج منشور لمراجعة المستندات والتحليل القانوني.",
  workTypeEn: "Document review", workTypeAr: "مراجعة مستند", jurisdictionEn: "Saudi Arabia", jurisdictionAr: "السعودية",
  seoTitleEn: "English case study", seoTitleAr: "دراسة حالة عربية", seoDescriptionEn: "", seoDescriptionAr: "",
  fileMimeType: "application/pdf", fileSize: 123, published: true,
};

function metadata(html: string, name: string) {
  return html.match(new RegExp(`<(?:meta)\\b[^>]*(?:name|property)="${name}"[^>]*content="([^"]*)"`))?.[1];
}

test("standalone work metadata and entity relationships remain consistent in both languages", () => {
  for (const language of ["en", "ar"] as const) {
    const ar = language === "ar";
    const html = buildWorkHtmlFromTemplate(template, workSample, language);
    const title = ar ? workSample.titleAr : workSample.titleEn;
    const canonical = `https://counselo-legal.com${ar ? "/ar" : ""}/our-work/${workSample.slug}`;
    const [work, breadcrumbs] = scripts(html).slice(0, 2).map(block => JSON.parse(block));
    assert.equal(metadata(html, "og:title"), title);
    assert.equal(metadata(html, "twitter:title"), title);
    assert.equal(metadata(html, "twitter:description"), metadata(html, "description"));
    assert.equal(metadata(html, "og:description"), metadata(html, "description"));
    assert.equal(metadata(html, "twitter:card"), "summary_large_image");
    assert.equal(metadata(html, "twitter:image"), "https://counselo-legal.com/og-image.png");
    assert.equal(metadata(html, "og:image"), metadata(html, "twitter:image"));
    assert.equal(metadata(html, "og:image:alt"), title);
    assert.equal(metadata(html, "twitter:image:alt"), title);
    assert.equal(metadata(html, "og:locale"), ar ? "ar_SA" : "en_US");
    assert.equal(work["@id"], `${canonical}#work-sample`);
    assert.equal(work.mainEntityOfPage["@id"], `${canonical}#webpage`);
    assert.equal(work.isPartOf["@id"], `https://counselo-legal.com${ar ? "/ar" : ""}/our-work#webpage`);
    assert.equal(work.publisher["@id"], "https://counselo-legal.com/#organization");
    assert.equal(work.headline, title);
    assert.equal(work.contentLocation, ar ? workSample.jurisdictionAr : workSample.jurisdictionEn);
    assert.deepEqual(work.genre, ["Legal case study", ar ? workSample.workTypeAr : workSample.workTypeEn]);
    assert.equal(work.encoding.contentUrl, `https://counselo-legal.com/documents/${workSample.slug}.pdf`);
    assert.equal(breadcrumbs.itemListElement[0].item, `https://counselo-legal.com${ar ? "/ar" : "/"}`);
    assert.equal(breadcrumbs.itemListElement[2].item, canonical);
  }
});

test("standalone work schema only advertises an existing document and preserves creator attribution", () => {
  for (const language of ["en", "ar"] as const) {
    const html = buildWorkHtmlFromTemplate(template, { ...workSample, fileSize: 0, hasFile: false }, language);
    const work = JSON.parse(scripts(html)[0]);
    assert.equal(work.encoding, undefined);
    assert.equal(work.creator["@id"], "https://counselo-legal.com/#organization");
    const partnerHtml = buildWorkHtmlFromTemplate(template, {
      ...workSample, slug: "ray-fy-mshrwa-qanwn-alwsath-alswry-maaljh-10-thghrat",
    }, language);
    const partner = JSON.parse(scripts(partnerHtml)[0]);
    assert.equal(partner.creator.name, "Baghdadi Law");
    assert.notEqual(partner.creator["@id"], partner.publisher["@id"]);
  }
});
