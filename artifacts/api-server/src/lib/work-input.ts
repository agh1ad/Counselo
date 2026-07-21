import type { InsertWorkSample, WorkSample } from "@workspace/db";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export class WorkInputError extends Error {}

type ExistingFile = Pick<WorkSample, "fileName" | "fileMimeType" | "fileSize" | "fileData">;

function requireRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new WorkInputError("Invalid work sample payload");
  }
  return value as Record<string, unknown>;
}

function stringField(body: Record<string, unknown>, key: string, max: number): string {
  const value = body[key];
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") throw new WorkInputError(`${key} must be text`);
  const cleaned = value.replace(/\0/g, "").trim();
  if (cleaned.length > max) throw new WorkInputError(`${key} is too long`);
  return cleaned;
}

function validFileSignature(buffer: Buffer, mime: string): boolean {
  if (mime === "application/pdf") return buffer.subarray(0, 5).toString("ascii") === "%PDF-";
  if (mime === "image/jpeg") return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (mime === "image/png") return buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (mime === "image/webp") return buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP";
  return false;
}

function safeFileName(value: string): string {
  return value.replace(/[\\/]/g, "-").replace(/[^\p{L}\p{N}._ -]/gu, "").slice(0, 180).trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max + 1).replace(/\s+\S*$/, "").trim();
}

function brandedTitle(title: string, arabic: boolean): string {
  if (!title) return "";
  if (/(?:CounselO|كاونسلو)$/i.test(title)) return truncate(title, 70);
  const suffix = arabic ? " | كاونسلو" : " | CounselO";
  return `${truncate(title, 70 - suffix.length)}${suffix}`;
}

