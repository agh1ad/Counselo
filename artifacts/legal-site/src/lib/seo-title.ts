/** Normalize editorial titles without removing words from their legal subject.
 * There is no fixed Google title limit; display truncation belongs to the engine.
 * Retain the optional argument for existing callers of this public helper.
 */
export function limitSeoTitle(value: string, _max = 68): string {
  return value.replace(/\s+/g, " ").trim()
    .replace(/\s+(?:إلى|من|في|على|and|of|to|in)\s*(?=\|\s*(?:أعمال\s+)?(?:كاونسلو|CounselO)$)/i, " ");
}
