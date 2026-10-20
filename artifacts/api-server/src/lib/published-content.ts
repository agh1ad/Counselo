import { blogPostsTable, db, selectBlogPostSchema, selectWorkSampleSchema, workSamplesTable } from "@workspace/db";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { publicationDataCache } from "./publication-data-cache.js";

const { fileData: _file, confidentialityConfirmed: _approval, ...workColumns } = getTableColumns(workSamplesTable);
type Blog = typeof blogPostsTable.$inferSelect;
type Work = Omit<typeof workSamplesTable.$inferSelect, "fileData" | "confidentialityConfirmed">;

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

export function publishedBlogs(): Promise<Blog[]> {
  return publicationDataCache.read("blogs", () => db.select().from(blogPostsTable)
    .where(eq(blogPostsTable.published, true)).orderBy(desc(blogPostsTable.date)), decodePublishedBlogs);
}

export function publishedWork(): Promise<Work[]> {
  return publicationDataCache.read("work", () => db.select(workColumns).from(workSamplesTable)
    .where(eq(workSamplesTable.published, true)).orderBy(desc(workSamplesTable.date)), decodePublishedWork);
}
