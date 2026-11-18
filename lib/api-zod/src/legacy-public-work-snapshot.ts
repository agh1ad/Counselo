// Node-only subpath; deliberately not exported through the browser barrel.
import { createHash } from "node:crypto";

type Row = Record<string, unknown>;
type ReadText = (key: string) => Promise<string | undefined>;
const MAX_METADATA_BYTES = 8 * 1024 * 1024;
const MAX_FILE_BYTES = 32 * 1024 * 1024;
const timestamp = (value: unknown) => value instanceof Date ? value.getTime() : new Date(String(value)).getTime();

function envelope(source: string, maxBytes: number): Row {
  if (Buffer.byteLength(source) > maxBytes) throw new Error("Legacy snapshot exceeds size limit");
  const value = JSON.parse(source);
  if (value.version !== 1 || !Number.isFinite(value.createdAt) || value.createdAt > Date.now()) {
    throw new Error("Invalid legacy snapshot envelope");
  }
  return value;
}

/** Bind a legacy approved attachment to the current-epoch public metadata. */
export function decodeLegacyWorkFile(source: string, metadata: Row): Row {
  const file = envelope(source, MAX_FILE_BYTES).file as Row | undefined;
  if (!file || metadata.published !== true || file.published !== true
    || file.confidentialityConfirmed !== true
    || typeof metadata.slug !== "string" || file.slug !== metadata.slug
    || typeof metadata.documentLanguage !== "string" || !metadata.documentLanguage.trim()
    || typeof file.fileData !== "string"
    || file.fileSize !== metadata.fileSize || file.fileMimeType !== metadata.fileMimeType
    || (file.documentLanguage !== undefined && file.documentLanguage !== metadata.documentLanguage)
    || !metadata.updatedAt || !file.updatedAt
    || timestamp(file.updatedAt) !== timestamp(metadata.updatedAt)) {
    throw new Error("Legacy attachment does not match current published metadata");
  }
  const base64 = file.fileData.replace(/\s/g, "");
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64) || base64.replace(/=+$/, "").length % 4 === 1
    || Buffer.from(base64, "base64").length !== file.fileSize) {
    throw new Error("Invalid legacy attachment payload");
  }
  return { ...file, documentLanguage: metadata.documentLanguage };
}

export function legacyWorkFileKey(epoch: string, slug: string): string {
  const hash = createHash("sha256").update(slug).digest("hex");
  return `counselo/public-work-files/v1/${epoch}/${hash}.json`;
}

/**
 * Read-only schema compatibility. No database, storage writes or older epochs.
 * Fingerprints are derived from existing approved Object Storage attachments,
 * not invented from a checked-in revision manifest or trusted as null.
 */
export class LegacyWorkSnapshotReader {
  private fingerprints = new Map<string, Promise<string | null>>();
  private epoch?: string;
  constructor(private readonly readText: ReadText) {}

  async read(collection: "work" | "work-summaries", epoch: string): Promise<string | undefined> {
    if (!/^\d+$/.test(epoch)) throw new Error("Invalid publication epoch");
    if (this.epoch !== epoch) {
      this.fingerprints.clear();
      this.epoch = epoch;
    }
    const source = await this.readText(`counselo/public-data-cache/v2/${epoch}/${collection}.json`);
    if (source === undefined) return undefined;
    const entry = envelope(source, MAX_METADATA_BYTES);
    if (!Array.isArray(entry.records)) throw new Error("Invalid legacy public inventory");
    const records: Row[] = [];
    // Sequential reads bound storage fan-out and memory; only the first read
    // per epoch/slug computes a digest, shared by summaries and full metadata.
    for (const row of entry.records as Row[]) {
      if (!row || row.published !== true || typeof row.slug !== "string"
        || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug)) {
        throw new Error("Invalid legacy published record");
      }
      const identity = JSON.stringify([epoch, row.slug, row.updatedAt, row.fileSize, row.fileMimeType, row.documentLanguage]);
      let fingerprint = this.fingerprints.get(identity);
      if (!fingerprint) {
        fingerprint = (async () => {
          if (!(Number(row.fileSize) > 0) || row.fileMimeType !== "application/pdf") return null;
          const attachment = await this.readText(legacyWorkFileKey(epoch, row.slug as string));
          if (attachment === undefined) throw new Error("Legacy approved attachment is unavailable");
          const file = decodeLegacyWorkFile(attachment, row);
          return createHash("sha256").update(Buffer.from(file.fileData as string, "base64")).digest("hex");
        })();
        this.fingerprints.set(identity, fingerprint);
        void fingerprint.catch(() => this.fingerprints.delete(identity));
      }
      records.push({ ...row, sourceFileSHA256: await fingerprint });
    }
    return JSON.stringify({ ...entry, records });
  }
}
