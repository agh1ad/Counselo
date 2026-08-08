import { pgTable, serial, text, boolean, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogSectionSchema = z.object({
  heading: z.string().optional(),
  body: z.string(),
});
export type BlogSection = z.infer<typeof blogSectionSchema>;

export const blogPostsTable = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  date: text("date").notNull(),
  categoryEn: text("category_en").notNull().default(""),
  categoryAr: text("category_ar").notNull().default(""),
  readTime: integer("read_time").notNull().default(5),
  titleEn: text("title_en").notNull().default(""),
  titleAr: text("title_ar").notNull().default(""),
  excerptEn: text("excerpt_en").notNull().default(""),
  excerptAr: text("excerpt_ar").notNull().default(""),
  seoTitleEn: text("seo_title_en").notNull().default(""),
  seoTitleAr: text("seo_title_ar").notNull().default(""),
  seoDescriptionEn: text("seo_description_en").notNull().default(""),
  seoDescriptionAr: text("seo_description_ar").notNull().default(""),
  bodyEn: text("body_en").notNull().default(""),
  bodyAr: text("body_ar").notNull().default(""),
  contentEn: jsonb("content_en").$type<BlogSection[]>().notNull().default([]),
  contentAr: jsonb("content_ar").$type<BlogSection[]>().notNull().default([]),
  relatedServiceSlugs: jsonb("related_service_slugs").$type<string[]>().notNull().default([]),
  relatedBlogSlugs: jsonb("related_blog_slugs").$type<string[]>().notNull().default([]),
  relatedWorkSlugs: jsonb("related_work_slugs").$type<string[]>().notNull().default([]),
  contentType: text("content_type").$type<"legal-guidance" | "professional-commentary">().notNull().default("professional-commentary"),
  aiLinksAssignedAt: timestamp("ai_links_assigned_at"),
  primaryAuthorName: text("primary_author_name").notNull().default("CounselO Legal team"),
  primaryAuthorNameAr: text("primary_author_name_ar").notNull().default("فريق كاونسلو القانوني"),
  primaryAuthorUrl: text("primary_author_url").notNull().default("/about"),
  legalReviewerName: text("legal_reviewer_name").notNull().default("Lawyer and Legal Consultant Omar Al-Baghdadi"),
  legalReviewerNameAr: text("legal_reviewer_name_ar").notNull().default("المحامي والمستشار القانوني عمر البغدادي"),
  legalReviewerUrl: text("legal_reviewer_url").notNull().default("/about"),
  jurisdiction: text("jurisdiction").notNull().default("sa"),
  applicableLaw: text("applicable_law").notNull().default("Saudi legislation and implementing rules applicable to the subject discussed in this article"),
  applicableLawAr: text("applicable_law_ar").notNull().default("الأنظمة السعودية واللوائح التنفيذية المنطبقة على موضوع هذا المقال"),
  sources: jsonb("sources").$type<Array<{ titleEn: string; titleAr: string; href: string }>>().notNull().default([]),
  keyLegalUpdateNote: text("key_legal_update_note").notNull().default("Check the cited primary sources for amendments, implementing decisions and later official guidance before acting."),
  keyLegalUpdateNoteAr: text("key_legal_update_note_ar").notNull().default("تحقق من المصادر الأولية المذكورة بشأن أي تعديلات أو قرارات تنفيذية أو إرشادات رسمية لاحقة قبل اتخاذ أي إجراء."),
  contentMethodology: text("content_methodology").notNull().default("Primary-law review plus CounselO practice commentary."),
  contentMethodologyAr: text("content_methodology_ar").notNull().default("مراجعة المصادر القانونية الأولية مع تعليق عملي من كاونسلو."),
  lastSubstantiveReviewAt: text("last_substantive_review_at").notNull().default(""),
  correctionUrl: text("correction_url").notNull().default("/contact?subject=article-correction"),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPostsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const selectBlogPostSchema = createSelectSchema(blogPostsTable);

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPostsTable.$inferSelect;
