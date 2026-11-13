import assert from "node:assert/strict";
import test from "node:test";
import { portfolioCapabilities } from "@workspace/api-zod";

process.env.DATABASE_URL ??= "postgresql://test:test@127.0.0.1:5432/counselo_renderer_test";
const { buildDynamicWorkHtml, buildDynamicWorkIndex } = await import("../og-pages.js");
const shell = '<html><head><!--app-head--></head><body><div id="root"></div></body></html>';
const schemas = (html: string) => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const sample = {
  published: true,
  slug: "render-test", titleEn: "Work example", titleAr: "نموذج عمل",
  summaryEn: "Public summary", summaryAr: "ملخص عام",
  seoTitleEn: "", seoTitleAr: "", seoDescriptionEn: "", seoDescriptionAr: "",
  challengeEn: "A <disputed> obligation", challengeAr: "التزام محل نزاع",
  approachEn: "Review of the documents", approachAr: "مراجعة المستندات",
  outcomeEn: "A written assessment", outcomeAr: "تقييم مكتوب",
  workTypeEn: "Review", workTypeAr: "مراجعة", jurisdictionEn: "Syria", jurisdictionAr: "سوريا",
  date: "2026-01-01", fileSize: 0, fileMimeType: "application/pdf",
} as Parameters<typeof buildDynamicWorkHtml>[0];

test("both work renderers provide complete matching social previews before JavaScript", () => {
  for (const language of ["en", "ar"] as const) {
    for (const html of [buildDynamicWorkHtml(sample, language, shell), buildDynamicWorkIndex([sample], language, shell)]) {
      const meta = new Map([...html.matchAll(/<meta (?:name|property)="([^"]+)" content="([^"]*)"/g)].map(match => [match[1], match[2]]));
      const title = html.match(/<title>([^]*?)<\/title>/)![1];
      for (const prefix of ["og", "twitter"]) {
        assert.equal(meta.get(`${prefix}:title`), title);
        assert.equal(meta.get(`${prefix}:description`), meta.get("description"));
        assert.equal(meta.get(`${prefix}:image`), "https://counselo-legal.com/og-image.png");
        assert.equal(meta.get(`${prefix}:image:alt`), title);
      }
      assert.equal(meta.get("twitter:card"), "summary_large_image");
    }
  }
});

test("production detail bootstrap exposes file availability before the API refresh", () => {
  for (const language of ["en", "ar"] as const) {
    for (const fileSize of [0, 123]) {
      const html = buildDynamicWorkHtml({ ...sample, fileSize }, language, shell);
      const bootstrap = JSON.parse(html.match(/window\.__SSR_WORK__=([^]*?);<\/script>/)![1]);
      assert.equal(bootstrap.hasFile, fileSize > 0);
      assert.equal(bootstrap.fileSize, fileSize);
      assert.equal(bootstrap.slug, sample.slug);
      assert.equal("fileData" in bootstrap, false);
    }
  }
});

test("detail and listing HTML never disclose internal testimonial references", () => {
  const withTestimonial = { ...sample, testimonials: [{ text: "Approved public statement", jurisdiction: "Syria", service: "Contracts", sourceType: "Written feedback", verified: true, consentVerified: true, anonymized: true, internalReference: "private-client-evidence-reference" }] };
  for (const language of ["en", "ar"] as const) {
    for (const html of [buildDynamicWorkHtml(withTestimonial, language, shell), buildDynamicWorkIndex([withTestimonial], language, shell)]) {
      assert.ok(html.includes("Approved public statement"));
      assert.ok(!html.includes("private-client-evidence-reference"));
      assert.ok(!html.includes("internalReference"));
    }
  }
});

