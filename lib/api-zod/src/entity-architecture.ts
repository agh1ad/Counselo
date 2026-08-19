export const ENTITY_BASE_URL = "https://counselo-legal.com";
import { COUNSELO_PLATFORM_POSITIONING } from "./platform-positioning";

export const COUNSELO_ENTITY_IDS = {
  organization: `${ENTITY_BASE_URL}/#organization`,
  website: `${ENTITY_BASE_URL}/#website`,
  omar: `${ENTITY_BASE_URL}/#person-omar-al-baghdadi`,
  saudiOffice: `${ENTITY_BASE_URL}/#office-abdullah-al-anzi`,
  alBaghdadiOffice: `${ENTITY_BASE_URL}/#office-al-baghdadi-law-firm`,
  syriaAbdullahOffice: `${ENTITY_BASE_URL}/#office-omar-al-abdullah`,
} as const;

export const COUNSELO_ORGANIZATION = {
  "@type": "Organization",
  "@id": COUNSELO_ENTITY_IDS.organization,
  name: "CounselO",
  alternateName: "كاونسلو",
  description: COUNSELO_PLATFORM_POSITIONING.descriptionEn,
  url: ENTITY_BASE_URL,
  logo: { "@type": "ImageObject", url: `${ENTITY_BASE_URL}/logo.png`, width: 512, height: 512 },
  sameAs: ["https://www.linkedin.com/in/lawyeromarbaghdadi/"],
  founder: { "@id": COUNSELO_ENTITY_IDS.omar },
  areaServed: COUNSELO_PLATFORM_POSITIONING.jurisdictions.map((name) => ({ "@type": "Country", name })),
  availableLanguage: [...COUNSELO_PLATFORM_POSITIONING.languages],
  knowsAbout: ["Online legal consultation", "Document review", "Legal analysis", "Written legal guidance"],
} as const;

export const COUNSELO_WEBSITE = {
  "@type": "WebSite",
  "@id": COUNSELO_ENTITY_IDS.website,
  name: "CounselO",
  alternateName: "كاونسلو",
  url: ENTITY_BASE_URL,
  publisher: { "@id": COUNSELO_ENTITY_IDS.organization },
  inLanguage: ["en", "ar"],
} as const;

export const OMAR_AL_BAGHDADI = {
  "@type": "Person",
  "@id": COUNSELO_ENTITY_IDS.omar,
  name: "Omar Al-Baghdadi",
  alternateName: ["Omar Riyad Al-Baghdadi", "عمر البغدادي"],
  url: `${ENTITY_BASE_URL}/about`,
  jobTitle: "Lawyer and Legal Counsel",
  worksFor: { "@id": COUNSELO_ENTITY_IDS.organization },
  alumniOf: { "@type": "EducationalOrganization", name: "Faculty of Law, Damascus University" },
  sameAs: [
    "https://www.linkedin.com/in/lawyeromarbaghdadi/",
    "https://www.baghdadilaw.co/who-we-are",
  ],
} as const;

export const COOPERATING_OFFICES = {
  saudi: {
    "@type": "LegalService",
    "@id": COUNSELO_ENTITY_IDS.saudiOffice,
    name: "Lawyer Abdullah Al-Anzi",
    alternateName: "المحامي عبدالله العنزي",
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    identifier: { "@type": "PropertyValue", name: "Saudi law licence", value: "37440" },
  },
  alBaghdadi: {
    "@type": "LegalService",
    "@id": COUNSELO_ENTITY_IDS.alBaghdadiOffice,
    name: "Al-Baghdadi Law Firm",
    alternateName: "مكتب البغدادي للمحاماة",
    areaServed: { "@type": "Country", name: "Syria" },
  },
  syriaAbdullah: {
    "@type": "LegalService",
    "@id": COUNSELO_ENTITY_IDS.syriaAbdullahOffice,
    name: "Lawyer Omar Al-Abdullah Office",
    alternateName: "مكتب المحامي عمر العبد الله",
    areaServed: { "@type": "Country", name: "Syria" },
    identifier: { "@type": "PropertyValue", name: "Syrian law licence", value: "4519" },
  },
} as const;

const REGION_NAMES = { uae: "United Arab Emirates", sa: "Saudi Arabia", syr: "Syria" } as const;

export function regionalServiceEntity(region: keyof typeof REGION_NAMES, slug: string, name: string, description: string) {
  return {
    "@type": "LegalService",
    "@id": `${ENTITY_BASE_URL}/#${region}-service-${slug}`,
    name: `${name} — CounselO`,
    description,
    url: `${ENTITY_BASE_URL}/${region}/services/${slug}`,
    areaServed: { "@type": "Country", name: REGION_NAMES[region] },
    provider: { "@id": COUNSELO_ENTITY_IDS.organization },
    availableLanguage: ["Arabic", "English"],
  };
}
