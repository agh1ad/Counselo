// @refresh reset
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useLocation } from "wouter";

export type Region = "sa" | "syr";
export type Lang = "en" | "ar";

interface RegionContextType {
  region: Region;
  /** Language derived from the URL — the source of truth for both SSR and hydration. */
  lang: Lang;
  /** Region + language path prefix, e.g. "/sa", "/sa/ar", "/syr", "/syr/ar". */
  regionPrefix: string;
}

const RegionContext = createContext<RegionContextType | null>(null);

function detectRegion(path: string): Region {
  if (path.startsWith("/syr")) return "syr";
  return "sa";
}

/**
 * Language is a real URL segment (e.g. /sa/ar/about), not a client-side-only
 * preference. This makes Arabic a genuinely separate, crawlable page so
 * hreflang annotations point to distinct URLs with matching content —
 * required for Google to treat them as real language alternates.
 */
function detectLang(path: string, region: Region): Lang {
  const rest = path.slice(`/${region}`.length);
  return rest === "/ar" || rest.startsWith("/ar/") ? "ar" : "en";
}

export function RegionProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const region = detectRegion(location);
  const lang = detectLang(location, region);
  const regionPrefix = `/${region}${lang === "ar" ? "/ar" : ""}`;

  return (
    <RegionContext.Provider value={{ region, lang, regionPrefix }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within RegionProvider");
  return ctx;
}
