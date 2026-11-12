import type { Request, RequestHandler } from "express";
import { secretsMatch } from "./auth-secrets.js";

export type AdminAttemptLimiter = RequestHandler & { release: (request: Request) => void };

/** Per-process rolling limits; the trusted proxy configuration determines req.ip. */
export function createAdminLoginLimiter(options: {
  now?: () => number;
  windowMs?: number;
  perIp?: number;
  global?: number;
  maxIdentities?: number;
} = {}): AdminAttemptLimiter {
  const now = options.now ?? Date.now;
  const windowMs = options.windowMs ?? 15 * 60_000;
  const perIp = options.perIp ?? 10;
  const globalLimit = options.global ?? 100;
  const maxIdentities = options.maxIdentities ?? 1_000;
  type Attempt = { time: number };
  const identities = new Map<string, Attempt[]>();
  const globalAttempts: Attempt[] = [];
  const acceptedRequests = new WeakSet<Request>();
  const tickets = new WeakMap<Request, { identity: string; attempt: Attempt }>();
  const limiter: RequestHandler = (req, res, next) => {
    // The same guard runs before body parsing and on the route itself.
    if (acceptedRequests.has(req)) { next(); return; }
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
    const time = now();
    const cutoff = time - windowMs;
    while (globalAttempts.length && globalAttempts[0].time <= cutoff) globalAttempts.shift();
    for (const [ip, attempts] of identities) {
      while (attempts.length && attempts[0].time <= cutoff) attempts.shift();
      if (!attempts.length) identities.delete(ip);
    }
    const identity = req.ip ?? req.socket.remoteAddress ?? "unknown";
    const attempts = identities.get(identity) ?? [];
    const resets: number[] = [];
    if (globalAttempts.length >= globalLimit) resets.push(globalAttempts[0].time + windowMs);
    if (attempts.length >= perIp) resets.push(attempts[0].time + windowMs);
    if (!identities.has(identity) && identities.size >= maxIdentities) {
      resets.push(Math.min(...[...identities.values()].map(bucket => bucket[0].time)) + windowMs);
    }
    if (resets.length) {
      res.setHeader("Retry-After", String(Math.max(1, Math.ceil((Math.max(...resets) - time) / 1000))));
      res.status(429).json({ error: "Too many sign-in attempts. Please try again later." });
      return;
    }
    const attempt = { time };
    globalAttempts.push(attempt);
    attempts.push(attempt);
    identities.set(identity, attempts);
    acceptedRequests.add(req);
    tickets.set(req, { identity, attempt });
    next();
  };
  return Object.assign(limiter, { release: (req: Request) => {
    const ticket = tickets.get(req);
    if (!ticket) return;
    const globalIndex = globalAttempts.indexOf(ticket.attempt);
    if (globalIndex !== -1) globalAttempts.splice(globalIndex, 1);
    const attempts = identities.get(ticket.identity);
    const index = attempts?.indexOf(ticket.attempt) ?? -1;
    if (attempts && index !== -1) attempts.splice(index, 1);
    if (attempts && !attempts.length) identities.delete(ticket.identity);
    tickets.delete(req);
  } });
}

export function createAdminLoginHandler(
  secret: () => string | undefined = () => process.env.ADMIN_PASSWORD,
  authenticated: (request: Request) => void = request => adminLoginLimiter.release(request),
): RequestHandler {
  return (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const adminPassword = secret();
    if (!adminPassword) { res.status(500).json({ error: "Server misconfigured" }); return; }
    const password: unknown = req.body?.password;
    if (typeof password === "string" && secretsMatch(password, adminPassword)) {
      authenticated(req);
      res.json({ token: adminPassword });
      return;
    }
    res.status(401).json({ error: "Wrong password" });
  };
}

export const adminLoginLimiter = createAdminLoginLimiter();
export const adminLoginHandler = createAdminLoginHandler();
