import sanitizeHtml from "sanitize-html";
import { approvedUrl, type OfficialSource } from "./sources.js";
const MAX_BYTES = 1_500_000;
export async function fetchOfficial(
  raw: string,
  source: OfficialSource,
  depth = 0,
): Promise<string> {
  const url = approvedUrl(raw, source);
  const response = await fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(20_000),
    headers: {
      "User-Agent": "CounselOLegalUpdates/1.0 (+https://counselo-legal.com)",
      Accept: "text/html,text/plain,application/xml",
    },
  });
  if (response.status >= 300 && response.status < 400) {
    await response.body?.cancel();
    if (depth >= 3 || !response.headers.get("location"))
      throw new Error("Source redirect limit");
    return fetchOfficial(
      new URL(response.headers.get("location")!, url).href,
      source,
      depth + 1,
    );
  }
  if (url.pathname === "/robots.txt" && response.status === 404) {
    await response.body?.cancel();
    return ""; // No robots resource; other failures remain blocking.
  }
  if (!response.ok) {
    await response.body?.cancel();
    throw new Error(`Source HTTP ${response.status}`);
  }
  if (
    url.pathname !== "/robots.txt" &&
    !/text\/|xml/i.test(response.headers.get("content-type") || "")
  ) {
    await response.body?.cancel();
    throw new Error("Unsupported source format; requires editorial retrieval");
  }
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Empty source");
  let length = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.length;
    if (length > MAX_BYTES) {
      await reader.cancel();
      throw new Error("Source exceeds retrieval limit");
    }
    chunks.push(value);
  }
  const content = Buffer.concat(chunks).toString("utf8");
  if (
    url.pathname === "/robots.txt" &&
    /<(?:!doctype|html|head)\b/i.test(content)
  )
    throw new Error("Source returned an HTML page instead of robots.txt");
  return content;
}
export function sourceText(html: string, article = true) {
  const content =
    (article
      ? html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1]
      : undefined) ||
    html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ||
    html;
  return sanitizeHtml(content, {
    allowedTags: [],
    allowedAttributes: {},
    nonTextTags: [
      "script",
      "style",
      "textarea",
      "noscript",
      "nav",
      "footer",
      "header",
    ],
    textFilter: (text) => `${text} `,
  })
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}
export function discoverLinks(html: string, source: OfficialSource) {
  const links = new Set<string>();
  sanitizeHtml(html, {
    transformTags: {
      a: (tagName, attrs) => {
        try {
          const url = approvedUrl(
            new URL(attrs.href || "", source.url).href,
            source,
          );
          if (
            url.href !== source.url &&
            !/\.(?:jpg|png|zip|pdf|css|js)$/i.test(url.pathname)
          )
            links.add(url.href);
        } catch {}
        return { tagName, attribs: attrs };
      },
    },
  });
  // RSS/Atom feed entries use link elements rather than HTML anchors.
  const feedLinks = [
    ...html.matchAll(
      /<link\b[^>]*>(?:<!\[CDATA\[)?([^<]+?)(?:\]\]>)?<\/link>/gi,
    ),
  ].map((m) => m[1].trim());
  for (const match of html.matchAll(
    /<link\b[^>]*href=["']([^"']+)["'][^>]*>/gi,
  ))
    feedLinks.push(match[1]);
  for (const raw of feedLinks) {
    try {
      const url = approvedUrl(raw.replace(/&amp;/g, "&"), source);
      if (!/\.(?:pdf|jpg|png|zip|css|js|ico|woff2?)$/i.test(url.pathname)) links.add(url.href);
    } catch {
      /* ignore unapproved entries */
    }
  }
  return [...links].slice(0, 300);
}
// Match our actual crawler's group, falling back to *. Most-specific rule wins;
// Allow wins ties. Rules for unrelated bots must not disable this crawler.
export function robotsAllows(
  robots: string,
  path: string,
  agent = "CounselOLegalUpdates",
) {
  const groups: {
    agents: string[];
    rules: { allow: boolean; path: string }[];
  }[] = [];
  let group = {
    agents: [] as string[],
    rules: [] as { allow: boolean; path: string }[],
  };
  for (const line of robots.split(/\r?\n/)) {
    const match = line
      .replace(/#.*/, "")
      .match(/^\s*(user-agent|allow|disallow)\s*:\s*(.*?)\s*$/i);
    if (!match) continue;
    if (match[1].toLowerCase() === "user-agent") {
      if (group.rules.length) {
        groups.push(group);
        group = { agents: [], rules: [] };
      }
      group.agents.push(match[2].toLowerCase());
    } else if (match[2])
      group.rules.push({
        allow: match[1].toLowerCase() === "allow",
        path: match[2],
      });
  }
  groups.push(group);
  const score = (g: typeof group) =>
    Math.max(
      -1,
      ...(g.agents.length ? g.agents : ["*"]).map((a) =>
        a === "*" ? 0 : agent.toLowerCase().includes(a) ? a.length : -1,
      ),
    );
  const best = Math.max(...groups.map(score));
  if (best < 0) return true;
  let winner: { allow: boolean; length: number } | undefined;
  for (const g of groups.filter((g) => score(g) === best))
    for (const rule of g.rules) {
      const exactEnd = rule.path.endsWith("$");
      const raw = exactEnd ? rule.path.slice(0, -1) : rule.path;
      const pattern = raw
        .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*");
      if (new RegExp(`^${pattern}${exactEnd ? "$" : ""}`).test(path)) {
        const length = raw.replace(/\*/g, "").length;
        if (
          !winner ||
          length > winner.length ||
          (length === winner.length && rule.allow)
        )
          winner = { allow: rule.allow, length };
      }
    }
  return winner?.allow ?? true;
}
