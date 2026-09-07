/** Approval applies to one reviewed revision, never to every attachment on a work page. */
export interface PublicWorkDocumentApproval {
  workSlug: string;
  documentSlug: string;
  updatedAt: string;
  sha256: string;
  confidentialityReviewed: true;
  redactionReviewed: true;
  publicationRightsConfirmed: true;
  indexingApproved: true;
}

// Add entries only after express editorial approval. No existing files are opted in.
export const PUBLIC_WORK_DOCUMENT_APPROVALS: readonly PublicWorkDocumentApproval[] = [];

export interface WorkDocumentMetadata {
  slug: string;
  published: boolean;
  updatedAt?: string | Date | null;
  fileSize: number;
  fileMimeType: string;
}

export function publicWorkDocumentPath(
  sample: WorkDocumentMetadata,
  approvals: readonly PublicWorkDocumentApproval[] = PUBLIC_WORK_DOCUMENT_APPROVALS,
): string | undefined {
  const time = sample.updatedAt ? new Date(sample.updatedAt).getTime() : NaN;
  const revision = Number.isFinite(time) ? new Date(time).toISOString() : undefined;
  const approval = approvals.find((entry) => entry.workSlug === sample.slug && entry.updatedAt === revision);
  if (!sample.published || sample.fileSize <= 0 || sample.fileMimeType !== "application/pdf" ||
      !approval || !approval.confidentialityReviewed || !approval.redactionReviewed ||
      !approval.publicationRightsConfirmed || !approval.indexingApproved ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(approval.documentSlug) ||
      !/^[a-f0-9]{64}$/.test(approval.sha256)) return undefined;
  return `/documents/${approval.documentSlug}.pdf`;
}

export function workAttachmentPath(sample: WorkDocumentMetadata): string {
  return publicWorkDocumentPath(sample) ?? `/api/work/${encodeURIComponent(sample.slug)}/file`;
}
