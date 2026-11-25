import { Link } from "wouter";
import { ArrowLeft, ArrowRight, MonitorSmartphone, UsersRound, Scale, Globe2, Check, ShieldCheck, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { COUNSELO_ABOUT_PATHS, COUNSELO_ORGANIZATION, COUNSELO_WEBSITE, OMAR_AL_BAGHDADI, OMAR_PORTRAIT, COOPERATING_OFFICES, COUNSELO_ENTITY_IDS, OMAR_OFFICIAL_PROFILE_URL, ENTITY_BASE_URL } from "@workspace/api-zod/browser";
import { ABOUT_UPDATED, SAUDI_PARTNER_LICENCE, SAUDI_LAWYER_DIRECTORY, globalAboutContent, aboutRegions, regionalCredentialLookup, syrianPartners } from "@/components/about/global-about-content";
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
  const whatsapp = `https://wa.me/${COUNSELO_ORGANIZATION.contactPoint.telephone.slice(1)}?text=${encodeURIComponent(isRTL
    ? "مرحباً كاونسلو، أود مناقشة مسألة قانونية وتحديد نطاق العمل والأتعاب."
    : "Hello CounselO, I would like to discuss a legal matter and confirm the scope and fee.")}`;
  const offices = Object.values(COOPERATING_OFFICES);
  const countryName = (country: typeof countries[number]) => country === "uae"
    ? (isRTL ? "الإمارات العربية المتحدة" : "United Arab Emirates")
    : aboutRegions[country][language].country;
  const termsLinks = countries.map(country => ({
    href: `/${country}${languagePath}/terms-of-service`,
    label: `${isRTL ? "شروط الخدمة" : "Service terms"} · ${countryName(country)}`,
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
            <a href="#about-contact" className="about-button about-button--gold" data-cta="contact" data-conversion-position="about-hero" data-lang={language}>{c.contact}<Arrow size={18} aria-hidden="true" /></a>
            <a href="#about-services" className="about-hero__services">{c.servicesLink}<Arrow size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <aside className="about-hero__promise" aria-labelledby="about-promise-title">
          <h2 id="about-promise-title">{c.heroSideTitle}</h2>
          <ul>{c.heroServices.map(text => <li key={text}><Check size={19} aria-hidden="true" /><span>{text}</span></li>)}</ul>
          <Link href={workPath} className="about-hero__services about-hero__work">{c.workLink}<Arrow size={17} aria-hidden="true" /></Link>
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
          <nav aria-label={c.countryServicesLink} className="global-about-country-links">{countries.map(country => <Link key={country} href={`/${country}${languagePath}/services`} className="about-text-link" aria-label={`${c.servicesLink}: ${countryName(country)}`}>{countryName(country)}<Arrow size={17} aria-hidden="true" /></Link>)}</nav>
        </div>
      </div>
      <div className="about-story__row">
        <h3>{c.processTitle}</h3>
        <ol className="about-process">{c.process.map((item, index) => <li key={item.title}><span className="about-process__number" aria-hidden="true">{index + 1}</span><div><h4>{item.title}</h4><p>{item.text}</p></div></li>)}</ol>
      </div>
      <div className="about-story__row">
        <h3>{c.standardsTitle}</h3>
        <div><p>{c.standards}</p><p>{c.privacy}</p><nav aria-label={c.privacyLink} className="global-about-country-links">{countries.map(country => <Link key={country} href={`/${country}${languagePath}/privacy-policy`} className="about-text-link" aria-label={`${c.privacyLink}: ${countryName(country)}`}>{c.privacyLink} · {countryName(country)}<Arrow size={17} aria-hidden="true" /></Link>)}</nav></div>
      </div>
      <div className="about-story__row">
        <h3>{c.workTitle}</h3>
        <div><p>{c.workText}</p><Link href={workPath} className="about-text-link">{c.workLink}<Arrow size={17} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <div className="about-shell about-platform-proof"><PlatformFacts isArabic={isRTL} embedded /></div>
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

    <section id="team-office" className="about-shell global-about-team" aria-labelledby="about-team-heading">
      <header className="about-story__intro">
        <h2 id="about-team-heading">{c.countriesTitle}</h2>
        <div><p>{c.countriesIntro}</p></div>
      </header>
      {countries.map(country => {
        const local = aboutRegions[country][language];
        const credentialLookup = regionalCredentialLookup[country][language];
        return <article id={`about-country-${country}`} className="about-partner global-about-team__country" key={country} aria-labelledby={`about-country-${country}-heading`}>
          <h3 id={`about-country-${country}-heading`} className="global-about-team__country-name">{countryName(country)}</h3>
          <div className="about-partner__identity">
            {country === "sa"
              ? <img className="about-partner__logo" src="/images/abdullah-alenezi-law-office-logo.jpg" width={569} height={762} alt={isRTL ? "شعار مكتب المحامي عبدالله العنزي" : "Abdullah Al-Anzi Law Office logo"} loading="lazy" decoding="async" />
              : <ShieldCheck size={32} strokeWidth={1.5} aria-hidden="true" />}
            <div className="about-partner__name"><h4>{local.partnerTitle}</h4></div>
            {country === "sa" && <div className="about-partner__licence">
              <span>{c.licenceLabel}</span>
              <a className="about-partner__licence-link" href={SAUDI_LAWYER_DIRECTORY[language]} target="_blank" rel="noopener noreferrer" aria-label={`${c.directoryLabel}: ${local.partnerTitle} — ${SAUDI_PARTNER_LICENCE}`} title={c.directoryLabel}><strong><bdi dir="ltr">{SAUDI_PARTNER_LICENCE}</bdi></strong></a>
            </div>}
          </div>
          <p>{local.partnerText}</p>
          {country === "syr" && <ul className="about-partner__offices">
            {syrianPartners[language].map(partner => <li key={partner.name}>
              {partner.logo && <img className="about-partner__office-logo" src={partner.logo} alt={partner.logoAlt} width={700} height={300} loading="lazy" decoding="async" />}
              <h4>{partner.name}</h4><p>{partner.location}</p>
              {partner.licence && <p>{isRTL ? "رقم الترخيص: " : "Licence number: "}<strong><bdi dir="ltr">{partner.licence}</bdi></strong></p>}
            </li>)}
          </ul>}
          <p className="about-partner__credentials">{credentialLookup.text}</p>
          <a className="about-text-link" href={credentialLookup.directory.url} target="_blank" rel="noopener noreferrer">{credentialLookup.directory.label}<Arrow size={17} aria-hidden="true" /></a>
        </article>;
      })}
    </section>

    <section id="faq" className="about-faq about-shell" aria-labelledby="about-faq-heading">
      <h2 id="about-faq-heading">{c.faqTitle}</h2>
      <div className="about-faq__answers">
        {c.faqs.map(faq => <article key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
          {faq.link && <Link href={faq.link.href} className="about-text-link">{faq.link.label}<Arrow size={17} aria-hidden="true" /></Link>}
        </article>)}
      </div>
    </section>

    <section id="about-contact" className="about-closing about-shell" aria-labelledby="about-contact-heading">
      <div className="about-closing__panel">
        <div><h2 id="about-contact-heading">{c.ctaTitle}</h2><p>{c.ctaText}</p><p className="about-closing__note">{c.ctaNote}</p></div>
        <div className="about-closing__actions">
          <p className="global-about-contact-label">{c.countryContactLink}</p>
          {countries.map(country => <Link key={country} href={`/${country}${languagePath}/contact`} className="about-button about-button--gold" data-cta="contact" data-conversion-position="about-contact" data-region={country} data-lang={language} aria-label={`${c.contact}: ${countryName(country)}`}>{countryName(country)}<Arrow size={18} aria-hidden="true" /></Link>)}
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="about-button about-button--outline" data-cta="whatsapp" data-conversion-position="about-contact" data-lang={language}><MessageCircle size={19} aria-hidden="true" />{c.whatsapp}</a>
        </div>
      </div>
    </section>
  </div>;
}
