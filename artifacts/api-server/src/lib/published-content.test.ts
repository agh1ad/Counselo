import assert from "node:assert/strict";
import test from "node:test";
import { getTableColumns } from "drizzle-orm";

// This suite validates serialization only and never connects to PostgreSQL.
process.env.DATABASE_URL ??= "postgres://test:test@127.0.0.1:1/test";
const { blogPostsTable, workSamplesTable } = await import("@workspace/db");
const { decodePublishedBlogs, decodePublishedWork, decodePublishedWorkSummaries, publishedWorkFileBySlug } =
  await import("./published-content.js");
const { publicationDataCache } = await import("./publication-data-cache.js");
const { publicWorkFileCache } = await import("./public-work-file-cache.js");

function record(table: typeof blogPostsTable | typeof workSamplesTable) {
  return Object.fromEntries(Object.entries(getTableColumns(table)).map(([key, column]) => {
    const value = key === "published" ? true : !column.notNull ? null
      : column.dataType === "date" ? "2026-09-10T00:00:00.000Z"
      : column.dataType === "number" ? 1 : column.dataType === "boolean" ? false
      : column.dataType === "json" ? [] : "fixture";
    return [key, value];
  }));
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
