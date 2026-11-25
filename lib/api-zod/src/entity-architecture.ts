export const ENTITY_BASE_URL = "https://counselo-legal.com";
export const OMAR_OFFICIAL_PROFILE_URL = "https://omarbaghdadi.com";
export const BAGHDADI_LAW_PROFILE_URL = "https://www.baghdadilaw.co/who-we-are";
export const OMAR_CANONICAL_ENTITY_ID = `${OMAR_OFFICIAL_PROFILE_URL}/#omar-al-baghdadi`;
export const BAGHDADI_LAW_CANONICAL_ENTITY_ID = "https://www.baghdadilaw.co/#legalservice";
import { COUNSELO_PLATFORM_POSITIONING } from "./platform-positioning";
import { COUNSELO_ABOUT_PATHS, COUNSELO_BRAND } from "./brand";
import { ABDULLAH_PROFILE_PATHS, OMAR_ABDULLAH_PROFILE_PATHS } from "./public-site-policy";

// The official profile, BaghdadiLaw and this site's /omar-baghdadi.jpg publish
// the same portrait. Reuse the official image identity in every founder record.
export const OMAR_PORTRAIT = {
  "@type": "ImageObject",
  "@id": `${OMAR_OFFICIAL_PROFILE_URL}/#omar-primary-image`,
  url: `${OMAR_OFFICIAL_PROFILE_URL}/images/omar-al-baghdadi.jpg`,
  contentUrl: `${OMAR_OFFICIAL_PROFILE_URL}/images/omar-al-baghdadi.jpg`,
  caption: "Lawyer and legal counsel Omar Al-Baghdadi",
  encodingFormat: "image/jpeg",
  width: 800,
  height: 1200,
  about: { "@id": OMAR_CANONICAL_ENTITY_ID },
} as const;

export const COUNSELO_ENTITY_IDS = {
  organization: `${ENTITY_BASE_URL}/#organization`,
  website: `${ENTITY_BASE_URL}/#website`,
  omar: OMAR_CANONICAL_ENTITY_ID,
  omarAlAbdullah: `${ENTITY_BASE_URL}${OMAR_ABDULLAH_PROFILE_PATHS.en}#person`,
  saudiOffice: `${ENTITY_BASE_URL}/#office-abdullah-al-anzi`,
  alBaghdadiOffice: BAGHDADI_LAW_CANONICAL_ENTITY_ID,
  syriaAbdullahOffice: `${ENTITY_BASE_URL}/#office-omar-al-abdullah`,
} as const;

const serviceAreas = COUNSELO_PLATFORM_POSITIONING.jurisdictions.map((name) => ({ "@type": "Country", name }));
const consultationContact = { telephone: "+966594850247", email: "info@counselo-legal.com" } as const;
const legalServices = [
  { id: "legal-consultation", name: "Legal consultation and written advice", description: "Assessment of the facts, legal position and available options, from focused questions to complex multi-party and cross-border matters." },
  { id: "contracts-and-documents", name: "Contract drafting and document review", description: "Contract and transaction review, risk analysis, revised terms, agreements and legal memoranda for personal and business matters." },
  { id: "litigation-and-arbitration-support", name: "Litigation, arbitration and dispute strategy", description: "Claims, defences, evidence analysis, legal submissions, negotiation, settlement and enforcement strategy, handled by the CounselO team from preparation through representation." },
  { id: "continuing-legal-support", name: "Continuing legal support", description: "Legal preparation, advice and follow-up as a matter develops, with the same CounselO team where parties, proceedings or assets span countries." },
] as const;

// Owner-confirmed team membership, 2026-11-18. Published offices retain their
// own identities and jurisdictions; do not invent an unnamed UAE office.
const representationServices = [
  { region: "sa", country: "Saudi Arabia" },
  { region: "syr", country: "Syria" },
  { region: "uae", country: "United Arab Emirates" },
] as const;

export const COUNSELO_LOGO = {
  "@type": "ImageObject",
  "@id": `${ENTITY_BASE_URL}/#logo`,
  url: `${ENTITY_BASE_URL}/logo.png`,
  contentUrl: `${ENTITY_BASE_URL}/logo.png`,
  caption: "CounselO Legal logo — كاونسلو للاستشارات القانونية",
  encodingFormat: "image/png",
  width: 512,
  height: 512,
  about: { "@id": COUNSELO_ENTITY_IDS.organization },
} as const;

