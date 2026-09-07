import { correctArticleEditorialClosure } from "./article-editorial-closure-corrections.js";
import { appendReconsiderationGuidance } from "./saudi-reconsideration-article-guidance.js";
import { correctArticleHeadings } from "./article-heading-corrections.js";
import { connectArticleWorkEvidence } from "./article-work-evidence.js";
import { appendReconsiderationTemplate } from "./saudi-reconsideration-template.js";
import { correctSyriaArticleFinal } from "./syria-article-final-corrections.js";
import { correctSaudiArticleFinal } from "./saudi-article-final-corrections.js";

const ENFORCEMENT_SOURCE = "https://www.uqn.gov.sa/decisions-and-regulations/rules-and-regulations/4000869";
const PROCEDURE_SOURCE = "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/f0eaae46-9f84-40ee-815e-a9a700f268b3/1";
const RECONSIDERATION_DECISION = "https://laws.moj.gov.sa/ar/JudicialDecisionsList/3/gh81SUL8pRZQU8PiH96OE6Xnxpg1rUebrLxjTAKi5mF21MgB6AN2TeI_aVa7r-Yx";
const LABOUR_SOURCE = "https://www.hrsd.gov.sa/علاقات-العمل";
const LABOUR_SETTLEMENT = "https://www.hrsd.gov.sa/ministry-services/services/269970";
const CIVIL_TRANSACTIONS = "https://www.uqn.gov.sa/details?p=23125";
const SYRIAN_CIVIL = "https://www.wipo.int/wipolex/ar/legislation/details/10917";
const EVIDENCE_SOURCE = "https://www.uqn.gov.sa/details?p=18818";
const ELECTRONIC_TRANSACTIONS = "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/6f509360-2c39-4358-ae2a-a9a700f2ed16/1";
const COMPETITION_SOURCE = "https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/e3605c0d-ef87-4cff-b5da-aa3f0102bbb4/1";

function replaceParagraphs(html: string, changes: Array<[RegExp, string]>): string {
  return html.replace(/<p\b[^>]*>[\s\S]*?<\/p>/gi, paragraph => {
    const text = paragraph.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
    return changes.find(([pattern]) => pattern.test(text))?.[1] ?? paragraph;
  });
}

/** Corrections are tied to specific published passages; other prose is preserved. */
export function correctArticleBody(slug: string, lang: "en" | "ar", html: string | null | undefined): string | null | undefined {
  const corrected = correctArticlePassages(slug, lang, html);
  if (!corrected) return corrected;
  // Public sanitization removes section IDs/data attributes. Deduplicate the
  // actual editorial blocks, so reading an already repaired record is stable.
  let result = corrected.replace(/<section\s+id="(?:reconsideration-sources|historical-commentary-scope)"[^>]*>([\s\S]*?)<\/section>/g, "$1");
  const sections = new Set<string>();
  result = result.replace(/<h2>(?:Statute and identified decision|النظام والقرار المحدد|Scope of this historical commentary|نطاق هذا التعليق الفقهي التاريخي)<\/h2>\s*(?:<p\b[^>]*>[\s\S]*?<\/p>\s*){1,2}/g, block => {
    const key = block.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    if (sections.has(key)) return "";
    sections.add(key);
    return block;
  });
  const sources = new Set<string>();
  result = result.replace(/<p\b[^>]*>[\s\S]*?<\/p>/gi, paragraph => {
    const text = paragraph.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    if (!/^(?:Sources:|Source for the new law|Text for comparison:|Text comparison:|Statutory reference:|Source:|المصادر:|مصدر النظام|لمقارنة النص:|مرجع نظامي:|المصدر:)/.test(text)) return paragraph;
    if (sources.has(text)) return "";
    sources.add(text);
    return paragraph;
  });
  const withHeadings = correctArticleHeadings(slug, lang, appendReconsiderationGuidance(slug, lang, result)) ?? result;
  return correctArticleEditorialClosure(slug, lang, correctSaudiArticleFinal(slug, lang, correctSyriaArticleFinal(slug, lang, appendReconsiderationTemplate(slug, lang, connectArticleWorkEvidence(slug, lang, withHeadings)))));
}

