import type { Region } from "./region-services";
import { articleModifiedAt } from "./article-context";

export type WorkContext = {
  region: Region | null;
  relatedServiceSlugs: string[];
  relatedBlogSlugs: string[];
  relatedWorkSlugs: string[];
  titleEn: string;
  titleAr: string;
  editorialUpdatedAt: string;
  creator?: "baghdadi-law";
};

/** Relationships selected from each published case account, not automatic topic guesses. */
export const WORK_CONTEXT: Readonly<Record<string, WorkContext>> = {
  "kyf-saadt-kawnslw-fy-astrdad-300000-ryal-abr-slh-qdayy-fy-nzaa-tjary": {
    "region": null,
    "relatedServiceSlugs": [],
    "relatedBlogSlugs": [
      "mta-ykwn-alslh-afdl-mn-alastmrar-fy-alkhswmh",
      "bna-astratyjyh-aldfaa-qbl-bd-alkhswmh"
    ],
    "relatedWorkSlugs": [
      "msandh-kawnslw-fy-qdyh-aabrh-llhdwd",
      "ray-qanwny-fy-tswyh-aabrh-llhdwd"
    ],
    "titleEn": "How CounselO Recovered SAR 300,000 Through a Judicial Settlement in a Commercial Dispute",
    "titleAr": "كيف ساعدت كاونسلو في استرداد 300,000 ريال عبر صلح قضائي في نزاع تجاري؟",
    "editorialUpdatedAt": "2026-09-06"
  },
  "kawnslw-w-tkhfyd-mtalbh-amwlh-tjaryh-mn-348-mlywn-ryal-ila-584-alf-ryal": {
    "region": "sa",
    "relatedServiceSlugs": [
      "business-law",
      "contracts"
    ],
    "relatedBlogSlugs": [
      "mta-ysthq-alwsyt-altjary-kaml-amwlth",
      "lys-kl-mblgh-ytalb-bh-yhkm-bh-kyf-tfkk-almtalbat-altjaryh-qbl-bna-aldfaa",
      "athbat-alaqwd-amam-alqda-alsawdy"
    ],
    "relatedWorkSlugs": [
      "kyf-sahmt-kawnslw-fy-tkhfyd-mtalbh-mn-500-alf-ryal-ila-227",
      "mnhj-kawnslw-fy-mrajah-alaqwd-altjaryh"
    ],
    "titleEn": "Reducing a Commercial Commission Claim from SAR 3.48 Million to SAR 584,131",
    "titleAr": "كاونسلو و تخفيض مطالبة عمولة تجارية من 3.48 مليون ريال إلى 584 ألف ريال",
    "editorialUpdatedAt": "2026-09-06"
  },
  "kyf-sahmt-kawnslw-fy-tkhfyd-mtalbh-mn-500-alf-ryal-ila-227": {
    "region": "sa",
    "relatedServiceSlugs": [
      "business-law",
      "contracts"
    ],
    "relatedBlogSlugs": [
      "lys-kl-mblgh-ytalb-bh-yhkm-bh-kyf-tfkk-almtalbat-altjaryh-qbl-bna-aldfaa",
      "almswwlyh-alaqdyh-fy-almaamlat-altjaryh",
      "athbat-alaqwd-amam-alqda-alsawdy"
    ],
    "relatedWorkSlugs": [
      "kawnslw-w-tkhfyd-mtalbh-amwlh-tjaryh-mn-348-mlywn-ryal-ila-584-alf-ryal",
      "thwyl-qdyh-mn-rfd-ala-qbwl-wtayyd"
    ],
    "titleEn": "How CounselO Reduced a SAR 500,000 Claim to SAR 227,000",
    "titleAr": "تخفيض مطالبة تجارية من 500 ألف ريال إلى 227 ألف ريال",
    "editorialUpdatedAt": "2026-09-06"
  },
  "ray-fy-mshrwa-qanwn-alwsath-alswry-maaljh-10-thghrat": {
    "region": "syr",
    "relatedServiceSlugs": [
      "arbitration",
      "civil-procedure"
    ],
    "relatedBlogSlugs": [
      "alaqd-fy-alqanwn-alswry",
      "alahlyh-fy-altaaqd-fy-alqanwn-alswry"
    ],
    "relatedWorkSlugs": [
      "drash-qdyh-aqaryh-maqdh-fy-swrya"
    ],
    "titleEn": "Opinion on Syria’s Mediation Law Bill: 10 Gaps",
    "titleAr": "رأي في مشروع قانون الوساطة السوري/ معالجة 10 ثغرات",
    "editorialUpdatedAt": "2026-09-06",
    "creator": "baghdadi-law"
  },
  "kyf-qadt-astratyjyh-kawnslw-ila-rfd-dawa-fskh-aqd-bya-wtawydat-bmlayyn-alryalat": {
    "region": "sa",
    "relatedServiceSlugs": [
      "contracts"
    ],
    "relatedBlogSlugs": [
      "alaywb-alkhfyh-fy-alaqwd-wathrha-alqanwny",
      "alfrq-byn-alfskh-waltawyd-fy-alaqwd-altjaryh",
      "fskh-alaqd-altjary-fy-alnzam-alsawdy"
    ],
    "relatedWorkSlugs": [
      "rfd-dawa-fskh-aqd-amtyaz-tjary-wtawyd",
      "fskh-aqd-snaay-wastrdad-aldfah-almqdmh"
    ],
    "titleEn": "How CounselO Defeated a Sale Contract Rescission Claim",
    "titleAr": "كيف قادت استراتيجية كاونسلو إلى رفض دعوى فسخ عقد بيع وتعويضات بملايين الريالات؟",
    "editorialUpdatedAt": "2026-09-06"
  },
  "msandh-kawnslw-fy-qdyh-aabrh-llhdwd": {
    "region": null,
    "relatedServiceSlugs": [],
    "relatedBlogSlugs": [
      "bna-astratyjyh-aldfaa-qbl-bd-alkhswmh",
      "mta-ykwn-alslh-afdl-mn-alastmrar-fy-alkhswmh"
    ],
    "relatedWorkSlugs": [
      "kyf-saadt-kawnslw-fy-astrdad-300000-ryal-abr-slh-qdayy-fy-nzaa-tjary",
      "thwyl-qdyh-mn-rfd-ala-qbwl-wtayyd"
    ],
    "titleEn": "CounselO’s Support in a Cross-Border Dispute",
    "titleAr": "مسانده كاونسلو في قضية عابرة للحدود",
    "editorialUpdatedAt": "2026-09-06"
  },
  "astratyjyh-kawnslw-lastrdad-sndat-lamr-bqymh-17-mlywn-ryal": {
    "region": "sa",
    "relatedServiceSlugs": [
      "enforcement",
      "contracts"
    ],
    "relatedBlogSlugs": [
      "alsnd-lamr-kadah-dman-mta-ythwl-ala-khtr-tnfydhy",
      "athbat-alaqwd-amam-alqda-alsawdy"
    ],
    "relatedWorkSlugs": [
      "mnazah-tnfydh",
      "hdwd-mswwlyh-alkfyl-fy-alsnd-lamr"
    ],
    "titleEn": "CounselO’s Strategy to Recover SAR 17 Million in Promissory Notes",
    "titleAr": "استراتيجية كاونسلو لاسترداد سندات لأمر بقيمة 17 مليون ريال",
    "editorialUpdatedAt": "2026-09-06"
  },
  "kawnslw-wtswyh-alarsdh-almalyh-qanwna": {
    "region": "sa",
    "relatedServiceSlugs": [
      "companies-law",
      "contracts"
    ],
    "relatedBlogSlugs": [
      "adarh-almkhatr-fy-alaqwd-wfq-alnzam-alsawdy",
      "altwsyat-alamlyh-lsyaghh-aqd-qwy"
    ],
    "relatedWorkSlugs": [
      "almttlbat-alqanwnyh-walhwkmh-aldakhlyh",
      "andma-la-ykwn-alnzaa-hwl-alwaya-anma-altkyyf"
    ],
    "titleEn": "CounselO and Legal Settlement of Financial Balances",
    "titleAr": "كاونسلو وتسوية الارصدة المالية قانونا",
    "editorialUpdatedAt": "2026-09-06"
  },
  "mnhj-kawnslw-fy-mrajah-alaqwd-altjaryh": {
    "region": null,
    "relatedServiceSlugs": [],
    "relatedBlogSlugs": [
      "hmayh-alamyl-mn-mswdh-alaqd-ala-altwqya",
      "syghh-mdhkrh-tfahm-qablh-lltadyl",
      "bna-astratyjyh-aldfaa-qbl-bd-alkhswmh"
    ],
    "relatedWorkSlugs": [
      "altfawd-alqanwny-aldhky",
      "atfaqyh-atar-ltqdym-alkhdmat-altqnyh-whlwl-aldhka-alastnaay"
    ],
    "titleEn": "CounselO’s Approach to Commercial Contract Review",
    "titleAr": "منهج كاونسلو في مراجعة العقود التجارية",
    "editorialUpdatedAt": "2026-09-06"
  },
  "kyf-adart-kawnslw-mrajah-mhasbyh-hsash": {
    "region": "sa",
    "relatedServiceSlugs": [
      "employment-law"
    ],
    "relatedBlogSlugs": [
      "mta-ythwl-twqya-alaaml-ala-mhdr-almrajah-ala-aqrar-balmswwlyh",
      "anha-aqd-alaml-bdwn-sbb-mshrwa"
    ],
    "relatedWorkSlugs": [
      "qdyh-mna-sfr-dd-aaml",
      "mn-atham-maly-maqd-ila-brah-qtayh"
    ],
    "titleEn": "How CounselO Managed a Sensitive Accounting Review",
    "titleAr": "كيف أدارت كاونسلو مراجعة محاسبية حساسة.",
    "editorialUpdatedAt": "2026-09-06"
  },
  "algha-mkhalfat-aldfaa-almdny-bhkm-qdayy": {
    "region": "sa",
    "relatedServiceSlugs": [
      "administrative-law"
    ],
    "relatedBlogSlugs": [
      "mta-ykwn-alqrar-aladary-qabla-llalgha-amam-dywan-almzalm"
    ],
    "relatedWorkSlugs": [
      "alaatrad-ala-almkhalfat-albyyyh",
      "drash-tan-amam-almhkmh-aladaryh-alalya"
    ],
    "titleEn": "Civil Defense Violations Annulled by Court",
    "titleAr": "الغاء مخالفات الدفاع المدني بحكم قضائي",
    "editorialUpdatedAt": "2026-09-06"
  },
  "rfd-dawa-fskh-aqd-amtyaz-tjary-wtawyd": {
    "region": "sa",
    "relatedServiceSlugs": [
      "contracts",
      "business-law"
    ],
    "relatedBlogSlugs": [
      "aqwd-alamtyaz-altjary-alfrnshayz-fy-alnzam-alsawdy",
      "fskh-alaqd-altjary-fy-alnzam-alsawdy",
      "alfrq-byn-alfskh-waltawyd-fy-alaqwd-altjaryh"
    ],
    "relatedWorkSlugs": [
      "kyf-qadt-astratyjyh-kawnslw-ila-rfd-dawa-fskh-aqd-bya-wtawydat-bmlayyn-alryalat",
      "fskh-aqd-snaay-wastrdad-aldfah-almqdmh"
    ],
    "titleEn": "Dismissal of Franchise Agreement Termination and Compensation Claim",
    "titleAr": "رفض دعوى فسخ عقد امتياز تجاري وتعويض",
    "editorialUpdatedAt": "2026-09-06"
  },
  "mn-alkhta-ala-altawyd-kyf-hddt-kawnslw-almswwl-almbashran-hadth": {
    "region": "sa",
    "relatedServiceSlugs": [
      "insurance-law"
    ],
    "relatedBlogSlugs": [
      "almswwlyh-an-fal-alghyr"
    ],
    "relatedWorkSlugs": [
      "maaljh-halh-khta-tby"
    ],
    "titleEn": "From Error to Compensation: How CounselO Identified the Directly Responsible Party in an Accident",
    "titleAr": "من الخطأ الى التعويض: كيف حددت كاونسلو المسؤول المباشرعن حادث",
    "editorialUpdatedAt": "2026-09-06"
  },
  "thwyl-qdyh-mn-rfd-ala-qbwl-wtayyd": {
    "region": "sa",
    "relatedServiceSlugs": [
      "business-law",
      "contracts"
    ],
    "relatedBlogSlugs": [
      "athbat-alaqwd-amam-alqda-alsawdy",
      "almswwlyh-alaqdyh-fy-almaamlat-altjaryh",
      "bna-astratyjyh-aldfaa-qbl-bd-alkhswmh"
    ],
    "relatedWorkSlugs": [
      "kawnslw-tdam-shrkh-lastrdad-448958-ryala-an-aqd-mqawlat",
      "darsh-qdyh-qbl-alnzaa"
    ],
    "titleEn": "Equipment Non-Delivery: SAR 248,600 Award After Appeal",
    "titleAr": "عدم تسليم معدات: حكم بـ248,600 ريال بعد الاستئناف",
    "editorialUpdatedAt": "2026-09-06"
  },
  "tfkyk-mstndat-altmas-aaadh-alnzr-bnjah": {
    "region": "sa",
    "relatedServiceSlugs": [
      "enforcement",
      "contracts"
    ],
    "relatedBlogSlugs": [
      "mta-yqbl-altmas-aaadh-alnzr-atjahat-qdayyh-mhmh",
      "aqwd-almqawlat-fy-alnzam-alsawdy"
    ],
    "relatedWorkSlugs": [
      "kyf-sahmt-kawnslw-fy-anjah-mlf-thkymy-kaml",
      "mswwlyh-almqawlyn"
    ],
    "titleEn": "Successful Defense of a Reconsideration Petition",
    "titleAr": "تفكيك مستندات التماس اعاده النظر بنجاح",
    "editorialUpdatedAt": "2026-09-06"
  },
  "alaatrad-ala-almkhalfat-albyyyh": {
    "region": "sa",
    "relatedServiceSlugs": [
      "administrative-law"
    ],
    "relatedBlogSlugs": [
      "mta-ykwn-alqrar-aladary-qabla-llalgha-amam-dywan-almzalm"
    ],
    "relatedWorkSlugs": [
      "algha-mkhalfat-aldfaa-almdny-bhkm-qdayy",
      "drash-tan-amam-almhkmh-aladaryh-alalya"
    ],
    "titleEn": "Environmental Violations Objection",
    "titleAr": "الاعتراض على المخالفات البيئية",
    "editorialUpdatedAt": "2026-09-06"
  },
  "thlyl-mkhatr-nql-alaswl-walmsthqat-byn-alshrkat-almrtbth-athna-altsfyh": {
    "region": "sa",
    "relatedServiceSlugs": [
      "companies-law",
      "business-law"
    ],
    "relatedBlogSlugs": [
      "hwkmh-alshrkat-kdmanh-mwdwayh-lhmayh-hqwq-msahmy-alaqlyh",
      "bna-astratyjyh-aldfaa-qbl-bd-alkhswmh"
    ],
    "relatedWorkSlugs": [
      "ray-qanwny-fy-tlb-aflas",
      "andma-la-ykwn-alnzaa-hwl-alwaya-anma-altkyyf"
    ],
    "titleEn": "Analyzing the Risks of Transferring Assets and Receivables Between Related Companies During Liquidation",
    "titleAr": "تحليل مخاطر نقل الأصول والمستحقات بين الشركات المرتبطة أثناء التصفية",
    "editorialUpdatedAt": "2026-09-06"
  },
  "adrah-almkhatr-fy-aqd-tamyny": {
    "region": "sa",
    "relatedServiceSlugs": [
      "insurance-law",
      "contracts"
    ],
    "relatedBlogSlugs": [
      "aqwd-almqawlat-fy-alnzam-alsawdy",
      "adarh-almkhatr-fy-alaqwd-wfq-alnzam-alsawdy"
    ],
    "relatedWorkSlugs": [
      "mswwlyh-almqawlyn",
      "mnhj-kawnslw-fy-mrajah-alaqwd-altjaryh"
    ],
    "titleEn": "Insurance Requirements in a Saudi Construction Contract",
    "titleAr": "ادراة المخاطر في عقد تأميني",
    "editorialUpdatedAt": "2026-09-06"
  },
  "kyf-athbtt-kawnslw-alshrakh": {
    "region": "sa",
    "relatedServiceSlugs": [
      "companies-law"
    ],
    "relatedBlogSlugs": [
      "hwkmh-alshrkat-kdmanh-mwdwayh-lhmayh-hqwq-msahmy-alaqlyh",
      "athbat-alaqwd-amam-alqda-alsawdy"
    ],
    "relatedWorkSlugs": [
      "andma-la-ykwn-alnzaa-hwl-alwaya-anma-altkyyf",
      "almttlbat-alqanwnyh-walhwkmh-aldakhlyh"
    ],
    "titleEn": "How CounselO Proved the Partnership",
    "titleAr": "كيف اثبتت كاونسلو الشراكه",
    "editorialUpdatedAt": "2026-09-06"
  },
  "kyf-sahmt-kawnslw-fy-anjah-mlf-thkymy-kaml": {
    "region": "sa",
    "relatedServiceSlugs": [
      "arbitration",
      "contracts"
    ],
    "relatedBlogSlugs": [
      "mta-yfqd-shrt-althkym-athrh-alamly-fy-alnzaa",
      "aqwd-almqawlat-fy-alnzam-alsawdy",
      "athbat-alaqwd-amam-alqda-alsawdy"
    ],
    "relatedWorkSlugs": [
      "mswwlyh-almqawlyn",
      "kawnslw-tdam-shrkh-lastrdad-448958-ryala-an-aqd-mqawlat"
    ],
    "titleEn": "Construction Arbitration: Organising Claims and Expert Evidence",
    "titleAr": "تحكيم مقاولات: تنظيم المطالبات وأدلة الخبرة",
    "editorialUpdatedAt": "2026-09-06"
  },
  "kawnslw-tdam-shrkh-lastrdad-448958-ryala-an-aqd-mqawlat": {
    "region": "sa",
    "relatedServiceSlugs": [
      "contracts",
      "business-law"
    ],
    "relatedBlogSlugs": [
      "aqwd-almqawlat-fy-alnzam-alsawdy",
      "athbat-alaqwd-amam-alqda-alsawdy"
    ],
    "relatedWorkSlugs": [
      "mn-drash-almstndat-ila-alhkm-bjmya-altlbat",
      "darsh-qdyh-qbl-alnzaa"
    ],
    "titleEn": "Construction Payment Claim: Judgment for SAR 448,958",
    "titleAr": "مطالبة بمستحقات مقاولات: حكم بـ448,958 ريالاً",
    "editorialUpdatedAt": "2026-09-06"
  },
  "mn-drash-almstndat-ila-alhkm-bjmya-altlbat": {
    "region": "sa",
    "relatedServiceSlugs": [
      "contracts",
      "business-law"
    ],
    "relatedBlogSlugs": [
      "aqwd-almqawlat-fy-alnzam-alsawdy",
      "almswwlyh-alaqdyh-fy-almaamlat-altjaryh"
    ],
    "relatedWorkSlugs": [
      "kawnslw-tdam-shrkh-lastrdad-448958-ryala-an-aqd-mqawlat",
      "darsh-qdyh-qbl-alnzaa"
    ],
    "titleEn": "Construction Receivables: Judgment on SAR 2,049,094 in Claims",
    "titleAr": "مستحقات مقاولات: حكم في مطالبات بإجمالي 2,049,094 ريالاً",
    "editorialUpdatedAt": "2026-09-06"
  },
  "tshyh-altkyyf-alqanwny-lanha-aqd-alaml": {
    "region": "sa",
    "relatedServiceSlugs": [
      "employment-law"
    ],
    "relatedBlogSlugs": [
      "anha-aqd-alaml-bdwn-sbb-mshrwa",
      "altakhr-fy-alrwatb-aw-alamtnaa-an-dfaha"
    ],
    "relatedWorkSlugs": [
      "hyn-la-tnthy-alqdyh-balhkm-alawl-kyf-qlbt-kawnslw-msar-nzaa-amaly",
      "qdyh-mna-sfr-dd-aaml"
    ],
    "titleEn": "Correcting the Legal Characterisation of Employment Contract Termination",
    "titleAr": "تصحيح التكييف القانوني لانهاء عقد العمل",
    "editorialUpdatedAt": "2026-09-06"
  },
  "fskh-aqd-iyjar-tjary-bsbb-khta-byanat-mnsh-iyjar": {
    "region": "sa",
    "relatedServiceSlugs": [
      "real-estate",
      "contracts"
    ],
    "relatedBlogSlugs": [
      "fskh-alaqd-altjary-fy-alnzam-alsawdy",
      "e-contracts-legal-validity-saudi-arabia"
    ],
    "relatedWorkSlugs": [
      "alajrh-mqabl-almnfah-fy-aliyjar-altjary"
    ],
    "titleEn": "Termination of Commercial Lease Due to Ejar Data Error",
    "titleAr": "فسخ عقد إيجار تجاري بسبب خطأ بيانات منصة إيجار",
    "editorialUpdatedAt": "2026-09-06"
  },
  "fskh-aqd-snaay-wastrdad-aldfah-almqdmh": {
    "region": "sa",
    "relatedServiceSlugs": [
      "contracts"
    ],
    "relatedBlogSlugs": [
      "fskh-alaqd-altjary-fy-alnzam-alsawdy",
      "aqwd-almqawlat-fy-alnzam-alsawdy"
    ],
    "relatedWorkSlugs": [
      "mswwlyh-almqawlyn",
      "kyf-qadt-astratyjyh-kawnslw-ila-rfd-dawa-fskh-aqd-bya-wtawydat-bmlayyn-alryalat"
    ],
    "titleEn": "Termination of Industrial Contract and Recovery of Advance Payment",
    "titleAr": "فسخ عقد صناعي واسترداد الدفعة المقدمة",
    "editorialUpdatedAt": "2026-09-06"
  },
  "andma-la-ykwn-alnzaa-hwl-alwaya-anma-altkyyf": {
    "region": "sa",
    "relatedServiceSlugs": [
      "companies-law"
    ],
    "relatedBlogSlugs": [
      "hwkmh-alshrkat-kdmanh-mwdwayh-lhmayh-hqwq-msahmy-alaqlyh",
      "athbat-alaqwd-amam-alqda-alsawdy"
    ],
    "relatedWorkSlugs": [
      "kyf-athbtt-kawnslw-alshrakh",
      "almttlbat-alqanwnyh-walhwkmh-aldakhlyh"
    ],
    "titleEn": "Partner Payments or Company Debt? Assessing Grounds for Appeal",
    "titleAr": "مدفوعات شريك أم دين على الشركة؟ دراسة أسباب الاستئناف",
    "editorialUpdatedAt": "2026-09-06"
  },
  "mnazah-tnfydh": {
    "region": "sa",
    "relatedServiceSlugs": [
      "enforcement"
    ],
    "relatedBlogSlugs": [
      "alsnd-lamr-kadah-dman-mta-ythwl-ala-khtr-tnfydhy",
      "athbat-alaqwd-amam-alqda-alsawdy",
      "e-contracts-legal-validity-saudi-arabia"
    ],
    "relatedWorkSlugs": [
      "hdwd-mswwlyh-alkfyl-fy-alsnd-lamr",
      "astratyjyh-kawnslw-lastrdad-sndat-lamr-bqymh-17-mlywn-ryal"
    ],
    "titleEn": "Bank Transfer Allocation in an Enforcement Dispute",
    "titleAr": "تحديد سبب الحوالة المالية في منازعة تنفيذ",
    "editorialUpdatedAt": "2026-09-06"
  },
  "mta-tkwn-hyyh-althkym-ghyr-mkhtsh-athr-mkhalfh-shrt-althkym": {
    "region": null,
    "relatedServiceSlugs": [],
    "relatedBlogSlugs": [
      "hmayh-alamyl-mn-mswdh-alaqd-ala-altwqya",
      "bna-astratyjyh-aldfaa-qbl-bd-alkhswmh"
    ],
    "relatedWorkSlugs": [
      "altfawd-alqanwny-aldhky",
      "kyf-sahmt-kawnslw-fy-anjah-mlf-thkymy-kaml"
    ],
    "titleEn": "When Is an Arbitral Tribunal Incompetent? Effect of Breaching the Arbitration Clause",
    "titleAr": "متى تكون هيئة التحكيم غير مختصة؟ أثر مخالفة شرط التحكيم",
    "editorialUpdatedAt": "2026-09-06"
  },
  "alajrh-mqabl-almnfah-fy-aliyjar-altjary": {
    "region": "sa",
    "relatedServiceSlugs": [
      "real-estate",
      "contracts"
    ],
    "relatedBlogSlugs": [
      "fskh-alaqd-altjary-fy-alnzam-alsawdy",
      "athbat-alaqwd-amam-alqda-alsawdy"
    ],
    "relatedWorkSlugs": [
      "fskh-aqd-iyjar-tjary-bsbb-khta-byanat-mnsh-iyjar"
    ],
    "titleEn": "Rent vs. Enjoyment in Commercial Leasing",
    "titleAr": "الأجرة مقابل المنفعة في الإيجار التجاري",
    "editorialUpdatedAt": "2026-09-06"
  },
  "hdwd-mswwlyh-alkfyl-fy-alsnd-lamr": {
    "region": "sa",
    "relatedServiceSlugs": [
      "enforcement"
    ],
    "relatedBlogSlugs": [
      "alsnd-lamr-kadah-dman-mta-ythwl-ala-khtr-tnfydhy",
      "athbat-alaqwd-amam-alqda-alsawdy"
    ],
    "relatedWorkSlugs": [
      "mnazah-tnfydh",
      "astratyjyh-kawnslw-lastrdad-sndat-lamr-bqymh-17-mlywn-ryal"
    ],
    "titleEn": "Limits of the Guarantor's Liability in a Promissory Note",
    "titleAr": "حدود مسؤولية الكفيل في السند لأمر",
    "editorialUpdatedAt": "2026-09-06"
  },
  "almttlbat-alqanwnyh-walhwkmh-aldakhlyh": {
    "region": "sa",
    "relatedServiceSlugs": [
      "companies-law",
      "contracts"
    ],
    "relatedBlogSlugs": [
      "hwkmh-alshrkat-kdmanh-mwdwayh-lhmayh-hqwq-msahmy-alaqlyh",
      "altwsyat-alamlyh-lsyaghh-aqd-qwy"
    ],
    "relatedWorkSlugs": [
      "kawnslw-wtswyh-alarsdh-almalyh-qanwna",
      "andma-la-ykwn-alnzaa-hwl-alwaya-anma-altkyyf"
    ],
    "titleEn": "Intercompany Settlement: Corporate Approvals and Signing Authority",
    "titleAr": "تسوية بين شركات مرتبطة: الموافقات وصلاحية التوقيع",
    "editorialUpdatedAt": "2026-09-06"
  },
  "hl-ymkn-tjawz-altqadm-brfa-dawa-alithra-bla-sbb": {
    "region": "sa",
    "relatedServiceSlugs": [
      "contracts",
      "business-law"
    ],
    "relatedBlogSlugs": [
      "aqwd-almqawlat-fy-alnzam-alsawdy",
      "bna-astratyjyh-aldfaa-qbl-bd-alkhswmh"
    ],
    "relatedWorkSlugs": [
      "darsh-qdyh-qbl-alnzaa",
      "mswwlyh-almqawlyn"
    ],
    "titleEn": "Can Limitation Be Circumvented by Filing an Unjust Enrichment Claim?",
    "titleAr": "هل يمكن تجاوز التقادم برفع دعوى الإثراء بلا سبب؟",
    "editorialUpdatedAt": "2026-09-06"
  },
  "mswwlyh-almqawlyn": {
    "region": "sa",
    "relatedServiceSlugs": [
      "contracts"
    ],
    "relatedBlogSlugs": [
      "aqwd-almqawlat-fy-alnzam-alsawdy",
      "fskh-alaqd-altjary-fy-alnzam-alsawdy",
      "Penalty-clause-in-saudi"
    ],
    "relatedWorkSlugs": [
      "adrah-almkhatr-fy-aqd-tamyny",
      "fskh-aqd-snaay-wastrdad-aldfah-almqdmh"
    ],
    "titleEn": "Subcontractor Replacement and Back Charges: Liability Review",
    "titleAr": "استبدال مقاول الباطن وتحميله التكاليف: دراسة المسؤولية",
    "editorialUpdatedAt": "2026-09-06"
  },
  "astsharh-fy-ahtyal-maly": {
    "region": "sa",
    "relatedServiceSlugs": [
      "banking-finance",
      "cyber-law"
    ],
    "relatedBlogSlugs": [
      "e-contracts-legal-validity-saudi-arabia",
      "athbat-alaqwd-amam-alqda-alsawdy"
    ],
    "relatedWorkSlugs": [
      "mn-atham-maly-maqd-ila-brah-qtayh",
      "mnazah-tnfydh"
    ],
    "titleEn": "Consultation on Financial Fraud",
    "titleAr": "استشاره في احتيال مالي",
    "editorialUpdatedAt": "2026-09-06"
  },
  "drash-qdyh-aqaryh-maqdh-fy-swrya": {
    "region": "syr",
    "relatedServiceSlugs": [
      "real-estate",
      "civil-law"
    ],
    "relatedBlogSlugs": [
      "consensual-formal-real-contracts-syrian-law",
      "defects-of-will-syrian-law",
      "contract-interpretation-syrian-courts"
    ],
    "relatedWorkSlugs": [
      "ray-fy-mshrwa-qanwn-alwsath-alswry-maaljh-10-thghrat"
    ],
    "titleEn": "Analysis of a Complex Real Estate Case in Syria",
    "titleAr": "دراسه قضيه عقاريه معقده في سوريا",
    "editorialUpdatedAt": "2026-09-06"
  },
  "darsh-qdyh-qbl-alnzaa": {
    "region": "sa",
    "relatedServiceSlugs": [
      "business-law",
      "contracts"
    ],
    "relatedBlogSlugs": [
      "athbat-alaqwd-amam-alqda-alsawdy",
      "almswwlyh-alaqdyh-fy-almaamlat-altjaryh",
      "bna-astratyjyh-aldfaa-qbl-bd-alkhswmh"
    ],
    "relatedWorkSlugs": [
      "kawnslw-tdam-shrkh-lastrdad-448958-ryala-an-aqd-mqawlat",
      "thwyl-qdyh-mn-rfd-ala-qbwl-wtayyd"
    ],
    "titleEn": "Pre-Litigation Assessment of a Manpower Services Payment Claim",
    "titleAr": "دراسة مطالبة بمستحقات توريد عمالة قبل رفع الدعوى",
    "editorialUpdatedAt": "2026-09-06"
  },
  "maaljh-halh-khta-tby": {
    "region": "sa",
    "relatedServiceSlugs": [
      "medical-malpractice"
    ],
    "relatedBlogSlugs": [
      "almswwlyh-an-fal-alghyr"
    ],
    "relatedWorkSlugs": [
      "mn-alkhta-ala-altawyd-kyf-hddt-kawnslw-almswwl-almbashran-hadth"
    ],
    "titleEn": "Handling a Medical Malpractice Case",
    "titleAr": "معالجة حالة خطأ طبي",
    "editorialUpdatedAt": "2026-09-06"
  },
  "ray-qanwny-fy-tswyh-aabrh-llhdwd": {
    "region": "sa",
    "relatedServiceSlugs": [
      "companies-law",
      "contracts"
    ],
    "relatedBlogSlugs": [
      "hwkmh-alshrkat-kdmanh-mwdwayh-lhmayh-hqwq-msahmy-alaqlyh",
      "adarh-almkhatr-fy-alaqwd-wfq-alnzam-alsawdy"
    ],
    "relatedWorkSlugs": [
      "almttlbat-alqanwnyh-walhwkmh-aldakhlyh",
      "mnhj-kawnslw-fy-mrajah-alaqwd-altjaryh"
    ],
    "titleEn": "Legal Opinion on a Cross-Border Settlement",
    "titleAr": "رأي قانوني في تسوية عابرة للحدود",
    "editorialUpdatedAt": "2026-09-06"
  },
  "altfawd-alqanwny-aldhky": {
    "region": null,
    "relatedServiceSlugs": [],
    "relatedBlogSlugs": [
      "hmayh-alamyl-mn-mswdh-alaqd-ala-altwqya",
      "syghh-mdhkrh-tfahm-qablh-lltadyl"
    ],
    "relatedWorkSlugs": [
      "mnhj-kawnslw-fy-mrajah-alaqwd-altjaryh",
      "atfaqyh-atar-ltqdym-alkhdmat-altqnyh-whlwl-aldhka-alastnaay"
    ],
    "titleEn": "Negotiating an International Technology NDA and Non-Circumvention Terms",
    "titleAr": "التفاوض على سرية مشروع تقني دولي وشروط عدم الالتفاف",
    "editorialUpdatedAt": "2026-09-06"
  },
  "qdyh-mna-sfr-dd-aaml": {
    "region": "sa",
    "relatedServiceSlugs": [
      "employment-law"
    ],
    "relatedBlogSlugs": [
      "mta-ythwl-twqya-alaaml-ala-mhdr-almrajah-ala-aqrar-balmswwlyh",
      "anha-aqd-alaml-bdwn-sbb-mshrwa"
    ],
    "relatedWorkSlugs": [
      "kyf-adart-kawnslw-mrajah-mhasbyh-hsash",
      "hyn-la-tnthy-alqdyh-balhkm-alawl-kyf-qlbt-kawnslw-msar-nzaa-amaly"
    ],
    "titleEn": "Travel Ban Case Against an Employee",
    "titleAr": "قضية منع سفر ضد عامل",
    "editorialUpdatedAt": "2026-09-06"
  },
  "mn-atham-maly-maqd-ila-brah-qtayh": {
    "region": "sa",
    "relatedServiceSlugs": [
      "criminal-law"
    ],
    "relatedBlogSlugs": [
      "mta-ythwl-twqya-alaaml-ala-mhdr-almrajah-ala-aqrar-balmswwlyh",
      "bna-astratyjyh-aldfaa-qbl-bd-alkhswmh"
    ],
    "relatedWorkSlugs": [
      "astsharh-fy-ahtyal-maly",
      "kyf-adart-kawnslw-mrajah-mhasbyh-hsash"
    ],
    "titleEn": "From a Complex Financial Accusation to a Final Acquittal",
    "titleAr": "من اتهام مالي معقد إلى براءة قطعية",
    "editorialUpdatedAt": "2026-09-06"
  },
  "hyn-la-tnthy-alqdyh-balhkm-alawl-kyf-qlbt-kawnslw-msar-nzaa-amaly": {
    "region": "sa",
    "relatedServiceSlugs": [
      "employment-law"
    ],
    "relatedBlogSlugs": [
      "anha-aqd-alaml-bdwn-sbb-mshrwa",
      "altakhr-fy-alrwatb-aw-alamtnaa-an-dfaha"
    ],
    "relatedWorkSlugs": [
      "tshyh-altkyyf-alqanwny-lanha-aqd-alaml",
      "qdyh-mna-sfr-dd-aaml"
    ],
    "titleEn": "When the First Judgment Is Not the End: How CounselO Reversed an Employment Dispute",
    "titleAr": "حين لا تنتهي القضية بالحكم الأول: كيف قلبت كاونسلو مسار نزاع عمالي؟",
    "editorialUpdatedAt": "2026-09-06"
  },
  "drash-tan-amam-almhkmh-aladaryh-alalya": {
    "region": "sa",
    "relatedServiceSlugs": [
      "administrative-law"
    ],
    "relatedBlogSlugs": [
      "mta-ykwn-alqrar-aladary-qabla-llalgha-amam-dywan-almzalm"
    ],
    "relatedWorkSlugs": [
      "alaatrad-ala-almkhalfat-albyyyh",
      "algha-mkhalfat-aldfaa-almdny-bhkm-qdayy"
    ],
    "titleEn": "Study of an Appeal Before the Supreme Administrative Court",
    "titleAr": "دراسة طعن امام المحكمة الادارية العليا",
    "editorialUpdatedAt": "2026-09-06"
  },
  "atfaqyh-atar-ltqdym-alkhdmat-altqnyh-whlwl-aldhka-alastnaay": {
    "region": null,
    "relatedServiceSlugs": [],
    "relatedBlogSlugs": [
      "hmayh-alamyl-mn-mswdh-alaqd-ala-altwqya",
      "syghh-mdhkrh-tfahm-qablh-lltadyl"
    ],
    "relatedWorkSlugs": [
      "altfawd-alqanwny-aldhky"
    ],
    "titleEn": "Framework Agreement for Technology Services and AI Solutions",
    "titleAr": "اتفاقية اطار لتقديم الخدمات التقنية وحلول الذكاء الاصطناعي",
    "editorialUpdatedAt": "2026-09-06"
  },
  "ray-qanwny-fy-tlb-aflas": {
    "region": "sa",
    "relatedServiceSlugs": [
      "business-law",
      "companies-law"
    ],
    "relatedBlogSlugs": [
      "bna-astratyjyh-aldfaa-qbl-bd-alkhswmh",
      "hwkmh-alshrkat-kdmanh-mwdwayh-lhmayh-hqwq-msahmy-alaqlyh"
    ],
    "relatedWorkSlugs": [
      "thlyl-mkhatr-nql-alaswl-walmsthqat-byn-alshrkat-almrtbth-athna-altsfyh"
    ],
    "titleEn": "Legal Opinion on a Bankruptcy Application",
    "titleAr": "رأي قانوني في طلب افلاس",
    "editorialUpdatedAt": "2026-09-06"
  }
};

export function workModifiedAt(slug: string, ...dates: Array<string | Date | null | undefined>): string | undefined {
  return articleModifiedAt(WORK_CONTEXT[slug]?.editorialUpdatedAt, ...dates);
}
