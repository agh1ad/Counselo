import { blogPostsTable, db, workSamplesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { parseBlogPostInput } from "../lib/blog-input.js";
import {
  translateBlogForPublishing,
  translateWorkForPublishing,
} from "../lib/content-translation.js";
import { parseWorkSampleInput } from "../lib/work-input.js";

async function backfillBlogs(): Promise<void> {
  const posts = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.published, true));

  for (const [index, post] of posts.entries()) {
    const patch = await translateBlogForPublishing(post);
    if (Object.keys(patch).length === 0) {
      console.log(`[${index + 1}/${posts.length}] blog ${post.slug}: already bilingual`);
      continue;
    }
    const values = parseBlogPostInput(
      { ...post, ...patch },
      { existingSlug: post.slug },
    );
    await db
      .update(blogPostsTable)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(blogPostsTable.id, post.id));
    console.log(`[${index + 1}/${posts.length}] blog ${post.slug}: translated and validated`);
  }
}

async function backfillWork(): Promise<void> {
  const samples = await db
    .select()
    .from(workSamplesTable)
    .where(eq(workSamplesTable.published, true));

  for (const [index, sample] of samples.entries()) {
    const patch = await translateWorkForPublishing(sample);
    if (Object.keys(patch).length === 0) {
      console.log(`[${index + 1}/${samples.length}] work ${sample.slug}: already bilingual`);
      continue;
    }
    const values = parseWorkSampleInput(
      { ...sample, ...patch },
      { existingSlug: sample.slug, existingFile: sample },
    );
    await db
      .update(workSamplesTable)
      .set({ ...values, updatedAt: new Date() })
      .where(eq(workSamplesTable.id, sample.id));
    console.log(`[${index + 1}/${samples.length}] work ${sample.slug}: translated and validated`);
  }
}

await backfillBlogs();
await backfillWork();
