import type { ContactInput } from "./contact-input.js";

const RESEND_API_BASE = "https://api.resend.com";
const REQUEST_TIMEOUT_MS = 12_000;

type ProviderConfig = {
  resendApiKey: string;
  fromEmail: string;
  teamEmail: string;
  ownerEmail: string;
  siteUrl: string;
};

type EmailSendResult = { id: string; status: string };

export class NotificationConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotificationConfigurationError";
  }
}

export class NotificationProviderError extends Error {
  readonly provider: "resend";
  readonly status: number;

  constructor(provider: "resend", status: number, message: string) {
    super(message);
    this.name = "NotificationProviderError";
    this.provider = provider;
    this.status = status;
  }
}

function requireValue(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new NotificationConfigurationError(`${name} is required.`);
  return value;
}

function getProviderConfig(): ProviderConfig {
  return {
    resendApiKey: requireValue("RESEND_API_KEY"),
    fromEmail: requireValue("CONTACT_FROM_EMAIL"),
    teamEmail: requireValue("CONTACT_TEAM_EMAIL"),
    ownerEmail: requireValue("CONTACT_OWNER_EMAIL"),
    siteUrl: requireValue("PUBLIC_SITE_URL").replace(/\/+$/, ""),
  };
}

async function readErrorBody(response: Response): Promise<string> {
  const body = (await response.text()).trim();
  return body.length > 500 ? `${body.slice(0, 499)}…` : body;
}

