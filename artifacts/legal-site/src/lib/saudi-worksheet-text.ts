import { SAUDI_REVIEW_WORKSHEETS, SAUDI_WORKSHEETS_UPDATED_AT } from "./saudi-review-worksheets";

export function renderSaudiWorksheetText(service: string, language: "ar" | "en") {
  const worksheet = SAUDI_REVIEW_WORKSHEETS[service]?.[language];
  if (!worksheet) return undefined;
  const ar = language === "ar";
  return [
    `CounselO Legal | ${worksheet.title}`,
    ar ? "السعودية — ورقة تحضير عامة" : "Saudi Arabia — general preparation worksheet",
    `${ar ? "تحديث" : "Updated"}: ${SAUDI_WORKSHEETS_UPDATED_AT}`,
    `https://counselo-legal.com/sa${ar ? "/ar" : ""}/services/${service}`,
    "",
    ar ? "املأها على جهازك. لا تُرسل إلينا تلقائياً. اترك المجهول فارغاً، ولا تضف كلمات مرور أو بيانات غير لازمة." : "Complete on your own device. Nothing is sent to us automatically. Leave unknowns blank and omit passwords or unnecessary personal data.",
    "",
    ...worksheet.records.flatMap((record, index) => [
      `${index + 1}. ${record.label}`, record.prompt,
      ar ? "ملاحظاتي: ____________________" : "My notes: ____________________",
      ar ? "المستند المتاح / الناقص: ____________________" : "Available / missing record: ____________________", "",
    ]),
    ar ? "ما يمكن أن يتضمنه نطاق المراجعة المتفق عليه:" : "What the agreed review scope can include:",
    ...worksheet.outputs.map(output => `- ${output}`), "",
    `${ar ? "عوامل تحديد الأتعاب" : "Fee factors"}: ${worksheet.feeFactors}`,
    worksheet.boundary, "",
    ar ? "المخرج الذي أطلبه: ____________________" : "Output I am requesting: ____________________",
    ar ? "الموعد المطلوب ومصدره والمنطقة الزمنية: ____________________" : "Requested deadline, its source and time zone: ____________________", "",
    ar ? "أداة تحضير فقط؛ ليست رأياً قانونياً أو مستنداً جاهزاً للإيداع. يُتفق على النطاق والرسوم والمهني المسؤول قبل بدء العمل، وعلى وسيلة نقل المستندات قبل مشاركة الملف." : "Preparation aid only; not a legal opinion or a filing-ready document. Scope, fee and responsible professional must be agreed before work starts, and the document-transfer method before sharing the file.",
    "",
  ].join("\n");
}
