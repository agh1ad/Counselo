import {
  ABDULLAH_PROFILE_ALTERNATES, ABDULLAH_PROFILE_PATHS, COOPERATING_OFFICES, COUNSELO_ENTITY_IDS,
  COUNSELO_FIRM_TEAM, ENTITY_BASE_URL, OMAR_ABDULLAH_PROFILE_ALTERNATES, OMAR_ABDULLAH_PROFILE_PATHS,
} from "@workspace/api-zod/browser";
import { SEOHead } from "@/components/seo/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { regionalCredentialLookup, SAUDI_LAWYER_DIRECTORY, SAUDI_PARTNER_LICENCE, SYRIAN_ABDULLAH_LICENCE } from "./about-content";
import { firmProfileContent } from "./firm-profile-content";

const practices = {
  sa: {
    office: COOPERATING_OFFICES.saudi,
    paths: ABDULLAH_PROFILE_PATHS,
    alternates: ABDULLAH_PROFILE_ALTERNATES,
    canonical: "/about/abdullah-al-anzi",
    lawyer: { en: "Abdullah Moghthi Qaid Al-Anazi", ar: "عبدالله مغثي قاعد العنزي" },
    personId: ENTITY_BASE_URL + ABDULLAH_PROFILE_PATHS.en + "#person",
    licence: SAUDI_PARTNER_LICENCE,
    meta: {
      en: "Meet Abdullah Al-Anzi Law Office in Dammam, its team of licensed Saudi lawyers and its place within CounselO Legal. Read the firm’s professional background and registration.",
      ar: "تعرّف إلى مكتب المحامي عبدالله العنزي في الدمام ومحاميه المرخّصين ضمن فريق كاونسلو، واطّلع على الهوية المهنية للمكتب وسجلّه لدى الهيئة السعودية للمحامين.",
    },
  },
  syr: {
    office: COOPERATING_OFFICES.syriaAbdullah,
    paths: OMAR_ABDULLAH_PROFILE_PATHS,
    alternates: OMAR_ABDULLAH_PROFILE_ALTERNATES,
    canonical: "/about/omar-al-abdullah",
    lawyer: { en: "Omar Al-Abdullah", ar: "عمر العبد الله" },
    personId: COUNSELO_ENTITY_IDS.omarAlAbdullah,
    licence: SYRIAN_ABDULLAH_LICENCE,
    meta: {
      en: "Meet Omar Al-Abdullah Law Office in Damascus, its licensed Syrian lawyers and the professional experience they bring to CounselO Legal as a member firm.",
      ar: "تعرّف إلى مكتب المحامي عمر العبد الله في دمشق وفريقه من المحامين السوريين المرخّصين وخبرتهم المهنية ضمن فريق كاونسلو للاستشارات القانونية.",
    },
  },
} as const;

export function FirmProfile({ region }: { region: keyof typeof practices }) {
  const { lang, isRTL } = useLanguage();
  const firm = practices[region];
  const c = firmProfileContent[region][lang];
  const otherLanguage = isRTL ? "en" : "ar";
  const saudi = region === "sa";
  const prefix = "/" + region + (isRTL ? "/ar" : "");
  const office = firm.office;
  const name = isRTL ? office.alternateName : office.name;
  const pageUrl = ENTITY_BASE_URL + firm.paths[lang];
  const lawyerDirectory = new URL(saudi ? SAUDI_LAWYER_DIRECTORY[lang] : regionalCredentialLookup.syr[lang].directory.url);
  if (!saudi) lawyerDirectory.searchParams.set("lawyer_q", firm.lawyer.ar);
  const licenceLabel = saudi
    ? (isRTL ? "رخصة المحاماة السعودية" : "Saudi lawyer licence")
    : (isRTL ? "رخصة المحاماة السورية بحسب بيانات كاونسلو" : "CounselO Legal lists his Syrian lawyer licence as");
  const schema = {
    "@context": "https://schema.org", "@type": "ProfilePage", "@id": pageUrl + "#webpage",
    url: pageUrl, name, inLanguage: lang, isPartOf: { "@id": COUNSELO_ENTITY_IDS.website },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: isRTL ? "فريق كاونسلو" : "CounselO Legal team", item: ENTITY_BASE_URL + prefix + "/about" },
        { "@type": "ListItem", position: 2, name, item: pageUrl },
      ],
    },
    mainEntity: {
      ...office, name, alternateName: isRTL ? office.name : office.alternateName,
      url: pageUrl, description: c.lead, mainEntityOfPage: { "@id": pageUrl + "#webpage" },
    },
    mentions: {
      "@type": "Person", "@id": firm.personId, name: firm.lawyer[lang], alternateName: firm.lawyer[otherLanguage],
      jobTitle: isRTL ? "محامٍ" : "Lawyer", url: pageUrl + "#lawyer",
      worksFor: { "@id": office["@id"] }, memberOf: { "@id": COUNSELO_ENTITY_IDS.organization },
      ...(saudi ? { hasCredential: {
        "@type": "EducationalOccupationalCredential", name: licenceLabel, identifier: firm.licence,
        validIn: { "@type": "Country", name: isRTL ? "المملكة العربية السعودية" : "Saudi Arabia" }, url: lawyerDirectory.href,
      } } : {}),
    },
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
        </div>
        <div className="firm-profile__mark">
          <img src={new URL(office.logo).pathname} width={saudi ? 569 : 700} height={saudi ? 762 : 300}
            alt={isRTL ? "شعار " + name : name + " logo"} />
        </div>
      </div>
    </header>
    <div className="firm-profile__shell firm-profile__body">
      <div className="firm-profile__editorial">
        {c.sections.map(section => <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.text}</p>
        </section>)}
      </div>
      <aside className="firm-profile__people" aria-label={isRTL ? "فريق المكتب والقيد المهني" : "Firm team and professional registration"}>
        <section aria-labelledby="firm-team">
          <h2 id="firm-team">{isRTL ? "المكتب وفريق كاونسلو" : "The firm’s place in CounselO"}</h2>
          <p>{COUNSELO_FIRM_TEAM[lang]}</p>
        </section>
        <section id="lawyer" aria-labelledby="lawyer-name">
          <p className="firm-profile__role">{isRTL ? "محامٍ في المكتب" : "Lawyer at the firm"}</p>
          <h2 id="lawyer-name">{firm.lawyer[lang]}</h2>
          <p className="firm-profile__licence">{licenceLabel} <bdi dir="ltr">{firm.licence}</bdi></p>
          <details className="firm-profile__records">
            <summary>{isRTL ? "السجلات المهنية" : "Professional records"}</summary>
            {saudi && <a href={regionalCredentialLookup.sa[lang].directory.url}>{isRTL ? "سجل المكتب لدى الهيئة السعودية للمحامين" : "Saudi Bar firm registration"}</a>}
            <a href={lawyerDirectory.href}>{saudi
              ? (isRTL ? "قيد المحامي لدى الهيئة السعودية للمحامين" : "Saudi Bar lawyer registration")
              : (isRTL ? "البحث باسم المحامي في دليل النقابة" : "Search the Syrian Bar directory by name")}</a>
          </details>
        </section>
      </aside>
    </div>
  </article>;
}
