import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Languages } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import saudiFlag from "@assets/image_1782789705620.jpeg";
import syrianFlag from "@assets/360_F_1136337946_c5gr8LMbgzdkl80hVpy8xRXYYQBTlp5x_1782856203372.jpg";
import navbarBrand from "@assets/Screen_Shot_2026-07-02_at_12.27.45_AM_1782937671982.png";

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
    path === "" ? location === regionPrefix || location === regionPrefix + "/"
    : location.startsWith(regionPrefix + path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href={regionPrefix} className="flex items-center gap-3">
            <img src={navbarBrand} alt="CounselO — Online Legal Consultations" className="h-20 w-auto object-contain" />
            <img
              src={flag}
              alt={flagAlt}
              className="h-6 w-auto object-cover rounded-sm shadow-sm border border-border"
              style={{ aspectRatio: "3/2", width: "36px" }}
            />
          </Link>

          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link href={regionPrefix} className={`text-sm font-medium transition-colors hover:text-primary ${isActive("") ? "text-primary" : "text-muted-foreground"}`}>{t.nav.home}</Link>

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
                    className="absolute start-0 mt-2 w-56 bg-background border border-border shadow-lg py-2 z-50"
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
            <Link href={p("/blog")} className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/blog") ? "text-primary" : "text-muted-foreground"}`}>{t.nav.blog}</Link>
            <Link href={p("/contact")} className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/contact") ? "text-primary" : "text-muted-foreground"}`}>{t.nav.contact}</Link>

            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-border px-3 py-1.5 hover:border-primary"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              {lang === "en" ? "عربي" : "English"}
            </button>

            <Link href={p("/contact")}>
              <Button className="font-medium bg-primary text-white hover:bg-primary/90">{t.nav.bookConsultation}</Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleLang} className="text-muted-foreground hover:text-primary text-sm font-medium border border-border px-2 py-1">
              {lang === "en" ? "ع" : "EN"}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-muted-foreground hover:text-primary">
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
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="overflow-y-auto max-h-[calc(100svh-6rem)]">
            <div className="px-4 pt-2 pb-10 space-y-1">
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
              <Link href={p("/blog")} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{t.nav.blog}</Link>
              <Link href={p("/contact")} onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">{t.nav.contact}</Link>
              <div className="px-3 pt-4">
                <Link href={p("/contact")} onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">{t.nav.bookConsultation}</Button>
                </Link>
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
