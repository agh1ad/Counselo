/**
 * Optimized meta titles and descriptions for all 127 CounselO pages.
 * Keys are the prefixed canonical paths (e.g. "/sa/about", "/syr/ar/services/criminal-law").
 * Used by SEOHead to override per-page title + description with search-optimized copy.
 * Syria-specific entries already contain the correct localized text — SEOHead skips
 * syriafyText() transformation when a map entry is found.
 */
export type OptimizedMeta = {
  title: string;
  description: string;
};

export const COUNSELO_OPTIMIZED_META: Record<string, OptimizedMeta> = {
  "/": {
    title: "CounselO | Online Legal Consultation in Saudi Arabia & Syria",
    description:
      "Get online legal consultation for Saudi Arabia or Syria in Arabic or English. Senior lawyer-led answers within 24 hours via WhatsApp or email.",
  },
  "/sa/about": {
    title: "About CounselO | Legal Consultations in Saudi Arabia",
    description:
      "Learn about CounselO, an online legal consultation platform for Saudi Arabia, led by Lawyer Omar Al-Baghdadi and built for confidential legal guidance.",
  },
  "/sa/ar/about": {
    title: "عن كاونسلو | استشارات قانونية في السعودية",
    description:
      "تعرف على كاونسلو، منصة استشارات قانونية أونلاين في السعودية بإشراف المحامي عمر البغدادي وخبرة قانونية طويلة.",
  },
  "/sa/ar/blog/board-of-grievances-saudi-arabia": {
    title: "ديوان المظالم في السعودية | كاونسلو",
    description:
      "تعرف على اختصاص ديوان المظالم في السعودية ومتى يمكن الطعن في القرارات الإدارية والمواعيد والمستندات المهمة.",
  },
  "/sa/ar/blog/child-custody-saudi-arabia": {
    title: "الحضانة في السعودية | الحقوق والإجراءات",
    description:
      "تعرف على أحكام الحضانة والولاية والزيارة ومصلحة المحضون في قضايا الأسرة داخل السعودية قبل طلب الاستشارة القانونية.",
  },
  "/sa/ar/blog/divorce-in-saudi-arabia": {
    title: "الطلاق في السعودية | الحقوق والإجراءات",
    description:
      "تعرف على مسائل الطلاق والخلع والفسخ والحضانة والنفقة والتوثيق في السعودية قبل طلب استشارة قانونية متخصصة.",
  },
  "/sa/ar/blog/foreign-company-registration-saudi-arabia": {
    title: "تسجيل شركة أجنبية في السعودية",
    description:
      "دليل قانوني حول تسجيل الشركات الأجنبية في السعودية، الترخيص الاستثماري، السجل التجاري، أنواع الشركات، والأخطاء الشائعة.",
  },
  "/sa/ar/blog/real-estate-disputes-saudi-arabia": {
    title: "النزاعات العقارية في السعودية",
    description:
      "تعرف على الخيارات القانونية في النزاعات العقارية داخل السعودية، بما يشمل الملكية والإيجار وعيوب البناء والتعويض.",
  },
  "/sa/ar/blog/wrongful-termination-saudi-labor-law": {
    title: "الفصل التعسفي في السعودية | حقوق الموظف",
    description:
      "تعرف على حقوق الموظف عند الفصل التعسفي في السعودية، والتعويضات والأدلة والمواعيد قبل طلب استشارة قانونية.",
  },
  "/sa/ar/blog": {
    title: "مدونة قانونية في السعودية | كاونسلو",
    description:
      "مقالات وإرشادات قانونية عملية في السعودية حول الأسرة والعمل والعقارات والشركات والعقود والاستثمار والمنازعات.",
  },
  "/sa/ar/contact": {
    title: "احجز استشارة قانونية في السعودية | كاونسلو",
    description:
      "تواصل مع كاونسلو لحجز استشارة قانونية أونلاين في السعودية. أرسل تفاصيل قضيتك واحصل على رد قانوني خلال 24 ساعة.",
  },
  "/sa/ar/privacy-policy": {
    title: "سياسة الخصوصية | كاونسلو السعودية",
    description:
      "تعرف على كيفية جمع كاونسلو لبيانات الاستشارة القانونية وحمايتها والحفاظ على سرية معلومات العملاء في السعودية.",
  },
  "/sa/ar/services/administrative-law": {
    title: "استشارة قانون إداري في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون إداري داخل السعودية حول القرارات الحكومية والاعتراضات والمنازعات الإدارية واستراتيجية التقاضي. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/arbitration": {
    title: "استشارة تحكيم ووساطة في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في تحكيم ووساطة داخل السعودية حول التحكيم التجاري والوساطة والتسوية وتنفيذ أحكام التحكيم. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/banking-finance": {
    title: "استشارة مصارف وتمويل في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في مصارف وتمويل داخل السعودية حول النزاعات المصرفية وعقود التمويل والتمويل الإسلامي والمسائل التنظيمية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/business-law": {
    title: "استشارة قانون تجاري في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون تجاري داخل السعودية حول النزاعات التجارية والعقود والمعاملات والمسؤولية ومخاطر الأعمال. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/companies-law": {
    title: "استشارة قانون شركات في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون شركات داخل السعودية حول تأسيس الشركات ونزاعات الشركاء والحوكمة ومسؤولية المديرين. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/contracts": {
    title: "استشارة عقود في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في عقود داخل السعودية حول صياغة العقود ومراجعتها والإخلال والفسخ والتنفيذ والتفاوض. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/criminal-law": {
    title: "استشارة قانون جزائي في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون جزائي داخل السعودية حول الشكاوى الجزائية والتحقيق والدفاع والأدلة وإجراءات المحكمة. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/cyber-law": {
    title: "استشارة جرائم معلوماتية في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في جرائم معلوماتية وتقنية داخل السعودية حول الجرائم الإلكترونية والتشهير الإلكتروني وحماية البيانات والأدلة الرقمية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/employment-law": {
    title: "استشارة قانون عمل في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون عمل داخل السعودية حول الفصل والأجور المتأخرة وعقود العمل والمنازعات العمالية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/enforcement": {
    title: "استشارة تنفيذ وتحصيل ديون في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في تنفيذ وتحصيل ديون داخل السعودية حول تنفيذ الأحكام وتحصيل الديون والمطالبات المالية وإجراءات التنفيذ. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/family-law": {
    title: "استشارة أحوال شخصية في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في أحوال شخصية داخل السعودية حول الطلاق والحضانة والنفقة والزيارة والميراث والمسائل الأسرية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/foreign-investment": {
    title: "استشارة استثمار أجنبي في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في استثمار أجنبي داخل السعودية حول تأسيس الشركات الأجنبية والترخيص والسجل التجاري والامتثال. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/insurance-law": {
    title: "استشارة قانون تأمين في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون تأمين داخل السعودية حول رفض التعويضات ومنازعات الوثائق ومسؤولية شركات التأمين والتسوية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/intellectual-property": {
    title: "استشارة ملكية فكرية في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في ملكية فكرية داخل السعودية حول العلامات التجارية وحقوق المؤلف والبراءات والأسرار التجارية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/medical-malpractice": {
    title: "استشارة أخطاء طبية في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في أخطاء طبية داخل السعودية حول الإهمال الطبي والأخطاء الجراحية وسوء التشخيص والتعويض. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/real-estate": {
    title: "استشارة نزاعات عقارية في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون عقاري داخل السعودية حول نزاعات الملكية والإيجارات وعيوب البناء والعقود العقارية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services/tax-zakat": {
    title: "استشارة زكاة وضريبة في السعودية | كاونسلو",
    description:
      "استشارة قانونية أونلاين في ضرائب وزكاة داخل السعودية حول التقييمات الضريبية والزكاة وضريبة القيمة المضافة والجمارك والاعتراضات. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/ar/services": {
    title: "17 مجالاً للاستشارة القانونية في السعودية",
    description:
      "اختر مجال استشارتك القانونية في السعودية: الأسرة، العمل، العقارات، الشركات، العقود، التحكيم، الجرائم، الضرائب وغيرها.",
  },
  "/sa/ar/terms-of-service": {
    title: "شروط الخدمة | كاونسلو السعودية",
    description:
      "تعرف على آلية طلب الاستشارة القانونية الأونلاين من كاونسلو، وطريقة تحديد الرسوم والدفع واستلام الرد القانوني.",
  },
  "/sa/ar": {
    title: "استشارة قانونية أونلاين في السعودية | كاونسلو",
    description:
      "احصل على استشارة قانونية أونلاين في السعودية بالعربية أو الإنجليزية، بإشراف قانوني متخصص ورد خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/sa/blog/board-of-grievances-saudi-arabia": {
    title: "Board of Grievances in Saudi Arabia | CounselO",
    description:
      "Learn when and how to challenge government decisions before Saudi Arabia's Board of Grievances, including deadlines, evidence, and legal strategy.",
  },
  "/sa/blog/child-custody-saudi-arabia": {
    title: "Child Custody in Saudi Arabia | CounselO",
    description:
      "Understand child custody, guardianship, visitation, and best-interest factors in Saudi family law before requesting legal consultation.",
  },
  "/sa/blog/divorce-in-saudi-arabia": {
    title: "Divorce in Saudi Arabia | Rights & Process",
    description:
      "Learn about divorce, khula, annulment, custody, alimony, and documentation under Saudi family law before getting legal advice.",
  },
  "/sa/blog/foreign-company-registration-saudi-arabia": {
    title: "Foreign Company Registration in Saudi Arabia",
    description:
      "A legal guide to foreign company registration in Saudi Arabia, investment licensing, commercial registration, company forms, and common mistakes.",
  },
  "/sa/blog/real-estate-disputes-saudi-arabia": {
    title: "Real Estate Disputes in Saudi Arabia",
    description:
      "Learn legal options for property disputes in Saudi Arabia, including ownership claims, leases, construction defects, and compensation.",
  },
  "/sa/blog/wrongful-termination-saudi-labor-law": {
    title: "Wrongful Termination in Saudi Arabia",
    description:
      "Understand wrongful termination under Saudi labor law, including employee rights, compensation, evidence, deadlines, and legal options.",
  },
  "/sa/blog": {
    title: "Legal Blog in Saudi Arabia | CounselO",
    description:
      "Practical legal guides for Saudi Arabia covering family, employment, real estate, companies, contracts, investment, disputes, and more.",
  },
  "/sa/contact": {
    title: "Book Online Legal Consultation in Saudi Arabia | CounselO",
    description:
      "Contact CounselO to book an online legal consultation in Saudi Arabia. Send your case details and receive legal guidance within 24 hours.",
  },
  "/sa/privacy-policy": {
    title: "Privacy Policy | CounselO Saudi Arabia",
    description:
      "Learn how CounselO collects, protects, and handles legal consultation data while preserving client confidentiality.",
  },
  "/sa/services/administrative-law": {
    title: "Administrative Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online administrative law advice in Saudi Arabia for government decisions, objections, public authority disputes, and administrative court strategy. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/arbitration": {
    title: "Arbitration & Mediation Consultation in Saudi Arabia | CounselO",
    description:
      "Get online arbitration & mediation advice in Saudi Arabia for commercial arbitration, mediation, settlement strategy, and enforcement of arbitral awards. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/banking-finance": {
    title: "Banking & Finance Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online banking & finance law advice in Saudi Arabia for bank disputes, finance contracts, Islamic finance, loan issues, and regulatory matters. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/business-law": {
    title: "Commercial Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online commercial law advice in Saudi Arabia for commercial disputes, business contracts, transactions, liability, and legal risk. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/companies-law": {
    title: "Companies Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online companies law advice in Saudi Arabia for company formation, shareholder disputes, governance, director liability, and corporate claims. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/contracts": {
    title: "Contract Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online contract law advice in Saudi Arabia for contract drafting, review, breach, termination, enforcement, and negotiation. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/criminal-law": {
    title: "Criminal Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online criminal law advice in Saudi Arabia for criminal complaints, investigation, defense strategy, evidence, and court procedures. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/cyber-law": {
    title: "Cybercrime & IT Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online cybercrime & it law advice in Saudi Arabia for cybercrime reports, online defamation, data protection, digital evidence, and IT disputes. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/employment-law": {
    title: "Employment Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online employment law advice in Saudi Arabia for termination, unpaid wages, employment contracts, workplace disputes, and labor claims. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/enforcement": {
    title: "Enforcement & Debt Collection Lawyer in Saudi Arabia | CounselO",
    description:
      "Get online enforcement & debt collection advice in Saudi Arabia for judgment enforcement, debt recovery, payment claims, seizure orders, and execution steps. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/family-law": {
    title: "Family Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online family law advice in Saudi Arabia for divorce, custody, alimony, visitation, inheritance, and personal status matters. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/foreign-investment": {
    title: "Foreign Investment Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online foreign investment law advice in Saudi Arabia for foreign company setup, licensing, commercial registration, compliance, and business entry. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/insurance-law": {
    title: "Insurance Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online insurance law advice in Saudi Arabia for claim denial, policy disputes, compensation, insurer liability, and settlement strategy. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/intellectual-property": {
    title: "Intellectual Property Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online intellectual property law advice in Saudi Arabia for trademarks, copyrights, patents, trade secrets, infringement, and IP protection. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/medical-malpractice": {
    title: "Medical Malpractice Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online medical malpractice law advice in Saudi Arabia for medical negligence, surgical errors, misdiagnosis, liability, and compensation. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/real-estate": {
    title: "Real Estate Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online real estate law advice in Saudi Arabia for ownership disputes, leases, construction defects, sale contracts, and property claims. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services/tax-zakat": {
    title: "Tax & Zakat Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get online tax & zakat law advice in Saudi Arabia for tax assessments, zakat, VAT, customs, objections, and compliance. Response within 24 hours via WhatsApp or email.",
  },
  "/sa/services": {
    title: "17 Legal Practice Areas in Saudi Arabia | CounselO",
    description:
      "Choose your legal consultation area in Saudi Arabia: family, employment, real estate, companies, contracts, arbitration, criminal law, tax, and more.",
  },
  "/sa/terms-of-service": {
    title: "Terms of Service | CounselO Saudi Arabia",
    description:
      "Review CounselO's consultation process, including case submission, fee confirmation, payment, delivery, and clarification policy.",
  },
  "/sa": {
    title: "Online Legal Consultation in Saudi Arabia | CounselO",
    description:
      "Get online legal consultation in Saudi Arabia in Arabic or English. Senior lawyer-led guidance within 24 hours via WhatsApp or email.",
  },
  "/syr/about": {
    title: "About CounselO | Legal Consultations in Syria",
    description:
      "Learn about CounselO, an online legal consultation platform for Syria, led by Lawyer Omar Al-Baghdadi and built for confidential legal guidance.",
  },
  "/syr/ar/about": {
    title: "عن كاونسلو | استشارات قانونية في سوريا",
    description:
      "تعرف على كاونسلو، منصة استشارات قانونية أونلاين في سوريا بإشراف المحامي عمر البغدادي وخبرة قانونية طويلة.",
  },
  "/syr/ar/blog/board-of-grievances-saudi-arabia": {
    title: "المنازعات الإدارية في سوريا",
    description:
      "تعرف على المنازعات الإدارية في سوريا، والطعن في قرارات الجهات العامة، والمواعيد والمستندات المهمة قبل طلب الاستشارة.",
  },
  "/syr/ar/blog/child-custody-saudi-arabia": {
    title: "الحضانة في سوريا | الحقوق والإجراءات",
    description:
      "تعرف على أحكام الحضانة والولاية والزيارة والمسائل الأسرية في سوريا قبل طلب استشارة قانونية متخصصة.",
  },
  "/syr/ar/blog/divorce-in-saudi-arabia": {
    title: "الطلاق في سوريا | الحقوق والإجراءات",
    description:
      "تعرف على مسائل الطلاق والتفريق والحضانة والنفقة والتوثيق في سوريا قبل طلب استشارة قانونية متخصصة.",
  },
  "/syr/ar/blog/foreign-company-registration-saudi-arabia": {
    title: "تسجيل شركة أجنبية في سوريا",
    description:
      "دليل قانوني حول تسجيل الشركات الأجنبية في سوريا، الترخيص، السجل التجاري، أنواع الشركات، والأخطاء الشائعة.",
  },
  "/syr/ar/blog/real-estate-disputes-saudi-arabia": {
    title: "النزاعات العقارية في سوريا",
    description:
      "تعرف على الخيارات القانونية في النزاعات العقارية داخل سوريا، بما يشمل الملكية والإيجار وعيوب البناء والتعويض.",
  },
  "/syr/ar/blog/wrongful-termination-saudi-labor-law": {
    title: "الفصل التعسفي في سوريا | حقوق العامل",
    description:
      "تعرف على حقوق العامل عند الفصل التعسفي في سوريا، والتعويضات والأدلة والمواعيد قبل طلب استشارة قانونية.",
  },
  "/syr/ar/blog": {
    title: "مدونة قانونية في سوريا | كاونسلو",
    description:
      "مقالات وإرشادات قانونية عملية في سوريا حول الأسرة والعمل والعقارات والشركات والعقود والاستثمار والمنازعات.",
  },
  "/syr/ar/contact": {
    title: "احجز استشارة قانونية في سوريا | كاونسلو",
    description:
      "تواصل مع كاونسلو لحجز استشارة قانونية أونلاين في سوريا. أرسل تفاصيل قضيتك واحصل على رد قانوني خلال 24 ساعة.",
  },
  "/syr/ar/privacy-policy": {
    title: "سياسة الخصوصية | كاونسلو سوريا",
    description:
      "تعرف على كيفية جمع كاونسلو لبيانات الاستشارة القانونية وحمايتها والحفاظ على سرية معلومات العملاء في سوريا.",
  },
  "/syr/ar/services/administrative-law": {
    title: "استشارة قانون إداري في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون إداري داخل سوريا حول القرارات الحكومية والاعتراضات والمنازعات الإدارية واستراتيجية التقاضي. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/arbitration": {
    title: "استشارة تحكيم ووساطة في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في تحكيم ووساطة داخل سوريا حول التحكيم التجاري والوساطة والتسوية وتنفيذ أحكام التحكيم. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/banking-finance": {
    title: "استشارة مصارف وتمويل في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في مصارف وتمويل داخل سوريا حول النزاعات المصرفية وعقود التمويل والتمويل الإسلامي والمسائل التنظيمية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/business-law": {
    title: "استشارة قانون تجاري في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون تجاري داخل سوريا حول النزاعات التجارية والعقود والمعاملات والمسؤولية ومخاطر الأعمال. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/civil-law": {
    title: "استشارة قانون مدني في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون مدني داخل سوريا حول الدعاوى المدنية والالتزامات والتعويض والحقوق الخاصة. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/civil-procedure": {
    title: "استشارة أصول محاكمات مدنية في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في أصول محاكمات مدنية داخل سوريا حول إجراءات التقاضي والمواعيد والاختصاص والأدلة والطعون. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/companies-law": {
    title: "استشارة قانون شركات في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون شركات داخل سوريا حول تأسيس الشركات ونزاعات الشركاء والحوكمة ومسؤولية المديرين. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/contracts": {
    title: "استشارة عقود في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في عقود داخل سوريا حول صياغة العقود ومراجعتها والإخلال والفسخ والتنفيذ والتفاوض. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/criminal-law": {
    title: "استشارة قانون جزائي في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون جزائي داخل سوريا حول الشكاوى الجزائية والتحقيق والدفاع والأدلة وإجراءات المحكمة. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/criminal-procedure": {
    title: "استشارة أصول محاكمات جزائية في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في أصول محاكمات جزائية داخل سوريا حول التحقيق والتوقيف والأدلة والطعون والحقوق الإجرائية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/cyber-law": {
    title: "استشارة جرائم إلكترونية في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في جرائم معلوماتية وتقنية داخل سوريا حول الجرائم الإلكترونية والتشهير الإلكتروني وحماية البيانات والأدلة الرقمية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/employment-law": {
    title: "استشارة قانون عمل في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون عمل داخل سوريا حول الفصل والأجور المتأخرة وعقود العمل والمنازعات العمالية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/enforcement": {
    title: "استشارة تنفيذ وتحصيل ديون في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في تنفيذ وتحصيل ديون داخل سوريا حول تنفيذ الأحكام وتحصيل الديون والمطالبات المالية وإجراءات التنفيذ. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/family-law": {
    title: "استشارة قانون أسرة في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في أحوال شخصية داخل سوريا حول الطلاق والحضانة والنفقة والزيارة والميراث والمسائل الأسرية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/foreign-investment": {
    title: "استشارة استثمار أجنبي في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في استثمار أجنبي داخل سوريا حول تأسيس الشركات الأجنبية والترخيص والسجل التجاري والامتثال. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/insurance-law": {
    title: "استشارة قانون تأمين في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون تأمين داخل سوريا حول رفض التعويضات ومنازعات الوثائق ومسؤولية شركات التأمين والتسوية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/intellectual-property": {
    title: "استشارة ملكية فكرية في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في ملكية فكرية داخل سوريا حول العلامات التجارية وحقوق المؤلف والبراءات والأسرار التجارية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/medical-malpractice": {
    title: "استشارة أخطاء طبية في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في أخطاء طبية داخل سوريا حول الإهمال الطبي والأخطاء الجراحية وسوء التشخيص والتعويض. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/real-estate": {
    title: "استشارة نزاعات عقارية في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في قانون عقاري داخل سوريا حول نزاعات الملكية والإيجارات وعيوب البناء والعقود العقارية. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services/tax-zakat": {
    title: "استشارة قانون ضرائب في سوريا | كاونسلو",
    description:
      "استشارة قانونية أونلاين في ضرائب وزكاة داخل سوريا حول التقييمات الضريبية والزكاة وضريبة القيمة المضافة والجمارك والاعتراضات. رد مهني خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/ar/services": {
    title: "20 مجالاً للاستشارة القانونية في سوريا",
    description:
      "اختر مجال استشارتك القانونية في سوريا: الأسرة، العمل، العقارات، الشركات، العقود، التحكيم، الجرائم، الضرائب وغيرها.",
  },
  "/syr/ar/terms-of-service": {
    title: "شروط الخدمة | كاونسلو سوريا",
    description:
      "تعرف على آلية طلب الاستشارة القانونية الأونلاين من كاونسلو، وطريقة تحديد الرسوم والدفع واستلام الرد القانوني.",
  },
  "/syr/ar": {
    title: "استشارة قانونية أونلاين في سوريا | كاونسلو",
    description:
      "احصل على استشارة قانونية أونلاين في سوريا بالعربية أو الإنجليزية، بإشراف قانوني متخصص ورد خلال 24 ساعة عبر واتساب أو البريد.",
  },
  "/syr/blog/board-of-grievances-saudi-arabia": {
    title: "Administrative Court Disputes in Syria",
    description:
      "Learn how administrative disputes in Syria are handled, including challenges to public authority decisions, deadlines, evidence, and legal strategy.",
  },
  "/syr/blog/child-custody-saudi-arabia": {
    title: "Child Custody in Syria | CounselO",
    description:
      "Understand child custody, guardianship, visitation, and family-law considerations in Syria before requesting legal consultation.",
  },
  "/syr/blog/divorce-in-saudi-arabia": {
    title: "Divorce in Syria | Rights & Process",
    description:
      "Learn about divorce, separation, custody, alimony, inheritance, and documentation under Syrian family law before getting legal advice.",
  },
  "/syr/blog/foreign-company-registration-saudi-arabia": {
    title: "Foreign Company Registration in Syria",
    description:
      "A legal guide to foreign company registration in Syria, business licensing, commercial registration, company forms, and common mistakes.",
  },
  "/syr/blog/real-estate-disputes-saudi-arabia": {
    title: "Real Estate Disputes in Syria",
    description:
      "Learn legal options for property disputes in Syria, including ownership claims, leases, construction defects, and compensation.",
  },
  "/syr/blog/wrongful-termination-saudi-labor-law": {
    title: "Wrongful Termination in Syria",
    description:
      "Understand wrongful termination under Syrian labor law, including employee rights, compensation, evidence, deadlines, and legal options.",
  },
  "/syr/blog": {
    title: "Legal Blog in Syria | CounselO",
    description:
      "Practical legal guides for Syria covering family, employment, real estate, companies, contracts, investment, disputes, and more.",
  },
  "/syr/contact": {
    title: "Book Online Legal Consultation in Syria | CounselO",
    description:
      "Contact CounselO to book an online legal consultation in Syria. Send your case details and receive legal guidance within 24 hours.",
  },
  "/syr/privacy-policy": {
    title: "Privacy Policy | CounselO Syria",
    description:
      "Learn how CounselO collects, protects, and handles legal consultation data while preserving client confidentiality.",
  },
  "/syr/services/administrative-law": {
    title: "Administrative Law Consultation in Syria | CounselO",
    description:
      "Get online administrative law advice in Syria for government decisions, objections, public authority disputes, and administrative court strategy. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/arbitration": {
    title: "Arbitration & Mediation Consultation in Syria | CounselO",
    description:
      "Get online arbitration & mediation advice in Syria for commercial arbitration, mediation, settlement strategy, and enforcement of arbitral awards. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/banking-finance": {
    title: "Banking & Finance Law Consultation in Syria | CounselO",
    description:
      "Get online banking & finance law advice in Syria for bank disputes, finance contracts, Islamic finance, loan issues, and regulatory matters. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/business-law": {
    title: "Commercial Law Consultation in Syria | CounselO",
    description:
      "Get online commercial law advice in Syria for commercial disputes, business contracts, transactions, liability, and legal risk. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/civil-law": {
    title: "Civil Law Consultation in Syria | CounselO",
    description:
      "Get online civil law advice in Syria for civil claims, obligations, compensation, property rights, and private disputes. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/civil-procedure": {
    title: "Civil Procedure Consultation in Syria | CounselO",
    description:
      "Get online civil procedure advice in Syria for court filings, deadlines, evidence, jurisdiction, appeals, and litigation steps. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/companies-law": {
    title: "Companies Law Consultation in Syria | CounselO",
    description:
      "Get online companies law advice in Syria for company formation, shareholder disputes, governance, director liability, and corporate claims. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/contracts": {
    title: "Contract Law Consultation in Syria | CounselO",
    description:
      "Get online contract law advice in Syria for contract drafting, review, breach, termination, enforcement, and negotiation. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/criminal-law": {
    title: "Criminal Law Consultation in Syria | CounselO",
    description:
      "Get online criminal law advice in Syria for criminal complaints, investigation, defense strategy, evidence, and court procedures. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/criminal-procedure": {
    title: "Criminal Procedure Consultation in Syria | CounselO",
    description:
      "Get online criminal procedure advice in Syria for investigation, detention, evidence, appeals, procedural rights, and court stages. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/cyber-law": {
    title: "Cybercrime & IT Law Consultation in Syria | CounselO",
    description:
      "Get online cybercrime & it law advice in Syria for cybercrime reports, online defamation, data protection, digital evidence, and IT disputes. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/employment-law": {
    title: "Employment Law Consultation in Syria | CounselO",
    description:
      "Get online employment law advice in Syria for termination, unpaid wages, employment contracts, workplace disputes, and labor claims. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/enforcement": {
    title: "Enforcement & Debt Collection Consultation in Syria | CounselO",
    description:
      "Get online enforcement & debt collection advice in Syria for judgment enforcement, debt recovery, payment claims, seizure orders, and execution steps. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/family-law": {
    title: "Family Law Consultation in Syria | CounselO",
    description:
      "Get online family law advice in Syria for divorce, custody, alimony, visitation, inheritance, and personal status matters. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/foreign-investment": {
    title: "Foreign Investment Law Consultation in Syria | CounselO",
    description:
      "Get online foreign investment law advice in Syria for foreign company setup, licensing, commercial registration, compliance, and business entry. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/insurance-law": {
    title: "Insurance Law Consultation in Syria | CounselO",
    description:
      "Get online insurance law advice in Syria for claim denial, policy disputes, compensation, insurer liability, and settlement strategy. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/intellectual-property": {
    title: "Intellectual Property Law Consultation in Syria | CounselO",
    description:
      "Get online intellectual property law advice in Syria for trademarks, copyrights, patents, trade secrets, infringement, and IP protection. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/medical-malpractice": {
    title: "Medical Malpractice Law Consultation in Syria | CounselO",
    description:
      "Get online medical malpractice law advice in Syria for medical negligence, surgical errors, misdiagnosis, liability, and compensation. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/real-estate": {
    title: "Real Estate Law Consultation in Syria | CounselO",
    description:
      "Get online real estate law advice in Syria for ownership disputes, leases, construction defects, sale contracts, and property claims. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services/tax-zakat": {
    title: "Tax & Zakat Law Consultation in Syria | CounselO",
    description:
      "Get online tax & zakat law advice in Syria for tax assessments, zakat, VAT, customs, objections, and compliance. Response within 24 hours via WhatsApp or email.",
  },
  "/syr/services": {
    title: "20 Legal Practice Areas in Syria | CounselO",
    description:
      "Choose your legal consultation area in Syria: family, employment, real estate, companies, contracts, arbitration, criminal law, tax, and more.",
  },
  "/syr/terms-of-service": {
    title: "Terms of Service | CounselO Syria",
    description:
      "Review CounselO's consultation process, including case submission, fee confirmation, payment, delivery, and clarification policy.",
  },
  "/syr": {
    title: "Online Legal Consultation in Syria | CounselO",
    description:
      "Get online legal consultation in Syria in Arabic or English. Senior lawyer-led guidance within 24 hours via WhatsApp or email.",
  },
};
