/**
 * Optimized meta titles and descriptions for all CounselO pages.
 * Keys are the prefixed canonical paths (e.g. "/sa/about", "/syr/ar/services/criminal-law").
 * Used by SEOHead to override per-page title + description with search-optimized copy.
 * Syria-specific entries already contain the correct localized text — SEOHead skips
 * syriafyText() transformation when a map entry is found.
 */
export type OptimizedMeta = {
  title: string;
  description: string;
  /** When present, overrides the computed canonical URL (used for 301-redirect source pages). */
  canonicalOverride?: string;
};

export const COUNSELO_OPTIMIZED_META: Record<string, OptimizedMeta> = {

  // ─── REGION PICKERS ───────────────────────────────────────────────────────

  "/": {
    title: "Online Legal Consultations in Saudi Arabia & Syria | Counselo",
    description:
      "Book confidential online legal consultations and receive professional legal guidance across Saudi Arabia and Syria through Counselo's secure and convenient platform.",
  },
  "/ar": {
    title: "استشارات قانونية أونلاين في السعودية وسوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين بسرية وأمان، واحصل على توجيه قانوني مهني في السعودية وسوريا عبر منصة كاونسلو بسهولة وموثوقية.",
  },

  // ─── SAUDI ARABIA — COUNTRY PAGES ────────────────────────────────────────

  "/sa": {
    title: "Online Legal Consultations in Saudi Arabia | Counselo",
    description:
      "Book confidential online legal consultations in Saudi Arabia and receive professional guidance on family, employment, business, immigration, and other legal matters.",
  },
  "/sa/ar": {
    title: "استشارات قانونية أونلاين في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في السعودية بسرية وأمان، واحصل على توجيه مهني في قضايا الأسرة والعمل والشركات والهجرة وغيرها.",
  },

  // ─── SYRIA — COUNTRY PAGES ───────────────────────────────────────────────

  "/syr": {
    title: "Online Legal Consultations in Syria | Counselo",
    description:
      "Get confidential online legal consultations in Syria and receive professional guidance for family, business, employment, property, and other legal matters.",
  },
  "/syr/ar": {
    title: "استشارات قانونية أونلاين في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في سوريا واحصل على توجيه قانوني مهني في قضايا الأسرة والعمل والعقارات والشركات وغيرها بسرية وأمان.",
  },

  // ─── ABOUT PAGES ─────────────────────────────────────────────────────────

  "/sa/about": {
    title: "About Counselo | Online Legal Consultations in Saudi Arabia",
    description:
      "Learn about Counselo, an online legal consultation platform serving Saudi Arabia. Connect with experienced legal professionals and receive confidential guidance.",
  },
  "/sa/ar/about": {
    title: "عن كاونسلو | استشارات قانونية أونلاين في السعودية",
    description:
      "تعرف على كاونسلو، منصة استشارات قانونية أونلاين متخصصة في السعودية، تتيح التواصل مع محامين ذوي خبرة والحصول على توجيه قانوني بسرية.",
  },
  "/syr/about": {
    title: "About Counselo | Online Legal Consultations in Syria",
    description:
      "Learn about Counselo, an online legal consultation platform serving Syria. Connect with experienced legal professionals and receive confidential guidance.",
  },
  "/syr/ar/about": {
    title: "عن كاونسلو | استشارات قانونية أونلاين في سوريا",
    description:
      "تعرف على كاونسلو، منصة استشارات قانونية أونلاين متخصصة في سوريا، تتيح التواصل مع محامين ذوي خبرة والحصول على توجيه قانوني بسرية.",
  },

  // ─── CONTACT PAGES ───────────────────────────────────────────────────────

  "/sa/contact": {
    title: "Book an Online Legal Consultation in Saudi Arabia | Counselo",
    description:
      "Contact Counselo to book a confidential online legal consultation in Saudi Arabia. Send your case details and receive professional legal guidance within 24 hours.",
  },
  "/sa/ar/contact": {
    title: "احجز استشارة قانونية أونلاين في السعودية | كاونسلو",
    description:
      "تواصل مع كاونسلو لحجز استشارة قانونية أونلاين بسرية في السعودية. أرسل تفاصيل قضيتك واحصل على توجيه قانوني مهني خلال 24 ساعة.",
  },
  "/syr/contact": {
    title: "Book an Online Legal Consultation in Syria | Counselo",
    description:
      "Contact Counselo to book a confidential online legal consultation in Syria. Send your case details and receive professional legal guidance within 24 hours.",
  },
  "/syr/ar/contact": {
    title: "احجز استشارة قانونية أونلاين في سوريا | كاونسلو",
    description:
      "تواصل مع كاونسلو لحجز استشارة قانونية أونلاين بسرية في سوريا. أرسل تفاصيل قضيتك واحصل على توجيه قانوني مهني خلال 24 ساعة.",
  },

  // ─── SERVICES INDEX ───────────────────────────────────────────────────────

  "/sa/services": {
    title: "Legal Practice Areas in Saudi Arabia | Counselo",
    description:
      "Choose your legal consultation area in Saudi Arabia: family, employment, real estate, corporate, contracts, arbitration, criminal law, tax, and more.",
  },
  "/sa/ar/services": {
    title: "مجالات الاستشارة القانونية في السعودية | كاونسلو",
    description:
      "اختر مجال استشارتك القانونية في السعودية: الأسرة، العمل، العقارات، الشركات، العقود، التحكيم، القضايا الجزائية، الضرائب وغيرها.",
  },
  "/syr/services": {
    title: "Legal Practice Areas in Syria | Counselo",
    description:
      "Choose your legal consultation area in Syria: family, employment, real estate, corporate, contracts, arbitration, criminal law, civil law, and more.",
  },
  "/syr/ar/services": {
    title: "مجالات الاستشارة القانونية في سوريا | كاونسلو",
    description:
      "اختر مجال استشارتك القانونية في سوريا: الأسرة، العمل، العقارات، الشركات، العقود، التحكيم، القضايا الجزائية، القانون المدني وغيرها.",
  },

  // ─── BLOG INDEX ───────────────────────────────────────────────────────────

  "/sa/blog": {
    title: "Legal Blog for Saudi Arabia | Counselo",
    description:
      "Practical legal guides for Saudi Arabia covering family law, employment, real estate, corporate law, contracts, investment, and dispute resolution.",
  },
  "/sa/ar/blog": {
    title: "مدونة قانونية للسعودية | كاونسلو",
    description:
      "مقالات وإرشادات قانونية عملية في السعودية حول الأسرة والعمل والعقارات والشركات والعقود والاستثمار وتسوية النزاعات.",
  },
  "/syr/blog": {
    title: "Legal Blog for Syria | Counselo",
    description:
      "Practical legal guides for Syria covering family law, employment, real estate, corporate law, contracts, investment, and dispute resolution.",
  },
  "/syr/ar/blog": {
    title: "مدونة قانونية لسوريا | كاونسلو",
    description:
      "مقالات وإرشادات قانونية عملية في سوريا حول الأسرة والعمل والعقارات والشركات والعقود والاستثمار وتسوية النزاعات.",
  },

  // ─── LEGAL PAGES ─────────────────────────────────────────────────────────

  "/sa/terms-of-service": {
    title: "Terms of Service | Counselo Saudi Arabia",
    description:
      "Review Counselo's consultation process for Saudi Arabia, including how to submit your case, confirm fees, complete payment, and receive your legal guidance.",
  },
  "/sa/ar/terms-of-service": {
    title: "شروط الخدمة | كاونسلو السعودية",
    description:
      "تعرف على آلية طلب الاستشارة القانونية في السعودية عبر كاونسلو، من إرسال التفاصيل إلى تأكيد الرسوم والدفع واستلام الرد القانوني.",
  },
  "/syr/terms-of-service": {
    title: "Terms of Service | Counselo Syria",
    description:
      "Review Counselo's consultation process for Syria, including how to submit your case, confirm fees, complete payment, and receive your legal guidance.",
  },
  "/syr/ar/terms-of-service": {
    title: "شروط الخدمة | كاونسلو سوريا",
    description:
      "تعرف على آلية طلب الاستشارة القانونية في سوريا عبر كاونسلو، من إرسال التفاصيل إلى تأكيد الرسوم والدفع واستلام الرد القانوني.",
  },
  "/sa/privacy-policy": {
    title: "Privacy Policy | Counselo Saudi Arabia",
    description:
      "Learn how Counselo collects, protects, and handles legal consultation data in Saudi Arabia while maintaining full client confidentiality.",
  },
  "/sa/ar/privacy-policy": {
    title: "سياسة الخصوصية | كاونسلو السعودية",
    description:
      "تعرف على كيفية جمع كاونسلو لبيانات الاستشارة القانونية في السعودية وحمايتها والحفاظ على سرية معلومات العملاء التامة.",
  },
  "/syr/privacy-policy": {
    title: "Privacy Policy | Counselo Syria",
    description:
      "Learn how Counselo collects, protects, and handles legal consultation data in Syria while maintaining full client confidentiality.",
  },
  "/syr/ar/privacy-policy": {
    title: "سياسة الخصوصية | كاونسلو سوريا",
    description:
      "تعرف على كيفية جمع كاونسلو لبيانات الاستشارة القانونية في سوريا وحمايتها والحفاظ على سرية معلومات العملاء التامة.",
  },

  // ─── SA ENGLISH SERVICE PAGES ────────────────────────────────────────────

  "/sa/services/family-law": {
    title: "Family, Divorce & Custody Lawyer in Saudi Arabia | Counselo",
    description:
      "Book an online legal consultation with an experienced family law lawyer in Saudi Arabia. Get professional guidance on divorce, custody, alimony, and personal status matters.",
  },
  "/sa/services/employment-law": {
    title: "Employment & Wrongful Termination Lawyer in Saudi Arabia",
    description:
      "Book an online legal consultation with an employment lawyer in Saudi Arabia for employment contracts, termination, wages, workplace disputes, and labor rights.",
  },
  "/sa/services/business-law": {
    title: "Commercial Law Lawyer in Saudi Arabia | Counselo",
    description:
      "Book an online legal consultation with a commercial lawyer in Saudi Arabia for business disputes, contracts, trading practices, and commercial liability claims.",
  },
  "/sa/services/real-estate": {
    title: "Real Estate Lawyer in Saudi Arabia | Counselo",
    description:
      "Book an online legal consultation with a real estate lawyer in Saudi Arabia for property ownership, sale contracts, leases, registration, and construction disputes.",
  },
  "/sa/services/foreign-investment": {
    title: "Foreign Investment & Company Formation Lawyer in Saudi Arabia",
    description:
      "Consult a Saudi foreign investment lawyer online about investment licensing, foreign-owned company formation, regulatory compliance, contracts, and investor disputes.",
  },
  "/sa/services/administrative-law": {
    title: "Administrative Law Lawyer in Saudi Arabia | Counselo",
    description:
      "Book an online legal consultation with an administrative lawyer in Saudi Arabia on government decisions, administrative objections, and public authority disputes.",
  },
  "/sa/services/arbitration": {
    title: "Arbitration Lawyer in Saudi Arabia | Counselo",
    description:
      "Book an online legal consultation with an arbitration lawyer in Saudi Arabia for commercial disputes, mediation procedures, award enforcement, and settlements.",
  },
  "/sa/services/enforcement": {
    title: "Debt Recovery Lawyer in Saudi Arabia | Counselo",
    description:
      "Book an online legal consultation with a debt recovery lawyer in Saudi Arabia for judgment execution, debt collection, payment claims, and enforcement procedures.",
  },
  "/sa/services/companies-law": {
    title: "Corporate Law Lawyer in Saudi Arabia | Counselo",
    description:
      "Book an online legal consultation with a corporate lawyer in Saudi Arabia for company formation, commercial contracts, governance, compliance, and business disputes.",
  },
  "/sa/services/contracts": {
    title: "Contract Lawyer in Saudi Arabia | Counselo",
    description:
      "Book an online legal consultation with a contract lawyer in Saudi Arabia for contract drafting, review, breach of contract, termination, and negotiation.",
  },
  "/sa/services/criminal-law": {
    title: "Criminal Defense Lawyer in Saudi Arabia | Counselo",
    description:
      "Book a confidential online legal consultation with a criminal lawyer in Saudi Arabia for criminal complaints, investigations, defense options, and court procedures.",
  },
  "/sa/services/banking-finance": {
    title: "Banking & Finance Lawyer in Saudi Arabia | Counselo",
    description:
      "Book an online legal consultation with a banking lawyer in Saudi Arabia for bank disputes, finance contracts, regulatory compliance, and Islamic finance matters.",
  },
  "/sa/services/intellectual-property": {
    title: "Intellectual Property Lawyer in Saudi Arabia | Counselo",
    description:
      "Book an online legal consultation with an intellectual property lawyer in Saudi Arabia for trademarks, copyrights, patents, and IP protection matters.",
  },
  "/sa/services/tax-zakat": {
    title: "Tax & Zakat Lawyer in Saudi Arabia | Counselo",
    description:
      "Book an online legal consultation with a tax lawyer in Saudi Arabia for VAT compliance, zakat obligations, customs duties, tax assessments, and objections.",
  },
  "/sa/services/cyber-law": {
    title: "Cybercrime Lawyer in Saudi Arabia | Counselo",
    description:
      "Book a confidential online legal consultation with a cybercrime lawyer in Saudi Arabia for cybercrime, online defamation, data protection, and digital evidence.",
  },
  "/sa/services/medical-malpractice": {
    title: "Medical Malpractice Lawyer in Saudi Arabia | Counselo",
    description:
      "Book an online legal consultation with a medical malpractice lawyer in Saudi Arabia for negligence claims, misdiagnosis, surgical errors, and compensation.",
  },
  "/sa/services/insurance-law": {
    title: "Insurance Lawyer in Saudi Arabia | Counselo",
    description:
      "Book an online legal consultation with an insurance lawyer in Saudi Arabia for claim denial, policy disputes, insurer liability, and settlement matters.",
  },

  // ─── SA ARABIC SERVICE PAGES ─────────────────────────────────────────────

  "/sa/ar/services/family-law": {
    title: "محامي أحوال شخصية في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي أحوال شخصية في السعودية، للحصول على توجيه مهني في الطلاق والحضانة والنفقة والزواج.",
  },
  "/sa/ar/services/employment-law": {
    title: "محامي عمالي في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي عمالي في السعودية بشأن عقود العمل والفصل والرواتب والنزاعات العمالية وحقوق الموظفين.",
  },
  "/sa/ar/services/business-law": {
    title: "محامي تجاري في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي تجاري في السعودية للحصول على توجيه في النزاعات التجارية والعقود والمعاملات والمسؤولية.",
  },
  "/sa/ar/services/real-estate": {
    title: "محامي عقاري في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي عقاري في السعودية في نزاعات الملكية والإيجار والبيع والتسجيل وعيوب البناء.",
  },
  "/sa/ar/services/foreign-investment": {
    title: "محامي استثمار أجنبي وتأسيس شركات في السعودية | كاونسلو",
    description:
      "احجز استشارة أونلاين مع محامي استثمار أجنبي في السعودية بشأن تراخيص الاستثمار وتأسيس الشركات الأجنبية والامتثال والعقود ومنازعات المستثمرين.",
  },
  "/sa/ar/services/administrative-law": {
    title: "محامي إداري في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي إداري في السعودية بشأن القرارات الحكومية والطعون الإدارية والمنازعات مع الجهات العامة.",
  },
  "/sa/ar/services/arbitration": {
    title: "محامي تحكيم في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي تحكيم في السعودية في التحكيم التجاري والوساطة وتسوية النزاعات وتنفيذ الأحكام.",
  },
  "/sa/ar/services/enforcement": {
    title: "محامي تنفيذ وتحصيل ديون في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي تنفيذ في السعودية لتنفيذ الأحكام وتحصيل الديون والمطالبات المالية وإجراءات التنفيذ.",
  },
  "/sa/ar/services/companies-law": {
    title: "محامي شركات في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي شركات في السعودية في تأسيس الشركات والعقود التجارية والحوكمة والامتثال والنزاعات.",
  },
  "/sa/ar/services/contracts": {
    title: "محامي عقود في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي عقود في السعودية في صياغة العقود ومراجعتها والإخلال بالعقد والفسخ والتنفيذ.",
  },
  "/sa/ar/services/criminal-law": {
    title: "محامي جزائي في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين بسرية مع محامي جزائي في السعودية في الشكاوى الجزائية والتحقيقات والإجراءات والخيارات القانونية.",
  },
  "/sa/ar/services/banking-finance": {
    title: "محامي مصرفي وتمويل في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي مصرفي في السعودية في النزاعات البنكية وعقود التمويل والامتثال والتمويل الإسلامي.",
  },
  "/sa/ar/services/intellectual-property": {
    title: "محامي ملكية فكرية في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي ملكية فكرية في السعودية في العلامات التجارية وحقوق المؤلف والبراءات والأسرار التجارية.",
  },
  "/sa/ar/services/tax-zakat": {
    title: "محامي ضرائب وزكاة في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي ضرائب في السعودية بشأن ضريبة القيمة المضافة والزكاة والجمارك وتقييمات الدخل والاعتراضات.",
  },
  "/sa/ar/services/cyber-law": {
    title: "محامي جرائم إلكترونية في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي جرائم إلكترونية في السعودية في الجرائم الرقمية والتشهير وحماية البيانات والأدلة الإلكترونية.",
  },
  "/sa/ar/services/medical-malpractice": {
    title: "محامي أخطاء طبية في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي أخطاء طبية في السعودية في الإهمال الطبي والأخطاء الجراحية وسوء التشخيص والتعويضات.",
  },
  "/sa/ar/services/insurance-law": {
    title: "محامي تأمين في السعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي تأمين في السعودية في رفض التعويضات ومنازعات وثائق التأمين والمسؤولية التأمينية.",
  },

  // ─── SYRIA ENGLISH SERVICE PAGES ─────────────────────────────────────────

  "/syr/services/family-law": {
    title: "Family, Divorce & Child Custody Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with a family law lawyer in Syria. Get professional guidance on divorce, custody, alimony, and personal status matters.",
  },
  "/syr/services/employment-law": {
    title: "Employment & Wrongful Termination Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with an employment lawyer in Syria for employment contracts, wrongful termination, unpaid wages, and workplace disputes.",
  },
  "/syr/services/business-law": {
    title: "Commercial Law Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with a commercial lawyer in Syria for business disputes, contracts, trading practices, and commercial liability matters.",
  },
  "/syr/services/real-estate": {
    title: "Real Estate Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with a real estate lawyer in Syria for property ownership, sales, leases, inheritance, registration, and property disputes.",
  },
  "/syr/services/foreign-investment": {
    title: "Foreign Investment Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with a foreign investment lawyer in Syria for company registration, business licensing, compliance, and entry procedures.",
  },
  "/syr/services/administrative-law": {
    title: "Administrative Law Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with an administrative lawyer in Syria on government decisions, public authority disputes, and objection procedures.",
  },
  "/syr/services/arbitration": {
    title: "Arbitration Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with an arbitration lawyer in Syria for commercial disputes, mediation procedures, award enforcement, and settlements.",
  },
  "/syr/services/enforcement": {
    title: "Debt Recovery Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with a debt recovery lawyer in Syria for judgment execution, debt collection, payment claims, and enforcement procedures.",
  },
  "/syr/services/companies-law": {
    title: "Corporate Law Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with a corporate lawyer in Syria for company formation, shareholder disputes, governance, compliance, and dissolution.",
  },
  "/syr/services/contracts": {
    title: "Contract Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with a contract lawyer in Syria for contract drafting, review, breach of contract, termination, and negotiation.",
  },
  "/syr/services/criminal-law": {
    title: "Criminal Defense Lawyer in Syria | Counselo",
    description:
      "Book a confidential online legal consultation with a criminal lawyer in Syria for criminal complaints, investigations, defense options, and court procedures.",
  },
  "/syr/services/banking-finance": {
    title: "Banking & Finance Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with a banking lawyer in Syria for bank disputes, finance contracts, regulatory compliance, and credit matters.",
  },
  "/syr/services/intellectual-property": {
    title: "Intellectual Property Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with an intellectual property lawyer in Syria for trademarks, copyrights, patents, trade secrets, and infringement claims.",
  },
  "/syr/services/tax-zakat": {
    title: "Tax Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with a tax lawyer in Syria for income tax compliance, customs duties, tax assessments, objection procedures, and fiscal disputes.",
  },
  "/syr/services/cyber-law": {
    title: "Cybercrime Lawyer in Syria | Counselo",
    description:
      "Book a confidential online legal consultation with a cybercrime lawyer in Syria for cybercrime, online defamation, data protection, and digital evidence.",
  },
  "/syr/services/medical-malpractice": {
    title: "Medical Malpractice Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with a medical malpractice lawyer in Syria for negligence claims, misdiagnosis, surgical errors, and compensation matters.",
  },
  "/syr/services/insurance-law": {
    title: "Insurance Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with an insurance lawyer in Syria for claim denial, policy disputes, insurer liability, and settlement negotiations.",
  },
  "/syr/services/civil-law": {
    title: "Civil Law Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with a civil law lawyer in Syria for civil claims, contractual obligations, compensation, and private legal disputes.",
  },
  "/syr/services/civil-procedure": {
    title: "Civil Procedure Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with a civil procedure lawyer in Syria for litigation steps, filing requirements, evidence rules, appeals, and court deadlines.",
  },
  "/syr/services/criminal-procedure": {
    title: "Criminal Procedure Lawyer in Syria | Counselo",
    description:
      "Book an online legal consultation with a criminal procedure lawyer in Syria on investigation rights, detention, evidence rules, and appeals.",
  },

  // ─── SYRIA ARABIC SERVICE PAGES ──────────────────────────────────────────

  "/syr/ar/services/family-law": {
    title: "محامي أحوال شخصية في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي أحوال شخصية في سوريا للحصول على توجيه مهني في الطلاق والحضانة والنفقة والميراث.",
  },
  "/syr/ar/services/employment-law": {
    title: "محامي عمالي في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي عمالي في سوريا بشأن عقود العمل والفصل التعسفي والأجور والنزاعات العمالية وحقوق الموظف.",
  },
  "/syr/ar/services/business-law": {
    title: "محامي تجاري في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي تجاري في سوريا في النزاعات التجارية والعقود والمعاملات التجارية والمسؤولية القانونية.",
  },
  "/syr/ar/services/real-estate": {
    title: "محامي عقاري في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي عقاري في سوريا في البيع والشراء والإيجار والتسجيل ونزاعات الملكية العقارية.",
  },
  "/syr/ar/services/foreign-investment": {
    title: "محامي استثمار أجنبي في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي استثمار أجنبي في سوريا بشأن تسجيل الشركات والترخيص والامتثال التنظيمي والدخول التجاري.",
  },
  "/syr/ar/services/administrative-law": {
    title: "محامي إداري في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي إداري في سوريا بشأن القرارات الحكومية والطعون الإدارية والمنازعات مع الجهات العامة.",
  },
  "/syr/ar/services/arbitration": {
    title: "محامي تحكيم في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي تحكيم في سوريا في التحكيم التجاري والوساطة وتسوية النزاعات وتنفيذ الأحكام التحكيمية.",
  },
  "/syr/ar/services/enforcement": {
    title: "محامي تنفيذ وتحصيل ديون في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي تنفيذ في سوريا لتنفيذ الأحكام وتحصيل الديون والمطالبات المالية وإجراءات التنفيذ القضائي.",
  },
  "/syr/ar/services/companies-law": {
    title: "محامي شركات في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي شركات في سوريا في تأسيس الشركات ونزاعات الشركاء والحوكمة والامتثال وتصفية الشركات.",
  },
  "/syr/ar/services/contracts": {
    title: "محامي عقود في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي عقود في سوريا في صياغة العقود ومراجعتها والإخلال بالعقد والفسخ والتنفيذ القانوني.",
  },
  "/syr/ar/services/criminal-law": {
    title: "محامي جزائي في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين بسرية مع محامي جزائي في سوريا في الشكاوى الجزائية والتحقيقات والإجراءات والخيارات القانونية المتاحة.",
  },
  "/syr/ar/services/banking-finance": {
    title: "محامي مصرفي وتمويل في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي مصرفي في سوريا في النزاعات البنكية وعقود التمويل والامتثال التنظيمي والقانون المصرفي.",
  },
  "/syr/ar/services/intellectual-property": {
    title: "محامي ملكية فكرية في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي ملكية فكرية في سوريا في العلامات التجارية وحقوق المؤلف والبراءات والأسرار التجارية.",
  },
  "/syr/ar/services/tax-zakat": {
    title: "محامي ضرائب في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي ضرائب في سوريا بشأن ضريبة الدخل والجمارك والتقييمات الضريبية وإجراءات الاعتراض.",
  },
  "/syr/ar/services/cyber-law": {
    title: "محامي جرائم إلكترونية في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي جرائم إلكترونية في سوريا في الجرائم الرقمية والتشهير وحماية البيانات والأدلة الإلكترونية.",
  },
  "/syr/ar/services/medical-malpractice": {
    title: "محامي أخطاء طبية في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي أخطاء طبية في سوريا في الإهمال الطبي والأخطاء الجراحية وسوء التشخيص والتعويضات.",
  },
  "/syr/ar/services/insurance-law": {
    title: "محامي تأمين في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي تأمين في سوريا في رفض التعويضات ومنازعات وثائق التأمين والمسؤولية التأمينية والتسوية.",
  },
  "/syr/ar/services/civil-law": {
    title: "محامي قانون مدني في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي قانون مدني في سوريا في الدعاوى المدنية والالتزامات والتعويض وحقوق الملكية الخاصة.",
  },
  "/syr/ar/services/civil-procedure": {
    title: "محامي أصول محاكمات مدنية في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي في أصول المحاكمات المدنية في سوريا بشأن الإجراءات والمواعيد والأدلة والاختصاص والطعون.",
  },
  "/syr/ar/services/criminal-procedure": {
    title: "محامي أصول محاكمات جزائية في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين مع محامي في أصول المحاكمات الجزائية في سوريا بشأن التحقيق والتوقيف والأدلة والطعون والحقوق الإجرائية.",
  },

  // ─── SA ENGLISH BLOG POSTS ────────────────────────────────────────────────

  "/sa/blog/divorce-in-saudi-arabia": {
    title: "Divorce in Saudi Arabia | Rights & Legal Process | Counselo",
    description:
      "Learn about divorce, khula, annulment, custody, alimony, and documentation under Saudi family law before booking an online legal consultation.",
  },
  "/sa/blog/wrongful-termination-saudi-labor-law": {
    title: "Wrongful Termination in Saudi Arabia | Legal Guide | Counselo",
    description:
      "Learn the main rules for terminating employment contracts in Saudi Arabia, including notice periods, employee rights, compensation, and legal procedures.",
  },
  "/sa/blog/foreign-company-registration-saudi-arabia": {
    title: "Foreign Company Registration in Saudi Arabia | Counselo",
    description:
      "A legal guide to foreign company registration in Saudi Arabia covering investment licensing, commercial registration, company forms, and key procedures.",
  },
  "/sa/blog/board-of-grievances-saudi-arabia": {
    title: "Board of Grievances in Saudi Arabia | Legal Guide | Counselo",
    description:
      "Learn when and how to challenge government decisions before Saudi Arabia's Board of Grievances, including standing, deadlines, evidence, and legal strategy.",
  },
  "/sa/blog/real-estate-disputes-saudi-arabia": {
    title: "Real Estate Disputes in Saudi Arabia | Legal Guide | Counselo",
    description:
      "Understand your legal options for property disputes in Saudi Arabia, including ownership claims, lease conflicts, construction defects, and compensation.",
  },
  "/sa/blog/child-custody-saudi-arabia": {
    title: "Child Custody in Saudi Arabia | Rights & Process | Counselo",
    description:
      "Understand child custody, guardianship, visitation rights, and best-interest standards in Saudi family law before booking a legal consultation.",
  },

  // ─── SA ARABIC BLOG POSTS ────────────────────────────────────────────────

  "/sa/ar/blog/divorce-in-saudi-arabia": {
    title: "الطلاق في السعودية: الحقوق والإجراءات | دليل قانوني | كاونسلو",
    description:
      "تعرف على أحكام الطلاق والخلع والفسخ والحضانة والنفقة والتوثيق في المملكة العربية السعودية قبل طلب استشارة قانونية متخصصة.",
  },
  "/sa/ar/blog/wrongful-termination-saudi-labor-law": {
    title: "الفصل التعسفي في السعودية | حقوق الموظف | كاونسلو",
    description:
      "تعرف على أحكام إنهاء عقد العمل في السعودية، بما يشمل الإشعار والتعويض وحقوق الموظف والإجراءات القانونية الأساسية.",
  },
  "/sa/ar/blog/foreign-company-registration-saudi-arabia": {
    title: "تسجيل شركة أجنبية في السعودية | دليل قانوني | كاونسلو",
    description:
      "دليل قانوني حول تسجيل الشركات الأجنبية في السعودية، يشمل الترخيص الاستثماري والسجل التجاري وأنواع الشركات والإجراءات الأساسية.",
  },
  "/sa/ar/blog/board-of-grievances-saudi-arabia": {
    title: "ديوان المظالم في السعودية | دليل قانوني | كاونسلو",
    description:
      "تعرف على اختصاص ديوان المظالم في السعودية، ومتى يمكن الطعن في القرارات الإدارية، والمواعيد والمستندات المطلوبة.",
  },
  "/sa/ar/blog/real-estate-disputes-saudi-arabia": {
    title: "النزاعات العقارية في السعودية | دليل قانوني | كاونسلو",
    description:
      "تعرف على خياراتك القانونية في نزاعات العقارات بالسعودية، بما يشمل الملكية والإيجار وعيوب البناء والتعويض.",
  },
  "/sa/ar/blog/child-custody-saudi-arabia": {
    title: "الحضانة في السعودية | الحقوق والإجراءات | كاونسلو",
    description:
      "تعرف على أحكام الحضانة والولاية والزيارة ومعايير مصلحة المحضون في السعودية قبل طلب استشارة قانونية متخصصة.",
  },

  // ─── SYRIA ENGLISH BLOG POSTS — CANONICAL ────────────────────────────────

  "/syr/blog/administrative-court-disputes-syria": {
    title: "Administrative Court Disputes in Syria | Legal Guide | Counselo",
    description:
      "Learn how administrative disputes are handled before Syrian courts, including challenges to public authority decisions, deadlines, evidence, and legal strategy.",
  },
  "/syr/blog/child-custody-syria": {
    title: "Child Custody in Syria | Rights & Process | Counselo",
    description:
      "Understand child custody, guardianship, visitation rights, and family-law standards in Syria before booking an online legal consultation.",
  },
  "/syr/blog/divorce-in-syria": {
    title: "Divorce in Syria | Rights & Legal Process | Counselo",
    description:
      "Learn about divorce, separation, custody, alimony, and documentation procedures under Syrian family law before getting professional legal advice.",
  },
  "/syr/blog/foreign-company-registration-syria": {
    title: "Foreign Company Registration in Syria | Legal Guide | Counselo",
    description:
      "A legal guide to foreign company registration in Syria covering business licensing, commercial registration, available company forms, and key procedures.",
  },
  "/syr/blog/real-estate-disputes-syria": {
    title: "Real Estate Disputes in Syria | Legal Guide | Counselo",
    description:
      "Understand your legal options for property disputes in Syria, including ownership claims, lease conflicts, construction defects, and compensation.",
  },
  "/syr/blog/wrongful-termination-syrian-labor-law": {
    title: "Wrongful Termination in Syria | Legal Guide | Counselo",
    description:
      "Understand wrongful termination under Syrian labor law, including employee rights, notice periods, compensation, evidence requirements, and legal options.",
  },

  // ─── SYRIA ARABIC BLOG POSTS — CANONICAL ─────────────────────────────────

  "/syr/ar/blog/administrative-court-disputes-syria": {
    title: "المنازعات الإدارية في سوريا | دليل قانوني | كاونسلو",
    description:
      "تعرف على إجراءات المنازعات الإدارية أمام القضاء السوري، والطعن في قرارات الجهات العامة، والمواعيد والمستندات المطلوبة.",
  },
  "/syr/ar/blog/child-custody-syria": {
    title: "الحضانة في سوريا | الحقوق والإجراءات | كاونسلو",
    description:
      "تعرف على أحكام الحضانة والولاية والزيارة والمسائل الأسرية في سوريا قبل طلب استشارة قانونية متخصصة.",
  },
  "/syr/ar/blog/divorce-in-syria": {
    title: "الطلاق في سوريا | الحقوق والإجراءات | كاونسلو",
    description:
      "تعرف على أحكام الطلاق والتفريق والحضانة والنفقة والتوثيق في سوريا قبل طلب استشارة قانونية متخصصة.",
  },
  "/syr/ar/blog/foreign-company-registration-syria": {
    title: "تسجيل شركة أجنبية في سوريا | دليل قانوني | كاونسلو",
    description:
      "دليل قانوني حول تسجيل الشركات الأجنبية في سوريا، يشمل الترخيص التجاري والسجل التجاري وأنواع الشركات والإجراءات الأساسية.",
  },
  "/syr/ar/blog/real-estate-disputes-syria": {
    title: "النزاعات العقارية في سوريا | دليل قانوني | كاونسلو",
    description:
      "تعرف على خياراتك القانونية في نزاعات العقارات في سوريا، بما يشمل الملكية والإيجار وعيوب البناء والتعويض والتسجيل.",
  },
  "/syr/ar/blog/wrongful-termination-syrian-labor-law": {
    title: "الفصل التعسفي في سوريا | حقوق العامل | كاونسلو",
    description:
      "تعرف على حقوق العامل عند الفصل التعسفي في سوريا، والتعويضات والأدلة والمواعيد والإجراءات القانونية الأساسية.",
  },

  // ─── REDIRECT SOURCES (canonicalOverride — do not change these) ──────────

  "/syr/blog/board-of-grievances-saudi-arabia": {
    title: "Administrative Court Disputes in Syria | Legal Guide | Counselo",
    description:
      "Learn how administrative disputes are handled before Syrian courts, including challenges to public authority decisions, deadlines, evidence, and legal strategy.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/administrative-court-disputes-syria",
  },
  "/syr/blog/child-custody-saudi-arabia": {
    title: "Child Custody in Syria | Rights & Process | Counselo",
    description:
      "Understand child custody, guardianship, visitation rights, and family-law standards in Syria before booking an online legal consultation.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/child-custody-syria",
  },
  "/syr/blog/divorce-in-saudi-arabia": {
    title: "Divorce in Syria | Rights & Legal Process | Counselo",
    description:
      "Learn about divorce, separation, custody, alimony, and documentation procedures under Syrian family law before getting professional legal advice.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/divorce-in-syria",
  },
  "/syr/blog/foreign-company-registration-saudi-arabia": {
    title: "Foreign Company Registration in Syria | Legal Guide | Counselo",
    description:
      "A legal guide to foreign company registration in Syria covering business licensing, commercial registration, available company forms, and key procedures.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/foreign-company-registration-syria",
  },
  "/syr/blog/real-estate-disputes-saudi-arabia": {
    title: "Real Estate Disputes in Syria | Legal Guide | Counselo",
    description:
      "Understand your legal options for property disputes in Syria, including ownership claims, lease conflicts, construction defects, and compensation.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/real-estate-disputes-syria",
  },
  "/syr/blog/wrongful-termination-saudi-labor-law": {
    title: "Wrongful Termination in Syria | Legal Guide | Counselo",
    description:
      "Understand wrongful termination under Syrian labor law, including employee rights, notice periods, compensation, evidence requirements, and legal options.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/wrongful-termination-syrian-labor-law",
  },
  "/syr/ar/blog/board-of-grievances-saudi-arabia": {
    title: "المنازعات الإدارية في سوريا | دليل قانوني | كاونسلو",
    description:
      "تعرف على إجراءات المنازعات الإدارية أمام القضاء السوري، والطعن في قرارات الجهات العامة، والمواعيد والمستندات المطلوبة.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/administrative-court-disputes-syria",
  },
  "/syr/ar/blog/child-custody-saudi-arabia": {
    title: "الحضانة في سوريا | الحقوق والإجراءات | كاونسلو",
    description:
      "تعرف على أحكام الحضانة والولاية والزيارة والمسائل الأسرية في سوريا قبل طلب استشارة قانونية متخصصة.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/child-custody-syria",
  },
  "/syr/ar/blog/divorce-in-saudi-arabia": {
    title: "الطلاق في سوريا | الحقوق والإجراءات | كاونسلو",
    description:
      "تعرف على أحكام الطلاق والتفريق والحضانة والنفقة والتوثيق في سوريا قبل طلب استشارة قانونية متخصصة.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/divorce-in-syria",
  },
  "/syr/ar/blog/foreign-company-registration-saudi-arabia": {
    title: "تسجيل شركة أجنبية في سوريا | دليل قانوني | كاونسلو",
    description:
      "دليل قانوني حول تسجيل الشركات الأجنبية في سوريا، يشمل الترخيص التجاري والسجل التجاري وأنواع الشركات والإجراءات الأساسية.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/foreign-company-registration-syria",
  },
  "/syr/ar/blog/real-estate-disputes-saudi-arabia": {
    title: "النزاعات العقارية في سوريا | دليل قانوني | كاونسلو",
    description:
      "تعرف على خياراتك القانونية في نزاعات العقارات في سوريا، بما يشمل الملكية والإيجار وعيوب البناء والتعويض والتسجيل.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/real-estate-disputes-syria",
  },
  "/syr/ar/blog/wrongful-termination-saudi-labor-law": {
    title: "الفصل التعسفي في سوريا | حقوق العامل | كاونسلو",
    description:
      "تعرف على حقوق العامل عند الفصل التعسفي في سوريا، والتعويضات والأدلة والمواعيد والإجراءات القانونية الأساسية.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/wrongful-termination-syrian-labor-law",
  },
};