export const COUNSELO_ORGANIZATION = {
  "@type": "Organization",
  "@id": COUNSELO_ENTITY_IDS.organization,
  name: COUNSELO_BRAND.en,
  alternateName: [COUNSELO_BRAND.designationAr, "CounselO", COUNSELO_BRAND.ar],
  description: COUNSELO_PLATFORM_POSITIONING.descriptionEn,
  url: ENTITY_BASE_URL,
  mainEntityOfPage: Object.values(COUNSELO_ABOUT_PATHS).map(path => ({ "@id": `${ENTITY_BASE_URL}${path}#webpage` })),
  logo: COUNSELO_LOGO,
  image: COUNSELO_LOGO,
  founder: { "@id": COUNSELO_ENTITY_IDS.omar },
  member: [
    { "@id": COUNSELO_ENTITY_IDS.saudiOffice },
    { "@id": COUNSELO_ENTITY_IDS.alBaghdadiOffice },
    { "@id": COUNSELO_ENTITY_IDS.syriaAbdullahOffice },
  ],
  areaServed: serviceAreas,
  ...consultationContact,
  contactPoint: {
    "@type": "ContactPoint",
    url: `${ENTITY_BASE_URL}/#contact`,
    ...consultationContact,
    contactType: "legal consultation and representation enquiries",
    areaServed: ["SA", "SY", "AE"],
    availableLanguage: [...COUNSELO_PLATFORM_POSITIONING.languages],
  },
  knowsAbout: [
    "Legal consultation and written advice",
    "Document review and contract drafting",
    "Litigation and arbitration strategy",
    "Claims, defences and legal memoranda",
    "Negotiation, settlement and enforcement follow-up",
    "Complex multi-party and cross-border matters",
    "Continuing legal support",
    "Court representation by our locally licensed team members",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    "@id": `${ENTITY_BASE_URL}/#legal-services`,
    name: "CounselO legal services and regional representation",
    itemListElement: [
      ...legalServices.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${ENTITY_BASE_URL}/#service-${service.id}`,
          name: service.name,
          serviceType: service.name,
          description: service.description,
          provider: { "@id": COUNSELO_ENTITY_IDS.organization },
          areaServed: serviceAreas,
          url: ENTITY_BASE_URL,
        },
      })),
      ...representationServices.map(({ region, country }) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${ENTITY_BASE_URL}/#${region}-partner-representation`,
          name: `Court and authority representation in ${country}`,
          serviceType: "Legal representation by the CounselO team",
          description: `CounselO provides court and authority representation in ${country} through its locally licensed team members, as part of the same service from consultation and preparation to representation and follow-up. The agreed engagement identifies the responsible lawyers, scope and fees.`,
          provider: { "@id": COUNSELO_ENTITY_IDS.organization },
          areaServed: { "@type": "Country", name: country },
          url: `${ENTITY_BASE_URL}/${region}/about`,
          termsOfService: `${ENTITY_BASE_URL}/${region}/terms-of-service`,
        },
      })),
    ],
  },
} as const;

export const COUNSELO_WEBSITE = {
  "@type": "WebSite",
  "@id": COUNSELO_ENTITY_IDS.website,
  name: COUNSELO_BRAND.en,
  alternateName: [COUNSELO_BRAND.designationAr, "CounselO", COUNSELO_BRAND.ar],
  url: ENTITY_BASE_URL,
  publisher: { "@id": COUNSELO_ENTITY_IDS.organization },
  image: COUNSELO_LOGO,
  inLanguage: ["en", "ar"],
} as const;

export const OMAR_AL_BAGHDADI = {
  "@type": "Person",
  "@id": COUNSELO_ENTITY_IDS.omar,
  name: "Omar Al-Baghdadi",
  alternateName: ["Omar Riyad Al-Baghdadi", "عمر البغدادي"],
  url: OMAR_OFFICIAL_PROFILE_URL,
  description: "Omar Al-Baghdadi is a Syrian lawyer and legal counsel, founder of CounselO Legal. His professional practice began in 1996 after graduating from the Faculty of Law at Damascus University.",
  image: OMAR_PORTRAIT,
  mainEntityOfPage: { "@id": `${OMAR_OFFICIAL_PROFILE_URL}/#webpage` },
  jobTitle: "Lawyer and Legal Counsel",
  worksFor: [
    { "@id": BAGHDADI_LAW_CANONICAL_ENTITY_ID },
    { "@id": COUNSELO_ENTITY_IDS.organization },
  ],
  alumniOf: { "@type": "EducationalOrganization", name: "Faculty of Law, Damascus University" },
  sameAs: [
    OMAR_OFFICIAL_PROFILE_URL,
    "https://www.linkedin.com/in/lawyeromarbaghdadi/",
  ],
  // The firm's history page describes several professionals. It documents
  // Omar's leadership, but is not another identity for the person himself.
  subjectOf: { "@type": "AboutPage", url: BAGHDADI_LAW_PROFILE_URL },
  affiliation: { "@id": BAGHDADI_LAW_CANONICAL_ENTITY_ID },
} as const;

export const SAUDI_OFFICE_DIRECTORY_URL = "https://eservice.sba.gov.sa/directory/855";

