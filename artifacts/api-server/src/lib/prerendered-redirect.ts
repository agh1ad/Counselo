/** Accept only our generated, same-origin consolidation stubs, never arbitrary HTML URLs. */
export function prerenderedRedirect(html: string, requestPath: string): string | undefined {
  if (!/http-equiv="refresh"/i.test(html) || !/noindex, nofollow/i.test(html)) return undefined;
  const source = html.match(/name="x-source-route" content="([^"]+)"/i)?.[1];
  const rawTarget = html.match(/content="0;\s*url=([^"]+)"/i)?.[1];
  const target = rawTarget?.startsWith("https://counselo-legal.com/") ? rawTarget.slice("https://counselo-legal.com".length) : rawTarget;
  if (source !== requestPath || !target || !/^\/(?:uae)(?:\/ar)?\/services\/[a-z0-9-]+$/.test(target)) return undefined;
  return requestPath.startsWith(`${target}/`) ? target : undefined;
}
