import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { once } from "node:events";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import express from "express";
import { buildWorkDocumentSitemapEntries, publicWorkDocumentTextPath, type PublicWorkDocumentRevision } from "@workspace/api-zod";
import { createPublicDocumentsRouter, createWorkAttachmentHandler } from "./public-work-documents.js";
import { createWorkDocumentRevisionResolver, publicWorkDocumentMetadata, resolveWorkDocumentRevision } from "./work-document-revisions.js";
import { PUBLIC_WORK_DOCUMENT_TEXTS } from "./public-work-document-texts.js";

const hash = (data: Buffer) => createHash("sha256").update(data).digest("hex");
const original = Buffer.from("%PDF-1.4\nOriginal synthetic test file\n%%EOF");
const revised = Buffer.from("%PDF-1.7\nRevised synthetic test file, same legal matter\n%%EOF");
const transcript = Buffer.from("ملف عمل منشور — النص المطابق للنسخة المحدثة.\n", "utf8");

test("historical text URLs retain their verified current editions without rewriting source transcriptions", () => {
  for (const source of PUBLIC_WORK_DOCUMENT_TEXTS) {
    const metadata = {
      slug: source.slug, published: true, fileMimeType: "application/pdf",
      fileSize: source.fileSize, updatedAt: source.sourceUpdatedAt,
      documentLanguage: source.language, sourceFileSHA256: source.sourceSHA256,
    };
    const revision = resolveWorkDocumentRevision(metadata);
    assert.ok(revision, `${source.slug}: current edition must preserve the existing text URL`);
    const publicMetadata = publicWorkDocumentMetadata(metadata);
    assert.equal(publicWorkDocumentTextPath(publicMetadata), `/documents/${source.slug}.txt`);
    assert.equal(publicMetadata.fileSize, revision.pdf.length);
    assert.doesNotMatch(revision.text.toString("utf8"), /100\s*%\s*Online|fully[ -]online|Online Legal Platform/i);
    assert.equal("sourceFileSHA256" in publicMetadata, false);
  }
});
const sample = {
  slug: "reviewed-work", published: true, updatedAt: "2026-07-29T04:19:19.570Z", date: "2026-07-22",
  fileMimeType: "application/pdf", fileName: "Work.pdf", fileSize: original.length,
  documentLanguage: "ar", fileData: original.toString("base64"), sourceFileSHA256: hash(original),
};
const entry: PublicWorkDocumentRevision = {
  slug: sample.slug, sourceUpdatedAt: sample.updatedAt, sourceFileSize: sample.fileSize,
  sourceSHA256: hash(original), sourceDocumentLanguage: "ar", edition: "2026-11-18",
  editionPublishedAt: "2026-11-18T00:00:00.000Z", pdfSHA256: hash(revised), pdfFileSize: revised.length,
  textSHA256: hash(transcript), textFileSize: transcript.length, documentLanguage: "ar", pageCount: 1,
};

function fixture() {
  const root = mkdtempSync(join(tmpdir(), "counselo-document-edition-"));
  const directory = join(root, entry.edition);
  mkdirSync(directory);
  const manifest = (documents: unknown[] = [entry]) => writeFileSync(join(root, "manifest.json"), JSON.stringify({ version: 1, documents }));
  manifest();
  writeFileSync(join(directory, `${sample.slug}.pdf`), revised);
  writeFileSync(join(directory, `${sample.slug}.txt`), transcript);
  return { root, directory, manifest, resolve: createWorkDocumentRevisionResolver(root), cleanup: () => rmSync(root, { recursive: true, force: true }) };
}

async function withServer(app: express.Express, run: (base: string) => Promise<void>) {
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address() as { port: number };
  try { await run(`http://127.0.0.1:${address.port}`); }
  finally { await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())); }
}

