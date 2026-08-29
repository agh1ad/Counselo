import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Production-only query runtime for the jurisdiction picker.
 *
 * The picker already ships prerendered discovery data in window.__SSR_POSTS__
 * and window.__SSR_WORK_SAMPLES__. Pulling the full TanStack Query runtime into
 * the landing page just to refresh those two arrays adds work to the critical
 * path. This tiny compatibility layer keeps the exact initial prerendered data,
 * refreshes it after load/idle, and preserves the existing 60-second/focus
 * refresh behavior used by LatestContentCarousels.
 *
 * Vite resolves this module only for the production picker client. All regional
 * pages, admin surfaces, SSR/prerendering, and development keep real TanStack
 * Query unchanged.
 */

export class QueryClient {}

export function QueryClientProvider({ children }: { client: QueryClient; children: ReactNode }) {
  return children;
}

type QueryOptions<T> = {
  queryKey?: unknown;
  queryFn: () => Promise<T>;
  initialData?: T | (() => T | undefined);
  enabled?: boolean;
  staleTime?: number;
  refetchOnMount?: boolean | "always";
  refetchInterval?: number | false;
  refetchIntervalInBackground?: boolean;
  refetchOnWindowFocus?: boolean | "always";
};

type QueryResult<T> = {
  data: T | undefined;
};

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout?: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

function resolveInitialData<T>(initialData: QueryOptions<T>["initialData"]): T | undefined {
  return typeof initialData === "function"
    ? (initialData as () => T | undefined)()
    : initialData;
}

export function useQuery<T>(options: QueryOptions<T>): QueryResult<T> {
  const [data, setData] = useState<T | undefined>(() => resolveInitialData(options.initialData));
  const queryFnRef = useRef(options.queryFn);
  queryFnRef.current = options.queryFn;

  useEffect(() => {
    if (options.enabled === false) return;

    let disposed = false;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;
    let intervalHandle: number | undefined;
    const idleWindow = window as IdleWindow;

    const refresh = () => {
      void queryFnRef.current()
        .then((nextData) => {
          if (!disposed) setData(nextData);
        })
        .catch(() => {
          // Keep the prerendered data on transient network failures, matching
          // the resilient behavior users already see from the query-backed UI.
        });
    };

    const scheduleRefresh = () => {
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(refresh, { timeout: 2_000 });
      } else {
        timeoutHandle = window.setTimeout(refresh, 250);
      }
    };

    const onLoad = () => scheduleRefresh();
    if (document.readyState === "complete") scheduleRefresh();
    else window.addEventListener("load", onLoad, { once: true });

    if (typeof options.refetchInterval === "number" && options.refetchInterval > 0) {
      intervalHandle = window.setInterval(() => {
        if (options.refetchIntervalInBackground === false && document.hidden) return;
        refresh();
      }, options.refetchInterval);
    }

    const onFocus = () => {
      if (options.refetchOnWindowFocus) refresh();
    };
    if (options.refetchOnWindowFocus) window.addEventListener("focus", onFocus);

    return () => {
      disposed = true;
      window.removeEventListener("load", onLoad);
      if (options.refetchOnWindowFocus) window.removeEventListener("focus", onFocus);
      if (intervalHandle !== undefined) window.clearInterval(intervalHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
      if (idleHandle !== undefined && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleHandle);
      }
    };
  }, [options.enabled, options.refetchInterval, options.refetchIntervalInBackground, options.refetchOnWindowFocus]);

  return { data };
}
