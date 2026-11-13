import { Link } from "wouter";
import { ArrowLeft, ArrowRight, MonitorSmartphone, UsersRound, Scale, Globe2, Check, ShieldCheck, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRegion } from "@/contexts/RegionContext";
import { SEOHead } from "@/components/seo/SEOHead";
import { COUNSELO_ORGANIZATION, OMAR_AL_BAGHDADI, COOPERATING_OFFICES, COUNSELO_ENTITY_IDS, OMAR_OFFICIAL_PROFILE_URL } from "@workspace/api-zod/browser";
import { ABOUT_UPDATED, SAUDI_PARTNER_LICENCE, SAUDI_LAWYER_DIRECTORY, aboutContent, aboutRegions, syrianPartners } from "@/components/about/about-content";
import { EngagementStandards } from "@/components/legal/engagement-standards";
import { PlatformFacts } from "@/components/legal/platform-facts";
import "@/components/about/about.css";

const featureIcons = [MonitorSmartphone, UsersRound, Scale, Globe2];

export default function About() {
  const { isRTL } = useLanguage();
  const { region } = useRegion();
  const language = isRTL ? "ar" : "en";
  const c = aboutContent[language];
  const local = aboutRegions[region][language];
  const regionPath = `/${region}${isRTL ? "/ar" : ""}`;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const countryCode = region === "uae" ? "AE" : region === "syr" ? "SY" : "SA";
  const description = isRTL
    ? `تعرّف على خدمات كاونسلو في ${local.country}: الاستشارة والصياغة والاستراتيجية القانونية ودعم القضايا من البسيطة إلى المعقدة، والتمثيل عبر شركاء مرخصين.`
    : `Meet CounselO's legal team for ${local.country}: advice, drafting and case strategy from everyday questions to complex disputes, with licensed partner representation.`;
  const whatsapp = `https://wa.me/966594850247?text=${encodeURIComponent(isRTL
    ? `مرحباً كاونسلو، أود مناقشة مسألة قانونية في ${local.country} وتحديد نطاق العمل والأتعاب.`
    : `Hello CounselO, I would like to discuss a legal matter in ${local.country} and confirm the scope and fee.`)}`;
  const schema = [
    { "@context": "https://schema.org", ...COUNSELO_ORGANIZATION },
    { "@context": "https://schema.org", ...OMAR_AL_BAGHDADI,
      image: { "@type": "ImageObject", url: "https://counselo-legal.com/images/optimized/omar-founder-bio.png" },
    },
    {
      "@context": "https://schema.org",
      "@type": ["ProfilePage", "WebPage"],
      "@id": `https://counselo-legal.com${regionPath}/about#webpage`,
      "name": c.label,
      "url": `https://counselo-legal.com${regionPath}/about`,
      "description": description,
      "dateModified": ABOUT_UPDATED,
      "mainEntity": { "@id": COUNSELO_ENTITY_IDS.organization },
      "inLanguage": `${language}-${countryCode}`,
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": isRTL ? "الرئيسية" : "Home", "item": `https://counselo-legal.com${regionPath}` },
          { "@type": "ListItem", "position": 2, "name": c.label, "item": `https://counselo-legal.com${regionPath}/about` },
        ],
      },
    },
    ...(region === "sa" ? [{ "@context": "https://schema.org", ...COOPERATING_OFFICES.saudi }] : []),
    ...(region === "syr" ? [COOPERATING_OFFICES.alBaghdadi, COOPERATING_OFFICES.syriaAbdullah].map(office => ({ "@context": "https://schema.org", ...office })) : []),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `https://counselo-legal.com${regionPath}/about#faq`,
      "inLanguage": `${language}-${countryCode}`,
      "mainEntity": c.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
      })),
    },
  ];

  return <div className="about-platform-page" dir={isRTL ? "rtl" : "ltr"}>
    <SEOHead title={`${c.label} | ${local.country}`} description={description} canonical="/about" schema={schema} />

    <section className="about-hero" aria-labelledby="about-title">
      <div className="about-shell about-hero__grid">
        <div>
          <p className="about-kicker">{c.label}</p>
          <h1 id="about-title">{c.heading}</h1>
          <p className="about-hero__lead">{c.lead}</p>
          <div className="about-actions">
            <Link href={`${regionPath}/contact`} className="about-button about-button--gold" data-cta="contact" data-conversion-position="about-hero" data-region={region} data-lang={language}>{c.contact}<Arrow size={18} aria-hidden="true" /></Link>
            <Link href={`${regionPath}/services`} className="about-hero__services">{c.servicesLink}<Arrow size={18} aria-hidden="true" /></Link>
          </div>
        </div>
        <aside className="about-hero__promise" aria-labelledby="about-promise-title">
          <h2 id="about-promise-title">{c.heroSideTitle}</h2>
          <ul>{c.heroServices.map(text => <li key={text}><Check size={19} aria-hidden="true" /><span>{text}</span></li>)}</ul>
          <Link href={`${isRTL ? "/ar" : ""}/our-work`} className="about-hero__services about-hero__work">{c.workLink}<Arrow size={17} aria-hidden="true" /></Link>
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
        <div><p className="about-lead">{c.introduction}</p><p>{c.purpose}</p><p>{local.focus}</p></div>
      </header>
      <div className="about-story__row">
        <h3>{c.teamTitle}</h3>
        <div><p>{c.team}</p><p>{c.teamSupport}</p></div>
      </div>
      <div className="about-story__row">
        <h3>{c.complexTitle}</h3>
        <div><p>{c.complexText}</p></div>
      </div>
      <div className="about-story__row">
        <h3>{c.servicesTitle}</h3>
        <div>
          <p>{c.servicesIntro}</p>
          <ul className="about-service-list">{c.services.map(item => <li key={item.title}><h4>{item.title}</h4><p>{item.text}</p></li>)}</ul>
          <Link href={`${regionPath}/services`} className="about-text-link">{c.servicesLink}<Arrow size={17} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="about-story__row">
        <h3>{c.processTitle}</h3>
        <ol className="about-process">{c.process.map((item, index) => <li key={item.title}><span className="about-process__number" aria-hidden="true">{index + 1}</span><div><h4>{item.title}</h4><p>{item.text}</p></div></li>)}</ol>
      </div>
      <div className="about-story__row">
        <h3>{c.standardsTitle}</h3>
        <div><p>{c.standards}</p><p>{c.privacy}</p><Link href={`${regionPath}/privacy-policy`} className="about-text-link">{c.privacyLink}<Arrow size={17} aria-hidden="true" /></Link></div>
      </div>
      <div className="about-story__row">
        <h3>{c.workTitle}</h3>
        <div><p>{c.workText}</p><Link href={`${isRTL ? "/ar" : ""}/our-work`} className="about-text-link">{c.workLink}<Arrow size={17} aria-hidden="true" /></Link></div>
      </div>
    </section>

    <div className="about-shell about-platform-proof"><PlatformFacts isArabic={isRTL} embedded /></div>
    <div className="about-shell"><EngagementStandards isArabic={isRTL} regionPath={regionPath} /></div>

    <section className="about-founder" aria-labelledby="about-founder-heading">
      <div className="about-shell about-founder__grid">
        <div className="about-founder__portrait"><img src="/images/optimized/omar-founder-bio.png" alt={isRTL ? "المحامي عمر البغدادي، مؤسس كاونسلو" : "Lawyer Omar Al-Baghdadi, founder of CounselO"} width="280" height="350" loading="lazy" decoding="async" /><p>{c.founderLabel}</p></div>
        <div>
          <h2 id="about-founder-heading">{c.founderName}</h2>
          <p className="about-founder__role">{c.founderRole}</p>
          <p className="about-lead">{c.founderIntro}</p>
          <p>{c.founderExperience}</p>
          <dl className="about-founder__facts">{c.founderFacts.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.text}</dd></div>)}</dl>
          <a className="about-text-link" href={`${OMAR_OFFICIAL_PROFILE_URL}${isRTL ? "/ar" : ""}`} target="_blank" rel="noopener noreferrer">{c.profileLink}<Arrow size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>

    <section className="about-partner about-shell" aria-labelledby="about-partner-heading">
      <div className="about-partner__identity"><ShieldCheck size={32} strokeWidth={1.5} aria-hidden="true" /><div>
        {region === "sa" && <p className="about-kicker">{c.partnerLabel}</p>}
        <h2 id="about-partner-heading">{local.partnerTitle}</h2>
      </div>{region === "sa" && <p className="about-partner__licence">{c.licenceLabel}<strong dir="ltr">{SAUDI_PARTNER_LICENCE}</strong></p>}</div>
      <p>{local.partnerText}</p>
      {region === "sa" && <div className="about-partner__verification">
        <a className="about-text-link" href={SAUDI_LAWYER_DIRECTORY[language]} target="_blank" rel="noopener noreferrer">{c.directoryLabel}<Arrow size={17} aria-hidden="true" /></a>
        <p>{c.directoryNote}</p>
      </div>}
      {region === "syr" && <ul className="about-partner__offices">
        {syrianPartners[language].map(partner => <li key={partner.name}>
          <h3>{partner.name}</h3>
          <p>{partner.location}</p>
          {partner.licence && <p>{isRTL ? "رقم الترخيص: " : "Licence number: "}<strong><bdi dir="ltr">{partner.licence}</bdi></strong></p>}
        </li>)}
      </ul>}
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

    <section className="about-closing about-shell" aria-labelledby="about-contact-heading">
      <div className="about-closing__panel">
        <div><h2 id="about-contact-heading">{c.ctaTitle}</h2><p>{c.ctaText}</p><p className="about-closing__note">{c.ctaNote}</p></div>
        <div className="about-closing__actions">
          <Link href={`${regionPath}/contact`} className="about-button about-button--gold" data-cta="contact" data-conversion-position="about-contact" data-region={region} data-lang={language}>{c.contact}<Arrow size={18} aria-hidden="true" /></Link>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="about-button about-button--outline" data-cta="whatsapp" data-conversion-position="about-contact" data-region={region} data-lang={language}><MessageCircle size={19} aria-hidden="true" />{c.whatsapp}</a>
        </div>
      </div>
    </section>
  </div>;
}
