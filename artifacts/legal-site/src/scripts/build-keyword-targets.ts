import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { SEARCH_INTENT_EDITORIAL, editorialTarget } from "../lib/search-intent-editorial";

const root = resolve(import.meta.dirname, "../../../..");
const source = JSON.parse(readFileSync(resolve(root, "output/seo/keyword-coverage-2026-09-06.json"), "utf8"));
const normalize = (s: string) => s.normalize("NFKC").replace(/[\u064B-\u065F\u0670\u0640]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/\s+/g, " ").trim();
const exclusions: [RegExp, string][] = [
  [/مجاني|مجانا/, "No free consultation or free representation offer is established"],

  [/العراق/, "Outside the website's served jurisdictions"],
  [/^(?:محاميه سعوديه|المحاميه السعوديه)$/, "Do not imply an unverified nationality, gender-specific offering or personal local licence"],
  [/دورات|دوره|زي المحامي|العمل في مكتب|منهجيه كتابه مقال|بحث حول|بحث الاستشاره|^كتب محاماه$|محام او محامي/, "Training, employment, academic or dictionary intent, not an offered client service"],
  [/شروط (?:المحامي|المستشار)|معلومات عن المحامي|^عن المحاماه$|^عمل (?:المحامي|المستشار)|^قانون محامي|^القانون المحاماه$|^القانون والمحاماه$|^محاماه قانون$|^نظام المحامي$/, "Professional qualification or profession-reference query; do not mislabel as a client-service page"],
  [/^(?:منصه العقد|موقع محامو المملكه|محامون المملكه|محامون العرب|مكتب سعودي|مكتب السعودي|مركز قانوني|المحامي عمر)$/, "Ambiguous brand, entity or non-specific navigation; no confident client-intent assignment"],
  [/وزاره العدل|هيئه المحامين|طلب محامي من المحكمه|استعلام عن|اسماء المحاكم|رقم قضيه|رقم التواصل للجرائم|رقم جرائم|كيفيه التواصل مع الجرائم/, "Government, directory, case-status or official-reporting navigation; do not impersonate the destination"],
  [/^(?:المحكمه في السعوديه|محكمه سعوديه|المحاكم السعوديه|محكمه السعوديه|المحاكم في السعوديه|المحاكم الشرعيه في السعوديه|المحاكم التجاريه في السعوديه|المحكمه التنفيذ|المحكمه الشرعيه السعوديه|خدمات المحكمه|محامي الدوله|محكمه الاستئناف السعوديه|محاكم الاستئناف في السعوديه|محكمه العمل|محكمه الاستئناف|محكمه الجرائم الالكترونيه|القضاء في السعوديه|المحاكم الالكترونيه|المحكمه الالكترونيه)$/, "Court/institution navigation, not a substitute government-service page"],
  [/^(?:نسبه الاخطاء الطبيه في السعوديه|تقرير الطبي|المنشات الطبيه|التامين الصحي للمحامين|تامين محامي الشركات|التامين القانوني|عرض العمل في النظام السعودي|الممثل النظامي|توقيع محامي|حكم قانونيه|حكم قانونيه|حكم قانونية|الاعمال المهنيه)$/, "Ambiguous, statistical, non-legal-service or unsupported product intent"],
];
const rules: [RegExp, string][] = [
  [/افضل|اقوي|^(?:محامي سعودي|المحامي السعودي|محامي مرخص|التحقق من محامي)$/, "selection"],
  [/24 ساعه/, "consultation"],
  [/عقد.*(?:محامي|محاماه|استشار|خدمات قانونيه)|فسخ.*محامي|المسؤوليه القانونيه للمحامي/, "engagement"],
  [/فسخ العقد الاداري/, "administrative"],
  [/التماس|اعاده.*نظر|نظر.*حكم/, "reconsideration"],
  [/سند|اوراق التجاريه|اوراق تجاريه/, "promissory"],
  [/ضريب|ضرائب|زكاه|القيمه المضافه/, "tax"],
  [/طبي|طبيه/, "medical"],
  [/تامين/, "insurance"],
  [/علامه|علامات|ملكيه فكريه|الملكيه الفكريه/, "ip"],
  [/استئناف|اعتراض.*حكم|اعتراض.*احكام|بعد الاعتراض|رد الدعوي|رفض الدعوي|الحكم الابتدائي/, "judgment"],
  [/مكتبه|مكتبات/, "library"],
  [/^(?:محامي الكتروني|محامي الالكتروني|المحامي الالكتروني)$/, "consultation"],
  [/^(?:دعوي الكترونيه|الدعوي الالكترونيه|صحيفه دعوي الكترونيه)$/, "court"],
  [/احتيال|انتحال/, "fraud"],
  [/ابتزاز|الكترون|معلوماتيه|المعلوماتيه/, "cyber"],
  [/تشهير|سب والقذف|السب والقذف/, "defamation"],
  [/مكتب العمل|عمل وعمال|قانون العمل|محامي عمل|محامي عمال|قانون الشغل|عقد عمل|مباشره العمل/, "employment"],
  [/احوال الشخصيه/, "family"],
  [/عقاري/, "property"],
  [/بنوك|البنوك|مصرف|محامي مالي|استشارات ماليه/, "banking"],
  [/امتياز/, "franchise"],
  [/فسخ/, "contract-end"],
  [/بيع/, "sales"],
  [/عقد|عقود|تدقيق/, "contracts"],
  [/مطالب.*مالي|مطالبه.*مالي/, "debt"],
  [/تعويض|ضرر/, "compensation"],
  [/محامي.*شرك|محامي شرك|تسجيل شرك|منازعات الشركات|الخدمات القانونيه للشركات|دور المستشار القانوني في الشركه/, "companies"],
  [/تجاري|تجاره|تجاريه/, "commercial"],
  [/مقالات|مقال |^مقال|مكتبه|مراجع|معلومات قانونيه|محتوي قانوني|المدونه|تحليل النص/, "library"],
  [/محكم|قضيه|قضايا|دعوي|اجراء|مذكرات|دراسه القضيه|دراسه قضيه/, "court"],
  [/رقم|ارقام|التواصل|طلب|اريد|استشر|قيمه|خطوات|نموذج|كتابه استشاره|تقديم استشاره|تقديم خدمات|تكليف|شروط الاستشاره|طريقه الاستشاره|عرض خدمات/, "intake"],
  [/محام|استشار|قانون|المشوره|المساله|مساله|الاعمال القانونيه|شروط الخدمه/, "consultation"],
];