test("unapproved testimonial text is excluded from every public work bootstrap", () => {
  const pending = { ...sample, testimonials: [{ text: "Not approved for public disclosure", jurisdiction: "Syria", service: "Contracts", sourceType: "Written feedback", verified: true, consentVerified: false, anonymized: true, internalReference: "private-pending-reference" }] };
  for (const language of ["en", "ar"] as const) {
    for (const html of [buildDynamicWorkHtml(pending, language, shell), buildDynamicWorkIndex([pending], language, shell)]) {
      assert.ok(!html.includes("Not approved for public disclosure"));
      assert.ok(!html.includes("private-pending-reference"));
    }
  }
});

test("production work HTML includes all published narrative sections before JavaScript", () => {
  for (const lang of ["en", "ar"] as const) {
    const html = buildDynamicWorkHtml(sample, lang);
    const body = html.split("<body>")[1];
    const ar = lang === "ar";
    for (const text of ar ? ["التزام محل نزاع", "مراجعة المستندات", "تقييم مكتوب", "سوريا"] : ["A &lt;disputed&gt; obligation", "Review of the documents", "A written assessment", "Syria"]) assert.ok(body.includes(text), text);
    assert.ok(body.includes(ar ? "لا تمثل النتائج السابقة ضماناً" : "do not guarantee"));
    assert.ok(!body.includes("/api/work/render-test/file"));
    assert.ok(!html.includes('"encoding":'));
  }
});

test("production portfolio HTML exposes actual library facts and sourced capabilities in both languages", () => {
  const featured = portfolioCapabilities.map(item => ({ ...sample, slug: item.slug, fileSize: 123 }));
  const inventory = [...featured, ...Array.from({ length: 56 }, (_, index) => ({ ...sample, slug: `published-${index}` }))];
  for (const language of ["en", "ar"] as const) {
    const ar = language === "ar";
    const html = buildDynamicWorkIndex(inventory, language, shell);
    const body = html.split("<body>")[1];
    assert.ok(body.includes(ar ? "التمثيل أمام المحاكم" : "representation before courts"));
    assert.ok(body.includes(ar ? "المحامين المحليين المرخصين" : "licensed local lawyers"));
    assert.ok(body.includes(ar ? "دراسات وملفات منشورة مع بيان أصحابها" : "Published studies and documents with author credits"));
    assert.ok(body.includes(`>${(60).toLocaleString(language)}</a></dd>`));
    assert.ok(body.includes(`<dd>${(3).toLocaleString(language)}</dd>`));
    assert.ok(body.includes(`<dd>${(2).toLocaleString(language)}</dd>`));
    assert.ok(body.includes(ar ? "السعودية · سوريا · الإمارات" : "Saudi Arabia · Syria · United Arab Emirates"));
    assert.ok(body.includes(ar ? "العربية · الإنجليزية" : "Arabic · English"));
    for (const item of portfolioCapabilities) {
      const content = item[language];
      const escaped = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
      for (const value of [content.title, content.capability, content.role, content.documents]) assert.ok(body.includes(escaped(value)), value);
      assert.ok(body.includes(`href="${ar ? "/ar" : ""}/our-work/${item.slug}"`));
      assert.ok(body.includes(`href="/documents/${item.slug}.pdf"`));
    }
    assert.doesNotMatch(body, /20,000|independent review|success rate/);
  }
});

test("portfolio capability and document links follow current publication, language and file availability", () => {
  for (const language of ["en", "ar"] as const) {
    const [available, unpublished, untranslated, removed] = portfolioCapabilities;
    const html = buildDynamicWorkIndex([
      { ...sample, slug: available.slug, fileSize: 0 },
      { ...sample, slug: unpublished.slug, published: false, fileSize: 123 },
      { ...sample, slug: untranslated.slug, fileSize: 123, ...(language === "ar" ? { titleAr: "" } : { titleEn: "" }) },
    ], language, shell);
    const body = html.split("<body>")[1];
    assert.ok(body.includes(available[language].title));
    assert.ok(!body.includes(`/documents/${available.slug}.pdf`));
    for (const item of [unpublished, untranslated, removed]) {
      assert.ok(!body.includes(item[language].title));
      assert.ok(!body.includes(`/documents/${item.slug}.pdf`));
    }
    // The public library total includes a published record even when this
    // language's title is not available, matching the React facts component.
    assert.ok(body.includes(`>${(2).toLocaleString(language)}</a></dd>`));
    assert.doesNotMatch(body, /Four files|أربعة ملفات/);
  }
});

