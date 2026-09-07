import type { MatterSourceGuidance } from "./matter-source-guidance.js";

export const SYRIA_FINAL_SEARCH_GUIDANCE: MatterSourceGuidance[] = [
  {
    "region": "syr",
    "service": "contracts",
    "problems": [
      "contract-authentication-and-evidence-problem",
      "document-attestation-and-legalisation-problem",
      "power-of-attorney-drafting-and-authority-problem"
    ],
    "id": "syr-notarial-lost-original-reconstruction",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "What if the notary’s original contract or power of attorney was lost?",
      "a": "The Justice Ministry’s October 2025 interim mechanism requires an original certified copy for deposit or reconstruction at the relevant notary office. Without it, the applicant is directed to the competent court. Even without an objection, registration involves judicial examination and verification of the notary’s signature and seal. An ordinary scan is not the specified certified copy. Confirm whether later legislation changed this interim mechanism."
    },
    "ar": {
      "q": "ماذا إذا فُقد أصل العقد أو الوكالة لدى الكاتب بالعدل؟",
      "a": "تشترط آلية وزارة العدل المؤقتة في تشرين الأول 2025 نسخة أصلية مصدقة لطلب الإيداع أو الترميم لدى الكاتب بالعدل المختص. وعند غيابها يراجع صاحب الطلب القضاء المختص. وحتى دون اعتراض يخضع التسجيل لفحص قضائي والتحقق من توقيع الكاتب وخاتمه. ليست الصورة الممسوحة العادية النسخة المصدقة المطلوبة. تحقّق من أي تشريع لاحق غيّر هذه الآلية المؤقتة."
    },
    "sources": [
      {
        "en": "Justice Ministry: interim reconstruction of lost notarial records",
        "ar": "وزارة العدل: آلية مؤقتة لترميم المحررات المفقودة لدى الكاتب بالعدل",
        "href": "https://sana.sy/locals/2318833/"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "syr",
    "service": "civil-procedure",
    "problems": [
      "litigation-strategy-and-case-management",
      "appeals-and-enforcement"
    ],
    "id": "syr-judicial-conduct-complaint-route",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Where is a complaint about judicial work directed?",
      "a": "The Justice Ministry’s published decision distinguishes administrative-work complaints addressed to the Minister from complaints about judicial work addressed to Judicial Inspection. It requires the interested person or legal agent to provide identity, contact details and supporting documents. This concerns oversight complaints; do not treat it as filing an appeal or assume it suspends a court deadline. Confirm the current receiving office or channel before submission."
    },
    "ar": {
      "q": "إلى أين تقدم الشكوى المتعلقة بالعمل القضائي؟",
      "a": "يميّز قرار وزارة العدل المنشور بين شكاوى الأعمال الإدارية المقدمة للوزير وشكاوى الأعمال القضائية المقدمة للتفتيش القضائي. ويطلب تقديمها من صاحب العلاقة أو وكيله مع الهوية وبيانات الاتصال والمستندات المؤيدة. يتعلق ذلك بالشكوى الرقابية؛ فلا تُعامل كإيداع طعن ولا يُفترض أنها توقف ميعاداً قضائياً. تحقّق من الديوان أو القناة الحالية قبل التقديم."
    },
    "sources": [
      {
        "en": "Justice Ministry: administrative and judicial complaint channels",
        "ar": "وزارة العدل: قنوات الشكاوى الإدارية والقضائية",
        "href": "https://sana.sy/locals/2183062/"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "syr",
    "service": "arbitration",
    "problems": [
      "mediation-and-negotiated-settlement"
    ],
    "id": "syr-official-mediation-platform",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Is there an official Syrian mediation platform?",
      "a": "The Justice Ministry announced mediation.moj.gov.sy in August 2026. Use the Ministry-linked address when checking the available mediation service. The launch announcement does not establish mandatory mediation, automatic enforceability of every settlement or suspension of court deadlines; those effects need the applicable rule and the parties’ actual arrangement."
    },
    "ar": {
      "q": "هل توجد منصة سورية رسمية للوساطة؟",
      "a": "أعلنت وزارة العدل في آب 2026 منصة mediation.moj.gov.sy. استخدم العنوان المرتبط بإعلان الوزارة للتحقق من خدمة الوساطة المتاحة. ولا يثبت إطلاقها إلزامية الوساطة أو قابلية كل تسوية للتنفيذ تلقائياً أو وقف مواعيد المحاكم؛ فهذه الآثار تحتاج إلى النص المنطبق واتفاق الأطراف الفعلي."
    },
    "sources": [
      {
        "en": "Justice Ministry: launch of the mediation platform",
        "ar": "وزارة العدل: إطلاق منصة الوساطة",
        "href": "https://sana.sy/locals/2558677/"
      }
    ],
    "includeOnServicePage": true
  }
];
