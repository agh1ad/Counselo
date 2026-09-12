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
import { publicationDataCache } from "../lib/publication-data-cache.js";
const columns =
  "id,slug,region,source_url,source_name,published_at,modified_at,reviewer,editorial,source_checked_at,source_check_status";

type PublicLegalUpdateSnapshot = {
  updates: LegalUpdate[];
  corrections: Array<{
    updateId: string;
    date: string;
    en: string;
    ar: string;
  }>;
};
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

function decodePublicLegalUpdateSnapshot(
  value: unknown,
): PublicLegalUpdateSnapshot {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid public legal-update snapshot");
  }
  const snapshot = value as Partial<PublicLegalUpdateSnapshot>;
  if (!Array.isArray(snapshot.updates) || !Array.isArray(snapshot.corrections)) {
    throw new Error("Invalid public legal-update snapshot");
  }
  const updates = snapshot.updates.map((row) => {
    if (!row || typeof row !== "object") {
      throw new Error("Invalid public legal-update row");
    }
    const update = row as LegalUpdate;
    if (
      typeof update.id !== "string" ||
      typeof update.slug !== "string" ||
      !update.region ||
      !update.draft ||
      typeof update.draft !== "object"
    ) {
      throw new Error("Invalid public legal-update row");
    }
    return update;
  });
  const corrections = snapshot.corrections.map((correction) => {
    if (
      !correction ||
      typeof correction !== "object" ||
      typeof correction.updateId !== "string" ||
      typeof correction.date !== "string" ||
      typeof correction.en !== "string" ||
      typeof correction.ar !== "string"
    ) {
      throw new Error("Invalid public legal-update correction");
    }
    return correction;
  });
  return { updates, corrections };
}

async function loadPublicLegalUpdateSnapshot(): Promise<PublicLegalUpdateSnapshot> {
  return publicationDataCache.read(
    "legal-updates",
    async () => {
      const [updates, corrections] = await Promise.all([
        pool.query(
          `SELECT ${columns},draft - 'evidence' - 'reason' AS draft
           FROM legal_updates
           WHERE status='published'
           ORDER BY published_at DESC,id DESC`,
        ),
        pool.query(
          `SELECT update_id,created_at,
             snapshot->'afterEditorial'->>'correctionEn' AS en,
             snapshot->'afterEditorial'->>'correctionAr' AS ar
           FROM legal_update_audit
           WHERE action='publish'
             AND coalesce(snapshot->'afterEditorial'->>'correctionEn','')<>''
           ORDER BY update_id,created_at DESC`,
        ),
      ]);
      return {
        updates: updates.rows,
        corrections: corrections.rows.map((row) => ({
          updateId: row.update_id,
          date: new Date(row.created_at).toISOString(),
          en: row.en,
          ar: row.ar,
        })),
      };
    },
    (value) => {
      if (!value || typeof value !== "object") {
        throw new Error("Invalid public legal-update snapshot");
      }
      const raw = value as {
        updates?: unknown[];
        corrections?: Array<{
          updateId: string;
          date: string;
          en: string;
          ar: string;
        }>;
      };
      if (!Array.isArray(raw.updates) || !Array.isArray(raw.corrections)) {
        throw new Error("Invalid public legal-update snapshot");
      }
      const corrections = raw.corrections.map((correction) => ({
        updateId: String(correction.updateId),
        date: String(correction.date),
        en: String(correction.en),
        ar: String(correction.ar),
      }));
      const correctionsByUpdate = new Map<
        string,
        PublicLegalUpdateSnapshot["corrections"]
      >();
      for (const correction of corrections) {
        const existing = correctionsByUpdate.get(correction.updateId) || [];
        existing.push(correction);
        correctionsByUpdate.set(correction.updateId, existing);
      }
      const updates = raw.updates.map((row) => {
        const update = mapRow(row);
        const updateCorrections = correctionsByUpdate.get(update.id);
        return updateCorrections?.length
          ? {
              ...update,
              corrections: updateCorrections.map(({ date, en, ar }) => ({
                date,
                en,
                ar,
              })),
            }
          : update;
      });
      return decodePublicLegalUpdateSnapshot({ updates, corrections });
    },
  );
}
export async function publishedUpdates(
  path = "/legal-updates",
): Promise<LegalUpdatesData> {
  const context = updateContext(path);
  const data = emptyLegalUpdates(path);
  if (!context) return data;
  const snapshot = await loadPublicLegalUpdateSnapshot();
  const article =
    context.kind === "article"
      ? snapshot.updates.find(
          (update) =>
            update.region === context.region && update.slug === context.slug,
        ) || null
      : null;
  data.article = article;
  if (context.kind === "article" && !article) return data;

  const relatedServices = article?.draft.serviceSlugs || [];
  const filtered = snapshot.updates.filter((update) => {
    if (context.region && update.region !== context.region) return false;
    if (
      context.service &&
      !update.draft.serviceSlugs.includes(context.service)
    ) {
      return false;
    }
    if (article && update.id !== article.id) {
      return relatedServices.some((service) =>
        update.draft.serviceSlugs.includes(service),
      );
    }
    return !article || update.id !== article.id;
  });
  const limit = context.kind === "hub" ? LEGAL_UPDATES_PAGE_SIZE : 3;
  const offset = (context.page - 1) * limit;
  data.items = filtered.slice(offset, offset + limit) as LegalUpdateCard[];
  data.hasMore = filtered.length > offset + limit;
  if (context.kind === "hub" && context.region) {
    data.services = [
      ...new Set(
        snapshot.updates
          .filter((update) => update.region === context.region)
          .flatMap((update) => update.draft.serviceSlugs),
      ),
    ].sort();
  }
  return data;
}
// Sitemap queries never retrieve article bodies or private source snapshots.
export async function legalUpdatesSitemapRows() {
  const snapshot = await loadPublicLegalUpdateSnapshot();
  return snapshot.updates.map((update) => ({
    slug: update.slug,
    region: update.region,
    modifiedAt: update.modifiedAt,
    services: update.draft.serviceSlugs,
  }));
}
