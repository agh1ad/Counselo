import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight, Globe2, Search, ChevronDown, House, BookOpen, BriefcaseBusiness, Users, Mail, Scale, FileText, Clock3, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { getServicesForRegion } from "@workspace/api-zod/browser";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { readingSearchKey } from "@/lib/article-reading";
import "./navigation.css";

const brandMark = "/images/optimized/counselo-footer-logo.png";
const countries = [
  { id: "sa", en: "Saudi Arabia", ar: "السعودية" },
  { id: "syr", en: "Syria", ar: "سوريا" },
  { id: "uae", en: "UAE", ar: "الإمارات" },
] as const;

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const { t, lang, toggleLang } = useLanguage();
  const { region, regionPrefix, isSharedPath } = useRegion();
  const ar = lang === "ar";
  const country = countries.find(item => item.id === region)!;
  const home = isSharedPath ? (ar ? "/ar" : "/") : regionPrefix;
  const library = ar ? "/ar/legal-library" : "/legal-library";
  const blog = ar ? "/blog/ar" : "/blog";
  const work = ar ? "/ar/our-work" : "/our-work";
  const contact = `${regionPrefix}/contact`;
  const serviceIndex = `${regionPrefix}/services`;
  const regionHome = (id: string) => `/${id}${ar ? "/ar" : ""}`;
  const label = ar ? {
    menu: "القائمة", open: "فتح قائمة التصفح", close: "إغلاق قائمة التصفح", title: "تصفّح كاونسلو",
    intro: "الصفحات الرئيسية والخدمات القانونية واختيار الدولة.", primary: "الصفحات الرئيسية",
    services: "الخدمات القانونية", servicesHint: "اختر المجال القانوني الذي تحتاج إليه.", all: "جميع الخدمات",
    search: "ابحث عن خدمة قانونية", placeholder: "الأسرة، العقود، العمل…", clear: "مسح البحث",
    noResults: "لم نجد خدمة بهذا الاسم.", reset: "عرض جميع الخدمات", country: "اختر الدولة", countryHint: "خدمات قانونية بحسب اختصاصك.",
    library: "المكتبة القانونية", articles: "المقالات القانونية", work: "نماذج الأعمال", about: "عن كاونسلو", contact: "تواصل معنا",
    consult: "ابدأ استشارتك", urgent: "مساعدة قانونية عاجلة", online: "استشارات قانونية أونلاين", global: "رؤى عالمية",
    language: "English — التبديل إلى الإنجليزية", found: "النتائج",
  } : {
    menu: "Menu", open: "Open navigation menu", close: "Close navigation menu", title: "Explore CounselO",
    intro: "Main pages, legal services and country selection.", primary: "Main pages",
    services: "Legal services", servicesHint: "Find the right practice area for your matter.", all: "All services",
    search: "Find a legal service", placeholder: "Family, contracts, employment…", clear: "Clear search",
    noResults: "No services match your search.", reset: "Show all services", country: "Choose your country", countryHint: "Legal services for your jurisdiction.",
    library: "Legal library", articles: "Legal articles", work: "Our work", about: "About CounselO", contact: "Contact us",
    consult: "Start a consultation", urgent: "Urgent legal assistance", online: "Online legal consultations", global: "Global insights",
    language: "عربي — Switch to Arabic", found: "Results",
  };
  const primaryLinks = [
    { href: home, title: t.nav.home, Icon: House },
    ...(!isSharedPath ? [{ href: `${regionPrefix}/about`, title: label.about, Icon: Users }] : []),
    { href: library, title: label.library, Icon: BookOpen },
    { href: blog, title: label.articles, Icon: FileText },
    { href: work, title: label.work, Icon: BriefcaseBusiness },
    ...(!isSharedPath ? [{ href: contact, title: label.contact, Icon: Mail }] : []),
  ];
  const services = getServicesForRegion(region).filter(service => service.kind !== "priority-intake");
  const words = readingSearchKey(query).split(/\s+/).filter(Boolean);
  const matches = services.filter(service => {
    const translated = t.nav.servicesList.find(item => item.href === `/services/${service.slug}`)?.name ?? "";
    const text = readingSearchKey(`${service.titleEn} ${service.titleAr} ${translated}`);
    return words.every(word => text.includes(word));
  });
  const active = (href: string) => location === href || (href !== home && location.startsWith(`${href}/`));
  const close = () => setOpen(false);
  const changeLanguage = () => { close(); toggleLang(); };
  useEffect(() => { setOpen(false); setServicesExpanded(false); setQuery(""); }, [location, lang]);
  useEffect(() => { if (!open) { setQuery(""); setServicesExpanded(false); } }, [open]);

  return <Dialog.Root open={open} onOpenChange={setOpen}>
    <header className="counselo-header" dir={ar ? "rtl" : "ltr"}>
      <div className="counselo-header__inner">
        <Link href={home} className="counselo-brand">
          <img src={brandMark} width="38" height="38" alt="" />
          <span><strong>{ar ? "كاونسلو للاستشارات القانونية" : "CounselO Legal"}</strong><small>{label.online}</small></span>
        </Link>
        <Link href={ar ? "/ar" : "/"} className="counselo-header__region" aria-label={`${label.country}: ${isSharedPath ? label.global : country[lang]}`}><Globe2 aria-hidden="true" />{isSharedPath ? label.global : country[lang]}</Link>
        <nav className="counselo-header__links" aria-label={label.primary}>
          <Link href={home} aria-current={location === home ? "page" : undefined}>{t.nav.home}</Link>
          {!isSharedPath && <><Link href={serviceIndex} data-active={active(serviceIndex)}>{label.services}</Link><Link href={`${regionPrefix}/about`} data-active={active(`${regionPrefix}/about`)}>{label.about}</Link></>}
          <Link href={library} data-active={active(library)}>{label.library}</Link>
          {isSharedPath ? <Link href={work} data-active={active(work)}>{label.work}</Link> : <Link href={contact} className="counselo-header__consult">{label.consult}</Link>}
        </nav>
        <div className="counselo-header__controls">
          <button type="button" onClick={changeLanguage} className="counselo-language" aria-label={label.language}><span lang={ar ? "en" : "ar"}>{ar ? "EN" : "ع"}</span></button>
          <Dialog.Trigger asChild><button type="button" className="counselo-menu-trigger" aria-label={label.open}><Menu aria-hidden="true" /><span>{label.menu}</span></button></Dialog.Trigger>
        </div>
      </div>
    </header>
    <Dialog.Portal>
      <Dialog.Overlay className="counselo-menu-overlay" />
      <Dialog.Content className="counselo-menu" dir={ar ? "rtl" : "ltr"} onOpenAutoFocus={event => { event.preventDefault(); closeRef.current?.focus(); }}>
        <div className="counselo-menu__heading">
          <div><Dialog.Title>{label.title}</Dialog.Title><p>{isSharedPath ? label.global : country[lang]}</p></div>
          <Dialog.Description className="sr-only">{label.intro}</Dialog.Description>
          <Dialog.Close asChild><button ref={closeRef} type="button" className="counselo-menu__close" aria-label={label.close}><X aria-hidden="true" /></button></Dialog.Close>
        </div>
        <div className="counselo-menu__scroll">
          <div className="counselo-menu__body">
            <div className="counselo-menu__primary">
              <nav aria-label={label.primary}>
                {primaryLinks.map(({ href, title, Icon }) => <Link key={href} href={href} onClick={close} data-active={active(href)} aria-current={location === href ? "page" : undefined}><Icon aria-hidden="true" /><span>{title}</span><ArrowRight className="counselo-nav-arrow" aria-hidden="true" /></Link>)}
              </nav>
              {!isSharedPath && <Link className="counselo-menu__consult" href={contact} onClick={close}>{label.consult}<ArrowRight className="counselo-nav-arrow" aria-hidden="true" /></Link>}
              <Link className="counselo-menu__urgent" href={isSharedPath ? `${ar ? "/ar" : ""}/urgent-legal-assistance` : `${serviceIndex}/urgent-legal-assistance`} onClick={close}><Clock3 aria-hidden="true" />{label.urgent}</Link>
            </div>
            <section className={`counselo-menu__services${servicesExpanded ? " is-expanded" : ""}`} aria-labelledby="navigation-services-title">
              {isSharedPath ? <>
                <h3 id="navigation-services-title">{label.country}</h3><p className="counselo-menu__hint">{label.countryHint}</p>
                <div className="counselo-menu__destinations">{countries.map(item => <Link key={item.id} href={`${regionHome(item.id)}/services`} onClick={close}><Globe2 aria-hidden="true" /><span><strong>{item[lang]}</strong><small>{label.services}</small></span><ArrowRight className="counselo-nav-arrow" aria-hidden="true" /></Link>)}</div>
              </> : <>
                <div className="counselo-menu__service-heading"><h3 id="navigation-services-title">{label.services}</h3><Link href={serviceIndex} onClick={close}>{label.all}<ArrowRight className="counselo-nav-arrow" aria-hidden="true" /></Link></div>
                <button type="button" className="counselo-menu__expand" aria-expanded={servicesExpanded} aria-controls="navigation-service-list" onClick={() => setServicesExpanded(value => !value)}><Scale aria-hidden="true" /><span>{label.services}</span><span className="counselo-menu__total">{services.length}</span><ChevronDown aria-hidden="true" /></button>
                <div className="counselo-menu__service-body" id="navigation-service-list">
                  <p className="counselo-menu__hint">{label.servicesHint}</p>
                  <label className="counselo-menu__search"><Search aria-hidden="true" /><span className="sr-only">{label.search}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={label.placeholder} />{query && <button type="button" aria-label={label.clear} onClick={() => setQuery("")}><X aria-hidden="true" /></button>}</label>
                  {query && <p className="counselo-menu__result-count" role="status">{label.found}: {matches.length}</p>}
                  <nav className="counselo-menu__service-grid" aria-label={label.services}>{matches.map(service => <Link key={service.slug} href={`${serviceIndex}/${service.slug}`} onClick={close} data-active={active(`${serviceIndex}/${service.slug}`)}>{ar ? service.titleAr : service.titleEn}<ArrowRight className="counselo-nav-arrow" aria-hidden="true" /></Link>)}</nav>
                  {!matches.length && <div className="counselo-menu__empty"><p>{label.noResults}</p><button type="button" onClick={() => setQuery("")}>{label.reset}</button></div>}
                  <Link href={serviceIndex} className="counselo-menu__all-services" onClick={close}>{label.all}<ArrowRight className="counselo-nav-arrow" aria-hidden="true" /></Link>
                </div>
              </>}
            </section>
          </div>
        </div>
          <div className="counselo-menu__footer">
            <nav className="counselo-menu__countries" aria-label={label.country}><span><Globe2 aria-hidden="true" />{label.country}</span><div>{countries.map(item => <Link key={item.id} href={regionHome(item.id)} onClick={close} aria-current={!isSharedPath && region === item.id ? "location" : undefined}>{item[lang]}{!isSharedPath && region === item.id && <Check aria-hidden="true" />}</Link>)}</div></nav>
            <button type="button" className="counselo-menu__language" onClick={changeLanguage} aria-label={label.language}><span lang={ar ? "en" : "ar"}>{ar ? "English" : "العربية"}</span><ArrowRight className="counselo-nav-arrow" aria-hidden="true" /></button>
          </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
