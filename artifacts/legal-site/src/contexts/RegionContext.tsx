// @refresh reset
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useLocation } from "wouter";

export type Region = "sa" | "syr";

interface RegionContextType {
  region: Region;
  regionPrefix: string;
}

const RegionContext = createContext<RegionContextType | null>(null);

function detectRegion(path: string): Region {
  if (path.startsWith("/syr")) return "syr";
  return "sa";
}

export function RegionProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const region = detectRegion(location);
  const regionPrefix = `/${region}`;

  return (
    <RegionContext.Provider value={{ region, regionPrefix }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within RegionProvider");
  return ctx;
}
