import assert from "node:assert/strict";
import test from "node:test";
import { parsePageAudit, parseSitemapXml } from "../scripts/sitemap-live-validate";

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
