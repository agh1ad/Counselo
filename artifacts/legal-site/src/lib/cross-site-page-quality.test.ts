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
  assert.match(template, /legal checks and scoped consultation options/);
  assert.match(template, /data-conversion-position="services-guidance"/);
});

test("vision copy is aspirational without unsupported superlatives", () => {
  const template = readPage("vision.tsx");
  assert.doesNotMatch(template, /most trusted|highest standards/i);
  assert.match(template, /A trusted digital legal reference for the Arab world/);
  assert.match(template, /applicable professional-confidentiality, privacy and data-protection obligations/);
  assert.match(template, /dateModified: "2026-08-18"/);
});

test("global entry pages keep qualified positioning and accessible heading spacing", () => {
  const english = readPage("region-picker.tsx");
  const arabic = readPage("ar-region-picker.tsx");
  const home = readPage("home.tsx");
  assert.doesNotMatch(english, /fast, professional and trusted/i);
  assert.doesNotMatch(arabic, /مستشار قانوني معتمد/);
  assert.match(english, /Online Legal\{" "\}/);
  assert.match(arabic, /استشارة قانونية\{" "\}/);
  assert.match(home, /h\.hero\.h1a\}\{" "\}/);
});

test("evidence and publishing surfaces retain their trust boundaries", () => {
  const blog = readPage("blog-post.tsx");
  const work = readPage("work-sample.tsx");
  const seoHead = readComponent("seo/SEOHead.tsx");
  const library = readPage("legal-library.tsx");
  assert.match(blog, /Report a correction or factual error/);
  assert.match(blog, /does not constitute legal advice/);
  assert.match(work, /past work or outcomes do not guarantee the result of another matter/);
  assert.match(work, /Client names, personal and commercially sensitive data/);
  assert.match(work, /articlePublishedTime=\{sample\.date\}/);
  assert.match(work, /articleModifiedTime=\{sample\.updatedAt \|\| sample\.date\}/);
  assert.match(work, /reviewedBy: \{ "@id": OMAR_AL_BAGHDADI\["@id"\] \}/);
  assert.match(blog, /articleModifiedTime=\{post\.updatedAt \|\| post\.date\}/);
  assert.match(seoHead, /articleModifiedTime \|\| articlePublishedTime/);
  assert.doesNotMatch(library, /<main[\s>]/);
});

test("the floating contact control does not duplicate or obscure primary consultation calls to action", () => {
  const floatingContact = readComponent("layout/whatsapp-float.tsx");
  assert.doesNotMatch(floatingContact, /data-cta="contact"/);
  assert.match(floatingContact, /data-cta="whatsapp"/);
  assert.match(floatingContact, /h-16 w-16/);
});

test("global jurisdiction mentions consistently prioritize Saudi Arabia, then Syria, then the UAE", () => {
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

test("the CounselO brand uses one English capitalization", () => {
  assert.doesNotMatch(readLib("optimized-meta.ts"), /\bCounselo\b/);
});
