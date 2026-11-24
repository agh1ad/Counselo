import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import {
  regionalCredentialLookup,
  SAUDI_LAWYER_DIRECTORY,
  SAUDI_PARTNER_LICENCE,
  syrianPartners,
} from "./about-content";
import { GLOBAL_ABOUT_JURISDICTIONS } from "./global-about-content";

const copy = {
  en: {
    title: "Our team and services by jurisdiction",
    intro: "Choose the country connected to your matter to see local services, consultation fees and the professional team. For matters involving more than one country, tell us where the people, documents or proceedings are based so we can scope the work in each jurisdiction.",
    services: "Services and consultation fees",
    contact: "Contact the team",
    saudiLicence: "Abdullah Al-Anzi’s published Saudi lawyer licence number is",
    syrianLicence: "Omar Al-Abdullah’s published licence number is",
    saudiLookup: "Check current licence status",
    countries: {
      sa: {
        name: "Saudi Arabia",
        scope: "The Saudi team handles commercial contracts, company and investment matters, and commercial claims. It also advises on employment, family and property matters and reviews the documents and deadlines that govern the next step.",
        professionals: "Abdullah Al-Anzi Law Office is part of the CounselO team in Saudi Arabia.",
        team: "Saudi team and credentials",
      },
      syr: {
        name: "Syria",
        scope: "The Syrian team reviews family and inheritance matters, property records, civil claims and commercial disputes. It prepares advice and documents for the relevant stage and handles agreed representation before Syrian courts and authorities.",
        professionals: `${syrianPartners.en[0].name} and ${syrianPartners.en[1].name} are part of the CounselO team in Syria.`,
        team: "Syrian team and credentials",
      },
      uae: {
        name: "United Arab Emirates",
        scope: "The UAE team assists with company formation, contracts, employment, property and disputes. We identify the emirate, relevant authority and any mainland or free-zone rules that affect the matter.",
        professionals: "The team includes locally licensed lawyers and law offices.",
        team: "UAE team and credentials",
      },
    },
  },
  ar: {
    title: "فريقنا وخدماتنا بحسب الدولة",
    intro: "اختر الدولة المرتبطة بمسألتك للاطّلاع على الخدمات المحلية ورسوم الاستشارة والفريق المهني. وإذا ارتبطت المسألة بأكثر من دولة، اذكر أماكن الأطراف أو المستندات أو الإجراءات حتى نحدد نطاق العمل في كل اختصاص.",
    services: "الخدمات ورسوم الاستشارة",
    contact: "تواصل مع الفريق",
    saudiLicence: "رقم ترخيص المحامي عبدالله العنزي المنشور هو",
    syrianLicence: "رقم ترخيص المحامي عمر العبد الله المنشور هو",
    saudiLookup: "التحقّق من حالة الترخيص الحالية",
    countries: {
      sa: {
        name: "المملكة العربية السعودية",
        scope: "يتولى الفريق في السعودية مسائل العقود التجارية والشركات والاستثمار والمطالبات التجارية. ويقدم المشورة في مسائل العمل والأسرة والعقارات، ويراجع المستندات والمواعيد اللازمة لتحديد الخطوة التالية.",
        professionals: "مكتب المحامي عبدالله العنزي جزء من فريق كاونسلو في السعودية.",
        team: "الفريق في السعودية وبيانات الترخيص",
      },
      syr: {
        name: "سوريا",
        scope: "يراجع الفريق في سوريا مسائل الأسرة والميراث والسجلات العقارية والمطالبات المدنية والمنازعات التجارية، ويعد المشورة والمستندات بحسب مرحلة المسألة، ويتولى التمثيل المتفق عليه أمام المحاكم والجهات السورية المختصة.",
        professionals: `${syrianPartners.ar[0].name} و${syrianPartners.ar[1].name} جزء من فريق كاونسلو في سوريا.`,
        team: "الفريق في سوريا وبيانات القيد",
      },
      uae: {
        name: "الإمارات العربية المتحدة",
        scope: "يساعد الفريق في الإمارات في تأسيس الشركات والعقود والعمل والعقارات والمنازعات. ونحدد الإمارة والجهة المختصة وما يؤثر في المسألة من قواعد البر الرئيسي أو المناطق الحرة.",
        professionals: "يضم الفريق محامين ومكاتب محاماة مرخّصين محلياً.",
        team: "الفريق في الإمارات وبيانات الترخيص",
      },
    },
  },
} as const;

export function GlobalAboutJurisdictions({ lang }: { lang: "en" | "ar" }) {
  const c = copy[lang];
  const localePrefix = lang === "ar" ? "/ar" : "";
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section id="jurisdictions" className="about-story about-shell scroll-mt-24" aria-labelledby="jurisdictions-heading">
      <header className="about-story__intro">
        <h2 id="jurisdictions-heading">{c.title}</h2>
        <div><p>{c.intro}</p></div>
      </header>
      {GLOBAL_ABOUT_JURISDICTIONS.map((region) => {
        const country = c.countries[region];
        const prefix = `/${region}${localePrefix}`;
        const lookup = regionalCredentialLookup[region][lang];
        const licence = region === "sa" ? [c.saudiLicence, SAUDI_PARTNER_LICENCE]
          : region === "syr" ? [c.syrianLicence, syrianPartners[lang][1].licence]
          : undefined;
        return (
          <article key={region} className="about-story__row" aria-labelledby={`jurisdiction-${region}-heading`}>
            <h3 id={`jurisdiction-${region}-heading`}>{country.name}</h3>
            <div>
              <p>{country.scope}</p>
              <p>{country.professionals}</p>
              {licence && <p>{licence[0]} <bdi dir="ltr">{licence[1]}</bdi>.</p>}
              {region !== "sa" && <p>{lookup.text}</p>}
              <ul className="flex flex-wrap gap-x-5">
                {region === "sa" && <li><a className="about-text-link" href={SAUDI_LAWYER_DIRECTORY[lang]} target="_blank" rel="noopener noreferrer">{c.saudiLookup}</a></li>}
                <li><a className="about-text-link" href={lookup.directory.url} target="_blank" rel="noopener noreferrer">{lookup.directory.label}</a></li>
              </ul>
              <ul className="flex flex-wrap gap-x-5">
                <li><Link className="about-text-link" href={`${prefix}/about`}>{country.team}<Arrow size={16} aria-hidden="true" /></Link></li>
                <li><Link className="about-text-link" href={`${prefix}/services`} aria-label={`${c.services} · ${country.name}`}>{c.services}<Arrow size={16} aria-hidden="true" /></Link></li>
                <li><Link className="about-text-link" href={`${prefix}/contact`} aria-label={`${c.contact} · ${country.name}`}>{c.contact}<Arrow size={16} aria-hidden="true" /></Link></li>
              </ul>
            </div>
          </article>
        );
      })}
    </section>
  );
}
