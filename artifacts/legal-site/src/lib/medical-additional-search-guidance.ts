import type { MatterSourceGuidance } from "./matter-source-guidance.js";

export const MEDICAL_ADDITIONAL_SEARCH_GUIDANCE: MatterSourceGuidance[] = [
  {
    "region": "sa",
    "service": "medical-malpractice",
    "problems": [
      "medical-record-access-dispute"
    ],
    "id": "sa-medical-guardian-data-rights",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Who exercises a minor or incapacitated patient’s data rights?",
      "a": "Article 3(3) of the PDPL regulations allows the lawful guardian to exercise the rights of a person with reduced or absent legal capacity. The facility must verify the requester’s identity. Provide evidence of the relevant authority; being a relative alone does not establish that authority."
    },
    "ar": {
      "q": "من يمارس حقوق بيانات المريض ناقص أو عديم الأهلية؟",
      "a": "تجيز المادة 3/3 من لائحة حماية البيانات للولي الشرعي ممارسة حقوق ناقص أو عديم الأهلية. وعلى المنشأة التحقق من هوية مقدم الطلب. قدّم مستند الصفة اللازمة؛ فالقرابة وحدها لا تثبت الولاية."
    },
    "sources": [
      {
        "en": "SDAIA: PDPL regulations, Article 3",
        "ar": "سدايا: لائحة حماية البيانات، المادة 3",
        "href": "https://dgp.sdaia.gov.sa/wps/portal/pdp/knowledgecenter/details/PDPL2"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "sa",
    "service": "medical-malpractice",
    "problems": [
      "medical-record-access-dispute",
      "medical-record-review"
    ],
    "id": "sa-medical-data-correction",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can inaccurate personal information in a medical file be corrected?",
      "a": "Article 7 permits a correction request and allows the controller to seek necessary supporting documents. After correction, prior recipients must be notified without delay. Identify the inaccurate entry and supporting record. A data-correction request does not itself overturn a disputed clinical opinion or establish negligence."
    },
    "ar": {
      "q": "هل يمكن تصحيح بيانات شخصية غير صحيحة في الملف الطبي؟",
      "a": "تنظم المادة 7 طلب التصحيح وتجيز للمنشأة طلب المستندات الداعمة اللازمة. وبعد التصحيح يجب إشعار الجهات التي أُفصح لها سابقاً دون تأخير. حدّد القيد غير الصحيح ومستنده. ولا يلغي طلب تصحيح البيانات بذاته رأياً سريرياً مختلفاً عليه أو يثبت الإهمال."
    },
    "sources": [
      {
        "en": "SDAIA: PDPL regulations, Article 7",
        "ar": "سدايا: لائحة حماية البيانات، المادة 7",
        "href": "https://dgp.sdaia.gov.sa/wps/portal/pdp/knowledgecenter/details/PDPL2"
      }
    ],
    "includeOnServicePage": false
  },
  {
    "region": "sa",
    "service": "medical-malpractice",
    "problems": [
      "medical-record-review",
      "medical-negligence-claims",
      "misdiagnosis-and-delayed-diagnosis",
      "surgical-and-treatment-errors",
      "treatment-injury-and-compensation-claim",
      "compensation-and-professional-liability-disputes"
    ],
    "id": "sa-medical-judicial-expert-objection",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Can a court-appointed expert’s medical opinion be questioned?",
      "a": "In a civil claim governed by the Evidence Law, Article 120 allows the court to question the expert, require completion of deficiencies or appoint another expert. Under Article 121, the opinion ordinarily does not bind the court; an agreement to accept the expert’s result has a separate rule. Identify the omitted record or reasoning error and the clarification sought. This is a judicial evidence procedure, not a health-service complaint."
    },
    "ar": {
      "q": "هل يمكن مناقشة رأي الخبير الطبي المنتدب قضائياً؟",
      "a": "في المطالبة المدنية الخاضعة لنظام الإثبات، تجيز المادة 120 للمحكمة مناقشة الخبير واستكمال النقص أو ندب خبير آخر. ووفق المادة 121 لا يقيد رأيه المحكمة في الأصل، مع حكم مستقل لاتفاق الخصوم على قبول نتيجته. حدّد السجل المغفل أو الخلل في التسبيب والإيضاح المطلوب. وهذا إجراء إثبات قضائي يختلف عن الشكوى الخدمية الصحية."
    },
    "sources": [
      {
        "en": "MOJ: Evidence Law explanation, Articles 120–121",
        "ar": "وزارة العدل: شرح نظام الإثبات، المادتان 120–121",
        "href": "https://www.moj.gov.sa/Documents/Sharing/ExplanationOfTheProofSystem.pdf"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "healthcare-medical-liability",
    "problems": [
      "misdiagnosis-and-delayed-diagnosis",
      "treatment-injury-and-compensation-claim"
    ],
    "id": "dubai-medical-complaint-official-channel",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Where does DHA direct a complaint against a health professional or facility?",
      "a": "Use the official medical-complaints portal linked from DHA’s Sheryan FAQ. Confirm that the provider falls under DHA, keep the submission reference and use the relevant clinical complaint category. A portal submission is not a compensation award or proof that a different emirate’s provider falls within DHA’s jurisdiction."
    },
    "ar": {
      "q": "إلى أين توجه هيئة الصحة بدبي شكوى ضد مهني أو منشأة صحية؟",
      "a": "ابدأ ببوابة الشكاوى الطبية المرتبطة بالأسئلة الرسمية لنظام شريان. تحقّق من خضوع مقدم الرعاية للهيئة واحفظ مرجع التقديم واختر فئة الشكوى الطبية المناسبة. ولا يعد إرسال النموذج حكماً بالتعويض أو دليلاً على اختصاص الهيئة بمنشأة في إمارة أخرى."
    },
    "sources": [
      {
        "en": "DHA Sheryan: official medical-complaint link",
        "ar": "هيئة الصحة بدبي، شريان: رابط الشكوى الطبية الرسمي",
        "href": "https://services.dha.gov.ae/sheryan/wps/portal/home/faq"
      },
      {
        "en": "DHA medical complaints portal",
        "ar": "بوابة الشكاوى الطبية لدى هيئة الصحة بدبي",
        "href": "https://complaints.dha.gov.ae"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "healthcare-medical-liability",
    "problems": [
      "misdiagnosis-and-delayed-diagnosis",
      "treatment-injury-and-compensation-claim"
    ],
    "id": "mohap-medical-versus-financial-complaint",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Does the MOHAP medical-complaint system handle every hospital bill or insurance dispute?",
      "a": "MOHAP identifies its system for medical-practice complaints against MOHAP-licensed private facilities and staff. Its published guidance separates financial and insurance complaints, which belong to their competent consumer-protection or judicial channels. Identify the facility’s regulator and whether the complaint concerns care, a bill or insurance before choosing the route; several issues may need separate submissions."
    },
    "ar": {
      "q": "هل يعالج نظام الشكاوى الطبية بوزارة الصحة كل خلاف على فاتورة أو تأمين؟",
      "a": "تخصص الوزارة نظامها لشكاوى الممارسة الطبية ضد المنشآت الخاصة المرخصة منها والعاملين فيها. ويفصل توضيحها المنشور الشكاوى المالية والتأمينية التي تتبع جهات حماية المستهلك أو القضاء المختصة. حدّد جهة ترخيص المنشأة وما إذا كان الخلاف على الرعاية أو الفاتورة أو التأمين؛ وقد تستلزم المسائل طلبات منفصلة."
    },
    "sources": [
      {
        "en": "MOHAP: scope of electronic medical complaints",
        "ar": "وزارة الصحة ووقاية المجتمع: نطاق الشكاوى الطبية الإلكترونية",
        "href": "https://mohap.gov.ae/en/w/mohap-urges-customers-to-make-the-most-of-the-electronic-customer-complaint-system"
      }
    ],
    "includeOnServicePage": true
  },
  {
    "region": "uae",
    "service": "healthcare-medical-liability",
    "problems": [
      "misdiagnosis-and-delayed-diagnosis",
      "treatment-injury-and-compensation-claim"
    ],
    "id": "uae-medical-report-period-not-claim-deadline",
    "reviewedAt": "2026-09-07",
    "en": {
      "q": "Is the committee’s 30-day report period a compensation filing deadline?",
      "a": "No. Article 19 of the Medical Liability Decree-Law concerns the committee’s report within 30 days of referral, with further equivalent periods possible on its request and health-authority approval. That timetable is distinct from Article 20’s grievance period following legal notification of the report. Neither supplies a universal deadline for filing a compensation lawsuit."
    },
    "ar": {
      "q": "هل مهلة الثلاثين يوماً لتقرير اللجنة ميعاد لرفع التعويض؟",
      "a": "لا. تتعلق المادة 19 من مرسوم المسؤولية الطبية بإصدار تقرير اللجنة خلال 30 يوماً من الإحالة، مع إمكان مدد مماثلة بطلبها وموافقة الجهة الصحية. وتختلف عن ميعاد التظلم بالمادة 20 بعد التبليغ القانوني بالتقرير. ولا يحدد أي منهما ميعاداً عاماً لرفع دعوى التعويض."
    },
    "sources": [
      {
        "en": "UAE legislation: Medical Liability Decree-Law, Articles 19–20",
        "ar": "تشريعات الإمارات: مرسوم المسؤولية الطبية، المادتان 19–20",
        "href": "https://www.uaelegislation.gov.ae/en/legislations/1192/download"
      }
    ],
    "includeOnServicePage": false
  }
];
