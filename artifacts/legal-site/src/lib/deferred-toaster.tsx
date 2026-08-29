import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "wouter";

const RealToaster = lazy(() =>
  import("../components/ui/toaster").then((module) => ({ default: module.Toaster })),
);

/**
 * Toast UI is not part of any server-rendered page content. Keep it out of the
 * initial bundle and mount it immediately after hydration on routes that can
 * actually use notifications. The jurisdiction picker never emits toasts, so
 * it does not download the Radix toast runtime at all.
 */
export function Toaster() {
  const [location] = useLocation();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || location === "/" || location === "/ar") return null;

  return (
    <Suspense fallback={null}>
      <RealToaster />
    </Suspense>
  );
}
