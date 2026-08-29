import { blogPostsTable, db, pool, workSamplesTable } from "@workspace/db";
import { eq, isNull } from "drizzle-orm";
import { assignInternalLinks } from "../lib/internal-link-assignment.js";
import { invalidatePublicResponseCache } from "../lib/public-response-cache.js";

const force = process.argv.includes("--all");

async function backfillBlogPosts() {
  const posts = await db
    .select()
    .from(blogPostsTable)
    .where(force ? eq(blogPostsTable.published, true) : isNull(blogPostsTable.aiLinksAssignedAt));
  const published = posts.filter((post) => post.published);
  for (const [index, post] of published.entries()) {
    const assignment = await assignInternalLinks({
      kind: "blog",
      slug: post.slug,
      title: post.titleEn || post.titleAr,
      summary: post.excerptEn || post.excerptAr,
      body: post.bodyEn || post.bodyAr || JSON.stringify(post.contentEn.length ? post.contentEn : post.contentAr),
    });
    await db.update(blogPostsTable).set({
      relatedServiceSlugs: assignment.relatedServiceSlugs,
      relatedBlogSlugs: assignment.relatedBlogSlugs,
      relatedWorkSlugs: assignment.relatedWorkSlugs,
      aiLinksAssignedAt: new Date(),
    }).where(eq(blogPostsTable.id, post.id));
    console.log(`[${index + 1}/${published.length}] blog ${post.slug}: ${assignment.relatedServiceSlugs.join(", ")} (${assignment.assignedBy})`);
  }
  return published.length;
}

async function backfillWorkSamples() {
  const samples = await db
    .select()
    .from(workSamplesTable)
    .where(force ? eq(workSamplesTable.published, true) : isNull(workSamplesTable.aiLinksAssignedAt));
  const published = samples.filter((sample) => sample.published);
  for (const [index, sample] of published.entries()) {
    const assignment = await assignInternalLinks({
      kind: "work",
      slug: sample.slug,
      title: sample.titleEn || sample.titleAr,
      summary: sample.summaryEn || sample.summaryAr,
      body: [sample.challengeEn, sample.challengeAr, sample.approachEn, sample.approachAr, sample.outcomeEn, sample.outcomeAr].join(" "),
    });
    await db.update(workSamplesTable).set({
      relatedServiceSlugs: assignment.relatedServiceSlugs,
      relatedBlogSlugs: assignment.relatedBlogSlugs,
      relatedWorkSlugs: assignment.relatedWorkSlugs,
      aiLinksAssignedAt: new Date(),
    }).where(eq(workSamplesTable.id, sample.id));
    console.log(`[${index + 1}/${published.length}] work ${sample.slug}: ${assignment.relatedServiceSlugs.join(", ")} (${assignment.assignedBy})`);
  }
  return published.length;
}

try {
  const [blogCount, workCount] = await Promise.all([
    backfillBlogPosts(),
    backfillWorkSamples(),
  ]);
  if (blogCount || workCount) await invalidatePublicResponseCache();
  console.log(`Backfill complete: ${blogCount} blog posts and ${workCount} work samples assigned.`);
} finally {
  await pool.end();
}
