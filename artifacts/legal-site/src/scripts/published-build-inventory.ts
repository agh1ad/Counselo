import { Client } from "@replit/object-storage";
import { Storage } from "@google-cloud/storage";
import { selectPublicTestimonials } from "@workspace/api-zod";
import { LegacyWorkSnapshotReader } from "@workspace/api-zod/legacy-public-work-snapshot";

type Collection = "blogs" | "work";
type Row = Record<string, unknown>;
export type InventoryStorage = {
  state(): Promise<{ epoch: string; pending: boolean }>;
  read(key: string): Promise<string | undefined>;
};

const PREFIX = "counselo/publication-control/v1/";
const MAX_BYTES = 8 * 1024 * 1024;

function storage(): InventoryStorage {
  // Same explicitly selected public-cache bucket as the API artifact. Never
  // open DATABASE_URL here: the workspace database is not production.
  const bucketId = process.env.PUBLIC_RESPONSE_CACHE_BUCKET_ID?.trim()
    || "replit-objstore-a69094dc-1cf1-4dcc-9b7c-8c67e9f645be";
  const client = new Client({ bucketId });
  const gcs = new Storage({
    projectId: "",
    credentials: {
      audience: "replit", subject_token_type: "access_token", type: "external_account",
      token_url: "http://127.0.0.1:1106/token",
      credential_source: { url: "http://127.0.0.1:1106/credential", format: { type: "json", subject_token_field_name: "access_token" } },
      universe_domain: "googleapis.com",
    },
  });
  return {
    async state() {
      const [pending, [metadata]] = await Promise.all([
        client.list({ prefix: `${PREFIX}pending/`, maxResults: 1 }),
        gcs.bucket(bucketId).file(`${PREFIX}epoch.json`).getMetadata(),
      ]);
      if (!pending.ok) throw pending.error;
      const epoch = String(metadata.generation ?? "");
      if (!/^\d+$/.test(epoch)) throw new Error("Uninitialized publication epoch");
      return { epoch, pending: pending.value.length > 0 };
    },
    async read(key) {
      const result = await client.downloadAsText(key);
      if (result.ok) return result.value;
      if (result.error.statusCode === 404) return undefined;
      throw result.error;
    },
  };
}

function validateRows(value: unknown): Row[] {
  if (!Array.isArray(value)) throw new Error("Published inventory must be an array");
  const slugs = new Set<string>();
  return value.map(item => {
    if (!item || typeof item !== "object") throw new Error("Invalid public record");
    const row = item as Row;
    if (row.published !== true || typeof row.slug !== "string" || !row.slug.trim()
      || slugs.has(row.slug) || typeof row.date !== "string") {
      throw new Error("Invalid, duplicate or unpublished inventory record");
    }
    slugs.add(row.slug);
    // Snapshot envelopes are internal. Never propagate file bytes or private
    // testimonial approval/evidence into generated HTML or public bootstrap.
    const { fileData: _fileData, confidentialityConfirmed: _confirmed, ...publicRow } = row;
    if ("testimonials" in publicRow) publicRow.testimonials = selectPublicTestimonials(publicRow.testimonials);
    if ("fileSize" in publicRow) publicRow.hasFile = Number(publicRow.fileSize) > 0;
    return publicRow;
  });
}

export async function readSnapshotInventory(
  collection: Collection,
  store: InventoryStorage,
): Promise<Row[]> {
  const before = await store.state();
  if (before.pending) throw new Error("Publication is in progress");
  // Never search a prior epoch or return a checked-in/stale content inventory.
  // Legacy work gets its required fingerprints from approved stored files.
  const versions = collection === "work" ? ["v3", "legacy"] : ["v2"];
  let rows: Row[] | undefined;
  for (const version of versions) {
    const source = version === "legacy"
      ? await new LegacyWorkSnapshotReader(store.read.bind(store)).read("work", before.epoch)
      : await store.read(`counselo/public-data-cache/${version}/${before.epoch}/${collection}.json`);
    if (source === undefined) continue;
    if (Buffer.byteLength(source) > MAX_BYTES) throw new Error("Public inventory exceeds size limit");
    const entry = JSON.parse(source);
    if (entry.version !== 1 || !Number.isFinite(entry.createdAt) || entry.createdAt > Date.now()) {
      throw new Error("Invalid public inventory envelope");
    }
    rows = validateRows(entry.records);
    if (version === "legacy") {
      console.warn("[build inventory] Verified legacy work fingerprints from active-epoch approved stored attachments; no database access.");
    }
    break;
  }
  if (!rows) throw new Error(`No active ${collection} inventory snapshot`);
  const after = await store.state();
  if (after.pending || before.epoch !== after.epoch) throw new Error("Publication changed during inventory read");
  return rows;
}

export async function loadPublishedBuildInventory(
  collection: Collection,
  urls: string[],
): Promise<Row[]> {
  const failures: string[] = [];
  for (const url of urls) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return validateRows(await response.json());
    } catch (error) {
      failures.push(`${url}: ${(error as Error).message}`);
    }
  }
  try {
    const result = await readSnapshotInventory(collection, storage());
    console.warn(`[build inventory] Live ${collection} API unavailable; using verified active-epoch public snapshots.`);
    return result;
  } catch (error) {
    throw new Error(`Published ${collection} inventory unavailable; refusing an incomplete build (${failures.join("; ")}; snapshot: ${(error as Error).message})`);
  }
}
