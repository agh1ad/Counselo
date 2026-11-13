/** Retained source for retired detailed templates; intentionally absent from the active site bundle. */
import { en as activeBase } from "./en";
import { enLegacyServiceDetails } from "./en.legacy";
const en = { ...activeBase, ...enLegacyServiceDetails };


export const enSyrLegacyServiceDetails = {
familyLawDetail: {
    ...en.familyLawDetail,
    parentTitle: "Family Law — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Family Law — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    services: Object.fromEntries(
      Object.entries(en.familyLawDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/Saudi Personal Status Law/g, "Syrian Personal Status Law"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/Saudi courts/g, "Syrian courts")),
        overview1: svc.overview1
          .replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law")
          .replace(/MHRSD|Ministry of Human Resources/g, "Ministry of Social Affairs and Labour")
          .replace(/Personal Status Courts?/g, "Syrian Personal Status Courts")
          .replace(/KSA/g, "Syria")
          .replace(/Board of Grievances/g, "State Council (مجلس الدولة)")
          .replace(/Vision 2030/g, "Syrian Investment Law No. 18/2021"),
        overview2: svc.overview2
          ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Board of Grievances/g, "State Council (مجلس الدولة)")
          : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria")
            .replace(/Board of Grievances/g, "State Council (مجلس الدولة)")
            .replace(/MHRSD|Ministry of Human Resources/g, "Ministry of Social Affairs and Labour")
            .replace(/Personal Status Law \(Royal Decree.*?\)/g, "Syrian Personal Status Law No. 59/1953")
            .replace(/Vision 2030/g, "Syrian Investment Commission"),
        })),
      }])
    ) as typeof en.familyLawDetail.services,
  },

businessLawDetail: {
    ...en.businessLawDetail,
    parentTitle: "Commercial Law — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Commercial Law — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    services: Object.fromEntries(
      Object.entries(en.businessLawDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/Saudi Commercial Code/g, "Syrian Commercial Code"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/SCCA/g, "Damascus Chamber arbitration").replace(/Saudi courts/g, "Syrian courts")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Vision 2030/g, "Syrian commercial law reforms").replace(/Board of Grievances/g, "State Council (مجلس الدولة)").replace(/SCCA/g, "Damascus Chamber arbitration"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Vision 2030/g, "Syrian commercial law").replace(/SCCA/g, "Damascus Chamber arbitration") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Vision 2030/g, "Syrian commercial law").replace(/SCCA/g, "Damascus Chamber arbitration").replace(/Board of Grievances/g, "State Council (مجلس الدولة)"),
        })),
      }])
    ) as typeof en.businessLawDetail.services,
  },

realEstateLawDetail: {
    ...en.realEstateLawDetail,
    parentTitle: "Property Law — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Property Law — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    services: Object.fromEntries(
      Object.entries(en.realEstateLawDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/REGA/g, "Real Estate Directorate"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/REGA/g, "Real Estate Directorate").replace(/Ejar/g, "Syrian tenancy register").replace(/Saudi courts/g, "Syrian courts")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/REGA/g, "Real Estate Directorate").replace(/Ejar/g, "Syrian tenancy law").replace(/Vision 2030/g, "Syrian property law"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/REGA/g, "Real Estate Directorate").replace(/Ejar/g, "Syrian tenancy register") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Ejar/g, "Syrian real estate registration"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/REGA/g, "Real Estate Directorate").replace(/Ejar/g, "Syrian tenancy registration"),
        })),
      }])
    ) as typeof en.realEstateLawDetail.services,
  },

employmentLawDetail: {
    ...en.employmentLawDetail,
    parentTitle: "Employment Law — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Employment Law — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    services: Object.fromEntries(
      Object.entries(en.employmentLawDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi Labor Law/g, "Syrian Labour Law No. 17/2010").replace(/Saudi law/g, "Syrian law"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/Saudi Labor Law/g, "Syrian Labour Law No. 17/2010").replace(/MHRSD/g, "Ministry of Social Affairs and Labour").replace(/Saudi Labor Tribunals?/g, "Syrian Labour Courts")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi Labor Law/g, "Syrian Labour Law No. 17/2010").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/MHRSD|Ministry of Human Resources and Social Development/g, "Ministry of Social Affairs and Labour").replace(/Saudi Labor Tribunals?/g, "Syrian Labour Courts"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/Saudi Labor Law/g, "Syrian Labour Law No. 17/2010").replace(/KSA/g, "Syria").replace(/Saudi Labor Tribunals?/g, "Syrian Labour Courts") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi Labor Law/g, "Syrian Labour Law No. 17/2010").replace(/KSA/g, "Syria").replace(/MHRSD|Ministry of Human Resources/g, "Ministry of Social Affairs and Labour").replace(/Saudi Labor Tribunals?/g, "Syrian Labour Courts"),
        })),
      }])
    ) as typeof en.employmentLawDetail.services,
  },

