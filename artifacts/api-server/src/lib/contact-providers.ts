import type { ContactInput } from "./contact-input.js";

const RESEND_API_BASE = "https://api.resend.com";
const REQUEST_TIMEOUT_MS = 12_000;

type ProviderConfig = {
  resendApiKey: string;
  fromEmail: string;
  teamEmail: string;
  ownerEmail: string;
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

export async function sendConsultationEmail(
  input: ContactInput,
  reference: string,
): Promise<EmailSendResult> {
  const config = getProviderConfig();
  const response = await fetch(`${RESEND_API_BASE}/emails`, {
    method: "POST",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `counselo-consultation/${reference}`,
      "User-Agent": "CounselO-Contact/1.0",
    },
    body: JSON.stringify({
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
    }),
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
