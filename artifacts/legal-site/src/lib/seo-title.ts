/**
 * Keep the primary legal subject and the CounselO brand visible in search
 * titles. Search engines have no fixed character limit, but very long titles
 * routinely lose the query and brand in rendered snippets.
 */
export function limitSeoTitle(value: string, max = 68): string {
  const clean = value.replace(/\s+/g, " ").trim();
  const suffixMatch = clean.match(/\s+\|\s+((?:أعمال\s+)?(?:كاونسلو|CounselO))$/i);
  const suffix = suffixMatch ? ` | ${suffixMatch[1]}` : "";
  const subject = suffixMatch ? clean.slice(0, suffixMatch.index) : clean;
  const trimTrailingConnector = (input: string): string => {
    let output = input.trim();
    let previous = "";
    while (output !== previous) {
      previous = output;
      output = output
        .replace(/\s+(?:إلى|من|في|على|a|an|and|at|by|for|from|in|of|on|or|the|to|under|with)\s*$/i, "")
        .trim();
    }
    return output;
  };
  const cleanSubject = trimTrailingConnector(subject);
  const normalized = `${cleanSubject}${suffix}`.trim();
  if (normalized.length <= max) return normalized;
  const budget = Math.max(20, max - suffix.length);
  const shortened = trimTrailingConnector(
    cleanSubject
      .slice(0, budget)
      .replace(/\s+\S*$/, "")
      .trim(),
  );

  return `${shortened || cleanSubject.slice(0, budget).trim()}${suffix}`.trim();
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
