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
    tagline: "Online consultation, document review and remote follow-up, through to legal representation in the UAE with the same CounselO team, in Arabic and English.",
    practiceAreaLinks: serviceLinks.map(({ name, href }) => ({ label: name, href })),
    address: "United Arab Emirates · Advice and representation across all seven Emirates",
  },
  aboutPage: {
    ...uaeBase.aboutPage,
    seoTitle: "CounselO Team in the UAE | Legal Advice & Representation",
    seoDesc: "Meet CounselO’s team in the UAE: one team for online consultation, document review, representation and remote follow-up.",
    seoKeywords: "CounselO legal team, lawyers in the UAE, legal advice, legal representation, Omar Al-Baghdadi, Arabic English legal services",
    hero: {
      eyebrow: "About CounselO Legal UAE",
      heading: "Your Legal Team, Accessible Online",
      subheading: "Connect with CounselO’s team online about your matter in the UAE. The same CounselO team handles your online communication, legal work and representation, including required court and authority attendance through its appropriately licensed members.",
      badge: "Online Consultation · Remote Follow-up · Representation",
    },
    stats: [
      { stat: "One team", label: "Advice through representation" },
      { stat: "Experienced team", label: "Advice, drafting and litigation" },
      { stat: "22", label: "UAE Practice Areas" },
      { stat: "2", label: "Service Languages" },
    ],
    mission: {
      eyebrow: "Our UAE Mission",
      heading: "Complete Legal Support with One Team",
      p1: "We bring consultation, drafting, negotiation and representation together in one destination for individuals, families, businesses and investors in the UAE. Our team identifies the right approach for your matter and works with you from the start.",
      p2: "Start your online consultation in Arabic or English from anywhere. Share documents through the agreed channel and follow your matter remotely with our team, from the first review through proceedings and representation.",
      p3: "We agree the scope, fees and next steps with you before work begins. The same CounselO team handles your online communication, procedures and representation through its appropriately authorised members.",
      vision2030Badge: "Built for the UAE's Digital Environment",
      vision2030Desc: "Online access to your legal team, with continuity across advice, procedures and representation.",
    },
    founder: {
      eyebrow: "Our Founder",
      heading: "Lawyer & Legal Counsel Omar Al-Baghdadi",
      subheading: "Senior Counsel · Regional Experience · Mentor to 40+ Lawyers",
      bio1: "Lawyer and Legal Counsel Omar Al-Baghdadi has 30+ years of legal practice across litigation, commercial disputes, contracts, arbitration and cross-border matters. He founded CounselO Legal to bring advice and representation together through one accessible legal team.",
      bio2: "He graduated from the Faculty of Law at Damascus University in 1996 and developed his practice within a legal family whose professional history began with Al-Baghdadi Law Firm in 1957.",
      bio3: "CounselO Legal reports a career-wide regional total of 20,000+ legal matters and consultations handled or supervised during Omar’s professional practice, including advice, document reviews and related engagements. This stated experience figure is not independently audited and is not a count of court victories, matters in a single jurisdiction or work performed solely through CounselO Legal.",
      bio4: "Omar has trained or supervised more than 40 lawyers. He directs CounselO’s legal work, including review of analysis and strategy and follow-up with the team members responsible for each matter.",
      credentials: [
        "Graduate, Faculty of Law — Damascus University (1996)",
        "Leading a legal team providing advice and representation within each jurisdiction",
        "Holder of the title \"Ustaz\" (Senior Counsel), conferred by the Syrian Bar Association",
        "30+ years of legal practice",
        "20,000+ career-wide legal matters and consultations across the region",
        "Mentor and supervisor to 40+ lawyers",
        "Experience in commercial, civil, administrative, arbitration and cross-border matters",
        "Founder of CounselO’s bilingual legal services team",
      ],
      stats: [
        { stat: "1996", label: "Legal Career Began" },
        { stat: "20,000+", label: "Career-wide matters & consultations across the region" },
        { stat: "40+", label: "Lawyers Mentored" },
        { stat: "30+", label: "Years of Experience" },
      ],
    },
    office: {
      ...uaeBase.aboutPage.office,
      eyebrow: "CounselO’s Team on the Ground",
      heading: "CounselO’s Legal Team in the UAE",
      p1: "Work with CounselO’s team in the UAE from your first contact through proceedings and representation. Share documents and follow your matter in Arabic or English, whether you are in the country or abroad.",
      p2: "The CounselO team in the UAE comprises licensed lawyers and law offices. Team members handle the procedures and representation required for the relevant Emirate and authority, with your matter supported by the same team.",
      city: "United Arab Emirates",
      region: "Online across all seven Emirates",
      partnerName: "CounselO’s UAE Team",
      address: "United Arab Emirates\nFederal, emirate-level, mainland and free-zone matters",
      mapsUrl: "",
      mapsLabel: "UAE service information",
      office2: undefined,
    },
    why: {
      eyebrow: "Why CounselO Legal UAE",
      heading: "A Jurisdiction-First Consultation Process",
      points: [
        { title: "UAE-Specific Scope", desc: "The Emirate, authority and applicable legal framework are identified before recommendations are made." },
        { title: "Federal & Local Awareness", desc: "Advice distinguishes federal rules from emirate-level procedures and local regulators." },
        { title: "Mainland & Free Zones", desc: "Business matters are reviewed for mainland, ordinary free-zone, DIFC or ADGM implications." },
        { title: "Arabic & English", desc: "Bilingual explanations and document review for local and international clients." },
        { title: "Integrated Service, Clear Scope", desc: "Our team handles advice, document work and representation within a clear, agreed scope." },
        { title: "Confidential Online Access", desc: "Clients can begin securely from anywhere before an in-person step is considered." },
      ],
    },
    cta: {
      eyebrow: "Start with the Correct UAE Framework",
      heading: "Speak with CounselO for Advice and Representation",
      desc: "Share a summary of your matter in the UAE, relevant documents and any important deadline. Our team explains the scope, fees and timing, and handles the next steps with you.",
      ctaBtn: "Start Your Consultation",
      learnMoreBtn: "View UAE Services",
    },
  },
  home: {
    ...en.home,
    hero: {
      ...en.home.hero,
      badge: "Online Access to Your Legal Team — the UAE",
      h1a: "Expert Legal Support Online",
      h1b: "One Team, from Consultation to Representation.",
      desc: "CounselO delivers legal advice, contracts, negotiation and representation in the UAE. The same CounselO team handles your online communication, legal work and representation, including required court and authority attendance through its appropriately licensed members.",
      descBold: "One team supporting your matter from the start.",
      subDesc: "Start your online consultation through WhatsApp or email. We review your matter and agree the scope with you, and you continue with the same CounselO team from advice to representation.",
      chips: ["✓ Experienced legal team","✓ Arabic & English","✓ Advice & representation","✓ One team throughout"],
    },
    platform: {
      ...en.home.platform,
      subheading: "Online consultation, document review and remote follow-up for your matter in the UAE, with one team also handling the contracts, negotiation and representation you need.",
      advantages: [
        { icon: "wifi", title: "Start Online — Across the UAE", desc: "Discuss your matter and share documents online from any emirate; the same team handles local legal work where required." },
        { icon: "clock", title: "Clear Scope Before Work Begins", desc: "We confirm the matter, governing framework, deliverable and fee before starting legal work." },
        { icon: "lock", title: "Secure & Confidential", desc: "Documents and legal matters are handled through confidential professional channels." },
        { icon: "globe", title: "Arabic & English", desc: "Bilingual guidance for local clients, expatriates, founders and international investors." },
      ],
    },
    about: {
      ...en.home.about,
      p1: "CounselO’s team brings experience in contracts, disputes, family, employment and property matters to your legal needs in the UAE. The same team handles advice, document review, drafting and representation, with online communication and required local work through its appropriately licensed members.",
      p2: "Our team handles corporate, commercial, employment, property, family and dispute matters in the UAE, with professional review and a plan connecting advice to procedures and representation.",
      p3: "Whether you are an individual, business or investor, CounselO brings its lawyers and offices together as one team to handle your matter and keep you informed in Arabic or English.",
      founderTeamLine: "Leading CounselO’s legal team across Saudi Arabia, Syria and the UAE",
      caseLabel: "Cases & Consultations Across the Region",
    },
    howItWorks: {
      ...en.home.howItWorks,
      subheading: "We understand your matter, agree the work and handle the advice, procedures and representation you need.",
      steps: [
        { step: "01", title: "Contact Our Team", desc: "Share a summary, the country involved and any important deadline through WhatsApp or email." },
        { step: "02", title: "We Review Your Matter", desc: "Our team reviews the facts, documents and jurisdiction, and explains your options and next steps." },
        { step: "03", title: "Agree the Work", desc: "We confirm scope, fees, timing and any required authorisation or documents before work begins." },
        { step: "04", title: "We Handle the Next Steps", desc: "The CounselO team delivers the agreed advice, drafting, negotiation and representation, keeping you informed throughout." },
      ],
    },
    consultMethods: {
      ...en.home.consultMethods,
      eyebrow: "Available Online — Across the UAE",
      intro: "CounselO’s experienced legal team provides structured legal analysis and practical guidance. Published work samples are redacted and illustrative, and do not guarantee the result of another matter.",
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
      subheading: "Explore CounselO’s legal services in the UAE: consultation, drafting, negotiation and representation through one team.",
      areas: UAE_SERVICES.slice(0, 6).map((service) => ({ title: service.title.en, desc: service.short.en, path: `/services/${service.slug}` })),
    },
    whyAdlix: {
      ...en.home.whyAdlix,
      features: [
        { title: "Jurisdiction First", desc: "We identify the Emirate, authority, court, mainland or free-zone framework before recommending a route." },
        { title: "Confidential & Structured", desc: "Your facts and documents are reviewed through a clear professional consultation process." },
        { title: "Experienced legal team", desc: "Our team applies its experience to document analysis, risk assessment and the preparation of legal advice, contracts and memoranda." },
        { title: "Arabic & English", desc: "Bilingual legal guidance for UAE residents, businesses and international clients." },
      ],
    },
    testimonials: {
      ...en.home.testimonials,
      heading: "Transparent scope across the UAE",
      items: [
        { quote: "Consultation begins with the relevant Emirate, authority, framework and documents.", author: "Scope", title: "Jurisdiction-first review" },
        { quote: "Published work samples are redacted and illustrative; they do not promise a result for a new matter.", author: "Evidence", title: "Confidentiality protected" },
        { quote: "The same CounselO team handles your online communication, filing, attendance and representation through its appropriately licensed members within the agreed scope.", author: "Engagement", title: "One team throughout your matter" },
      ],
    },
    cta: {
      ...en.home.cta,
      eyebrow: "CounselO Legal Services — the UAE",
      heading: "Your Legal Team, from Advice to Representation.",
      desc: "Get legal advice online for your matter in the UAE. The same CounselO team reviews your documents, drafts your contracts, negotiates and represents you, with remote follow-up in Arabic or English.",
      subDesc: "Experienced legal team · WhatsApp or email · Arabic and English",
    },
    cooperation: {
      ...en.home.cooperation,
      desc: "The licensed lawyers and offices in the UAE are part of the CounselO team. We handle consultation, preparation and representation before courts and authorities, with continuity throughout your matter.",
      officeLabel: "Part of the CounselO Team",
      officeName: "CounselO’s UAE Team",
      officeDetail: "Licensed lawyers and offices in the UAE, working as part of the CounselO team to advise, represent and support you.",
    },
  },
  contact: {
    ...en.contact,
    hero: {
      heading: "Contact CounselO’s Legal Team Online",
      subheading: "Start your consultation online, share documents and follow your matter remotely. Whether you need advice, drafting or legal representation, the CounselO team explains the scope and fees and handles the next steps with you.",
    },
    firmDetails: {
      ...en.contact.firmDetails,
      heading: "UAE Service Details",
      address: "United Arab Emirates\nAdvice and representation across all seven Emirates",
      phoneTitle: "Regional intake phone & WhatsApp (Saudi number)",
      hours: "Online enquiries accepted at any time",
    },
    form: {
      ...en.contact.form,
      phonePlaceholder: "+971 or your international number",
      serviceOptions: UAE_SERVICES.map((service) => ({ value: service.slug, label: service.title.en })),
      disclaimer: "Submissions are handled under applicable confidentiality and data-protection obligations. We aim to respond within a target 24-hour response window, subject to scope, urgency, completeness and availability.",
    },
  },
  services: {
    ...en.services,
    hero: {
      heading: `${UAE_SERVICES.length} UAE Legal Practice Areas`,
      desc: "Online consultation and document review across 22 practice areas in the UAE, alongside contracts, negotiation, litigation and enforcement. Contact and follow your matter remotely with the same CounselO team from advice to representation.",
    },
    items: UAE_SERVICES.map((service) => ({ id: service.slug, title: service.title.en, longDesc: service.overview.en })),
  },
  serviceDetail: { ...en.serviceDetail, services: serviceDetails },
} as unknown as typeof en;
