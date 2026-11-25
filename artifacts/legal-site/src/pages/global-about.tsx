import { Link } from "wouter";
import { ArrowLeft, ArrowRight, MonitorSmartphone, UsersRound, Scale, Globe2, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { COUNSELO_ABOUT_PATHS, COUNSELO_ORGANIZATION, COUNSELO_WEBSITE, OMAR_AL_BAGHDADI, OMAR_PORTRAIT, COOPERATING_OFFICES, COUNSELO_ENTITY_IDS, OMAR_OFFICIAL_PROFILE_URL, ENTITY_BASE_URL } from "@workspace/api-zod/browser";
import { ABOUT_UPDATED, globalAboutContent, aboutRegions } from "@/components/about/global-about-content";
import { GlobalTeamDirectory } from "@/components/about/global-team-directory";
import { EngagementStandards } from "@/components/legal/engagement-standards";
import { PlatformFacts } from "@/components/legal/platform-facts";
import "@/components/about/about.css";
import "@/components/about/global-about.css";

const countries = ["sa", "uae", "syr"] as const;
const featureIcons = [MonitorSmartphone, UsersRound, Scale, Globe2];

export default function GlobalAbout() {
  const { isRTL } = useLanguage();
  const language = isRTL ? "ar" : "en";
  const c = globalAboutContent[language];
  const languagePath = isRTL ? "/ar" : "";
  const pagePath = COUNSELO_ABOUT_PATHS[language];
  const homePath = languagePath || "/";
  const workPath = `${languagePath}/our-work`;
  const url = `${ENTITY_BASE_URL}${pagePath}`;
  const breadcrumbId = `${url}#breadcrumb`;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const offices = Object.values(COOPERATING_OFFICES);
  const countryName = (country: typeof countries[number]) => country === "uae"
    ? (isRTL ? "الإمارات العربية المتحدة" : "United Arab Emirates")
    : aboutRegions[country][language].country;
  const termsLinks = countries.map(country => ({
    href: `/${country}${languagePath}/terms-of-service`,
    label: countryName(country),
  }));
  const schema = [
    { "@context": "https://schema.org", ...COUNSELO_ORGANIZATION },
    { "@context": "https://schema.org", ...COUNSELO_WEBSITE },
    { "@context": "https://schema.org", ...OMAR_AL_BAGHDADI },
    ...offices.map(office => ({ "@context": "https://schema.org", ...office })),
    {
      "@context": "https://schema.org", "@type": "AboutPage",
      "@id": `${url}#webpage`, url, name: c.label, description: c.description,
      dateModified: ABOUT_UPDATED, inLanguage: language,
      isPartOf: { "@id": COUNSELO_ENTITY_IDS.website },
      mainEntity: { "@id": COUNSELO_ENTITY_IDS.organization },
      mentions: offices.map(office => ({ "@id": office["@id"] })),
      primaryImageOfPage: { "@id": OMAR_PORTRAIT["@id"] },
      breadcrumb: { "@id": breadcrumbId },
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isRTL ? "الرئيسية" : "Home", item: `${ENTITY_BASE_URL}${homePath}` },
        { "@type": "ListItem", position: 2, name: c.label, item: url },
      ],
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage", "@id": `${url}#faq`,
      inLanguage: language,
      mainEntity: c.faqs.map(faq => ({
        "@type": "Question", name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return <div className="about-platform-page global-about-page" dir={isRTL ? "rtl" : "ltr"}>
    <SEOHead title={c.label} description={c.description} canonical={pagePath} schema={schema}
      noRegionPrefix sharedLanguageAlternates={COUNSELO_ABOUT_PATHS} contentLanguage={language} ogImageUrl={`${ENTITY_BASE_URL}/og-image.png`} />

    <section className="about-hero" aria-labelledby="about-title">
      <div className="about-shell about-hero__grid">
        <div>
          <p className="about-kicker">{c.label}</p>
          <h1 id="about-title">{c.heading}</h1>
          <p className="about-hero__lead">{c.lead}</p>
          <div className="about-actions">
            <a href="#team-office" className="about-button about-button--gold">{isRTL ? "تعرّف على الفريق" : "Meet our team"}<Arrow size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <aside className="about-hero__promise" aria-labelledby="about-promise-title">
          <h2 id="about-promise-title">{c.heroSideTitle}</h2>
          <ul>{c.heroServices.map(text => <li key={text}><Check size={19} aria-hidden="true" /><span>{text}</span></li>)}</ul>
        </aside>
      </div>
    </section>

    <section className="about-features" aria-label={isRTL ? "كاونسلو باختصار" : "CounselO at a glance"}>
      <ul className="about-shell about-features__list">{c.features.map((item, index) => {
        const Icon = featureIcons[index];
        return <li key={item.title}><Icon size={28} strokeWidth={1.6} aria-hidden="true" /><div><h2>{item.title}</h2><p>{item.text}</p></div></li>;
      })}</ul>
    </section>

    <section className="about-story about-shell" aria-labelledby="about-platform-heading">
      <header className="about-story__intro">
        <h2 id="about-platform-heading">{c.platformTitle}</h2>
        <div>
          <p className="about-lead">{c.introduction}</p><p>{c.purpose}</p><p>{c.globalFocus}</p>
        </div>
      </header>
      <div className="about-story__row">
        <h3>{c.teamTitle}</h3>
        <div><p>{c.team}</p><p>{c.teamSupport}</p></div>
      </div>
      <div className="about-story__row">
        <h3>{c.complexTitle}</h3>
        <div><p>{c.complexText}</p></div>
      </div>
      <div id="about-services" className="about-story__row">
        <h3>{c.servicesTitle}</h3>
        <div>
          <p>{c.servicesIntro}</p>
          <ul className="about-service-list">{c.services.map(item => <li key={item.title}><h4>{item.title}</h4><p>{item.text}</p></li>)}</ul>
          <details className="about-country-disclosure"><summary>{c.countryServicesLink}</summary><nav aria-label={c.countryServicesLink} className="global-about-country-links">{countries.map(country => <Link key={country} href={`/${country}${languagePath}/services`} className="about-text-link" aria-label={`${c.servicesLink}: ${countryName(country)}`}>{countryName(country)}<Arrow size={17} aria-hidden="true" /></Link>)}</nav></details>
        </div>
      </div>
      <div className="about-story__row">
        <h3>{c.processTitle}</h3>
        <ol className="about-process">{c.process.map((item, index) => <li key={item.title}><span className="about-process__number" aria-hidden="true">{index + 1}</span><div><h4>{item.title}</h4><p>{item.text}</p></div></li>)}</ol>
      </div>
      <div className="about-story__row">
        <h3>{c.standardsTitle}</h3>
        <div><p>{c.standards}</p><p>{c.privacy}</p><details className="about-country-disclosure"><summary>{isRTL ? "سياسات الخصوصية حسب الدولة" : "Privacy policies by country"}</summary><nav aria-label={c.privacyLink} className="global-about-country-links">{countries.map(country => <Link key={country} href={`/${country}${languagePath}/privacy-policy`} className="about-text-link" aria-label={`${c.privacyLink}: ${countryName(country)}`}>{countryName(country)}<Arrow size={17} aria-hidden="true" /></Link>)}</nav></details></div>
      </div>
      <div className="about-story__row">
        <h3>{c.workTitle}</h3>
        <div><p>{c.workText}</p><Link href={workPath} className="about-text-link">{c.workLink}<Arrow size={17} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <div className="about-shell about-platform-proof"><PlatformFacts isArabic={isRTL} embedded linkWork={false} /></div>
    <div className="about-shell"><EngagementStandards isArabic={isRTL} termsLinks={termsLinks} /></div>

    <section className="about-founder" aria-labelledby="about-founder-heading">
      <div className="about-shell about-founder__grid">
        <div className="about-founder__portrait"><img src="/omar-baghdadi.jpg" alt={isRTL ? "المحامي والمستشار القانوني عمر البغدادي، مؤسس كاونسلو" : "Lawyer and legal counsel Omar Al-Baghdadi, founder of CounselO Legal"} width={OMAR_PORTRAIT.width} height={OMAR_PORTRAIT.height} loading="lazy" decoding="async" /><p>{c.founderLabel}</p></div>
        <div>
          <h2 id="about-founder-heading">{c.founderName}</h2>
          <p className="about-founder__role">{c.founderRole}</p>
          <p className="about-lead">{c.founderIntro}</p>
          <p>{c.founderExperience}</p>
          <dl className="about-founder__facts">{c.founderFacts.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.text}</dd></div>)}</dl>
          <a className="about-text-link" href={`${OMAR_OFFICIAL_PROFILE_URL}${languagePath}`} target="_blank" rel="noopener noreferrer">{c.profileLink}<Arrow size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>

    <GlobalTeamDirectory language={language} />

    <section id="faq" className="about-faq about-shell" aria-labelledby="about-faq-heading">
      <h2 id="about-faq-heading">{c.faqTitle}</h2>
      <div className="about-faq__answers">
        {c.faqs.map(faq => <article key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </article>)}
      </div>
    </section>

  </div>;
}
