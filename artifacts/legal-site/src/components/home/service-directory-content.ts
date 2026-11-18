import type { Region } from "@workspace/api-zod/browser";

export const serviceDirectoryContent: Record<Region, Record<"en" | "ar", { intro: string; introLead?: string; framework: string; points: [string, string][]; preparation: string }>> = {
  sa: {
    en: {
      introLead: "Experienced counsel. Precise contracts. A clear strategy for your dispute.",
      intro: `CounselO’s team of lawyers and law offices licensed in Saudi Arabia handles your family, employment, property and commercial matters, from consultation and contracts to negotiation and court representation, with online communication throughout your matter.`,
      framework: "How the Saudi legal framework shapes your matter",
      points: [
        ["Applicable law and documents", "The assessment starts with the type of relationship, relevant Saudi rules, contract terms and dates. Employment, family, company, property and commercial matters require different documents and legal checks."],
        ["Competent authority and procedure", "Identify any court, regulator or authority already involved and the notice or decision received. We assess the appropriate route and procedural stage before recommending a response, claim or further review."],
        ["Business and investment scope", "For a company or investment, identify the activity, legal form, registration status and approvals already obtained. Formation, sector permissions, contracts and disputes are assessed as separate questions within the agreed scope."],
      ],
      preparation: "Start with a short chronology, your objective and any deadline. Identify the contract, notice, decision or case reference if available. We confirm the necessary documents before you send the full file.",
    },
    ar: {
      introLead: "خبرة قانونية راسخة. عقود دقيقة. واستراتيجية واضحة لنزاعك.",
      intro: `يتولى فريق كاونسلو، المكوّن من محامين ومكاتب مرخّصة في السعودية، مسائل الأسرة والعمل والعقارات والتجارة، من الاستشارة والعقود إلى التفاوض والتمثيل أمام المحاكم، مع التواصل أونلاين طوال مسألتك.`,
      framework: "كيف يحدد الإطار القانوني السعودي مسار مسألتك؟",
      points: [
        ["النظام المنطبق والمستندات", "يبدأ التقييم بنوع العلاقة والأنظمة السعودية ذات الصلة وشروط العقد والتواريخ. وتحتاج مسائل العمل والأسرة والشركات والعقارات والتجارة إلى مستندات وفحوص قانونية مختلفة."],
        ["الجهة المختصة والإجراء", "حدد أي محكمة أو جهة تنظيمية أو رسمية تنظر في المسألة، والإخطار أو القرار الذي تسلمته. نقيّم المسار المناسب ومرحلة الإجراءات قبل اقتراح الرد أو المطالبة أو المراجعة الإضافية."],
        ["نطاق الأعمال والاستثمار", "للشركة أو الاستثمار، حدد النشاط والشكل القانوني وحالة التسجيل والموافقات القائمة. تُقيّم مسائل التأسيس والتصاريح القطاعية والعقود والنزاعات كأسئلة مستقلة ضمن النطاق المتفق عليه."],
      ],
      preparation: "ابدأ بتسلسل موجز للوقائع وهدفك وأي مهلة. حدد العقد أو الإنذار أو القرار أو رقم القضية إن توفر. نؤكد المستندات اللازمة قبل إرسال الملف كاملاً.",
    },
  },
  syr: {
    en: {
      introLead: "Experienced legal support. Wherever you are.",
      intro: "Handle your Syrian legal matter with one CounselO team, whether you live in Syria or abroad. Our team comprises lawyers and law offices in Syria, delivering consultation, drafting, negotiation, representation and follow-up for property, family, business and disputes.",
      framework: "How the Syrian legal framework shapes your matter",
      points: [
        ["Operative rules and amendments", "The review identifies the applicable legal text, amendments and relevant dates for the specific matter. A law number, earlier approval or old document alone does not establish the current legal position."],
        ["Property, family and case records", "Identify the location of property or records, the issuing authority, the parties involved and any existing judgment. The assessment separates missing evidence or record issues from questions requiring a claim or local procedure."],
        ["Clients and documents abroad", "For documents issued outside Syria, identify the issuing country, intended use and receiving authority. Any translation, certification or authorisation requirements are checked against the proposed local step before it is agreed."],
      ],
      preparation: "Provide a brief summary, where you and the relevant records are located, and any deadline or pending proceeding. Mention documents already available; we confirm what our team needs to advise you and carry out the agreed local steps.",
    },
    ar: {
      introLead: "خبرة قانونية راسخة. أينما كنت.",
      intro: "تابع مسألتك السورية مع فريق كاونسلو، سواء كنت داخل سوريا أو خارجها. يتكوّن فريقنا من محامين ومكاتب محاماة في سوريا، يتولون الاستشارة والصياغة والتفاوض والتمثيل والمتابعة في مسائل العقارات والأسرة والأعمال والمنازعات.",
      framework: "كيف يحدد الإطار القانوني السوري مسار مسألتك؟",
      points: [
        ["النص النافذ والتعديلات", "تحدد المراجعة النص القانوني المنطبق وتعديلاته والتواريخ ذات الصلة بالمسألة. ولا يكفي رقم قانون أو موافقة سابقة أو مستند قديم وحده لإثبات الموقف القانوني الحالي."],
        ["السجلات العقارية والأسرية والقضائية", "حدد موقع العقار أو السجلات والجهة المصدرة والأطراف وأي حكم قائم. يفصل التقييم بين نقص الأدلة أو مشكلات السجلات والمسائل التي تحتاج إلى دعوى أو إجراء محلي."],
        ["العملاء والمستندات في الخارج", "للمستندات الصادرة خارج سوريا، حدد بلد الإصدار والغرض والجهة التي ستتلقاها. يُتحقق من متطلبات الترجمة أو التصديق أو الوكالة بحسب الخطوة المحلية المقترحة قبل الاتفاق عليها."],
      ],
      preparation: "قدم ملخصاً موجزاً ومكان إقامتك وموقع السجلات المعنية وأي مهلة أو إجراء قائم. اذكر المستندات المتاحة؛ نؤكد ما يحتاجه فريقنا لتقديم المشورة وتنفيذ الإجراءات المحلية المتفق عليها.",
    },
  },
  uae: {
    en: {
      introLead: "Clear advice. Precise documents. A stronger legal position.",
      intro: "Choose CounselO for UAE legal services from consultation and documents to negotiation and representation. Our experienced team includes UAE-licensed lawyers and law offices, with the work tailored to the relevant emirate, authority and mainland or free-zone framework.",
      framework: "How the UAE legal framework shapes your matter",
      points: [
        ["Federal, emirate and free-zone context", "Identify the emirate and the relevant company, employer or property registration. We assess whether the issue involves federal rules, local requirements or a free-zone framework, including DIFC or ADGM where applicable."],
        ["Contract and forum", "Share any governing-law, court or arbitration clause and details of an existing complaint or proceeding. The legal framework and forum are assessed together; the location of one party alone does not settle every jurisdictional question."],
        ["Matter-specific records", "Employment reviews start with the employer, contract and payment history; tenancy matters with the emirate, agreement and notices; company matters with the legal form, registration and approvals. The required evidence is confirmed for the chosen service."],
      ],
      preparation: "Start with the emirate or free zone if known, the relevant parties, your question and any deadline. Identify the documents and authority involved. If unsure of the jurisdiction, say so; the initial assessment helps identify the appropriate scope.",
    },
    ar: {
      introLead: "مشورة واضحة. مستندات محكمة. وموقف قانوني أقوى.",
      intro: "اختر كاونسلو لخدمات قانونية إماراتية من الاستشارة والمستندات إلى التفاوض والتمثيل. يضم فريقنا المتمرس محامين ومكاتب مرخصة في الإمارات، ويحدد العمل وفق الإمارة والجهة والإطار المنطبق في البر الرئيسي أو المنطقة الحرة.",
      framework: "كيف يحدد الإطار القانوني الإماراتي مسار مسألتك؟",
      points: [
        ["الإطار الاتحادي والمحلي والمناطق الحرة", "حدد الإمارة وتسجيل الشركة أو صاحب العمل أو العقار المعني. نقيّم ارتباط المسألة بالقواعد الاتحادية أو المتطلبات المحلية أو إطار المنطقة الحرة، بما فيها مركز دبي المالي العالمي أو سوق أبوظبي العالمي عند انطباقهما."],
        ["العقد وجهة الفصل", "اذكر شرط القانون المنطبق أو المحكمة أو التحكيم وأي شكوى أو إجراء قائم. يُقيّم الإطار القانوني وجهة الفصل معاً؛ ولا يحسم مكان أحد الأطراف وحده جميع مسائل الاختصاص."],
        ["السجلات المناسبة لنوع المسألة", "تبدأ مراجعة العمل بصاحب العمل والعقد وسجل السداد؛ والإيجار بالإمارة والعقد والإخطارات؛ والشركات بالشكل القانوني والتسجيل والموافقات. وتُحدد الأدلة المطلوبة للخدمة المختارة."],
      ],
      preparation: "ابدأ بتحديد الإمارة أو المنطقة الحرة إن عُرفت والأطراف والسؤال وأي مهلة. اذكر المستندات والجهة المعنية. وإذا لم تتأكد من الاختصاص، وضح ذلك؛ يساعد التقييم الأولي في تحديد النطاق المناسب.",
    },
  },
};
