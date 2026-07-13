import { en } from "./en";

export const enSyr: typeof en = {
  ...en,

  footer: {
    ...en.footer,
    practiceAreaLinks: [
      { label: "Family Law", href: "/services/family-law" },
      { label: "Commercial Law", href: "/services/business-law" },
      { label: "Property Law", href: "/services/real-estate" },
      { label: "Employment Law", href: "/services/employment-law" },
      { label: "Foreign Investment Law", href: "/services/foreign-investment" },
      { label: "Administrative Law", href: "/services/administrative-law" },
      { label: "Arbitration & Mediation", href: "/services/arbitration" },
      { label: "Enforcement & Debt Collection", href: "/services/enforcement" },
      { label: "Companies Law", href: "/services/companies-law" },
      { label: "Contracts", href: "/services/contracts" },
      { label: "Criminal Law", href: "/services/criminal-law" },
      { label: "Banking & Finance Law", href: "/services/banking-finance" },
      { label: "Intellectual Property", href: "/services/intellectual-property" },
      { label: "Tax Law", href: "/services/tax-zakat" },
      { label: "Cyber & IT Law", href: "/services/cyber-law" },
      { label: "Medical Malpractice", href: "/services/medical-malpractice" },
      { label: "Insurance Law", href: "/services/insurance-law" },
      { label: "Civil Law", href: "/services/civil-law" },
      { label: "Civil Procedure", href: "/services/civil-procedure" },
      { label: "Criminal Procedure", href: "/services/criminal-procedure" },
    ],
    tagline: "Fast, reliable online legal consultations for individuals, businesses and investors across Syria. Professional legal response within 24 hours — in Arabic or English.",
    address: "Hama, Syria",
  },

  home: {
    ...en.home,
    hero: {
      ...en.home.hero,
      badge: "Syria's Specialized Online Legal Consultation Platform · CounselO",
      h1a: "Online Legal Consultation",
      h1b: "for Syria — Fast & Reliable.",
      desc: "CounselO is an online legal consultation platform serving Syria — delivering expert legal guidance for individuals, businesses and investors across all major areas of Syrian law",
      subDesc: "No office visit required. Consult via WhatsApp or email from anywhere in Syria — with a target professional response time of 24 hours. 30+ years regional experience, 20,000+ cases and consultations.",
    },
    platform: {
      ...en.home.platform,
      subheading: "CounselO is a fully digital legal platform serving Syria. Expert legal guidance covering Syrian law — instantly, securely, and professionally.",
      advantages: [
        { icon: "wifi", title: "Fully Online — Anywhere in Syria", desc: "Consult from Damascus, Aleppo, Homs, Lattakia or anywhere in Syria — no office visit, no commute, no waiting room." },
        { icon: "clock", title: "Target Response Within 24 Hours", desc: "Submit your legal matter for a structured professional response. CounselO targets a response within 24 hours, subject to the matter's scope and urgency." },
        { icon: "lock", title: "Secure & Confidential", desc: "All consultations are handled with strict professional confidentiality. Your legal matters stay private." },
        { icon: "globe", title: "Arabic & English", desc: "Fully bilingual platform. Legal advice in the language you think and work in — no barriers." },
      ],
    },
    about: {
      ...en.home.about,
      p1: "CounselO was founded by Lawyer and Legal Counsel Omar Al-Baghdadi — one of the region's most established senior advocates, with over 30 years of active legal practice and more than 20,000 cases and consultations handled across Syria and the region. His career spans every major area of law — from commercial litigation and arbitration to family law, real estate, employment, foreign investment and administrative proceedings.",
      founderTeamLine: "Leading a professional legal team across Syria & the region",
    },
    consultMethods: {
      ...en.home.consultMethods,
      eyebrow: "Available Online — Across Syria",
    },
    whoWeServe: {
      ...en.home.whoWeServe,
      subheading: "CounselO serves all client types across Syria — from individuals navigating personal legal matters to corporations handling complex commercial disputes.",
      clients: [
        { title: "Individuals", desc: "Personal legal matters including family law, real estate, employment disputes and debt recovery under Syrian law." },
        { title: "Businesses", desc: "Commercial contracts, corporate disputes, company formation and regulatory compliance in Syria." },
        { title: "Foreign Investors", desc: "Legal representation for investors entering the Syrian market — licensing under Investment Law No. 18/2021, compliance and dispute resolution." },
        { title: "Diaspora Clients", desc: "Legal guidance for Syrians abroad — property matters, inheritance, family law, and repatriation legal needs." },
      ],
    },
    practiceAreas: {
      ...en.home.practiceAreas,
      heading: "Core Practice Areas in Syria",
      subheading: "30+ years of legal practice across Syria and the region — comprehensive legal representation across all major areas of Syrian law.",
      areas: [
        { title: "Commercial Law & Litigation", desc: "Contract disputes, shareholder conflicts, corporate governance, and commercial agency disputes before Syrian commercial courts.", path: "/services/business-law" },
        { title: "Arbitration & Dispute Resolution", desc: "Commercial arbitration under Syrian Arbitration Law No. 4/2008, enforcement of arbitral awards, Damascus Chamber arbitration, and investment dispute resolution.", path: "/services/arbitration" },
        { title: "Real Estate & Property Law", desc: "Property ownership disputes, Syrian Real Estate Register issues, contractor conflicts, landlord-tenant disputes, and real estate enforcement.", path: "/services/real-estate" },
        { title: "Enforcement & Debt Collection", desc: "Court judgment enforcement, asset attachment, commercial debt recovery, and garnishment under Syrian civil procedure.", path: "/services/enforcement" },
        { title: "Administrative & Government Disputes", desc: "State Council (مجلس الدولة) cases, appeals against administrative decisions, government contract disputes, and regulatory challenges.", path: "/services/administrative-law" },
        { title: "Foreign Investment & Business Law", desc: "Legal support for foreign investors — Syrian Investment Commission licensing, company formation under Syrian Companies Law, and investor dispute resolution.", path: "/services/foreign-investment" },
      ],
    },
    testimonials: {
      ...en.home.testimonials,
      heading: "Trusted Across Syria",
      items: [
        { quote: "A client refused to pay the final installment on a signed supply contract, claiming a technicality. CounselO reviewed the contract, drafted the claim, and we recovered the full amount within weeks.", author: "Ahmad S.", title: "Business Owner — Damascus, Syria" },
        { quote: "I was evaluating whether to invest in Syria and had no idea where to start with the licensing rules. CounselO broke down the Investment Commission process for me in plain terms, in both Arabic and English.", author: "K. Al-Habbal", title: "Foreign Investor — Syria" },
        { quote: "A property I'd owned for years turned out to have a conflicting registration at the Real Estate Register. CounselO traced the issue back to a clerical error decades old and got it corrected.", author: "Rima T.", title: "Individual Client — Aleppo, Syria" },
        { quote: "I was dismissed without the notice period Syrian Labour Law requires. CounselO took my case to the labour court and I walked away with my full end-of-service indemnity.", author: "Faris M.", title: "Employee — Homs, Syria" },
        { quote: "My divorce under Personal Status Law dragged on for months with my previous lawyer. CounselO took over, moved things along, and kept me updated over WhatsApp the whole way through.", author: "Lina H.", title: "Individual Client — Lattakia, Syria" },
        { quote: "Our family had properties in three different cities and no one could agree on the division after our father passed. CounselO worked out each heir's share and represented us in front of the Personal Status Court until it was resolved.", author: "Samer A.", title: "Family Estate Client — Damascus, Syria" },
        { quote: "I'd tried registering a company on my own and got stuck twice. CounselO handled the Companies Law paperwork and Investment Commission registration from start to finish, entirely online.", author: "Nidal R.", title: "Business Owner — Syria" },
        { quote: "The State Council initially sided against us on an administrative decision that threatened to close part of our operations. CounselO appealed, argued the case, and had the decision reversed.", author: "Dina K.", title: "Business Owner — Damascus, Syria" },
      ],
    },
    cta: {
      ...en.home.cta,
      eyebrow: "Syria's Specialized Online Legal Consultation Platform",
      desc: "Expert online legal consultations for individuals, businesses and investors across Syria — via WhatsApp or email, no office visit required. 20 practice areas. 30+ years regional experience.",
      subDesc: "Founded by Lawyer and Legal Counsel Omar Al-Baghdadi · Hama, Syria · WhatsApp or email · Arabic & English",
    },
    cooperation: {
      ...en.home.cooperation,
      desc: "CounselO handles the vast majority of legal matters entirely online — consultations, document review, and legal opinions, with no need to visit an office. When a case requires court representation, appearances before competent authorities, or document notarization, CounselO works through Al-Baghdadi Law Firm to handle the in-person proceedings on your behalf.",
      officeName: "Al-Baghdadi Law Firm",
      officeDetail: "Licensed in Syria — serving clients across all of Syria",
    },
  },

  services: {
    ...en.services,
    hero: {
      heading: "20 Legal Practice Areas",
      desc: "Syria's specialized online legal consultation platform — 20 specialist practice areas covering family law, commercial law, employment, real estate, foreign investment, criminal law, banking, tax, cyber law, medical malpractice, insurance, arbitration, enforcement, companies law, contracts, IP, administrative law, civil law, civil procedure, and criminal procedure. Professional response within 24 hours. No office visit needed.",
    },
    items: [
      { id: "family-law", title: "Family Law", longDesc: "When your personal life intersects with Syrian law — divorce, custody, inheritance — the stakes couldn't be higher. We handle complex personal status matters under Syrian Personal Status Law No. 59/1953 with absolute discretion before Syrian Personal Status Courts." },
      { id: "business-law", title: "Commercial Law", longDesc: "From company formation to commercial disputes before Syrian courts. We protect your business interests under the Syrian Commercial Code through meticulous contract drafting, strategic negotiation, and Damascus Chamber representation." },
      { id: "real-estate", title: "Property Law", longDesc: "Whether registering a title in the Syrian Real Estate Register or resolving a complex ownership dispute, we ensure your property rights under Syrian law are protected — with expertise in the Real Estate Directorate's procedures." },
      { id: "employment-law", title: "Employment Law", longDesc: "Protecting your livelihood under Syrian Labour Law No. 17/2010. We represent employees and employers before Syrian Labour Courts — wrongful termination, end-of-service indemnity, and workplace dispute resolution." },
      { id: "foreign-investment", title: "Foreign Investment & Business Law", longDesc: "Expert guidance for foreign investors entering Syria — from Syrian Investment Commission licensing under Investment Law No. 18/2021 to company formation and investment disputes." },
      { id: "administrative-law", title: "Administrative Law", longDesc: "Specialist representation before Syria's State Council (مجلس الدولة), administrative tribunals, and government authorities — challenging unlawful administrative decisions and government contract disputes." },
      { id: "arbitration", title: "Arbitration & Mediation", longDesc: "Expert representation in domestic and international arbitration under Syrian Arbitration Law No. 4/2008, mediation, and enforcement of arbitral awards before Syrian and international tribunals." },
      { id: "enforcement", title: "Enforcement & Debt Collection", longDesc: "Specialist enforcement lawyers enforcing court judgments, collecting commercial debts, and applying for asset attachment under Syrian civil procedure law." },
      { id: "companies-law", title: "Companies Law", longDesc: "Specialist legal representation for all company disputes under Syrian Companies Law No. 29/2011 — from formation disputes and shareholder conflicts to director liability, dissolution, and family company matters." },
      { id: "contracts", title: "Contracts", longDesc: "Expert contract lawyers in Syria — drafting, review, dispute resolution and enforcement under the Syrian Civil Code No. 84/1949 across all contract types including commercial, real estate, employment, and government contracts." },
      { id: "criminal-law", title: "Criminal Law", longDesc: "Expert criminal defense lawyers representing individuals and businesses in all criminal proceedings before Syrian courts — from investigation and detention through trial, appeal before the Court of Cassation, and post-judgment matters." },
      { id: "banking-finance", title: "Banking & Finance Law", longDesc: "Specialist banking lawyers in Syria — advising on finance contracts under Syrian law, banking disputes, Central Bank of Syria regulatory compliance, Islamic banking under Law No. 35/2005, and financial fraud defense." },
      { id: "intellectual-property", title: "Intellectual Property", longDesc: "Expert IP lawyers in Syria — trademark registration, patent protection, copyright disputes, brand protection, and IP enforcement under Syrian Industrial Property Protection Law No. 8/2007." },
      { id: "tax-zakat", title: "Tax Law", longDesc: "Specialist tax lawyers in Syria — income tax, VAT, Syrian tax authority disputes, General Tax Authority (هيئة الضرائب والرسوم) objections and appeals, customs duties, and tax advisory for businesses and investors." },
      { id: "cyber-law", title: "Cyber & IT Law", longDesc: "Expert cybercrime lawyers in Syria — defense under Syrian Cybercrime Law (Legislative Decree No. 17/2012), data protection, online fraud cases, hacking defense, and IT contract disputes." },
      { id: "medical-malpractice", title: "Medical Malpractice & Healthcare Law", longDesc: "Expert medical malpractice lawyers in Syria — negligence claims, surgical errors, and misdiagnosis under Syrian civil liability law, with representation before Syrian civil courts." },
      { id: "insurance-law", title: "Insurance Law", longDesc: "Specialist insurance dispute lawyers in Syria — health, property, motor, life, and commercial insurance claim disputes, wrongful rejections, and insurance litigation before Syrian courts." },
      { id: "civil-law", title: "Civil Law", longDesc: "Expert legal advice on Syrian Civil Code No. 84/1949 — civil liability, real rights, obligations, inheritance, wills, neighbor disputes, and legal capacity." },
      { id: "civil-procedure", title: "Civil Procedure", longDesc: "Expert guidance on Syrian civil court proceedings under Legislative Decree No. 84/1953 — filing claims, interim measures, evidence, civil appeal, cassation, and foreign judgment enforcement in Syria." },
      { id: "criminal-procedure", title: "Criminal Procedure", longDesc: "Expert criminal defense under Syrian Criminal Procedure Code (Legislative Decree No. 112/1950) — investigation, detention, bail, trial defense, criminal appeal, cassation, and civil action in criminal proceedings." },
    ],
  },

  serviceDetail: {
    ...en.serviceDetail,
    services: {
      "family-law": {
        title: "Family Law",
        subtitle: "Protecting what matters most under Syrian Personal Status Law.",
        overview: "Family law in Syria is governed by the Syrian Personal Status Law (Law No. 59 of 1953, as amended) and Islamic Sharia principles, applied by Personal Status Courts (محاكم الأحوال الشخصية). At CounselO, we understand that family disputes are among the most sensitive legal matters our clients face. We provide strategic, clear-headed counsel rooted in Syrian family law — protecting your assets, your relationship with your children, and your future.",
        covers: ["Divorce Proceedings (Talaq & Khul')", "Child Custody Disputes (Syrian Personal Status Courts)", "Alimony & Nafaqa Claims", "Inheritance Division (Syrian Sharia Courts)", "Prenuptial & Marriage Contract Disputes"],
        process: [
          { title: "Initial Consultation", desc: "A confidential review of your situation under Syrian Personal Status Law — identifying your rights and the strongest legal position." },
          { title: "Documentation & Evidence", desc: "Gathering marriage contracts, civil registry records, financial evidence, and witness statements required for Syrian courts." },
          { title: "Negotiation & Mediation", desc: "Attempting resolution before Personal Status Court proceedings — often the fastest route for mutual agreement." },
          { title: "Court Representation", desc: "Full representation before Syrian Personal Status Courts — through first instance, appeal, and Court of Cassation if required." },
        ],
      },
      "business-law": {
        title: "Commercial Law",
        subtitle: "Strategic legal representation under the Syrian Commercial Code.",
        overview: "Syria's commercial law — codified in the Syrian Commercial Code (Legislative Decree No. 149 of 1949) and administered by Commercial Courts in Damascus, Aleppo, Homs, and Lattakia — governs all commercial relationships and disputes in the country. At CounselO, our commercial law practice covers the full range of Syrian commercial matters: contract disputes, company conflicts, banking disputes, commercial agency, and litigation before Syrian commercial courts. With 30+ years of regional legal experience and 20,000+ cases and consultations handled, CounselO delivers decisive results for businesses operating in Syria.",
        covers: ["Commercial Contract Disputes", "Shareholder & Partner Conflicts", "Company Formation under Syrian Law", "Commercial Agency Disputes", "Corporate Governance & Compliance"],
        process: [
          { title: "Commercial Assessment", desc: "We analyse your dispute or transaction under Syrian commercial law — identifying your strongest legal position and the most effective forum." },
          { title: "Pre-Litigation Demand", desc: "We send formal legal demands and engage in structured negotiation — the fastest route to resolution in commercial disputes." },
          { title: "Court Filing", desc: "We file and manage proceedings before Syrian Commercial Courts in Damascus, Aleppo, or the competent jurisdiction." },
          { title: "Judgment & Enforcement", desc: "We pursue full enforcement of favorable judgments under Syrian civil procedure law." },
        ],
      },
      "real-estate": {
        title: "Property Law",
        subtitle: "Securing and protecting property rights in the Syrian Real Estate Register.",
        overview: "Syrian real estate law — governed by the Ottoman Land Code as amended by Syrian legislation and administered through the Syrian Real Estate Register (السجل العقاري) and its Directorates — creates specific procedural requirements for all property transactions and disputes. At CounselO, we bring deep expertise in Syrian property law: from title registration and ownership disputes to contractor conflicts, landlord-tenant matters, and Real Estate Directorate proceedings. Expert advice via WhatsApp or email — professional response within 24 hours.",
        covers: ["Title Registration & Ownership Disputes (Syrian Real Estate Register)", "Landlord-Tenant Disputes", "Construction Contractor Disputes", "Pre-emption Rights (حق الشفعة) under Syrian Civil Code", "Property Transfer & Registration Procedures"],
        process: [
          { title: "Property Due Diligence", desc: "We verify title through the Real Estate Directorate, check for encumbrances and adverse registrations, and assess ownership legitimacy." },
          { title: "Documentation & Drafting", desc: "We draft and review sale contracts, lease agreements, and all property documentation for Syrian legal compliance." },
          { title: "Dispute Strategy", desc: "We develop a clear litigation strategy for Syrian property disputes — filing before the competent civil court." },
          { title: "Registration & Enforcement", desc: "We manage all Real Estate Directorate registration steps and enforce judgments restoring lawful ownership." },
        ],
      },
      "employment-law": {
        title: "Employment Law",
        subtitle: "Protecting employees and employers under Syrian Labour Law No. 17/2010.",
        overview: "Syrian Labour Law No. 17 of 2010 governs all employment relationships in Syria — setting minimum standards for wages, working hours, termination procedures, and end-of-service indemnity. The Social Insurance Authority (هيئة التأمينات الاجتماعية) administers social security, and Labour Courts (محاكم العمل) resolve employment disputes. At CounselO, we represent both employees and employers across all Syrian employment law matters — from wrongful termination claims to social insurance disputes and workplace discrimination. Online consultation via WhatsApp or email — response within 24 hours.",
        covers: ["Wrongful Termination Claims", "End-of-Service Indemnity Disputes", "Syrian Labour Court Representation", "Social Insurance Authority Disputes", "Workplace Discrimination & Harassment Claims"],
        process: [
          { title: "Employment Assessment", desc: "We review your employment contract, termination circumstances, and entitlements under Syrian Labour Law No. 17/2010." },
          { title: "Evidence Gathering", desc: "Securing employment contracts, payslips, correspondence, and witness evidence required for Labour Court proceedings." },
          { title: "Negotiation", desc: "We negotiate with the employer for settlement — often faster and more efficient than Labour Court proceedings." },
          { title: "Labour Court Litigation", desc: "We represent you before Syrian Labour Courts — pursuing your full statutory entitlements under Syrian labour law." },
        ],
      },
      "foreign-investment": {
        title: "Foreign Investment & Business Law",
        subtitle: "Guiding foreign investors through Syria's investment legal framework under Investment Law No. 18/2021.",
        overview: "Syria's Investment Law No. 18 of 2021 replaced the earlier Investment Law No. 10 of 1991, establishing a new framework for foreign investment administered by the Syrian Investment Commission (هيئة الاستثمار السورية). Foreign investors in Syria must navigate sector restrictions, registration requirements, and an evolving regulatory environment. CounselO has advised investors entering the Syrian market for over 30 years, covering every stage from initial licensing through investment disputes, partner conflicts, and regulatory challenges. Our online consultation means specialist advice is available via WhatsApp or email within 24 hours.",
        covers: ["Syrian Investment Commission Licensing", "Foreign Company Formation (Syrian Companies Law No. 29/2011)", "Investment Disputes & Appeals", "Free Zone Entity Registration", "Joint Venture Agreements & Disputes"],
        process: [
          { title: "Investment Structure Assessment", desc: "Advising on the optimal legal structure for your Syria market entry — branch, subsidiary, or joint venture under Syrian law." },
          { title: "Investment Commission Registration", desc: "Managing the complete Syrian Investment Commission application and company registration process." },
          { title: "Compliance & Operations", desc: "Ongoing legal support for regulatory compliance, contract review, and operational legal matters in Syria." },
          { title: "Dispute Resolution", desc: "Representing investors in disputes with Syrian authorities, local partners, and counterparties — before courts, State Council, and arbitration panels." },
        ],
      },
      "administrative-law": {
        title: "Administrative Law",
        subtitle: "Challenging unlawful government decisions before Syria's State Council and administrative courts.",
        overview: "Administrative law in Syria is administered by the State Council (مجلس الدولة) — Syria's dedicated administrative court system — comprising the Administrative Court of First Instance and the Supreme Administrative Court (High Administrative Court). When a Syrian government authority makes a decision that affects your rights — refusing a license, cancelling a contract, imposing a penalty, or taking an unlawful administrative action — CounselO has the specialist expertise to challenge it before the State Council. With over 30 years of experience in Syrian and regional administrative law, we provide decisive representation for individuals and businesses facing government authority.",
        covers: ["State Council (مجلس الدولة) Litigation", "Administrative Decision Appeals", "Government Contract Disputes", "Regulatory & Licensing Challenges", "Public Procurement Disputes", "Customs & Tax Authority Disputes"],
        process: [
          { title: "Administrative Decision Review", desc: "Analysing the challenged decision for legal errors, procedural irregularities, and grounds for challenge before the State Council." },
          { title: "Urgent Deadline Management", desc: "Administrative appeal deadlines in Syria are strict — we act immediately to preserve your right to challenge the decision." },
          { title: "State Council Proceedings", desc: "Filing and managing your case before the Syrian State Council — with full legal submissions and representation at all hearings." },
          { title: "Enforcement & Remedy", desc: "Pursuing the full available remedy — annulment of the decision, reinstatement, compensation, or injunctive relief." },
        ],
      },
      "arbitration": {
        title: "Arbitration & Mediation",
        subtitle: "Expert representation in commercial arbitration and dispute resolution under Syrian Arbitration Law No. 4/2008.",
        overview: "Syria's Arbitration Law No. 4 of 2008 provides a modern framework for commercial arbitration, and Syria ratified the New York Convention on Recognition and Enforcement of Foreign Arbitral Awards in 1959. The Damascus Chamber of Commerce operates an arbitration center for domestic commercial disputes. CounselO provides expert representation across all aspects of arbitration and dispute resolution in Syria: domestic commercial arbitration, international arbitration, mediation, award enforcement, and cross-border disputes. Online consultation available via WhatsApp or email within 24 hours.",
        covers: ["Commercial Arbitration (Damascus Chamber of Commerce)", "International Arbitration (ICC, UNCITRAL)", "Syrian Arbitration Law No. 4/2008 Proceedings", "Arbitral Award Enforcement", "Mediation & Alternative Dispute Resolution"],
        process: en.serviceDetail.services["arbitration"].process,
      },
      "enforcement": {
        title: "Enforcement & Debt Collection",
        subtitle: "Specialist enforcement lawyers enforcing court judgments and collecting commercial debts under Syrian civil procedure.",
        overview: "Enforcing a Syrian court judgment or arbitral award requires specialist knowledge of the Syrian Code of Civil Procedure and the procedural requirements of the competent enforcement court. At CounselO, we bring over 30 years of regional enforcement experience — converting favorable judgments into real recovery through asset attachment, bank account garnishment, real estate enforcement, and all available enforcement tools under Syrian law. Online consultation via WhatsApp or email within 24 hours.",
        covers: en.serviceDetail.services["enforcement"].covers,
        process: en.serviceDetail.services["enforcement"].process,
      },
      "contracts": {
        title: "Contracts",
        subtitle: "Expert contract lawyers for drafting, disputes, and enforcement under the Syrian Civil Code.",
        overview: "Syria's contract law is primarily governed by the Syrian Civil Code (Legislative Decree No. 84 of 1949) — a comprehensive code based on French civil law tradition and Egyptian civil law — supplemented by the Syrian Commercial Code for commercial contracts. At CounselO, our contracts practice covers the full lifecycle: from drafting and negotiation through to dispute resolution, specific performance, and enforcement before Syrian courts. With 30+ years of regional legal experience and over 20,000 cases and consultations, CounselO's contracts team provides decisive guidance for individuals and businesses across Syria.",
        covers: ["Commercial Contract Drafting & Review", "Contract Disputes & Breach of Contract Claims (Syrian Civil Code Art. 148+)", "Government & Public Procurement Contracts", "Real Estate Contracts", "Employment & Labour Contracts", "Partnership & Joint Venture Agreements", "International & Cross-Border Contracts"],
        process: en.serviceDetail.services["contracts"].process,
      },
      "companies-law": {
        title: "Companies Law & Corporate Disputes",
        subtitle: "Specialist legal representation under Syrian Companies Law No. 29/2011.",
        overview: "Syrian Companies Law No. 29 of 2011 governs all aspects of corporate life in Syria — from formation and governance through capital structure, dissolution, and liability. Companies are registered with the Ministry of Economy and Foreign Trade and the Commercial Register. CounselO's companies law practice covers the full spectrum of corporate disputes and corporate needs under Syrian law — providing decisive representation for shareholders, partners, directors, and companies. Online specialist advice via WhatsApp or email within 24 hours.",
        covers: ["Partner & Shareholder Disputes", "Director Liability", "Company Formation & Dissolution under Syrian Law", "Capital Disputes", "Shareholder Agreement Disputes", "Family Company Conflicts"],
        process: en.serviceDetail.services["companies-law"].process,
      },
      "criminal-law": {
        title: "Criminal Law",
        subtitle: "Expert criminal defense lawyers representing individuals and businesses before Syrian courts — from investigation through the Court of Cassation.",
        overview: "Syria's criminal justice system is governed by the Syrian Penal Code (Legislative Decree No. 148 of 1949) and the Code of Criminal Procedure (Legislative Decree No. 112 of 1950). Criminal proceedings in Syria move through the Public Prosecution (النيابة العامة) to trial courts — the Court of First Instance for felonies and misdemeanors, the Court of Appeal, and the Court of Cassation (محكمة النقض) for final appeals. At CounselO, our criminal defense practice covers the full spectrum: from investigation-stage representation and bail applications through criminal trials and Court of Cassation appeals. With 30+ years of regional criminal law experience, we provide decisive, urgent defense.",
        covers: ["Criminal Defense in Syrian Courts", "Bail & Pre-trial Detention", "Criminal Appeals (Court of Appeal & Court of Cassation)", "Financial Crimes & Commercial Fraud Defense", "Cybercrime Defense (Legislative Decree No. 17/2012)", "Drug Offense Cases", "Criminal Investigation Representation"],
        process: en.serviceDetail.services["criminal-law"].process,
      },
      "banking-finance": {
        title: "Banking & Finance Law",
        subtitle: "Specialist banking and finance lawyers advising on Syrian banking law, Central Bank of Syria regulations, and finance contract disputes.",
        overview: "Syria's banking sector is regulated by the Central Bank of Syria (مصرف سوريا المركزي) under the Banking Law (Decree No. 28 of 2001). The sector comprises state-owned banks, private commercial banks, and Islamic banks operating under Law No. 35 of 2005. At CounselO, our banking and finance practice covers every aspect of Syrian financial law: from finance contract structuring and banking dispute resolution to regulatory compliance, Islamic banking, and financial fraud defense. We advise financial institutions, corporations, and individuals on all banking and finance legal matters in Syria.",
        covers: ["Banking Dispute Resolution", "Finance Contract Drafting & Review", "Central Bank of Syria Regulatory Compliance", "Islamic Banking Disputes (Law No. 35/2005)", "Loan & Guarantee Agreement Disputes", "Banking Fraud Defense & Recovery"],
        process: en.serviceDetail.services["banking-finance"].process,
      },
      "intellectual-property": {
        title: "Intellectual Property",
        subtitle: "Expert IP lawyers protecting your trademarks, patents, and copyrights under Syrian intellectual property law.",
        overview: "Syria's intellectual property framework is governed by the Industrial Property Protection Law No. 8 of 2007 (trademarks, patents, industrial designs) and the Copyright Law No. 12 of 2001. The Ministry of Economy and Foreign Trade administers IP registration. Syria is a member of WIPO and party to major international IP conventions. At CounselO, our IP practice covers the full spectrum: from trademark registration and patent protection through to copyright disputes, trade secret protection, and IP litigation before Syrian courts.",
        covers: ["Trademark Registration & Protection", "Patent Filing & Protection", "Copyright Registration & Disputes (Law No. 12/2001)", "Trade Secret Protection", "IP Licensing Agreements", "Brand Protection & Anti-Counterfeiting"],
        process: en.serviceDetail.services["intellectual-property"].process,
      },
      "tax-zakat": {
        title: "Tax Law",
        subtitle: "Specialist tax lawyers advising on Syrian income tax, VAT, and General Tax Authority disputes.",
        overview: "Syria's tax system is administered by the General Tax Authority (هيئة الضرائب والرسوم) and includes income tax on individuals and corporations, value added tax, stamp duties, and customs duties administered by the General Customs Directorate. Tax disputes in Syria are resolved through the Tax Authority's internal objection procedures and, on appeal, before Syrian administrative courts. At CounselO, our tax practice covers every aspect of Syrian tax law — compliance, objections, appeals, and advisory for businesses and investors.",
        covers: ["Income Tax Compliance & Disputes", "VAT Issues & Disputes", "General Tax Authority Objections & Appeals", "Corporate Tax Advisory & Structuring", "Customs Duties & Tariff Disputes", "Tax Assessment Challenges"],
        process: en.serviceDetail.services["tax-zakat"].process,
      },
      "cyber-law": {
        title: "Cyber & IT Law",
        subtitle: "Expert cybercrime lawyers defending individuals and businesses under Syrian Cybercrime Law Legislative Decree No. 17/2012.",
        overview: "Syria's cybercrime framework is primarily governed by Legislative Decree No. 17 of 2012 on Cybercrime, which establishes criminal offenses and penalties for unauthorized access, online fraud, data breaches, and digital defamation. At CounselO, our cyber and IT law practice covers the full spectrum: cybercrime defense under Legislative Decree No. 17/2012, online fraud cases, IT contract disputes, and digital evidence handling. Online consultations available via WhatsApp or email — essential when cybercrime investigations move fast.",
        covers: ["Cybercrime Defense (Legislative Decree No. 17/2012)", "Online Fraud & Digital Theft Cases", "Hacking & Unauthorized Access Defense", "Online Defamation Cases", "E-Commerce Disputes", "IT & Technology Contract Disputes"],
        process: en.serviceDetail.services["cyber-law"].process,
      },
      "medical-malpractice": {
        title: "Medical Malpractice & Healthcare Law",
        subtitle: "Expert medical malpractice lawyers in Syria — securing compensation for victims of medical negligence and surgical errors.",
        overview: "Medical malpractice liability in Syria is governed by the Syrian Civil Code's provisions on civil liability (Articles 164–175), professional liability principles, and the regulations of the Syrian Medical Association. Claims are pursued before Syrian civil courts as professional negligence claims. At CounselO, we represent patients, families, and healthcare providers in all categories of medical malpractice disputes — including negligence claims, surgical errors, misdiagnosis, pharmaceutical liability, and dental malpractice. Online consultation available via WhatsApp or email.",
        covers: ["Medical Negligence Claims & Compensation", "Surgical Error & Anaesthesia Claims", "Misdiagnosis & Diagnostic Error Cases", "Pharmaceutical Liability"],
        process: en.serviceDetail.services["medical-malpractice"].process,
      },
      "insurance-law": {
        title: "Insurance Law",
        subtitle: "Specialist insurance dispute lawyers in Syria — challenging wrongful claim rejections and recovering insurance proceeds.",
        overview: "Syria's insurance sector is governed by Insurance Law No. 68 of 2001 and supervised by the Insurance Supervisory Authority (هيئة الإشراف على التأمين) under the Ministry of Economy and Foreign Trade. When insurers wrongfully reject or underpay valid claims — whether for health, property, motor, life, or commercial insurance — policyholders have the right to challenge those decisions. At CounselO, we represent policyholders, beneficiaries, and insured parties in all categories of insurance dispute in Syria. Online consultation via WhatsApp or email.",
        covers: ["Health Insurance Claim Disputes", "Property & Home Insurance Claims", "Motor Insurance Disputes", "Life Insurance & Beneficiary Claims", "Commercial Insurance Disputes", "Insurance Policy Interpretation"],
        process: en.serviceDetail.services["insurance-law"].process,
      },
      "civil-law": {
        title: "Civil Law",
        subtitle: "Expert legal advice on Syrian Civil Code No. 84/1949 — covering civil liability, real rights, obligations, inheritance, and legal capacity.",
        overview: "The Syrian Civil Code No. 84/1949 governs civil relationships between individuals — including tort liability, real rights, civil obligations, inheritance, and legal capacity. CounselO provides comprehensive civil law advice for individuals, businesses, and investors across Syria.",
        covers: ["Civil Liability & Damages", "Real Rights & Ownership", "Civil Obligations & Contracts", "Inheritance & Wills", "Neighbor Disputes & Easements", "Legal Capacity & Civil Status"],
        process: [
          { title: "Initial consultation", desc: "Review your civil law matter under Syrian law and identify your rights and best course of action." },
          { title: "Documentation", desc: "Gather evidence and documents required for proceedings before Syrian civil courts." },
          { title: "Litigation or negotiation", desc: "File the civil claim before the competent court or pursue amicable settlement." },
          { title: "Enforcement", desc: "Enforce the judgment in your favor under Syrian civil procedure." },
        ],
      },
      "civil-procedure": {
        title: "Civil Procedure",
        subtitle: "Expert guidance on Syrian civil court proceedings under Legislative Decree No. 84/1953.",
        overview: "Legislative Decree No. 84/1953 (Syrian Civil Procedure Code) governs civil court proceedings in Syria — from filing claims and interim measures through evidence, appeal, cassation, and enforcement of foreign judgments. CounselO provides procedural guidance to ensure your case proceeds correctly.",
        covers: ["Filing a Civil Claim", "Interim & Provisional Measures", "Evidence & Proof", "Civil Appeals", "Civil Cassation", "Foreign Judgment Enforcement"],
        process: [
          { title: "Procedural assessment", desc: "Identify the correct court and procedure under the Syrian Civil Procedure Code." },
          { title: "Document preparation", desc: "Draft petitions and documents meeting Syrian court procedural requirements." },
          { title: "Case management", desc: "Manage the case through each stage from filing to judgment." },
          { title: "Challenge or enforce", desc: "Appeal unsatisfactory judgments or enforce favorable ones." },
        ],
      },
      "criminal-procedure": {
        title: "Criminal Procedure",
        subtitle: "Expert criminal defense at every stage of Syrian criminal proceedings under Legislative Decree No. 112/1950.",
        overview: "Legislative Decree No. 112/1950 (Syrian Criminal Procedure Code) governs criminal proceedings in Syria — from investigation through trial, appeal, cassation, and civil action. CounselO provides comprehensive criminal defense at every stage of Syrian criminal proceedings.",
        covers: ["Preliminary Investigation Defense", "Detention & Bail", "Criminal Trial & Defense", "Criminal Appeal", "Criminal Cassation", "Civil Action in Criminal Proceedings"],
        process: [
          { title: "Immediate intervention", desc: "Contact CounselO upon summons or detention — we respond 24/7." },
          { title: "Case assessment and strategy", desc: "Review the charges and build the defense strategy from day one." },
          { title: "Trial representation", desc: "Full defense representation before Syrian criminal courts at all stages." },
          { title: "Appeal if necessary", desc: "File appeal or cassation immediately after any adverse judgment." },
        ],
      },
      "immigration-law": en.serviceDetail.services["immigration-law"],
    },
  },

  nav: {
    ...en.nav,
    servicesList: [
      { name: "Family Law", href: "/services/family-law" },
      { name: "Commercial Law", href: "/services/business-law" },
      { name: "Property Law", href: "/services/real-estate" },
      { name: "Employment Law", href: "/services/employment-law" },
      { name: "Foreign Investment Law", href: "/services/foreign-investment" },
      { name: "Administrative Law", href: "/services/administrative-law" },
      { name: "Arbitration & Mediation", href: "/services/arbitration" },
      { name: "Enforcement & Debt Collection", href: "/services/enforcement" },
      { name: "Companies Law", href: "/services/companies-law" },
      { name: "Contracts", href: "/services/contracts" },
      { name: "Criminal Law", href: "/services/criminal-law" },
      { name: "Banking & Finance Law", href: "/services/banking-finance" },
      { name: "Intellectual Property", href: "/services/intellectual-property" },
      { name: "Tax Law", href: "/services/tax-zakat" },
      { name: "Cyber & IT Law", href: "/services/cyber-law" },
      { name: "Medical Malpractice", href: "/services/medical-malpractice" },
      { name: "Insurance Law", href: "/services/insurance-law" },
      { name: "Civil Law", href: "/services/civil-law" },
      { name: "Civil Procedure", href: "/services/civil-procedure" },
      { name: "Criminal Procedure", href: "/services/criminal-procedure" },
    ],
  },

  familyLawDetail: {
    ...en.familyLawDetail,
    parentTitle: "Family Law — Syria",
    breadcrumb: { home: "Home", services: "Services", parent: "Family Law — Syria" },
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
          .replace(/30 years/g, "30 years").replace(/KSA/g, "Syria")
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
    sidebar: {
      heading: "Need a Cybercrime Lawyer?",
      desc: "Get urgent cybercrime law advice in Syria — online via WhatsApp or email under the Syrian Cybercrime Law (Decree 17/2012). Confidential, rapid response for digital legal emergencies.",
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
        subtitle: svc.subtitle.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/Anti-Cybercrime Law \(M\/17\)/g, "Syrian Cybercrime Law (Decree 17/2012)").replace(/PDPL/g, "Syrian data protection law"),
        covers: svc.covers.map((c: string) => c.replace(/Saudi Arabia/g, "Syria").replace(/Anti-Cybercrime Law/g, "Syrian Cybercrime Law").replace(/PDPL/g, "Syrian data protection law").replace(/CITC/g, "Syrian authorities")),
        overview1: svc.overview1.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Anti-Cybercrime Law \(Royal Decree M\/17\)/g, "Syrian Cybercrime Law (Legislative Decree No. 17/2012)").replace(/PDPL|Personal Data Protection Law/g, "Syrian data protection law").replace(/CITC/g, "Syrian cybercrime authorities"),
        overview2: svc.overview2 ? svc.overview2.replace(/Saudi Arabia/g, "Syria").replace(/CITC/g, "Syrian authorities").replace(/KSA/g, "Syria") : svc.overview2,
        faqs: svc.faqs.map(faq => ({
          q: faq.q.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Anti-Cybercrime Law/g, "Syrian Cybercrime Law"),
          a: faq.a.replace(/Saudi Arabia/g, "Syria").replace(/Saudi law/g, "Syrian law").replace(/KSA/g, "Syria").replace(/Anti-Cybercrime Law/g, "Syrian Cybercrime Law (Legislative Decree No. 17/2012)").replace(/CITC/g, "Syrian cybercrime authorities"),
        })),
      }])
    ) as typeof en.cyberLawDetail.services,
  },

  medicalMalpracticeDetail: {
    ...en.medicalMalpracticeDetail,
    breadcrumb: { home: "Home", services: "Services", parent: "Medical Malpractice — Syria" },
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
    experienceBadge: "30+ Years Regional Experience · 20,000+ Cases & Consultations · Online Consultations Available",
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
  },


  contact: {
    ...en.contact,
    firmDetails: {
      ...en.contact.firmDetails,
      address: "Hama, Syria",
    },
    form: {
      ...en.contact.form,
      phonePlaceholder: "+963 9xx xxx xxxx",
    },
  },

  aboutPage: {
    ...en.aboutPage,
    stats: [
      { stat: "20,000+", label: "Cases & Consultations Handled" },
      { stat: "30+", label: "Years of Legal Experience" },
      { stat: "20", label: "Practice Areas" },
      { stat: "40+", label: "Lawyers Mentored" },
    ],
    seoTitle: "About CounselO — Syria's Specialized Online Legal Consultation Platform",
    seoDesc: "CounselO is Syria's specialized online legal consultation platform — founded by Lawyer Omar Al-Baghdadi, with 30+ years regional experience and 20,000+ cases and consultations handled across Syria and the region.",
    seoKeywords: "about CounselO, online legal platform Syria, lawyer Omar Al-Baghdadi, specialized legal platform Syria, online legal consultation Syria, Syrian law expert",
    hero: {
      ...en.aboutPage.hero,
      badge: "Syria's Specialized Online Legal Consultation Platform · CounselO",
      heading: "Syria's Specialized Online Legal Consultation Platform",
      subheading: "CounselO delivers expert legal guidance online for individuals, businesses and investors across Syria — fast, professionally, and in both Arabic and English.",
    },
    mission: {
      eyebrow: "Our Mission",
      heading: "Democratising Legal Access in Syria",
      p1: "CounselO was established with a clear mission: to make expert legal advice accessible to every individual, business and investor in Syria — online, instantly, and without the barriers of traditional legal practice. No office visits, no waiting rooms, no geographic limitations. One platform. All practice areas. Professional quality on every consultation.",
      p2: "Syria's legal landscape demands experienced, reliable counsel — for individuals navigating personal status matters, businesses protecting their commercial interests, and foreign investors entering the Syrian market. CounselO puts specialist expertise within reach of every client across Syria, via WhatsApp or email, 24/7, in both Arabic and English. We are Syria's specialized online legal consultation platform — with 20 major practice areas, a professional legal team led by a 30-year senior advocate, and the ability to serve any client, anywhere in Syria, within 24 hours.",
      p3: "From a single consultation to complex multi-jurisdictional disputes, CounselO delivers structured legal analysis, practical guidance, and expert representation across all major areas of Syrian law — online, fast, and with the professional quality that every client deserves.",
      vision2030Badge: "Syria's Legal Experts",
      vision2030Desc: "Making professional Syrian legal guidance accessible to individuals, businesses and investors — wherever they are.",
    },
    founder: {
      ...en.aboutPage.founder,
      subheading: "Senior Advocate · Regional Legal Authority · Syria & the Region",
      bio4: "Beyond his courtroom practice, Omar Al-Baghdadi is recognised as a regional legal mentor and educator — having trained and supervised more than 40 lawyers across Syria, the UAE, and Saudi Arabia. This rare combination of senior advocacy, cross-jurisdictional expertise, and leadership of a professional legal team makes CounselO uniquely positioned to deliver premium legal services to clients across Syria.",
    },
    why: {
      eyebrow: "Why CounselO",
      heading: "The CounselO Difference",
      points: [
        { title: "Access to Justice", desc: "CounselO makes professional legal guidance accessible to all individuals, businesses and investors across Syria — online, without barriers, in both Arabic and English." },
      ],
    },
    cta: {
      eyebrow: "Get Expert Legal Advice Today",
      heading: "Consult CounselO — Syria's Specialized Online Legal Consultation Platform",
      desc: "Professional legal guidance delivered online — fast, confidential, and backed by 30+ years of regional legal experience across Syria and the Arab world. Start your consultation today via WhatsApp or email.",
      ctaBtn: "Start Your Consultation",
      learnMoreBtn: "View All Services",
    },
    office: {
      ...en.aboutPage.office,
      eyebrow: "Physical Presence",
      heading: "Syria Office — Al-Baghdadi Law Firm",
      p1: "CounselO provides online legal consultation services, document analysis, and remote legal opinion preparation — enabling clients across all of Syria to access professional legal services without the need for in-person attendance.",
      p2: "Where a case requires court representation, appearances before courts or competent authorities, or document notarization and procedures requiring physical presence, CounselO works through Al-Baghdadi Law Firm — licensed in Syria — to handle judicial representation proceedings before Syrian courts and government authorities.",
      city: "Syria",
      region: "Syria",
      partnerName: "Al-Baghdadi Law Firm",
      licenseNo: "Licensed in Syria",
      address: "Al-Baghdadi Law Firm\nSyria",
      mapsUrl: "https://www.google.com/maps?q=35.1333,36.75",
      mapsLabel: "View on Google Maps",
    },
  },
};
