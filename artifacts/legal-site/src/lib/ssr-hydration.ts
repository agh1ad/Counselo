/**
 * Keep parser-blocking hydration data after the page, not before head assets.
 * Module entry scripts are deferred until parsing finishes, so these globals
 * are still available when React starts, without delaying CSS discovery.
 */
export function appendHydrationData(html: string, scripts: string): string {
  if (!html.includes("</body>")) {
    throw new Error("SSR template is missing its closing body tag");
  }
  return html.replace("</body>", () => `${scripts}\n</body>`);
}
