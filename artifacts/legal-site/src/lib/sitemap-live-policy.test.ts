import assert from "node:assert/strict";
import test from "node:test";
import { expectedUrls, parsePageAudit, parsePdfAudit, parseSitemapXml } from "../scripts/sitemap-live-validate";

test("parses sitemap indexes, URL entries, lastmod, and hreflang", () => {
  const document = parseSitemapXml(`
    <sitemapindex>
      <sitemap><loc>https://counselo-legal.com/sitemap-core.xml</loc></sitemap>
    </sitemapindex>
  `);
  assert.equal(document.kind, "index");
  assert.deepEqual(document.children, ["https://counselo-legal.com/sitemap-core.xml"]);

  const urlset = parseSitemapXml(`
    <urlset>
      <url>
        <loc>https://counselo-legal.com/uae</loc>
        <lastmod>2026-08-08</lastmod>
        <xhtml:link rel="alternate" hreflang="en-AE" href="https://counselo-legal.com/uae"/>
      </url>
    </urlset>
  `);
  assert.equal(urlset.kind, "urlset");
  assert.equal(urlset.entries[0].lastmod, "2026-08-08");
  assert.equal(urlset.entries[0].alternates["en-AE"], "https://counselo-legal.com/uae");
});

test("PDF sitemap audits use HTTP canonical and robots headers and verify the response body", () => {
  const url = "https://counselo-legal.com/documents/published-work.pdf";
  const bytes = new TextEncoder().encode("%PDF-1.7\n%%EOF\n");
  const headers = new Headers({ "Content-Type": "application/pdf", "Content-Length": String(bytes.length), Link: `<${url}>; rel="canonical"` });
  const pdf = parsePdfAudit(200, false, bytes, headers);
  assert.equal(pdf.canonical, url);
  assert.equal(pdf.validPdf, true);
  assert.equal(pdf.indexable, true);
  assert.deepEqual(pdf.alternates, {});
  headers.set("X-Robots-Tag", "noindex, nofollow");
  assert.equal(parsePdfAudit(200, false, bytes, headers).indexable, false);
  headers.set("Content-Length", "999");
  assert.equal(parsePdfAudit(200, false, bytes, headers).validPdf, false);
  assert.equal(parsePdfAudit(200, false, new TextEncoder().encode("<html>App shell</html>"), headers).validPdf, false);
});

test("expected discovery URLs include only published PDF documents without adding HTML language variants", () => {
  const sample = { slug: "published-work", titleEn: "Work", titleAr: "عمل", published: true, fileSize: 123, fileMimeType: "application/pdf" };
  const urls = expectedUrls([], [sample, { ...sample, slug: "draft-work", published: false }, { ...sample, slug: "no-file", fileSize: 0 }, { ...sample, slug: "non-pdf", fileMimeType: "text/plain" }]);
  assert.ok(urls.has("https://counselo-legal.com/documents/published-work.pdf"));
  assert.ok(urls.has("https://counselo-legal.com/our-work/published-work"));
  assert.ok(urls.has("https://counselo-legal.com/ar/our-work/published-work"));
  assert.equal([...urls].filter(url => url.includes("/documents/")).length, 1);
  assert.ok(![...urls].some(url => url.includes("draft-work")));
});

test("parses canonical, indexability, dateModified, and reciprocal targets", () => {
  const page = parsePageAudit(200, false, `
    <html><head>
      <link rel="canonical" href="https://counselo-legal.com/uae" />
      <link rel="alternate" hreflang="en-AE" href="https://counselo-legal.com/uae" />
      <script type="application/ld+json">{"dateModified":"2026-08-08T00:00:00.000Z"}</script>
    </head></html>
  `);
  assert.equal(page.status, 200);
  assert.equal(page.redirected, false);
  assert.equal(page.canonical, "https://counselo-legal.com/uae");
  assert.equal(page.indexable, true);
  assert.equal(page.dateModified, "2026-08-08T00:00:00.000Z");
  assert.equal(page.alternates["en-AE"], "https://counselo-legal.com/uae");

  assert.equal(parsePageAudit(200, false, '<meta name="robots" content="noindex, nofollow">').indexable, false);
  assert.equal(parsePageAudit(301, true, "").redirected, true);
});
