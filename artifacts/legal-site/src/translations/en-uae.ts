import { UAE_SERVICES } from "@/data/uae-legal-services";
import { buildUaeServicePageContent } from "@/data/uae-service-page-content";
import { en } from "@/translations/en";

const uaeBase = JSON.parse(
  JSON.stringify(en)
    .replaceAll("Saudi Arabia", "the United Arab Emirates")
    .replaceAll("Saudi", "UAE")
    .replaceAll("KSA", "UAE")
    .replaceAll("the Kingdom", "the Emirates")
    .replaceAll("Jubail", "Dubai"),
) as typeof en;

const serviceLinks = UAE_SERVICES.map((service) => ({
  name: service.title.en,
  href: `/services/${service.slug}`,
}));

const serviceDetails = Object.fromEntries(
  UAE_SERVICES.map((service) => {
    const pageContent = buildUaeServicePageContent(service);
    return [service.slug, {
      title: service.title.en,
      subtitle: service.short.en,
      overview: service.overview.en,
      experienceNote: pageContent.experienceNote.en,
      covers: service.covers.en,
      commonIssues: pageContent.issues.en,
      documents: pageContent.documents.en,
      process: [
        { title: "Initial Assessment", desc: "We review the facts, documents, deadlines, emirate and relevant authority or free zone." },
        { title: "Jurisdiction Mapping", desc: "We identify the applicable federal, emirate-level, mainland, DIFC or ADGM framework." },
        { title: "Legal Strategy", desc: "We explain the available options, risks, evidence requirements and recommended next steps." },
        { title: "Delivery & Follow-up", desc: "You receive practical guidance, document support and a clear route for any required representation." },
      ],
      concepts: service.concepts.en,
      authority: service.authority,
      faqs: pageContent.faqs.en,
      seoKeywords: pageContent.seoKeywords.en,
    }];
  }),
);

