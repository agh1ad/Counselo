import { PUBLIC_WORK_DOCUMENT_TEXT_METADATA, type PublicWorkDocumentTextMetadata } from "./public-work-document-text-metadata";
export { PUBLIC_WORK_DOCUMENT_TEXT_METADATA, type PublicWorkDocumentTextMetadata } from "./public-work-document-text-metadata";

export interface WorkDocumentMetadata {
  slug: string;
  published: boolean;
  updatedAt?: string | Date | null;
  fileSize: number;
  fileMimeType: string;
}

/** Published PDF attachments have stable, crawlable URLs outside the private API namespace. */
export function publicWorkDocumentPath(sample: WorkDocumentMetadata): string | undefined {
  if (sample.published !== true || !Number.isSafeInteger(sample.fileSize) || sample.fileSize <= 0 ||
      sample.fileMimeType !== "application/pdf" || typeof sample.slug !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(sample.slug)) return undefined;
  return `/documents/${sample.slug}.pdf`;
}

export function workAttachmentPath(sample: WorkDocumentMetadata): string {
  return publicWorkDocumentPath(sample) ?? `/api/work/${encodeURIComponent(sample.slug)}/file`;
}

/** Only a text alternative matching the current published PDF revision may be linked. */
export function publicWorkDocumentTextPath(
  sample: WorkDocumentMetadata,
  alternatives: readonly PublicWorkDocumentTextMetadata[] = PUBLIC_WORK_DOCUMENT_TEXT_METADATA,
): string | undefined {
  if (!publicWorkDocumentPath(sample)) return undefined;
  const source = alternatives.find(entry => entry.slug === sample.slug);
  const revisionTime = sample.updatedAt ? new Date(sample.updatedAt).getTime() : NaN;
  if (!source || !Number.isFinite(revisionTime) || revisionTime !== new Date(source.sourceUpdatedAt).getTime() ||
      sample.fileSize !== source.fileSize || !/^[a-f0-9]{64}$/.test(source.sourceSHA256)) return undefined;
  return `/documents/${sample.slug}.txt`;
}