test("reviewed editions serve revised PDF/text bytes at existing URLs, including HEAD and legacy downloads", async () => {
  const f = fixture();
  try {
    const app = express();
    app.use("/documents", createPublicDocumentsRouter(async slug => slug === sample.slug ? sample : undefined, [], f.resolve));
    app.get("/api/work/:slug/file", createWorkAttachmentHandler(async slug => slug === sample.slug ? sample : undefined));
    await withServer(app, async base => {
      for (const [extension, expected, mime] of [["pdf", revised, "application/pdf"], ["txt", transcript, "text/plain; charset=utf-8"]] as const) {
        for (const method of ["GET", "HEAD"]) {
          const response = await fetch(`${base}/documents/${sample.slug}.${extension}`, { method });
          assert.equal(response.status, 200);
          assert.equal(response.headers.get("content-type"), mime);
          assert.equal(response.headers.get("content-length"), String(expected.length));
          assert.equal(response.headers.get("content-language"), "ar");
          assert.equal(response.headers.get("last-modified"), new Date(entry.editionPublishedAt).toUTCString());
          assert.equal(response.headers.get("cache-control"), "no-store");
          assert.deepEqual(Buffer.from(await response.arrayBuffer()), method === "GET" ? expected : Buffer.alloc(0));
        }
      }
      const download = await fetch(`${base}/api/work/${sample.slug}/file?download=1`);
      assert.equal(download.url, `${base}/documents/${sample.slug}.pdf?download=1`);
      assert.match(download.headers.get("content-disposition")!, /^attachment;/);
      assert.deepEqual(Buffer.from(await download.arrayBuffer()), revised);
    });
  } finally { f.cleanup(); }
});

test("current publication, source metadata and source bytes are all required on every request", async () => {
  const f = fixture();
  const changedBytes = Buffer.from(original.toString().replace("Original", "Modified"));
  assert.equal(changedBytes.length, original.length);
  let current = { ...sample };
  try {
    const app = express();
    app.use("/documents", createPublicDocumentsRouter(async () => current, [], f.resolve));
    await withServer(app, async base => {
      for (const change of [
        { updatedAt: "2026-11-19T00:00:00.000Z" },
        { documentLanguage: "en" },
        { fileData: changedBytes.toString("base64") },
      ]) {
        current = { ...sample, ...change };
        const response = await fetch(`${base}/documents/${sample.slug}.pdf`);
        assert.equal(response.status, 200);
        assert.deepEqual(Buffer.from(await response.arrayBuffer()), Buffer.from(current.fileData, "base64"));
        const text = await fetch(`${base}/documents/${sample.slug}.txt`);
        assert.equal(text.status, 404);
        await text.arrayBuffer();
      }
      current = { ...sample, published: false };
      for (const extension of ["pdf", "txt"]) {
        const response = await fetch(`${base}/documents/${sample.slug}.${extension}`);
        assert.equal(response.status, 404);
        assert.equal(response.headers.get("cache-control"), "no-store");
        await response.arrayBuffer();
      }
    });
    for (const change of [{ fileSize: sample.fileSize + 1 }, { sourceFileSHA256: hash(changedBytes) },
      { sourceFileSHA256: undefined }, { updatedAt: "invalid" }, { published: false }]) {
      assert.equal(f.resolve({ ...sample, ...change }), undefined);
    }
  } finally { f.cleanup(); }
});

test("source hashing accepts upload-compatible unpadded base64 and whitespace while rejecting malformed encoding", async () => {
  const f = fixture();
  let current = { ...sample };
  try {
    const app = express();
    app.use("/documents", createPublicDocumentsRouter(async () => current, [], f.resolve));
    await withServer(app, async base => {
      for (const encoded of [sample.fileData.replace(/=+$/, ""), ` \n${sample.fileData.slice(0, 12)}\t${sample.fileData.slice(12)}\r\n`]) {
        current = { ...sample, fileData: encoded };
        const response = await fetch(`${base}/documents/${sample.slug}.pdf`);
        assert.equal(response.status, 200);
        assert.deepEqual(Buffer.from(await response.arrayBuffer()), revised);
      }
      for (const encoded of [sample.fileData + "!", "A", sample.fileData + "===", sample.fileData.slice(0, 4) + "=" + sample.fileData.slice(4)]) {
        current = { ...sample, fileData: encoded };
        const response = await fetch(`${base}/documents/${sample.slug}.pdf`);
        assert.equal(response.status, 404);
        await response.arrayBuffer();
      }
    });
  } finally { f.cleanup(); }
});

