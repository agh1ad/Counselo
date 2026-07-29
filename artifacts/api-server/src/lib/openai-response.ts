interface ResponseContentItem {
  type?: unknown;
  text?: unknown;
}

interface ResponseOutputItem {
  type?: unknown;
  content?: unknown;
}

interface RawResponsesPayload {
  output_text?: unknown;
  output?: unknown;
}

/**
 * Extract all assistant text from a raw Responses API HTTP payload.
 * `output_text` is an SDK convenience property and is not guaranteed to be
 * present when calling the REST endpoint with fetch.
 */
export function extractResponsesOutputText(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;

  const response = payload as RawResponsesPayload;
  if (typeof response.output_text === "string" && response.output_text.trim()) {
    return response.output_text;
  }
  if (!Array.isArray(response.output)) return null;

  const text: string[] = [];
  for (const outputItem of response.output as ResponseOutputItem[]) {
    if (
      !outputItem ||
      typeof outputItem !== "object" ||
      outputItem.type !== "message" ||
      !Array.isArray(outputItem.content)
    ) {
      continue;
    }
    for (const contentItem of outputItem.content as ResponseContentItem[]) {
      if (
        contentItem &&
        typeof contentItem === "object" &&
        contentItem.type === "output_text" &&
        typeof contentItem.text === "string"
      ) {
        text.push(contentItem.text);
      }
    }
  }

  const combined = text.join("");
  return combined.trim() ? combined : null;
}
