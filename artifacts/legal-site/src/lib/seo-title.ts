/** Normalize editorial titles without removing words from their legal subject.
 * There is no fixed Google title limit; display truncation belongs to the engine.
 * Retain the optional argument for existing callers of this public helper.
 */
export function limitSeoTitle(value: string, _max = 68): string {
  return value
    .replace(/\s+/g, " ")
    .trim()
    .replace(
      /\s+(?:إلى|من|في|على|and|of|to|in)\s*(?=\|\s*(?:أعمال\s+)?(?:كاونسلو للاستشارات القانونية|CounselO Legal)$)/i,
      " ",
    );
}

/** Normalize metadata descriptions to a stable, readable snippet length. */
export function normalizeSeoDescription(value: string, max = 170): string {
  const clean = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const shortened = clean
    .slice(0, max + 1)
    .replace(/\s+\S*$/, "")
    .trim()
    .replace(/[,:;–—-]\s*$/, "")
    .trim();
  return shortened || clean.slice(0, max).trim();
}
