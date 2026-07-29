import type { BlogSection, InsertBlogPost, InsertWorkSample } from "@workspace/db";
import { logger } from "./logger.js";
import { extractResponsesOutputText } from "./openai-response.js";

export class ContentTranslationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentTranslationError";
  }
}

type BlogTranslation = {
  categoryEn: string;
  categoryAr: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  seoTitleEn: string;
  seoTitleAr: string;
  seoDescriptionEn: string;
  seoDescriptionAr: string;
  bodyEn: string;
  bodyAr: string;
  contentEn: BlogSection[];
  contentAr: BlogSection[];
};

type WorkTranslation = {
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  workTypeEn: string;
  workTypeAr: string;
  jurisdictionEn: string;
  jurisdictionAr: string;
  clientTypeEn: string;
  clientTypeAr: string;
  challengeEn: string;
  challengeAr: string;
  approachEn: string;
  approachAr: string;
  outcomeEn: string;
  outcomeAr: string;
  seoTitleEn: string;
  seoTitleAr: string;
  seoDescriptionEn: string;
  seoDescriptionAr: string;
};

const stringSchema = { type: "string" } as const;
const seoTitleSchema = { type: "string", minLength: 20, maxLength: 70 } as const;
const seoDescriptionSchema = { type: "string", minLength: 80, maxLength: 170 } as const;
const sectionSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      heading: stringSchema,
      body: stringSchema,
    },
    required: ["heading", "body"],
    additionalProperties: false,
  },
} as const;

const blogTranslationSchema = {
  type: "object",
  properties: {
    categoryEn: stringSchema,
    categoryAr: stringSchema,
    titleEn: stringSchema,
    titleAr: stringSchema,
    excerptEn: stringSchema,
    excerptAr: stringSchema,
    seoTitleEn: seoTitleSchema,
    seoTitleAr: seoTitleSchema,
    seoDescriptionEn: seoDescriptionSchema,
    seoDescriptionAr: seoDescriptionSchema,
    bodyEn: stringSchema,
    bodyAr: stringSchema,
    contentEn: sectionSchema,
    contentAr: sectionSchema,
  },
  required: [
    "categoryEn",
    "categoryAr",
    "titleEn",
    "titleAr",
    "excerptEn",
    "excerptAr",
    "seoTitleEn",
    "seoTitleAr",
    "seoDescriptionEn",
    "seoDescriptionAr",
    "bodyEn",
    "bodyAr",
    "contentEn",
    "contentAr",
  ],
  additionalProperties: false,
} as const;

const workTranslationSchema = {
  type: "object",
  properties: {
    titleEn: stringSchema,
    titleAr: stringSchema,
    summaryEn: stringSchema,
    summaryAr: stringSchema,
    workTypeEn: stringSchema,
    workTypeAr: stringSchema,
    jurisdictionEn: stringSchema,
    jurisdictionAr: stringSchema,
    clientTypeEn: stringSchema,
    clientTypeAr: stringSchema,
    challengeEn: stringSchema,
    challengeAr: stringSchema,
    approachEn: stringSchema,
    approachAr: stringSchema,
    outcomeEn: stringSchema,
    outcomeAr: stringSchema,
    seoTitleEn: seoTitleSchema,
    seoTitleAr: seoTitleSchema,
    seoDescriptionEn: seoDescriptionSchema,
    seoDescriptionAr: seoDescriptionSchema,
  },
  required: [
    "titleEn",
    "titleAr",
    "summaryEn",
    "summaryAr",
    "workTypeEn",
    "workTypeAr",
    "jurisdictionEn",
    "jurisdictionAr",
    "clientTypeEn",
    "clientTypeAr",
    "challengeEn",
    "challengeAr",
    "approachEn",
    "approachAr",
    "outcomeEn",
    "outcomeAr",
    "seoTitleEn",
    "seoTitleAr",
    "seoDescriptionEn",
    "seoDescriptionAr",
  ],
  additionalProperties: false,
} as const;

