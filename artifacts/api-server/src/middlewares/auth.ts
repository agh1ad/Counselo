import type { Request, Response, NextFunction } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const secret = process.env["SESSION_SECRET"];
  if (!secret) {
    res.status(500).json({ error: "Server misconfigured" });
    return;
  }
  const authHeader = req.headers["authorization"] ?? "";
  if (authHeader === `Bearer ${secret}`) {
    next();
    return;
  }
  res.status(401).json({ error: "Unauthorized" });
}
