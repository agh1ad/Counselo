import { blogPostsTable, db, selectBlogPostSchema, selectWorkSampleSchema, workSamplesTable } from "@workspace/db";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { publicationDataCache } from "./publication-data-cache.js";

const { fileData: _file, confidentialityConfirmed: _approval, ...workColumns } = getTableColumns(workSamplesTable);
type Blog = typeof blogPostsTable.$inferSelect;
type Work = Omit<typeof workSamplesTable.$inferSelect, "fileData" | "confidentialityConfirmed">;

const workSummaryColumns = {
  id: workSamplesTable.id,
  slug: workSamplesTable.slug,
  date: workSamplesTable.date,
  titleEn: workSamplesTable.titleEn,
  titleAr: workSamplesTable.titleAr,
  summaryEn: workSamplesTable.summaryEn,
  summaryAr: workSamplesTable.summaryAr,
  workTypeEn: workSamplesTable.workTypeEn,
  workTypeAr: workSamplesTable.workTypeAr,
  jurisdictionEn: workSamplesTable.jurisdictionEn,
  jurisdictionAr: workSamplesTable.jurisdictionAr,
  clientTypeEn: workSamplesTable.clientTypeEn,
  clientTypeAr: workSamplesTable.clientTypeAr,
  documentLanguage: workSamplesTable.documentLanguage,
  fileMimeType: workSamplesTable.fileMimeType,
  fileSize: workSamplesTable.fileSize,
  relatedServiceSlugs: workSamplesTable.relatedServiceSlugs,
  relatedBlogSlugs: workSamplesTable.relatedBlogSlugs,
  relatedWorkSlugs: workSamplesTable.relatedWorkSlugs,
  testimonials: workSamplesTable.testimonials,
  testimonialGovernanceVersion: workSamplesTable.testimonialGovernanceVersion,
  aiLinksAssignedAt: workSamplesTable.aiLinksAssignedAt,
  featured: workSamplesTable.featured,
  published: workSamplesTable.published,
  updatedAt: workSamplesTable.updatedAt,
};

const workSummarySchema = selectWorkSampleSchema.pick({
  id: true,
  slug: true,
  date: true,
  titleEn: true,
  titleAr: true,
  summaryEn: true,
  summaryAr: true,
  workTypeEn: true,
  workTypeAr: true,
  jurisdictionEn: true,
  jurisdictionAr: true,
  clientTypeEn: true,
  clientTypeAr: true,
  documentLanguage: true,
  fileMimeType: true,
  fileSize: true,
  relatedServiceSlugs: true,
  relatedBlogSlugs: true,
  relatedWorkSlugs: true,
  testimonials: true,
  testimonialGovernanceVersion: true,
  aiLinksAssignedAt: true,
  featured: true,
  published: true,
  updatedAt: true,
});

function dates(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object") throw new Error("Invalid public collection record");
  const record = { ...value } as Record<string, unknown>;
  if (record.published !== true) throw new Error("Unpublished record rejected from public cache");
  for (const field of ["createdAt", "updatedAt", "aiLinksAssignedAt"]) {
    if (record[field] !== null && record[field] !== undefined) record[field] = new Date(String(record[field]));
  }
  return record;
}

export function decodePublishedBlogs(value: unknown): Blog[] {
  if (!Array.isArray(value)) throw new Error("Invalid public blog collection");
  return value.map(record => selectBlogPostSchema.parse(dates(record)) as Blog);
}

const publicWorkSchema = selectWorkSampleSchema.omit({ fileData: true, confidentialityConfirmed: true });
export function decodePublishedWork(value: unknown): Work[] {
  if (!Array.isArray(value)) throw new Error("Invalid public work collection");
  return value.map(record => publicWorkSchema.parse(dates(record)) as Work);
}

export function decodePublishedWorkSummaries(value: unknown): Work[] {
  if (!Array.isArray(value)) throw new Error("Invalid public work summary collection");
  return value.map(record => toPublicWorkSummary(workSummarySchema.parse(dates(record))));
}

function toPublicWorkSummary(summary: Record<string, unknown>): Work {
  return {
    ...summary,
    challengeEn: "",
    challengeAr: "",
    approachEn: "",
    approachAr: "",
    outcomeEn: "",
    outcomeAr: "",
    seoTitleEn: "",
    seoTitleAr: "",
    seoDescriptionEn: "",
    seoDescriptionAr: "",
    fileName: "",
  } as Work;
}

export function publishedBlogs(): Promise<Blog[]> {
  return publicationDataCache.read("blogs", () => db.select().from(blogPostsTable)
    .where(eq(blogPostsTable.published, true)).orderBy(desc(blogPostsTable.date)), decodePublishedBlogs);
}

export async function publishedBlogBySlug(slug: string): Promise<Blog | undefined> {
  const [post] = await db.select().from(blogPostsTable)
    .where(eq(blogPostsTable.slug, slug)).limit(1);
  return post?.published ? post : undefined;
}

export function publishedWork(): Promise<Work[]> {
  return publicationDataCache.read("work", () => db.select(workColumns).from(workSamplesTable)
    .where(eq(workSamplesTable.published, true)).orderBy(desc(workSamplesTable.date)), decodePublishedWork);
}

export function publishedWorkSummaries(): Promise<Work[]> {
  return publicationDataCache.read("work-summaries", async () => {
    const rows = await db.select(workSummaryColumns).from(workSamplesTable)
      .where(eq(workSamplesTable.published, true)).orderBy(desc(workSamplesTable.date));
    return rows.map((row) => toPublicWorkSummary(row));
  }, decodePublishedWorkSummaries);
}

export async function publishedWorkBySlug(slug: string): Promise<Work | undefined> {
  const [sample] = await db.select(workColumns).from(workSamplesTable)
    .where(eq(workSamplesTable.slug, slug)).limit(1);
  return sample?.published ? sample : undefined;
}
