import { useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Mail, MessageCircle, Phone, Globe2, MonitorSmartphone, Clock3, MessagesSquare } from "lucide-react";
import { COUNSELO_ENTITY_IDS, COUNSELO_ORGANIZATION, COUNSELO_WEBSITE, OMAR_AL_BAGHDADI } from "@workspace/api-zod/browser";
import { PracticeDirectory } from "./practice-directory";
import { LatestContentCarousels } from "@/components/content/latest-content-carousels";
import { homepageContent } from "./homepage-content";
import { homepagePresentation } from "./homepage-presentation";
import "./homepage.css";
import "./homepage-refined.css";

const regions = [
  { id: "sa", flag: "/images/optimized/saudi-arabia-flag.webp" },
  { id: "syr", flag: "/images/optimized/syria-flag.webp" },
  { id: "uae", flag: "/images/optimized/uae-flag.svg" },
] as const;
const strengthIcons = [MonitorSmartphone, Clock3, MessagesSquare, Globe2];

export default function GlobalHomepage({ isArabic = false }: { isArabic?: boolean }) {
  const lang = isArabic ? "ar" : "en";
  const c = { ...homepageContent[lang], ...homepagePresentation[lang] };
  const suffix = isArabic ? "/ar" : "";
  const url = `https://counselo-legal.com${isArabic ? "/ar" : "/"}`;
  const countryLabels = isArabic ? ["السعودية", "سوريا", "الإمارات"] : ["Saudi Arabia", "Syria", "UAE"];
  const resources = [
    [isArabic ? "/ar/legal-library" : "/legal-library", isArabic ? "المكتبة القانونية" : "Legal library"],
    [isArabic ? "/blog/ar" : "/blog", isArabic ? "المقالات القانونية" : "Legal articles"],
    [isArabic ? "/ar/our-work" : "/our-work", isArabic ? "أعمالنا" : "Our work"],
  ];
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [lang, isArabic]);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      COUNSELO_WEBSITE,
      { ...COUNSELO_ORGANIZATION, description: c.intro },
      OMAR_AL_BAGHDADI,
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url,
        name: c.title, description: c.description, inLanguage: lang,
        isPartOf: { "@id": COUNSELO_ENTITY_IDS.website },
        about: { "@id": COUNSELO_ENTITY_IDS.organization },
      },
    ],
  };
  const arrow = <ArrowRight aria-hidden="true" className="home-arrow" />;
  return (
    <div className="counselo-home home-refined" dir={isArabic ? "rtl" : "ltr"}>
      <Helmet>
        <html lang={lang} dir={isArabic ? "rtl" : "ltr"} />
        <title>{c.title}</title>
        <meta name="description" content={c.description} />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href={url} />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://counselo-legal.com/"
        />
        <link
          rel="alternate"
          hrefLang="ar"
          href="https://counselo-legal.com/ar"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://counselo-legal.com/"
        />
        <meta property="og:title" content={c.title} />
        <meta property="og:description" content={c.description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CounselO Legal كاونسلو للاستشارات القانونية" />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content={isArabic ? "ar_SA" : "en_US"} />
        <meta
          property="og:locale:alternate"
          content={isArabic ? "en_US" : "ar_SA"}
        />
        <meta
          property="og:image"
          content="https://counselo-legal.com/og-image.png"
        />
        <meta property="og:image:alt" content="CounselO Legal كاونسلو للاستشارات القانونية" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={c.title} />
        <meta name="twitter:description" content={c.description} />
        <meta
          name="twitter:image"
          content="https://counselo-legal.com/og-image.png"
        />
        <script type="application/ld+json">
          {JSON.stringify(graph).replace(/</g, "\\u003c")}
        </script>
      </Helmet>
      <a href="#main-content" className="home-skip">{c.skip}</a>
      <header className="home-header home-container">
        <Link href={isArabic ? "/ar" : "/"} className="home-brand-lockup" aria-label={isArabic ? "كاونسلو للاستشارات القانونية الرئيسية" : "CounselO Legal home"}>
          <img src="/images/optimized/counselo-footer-logo.png" alt="" width="48" height="48" />
          <span><strong>{isArabic ? "كاونسلو" : "CounselO Legal"}</strong><small>{c.heroLabel}</small></span>
        </Link>
        <nav aria-label={isArabic ? "التنقل الرئيسي" : "Main navigation"}>
          <a href="#services">{isArabic ? "خدماتنا" : "Our services"}</a>
          <a href="#about">{isArabic ? "عن كاونسلو" : "About us"}</a>
        </nav>
        <div className="home-header-actions">
          <Link className="home-language" href={isArabic ? "/" : "/ar"} lang={isArabic ? "en" : "ar"} hrefLang={isArabic ? "en" : "ar"}><Globe2 size={17} aria-hidden="true" />{isArabic ? "English" : "العربية"}</Link>
          <a className="home-header-contact" href="#contact">{isArabic ? "تواصل معنا" : "Let’s talk"}</a>
        </div>
      </header>
      <main id="main-content">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-container home-hero-main">
            <div className="home-hero-copy">
              <h1 id="home-title">{c.h1}</h1>
              <p className="home-lede"><strong>{c.heroSummaryLead}</strong>{" "}{c.heroSummary}</p>
              <div className="home-actions">
                <a className="home-button" href="#contact">{c.primary}{arrow}</a>
                <a className="home-text-link" href="#services">{c.secondary}</a>
              </div>
            </div>
            <nav className="home-country-nav" aria-label={c.picker}>
              <p>{c.picker}</p>
              <div>{regions.map((r, i) => <Link key={r.id} href={`/${r.id}${suffix}`}>
                <img src={r.flag} width="36" height="24" alt="" />
                <span>{countryLabels[i]}</span>{arrow}
              </Link>)}</div>
            </nav>
          </div>
          <div className="home-container home-strengths">
            {c.strengths.map(([title, detail], i) => {
              const Icon = strengthIcons[i];
              return <div key={title}><Icon size={25} strokeWidth={1.7} aria-hidden="true" /><span><strong>{title}</strong>{detail && <small>{detail}</small>}</span></div>;
            })}
          </div>
        </section>
        <section id="about" className="home-introduction home-container" aria-labelledby="about-title">
          <div className="home-intro-heading"><h2 id="about-title">{c.about}</h2></div>
          <div className="home-intro-copy">
            <p className="home-intro-lead">{c.intro}</p>
            <p><strong className="home-professional-standard">{c.aboutTextLead}</strong>{" "}{c.aboutText}</p>
            <p className="home-intro-note">{c.aboutNote}</p>
            <div className="home-actions">
              <a className="home-button" href="#contact">{c.aboutPrimary}{arrow}</a>
              <Link className="home-text-link" href={`${suffix}/our-work`}>{c.aboutSecondary}{arrow}</Link>
            </div>
          </div>
        </section>
        <div id="services" className="home-directory-section"><PracticeDirectory isArabic={isArabic} variant="home" /></div>
        <LatestContentCarousels isArabic={isArabic} variant="home" />
        <section id="contact" className="home-contact" aria-labelledby="contact-title">
          <div className="home-container home-contact-grid">
            <div className="home-contact-copy"><h2 id="contact-title">{c.contact}</h2><p>{c.contactText}</p><p className="home-contact-note">{c.contactNote}</p></div>
            <div className="home-contact-panel">
              <a className="home-whatsapp" href="https://wa.me/966594850247"><MessageCircle size={26} aria-hidden="true" /><span><strong>{c.whatsapp}</strong><small>{isArabic ? "ابدأ الحديث مع فريقنا القانوني" : "Start a conversation with our legal team"}</small></span>{arrow}</a>
              <div className="home-direct-contacts">
                <a href="mailto:info@counselo-legal.com"><Mail size={20} aria-hidden="true" /><span>{c.email}<strong><bdi>info@counselo-legal.com</bdi></strong></span></a>
                <a href="tel:+966594850247"><Phone size={20} aria-hidden="true" /><span>{c.phone}<strong><bdi>+966 59 485 0247</bdi></strong></span></a>
              </div>
              <p>{c.form}</p><div className="home-contact-countries">{regions.map((r,i) => <Link key={r.id} href={`/${r.id}${suffix}/contact`}>{countryLabels[i]}{arrow}</Link>)}</div>
            </div>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <div className="home-container">
          <div className="home-footer-main">
            <div className="home-footer-brand"><Link href={isArabic ? "/ar" : "/"} className="home-brand-lockup"><img src="/images/optimized/counselo-footer-logo.png" alt="" width="48" height="48" /><strong>{isArabic ? "كاونسلو" : "CounselO Legal"}</strong></Link><p>{c.footerSummary}</p><a href="mailto:info@counselo-legal.com"><bdi>info@counselo-legal.com</bdi></a></div>
            <nav aria-label={c.footerExplore}><h2>{c.footerExplore}</h2>{resources.map(([href,label]) => <Link key={href} href={href}>{label}</Link>)}</nav>
            <nav aria-label={c.footerCountries}><h2>{c.footerCountries}</h2>{regions.map((r,i) => <Link key={r.id} href={`/${r.id}${suffix}/services`}>{c.countryNames[i]}</Link>)}<a href="#contact">{c.footerContact}</a></nav>
          </div>
          <div className="home-footer-bottom"><span>© {new Date().getFullYear()} {c.rights}</span><div><Link href={`/sa${suffix}/privacy-policy`}>{c.privacy}</Link><Link href={`/sa${suffix}/terms-of-service`}>{c.terms}</Link></div></div>
        </div>
      </footer>
    </div>
  );
}
