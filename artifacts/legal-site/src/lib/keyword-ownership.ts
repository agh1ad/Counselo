export interface OwnershipRow {
  id: string;
  query: string;
  country: string;
  language: string;
  intent_id: string;
  ownership_key: string;
  target_url: string;
  target_status: string;
}
export interface OwnershipPolicy {
  owners: Array<{ key: string; url: string; status: string }>;
  supporting_routes: Array<{ url: string; prohibited_primary_keys: string[] }>;
}
export function normalizeOwnershipQuery(query: string): string {
  return query.normalize("NFKC").toLocaleLowerCase("en").replace(/[\u064B-\u065F\u0670\u0640]/g, "").replace(/\s+/g, " ").trim();
}

/** Editorial intent IDs group synonyms; this is a registry gate, not a semantic ranking detector. */
export function validateKeywordOwnership(rows: OwnershipRow[], policy: OwnershipPolicy, existingUrls: Set<string>): string[] {
  const errors: string[] = [];
  const owners = new Map<string, string>();
  const approved = new Map<string, { url: string; status: string }>();
  const ids = new Set<string>();
  const queries = new Set<string>();
  for (const owner of policy.owners) {
    if (approved.has(owner.key)) errors.push(`Duplicate policy key: ${owner.key}`);
    approved.set(owner.key, owner);
  }
  for (const row of rows) {
    const key = `${row.country}:${row.language}:${row.intent_id}`;
    if (ids.has(row.id)) errors.push(`Duplicate row ID: ${row.id}`);
    ids.add(row.id);
    if (!["sa", "syr", "uae"].includes(row.country) || !["ar", "en"].includes(row.language)) errors.push(`Invalid locale: ${row.id}`);
    if (row.ownership_key !== key) errors.push(`Incorrect ownership key: ${row.id}`);
    const query = `${row.country}:${row.language}:${normalizeOwnershipQuery(row.query)}`;
    if (!row.query.trim() || queries.has(query)) errors.push(`Duplicate or blank query: ${row.id}`);
    queries.add(query);
    if (owners.has(key) && owners.get(key) !== row.target_url) errors.push(`Multiple primary URLs: ${key}`);
    owners.set(key, row.target_url);
    const approvedOwner = approved.get(key);
    if (!approvedOwner || approvedOwner.url !== row.target_url || approvedOwner.status !== row.target_status) errors.push(`Unapproved owner or status: ${row.id}`);
    try {
      const url = new URL(row.target_url);
      const prefix = `/${row.country}${row.language === "ar" ? "/ar" : ""}`;
      const tail = url.pathname.slice(prefix.length);
      if (url.origin !== "https://counselo-legal.com" || url.search || url.hash || url.pathname.endsWith("/") || !(url.pathname === prefix || url.pathname.startsWith(`${prefix}/`)) || (row.language === "en" && /^\/ar(?:\/|$)/.test(tail)) || /\/en(?:\/|$)/.test(tail)) errors.push(`Noncanonical or wrong-locale URL: ${row.id}`);
    } catch { errors.push(`Invalid URL: ${row.id}`); }
    if (!["existing", "planned", "conditional"].includes(row.target_status)) errors.push(`Invalid target status: ${row.id}`);
    if (row.target_status !== "planned" && !existingUrls.has(row.target_url)) errors.push(`Existing owner missing from route registry: ${row.id}`);
    if (row.target_status === "planned" && existingUrls.has(row.target_url)) errors.push(`Planned owner now exists; review publication status: ${row.id}`);
    if (policy.supporting_routes.some(s => s.url === row.target_url && s.prohibited_primary_keys.includes(key))) errors.push(`Supporting URL cannot own primary intent: ${row.id}`);
  }
  for (const key of approved.keys()) if (!owners.has(key)) errors.push(`Policy owner has no query: ${key}`);
  for (const support of policy.supporting_routes) {
    if (!existingUrls.has(support.url)) errors.push(`Supporting route missing: ${support.url}`);
    for (const key of support.prohibited_primary_keys) if (!approved.has(key)) errors.push(`Unknown supporting-route intent: ${key}`);
  }
  return errors;
}
