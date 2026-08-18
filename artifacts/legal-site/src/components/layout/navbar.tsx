import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Languages, ArrowRight, Globe2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";

const brandMark = "/images/optimized/counselo-footer-logo.png";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { t, lang, toggleLang } = useLanguage();
  const { region, regionPrefix, isSharedPath } = useRegion();

  const regionTitle = isSharedPath ? (lang === "ar" ? "رؤى عالمية" : "GLOBAL INSIGHTS") : {
    sa: lang === "ar" ? "السعودية" : "SAUDI ARABIA",
    syr: lang === "ar" ? "سوريا" : "SYRIA",
    uae: lang === "ar" ? "الإمارات" : "UAE",
  }[region];
  const regionPickerPath = lang === "ar" ? "/ar" : "/";

  const p = (path: string) => regionPrefix + path;
  const libraryPath = lang === "ar" ? "/ar/legal-library" : "/legal-library";
  const blogIndexPath = lang === "ar" ? "/blog/ar" : "/blog";
  const workPath = lang === "ar" ? "/ar/our-work" : "/our-work";
  const workLabel = lang === "ar" ? "أعمالنا" : "Our Work";

  const isActive = (path: string) =>
    path === "" ? location === regionPrefix || location === regionPrefix + "/"
    : location.startsWith(regionPrefix + path);

  return (
    <nav className={`region-navbar region-navbar--${region} fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-[#b4924a]/25`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-21">
          <div className="flex items-center gap-3 min-w-0">
            <Link href={isSharedPath ? regionPickerPath : regionPrefix} className="regional-navbar-lockup">
              <img src={brandMark} alt="" width="42" height="42" decoding="async" />
              <span className="uae-navbar-brand">
                <strong>{lang === "ar" ? "كاونسلو" : "CounselO"}</strong>
                <small>{lang === "ar" ? "استشارات قانونية أونلاين" : "LEGAL CONSULTATION, ONLINE"}</small>
              </span>
            </Link>
            <span className="uae-navbar-title">{regionTitle}</span>
          </div>

          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 rtl:space-x-reverse">
            {isSharedPath ? <>
              <Link href={regionPickerPath} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{t.nav.home}</Link>
              <Link href={lang === "ar" ? "/uae/ar" : "/uae"} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{lang === "ar" ? "الإمارات" : "UAE"}</Link>
              <Link href={lang === "ar" ? "/sa/ar" : "/sa"} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{lang === "ar" ? "السعودية" : "Saudi Arabia"}</Link>
              <Link href={lang === "ar" ? "/syr/ar" : "/syr"} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{lang === "ar" ? "سوريا" : "Syria"}</Link>
              <Link href={libraryPath} className={`text-sm font-medium transition-colors hover:text-primary ${location.includes("legal-library") ? "text-primary" : "text-muted-foreground"}`}>{t.nav.ourWork}</Link>
              <Link href={blogIndexPath} className={`text-sm font-medium transition-colors hover:text-primary ${(location === "/blog" || location.startsWith("/blog/")) ? "text-primary" : "text-muted-foreground"}`}>{t.nav.blog}</Link>
              <Link href={workPath} className={`text-sm font-medium transition-colors hover:text-primary ${(location.startsWith("/our-work") || location.startsWith("/ar/our-work")) ? "text-primary" : "text-muted-foreground"}`}>{workLabel}</Link>
              <Link href={regionPickerPath} className="region-picker-nav-link">
                <Globe2 aria-hidden="true" /><span>{lang === "ar" ? "الدول" : "Regions"}</span>
              </Link>
              <button onClick={toggleLang} className="flex items-center gap-1.5 border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label={lang === "en" ? "عربي — Switch to Arabic" : "English — التبديل إلى الإنجليزية"}>
                <Languages className="w-4 h-4" />{lang === "en" ? "عربي" : "English"}
              </button>
            </> : <>
            <Link href={regionPrefix} className={`relative py-2 text-[0.82rem] font-medium transition-colors hover:text-primary ${isActive("") ? "text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-[#b4924a]" : "text-muted-foreground"}`}>{t.nav.home}</Link>

            <div className="relative group" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <Link href={p("/services")} className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isActive("/services") ? "text-primary" : "text-muted-foreground"}`}>
                {t.nav.services} <ChevronDown className="w-4 h-4" />
              </Link>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  className="regional-services-menu absolute start-0 mt-2 bg-background border border-border shadow-lg py-2 z-50"
                  >
                    {t.nav.servicesList.map((service) => (
                      <Link key={service.href} href={regionPrefix + service.href} className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary transition-colors">
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href={p("/about")} className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/about") ? "text-primary" : "text-muted-foreground"}`}>{t.nav.about}</Link>
            <Link href={p("/vision")} className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/vision") ? "text-primary" : "text-muted-foreground"}`}>{lang === "ar" ? "رؤيتنا" : "Our Vision"}</Link>
            <Link href={libraryPath} className={`text-sm font-medium transition-colors hover:text-primary ${location.includes("legal-library") ? "text-primary" : "text-muted-foreground"}`}>{t.nav.ourWork}</Link>
            <Link href={blogIndexPath} className={`text-sm font-medium transition-colors hover:text-primary ${(location === "/blog" || location.startsWith("/blog/")) ? "text-primary" : "text-muted-foreground"}`}>{t.nav.blog}</Link>
            <Link href={workPath} className={`text-sm font-medium transition-colors hover:text-primary ${(location.startsWith("/our-work") || location.startsWith("/ar/our-work")) ? "text-primary" : "text-muted-foreground"}`}>{workLabel}</Link>
            <Link href={p("/contact")} className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/contact") ? "text-primary" : "text-muted-foreground"}`}>{t.nav.contact}</Link>

            <Link href={regionPickerPath} className="region-picker-nav-link">
              <Globe2 aria-hidden="true" />
              <span>{lang === "ar" ? "الدول" : "Regions"}</span>
            </Link>

            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-border px-3 py-1.5 hover:border-primary"
              aria-label={lang === "en" ? "عربي — Switch to Arabic" : "English — التبديل إلى الإنجليزية"}
            >
              <Languages className="w-4 h-4" />
              {lang === "en" ? "عربي" : "English"}
            </button>

            <Button asChild className="group rounded-none font-medium bg-primary text-white hover:bg-primary/90 shadow-[5px_5px_0_rgba(180,146,74,0.25)]">
              <Link href={p("/contact")}>
                {t.nav.bookConsultation}
                <ArrowRight className="ms-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
              </Link>
            </Button>
            </>}
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <Link href={regionPickerPath} aria-label={lang === "ar" ? "اختيار الدولة" : "Choose region"} className="text-[#886b31] hover:text-primary">
              <Globe2 className="h-5 w-5" />
            </Link>
            <button onClick={toggleLang} aria-label={lang === "en" ? "ع — Switch to Arabic" : "EN — Switch to English"} className="text-muted-foreground hover:text-primary text-sm font-medium border border-border px-2 py-1">
              {lang === "en" ? "ع" : "EN"}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} className="text-muted-foreground hover:text-primary">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="overflow-y-auto max-h-[calc(100svh-5.25rem)]">
            <div className="px-4 pt-2 pb-10 space-y-1">
              {isSharedPath ? <>
                <Link href={regionPickerPath} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{t.nav.home}</Link>
                <Link href={lang === "ar" ? "/uae/ar" : "/uae"} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{lang === "ar" ? "الإمارات العربية المتحدة" : "United Arab Emirates"}</Link>
                <Link href={lang === "ar" ? "/sa/ar" : "/sa"} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{lang === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia"}</Link>
                <Link href={lang === "ar" ? "/syr/ar" : "/syr"} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{lang === "ar" ? "سوريا" : "Syria"}</Link>
                <Link href={libraryPath} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{t.nav.ourWork}</Link>
                <Link href={blogIndexPath} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-primary">{t.nav.blog}</Link>
                <Link href={workPath} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{workLabel}</Link>
                <Link href={regionPickerPath} onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 text-base font-medium text-foreground hover:text-primary"><Globe2 className="h-4 w-4" />{lang === "ar" ? "اختيار الدولة" : "Choose Region"}</Link>
              </> : <>
              <Link href={regionPrefix} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{t.nav.home}</Link>
              <div className="px-3 py-2 text-base font-medium text-foreground">{t.nav.services}</div>
              <div className="ps-6 space-y-1">
                {t.nav.servicesList.map((service) => (
                  <Link key={service.href} href={regionPrefix + service.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary">
                    {service.name}
                  </Link>
                ))}
              </div>
              <Link href={p("/about")} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{t.nav.about}</Link>
              <Link href={p("/vision")} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{lang === "ar" ? "رؤيتنا" : "Our Vision"}</Link>
              <Link href={libraryPath} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{t.nav.ourWork}</Link>
              <Link href={blogIndexPath} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{t.nav.blog}</Link>
              <Link href={workPath} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{workLabel}</Link>
              <Link href={p("/contact")} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{t.nav.contact}</Link>
              <Link href={regionPickerPath} onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 text-base font-medium text-foreground hover:text-primary"><Globe2 className="h-4 w-4" />{lang === "ar" ? "اختيار الدولة" : "Choose Region"}</Link>
              <div className="px-3 pt-4">
                <Button asChild className="w-full bg-primary text-white hover:bg-primary/90">
                  <Link href={p("/contact")} onClick={() => setIsOpen(false)}>{t.nav.bookConsultation}</Link>
                </Button>
              </div>
              </>}
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
