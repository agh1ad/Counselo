import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { en } from "@/translations/en";
import { ar } from "@/translations/ar";

export type Lang = "en" | "ar";
export type Translations = typeof en;

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => setLang(prev => (prev === "en" ? "ar" : "en"));

  const isRTL = lang === "ar";
  const t = lang === "en" ? en : ar;

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
