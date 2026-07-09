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
  /** When present, overrides the computed canonical URL (used for 301-redirect source pages). */
  canonicalOverride?: string;

  // New canonical Syria blog URLs (redirect targets for the Saudi-worded slugs)
  "/syr/blog/administrative-court-disputes-syria": {
    title: "Administrative Court Disputes in Syria",
    description: "Learn how administrative disputes in Syria are handled, including challenges to public authority decisions, deadlines, evidence, and legal strategy.",
  },
  "/syr/blog/child-custody-syria": {
    title: "Child Custody in Syria | CounselO",
    description: "Understand child custody, guardianship, visitation, and family-law considerations in Syria before requesting legal consultation.",
  },
  "/syr/blog/divorce-in-syria": {
    title: "Divorce in Syria | Rights & Process",
    description: "Learn about divorce, separation, custody, alimony, inheritance, and documentation under Syrian family law before getting legal advice.",
  },
  "/syr/blog/foreign-company-registration-syria": {
    title: "Foreign Company Registration in Syria",
    description: "A legal guide to foreign company registration in Syria, business licensing, commercial registration, company forms, and common mistakes.",
  },
  "/syr/blog/real-estate-disputes-syria": {
    title: "Real Estate Disputes in Syria",
    description: "Learn legal options for property disputes in Syria, including ownership claims, leases, construction defects, and compensation.",
  },
  "/syr/blog/wrongful-termination-syrian-labor-law": {
    title: "Wrongful Termination in Syria",
    description: "Understand wrongful termination under Syrian labor law, including employee rights, compensation, evidence, deadlines, and legal options.",
  },
  "/syr/ar/blog/administrative-court-disputes-syria": {
    title: "المنازعات الإدارية في سوريا",
    description: "تعرف على المنازعات الإدارية في سوريا، والطعن في قرارات الجهات العامة، والمواعيد والمستندات المهمة قبل طلب الاستشارة.",
  },
  "/syr/ar/blog/child-custody-syria": {
    title: "الحضانة في سوريا | الحقوق والإجراءات",
    description: "تعرف على أحكام الحضانة والولاية والزيارة والمسائل الأسرية في سوريا قبل طلب استشارة قانونية متخصصة.",
  },
  "/syr/ar/blog/divorce-in-syria": {
    title: "الطلاق في سوريا | الحقوق والإجراءات",
    description: "تعرف على مسائل الطلاق والتفريق والحضانة والنفقة والتوثيق في سوريا قبل طلب استشارة قانونية متخصصة.",
  },
  "/syr/ar/blog/foreign-company-registration-syria": {
    title: "تسجيل شركة أجنبية في سوريا",
    description: "دليل قانوني حول تسجيل الشركات الأجنبية في سوريا، الترخيص، السجل التجاري، أنواع الشركات، والأخطاء الشائعة.",
  },
  "/syr/ar/blog/real-estate-disputes-syria": {
    title: "النزاعات العقارية في سوريا",
    description: "تعرف على الخيارات القانونية في النزاعات العقارية داخل سوريا، بما يشمل الملكية والإيجار وعيوب البناء والتعويض.",
  },
  "/syr/ar/blog/wrongful-termination-syrian-labor-law": {
    title: "الفصل التعسفي في سوريا | حقوق العامل",
    description: "تعرف على حقوق العامل عند الفصل التعسفي في سوريا، والتعويضات والأدلة والمواعيد قبل طلب استشارة قانونية.",
  },
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
      "استشارة أونلاين خلال 24 ساعة في القانون الإداري داخل السعودية: قرارات حكومية، اعتراضات، ومنازعات إدارية.",
  },
  "/sa/ar/services/arbitration": {
    title: "استشارة تحكيم ووساطة في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في التحكيم والوساطة داخل السعودية: تحكيم تجاري، وساطة، تسوية، وتنفيذ أحكام.",
  },
  "/sa/ar/services/banking-finance": {
    title: "استشارة مصارف وتمويل في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في المصارف والتمويل داخل السعودية: نزاعات مصرفية، عقود تمويل، وتمويل إسلامي.",
  },
  "/sa/ar/services/business-law": {
    title: "استشارة قانون تجاري في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في القانون التجاري داخل السعودية: نزاعات تجارية، عقود، معاملات، ومسؤولية.",
  },
  "/sa/ar/services/companies-law": {
    title: "استشارة قانون شركات في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في قانون الشركات داخل السعودية: تأسيس شركات، نزاعات شركاء، حوكمة، ومسؤولية.",
  },
  "/sa/ar/services/contracts": {
    title: "استشارة عقود في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في العقود داخل السعودية: صياغة العقود، مراجعتها، الإخلال، الفسخ، والتنفيذ.",
  },
  "/sa/ar/services/criminal-law": {
    title: "استشارة قانون جزائي في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في القانون الجزائي داخل السعودية: شكاوى جزائية، تحقيق، دفاع، أدلة، وإجراءات محكمة.",
  },
  "/sa/ar/services/cyber-law": {
    title: "استشارة جرائم معلوماتية في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في الجرائم الإلكترونية داخل السعودية: جرائم إلكترونية، تشهير، حماية بيانات، وأدلة رقمية.",
  },
  "/sa/ar/services/employment-law": {
    title: "استشارة قانون عمل في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في قانون العمل داخل السعودية: فصل، أجور متأخرة، عقود عمل، ومنازعات عمالية.",
  },
  "/sa/ar/services/enforcement": {
    title: "استشارة تنفيذ وتحصيل ديون في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في التنفيذ وتحصيل الديون داخل السعودية: تنفيذ أحكام، تحصيل ديون، مطالبات مالية، وإجراءات تنفيذ.",
  },
  "/sa/ar/services/family-law": {
    title: "استشارة أحوال شخصية في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في الأحوال الشخصية داخل السعودية: طلاق، حضانة، نفقة، زيارة، ميراث، ومسائل أسرية.",
  },
  "/sa/ar/services/foreign-investment": {
    title: "استشارة استثمار أجنبي في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في الاستثمار الأجنبي داخل السعودية: تأسيس شركات أجنبية، ترخيص، سجل تجاري، وامتثال.",
  },
  "/sa/ar/services/insurance-law": {
    title: "استشارة قانون تأمين في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في قانون التأمين داخل السعودية: رفض تعويضات، منازعات وثائق، مسؤولية تأمينية، وتسوية.",
  },
  "/sa/ar/services/intellectual-property": {
    title: "استشارة ملكية فكرية في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في الملكية الفكرية داخل السعودية: علامات تجارية، حقوق مؤلف، براءات، وأسرار تجارية.",
  },
  "/sa/ar/services/medical-malpractice": {
    title: "استشارة أخطاء طبية في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في الأخطاء الطبية داخل السعودية: إهمال طبي، أخطاء جراحية، سوء تشخيص، وتعويض.",
  },
  "/sa/ar/services/real-estate": {
    title: "استشارة نزاعات عقارية في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في القانون العقاري داخل السعودية: نزاعات ملكية، إيجارات، عيوب بناء، وعقود عقارية.",
  },
  "/sa/ar/services/tax-zakat": {
    title: "استشارة زكاة وضريبة في السعودية | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في الضرائب والزكاة داخل السعودية: تقييمات ضريبية، زكاة، قيمة مضافة، جمارك، واعتراضات.",
  },
  "/sa/ar/services": {
    title: "17 مجالاً للاستشارة القانونية في السعودية",
    description:
      "اختر مجال استشارتك القانونية في السعودية: الأسرة، العمل، العقارات، الشركات، العقود، التحكيم، الجرائم، الضرائب وغيرها.",
  },
  "/sa/ar/terms-of-service": {
    title: "شروط الخدمة | كاونسلو السعودية",
    description:
      "تعرف على آلية طلب الاستشارة القانونية في السعودية عبر كاونسلو، من إرسال التفاصيل إلى الدفع واستلام الرد القانوني.",
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
      "Learn how CounselO collects, protects, and handles Saudi Arabia legal consultation data while preserving client confidentiality.",
  },
  "/sa/services/administrative-law": {
    title: "Administrative Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online administrative law advice in Saudi Arabia on government decisions, objections, and administrative court strategy.",
  },
  "/sa/services/arbitration": {
    title: "Arbitration & Mediation Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online arbitration and mediation advice in Saudi Arabia on commercial arbitration, mediation, settlements, and award enforcement.",
  },
  "/sa/services/banking-finance": {
    title: "Banking & Finance Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online banking and finance law advice in Saudi Arabia on bank disputes, finance contracts, Islamic finance, and regulation.",
  },
  "/sa/services/business-law": {
    title: "Commercial Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online commercial law advice in Saudi Arabia on commercial disputes, contracts, transactions, liability, and risk.",
  },
  "/sa/services/companies-law": {
    title: "Companies Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online companies law advice in Saudi Arabia on company formation, shareholder disputes, governance, and corporate claims.",
  },
  "/sa/services/contracts": {
    title: "Contract Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online contract law advice in Saudi Arabia on drafting, review, breach, termination, enforcement, and negotiation.",
  },
  "/sa/services/criminal-law": {
    title: "Criminal Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online criminal law advice in Saudi Arabia on complaints, investigation, defense strategy, evidence, and court procedures.",
  },
  "/sa/services/cyber-law": {
    title: "Cybercrime & IT Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online cybercrime and IT law advice in Saudi Arabia on cybercrime, online defamation, data protection, digital evidence, and IT disputes.",
  },
  "/sa/services/employment-law": {
    title: "Employment Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online employment law advice in Saudi Arabia on termination, unpaid wages, contracts, workplace disputes, and labor claims.",
  },
  "/sa/services/enforcement": {
    title: "Enforcement & Debt Collection Lawyer in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online enforcement and debt collection advice in Saudi Arabia on judgment enforcement, debt recovery, payment claims, and execution steps.",
  },
  "/sa/services/family-law": {
    title: "Family Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online family law advice in Saudi Arabia on divorce, custody, alimony, visitation, inheritance, and personal status matters.",
  },
  "/sa/services/foreign-investment": {
    title: "Foreign Investment Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online foreign investment law advice in Saudi Arabia on foreign company setup, licensing, registration, compliance, and business entry.",
  },
  "/sa/services/insurance-law": {
    title: "Insurance Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online insurance law advice in Saudi Arabia on claim denial, policy disputes, compensation, insurer liability, and settlements.",
  },
  "/sa/services/intellectual-property": {
    title: "Intellectual Property Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online intellectual property law advice in Saudi Arabia on trademarks, copyrights, patents, trade secrets, infringement, and IP protection.",
  },
  "/sa/services/medical-malpractice": {
    title: "Medical Malpractice Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online medical malpractice law advice in Saudi Arabia on medical negligence, surgical errors, misdiagnosis, liability, and compensation.",
  },
  "/sa/services/real-estate": {
    title: "Real Estate Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online real estate law advice in Saudi Arabia on ownership disputes, leases, construction defects, sale contracts, and property claims.",
  },
  "/sa/services/tax-zakat": {
    title: "Tax & Zakat Law Consultation in Saudi Arabia | CounselO",
    description:
      "Get 24-hour online tax and zakat law advice in Saudi Arabia on tax assessments, zakat, VAT, customs, objections, and compliance.",
  },
  "/sa/services": {
    title: "17 Legal Practice Areas in Saudi Arabia | CounselO",
    description:
      "Choose your legal consultation area in Saudi Arabia: family, employment, real estate, companies, contracts, arbitration, criminal law, tax, and more.",
  },
  "/sa/terms-of-service": {
    title: "Terms of Service | CounselO Saudi Arabia",
    description:
      "Review CounselO Saudi Arabia's consultation process, including submission, fee confirmation, payment, delivery, and clarification policy.",
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
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/administrative-court-disputes-syria",
  },
  "/syr/ar/blog/child-custody-saudi-arabia": {
    title: "الحضانة في سوريا | الحقوق والإجراءات",
    description:
      "تعرف على أحكام الحضانة والولاية والزيارة والمسائل الأسرية في سوريا قبل طلب استشارة قانونية متخصصة.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/child-custody-syria",
  },
  "/syr/ar/blog/divorce-in-saudi-arabia": {
    title: "الطلاق في سوريا | الحقوق والإجراءات",
    description:
      "تعرف على مسائل الطلاق والتفريق والحضانة والنفقة والتوثيق في سوريا قبل طلب استشارة قانونية متخصصة.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/divorce-in-syria",
  },
  "/syr/ar/blog/foreign-company-registration-saudi-arabia": {
    title: "تسجيل شركة أجنبية في سوريا",
    description:
      "دليل قانوني حول تسجيل الشركات الأجنبية في سوريا، الترخيص، السجل التجاري، أنواع الشركات، والأخطاء الشائعة.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/foreign-company-registration-syria",
  },
  "/syr/ar/blog/real-estate-disputes-saudi-arabia": {
    title: "النزاعات العقارية في سوريا",
    description:
      "تعرف على الخيارات القانونية في النزاعات العقارية داخل سوريا، بما يشمل الملكية والإيجار وعيوب البناء والتعويض.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/real-estate-disputes-syria",
  },
  "/syr/ar/blog/wrongful-termination-saudi-labor-law": {
    title: "الفصل التعسفي في سوريا | حقوق العامل",
    description:
      "تعرف على حقوق العامل عند الفصل التعسفي في سوريا، والتعويضات والأدلة والمواعيد قبل طلب استشارة قانونية.",
    canonicalOverride: "https://counselo-legal.com/syr/ar/blog/wrongful-termination-syrian-labor-law",
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
      "استشارة أونلاين خلال 24 ساعة في القانون الإداري داخل سوريا: قرارات حكومية، اعتراضات، ومنازعات إدارية.",
  },
  "/syr/ar/services/arbitration": {
    title: "استشارة تحكيم ووساطة في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في التحكيم والوساطة داخل سوريا: تحكيم تجاري، وساطة، تسوية، وتنفيذ أحكام.",
  },
  "/syr/ar/services/banking-finance": {
    title: "استشارة مصارف وتمويل في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في المصارف والتمويل داخل سوريا: نزاعات مصرفية، عقود تمويل، وتمويل إسلامي.",
  },
  "/syr/ar/services/business-law": {
    title: "استشارة قانون تجاري في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في القانون التجاري داخل سوريا: نزاعات تجارية، عقود، معاملات، ومسؤولية.",
  },
  "/syr/ar/services/civil-law": {
    title: "استشارة قانون مدني في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في القانون المدني داخل سوريا: دعاوى مدنية، التزامات، تعويض، وحقوق خاصة.",
  },
  "/syr/ar/services/civil-procedure": {
    title: "استشارة أصول محاكمات مدنية في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في أصول المحاكمات المدنية داخل سوريا: إجراءات التقاضي، المواعيد، الاختصاص، والطعون.",
  },
  "/syr/ar/services/companies-law": {
    title: "استشارة قانون شركات في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في قانون الشركات داخل سوريا: تأسيس شركات، نزاعات شركاء، حوكمة، ومسؤولية.",
  },
  "/syr/ar/services/contracts": {
    title: "استشارة عقود في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في العقود داخل سوريا: صياغة العقود، مراجعتها، الإخلال، الفسخ، والتنفيذ.",
  },
  "/syr/ar/services/criminal-law": {
    title: "استشارة قانون جزائي في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في القانون الجزائي داخل سوريا: شكاوى جزائية، تحقيق، دفاع، أدلة، وإجراءات محكمة.",
  },
  "/syr/ar/services/criminal-procedure": {
    title: "استشارة أصول محاكمات جزائية في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في أصول المحاكمات الجزائية داخل سوريا: تحقيق، توقيف، أدلة، طعون، وحقوق إجرائية.",
  },
  "/syr/ar/services/cyber-law": {
    title: "استشارة جرائم إلكترونية في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في الجرائم الإلكترونية داخل سوريا: جرائم إلكترونية، تشهير، حماية بيانات، وأدلة رقمية.",
  },
  "/syr/ar/services/employment-law": {
    title: "استشارة قانون عمل في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في قانون العمل داخل سوريا: فصل، أجور متأخرة، عقود عمل، ومنازعات عمالية.",
  },
  "/syr/ar/services/enforcement": {
    title: "استشارة تنفيذ وتحصيل ديون في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في التنفيذ وتحصيل الديون داخل سوريا: تنفيذ أحكام، تحصيل ديون، مطالبات مالية، وإجراءات تنفيذ.",
  },
  "/syr/ar/services/family-law": {
    title: "استشارة قانون أسرة في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في الأحوال الشخصية داخل سوريا: طلاق، حضانة، نفقة، زيارة، ميراث، ومسائل أسرية.",
  },
  "/syr/ar/services/foreign-investment": {
    title: "استشارة استثمار أجنبي في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في الاستثمار الأجنبي داخل سوريا: تأسيس شركات أجنبية، ترخيص، سجل تجاري، وامتثال.",
  },
  "/syr/ar/services/insurance-law": {
    title: "استشارة قانون تأمين في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في قانون التأمين داخل سوريا: رفض تعويضات، منازعات وثائق، مسؤولية تأمينية، وتسوية.",
  },
  "/syr/ar/services/intellectual-property": {
    title: "استشارة ملكية فكرية في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في الملكية الفكرية داخل سوريا: علامات تجارية، حقوق مؤلف، براءات، وأسرار تجارية.",
  },
  "/syr/ar/services/medical-malpractice": {
    title: "استشارة أخطاء طبية في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في الأخطاء الطبية داخل سوريا: إهمال طبي، أخطاء جراحية، سوء تشخيص، وتعويض.",
  },
  "/syr/ar/services/real-estate": {
    title: "استشارة نزاعات عقارية في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في القانون العقاري داخل سوريا: نزاعات ملكية، إيجارات، عيوب بناء، وعقود عقارية.",
  },
  "/syr/ar/services/tax-zakat": {
    title: "استشارة قانون ضرائب في سوريا | كاونسلو",
    description:
      "استشارة أونلاين خلال 24 ساعة في الضرائب والزكاة داخل سوريا: تقييمات ضريبية، زكاة، قيمة مضافة، جمارك، واعتراضات.",
  },
  "/syr/ar/services": {
    title: "20 مجالاً للاستشارة القانونية في سوريا",
    description:
      "اختر مجال استشارتك القانونية في سوريا: الأسرة، العمل، العقارات، الشركات، العقود، التحكيم، الجرائم، الضرائب وغيرها.",
  },
  "/syr/ar/terms-of-service": {
    title: "شروط الخدمة | كاونسلو سوريا",
    description:
      "تعرف على آلية طلب الاستشارة القانونية في سوريا عبر كاونسلو، من إرسال التفاصيل إلى الدفع واستلام الرد القانوني.",
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
    canonicalOverride: "https://counselo-legal.com/syr/blog/administrative-court-disputes-syria",
  },
  "/syr/blog/child-custody-saudi-arabia": {
    title: "Child Custody in Syria | CounselO",
    description:
      "Understand child custody, guardianship, visitation, and family-law considerations in Syria before requesting legal consultation.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/child-custody-syria",
  },
  "/syr/blog/divorce-in-saudi-arabia": {
    title: "Divorce in Syria | Rights & Process",
    description:
      "Learn about divorce, separation, custody, alimony, inheritance, and documentation under Syrian family law before getting legal advice.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/divorce-in-syria",
  },
  "/syr/blog/foreign-company-registration-saudi-arabia": {
    title: "Foreign Company Registration in Syria",
    description:
      "A legal guide to foreign company registration in Syria, business licensing, commercial registration, company forms, and common mistakes.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/foreign-company-registration-syria",
  },
  "/syr/blog/real-estate-disputes-saudi-arabia": {
    title: "Real Estate Disputes in Syria",
    description:
      "Learn legal options for property disputes in Syria, including ownership claims, leases, construction defects, and compensation.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/real-estate-disputes-syria",
  },
  "/syr/blog/wrongful-termination-saudi-labor-law": {
    title: "Wrongful Termination in Syria",
    description:
      "Understand wrongful termination under Syrian labor law, including employee rights, compensation, evidence, deadlines, and legal options.",
    canonicalOverride: "https://counselo-legal.com/syr/blog/wrongful-termination-syrian-labor-law",
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
      "Learn how CounselO collects, protects, and handles Syria legal consultation data while preserving client confidentiality.",
  },
  "/syr/services/administrative-law": {
    title: "Administrative Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online administrative law advice in Syria on government decisions, objections, and administrative court strategy.",
  },
  "/syr/services/arbitration": {
    title: "Arbitration & Mediation Consultation in Syria | CounselO",
    description:
      "Get 24-hour online arbitration and mediation advice in Syria on commercial arbitration, mediation, settlements, and award enforcement.",
  },
  "/syr/services/banking-finance": {
    title: "Banking & Finance Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online banking and finance law advice in Syria on bank disputes, finance contracts, Islamic finance, and regulation.",
  },
  "/syr/services/business-law": {
    title: "Commercial Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online commercial law advice in Syria on commercial disputes, contracts, transactions, liability, and risk.",
  },
  "/syr/services/civil-law": {
    title: "Civil Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online civil law advice in Syria on civil claims, obligations, compensation, property rights, and private disputes.",
  },
  "/syr/services/civil-procedure": {
    title: "Civil Procedure Consultation in Syria | CounselO",
    description:
      "Get 24-hour online civil procedure advice in Syria on filings, deadlines, evidence, jurisdiction, appeals, and litigation steps.",
  },
  "/syr/services/companies-law": {
    title: "Companies Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online companies law advice in Syria on company formation, shareholder disputes, governance, and corporate claims.",
  },
  "/syr/services/contracts": {
    title: "Contract Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online contract law advice in Syria on drafting, review, breach, termination, enforcement, and negotiation.",
  },
  "/syr/services/criminal-law": {
    title: "Criminal Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online criminal law advice in Syria on complaints, investigation, defense strategy, evidence, and court procedures.",
  },
  "/syr/services/criminal-procedure": {
    title: "Criminal Procedure Consultation in Syria | CounselO",
    description:
      "Get 24-hour online criminal procedure advice in Syria on investigation, detention, evidence, appeals, and procedural rights.",
  },
  "/syr/services/cyber-law": {
    title: "Cybercrime & IT Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online cybercrime and IT law advice in Syria on cybercrime, online defamation, data protection, digital evidence, and IT disputes.",
  },
  "/syr/services/employment-law": {
    title: "Employment Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online employment law advice in Syria on termination, unpaid wages, contracts, workplace disputes, and labor claims.",
  },
  "/syr/services/enforcement": {
    title: "Enforcement & Debt Collection Consultation in Syria | CounselO",
    description:
      "Get 24-hour online enforcement and debt collection advice in Syria on judgment enforcement, debt recovery, payment claims, and execution steps.",
  },
  "/syr/services/family-law": {
    title: "Family Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online family law advice in Syria on divorce, custody, alimony, visitation, inheritance, and personal status matters.",
  },
  "/syr/services/foreign-investment": {
    title: "Foreign Investment Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online foreign investment law advice in Syria on foreign company setup, licensing, registration, compliance, and business entry.",
  },
  "/syr/services/insurance-law": {
    title: "Insurance Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online insurance law advice in Syria on claim denial, policy disputes, compensation, insurer liability, and settlements.",
  },
  "/syr/services/intellectual-property": {
    title: "Intellectual Property Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online intellectual property law advice in Syria on trademarks, copyrights, patents, trade secrets, infringement, and IP protection.",
  },
  "/syr/services/medical-malpractice": {
    title: "Medical Malpractice Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online medical malpractice law advice in Syria on medical negligence, surgical errors, misdiagnosis, liability, and compensation.",
  },
  "/syr/services/real-estate": {
    title: "Real Estate Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online real estate law advice in Syria on ownership disputes, leases, construction defects, sale contracts, and property claims.",
  },
  "/syr/services/tax-zakat": {
    title: "Tax & Zakat Law Consultation in Syria | CounselO",
    description:
      "Get 24-hour online tax and zakat law advice in Syria on tax assessments, zakat, VAT, customs, objections, and compliance.",
  },
  "/syr/services": {
    title: "20 Legal Practice Areas in Syria | CounselO",
    description:
      "Choose your legal consultation area in Syria: family, employment, real estate, companies, contracts, arbitration, criminal law, tax, and more.",
  },
  "/syr/terms-of-service": {
    title: "Terms of Service | CounselO Syria",
    description:
      "Review CounselO Syria's consultation process, including submission, fee confirmation, payment, delivery, and clarification policy.",
  },
  "/syr": {
    title: "Online Legal Consultation in Syria | CounselO",
    description:
      "Get online legal consultation in Syria in Arabic or English. Senior lawyer-led guidance within 24 hours via WhatsApp or email.",
  },
};
