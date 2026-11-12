import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { once } from "node:events";
import test from "node:test";
import express from "express";
import { publicWorkDocumentPath, publicWorkDocumentTextPath, workAttachmentPath } from "@workspace/api-zod";
import { createPublicDocumentsRouter, createWorkAttachmentHandler } from "./public-work-documents.js";
import type { PublicWorkDocumentText } from "./public-work-document-texts.js";

const data = Buffer.from("%PDF-1.4\nSynthetic acceptance fixture only\n%%EOF");
const sample = {
  slug: "published-work", published: true, updatedAt: "2026-09-07T00:00:00.000Z",
  fileMimeType: "application/pdf", fileSize: data.length,
  fileData: data.toString("base64"), fileName: "Original document.pdf",
};

async function withServer(app: express.Express, run: (base: string) => Promise<void>) {
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address() as { port: number };
  try { await run(`http://127.0.0.1:${address.port}`); }
  finally { await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve())); }
}

test("published PDFs are crawlable through GET, HEAD and download without a separate approval registry", async () => {
  const app = express();
  app.use((_req, res, next) => { res.setHeader("X-Frame-Options", "DENY"); next(); });
  app.use("/documents", createPublicDocumentsRouter(async slug => slug === sample.slug ? sample : undefined));
  await withServer(app, async base => {
    for (const method of ["GET", "HEAD"]) {
      const response = await fetch(`${base}/documents/published-work.pdf`, { method });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("x-robots-tag"), null);
      assert.equal(response.headers.get("content-type"), "application/pdf");
      assert.equal(response.headers.get("content-length"), String(data.length));
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal(response.headers.get("x-frame-options"), null);
      assert.equal(response.headers.get("x-content-type-options"), "nosniff");
      assert.equal(response.headers.get("content-disposition"), 'inline; filename="published-work.pdf"');
      assert.equal(response.headers.get("link"), '<https://counselo-legal.com/documents/published-work.pdf>; rel="canonical"');
      assert.equal(await response.text(), method === "GET" ? data.toString() : "");
    }
    const download = await fetch(`${base}/documents/published-work.pdf?download=1`);
    assert.match(download.headers.get("content-disposition")!, /^attachment;/);
    assert.equal(download.headers.get("x-robots-tag"), null);
    assert.equal(await download.text(), data.toString());
  });
});

test("document routes recheck publication and bytes, reject unavailable files and never fall through to the SPA", async () => {
  let record: typeof sample | undefined = { ...sample };
  const app = express();
  app.use("/documents", createPublicDocumentsRouter(async slug => slug === sample.slug ? record : undefined));
  app.use((_req, res) => { res.status(200).send("SPA shell must not serve a missing document"); });
  await withServer(app, async base => {
    const valid = await fetch(`${base}/documents/published-work.pdf`);
    assert.equal(valid.status, 200);
    await valid.arrayBuffer();
    const invalidBytes = Buffer.from("<html>Not a PDF document</html>");
    for (const change of [undefined, { ...sample, published: false },
      { ...sample, fileMimeType: "text/html" }, { ...sample, fileData: "" },
      { ...sample, fileSize: 0 }, { ...sample, fileSize: sample.fileSize + 1 },
      { ...sample, fileSize: invalidBytes.length, fileData: invalidBytes.toString("base64") },
      { ...sample, slug: "another-record" },
    ]) {
      record = change;
      for (const method of ["GET", "HEAD"]) {
        const response = await fetch(`${base}/documents/published-work.pdf`, { method });
        assert.equal(response.status, 404);
        assert.match(response.headers.get("x-robots-tag")!, /noindex/);
        assert.equal(response.headers.get("cache-control"), "no-store");
        assert.doesNotMatch(await response.text(), /SPA shell/);
      }
    }
    record = { ...sample };
    for (const path of ["/documents/unknown.pdf", "/documents/", "/documents/a/b.pdf", "/documents/published-work.txt", "/documents/Published-work.pdf"]) {
      const response = await fetch(base + path);
      assert.equal(response.status, 404);
      assert.match(response.headers.get("x-robots-tag")!, /noindex/);
      assert.doesNotMatch(await response.text(), /SPA shell/);
    }
    const replacement = Buffer.from("%PDF-1.7\nA replacement published document\n%%EOF");
    record = { ...sample, updatedAt: "2026-11-13T00:00:00.000Z", fileData: replacement.toString("base64"), fileSize: replacement.length };
    const updated = await fetch(`${base}/documents/published-work.pdf`);
    assert.equal(updated.status, 200);
    assert.equal(await updated.text(), replacement.toString());
  });
});

