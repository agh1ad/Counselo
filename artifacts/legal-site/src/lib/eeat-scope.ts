/**
 * Applies the public evidence boundary to legacy marketing copy.
 *
 * This keeps experience descriptions useful while preventing a page from
 * presenting a target, past result, or online intake route as a guarantee.
 */
export function qualifyEeatCopy<T>(value: T): T {
  if (typeof value === "string") {
    if (/target 24-hour response window|وقت استجابة مستهدف خلال 24 ساعة/.test(value)) return value;
    const qualified = value
      .replace(/hundreds of millions of Saudi riyals/gi, "substantial sums (a stated experience figure, not an audited result)")
      .replace(/مئات الملايين من الريالات السعودية/g, "مبالغ كبيرة (رقم خبرة مذكور وليس نتيجة مدققة)")
      .replace(/\btrack record of successful?\b/gi, "reported experience with")
      .replace(/سجل حافل من (الطعون الناجحة|النتائج الناجحة|التمثيل الفعّال)/g, "خبرة مذكورة في $1")
      .replace(/\bcomplete online (legal )?consultation\b/gi, "initial online consultation")
      .replace(/استشارة (قانونية )?أونلاين كاملة/g, "استشارة أولية أونلاين")
      .replace(/\bfull recovery\b/gi, "available recovery routes")
      .replace(/كامل الاسترداد/g, "مسارات الاسترداد المتاحة")
      .replace(/\b(?:a target |target |a )?(?:professional )?response within 24 hours\b/gi, "a professional response within a target 24-hour window, subject to scope, urgency, completeness and availability")
      .replace(/\bwithin 24 hours\b/gi, "within a target 24-hour response window, subject to scope, urgency, completeness and availability")
      .replace(/(?:وقت استجابة مهني مستهدف |رد(?:اً|ا)? مهنياً مستهدفاً )?خلال 24 ساعة/g, "ضمن وقت استجابة مستهدف خلال 24 ساعة، بحسب النطاق والاستعجال واكتمال المعلومات وتوفر الخدمة")
      .replace(/\bfastest available\b/gi, "appropriate available")
      .replace(/بأسرع ما يمكن/g, "وفق المسار المناسب والمتاح")
      .replace(/\bno office visit required\b/gi, "an initial consultation may begin without an office visit")
      .replace(/دون الحاجة لزيارة مكتب/g, "وقد تبدأ الاستشارة الأولية دون زيارة مكتب")
      .replace(/مع ضمن وقت استجابة مستهدف/g, "مع وقت استجابة مستهدف")
      .replace(/وقت الاستجابة المستهدف ضمن وقت استجابة مستهدف/g, "وقت الاستجابة المستهدف")
      .replace(/^an initial consultation/, "An initial consultation")
      .replace(/^a professional response/, "A professional response")
      .replace(/(\.\s+)a professional response/g, "$1A professional response");
    return qualified as T;
  }
  if (Array.isArray(value)) return value.map((item) => qualifyEeatCopy(item)) as T;
  if (value && typeof value === "object") {
    const output: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) output[key] = qualifyEeatCopy(item);
    return output as T;
  }
  return value;
}
