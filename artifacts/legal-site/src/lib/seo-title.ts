/** Keep the brand and avoid ending a shortened subject on a connector. */
export function limitSeoTitle(value: string, max = 68): string {
  const suffix = value.match(/\s*\|\s*(?:أعمال\s+)?(?:كاونسلو|CounselO)$/i)?.[0] ?? "";
  let subject = suffix ? value.slice(0, -suffix.length).trim() : value.trim();
  const budget = max - suffix.length;
  if (subject.length > budget) {
    const slice = subject.slice(0, budget);
    subject = slice.slice(0, slice.lastIndexOf(" ") > 10 ? slice.lastIndexOf(" ") : slice.length).trim();
  }
  const connector = /(?:\s|^)(?:and|or|to|from|for|with|of|in|under|a|an|the|في|من|إلى|الى|على|عن|مع|أو|او|و|ضمن|بين|بشأن|ضد)$/i;
  while (connector.test(subject)) subject = subject.replace(connector, "").trim();
  return subject.replace(/[|،,:;]$/, "").trimEnd() + suffix;
}
