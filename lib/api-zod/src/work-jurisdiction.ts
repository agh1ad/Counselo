export type WorkRegion = "sa" | "syr" | "uae";

/** Only explicit jurisdiction fields may determine a case study's legal links. */
export function workJurisdictionRegion(en: string | null | undefined, ar: string | null | undefined): WorkRegion | undefined {
  const value = `${en ?? ""} ${ar ?? ""}`.toLowerCase();
  if (/cross[ -]?border|عابر.*حدود/.test(value)) return undefined;
  const matches: WorkRegion[] = [];
  if (/\bsaudi(?: arabia)?\b|\bksa\b|السعودي[ةه]/.test(value)) matches.push("sa");
  if (/\bsyria\b|سوريا|سورية/.test(value)) matches.push("syr");
  if (/\buae\b|united arab emirates|الإمارات|الامارات/.test(value)) matches.push("uae");
  return matches.length === 1 ? matches[0] : undefined;
}
