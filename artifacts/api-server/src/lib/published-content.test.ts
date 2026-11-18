import assert from "node:assert/strict";
import test from "node:test";
import { getTableColumns } from "drizzle-orm";
import { createHash } from "node:crypto";
import { once } from "node:events";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import express from "express";
import type { Client } from "@replit/object-storage";
import { PublicationCoordinator } from "./publication-cache.js";
import { PublicationDataCache } from "./publication-data-cache.js";
import { PublicWorkFileCache, type PublicWorkFile } from "./public-work-file-cache.js";
import { createPublicDocumentsRouter } from "./public-work-documents.js";
import { createWorkDocumentRevisionResolver, publicWorkDocumentMetadata } from "./work-document-revisions.js";
import { cachePublicResponses } from "./public-response-cache.js";

// This suite validates serialization only and never connects to PostgreSQL.
process.env.DATABASE_URL ??= "postgres://test:test@127.0.0.1:1/test";
const { blogPostsTable, workSamplesTable } = await import("@workspace/db");
const { decodePublishedBlogs, decodePublishedWork, decodePublishedWorkSummaries, publishedWorkFileBySlug } =
  await import("./published-content.js");
const { publicationDataCache } = await import("./publication-data-cache.js");
const { publicWorkFileCache } = await import("./public-work-file-cache.js");

function record(table: typeof blogPostsTable | typeof workSamplesTable) {
  const values = Object.fromEntries(Object.entries(getTableColumns(table)).map(([key, column]) => {
    const value = key === "published" ? true : !column.notNull ? null
      : column.dataType === "date" ? "2026-09-10T00:00:00.000Z"
      : column.dataType === "number" ? 1 : column.dataType === "boolean" ? false
      : column.dataType === "json" ? [] : "fixture";
    return [key, value];
  }));
  return table === workSamplesTable ? { ...values, sourceFileSHA256: null } : values;
}

test("public snapshots revive dates and reject drafts or malformed records", () => {
  const blog = record(blogPostsTable);
  assert.ok(decodePublishedBlogs([blog])[0].updatedAt instanceof Date);
  assert.equal(decodePublishedBlogs([blog])[0].aiLinksAssignedAt, null);
  assert.throws(() => decodePublishedBlogs([{ ...blog, published: false }]));
  assert.throws(() => decodePublishedBlogs([{ ...blog, updatedAt: "invalid" }]));
  assert.throws(() => decodePublishedBlogs({ records: [blog] }));
});

test("public work snapshots exclude file bytes and confidentiality approval", () => {
  const work = record(workSamplesTable);
  const decoded = decodePublishedWork([{ ...work, fileData: "private bytes", confidentialityConfirmed: true }])[0];
  assert.equal("fileData" in decoded, false);
  assert.equal("confidentialityConfirmed" in decoded, false);
  assert.ok(decoded.updatedAt instanceof Date);
  assert.throws(() => decodePublishedWork([{ ...work, published: false }]));
  const { sourceFileSHA256: _hash, ...legacy } = work;
  assert.throws(() => decodePublishedWork([legacy]), "legacy snapshots cannot silently suppress document editions");
  assert.throws(() => decodePublishedWorkSummaries([legacy]));
  assert.throws(() => decodePublishedWork([{ ...work, sourceFileSHA256: "invalid" }]));
});

