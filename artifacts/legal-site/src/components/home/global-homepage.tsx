import { PracticeDirectory } from "./practice-directory";
import { useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

import {
  COUNSELO_ENTITY_IDS,
  COUNSELO_ORGANIZATION,
  COUNSELO_WEBSITE,
  OMAR_AL_BAGHDADI,
  CONSULTATION_PRODUCTS,
  CONSULTATION_OPERATING_POLICY,
} from "@workspace/api-zod/browser";

import { homepageContent } from "./homepage-content";
import { homepageEditorial } from "./homepage-editorial";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Phone,
  Globe2,
  Check,
  Scale,
  Search,
  FileText,
  Route,
  Layers,
  UserRound,
  UsersRound,
  BriefcaseBusiness,
  ClipboardCheck,
  ListChecks,
  BookOpen,
  CircleHelp,
  Compass,
  type LucideIcon,
} from "lucide-react";
import { LatestContentCarousels } from "@/components/content/latest-content-carousels";
import { ExperienceMethodologyNote } from "@/components/legal/ExperienceMethodologyNote";
import {
  COUNSELO_LEGAL_MATTERS_CLAIM,
  COUNSELO_LEGAL_PRACTICE_CLAIM,
  COUNSELO_LEGAL_MATTERS_STAT,
  COUNSELO_EXPERIENCE_SCOPE_NOTE,
  getCounseloYearsOfPractice,
} from "@/lib/public-claims";
import "./homepage.css";
import "./homepage-refined.css";

const regions = [
  {
    id: "sa",
    flag: "/images/optimized/saudi-arabia-flag.webp",
    map: "/images/optimized/saudi-jurisdiction-map.svg",
  },
  {
    id: "syr",
    flag: "/images/optimized/syria-flag.webp",
    map: "/images/optimized/syria-jurisdiction-map.svg",
  },
  {
    id: "uae",
    flag: "/images/optimized/uae-flag.svg",
    map: "/images/optimized/uae-jurisdiction-map.svg",
  },
] as const;
const serviceIcons = [Search, MessageCircle, FileText, Route, Layers];
function SectionIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <span className="home-section-icon" aria-hidden="true"><Icon size={24} strokeWidth={1.6} focusable="false" /></span>;
}

const navigation = ["about", "services", "jurisdictions", "process", "contact"];

