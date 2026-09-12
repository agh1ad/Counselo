import {
  updateDraftSchema,
  getServiceDefinition,
  type UpdateRegion,
} from "@workspace/api-zod";
export function validateDraft(
  value: unknown,
  text: string,
  region: UpdateRegion,
  now = new Date(),
) {
  const draft = updateDraftSchema.parse(value);
  const normalize = (s: string) => s.replace(/\s+/g, " ").trim();
  for (const evidence of draft.evidence)
    if (!normalize(text).includes(normalize(evidence.quote)))
      throw new Error("Evidence quotation is absent from retrieved source");
  const date = new Date(draft.sourceDate + "T00:00:00Z");
  if (
    !Number.isFinite(date.getTime()) ||
    date.toISOString().slice(0, 10) !== draft.sourceDate ||
    date > now ||
    now.getTime() - date.getTime() > 14 * 86400000
  )
    throw new Error(
      "Source date is invalid, future, or older than discovery window",
    );
  if (
    draft.effectiveDate &&
    new Date(draft.effectiveDate + "T00:00:00Z").toISOString().slice(0, 10) !==
      draft.effectiveDate
  )
    throw new Error("Invalid effective date");
  for (const slug of draft.serviceSlugs)
    if (!getServiceDefinition(slug, region))
      throw new Error("Unknown related service");
  for (const [field, value] of Object.entries(draft.ar))
    if (!/[\u0600-\u06ff]/.test(value))
      throw new Error(`Arabic content missing in ${field}`);
  for (const [field, value] of Object.entries(draft.en))
    if (!/[a-zA-Z]/.test(value))
      throw new Error(`English content missing in ${field}`);
  return draft;
}
