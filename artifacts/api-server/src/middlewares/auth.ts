import type { RequestHandler } from "express";
import { secretsMatch } from "./auth-secrets.js";
import { adminLoginLimiter, type AdminAttemptLimiter } from "./admin-login.js";
export { secretsMatch } from "./auth-secrets.js";

export function createAdminGuard(
  secret: () => string | undefined = () => process.env.ADMIN_PASSWORD,
  limiter: AdminAttemptLimiter = adminLoginLimiter,
): RequestHandler {
  return (req, res, next) => {
    const password = secret();
    if (!password) { res.status(500).json({ error: "Server misconfigured" }); return; }
    // Credential guessing must not bypass the login limit via a protected URL.
    limiter(req, res, () => {
      if (secretsMatch(req.headers.authorization ?? "", `Bearer ${password}`)) {
        limiter.release(req);
        next();
        return;
      }
      res.status(401).json({ error: "Unauthorized" });
    });
  };
}

export const requireAdmin = createAdminGuard();
