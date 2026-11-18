import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { publicWorkDocumentPath, type WorkDocumentMetadata } from "../../../../lib/api-zod/src/public-work-documents.js";
import type { PublicWorkDocumentRevision, PublicWorkDocumentEditionMetadata } from "../../../../lib/api-zod/src/public-work-document-revisions.js";

type Source = WorkDocumentMetadata & { sourceFileSHA256?: string | null; fileData?: string; confidentialityConfirmed?: boolean };
export type ResolvedWorkDocumentRevision = { metadata: PublicWorkDocumentRevision; pdf: Buffer; text: Buffer };
export type WorkDocumentRevisionResolver = (sample: Source, sourceSHA256?: string) => ResolvedWorkDocumentRevision | undefined;
const digest = (data: Buffer) => createHash("sha256").update(data).digest("hex");
const safeSegment = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const sha256 = /^[a-f0-9]{64}$/;

/** Private assets are never mounted as static files. Every lookup requires the current CMS source. */
export function createWorkDocumentRevisionResolver(assetRoot: string): WorkDocumentRevisionResolver {
  return (sample, sourceSHA256 = sample.sourceFileSHA256 ?? "") => {
    if (!publicWorkDocumentPath(sample) || !sha256.test(sourceSHA256)) return undefined;
    try {
      const manifest = JSON.parse(readFileSync(resolve(assetRoot, "manifest.json"), "utf8"));
      if (manifest.version !== 1 || !Array.isArray(manifest.documents)) return undefined;
      // Duplicate entries are ambiguous; neither may override the current source.
      const entries = manifest.documents.filter((entry: PublicWorkDocumentRevision) => entry?.slug === sample.slug);
      if (entries.length !== 1) return undefined;
      const entry: PublicWorkDocumentRevision = entries[0];
      const sourceTime = new Date(sample.updatedAt ?? "").getTime();
      if (!safeSegment.test(entry.edition) || !Number.isFinite(sourceTime) ||
          sourceTime !== new Date(entry.sourceUpdatedAt).getTime() ||
          !Number.isFinite(new Date(entry.editionPublishedAt).getTime()) ||
          entry.sourceFileSize !== sample.fileSize || entry.sourceSHA256 !== sourceSHA256 ||
          entry.sourceDocumentLanguage !== sample.documentLanguage ||
          !["ar", "en", "bilingual"].includes(entry.documentLanguage) ||
          !Number.isSafeInteger(entry.pageCount) || entry.pageCount < 1 ||
          !sha256.test(entry.pdfSHA256) || !sha256.test(entry.textSHA256)) return undefined;
      const pdf = readFileSync(resolve(assetRoot, entry.edition, `${entry.slug}.pdf`));
      const text = readFileSync(resolve(assetRoot, entry.edition, `${entry.slug}.txt`));
      if (pdf.length !== entry.pdfFileSize || text.length !== entry.textFileSize ||
          pdf.subarray(0, 5).toString("ascii") !== "%PDF-" || !text.toString("utf8").trim() ||
          digest(pdf) !== entry.pdfSHA256 || digest(text) !== entry.textSHA256) return undefined;
      return { metadata: entry, pdf, text };
    } catch {
      // Missing or corrupt deployment assets never replace the CMS attachment.
      return undefined;
    }
  };
}

const moduleDirectory = dirname(fileURLToPath(import.meta.url));
const bundledResolver = createWorkDocumentRevisionResolver(resolve(moduleDirectory, "assets/work-document-revisions"));
const sourceResolver = createWorkDocumentRevisionResolver(resolve(moduleDirectory, "../../assets/work-document-revisions"));
export const resolveWorkDocumentRevision: WorkDocumentRevisionResolver = (sample, hash) =>
  bundledResolver(sample, hash) ?? sourceResolver(sample, hash);

/** Omit the source fingerprint from public JSON/bootstrap, including the no-edition fallback. */
export function publicWorkDocumentMetadata<T extends Source>(
  sample: T,
  resolveRevision: WorkDocumentRevisionResolver = resolveWorkDocumentRevision,
): Omit<T, "sourceFileSHA256" | "fileData" | "confidentialityConfirmed"> & PublicWorkDocumentEditionMetadata {
  const revision = resolveRevision(sample);
  const { sourceFileSHA256: _sourceHash, fileData: _fileData, confidentialityConfirmed: _confidentiality, ...publicSample } = sample;
  if (!revision) return publicSample;
  return {
    ...publicSample,
    fileSize: revision.pdf.length,
    documentLanguage: revision.metadata.documentLanguage,
    documentEdition: revision.metadata.edition,
    documentEditionPublishedAt: revision.metadata.editionPublishedAt,
    documentTextUrl: `/documents/${sample.slug}.txt`,
  };
}
