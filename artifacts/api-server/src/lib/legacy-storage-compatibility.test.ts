import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { PublicationDataCache, PublicSnapshotUnavailableError } from "./publication-data-cache.js";
import { PublicWorkFileCache, PublicWorkFileUnavailableError } from "./public-work-file-cache.js";
import { PublicationCoordinator, type PublicationStorage } from "./publication-cache.js";
import { decodeLegacyWorkFile, legacyWorkFileKey } from "@workspace/api-zod/legacy-public-work-snapshot";
import { Client } from "@replit/object-storage";

const bytes = Buffer.from("%PDF-1.4\napproved public document\n");
const metadata = {
  slug: "approved-case", published: true, date: "2026-11-18",
  updatedAt: "2026-11-18T00:00:00.000Z", documentLanguage: "ar",
  fileSize: bytes.length, fileMimeType: "application/pdf",
};
const file = { ...metadata, fileName: "case.pdf", fileData: bytes.toString("base64"), confidentialityConfirmed: true };
const entry = (records: unknown) => JSON.stringify({ version: 1, createdAt: Date.now() - 100, records });
const attachment = (value = file) => JSON.stringify({ version: 1, createdAt: Date.now() - 100, file: value });
const hash = createHash("sha256").update(bytes).digest("hex");

function fixture() {
  const objects = new Map<string, string>([
    ["counselo/public-data-cache/v2/123/work.json", entry([metadata])],
    ["counselo/public-data-cache/v2/123/work-summaries.json", entry([metadata])],
    [legacyWorkFileKey("123", metadata.slug), attachment()],
  ]);
  const counts = { database: 0, writes: 0, fileReads: 0 };
  let epoch = "123";
  let pending = false;
  const storage = {
    async downloadAsText(key: string) {
      if (key.includes("public-work-files/")) counts.fileReads++;
      if (!objects.has(key)) return { ok: false as const, error: { statusCode: 404, message: "missing" } };
      return { ok: true as const, value: objects.get(key)! };
    },
    async uploadFromText() { counts.writes++; return { ok: true as const, value: null }; },
  } satisfies Pick<Client, "downloadAsText" | "uploadFromText">;
  const control = {
    async epochGeneration() { return epoch; },
    async list() { return { ok: true as const, value: pending ? [{ name: "pending" }] : [] }; },
  } as unknown as PublicationStorage;
  const coordinator = new PublicationCoordinator(() => control);
  const data = new PublicationDataCache(() => storage, coordinator, true);
  const files = new PublicWorkFileCache(() => storage, coordinator, true);
  const load = async (): Promise<never> => { counts.database++; throw new Error("Database access forbidden"); };
  const decode = (value: unknown) => value as (typeof metadata & { sourceFileSHA256: string })[];
  const read = () => data.read("work", load, decode, { allowDatabaseFallback: false });
  return { objects, counts, storage, coordinator, data, files, load, decode, read,
    changeEpoch: () => { epoch = "124"; coordinator.clear(); },
    setFence: () => { pending = true; coordinator.clear(); },
  };
}

test("legacy metadata and PDFs remain usable with zero database reads or snapshot writes", async () => {
  const f = fixture();
  const [work] = await f.read();
  assert.equal(work.sourceFileSHA256, hash);
  await f.read();
  await f.data.read("work-summaries", f.load, f.decode, { allowDatabaseFallback: false });
  assert.equal(f.counts.fileReads, 1, "summaries and details reuse the verified source digest");
  const pdf = await f.files.read(work.slug, f.load, { allowDatabaseFallback: false, legacyMetadata: work });
  assert.equal(pdf?.fileData, file.fileData);
  assert.equal(pdf?.documentLanguage, "ar");
  assert.equal(f.counts.database, 0);
  assert.equal(f.counts.writes, 0);
});

test("legacy snapshots never bypass a fence or a changed publication epoch", async () => {
  const f = fixture();
  await f.read();
  f.setFence();
  await assert.rejects(f.read(), PublicSnapshotUnavailableError);
  const g = fixture();
  await g.read();
  g.changeEpoch();
  await assert.rejects(g.read(), PublicSnapshotUnavailableError);
  assert.equal(f.counts.database + g.counts.database, 0);
});

test("a publication change while verifying attachments fails closed", async () => {
  const f = fixture();
  const original = f.storage.downloadAsText;
  f.storage.downloadAsText = async key => {
    const result = await original(key);
    if (key.includes("public-work-files/")) f.changeEpoch();
    return result;
  };
  await assert.rejects(f.read(), PublicSnapshotUnavailableError);
  assert.equal(f.counts.database, 0);
});

test("a corrupt current-format snapshot never falls back to a legacy snapshot", async () => {
  const f = fixture();
  f.objects.set("counselo/public-data-cache/v3/123/work.json", "malformed");
  await assert.rejects(f.read(), PublicSnapshotUnavailableError);
  assert.equal(f.counts.fileReads, 0);
  assert.equal(f.counts.database, 0);
});

test("missing or unapproved legacy attachments cannot satisfy current metadata", async () => {
  const f = fixture();
  f.objects.delete(legacyWorkFileKey("123", metadata.slug));
  await assert.rejects(f.read(), PublicSnapshotUnavailableError);
  const g = fixture();
  g.objects.set(legacyWorkFileKey("123", metadata.slug), attachment({ ...file, confidentialityConfirmed: false }));
  await assert.rejects(g.read(), PublicSnapshotUnavailableError);
  await assert.rejects(g.files.read(metadata.slug, g.load, { allowDatabaseFallback: false, legacyMetadata: metadata }), PublicWorkFileUnavailableError);
  assert.equal(f.counts.database + g.counts.database, 0);
});

test("legacy language, revision, size and slug must agree with public metadata", () => {
  assert.equal(decodeLegacyWorkFile(attachment(), metadata).slug, metadata.slug);
  const precise = { ...metadata, updatedAt: "2026-11-18T00:00:00.731Z" };
  const preciseFile = attachment({ ...file, updatedAt: precise.updatedAt });
  assert.equal(decodeLegacyWorkFile(preciseFile, { ...precise, updatedAt: new Date(precise.updatedAt) }).slug, metadata.slug);
  for (const mismatch of [{ documentLanguage: "en" }, { slug: "other" },
    { updatedAt: "2020-01-01" }, { fileSize: 1 }, { published: false }]) {
    assert.throws(() => decodeLegacyWorkFile(attachment(), { ...metadata, ...mismatch }));
  }
  const { documentLanguage: _language, ...oldFile } = file;
  const source = JSON.stringify({ version: 1, createdAt: Date.now() - 100, file: oldFile });
  assert.equal(decodeLegacyWorkFile(source, metadata).documentLanguage, "ar");
});
