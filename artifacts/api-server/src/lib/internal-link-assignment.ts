import { blogPostsTable, db, workSamplesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./logger.js";
import { extractResponsesOutputText } from "./openai-response.js";

const SERVICE_CATALOG = [
  ["family-law", "family divorce custody inheritance marriage personal status الأسرة طلاق حضانة ميراث زواج أحوال شخصية"],
  ["business-law", "business commercial trade corporate company contracts أعمال تجاري تجارة شركات عقود"],
  ["real-estate", "real estate property land lease rent ownership عقار عقارات ملكية إيجار أرض"],
  ["employment-law", "employment labor employee employer wages dismissal عمل عمال موظف أجور فصل"],
  ["foreign-investment", "foreign investment investor licensing تأسيس استثمار أجنبي مستثمر ترخيص"],
  ["administrative-law", "administrative government authority public decision إداري حكومة جهة قرار"],
  ["arbitration", "arbitration dispute award تحكيم نزاع حكم"],
  ["enforcement", "enforcement execution judgment debt تنفيذ حكم دين"],
  ["companies-law", "company companies shareholder partner governance شركة شركات مساهم شريك حوكمة"],
  ["contracts", "contract agreement drafting review عقد عقود اتفاقية صياغة مراجعة"],
  ["criminal-law", "criminal crime defense prosecution جنائي جزائي جريمة دفاع نيابة"],
  ["banking-finance", "bank banking finance loan credit بنك مصرف تمويل قرض ائتمان"],
  ["intellectual-property", "intellectual property trademark copyright patent ملكية فكرية علامة حقوق مؤلف براءة"],
  ["tax-zakat", "tax zakat vat customs ضريبة زكاة قيمة مضافة جمارك"],
  ["cyber-law", "cyber data privacy digital online إلكتروني سيبراني بيانات خصوصية رقمي"],
  ["medical-malpractice", "medical malpractice patient hospital doctor طبي خطأ طبي مريض مستشفى طبيب"],
  ["insurance-law", "insurance claim policy coverage تأمين مطالبة وثيقة تغطية"],
  ["civil-law", "civil liability damages obligation مدني مسؤولية تعويض التزام"],
  ["civil-procedure", "civil procedure court claim evidence مرافعات مدنية محكمة دعوى إثبات"],
  ["criminal-procedure", "criminal procedure investigation arrest trial أصول جزائية تحقيق توقيف محاكمة"],
] as const;

export interface InternalLinkAssignment {
  relatedServiceSlugs: string[];
  relatedBlogSlugs: string[];
  relatedWorkSlugs: string[];
  assignedBy: "openai" | "fallback";
}

interface AssignmentTarget {
  kind: "blog" | "work";
  slug: string;
  title: string;
  summary: string;
  body: string;
}

interface Candidate {
  slug: string;
  title: string;
  summary: string;
}

const WORD_RE = /[\p{L}\p{N}]{3,}/gu;

function words(value: string): Set<string> {
  return new Set((value.toLowerCase().match(WORD_RE) ?? []).slice(0, 500));
}

function overlapScore(source: Set<string>, candidate: string): number {
  let score = 0;
  for (const word of words(candidate)) {
    if (source.has(word)) score += 1;
  }
  return score;
}

function rankCandidates(source: string, candidates: Candidate[], limit: number): string[] {
  const sourceWords = words(source);
  return candidates
    .map((candidate, index) => ({
      slug: candidate.slug,
      index,
      score: overlapScore(sourceWords, `${candidate.title} ${candidate.summary}`),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ slug }) => slug);
}

function fallbackAssignment(
  target: AssignmentTarget,
  blogs: Candidate[],
  work: Candidate[],
): InternalLinkAssignment {
  const source = `${target.title} ${target.summary} ${target.body}`;
  const sourceWords = words(source);
  const service = SERVICE_CATALOG
    .map(([slug, keywords], index) => ({
      slug,
      index,
      score: overlapScore(sourceWords, keywords),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)[0]?.slug ?? "contracts";

  return {
    relatedServiceSlugs: [service],
    relatedBlogSlugs: rankCandidates(source, blogs, 3),
    relatedWorkSlugs: rankCandidates(source, work, 3),
    assignedBy: "fallback",
  };
}

function uniqueAllowed(values: unknown, allowed: Set<string>, limit: number): string[] {
  if (!Array.isArray(values)) return [];
  const result: string[] = [];
  for (const value of values) {
    if (typeof value === "string" && allowed.has(value) && !result.includes(value)) {
      result.push(value);
      if (result.length === limit) break;
    }
  }
  return result;
}

async function askOpenAI(
  target: AssignmentTarget,
  blogs: Candidate[],
  work: Candidate[],
): Promise<InternalLinkAssignment | null> {
  const apiKey = process.env["OPENAI_API_KEY"]?.trim();
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: process.env["OPENAI_INTERNAL_LINK_MODEL"]?.trim() || "gpt-5.6",
        input: [
          {
            role: "system",
            content:
              "You assign SEO internal links for a bilingual legal-services website. Select only candidate slugs supplied by the user. Choose the most topically relevant service and up to three genuinely related articles and work samples. Never invent a slug.",
          },
          {
            role: "user",
            content: JSON.stringify({
              target: {
                kind: target.kind,
                slug: target.slug,
                title: target.title.slice(0, 300),
                summary: target.summary.slice(0, 900),
                body: target.body.slice(0, 6_000),
              },
              serviceCandidates: SERVICE_CATALOG.map(([slug, keywords]) => ({ slug, keywords })),
              blogCandidates: blogs.slice(0, 40),
              workCandidates: work.slice(0, 40),
            }),
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "internal_link_assignment",
            strict: true,
            schema: {
              type: "object",
              properties: {
                relatedServiceSlugs: {
                  type: "array",
                  items: { type: "string" },
                  minItems: 1,
                  maxItems: 2,
                },
                relatedBlogSlugs: {
                  type: "array",
                  items: { type: "string" },
                  maxItems: 3,
                },
                relatedWorkSlugs: {
                  type: "array",
                  items: { type: "string" },
                  maxItems: 3,
                },
              },
              required: ["relatedServiceSlugs", "relatedBlogSlugs", "relatedWorkSlugs"],
              additionalProperties: false,
            },
          },
        },
      }),
    });
    if (!response.ok) {
      logger.warn({ status: response.status }, "OpenAI internal-link assignment failed");
      return null;
    }
    const payload: unknown = await response.json();
    const outputText = extractResponsesOutputText(payload);
    if (!outputText) {
      logger.warn("OpenAI internal-link assignment returned no text output");
      return null;
    }
    const parsed = JSON.parse(outputText) as Record<string, unknown>;
    const relatedServiceSlugs = uniqueAllowed(
      parsed.relatedServiceSlugs,
      new Set(SERVICE_CATALOG.map(([slug]) => slug)),
      2,
    );
    if (!relatedServiceSlugs.length) return null;
    return {
      relatedServiceSlugs,
      relatedBlogSlugs: uniqueAllowed(parsed.relatedBlogSlugs, new Set(blogs.map(({ slug }) => slug)), 3),
      relatedWorkSlugs: uniqueAllowed(parsed.relatedWorkSlugs, new Set(work.map(({ slug }) => slug)), 3),
      assignedBy: "openai",
    };
  } catch (error) {
    logger.warn({ err: error }, "OpenAI internal-link assignment unavailable");
    return null;
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

export async function assignInternalLinks(target: AssignmentTarget): Promise<InternalLinkAssignment> {
  const [publishedBlogs, publishedWork] = await Promise.all([
    db.select({
      slug: blogPostsTable.slug,
      titleEn: blogPostsTable.titleEn,
      titleAr: blogPostsTable.titleAr,
      excerptEn: blogPostsTable.excerptEn,
      excerptAr: blogPostsTable.excerptAr,
    }).from(blogPostsTable).where(eq(blogPostsTable.published, true)),
    db.select({
      slug: workSamplesTable.slug,
      titleEn: workSamplesTable.titleEn,
      titleAr: workSamplesTable.titleAr,
      summaryEn: workSamplesTable.summaryEn,
      summaryAr: workSamplesTable.summaryAr,
    }).from(workSamplesTable).where(eq(workSamplesTable.published, true)),
  ]);

  const blogs = publishedBlogs
    .filter(({ slug }) => slug !== target.slug)
    .map((item) => ({
      slug: item.slug,
      title: item.titleEn || item.titleAr,
      summary: item.excerptEn || item.excerptAr,
    }));
  const work = publishedWork
    .filter(({ slug }) => slug !== target.slug)
    .map((item) => ({
      slug: item.slug,
      title: item.titleEn || item.titleAr,
      summary: item.summaryEn || item.summaryAr,
    }));

  return (await askOpenAI(target, blogs, work)) ?? fallbackAssignment(target, blogs, work);
}
