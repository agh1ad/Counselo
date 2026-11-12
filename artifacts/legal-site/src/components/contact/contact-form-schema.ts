import { z } from "zod";

export function normalizeContactPhone(phone: string): string {
  return phone.trim().replace(/[٠-٩۰-۹]/g, (digit) =>
    String(digit.charCodeAt(0) - (digit >= "۰" ? 0x06f0 : 0x0660)),
  );
}

export const createContactFormSchema = (isArabic: boolean, serviceSlugs?: readonly string[]) => z.object({
  name: z.string().trim()
    .min(2, isArabic ? "يرجى إدخال الاسم الكامل." : "Please enter your full name.")
    .max(120, isArabic ? "يجب ألا يتجاوز الاسم 120 حرفاً." : "Use no more than 120 characters for your name.")
    .refine(value => !/[\u0000-\u001f\u007f]/.test(value), isArabic ? "يرجى إدخال الاسم بنص واضح." : "Please enter your name using standard text."),
  email: z.string().trim()
    .email(isArabic ? "يرجى إدخال بريد إلكتروني صحيح." : "Please enter a valid email address.")
    .max(254, isArabic ? "عنوان البريد الإلكتروني طويل جداً." : "This email address is too long."),
  phone: z.string().transform(normalizeContactPhone).pipe(z.string().regex(
    /^[+\d][\d\s().-]{8,28}\d$/,
    isArabic ? "يرجى إدخال رقم هاتف صحيح مع رمز الدولة." : "Please enter a valid phone number with country code.",
  ).refine(value => {
    const digits = value.replace(/\D/g, "").length;
    return digits >= 10 && digits <= 15;
  }, isArabic ? "يرجى إدخال رقم هاتف صحيح مع رمز الدولة." : "Please enter a valid phone number with country code.")),
  service: z.string().min(1, isArabic ? "يرجى اختيار المجال القانوني الأقرب لمسألتك." : "Please select the legal service closest to your matter.")
    .refine(value => !serviceSlugs || serviceSlugs.includes(value), isArabic ? "يرجى اختيار خدمة من قائمة هذه الدولة." : "Please select a service from this country's list."),
  message: z.string().trim()
    .min(10, isArabic ? "يرجى وصف المسألة في 10 أحرف على الأقل." : "Please describe your matter in at least 10 characters.")
    .max(5_000, isArabic ? "يرجى اختصار الوصف إلى 5000 حرف كحد أقصى." : "Keep your description to 5,000 characters or fewer.")
    .refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value), isArabic ? "يرجى حذف الرموز غير الصالحة من وصف المسألة." : "Please remove invalid characters from your matter description."),
});

export type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;