export const ABDULLAH_AL_ANZI_OFFICE_LOGO_PATH = "/images/abdullah-alenezi-law-office-logo.jpg";
export const OMAR_AL_ABDULLAH_OFFICE_LOGO_PATH = "/images/omar-al-abdullah-law-office.webp";

export const COOPERATING_OFFICES = {
  saudi: {
    "@type": "LegalService",
    "@id": COUNSELO_ENTITY_IDS.saudiOffice,
    name: "Abdullah Al-Anzi Law Office",
    alternateName: "مكتب المحامي عبدالله العنزي",
    legalName: "مكتب عبدالله مغثي قاعد العنزي للمحاماة",
    url: ENTITY_BASE_URL + ABDULLAH_PROFILE_PATHS.en,
    logo: ENTITY_BASE_URL + ABDULLAH_AL_ANZI_OFFICE_LOGO_PATH,
    sameAs: [SAUDI_OFFICE_DIRECTORY_URL],
    description: "Abdullah Al-Anzi Law Office is an established law firm in Dammam and a member of CounselO Legal’s Saudi team. The firm is registered with the Saudi Bar Association. Its licensed lawyers belong to the CounselO team.",
    memberOf: { "@id": COUNSELO_ENTITY_IDS.organization },
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
  },
  alBaghdadi: {
    "@type": "LegalService",
    "@id": COUNSELO_ENTITY_IDS.alBaghdadiOffice,
    name: "Al-Baghdadi Law Firm",
    alternateName: "مكتب البغدادي للمحاماة",
    description: "Al-Baghdadi Law Firm was established in 1957. Two generations of lawyers have shaped the firm. Its licensed lawyers form part of the CounselO Legal team.",
    memberOf: { "@id": COUNSELO_ENTITY_IDS.organization },
    url: "https://www.baghdadilaw.co/",
    areaServed: ["Saudi Arabia", "United Arab Emirates", "Syria"],
  },
  syriaAbdullah: {
    "@type": "LegalService",
    "@id": COUNSELO_ENTITY_IDS.syriaAbdullahOffice,
    name: "Omar Al-Abdullah Law Office",
    alternateName: "مكتب المحامي عمر العبد الله",
    url: ENTITY_BASE_URL + OMAR_ABDULLAH_PROFILE_PATHS.en,
    logo: `${ENTITY_BASE_URL}${OMAR_AL_ABDULLAH_OFFICE_LOGO_PATH}`,
    description: "Omar Al-Abdullah Law Office is an established law firm in Damascus and a member of CounselO Legal’s Syrian team. The firm has its own team of licensed Syrian lawyers, all members of CounselO Legal.",
    memberOf: { "@id": COUNSELO_ENTITY_IDS.organization },
    areaServed: { "@type": "Country", name: "Syria" },
  },
} as const;

const REGION_NAMES = { uae: "United Arab Emirates", sa: "Saudi Arabia", syr: "Syria" } as const;

export function regionalServiceEntity(region: keyof typeof REGION_NAMES, slug: string, name: string, description: string, lang: "en" | "ar" = "en") {
  return {
    "@type": "Service",
    "@id": `${ENTITY_BASE_URL}/#${region}-service-${slug}`,
    name: `${name} — ${lang === "ar" ? "كاونسلو للاستشارات القانونية" : "CounselO Legal"}`,
    description,
    url: `${ENTITY_BASE_URL}/${region}${lang === "ar" ? "/ar" : ""}/services/${slug}`,
    areaServed: { "@type": "Country", name: REGION_NAMES[region] },
    provider: { "@id": COUNSELO_ENTITY_IDS.organization },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${ENTITY_BASE_URL}/${region}${lang === "ar" ? "/ar" : ""}/services/${slug}`,
      availableLanguage: ["Arabic", "English"],
    },
  };
}

/** Regional online offerings are services, not additional physical law offices. */
export function regionalServiceDirectoryEntity(
  region: keyof typeof REGION_NAMES,
  lang: "en" | "ar",
  name: string,
  description: string,
  services: ReadonlyArray<{ id: string; title: string }>,
) {
  const url = `${ENTITY_BASE_URL}/${region}${lang === "ar" ? "/ar" : ""}/services`;
  return {
    "@type": "Service",
    "@id": `${ENTITY_BASE_URL}/#${region}-service-directory`,
    name,
    description,
    url,
    areaServed: { "@type": "Country", name: REGION_NAMES[region] },
    provider: { "@id": COUNSELO_ENTITY_IDS.organization },
    availableChannel: { "@type": "ServiceChannel", serviceUrl: url, availableLanguage: ["Arabic", "English"] },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name,
      numberOfItems: services.length,
      itemListElement: services.map(service => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", "@id": `${ENTITY_BASE_URL}/#${region}-service-${service.id}`, name: service.title, url: `${url}/${service.id}`, provider: { "@id": COUNSELO_ENTITY_IDS.organization } },
      })),
    },
  };
}