foreignInvestmentDetail: {
    ...en.foreignInvestmentDetail,
    parentTitle: "Foreign Investment — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Foreign Investment — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    services: Object.fromEntries(
      Object.entries(en.foreignInvestmentDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/MISA/g, "Syrian Investment Commission").replace(/Vision 2030/g, "Investment Law No. 18/2021"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/MISA/g, "Syrian Investment Commission").replace(/Vision 2030/g, "Investment Law No. 18/2021").replace(/Board of Grievances/g, "State Council").replace(/SCCA/g, "Damascus Chamber")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/MISA/g, "Syrian Investment Commission").replace(/Vision 2030/g, "Investment Law No. 18/2021").replace(/Foreign Investment Law/g, "Syrian Investment Law No. 18/2021").replace(/Board of Grievances/g, "State Council (مجلس الدولة)").replace(/SCCA/g, "Damascus Chamber arbitration"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/MISA/g, "Syrian Investment Commission").replace(/Vision 2030/g, "Investment Law No. 18/2021") : svc.overview2,
        experienceNote: svc.experienceNote ? svc.experienceNote.replace(/Saudi Arabia/g, "Syria").replace(/KSA/g, "Syria").replace(/MISA/g, "Syrian Investment Commission").replace(/Vision 2030/g, "Syrian Investment Law") : svc.experienceNote,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/MISA/g, "Syrian Investment Commission"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/MISA/g, "Syrian Investment Commission").replace(/Vision 2030/g, "Investment Law No. 18/2021").replace(/Board of Grievances/g, "State Council (مجلس الدولة)").replace(/SCCA/g, "Damascus Chamber arbitration"),
        })),
      }])
    ) as typeof en.foreignInvestmentDetail.services,
  },

administrativeLawDetail: {
    ...en.administrativeLawDetail,
    parentTitle: "Administrative Law — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Administrative Law — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    subAreas: [
      { id: "board-of-grievances", label: "State Council (مجلس الدولة) Litigation" },
      { id: "administrative-appeals", label: "Administrative Decision Appeals" },
      { id: "government-contracts", label: "Government Contract Disputes" },
      { id: "public-procurement", label: "Public Procurement Disputes" },
      { id: "regulatory-licensing", label: "Regulatory & Licensing Disputes" },
      { id: "customs-tax-disputes", label: "Customs & Tax Authority Disputes" },
      { id: "disciplinary-proceedings", label: "Professional Disciplinary Proceedings" },
      { id: "government-compensation", label: "Compensation Claims Against Government" },
    ],
    services: Object.fromEntries(
      Object.entries(en.administrativeLawDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria").replace(/Board of Grievances/g, "State Council (مجلس الدولة)"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/Board of Grievances/g, "State Council (مجلس الدولة)"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/Board of Grievances/g, "State Council (مجلس الدولة)").replace(/ZATCA/g, "General Tax Authority").replace(/MISA/g, "Syrian Investment Commission")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Board of Grievances/g, "State Council (مجلس الدولة)").replace(/Vision 2030/g, "Syrian administrative law"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/Board of Grievances/g, "State Council (مجلس الدولة)").replace(/KSA/g, "Syria") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Board of Grievances/g, "State Council (مجلس الدولة)"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Board of Grievances/g, "State Council (مجلس الدولة)").replace(/Vision 2030/g, "Syrian administrative law"),
        })),
      }])
    ) as typeof en.administrativeLawDetail.services,
  },

arbitrationDetail: {
    ...en.arbitrationDetail,
    parentTitle: "Arbitration & Mediation — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Arbitration & Mediation — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    services: Object.fromEntries(
      Object.entries(en.arbitrationDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria").replace(/SCCA/g, "Damascus Chamber"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/SCCA/g, "Damascus Chamber of Commerce"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/SCCA/g, "Damascus Chamber of Commerce").replace(/Saudi Centre for Commercial Arbitration/g, "Damascus Chamber of Commerce Arbitration Center")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/SCCA/g, "Damascus Chamber of Commerce Arbitration").replace(/Saudi Centre for Commercial Arbitration/g, "Damascus Chamber of Commerce Arbitration Center").replace(/Vision 2030/g, "Syrian Arbitration Law No. 4/2008"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/SCCA/g, "Damascus Chamber arbitration").replace(/KSA/g, "Syria") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/SCCA/g, "Damascus Chamber arbitration"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/SCCA/g, "Damascus Chamber arbitration").replace(/Saudi Centre for Commercial Arbitration/g, "Damascus Chamber of Commerce Arbitration Center"),
        })),
      }])
    ) as typeof en.arbitrationDetail.services,
  },