export function parseWorkSampleInput(
  input: unknown,
  options: { existingSlug?: string; existingFile?: ExistingFile } = {},
): InsertWorkSample {
  const body = requireRecord(input);
  const slug = stringField(body, "slug", 200);
  if (!SLUG_PATTERN.test(slug) && slug !== options.existingSlug) {
    throw new WorkInputError("slug must use lowercase letters, numbers, and single hyphens");
  }

  const date = stringField(body, "date", 10);
  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  if (!DATE_PATTERN.test(date) || Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) {
    throw new WorkInputError("date must be valid and use YYYY-MM-DD");
  }

  const titleEn = stringField(body, "titleEn", 220);
  const titleAr = stringField(body, "titleAr", 220);
  const summaryEn = stringField(body, "summaryEn", 700);
  const summaryAr = stringField(body, "summaryAr", 700);
  const challengeEn = stringField(body, "challengeEn", 2500);
  const challengeAr = stringField(body, "challengeAr", 2500);
  const approachEn = stringField(body, "approachEn", 2500);
  const approachAr = stringField(body, "approachAr", 2500);
  const outcomeEn = stringField(body, "outcomeEn", 1800);
  const outcomeAr = stringField(body, "outcomeAr", 1800);
  const published = body.published === true || body.published === "true";
  const confidentialityConfirmed = body.confidentialityConfirmed === true || body.confidentialityConfirmed === "true";

  if (!titleEn && !titleAr) throw new WorkInputError("Add an English or Arabic title");
  if (titleEn && !summaryEn) throw new WorkInputError("English title requires an English summary");
  if (titleAr && !summaryAr) throw new WorkInputError("Arabic title requires an Arabic summary");

  const documentLanguage = stringField(body, "documentLanguage", 16) || "ar";
  if (!new Set(["ar", "en", "bilingual"]).has(documentLanguage)) {
    throw new WorkInputError("documentLanguage must be ar, en, or bilingual");
  }

  let fileName = options.existingFile?.fileName ?? "";
  let fileMimeType = options.existingFile?.fileMimeType ?? "";
  let fileSize = options.existingFile?.fileSize ?? 0;
  let fileData = options.existingFile?.fileData ?? "";
  const incomingFileData = stringField(body, "fileData", 11_200_000);
  if (incomingFileData) {
    const incomingMime = stringField(body, "fileMimeType", 100);
    const incomingName = safeFileName(stringField(body, "fileName", 220));
    if (!ALLOWED_MIME_TYPES.has(incomingMime)) throw new WorkInputError("Upload a PDF, JPG, PNG, or WebP file");
    if (!incomingName) throw new WorkInputError("The uploaded file needs a valid name");
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(incomingFileData)) throw new WorkInputError("The uploaded file is invalid");
    const decoded = Buffer.from(incomingFileData, "base64");
    if (!decoded.length || decoded.length > MAX_FILE_BYTES) throw new WorkInputError("The uploaded file must be 8 MB or smaller");
    if (!validFileSignature(decoded, incomingMime)) throw new WorkInputError("The file contents do not match its file type");
    fileName = incomingName;
    fileMimeType = incomingMime;
    fileSize = decoded.length;
    fileData = incomingFileData;
  }

  const workTypeEn = stringField(body, "workTypeEn", 140);
  const workTypeAr = stringField(body, "workTypeAr", 140);
  const jurisdictionEn = stringField(body, "jurisdictionEn", 140);
  const jurisdictionAr = stringField(body, "jurisdictionAr", 140);

  if (published) {
    if (!fileData) throw new WorkInputError("Upload a redacted document before publishing");
    if (!confidentialityConfirmed) throw new WorkInputError("Confirm confidentiality and redaction before publishing");
    if (!(workTypeEn || workTypeAr) || !(jurisdictionEn || jurisdictionAr)) {
      throw new WorkInputError("Work type and jurisdiction are required before publishing");
    }
    if (!(challengeEn || challengeAr) || !(approachEn || approachAr)) {
      throw new WorkInputError("Challenge and work performed are required before publishing");
    }
  }

  const seoTitleEn = stringField(body, "seoTitleEn", 300) || brandedTitle(titleEn, false);
  const seoTitleAr = stringField(body, "seoTitleAr", 300) || brandedTitle(titleAr, true);
  const seoDescriptionEn = stringField(body, "seoDescriptionEn", 500) || truncate(summaryEn, 160);
  const seoDescriptionAr = stringField(body, "seoDescriptionAr", 500) || truncate(summaryAr, 160);

  if (published) {
    for (const [locale, title, description] of [
      ["English", titleEn ? seoTitleEn : "", titleEn ? seoDescriptionEn : ""],
      ["Arabic", titleAr ? seoTitleAr : "", titleAr ? seoDescriptionAr : ""],
    ] as const) {
      if (!title) continue;
      if (title.length < 20 || title.length > 70) {
        throw new WorkInputError(`${locale} SEO title must be 20–70 characters before publishing`);
      }
      if (description.length < 80 || description.length > 170) {
        throw new WorkInputError(`${locale} SEO description must be 80–170 characters before publishing`);
      }
    }
  }

  return {
    slug,
    date,
    titleEn,
    titleAr,
    summaryEn,
    summaryAr,
    workTypeEn,
    workTypeAr,
    jurisdictionEn,
    jurisdictionAr,
    clientTypeEn: stringField(body, "clientTypeEn", 140),
    clientTypeAr: stringField(body, "clientTypeAr", 140),
    challengeEn,
    challengeAr,
    approachEn,
    approachAr,
    outcomeEn,
    outcomeAr,
    seoTitleEn,
    seoTitleAr,
    seoDescriptionEn,
    seoDescriptionAr,
    documentLanguage,
    fileName,
    fileMimeType,
    fileSize,
    fileData,
    confidentialityConfirmed,
    featured: body.featured === true || body.featured === "true",
    published,
  };
}

export function publicWorkSample(sample: WorkSample): Omit<WorkSample, "fileData" | "confidentialityConfirmed"> & { hasFile: boolean } {
  const { fileData, confidentialityConfirmed: _confirmed, ...safe } = sample;
  return { ...safe, hasFile: Boolean(fileData) };
}
