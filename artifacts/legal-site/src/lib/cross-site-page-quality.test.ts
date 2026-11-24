import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const readPage = (name: string) => readFileSync(resolve(import.meta.dirname, `../pages/${name}`), "utf8");
const readComponent = (name: string) => readFileSync(resolve(import.meta.dirname, `../components/${name}`), "utf8");
const readPublic = (name: string) => readFileSync(resolve(import.meta.dirname, `../../public/${name}`), "utf8");
const readLib = (name: string) => readFileSync(resolve(import.meta.dirname, name), "utf8");

test("service directories use scoped descriptions instead of legacy promotional narratives", () => {
  const template = readPage("services.tsx");
  assert.doesNotMatch(template, /\{service\.longDesc\}/);
  assert.match(template, /serviceExperience\(region, service.id/);
  assert.match(template, /data-conversion-position="services-final"/);
  assert.doesNotMatch(template, /id="services-opening-cta"|id="services-framework"/);
});

test("global entry pages keep qualified positioning and accessible heading spacing", () => {
  const copy = readComponent("home/homepage-content.ts");
  const presentation = readComponent("home/homepage-presentation.ts");
  const template = readComponent("home/global-homepage.tsx");
  const home = readPage("home.tsx");
  assert.doesNotMatch(copy, /fast, professional and trusted|مستشار قانوني معتمد/i);
  assert.match(presentation, /fixed consultation fees by country and practice area/);
  assert.match(presentation, /رسوم الاستشارات الثابتة حسب الدولة والمجال القانوني/);
  assert.match(template, /href="#services">\{c\.pricingLink\}/);
  assert.match(copy, /aim to respond professionally within 24 hours after receiving the information needed/);
  assert.match(copy, /نسعى للرد المهني خلال 24 ساعة من استلام المعلومات اللازمة/);
  assert.match(template, /<h1 id="home-title">\s*\{c\.h1\}\s*<\/h1>/);
  assert.match(home, /\{saudiCopy\.title\}/);
});

test("evidence and publishing surfaces retain their trust boundaries", () => {
  const blog = readPage("blog-post.tsx");
  const work = readPage("work-sample.tsx");
  const seoHead = readComponent("seo/SEOHead.tsx");
  const library = readPage("legal-library.tsx");
  assert.match(blog, /Report a correction or factual error/);
  assert.match(blog, /does not constitute legal advice/);
  assert.match(work, /WORK_PUBLICATION_COPY\[lang\]/);
  assert.match(work, /ui\.privacyText/);
  assert.match(work, /ui\.publishedBy/);
  assert.match(work, /ui\.preparedBy/);
  assert.doesNotMatch(work, /Details may be modified|professional experience only/);
  assert.match(work, /articlePublishedTime=\{sample\.date\}/);
  assert.match(work, /articleModifiedTime=\{modifiedAt\}/);
  assert.match(work, /workModifiedAt\(sample\.slug, sample\.updatedAt, sample\.date\)/);
  assert.doesNotMatch(work, /reviewedBy:|author:|citation: legalSources/);
  assert.match(blog, /articleModifiedTime=\{editorialUpdatedAt \?\? post\.updatedAt \?\? post\.date\}/);
  assert.match(seoHead, /articleModifiedTime \|\| articlePublishedTime/);
  assert.doesNotMatch(library, /<main[\s>]/);
});

test("the floating contact control does not duplicate or obscure primary consultation calls to action", () => {
  const floatingContact = readComponent("layout/whatsapp-float.tsx");
  const floatingContactStyles = readFileSync(resolve(import.meta.dirname, "../components/layout/whatsapp-float.css"), "utf8");
  assert.doesNotMatch(floatingContact, /data-cta="contact"/);
  assert.match(floatingContact, /data-cta="whatsapp"/);
  assert.match(floatingContact, /966594850247/);
  assert.match(floatingContact, /PROMPT_DELAY_MS = 4000/);
  assert.match(floatingContact, /sessionStorage/);
  assert.match(floatingContact, /Need legal advice\?/);
  assert.match(floatingContact, /Start your consultation on WhatsApp/);
  assert.match(floatingContact, /counselo-wa-widget--rtl/);
  assert.match(floatingContact, /data-testid="whatsapp-floating-button"/);
  assert.match(floatingContact, /data-testid="whatsapp-prompt-link"/);
  assert.match(floatingContactStyles, /animation: counselo-wa-arrival-pulse 850ms ease-out 3/);
  assert.match(floatingContactStyles, /prefers-reduced-motion: reduce/);
  assert.match(floatingContactStyles, /counselo-wa-widget--rtl \{\s*right: auto;\s*left:/);
  assert.match(floatingContactStyles, /calc\(100vw - 24px\)/);
});

test("global jurisdiction mentions consistently prioritize Saudi Arabia, Syria, then the UAE", () => {
  const globalCopy = [
    readPage("region-picker.tsx"),
    readPage("ar-region-picker.tsx"),
    readPage("legal-library.tsx"),
    readPage("blog.tsx"),
    readComponent("layout/footer.tsx"),
    readPublic("llms.txt"),
    readPublic("feed.xml"),
  ].join("\n");

  assert.match(globalCopy, /Saudi Arabia, Syria (?:and |& )(?:the )?UAE|Saudi Arabia · Syria · UAE/);
  assert.match(globalCopy, /السعودية وسوريا والإمارات|السعودية · سوريا · الإمارات/);
  assert.doesNotMatch(globalCopy, /UAE, Saudi(?: Arabia)? (?:and|&) Syria|UAE · Saudi Arabia · Syria/);
  assert.doesNotMatch(globalCopy, /الإمارات والسعودية وسوريا|الإمارات · السعودية · سوريا/);
});

test("the CounselO Legal brand uses one English capitalization", () => {
  assert.doesNotMatch(readLib("optimized-meta.ts"), /\bCounselo\b/);
});
