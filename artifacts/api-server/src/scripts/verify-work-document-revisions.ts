import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { once } from "node:events";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { publicWorkDocumentTextPath, type PublicWorkDocumentRevisionManifest, type WorkDocumentMetadata } from "@workspace/api-zod";
import { createPublicDocumentsRouter, createWorkAttachmentHandler, type DocumentRecord } from "../lib/public-work-documents.js";
import { createWorkDocumentRevisionResolver, publicWorkDocumentMetadata } from "../lib/work-document-revisions.js";

// Read-only release verification against an independently checked source inventory.
// Optional positional arguments: <private manifest.json> <source-manifest.json>.
const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const manifestPath = resolve(process.argv[2] ?? `${repositoryRoot}/artifacts/api-server/assets/work-document-revisions/manifest.json`);
const sourceManifestPath = resolve(process.argv[3] ?? `${repositoryRoot}/output/pdf/counselo-work-revision-2026-11-18/source-manifest.json`);
const hash = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");
type SourceEntry = {
  slug: string;
  sourcePath: string;
  sourceSHA256: string;
  sourceFileSize: number;
  sourceUpdatedAt: string;
  sourceDocumentLanguage: string;
  pageCount: number;
  metadata: WorkDocumentMetadata & { date: string; fileName: string };
};

async function main() {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as PublicWorkDocumentRevisionManifest;
  const inventory = JSON.parse(readFileSync(sourceManifestPath, "utf8")) as { checkedAt: string; documents: SourceEntry[] };
  assert.equal(manifest.version, 1);
  assert.equal(inventory.documents.length, 60, "The reviewed release inventory must contain all 60 published documents");
  assert.equal(manifest.documents.length, inventory.documents.length);
  assert.equal(new Set(manifest.documents.map(entry => entry.slug)).size, manifest.documents.length, "Duplicate edition slugs");
  assert.deepEqual(manifest.documents.map(entry => entry.slug).sort(), inventory.documents.map(entry => entry.slug).sort(), "Edition/source inventories differ");
  const resolveRevision = createWorkDocumentRevisionResolver(dirname(manifestPath));
  const records = new Map<string, DocumentRecord & { fileName: string }>();
  const report: Array<{ slug: string; pages: number; pdfBytes: number; textBytes: number; edition: string }> = [];
  const startedAt = performance.now();
  for (const source of inventory.documents) {
    const original = readFileSync(source.sourcePath);
    const sourceHash = hash(original);
    assert.equal(sourceHash, source.sourceSHA256, `${source.slug}: source hash changed`);
    assert.equal(original.length, source.sourceFileSize, `${source.slug}: source size changed`);
    assert.equal(source.metadata.fileSize, source.sourceFileSize, `${source.slug}: inventory metadata size mismatch`);
    assert.equal(source.metadata.updatedAt, source.sourceUpdatedAt, `${source.slug}: inventory date mismatch`);
    assert.equal(source.metadata.documentLanguage, source.sourceDocumentLanguage, `${source.slug}: inventory language mismatch`);
    const record = { ...source.metadata, fileData: original.toString("base64"), sourceFileSHA256: sourceHash };
    const edition = resolveRevision(record);
    assert.ok(edition, `${source.slug}: current source did not resolve to valid private edition assets`);
    assert.equal(edition.metadata.pageCount, source.pageCount, `${source.slug}: page count metadata changed`);
    assert.equal(edition.metadata.documentLanguage, source.sourceDocumentLanguage, `${source.slug}: document language arrangement changed`);
    const publicRecord = publicWorkDocumentMetadata(record, resolveRevision);
    assert.equal(publicRecord.fileSize, edition.pdf.length);
    assert.equal(publicRecord.documentLanguage, edition.metadata.documentLanguage);
    assert.equal(publicRecord.documentEditionPublishedAt, edition.metadata.editionPublishedAt);
    assert.equal(publicRecord.date, source.metadata.date, `${source.slug}: actual case date changed`);
    assert.equal(publicRecord.updatedAt, source.metadata.updatedAt, `${source.slug}: CMS timestamp changed`);
    assert.equal(publicWorkDocumentTextPath(publicRecord), `/documents/${source.slug}.txt`);
    assert.equal("fileData" in publicRecord, false);
    assert.equal("sourceFileSHA256" in publicRecord, false);
    assert.equal(resolveRevision({ ...record, published: false }), undefined);
    assert.equal(resolveRevision({ ...record, updatedAt: new Date(new Date(source.sourceUpdatedAt).getTime() + 1) }), undefined);
    assert.equal(resolveRevision({ ...record, sourceFileSHA256: "0".repeat(64) }), undefined);
    records.set(source.slug, record);
    report.push({ slug: source.slug, pages: edition.metadata.pageCount, pdfBytes: edition.pdf.length, textBytes: edition.text.length, edition: edition.metadata.edition });
  }
  const resolverMilliseconds = Math.round(performance.now() - startedAt);
  const app = express();
  app.use("/documents", createPublicDocumentsRouter(async slug => records.get(slug), [], resolveRevision));
  app.get("/api/work/:slug/file", createWorkAttachmentHandler(async slug => records.get(slug)));
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address() as { port: number };
  const origin = `http://127.0.0.1:${address.port}`;
  let httpChecks = 0;
  try {
    for (const entry of manifest.documents) {
      for (const [extension, expectedHash, expectedSize, expectedMime] of [
        ["pdf", entry.pdfSHA256, entry.pdfFileSize, "application/pdf"],
        ["txt", entry.textSHA256, entry.textFileSize, "text/plain; charset=utf-8"],
      ] as const) {
        for (const method of ["GET", "HEAD"]) {
          const response = await fetch(`${origin}/documents/${entry.slug}.${extension}`, { method });
          assert.equal(response.status, 200, `${entry.slug}.${extension}: ${method} failed`);
          assert.equal(response.headers.get("content-type"), expectedMime);
          assert.equal(response.headers.get("content-length"), String(expectedSize));
          assert.equal(response.headers.get("cache-control"), "no-store");
          assert.equal(response.headers.get("content-language"), entry.documentLanguage === "bilingual" ? "ar, en" : entry.documentLanguage);
          const body = Buffer.from(await response.arrayBuffer());
          if (method === "GET") assert.equal(hash(body), expectedHash);
          else assert.equal(body.length, 0);
          httpChecks++;
        }
      }
      const download = await fetch(`${origin}/api/work/${entry.slug}/file?download=1`);
      assert.equal(download.status, 200);
      assert.equal(download.url, `${origin}/documents/${entry.slug}.pdf?download=1`);
      assert.match(download.headers.get("content-disposition") ?? "", /^attachment;/);
      assert.equal(hash(Buffer.from(await download.arrayBuffer())), entry.pdfSHA256);
      httpChecks++;
    }
  } finally {
    await new Promise<void>((done, reject) => server.close(error => error ? reject(error) : done()));
  }
  console.log(JSON.stringify({
    result: "pass", checkedAt: new Date().toISOString(), sourceSnapshotCheckedAt: inventory.checkedAt,
    scope: "Local private assets and HTTP handlers against the reviewed source snapshot; no live database or deployment checks",
    documents: report.length, pages: report.reduce((total, entry) => total + entry.pages, 0),
    httpChecks, resolverMilliseconds, assets: report,
  }, null, 2));
}

main().catch(error => { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1; });