export const enUae = {
  ...uaeBase,
  nav: { ...en.nav, blog: "Blog", servicesList: serviceLinks },
  footer: {
    ...en.footer,
    links: { ...en.footer.links, blog: "Blog" },
    tagline: "Confidential online legal consultations for individuals, families, businesses and investors across the United Arab Emirates — in Arabic or English.",
    practiceAreaLinks: serviceLinks.map(({ name, href }) => ({ label: name, href })),
    address: "United Arab Emirates · Online consultations across all seven Emirates",
  },
  aboutPage: {
    ...uaeBase.aboutPage,
    seoTitle: "About CounselO UAE | Online Legal Consultation",
    seoDesc: "Learn about CounselO UAE, an online legal consultation service for federal, emirate-level, mainland and free-zone matters, available in Arabic and English across 22 practice areas.",
    seoKeywords: "about CounselO UAE, UAE online legal consultation, UAE legal services Arabic English, federal and free zone legal guidance",
    hero: {
      eyebrow: "About CounselO UAE",
      heading: "Online Legal Guidance for UAE Matters",
      subheading: "CounselO combines regional legal experience with a jurisdiction-first online process for individuals, families, businesses and investors across the United Arab Emirates.",
      badge: "Federal · Emirate-level · Mainland · Free zones",
    },
    stats: [
      { stat: "20,000+", label: "Legal Matters & Consultations" },
      { stat: "30+", label: "Years of Regional Experience" },
      { stat: "22", label: "UAE Practice Areas" },
      { stat: "2", label: "Service Languages" },
    ],
    mission: {
      eyebrow: "Our UAE Mission",
      heading: "Clearer Access to UAE Legal Guidance",
      p1: "CounselO helps clients begin UAE legal matters online, without assuming that every issue belongs to the same court, authority or legal framework. We first identify the relevant Emirate, federal or local authority, mainland or free-zone setting, and any DIFC or ADGM connection.",
      p2: "The service is designed for individuals, families, UAE businesses, founders and international investors who need structured guidance in Arabic or English before deciding on documents, negotiations, filings or formal representation.",
      p3: "Each consultation is scoped according to the facts and jurisdiction. Where a matter requires a UAE-licensed practitioner, formal filing, notarisation or in-person appearance, the required local engagement is identified separately and transparently.",
      vision2030Badge: "Built for the UAE's Digital Environment",
      vision2030Desc: "Online access with jurisdiction-specific analysis across federal, local and free-zone frameworks.",
    },
    founder: {
      eyebrow: "Our Founder",
      heading: "Lawyer & Legal Counsel Omar Al-Baghdadi",
      subheading: "Senior Counsel · Regional Experience · Mentor to 40+ Lawyers",
      bio1: "Lawyer and Legal Counsel Omar Al-Baghdadi has 30+ years of legal practice across litigation, commercial disputes, contracts, arbitration and cross-border matters. He founded CounselO to make structured legal guidance easier to access online.",
      bio2: "He graduated from the Faculty of Law at Damascus University in 1996 and developed his practice within a legal family whose professional history began with Al-Baghdadi Law Firm in 1957.",
      bio3: "His regional work has included 20,000+ legal matters and consultations for individuals, businesses and institutions. UAE matters are reviewed according to the competent federal, emirate-level, mainland or free-zone framework and the licensing requirements applicable to any formal representation.",
      bio4: "He has trained and supervised more than 40 lawyers. CounselO applies that senior review discipline to its UAE consultation process while avoiding any implication that an online consultation alone constitutes local court representation.",
      credentials: [
        "Graduate, Faculty of Law — Damascus University (1996)",
        "Regional legal leadership; local representation separately scoped",
        "Holder of the title \"Ustaz\" (Senior Counsel), conferred by the Syrian Bar Association",
        "30+ years of legal practice",
        "20,000+ regional cases and consultations",
        "Mentor and supervisor to 40+ lawyers",
        "Experience in commercial, civil, administrative, arbitration and cross-border matters",
        "Founder of CounselO's bilingual online consultation platform",
      ],
      stats: [
        { stat: "1996", label: "Legal Career Began" },
        { stat: "20,000+", label: "Legal Matters & Consultations" },
        { stat: "40+", label: "Lawyers Mentored" },
        { stat: "30+", label: "Years of Experience" },
      ],
    },
    office: {
      ...uaeBase.aboutPage.office,
      eyebrow: "UAE Service Model",
      heading: "Online Consultation with Jurisdiction-Specific Coordination",
      p1: "CounselO provides online consultation, document review and preliminary legal analysis for UAE matters across all seven Emirates.",
      p2: "If the reviewed scope requires a locally licensed advocate, court filing, notarisation or appearance before a UAE authority, that requirement and the appropriate engagement route are confirmed before the additional work begins.",
      city: "United Arab Emirates",
      region: "Online across all seven Emirates",
      partnerName: "CounselO UAE Matter Support",
      licenseNo: "Online consultation and jurisdiction review",
      address: "United Arab Emirates\nFederal, emirate-level, mainland and free-zone matters",
      mapsUrl: "",
      mapsLabel: "UAE service information",
      office2: undefined,
    },
    why: {
      eyebrow: "Why CounselO UAE",
      heading: "A Jurisdiction-First Consultation Process",
      points: [
        { title: "UAE-Specific Scope", desc: "The Emirate, authority and applicable legal framework are identified before recommendations are made." },
        { title: "Federal & Local Awareness", desc: "Advice distinguishes federal rules from emirate-level procedures and local regulators." },
        { title: "Mainland & Free Zones", desc: "Business matters are reviewed for mainland, ordinary free-zone, DIFC or ADGM implications." },
        { title: "Arabic & English", desc: "Bilingual explanations and document review for local and international clients." },
        { title: "Clear Engagement Boundaries", desc: "Consultation, document work and any required formal representation are scoped separately." },
        { title: "Confidential Online Access", desc: "Clients can begin securely from anywhere before an in-person step is considered." },
      ],
    },
    cta: {
      eyebrow: "Start with the Correct UAE Framework",
      heading: "Discuss Your UAE Legal Matter with CounselO",
      desc: "Share the facts, documents, Emirate and relevant authority or free zone. We will identify the appropriate consultation scope in Arabic or English.",
      ctaBtn: "Start Your Consultation",
      learnMoreBtn: "View UAE Services",
    },
  },
  home: {
    ...en.home,
    hero: {
      ...en.home.hero,
      badge: "Online Legal Consultation Platform — United Arab Emirates",
      h1a: "Online Legal Consultation",
      h1b: "for the UAE — Focused & Structured.",
      desc: "CounselO is an online legal consultation platform serving the United Arab Emirates — delivering expert legal guidance for individuals, families, businesses and investors across federal, emirate-level, mainland and free-zone matters",
      descBold: "without leaving your desk.",
      subDesc: "No office visit required. Consult via WhatsApp or email from anywhere in the UAE — with a target professional response time of 24 hours. We identify the relevant UAE framework before advising. 30+ years of legal practice, 20,000+ legal matters and consultations.",
      chips: ["✓ UAE-focused legal guidance", "✓ Arabic & English", "✓ Individuals & Businesses", "✓ Online across all Emirates"],
    },
    platform: {
      ...en.home.platform,
      subheading: "CounselO is a digital legal platform for UAE matters. Get structured guidance from anywhere in the Emirates, with the competent jurisdiction identified from the outset.",
      advantages: [
        { icon: "wifi", title: "Fully Online — Across the UAE", desc: "Consult from Dubai, Abu Dhabi, Sharjah or any other Emirate without an office visit." },
        { icon: "clock", title: "Clear Scope Before Work Begins", desc: "We confirm the matter, governing framework, deliverable and fee before starting legal work." },
        { icon: "lock", title: "Secure & Confidential", desc: "Documents and legal matters are handled through confidential professional channels." },
        { icon: "globe", title: "Arabic & English", desc: "Bilingual guidance for local clients, expatriates, founders and international investors." },
      ],
    },
    about: {
      ...en.home.about,
      p1: "CounselO was founded by Lawyer and Legal Counsel Omar Al-Baghdadi, a senior advocate with 30+ years of legal practice across the region. The UAE service brings that experience to matters involving federal law, emirate-level authorities, mainland businesses and financial free zones.",
      p2: "The platform coordinates UAE-focused legal analysis across corporate, commercial, employment, property, family, disputes and regulated-sector matters, with senior review and a clear scope for each consultation.",
      p3: "Whether you are an individual, a UAE company, a founder or a foreign investor, CounselO provides a direct bilingual route to structured legal guidance without unnecessary office visits.",
      founderTeamLine: "Leading a professional legal network across the UAE and the region",
      caseLabel: "Cases & Consultations Across the Region",
    },
    howItWorks: {
      ...en.home.howItWorks,
      subheading: "Four clear steps from your first message to practical UAE legal direction.",
      steps: [
        { step: "01", title: "Describe Your Matter", desc: "Share the facts, documents, deadline and the Emirate or free zone involved." },
        { step: "02", title: "Confirm the Jurisdiction", desc: "We identify the relevant federal, local, mainland, DIFC, ADGM or other free-zone framework." },
        { step: "03", title: "Approve Scope & Fee", desc: "Receive a clear scope, deliverable and fee before legal work begins." },
        { step: "04", title: "Receive Legal Direction", desc: "Get structured analysis, practical next steps and follow-up options in Arabic or English." },
      ],
    },
    consultMethods: {
      ...en.home.consultMethods,
      eyebrow: "Available Online — Across the UAE",
      intro: "Start securely by WhatsApp or email. CounselO reviews the UAE jurisdiction, relevant authority and documents before confirming the appropriate legal work.",
    },
    whoWeServe: {
      ...en.home.whoWeServe,
      subheading: "UAE legal guidance for individuals, families, operating businesses, founders, investors and institutions.",
      clients: [
        { title: "Individuals & Families", desc: "Family, employment, tenancy, property, immigration and personal disputes across the Emirates." },
        { title: "UAE Businesses", desc: "Corporate governance, commercial contracts, compliance, employment and dispute support." },
        { title: "Founders & Investors", desc: "Mainland and free-zone formation, ownership, licensing, structuring and investment questions." },
        { title: "International Clients", desc: "Cross-border contracts, arbitration, enforcement, DIFC and ADGM-related matters." },
      ],
    },
    practiceAreas: {
      ...en.home.practiceAreas,
      heading: "Core Practice Areas — United Arab Emirates",
      subheading: "UAE-focused support across federal law, emirate-level authorities, mainland business and free-zone frameworks.",
      areas: UAE_SERVICES.slice(0, 6).map((service) => ({ title: service.title.en, desc: service.short.en, path: `/services/${service.slug}` })),
    },
    whyAdlix: {
      ...en.home.whyAdlix,
      features: [
        { title: "Jurisdiction First", desc: "We identify the Emirate, authority, court, mainland or free-zone framework before recommending a route." },
        { title: "Confidential & Structured", desc: "Your facts and documents are reviewed through a clear professional consultation process." },
        { title: "Senior Legal Oversight", desc: "CounselO was founded by Lawyer and Legal Counsel Omar Al-Baghdadi, with 30+ years of legal practice." },
        { title: "Arabic & English", desc: "Bilingual legal guidance for UAE residents, businesses and international clients." },
      ],
    },
    testimonials: {
      ...en.home.testimonials,
      heading: "Transparent scope across the UAE",
      items: [
        { quote: "Consultation begins with the relevant Emirate, authority, framework and documents.", author: "Scope", title: "Jurisdiction-first review" },
        { quote: "Published work samples are redacted and illustrative; they do not promise a result for a new matter.", author: "Evidence", title: "Confidentiality protected" },
        { quote: "Filing, attendance or representation is separately scoped with a licensed professional when required.", author: "Engagement", title: "Clear professional boundaries" },
      ],
    },
    cta: {
      ...en.home.cta,
      eyebrow: "Online Legal Consultation Platform — UAE",
      heading: "Start with the Right UAE Jurisdiction.",
      desc: `${UAE_SERVICES.length} UAE-focused legal services for individuals, businesses and investors — online in Arabic or English.`,
      subDesc: "Federal · Emirate-level · Mainland · Free zones · DIFC · ADGM",
    },
    cooperation: {
      ...en.home.cooperation,
      desc: "Most consultations, document reviews and legal opinions can begin online. If a UAE matter requires formal filing, representation, notarisation or attendance before a competent authority, the required local engagement is confirmed after reviewing the scope and jurisdiction.",
      officeLabel: "UAE Matter Support",
      officeName: "Jurisdiction-specific coordination",
      officeDetail: "Formal representation is arranged only where required and subject to the applicable UAE licensing and engagement requirements.",
    },
  },
  contact: {
    ...en.contact,
    hero: {
      heading: "Start Your UAE Consultation",
      subheading: "Tell us about your UAE matter and share any useful documents. We will review the scope, relevant Emirate or free zone, and the appropriate consultation route, with a target response time of 24 hours.",
    },
    firmDetails: {
      ...en.contact.firmDetails,
      heading: "UAE Service Details",
      address: "United Arab Emirates\nOnline consultations across all seven Emirates",
      hours: "Online enquiries accepted at any time",
    },
    form: {
      ...en.contact.form,
      phonePlaceholder: "+971 or your international number",
      serviceOptions: UAE_SERVICES.map((service) => ({ value: service.slug, label: service.title.en })),
      disclaimer: "Submissions are handled under applicable confidentiality and data-protection obligations. Our target response time is within 24 hours.",
    },
  },
  services: {
    ...en.services,
    hero: {
      heading: `${UAE_SERVICES.length} UAE Legal Practice Areas`,
      desc: "A complete UAE-focused legal directory covering corporate, commercial, employment, property, family, disputes, tax, technology, immigration and regulated sectors across federal, local and free-zone frameworks.",
    },
    items: UAE_SERVICES.map((service) => ({ id: service.slug, title: service.title.en, longDesc: service.overview.en })),
  },
  serviceDetail: { ...en.serviceDetail, services: serviceDetails },
} as unknown as typeof en;