function emailText(input: ContactInput, reference: string): string {
  const attachmentSummary = input.attachments.length
    ? input.attachments
        .map((file) => `- ${file.name} (${Math.ceil(file.size / 1024)} KB)`)
        .join("\n")
    : "None";
  return [
    "New CounselO legal consultation",
    "",
    `Reference: ${reference}`,
    `Region: ${input.region === "sa" ? "Saudi Arabia" : "Syria"}`,
    `Language: ${input.language === "ar" ? "Arabic" : "English"}`,
    `Practice area: ${input.service}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    "",
    "Client message:",
    input.message,
    "",
    "Attachments:",
    attachmentSummary,
  ].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function customerEmailText(input: ContactInput, reference: string): string {
  return [
    `Hello ${input.name},`,
    "",
    "Thank you for choosing CounselO.",
    "We have received your consultation request. Our legal team will review it shortly, and you can expect a reply within 24 hours.",
    "",
    "Please monitor:",
    "- Your email inbox, including the spam or junk folder",
    `- Your phone and WhatsApp at ${input.phone}`,
    "",
    `Consultation reference: ${reference}`,
    "Please keep this reference for any follow-up.",
    "",
    `If you need to add information, reply to this email or contact ${getProviderConfig().teamEmail}.`,
    "",
    "This confirmation acknowledges receipt of your request and is not legal advice. Your information is handled confidentially.",
    "",
    "CounselO Team",
    "",
    "—",
    "",
    `مرحباً ${input.name}،`,
    "",
    "شكراً لاختيارك كاونسلو.",
    "تم استلام طلب الاستشارة الخاص بك، وسيقوم فريقنا القانوني بمراجعته قريباً. يُتوقع أن يصلك رد خلال 24 ساعة.",
    "",
    "يرجى متابعة:",
    "- صندوق بريدك الإلكتروني، بما في ذلك مجلد الرسائل غير المرغوب فيها",
    `- هاتفك وواتساب على الرقم ${input.phone}`,
    "",
    `رقم طلب الاستشارة: ${reference}`,
    "يرجى الاحتفاظ بهذا الرقم لأي متابعة.",
    "",
    `إذا رغبت في إضافة معلومات، يمكنك الرد على هذا البريد أو التواصل عبر ${getProviderConfig().teamEmail}.`,
    "",
    "هذا البريد تأكيد لاستلام الطلب ولا يُعد استشارة قانونية. يتم التعامل مع معلوماتك بسرية.",
    "",
    "فريق كاونسلو",
  ].join("\n");
}

function customerEmailHtml(
  input: ContactInput,
  reference: string,
  config: ProviderConfig,
): string {
  const name = escapeHtml(input.name);
  const phone = escapeHtml(input.phone);
  const safeReference = escapeHtml(reference);
  const teamEmail = escapeHtml(config.teamEmail);
  const logoUrl = `${config.siteUrl}/images/counselo-logo.png`;
  const siteUrl = escapeHtml(config.siteUrl);

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f3f5f1;font-family:Arial,'Helvetica Neue',sans-serif;color:#18322a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f5f1;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 28px rgba(16,48,38,.10);">
            <tr>
              <td align="center" style="background:#ffffff;padding:0;line-height:0;font-size:0;">
                <a href="${siteUrl}" style="display:block;text-decoration:none;line-height:0;font-size:0;">
                  <img src="${logoUrl}" width="640" alt="CounselO — Online Legal Consultations" style="display:block;width:100%;max-width:640px;height:auto;border:0;margin:0;">
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 38px 18px;">
                <div style="display:inline-block;background:#e8f3ed;color:#176044;border-radius:999px;padding:7px 13px;font-size:13px;font-weight:700;">Request received</div>
                <h1 style="margin:18px 0 12px;font-size:27px;line-height:1.25;color:#123d32;">Thank you for choosing CounselO</h1>
                <p style="margin:0 0 14px;font-size:16px;line-height:1.7;">Hello ${name},</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.7;">We have received your consultation request. Our legal team will review it shortly, and you can expect a reply <strong>within 24 hours</strong>.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f9f6;border:1px solid #dce7e1;border-radius:10px;margin:22px 0;">
                  <tr><td style="padding:18px 20px;font-size:15px;line-height:1.7;">
                    <strong>Please monitor:</strong><br>
                    • Your email inbox, including spam or junk<br>
                    • Your phone and WhatsApp at <strong>${phone}</strong>
                  </td></tr>
                </table>
                <p style="margin:0 0 6px;font-size:13px;color:#687a73;text-transform:uppercase;letter-spacing:.08em;">Consultation reference</p>
                <p style="margin:0 0 18px;font-size:20px;font-weight:700;color:#b18337;">${safeReference}</p>
                <p style="margin:0;font-size:15px;line-height:1.7;">Keep this reference for follow-up. To add information, reply to this email or contact <a href="mailto:${teamEmail}" style="color:#176044;">${teamEmail}</a>.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 38px 32px;" dir="rtl" lang="ar">
                <div style="border-top:1px solid #e1e8e4;padding-top:26px;text-align:right;font-family:Tahoma,Arial,sans-serif;">
                  <div style="display:inline-block;background:#e8f3ed;color:#176044;border-radius:999px;padding:7px 13px;font-size:13px;font-weight:700;">تم استلام الطلب</div>
                  <h2 style="margin:18px 0 12px;font-size:25px;line-height:1.45;color:#123d32;">شكراً لاختيارك كاونسلو</h2>
                  <p style="margin:0 0 14px;font-size:16px;line-height:1.9;">مرحباً ${name}،</p>
                  <p style="margin:0 0 18px;font-size:16px;line-height:1.9;">تم استلام طلب الاستشارة الخاص بك، وسيقوم فريقنا القانوني بمراجعته قريباً. يُتوقع أن يصلك رد <strong>خلال 24 ساعة</strong>.</p>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f9f6;border:1px solid #dce7e1;border-radius:10px;margin:22px 0;text-align:right;">
                    <tr><td style="padding:18px 20px;font-size:15px;line-height:1.9;">
                      <strong>يرجى متابعة:</strong><br>
                      • بريدك الإلكتروني، بما في ذلك الرسائل غير المرغوب فيها<br>
                      • هاتفك وواتساب على الرقم <strong dir="ltr">${phone}</strong>
                    </td></tr>
                  </table>
                  <p style="margin:0 0 6px;font-size:13px;color:#687a73;">رقم طلب الاستشارة</p>
                  <p dir="ltr" style="margin:0 0 18px;text-align:right;font-size:20px;font-weight:700;color:#b18337;">${safeReference}</p>
                  <p style="margin:0;font-size:15px;line-height:1.9;">يرجى الاحتفاظ بهذا الرقم للمتابعة. لإضافة معلومات، يمكنك الرد على هذا البريد أو التواصل عبر <a href="mailto:${teamEmail}" style="color:#176044;">${teamEmail}</a>.</p>
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style="background:#eef2ef;padding:20px 30px;color:#687a73;font-size:12px;line-height:1.7;">
                This email confirms receipt and is not legal advice. Your information is handled confidentially.<br>
                هذا البريد تأكيد لاستلام الطلب ولا يُعد استشارة قانونية. يتم التعامل مع معلوماتك بسرية.<br>
                <strong style="color:#123d32;">CounselO Team · فريق كاونسلو</strong>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function sendEmail(
  config: ProviderConfig,
  body: Record<string, unknown>,
  idempotencyKey: string,
): Promise<EmailSendResult> {
  const response = await fetch(`${RESEND_API_BASE}/emails`, {
    method: "POST",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
      "User-Agent": "CounselO-Contact/1.0",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new NotificationProviderError(
      "resend",
      response.status,
      await readErrorBody(response),
    );
  }
  const result = (await response.json()) as { id?: string };
  if (!result.id)
    throw new NotificationProviderError(
      "resend",
      502,
      "Resend did not return an email ID.",
    );
  return { id: result.id, status: "sent" };
}

export async function sendConsultationEmail(
  input: ContactInput,
  reference: string,
): Promise<EmailSendResult> {
  const config = getProviderConfig();
  return sendEmail(
    config,
    {
      from: config.fromEmail,
      to: [config.teamEmail, config.ownerEmail],
      reply_to: input.email,
      subject: `New Legal Consultation — ${input.service} — ${input.name} — ${reference}`,
      text: emailText(input, reference),
      attachments: input.attachments.map((file) => ({
        filename: file.name,
        content: file.data,
      })),
      tags: [
        { name: "category", value: "legal_consultation" },
        { name: "reference", value: reference },
      ],
    },
    `counselo-consultation/${reference}/internal`,
  );
}

export async function sendCustomerConfirmationEmail(
  input: ContactInput,
  reference: string,
): Promise<EmailSendResult> {
  const config = getProviderConfig();
  return sendEmail(
    config,
    {
      from: config.fromEmail,
      to: [input.email],
      reply_to: config.teamEmail,
      subject: `We received your consultation request | تم استلام طلب استشارتك — ${reference}`,
      text: customerEmailText(input, reference),
      html: customerEmailHtml(input, reference, config),
      tags: [
        { name: "category", value: "customer_confirmation" },
        { name: "reference", value: reference },
      ],
    },
    `counselo-consultation/${reference}/customer`,
  );
}

export async function getEmailDeliveryStatus(id: string): Promise<string> {
  const config = getProviderConfig();
  const response = await fetch(
    `${RESEND_API_BASE}/emails/${encodeURIComponent(id)}`,
    {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        "User-Agent": "CounselO-Contact/1.0",
      },
    },
  );
  if (!response.ok) {
    throw new NotificationProviderError(
      "resend",
      response.status,
      await readErrorBody(response),
    );
  }
  const result = (await response.json()) as { last_event?: string };
  return result.last_event ?? "sent";
}

export function assertContactNotificationConfiguration(): void {
  getProviderConfig();
}
