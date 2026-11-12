import assert from "node:assert/strict";
import test from "node:test";
import { buildBlogHtmlFromTemplate, buildWorkHtmlFromTemplate } from "./ssr-server";

const template = '<html><head><!--app-head--></head><body><div id="root"></div></body></html>';
const payload = 'Legal text </ScRiPt ><img src=x onerror=alert(1)> <!-- <script> \u2028 \u2029';

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
    assert.equal(JSON.parse(blocks[0]).name, payload);
    assert.equal(JSON.parse(blocks[1]).itemListElement[2].name, payload);
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
