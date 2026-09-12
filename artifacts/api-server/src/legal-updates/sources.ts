import type { OfficialSource } from "@workspace/api-zod";
export { officialSources, type OfficialSource } from "@workspace/api-zod";
export function approvedUrl(raw: string, source: OfficialSource): URL {
  const url = new URL(raw);
  if (
    url.protocol !== "https:" ||
    url.origin !== new URL(source.url).origin ||
    url.username ||
    url.password
  )
    throw new Error("Unapproved source URL");
  url.hash = "";
  return url;
}
