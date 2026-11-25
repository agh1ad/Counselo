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
import "@/components/about/global-about-cover.css";
import "@/components/about/global-about-story.css";
import "@/components/about/global-about-founder-faq.css";

const coverImage = "/images/optimized/about-legal-folio-1100.webp";
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
      primaryImageOfPage: { "@type": "ImageObject", url: ENTITY_BASE_URL + coverImage, width: 1100, height: 825 },
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
      noRegionPrefix sharedLanguageAlternates={COUNSELO_ABOUT_PATHS} contentLanguage={language} ogImageUrl={ENTITY_BASE_URL + coverImage}
      ogImageAlt={isRTL ? "حافظة أوراق قانونية خضراء وقلم نحاسي" : "A green legal folio and brass fountain pen"} />

    <section className="about-cover" aria-labelledby="about-title">
      <div className="about-shell about-cover__grid">
        <header className="about-cover__intro">
          <p className="about-cover__label">{c.label}</p>
          <h1 id="about-title">{c.heading}</h1>
          <p className="about-cover__lead">{c.lead}</p>
          <a href="#team-office" className="about-cover__team-link">
            {isRTL ? "تعرّف على الفريق" : "Meet our team"}<Arrow size={18} aria-hidden="true" />
          </a>
        </header>
        <div className="about-cover__plate">
          <div className="about-cover__visual">
            <img src={coverImage}
              srcSet={`/images/optimized/about-legal-folio-600.webp 600w, ${coverImage} 1100w`}
              sizes="(max-width: 760px) calc(100vw - 3rem), (max-width: 1250px) 43vw, 535px"
              width={1100} height={825} fetchPriority="high" alt="" />
          </div>
          <aside className="about-cover__promise" aria-labelledby="about-promise-title">
            <h2 id="about-promise-title">{c.heroSideTitle}</h2>
            <ul>{c.heroServices.map(text => <li key={text}><Check size={14} strokeWidth={1.6} aria-hidden="true" />{text}</li>)}</ul>
          </aside>
        </div>
      </div>
    </section>

    <section className="about-at-a-glance" aria-label={isRTL ? "كاونسلو باختصار" : "CounselO at a glance"}>
      <ul className="about-shell about-at-a-glance__list">{c.features.map((item, index) => {
        const Icon = featureIcons[index];
        return <li key={item.title}><Icon size={23} strokeWidth={1.35} aria-hidden="true" /><div><h2>{item.title}</h2><p>{item.text}</p></div></li>;
      })}</ul>
    </section>

    <section className="about-story about-shell global-story" aria-labelledby="about-platform-heading">
      <header className="global-story__opening">
        <h2 id="about-platform-heading">{c.platformTitle}</h2>
        <p className="global-story__lead">{c.introduction}</p>
      </header>
      <div className="global-story__context">
        <p>{c.purpose}</p>
        <p>{c.globalFocus}</p>
      </div>
      <div className="global-story__perspectives">
        <section aria-labelledby="about-team-story">
          <h3 id="about-team-story">{c.teamTitle}</h3>
          <p>{c.team}</p><p>{c.teamSupport}</p>
        </section>
        <section aria-labelledby="about-case-story">
          <h3 id="about-case-story">{c.complexTitle}</h3>
          <p>{c.complexText}</p>
        </section>
      </div>
      <section id="about-services" className="about-services" aria-labelledby="about-services-title">
        <header className="about-services__intro">
          <h3 id="about-services-title">{c.servicesTitle}</h3>
          <p>{c.servicesIntro}</p>
        </header>
        <ul className="about-services__index">
          {c.services.map(item => <li key={item.title}><h4>{item.title}</h4><p>{item.text}</p></li>)}
        </ul>
        <details className="about-country-disclosure">
          <summary>{c.countryServicesLink}</summary>
          <nav aria-label={c.countryServicesLink} className="global-about-country-links">
            {countries.map(country => <Link key={country} href={`/${country}${languagePath}/services`} className="about-text-link" aria-label={`${c.servicesLink}: ${countryName(country)}`}>
              {countryName(country)}<Arrow size={17} aria-hidden="true" />
            </Link>)}
          </nav>
        </details>
      </section>
      <section className="global-story__process" aria-labelledby="about-process-title">
        <h3 id="about-process-title">{c.processTitle}</h3>
        <ol>{c.process.map((item, index) => <li key={item.title}>
          <span className="global-story__step" aria-hidden="true">{(index + 1).toLocaleString(language)}</span>
          <div><h4>{item.title}</h4><p>{item.text}</p></div>
        </li>)}</ol>
      </section>
      <section className="global-story__standards" aria-labelledby="about-standards-title">
        <h3 id="about-standards-title">{c.standardsTitle}</h3>
        <div>
          <p>{c.standards}</p><p>{c.privacy}</p>
          <details className="about-country-disclosure">
            <summary>{isRTL ? "سياسات الخصوصية حسب الدولة" : "Privacy policies by country"}</summary>
            <nav aria-label={c.privacyLink} className="global-about-country-links">
              {countries.map(country => <Link key={country} href={`/${country}${languagePath}/privacy-policy`} className="about-text-link" aria-label={`${c.privacyLink}: ${countryName(country)}`}>
                {countryName(country)}<Arrow size={17} aria-hidden="true" />
              </Link>)}
            </nav>
          </details>
        </div>
      </section>
      <section className="global-story__publication" aria-labelledby="about-published-work">
        <div className="global-story__publication-copy">
          <h3 id="about-published-work">{c.workTitle}</h3>
          <p>{c.workText}</p>
          <Link href={workPath} className="about-text-link">{c.workLink}<Arrow size={17} aria-hidden="true" /></Link>
        </div>
        <PlatformFacts isArabic={isRTL} embedded linkWork={false} className="global-story__facts" />
      </section>
    </section>

    <div className="about-shell"><EngagementStandards isArabic={isRTL} termsLinks={termsLinks} /></div>

    <section className="global-founder" aria-labelledby="about-founder-heading">
      <div className="about-shell global-founder__grid">
        <figure className="global-founder__portrait">
          <img src="/omar-baghdadi.jpg" alt={isRTL ? "المحامي والمستشار القانوني عمر البغدادي، مؤسس كاونسلو" : "Lawyer and legal counsel Omar Al-Baghdadi, founder of CounselO Legal"} width={OMAR_PORTRAIT.width} height={OMAR_PORTRAIT.height} loading="lazy" decoding="async" />
        </figure>
        <header className="global-founder__identity">
          <p className="global-founder__label">{c.founderLabel}</p>
          <h2 id="about-founder-heading">{c.founderName}</h2>
          <p className="global-founder__role">{c.founderRole}</p>
        </header>
        <div className="global-founder__bio">
          <p className="global-founder__intro">{c.founderIntro}</p>
          <p>{c.founderExperience}</p>
          <dl className="global-founder__facts">
            {c.founderFacts.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.text}</dd></div>)}
          </dl>
          <a className="global-founder__profile" href={`${OMAR_OFFICIAL_PROFILE_URL}${languagePath}`} target="_blank" rel="noopener noreferrer">
            {c.profileLink}<Arrow size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>

    <GlobalTeamDirectory language={language} />

    <section id="faq" className="about-shell global-about-faq" aria-labelledby="about-faq-heading">
      <h2 id="about-faq-heading">{c.faqTitle}</h2>
      <div className="global-about-faq__answers">
        {c.faqs.map(faq => <article key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </article>)}
      </div>
    </section>

  </div>;
}