enforcementDetail: {
    ...en.enforcementDetail,
    parentTitle: "Enforcement & Debt Collection — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Enforcement & Debt Collection — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    services: Object.fromEntries(
      Object.entries(en.enforcementDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi Government/g, "Syrian Government"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/Saudi Government/g, "Syrian Government")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Enforcement Law \(Royal Decree M\/53\)/g, "Syrian Code of Civil Procedure"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/KSA/g, "Syria") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria"),
        })),
      }])
    ) as typeof en.enforcementDetail.services,
  },

companiesLawDetail: {
    ...en.companiesLawDetail,
    parentTitle: "Companies Law — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Companies Law — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    services: Object.fromEntries(
      Object.entries(en.companiesLawDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/Saudi Companies Law/g, "Syrian Companies Law No. 29/2011"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/Saudi Companies Law/g, "Syrian Companies Law No. 29/2011").replace(/SCCA/g, "Damascus Chamber arbitration")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Companies Law \(Royal Decree.*?\)/g, "Syrian Companies Law No. 29/2011").replace(/SCCA/g, "Damascus Chamber arbitration"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Companies Law \(Royal Decree.*?\)/g, "Syrian Companies Law No. 29/2011"),
        })),
      }])
    ) as typeof en.companiesLawDetail.services,
  },

contractsDetail: {
    ...en.contractsDetail,
    parentTitle: "Contracts — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Contracts — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    services: Object.fromEntries(
      Object.entries(en.contractsDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/Civil Transactions Law/g, "Syrian Civil Code No. 84/1949"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/Civil Transactions Law/g, "Syrian Civil Code No. 84/1949")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian Civil Code").replace(/KSA/g, "Syria").replace(/Civil Transactions Law/g, "Syrian Civil Code No. 84/1949"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian Civil Code").replace(/KSA/g, "Syria").replace(/Civil Transactions Law/g, "Syrian Civil Code No. 84/1949"),
        })),
      }])
    ) as typeof en.contractsDetail.services,
  },

criminalLawDetail: {
    ...en.criminalLawDetail,
    parentTitle: "Criminal Law — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Criminal Law — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    services: Object.fromEntries(
      Object.entries(en.criminalLawDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/Saudi Criminal Court/g, "Syrian Criminal Court"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/Supreme Court/g, "Court of Cassation")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Code of Criminal Procedure \(Royal Decree M\/39\)/g, "Code of Criminal Procedure (Legislative Decree No. 112/1950)").replace(/Supreme Court/g, "Court of Cassation").replace(/Court of Appeal and Supreme Court/g, "Court of Appeal and Court of Cassation"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Supreme Court/g, "Court of Cassation"),
        })),
      }])
    ) as typeof en.criminalLawDetail.services,
  },

bankingFinanceDetail: {
    ...en.bankingFinanceDetail,
    parentTitle: "Banking & Finance Law — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Banking & Finance Law — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    sidebar: {
      heading: "Need a Banking & Finance Lawyer?",
      desc: "Get expert Syrian banking and finance law advice — Central Bank of Syria regulations, banking disputes, and Islamic finance under Syrian law. Online consultation available.",
      ctaBtn: "Start a Consultation",
      whatsapp: "WhatsApp",
      email: "Email",
      callLabel: "Or call us directly at:",
      phone: "+963 11 XXX XXXX",
    },
    services: Object.fromEntries(
      Object.entries(en.bankingFinanceDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria").replace(/SAMA & CMA/g, "Central Bank of Syria").replace(/\bSAMA\b/g, "Central Bank of Syria").replace(/\bCMA\b/g, "Syrian financial authorities"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/SAMA/g, "Central Bank of Syria").replace(/CMA/g, "Syrian financial authorities"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/\bSAMA\b/g, "Central Bank of Syria").replace(/Capital Market Authority \(CMA\)|CMA/g, "Ministry of Economy").replace(/sukuk/gi, "Islamic bonds")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Saudi Central Bank \(SAMA\)|SAMA/g, "Central Bank of Syria").replace(/Capital Market Authority \(CMA\)|CMA/g, "Insurance Supervisory Authority").replace(/Vision 2030/g, "Syrian banking reform"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/SAMA/g, "Central Bank of Syria").replace(/KSA/g, "Syria") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/SAMA/g, "Central Bank of Syria"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/SAMA/g, "Central Bank of Syria").replace(/Capital Market Authority/g, "Ministry of Economy and Foreign Trade"),
        })),
      }])
    ) as typeof en.bankingFinanceDetail.services,
  },

