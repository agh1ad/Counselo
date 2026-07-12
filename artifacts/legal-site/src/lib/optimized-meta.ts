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
    title: "Family Law Consultation in Saudi Arabia | Counselo",
    description:
      "Book a confidential online family law consultation in Saudi Arabia. Get professional guidance on divorce, custody, alimony, and personal status matters.",
  },
  "/sa/services/employment-law": {
    title: "Employment Law Consultation in Saudi Arabia | Counselo",
    description:
      "Get online legal guidance in Saudi Arabia for employment contracts, termination, wages, workplace disputes, employee rights, and employer obligations.",
  },
  "/sa/services/business-law": {
    title: "Business Law Consultation in Saudi Arabia | Counselo",
    description:
      "Book an online business law consultation in Saudi Arabia. Get professional guidance on commercial disputes, contracts, trading practices, and liability claims.",
  },
  "/sa/services/real-estate": {
    title: "Real Estate Legal Consultation in Saudi Arabia | Counselo",
    description:
      "Book an online real estate consultation in Saudi Arabia for property ownership, sale contracts, leases, registration, and construction disputes.",
  },
  "/sa/services/foreign-investment": {
    title: "Immigration Legal Consultation in Saudi Arabia | Counselo",
    description:
      "Get online legal guidance in Saudi Arabia for residency, visas, sponsorship, immigration procedures, documentation, and related legal matters.",
  },
  "/sa/services/administrative-law": {
    title: "Administrative Law Consultation in Saudi Arabia | Counselo",
    description:
      "Get online legal guidance in Saudi Arabia on government decisions, administrative objections, regulatory compliance, and public authority disputes.",
  },
  "/sa/services/arbitration": {
    title: "Arbitration & Mediation Consultation in Saudi Arabia | Counselo",
    description:
      "Book an online arbitration consultation in Saudi Arabia for commercial disputes, mediation procedures, award enforcement, and settlement agreements.",
  },
  "/sa/services/enforcement": {
    title: "Debt Enforcement Consultation in Saudi Arabia | Counselo",
    description:
      "Book an online debt enforcement consultation in Saudi Arabia. Get professional guidance on judgment execution, debt recovery, and payment claims.",
  },
  "/sa/services/companies-law": {
    title: "Corporate Law Consultation in Saudi Arabia | Counselo",
    description:
      "Book an online corporate law consultation in Saudi Arabia for company formation, commercial contracts, governance, compliance, and business disputes.",
  },
  "/sa/services/contracts": {
    title: "Contract Law Consultation in Saudi Arabia | Counselo",
    description:
      "Get confidential online legal guidance in Saudi Arabia for contract drafting, review, breach of contract, termination, negotiation, and disputes.",
  },
  "/sa/services/criminal-law": {
    title: "Criminal Law Consultation in Saudi Arabia | Counselo",
    description:
      "Get confidential online legal guidance in Saudi Arabia regarding criminal complaints, investigations, procedures, defense options, and related matters.",
  },
  "/sa/services/banking-finance": {
    title: "Banking & Finance Legal Consultation in Saudi Arabia | Counselo",
    description:
      "Book a confidential online consultation in Saudi Arabia for banking disputes, finance contracts, regulatory compliance, and Islamic finance matters.",
  },
  "/sa/services/intellectual-property": {
    title: "Intellectual Property Consultation in Saudi Arabia | Counselo",
    description:
      "Book a confidential online intellectual property consultation in Saudi Arabia for trademarks, copyrights, patents, and IP protection matters.",
  },
  "/sa/services/tax-zakat": {
    title: "Tax & Zakat Legal Consultation in Saudi Arabia | Counselo",
    description:
      "Book a confidential online tax consultation in Saudi Arabia for VAT compliance, zakat obligations, customs duties, tax assessments, and objections.",
  },
  "/sa/services/cyber-law": {
    title: "Cybercrime Legal Consultation in Saudi Arabia | Counselo",
    description:
      "Get confidential online legal consultation in Saudi Arabia for cybercrime, online defamation, data protection violations, and digital evidence matters.",
  },
  "/sa/services/medical-malpractice": {
    title: "Medical Malpractice Consultation in Saudi Arabia | Counselo",
    description:
      "Book a confidential online medical malpractice consultation in Saudi Arabia for negligence claims, misdiagnosis, and compensation matters.",
  },
  "/sa/services/insurance-law": {
    title: "Insurance Law Consultation in Saudi Arabia | Counselo",
    description:
      "Book a confidential online insurance law consultation in Saudi Arabia for claim denial, policy disputes, and insurer liability matters.",
  },

  // ─── SA ARABIC SERVICE PAGES ─────────────────────────────────────────────

  "/sa/ar/services/family-law": {
    title: "استشارة قانونية في الأحوال الشخصية بالسعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في قضايا الأحوال الشخصية بالسعودية، بما يشمل الطلاق والحضانة والنفقة والزواج، عبر كاونسلو.",
  },
  "/sa/ar/services/employment-law": {
    title: "استشارة قانونية في نظام العمل السعودي | كاونسلو",
    description:
      "احصل على استشارة قانونية أونلاين بشأن عقود العمل والفصل والرواتب والنزاعات العمالية وحقوق الموظفين في السعودية عبر كاونسلو.",
  },
  "/sa/ar/services/business-law": {
    title: "استشارة قانونية في النزاعات التجارية بالسعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في النزاعات التجارية والعقود والمعاملات التجارية والمسؤولية القانونية في السعودية عبر كاونسلو.",
  },
  "/sa/ar/services/real-estate": {
    title: "استشارة قانونية في العقارات بالسعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في قضايا العقارات بالسعودية، بما يشمل نزاعات الملكية والإيجار والبيع والتسجيل وعيوب البناء.",
  },
  "/sa/ar/services/foreign-investment": {
    title: "استشارة قانونية في الإقامة والهجرة بالسعودية | كاونسلو",
    description:
      "احصل على استشارة قانونية أونلاين بشأن الإقامة والتأشيرات والكفالة وإجراءات الهجرة والمستندات القانونية في السعودية عبر كاونسلو.",
  },
  "/sa/ar/services/administrative-law": {
    title: "استشارة قانونية في القانون الإداري بالسعودية | كاونسلو",
    description:
      "احصل على استشارة قانونية أونلاين بشأن القرارات الحكومية والطعون الإدارية والمنازعات مع الجهات العامة في السعودية عبر كاونسلو.",
  },
  "/sa/ar/services/arbitration": {
    title: "استشارة قانونية في التحكيم والوساطة بالسعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في التحكيم التجاري والوساطة وتسوية النزاعات وتنفيذ الأحكام التحكيمية في السعودية عبر كاونسلو.",
  },
  "/sa/ar/services/enforcement": {
    title: "استشارة قانونية في التنفيذ وتحصيل الديون بالسعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في تنفيذ الأحكام وتحصيل الديون والمطالبات المالية وإجراءات التنفيذ القضائي في السعودية عبر كاونسلو.",
  },
  "/sa/ar/services/companies-law": {
    title: "استشارة قانونية في نظام الشركات بالسعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في تأسيس الشركات والعقود التجارية والحوكمة والامتثال والنزاعات التجارية في السعودية عبر كاونسلو.",
  },
  "/sa/ar/services/contracts": {
    title: "استشارة قانونية في العقود بالسعودية | كاونسلو",
    description:
      "احصل على استشارة قانونية أونلاين في صياغة العقود ومراجعتها والإخلال بالعقد والفسخ والتنفيذ القانوني في السعودية عبر كاونسلو.",
  },
  "/sa/ar/services/criminal-law": {
    title: "استشارة قانونية في القضايا الجزائية بالسعودية | كاونسلو",
    description:
      "احصل على استشارة قانونية أونلاين بسرية في القضايا الجزائية بالسعودية، بما يشمل الشكاوى والتحقيقات والإجراءات والخيارات القانونية.",
  },
  "/sa/ar/services/banking-finance": {
    title: "استشارة قانونية في المصارف والتمويل بالسعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في النزاعات المصرفية وعقود التمويل والامتثال التنظيمي والتمويل الإسلامي في السعودية عبر كاونسلو.",
  },
  "/sa/ar/services/intellectual-property": {
    title: "استشارة قانونية في الملكية الفكرية بالسعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في الملكية الفكرية بالسعودية، بما يشمل العلامات التجارية وحقوق المؤلف والبراءات والأسرار التجارية.",
  },
  "/sa/ar/services/tax-zakat": {
    title: "استشارة قانونية في الضرائب والزكاة بالسعودية | كاونسلو",
    description:
      "احصل على استشارة قانونية أونلاين بشأن ضريبة القيمة المضافة والزكاة والجمارك وتقييمات الدخل وإجراءات الاعتراض في السعودية عبر كاونسلو.",
  },
  "/sa/ar/services/cyber-law": {
    title: "استشارة قانونية في الجرائم الإلكترونية بالسعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في الجرائم الإلكترونية والتشهير الرقمي وحماية البيانات والأدلة الإلكترونية في السعودية عبر كاونسلو.",
  },
  "/sa/ar/services/medical-malpractice": {
    title: "استشارة قانونية في الأخطاء الطبية بالسعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في دعاوى الإهمال الطبي والأخطاء الجراحية وسوء التشخيص والتعويضات الطبية في السعودية عبر كاونسلو.",
  },
  "/sa/ar/services/insurance-law": {
    title: "استشارة قانونية في التأمين بالسعودية | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في رفض التعويضات ومنازعات وثائق التأمين والمسؤولية التأمينية والتسوية في السعودية عبر كاونسلو.",
  },

  // ─── SYRIA ENGLISH SERVICE PAGES ─────────────────────────────────────────

  "/syr/services/family-law": {
    title: "Family Law Consultation in Syria | Counselo",
    description:
      "Book a confidential online family law consultation in Syria. Receive professional guidance on divorce, custody, alimony, and personal status matters.",
  },
  "/syr/services/employment-law": {
    title: "Employment Law Consultation in Syria | Counselo",
    description:
      "Get confidential online legal guidance in Syria for employment contracts, wrongful termination, unpaid wages, workplace disputes, and labor rights.",
  },
  "/syr/services/business-law": {
    title: "Business Law Consultation in Syria | Counselo",
    description:
      "Book a confidential online business law consultation in Syria for commercial disputes, contracts, trading practices, and commercial liability matters.",
  },
  "/syr/services/real-estate": {
    title: "Real Estate Law Consultation in Syria | Counselo",
    description:
      "Book an online real estate law consultation in Syria for property ownership, sales, leases, inheritance, registration, and property disputes.",
  },
  "/syr/services/foreign-investment": {
    title: "Foreign Investment Consultation in Syria | Counselo",
    description:
      "Book a confidential online foreign investment consultation in Syria for company registration, business licensing, regulatory compliance, and entry procedures.",
  },
  "/syr/services/administrative-law": {
    title: "Administrative Law Consultation in Syria | Counselo",
    description:
      "Get online legal guidance in Syria on administrative decisions, public authority disputes, objection procedures, and regulatory compliance matters.",
  },
  "/syr/services/arbitration": {
    title: "Arbitration & Mediation Consultation in Syria | Counselo",
    description:
      "Book an online arbitration consultation in Syria for commercial disputes, mediation procedures, award enforcement, and alternative dispute settlement.",
  },
  "/syr/services/enforcement": {
    title: "Debt Enforcement Consultation in Syria | Counselo",
    description:
      "Book an online debt enforcement consultation in Syria. Get professional guidance on judgment execution, debt recovery, and payment claims.",
  },
  "/syr/services/companies-law": {
    title: "Corporate Law Consultation in Syria | Counselo",
    description:
      "Book an online corporate law consultation in Syria for company formation, shareholder disputes, governance, compliance, and business dissolution.",
  },
  "/syr/services/contracts": {
    title: "Contract Law Consultation in Syria | Counselo",
    description:
      "Get confidential online legal guidance in Syria for contract drafting, review, breach of contract, termination, negotiation, and contractual disputes.",
  },
  "/syr/services/criminal-law": {
    title: "Criminal Law Consultation in Syria | Counselo",
    description:
      "Get confidential online legal guidance in Syria regarding criminal complaints, investigations, procedures, defense options, and related legal matters.",
  },
  "/syr/services/banking-finance": {
    title: "Banking & Finance Legal Consultation in Syria | Counselo",
    description:
      "Book a confidential online banking and finance consultation in Syria for bank disputes, finance contracts, regulatory compliance, and credit matters.",
  },
  "/syr/services/intellectual-property": {
    title: "Intellectual Property Consultation in Syria | Counselo",
    description:
      "Book a confidential online intellectual property consultation in Syria for trademarks, copyrights, patents, trade secrets, and infringement claims.",
  },
  "/syr/services/tax-zakat": {
    title: "Tax Law Consultation in Syria | Counselo",
    description:
      "Book a confidential online tax consultation in Syria for income tax compliance, customs duties, tax assessments, objection procedures, and fiscal disputes.",
  },
  "/syr/services/cyber-law": {
    title: "Cybercrime Legal Consultation in Syria | Counselo",
    description:
      "Get confidential online legal guidance in Syria for cybercrime matters, online defamation, data protection violations, and digital evidence disputes.",
  },
  "/syr/services/medical-malpractice": {
    title: "Medical Malpractice Consultation in Syria | Counselo",
    description:
      "Book a confidential online medical malpractice consultation in Syria for negligence claims, misdiagnosis, surgical errors, and compensation matters.",
  },
  "/syr/services/insurance-law": {
    title: "Insurance Law Consultation in Syria | Counselo",
    description:
      "Book a confidential online insurance law consultation in Syria for claim denial, policy disputes, insurer liability, and settlement negotiations.",
  },
  "/syr/services/civil-law": {
    title: "Civil Law Consultation in Syria | Counselo",
    description:
      "Book an online civil law consultation in Syria for civil claims, contractual obligations, compensation, property rights, and private legal disputes.",
  },
  "/syr/services/civil-procedure": {
    title: "Civil Procedure Consultation in Syria | Counselo",
    description:
      "Book an online civil procedure consultation in Syria for litigation steps, filing requirements, evidence rules, jurisdiction, appeals, and court deadlines.",
  },
  "/syr/services/criminal-procedure": {
    title: "Criminal Procedure Consultation in Syria | Counselo",
    description:
      "Get online legal guidance in Syria on criminal investigation procedures, detention rights, evidence rules, appeal processes, and procedural safeguards.",
  },

  // ─── SYRIA ARABIC SERVICE PAGES ──────────────────────────────────────────

  "/syr/ar/services/family-law": {
    title: "استشارة قانونية في قانون الأسرة في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في قضايا الأسرة في سوريا، بما يشمل الطلاق والحضانة والنفقة والزيارة والميراث والأحوال الشخصية.",
  },
  "/syr/ar/services/employment-law": {
    title: "استشارة قانونية في قانون العمل في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في قانون العمل في سوريا، بما يشمل عقود العمل والفصل والأجور والنزاعات العمالية وحقوق الموظف.",
  },
  "/syr/ar/services/business-law": {
    title: "استشارة قانونية في النزاعات التجارية في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في النزاعات التجارية والعقود والمعاملات التجارية والمسؤولية القانونية في سوريا عبر كاونسلو.",
  },
  "/syr/ar/services/real-estate": {
    title: "استشارة قانونية عقارية في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في قضايا العقارات في سوريا، بما يشمل البيع والشراء والإيجار والتسجيل والملكية والنزاعات العقارية.",
  },
  "/syr/ar/services/foreign-investment": {
    title: "استشارة قانونية في الاستثمار الأجنبي في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين بشأن الاستثمار الأجنبي في سوريا، بما يشمل تسجيل الشركات والترخيص والامتثال التنظيمي والدخول التجاري.",
  },
  "/syr/ar/services/administrative-law": {
    title: "استشارة قانونية في القانون الإداري في سوريا | كاونسلو",
    description:
      "احصل على استشارة قانونية أونلاين في القرارات الحكومية والطعون الإدارية والمنازعات مع الجهات العامة في سوريا عبر كاونسلو.",
  },
  "/syr/ar/services/arbitration": {
    title: "استشارة قانونية في التحكيم والوساطة في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في التحكيم التجاري والوساطة وتسوية النزاعات وتنفيذ الأحكام التحكيمية في سوريا عبر كاونسلو.",
  },
  "/syr/ar/services/enforcement": {
    title: "استشارة قانونية في التنفيذ وتحصيل الديون في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في تنفيذ الأحكام وتحصيل الديون والمطالبات المالية وإجراءات التنفيذ القضائي في سوريا عبر كاونسلو.",
  },
  "/syr/ar/services/companies-law": {
    title: "استشارة قانونية في نظام الشركات في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في تأسيس الشركات ونزاعات الشركاء والحوكمة والامتثال وتصفية الشركات في سوريا عبر كاونسلو.",
  },
  "/syr/ar/services/contracts": {
    title: "استشارة قانونية في العقود في سوريا | كاونسلو",
    description:
      "احصل على استشارة قانونية أونلاين في صياغة العقود ومراجعتها والإخلال بالعقد والفسخ والتنفيذ القانوني في سوريا عبر كاونسلو.",
  },
  "/syr/ar/services/criminal-law": {
    title: "استشارة قانونية في القضايا الجزائية بسوريا | كاونسلو",
    description:
      "احصل على استشارة قانونية أونلاين بسرية في القضايا الجزائية بسوريا، بما يشمل الشكاوى والتحقيقات والإجراءات والخيارات القانونية المتاحة.",
  },
  "/syr/ar/services/banking-finance": {
    title: "استشارة قانونية في المصارف والتمويل في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في النزاعات المصرفية وعقود التمويل والامتثال التنظيمي والقانون المصرفي في سوريا عبر كاونسلو.",
  },
  "/syr/ar/services/intellectual-property": {
    title: "استشارة قانونية في الملكية الفكرية في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في الملكية الفكرية في سوريا، بما يشمل العلامات التجارية وحقوق المؤلف والبراءات والأسرار التجارية.",
  },
  "/syr/ar/services/tax-zakat": {
    title: "استشارة قانونية في الضرائب في سوريا | كاونسلو",
    description:
      "احصل على استشارة قانونية أونلاين بشأن ضريبة الدخل والجمارك والتقييمات الضريبية وإجراءات الاعتراض الضريبي في سوريا عبر كاونسلو.",
  },
  "/syr/ar/services/cyber-law": {
    title: "استشارة قانونية في الجرائم الإلكترونية في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في الجرائم الإلكترونية والتشهير الرقمي وحماية البيانات والأدلة الإلكترونية في سوريا عبر كاونسلو.",
  },
  "/syr/ar/services/medical-malpractice": {
    title: "استشارة قانونية في الأخطاء الطبية في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في دعاوى الإهمال الطبي والأخطاء الجراحية وسوء التشخيص والتعويضات الطبية في سوريا عبر كاونسلو.",
  },
  "/syr/ar/services/insurance-law": {
    title: "استشارة قانونية في التأمين في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في رفض التعويضات ومنازعات التأمين والمسؤولية التأمينية والتسوية في سوريا عبر كاونسلو.",
  },
  "/syr/ar/services/civil-law": {
    title: "استشارة قانونية في القانون المدني في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في القانون المدني في سوريا، بما يشمل الدعاوى المدنية والالتزامات والتعويض وحقوق الملكية الخاصة.",
  },
  "/syr/ar/services/civil-procedure": {
    title: "استشارة قانونية في أصول المحاكمات المدنية في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في أصول المحاكمات المدنية في سوريا، بما يشمل الإجراءات والمواعيد والأدلة والاختصاص والطعون.",
  },
  "/syr/ar/services/criminal-procedure": {
    title: "استشارة قانونية في أصول المحاكمات الجزائية في سوريا | كاونسلو",
    description:
      "احجز استشارة قانونية أونلاين في أصول المحاكمات الجزائية في سوريا، بما يشمل التحقيق والتوقيف والأدلة والطعون والحقوق الإجرائية.",
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
