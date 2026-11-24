import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import {
  BAGHDADI_LAW_PROFILE_URL,
  COUNSELO_ABOUT_PATHS,
  COUNSELO_ENTITY_IDS,
  COUNSELO_ORGANIZATION,
  COUNSELO_WEBSITE,
  COOPERATING_OFFICES,
  ENTITY_BASE_URL,
  OMAR_AL_BAGHDADI,
  OMAR_OFFICIAL_PROFILE_URL,
  OMAR_PORTRAIT,
} from "@workspace/api-zod/browser";
import { aboutContent } from "@/components/about/about-content";
import {
  GLOBAL_ABOUT_JURISDICTIONS,
  GLOBAL_ABOUT_WORK,
  globalAboutContent,
} from "@/components/about/global-about-content";
import { GlobalAboutJurisdictions } from "@/components/about/global-about-jurisdictions";
import { PlatformFacts } from "@/components/legal/platform-facts";
import { SEOHead } from "@/components/seo/SEOHead";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import "@/components/about/about.css";
import "@/components/about/global-about.css";

export default function GlobalAbout() {
  const { lang, isRTL } = useLanguage();
  const c = globalAboutContent[lang];
  const founder = aboutContent[lang];
  const localePrefix = isRTL ? "/ar" : "";
  const homePath = localePrefix || "/";
  const workPath = `${localePrefix}/our-work`;
  const { email, telephone } = COUNSELO_ORGANIZATION.contactPoint;
  const whatsapp = `https://wa.me/${telephone.slice(1)}?text=${encodeURIComponent(c.whatsappMessage)}`;
  const canonical = COUNSELO_ABOUT_PATHS[lang];
  const url = `${ENTITY_BASE_URL}${canonical}`;
  const breadcrumbId = `${url}#breadcrumb`;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const offices = Object.values(COOPERATING_OFFICES);
  const navigation = [
    ["legal-services", c.servicesTitle],
    ["engagement", c.engagementTitle],
    ["leadership", c.leadership],
    ["jurisdictions", c.countryHeading],
    ["publications", c.publicationsTitle],
  ];
  const schema = [
    { "@context": "https://schema.org", ...COUNSELO_ORGANIZATION },
    { "@context": "https://schema.org", ...COUNSELO_WEBSITE },
    { "@context": "https://schema.org", ...OMAR_AL_BAGHDADI },
    ...offices.map(office => ({ "@context": "https://schema.org", ...office })),
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${url}#webpage`,
      url,
      name: c.heading,
      description: c.description,
      inLanguage: lang,
      isPartOf: { "@id": COUNSELO_ENTITY_IDS.website },
      mainEntity: { "@id": COUNSELO_ENTITY_IDS.organization },
      mentions: offices.map(office => ({ "@id": office["@id"] })),
      primaryImageOfPage: { "@id": OMAR_PORTRAIT["@id"] },
      breadcrumb: { "@id": breadcrumbId },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: c.home, item: `${ENTITY_BASE_URL}${homePath}` },
        { "@type": "ListItem", position: 2, name: c.title, item: url },
      ],
    },
  ];

  return (
    <div className="about-platform-page global-about-page" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead
        title={c.title}
        description={c.description}
        canonical={canonical}
        noRegionPrefix
        sharedLanguageAlternates={COUNSELO_ABOUT_PATHS}
        contentLanguage={lang}
        ogImageUrl={`${ENTITY_BASE_URL}/og-image.png`}
        ogImageAlt={c.logoAlt}
        schema={schema}
      />

      <Breadcrumb className="about-shell py-3" aria-label={c.breadcrumb}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link href={homePath}>{c.home}</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className={isRTL ? "rotate-180" : undefined} />
          <BreadcrumbItem><BreadcrumbPage>{c.title}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="about-hero" aria-labelledby="global-about-title">
        <div className="about-shell about-hero__grid">
          <div>
            <h1 id="global-about-title">{c.heading}</h1>
            <p className="about-hero__lead">{c.intro}</p>
            <div className="about-actions">
              <a className="about-button about-button--gold" href="#contact">{c.contact}<Arrow size={18} aria-hidden="true" /></a>
              <Link className="about-hero__services" href={workPath}>{c.work}<Arrow size={18} aria-hidden="true" /></Link>
            </div>
          </div>
          <nav className="about-hero__promise" aria-labelledby="global-about-countries">
            <h2 id="global-about-countries">{c.countryHeading}</h2>
            <ul>
              {GLOBAL_ABOUT_JURISDICTIONS.map(region => (
                <li key={region}>
                  <Link className="about-hero__services" href={`/${region}${localePrefix}/about`}>
                    {c.countries[region]}<Arrow size={17} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <nav className="about-features" aria-label={c.navigation}>
        <ul className="about-shell global-about-nav">
          {navigation.map(([anchor, label]) => (
            <li key={anchor}><a href={`#${anchor}`} className="about-text-link">{label}</a></li>
          ))}
        </ul>
      </nav>

      <section className="about-story about-shell" aria-labelledby="global-about-overview">
        <header className="about-story__intro">
          <h2 id="global-about-overview">{c.overviewTitle}</h2>
          <div><p className="about-lead">{c.overviewLead}</p><p>{c.overview}</p></div>
        </header>
        <div className="about-story__row">
          <h3>{c.methodTitle}</h3>
          <div><p>{c.method}</p></div>
        </div>
        <div className="about-story__row">
          <h3>{c.crossBorderTitle}</h3>
          <div><p>{c.crossBorder}</p></div>
        </div>
        <section id="legal-services" className="about-story__row" aria-labelledby="global-about-services-heading">
          <h2 id="global-about-services-heading">{c.servicesTitle}</h2>
          <div>
            <p>{c.servicesIntro}</p>
            <ul className="about-service-list global-about-service-list">
              {c.services.map(service => <li key={service.title}><h3>{service.title}</h3><p>{service.text}</p></li>)}
            </ul>
            <div className="flex flex-wrap gap-x-6">
              <a href="#jurisdictions" className="about-text-link">{c.serviceDirectory}<Arrow size={17} aria-hidden="true" /></a>
              <Link href={`${localePrefix}/urgent-legal-assistance`} className="about-text-link">{c.urgentLink}<Arrow size={17} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
        <section id="engagement" className="about-story__row" aria-labelledby="global-about-engagement-heading">
          <h2 id="global-about-engagement-heading">{c.engagementTitle}</h2>
          <div>
            <p>{c.engagementIntro}</p>
            <ol className="about-process global-about-process">
              {c.steps.map((step, index) => (
                <li key={step.title}>
                  <span className="about-process__number" aria-hidden="true">{(index + 1).toLocaleString(lang)}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="about-story__row" aria-labelledby="global-about-policies-heading">
          <h2 id="global-about-policies-heading">{c.policiesTitle}</h2>
          <div>
            <p>{c.policies}</p>
            <ul className="global-about-policy-list">
              {GLOBAL_ABOUT_JURISDICTIONS.map(region => (
                <li key={region}>
                  <h3>{c.countries[region]}</h3>
                  <Link className="about-text-link" href={`/${region}${localePrefix}/terms-of-service`} aria-label={`${c.terms} · ${c.countries[region]}`}>{c.terms}</Link>
                  <Link className="about-text-link" href={`/${region}${localePrefix}/privacy-policy`} aria-label={`${c.privacy} · ${c.countries[region]}`}>{c.privacy}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>

      <section id="leadership" className="about-founder" aria-labelledby="global-about-founder">
        <div className="about-shell about-founder__grid">
          <div className="about-founder__portrait">
            <img src="/omar-baghdadi.jpg" alt={c.imageAlt} width={OMAR_PORTRAIT.width} height={OMAR_PORTRAIT.height} loading="lazy" decoding="async" />
          </div>
          <div>
            <h2 id="global-about-founder">{founder.founderName}</h2>
            <p className="about-founder__role">{founder.founderRole}</p>
            <p className="about-lead">{founder.founderIntro}</p>
            <p>{founder.founderExperience}</p>
            <dl className="about-founder__facts">
              {founder.founderFacts.map(fact => <div key={fact.title}><dt>{fact.title}</dt><dd>{fact.text}</dd></div>)}
            </dl>
            <a className="about-text-link" href={`${OMAR_OFFICIAL_PROFILE_URL}${localePrefix}`}>
              {founder.profileLink}<Arrow size={17} aria-hidden="true" />
            </a>
            <p>{c.firm}</p>
            <a className="about-text-link" href={isRTL ? "https://www.baghdadilaw.co/ar/who-we-are" : BAGHDADI_LAW_PROFILE_URL}>
              {c.firmLink}<Arrow size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <GlobalAboutJurisdictions lang={lang} />

      <section id="publications" className="about-shell about-story global-about-publications" aria-labelledby="global-about-publications-heading">
        <header className="about-story__intro">
          <h2 id="global-about-publications-heading">{c.publicationsTitle}</h2>
          <div><p>{c.publicationsIntro}</p></div>
        </header>
        <PlatformFacts isArabic={isRTL} embedded />
        <ul className="about-service-list global-about-work-list">
          {GLOBAL_ABOUT_WORK.map(({ key, slug }) => {
            const example = c.examples[key];
            return <li key={key}>
              <h3><Link className="about-text-link" href={`${workPath}/${slug}`}>{example.title}<Arrow size={17} aria-hidden="true" /></Link></h3>
              <p>{example.text}</p>
            </li>;
          })}
        </ul>
        <div className="about-story__row">
          <h3>{c.libraryTitle}</h3>
          <div>
            <p>{c.library}</p>
            <Link className="about-text-link" href={`${localePrefix}/legal-library`}>{c.libraryLink}<Arrow size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section id="questions" className="about-faq about-shell" aria-labelledby="global-about-questions-heading">
        <h2 id="global-about-questions-heading">{c.questionsTitle}</h2>
        <div className="about-faq__answers">
          {c.questions.map(({ question, answer }) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}
        </div>
      </section>

      <section id="contact" className="about-closing about-shell" aria-labelledby="global-about-contact-heading">
        <div className="about-closing__panel">
          <div>
            <h2 id="global-about-contact-heading">{c.closingTitle}</h2>
            <p>{c.closingText}</p>
          </div>
          <div className="about-closing__actions">
            <a className="about-button about-button--gold" href={`mailto:${email}`}>{c.email}<Arrow size={18} aria-hidden="true" /></a>
            <a className="about-button about-button--outline" href={whatsapp}><MessageCircle size={19} aria-hidden="true" />{c.whatsapp}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
