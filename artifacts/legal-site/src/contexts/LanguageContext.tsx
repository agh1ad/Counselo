import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { en } from "@/translations/en";
import { ar } from "@/translations/ar";
import { enSyr } from "@/translations/en-syr";
import { arSyr } from "@/translations/ar-syr";
import { useRegion } from "@/contexts/RegionContext";

export type Lang = "en" | "ar";
export type Translations = typeof en;

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  isRTL: boolean;
}

const STORAGE_KEY = "counselo-lang";

function getSavedLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "en") return saved;
  } catch {}
  return "en";
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getSavedLang);
  const { region } = useRegion();

  const toggleLang = () =>
    setLang(prev => {
      const next = prev === "en" ? "ar" : "en";
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
      return next;
    });

  const isRTL = lang === "ar";

  const t = useMemo<Translations>(() => {
    if (region === "syr") return lang === "en" ? enSyr : arSyr;
    return lang === "en" ? en : ar;
  }, [region, lang]);

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
