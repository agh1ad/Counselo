import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
} from "node:crypto";

type EncryptedPayload = {
  encryptedPayload: string;
  payloadIv: string;
  payloadAuthTag: string;
};

function getEncryptionKey(): Buffer {
  const value = process.env["CONTACT_ENCRYPTION_KEY"] ?? "";
  if (!/^[a-fA-F0-9]{64}$/.test(value)) {
    throw new Error(
      "CONTACT_ENCRYPTION_KEY must be a 64-character hexadecimal secret.",
    );
  }
  return Buffer.from(value, "hex");
}

export function encryptContactPayload(payload: unknown): EncryptedPayload {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);

  return {
    encryptedPayload: encrypted.toString("base64"),
    payloadIv: iv.toString("base64"),
    payloadAuthTag: cipher.getAuthTag().toString("base64"),
  };
}

export function decryptContactPayload<T>(payload: EncryptedPayload): T {
  const decipher = createDecipheriv(
    "aes-256-gcm",
    getEncryptionKey(),
    Buffer.from(payload.payloadIv, "base64"),
  );
  decipher.setAuthTag(Buffer.from(payload.payloadAuthTag, "base64"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(payload.encryptedPayload, "base64")),
    decipher.final(),
  ]);
  return JSON.parse(decrypted.toString("utf8")) as T;
}

export function fingerprintRequest(ipAddress: string): string {
  const secret = process.env["CONTACT_RATE_LIMIT_SECRET"];
  if (!secret || secret.length < 32) {
    throw new Error(
      "CONTACT_RATE_LIMIT_SECRET must contain at least 32 characters.",
    );
  }
  return createHmac("sha256", secret).update(ipAddress).digest("hex");
}