const overrides: Record<string, string> = Object.fromEntries([
  ["العقود الالكترونية في النظام السعودي", "contracts"], ["توقيع العقد الالكتروني", "contracts"], ["نموذج عقد الكتروني", "contracts"],
  ["قضايا الابتزاز والتشهير", "defamation"], ["اتفاقية تسوية", "contracts"], ["شروط الخدمة", "engagement"],
  ["محامي محكمة التنفيذ", "debt"], ["الاعتراض على حكم محكمة التنفيذ", "debt"],
  ["عقد استشارات مالية", "contracts"],
].map(([q, intent]) => [normalize(q), intent]));
const unresolved: string[] = [];
const rows = source.rows.map((row: { keyword: string; monthlySearches: number | null; sources: string[] }) => {
  const q = normalize(row.keyword);
  const exclusion = exclusions.find(([pattern]) => pattern.test(q));
  if (exclusion) return { keyword: row.keyword, monthlySearches: row.monthlySearches, sources: row.sources, disposition: "excluded", reason: exclusion[1], targets: [] };
  const intentId = overrides[q] ?? rules.find(([pattern]) => pattern.test(q))?.[1];
  const intent = SEARCH_INTENT_EDITORIAL.find(entry => entry.id === intentId);
  if (!intent) { unresolved.push(row.keyword); return null; }
  // A literal Saudi modifier scopes a query to Saudi Arabia. Unqualified
  // wording is mapped to the site's three offerings, without allocating its
  // unsegmented search-volume estimate to any country.
  const regions = /سعود|بالسعود|بالرياض|الرياض/.test(q) ? ["sa"] as const : ["sa", "syr", "uae"] as const;
  return { keyword: row.keyword, monthlySearches: row.monthlySearches, sources: row.sources, disposition: "mapped", intent: intentId,
    reason: intentId === "selection" ? "Selection and credential-verification guidance, without claiming superiority, nationality or an unverified licence" : "Broad research candidate only; primary commercial ownership must follow docs/keyword-ownership/policy.json",
    targets: regions.map(region => ({ region, ar: editorialTarget(intent, region, true), en: editorialTarget(intent, region, false) })) };
});
if (unresolved.length) throw new Error(`Unresolved queries: ${JSON.stringify(unresolved)}`);
const result = { generatedAt: new Date().toISOString(), sourceFiles: source.sources, primaryOwnershipRegistry: "docs/keyword-ownership/policy.json", basis: "Legacy broad research candidates, not primary commercial ownership. The keyword-ownership registry takes precedence. Not verified ranking or Google-selected canonical. English targets are translations, not measured English keyword demand.",
  summary: { total: rows.length, mapped: rows.filter((row: any) => row.disposition === "mapped").length, excluded: rows.filter((row: any) => row.disposition === "excluded").length, unresolved: 0 }, rows };
writeFileSync(resolve(root, "docs/search-query-targets-2026-09-06.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result.summary));
