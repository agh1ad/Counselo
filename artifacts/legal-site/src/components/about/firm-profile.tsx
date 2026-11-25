import {
  ABDULLAH_PROFILE_ALTERNATES, ABDULLAH_PROFILE_PATHS, BAGHDADI_LAW_PROFILE_ALTERNATES, BAGHDADI_LAW_PROFILE_PATHS,
  COOPERATING_OFFICES, COUNSELO_ENTITY_IDS,
  COUNSELO_FIRM_TEAM, ENTITY_BASE_URL, OMAR_ABDULLAH_PROFILE_ALTERNATES, OMAR_ABDULLAH_PROFILE_PATHS,
} from "@workspace/api-zod/browser";
import { SEOHead } from "@/components/seo/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { regionalCredentialLookup, SAUDI_LAWYER_DIRECTORY, SAUDI_PARTNER_LICENCE, SYRIAN_ABDULLAH_LICENCE } from "./about-content";
import { firmProfileContent } from "./firm-profile-content";

const practices = {
  alAnzi: {
    region: "sa",
    office: COOPERATING_OFFICES.saudi,
    paths: ABDULLAH_PROFILE_PATHS,
    alternates: ABDULLAH_PROFILE_ALTERNATES,
    canonical: "/about/abdullah-al-anzi",
    lawyer: {
      name: { en: "Abdullah Moghthi Qaid Al-Anazi", ar: "عبدالله مغثي قاعد العنزي" },
      licenceLabel: { en: "Abdullah Al-Anzi’s Saudi lawyer licence", ar: "رخصة المحامي عبدالله العنزي" },
      personId: ENTITY_BASE_URL + ABDULLAH_PROFILE_PATHS.en + "#person",
      licence: SAUDI_PARTNER_LICENCE,
    },
    meta: {
      en: "Meet Abdullah Al-Anzi Law Office in Dammam and Jubail, its team of licensed Saudi lawyers and its place within CounselO Legal. Read the firm’s professional background and registration.",
      ar: "تعرّف إلى مكتب المحامي عبدالله العنزي في الدمام والجبيل ومحاميه المرخّصين ضمن فريق كاونسلو، واطّلع على الهوية المهنية للمكتب وسجلّه لدى الهيئة السعودية للمحامين.",
    },
  },
  alAbdullah: {
    region: "syr",
    office: COOPERATING_OFFICES.syriaAbdullah,
    paths: OMAR_ABDULLAH_PROFILE_PATHS,
    alternates: OMAR_ABDULLAH_PROFILE_ALTERNATES,
    canonical: "/about/omar-al-abdullah",
    lawyer: {
      name: { en: "Omar Al-Abdullah", ar: "عمر العبد الله" },
      licenceLabel: { en: "CounselO Legal lists Omar Al-Abdullah’s Syrian lawyer licence as", ar: "رخصة المحامي عمر العبد الله بحسب سجلات كاونسلو" },
      personId: COUNSELO_ENTITY_IDS.omarAlAbdullah,
      licence: SYRIAN_ABDULLAH_LICENCE,
    },
    meta: {
      en: "Meet Omar Al-Abdullah Law Office in Damascus, its licensed Syrian lawyers and the professional experience they bring to CounselO Legal as a member firm.",
      ar: "تعرّف إلى مكتب المحامي عمر العبد الله في دمشق وفريقه من المحامين السوريين المرخّصين وخبرتهم المهنية ضمن فريق كاونسلو للاستشارات القانونية.",
    },
  },
  alBaghdadi: {
    region: "syr",
    office: COOPERATING_OFFICES.alBaghdadi,
    paths: BAGHDADI_LAW_PROFILE_PATHS,
    alternates: BAGHDADI_LAW_PROFILE_ALTERNATES,
    canonical: "/about/baghdadi-law",
    meta: {
      en: "Founded by Riyad Al-Baghdadi in 1957, Al-Baghdadi Law Firm spans two generations of Syrian lawyers. Read about its leadership, training record and place in CounselO Legal.",
      ar: "تعرّف إلى تاريخ مكتب البغدادي للمحاماة منذ تأسيسه عام 1957، ومسيرة جيلين من المحامين السوريين، وخبرة المكتب في تدريب المحامين ومكانته ضمن فريق كاونسلو.",
    },
  },
} as const;

