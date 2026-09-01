const CANONICAL_HOST = "counselo-legal.com";
const DUPLICATE_HOST = `www.${CANONICAL_HOST}`;

function hostname(value?: string): string {
  return (value ?? "")
    .split(",", 1)[0]
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "");
}

export function canonicalHostRedirect(
  hostHeader: string | undefined,
  forwardedHostHeader: string | undefined,
  originalUrl: string,
): string | null {
  const observedHost = hostname(forwardedHostHeader) || hostname(hostHeader);
  if (observedHost !== DUPLICATE_HOST) return null;

  const pathAndQuery = originalUrl.startsWith("/")
    ? originalUrl
    : `/${originalUrl}`;
  return `https://${CANONICAL_HOST}${pathAndQuery}`;
}