function correctArticlePassages(slug: string, lang: "en" | "ar", html: string | null | undefined): string | null | undefined {
  if (!html) return html;
  if (slug === "commercial-supply-contracts-in-saudi") html = html
    .replace(/Document every delivery instalment in an official record/g, "Keep a dated delivery record for each instalment, with acknowledgement where available")
    .replace(/توثيق كل دفعة تسليم بمحضر رسمي/g, "توثيق كل دفعة تسليم بمحضر مؤرخ وإثبات الاستلام حيثما يتاح");
  if (slug === "alrda-fy-alqanwn-alswry") html = replaceParagraphs(html, lang === "en" ? [
    [/In this case, the contract is formed once the acceptance arrives/, '<p>The example assumes a matching, effective acceptance and no additional formality. Assess when the offeror learned of the acceptance, the evidential effect of its arrival and any specific formation rule; receipt alone should not be treated as a universal test.</p>'],
    [/Despite the advanced negotiations, no contract is formed so long as/, '<p>If the price is an unresolved essential term and neither the agreement nor the applicable law supplies a valid means of determining it, advanced negotiations alone do not complete the contract. A price may be determinable without a final numerical figure, so the documents must be examined.</p>'],
  ] : [
    [/في هذه الحالة ينعقد العقد بمجرد وصول القبول/, '<p>يفترض المثال قبولاً مطابقاً ومنتجاً لأثره وعدم اشتراط شكل إضافي. يلزم فحص وقت علم الموجب بالقبول وأثر وصوله في الإثبات وأي قاعدة خاصة بالانعقاد؛ فلا يُعامل مجرد الوصول باعتباره معياراً عاماً لكل عقد.</p>'],
    [/رغم وجود مفاوضات متقدمة، لا ينعقد العقد/, '<p>إذا ظل الثمن عنصراً جوهرياً غير محسوم ولم يوفر الاتفاق أو القانون طريقة صحيحة لتحديده، فلا تكمل المفاوضات المتقدمة العقد وحدها. وقد يكون الثمن قابلاً للتحديد دون رقم نهائي، لذلك يلزم فحص المستندات.</p>'],
  ]);

  if (slug === "hdwd-alymyn-alhasmh-fy-alathbat-almdny-swry") {
    return replaceParagraphs(html, lang === "en" ? [
      [/On 23 April 2025, the Syrian Ministry of Justice/, '<p>Legislative status: this study analyses the cited published text and historical decisions. Reports of a committee considering amendment do not establish an enacted amendment or its commencement. Verify the operative text for a current procedural step.</p>'],
    ] : [
      [/أصدرت وزارة العدل السورية في 23 أبريل/, '<p>حالة التشريع: يحلل البحث النص المنشور والاجتهادات التاريخية المشار إليها. ولا تثبت أخبار لجنة تبحث التعديل صدور تعديل نافذ أو تاريخ العمل به. يُتحقق من النص المنطبق عند اتخاذ إجراء قضائي راهن.</p>'],
    ]) + (html.includes('data-oath-sources') ? '' : lang === "en"
      ? '<p data-oath-sources="true">Text comparison: <a href="https://houmsilaw.com/img/uploads1/law_227.pdf">reproduction of the Syrian Evidence Law, Articles 112–120</a>. Scholarly discussion: <a href="https://arab-ency.com.sy/law/details/164460">Muhammad Samer Al-Qattan, “Oath,” Syrian Legal Encyclopedia</a>. These references do not substitute for an official copy of each judgment discussed.</p>'
      : '<p data-oath-sources="true">لمقارنة النص: <a href="https://houmsilaw.com/img/uploads1/law_227.pdf">نسخة من قانون البينات السوري، المواد 112–120</a>. وللشرح: <a href="https://arab-ency.com.sy/law/details/164460">محمد سامر القطان، «اليمين»، الموسوعة القانونية السورية</a>. ولا تستبدل هذه المراجع نسخة رسمية من كل حكم محل التحليل.</p>');
  }
  if (slug === "alfrq-byn-alfskh-waltawyd-fy-alaqwd-altjaryh" && !html.includes('data-remedies-source')) {
    return html + (lang === "en"
      ? `<p data-remedies-source="true">Statutory reference: <a href="${CIVIL_TRANSACTIONS}">Civil Transactions Law Articles 107–113 and 175–180</a>. Identify the basis of each remedy, notice requirements and surviving obligations separately.</p>`
      : `<p data-remedies-source="true">مرجع نظامي: <a href="${CIVIL_TRANSACTIONS}">المواد 107–113 و175–180 من نظام المعاملات المدنية</a>. يُحدد أساس كل طلب والإعذار والالتزامات الباقية بصورة مستقلة.</p>`);
  }
  if (slug === "alaqd-fy-alqanwn-alswry") {
    return replaceParagraphs(html, lang === "en" ? [
      [/The terms “contract” and “agreement” are often used/, '<p>The opening definition uses “contract” broadly. Some doctrinal classifications use it more narrowly for an agreement creating obligations, while “agreement” also covers their modification or discharge. That terminology does not by itself determine the legal effect of a particular document.</p>'],
      [/A contract , however, is a type of agreement/, '<p>In that narrower doctrinal usage, a contract creates obligations between its parties.</p>'],
      [/Thus, it may be said that every contract is an agreement/, '<p>Use the distinction consistently and examine the substance of the transaction rather than relying only on its label.</p>'],
      [/This principle is known in legal scholarship as the rule/, `<p><a href="${SYRIAN_CIVIL}">Civil Code Articles 148–149</a> address contractual force and good-faith performance; the agreed terms remain subject to the statutory exceptions.</p>`],
    ] : [
      [/كثيراً ما يُستخدم مصطلحا "العقد" و"الاتفاق"/, '<p>يستخدم التعريف الافتتاحي «العقد» بمعنى واسع. وتستعمل بعض التقسيمات الفقهية معنى أضيق للاتفاق المنشئ للالتزامات، بينما يشمل «الاتفاق» تعديلها وإنهاءها أيضاً. ولا يحسم هذا الاصطلاح وحده أثر وثيقة معينة.</p>'],
      [/أما العقد فهو نوع من أنواع الاتفاق/, '<p>في هذا الاستعمال الفقهي الأضيق، ينشئ العقد التزامات بين أطرافه.</p>'],
      [/ولهذا يمكن القول إن كل عقد هو اتفاق/, '<p>يُستخدم التمييز باتساق وتُفحص حقيقة المعاملة، دون الاكتفاء باسمها.</p>'],
      [/ويُعرف هذا المبدأ في الفقه بقاعدة/, `<p>تنظم <a href="${SYRIAN_CIVIL}">المادتان 148 و149 من القانون المدني</a> القوة الملزمة والتنفيذ بحسن النية، مع مراعاة الاستثناءات القانونية.</p>`],
    ]);
  }
  if (slug === "performance-of-contracts-in-good-faith-under-syrian-law") {
    return replaceParagraphs(html, lang === "en" ? [
      [/Accordingly, observing good faith from the negotiation stage/, '<p>This article concerns good-faith performance of an existing contract under Article 149. Any claim about conduct during negotiations requires a separate legal basis and assessment of the facts.</p>'],
      [/The Syrian Civil Code enshrines this principle in a clear provision stating:/, `<p><a href="${SYRIAN_CIVIL}">Civil Code Article 149</a> provides:</p>`],
      [/If a provision permits more than one interpretation/, '<p>Articles 151–152 distinguish clear wording, the search for common intention where interpretation is needed, and residual doubt. Good faith should not be presented as a free-standing power to replace a clear bargain with whatever appears more balanced.</p>'],
    ] : [
      [/ومن ثم، فإن مراعاة حسن النية منذ مرحلة التفاوض/, '<p>يتناول هذا المقال تنفيذ عقد قائم بحسن النية وفق المادة 149. أما أي مطالبة عن سلوك أثناء التفاوض فتحتاج إلى سند قانوني مستقل وتقييم وقائعها.</p>'],
      [/كرّس القانون المدني السوري هذا المبدأ بنص واضح يقرر أن:/, `<p>تنص <a href="${SYRIAN_CIVIL}">المادة 149 من القانون المدني</a> على أن:</p>`],
      [/فإذا احتمل النص أكثر من تفسير/, '<p>تميّز المادتان 151 و152 بين وضوح العبارة والبحث عن النية المشتركة عند لزوم التفسير والشك المتبقي. ولا يُعرض حسن النية كسلطة مستقلة لاستبدال اتفاق واضح بما يبدو أكثر توازناً.</p>'],
    ]);
  }
  if (slug === "mta-ykwn-alqrar-aladary-qabla-llalgha-amam-dywan-almzalm") {
    return replaceParagraphs(html, lang === "en" ? [
      [/The Board of Grievances Law identifies the principal grounds/, '<p><a href="https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/5d3379bd-3547-494e-9fbd-a9a700f26e24/1">Board of Grievances Law Article 13(b)</a> identifies grounds for challenging final administrative decisions, including competence, form, factual grounds, legality, application or interpretation of rules, and misuse of authority.</p>'],
    ] : [
      [/وقد حدد نظام ديوان المظالم أهم أسباب الطعن/, '<p>تحدد <a href="https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/5d3379bd-3547-494e-9fbd-a9a700f26e24/1">المادة 13(ب) من نظام ديوان المظالم</a> أسباب الطعن في القرارات الإدارية النهائية، بما فيها الاختصاص والشكل والسبب ومخالفة الأحكام والخطأ في تطبيقها أو تأويلها وإساءة استعمال السلطة.</p>'],
    ]);
  }
  if (slug === "mta-yfqd-shrt-althkym-athrh-alamly-fy-alnzaa") {
    const linked = html.replace(/https?:\/\/(?:www\.)?uqn\.gov\.sa\/wp-content\/uploads\/2022\/10\/UM-ALQRA-4413\.pdf/g, 'https://www.uqn.gov.sa/details?p=27309').replace(/(details\?p=27309)\?utm_source=chatgpt\.com/g, '$1');
    return replaceParagraphs(linked, lang === "en" ? [
      [/The recent amendment to the Arbitration Law/, '<p>The <a href="https://www.uqn.gov.sa/details?p=27309">2025 amendment under Royal Decree M/21</a> restates Article 10(1)’s capacity requirement for natural and legal persons. Identify both the party’s capacity and the signatory’s authority; a company name on the agreement does not answer both questions.</p>'],
    ] : [
      [/وقد أكد التعديل الحديث لنظام التحكيم/, '<p>أعاد <a href="https://www.uqn.gov.sa/details?p=27309">تعديل عام 2025 بالمرسوم الملكي م/21</a> صياغة شرط الأهلية في المادة 10(1) للأشخاص الطبيعيين والاعتباريين. وتُفحص أهلية الطرف وسلطة الموقّع معاً؛ فلا يجيب اسم الشركة في الاتفاق عن المسألتين.</p>'],
    ]);
  }
  if (slug === "mta-ythwl-twqya-alaaml-ala-mhdr-almrajah-ala-aqrar-balmswwlyh") {
    const clean = html.replace(/المحضرك/g, "المحضر");
    return replaceParagraphs(clean, lang === "en" ? [
      [/The Saudi Evidence Law distinguishes between judicial and non-judicial admissions/, `<p>The <a href="${EVIDENCE_SOURCE}">Evidence Law, Articles 14–19</a>, distinguishes judicial and non-judicial admissions, their form and proof. An internal review record is not automatically a judicial admission. Identify the specific statement, capacity and scope before assessing its effect.</p>`],
    ] : [
      [/فنظام الإثبات السعودي يميز بين الإقرار القضائي وغير القضائي/, `<p>تميّز <a href="${EVIDENCE_SOURCE}">المواد 14–19 من نظام الإثبات</a> بين الإقرار القضائي وغير القضائي وصورته وإثباته. ولا يصبح محضر المراجعة الداخلي تلقائياً إقراراً قضائياً؛ بل يُحدد القول والأهلية والنطاق قبل تقييم أثره.</p>`],
    ]);
  }
  if (slug === "lys-kl-mblgh-ytalb-bh-yhkm-bh-kyf-tfkk-almtalbat-altjaryh-qbl-bna-aldfaa") {
    return replaceParagraphs(html, lang === "en" ? [
      [/The Saudi Law of Evidence provides that the claimant/, `<p><a href="${EVIDENCE_SOURCE}">Evidence Law Article 2</a> places proof of the asserted right on the claimant, allows the defendant to rebut it, and requires relevant, material and admissible facts.</p>`],
    ] : [
      [/فنظام الإثبات السعودي يقرر أن على المدعي/, `<p>تقرر <a href="${EVIDENCE_SOURCE}">المادة 2 من نظام الإثبات</a> إثبات المدعي ما يدعيه من حق وللمدعى عليه نفيه، مع لزوم تعلق الوقائع بالدعوى وإنتاجها فيها وجواز قبولها.</p>`],
    ]);
  }
  if (slug === "contract-interpretation-syrian-courts" && lang === "ar") {
    return replaceParagraphs(html, [
      [/^\s*تفسير العقود، القضاء السوري، القانون المدني السوري،/, ''],
      [/القانون المدني السوري ، المرسوم التشريعي رقم/, `<p><a href="${SYRIAN_CIVIL}">القانون المدني السوري، المرسوم التشريعي 84 لعام 1949</a>، ولا سيما المواد 148–152 في القوة الملزمة وحسن النية والتفسير.</p>`],
    ]);
  }
  if (slug === "hyn-ykwn-alaqrar-aqwa-mn-alankar") {
    const cleanLinks = html.replace(/\?utm_source=chatgpt\.com/g, '');
    return replaceParagraphs(cleanLinks, lang === "en" ? [
      [/The attachment does not affect the substance of the buyer’s entitlement/, '<p>An attachment may affect transfer, priority or enforcement against the property. Examine the sale and registration dates, the attachment order, creditor rights and the precise relief sought before concluding that the buyer’s substantive position is unaffected.</p>'],
      [/Thus, the attachment becomes a legal explanation/, '<p>Where the evidence supports the sale, a separate transfer obstacle can be explained without denying it; that does not decide priority against an attaching creditor.</p>'],
      [/If the answer is no, because subdivision is incomplete/, '<p>If subdivision or an attachment prevents transfer, identify the actual restriction and available procedure. The obstacle and the parties’ substantive rights require separate examination; neither should be assumed from the other.</p>'],
    ] : [
      [/الحجز لا يمس أصل استحقاق المشتري/, '<p>قد يؤثر الحجز في الإفراغ أو الأولوية أو التنفيذ على العقار. تُفحص تواريخ البيع والقيد وأمر الحجز وحقوق الدائنين والطلب المحدد قبل الجزم بأن مركز المشتري الموضوعي لم يتأثر.</p>'],
      [/وبذلك يتحول الحجز من وسيلة دفاع/, '<p>حيث تدعم الأدلة البيع، يمكن شرح عائق الإفراغ المستقل دون إنكاره؛ ولا يحسم ذلك الأولوية تجاه الدائن الحاجز.</p>'],
      [/إذا كانت الإجابة لا، بسبب عدم اكتمال الإفراز/, '<p>إذا منع الإفراز أو الحجز الإفراغ، يُحدد القيد الفعلي والطريق المتاح. ويُفحص العائق وحقوق الأطراف الموضوعية بصورة مستقلة، دون افتراض أحدهما من الآخر.</p>'],
    ]);
  }
  if (slug === "mta-ysbh-astamal-alhq-tasfa-fy-alnzam-alsawdy") {
    return replaceParagraphs(html, lang === "en" ? [
      [/Article \(28\) of the Civil Transactions Law provides:/, `<p><a href="${CIVIL_TRANSACTIONS}">Civil Transactions Law Articles 28–29</a> distinguish lawful exercise and abuse. Article 28 provides:</p>`],
    ] : [
      [/تنص المادة \(28\) من نظام المعاملات المدنية على أن:/, `<p>تميّز <a href="${CIVIL_TRANSACTIONS}">المادتان 28 و29 من نظام المعاملات المدنية</a> بين الاستعمال المشروع والتعسف. وتنص المادة 28 على أن:</p>`],
    ]);
  }
  if (slug === "almswwlyh-an-fal-alghyr") {
    return replaceParagraphs(html, lang === "en" ? [
      [/Risk allocation: This liability rests/, '<p><strong>Risk allocation:</strong> one explanation links enterprise activity, control and the allocation of loss. It does not mean that parenthood is a profit-making activity or that every benefit automatically establishes liability.</p>'],
      [/Control and supervision: The law presumes/, '<p><strong>Control and supervision:</strong> the legal source of the supervision duty, actual authority and available defences differ between jurisdictions and categories. A supervisory relationship alone does not settle every element.</p>'],
      [/2\. Liability of a person responsible for supervision/, `<p><strong>2. A person responsible for supervision:</strong> identify who had the relevant legal, contractual or judicial duty. Family relationship or shared residence alone should not replace that inquiry. For example, <a href="${CIVIL_TRANSACTIONS}">Saudi Civil Transactions Law Article 129</a> specifies a supervision duty and defences concerning due care or unavoidable harm; it is a country-specific example, not a rule for every jurisdiction.</p>`],
      [/3\. A physician’s liability for their medical team/, '<p><strong>3. A medical team:</strong> distinguish each practitioner’s own duties from the institution’s or supervisor’s responsibility. Working in the same operation does not alone make one practitioner answerable for every other professional’s error; actual control, independent responsibilities and the applicable healthcare rules need examination.</p>'],
    ] : [
      [/توزيع المخاطر: تقوم هذه المسؤولية/, '<p><strong>توزيع المخاطر:</strong> يربط أحد التفسيرات بين نشاط المنشأة والسيطرة وتوزيع الخسارة. ولا يعني ذلك أن الأبوة نشاط ربحي أو أن كل منفعة تقيم المسؤولية تلقائياً.</p>'],
      [/الرقابة والإشراف: يفترض القانون/, '<p><strong>الرقابة والإشراف:</strong> يختلف مصدر واجب الرقابة والسلطة الفعلية والدفوع المتاحة بحسب الدولة وصورة المسؤولية. ولا تحسم علاقة الإشراف وحدها كل العناصر.</p>'],
      [/2\. مسؤولية متولي الرقابة/, `<p><strong>2. متولي الرقابة:</strong> يُحدد صاحب واجب الرقابة النظامي أو الاتفاقي أو القضائي. ولا تستبدل القرابة أو الإقامة المشتركة وحدها هذا البحث. فمثلاً تقرر <a href="${CIVIL_TRANSACTIONS}">المادة 129 من نظام المعاملات المدنية السعودي</a> واجب الرقابة ودفوع بذل العناية أو حتمية الضرر؛ وهذا مثال لدولة محددة وليس حكماً موحداً لكل التشريعات.</p>`],
      [/3\. مسؤولية الطبيب عن فريقه الطبي/, '<p><strong>3. الفريق الطبي:</strong> يُميّز واجب كل ممارس عن مسؤولية المنشأة أو المشرف. ولا يكفي الاشتراك في عملية واحدة لتحميل ممارس أخطاء جميع المهنيين الآخرين؛ بل تُفحص السيطرة الفعلية والواجبات المستقلة والأحكام الصحية المنطبقة.</p>'],
    ]);
  }
  if (slug === "mnhjyh-5why-fy-alaml-alqanwny") {
    const labelled = html.replace(/A practical legal example/g, "An illustrative legal analysis").replace(/مثال قانوني عملي/g, "تحليل قانوني إرشادي");
    return replaceParagraphs(labelled, lang === "en" ? [
      [/It is a root-cause analysis method based on repeatedly/, '<p>It is a method for organising causal questions by asking “Why?” repeatedly. Each proposed explanation needs evidence and consideration of alternatives; five questions do not by themselves prove a single root cause.</p>'],
      [/Every legal problem results from a cause/, '<p>Follow each plausible causal chain and test it against the record. Several contributing causes may coexist, and a proposed preventive measure may reduce risk without eliminating it.</p>'],
      [/At first glance the problem may appear to be the dismissal/, '<p>In this illustration, inadequate contract governance is a hypothesis supported by the proposed chain. In a real file, test it against the judgment, operative contract, available evidence and alternative explanations.</p>'],
      [/Had this cause been addressed at the outset/, '<p>An earlier documentation policy might have improved the evidence position; it cannot be said to have guaranteed avoidance of litigation.</p>'],
    ] : [
      [/هي منهجية لتحليل الأسباب الجذرية تقوم/, '<p>هي طريقة لتنظيم الأسئلة السببية بتكرار «لماذا؟». يحتاج كل تفسير مقترح إلى دليل وفحص البدائل؛ ولا تثبت خمسة أسئلة وحدها سبباً جذرياً واحداً.</p>'],
      [/كل مشكلة قانونية هي نتيجة لسبب/, '<p>تُتبع كل سلسلة سببية محتملة وتُختبر على المستندات. وقد تتداخل أسباب عدة، ويقلل الإجراء الوقائي المقترح الخطر دون إزالته.</p>'],
      [/قد يبدو للوهلة الأولى أن المشكلة هي رفض الدعوى/, '<p>في هذا المثال، يمثل ضعف حوكمة العقود فرضية تدعمها السلسلة المقترحة. وفي ملف فعلي تُختبر على الحكم والعقد النافذ والأدلة المتاحة والتفسيرات البديلة.</p>'],
      [/ولو تمت معالجة هذا السبب منذ البداية/, '<p>قد تحسن سياسة التوثيق السابقة المركز الإثباتي؛ ولا يمكن القول إنها تضمن تجنب التقاضي.</p>'],
    ]);
  }
  if (slug === "consensual-formal-real-contracts-syrian-law") {
    const cleaned = html.replace(/I Contracts constitute/g, "Contracts constitute").replace(/ت مثل العقود/g, "تمثل العقود");
    return replaceParagraphs(cleaned, lang === "en" ? [
      [/A formal contract is one for which the law does not consider consent alone sufficient/, '<p>A formal contract requires the form prescribed for its formation or validity. A separate registration requirement affecting transfer of a property right or third-party effect should not automatically be classified as a condition for formation of the underlying agreement.</p>'],
      [/Examples traditionally cited in legal scholarship as real contracts/, '<p>Historical classifications sometimes group the following contracts as real. That list must not be used as a statement of their classification under the Syrian Civil Code; the operative definition and function of delivery must be examined for each:</p>'],
      [/In every case, the special provisions of the Syrian Civil Code must be consulted/, `<p>The published <a href="${SYRIAN_CIVIL}">Syrian Civil Code</a> defines a loan in Article 506 as an undertaking to transfer ownership, and Article 507 imposes delivery on the lender. Articles 684–685 similarly define deposit through an undertaking to receive and preserve the item and an obligation to receive it. Delivery is therefore not safely described as a universal condition for these contracts to exist.</p>`],
      [/If one person agrees with another to lend that person a sum of money/, '<p>If the parties agree to a loan payable later, separate formation of the agreement from delivery of the funds. Under Articles 506–507, the lender’s delivery obligation requires examination; lack of a transfer today does not by itself show that no contractual obligation exists. The terms, capacity and other validity requirements still matter.</p>'],
    ] : [
      [/العقد الشكلي هو العقد الذي لا يكتفي فيه القانون/, '<p>العقد الشكلي يتطلب الشكل المقرر لانعقاده أو صحته. ولا يُصنف تلقائياً إجراء التسجيل المتعلق بانتقال حق عيني أو أثره تجاه الغير كشرط لانعقاد الاتفاق الأساسي.</p>'],
      [/ومن الأمثلة التي تُذكر تقليدياً في الفقه ضمن العقود العينية/, '<p>تجمع بعض التصنيفات التاريخية العقود التالية ضمن العقود العينية. ولا تُنقل هذه القائمة بوصفها حكم التصنيف في القانون المدني السوري؛ بل يُفحص تعريف كل عقد ووظيفة التسليم فيه:</p>'],
      [/ويتعين الرجوع في كل حالة إلى النصوص الخاصة في القانون المدني السوري/, `<p>يعرّف <a href="${SYRIAN_CIVIL}">القانون المدني السوري المنشور</a> القرض في المادة 506 بالتزام نقل الملكية، وتلزم المادة 507 المقرض بالتسليم. كما تعرّف المادتان 684 و685 الوديعة بالتزام التسلم والحفظ وتقرران واجب التسلم. لذلك لا يصح وصف التسليم بأنه شرط عام لوجود هذه العقود.</p>`],
      [/إذا اتفق شخص مع آخر على إقراضه مبلغاً من المال/, '<p>إذا اتفق الطرفان على قرض يُسلّم لاحقاً، يُفصل انعقاد الاتفاق عن تسليم المال. تستدعي المادتان 506 و507 فحص التزام المقرض بالتسليم؛ فلا يثبت عدم التحويل اليوم وحده انعدام الالتزام العقدي. وتبقى الصياغة والأهلية وسائر متطلبات الصحة ذات صلة.</p>'],
    ]);
  }
  if (slug === "adarh-almkhatr-fy-alaqwd-wfq-alnzam-alsawdy") {
    return replaceParagraphs(html, lang === "en" ? [
      [/A powerful tool for ensuring compliance, and it must be:/, `<p>Agreed compensation can allocate an eligible risk, subject to <a href="${CIVIL_TRANSACTIONS}">Articles 178–179</a>. It excludes an obligation whose subject is a monetary sum and remains subject to the mandatory no-harm and adjustment rules. Specify:</p>`],
      [/They are among the strongest tools for protecting a contracting party/, '<p>Review the guarantee’s wording, issuer, expiry, demand conditions and governing rules. Its usefulness depends on whether the proposed risk and claim procedure are covered.</p>'],
    ] : [
      [/أداة قوية لضبط الالتزام/, `<p>يمكن أن يوزع التعويض الاتفاقي خطراً مؤهلاً له وفق <a href="${CIVIL_TRANSACTIONS}">المادتين 178 و179</a>. يُستثنى الالتزام الذي محله مبلغ نقدي وتبقى أحكام انتفاء الضرر والتعديل الآمرة. ويُحدد:</p>`],
      [/وتُعدّ من أقوى أدوات حماية الطرف المتعاقد/, '<p>تُراجع صياغة الضمان ومصدره وانتهاؤه وشروط المطالبة وأحكامه المنطبقة. وتتوقف فائدته على تغطيته للخطر المقصود وإمكان استيفاء طريق المطالبة.</p>'],
      [/إدارة المخاطر ليست بندًا إضافيًا في العقد، بل هي منهجية قانونية متكاملة تضمن:/, '<p>تساعد مراجعة المخاطر، بحسب العقد والتنفيذ، على:</p>'],
    ]);
  }
  if (slug === "altwsyat-alamlyh-lsyaghh-aqd-qwy") {
    return replaceParagraphs(html, lang === "en" ? [
      [/This provision resolves any disagreement regarding jurisdiction/, '<p>The clause records the parties’ chosen forum, subject to mandatory jurisdiction and validity rules. It does not settle every jurisdiction objection.</p>'],
      [/This article provides a comprehensive practical guide/, '<p>This guide helps organise a Saudi contract review around authority, scope, price, performance evidence and remedies.</p>'],
      [/A clear timetable prevents delays/, '<p>A clear timetable helps identify delay, dependencies and any agreed consequence; it does not prevent every delay.</p>'],
      [/A liquidated damages clause is one of the strongest tools/, `<p>Consider agreed compensation only where appropriate. <a href="${CIVIL_TRANSACTIONS}">Articles 178–179</a> exclude an obligation whose subject is a monetary sum and impose no-harm and adjustment controls. Define the covered breach, for example:</p>`],
      [/A clear rescission mechanism prevents lengthy disputes/, '<p>A clear termination mechanism can reduce uncertainty about grounds, notice, cure and consequences.</p>'],
      [/Writing is required to prove contracts exceeding 100,000/, `<p><a href="${EVIDENCE_SOURCE}">Evidence Law Article 66</a> addresses writing for transactions exceeding SAR 100,000 or of unspecified value, subject to applicable exceptions. Distinguish proof from any special formation formality.</p>`],
      [/^\s*Ensuring enforceability before the courts\s*$/, '<p>Checking enforceability against the transaction and applicable rules.</p>'],
    ] : [
      [/هذا البند يحسم أي خلاف حول الاختصاص/, '<p>يسجل البند جهة الفصل التي اختارها الطرفان، مع مراعاة قواعد الاختصاص الآمرة وشروط الصحة. ولا يحسم كل دفع بعدم الاختصاص.</p>'],
      [/هذا المقال يقدّم دليلًا عمليًا شاملًا/, '<p>يساعد هذا الدليل على تنظيم مراجعة العقد السعودي حول الصفة والنطاق والثمن وأدلة التنفيذ والطلبات.</p>'],
      [/الجدول الزمني الواضح يمنع التأخير/, '<p>يساعد الجدول الواضح على تحديد التأخير ومتطلبات التنفيذ وآثاره المتفق عليها، ولا يمنع كل تأخير.</p>'],
      [/الشرط الجزائي هو أقوى أدوات حماية/, `<p>يُبحث التعويض الاتفاقي حيث يناسب المعاملة. تستثني <a href="${CIVIL_TRANSACTIONS}">المادتان 178 و179</a> الالتزام الذي محله مبلغ نقدي وتقرران ضوابط انتفاء الضرر والتعديل. ويُحدد الإخلال المشمول، مثل:</p>`],
      [/وضوح آلية الفسخ يمنع/, '<p>يمكن لآلية الفسخ الواضحة تقليل الغموض حول أسبابه والإعذار والمعالجة والآثار.</p>'],
      [/الكتابة شرط لإثبات العقود التي تتجاوز قيمتها 100 ألف/, `<p>تتناول <a href="${EVIDENCE_SOURCE}">المادة 66 من نظام الإثبات</a> الكتابة للتصرف الذي يزيد على مائة ألف ريال أو يكون غير محدد القيمة، مع الاستثناءات المنطبقة. ويُميّز الإثبات عن الشكلية الخاصة اللازمة للانعقاد.</p>`],
      [/^\s*ضمان قابلية التنفيذ أمام القضاء\s*$/, '<p>فحص قابلية التنفيذ بحسب المعاملة والأحكام المنطبقة.</p>'],
    ]);
  }
  if (slug === "commercial-supply-contracts-in-saudi") {
    return replaceParagraphs(html, lang === "en" ? [
      [/^\s*Include a liquidated damages clause\s*$/, '<p>Consider agreed compensation where suitable for an eligible obligation, subject to the monetary-debt exclusion and statutory adjustment rules.</p>'],
      [/This is an essential clause in supply contracts/, `<p>An agreed-compensation clause may address an eligible delivery obligation, subject to <a href="${CIVIL_TRANSACTIONS}">Articles 178–179</a>. It is not mandatory in every supply contract and must be distinguished from a charge for late payment of a monetary debt. Possible covered events include:</p>`],
      [/To define the circumstances in which the supplier is relieved/, '<p>Define the external event, its causal effect, contractual risk allocation, notice and mitigation. The following events are not automatic exemptions; impossibility and hardship have different requirements:</p>'],
      [/These are among the most common types of cases/, '<p>These are examples of issues to identify in the contract and performance record.</p>'],
      [/Holding the supplier liable for liquidated damages/, '<p>Examining the scope of agreed compensation and the statutory no-harm and adjustment rules.</p>'],
    ] : [
      [/^\s*تضمين الشرط الجزائي\s*$/, '<p>بحث التعويض الاتفاقي حيث يناسب التزاماً مؤهلاً له، مع استثناء الدين النقدي ومراعاة أحكام التعديل النظامية.</p>'],
      [/يُعدّ بندًا جوهريًا في عقود التوريد، ويُطبّق/, `<p>قد ينظم التعويض الاتفاقي التزام تسليم مؤهلاً له وفق <a href="${CIVIL_TRANSACTIONS}">المادتين 178 و179</a>. وليس لازماً في كل عقد توريد، ويختلف عن فرض مبلغ لتأخر سداد دين نقدي. ومن الوقائع التي قد يشملها:</p>`],
      [/لتحديد الحالات التي يُعفى فيها المورد من المسؤولية/, '<p>يُحدد الحدث الخارجي وأثره السببي وتوزيع التبعة والإبلاغ والحد من الضرر. ولا تُعفي الأمثلة التالية تلقائياً؛ فللاستحالة والإرهاق شروط مختلفة:</p>'],
      [/وتُعدّ هذه الصور من أكثر القضايا/, '<p>هذه أمثلة لمسائل تُحدد في العقد وسجل التنفيذ.</p>'],
      [/إلزام المورد بالشرط الجزائي عند التأخير/, '<p>فحص نطاق التعويض الاتفاقي وأحكام انتفاء الضرر والتعديل النظامية.</p>'],
    ]);
  }
  if (slug === "formation-of-commercial-contracts-saudi-law") {
    return replaceParagraphs(html, lang === "en" ? [
      [/This is the meeting of two wills to create an obligation/, `<p>Identify an offer and corresponding acceptance, subject to any required formality. Under <a href="${CIVIL_TRANSACTIONS}">Civil Transactions Law Article 41</a>, negotiation alone does not oblige the parties to conclude the proposed contract. The following records may help establish what was actually agreed:</p>`],
      [/Accordingly, a contract concerning an unknown or unlawful matter/, '<p>Distinguish an objectively determinable subject from one that fails the statutory requirements. Identify the specific defect and its consequence instead of treating invalidity and voidability as interchangeable labels.</p>'],
      [/Writing : it is not always a requirement/, `<p><strong>Writing:</strong> distinguish a required formality from a rule of proof. <a href="${EVIDENCE_SOURCE}">Evidence Law Article 66</a> addresses transactions exceeding SAR 100,000 or of unspecified value, with applicable exceptions and further evidentiary rules.</p>`],
      [/Unenforceability of the contract : where one of the parties lacks capacity/, '<p><strong>Capacity or authority defect:</strong> examine whether the person lacked discernment, had limited capacity or lacked authority to represent another. The relevant statutory rules determine validity, voidability or the need for approval; one label does not cover every case.</p>'],
      [/Commercial courts tend to protect the good-faith party/, '<p>Good faith does not alone permit rewriting a bargain. Identify the statutory ground, requested remedy and supporting evidence.</p>'],
      [/Include a liquidated damages clause in the event of breach/, '<p>Consider agreed compensation for an eligible obligation, subject to Articles 178–179 and their mandatory controls.</p>'],
    ] : [
      [/وهو توافق إرادتين على إنشاء الالتزام/, `<p>يُحدد الإيجاب والقبول المطابق مع مراعاة الشكلية اللازمة. ووفق <a href="${CIVIL_TRANSACTIONS}">المادة 41 من نظام المعاملات المدنية</a> لا تُلزم المفاوضات وحدها بإبرام العقد المقترح. وقد تساعد السجلات التالية على إثبات ما اتفق عليه فعلاً:</p>`],
      [/فلا يصح التعاقد على أمر مجهول أو غير مشروع/, '<p>يُميّز المحل القابل للتحديد موضوعياً عن المحل المخالف للشروط النظامية. ويُحدد الخلل وأثره، دون استخدام البطلان وقابلية الإبطال كوصفين مترادفين.</p>'],
      [/الكتابة : ليست شرطًا لصحة العقد دائمًا/, `<p><strong>الكتابة:</strong> تُميّز الشكلية اللازمة عن قاعدة الإثبات. تتناول <a href="${EVIDENCE_SOURCE}">المادة 66 من نظام الإثبات</a> التصرف الذي يزيد على مائة ألف ريال أو يكون غير محدد القيمة، مع الاستثناءات وقواعد الإثبات الأخرى المنطبقة.</p>`],
      [/عدم نفاذ العقد : إذا كان أحد الأطراف غير أهل/, '<p><strong>خلل الأهلية أو السلطة:</strong> يُفحص فقد التمييز أو نقص الأهلية أو انعدام سلطة تمثيل الغير. تحدد الأحكام الخاصة الصحة أو قابلية الإبطال أو الحاجة إلى الإجازة، ولا يغطي وصف واحد كل الحالات.</p>'],
      [/وتتجه المحاكم التجارية إلى حماية الطرف حسن النية/, '<p>لا يبيح حسن النية وحده إعادة صياغة الاتفاق؛ بل يُحدد الأساس النظامي والطلب وأدلته.</p>'],
      [/^\s*تضمين الشرط الجزائي عند الإخلال\s*$/, '<p>بحث التعويض الاتفاقي لالتزام مؤهل له وفق المادتين 178 و179 وضوابطهما الآمرة.</p>'],
      [/حقوق النشر محفوظة لكانسلو/, '<p>حقوق النشر محفوظة لكاونسلو.</p>'],
    ]);
  }
  if (slug === "aqwd-almqawlat-fy-alnzam-alsawdy") {
    return replaceParagraphs(html, lang === "en" ? [
      [/Under the Civil Transactions Law, a liquidated damages clause is/, `<p>For agreed compensation, <a href="${CIVIL_TRANSACTIONS}">Articles 178–179</a> exclude an obligation whose subject is a monetary sum and regulate adjustment. Agreed compensation is not due if the debtor proves that no harm occurred. A delivery-delay clause and a late-payment charge therefore need different analysis.</p>`],
      [/These disputes are among the matters most frequently brought/, '<p>Identify the competent forum from the parties, contract and claim. A public procurement contract may have special substantive and procedural rules; it should not be assigned automatically to a commercial court.</p>'],
      [/Technical reports are among the strongest forms/, '<p>A technical report should identify its instructions, underlying records, methodology and limits so that its conclusions can be examined.</p>'],
      [/Holding the contractor liable for liquidated damages in cases/, '<p>Assessing the agreed-compensation clause, covered delay and statutory adjustment issues.</p>'],
      [/^\s*Include a liquidated damages clause\s*$/, '<p>Use an appropriate agreed-compensation clause where legally available.</p>'],
    ] : [
      [/ويُعد الشرط الجزائي في ضوء نظام المعاملات المدنية/, `<p>في التعويض الاتفاقي، تستثني <a href="${CIVIL_TRANSACTIONS}">المادتان 178 و179</a> الالتزام الذي محله مبلغ نقدي وتنظمان التعديل. ولا يستحق التعويض إذا أثبت المدين انتفاء الضرر. لذلك يختلف بحث شرط تأخر التسليم عن فرض مبلغ لتأخر سداد دين.</p>`],
      [/وتُعدّ هذه النزاعات من أكثر القضايا التي تُعرض/, '<p>يُحدد الاختصاص بحسب الأطراف والعقد والطلب. وقد يخضع عقد المشتريات الحكومية لأحكام موضوعية وإجرائية خاصة، فلا يُسند تلقائياً إلى المحكمة التجارية.</p>'],
      [/وتُعدّ التقارير الفنية من أقوى الأدلة/, '<p>ينبغي أن يبيّن التقرير الفني التكليف والمستندات والمنهج والحدود حتى يمكن فحص استنتاجاته.</p>'],
      [/إلزام المقاول بالشرط الجزائي عند التأخير غير المبرر/, '<p>فحص شرط التعويض الاتفاقي والتأخير المشمول ومسائل التعديل النظامية.</p>'],
      [/^\s*تضمين الشرط الجزائي\s*$/, '<p>استخدام تعويض اتفاقي مناسب حيث يجيزه النظام.</p>'],
    ]);
  }
  if (slug === "aqwd-alamtyaz-altjary-alfrnshayz-fy-alnzam-alsawdy") {
    return replaceParagraphs(html, lang === "en" ? [
      [/The Law requires the franchisor to provide the disclosure document/, '<p>The <a href="https://mc.gov.sa/ar/eservices/pages/servicedetails.aspx?sid=24">Ministry of Commerce’s franchise requirements</a> specify delivery of the disclosure document at least 14 days before the earlier of signing the agreement or paying any franchise consideration. Record receipt and the proposed payment date as well as the signature date.</p>'],
      [/The franchisor must also register the signed franchise agreement/, '<p>Article 3 of the <a href="https://mc.gov.sa/D/ERF.pdf">implementing regulations</a> requires the franchisor to register the signed agreement and related disclosure document within 90 days of signing. Changes to the parties or term have a separate registration requirement. Registration after signature does not replace the earlier disclosure obligation.</p>'],
      [/^\s*comply with the agreed prices and policies\s*$/, `<p>Apply lawful commercial policies, subject to the <a href="${COMPETITION_SOURCE}">Competition Law</a>; an agreement does not make every pricing restriction permissible.</p>`],
      [/^\s*comply with prices and marketing policies\s*$/, '<p>Follow lawful marketing terms and examine pricing restrictions separately under competition rules.</p>'],
      [/^\s*not grant another franchise within the exclusive territory\s*$/, '<p>Respect the scope of exclusivity where established, including any agreed channel, location or customer exceptions.</p>'],
      [/The disclosure document is the cornerstone of franchise agreements and must include:/, '<p>Use the applicable <a href="https://www.uqn.gov.sa/details?p=21561">disclosure requirements</a>, including the scope of exclusivity and termination arrangements. The following topics help organise review but do not replace the prescribed document:</p>'],
      [/These risks are among the most common causes/, '<p>Record these risks against the proposed operating model and contract; their frequency is not quantified here.</p>'],
      [/^\s*include a liquidated damages clause in the event of breach\s*$/, '<p>Consider agreed compensation only for an eligible obligation and subject to Civil Transactions Law Articles 178–179.</p>'],
    ] : [
      [/ويُلزم النظام مانح الامتياز بتقديم وثيقة الإفصاح/, '<p>تحدد <a href="https://mc.gov.sa/ar/eservices/pages/servicedetails.aspx?sid=24">متطلبات وزارة التجارة للامتياز</a> تسليم وثيقة الإفصاح قبل 14 يوماً على الأقل من إبرام الاتفاقية أو دفع أي مقابل في شأن الامتياز، أيهما أسبق. يُوثق الاستلام وموعد الدفع المقترح إلى جانب موعد التوقيع.</p>'],
      [/كما يلتزم مانح الامتياز بقيد اتفاقية الامتياز الموقعة/, '<p>توجب المادة 3 من <a href="https://mc.gov.sa/D/ERF.pdf">اللائحة التنفيذية</a> قيد الاتفاقية الموقعة ووثيقة الإفصاح خلال 90 يوماً من التوقيع. ولتغيير الأطراف أو المدة متطلب قيد مستقل. ولا يقوم القيد بعد التوقيع مقام الإفصاح السابق عليه.</p>'],
      [/^\s*الالتزام بالأسعار والسياسات المتفق عليها\s*$/, `<p>تطبيق السياسات التجارية المشروعة مع مراعاة <a href="${COMPETITION_SOURCE}">نظام المنافسة</a>؛ فليس كل قيد سعري مشروعاً لمجرد الاتفاق عليه.</p>`],
      [/^\s*الالتزام بالأسعار والسياسات التسويقية\s*$/, '<p>اتباع شروط التسويق المشروعة وفحص قيود التسعير بصورة مستقلة وفق أحكام المنافسة.</p>'],
      [/^\s*عدم منح امتياز آخر داخل النطاق الحصري\s*$/, '<p>احترام الحصرية حيث تثبت، مع تحديد استثناءات القنوات والمواقع والعملاء المتفق عليها.</p>'],
      [/وثيقة الإفصاح هي حجر الأساس في عقود الامتياز، ويجب أن تتضمن:/, '<p>تُستخدم <a href="https://www.uqn.gov.sa/details?p=21561">متطلبات وثيقة الإفصاح</a> المنطبقة، بما فيها نطاق الحصرية وترتيبات الانتهاء. تساعد الموضوعات التالية على تنظيم المراجعة ولا تستبدل الوثيقة المقررة:</p>'],
      [/وتُعدّ هذه المخاطر من أكثر أسباب النزاعات/, '<p>تُربط هذه المخاطر بنموذج التشغيل والعقد المقترح؛ ولا يقدم المقال قياساً إحصائياً لشيوعها.</p>'],
      [/^\s*تضمين الشرط الجزائي عند الإخلال\s*$/, '<p>بحث التعويض الاتفاقي لالتزام يجوز الاتفاق عليه فيه، مع مراعاة المادتين 178 و179 من نظام المعاملات المدنية.</p>'],
    ]);
  }
  if (slug === "aqwd-alwkalat-altjaryh-fy-alnzam-alsawd") {
    return replaceParagraphs(html, lang === "en" ? [
      [/Registering the agency with the Ministry of Commerce/, '<p>Check eligibility and registration separately from contract formation. The <a href="https://mc.gov.sa/ar/FAQ/pages/default.aspx?sid=100">Ministry of Commerce’s agency guidance</a> specifies Saudi eligibility, fully Saudi capital and Saudi directors and authorised signatories for an agency company, together with a matching commercial registration and the required contract and authentication documents. Do not assume that an ordinary distribution or foreign-investment arrangement satisfies the commercial-agency registration rules.</p>'],
      [/The right to set prices and marketing policies/, `<p>Marketing and pricing terms must comply with the <a href="${COMPETITION_SOURCE}">Competition Law</a>. A principal does not have an unrestricted right to impose resale prices.</p>`],
      [/The right to exclusive distribution within/, '<p>Exclusivity within the agreed territory and channels, where a valid exclusivity obligation is established.</p>'],
      [/^\s*Complying with prices and marketing policies\s*$/, '<p>Complying with lawful marketing terms, with a separate competition-law review of pricing restraints.</p>'],
      [/^\s*Observing agreed prices and policies\s*$/, '<p>Observing lawful commercial terms, subject to applicable competition rules.</p>'],
      [/Not selling competing products if the agency is exclusive/, '<p>Examining any separately agreed and lawful non-compete restriction; territorial exclusivity alone does not establish its scope.</p>'],
    ] : [
      [/ويُعد تسجيل الوكالة لدى وزارة التجارة/, '<p>تُفحص أهلية الوكيل والقيد بصورة مستقلة عن انعقاد العقد. تحدد <a href="https://mc.gov.sa/ar/FAQ/pages/default.aspx?sid=100">إرشادات وزارة التجارة للوكالات</a> شرط السعودية وسعودية رأس المال بالكامل وأعضاء المجلس وأصحاب التوقيع في شركة الوكالة، مع السجل المطابق والعقد ومستندات التصديق اللازمة. ولا يُفترض استيفاء ترتيب توزيع عادي أو استثمار أجنبي لشروط قيد الوكالة التجارية.</p>'],
      [/حق تحديد الأسعار والسياسات التسويقية/, `<p>تخضع شروط التسويق والتسعير لـ<a href="${COMPETITION_SOURCE}">نظام المنافسة</a>، ولا يملك الموكل حقاً مطلقاً في فرض سعر إعادة البيع.</p>`],
      [/حق التوزيع الحصري داخل/, '<p>الحصرية في الإقليم والقنوات المتفق عليها، حيث يثبت التزام حصري صحيح.</p>'],
      [/^\s*الالتزام بالأسعار والسياسات التسويقية\s*$/, '<p>الالتزام بشروط التسويق المشروعة، مع فحص قيود التسعير وفق نظام المنافسة بصورة مستقلة.</p>'],
      [/^\s*احترام الأسعار والسياسات المتفق عليها\s*$/, '<p>احترام الشروط التجارية المشروعة مع مراعاة أحكام المنافسة المنطبقة.</p>'],
      [/عدم بيع منتجات منافسة إذا كانت الوكالة حصرية/, '<p>فحص شرط عدم المنافسة المستقل والمشروع إن وجد؛ فلا تحدد الحصرية الإقليمية وحدها نطاقه.</p>'],
    ]);
  }
  if (slug === "hwkmh-alshrkat-kdmanh-mwdwayh-lhmayh-hqwq-msahmy-alaqlyh") {
    return replaceParagraphs(html, lang === "en" ? [
      [/Modern legislation and corporate governance regulations have established/, '<p>For a Saudi company, first establish its legal form and listing status. The Companies Law and applicable CMA regulations have different scopes, and some governance provisions are guidance rather than universally mandatory rules.</p>'],
      [/Withholding material information:/, '<p><strong>Withholding material information:</strong> examine statutory information and oversight rights and their limits. A denied request should identify the specific record, entitlement and response.</p>'],
      [/Cumulative Voting: This method/, '<p><strong>Cumulative voting:</strong> where applicable, concentrating votes may improve minority representation. It does not guarantee a seat; the result depends on the voting rules, shareholdings, candidates and votes cast.</p>'],
      [/Activating the role of independent members:/, '<p><strong>Independent directors:</strong> check the applicable board-composition rule and independence criteria for the company concerned. Independence is assessed under those criteria, rather than a universal requirement for all companies to have the same board structure.</p>'],
      [/Right to bring a liability action \(derivative action\):/, '<p><strong>A company claim and an individual claim:</strong> distinguish harm to the company from personal harm to a shareholder. Examine the standing, ownership threshold, notice, time limits and other requirements for the chosen action. Compensation, removal and invalidation of a resolution are distinct remedies.</p>'],
      [/Right to request an inspection:/, '<p><strong>Inspection:</strong> Companies Law Article 102 provides a judicial application route for shareholders representing at least 5% of a joint-stock company’s capital, subject to its conditions and potential costs or security. This differs from the competent authority’s regulatory inspection powers under Article 270.</p>'],
      [/Drafting a balanced governance system represents/, '<p>Before acting, collect the articles of association, shareholding evidence, meeting notices and minutes, information requests and disputed transaction records. Identify the breached rule and remedy; a governance concern does not automatically invalidate a resolution or establish every director’s joint liability.</p>'],
    ] : [
      [/أوجدت التشريعات الحديثة ولائحة حوكمة الشركات/, '<p>في الشركة السعودية يُحدد أولاً الشكل النظامي وحالة الإدراج. يختلف نطاق نظام الشركات ولوائح الهيئة المنطبقة، وبعض أحكام الحوكمة استرشادي ولا يسري كقاعدة آمرة موحدة على جميع الشركات.</p>'],
      [/حجب المعلومات الجوهرية:/, '<p><strong>حجب المعلومات الجوهرية:</strong> تُفحص حقوق الاطلاع والرقابة النظامية وحدودها. ويُحدد في الطلب المرفوض السجل المطلوب وسند الحق والرد عليه.</p>'],
      [/التصويت التراكمي \(Cumulative Voting\):/, '<p><strong>التصويت التراكمي:</strong> قد يساعد تركيز الأصوات حيث تنطبق آليته على تمثيل الأقلية، لكنه لا يضمن مقعداً؛ فالنتيجة تتوقف على قواعد التصويت والملكيات والمرشحين والأصوات المدلى بها.</p>'],
      [/تفعيل دور الأعضاء المستقلين:/, '<p><strong>الأعضاء المستقلون:</strong> يُراجع حكم تشكيل المجلس ومعايير الاستقلال المنطبقة على الشركة. ويُقاس الاستقلال بهذه المعايير، لا بافتراض تشكيل موحد لازم لكل الشركات.</p>'],
      [/حق إقامة دعوى المسؤولية \(الدعوى غير المباشرة\):/, '<p><strong>دعوى الشركة والدعوى الشخصية:</strong> يُميّز ضرر الشركة عن ضرر المساهم الشخصي، وتُفحص الصفة ونسبة الملكية والإبلاغ والمدد وسائر شروط الدعوى المختارة. والتعويض والعزل وإبطال القرار طلبات مستقلة.</p>'],
      [/الحق في طلب التفتيش:/, '<p><strong>التفتيش:</strong> تقرر المادة 102 من نظام الشركات طريق طلب قضائي لمساهمين يمثلون 5% على الأقل من رأس مال الشركة المساهمة، وفق شروطها وما قد يترتب من نفقات أو ضمان. ويختلف ذلك عن صلاحية الجهة المختصة في التفتيش الرقابي وفق المادة 270.</p>'],
      [/إن صياغة نظام حوكمة متوازن يمثل/, '<p>قبل اتخاذ الإجراء، تُجمع وثائق تأسيس الشركة وإثبات الملكية ودعوات الاجتماعات ومحاضرها وطلبات الاطلاع وسجلات المعاملة محل الاعتراض. يُحدد الحكم المخالف والطلب؛ فلا يترتب تلقائياً على كل ملاحظة حوكمة بطلان القرار أو مسؤولية جميع الأعضاء بالتضامن.</p>'],
    ]) + (html.includes('data-governance-sources') ? '' : lang === "en"
      ? '<p data-governance-sources="true">Sources: <a href="https://www.uqn.gov.sa/details?p=19697">Saudi Companies Law</a> and the <a href="https://cma.gov.sa/RulesRegulations/Regulations/Pages/default.aspx">CMA regulations register</a>. Select the rules applicable to the company and transaction date.</p>'
      : '<p data-governance-sources="true">المصادر: <a href="https://www.uqn.gov.sa/details?p=19697">نظام الشركات السعودي</a> و<a href="https://cma.gov.sa/RulesRegulations/Regulations/Pages/default.aspx">سجل لوائح هيئة السوق المالية</a>. تُحدد الأحكام المنطبقة على الشركة وتاريخ المعاملة.</p>');
  }
  if (slug === "athbat-alaqwd-amam-alqda-alsawdy") {
    return replaceParagraphs(html, lang === "en" ? [
      [/Official documents : such as/, '<p><strong>Official documents:</strong> examine the definition and scope in Evidence Law Articles 25–26 rather than ranking every statement in a notarised document equally.</p>'],
      [/They carry full evidentiary force unless/, `<p><a href="${EVIDENCE_SOURCE}">Article 26</a> distinguishes matters performed by the official within their duties or occurring in their presence from the contents of a party’s statement. The former are subject to the statutory forgery route; the latter bind that party unless disproved. A challenge must identify the particular statement and appropriate procedure.</p>`],
      [/The Law requires that it be:/, `<p><a href="${EVIDENCE_SOURCE}">Articles 53–64</a> distinguish official digital evidence, specified non-official categories and other digital evidence. There is no single requirement that every admissible message be issued by an approved system. Preserve material that allows examination of:</p>`],
      [/^\s*tamper-proof\s*$/, '<p>integrity and any alteration</p>'],
      [/^\s*issued by a trusted system\s*$/, '<p>origin, method of generation and preservation</p>'],
      [/However, financial transactions exceeding SAR 100,000/, `<p>Article 66 requires writing for transactions exceeding SAR 100,000 or of unspecified value. Examine applicable statutory or agreed exceptions and the further rules on witness evidence; the threshold alone does not decide every evidence question. Keep formation validity distinct from the permitted means of proof.</p>`],
    ] : [
      [/محررات رسمية : كالعقود الموثقة/, '<p><strong>المحررات الرسمية:</strong> يُراجع تعريفها ونطاق حجيتها في المادتين 25 و26، ولا تتساوى تلقائياً حجية كل عبارة في المحرر الموثق.</p>'],
      [/تكون لها قوة كاملة ما لم يُطعن/, `<p>تميّز <a href="${EVIDENCE_SOURCE}">المادة 26</a> بين ما قام به المحرر في حدود مهمته أو وقع بحضوره وبين مضمون قول أحد ذوي الشأن. يخضع الأول للطعن بالتزوير بالطريق النظامي، ويكون الثاني حجة على قائله ما لم يثبت غيره. فيُحدد القول محل الاعتراض وطريقه المناسب.</p>`],
      [/يشترط النظام أن يكون:/, `<p>تميّز <a href="${EVIDENCE_SOURCE}">المواد 53–64</a> بين الدليل الرقمي الرسمي وفئات غير رسمية محددة وسائر الأدلة الرقمية. ولا يُشترط صدور كل رسالة مقبولة من نظام معتمد. تُحفظ المواد التي تتيح فحص:</p>`],
      [/^\s*غير قابل للتلاعب\s*$/, '<p>السلامة وأي تعديل طرأ</p>'],
      [/^\s*صادرًا من نظام موثوق\s*$/, '<p>المصدر وطريقة الإنشاء والحفظ</p>'],
      [/لكن التصرفات المالية التي تتجاوز قيمتها 100 ألف/, '<p>توجب المادة 66 الكتابة للتصرف الذي تزيد قيمته على مائة ألف ريال أو يكون غير محدد القيمة. تُفحص الاستثناءات النظامية أو الاتفاقية وقواعد الشهادة الأخرى؛ فالحد المالي وحده لا يحسم كل مسألة إثبات. وتُميّز صحة الانعقاد عن وسيلة إثباته الجائزة.</p>'],
    ]);
  }
  if (slug === "e-contracts-legal-validity-saudi-arabia") {
    return replaceParagraphs(html, lang === "en" ? [
      [/This article offers a precise yet accessible/, '<p>This guide distinguishes contract formation, electronic signatures and the evidentiary value of digital records.</p>'],
      [/^\s*Electronic Transactions Law\s*$/, `<p><a href="${ELECTRONIC_TRANSACTIONS}">Electronic Transactions Law</a></p>`],
      [/^\s*Anti-Cybercrime Law\s*$/, `<p><a href="${EVIDENCE_SOURCE}">Evidence Law, including digital evidence</a></p>`],
      [/These laws confirm that electronic contracting is valid and enforceable provided/, '<p>Check any special formality or excluded transaction as well as the general formation rules. Relevant questions include:</p>'],
      [/The electronic signature is one of the most important elements/, '<p>Distinguish an electronic signature’s statutory and technical requirements from the broader question of proving a contract through digital records. Review:</p>'],
      [/^\s*Issued by a trusted entity\s*$/, '<p>the signature method and any applicable certification requirement</p>'],
      [/Linked to its owner in a manner that cannot be repudiated/, '<p>how the signature is attributed to the person and how a challenge can be examined</p>'],
      [/Approved by the Digital Government Authority or a trusted service provider/, '<p>any regulated trust-service or certification conditions applicable to the chosen method; do not assume individual DGA approval is required for every electronic agreement</p>'],
      [/This evidence has recognised evidentiary value if it is:/, `<p><a href="${EVIDENCE_SOURCE}">Evidence Law Articles 56–59</a> distinguish the evidentiary categories and challenges. Other digital evidence can have the status of a private document; lack of a certified platform alone does not dispose of admissibility. Examine:</p>`],
      [/^\s*Not susceptible to tampering\s*$/, '<p>integrity and evidence of alteration</p>'],
      [/^\s*Issued by a trusted system\s*$/, '<p>origin and preservation of the original record</p>'],
      [/Saudi courts tend to protect the good-faith party/, '<p>Good faith and reliable records can be relevant, but the platform’s reputation does not determine the outcome or replace proof of the disputed transaction.</p>'],
      [/Platforms bear statutory responsibilities, including:/, '<p>Identify the platform’s role and applicable duties under its contract, sector rules and relevant data or commerce legislation. Issues to examine include:</p>'],
      [/A platform may be held accountable for any technical defect/, '<p>A technical fault does not alone establish liability. Identify the relevant duty, breach, causal loss and any applicable allocation of responsibility or mandatory rule.</p>'],
    ] : [
      [/هذا المقال يقدّم قراءة قانونية دقيقة/, '<p>يميّز هذا الدليل بين انعقاد العقد والتوقيع الإلكتروني وحجية السجلات الرقمية.</p>'],
      [/^\s*نظام المعاملات الإلكترونية\s*$/, `<p><a href="${ELECTRONIC_TRANSACTIONS}">نظام التعاملات الإلكترونية</a></p>`],
      [/^\s*نظام مكافحة الجرائم المعلوماتية\s*$/, `<p><a href="${EVIDENCE_SOURCE}">نظام الإثبات، بما فيه الدليل الرقمي</a></p>`],
      [/وتؤكد هذه الأنظمة أن التعاقد الإلكتروني صحيح/, '<p>تُفحص الشكلية الخاصة أو المعاملة المستثناة إلى جانب قواعد الانعقاد العامة. ومن المسائل ذات الصلة:</p>'],
      [/يُعدّ التوقيع الإلكتروني من أهم عناصر إثبات/, '<p>تُميّز متطلبات التوقيع النظامية والفنية عن مسألة إثبات العقد بالسجلات الرقمية بصورة أوسع. ويُراجع:</p>'],
      [/^\s*صادرًا من جهة موثوقة\s*$/, '<p>طريقة التوقيع وأي متطلب لشهادة التصديق ينطبق عليها</p>'],
      [/مرتبطًا بصاحبه بشكل لا يقبل الإنكار/, '<p>كيفية نسبة التوقيع لصاحبه وفحص الاعتراض عليه</p>'],
      [/معتمدًا من هيئة الحكومة الرقمية أو مزود خدمة موثوق/, '<p>شروط خدمة الثقة أو التصديق المنظمة التي تنطبق على الطريقة المختارة؛ ولا يُفترض لزوم اعتماد فردي من هيئة الحكومة الرقمية لكل اتفاق إلكتروني</p>'],
      [/وتُعدّ هذه الأدلة ذات حجية معتبرة إذا كانت:/, `<p>تميّز <a href="${EVIDENCE_SOURCE}">المواد 56–59 من نظام الإثبات</a> بين فئات الحجية والاعتراض عليها. وقد تكون للدليل الرقمي الآخر حجية المحرر العادي؛ فلا يحسم غياب منصة معتمدة قبوله وحده. ويُفحص:</p>`],
      [/^\s*غير قابلة للتلاعب\s*$/, '<p>السلامة وأدلة التعديل</p>'],
      [/^\s*صادرة من نظام موثوق\s*$/, '<p>المصدر وحفظ أصل السجل</p>'],
      [/ويتجه القضاء السعودي إلى حماية الطرف حسن النية/, '<p>قد يؤثر حسن النية ودقة السجلات، لكن سمعة المنصة لا تحسم النتيجة ولا تستبدل إثبات المعاملة المتنازع عليها.</p>'],
      [/تتحمل المنصات مسؤوليات نظامية، منها:/, '<p>يُحدد دور المنصة وواجباتها وفق عقدها وأحكام قطاعها وتشريعات البيانات أو التجارة ذات الصلة. ومن المسائل التي تُفحص:</p>'],
      [/وقد تُسأل المنصة عن أي خلل تقني/, '<p>لا يكفي العطل التقني وحده لقيام المسؤولية؛ بل يُحدد الواجب والإخلال والضرر السببي وتوزيع المسؤولية وأي حكم آمر منطبق.</p>'],
    ]);
  }
  if (slug === "alaywb-alkhfyh-fy-alaqwd-wathrha-alqanwny") {
    const renamed = html.replace(/Saudi Commercial Transactions Law and Civil Law/g, "Saudi Civil Transactions Law").replace(/نظام المعاملات التجارية والنظام المدني السعودي/g, "نظام المعاملات المدنية السعودي");
    return replaceParagraphs(renamed, lang === "en" ? [
      [/The injured party must not have known of the defect/, '<p>Examine the buyer’s knowledge and ordinary inspection under Article 339, including the exceptions for a specific assurance of freedom from the defect or deliberate concealment.</p>'],
      [/These affect the legal validity of the contract/, '<p>Title, mortgage and third-party claims require their own legal analysis. They are not interchangeable with a physical defect or an automatic finding that the contract is invalid. Examples requiring separate investigation include:</p>'],
      [/The injured party may request judicial termination of the contract if the hidden defect/, `<p>For a sale, <a href="${CIVIL_TRANSACTIONS}">Civil Transactions Law Article 338</a> addresses a defect reducing value or intended usefulness at delivery. It provides for seeking termination or retaining the item with a proportionate price adjustment; the seller may provide an equivalent defect-free replacement. Examine the related exceptions and limits rather than requiring performance to be wholly impossible.</p>`],
      [/If the hidden defect causes financial losses/, '<p>Additional damages require a legal basis and supporting evidence. Assess the following possible costs without assuming that all are recoverable or cumulative:</p>'],
      [/In some contracts, the seller or supplier is required to provide a warranty/, '<p>Distinguish the statutory sale warranty from a contractual or product-specific repair, replacement or refund scheme. Check the transaction, terms and any special consumer rules before selecting the remedy.</p>'],
      [/Saudi law requires the injured party to report the defect immediately/, `<p>Article 340 distinguishes ordinary inspection and notice within a reasonable period from a defect undiscoverable by ordinary inspection, which must be reported on discovery. Article 344 separately addresses a 180-day period from delivery for the warranty action, a longer seller undertaking and fraudulent concealment. Check both notice and filing rules promptly; one does not replace the other.</p>`],
      [/To support the success of a legal claim/, '<p>Preserve evidence of the condition at delivery, discovery and notification, including:</p>'],
      [/Provide an official warranty for the products/, '<p>Document the applicable warranty and claims procedure accurately.</p>'],
    ] : [
      [/عدم علم الطرف المتضرر بالعيب :/, '<p>يُفحص علم المشتري وإمكان اكتشاف العيب بالفحص المعتاد وفق المادة 339، مع مراعاة ضمان السلامة من عيب بعينه أو تعمد إخفائه.</p>'],
      [/وهي التي تؤثر على صحة العقد من الناحية القانونية/, '<p>تحتاج الملكية والرهن وحقوق الغير إلى بحث مستقل؛ فلا تتطابق مع العيب المادي ولا تعني تلقائياً بطلان العقد. ومن أمثلة المسائل التي تستلزم هذا البحث:</p>'],
      [/يحق للطرف المتضرر طلب فسخ العقد قضائيًا إذا كان العيب الخفي/, `<p>في البيع، تتناول <a href="${CIVIL_TRANSACTIONS}">المادة 338 من نظام المعاملات المدنية</a> العيب الذي ينقص القيمة أو النفع المقصود عند التسليم. وتقرر طلب الفسخ أو الإمساك مع فرق الثمن النسبي، وللبائع تقديم بديل مماثل غير معيب. وتُراعى الاستثناءات والقيود المرتبطة، دون اشتراط استحالة التنفيذ كلياً.</p>`],
      [/إذا تسبب العيب الخفي في خسائر مالية/, '<p>يتطلب التعويض الإضافي أساساً ودليلاً. تُفحص التكاليف المحتملة الآتية دون افتراض استحقاقها جميعاً أو جمعها:</p>'],
      [/في بعض العقود، يلتزم البائع أو المورد بتقديم ضمان/, '<p>يُميّز ضمان البيع النظامي عن ضمان الإصلاح أو الاستبدال أو الاسترداد العقدي أو الخاص بالمنتج. وتُراجع المعاملة والشروط وأحكام حماية المستهلك الخاصة قبل اختيار الطلب.</p>'],
      [/يتطلب النظام السعودي من الطرف المتضرر الإبلاغ/, '<p>تميّز المادة 340 بين الفحص المعتاد والإعلام خلال مدة معقولة وبين العيب الذي لا يكشفه الفحص المعتاد ويلزم الإعلام به بمجرد ظهوره. وتنظم المادة 344 بصورة مستقلة مدة 180 يوماً من التسليم لدعوى ضمان العيب والتزام البائع بمدة أطول وإخفاء العيب بغش. تُراجع قواعد الإعلام ورفع الدعوى سريعاً؛ فلا تقوم إحداهما مقام الأخرى.</p>'],
      [/لضمان نجاح الدعوى القضائية/, '<p>تُحفظ أدلة الحالة عند التسليم والاكتشاف والإعلام، ومنها:</p>'],
      [/توفير ضمان رسمي على المنتجات/, '<p>توثيق الضمان المنطبق وإجراءات المطالبة بدقة.</p>'],
    ]);
  }
  if (slug === "fskh-alaqd-altjary-fy-alnzam-alsawdy") {
    return replaceParagraphs(html, lang === "en" ? [
      [/This article provides a professional explanation/, '<p>This guide distinguishes termination, restitution and a separate damages claim under Saudi law.</p>'],
      [/Commercial courts have affirmed that termination is a right/, `<p><a href="${CIVIL_TRANSACTIONS}">Article 107 of the Civil Transactions Law</a> addresses reciprocal contracts, notice, performance or termination, and compensation where justified. The court may refuse termination where the unperformed part is of little significance relative to the obligation.</p>`],
      [/This is the most common form in commercial contracts/, '<p>A 30-day period is a drafting example, not a statutory default. Under Article 108, an agreed right to terminate without a judgment does not dispense with notice unless the parties expressly agree to that exemption.</p>'],
      [/A termination claim will not be accepted unless/, '<p>Assess the following issues separately; the conditions for damages must not be treated as identical to the conditions for termination:</p>'],
      [/Courts tend to require notice before termination/, '<p>Check Article 107 and the notice clause. A contractual right to terminate without a judgment and an express exemption from notice are different matters under Article 108.</p>'],
      [/The breaching party must be given an opportunity/, '<p>Examine the agreed cure procedure and any special statutory rule. For construction work, Article 466 distinguishes a reasonable correction period from specified grounds for an immediate termination request.</p>'],
      [/4\) Damage is established/, '<p><strong>4) Distinguish any damages request</strong></p>'],
      [/The damage need not be substantial/, '<p>A damages request requires its own basis and proof. Article 107 permits termination with compensation where justified; it does not make a compensable loss a separate universal prerequisite for termination.</p>'],
      [/The parties are restored, as far as possible/, '<p>Article 111 addresses restitution, but termination of a continuing contract has no retroactive effect.</p>'],
      [/Any obligations not yet performed upon termination are discharged/, '<p>Identify which obligations end and which rights have already accrued; termination does not erase the entire accounting between the parties.</p>'],
      [/The aggrieved party is released from any additional obligations/, '<p>Under Article 113, dispute-resolution and confidentiality obligations survive unless otherwise agreed, without prejudice to statutory provisions.</p>'],
      [/Sixth: The Saudi Judicial Approach/, '<p><strong>Sixth: Issues to examine in a termination claim</strong></p>'],
      [/Commercial courts tend to:/, '<p>Check the applicable rule and supporting evidence for each requested remedy:</p>'],
      [/Reject termination where the breach is minor or can be remedied/, '<p>Assess the significance of the unperformed obligation; a possibility of repair alone does not determine every termination request.</p>'],
      [/Apply the liquidated damages clause upon termination/, '<p>Examine the scope and survival of any agreed-compensation clause and Articles 178–179, rather than assuming termination automatically activates it.</p>'],
      [/This approach reflects the judiciary/, '<p>Keep the legal basis for ending performance separate from restitution, completion costs and damages.</p>'],
      [/These measures reduce disputes and improve the prospects/, '<p>These records help clarify the claim and disputed facts; they do not establish an entitlement to win.</p>'],
    ] : [
      [/هذا المقال يقدّم شرحًا احترافيًا/, '<p>يميّز هذا الدليل بين الفسخ والرد والمطالبة المستقلة بالتعويض في النظام السعودي.</p>'],
      [/وقد أكدت المحاكم التجارية أن الفسخ حق/, `<p>تنظم <a href="${CIVIL_TRANSACTIONS}">المادة 107 من نظام المعاملات المدنية</a> طلب التنفيذ أو الفسخ بعد الإعذار في العقود الملزمة للجانبين، مع التعويض إن كان له مقتض. وللمحكمة رفض الفسخ إذا كان الجزء غير المنفذ قليل الأهمية بالنسبة إلى الالتزام.</p>`],
      [/هذا النوع هو الأكثر شيوعًا/, '<p>مدة الثلاثين يوماً مثال للصياغة وليست أجلاً نظامياً افتراضياً. ووفق المادة 108، لا يغني الاتفاق على الفسخ دون حكم قضائي عن الإعذار إلا عند الاتفاق صراحة على الإعفاء منه.</p>'],
      [/لا يُقبل طلب الفسخ إلا بتوافر/, '<p>تُفحص المسائل التالية بصورة مستقلة؛ فلا تتطابق شروط التعويض بالضرورة مع شروط الفسخ:</p>'],
      [/تتجه المحاكم إلى اشتراط الإنذار قبل الفسخ/, '<p>تُراجع المادة 107 وبند الإعذار. ويختلف الاتفاق على الفسخ دون حكم عن الإعفاء الصريح من الإعذار وفق المادة 108.</p>'],
      [/يُشترط منح الطرف المخلّ فرصة/, '<p>تُفحص مهلة المعالجة المتفق عليها وأي حكم خاص. ففي المقاولة تميّز المادة 466 بين مهلة التصحيح المعقولة وحالات محددة لطلب الفسخ في الحال.</p>'],
      [/4\) ثبوت الضرر/, '<p><strong>4) فصل طلب التعويض</strong></p>'],
      [/ليس شرطًا أن يكون الضرر كبيرًا/, '<p>للتعويض أساسه وأدلته المستقلة. تجيز المادة 107 الفسخ مع التعويض إن كان له مقتض، ولا تجعل الضرر القابل للتعويض شرطاً مستقلاً عاماً لكل طلب فسخ.</p>'],
      [/إعادة الحال إلى ما كان عليه قبل التعاقد/, '<p>تنظم المادة 111 الرد، مع عدم رجعية الفسخ أو الانفساخ في العقود الزمنية.</p>'],
      [/سقوط أي التزامات لم تُنفذ بعد الفسخ/, '<p>تُحدد الالتزامات المنتهية والحقوق التي استحقت؛ فلا يمحو الفسخ كامل الحساب بين الطرفين.</p>'],
      [/تحرير الطرف المتضرر من أي التزامات إضافية/, '<p>وفق المادة 113 يبقى شرط تسوية المنازعة وشرط السرية ما لم يتفق على خلاف ذلك، ودون إخلال بالنصوص النظامية.</p>'],
      [/سادسًا: الاتجاه القضائي السعودي/, '<p><strong>سادساً: مسائل تُفحص في طلب الفسخ</strong></p>'],
      [/تتجه المحاكم التجارية إلى:/, '<p>يُراجع حكم كل طلب ودليله:</p>'],
      [/رفض الفسخ إذا كان الإخلال بسيطًا أو يمكن إصلاحه/, '<p>تُفحص أهمية الجزء غير المنفذ؛ ولا يحسم إمكان الإصلاح وحده كل طلب فسخ.</p>'],
      [/تطبيق الشرط الجزائي عند الفسخ إذا/, '<p>يُفحص نطاق شرط التعويض الاتفاقي وبقاؤه وضوابط المادتين 178 و179، ولا يُفترض تفعيله تلقائياً بمجرد الفسخ.</p>'],
      [/هذا الاتجاه يعكس حرص القضاء/, '<p>يُفصل أساس إنهاء التنفيذ عن الرد وتكاليف الإكمال والتعويض.</p>'],
      [/هذه الإجراءات تقلّل من النزاعات وتزيد من فرص كسب/, '<p>تساعد هذه المستندات على توضيح المطالبة والوقائع المتنازع عليها، ولا تثبت استحقاق كسب الدعوى.</p>'],
    ]);
  }
  if (slug === "contractual-liability-in-commercial-transactions") {
    return replaceParagraphs(html, lang === "en" ? [
      [/Three principal conditions must be met/, '<p>For a contractual damages claim, identify the valid obligation, breach, compensable harm and causal connection, together with applicable notice and other requirements. A price or performance claim is not identical to a damages claim.</p>'],
      [/Damage suffered by the other party The damage may/, '<p><strong>Harm and causation.</strong> Explain the loss caused by the breach. Reputational or moral harm is not automatically recoverable merely because it is alleged; its legal basis, claimant and proof require examination.</p>'],
      [/Commercial courts generally assess compensation/, `<p><a href="${CIVIL_TRANSACTIONS}">Civil Transactions Law Article 180</a> governs assessment where compensation is not predetermined, including ordinary contractual foreseeability and its fraud or gross-fault exception. Keep loss, causation and the calculation distinct.</p>`],
      [/Saudi courts uphold such a clause subject to two conditions/, `<p>Agreed compensation requires examination under <a href="${CIVIL_TRANSACTIONS}">Articles 178–179</a>. Article 178 excludes an obligation whose subject is a monetary sum. Article 179 addresses the debtor’s proof of no harm, reduction for excess or partial performance, and an increase for proven excess loss caused by fraud or gross fault; contrary agreements are void.</p>`],
      [/The amount must not be unreasonably excessive/, '<p>Identify any mandatory adjustment or no-harm issue.</p>'],
      [/The court may reduce the agreed penalty if/, '<p>The request, proof and statutory ground for adjustment matter; the agreed amount is not automatically the final award.</p>'],
      [/Including a penalty clause/, '<p>Using an appropriate agreed-compensation clause where legally available.</p>'],
    ] : [
      [/بل يجب توافر ثلاثة شروط رئيسية/, '<p>في التعويض العقدي يُحدد الالتزام الصحيح والإخلال والضرر القابل للجبر وعلاقة السببية، مع فحص الإعذار وسائر المتطلبات المنطبقة. ولا تتطابق مطالبة الثمن أو التنفيذ مع مطالبة التعويض.</p>'],
      [/حدوث ضرر للطرف الآخر الضرر قد/, '<p><strong>الضرر والسببية.</strong> تُبيّن الخسارة الناشئة عن الإخلال. ولا يستحق التعويض عن السمعة أو الضرر المعنوي بمجرد الادعاء به؛ بل يُفحص أساسه وصفة طالبه ودليله.</p>'],
      [/وتتجه المحاكم التجارية إلى تقدير التعويض/, `<p>تنظم <a href="${CIVIL_TRANSACTIONS}">المادة 180 من نظام المعاملات المدنية</a> التقدير عند عدم تحديد التعويض مسبقاً، بما فيه توقع الضرر العقدي واستثناء الغش والخطأ الجسيم. ويُفصل الضرر والسببية والحساب.</p>`],
      [/وتعتمد المحاكم السعودية هذا الشرط بشرطين/, `<p>يُفحص التعويض الاتفاقي وفق <a href="${CIVIL_TRANSACTIONS}">المادتين 178 و179</a>. تستثني المادة 178 الالتزام الذي محله مبلغ نقدي، وتنظم المادة 179 إثبات المدين انتفاء الضرر والإنقاص للمبالغة أو التنفيذ الجزئي والزيادة لضرر زائد سببه الغش أو الخطأ الجسيم؛ ويبطل الاتفاق المخالف.</p>`],
      [/ألا يكون المبلغ مبالغًا فيه بشكل غير معقول/, '<p>تحديد مسألة التعديل الآمر أو انتفاء الضرر إن وجدت.</p>'],
      [/وقد تُخفض المحكمة الشرط الجزائي إذا/, '<p>يُراعى الطلب والدليل والأساس النظامي للتعديل؛ فليس المبلغ الاتفاقي بالضرورة هو المحكوم به.</p>'],
      [/^\s*تضمين الشرط الجزائي\s*$/, '<p>استخدام تعويض اتفاقي مناسب حيث يجيزه النظام.</p>'],
    ]);
  }
  if (slug === "altawyd-an-alakhlal-balaqd-fy-alqanwn-alswry") {
    return replaceParagraphs(html, lang === "en" ? [
      [/There is no compensation without harm/, '<p>Ordinary damages require compensable harm. Statutory delay interest has a distinct rule under Article 229 and does not require separate proof of loss.</p>'],
      [/Syrian civil law provides for delay interest of four per cent/, `<p><a href="${SYRIAN_CIVIL}">Article 227 of the published Civil Code</a> sets delay interest at 4% in civil and 5% in commercial matters for a monetary obligation ascertainable when claimed. It ordinarily runs from judicial demand, subject to the provision’s exceptions. Agreed interest is separately controlled by Article 228; these rules must not be transferred to Saudi transactions.</p>`],
      [/In some cases, supplementary compensation exceeding interest/, '<p>Article 232 permits supplementary compensation where the creditor proves that harm exceeding interest was caused by the debtor’s bad faith. The excess loss and that basis must be established.</p>'],
      [/The next article in this series will address The penalty clause/, `<p>For agreed compensation, Articles 224–226 address advance assessment, absence of harm, reduction and the conditions for claiming more than the agreed amount.</p>`],
      [/The creditor may be excused from putting the debtor in default/, '<p>Articles 219–221 govern notice and its exceptions. For example, Article 221 refers to performance made impossible or pointless by the debtor’s act, or a written refusal to perform; impossibility from any cause is not an interchangeable exception.</p>'],
    ] : [
      [/^\s*لا تعويض من دون ضرر\.?\s*$/, '<p>يتطلب التعويض المعتاد ضرراً قابلاً للجبر. أما فوائد التأخير فلها حكم مستقل في المادة 229 لا يشترط إثبات خسارة منفصلة.</p>'],
      [/ويقرر القانون المدني السوري فوائد تأخير قدرها/, `<p>تقرر <a href="${SYRIAN_CIVIL}">المادة 227 من القانون المدني المنشور</a> فوائد تأخير بمعدل 4% مدنياً و5% تجارياً لالتزام نقدي معلوم المقدار وقت الطلب، وتسري في الأصل من المطالبة القضائية مع مراعاة الاستثناءات الواردة فيها. وللفائدة الاتفاقية ضوابط مستقلة في المادة 228، ولا تنقل هذه الأحكام إلى المعاملات السعودية.</p>`],
      [/كما يجوز في بعض الحالات المطالبة بتعويض تكميلي/, '<p>تجيز المادة 232 التعويض التكميلي إذا أثبت الدائن أن الضرر الزائد على الفوائد سببه سوء نية المدين؛ فيلزم إثبات الزيادة وأساسها.</p>'],
      [/وسيتناول المقال التالي من هذه السلسلة الشرط الجزائي/, '<p>تنظم المواد 224–226 تقدير التعويض مسبقاً وانتفاء الضرر وإنقاص التعويض وشروط تجاوز المبلغ المتفق عليه.</p>'],
      [/وقد يُعفى الدائن من الإعذار في بعض الحالات/, '<p>تنظم المواد 219–221 الإعذار واستثناءاته. ومن أمثلة المادة 221 أن يصبح التنفيذ غير ممكن أو غير مجد بفعل المدين، أو أن يصرح كتابة بعدم التنفيذ؛ فلا تستوي معها الاستحالة الناشئة عن أي سبب.</p>'],
    ]);
  }
  if (slug === "almswwlyh-alaqdyh-fy-alqanwn-alswry") {
    return replaceParagraphs(html, lang === "en" ? [
      [/Nevertheless, there are cases in which formal notice is unnecessary/, `<p>Check the notice route and exceptions in <a href="${SYRIAN_CIVIL}">Civil Code Articles 219–221</a>. The example of impossible or pointless performance concerns the debtor’s act; a written refusal to perform and the other statutory exceptions have their own conditions.</p>`],
    ] : [
      [/ومع ذلك، توجد حالات لا يكون فيها الإعذار لازماً/, `<p>راجع طريق الإعذار واستثناءاته في <a href="${SYRIAN_CIVIL}">المواد 219–221 من القانون المدني</a>. فمثال التنفيذ المستحيل أو غير المجدي يتعلق بفعل المدين، وللتصريح الكتابي بعدم التنفيذ وسائر الاستثناءات شروطها الخاصة.</p>`],
    ]);
  }
  if (slug === "alahlyh-fy-altaaqd-fy-alqanwn-alswry") {
    return replaceParagraphs(html, lang === "en" ? [
      [/The general rule is that a person acquires full capacity on reaching/, `<p>The published <a href="${SYRIAN_CIVIL}">Civil Code, Articles 46–49</a>, sets majority at 18 completed Gregorian years, with mental capacity and absence of interdiction also relevant. It treats a child below seven as lacking discernment. These age rules must be distinguished from permission to perform a particular transaction or manage specified property.</p>`],
      [/In this case, the contract is subject to the special rules established by law/, `<p>Under Articles 111–113, a discerning minor’s purely beneficial financial act is valid and a purely detrimental one is void. An act combining benefit and detriment is voidable for the minor’s protection, subject to the prescribed approval rules. Permission to manage property has its own limits.</p>`],
    ] : [
      [/الأصل أن الإنسان يصبح كامل الأهلية عند بلوغه السن/, `<p>تحدد <a href="${SYRIAN_CIVIL}">المواد 46–49 من القانون المدني المنشور</a> سن الرشد بثماني عشرة سنة ميلادية كاملة، مع اعتبار القوى العقلية وعدم الحجر. وتعد من لم يبلغ السابعة فاقد التمييز. ويجب التمييز بين السن والإذن بإجراء تصرف معين أو إدارة مال محدد.</p>`],
      [/في هذه الحالة يخضع العقد للأحكام الخاصة التي وضعها القانون/, '<p>وفق المواد 111–113، يصح التصرف المالي للصغير المميز إذا كان نافعاً نفعاً محضاً، ويبطل إذا كان ضاراً ضرراً محضاً، ويكون الدائر بين النفع والضرر قابلاً للإبطال لمصلحته مع مراعاة الإجازة المقررة قانوناً. وللإذن بإدارة المال حدود مستقلة.</p>'],
    ]);
  }
  if (slug === "defects-of-will-syrian-law") {
    const revised = lang === "en" ? html.replace(/rescind a contract/g, "annul a contract").replace(/rescission of the contract/g, "annulment of the contract").replace(/Rescission of the contract/g, "Annulment of the contract").replace(/rescind the contract/g, "annul the contract") : html;
    return replaceParagraphs(revised, lang === "en" ? [
      [/Not every mistake is sufficient to annul a contract/, `<p>Under <a href="${SYRIAN_CIVIL}">Articles 121–125 of the published Syrian Civil Code</a>, the mistake must be material and the other party must share it, know of it, or be readily able to recognise it. Good faith also limits reliance on mistake.</p>`],
      [/The fear caused by duress must be serious enough to affect a reasonable person/, '<p>Article 128 assesses the seriousness of fear in light of the affected person’s age, social and health circumstances and other relevant circumstances. Under Article 129, duress by a third person also requires examination of the other contracting party’s knowledge.</p>'],
      [/Exploitation is where one contracting party takes advantage/, '<p>Article 130 concerns a gross imbalance connected to exploitation of manifest recklessness or overpowering passion. Financial need, inexperience or an unfavourable price alone does not establish every statutory element.</p>'],
      [/In this case, depending on the circumstances of the action, the judge may annul/, '<p>If Article 130’s conditions are proved, the affected party may seek annulment or reduction of their obligations. The published provision requires the action within one year of the contract; identify the precise ground and applicable period rather than assuming all consent defects share one deadline.</p>'],
    ] : [
      [/ولا يكفي أي غلط لإبطال العقد/, `<p>وفق <a href="${SYRIAN_CIVIL}">المواد 121–125 من القانون المدني السوري المنشور</a>، يلزم غلط جوهري وقع فيه الطرف الآخر أيضاً، أو علم به، أو كان من السهل عليه تبينه. ويقيد حسن النية التمسك بالغلط كذلك.</p>`],
      [/ويشترط أن يكون الخوف الذي أحدثه الإكراه جدياً/, '<p>تراعي المادة 128 في تقدير جسامة الإكراه سن المتأثر به وحالته الاجتماعية والصحية وسائر الظروف المؤثرة. وإذا صدر الإكراه من الغير، وجب فحص علم المتعاقد الآخر وفق المادة 129.</p>'],
      [/الاستغلال هو استثمار أحد المتعاقدين لحالة ضعف/, '<p>تتناول المادة 130 اختلالاً فاحشاً مرتبطاً باستغلال طيش بيّن أو هوى جامح. ولا تثبت الحاجة المالية أو قلة الخبرة أو السعر غير الملائم وحدها جميع عناصر الحالة القانونية.</p>'],
      [/وفي هذه الحالة يملك القاضي، بحسب ظروف الدعوى/, '<p>إذا ثبتت شروط المادة 130، جاز طلب إبطال العقد أو إنقاص التزامات المغبون. ويشترط النص المنشور رفع الدعوى خلال سنة من العقد؛ فحدّد سبب الطعن وميعاده ولا تفترض أن عيوب الإرادة كلها تخضع لمدة واحدة.</p>'],
    ]);
  }
  if (slug === "Penalty-clause-in-saudi") {
    return replaceParagraphs(html, lang === "en" ? [
      [/The amount must be fixed or ascertainable; otherwise/, '<p>Identify the agreed amount or the method for determining it. Uncertain wording requires interpretation in context before assessing the clause’s effect; Articles 178–179 still govern eligibility and adjustment.</p>'],
      [/Commercial courts have confirmed that a penalty clause is a valid obligation/, `<p><a href="${CIVIL_TRANSACTIONS}">Civil Transactions Law Articles 178–179</a> govern agreed compensation. Article 178 excludes an obligation whose subject is a monetary sum. A delivery-delay clause must therefore be distinguished from a charge for paying a debt late. Relevant matters include:</p>`],
      [/Commercial courts tend to apply penalty clauses subject/, '<p>The statutory assessment distinguishes the obligation and breach from requests to disapply, reduce or increase the agreed amount:</p>'],
      [/Reducing the penalty amount if it exceeds the actual harm/, '<p>On the debtor’s request, the court may reduce compensation where the debtor proves that it is excessive or that the principal obligation was partly performed.</p>'],
      [/Requiring the defaulting party to pay the full amount if the harm was foreseeable/, '<p>Foreseeability alone does not require payment of the full agreed amount; Article 179’s controls continue to apply.</p>'],
      [/Declining to apply the penalty clause if the breach resulted from force majeure/, '<p>Examine any external cause and contractual risk allocation. Hardship does not automatically have the same effect as impossibility, or cancel an agreed amount.</p>'],
      [/Requiring the party acting in good faith to pay fair compensation/, '<p>Agreed compensation is not due if the debtor proves that the creditor suffered no harm.</p>'],
      [/State that the amount may only be reduced by a judicial ruling/, '<p>Preserve Article 179’s mandatory controls; a clause cannot exclude them. Distinguish judicial adjustment from a later lawful settlement between the parties.</p>'],
      [/Increase it if the harm exceeds the agreed amount/, '<p>On the creditor’s request, increase it to the proven harm where the excess resulted from the debtor’s fraud or gross fault.</p>'],
      [/Cancel it if the breach is not established or the clause is unclear/, '<p>Examine whether the obligation and breach are established, and disapply agreed compensation where the debtor proves no harm. Ambiguous drafting requires interpretation; it is not automatically resolved by one label.</p>'],
      [/This authority is intended to achieve justice and prevent abuse/, `<p>Article 179 invalidates an agreement contrary to its rules. Check the <a href="${CIVIL_TRANSACTIONS}">statutory text</a> against the particular obligation and evidence.</p>`],
    ] : [
      [/يجب أن يكون المبلغ محددًا أو قابلًا للتحديد، وإلا/, '<p>يُحدد المبلغ المتفق عليه أو طريقة تحديده. ويتطلب غموض العبارة تفسيرها في سياقها قبل تقييم أثر الشرط، مع بقاء أحكام المادتين 178 و179 بشأن الاستحقاق والتعديل.</p>'],
      [/وقد أكدت المحاكم التجارية أن الشرط الجزائي التزام صحيح/, `<p>تنظم <a href="${CIVIL_TRANSACTIONS}">المادتان 178 و179 من نظام المعاملات المدنية</a> التعويض الاتفاقي. وتستثني المادة 178 الالتزام الذي محله مبلغ نقدي، فيجب التمييز بين شرط تأخر التسليم وفرض مبلغ لتأخر سداد دين. ومن المسائل ذات الصلة:</p>`],
      [/تتجه المحاكم التجارية إلى تطبيق الشرط الجزائي وفق ضوابط/, '<p>يميّز الفحص النظامي بين الالتزام والإخلال وبين طلب عدم استحقاق التعويض أو إنقاصه أو زيادته:</p>'],
      [/تخفيض الشرط الجزائي إذا كان المبلغ أكبر من الضرر الحقيقي/, '<p>للمحكمة بطلب المدين إنقاص التعويض إذا أثبت المبالغة فيه أو تنفيذ جزء من الالتزام الأصلي.</p>'],
      [/إلزام الطرف المخلّ بالشرط كاملًا إذا كان الضرر متوقعًا/, '<p>لا يكفي توقع الضرر وحده لاستحقاق المبلغ الاتفاقي كاملاً؛ تبقى ضوابط المادة 179 واجبة التطبيق.</p>'],
      [/عدم تطبيق الشرط الجزائي إذا كان الإخلال ناتجًا عن قوة قاهرة/, '<p>يُفحص السبب الأجنبي وتوزيع التبعة في العقد. ولا يترتب على الإرهاق تلقائياً أثر الاستحالة نفسه أو سقوط المبلغ المتفق عليه.</p>'],
      [/إلزام الطرف حسن النية بتعويض عادل/, '<p>لا يستحق التعويض الاتفاقي إذا أثبت المدين عدم وقوع ضرر للدائن.</p>'],
      [/النص على عدم جواز تخفيض الشرط إلا بحكم قضائي/, '<p>مراعاة ضوابط المادة 179 الآمرة وعدم استبعادها، مع التمييز بين تعديل المحكمة وصلح لاحق مشروع بين الطرفين.</p>'],
      [/زيادته إذا كان الضرر أكبر من المبلغ المتفق عليه/, '<p>زيادته بطلب الدائن إلى مقدار الضرر المثبت إذا كانت الزيادة ناشئة عن غش المدين أو خطئه الجسيم.</p>'],
      [/إلغائه إذا لم يثبت الإخلال أو كان الشرط غير واضح/, '<p>فحص ثبوت الالتزام والإخلال وعدم استحقاق التعويض إذا أثبت المدين انتفاء الضرر. أما غموض الصياغة فيتطلب تفسيراً ولا يُحسم بوصف واحد آلي.</p>'],
      [/وهذه السلطة تهدف إلى تحقيق العدالة ومنع التعسف/, `<p>تُبطل المادة 179 الاتفاق المخالف لأحكامها. راجع <a href="${CIVIL_TRANSACTIONS}">النص النظامي</a> على ضوء الالتزام المحدد وأدلته.</p>`],
    ]);
  }
  if (slug === "alrda-fy-alqanwn-alswry") {
    return replaceParagraphs(html, lang === "en" ? [
      [/I suggest that we continue the series without repeating/, ""],
      [/In the next article in this series, we will address Capacity/, '<p>Continue with <a href="/blog/en/alahlyh-fy-altaaqd-fy-alqanwn-alswry">contractual capacity under Syrian law</a> to distinguish a person’s consent from their ability and authority to undertake the transaction.</p>'],
    ] : [
      [/أقترح أن نستمر في السلسلة دون تكرار/, ""],
      [/وفي المقال القادم من هذه السلسلة، سنتناول الأهلية/, '<p>تابع موضوع <a href="/blog/ar/alahlyh-fy-altaaqd-fy-alqanwn-alswry">الأهلية في التعاقد في القانون السوري</a> للتمييز بين رضا الشخص وقدرته وصفته في إبرام التصرف.</p>'],
    ]);
  }
  if (slug === "mhl-alaqd-fy-alqanwn-alswry") {
    return replaceParagraphs(html, lang === "en" ? [
      [/Notice: This article provides general legal information/, '<p>Notice: This article provides general legal information. A current matter requires examination of the contract, facts, documents and applicable legislation.</p>'],
    ] : [
      [/تنبيه: يقدم هذا المقال معلومات قانونية عامة/, '<p>تنبيه: يقدم هذا المقال معلومات قانونية عامة. تتطلب الحالة القائمة فحص العقد والوقائع والمستندات والتشريعات المنطبقة.</p>'],
    ]);
  }
  if (slug === "anha-aqd-alaml-bdwn-sbb-mshrwa") {
    return replaceParagraphs(html, lang === "en" ? [
      [/In certain cases and subject to the relevant statutory controls, a worker may be able to transfer/, '<p>Service transfer is a separate eligibility question. A finding of unfair dismissal does not itself establish every transfer condition. Check the worker’s status, contract, receiving employer and the <a href="https://my.gov.sa/en/services/2792867">official mobility-service requirements</a> before relying on a transfer without employer consent.</p>'],
      [/1\) File a complaint through the Qiwa platform/, '<p><strong>1) Preserve the employment and termination records:</strong></p>'],
      [/To document the incident officially and require the employer/, '<p>Download the contract and retain the termination notice, wage records and relevant correspondence. A Qiwa contract record does not itself replace filing a labour claim.</p>'],
      [/This is a mandatory stage before filing a claim/, `<p>For disputes covered by this route, submit the claim through the Ministry’s <a href="${LABOUR_SETTLEMENT}">amicable-settlement service</a>. If settlement fails, follow the documented labour-court referral procedure.</p>`],
      [/6\) Is filing a complaint through Qiwa sufficient/, `<p><strong>6) Is a Qiwa request sufficient?</strong> Contract services and dispute filing serve different purposes. Use the Ministry’s <a href="${LABOUR_SETTLEMENT}">amicable-settlement route</a> where applicable and retain the submission or referral record.</p>`],
      [/Pay financial entitlements immediately/, `<p>Settle final entitlements within the applicable deadline in <a href="${LABOUR_SOURCE}">Labour Law Article 88</a>: generally within one week after the relationship ends, or two weeks if the worker ended it.</p>`],
      [/Terminating the contract while the worker is on statutory or sick leave/, '<p>Termination connected to protected leave requires examination of the specific statutory protection, reason and timing; being on leave is not by itself a complete legal test.</p>'],
    ] : [
      [/قد يتمكن العامل، في بعض الحالات/, '<p>نقل الخدمات مسألة أهلية مستقلة؛ ولا يثبت الفصل غير المشروع وحده جميع شروط النقل. تحقّق من وضع العامل وعقده وصاحب العمل الجديد و<a href="https://my.gov.sa/en/services/2792867">متطلبات خدمة التنقل الرسمية</a> قبل الاعتماد على النقل دون موافقة صاحب العمل.</p>'],
      [/1\) تقديم شكوى عبر منصة قوى/, '<p><strong>1) حفظ مستندات العمل والإنهاء:</strong></p>'],
      [/لتوثيق الواقعة رسميًا ومطالبة صاحب العمل/, '<p>احفظ نسخة العقد وإشعار الإنهاء وكشوف الأجر والمراسلات. لا يحل سجل العقد في قوى بذاته محل تقديم المطالبة العمالية.</p>'],
      [/وهي مرحلة إلزامية قبل رفع الدعوى/, `<p>للمنازعات التي يشملها هذا المسار، تُقدّم المطالبة عبر <a href="${LABOUR_SETTLEMENT}">خدمة التسوية الودية لدى الوزارة</a>. وعند تعذر الصلح تُتبع إجراءات الإحالة الموثقة إلى المحكمة العمالية.</p>`],
      [/6\) هل تكفي الشكوى عبر منصة قوى/, `<p><strong>6) هل يكفي طلب عبر قوى؟</strong> تختلف خدمات العقد عن تقديم النزاع. استعمل <a href="${LABOUR_SETTLEMENT}">مسار التسوية الودية لدى الوزارة</a> عند انطباقه، واحفظ ما يثبت تقديم المطالبة أو إحالتها.</p>`],
      [/صرف المستحقات المالية فورًا/, `<p>تصفية المستحقات وفق أجل <a href="${LABOUR_SOURCE}">المادة 88 من نظام العمل</a>: خلال أسبوع من انتهاء العلاقة في الأصل، أو أسبوعين إذا أنهى العامل العقد.</p>`],
      [/إنهاء العقد أثناء تمتع العامل بإجازة نظامية أو مرضية/, '<p>يتطلب الإنهاء المرتبط بإجازة محمية فحص الحماية النظامية المحددة وسبب الإنهاء وتوقيته؛ فالوجود في إجازة لا يكفي وحده لتكييف كل حالة.</p>'],
    ]);
  }
  if (slug === "altakhr-fy-alrwatb-aw-alamtnaa-an-dfaha") {
    return replaceParagraphs(html, lang === "en" ? [
      [/A wage becomes due to the worker/, '<p>Compare each contractual and statutory wage due date with the amount actually received. Record every unpaid or underpaid period; do not assume that a worker must wait for repeated or prolonged non-payment before documenting and pursuing a due wage.</p>'],
      [/1\) Filing a formal complaint through the Qiwa platform/, '<p><strong>1) Assemble the wage claim:</strong></p>'],
      [/In cases falling within its jurisdiction and procedures, the Qiwa platform/, '<p>Retain the contract, payslips, bank statements and a month-by-month balance. Qiwa may supply contract records; those records do not replace the appropriate dispute application.</p>'],
      [/If the issue is not resolved through the appropriate electronic route/, `<p>The Ministry’s <a href="${LABOUR_SETTLEMENT}">amicable-settlement service</a> is the initial dispute stage for claims covered by that route. Follow its submission and referral instructions and retain the case number.</p>`],
      [/Important rule: Proving delayed wages/, '<p>A useful evidence file reconciles the agreed wage, each due date, transfers received and the balance claimed. Disputed deductions, cash payments or variable pay may require further proof.</p>'],
      [/Wage cases are among the easier cases to prove/, '<p>Evidence should establish both the amount due and payments actually received. Useful records include:</p>'],
      [/Follow up on the complaint electronically to ensure/, '<p>Track filing and response deadlines. Checking a case online does not itself preserve a time limit; complete the required procedural step and retain proof.</p>'],
      [/^\s*it is swift,?\s*$/i, '<p>its duration depends on the procedural stage and the parties’ responses,</p>'],
      [/^\s*and it enables both parties to reach a solution without resorting to the courts/, '<p>and it provides an opportunity for agreement, with court referral if settlement is not achieved.</p>'],
    ] : [
      [/يصبح الأجر مستحقًا للعامل/, '<p>قارن موعد استحقاق كل أجر بموجب العقد والنظام بالمبلغ المستلم فعلاً. دوّن كل فترة غير مدفوعة أو ناقصة، ولا تفترض وجوب انتظار تأخر متكرر أو طويل قبل توثيق الأجر المستحق والمطالبة به.</p>'],
      [/1\) تقديم شكوى رسمية عبر منصة قوى/, '<p><strong>1) إعداد المطالبة بالأجر:</strong></p>'],
      [/تتيح منصة قوى للعامل/, '<p>احفظ العقد وكشوف الرواتب والحساب البنكي وجدول الرصيد لكل شهر. قد توفر قوى سجل العقد، لكنه لا يحل محل تقديم طلب النزاع عبر مساره المناسب.</p>'],
      [/إذا لم تُحل المشكلة عبر المسار الإلكتروني المناسب/, `<p>تمثل <a href="${LABOUR_SETTLEMENT}">خدمة التسوية الودية لدى الوزارة</a> المرحلة الأولى للمطالبات التي يشملها هذا المسار. اتبع تعليمات التقديم والإحالة واحتفظ برقم القضية.</p>`],
      [/قاعدة مهمة: لا يتطلب إثبات التأخر في الرواتب/, '<p>يربط ملف الإثبات المفيد الأجر المتفق عليه بكل استحقاق وتحويل والرصيد المطالب به. وقد تحتاج الحسميات المتنازع عليها أو الدفع النقدي أو الأجر المتغير إلى أدلة إضافية.</p>'],
      [/تُعدّ قضايا الرواتب من أسهل القضايا/, '<p>ينبغي أن تثبت الأدلة المبلغ المستحق والمدفوع فعلاً. ومن المستندات المفيدة:</p>'],
      [/متابعة الشكوى إلكترونيًا لضمان عدم سقوطها/, '<p>تابع مواعيد التقديم والرد؛ فمجرد الاطلاع الإلكتروني لا يحفظ الميعاد، بل يجب استكمال الإجراء المطلوب والاحتفاظ بدليله.</p>'],
      [/^\s*سريعة،?\s*$/, '<p>وتتوقف مدتها على المرحلة الإجرائية واستجابة الأطراف،</p>'],
      [/وتتيح للطرفين الوصول لحل دون اللجوء للقضاء/, '<p>وتتيح فرصة للاتفاق مع الإحالة القضائية عند تعذر الصلح.</p>'],
    ]);
  }
  if (slug === "mta-yqbl-altmas-aaadh-alnzr-atjahat-qdayyh-mhmh") {
    const revised = lang === "en" ? html
      .replace(/Three Judicial Rulings Explain When a Petition May Be Accepted/g, "Three Questions About New Evidence and Final Judgments")
      .replace(/three Saudi rulings identifying circumstances/g, "Saudi judicial examples examining circumstances")
      .replace(/three judicial examples that merit consideration/g, "three analytical points; the first and third examine different aspects of the same Supreme Court decision")
      : html.replace(/3 أحكام قضائية توضح متى يُقبل الطلب/g, "ثلاث مسائل حول الدليل الجديد والأحكام النهائية")
        .replace(/قراءة قانونية في ثلاثة أحكام سعودية تكشف الحالات/g, "قراءة قانونية في أمثلة قضائية سعودية تبحث الحالات")
        .replace(/ثلاث صور قضائية تستحق التوقف عندها/g, "ثلاث مسائل تحليلية؛ تتناول الأولى والثالثة جانبين من قرار المحكمة العليا نفسه");
    if (revised.includes('id="reconsideration-sources"')) return revised;
    return revised + (lang === "en"
      ? `<section id="reconsideration-sources"><h2>Statute and identified decision</h2><p><a href="${PROCEDURE_SOURCE}" target="_blank" rel="noopener noreferrer">Sharia Procedure Law, Articles 200–204</a> sets the statutory route. The specifically identified example is <a href="${RECONSIDERATION_DECISION}" target="_blank" rel="noopener noreferrer">Supreme Court decision 431405, concerning objection 421831124</a>. The other examples above are summaries without a full decision reference here; they should not be cited as independent precedents without obtaining their judgments.</p></section>`
      : `<section id="reconsideration-sources"><h2>النظام والقرار المحدد</h2><p>يحدد <a href="${PROCEDURE_SOURCE}" target="_blank" rel="noopener noreferrer">نظام المرافعات الشرعية، المواد 200–204</a> الطريق النظامي. والمثال المحدد هو <a href="${RECONSIDERATION_DECISION}" target="_blank" rel="noopener noreferrer">قرار المحكمة العليا 431405 المتعلق بالاعتراض 421831124</a>. أما الأمثلة الأخرى أعلاه فهي ملخصات دون مرجع حكم كامل هنا، ولا يُستند إليها كسوابق مستقلة دون الحصول على أحكامها.</p></section>`);
  }
  if (slug === "altwqya-ala-byad") {
    if (html.includes('id="historical-commentary-scope"')) return html;
    return (lang === "en"
      ? '<section id="historical-commentary-scope"><h2>Scope of this historical commentary</h2><p>The passage below is attributed to Al-Sanhuri and the cited edition of his treatise. It is a historical doctrinal quotation, including its reference to Penal Code Article 340. It does not establish the current rule in Saudi Arabia, Syria or the UAE.</p><p>For a current dispute, preserve the original document, versions, delivery circumstances and instructions about completion. Separate an authorised blank signature from a signature obtained without permission, and identify the governing jurisdiction before drawing conclusions about proof, liability or a criminal complaint.</p></section>'
      : '<section id="historical-commentary-scope"><h2>نطاق هذا التعليق الفقهي التاريخي</h2><p>النص الآتي منسوب إلى السنهوري والطبعة المذكورة من مؤلفه. وهو اقتباس فقهي تاريخي بما فيه الإحالة إلى المادة 340 من قانون العقوبات، ولا يثبت الحكم النافذ حالياً في السعودية أو سوريا أو الإمارات.</p><p>في نزاع قائم احفظ أصل المستند ونسخه وظروف تسليمه وتعليمات استكماله. افصل تسليم توقيع على بياض بإذن عن الحصول عليه دون إذن، وحدّد الاختصاص قبل استنتاج قواعد الإثبات أو المسؤولية أو الشكوى الجزائية.</p></section>') + html;
  }
  if (slug === "syghh-mdhkrh-tfahm-qablh-lltadyl") {
    return replaceParagraphs(html, lang === "en" ? [
      [/This memorandum constitutes a general framework for understanding/, '<p>This memorandum records proposed cooperation and does not commit either party to implement or fund a project. The parties intend the confidentiality, permitted use of information, notices, and survival provisions to be binding, subject to the applicable law. Any project, payment or other implementation obligation requires a separate signed agreement. Confirm this division expressly before using the template.</p>'],
      [/Note: This is a general template for initial drafting purposes/, '<p>Drafting note: complete the parties, authority, scope and duration; identify the governing law and an appropriate dispute forum; and confirm which clauses are binding. The 30-day notice period is an example contractual choice, not a stated legal requirement. Check confidentiality exceptions, information retention and continuing obligations against the intended transaction before signing.</p>'],
    ] : [
      [/تُعد هذه المذكرة إطارًا عامًا للتفاهم بين الطرفين/, '<p>تسجل المذكرة تعاوناً مقترحاً ولا تلزم أياً من الطرفين بتنفيذ مشروع أو تمويله. يقصد الطرفان إلزامية أحكام السرية والاستعمال المسموح للمعلومات والإخطارات واستمرار الالتزامات، وفق القانون المنطبق. أما المشروع أو الدفع أو الالتزام التنفيذي الآخر فيتطلب اتفاقاً مستقلاً موقعاً. أكّد هذا التقسيم صراحة قبل استعمال النموذج.</p>'],
      [/تنبيه: هذا نموذج عام لأغراض الصياغة الأولية/, '<p>ملاحظة صياغية: استكمل الأطراف والصلاحية والنطاق والمدة، وحدّد القانون الحاكم وجهة مناسبة لحل النزاع، وأكّد البنود الملزمة. مدة الإخطار البالغة 30 يوماً مثال لاختيار تعاقدي وليست متطلباً قانونياً مقرراً هنا. راجع استثناءات السرية والاحتفاظ بالمعلومات والالتزامات المستمرة وفق المعاملة المقصودة قبل التوقيع.</p>'],
    ]);
  }
  if (slug !== "alsnd-lamr-kadah-dman-mta-ythwl-ala-khtr-tnfydhy") return html;
  const source = `<a href="${ENFORCEMENT_SOURCE}" target="_blank" rel="noopener noreferrer">${lang === "ar" ? "أم القرى: نظام التنفيذ، المادتان 7 و65" : "Umm Al-Qura: Enforcement Law, Articles 7 and 65"}</a>`;
  return replaceParagraphs(html, lang === "en" ? [
    [/The modern Saudi Enforcement Law/, `<p>The new Enforcement Law published on 1 May 2026 includes electronically registered bills and promissory notes in Article 7. Article 65 delays commencement until 180 days after publication; publication alone does not make that requirement operative. ${source}.</p>`],
    [/With recent developments in the Enforcement Law/, "<p>Before relying on an electronic-registration requirement, verify the law in force for the filing date, the implementing rules and any transitional provisions applicable to the instrument.</p>"],
    [/Official sources: The Saudi Enforcement Law/, `<p>Source for the new law and its commencement provision: ${source}. The Commercial Papers Law and the rules applicable to the particular instrument must also be checked.</p>`],
  ] : [
    [/كما أن نظام التنفيذ السعودي الحديث/, `<p>يتضمن نظام التنفيذ الجديد المنشور في 1 مايو 2026 الأوراق التجارية المسجلة إلكترونياً في المادة 7. وتؤخر المادة 65 العمل به إلى ما بعد مضي 180 يوماً من النشر؛ فلا يجعل النشر وحده المتطلب نافذاً. ${source}.</p>`],
    [/ومع التطورات الحديثة في نظام التنفيذ/, "<p>قبل الاستناد إلى متطلب التسجيل الإلكتروني، تحقّق من النظام النافذ بتاريخ الطلب ولائحته وأي أحكام انتقالية تنطبق على السند.</p>"],
    [/المصادر الرسمية: نظام التنفيذ السعودي/, `<p>مصدر النظام الجديد وحكم بدء العمل به: ${source}. ويلزم كذلك فحص نظام الأوراق التجارية والقواعد المنطبقة على السند المحدد.</p>`],
  ]);
}
