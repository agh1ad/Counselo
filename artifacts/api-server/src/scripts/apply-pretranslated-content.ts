import { readFile } from "node:fs/promises";
import { blogPostsTable, db, pool, workSamplesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { parseBlogPostInput } from "../lib/blog-input.js";
import { parseWorkSampleInput } from "../lib/work-input.js";

type BlogTranslation = {
  slug: string;
  categoryEn: string;
  titleEn: string;
  excerptEn: string;
  seoTitleEn: string;
  seoDescriptionEn: string;
  bodyEn: string;
  contentEn: Array<{ heading?: string; body: string }>;
};

type WorkTranslation = {
  slug: string;
  titleEn: string;
  summaryEn: string;
  workTypeEn: string;
  jurisdictionEn: string;
  clientTypeEn: string;
  challengeEn: string;
  approachEn: string;
  outcomeEn: string;
  seoTitleEn: string;
  seoDescriptionEn: string;
};

type PreparedTranslations = {
  blogs: BlogTranslation[];
  work: WorkTranslation[];
};

type BlogEnglishValues = Pick<
  ReturnType<typeof parseBlogPostInput>,
  | "categoryEn"
  | "titleEn"
  | "excerptEn"
  | "seoTitleEn"
  | "seoDescriptionEn"
  | "bodyEn"
  | "contentEn"
>;

type WorkEnglishValues = Pick<
  ReturnType<typeof parseWorkSampleInput>,
  | "titleEn"
  | "summaryEn"
  | "workTypeEn"
  | "jurisdictionEn"
  | "clientTypeEn"
  | "challengeEn"
  | "approachEn"
  | "outcomeEn"
  | "seoTitleEn"
  | "seoDescriptionEn"
>;

const dataUrl = new URL("../data/pretranslated-content.json", import.meta.url);

function requireUniqueSlugs(items: Array<{ slug: string }>, label: string) {
  const slugs = new Set<string>();
  for (const item of items) {
    if (!item.slug || slugs.has(item.slug)) {
      throw new Error(`${label} contains a missing or duplicate slug: ${item.slug}`);
    }
    slugs.add(item.slug);
  }
}

function fillMissing<T extends object>(
  current: T,
  prepared: Partial<T>,
  keys: Array<keyof T>,
): Partial<T> {
  return Object.fromEntries(
    keys.flatMap((key) => {
      const existing = current[key];
      const replacement = prepared[key];
      const missing =
        typeof existing === "string"
          ? !existing.trim()
          : Array.isArray(existing)
            ? existing.length === 0
            : existing == null;
      const hasReplacement =
        typeof replacement === "string"
          ? Boolean(replacement.trim())
          : Array.isArray(replacement)
            ? replacement.length > 0
            : replacement !== undefined && replacement !== null;
      return missing && hasReplacement ? [[key, replacement]] : [];
    }),
  ) as Partial<T>;
}

async function main() {
  const prepared = JSON.parse(
    await readFile(dataUrl, "utf8"),
  ) as PreparedTranslations;
  if (!Array.isArray(prepared.blogs) || !Array.isArray(prepared.work)) {
    throw new Error("Prepared translation data must contain blogs and work arrays");
  }
  requireUniqueSlugs(prepared.blogs, "Blog translation data");
  requireUniqueSlugs(prepared.work, "Work translation data");

  const blogUpdates: Array<{
    id: number;
    slug: string;
    values: BlogEnglishValues;
  }> = [];
  const workUpdates: Array<{
    id: number;
    slug: string;
    values: WorkEnglishValues;
  }> = [];
  const existingBlogs = await db.select().from(blogPostsTable);
  const existingWork = await db.select().from(workSamplesTable);
  const blogsBySlug = new Map(existingBlogs.map((post) => [post.slug, post]));
  const workBySlug = new Map(existingWork.map((sample) => [sample.slug, sample]));

  for (const translation of prepared.blogs) {
    const post = blogsBySlug.get(translation.slug);
    if (!post) {
      throw new Error(`Published blog post not found: ${translation.slug}`);
    }
    if (!post.published) {
      throw new Error(`Refusing to update unpublished blog post: ${translation.slug}`);
    }
    const patch = fillMissing(post, translation, [
      "categoryEn",
      "titleEn",
      "excerptEn",
      "seoTitleEn",
      "seoDescriptionEn",
      "bodyEn",
      "contentEn",
    ]);
    if (!Object.keys(patch).length) continue;
    // Clamp existing Arabic fields to current validation limits before merging.
    // Production data may pre-date stricter character limits; we only write back
    // English fields from `validated`, so truncating here is safe and non-destructive.
    const clampedPost = {
      ...post,
      excerptAr: post.excerptAr ? post.excerptAr.slice(0, 500) : post.excerptAr,
      seoDescriptionAr: post.seoDescriptionAr
        ? post.seoDescriptionAr.slice(0, 500)
        : post.seoDescriptionAr,
      titleAr: post.titleAr ? post.titleAr.slice(0, 300) : post.titleAr,
      seoTitleAr: post.seoTitleAr ? post.seoTitleAr.slice(0, 300) : post.seoTitleAr,
    };
    // Validate and sanitize the prepared English article without re-running
    // publication gates against unrelated legacy Arabic SEO metadata.
    const validated = parseBlogPostInput(
      { ...clampedPost, ...patch, published: false },
      { existingSlug: post.slug },
    );
    const values: BlogEnglishValues = {
      categoryEn: validated.categoryEn,
      titleEn: validated.titleEn,
      excerptEn: validated.excerptEn,
      seoTitleEn: validated.seoTitleEn,
      seoDescriptionEn: validated.seoDescriptionEn,
      bodyEn: validated.bodyEn,
      contentEn: validated.contentEn,
    };
    blogUpdates.push({ id: post.id, slug: post.slug, values });
  }

  for (const translation of prepared.work) {
    const sample = workBySlug.get(translation.slug);
    if (!sample) {
      throw new Error(`Published work sample not found: ${translation.slug}`);
    }
    if (!sample.published) {
      throw new Error(`Refusing to update unpublished work sample: ${translation.slug}`);
    }
    const patch = fillMissing(sample, translation, [
      "titleEn",
      "summaryEn",
      "workTypeEn",
      "jurisdictionEn",
      "clientTypeEn",
      "challengeEn",
      "approachEn",
      "outcomeEn",
      "seoTitleEn",
      "seoDescriptionEn",
    ]);
    if (!Object.keys(patch).length) continue;
    // The record was already approved for publication. Validate the prepared
    // English copy independently so legacy Arabic metadata and files remain
    // byte-for-byte untouched.
    const validated = parseWorkSampleInput(
      { ...sample, ...patch, published: false },
      { existingSlug: sample.slug, existingFile: sample },
    );
    const values: WorkEnglishValues = {
      titleEn: validated.titleEn,
      summaryEn: validated.summaryEn,
      workTypeEn: validated.workTypeEn,
      jurisdictionEn: validated.jurisdictionEn,
      clientTypeEn: validated.clientTypeEn,
      challengeEn: validated.challengeEn,
      approachEn: validated.approachEn,
      outcomeEn: validated.outcomeEn,
      seoTitleEn: validated.seoTitleEn,
      seoDescriptionEn: validated.seoDescriptionEn,
    };
    workUpdates.push({ id: sample.id, slug: sample.slug, values });
  }

  await db.transaction(async (transaction) => {
    const updatedAt = new Date();
    for (const update of blogUpdates) {
      await transaction
        .update(blogPostsTable)
        .set({ ...update.values, updatedAt })
        .where(eq(blogPostsTable.id, update.id));
    }
    for (const update of workUpdates) {
      await transaction
        .update(workSamplesTable)
        .set({ ...update.values, updatedAt })
        .where(eq(workSamplesTable.id, update.id));
    }
  });

  for (const update of blogUpdates) {
    console.log(`Applied prepared English translation: blog ${update.slug}`);
  }
  for (const update of workUpdates) {
    console.log(`Applied prepared English translation: work ${update.slug}`);
  }
  console.log(
    `Prepared translations complete: ${blogUpdates.length} blog posts and ${workUpdates.length} work samples updated.`,
  );
}

try {
  await main();
} finally {
  await pool.end();
}
