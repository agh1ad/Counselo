type WorkNarrativeField = `${"title" | "seoTitle" | "summary" | "challenge" | "approach" | "outcome" | "seoDescription"}${"En" | "Ar"}`;
type ReviewedField = readonly [revision: string, replacements: readonly (readonly [string, string])[]];

/** A compact revision guard, not a document-authentication or security hash. */
function textRevision(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index++) {
    hash = Math.imul(hash ^ value.charCodeAt(index), 16777619) >>> 0;
  }
  return `${value.length}:${hash.toString(16).padStart(8, "0")}`;
}

/**
 * Exact narrative revisions reviewed from the 60 public records on 2026-11-18.
 * The named representatives in these Saudi matters belong to CounselO's team.
 * Preserve each person's documented role; the Bahrain coordination record is excluded.
 * Later CMS writing, documents, quotations and testimonials are outside this correction.
 */
const REVIEWED_WORK_COPY: Readonly<Record<string, Partial<Record<WorkNarrativeField, ReviewedField>>>> = {
  "drash-kawnslw-lhalh-lltan-balnqd": {
    approachEn: ["930:d8cca946", [["the legal representative of the party seeking cassation", "our team’s legal representative for the party seeking cassation"]]],
    approachAr: ["586:1cba8b7b", [["الممثل القانوني للطرف طالب النقض", "الممثل القانوني للطرف طالب النقض ضمن فريقنا"]]],
    outcomeEn: ["826:13e02b11", [["the legal representative", "the legal representative within our team"]]],
    outcomeAr: ["527:18c30f7c", [["الممثل القانوني", "الممثل القانوني ضمن فريقنا"]]],
  },
  "kyf-ashmt-kawnslw-fy-ithbat-btlan-aqd-tmwyl-rqmy-ithr-ahtyal-ilktrwny": {
    summaryEn: ["955:7f345459", [["the authorised representative", "the authorised representative within our team"]]],
    approachEn: ["1022:8327d336", [["the authorised representative", "the authorised representative within our team"]]],
    outcomeEn: ["869:ba4c37ca", [["the authorised representative", "the authorised representative within our team"]]],
    summaryAr: ["605:5e15184c", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
    approachAr: ["649:7cfd9296", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
    outcomeAr: ["563:171676e0", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
  },
  "msthqat-mqawl-tayyd-alhkm-fy-alastynaf": {
    approachEn: ["593:5b18f07b", [["the legal representative", "the legal representative within our team"]]],
    outcomeEn: ["404:5e081457", [["the legal representative", "the legal representative within our team"]]],
    approachAr: ["376:0647ee33", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
    outcomeAr: ["284:e4facc76", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
  },
  "hq-khas-rfd-mtalbh-malyh-dkhmh-wtayyd-alhkm-astynafya": {
    titleEn: ["42:9b3d54bb", [["Private Right: SAR 750,000 Claim Dismissed", "Private Claim Dismissed and Judgment Affirmed on Appeal"]]],
    seoTitleEn: ["41:f27e902d", [["SAR 750,000 Private Right Claim Dismissed", "Private Claim Dismissed and Judgment Affirmed on Appeal"]]],
    seoDescriptionEn: ["132:62102935", [["a SAR 750,000 claim", "a claim for approximately SAR 750,000"]]],
    approachEn: ["403:02578eaf", [["the legal representative", "the legal representative within our team"]]],
    approachAr: ["270:fc161ee9", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
  },
  "kyf-saadt-kawnslw-fy-ksb-mtalbh-taaqdyh-bqymh-754177-ryal": {
    approachEn: ["1199:72b7c31c", [["the claimant’s legal representative", "the claimant’s legal representative within our team"]]],
    approachAr: ["828:1e43ec95", [["الممثل النظامي للمدعي", "الممثل النظامي للمدعي ضمن فريقنا"]]],
  },
  "mn-hw-alahq-balhdanh": {
    summaryEn: ["680:d45f0d6a", [["the legal representative", "the legal representative within our team"]]],
    approachEn: ["800:d585a858", [["the legal representative", "the legal representative within our team"]]],
    outcomeEn: ["941:4a433345", [["the legal representative", "the legal representative within our team"]]],
    summaryAr: ["505:5a9bdedb", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
    approachAr: ["602:8fc39948", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
    outcomeAr: ["676:619eee69", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
  },
  "mn-altathr-ila-alhkm-astrdad-16-mlywn-ryal-rghm-ghyab-almdaa-alyh": {
    summaryEn: ["572:8878d339", [["the legal representative", "the legal representative within our team"]]],
    approachEn: ["986:8b10516f", [["the legal representative", "the legal representative within our team"]]],
    outcomeEn: ["1164:ad07fbe2", [["the legal representative", "the legal representative within our team"]]],
    summaryAr: ["459:f800b02c", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
    approachAr: ["751:c8c3bf79", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
    outcomeAr: ["898:3b0044fb", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
  },
  "kyf-saadt-kawnslw-fy-astrdad-300000-ryal-abr-slh-qdayy-fy-nzaa-tjary": {
    approachEn: ["1190:457ce2c9", [["the claimant’s authorised representative", "the claimant’s authorised representative within our team"]]],
    approachAr: ["797:629079e6", [["الممثل النظامي للمدعي", "الممثل النظامي للمدعي ضمن فريقنا"]]],
  },
  "kawnslw-w-tkhfyd-mtalbh-amwlh-tjaryh-mn-348-mlywn-ryal-ila-584-alf-ryal": {
    approachEn: ["805:d8fc7815", [["the legal representative", "the legal representative within our team"]]],
    approachAr: ["561:ad2926bc", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
  },
  "kyf-sahmt-kawnslw-fy-tkhfyd-mtalbh-mn-500-alf-ryal-ila-227": {
    summaryEn: ["544:a379327a", [["the defendant’s legal representative", "the defendant’s legal representative within our team"]]],
    approachEn: ["1112:e5c7cca8", [["the defendant’s legal representative", "the defendant’s legal representative within our team"], ["cooperation with the legal representative →", "coordination with the legal representative within our team →"]]],
    summaryAr: ["427:711aeba8", [["الممثل النظامي للمدعى عليها", "الممثل النظامي للمدعى عليها ضمن فريقنا"]]],
    approachAr: ["860:7fc1a241", [["الممثل النظامي للمدعى عليها", "الممثل النظامي للمدعى عليها ضمن فريقنا"], ["التعاون مع الممثل النظامي →", "التنسيق مع الممثل النظامي ضمن فريقنا →"]]],
    challengeEn: ["859:2a73be3d", [["the legal representative", "the legal representative within our team"]]],
    outcomeEn: ["891:97bcc7aa", [["the legal representative", "the legal representative within our team"]]],
    challengeAr: ["651:7aff0ce4", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
    outcomeAr: ["730:3b8d1796", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
  },
  "kyf-qadt-astratyjyh-kawnslw-ila-rfd-dawa-fskh-aqd-bya-wtawydat-bmlayyn-alryalat": {
    approachEn: ["1334:29b16f06", [["the defendant’s legal representative", "the defendant’s legal representative within our team"]]],
    approachAr: ["857:41dc77ec", [["الممثل النظامي للمدعى عليه", "الممثل النظامي للمدعى عليه ضمن فريقنا"]]],
  },
  "astratyjyh-kawnslw-lastrdad-sndat-lamr-bqymh-17-mlywn-ryal": {
    approachEn: ["2788:a1277482", [["the authorised representative", "the authorised representative within our team"]]],
    approachAr: ["2090:57bc7f6e", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
  },
  "rfd-dawa-fskh-aqd-amtyaz-tjary-wtawyd": {
    approachEn: ["1313:3a660d26", [["the client’s authorized legal representative", "the client’s authorized legal representative within our team"]]],
    outcomeEn: ["767:41af289f", [["the client’s authorized legal representative", "the client’s authorized legal representative within our team"]]],
    approachAr: ["874:2b53bc4e", [["الممثل النظامي للعميلة", "الممثل النظامي للعميلة ضمن فريقنا"], ["دعم الممثل النظامي في", "دعم الممثل النظامي ضمن فريقنا في"]]],
    outcomeAr: ["526:e667039d", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
  },
  "algha-mkhalfat-aldfaa-almdny-bhkm-qdayy": {
    approachEn: ["1207:93f19887", [["the claimant’s legal representative", "the claimant’s legal representative within our team"]]],
    approachAr: ["812:d3f2472e", [["الممثل النظامي للمدعية", "الممثل النظامي للمدعية ضمن فريقنا"]]],
  },
  "thwyl-qdyh-mn-rfd-ala-qbwl-wtayyd": {
    approachEn: ["1385:96f4c1a9", [["the claimant’s authorized representative", "the claimant’s authorized representative within our team"]]],
    approachAr: ["882:b36ecc3f", [["الممثل النظامي للمدعي", "الممثل النظامي للمدعي ضمن فريقنا"]]],
  },
  "mn-alkhta-ala-altawyd-kyf-hddt-kawnslw-almswwl-almbashran-hadth": {
    approachEn: ["1187:8fd773d2", [["the claimant's legal representative", "the claimant's legal representative within our team"]]],
    approachAr: ["879:10259d6a", [["الممثل النظامي للمدعي", "الممثل النظامي للمدعي ضمن فريقنا"]]],
  },
  "tfkyk-mstndat-altmas-aaadh-alnzr-bnjah": {
    approachEn: ["720:da261a7d", [["the legal representative", "the legal representative within our team"]]],
    approachAr: ["494:fe94cad3", [["الممثل النظامي", "الممثل النظامي ضمن فريقنا"]]],
  },
  "alaatrad-ala-almkhalfat-albyyyh": {
    approachEn: ["1140:7f8c64cc", [["the claimant’s representative", "the claimant’s representative within our team"]]],
    outcomeEn: ["1031:421f81c5", [["the claimant’s representative", "the claimant’s representative within our team"]]],
    approachAr: ["787:827b956d", [["ممثل المدعية", "ممثل المدعية ضمن فريقنا"]]],
    outcomeAr: ["766:378f12f1", [["ممثل المدعية", "ممثل المدعية ضمن فريقنا"]]],
  },
  "kyf-athbtt-kawnslw-alshrakh": {
    approachEn: ["747:eb11da86", [["the plaintiffs’ counsel", "the plaintiffs’ counsel within our team"]]],
    approachAr: ["629:ed241111", [["للممثل القانوني للمدعين", "للممثل القانوني للمدعين ضمن فريقنا"]]],
    outcomeAr: ["652:089eadf5", [["الممثل القانوني", "الممثل القانوني ضمن فريقنا"]]],
  },
  "kyf-sahmt-kawnslw-fy-anjah-mlf-thkymy-kaml": {
    outcomeEn: ["363:2a597a8b", [["the claimant’s representative", "the claimant’s representative within our team"], ["No total award amount or subsequent enforcement outcome is stated in this account.", ""]]],
    outcomeAr: ["270:d4fb3310", [["ممثل المحتكم", "ممثل المحتكم ضمن فريقنا"], ["ولا يحدد الملخص إجمالي المبلغ المحكوم به أو نتيجة التنفيذ اللاحق.", ""]]],
  },
  "mn-drash-almstndat-ila-alhkm-bjmya-altlbat": {
    approachEn: ["752:21cdb897", [["the instructing counsel", "the instructing counsel within our team"]]],
    outcomeEn: ["224:d2788112", [["the claimant's counsel's performance at trial", "the trial advocacy of the claimant’s counsel within our team"]]],
    approachAr: ["577:507a8b20", [["الممثل القانوني", "الممثل القانوني ضمن فريقنا"]]],
    outcomeAr: ["211:a3bea3ae", [["الممثل القانوني", "الممثل القانوني ضمن فريقنا"]]],
  },
  "fskh-aqd-iyjar-tjary-bsbb-khta-byanat-mnsh-iyjar": {
    summaryEn: ["571:3f2bc494", [["the claimant’s representative", "the claimant’s representative within our team"]]],
    approachEn: ["531:857d1e09", [["the plaintiff's representative", "the plaintiff’s representative within our team"]]],
    approachAr: ["497:c34015a1", [["ممثل المدعية", "ممثل المدعية ضمن فريقنا"]]],
    outcomeEn: ["225:c08fe78c", [["This was a settlement outcome, not a judgment determining all financial claims.", ""]]],
    outcomeAr: ["165:79a26253", [["تمثل النتيجة صلحاً، لا حكماً فاصلاً في جميع المطالبات المالية.", ""]]],
  },
  // Reconciled with the published case study, pp. 4–5 (source SHA256 afdfd16b…2ebef7).
  "alajrh-mqabl-almnfah-fy-aliyjar-altjary": {
    summaryEn: ["403:089b6d0d", [["CounselO Legal assessed an appeal concerning commercial rent where inaccurate property data allegedly prevented the agreed use and subletting of units. The analysis linked the contract, Ejar correspondence and use records to the extent of the landlord’s performance. It concerned an asserted impediment to the agreed benefit, rather than a tenant simply choosing not to use premises that were available.", "CounselO’s team developed the appeal in a commercial lease dispute involving inaccurate property details that prevented the agreed use and subletting of units. The appellate court rejected the landlord’s rent claim as presented and tied rent entitlement to the actual use established in the case."]]],
    summaryAr: ["335:9dc14268", [["درست كاونسلو للاستشارات القانونية استئنافاً يتعلق بأجرة عقار تجاري قيل إن بياناته غير الدقيقة حالت دون الانتفاع المتفق عليه وتأجير وحداته من الباطن. ربط التحليل العقد ومراسلات إيجار وسجل الانتفاع بمدى تنفيذ المؤجر لالتزامه. تتعلق الدراسة بعائق مزعوم يحول دون المنفعة المتفق عليها، لا بمجرد اختيار المستأجر عدم استخدام عقار مُمكَّن منه.", "أعد فريق كاونسلو استراتيجية الاستئناف في نزاع إيجار تجاري بسبب بيانات غير دقيقة للعقار حالت دون الانتفاع المتفق عليه وتأجير وحداته من الباطن. انتهى الاستئناف إلى رد مطالبة المؤجر بالأجرة على النحو الذي طلبه، وربط الاستحقاق بحدود المنفعة الفعلية التي ثبت تحققها."]]],
    outcomeEn: ["503:c998957d", [["CounselO Legal provided an in-depth legal analysis that reframed the dispute from an apparent monetary claim to a substantive question about the extent of actual enjoyment. By reconstructing the facts and linking them to the contract, Ejar correspondence, and the usage record, the study helped establish a stronger legal basis for valuing rent in light of the proven impediment, its cause and duration, and the agreed use. The account records an appeal assessment and does not state a final rent award.", "The appellate court rejected the landlord’s rent claim as presented and tied rent entitlement to the use of the premises actually established in the case. CounselO’s team rebuilt the factual sequence and connected the lease, Ejar correspondence and occupancy record to the impediment to the agreed use. This analysis supported the appeal and the court’s assessment of the rent due."]]],
    outcomeAr: ["391:e4db18a2", [["قدّمت كاونسلو للاستشارات القانونية تحليلًا قانونيًا معمقًا حوّل النزاع من مطالبة مالية ظاهرية إلى مسألة جوهرية تتعلق بمدى تحقق المنفعة الفعلية. ومن خلال إعادة بناء الوقائع وربطها بالعقد ومراسلات منصة إيجار وسجل الانتفاع، ساعدت الدراسة في إبراز أساس قانوني أقوى لتقدير الأجرة في ضوء العائق المثبت وسببه ومدته والمنفعة المتفق عليها. يورد الملخص دراسة للاستئناف، ولا يحدد حكماً نهائياً بالأجرة.", "انتهى الاستئناف إلى رد مطالبة المؤجر بالأجرة على النحو الذي طلبه، وربط استحقاق الأجرة بحدود المنفعة الفعلية التي ثبت تحققها. أعاد فريق كاونسلو بناء الوقائع وربط العقد بمراسلات منصة إيجار وسجل الانتفاع، فقدم أساسًا مترابطًا للاستئناف وتقدير الأجرة في ضوء العائق وسببه ومدته والمنفعة المتفق عليها."]]],
  },
  "drash-qdyh-aqaryh-maqdh-fy-swrya": {
    outcomeEn: ["219:4f5d8980", [["This was a procedural development; it does not state a final judgment awarding the heir money or restoring ownership.", "The result at this stage was progress toward the property valuation."]]],
    outcomeAr: ["142:12e19ddb", [["يمثل ذلك تطوراً إجرائياً، ولا يورد حكماً نهائياً بمبلغ للوريث أو بإعادة الملكية.", "تمثلت النتيجة في هذه المرحلة في تقدم الإجراءات نحو تقدير قيمة العقار."]]],
  },
  // These published studies expressly present approximate figures to preserve confidentiality.
  "nzaa-aqary-hyn-ykwn-dbt-ntaq-alaltzam-aqwa-mn-alinkar": {
    seoDescriptionEn: ["139:26161553", [["a 48,000 m² plot within a 195,000 m² parent property", "a plot of approximately 48,000 m² within a parent property of approximately 195,000 m²"]]],
  },
  "ilgha-mtalbh-malyh-dd-mdyr-shrkh": {
    seoDescriptionEn: ["138:6bf1836b", [["a SAR 225,000 personal claim", "a personal claim for approximately SAR 225,000"]]],
  },
};

/** Apply only the reviewed field revision, preserving later edits and unknown records. */
export function currentWorkTeamRecord<T extends { slug?: string | null }>(record: T): T {
  const rules = record.slug ? REVIEWED_WORK_COPY[record.slug] : undefined;
  if (!rules) return record;
  const source = record as Record<string, unknown>;
  let result: Record<string, unknown> | undefined;
  for (const [field, [revision, replacements]] of Object.entries(rules)) {
    const original = source[field];
    if (typeof original !== "string" || textRevision(original) !== revision) continue;
    let revised = original;
    for (const [before, after] of replacements) revised = revised.split(before).join(after);
    revised = revised.trim();
    if (revised !== original) {
      result ??= { ...source };
      result[field] = revised;
    }
  }
  return (result ?? record) as T;
}
