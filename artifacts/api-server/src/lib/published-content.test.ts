import assert from "node:assert/strict";
import test from "node:test";
import { getTableColumns } from "drizzle-orm";

// This suite validates serialization only and never connects to PostgreSQL.
process.env.DATABASE_URL ??= "postgres://test:test@127.0.0.1:1/test";
const { blogPostsTable, workSamplesTable } = await import("@workspace/db");
const { decodePublishedBlogs, decodePublishedWork } = await import("./published-content.js");

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