test("production work document markup exists only when a public file exists", () => {
  const html = buildDynamicWorkHtml({ ...sample, fileSize: 123 }, "ar");
  assert.ok(html.includes('"encoding":'));
  assert.ok(html.split("<body>")[1].includes("عرض المستند المنقح"));
});

test("unprerendered work retains localized evidence, service and collection relationships", () => {
  for (const language of ["en", "ar"] as const) {
    const ar = language === "ar";
    const html = buildDynamicWorkHtml({ ...sample, relatedServiceSlugs: ["missing-service", "contracts"], fileSize: 123 }, language, shell);
    const work = schemas(html).find(node => node["@type"] === "CreativeWork");
    const canonical = `https://counselo-legal.com${ar ? "/ar" : ""}/our-work/render-test`;
    assert.equal(work["@id"], `${canonical}#work-sample`);
    assert.equal(work.mainEntityOfPage["@id"], `${canonical}#webpage`);
    assert.equal(work.isPartOf["@id"], `https://counselo-legal.com${ar ? "/ar" : ""}/our-work#webpage`);
    assert.equal(work.publisher["@id"], "https://counselo-legal.com/#organization");
    assert.equal(work.about.url, `https://counselo-legal.com/syr${ar ? "/ar" : ""}/services/contracts`);
    assert.equal(work.contentLocation, ar ? "سوريا" : "Syria");
    assert.deepEqual(work.genre, ["Legal case study", ar ? "مراجعة" : "Review"]);
    assert.equal(work.encoding.contentUrl, "https://counselo-legal.com/documents/render-test.pdf");
    assert.ok(html.includes(`href="/syr${ar ? "/ar" : ""}/services/contracts"`));
    assert.ok(html.includes(`href="/syr${ar ? "/ar" : ""}/contact"`));
    assert.doesNotMatch(JSON.stringify(work), /"(?:reviewedBy|aggregateRating|reviewCount|citation)"/);
  }
});

test("work discovery connects its collection, list and work entities without mixing authorship", () => {
  const partner = { ...sample, slug: "ray-fy-mshrwa-qanwn-alwsath-alswry-maaljh-10-thghrat" };
  for (const language of ["en", "ar"] as const) {
    const ar = language === "ar";
    const untranslated = { ...sample, slug: "unavailable-language", ...(ar ? { titleAr: "" } : { titleEn: "" }) };
    const html = buildDynamicWorkIndex([sample, partner, untranslated], language, shell);
    const graph = schemas(html);
    const collection = graph.find(node => node["@type"] === "CollectionPage");
    const list = graph.find(node => node["@type"] === "ItemList");
    const canonical = `https://counselo-legal.com${ar ? "/ar" : ""}/our-work`;
    assert.equal(collection["@id"], `${canonical}#webpage`);
    assert.equal(collection.mainEntity["@id"], list["@id"]);
    assert.equal(list["@id"], `${canonical}#work-list`);
    assert.equal(list.numberOfItems, 2);
    assert.equal(list.itemListElement.length, 2);
    for (const item of list.itemListElement) assert.equal(item.item["@id"], `${item.url}#work-sample`);
    assert.ok(html.includes(ar ? "الجهة صاحبة الدراسة: البغدادي للمحاماة" : "Study by: Baghdadi Law"));
    const work = schemas(buildDynamicWorkHtml(partner, language, shell)).find(node => node["@type"] === "CreativeWork");
    assert.equal(work.creator["@id"], "https://www.baghdadilaw.co/#legalservice");
    assert.equal(work.publisher["@id"], "https://counselo-legal.com/#organization");
  }
});