intellectualPropertyDetail: {
    ...en.intellectualPropertyDetail,
    parentTitle: "Intellectual Property — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Intellectual Property — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    sidebar: {
      heading: "Need an IP Lawyer in Syria?",
      desc: "Get expert intellectual property advice online — trademark registration, patent protection, copyright, and IP disputes under Syrian law. Response within 24 hours.",
      ctaBtn: "Start a Consultation",
      whatsapp: "WhatsApp",
      email: "Email",
      callLabel: "Or call us directly at:",
      phone: "+963 11 XXX XXXX",
    },
    services: Object.fromEntries(
      Object.entries(en.intellectualPropertyDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria").replace(/— SAIP/g, "— Syrian IP Office").replace(/\bSAIP\b/g, "Syrian IP Office"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/SAIP/g, "Ministry of Economy (IP Department)"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/SAIP|Saudi Authority for Intellectual Property/g, "Ministry of Economy (IP Department)").replace(/Vision 2030/g, "Syrian IP reform")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/SAIP|Saudi Authority for Intellectual Property/g, "Ministry of Economy and Foreign Trade (IP Department)").replace(/Vision 2030/g, "Syrian IP reform"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/SAIP/g, "Syrian IP Authority").replace(/KSA/g, "Syria") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/SAIP/g, "Syria IP Authority"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/SAIP|Saudi Authority for Intellectual Property/g, "Ministry of Economy and Foreign Trade (IP Department)"),
        })),
      }])
    ) as typeof en.intellectualPropertyDetail.services,
  },

taxZakatDetail: {
    ...en.taxZakatDetail,
    parentTitle: "Tax Law — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Tax Law — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    notFoundLink: "Return to Tax Law",
    relatedHeading: "Other Tax Services",
    sidebar: {
      heading: "Need a Tax Lawyer in Syria?",
      desc: "Get expert Syrian tax law advice — income tax disputes, General Tax Authority objections, and corporate tax advisory. Online consultation available.",
      ctaBtn: "Start a Consultation",
      whatsapp: "WhatsApp",
      email: "Email",
      callLabel: "Or call us directly at:",
      phone: "+963 11 XXX XXXX",
    },
    subAreas: [
      { id: "vat-compliance", label: "VAT & Income Tax Compliance" },
      { id: "zatca-appeals", label: "Tax Authority Appeals" },
      { id: "corporate-tax", label: "Corporate Income Tax" },
      { id: "transfer-pricing", label: "Transfer Pricing" },
      { id: "customs-disputes", label: "Customs Duties Disputes" },
      { id: "tax-advisory", label: "Tax Advisory & Structuring" },
      { id: "excise-tax", label: "Tax Compliance" },
    ],
    services: Object.fromEntries(
      Object.entries(en.taxZakatDetail.services).filter(([id]) => id !== 'zakat-disputes').map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria").replace(/ZATCA/g, "General Tax Authority").replace(/Zakat.*?Objections/g, "Income Tax Disputes").replace(/Zakat/g, "Tax"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/ZATCA/g, "General Tax Authority").replace(/[Zz]akat/g, "tax"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/ZATCA/g, "General Tax Authority").replace(/[Zz]akat/g, "tax").replace(/Tax Dispute Resolution Committee/g, "Syrian Tax Tribunal")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/ZATCA|Zakat, Tax and Customs Authority/g, "General Tax Authority (هيئة الضرائب والرسوم)").replace(/zakat/gi, "income tax").replace(/Vision 2030/g, "Syrian tax modernisation"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/ZATCA/g, "General Tax Authority").replace(/KSA/g, "Syria") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/ZATCA/g, "General Tax Authority"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/ZATCA/g, "General Tax Authority").replace(/zakat/gi, "tax"),
        })),
      }])
    ) as typeof en.taxZakatDetail.services,
  },

