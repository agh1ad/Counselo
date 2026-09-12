import { pool } from "@workspace/db";
import {
  emptyLegalUpdates,
  updateEditorialSchema,
  updateContext,
  LEGAL_UPDATES_PAGE_SIZE,
  type LegalUpdate,
  type LegalUpdatesData,
  type LegalUpdateCard,
} from "@workspace/api-zod";
const columns =
  "id,slug,region,source_url,source_name,published_at,modified_at,reviewer,editorial,source_checked_at,source_check_status";
const compactDraft = `jsonb_build_object('sourceDate',draft->'sourceDate','practiceArea',draft->'practiceArea','serviceSlugs',draft->'serviceSlugs','en',jsonb_build_object('title',draft->'en'->'title','summary',draft->'en'->'summary'),'ar',jsonb_build_object('title',draft->'ar'->'title','summary',draft->'ar'->'summary')) AS draft`;
function mapRow(row: any): LegalUpdate {
  return {
    id: row.id,
    slug: row.slug,
    region: row.region,
    sourceUrl: row.source_url,
    sourceName: row.source_name,
    draft: row.draft,
    publishedAt: new Date(row.published_at).toISOString(),
    modifiedAt: new Date(row.modified_at).toISOString(),
    reviewer: row.reviewer,
    editorial: row.editorial ? updateEditorialSchema.parse(row.editorial) : undefined,
    sourceCheckedAt: row.source_checked_at
      ? new Date(row.source_checked_at).toISOString()
      : undefined,
    sourceCheckStatus: row.source_check_status || undefined,
  };
}
export async function publishedUpdates(
  path = "/legal-updates",
): Promise<LegalUpdatesData> {
  const context = updateContext(path);
  const data = emptyLegalUpdates(path);
  if (!context) return data;
  let related: string[] = [];
  if (context.kind === "article") {
    const { rows } = await pool.query(
      `SELECT ${columns},draft - 'evidence' - 'reason' AS draft FROM legal_updates WHERE status='published' AND region=$1 AND slug=$2`,
      [context.region, context.slug],
    );
    if (!rows[0]) return data;
    data.article = mapRow(rows[0]);
    const revisions = await pool.query(
      "SELECT created_at,snapshot->'afterEditorial'->>'correctionEn' AS en,snapshot->'afterEditorial'->>'correctionAr' AS ar FROM legal_update_audit WHERE update_id=$1 AND action='publish' AND coalesce(snapshot->'afterEditorial'->>'correctionEn','')<>'' ORDER BY created_at DESC",
      [data.article.id],
    );
    data.article.corrections = revisions.rows.map((r) => ({
      date: new Date(r.created_at).toISOString(),
      en: r.en,
      ar: r.ar,
    }));
    related = data.article.draft.serviceSlugs;
  }
  const values: unknown[] = [];
  const where = ["status='published'"];
  const param = (value: unknown) => {
    values.push(value);
    return `$${values.length}`;
  };
  if (context.region) where.push(`region=${param(context.region)}`);
  if (context.service)
    where.push(
      `(draft->'serviceSlugs') @> ${param(JSON.stringify([context.service]))}::jsonb`,
    );
  if (data.article) {
    where.push(`id<>${param(data.article.id)}`);
    // Related means a shared service; do not pad the block with unrelated articles.
    if (related.length)
      where.push(`(draft->'serviceSlugs') ?| ${param(related)}::text[]`);
    else return data;
  }
  const limit = context.kind === "hub" ? LEGAL_UPDATES_PAGE_SIZE : 3;
  const { rows } = await pool.query(
    `SELECT ${columns},${compactDraft} FROM legal_updates WHERE ${where.join(" AND ")} ORDER BY published_at DESC,id DESC LIMIT ${param(limit + 1)} OFFSET ${param((context.page - 1) * limit)}`,
    values,
  );
  data.items = rows.slice(0, limit).map(mapRow) as LegalUpdateCard[];
  data.hasMore = rows.length > limit;
  if (context.kind === "hub" && context.region) {
    const services = await pool.query(
      "SELECT DISTINCT jsonb_array_elements_text(draft->'serviceSlugs') AS slug FROM legal_updates WHERE status='published' AND region=$1 ORDER BY slug",
      [context.region],
    );
    data.services = services.rows.map((row) => row.slug);
  }
  return data;
}
// Sitemap queries never retrieve article bodies or private source snapshots.
export async function legalUpdatesSitemapRows() {
  const { rows } = await pool.query(
    "SELECT slug,region,modified_at,draft->'serviceSlugs' AS services FROM legal_updates WHERE status='published' ORDER BY published_at DESC,id DESC",
  );
  return rows.map((row) => ({
    slug: row.slug,
    region: row.region,
    modifiedAt: new Date(row.modified_at).toISOString(),
    services: row.services || [],
  }));
}
