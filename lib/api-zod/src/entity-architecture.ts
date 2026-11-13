export const ENTITY_BASE_URL = "https://counselo-legal.com";
export const OMAR_OFFICIAL_PROFILE_URL = "https://omarbaghdadi.com";
export const BAGHDADI_LAW_PROFILE_URL = "https://www.baghdadilaw.co/who-we-are";
export const OMAR_CANONICAL_ENTITY_ID = `${OMAR_OFFICIAL_PROFILE_URL}/#omar-al-baghdadi`;
export const BAGHDADI_LAW_CANONICAL_ENTITY_ID = "https://www.baghdadilaw.co/#legalservice";
import { COUNSELO_PLATFORM_POSITIONING } from "./platform-positioning";

export const COUNSELO_ENTITY_IDS = {
  organization: `${ENTITY_BASE_URL}/#organization`,
  website: `${ENTITY_BASE_URL}/#website`,
  omar: OMAR_CANONICAL_ENTITY_ID,
  saudiOffice: `${ENTITY_BASE_URL}/#office-abdullah-al-anzi`,
  alBaghdadiOffice: BAGHDADI_LAW_CANONICAL_ENTITY_ID,
  syriaAbdullahOffice: `${ENTITY_BASE_URL}/#office-omar-al-abdullah`,
} as const;

const serviceAreas = COUNSELO_PLATFORM_POSITIONING.jurisdictions.map((name) => ({ "@type": "Country", name }));
const platformServices = [
  { id: "legal-consultation", name: "Legal consultation and written advice", description: "Assessment of the facts, legal position and available options, from focused questions to complex multi-party and cross-border matters." },
  { id: "contracts-and-documents", name: "Contract drafting and document review", description: "Contract and transaction review, risk analysis, revised terms, agreements and legal memoranda for personal and business matters." },
  { id: "litigation-and-arbitration-support", name: "Litigation, arbitration and dispute strategy", description: "Claims, defences, evidence analysis, legal submissions, negotiation, settlement and enforcement strategy, coordinated with the responsible local representative." },
  { id: "continuing-legal-support", name: "Continuing legal support", description: "Legal preparation, advice and follow-up as a matter develops, including coordination between professionals where parties, proceedings or assets span countries." },
] as const;

// Known provider references belong to the published regional partners. An
// unnamed UAE professional is identified in the engagement, not invented here.
const representationServices = [
  { region: "sa", country: "Saudi Arabia", providerIds: [COUNSELO_ENTITY_IDS.saudiOffice] },
  { region: "syr", country: "Syria", providerIds: [COUNSELO_ENTITY_IDS.alBaghdadiOffice, COUNSELO_ENTITY_IDS.syriaAbdullahOffice] },
  { region: "uae", country: "United Arab Emirates", providerIds: [] },
] as const;

export const COUNSELO_ORGANIZATION = {
  "@type": "Organization",
  "@id": COUNSELO_ENTITY_IDS.organization,
  name: "CounselO Legal",
  alternateName: ["كاونسلو للاستشارات القانونية", "CounselO", "كاونسلو"],
  description: COUNSELO_PLATFORM_POSITIONING.descriptionEn,
  url: ENTITY_BASE_URL,
  logo: { "@type": "ImageObject", url: `${ENTITY_BASE_URL}/logo.png`, width: 512, height: 512 },
  founder: { "@id": COUNSELO_ENTITY_IDS.omar },
  areaServed: serviceAreas,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+966594850247",
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
    "Court representation through licensed local partners",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    "@id": `${ENTITY_BASE_URL}/#legal-services`,
    name: "CounselO legal services and regional representation",
    itemListElement: [
      ...platformServices.map((service) => ({
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
      ...representationServices.map(({ region, country, providerIds }) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${ENTITY_BASE_URL}/#${region}-partner-representation`,
          name: `Court and authority representation in ${country}`,
          serviceType: "Representation through licensed local partners",
          description: `Court and authority representation in ${country} is delivered by appropriately licensed local partners or cooperating offices, with CounselO coordinating legal preparation and follow-up. The responsible professional and representation scope are identified in the agreed engagement.`,
          broker: { "@id": COUNSELO_ENTITY_IDS.organization },
          ...(providerIds.length ? { provider: providerIds.map((id) => ({ "@id": id })) } : {}),
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
  name: "CounselO Legal",
  alternateName: ["كاونسلو للاستشارات القانونية", "CounselO", "كاونسلو"],
  url: ENTITY_BASE_URL,
  publisher: { "@id": COUNSELO_ENTITY_IDS.organization },
  inLanguage: ["en", "ar"],
} as const;

export const OMAR_AL_BAGHDADI = {
  "@type": "Person",
  "@id": COUNSELO_ENTITY_IDS.omar,
  name: "Omar Al-Baghdadi",
  alternateName: ["Omar Riyad Al-Baghdadi", "عمر البغدادي"],
  url: OMAR_OFFICIAL_PROFILE_URL,
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

export const COOPERATING_OFFICES = {
  saudi: {
    "@type": "LegalService",
    "@id": COUNSELO_ENTITY_IDS.saudiOffice,
    name: "Lawyer Abdullah Al-Anzi",
    alternateName: "المحامي عبدالله العنزي",
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
  },
  alBaghdadi: {
    "@type": "LegalService",
    "@id": COUNSELO_ENTITY_IDS.alBaghdadiOffice,
    name: "Al-Baghdadi Law Firm",
    alternateName: "مكتب البغدادي للمحاماة",
    url: "https://www.baghdadilaw.co/",
    areaServed: ["Saudi Arabia", "United Arab Emirates", "Syria"],
  },
  syriaAbdullah: {
    "@type": "LegalService",
    "@id": COUNSELO_ENTITY_IDS.syriaAbdullahOffice,
    name: "Lawyer Omar Al-Abdullah Office",
    alternateName: "مكتب المحامي عمر العبد الله",
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
