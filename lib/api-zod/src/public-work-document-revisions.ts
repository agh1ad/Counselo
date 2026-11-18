/** A local edition replaces only the exact published CMS source reviewed for it. */
export interface PublicWorkDocumentRevision {
  slug: string;
  sourceUpdatedAt: string;
  sourceFileSize: number;
  sourceSHA256: string;
  sourceDocumentLanguage: string;
  edition: string;
  editionPublishedAt: string;
  pdfSHA256: string;
  pdfFileSize: number;
  textSHA256: string;
  textFileSize: number;
  documentLanguage: "ar" | "en" | "bilingual";
  pageCount: number;
}

export interface PublicWorkDocumentRevisionManifest {
  version: 1;
  documents: PublicWorkDocumentRevision[];
}

/** These fields are attached only after the server checks the source and edition bytes. */
export interface PublicWorkDocumentEditionMetadata {
  documentEdition?: string;
  documentEditionPublishedAt?: string;
  documentTextUrl?: string;
}