export default function GlobalHomepage({
  isArabic = false,
}: {
  isArabic?: boolean;
}) {
  const lang = isArabic ? "ar" : "en";
  const c = homepageContent[lang];
  const e = homepageEditorial[lang];
  const suffix = isArabic ? "/ar" : "";
  const url = `https://counselo-legal.com${isArabic ? "/ar" : "/"}`;
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
      ...CONSULTATION_PRODUCTS.map((product) => ({
        "@type": "Service",
        "@id": `${url}#${product.id}`,
        name: isArabic ? product.titleAr : product.titleEn,
        description: `${isArabic ? product.bestForAr : product.bestForEn} ${(isArabic ? product.includesAr : product.includesEn).join("; ")}`,
        provider: { "@id": COUNSELO_ENTITY_IDS.organization },
        areaServed: ["Saudi Arabia", "Syria", "United Arab Emirates"].map((name) => ({ "@type": "Country", name })),
        url: `${url}#${product.id}`,
      })),
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: c.title,
        description: c.description,
        inLanguage: lang,
        isPartOf: { "@id": COUNSELO_ENTITY_IDS.website },
        about: { "@id": COUNSELO_ENTITY_IDS.organization },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: c.questions.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
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
        <meta property="og:site_name" content="CounselO كاونسلو" />
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
        <meta property="og:image:alt" content="CounselO كاونسلو" />
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
      <a href="#main-content" className="home-skip">
        {c.skip}
      </a>
      <header className="home-header home-container">
        <Link
          href={isArabic ? "/ar" : "/"}
          aria-label={isArabic ? "كاونسلو الرئيسية" : "CounselO home"}
        >
          <img
            src="/images/optimized/counselo-region-logo.webp"
            alt="CounselO كاونسلو"
            width="193"
            height="80"
          />
        </Link>
        <nav aria-label={isArabic ? "التنقل الرئيسي" : "Main navigation"}>
          {navigation.map((id, i) => (
            <a key={id} href={`#${id}`}>
              {c.nav[i]}
            </a>
          ))}
          <Link href={isArabic ? "/ar/legal-updates" : "/legal-updates"}>{isArabic ? "المستجدات القانونية" : "Legal Updates"}</Link>
          <Link href={isArabic ? "/blog/ar" : "/blog"}>{isArabic ? "المقالات" : "Blog"}</Link>
          <Link href={isArabic ? "/ar/our-work" : "/our-work"}>{isArabic ? "أعمالنا" : "Our Work"}</Link>
          <Link href={isArabic ? "/ar/legal-library" : "/legal-library"}>
            {isArabic ? "المكتبة القانونية" : "Legal Library"}
          </Link>
        </nav>
        <Link
          className="home-language"
          href={isArabic ? "/" : "/ar"}
          lang={isArabic ? "en" : "ar"}
          hrefLang={isArabic ? "en" : "ar"}
        >
          {isArabic ? "English" : "العربية"}
        </Link>
      </header>
      <main id="main-content">
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-container home-hero-grid">
            <div>
              <p className="home-kicker">
                <Scale size={18} aria-hidden="true" />
                {isArabic
                  ? "كاونسلو للاستشارات القانونية"
                  : "CounselO legal consultations"}
              </p>
              <h1 id="home-title">{c.h1}</h1>
              <p className="home-lede">{c.heroSummary}</p>
              <div className="home-actions">
                <a className="home-button" href="#contact">
                  {c.primary}
                  {arrow}
                </a>
                <a className="home-text-link" href="#services">
                  {c.secondary}
                </a>
              </div>
            </div>
            <nav className="home-picker" aria-labelledby="picker-title">
              <div className="home-picker-label">
                <Globe2 size={18} aria-hidden="true" />
                {e.pickerLabel}
              </div>
              <h2 id="picker-title">{c.picker}</h2>
              <p>{c.pickerNote}</p>
              {regions.map((r, i) => (
                <Link
                  key={r.id}
                  href={`/${r.id}${suffix}`}
                  className="home-country-shortcut"
                >
                  <img src={r.flag} width="42" height="28" alt="" />
                  <span className="home-country-label">
                    <strong>{c.countryNames[i]}</strong>
                    <small>{e.countryNotes[i]}</small>
                    <span className="home-country-action">{c.enter}</span>
                  </span>
                  {arrow}
                </Link>
              ))}
              <div className="home-picker-help">
                <span>{e.unsure}</span>
                <a href="#contact">{e.ask}</a>
              </div>
            </nav>
          </div>
          <div className="home-container home-assurances">
            {e.trust.map(([title, text]) => (
              <div key={title}>
                <Check size={18} aria-hidden="true" />
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
              </div>
            ))}
          </div>
        </section>
        <section
          id="about"
          className="home-section home-container home-split"
          aria-labelledby="about-title"
        >
          <h2 id="about-title" className="home-icon-heading"><SectionIcon icon={Scale} /><span>{c.about}</span></h2>
          <div>
            <p className="home-lede">{c.intro}</p>
            <p>{c.aboutNote}</p>
          </div>
        </section>
        <PracticeDirectory isArabic={isArabic} />
        <section
          id="founder"
          className="home-founder"
          aria-labelledby="founder-title"
        >
          <div className="home-container home-founder-grid">
            <div className="home-founder-photo">
              <img
                src="/omar-baghdadi.jpg"
                alt={c.founderName}
                width="800"
                height="1200"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <h2 id="founder-title" className="home-icon-heading"><SectionIcon icon={UserRound} /><span>{c.founder}</span></h2>
              <h3>{c.founderName}</h3>
              <p className="home-founder-role">{c.founderRole}</p>
              <div
                className="home-founder-stats"
                aria-label={
                  isArabic ? "الخبرة المهنية" : "Professional experience"
                }
              >
                <div aria-label={COUNSELO_LEGAL_PRACTICE_CLAIM[lang]}>
                  <strong>
                    <bdi>{getCounseloYearsOfPractice()}+</bdi>
                  </strong>
                  <span>
                    {isArabic
                      ? "عاماً من الممارسة القانونية"
                      : "Years of legal practice"}
                  </span>
                </div>
                <div aria-label={COUNSELO_LEGAL_MATTERS_CLAIM[lang]}>
                  <strong>
                    <bdi>{COUNSELO_LEGAL_MATTERS_STAT[lang]}</bdi>
                  </strong>
                  <span>
                    {isArabic
                      ? "مسألة واستشارة قانونية"
                      : "Legal matters & consultations"}
                  </span>
                </div>
              </div>
              <p className="home-claim-context">{isArabic ? "الخبرة المهنية المعلنة للمؤسس، وليست مدة تشغيل المنصة أو عدد عملائها." : "The founder’s stated professional experience, not the platform’s operating history or client count."} {COUNSELO_EXPERIENCE_SCOPE_NOTE[lang]}</p>
              <p>{c.founderText}</p>
              <div className="home-link-stack">
                <a href={`https://omarbaghdadi.com${isArabic ? "/ar" : "/"}`}>
                  {c.profile}
                  {arrow}
                </a>
                <a href="https://www.baghdadilaw.co/who-we-are">
                  {c.firm}
                  {arrow}
                </a>
              </div>
              <details className="home-experience">
                <summary>{c.experience}</summary>
                <ExperienceMethodologyNote isArabic={isArabic} />
              </details>
            </div>
          </div>
        </section>
        <section
          id="services"
          className="home-section home-container"
          aria-labelledby="services-title"
        >
          <div className="home-section-intro">
            <h2 id="services-title" className="home-icon-heading"><SectionIcon icon={MessageCircle} /><span>{c.services}</span></h2>
            <p>{c.servicesIntro}</p>
          </div>
          <div className="home-services home-services-v2">
            {CONSULTATION_PRODUCTS.map((p, i) => {
              const Icon = serviceIcons[i] ?? Scale;
              return (
                <article key={p.id} id={p.id}>
                  <span className="home-service-icon">
                    <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{isArabic ? p.titleAr : p.titleEn}</h3>
                    <p>{isArabic ? p.bestForAr : p.bestForEn}</p>
                    <p className="home-service-includes">{isArabic ? "ضمن النطاق المتفق عليه:" : "Within the agreed scope:"}</p>
                    <ul className="home-service-deliverables">
                      {(isArabic ? p.includesAr : p.includesEn).map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="home-services-action">
            <div>
              <p>{c.areas}</p>
              <Link className="home-text-link" href={isArabic ? "/ar/urgent-legal-assistance" : "/urgent-legal-assistance"}>{isArabic ? "تحتاج إلى مساعدة قانونية عاجلة؟" : "Need urgent legal assistance?"}{arrow}</Link>
            </div>
            <a className="home-button" href="#contact">
              {c.primary}
              {arrow}
            </a>
          </div>
        </section>
        <section
          id="practice-areas"
          className="home-practice home-section"
          aria-labelledby="practice-title"
        >
          <div className="home-container">
            <div className="home-section-intro">
              <h2 id="practice-title" className="home-icon-heading"><SectionIcon icon={Compass} /><span>{e.practiceTitle}</span></h2>
              <p>{e.practiceIntro}</p>
            </div>
            <div className="home-practice-grid">
              {e.practices.map(([title, text]) => (
                <details key={title}>
                  <summary>
                    {title}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{text}</p>
                  <a href="#jurisdictions">
                    {e.pickerLabel}
                    {arrow}
                  </a>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section
          className="home-section home-container"
          aria-labelledby="clients-title"
        >
          <h2 id="clients-title" className="home-icon-heading"><SectionIcon icon={UsersRound} /><span>{e.clientsTitle}</span></h2>
          <div className="home-clients">
            {e.clients.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
                <a className="home-text-link" href="#contact">
                  {c.primary}
                  {arrow}
                </a>
              </article>
            ))}
          </div>
        </section>
        <section
          id="jurisdictions"
          className="home-jurisdictions home-section"
          aria-labelledby="jurisdictions-title"
        >
          <div className="home-container">
            <div className="home-section-intro">
              <h2 id="jurisdictions-title" className="home-icon-heading"><SectionIcon icon={Globe2} /><span>{c.jurisdictions}</span></h2>
              <p>{c.pickerNote}</p>
            </div>
            <div className="home-country-grid">
              {regions.map((r, i) => (
                <article key={r.id} className="home-country">
                  <img
                    className="home-country-map"
                    src={r.map}
                    width="620"
                    height="440"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{c.countryNames[i]}</h3>
                  <p>{c.countryDetails[i]}</p>
                  <Link href={`/${r.id}${suffix}/services`}>
                    {c.enter}
                    {arrow}
                  </Link>
                </article>
              ))}
            </div>
            <p className="home-note">
              {isArabic
                ? CONSULTATION_OPERATING_POLICY.representationAr
                : CONSULTATION_OPERATING_POLICY.representationEn}
            </p>
          </div>
        </section>
        <section
          id="process"
          className="home-section home-container"
          aria-labelledby="process-title"
        >
          <h2 id="process-title" className="home-icon-heading"><SectionIcon icon={Route} /><span>{c.process}</span></h2>
          <ol className="home-process">
            {c.steps.map(([title, text], i) => (
              <li key={title}>
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section
          className="home-package home-section"
          aria-labelledby="package-title"
        >
          <div className="home-container home-split">
            <div>
              <h2 id="package-title" className="home-icon-heading"><SectionIcon icon={ClipboardCheck} /><span>{e.packageTitle}</span></h2>
              <p>{e.packageText}</p>
              <p className="home-response">{e.response}</p>
            </div>
            <ul>
              {e.deliverables.map((item) => (
                <li key={item}>
                  <Check size={19} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section
          className="home-cross home-section home-container"
          aria-labelledby="cross-title"
        >
          <div className="home-cross-heading">
            <h2 id="cross-title" className="home-icon-heading"><SectionIcon icon={Globe2} /><span>{e.crossTitle}</span></h2>
          </div>
          <div>
            <p className="home-lede">{e.crossText}</p>
            <p>{e.crossNote}</p>
            <a href="#contact" className="home-text-link">
              {e.crossCta}
              {arrow}
            </a>
          </div>
        </section>
        <section
          id="why-counselo"
          className="home-why home-section"
          aria-labelledby="why-title"
        >
          <div className="home-container home-split">
            <div>
              <h2 id="why-title" className="home-icon-heading"><SectionIcon icon={ListChecks} /><span>{c.why}</span></h2>
              <p>{c.whyIntro}</p>
            </div>
            <div className="home-reasons">
              {c.reasons.map(([title, text]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          className="home-section home-container"
          aria-labelledby="resources-title"
        >
          <h2 id="resources-title" className="home-icon-heading"><SectionIcon icon={BookOpen} /><span>{c.resources}</span></h2>
          <p className="home-readable">{c.resourcesText}</p>
          <div className="home-resource-links">
            <Link
              className="home-text-link"
              href={isArabic ? "/blog/ar" : "/blog"}
            >
              {c.blog}
              {arrow}
            </Link>
            <Link
              className="home-text-link"
              href={isArabic ? "/ar/our-work" : "/our-work"}
            >
              {c.work}
              {arrow}
            </Link>
          </div>
        </section>
        <LatestContentCarousels isArabic={isArabic} />
        <section
          id="faq"
          className="home-section home-container home-split"
          aria-labelledby="faq-title"
        >
          <h2 id="faq-title" className="home-icon-heading"><SectionIcon icon={CircleHelp} /><span>{c.faq}</span></h2>
          <div className="home-faq">
            {c.questions.map(([q, a]) => (
              <details key={q}>
                <summary>{q}<span className="home-faq-toggle" aria-hidden="true">+</span></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          id="contact"
          className="home-contact home-section"
          aria-labelledby="contact-title"
        >
          <div className="home-container home-split">
            <div>
              <h2 id="contact-title" className="home-icon-heading"><SectionIcon icon={MessageCircle} /><span>{c.contact}</span></h2>
              <p>{c.contactText}</p>
              <p className="home-contact-note">{c.contactNote}</p>
            </div>
            <div>
              <div className="home-contact-links">
                <a href="https://wa.me/966594850247">
                  <MessageCircle aria-hidden="true" />
                  {c.whatsapp}
                  {arrow}
                </a>
                <a href="mailto:info@counselo-legal.com">
                  <Mail aria-hidden="true" />
                  <span>
                    {c.email}
                    <small dir="ltr">info@counselo-legal.com</small>
                  </span>
                </a>
                <a href="tel:+966594850247">
                  <Phone aria-hidden="true" />
                  <span>
                    {c.phone}
                    <small dir="ltr">+966 59 485 0247</small>
                  </span>
                </a>
              </div>
              <p>{c.form}</p>
              <div className="home-contact-countries">
                {regions.map((r, i) => (
                  <Link key={r.id} href={`/${r.id}${suffix}/contact`}>
                    {c.countryNames[i]}
                    {arrow}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <div className="home-container">
          <nav
            aria-label={isArabic ? "روابط الدول" : "Country navigation"}
            className="home-footer-grid"
          >
            {regions.map((r, i) => (
              <div key={r.id}>
                <p>{c.countryNames[i]}</p>
                {[
                  ["", c.countryNames[i]],
                  ["/services", c.nav[1]],
                  ["/about", c.founder],
                  ["/contact", c.nav[4]],
                ].map(([path, label]) => (
                  <Link key={path} href={`/${r.id}${suffix}${path}`}>
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
          <div className="home-footer-bottom">
            <span>
              © {new Date().getFullYear()} {c.rights}
            </span>
            <div>
              <Link href={`/sa${suffix}/privacy-policy`}>{c.privacy}</Link>
              <Link href={`/sa${suffix}/terms-of-service`}>{c.terms}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