test("reviewed editions survive publication snapshot serialization and restart without reusing legacy snapshots", async t => {
  const digest = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");
  const original = Buffer.from("%PDF-1.7\nOriginal published case study\n%%EOF");
  const revised = Buffer.from("%PDF-1.7\nReviewed CounselO case study edition\n%%EOF");
  const text = Buffer.from("دراسة حالة منشورة من فريق كاونسلو\n");
  const source = {
    ...record(workSamplesTable), slug: "reviewed-snapshot", fileSize: original.length,
    fileMimeType: "application/pdf", documentLanguage: "ar", published: true,
    updatedAt: "2026-11-13T00:00:00.000Z", sourceFileSHA256: digest(original),
  };
  const file: PublicWorkFile = {
    ...source, published: true, fileName: "Case.pdf", fileData: original.toString("base64"),
    confidentialityConfirmed: false,
  };
  const edition = {
    slug: source.slug, sourceUpdatedAt: source.updatedAt, sourceFileSize: original.length,
    sourceSHA256: digest(original), sourceDocumentLanguage: "ar", edition: "2026-11-18",
    editionPublishedAt: "2026-11-18T00:00:00.000Z", pdfSHA256: digest(revised),
    pdfFileSize: revised.length, textSHA256: digest(text), textFileSize: text.length,
    documentLanguage: "ar", pageCount: 1,
  };
  const root = mkdtempSync(join(tmpdir(), "counselo-snapshot-edition-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, edition.edition));
  writeFileSync(join(root, "manifest.json"), JSON.stringify({ version: 1, documents: [edition] }));
  writeFileSync(join(root, edition.edition, `${source.slug}.pdf`), revised);
  writeFileSync(join(root, edition.edition, `${source.slug}.txt`), text);
  const resolveRevision = createWorkDocumentRevisionResolver(root);
  const epoch = "edition-integration";
  const coordinator = new PublicationCoordinator();
  t.mock.method(coordinator, "state", async () => ({ epoch, cacheable: true }));
  const { sourceFileSHA256: _hash, ...oldWork } = source;
  const { documentLanguage: _language, ...oldFile } = file;
  const envelope = (records: unknown) => JSON.stringify({ version: 1, createdAt: Date.now(), records });
  const stored = new Map<string, string>([
    [`counselo/public-data-cache/v2/${epoch}/work.json`, envelope([oldWork])],
    [`counselo/public-data-cache/v2/${epoch}/work-summaries.json`, envelope([oldWork])],
    [`counselo/public-work-files/v1/${epoch}/${digest(Buffer.from(source.slug))}.json`, JSON.stringify({ version: 1, createdAt: Date.now(), file: oldFile })],
  ]);
  const storage: Pick<Client, "downloadAsText" | "uploadFromText"> = {
    async downloadAsText(key: string) {
      return stored.has(key) ? { ok: true as const, value: stored.get(key)! }
        : { ok: false as const, error: { message: "Missing fixture", statusCode: 404 } };
    },
    async uploadFromText(key: string, value: string) { stored.set(key, value); return { ok: true, value: null }; },
  };
  const data = () => new PublicationDataCache(() => storage, coordinator, true);
  const files = () => new PublicWorkFileCache(() => storage, coordinator, true);
  const noDatabase = async (): Promise<never> => { throw new Error("Unexpected database fallback"); };
  for (const [collection, decode] of [["work", decodePublishedWork], ["work-summaries", decodePublishedWorkSummaries]] as const) {
    await assert.rejects(data().read(collection, noDatabase, decode, { allowDatabaseFallback: false }), { name: "PublicSnapshotUnavailableError" });
    await data().prime(collection, async () => decode([source]), decode);
    const [fresh] = await data().read(collection, noDatabase, decode, { allowDatabaseFallback: false });
    assert.equal(fresh.sourceFileSHA256, digest(original));
    assert.equal(fresh.documentLanguage, "ar");
    const publicRecord = publicWorkDocumentMetadata(fresh, resolveRevision);
    assert.equal(publicRecord.documentEdition, edition.edition);
    assert.equal(publicRecord.fileSize, revised.length);
    assert.equal(publicRecord.documentTextUrl, `/documents/${source.slug}.txt`);
    assert.equal("sourceFileSHA256" in publicRecord, false);
  }
  await assert.rejects(files().read(source.slug, noDatabase, { allowDatabaseFallback: false }), { name: "PublicWorkFileUnavailableError" });
  await files().prime([file]);
  const restartedData = data(), restartedFiles = files();
  t.mock.method(publicationDataCache, "read", restartedData.read.bind(restartedData));
  t.mock.method(publicWorkFileCache, "read", restartedFiles.read.bind(restartedFiles));
  assert.equal((await publishedWorkFileBySlug(source.slug))?.documentLanguage, "ar");
  const app = express();
  app.use(cachePublicResponses("document", path => path.endsWith(".pdf"), null));
  app.use("/documents", createPublicDocumentsRouter(publishedWorkFileBySlug, [], resolveRevision));
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
  const address = server.address(); assert.ok(address && typeof address !== "string");
  for (const extension of ["pdf", "pdf", "txt"]) {
    const response = await fetch(`http://127.0.0.1:${address.port}/documents/${source.slug}.${extension}`);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-language"), "ar");
    assert.equal(response.headers.get("last-modified"), new Date(edition.editionPublishedAt).toUTCString());
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), extension === "pdf" ? revised : text);
  }
});

test("public work summaries exclude document-detail prose and filenames", () => {
  const work = record(workSamplesTable);
  const decoded = decodePublishedWorkSummaries([work])[0];
  assert.equal(decoded.challengeEn, "");
  assert.equal(decoded.approachEn, "");
  assert.equal(decoded.outcomeEn, "");
  assert.equal(decoded.seoTitleEn, "");
  assert.equal(decoded.fileName, "");
  assert.equal(decoded.fileSize, 1);
  assert.equal(decoded.published, true);
});

test("published file loading distinguishes withdrawn files from unavailable or mismatched snapshots", async t => {
  const work = { ...record(workSamplesTable), slug: "published-file", fileSize: 40, fileMimeType: "application/pdf", updatedAt: "2026-09-10T00:00:00.000Z" };
  let inventory = decodePublishedWork([work]);
  let file = { ...work, fileData: "%PDF-fixture", confidentialityConfirmed: false };
  let fileReads = 0;
  t.mock.method(publicationDataCache, "read", async () => inventory);
  t.mock.method(publicWorkFileCache, "read", async () => { fileReads++; return file; });
  const published = await publishedWorkFileBySlug("published-file");
  assert.equal(published?.confidentialityConfirmed, false, "publication does not invent a separate review approval");
  file = { ...file, updatedAt: "2026-09-11T00:00:00.000Z" };
  await assert.rejects(publishedWorkFileBySlug("published-file"), { name: "PublicWorkFileUnavailableError" });
  inventory = [];
  assert.equal(await publishedWorkFileBySlug("published-file"), undefined);
  assert.equal(await publishedWorkFileBySlug("unknown"), undefined);
  assert.equal(fileReads, 2, "withdrawn and unknown records never request old snapshot bytes");
});
