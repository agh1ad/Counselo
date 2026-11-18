/**
 * Optimized meta titles and descriptions for all CounselO Legal pages.
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
    title: "Online Legal Advice & Representation | CounselO Legal",
    description:
      "Expert legal support online in Saudi Arabia, Syria and the UAE. One CounselO team advises, drafts and represents you, with remote follow-up in Arabic or English.",
  },
  "/ar": {
    title: "استشارات أونلاين وتمثيل قانوني | كاونسلو",
    description:
      "خبرة قانونية بين يديك أونلاين في السعودية وسوريا والإمارات. فريق كاونسلو يتولى الاستشارة والعقود والتمثيل، مع متابعة عن بُعد بالعربية والإنجليزية.",
  },

  // ─── SAUDI ARABIA — COUNTRY PAGES ────────────────────────────────────────

  "/sa": {
    title: "Online Legal Advice & Representation in Saudi Arabia | CounselO",
    description:
      "CounselO’s legal team in Saudi Arabia handles online consultation, contracts, disputes and representation. One team and remote follow-up, in Arabic and English.",
  },
  "/sa/ar": {
    title: "استشارات أونلاين وتمثيل قانوني في السعودية | كاونسلو",
    description:
      "فريق كاونسلو في السعودية يتولى الاستشارة أونلاين والعقود والمنازعات والتمثيل القانوني. تابع ملفك عن بُعد مع فريق واحد، بالعربية والإنجليزية.",
  },

  // ─── SYRIA — COUNTRY PAGES ───────────────────────────────────────────────

  "/syr": {
    title: "Online Legal Advice & Representation in Syria | CounselO",
    description:
      "CounselO’s legal team in Syria handles online consultation, contracts, disputes and representation. One team and remote follow-up, in Arabic and English.",
  },
  "/syr/ar": {
    title: "استشارات أونلاين وتمثيل قانوني في سوريا | كاونسلو",
    description:
      "فريق كاونسلو في سوريا يتولى الاستشارة أونلاين والعقود والمنازعات والتمثيل القانوني. تابع ملفك عن بُعد مع فريق واحد، بالعربية والإنجليزية.",
  },

  // ─── ABOUT PAGES ─────────────────────────────────────────────────────────

  "/sa/about": {
    title: "Our Legal Team in Saudi Arabia | CounselO",
    description:
      "Meet the CounselO team in Saudi Arabia: experienced lawyers providing online advice, preparation and legal representation. Stay connected remotely with one team throughout your matter.",
  },
  "/sa/ar/about": {
    title: "فريقنا القانوني في السعودية | كاونسلو",
    description:
      "تعرّف على فريق كاونسلو في السعودية: محامون متمرسون يتولون الاستشارة أونلاين والإعداد والتمثيل القانوني. تابع ملفك عن بُعد مع فريق واحد.",
  },
  "/syr/about": {
    title: "Our Legal Team in Syria | CounselO",
    description:
      "Meet the CounselO team in Syria: experienced lawyers providing online advice, preparation and legal representation. Stay connected remotely with one team throughout your matter.",
  },
  "/syr/ar/about": {
    title: "فريقنا القانوني في سوريا | كاونسلو",
    description:
      "تعرّف على فريق كاونسلو في سوريا: محامون متمرسون يتولون الاستشارة أونلاين والإعداد والتمثيل القانوني. تابع ملفك عن بُعد مع فريق واحد.",
  },

  // ─── CONTACT PAGES ───────────────────────────────────────────────────────

  "/sa/contact": {
    title: "Contact Our Legal Team in Saudi Arabia | CounselO",
    description:
      "Contact CounselO’s legal team in Saudi Arabia online for advice, contracts, disputes and representation. Discuss your matter remotely in Arabic or English with the team that handles your case.",
  },
  "/sa/ar/contact": {
    title: "تواصل مع فريقنا القانوني في السعودية | كاونسلو",
    description:
      "تواصل مع فريق كاونسلو في السعودية أونلاين للاستشارة والعقود والمنازعات والتمثيل القانوني. ناقش مسألتك عن بُعد بالعربية أو الإنجليزية مع الفريق الذي يتولى ملفك.",
  },
  "/syr/contact": {
    title: "Contact Our Legal Team in Syria | CounselO",
    description:
      "Contact CounselO’s legal team in Syria online for advice, contracts, disputes and representation. Discuss your matter remotely in Arabic or English with the team that handles your case.",
  },
  "/syr/ar/contact": {
    title: "تواصل مع فريقنا القانوني في سوريا | كاونسلو",
    description:
      "تواصل مع فريق كاونسلو في سوريا أونلاين للاستشارة والعقود والمنازعات والتمثيل القانوني. ناقش مسألتك عن بُعد بالعربية أو الإنجليزية مع الفريق الذي يتولى ملفك.",
  },

  // ─── SERVICES INDEX ───────────────────────────────────────────────────────

  "/sa/services": {
    title: "Legal Services in Saudi Arabia | CounselO Legal",
    description:
      "Explore CounselO’s legal services in Saudi Arabia: online advice, contracts and legal representation in family, employment, property, business and dispute matters.",
  },
  "/sa/ar/services": {
    title: "الخدمات القانونية في السعودية | كاونسلو",
    description:
      "تعرّف على خدمات فريق كاونسلو في السعودية: استشارات أونلاين وعقود وتمثيل قانوني في مسائل الأسرة والعمل والعقارات والشركات والمنازعات.",
  },
  "/syr/services": {
    title: "Legal Services in Syria | CounselO Legal",
    description:
      "Explore CounselO’s legal services in Syria: online advice, contracts and legal representation in family, employment, property, business and dispute matters.",
  },
  "/syr/ar/services": {
    title: "الخدمات القانونية في سوريا | كاونسلو",
    description:
      "تعرّف على خدمات فريق كاونسلو في سوريا: استشارات أونلاين وعقود وتمثيل قانوني في مسائل الأسرة والعمل والعقارات والشركات والمنازعات.",
  },

  // ─── BLOG INDEX ───────────────────────────────────────────────────────────

  "/sa/blog": {
    title: "Legal Blog for Saudi Arabia | CounselO Legal",
    description:
      "Practical legal guides for Saudi Arabia covering family law, employment, real estate, corporate law, contracts, investment, and dispute resolution.",
  },
  "/sa/ar/blog": {
    title: "مدونة قانونية للسعودية | كاونسلو للاستشارات القانونية",
    description:
      "مقالات وإرشادات قانونية عملية في السعودية حول الأسرة والعمل والعقارات والشركات والعقود والاستثمار وتسوية النزاعات.",
  },
  "/syr/blog": {
    title: "Legal Blog for Syria | CounselO Legal",
    description:
      "Practical legal guides for Syria covering family law, employment, real estate, corporate law, contracts, investment, and dispute resolution.",
  },
  "/syr/ar/blog": {
    title: "مدونة قانونية لسوريا | كاونسلو للاستشارات القانونية",
    description:
      "مقالات وإرشادات قانونية عملية في سوريا حول الأسرة والعمل والعقارات والشركات والعقود والاستثمار وتسوية النزاعات.",
  },

  // ─── LEGAL PAGES ─────────────────────────────────────────────────────────

  "/sa/terms-of-service": {
    title: "Terms of Service | CounselO Legal Saudi Arabia",
    description:
      "Read how CounselO’s team handles legal matters in Saudi Arabia, from agreeing the work, fees and authorization to advice, representation and follow-up.",
  },
  "/sa/ar/terms-of-service": {
    title: "شروط الخدمة في السعودية | كاونسلو",
    description:
      "تعرّف على آلية عمل فريق كاونسلو في السعودية، من الاتفاق على نطاق العمل والأتعاب والتفويض إلى الاستشارة والتمثيل القانوني والمتابعة.",
  },
  "/syr/terms-of-service": {
    title: "Terms of Service | CounselO Legal Syria",
    description:
      "Read how CounselO’s team handles legal matters in Syria, from agreeing the work, fees and authorization to advice, representation and follow-up.",
  },
  "/syr/ar/terms-of-service": {
    title: "شروط الخدمة في سوريا | كاونسلو",
    description:
      "تعرّف على آلية عمل فريق كاونسلو في سوريا، من الاتفاق على نطاق العمل والأتعاب والتفويض إلى الاستشارة والتمثيل القانوني والمتابعة.",
  },
  "/sa/privacy-policy": {
    title: "Privacy Policy | CounselO Legal Saudi Arabia",
    description:
      "Learn how CounselO Legal collects, protects, and handles legal consultation data in Saudi Arabia under applicable professional, privacy and data-protection obligations.",
  },
  "/sa/ar/privacy-policy": {
    title: "سياسة الخصوصية | كاونسلو للاستشارات القانونية السعودية",
    description:
      "تعرف على كيفية جمع كاونسلو للاستشارات القانونية لبيانات الاستشارة القانونية في السعودية وحمايتها والحفاظ على سرية معلومات العملاء التامة.",
  },
  "/syr/privacy-policy": {
    title: "Privacy Policy | CounselO Legal Syria",
    description:
      "Learn how CounselO Legal collects, protects, and handles legal consultation data in Syria under applicable professional, privacy and data-protection obligations.",
  },
  "/syr/ar/privacy-policy": {
    title: "سياسة الخصوصية | كاونسلو للاستشارات القانونية سوريا",
    description:
      "تعرف على كيفية جمع كاونسلو للاستشارات القانونية لبيانات الاستشارة القانونية في سوريا وحمايتها والحفاظ على سرية معلومات العملاء التامة.",
  },

  // ─── SA ENGLISH SERVICE PAGES ────────────────────────────────────────────

  "/sa/services/family-law": {
    title: "Family, Divorce & Custody Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s family law lawyers in Saudi Arabia provide online advice and legal representation for divorce, custody, alimony, and personal status matters.",
  },
  "/sa/services/employment-law": {
    title: "Employment & Wrongful Termination Lawyer in Saudi Arabia",
    description:
      "CounselO’s employment lawyers in Saudi Arabia provide online advice and legal representation for employment contracts, termination, wages, workplace disputes, and labor rights.",
  },
  "/sa/services/business-law": {
    title: "Commercial Law Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s commercial lawyers in Saudi Arabia provide online advice and legal representation for business disputes, contracts, trading practices, and commercial liability claims.",
  },
  "/sa/services/real-estate": {
    title: "Real Estate Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s real estate lawyers in Saudi Arabia provide online advice and legal representation for property ownership, sale contracts, leases, registration, and construction disputes.",
  },
  "/sa/services/foreign-investment": {
    title: "Foreign Investment & Company Formation Lawyer in Saudi Arabia",
    description:
      "CounselO’s lawyers support foreign investment in Saudi Arabia: licensing, company formation, compliance, contracts and representation in investor disputes.",
  },
  "/sa/services/administrative-law": {
    title: "Administrative Law Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s administrative lawyers in Saudi Arabia provide online advice and legal representation for government decisions, administrative objections, and public authority disputes.",
  },
  "/sa/services/arbitration": {
    title: "Arbitration Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s arbitration lawyers in Saudi Arabia provide online advice and legal representation for commercial disputes, mediation procedures, award enforcement, and settlements.",
  },
  "/sa/services/enforcement": {
    title: "Debt Recovery Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s debt recovery lawyers in Saudi Arabia provide online advice and legal representation for judgment execution, debt collection, payment claims, and enforcement procedures.",
  },
  "/sa/services/companies-law": {
    title: "Corporate Law Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s corporate lawyers in Saudi Arabia provide online advice and legal representation for company formation, commercial contracts, governance, compliance, and business disputes.",
  },
  "/sa/services/contracts": {
    title: "Contract Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s contract lawyers in Saudi Arabia provide online advice and legal representation for contract drafting, review, breach of contract, termination, and negotiation.",
  },
  "/sa/services/criminal-law": {
    title: "Criminal Defense Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s criminal lawyers in Saudi Arabia provide online advice and legal representation for criminal complaints, investigations, defense options, and court procedures.",
  },
  "/sa/services/banking-finance": {
    title: "Banking & Finance Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s banking lawyers in Saudi Arabia provide online advice and legal representation for bank disputes, finance contracts, regulatory compliance, and Islamic finance matters.",
  },
  "/sa/services/intellectual-property": {
    title: "Intellectual Property Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s intellectual property lawyers in Saudi Arabia provide online advice and legal representation for trademarks, copyrights, patents, and IP protection matters.",
  },
  "/sa/services/tax-zakat": {
    title: "Tax & Zakat Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s tax lawyers in Saudi Arabia provide online advice and legal representation for VAT compliance, zakat obligations, customs duties, tax assessments, and objections.",
  },
  "/sa/services/cyber-law": {
    title: "Cybercrime Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s cybercrime lawyers in Saudi Arabia provide online advice and legal representation for cybercrime, online defamation, data protection, and digital evidence.",
  },
  "/sa/services/medical-malpractice": {
    title: "Medical Malpractice Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s medical malpractice lawyers in Saudi Arabia provide online advice and legal representation for negligence claims, misdiagnosis, surgical errors, and compensation.",
  },
  "/sa/services/insurance-law": {
    title: "Insurance Lawyer in Saudi Arabia | CounselO Legal",
    description:
      "CounselO’s insurance lawyers in Saudi Arabia provide online advice and legal representation for claim denial, policy disputes, insurer liability, and settlement matters.",
  },

  // ─── SA ARABIC SERVICE PAGES ─────────────────────────────────────────────

  "/sa/ar/services/family-law": {
    title: "محامي أحوال شخصية في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في الطلاق والحضانة والنفقة والزواج.",
  },
  "/sa/ar/services/employment-law": {
    title: "محامي عمالي في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في عقود العمل والفصل والرواتب والنزاعات العمالية وحقوق الموظفين.",
  },
  "/sa/ar/services/business-law": {
    title: "محامي تجاري في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في النزاعات التجارية والعقود والمعاملات والمسؤولية.",
  },
  "/sa/ar/services/real-estate": {
    title: "محامي عقاري في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في نزاعات الملكية والإيجار والبيع والتسجيل وعيوب البناء.",
  },
  "/sa/ar/services/foreign-investment": {
    title: "محامي استثمار أجنبي وتأسيس شركات في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في تراخيص الاستثمار وتأسيس الشركات الأجنبية والامتثال والعقود ومنازعات المستثمرين.",
  },
  "/sa/ar/services/administrative-law": {
    title: "محامي إداري في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في القرارات الحكومية والطعون الإدارية والمنازعات مع الجهات العامة.",
  },
  "/sa/ar/services/arbitration": {
    title: "محامي تحكيم في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في التحكيم التجاري والوساطة وتسوية النزاعات وتنفيذ الأحكام.",
  },
  "/sa/ar/services/enforcement": {
    title: "محامي تنفيذ وتحصيل ديون في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في تنفيذ الأحكام وتحصيل الديون والمطالبات المالية وإجراءات التنفيذ.",
  },
  "/sa/ar/services/companies-law": {
    title: "محامي شركات في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في تأسيس الشركات والعقود التجارية والحوكمة والامتثال والنزاعات.",
  },
  "/sa/ar/services/contracts": {
    title: "محامي عقود في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في صياغة العقود ومراجعتها والإخلال بالعقد والفسخ والتنفيذ.",
  },
  "/sa/ar/services/criminal-law": {
    title: "محامي جزائي في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في الشكاوى الجزائية والتحقيقات والإجراءات والخيارات القانونية.",
  },
  "/sa/ar/services/banking-finance": {
    title: "محامي مصرفي وتمويل في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في النزاعات البنكية وعقود التمويل والامتثال والتمويل الإسلامي.",
  },
  "/sa/ar/services/intellectual-property": {
    title: "محامي ملكية فكرية في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في العلامات التجارية وحقوق المؤلف والبراءات والأسرار التجارية.",
  },
  "/sa/ar/services/tax-zakat": {
    title: "محامي ضرائب وزكاة في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في ضريبة القيمة المضافة والزكاة والجمارك وتقييمات الدخل والاعتراضات.",
  },
  "/sa/ar/services/cyber-law": {
    title: "محامي جرائم إلكترونية في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في الجرائم الرقمية والتشهير وحماية البيانات والأدلة الإلكترونية.",
  },
  "/sa/ar/services/medical-malpractice": {
    title: "محامي أخطاء طبية في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في الإهمال الطبي والأخطاء الجراحية وسوء التشخيص والتعويضات.",
  },
  "/sa/ar/services/insurance-law": {
    title: "محامي تأمين في السعودية | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في السعودية يقدم الاستشارة أونلاين والتمثيل القانوني في رفض التعويضات ومنازعات وثائق التأمين والمسؤولية التأمينية.",
  },

  // ─── SYRIA ENGLISH SERVICE PAGES ─────────────────────────────────────────

  "/syr/services/family-law": {
    title: "Family, Divorce & Child Custody Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s family law lawyers in Syria provide online advice and legal representation for divorce, custody, alimony, and personal status matters.",
  },
  "/syr/services/employment-law": {
    title: "Employment & Wrongful Termination Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s employment lawyers in Syria provide online advice and legal representation for employment contracts, wrongful termination, unpaid wages, and workplace disputes.",
  },
  "/syr/services/business-law": {
    title: "Commercial Law Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s commercial lawyers in Syria provide online advice and legal representation for business disputes, contracts, trading practices, and commercial liability matters.",
  },
  "/syr/services/real-estate": {
    title: "Real Estate Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s real estate lawyers in Syria provide online advice and legal representation for property ownership, sales, leases, inheritance, registration, and property disputes.",
  },
  "/syr/services/foreign-investment": {
    title: "Foreign Investment Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s foreign investment lawyers in Syria provide online advice and legal representation for company registration, business licensing, compliance, and entry procedures.",
  },
  "/syr/services/administrative-law": {
    title: "Administrative Law Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s administrative lawyers in Syria provide online advice and legal representation for government decisions, public authority disputes, and objection procedures.",
  },
  "/syr/services/arbitration": {
    title: "Arbitration Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s arbitration lawyers in Syria provide online advice and legal representation for commercial disputes, mediation procedures, award enforcement, and settlements.",
  },
  "/syr/services/enforcement": {
    title: "Debt Recovery Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s debt recovery lawyers in Syria provide online advice and legal representation for judgment execution, debt collection, payment claims, and enforcement procedures.",
  },
  "/syr/services/companies-law": {
    title: "Corporate Law Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s corporate lawyers in Syria provide online advice and legal representation for company formation, shareholder disputes, governance, compliance, and dissolution.",
  },
  "/syr/services/contracts": {
    title: "Contract Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s contract lawyers in Syria provide online advice and legal representation for contract drafting, review, breach of contract, termination, and negotiation.",
  },
  "/syr/services/criminal-law": {
    title: "Criminal Defense Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s criminal lawyers in Syria provide online advice and legal representation for criminal complaints, investigations, defense options, and court procedures.",
  },
  "/syr/services/banking-finance": {
    title: "Banking & Finance Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s banking lawyers in Syria provide online advice and legal representation for bank disputes, finance contracts, regulatory compliance, and credit matters.",
  },
  "/syr/services/intellectual-property": {
    title: "Intellectual Property Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s intellectual property lawyers in Syria provide online advice and legal representation for trademarks, copyrights, patents, trade secrets, and infringement claims.",
  },
  "/syr/services/tax-zakat": {
    title: "Tax Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s tax lawyers in Syria provide online advice and legal representation for income tax compliance, customs duties, tax assessments, objection procedures, and fiscal disputes.",
  },
  "/syr/services/cyber-law": {
    title: "Cybercrime Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s cybercrime lawyers in Syria provide online advice and legal representation for cybercrime, online defamation, data protection, and digital evidence.",
  },
  "/syr/services/medical-malpractice": {
    title: "Medical Malpractice Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s medical malpractice lawyers in Syria provide online advice and legal representation for negligence claims, misdiagnosis, surgical errors, and compensation matters.",
  },
  "/syr/services/insurance-law": {
    title: "Insurance Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s insurance lawyers in Syria provide online advice and legal representation for claim denial, policy disputes, insurer liability, and settlement negotiations.",
  },
  "/syr/services/civil-law": {
    title: "Civil Law Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s civil law lawyers in Syria provide online advice and legal representation for civil claims, contractual obligations, compensation, and private legal disputes.",
  },
  "/syr/services/civil-procedure": {
    title: "Civil Procedure Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s civil procedure lawyers in Syria provide online advice and legal representation for litigation steps, filing requirements, evidence rules, appeals, and court deadlines.",
  },
  "/syr/services/criminal-procedure": {
    title: "Criminal Procedure Lawyer in Syria | CounselO Legal",
    description:
      "CounselO’s criminal procedure lawyers in Syria provide online advice and legal representation for investigation rights, detention, evidence rules, and appeals.",
  },

  // ─── SYRIA ARABIC SERVICE PAGES ──────────────────────────────────────────

  "/syr/ar/services/family-law": {
    title: "محامي أحوال شخصية في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في الطلاق والحضانة والنفقة والميراث.",
  },
  "/syr/ar/services/employment-law": {
    title: "محامي عمالي في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في عقود العمل والفصل التعسفي والأجور والنزاعات العمالية وحقوق الموظف.",
  },
  "/syr/ar/services/business-law": {
    title: "محامي تجاري في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في النزاعات التجارية والعقود والمعاملات التجارية والمسؤولية القانونية.",
  },
  "/syr/ar/services/real-estate": {
    title: "محامي عقاري في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في البيع والشراء والإيجار والتسجيل ونزاعات الملكية العقارية.",
  },
  "/syr/ar/services/foreign-investment": {
    title: "محامي استثمار أجنبي في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في تسجيل الشركات والترخيص والامتثال التنظيمي والدخول التجاري.",
  },
  "/syr/ar/services/administrative-law": {
    title: "محامي إداري في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في القرارات الحكومية والطعون الإدارية والمنازعات مع الجهات العامة.",
  },
  "/syr/ar/services/arbitration": {
    title: "محامي تحكيم في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في التحكيم التجاري والوساطة وتسوية النزاعات وتنفيذ الأحكام التحكيمية.",
  },
  "/syr/ar/services/enforcement": {
    title: "محامي تنفيذ وتحصيل ديون في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في تنفيذ الأحكام وتحصيل الديون والمطالبات المالية وإجراءات التنفيذ القضائي.",
  },
  "/syr/ar/services/companies-law": {
    title: "محامي شركات في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في تأسيس الشركات ونزاعات الشركاء والحوكمة والامتثال وتصفية الشركات.",
  },
  "/syr/ar/services/contracts": {
    title: "محامي عقود في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في صياغة العقود ومراجعتها والإخلال بالعقد والفسخ والتنفيذ القانوني.",
  },
  "/syr/ar/services/criminal-law": {
    title: "محامي جزائي في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في الشكاوى الجزائية والتحقيقات والإجراءات والخيارات القانونية المتاحة.",
  },
  "/syr/ar/services/banking-finance": {
    title: "محامي مصرفي وتمويل في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في النزاعات البنكية وعقود التمويل والامتثال التنظيمي والقانون المصرفي.",
  },
  "/syr/ar/services/intellectual-property": {
    title: "محامي ملكية فكرية في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في العلامات التجارية وحقوق المؤلف والبراءات والأسرار التجارية.",
  },
  "/syr/ar/services/tax-zakat": {
    title: "محامي ضرائب في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في ضريبة الدخل والجمارك والتقييمات الضريبية وإجراءات الاعتراض.",
  },
  "/syr/ar/services/cyber-law": {
    title: "محامي جرائم إلكترونية في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في الجرائم الرقمية والتشهير وحماية البيانات والأدلة الإلكترونية.",
  },
  "/syr/ar/services/medical-malpractice": {
    title: "محامي أخطاء طبية في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في الإهمال الطبي والأخطاء الجراحية وسوء التشخيص والتعويضات.",
  },
  "/syr/ar/services/insurance-law": {
    title: "محامي تأمين في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في رفض التعويضات ومنازعات وثائق التأمين والمسؤولية التأمينية والتسوية.",
  },
  "/syr/ar/services/civil-law": {
    title: "محامي قانون مدني في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في الدعاوى المدنية والالتزامات والتعويض وحقوق الملكية الخاصة.",
  },
  "/syr/ar/services/civil-procedure": {
    title: "محامي أصول محاكمات مدنية في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في الإجراءات والمواعيد والأدلة والاختصاص والطعون.",
  },
  "/syr/ar/services/criminal-procedure": {
    title: "محامي أصول محاكمات جزائية في سوريا | كاونسلو للاستشارات القانونية",
    description:
      "فريق كاونسلو في سوريا يقدم الاستشارة أونلاين والتمثيل القانوني في التحقيق والتوقيف والأدلة والطعون والحقوق الإجرائية.",
  },

  // ─── SA ENGLISH BLOG POSTS ────────────────────────────────────────────────

  "/sa/blog/divorce-in-saudi-arabia": {
    title: "Divorce in Saudi Arabia | Rights & Legal Process | CounselO Legal",
    description:
      "Learn about divorce, khula, annulment, custody, alimony, and documentation under Saudi family law before consulting the CounselO team online.",
  },
  "/sa/blog/wrongful-termination-saudi-labor-law": {
    title: "Wrongful Termination in Saudi Arabia | Legal Guide | CounselO Legal",
    description:
      "Learn the main rules for terminating employment contracts in Saudi Arabia, including notice periods, employee rights, compensation, and legal procedures.",
  },
  "/sa/blog/foreign-company-registration-saudi-arabia": {
    title: "Foreign Company Registration in Saudi Arabia | CounselO Legal",
    description:
      "A legal guide to foreign company registration in Saudi Arabia covering investment licensing, commercial registration, company forms, and key procedures.",
  },
  "/sa/blog/board-of-grievances-saudi-arabia": {
    title: "Board of Grievances in Saudi Arabia | Legal Guide | CounselO Legal",
    description:
      "Learn when and how to challenge government decisions before Saudi Arabia's Board of Grievances, including standing, deadlines, evidence, and legal strategy.",
  },
  "/sa/blog/real-estate-disputes-saudi-arabia": {
    title: "Real Estate Disputes in Saudi Arabia | Legal Guide | CounselO Legal",
    description:
      "Understand your legal options for property disputes in Saudi Arabia, including ownership claims, lease conflicts, construction defects, and compensation.",
  },
  "/sa/blog/child-custody-saudi-arabia": {
    title: "Child Custody in Saudi Arabia | Rights & Process | CounselO Legal",
    description:
      "Understand child custody, guardianship, visitation rights, and best-interest standards in Saudi family law before booking a legal consultation.",
  },

  // ─── SA ARABIC BLOG POSTS ────────────────────────────────────────────────

  "/sa/ar/blog/divorce-in-saudi-arabia": {
    title: "الطلاق في السعودية: الحقوق والإجراءات | دليل قانوني | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على أحكام الطلاق والخلع والفسخ والحضانة والنفقة والتوثيق في المملكة العربية السعودية قبل طلب استشارة قانونية متخصصة.",
  },
  "/sa/ar/blog/wrongful-termination-saudi-labor-law": {
    title: "الفصل التعسفي في السعودية | حقوق الموظف | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على أحكام إنهاء عقد العمل في السعودية، بما يشمل الإشعار والتعويض وحقوق الموظف والإجراءات القانونية الأساسية.",
  },
  "/sa/ar/blog/foreign-company-registration-saudi-arabia": {
    title: "تسجيل شركة أجنبية في السعودية | دليل قانوني | كاونسلو للاستشارات القانونية",
    description:
      "دليل قانوني حول تسجيل الشركات الأجنبية في السعودية، يشمل الترخيص الاستثماري والسجل التجاري وأنواع الشركات والإجراءات الأساسية.",
  },
  "/sa/ar/blog/board-of-grievances-saudi-arabia": {
    title: "ديوان المظالم في السعودية | دليل قانوني | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على اختصاص ديوان المظالم في السعودية، ومتى يمكن الطعن في القرارات الإدارية، والمواعيد والمستندات المطلوبة.",
  },
  "/sa/ar/blog/real-estate-disputes-saudi-arabia": {
    title: "النزاعات العقارية في السعودية | دليل قانوني | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على خياراتك القانونية في نزاعات العقارات بالسعودية، بما يشمل الملكية والإيجار وعيوب البناء والتعويض.",
  },
  "/sa/ar/blog/child-custody-saudi-arabia": {
    title: "الحضانة في السعودية | الحقوق والإجراءات | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على أحكام الحضانة والولاية والزيارة ومعايير مصلحة المحضون في السعودية قبل طلب استشارة قانونية متخصصة.",
  },

  // ─── SYRIA ENGLISH BLOG POSTS — CANONICAL ────────────────────────────────

  "/syr/blog/administrative-court-disputes-syria": {
    title: "Administrative Court Disputes in Syria | Legal Guide | CounselO Legal",
    description:
      "Learn how administrative disputes are handled before Syrian courts, including challenges to public authority decisions, deadlines, evidence, and legal strategy.",
  },
  "/syr/blog/child-custody-syria": {
    title: "Child Custody in Syria | Rights & Process | CounselO Legal",
    description:
      "Understand child custody, guardianship, visitation rights, and family-law standards in Syria before consulting the CounselO team online.",
  },
  "/syr/blog/divorce-in-syria": {
    title: "Divorce in Syria | Rights & Legal Process | CounselO Legal",
    description:
      "Learn about divorce, separation, custody, alimony, and documentation procedures under Syrian family law before getting professional legal advice.",
  },
  "/syr/blog/foreign-company-registration-syria": {
    title: "Foreign Company Registration in Syria | Legal Guide | CounselO Legal",
    description:
      "A legal guide to foreign company registration in Syria covering business licensing, commercial registration, available company forms, and key procedures.",
  },
  "/syr/blog/real-estate-disputes-syria": {
    title: "Real Estate Disputes in Syria | Legal Guide | CounselO Legal",
    description:
      "Understand your legal options for property disputes in Syria, including ownership claims, lease conflicts, construction defects, and compensation.",
  },
  "/syr/blog/wrongful-termination-syrian-labor-law": {
    title: "Wrongful Termination in Syria | Legal Guide | CounselO Legal",
    description:
      "Understand wrongful termination under Syrian labor law, including employee rights, notice periods, compensation, evidence requirements, and legal options.",
  },

  // ─── SYRIA ARABIC BLOG POSTS — CANONICAL ─────────────────────────────────

  "/syr/ar/blog/administrative-court-disputes-syria": {
    title: "المنازعات الإدارية في سوريا | دليل قانوني | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على إجراءات المنازعات الإدارية أمام القضاء السوري، والطعن في قرارات الجهات العامة، والمواعيد والمستندات المطلوبة.",
  },
  "/syr/ar/blog/child-custody-syria": {
    title: "الحضانة في سوريا | الحقوق والإجراءات | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على أحكام الحضانة والولاية والزيارة والمسائل الأسرية في سوريا قبل طلب استشارة قانونية متخصصة.",
  },
  "/syr/ar/blog/divorce-in-syria": {
    title: "الطلاق في سوريا | الحقوق والإجراءات | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على أحكام الطلاق والتفريق والحضانة والنفقة والتوثيق في سوريا قبل طلب استشارة قانونية متخصصة.",
  },
  "/syr/ar/blog/foreign-company-registration-syria": {
    title: "تسجيل شركة أجنبية في سوريا | دليل قانوني | كاونسلو للاستشارات القانونية",
    description:
      "دليل قانوني حول تسجيل الشركات الأجنبية في سوريا، يشمل الترخيص التجاري والسجل التجاري وأنواع الشركات والإجراءات الأساسية.",
  },
  "/syr/ar/blog/real-estate-disputes-syria": {
    title: "النزاعات العقارية في سوريا | دليل قانوني | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على خياراتك القانونية في نزاعات العقارات في سوريا، بما يشمل الملكية والإيجار وعيوب البناء والتعويض والتسجيل.",
  },
  "/syr/ar/blog/wrongful-termination-syrian-labor-law": {
    title: "الفصل التعسفي في سوريا | حقوق العامل | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على حقوق العامل عند الفصل التعسفي في سوريا، والتعويضات والأدلة والمواعيد والإجراءات القانونية الأساسية.",
  },

  // ─── REDIRECT SOURCES (canonicalOverride — do not change these) ──────────

  "/syr/blog/board-of-grievances-saudi-arabia": {
    title: "Administrative Court Disputes in Syria | Legal Guide | CounselO Legal",
    description:
      "Learn how administrative disputes are handled before Syrian courts, including challenges to public authority decisions, deadlines, evidence, and legal strategy.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/administrative-court-disputes-syria",
  },
  "/syr/blog/child-custody-saudi-arabia": {
    title: "Child Custody in Syria | Rights & Process | CounselO Legal",
    description:
      "Understand child custody, guardianship, visitation rights, and family-law standards in Syria before consulting the CounselO team online.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/child-custody-syria",
  },
  "/syr/blog/divorce-in-saudi-arabia": {
    title: "Divorce in Syria | Rights & Legal Process | CounselO Legal",
    description:
      "Learn about divorce, separation, custody, alimony, and documentation procedures under Syrian family law before getting professional legal advice.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/divorce-in-syria",
  },
  "/syr/blog/foreign-company-registration-saudi-arabia": {
    title: "Foreign Company Registration in Syria | Legal Guide | CounselO Legal",
    description:
      "A legal guide to foreign company registration in Syria covering business licensing, commercial registration, available company forms, and key procedures.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/foreign-company-registration-syria",
  },
  "/syr/blog/real-estate-disputes-saudi-arabia": {
    title: "Real Estate Disputes in Syria | Legal Guide | CounselO Legal",
    description:
      "Understand your legal options for property disputes in Syria, including ownership claims, lease conflicts, construction defects, and compensation.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/real-estate-disputes-syria",
  },
  "/syr/blog/wrongful-termination-saudi-labor-law": {
    title: "Wrongful Termination in Syria | Legal Guide | CounselO Legal",
    description:
      "Understand wrongful termination under Syrian labor law, including employee rights, notice periods, compensation, evidence requirements, and legal options.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/wrongful-termination-syrian-labor-law",
  },
  "/syr/ar/blog/board-of-grievances-saudi-arabia": {
    title: "المنازعات الإدارية في سوريا | دليل قانوني | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على إجراءات المنازعات الإدارية أمام القضاء السوري، والطعن في قرارات الجهات العامة، والمواعيد والمستندات المطلوبة.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/administrative-court-disputes-syria",
  },
  "/syr/ar/blog/child-custody-saudi-arabia": {
    title: "الحضانة في سوريا | الحقوق والإجراءات | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على أحكام الحضانة والولاية والزيارة والمسائل الأسرية في سوريا قبل طلب استشارة قانونية متخصصة.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/child-custody-syria",
  },
  "/syr/ar/blog/divorce-in-saudi-arabia": {
    title: "الطلاق في سوريا | الحقوق والإجراءات | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على أحكام الطلاق والتفريق والحضانة والنفقة والتوثيق في سوريا قبل طلب استشارة قانونية متخصصة.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/divorce-in-syria",
  },
  "/syr/ar/blog/foreign-company-registration-saudi-arabia": {
    title: "تسجيل شركة أجنبية في سوريا | دليل قانوني | كاونسلو للاستشارات القانونية",
    description:
      "دليل قانوني حول تسجيل الشركات الأجنبية في سوريا، يشمل الترخيص التجاري والسجل التجاري وأنواع الشركات والإجراءات الأساسية.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/foreign-company-registration-syria",
  },
  "/syr/ar/blog/real-estate-disputes-saudi-arabia": {
    title: "النزاعات العقارية في سوريا | دليل قانوني | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على خياراتك القانونية في نزاعات العقارات في سوريا، بما يشمل الملكية والإيجار وعيوب البناء والتعويض والتسجيل.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/real-estate-disputes-syria",
  },
  "/syr/ar/blog/wrongful-termination-saudi-labor-law": {
    title: "الفصل التعسفي في سوريا | حقوق العامل | كاونسلو للاستشارات القانونية",
    description:
      "تعرف على حقوق العامل عند الفصل التعسفي في سوريا، والتعويضات والأدلة والمواعيد والإجراءات القانونية الأساسية.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/wrongful-termination-syrian-labor-law",
  },
};