test("missing, corrupt or ambiguous private assets cannot replace the CMS source or advertise stale text", () => {
  const f = fixture();
  try {
    for (const manifestEntry of [{ ...entry, edition: "../outside" }, { ...entry, pdfSHA256: "bad" }, { ...entry, textFileSize: 0 }]) {
      f.manifest([manifestEntry]);
      assert.equal(f.resolve(sample), undefined);
    }
    f.manifest([entry, entry]);
    assert.equal(f.resolve(sample), undefined);
    f.manifest();
    writeFileSync(join(f.directory, `${sample.slug}.txt`), "Stale text");
    assert.equal(f.resolve(sample), undefined);
    const metadata = publicWorkDocumentMetadata(sample, f.resolve);
    assert.equal(metadata.fileSize, original.length);
    assert.equal(metadata.documentEdition, undefined);
    assert.equal(publicWorkDocumentTextPath(metadata), undefined);
    assert.equal("sourceFileSHA256" in metadata, false);
    assert.equal("fileData" in metadata, false);
    rmSync(join(f.directory, `${sample.slug}.pdf`));
    assert.equal(f.resolve(sample), undefined);
  } finally { f.cleanup(); }
});

test("public metadata and PDF sitemap describe revised bytes while preserving the actual case and CMS dates", () => {
  const f = fixture();
  try {
    const metadata = publicWorkDocumentMetadata(sample, f.resolve);
    assert.equal(metadata.fileSize, revised.length);
    assert.equal(metadata.documentLanguage, entry.documentLanguage);
    assert.equal(metadata.documentEdition, entry.edition);
    assert.equal(metadata.documentEditionPublishedAt, entry.editionPublishedAt);
    assert.equal(metadata.documentTextUrl, `/documents/${sample.slug}.txt`);
    assert.equal(metadata.date, sample.date);
    assert.equal(metadata.updatedAt, sample.updatedAt);
    assert.equal("sourceFileSHA256" in metadata, false);
    assert.equal("fileData" in metadata, false);
    assert.equal(publicWorkDocumentTextPath(metadata), `/documents/${sample.slug}.txt`);
    assert.equal(publicWorkDocumentTextPath({ ...metadata, published: false }), undefined);
    assert.match(buildWorkDocumentSitemapEntries([metadata])[0], /<lastmod>2026-11-18<\/lastmod>/);
    assert.match(buildWorkDocumentSitemapEntries([sample])[0], /<lastmod>2026-07-29<\/lastmod>/);
  } finally { f.cleanup(); }
});

test("detail HTML and bootstrap expose the verified edition without changing case dates or leaking source bytes", async () => {
  process.env.DATABASE_URL ??= "postgresql://test:test@127.0.0.1:5432/counselo_renderer_test";
  const { buildDynamicWorkHtml } = await import("../og-pages.js");
  const f = fixture();
  try {
    const metadata = publicWorkDocumentMetadata({ ...sample,
      titleEn: "Work", titleAr: "عمل", summaryEn: "Summary", summaryAr: "ملخص",
      workTypeEn: "Review", workTypeAr: "مراجعة", jurisdictionEn: "Syria", jurisdictionAr: "سوريا",
      challengeEn: "Review scope", challengeAr: "نطاق المراجعة", approachEn: "Document review", approachAr: "مراجعة المستند",
      outcomeEn: "Assessment", outcomeAr: "تقييم", confidentialityConfirmed: true,
    }, f.resolve);
    for (const language of ["en", "ar"] as const) {
      const html = buildDynamicWorkHtml(metadata as unknown as Parameters<typeof buildDynamicWorkHtml>[0], language,
        '<html><head><!--app-head--></head><body><div id="root"></div></body></html>');
      const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([^]*?)<\/script>/)![1]);
      const bootstrap = JSON.parse(html.match(/window\.__SSR_WORK__=([^]*?);<\/script>/)![1]);
      assert.equal(schema.dateCreated, sample.date);
      assert.equal(schema.encoding.dateModified, entry.editionPublishedAt);
      assert.equal(schema.encoding.contentSize, String(revised.length));
      assert.equal(bootstrap.fileSize, revised.length);
      assert.equal(bootstrap.updatedAt, sample.updatedAt);
      assert.equal(bootstrap.documentTextUrl, `/documents/${sample.slug}.txt`);
      assert.match(html, new RegExp(`href="https://counselo-legal.com/documents/${sample.slug}\\.txt"`));
      assert.doesNotMatch(html, /sourceFileSHA256|fileData|confidentialityConfirmed/);
    }
  } finally { f.cleanup(); }
});
