import { z } from "zod";
import { getConsultationProduct, isServiceValidForRegion } from "@workspace/api-zod";

export const MAX_CONTACT_FILES = 10;
export const MAX_CONTACT_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_CONTACT_TOTAL_BYTES = 7 * 1024 * 1024;

const allowedFileTypes = new Set([
  "application/pdf",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const attachmentSchema = z.object({
  name: z.string().trim().min(1).max(180),
  type: z.string().trim().min(1).max(100),
  data: z.string().min(1),
});

const contactInputSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(10).max(30),
  service: z.string().trim().min(1),
  consultationProduct: z.string().trim().min(1).default("comprehensive-consultation"),
  message: z.string().trim().min(10).max(5_000),
  region: z.enum(["uae", "sa", "syr"]),
  language: z.enum(["en", "ar"]),
  website: z.string().max(200).optional().default(""),
  attachments: z
    .array(attachmentSchema)
    .max(MAX_CONTACT_FILES)
    .optional()
    .default([]),
});

export type ContactAttachment = {
  name: string;
  type: string;
  data: string;
  size: number;
};

export type ContactInput = Omit<
  z.infer<typeof contactInputSchema>,
  "attachments"
> & {
  attachments: ContactAttachment[];
};

export class ContactInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactInputError";
  }
}

function hasValidMagicBytes(type: string, data: Buffer): boolean {
  if (type === "application/pdf")
    return data.subarray(0, 5).toString("ascii") === "%PDF-";
  if (type === "image/jpeg")
    return data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
  if (type === "image/png") {
    return data
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }
  if (type === "image/gif") {
    const header = data.subarray(0, 6).toString("ascii");
    return header === "GIF87a" || header === "GIF89a";
  }
  if (type === "image/webp") {
    return (
      data.subarray(0, 4).toString("ascii") === "RIFF" &&
      data.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }
  return false;
}

function cleanFileName(name: string): string {
  const baseName = name.replaceAll("\\", "/").split("/").pop()?.trim() ?? "";
  if (!baseName || /[\u0000-\u001f\u007f]/.test(baseName)) {
    throw new ContactInputError("An attachment has an invalid file name.");
  }
  return baseName;
}

function decodeAttachment(
  input: z.infer<typeof attachmentSchema>,
): ContactAttachment {
  if (!allowedFileTypes.has(input.type)) {
    throw new ContactInputError(
      "Attachments must be PDF, JPEG, PNG, GIF, or WebP files.",
    );
  }
  if (
    !/^[A-Za-z0-9+/]+={0,2}$/.test(input.data) ||
    input.data.length % 4 !== 0
  ) {
    throw new ContactInputError("An attachment is not valid Base64 data.");
  }

  const decoded = Buffer.from(input.data, "base64");
  if (!decoded.length || decoded.length > MAX_CONTACT_FILE_BYTES) {
    throw new ContactInputError("Each attachment must be 5 MB or smaller.");
  }
  if (!hasValidMagicBytes(input.type, decoded)) {
    throw new ContactInputError(
      "An attachment's contents do not match its file type.",
    );
  }

  return {
    name: cleanFileName(input.name),
    type: input.type,
    data: input.data,
    size: decoded.length,
  };
}

export function parseContactInput(value: unknown): ContactInput {
  const result = contactInputSchema.safeParse(value);
  if (!result.success) {
    throw new ContactInputError(
      result.error.issues[0]?.message ?? "Invalid consultation request.",
    );
  }

  if (!/^[+\d][\d\s().-]{8,28}\d$/.test(result.data.phone)) {
    throw new ContactInputError("Enter a valid phone number.");
  }
  if (!isServiceValidForRegion(result.data.region, result.data.service)) {
    throw new ContactInputError("That service is not available for this region.");
  }
  if (!getConsultationProduct(result.data.consultationProduct)) {
    throw new ContactInputError("That consultation product is not available.");
  }
  if (/[\u0000-\u001f\u007f]/.test(result.data.name)) {
    throw new ContactInputError("The name contains unsupported characters.");
  }
  if (
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(result.data.message)
  ) {
    throw new ContactInputError("The message contains unsupported characters.");
  }

  const attachments = result.data.attachments.map(decodeAttachment);
  const totalBytes = attachments.reduce(
    (sum: number, attachment: ContactAttachment) => sum + attachment.size,
    0,
  );
  if (totalBytes > MAX_CONTACT_TOTAL_BYTES) {
    throw new ContactInputError(
      "Attachments must be 7 MB or smaller in total.",
    );
  }

  return { ...result.data, attachments };
}
