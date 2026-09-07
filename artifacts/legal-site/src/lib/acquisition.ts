import { deriveAcquisitionContext, sanitizeAcquisitionContext, type AcquisitionContext } from "@workspace/api-zod/browser";

const KEY = "counselo_acquisition_v1";
let current: AcquisitionContext | undefined;

export function getAcquisitionContext(): AcquisitionContext | undefined {
  if (typeof window === "undefined") return undefined;
  if (current) return current;
  try { current = sanitizeAcquisitionContext(JSON.parse(sessionStorage.getItem(KEY) ?? "null")); } catch {}
  if (!current) {
    current = deriveAcquisitionContext(window.location.pathname, document.referrer, window.location.search);
    if (current) try { sessionStorage.setItem(KEY, JSON.stringify(current)); } catch {}
  }
  return current;
}
