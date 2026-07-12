import type { BlogPost, BlogSection, InsertBlogPost } from "@workspace/db";
import sanitizeHtml from "sanitize-html";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export class BlogInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlogInputError";
  }
}

function requireRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new BlogInputError("Request body must be a JSON object");
  }
  return value as Record<string, unknown>;
}

function stringField(
  body: Record<string, unknown>,
  name: string,
  maxLength: number,
): string {
  const value = body[name] ?? "";
  if (typeof value !== "string") {
    throw new BlogInputError(`${name} must be a string`);
  }
  if (value.length > maxLength) {
    throw new BlogInputError(
      `${name} must be ${maxLength} characters or fewer`,
    );
  }
  return value.trim();
}

function richTextField(body: Record<string, unknown>, name: string): string {
  const value = body[name] ?? "";
  if (typeof value !== "string") {
    throw new BlogInputError(`${name} must be a string`);
  }
  if (value.length > 1_000_000) {
    throw new BlogInputError(`${name} is too large`);
  }
  return sanitizeRichText(value);
}

function sectionsField(
  body: Record<string, unknown>,
  name: string,
): BlogSection[] {
  const value = body[name] ?? [];
  if (!Array.isArray(value)) {
    throw new BlogInputError(`${name} must be an array`);
  }
  if (value.length > 200) {
    throw new BlogInputError(`${name} may contain at most 200 sections`);
  }
  return value.map((section, index) => {
    if (!section || typeof section !== "object" || Array.isArray(section)) {
      throw new BlogInputError(`${name}[${index}] must be an object`);
    }
    const record = section as Record<string, unknown>;
    if (typeof record.body !== "string" || !record.body.trim()) {
      throw new BlogInputError(
        `${name}[${index}].body must be a non-empty string`,
      );
    }
    if (record.heading !== undefined && typeof record.heading !== "string") {
      throw new BlogInputError(`${name}[${index}].heading must be a string`);
    }
    return {
      ...(typeof record.heading === "string" && record.heading.trim()
        ? { heading: record.heading.trim().slice(0, 300) }
        : {}),
      body: record.body.trim().slice(0, 20_000),
    };
  });
}

function stripHtml(html: string): string {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeRichText(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "hr",
      "h1",
      "h2",
      "h3",
      "blockquote",
      "pre",
      "code",
      "ul",
      "ol",
      "li",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "strike",
      "mark",
      "span",
      "a",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      "*": ["style"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedStyles: {
      "*": {
        "text-align": [/^(?:left|right|center|justify)$/],
        color: [
          /^#[0-9a-f]{3,8}$/i,
          /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/i,
        ],
        "background-color": [
          /^#[0-9a-f]{3,8}$/i,
          /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/i,
        ],
      },
    },
    transformTags: {
      a: (_tagName, attribs) => ({
        tagName: "a",
        attribs: {
          ...attribs,
          ...(attribs.target === "_blank"
            ? { rel: "noopener noreferrer" }
            : {}),
        },
      }),
    },
  });
}

export function parseBlogPostInput(
  input: unknown,
  options: { existingSlug?: string } = {},
): InsertBlogPost {
  const body = requireRecord(input);
  const slug = stringField(body, "slug", 200);
  if (!SLUG_PATTERN.test(slug) && slug !== options.existingSlug) {
    throw new BlogInputError(
      "slug must use lowercase letters, numbers, and single hyphens",
    );
  }

  const date = stringField(body, "date", 10);
  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  if (
    !DATE_PATTERN.test(date) ||
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    throw new BlogInputError("date must be a valid date in YYYY-MM-DD format");
  }

  const rawReadTime = body.readTime ?? 5;
  const readTime =
    typeof rawReadTime === "number"
      ? rawReadTime
      : typeof rawReadTime === "string"
        ? Number(rawReadTime)
        : Number.NaN;
  if (!Number.isInteger(readTime) || readTime < 1 || readTime > 60) {
    throw new BlogInputError("readTime must be an integer between 1 and 60");
  }

  const titleEn = stringField(body, "titleEn", 300);
  const titleAr = stringField(body, "titleAr", 300);
  const bodyEn = richTextField(body, "bodyEn");
  const bodyAr = richTextField(body, "bodyAr");
  const contentEn = sectionsField(body, "contentEn");
  const contentAr = sectionsField(body, "contentAr");

  if (!titleEn && !titleAr) {
    throw new BlogInputError("At least one localized title is required");
  }
  if (!bodyEn && !bodyAr && contentEn.length === 0 && contentAr.length === 0) {
    throw new BlogInputError("At least one localized article body is required");
  }

  const plainEn = stripHtml(bodyEn);
  const plainAr = stripHtml(bodyAr);

  return {
    slug,
    date,
    categoryEn: stringField(body, "categoryEn", 120),
    categoryAr: stringField(body, "categoryAr", 120),
    readTime,
    titleEn,
    titleAr,
    excerptEn: stringField(body, "excerptEn", 500) || plainEn.slice(0, 250),
    excerptAr: stringField(body, "excerptAr", 500) || plainAr.slice(0, 250),
    seoTitleEn: stringField(body, "seoTitleEn", 300) || titleEn,
    seoTitleAr: stringField(body, "seoTitleAr", 300) || titleAr,
    seoDescriptionEn:
      stringField(body, "seoDescriptionEn", 500) || plainEn.slice(0, 160),
    seoDescriptionAr:
      stringField(body, "seoDescriptionAr", 500) || plainAr.slice(0, 160),
    bodyEn,
    bodyAr,
    contentEn,
    contentAr,
    published: body.published === true || body.published === "true",
  };
}

export function sanitizeBlogPost(post: BlogPost): BlogPost {
  return {
    ...post,
    bodyEn: sanitizeRichText(post.bodyEn),
    bodyAr: sanitizeRichText(post.bodyAr),
  };
}

export function parsePositiveId(value: unknown): number {
  const id = typeof value === "string" ? Number(value) : Number.NaN;
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new BlogInputError("id must be a positive integer");
  }
  return id;
}
