export type CacheTarget =
  | "immutable_static"
  | "html_revalidate"
  | "discovery_xml"
  | "fresh_ssr"
  | "no_store"
  | "redirect_permanent";

export function getCacheControlHeader(target: CacheTarget): string {
  switch (target) {
    case "immutable_static":
      return "public, max-age=31536000, immutable";
    case "html_revalidate":
      return "public, max-age=0, must-revalidate";
    case "discovery_xml":
      return "public, max-age=3600, must-revalidate";
    case "fresh_ssr":
      return "public, max-age=60, must-revalidate";
    case "no_store":
      return "no-store";
    case "redirect_permanent":
      return "public, max-age=86400";
    default:
      return "no-store";
  }
}
