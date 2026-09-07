import type { Region } from "@workspace/api-zod/browser";
import { INTENT_EXPANSION_GUIDANCE } from "./intent-expansion-guidance.js";

type Source = { en: string; ar: string; href: string };
type Guidance = {
  region: Region;
  service: string;
  id: string;
  reviewedAt: string;
  en: { q: string; a: string };
  ar: { q: string; a: string };
  sources: Source[];
};

// Narrow answers to observed information needs. Sources support these answers,
// not an assertion that every proposition on the parent page is certified.
export const SOURCE_BACKED_SEARCH_GUIDANCE: Guidance[] = [
  ...INTENT_EXPANSION_GUIDANCE.filter(item => item.includeOnServicePage),
  {
    region: "sa", service: "employment-law", id: "unpaid-leave", reviewedAt: "2026-09-06",
    en: { q: "Can I take unpaid leave in Saudi Arabia?", a: "For employment governed by the Saudi Labor Law, Article 116 allows unpaid leave with the employer's agreement for an agreed duration. The contract is treated as suspended for the portion exceeding 20 days unless both parties agree otherwise. Record the approved dates, return date and any agreement about suspension in writing. Unpaid leave differs from annual or sick leave; check the applicable employment regime before applying this rule." },
    ar: { q: "هل يجوز الحصول على إجازة دون أجر في السعودية؟", a: "في علاقة العمل الخاضعة لنظام العمل السعودي، تجيز المادة 116 الإجازة دون أجر بموافقة صاحب العمل ولمدة يتفق عليها الطرفان. ويُعد العقد موقوفاً عن المدة التي تتجاوز عشرين يوماً، ما لم يتفق الطرفان على خلاف ذلك. وثّق تواريخ الإجازة المعتمدة والعودة وأي اتفاق بشأن وقف العقد كتابةً. تختلف هذه الإجازة عن الإجازة السنوية والمرضية؛ تحقّق أولاً من النظام الذي يحكم علاقة العمل." },
    sources: [{ en: "HRSD — working conditions, Article 116", ar: "وزارة الموارد البشرية — شروط العمل وظروفه، المادة 116", href: "https://www.hrsd.gov.sa/شروط-العمل-وظروفه" }],
  },
  {
    region: "sa", service: "contracts", id: "simulation", reviewedAt: "2026-09-06",
    en: { q: "What is the difference between absolute and relative simulation of a contract?", a: "Absolute simulation describes an apparent transaction that the parties did not intend to make at all. Relative simulation conceals a different real arrangement behind the apparent terms or parties. Under the Saudi Civil Transactions Law, the real contract governs between the contracting parties and their general successors when hidden by an apparent contract; good-faith creditors and particular successors have separate protections. Preserve both documents and payment records. Establish the applicable law before extending this Saudi explanation to another country." },
    ar: { q: "ما الفرق بين الصورية المطلقة والصورية النسبية في العقد؟", a: "في الصورية المطلقة يظهر تصرف لم يقصد الطرفان إنشاءه أصلاً؛ أما الصورية النسبية فيستر التصرف الظاهر ترتيباً حقيقياً مختلفاً في مضمونه أو أطرافه. وفق نظام المعاملات المدنية السعودي، يسري العقد الحقيقي بين المتعاقدين والخلف العام إذا ستره عقد ظاهر، مع حماية مستقلة للدائنين والخلف الخاص حسني النية. احتفظ بالمستند الظاهر والمستتر وسجلات الدفع، وحدد القانون المنطبق قبل نقل هذا الشرح السعودي إلى دولة أخرى." },
    sources: [
      { en: "Umm Al-Qura — Civil Transactions Law", ar: "أم القرى — نظام المعاملات المدنية", href: "https://www.uqn.gov.sa/details?p=23125" },
      { en: "Ministry of Justice legal journal — discussion of simulation", ar: "مجلة العدل — دراسة تتناول الصورية", href: "https://adlm.moj.gov.sa/attach/1478.pdf" },
    ],
  },
  {
    region: "sa", service: "contracts", id: "franchise-agency-distinction", reviewedAt: "2026-09-06",
    en: { q: "How does a Saudi commercial franchise differ from a commercial agency?", a: "A franchise typically combines brand use with a defined operating model, technical support and obligations concerning how the business is run. An agency or distribution agreement concerns the principal's goods or services and the agent's or distributor's role. The Ministry of Commerce provides separate registration services and requirements. Review the actual obligations, disclosure documents, territory, fees and termination provisions; the agreement's label alone does not establish which regime applies." },
    ar: { q: "ما الفرق بين الامتياز التجاري والوكالة التجارية في السعودية؟", a: "يرتبط الامتياز عادةً باستخدام العلامة ونموذج تشغيل محدد ودعم فني والتزامات بشأن طريقة إدارة النشاط، بينما تتناول الوكالة أو التوزيع سلع الموكل أو خدماته ودور الوكيل أو الموزع. توفر وزارة التجارة خدمات قيد ومتطلبات مستقلة لكل منهما. راجع الالتزامات الفعلية ووثائق الإفصاح والنطاق الجغرافي والمقابل وأحكام الإنهاء؛ فاسم الاتفاقية وحده لا يحدد النظام المنطبق." },
    sources: [
      { en: "Ministry of Commerce — franchise registration", ar: "وزارة التجارة — قيد الامتياز التجاري", href: "https://mc.gov.sa/ar/eservices/pages/servicedetails.aspx?sid=24" },
      { en: "Ministry of Commerce — commercial agency registration", ar: "وزارة التجارة — قيد وكالة تجارية", href: "https://mc.gov.sa/ar/eservices/Pages/ServiceDetails.aspx?sID=41" },
    ],
  },
  {
    region: "uae", service: "employment-labour", id: "passport-retention", reviewedAt: "2026-09-06",
    en: { q: "Can an employer keep my passport in the UAE, and what penalty applies?", a: "The federal private-sector labour framework prohibits employers from withholding workers' official documents. Preserve your request for the passport's return, the employer's response and any evidence of threats or restricted access. Ask MOHRE or the authority governing your employment about the appropriate complaint route. A court-ordered travel restriction is a different issue. Do not assume one automatic fine or criminal penalty: the facts, applicable regime and competent authority determine the consequences." },
    ar: { q: "هل يجوز لصاحب العمل الاحتفاظ بجواز سفري في الإمارات، وما العقوبة؟", a: "يحظر إطار العمل الاتحادي للقطاع الخاص احتجاز صاحب العمل الوثائق الرسمية للعامل. احتفظ بطلب إعادة الجواز ورد صاحب العمل وأي دليل على التهديد أو منع الوصول إليه، واستفسر لدى وزارة الموارد البشرية والتوطين أو الجهة المنظمة لعملك عن مسار الشكوى المناسب. يختلف ذلك عن منع السفر الصادر بأمر قضائي. لا تفترض غرامة أو عقوبة جزائية موحدة تلقائية؛ فالنتيجة تتوقف على الوقائع والنظام المنطبق والجهة المختصة." },
    sources: [{ en: "MOHRE — private-sector labour law and official documents", ar: "وزارة الموارد البشرية والتوطين — قانون العمل والوثائق الرسمية", href: "https://mohre.gov.ae/en/media-center/news/15/11/2021/uae-president-issues-federal-decree-law-on-regulation-of-labour-relations-in-private-sector" }],
  },
];

export function sourceBackedSearchGuidance(region: Region, service: string) {
  return SOURCE_BACKED_SEARCH_GUIDANCE.filter(item => item.region === region && item.service === service);
}

export function serviceGuidanceUpdatedAt(region: Region, service: string, fallback: string) {
  return sourceBackedSearchGuidance(region, service).reduce((latest, item) => item.reviewedAt > latest ? item.reviewedAt : latest, fallback);
}
