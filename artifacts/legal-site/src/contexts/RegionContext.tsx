// @refresh reset
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useLocation } from "wouter";

export type Region = "sa" | "syr" | "uae";
export type Lang = "en" | "ar";

const BLOG_LANG_KEY = "counselo-blog-lang";
const SHARED_REGION_KEY = "counselo-shared-region";

function loadStoredLang(): Lang {
  if (typeof window !== "undefined") {
    const v = localStorage.getItem(BLOG_LANG_KEY);
    if (v === "ar" || v === "en") return v;
  }
  return "en";
}

function detectBlogLanguage(path: string): Lang | null {
  if (path === "/blog/ar" || path.startsWith("/blog/ar/")) return "ar";
  if (path === "/blog" || path.startsWith("/blog/en/")) return "en";
  return null;
}

function loadStoredRegion(): Region {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(SHARED_REGION_KEY);
    if (value === "sa" || value === "syr" || value === "uae") return value;
  }
  return "sa";
}

interface RegionContextType {
  region: Region;
  /** Language derived from URL for bilingual blog posts; otherwise preference/fallback. */
  lang: Lang;
  /** Region + language path prefix, e.g. "/sa", "/sa/ar", "/syr", "/syr/ar". */
  regionPrefix: string;
  /** True for region-independent content such as blog and Our Work pages. */
  isSharedPath: boolean;
  /** Updates the blog-page language preference (localStorage-backed). */
  setBlogLang: (lang: Lang) => void;
}

const RegionContext = createContext<RegionContextType | null>(null);

function detectRegion(path: string): Region {
  if (path.startsWith("/uae")) return "uae";
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
  // The bilingual region picker lives at the region-independent root `/ar`.
  // Treat it as Arabic before applying the regional-prefix rules below.
  if (path === "/ar" || path.startsWith("/ar/")) return "ar";
  const rest = path.slice(`/${region}`.length);
  return rest === "/ar" || rest.startsWith("/ar/") ? "ar" : "en";
}

export function RegionProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  // Match the deterministic SSR defaults on the first client render. Stored
  // preferences are applied after hydration to avoid React hydration errors.
  const [blogLang, setBlogLangState] = useState<Lang>("en");
  const [sharedRegion, setSharedRegion] = useState<Region>("sa");

  const isBlogPath = location === "/blog" || location.startsWith("/blog/");
  const isWorkPath =
    location === "/our-work" ||
    location.startsWith("/our-work/") ||
    location === "/ar/our-work" ||
    location.startsWith("/ar/our-work/");
  const isSharedPath = isBlogPath || isWorkPath;

  const region = isSharedPath ? sharedRegion : detectRegion(location);
  const lang: Lang = isBlogPath
    ? (detectBlogLanguage(location) ?? blogLang)
    : isWorkPath
      ? (location.startsWith("/ar/our-work") ? "ar" : "en")
      : detectLang(location, region);

  // When navigating to a regional page, persist that page's language so the
  // blog shows the same language when the user visits it next.
  useEffect(() => {
    if (isSharedPath) {
      setBlogLangState(loadStoredLang());
      setSharedRegion(loadStoredRegion());
    } else {
      const urlRegion = detectRegion(location);
      const urlLang = detectLang(location, urlRegion);
      localStorage.setItem(BLOG_LANG_KEY, urlLang);
      localStorage.setItem(SHARED_REGION_KEY, urlRegion);
      setBlogLangState(urlLang);
      setSharedRegion(urlRegion);
    }
  }, [location, isSharedPath]);

  const setBlogLang = (newLang: Lang) => {
    localStorage.setItem(BLOG_LANG_KEY, newLang);
    setBlogLangState(newLang);
  };

  // On blog pages, use a real region prefix so navbar links (About, Contact, etc.)
  // still navigate to the correct language region. Blog links bypass this prefix
  // because their language URL policy is content-dependent.
  const regionPrefix = `/${region}${lang === "ar" ? "/ar" : ""}`;

  return (
    <RegionContext.Provider value={{ region, lang, regionPrefix, isSharedPath, setBlogLang }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within RegionProvider");
  return ctx;
}
