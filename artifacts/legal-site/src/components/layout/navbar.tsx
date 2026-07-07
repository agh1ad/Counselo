import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Languages } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";

const saudiFlag = "/saudi-flag.jpg";
const syrianFlag = "/syrian-flag.jpg";
const navbarBrand = "/navbar-brand.webp";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { t, lang, toggleLang } = useLanguage();
  const { region, regionPrefix } = useRegion();

  const flag = region === "syr" ? syrianFlag : saudiFlag;
  const flagAlt = region === "syr" ? "Syria" : "Saudi Arabia";

  const p = (path: string) => regionPrefix + path;

  const isActive = (path: string) =>
    path === ""
      ? location === regionPrefix || location === regionPrefix + "/"
      : location.startsWith(regionPrefix + path);

  const nextLangHref = (() => {
    const next = lang === "en" ? "ar" : "en";
    const rest = location.slice(regionPrefix.length);
    const nextPrefix = `/${region}${next === "ar" ? "/ar" : ""}`;
    return `${nextPrefix}${rest || ""}`;
  })();

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link href={regionPrefix}>
              <img
                src={navbarBrand}
                alt="CounselO — Online Legal Consultations"
                className="h-20 w-auto object-contain"
                width="606" height="235"
                fetchPriority="high" decoding="async"
              />
            </Link>
            <Link href="/" title="Change region">
              <img
                src={flag}
                alt={flagAlt}
                className="h-6 w-auto object-cover rounded-sm shadow-sm border border-border hover:opacity-80 transition-opacity cursor-pointer"
                width="36" height="24"
                loading="lazy" decoding="async"
              />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link
              href={regionPrefix}
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("") ? "text-primary" : "text-muted-foreground"}`}
            >
              {t.nav.home}
            </Link>

            {/* Services — hover to open, AnimatePresence for slide animation */}
            <div
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href={p("/services")}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isActive("/services") ? "text-primary" : "text-muted-foreground"}`}
              >
                {t.nav.services} <ChevronDown className="w-4 h-4" />
              </Link>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute start-0 mt-2 w-56 bg-background border border-border shadow-lg py-2 z-50"
                  >
                    {t.nav.servicesList.map((service) => (
                      <Link
                        key={service.href}
                        href={regionPrefix + service.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href={p("/about")}
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/about") ? "text-primary" : "text-muted-foreground"}`}
            >
              {t.nav.about}
            </Link>
            <Link
              href={p("/blog")}
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/blog") ? "text-primary" : "text-muted-foreground"}`}
            >
              {t.nav.blog}
            </Link>
            <Link
              href={p("/contact")}
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/contact") ? "text-primary" : "text-muted-foreground"}`}
            >
              {t.nav.contact}
            </Link>

            <a
              href={nextLangHref}
              onClick={(e) => { e.preventDefault(); toggleLang(); }}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-border px-3 py-1.5 hover:border-primary"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              {lang === "en" ? "عربي" : "English"}
            </a>

            <Link href={p("/contact")}>
              <Button className="font-medium bg-primary text-white hover:bg-primary/90">
                {t.nav.bookConsultation}
              </Button>
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href={nextLangHref}
              onClick={(e) => { e.preventDefault(); setIsOpen(false); toggleLang(); }}
              className="text-muted-foreground hover:text-primary text-sm font-medium border border-border px-2 py-1"
              aria-label="Toggle language"
            >
              {lang === "en" ? "ع" : "EN"}
            </a>
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="text-muted-foreground hover:text-primary p-1"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/*
        Mobile menu — inline styles for maxHeight + opacity so Tailwind's scanner
        doesn't have to pick up dynamic class strings (which it misses in ternaries).
        transition-all on static className handles the CSS animation.
      */}
      <div
        className="md:hidden bg-background border-b border-border overflow-hidden transition-all duration-200 ease-in-out"
        style={{ maxHeight: isOpen ? "100svh" : "0px", opacity: isOpen ? 1 : 0 }}
        aria-hidden={!isOpen}
      >
        <div className="overflow-y-auto max-h-[calc(100svh-6rem)]">
          <div className="px-4 pt-2 pb-10 space-y-1">
            <Link
              href={regionPrefix}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
            >
              {t.nav.home}
            </Link>
            <div className="px-3 py-2 text-base font-medium text-foreground">
              {t.nav.services}
            </div>
            <div className="ps-6 space-y-1">
              {t.nav.servicesList.map((service) => (
                <Link
                  key={service.href}
                  href={regionPrefix + service.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                >
                  {service.name}
                </Link>
              ))}
            </div>
            <Link
              href={p("/about")}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
            >
              {t.nav.about}
            </Link>
            <Link
              href={p("/blog")}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
            >
              {t.nav.blog}
            </Link>
            <Link
              href={p("/contact")}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
            >
              {t.nav.contact}
            </Link>
            <div className="px-3 pt-4">
              <Link href={p("/contact")} onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                  {t.nav.bookConsultation}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