function nonEmpty(value: unknown): boolean {
  return typeof value === "string" ? Boolean(value.trim()) : Array.isArray(value) && value.length > 0;
}

function needsSeoRepair(key: string, value: unknown): boolean {
  if (typeof value !== "string") return false;
  const length = value.trim().length;
  if (key.startsWith("seoTitle")) return length < 20 || length > 70;
  if (key.startsWith("seoDescription")) return length < 80 || length > 170;
  return false;
}

function hasValidSeo(title: unknown, description: unknown): boolean {
  const titleLength = typeof title === "string" ? title.trim().length : 0;
  const descriptionLength =
    typeof description === "string" ? description.trim().length : 0;
  return (
    titleLength >= 20 &&
    titleLength <= 70 &&
    descriptionLength >= 80 &&
    descriptionLength <= 170
  );
}

function missingPatch<T extends Record<string, unknown>>(current: T, translated: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(translated).filter(
      ([key, value]) =>
        (!nonEmpty(current[key]) || needsSeoRepair(key, current[key])) &&
        nonEmpty(value),
    ),
  ) as Partial<T>;
}

function isCompleteBlog(values: InsertBlogPost): boolean {
  return Boolean(
    values.categoryEn &&
    values.categoryAr &&
    values.titleEn &&
    values.titleAr &&
    values.excerptEn &&
    values.excerptAr &&
    hasValidSeo(values.seoTitleEn, values.seoDescriptionEn) &&
    hasValidSeo(values.seoTitleAr, values.seoDescriptionAr) &&
    (values.bodyEn || (values.contentEn?.length ?? 0)) &&
    (values.bodyAr || (values.contentAr?.length ?? 0)),
  );
}

function isCompleteWork(values: InsertWorkSample): boolean {
  const fields: (keyof WorkTranslation)[] = [
    "titleEn",
    "titleAr",
    "summaryEn",
    "summaryAr",
    "workTypeEn",
    "workTypeAr",
    "jurisdictionEn",
    "jurisdictionAr",
    "clientTypeEn",
    "clientTypeAr",
    "challengeEn",
    "challengeAr",
    "approachEn",
    "approachAr",
    "outcomeEn",
    "outcomeAr",
  ];
  return (
    fields.every((field) => nonEmpty(values[field])) &&
    hasValidSeo(values.seoTitleEn, values.seoDescriptionEn) &&
    hasValidSeo(values.seoTitleAr, values.seoDescriptionAr)
  );
}