export function FirmProfile({ practice }: { practice: keyof typeof practices }) {
  const { lang, isRTL } = useLanguage();
  const firm = practices[practice];
  const c = firmProfileContent[practice][lang];
  const otherLanguage = isRTL ? "en" : "ar";
  const saudi = firm.region === "sa";
  const lawyer = "lawyer" in firm ? firm.lawyer : undefined;
  const office = firm.office;
  const name = isRTL ? office.alternateName : office.name;
  const pageUrl = ENTITY_BASE_URL + firm.paths[lang];
  const logoPath = "logo" in office ? new URL(office.logo).pathname : `/images/baghdadi-law-logo-${lang}.webp`;
  const teamUrl = ENTITY_BASE_URL + "/" + firm.region + (isRTL ? "/ar" : "") + "/about";
  const schema = {
    "@context": "https://schema.org", "@type": "ProfilePage", "@id": pageUrl + "#webpage",
    url: pageUrl, name, inLanguage: lang, isPartOf: { "@id": COUNSELO_ENTITY_IDS.website },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isRTL ? "فريق كاونسلو" : "CounselO Legal team", item: teamUrl },
        { "@type": "ListItem", position: 2, name, item: pageUrl },
      ],
    },
    mainEntity: {
      ...office, name, alternateName: isRTL ? office.name : office.alternateName,
      url: lawyer ? pageUrl : office.url, logo: ENTITY_BASE_URL + logoPath, description: c.lead, mainEntityOfPage: { "@id": pageUrl + "#webpage" },
    },
    mentions: lawyer ? {
      "@type": "Person", "@id": lawyer.personId, name: lawyer.name[lang], alternateName: lawyer.name[otherLanguage],
      jobTitle: isRTL ? "محامٍ" : "Lawyer", url: pageUrl + "#lawyer",
      worksFor: { "@id": office["@id"] }, memberOf: { "@id": COUNSELO_ENTITY_IDS.organization },
      ...(saudi ? { hasCredential: {
        "@type": "EducationalOccupationalCredential", name: isRTL ? "رخصة المحاماة السعودية" : "Saudi lawyer licence", identifier: lawyer.licence,
        validIn: { "@type": "Country", name: isRTL ? "المملكة العربية السعودية" : "Saudi Arabia" }, url: SAUDI_LAWYER_DIRECTORY[lang],
      } } : {}),
    } : undefined,
  };

  return <article className="firm-profile" dir={isRTL ? "rtl" : "ltr"}>
    <SEOHead title={name + " | " + c.location} description={firm.meta[lang]} canonical={firm.canonical}
      regionalLanguageAlternates={firm.alternates} schema={schema} />
    <header className="firm-profile__hero">
      <div className="firm-profile__shell firm-profile__masthead">
        <div>
          <p className="firm-profile__location">{c.location}</p>
          <h1>{name}</h1>
          <p className="firm-profile__lead">{c.lead}</p>
          {lawyer && <p className="firm-profile__hero-licence" id={saudi ? undefined : "lawyer"}>
            {lawyer.licenceLabel[lang]} <bdi dir="ltr">{lawyer.licence}</bdi>
          </p>}
        </div>
        <div className="firm-profile__mark">
          <img src={logoPath} width={saudi ? 569 : 700} height={saudi ? 762 : 300}
            alt={isRTL ? "شعار " + name : name + " logo"} />
        </div>
      </div>
    </header>
    <div className="firm-profile__shell firm-profile__body">
      <div className="firm-profile__editorial">
        {c.sections.map(section => <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
          {"source" in section && <a className="firm-profile__source" href={section.source.href}>{section.source.label}</a>}
        </section>)}
      </div>
      <aside className="firm-profile__people" aria-labelledby="firm-team">
        <section aria-labelledby="firm-team">
          <h2 id="firm-team">{isRTL ? "المكتب وفريق كاونسلو" : "The firm’s place in CounselO"}</h2>
          <p>{COUNSELO_FIRM_TEAM[lang]}</p>
        </section>
        {saudi && lawyer && <section id="lawyer" aria-labelledby="lawyer-name">
          <h2 id="lawyer-name">{lawyer.name[lang]}</h2>
          <details className="firm-profile__records">
            <summary>{isRTL ? "السجلات المهنية" : "Professional records"}</summary>
            <a href={regionalCredentialLookup.sa[lang].directory.url}>{isRTL ? "سجل المكتب لدى الهيئة السعودية للمحامين" : "Saudi Bar firm registration"}</a>
            <a href={SAUDI_LAWYER_DIRECTORY[lang]}>{isRTL ? "قيد المحامي لدى الهيئة السعودية للمحامين" : "Saudi Bar lawyer registration"}</a>
          </details>
        </section>}
      </aside>
    </div>
  </article>;
}
