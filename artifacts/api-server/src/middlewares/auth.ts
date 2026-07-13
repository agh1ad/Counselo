import type { Request, Response, NextFunction } from "express";
import { timingSafeEqual } from "node:crypto";

export function secretsMatch(candidate: string, secret: string): boolean {
  const candidateBuffer = Buffer.from(candidate);
  const secretBuffer = Buffer.from(secret);
  return (
    candidateBuffer.length === secretBuffer.length &&
    timingSafeEqual(candidateBuffer, secretBuffer)
  );
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const secret = process.env["ADMIN_PASSWORD"];
  if (!secret) {
    res.status(500).json({ error: "Server misconfigured" });
    return;
  }
  const authHeader = req.headers["authorization"] ?? "";
  if (secretsMatch(authHeader, `Bearer ${secret}`)) {
    next();
    return;
  }
  res.status(401).json({ error: "Unauthorized" });
}