async function requestStructuredTranslation<T>(
  name: string,
  schema: Record<string, unknown>,
  content: Record<string, unknown>,
): Promise<T> {
  const apiKey = process.env["OPENAI_API_KEY"]?.trim();
  if (!apiKey) {
    throw new ContentTranslationError("OPENAI_API_KEY is required for bilingual publishing");
  }

  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), 90_000);
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: process.env["OPENAI_TRANSLATION_MODEL"]?.trim() || "gpt-5.6",
        reasoning: { effort: "low" },
        max_output_tokens: 24_000,
        input: [
          {
            role: "system",
            content:
              "You are the bilingual legal-content editor for CounselO. Return complete English and Arabic versions of the supplied legal content. Preserve every legal fact, qualification, citation, number, party role, jurisdiction, and outcome. Do not invent or strengthen claims. Use professional natural legal language rather than literal translation. Preserve HTML structure, allowed tags, and links in body fields. Keep section ordering identical. When the source article uses a body field, bodyEn and bodyAr must both contain the complete non-empty HTML article; content arrays may then remain empty. When it uses content sections, contentEn and contentAr must both contain every complete section. Produce search-focused SEO titles and descriptions for each language; titles must be 20–70 characters and descriptions 80–170 characters. Keep CounselO or كاونسلو branding natural. Output only the requested structured data.",
          },
          {
            role: "user",
            content: JSON.stringify(content),
          },
        ],
        text: {
          verbosity: "low",
          format: {
            type: "json_schema",
            name,
            strict: true,
            schema,
          },
        },
      }),
    });
    if (!response.ok) {
      logger.warn({ status: response.status, name }, "OpenAI content translation failed");
      throw new ContentTranslationError(`OpenAI translation failed with HTTP ${response.status}`);
    }
    const payload: unknown = await response.json();
    const outputText = extractResponsesOutputText(payload);
    if (!outputText) throw new ContentTranslationError("OpenAI translation returned no text output");
    return JSON.parse(outputText) as T;
  } catch (error) {
    if (error instanceof ContentTranslationError) throw error;
    logger.warn({ err: error, name }, "OpenAI content translation unavailable");
    throw new ContentTranslationError("Automatic translation could not be completed");
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

export async function translateBlogForPublishing(
  values: InsertBlogPost,
): Promise<Partial<InsertBlogPost>> {
  if (isCompleteBlog(values)) return {};
  const current: BlogTranslation = {
    categoryEn: values.categoryEn ?? "",
    categoryAr: values.categoryAr ?? "",
    titleEn: values.titleEn ?? "",
    titleAr: values.titleAr ?? "",
    excerptEn: values.excerptEn ?? "",
    excerptAr: values.excerptAr ?? "",
    seoTitleEn: values.seoTitleEn ?? "",
    seoTitleAr: values.seoTitleAr ?? "",
    seoDescriptionEn: values.seoDescriptionEn ?? "",
    seoDescriptionAr: values.seoDescriptionAr ?? "",
    bodyEn: values.bodyEn ?? "",
    bodyAr: values.bodyAr ?? "",
    contentEn: values.contentEn ?? [],
    contentAr: values.contentAr ?? [],
  };
  const translated = await requestStructuredTranslation<BlogTranslation>(
    "bilingual_blog_post",
    blogTranslationSchema,
    { kind: "blog_post", content: current },
  );
  return missingPatch(
    current as unknown as Record<string, unknown>,
    translated as unknown as Record<string, unknown>,
  ) as Partial<InsertBlogPost>;
}

export async function translateWorkForPublishing(
  values: InsertWorkSample,
): Promise<Partial<InsertWorkSample>> {
  if (isCompleteWork(values)) return {};
  const current: WorkTranslation = {
    titleEn: values.titleEn ?? "",
    titleAr: values.titleAr ?? "",
    summaryEn: values.summaryEn ?? "",
    summaryAr: values.summaryAr ?? "",
    workTypeEn: values.workTypeEn ?? "",
    workTypeAr: values.workTypeAr ?? "",
    jurisdictionEn: values.jurisdictionEn ?? "",
    jurisdictionAr: values.jurisdictionAr ?? "",
    clientTypeEn: values.clientTypeEn ?? "",
    clientTypeAr: values.clientTypeAr ?? "",
    challengeEn: values.challengeEn ?? "",
    challengeAr: values.challengeAr ?? "",
    approachEn: values.approachEn ?? "",
    approachAr: values.approachAr ?? "",
    outcomeEn: values.outcomeEn ?? "",
    outcomeAr: values.outcomeAr ?? "",
    seoTitleEn: values.seoTitleEn ?? "",
    seoTitleAr: values.seoTitleAr ?? "",
    seoDescriptionEn: values.seoDescriptionEn ?? "",
    seoDescriptionAr: values.seoDescriptionAr ?? "",
  };
  const translated = await requestStructuredTranslation<WorkTranslation>(
    "bilingual_work_sample",
    workTranslationSchema,
    { kind: "work_sample", content: current },
  );
  return missingPatch(
    current as unknown as Record<string, unknown>,
    translated as unknown as Record<string, unknown>,
  ) as Partial<InsertWorkSample>;
}
