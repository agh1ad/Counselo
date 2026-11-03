import { useEffect, useRef, type ReactNode } from "react";

/** Ordinary anchor links work without JS; the enhancement marks the current section. */
export function ReadingNavigation({ enabled, pageKey, label, className, children }: {
  enabled: boolean;
  pageKey: string;
  label: string;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = ref.current;
    if (!enabled || !nav) return;
    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const targets = links.flatMap(link => {
      const target = document.getElementById(link.hash.slice(1));
      return target ? [{ link, target }] : [];
    });
    let frame = 0;
    const update = () => {
      frame = 0;
      const edge = nav.getBoundingClientRect().bottom + 32;
      let current: HTMLAnchorElement | undefined;
      let closest = -Infinity;
      for (const { link, target } of targets) {
        const top = target.getBoundingClientRect().top;
        if (top <= edge && top > closest) { current = link; closest = top; }
      }
      for (const link of links) {
        if (link === current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("toggle", schedule, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("toggle", schedule, true);
      links.forEach(link => link.removeAttribute("aria-current"));
    };
  }, [enabled, pageKey]);
  return <nav ref={ref} aria-label={label} className={className}>{children}</nav>;
}