test("legacy PDF URLs redirect to the canonical document and preserve downloads, while non-PDF files keep their behavior", async () => {
  let record: typeof sample | undefined = { ...sample };
  const app = express();
  app.use("/api", (_req, res, next) => { res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive"); next(); });
  app.get("/api/work/:slug/file", createWorkAttachmentHandler(async slug => slug === sample.slug ? record : undefined));
  await withServer(app, async base => {
    for (const method of ["GET", "HEAD"]) {
      for (const download of ["", "?download=1"]) {
        const response = await fetch(`${base}/api/work/published-work/file${download}`, { method, redirect: "manual" });
        assert.equal(response.status, 301);
        assert.equal(response.headers.get("location"), `/documents/published-work.pdf${download}`);
        assert.equal(response.headers.get("cache-control"), "no-store");
        assert.equal(response.headers.get("x-robots-tag"), null);
        await response.arrayBuffer();
      }
    }
    for (const change of [undefined, { ...sample, published: false }, { ...sample, fileData: "" }, { ...sample, fileSize: 0 },
      { ...sample, fileData: Buffer.from("Not a PDF").toString("base64"), fileSize: 9 }]) {
      record = change;
      const response = await fetch(`${base}/api/work/published-work/file`, { redirect: "manual" });
      assert.equal(response.status, 404);
      assert.equal(response.headers.get("location"), null);
      assert.match(response.headers.get("x-robots-tag")!, /noindex/);
      assert.equal(response.headers.get("cache-control"), "no-store");
      await response.arrayBuffer();
    }
    const image = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
    record = { ...sample, fileMimeType: "image/png", fileName: "image.png", fileData: image.toString("base64"), fileSize: image.length };
    const response = await fetch(`${base}/api/work/published-work/file?download=1`);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "image/png");
    assert.match(response.headers.get("content-disposition")!, /^attachment;/);
    assert.match(response.headers.get("x-robots-tag")!, /noindex/);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), image);
  });
});

test("canonical document metadata covers all published PDFs without asserting an external review", () => {
  assert.equal(publicWorkDocumentPath(sample), "/documents/published-work.pdf");
  assert.equal(workAttachmentPath(sample), "/documents/published-work.pdf");
  assert.equal(publicWorkDocumentPath({ ...sample, updatedAt: "a future replacement does not need an approval entry" }), "/documents/published-work.pdf");
  for (const change of [{ published: false }, { fileSize: 0 }, { fileSize: -1 }, { fileSize: Infinity }, { fileSize: 1.5 }, { fileMimeType: "image/png" }, { slug: "../private" }]) {
    assert.equal(publicWorkDocumentPath({ ...sample, ...change }), undefined);
  }
  assert.equal(workAttachmentPath({ ...sample, fileMimeType: "image/png" }), "/api/work/published-work/file");
});

const textAlternative: PublicWorkDocumentText = {
  slug: sample.slug,
  sourceSHA256: createHash("sha256").update(data).digest("hex"),
  sourceUpdatedAt: sample.updatedAt,
  fileSize: sample.fileSize,
  language: "ar",
  checkedPageCount: 1,
  text: "المادة الأولى: مراجعة المستند.\nقيمة المطالبة: ١٢٣ ريالاً — CounselO.\n",
};

test("faithful text alternatives preserve Unicode and expose UTF-8 GET, HEAD and download with a PDF canonical", async () => {
  const app = express();
  app.use("/documents", createPublicDocumentsRouter(async slug => slug === sample.slug ? sample : undefined, [textAlternative]));
  await withServer(app, async base => {
    for (const method of ["GET", "HEAD"]) {
      const response = await fetch(`${base}/documents/published-work.txt`, { method });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("content-type"), "text/plain; charset=utf-8");
      assert.equal(response.headers.get("content-language"), "ar");
      assert.equal(response.headers.get("content-length"), String(Buffer.byteLength(textAlternative.text, "utf8")));
      assert.equal(response.headers.get("content-disposition"), 'inline; filename="published-work.txt"');
      assert.equal(response.headers.get("x-robots-tag"), null);
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal(response.headers.get("link"), '<https://counselo-legal.com/documents/published-work.pdf>; rel="canonical"');
      assert.equal(await response.text(), method === "GET" ? textAlternative.text : "");
    }
    const download = await fetch(`${base}/documents/published-work.txt?download=1`);
    assert.equal(download.status, 200);
    assert.match(download.headers.get("content-disposition")!, /^attachment;/);
    assert.equal(await download.text(), textAlternative.text);
  });
});

