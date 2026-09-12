import { officialSources } from "../legal-updates/sources.js";
import {
  fetchOfficial,
  sourceText,
  discoverLinks,
  robotsAllows,
} from "../legal-updates/retrieval.js";
const report = await Promise.all(
  officialSources.map(async (source) => {
    try {
      const robots = await fetchOfficial(
        new URL("/robots.txt", source.url).href,
        source,
      );
      if (!robotsAllows(robots, new URL(source.url).pathname + new URL(source.url).search))
        return {
          source: source.id,
          url: source.url,
          status: "robots-disallowed",
        };
      const html = await fetchOfficial(source.url, source);
      return {
        source: source.id,
        url: source.url,
        status: "retrieved",
        characters: sourceText(html, false).length,
        links: discoverLinks(html, source).length,
      };
    } catch (error) {
      return {
        source: source.id,
        url: source.url,
        status: "failed",
        error: error instanceof Error ? error.message : "Retrieval failed",
      };
    }
  }),
);
console.log(JSON.stringify(report, null, 2));
if (report.some((r) => r.status !== "retrieved")) process.exitCode = 1;