cyberLawDetail: {
    ...en.cyberLawDetail,
    parentTitle: "Cyber & IT Law — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Cyber & IT Law — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    sidebar: {
      heading: "Need a Cybercrime Lawyer?",
      desc: "Get urgent cybercrime law advice in Syria — online via WhatsApp or email under the Syrian Cybercrime Law (Law 20/2022 and applicable amendments). Confidential, rapid response for digital legal emergencies.",
      ctaBtn: "Start a Consultation",
      whatsapp: "WhatsApp",
      email: "Email",
      callLabel: "Or call us directly at:",
      phone: "+963 11 XXX XXXX",
    },
    services: Object.fromEntries(
      Object.entries(en.cyberLawDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/Anti-Cybercrime Law \(M\/17\)/g, "Syrian Cybercrime Law (Law 20/2022 and applicable amendments)").replace(/PDPL/g, "Syrian data protection law"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/Anti-Cybercrime Law/g, "Syrian Cybercrime Law").replace(/PDPL/g, "Syrian data protection law").replace(/CITC/g, "Syrian authorities")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Anti-Cybercrime Law \(Royal Decree M\/17\)/g, "Syrian Cybercrime Law (Law No. 20/2022 and applicable amendments)").replace(/PDPL|Personal Data Protection Law/g, "Syrian data protection law").replace(/CITC/g, "Syrian cybercrime authorities"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/CITC/g, "Syrian authorities").replace(/KSA/g, "Syria") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Anti-Cybercrime Law/g, "Syrian Cybercrime Law"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Anti-Cybercrime Law/g, "Syrian Cybercrime Law (Law No. 20/2022 and applicable amendments)").replace(/CITC/g, "Syrian cybercrime authorities"),
        })),
      }])
    ) as typeof en.cyberLawDetail.services,
  },

medicalMalpracticeDetail: {
    ...en.medicalMalpracticeDetail,
    breadcrumb: { home: "Home", services: "Services", parent: "Medical Malpractice — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    sidebar: {
      heading: "Need a Medical Malpractice Lawyer?",
      desc: "Get expert advice on medical negligence and healthcare law in Syria — online via WhatsApp or email. Confidential consultation under Syrian Medical Association regulations. Response within 24 hours.",
      ctaBtn: "Start a Consultation",
      whatsapp: "WhatsApp",
      email: "Email",
      callLabel: "Or call us directly at:",
      phone: "+963 11 XXX XXXX",
    },
    services: Object.fromEntries(
      Object.entries(en.medicalMalpracticeDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/Board of Grievances/g, "Syrian civil courts").replace(/MOH and CCHI/g, "Syrian Ministry of Health")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Board of Grievances/g, "Syrian civil courts").replace(/MOH and CCHI/g, "Syrian Ministry of Health").replace(/Healthcare Law|Saudi Medical Practitioners Disciplinary Regulations/g, "Syrian Medical Association regulations"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Board of Grievances/g, "Syrian civil courts").replace(/MOH/g, "Syrian Ministry of Health"),
        })),
      }])
    ) as typeof en.medicalMalpracticeDetail.services,
  },

insuranceLawDetail: {
    ...en.insuranceLawDetail,
    breadcrumb: { home: "Home", services: "Services", parent: "Insurance Law — Syria" },
    experienceBadge: "Experienced legal team · Advice, drafting and document review · Online",
    sidebar: {
      heading: "Need an Insurance Dispute Lawyer?",
      desc: "Get expert advice on insurance claim disputes in Syria under Insurance Law No. 68/2001 — online via WhatsApp or email. Response within 24 hours.",
      ctaBtn: "Start a Consultation",
      whatsapp: "WhatsApp",
      email: "Email",
      callLabel: "Or call us directly at:",
      phone: "+963 11 XXX XXXX",
    },
    services: Object.fromEntries(
      Object.entries(en.insuranceLawDetail.services).map(([id, svc]) => [id, {
        ...svc,
        seoTitle: svc.seoTitle.replace(/Saudi Arabia/g, "Syria").replace(/SAMA\/CCHI/g, "Insurance Supervisory Authority").replace(/\bSAMA\b/g, "Insurance Supervisory Authority"),
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/SAMA/g, "Insurance Supervisory Authority"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/SAMA/g, "Insurance Supervisory Authority").replace(/CCHI/g, "Syrian Insurance Authority")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Saudi Central Bank \(SAMA\)|SAMA/g, "Insurance Supervisory Authority (هيئة الإشراف على التأمين)").replace(/Insurance Law \(Royal Decree M\/32\)/g, "Syrian Insurance Law No. 68/2001"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/SAMA/g, "Insurance Supervisory Authority").replace(/KSA/g, "Syria") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/SAMA/g, "Insurance Supervisory Authority"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/SAMA/g, "Insurance Supervisory Authority").replace(/Insurance Law \(Royal Decree M\/32\)/g, "Syrian Insurance Law No. 68/2001"),
        })),
      }])
    ) as typeof en.insuranceLawDetail.services,
  }
};