test("text alternatives fail closed for unpublished, changed or unavailable source PDFs", async () => {
  let record: typeof sample | undefined = { ...sample };
  const alternatives: PublicWorkDocumentText[] = [{ ...textAlternative }];
  const app = express();
  app.use("/documents", createPublicDocumentsRouter(async slug => slug === sample.slug ? record : undefined, alternatives));
  app.use((_req, res) => { res.send("SPA shell"); });
  await withServer(app, async base => {
    const differentBytes = Buffer.from(data);
    differentBytes[10] = differentBytes[10] ^ 1;
    for (const change of [undefined, { ...sample, published: false },
      { ...sample, updatedAt: "2026-11-13T00:00:00.000Z" },
      { ...sample, fileSize: sample.fileSize + 1 },
      { ...sample, fileData: differentBytes.toString("base64") },
    ]) {
      record = change;
      const response = await fetch(`${base}/documents/published-work.txt`);
      assert.equal(response.status, 404);
      assert.match(response.headers.get("x-robots-tag")!, /noindex/);
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.doesNotMatch(await response.text(), /SPA shell|المادة الأولى/);
    }
    // A changed PDF remains available; only a stale text alternative is withheld.
    const pdf = await fetch(`${base}/documents/published-work.pdf`);
    assert.equal(pdf.status, 200);
    assert.deepEqual(Buffer.from(await pdf.arrayBuffer()), differentBytes);
    record = { ...sample };
    alternatives.length = 0;
    const unavailable = await fetch(`${base}/documents/published-work.txt`);
    assert.equal(unavailable.status, 404);
    assert.match(unavailable.headers.get("x-robots-tag")!, /noindex/);
    await unavailable.arrayBuffer();
    const unknown = await fetch(`${base}/documents/unknown.txt`);
    assert.equal(unknown.status, 404);
    assert.doesNotMatch(await unknown.text(), /SPA shell/);
  });
});

test("browser text links require matching PDF publication, revision and size metadata", () => {
  assert.equal(publicWorkDocumentTextPath(sample, [textAlternative]), "/documents/published-work.txt");
  assert.equal(publicWorkDocumentTextPath(sample, []), undefined);
  for (const change of [{ published: false }, { updatedAt: undefined }, { updatedAt: "invalid" },
    { updatedAt: "2026-11-13T00:00:00.000Z" }, { fileSize: sample.fileSize + 1 }, { fileMimeType: "image/png" }]) {
    assert.equal(publicWorkDocumentTextPath({ ...sample, ...change }, [textAlternative]), undefined);
  }
  assert.equal(publicWorkDocumentTextPath(sample, [{ ...textAlternative, sourceSHA256: "invalid" }]), undefined);
});

test("all configured crawlers retain API restrictions and permit documents", () => {
  const robots = readFileSync(new URL("../../../legal-site/public/robots.txt", import.meta.url), "utf8");
  const groups = robots.split(/User-agent:/).slice(1);
  assert.ok(groups.length >= 4);
  for (const group of groups) {
    assert.match(group, /Allow: \/\s/);
    assert.match(group, /Disallow: \/api\//);
    assert.doesNotMatch(group, /Disallow: \/documents/);
  }
});

test("Arabic and English production HTML link and schema use the published canonical PDF URL together", async () => {
  process.env.DATABASE_URL ??= "postgresql://test:test@127.0.0.1:5432/counselo_renderer_test";
  const { buildDynamicWorkHtml } = await import("../og-pages.js");
  const shell = '<html><head><!--app-head--></head><body><div id="root"></div></body></html>';
  for (const language of ["en", "ar"] as const) {
    const html = buildDynamicWorkHtml({ ...sample,
      titleEn: "Work", titleAr: "عمل", summaryEn: "Summary", summaryAr: "ملخص",
      workTypeEn: "Review", workTypeAr: "مراجعة", jurisdictionEn: "Syria", jurisdictionAr: "سوريا",
      date: "2026-09-07",
      challengeEn: "Review scope", challengeAr: "نطاق المراجعة",
      approachEn: "Document review", approachAr: "مراجعة المستند",
      outcomeEn: "Assessment", outcomeAr: "تقييم",
    } as unknown as Parameters<typeof buildDynamicWorkHtml>[0], language, shell);
    assert.ok(html.includes('"contentUrl":"https://counselo-legal.com/documents/published-work.pdf"'));
    assert.ok(html.includes('href="https://counselo-legal.com/documents/published-work.pdf"'));
    assert.ok(!html.includes("/api/work/published-work/file"));
  }
});
