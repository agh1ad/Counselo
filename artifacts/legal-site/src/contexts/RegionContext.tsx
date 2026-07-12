// @refresh reset
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "wouter";

export type Region = "sa" | "syr";
export type Lang = "en" | "ar";

const BLOG_LANG_KEY = "counselo-blog-lang";

function loadStoredLang(): Lang {
  if (typeof window !== "undefined") {
    const v = localStorage.getItem(BLOG_LANG_KEY);
    if (v === "ar" || v === "en") return v;
  }
  return "en";
}

interface RegionContextType {
  region: Region;
  /** Language derived from URL (regional pages) or localStorage (blog pages). */
  lang: Lang;
  /** Region + language path prefix, e.g. "/sa", "/sa/ar", "/syr", "/syr/ar". */
  regionPrefix: string;
  /** True when the current path is /blog or /blog/:slug (single-URL blog). */
  isBlogPath: boolean;
  /** Updates the blog-page language preference (localStorage-backed). */
  setBlogLang: (lang: Lang) => void;
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
  const [blogLang, setBlogLangState] = useState<Lang>(loadStoredLang);

  const isBlogPath = location === "/blog" || location.startsWith("/blog/");

  const region = isBlogPath ? "sa" : detectRegion(location);
  const lang: Lang = isBlogPath ? blogLang : detectLang(location, region);

  // When navigating to a regional page, persist that page's language so the
  // blog shows the same language when the user visits it next.
  useEffect(() => {
    if (!isBlogPath) {
      const urlLang = detectLang(location, detectRegion(location));
      localStorage.setItem(BLOG_LANG_KEY, urlLang);
      setBlogLangState(urlLang);
    }
  }, [location, isBlogPath]);

  const setBlogLang = (newLang: Lang) => {
    localStorage.setItem(BLOG_LANG_KEY, newLang);
    setBlogLangState(newLang);
  };

  // On blog pages, use a real region prefix so navbar links (About, Contact, etc.)
  // still navigate to the correct language region. Blog-specific links (/blog, /blog/:slug)
  // are hardcoded and bypass this prefix, so they always resolve to the single blog URL.
  const regionPrefix = `/${region}${lang === "ar" ? "/ar" : ""}`;

  return (
    <RegionContext.Provider value={{ region, lang, regionPrefix, isBlogPath, setBlogLang }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within RegionProvider");
  return ctx;
}
