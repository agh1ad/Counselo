import type { ReactNode } from "react";

/** Native disclosure keeps supporting content in the initial HTML and works without JavaScript. */
export function ReadingDetails({ enabled = true, title, children }: {
  enabled?: boolean;
  title: string;
  children: ReactNode;
}) {
  if (!enabled) return <>{children}</>;
  return <details className="saudi-reading-details">
    <summary><span>{title}</span><span className="saudi-disclosure-icon" aria-hidden="true" /></summary>
    <div className="saudi-reading-details-body">{children}</div>
  </details>;
}
