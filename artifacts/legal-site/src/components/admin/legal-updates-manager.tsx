import { useEffect, useState } from "react";
import {
  legalUpdatesDefaultReviewer,
  updateSections,
  updateSectionLabels,
  type UpdateDraft,
  type UpdateEditorial,
  updateEditorialSchema,
} from "@workspace/api-zod/browser";
interface Item {
  id: string;
  revision: number;
  status: string;
  source_url: string;
  source_name: string;
  source_text: string;
  draft: UpdateDraft;
  editorial?: UpdateEditorial;
  source_check_status?: string;
  source_checked_at?: string;
}
export function LegalUpdatesManager({ token }: { token: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [runs, setRuns] = useState<unknown[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);
  const [reviewer, setReviewer] = useState(legalUpdatesDefaultReviewer.en);
  const [evidenceText, setEvidenceText] = useState("");
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function request(path: string, method = "GET", body?: unknown) {
    const res = await fetch(`/api/admin/legal-updates${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data;
  }
  async function load() {
    try {
      const data = await request("");
      setItems(data.items);
      setRuns(data.runs);
    } catch (e) {
      setError(String(e));
    }
  }
  useEffect(() => {
    void load();
  }, [token]);
  async function action(action: string) {
    if (!selected) return;
    setBusy(true);
    setError("");
    try {
      await request(`/${selected.id}`, "PUT", {
        action,
        revision: selected.revision,
        draft: ["save", "publish"].includes(action)
          ? { ...selected.draft, evidence: JSON.parse(evidenceText) }
          : selected.draft,
        editorial: selected.editorial || updateEditorialSchema.parse({}),
        reviewer,
        note,
        confirmed,
      });
      setSelected(null);
      setConfirmed(false);
      await load();
    } catch (e) {
      setError(String(e));
    } finally {
      setBusy(false);
    }
  }
  const fieldClass =
    "w-full rounded border border-gray-300 p-3 text-gray-900 bg-white";
  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-900">
      <h2 className="text-2xl font-semibold">Legal Updates — editorial desk</h2>
      <p className="my-3">
        Automated discovery prepares drafts. Verify the source, legal effect,
        dates and Arabic/English meaning before publishing. Reviewer attribution
        records the name entered below.
      </p>
      {error && (
        <p role="alert" className="p-4 my-4 bg-red-50 text-red-800">
          {error}
        </p>
      )}
      <button
        disabled={busy}
        className="border px-4 py-2 disabled:opacity-50"
        onClick={async () => {
          setBusy(true);
          setError("");
          try {
            await request("/run", "POST");
            await load();
          } catch (e) {
            setError(String(e));
          } finally {
            setBusy(false);
          }
        }}
      >
        {busy ? "Working…" : "Run discovery now"}
      </button>
      <details className="my-5">
        <summary>Recent runs and source failures</summary>
        <pre className="overflow-auto text-xs bg-gray-100 p-3">
          {JSON.stringify(runs, null, 2)}
        </pre>
      </details>
      {selected ? (
        <section className="space-y-5">
          <button
            className="underline"
            onClick={() => {
              setSelected(null);
              setConfirmed(false);
            }}
          >
            ← Back to queue
          </button>
          <p>
            Status: {selected.status} · Revision: {selected.revision}
          </p>
          <a
            className="text-green-800 underline"
            href={selected.source_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open official source: {selected.source_name}
          </a>
          <details>
            <summary>Retrieved source and evidence</summary>
            <pre className="whitespace-pre-wrap max-h-96 overflow-auto p-4 bg-gray-100">
              {selected.source_text}
            </pre>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(selected.draft.evidence, null, 2)}
            </pre>
          </details>
          <fieldset className="space-y-3 border p-4">
            <legend>Source facts and taxonomy</legend>
            {(
              [
                "instrument",
                "sourceDate",
                "effectiveDate",
                "practiceArea",
              ] as const
            ).map((key) => (
              <label key={key} className="block">
                {key}
                <input
                  className={fieldClass}
                  disabled={selected.status === "published"}
                  type={key.endsWith("Date") ? "date" : "text"}
                  value={selected.draft[key] || ""}
                  onChange={(event) => {
                    setConfirmed(false);
                    setSelected({
                      ...selected,
                      draft: {
                        ...selected.draft,
                        [key]:
                          key === "effectiveDate"
                            ? event.target.value || null
                            : event.target.value,
                      },
                    });
                  }}
                />
              </label>
            ))}
            <label className="block">
              Related service slugs (comma-separated)
              <input
                className={fieldClass}
                disabled={selected.status === "published"}
                value={selected.draft.serviceSlugs.join(", ")}
                onChange={(event) => {
                  setConfirmed(false);
                  setSelected({
                    ...selected,
                    draft: {
                      ...selected.draft,
                      serviceSlugs: event.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    },
                  });
                }}
              />
            </label>
          </fieldset>
          {(["en", "ar"] as const).map((lang) => (
            <fieldset
              key={lang}
              dir={lang === "ar" ? "rtl" : "ltr"}
              className="space-y-3 border p-4"
            >
              <legend>
                {lang === "ar" ? "النسخة العربية" : "English version"}
              </legend>
              {(["title", "summary", ...updateSections] as const).map((key) => (
                <label key={key} className="block">
                  {key === "title"
                    ? lang === "ar"
                      ? "العنوان"
                      : "Title"
                    : key === "summary"
                      ? lang === "ar"
                        ? "الملخص"
                        : "Summary"
                      : updateSectionLabels[lang][updateSections.indexOf(key)]}
                  <textarea
                    disabled={selected.status === "published"}
                    className={fieldClass}
                    rows={key === "title" ? 2 : 4}
                    value={selected.draft[lang][key]}
                    onChange={(e) => {
                      setConfirmed(false);
                      setSelected({
                        ...selected,
                        draft: {
                          ...selected.draft,
                          [lang]: {
                            ...selected.draft[lang],
                            [key]: e.target.value,
                          },
                        },
                      });
                    }}
                  />
                </label>
              ))}
            </fieldset>
          ))}
          <fieldset
            className="space-y-4 border p-4"
            disabled={selected.status === "published"}
          >
            <legend>Publication context and corrections</legend>
            <label className="block">
              Evidence (JSON claim/quote pairs)
              <textarea
                className={fieldClass}
                rows={6}
                value={evidenceText}
                onChange={(e) => {
                  setEvidenceText(e.target.value);
                  setConfirmed(false);
                }}
              />
            </label>
            <label className="block">
              Legal update status
              <select
                className={fieldClass}
                value={selected.editorial?.status || "current"}
                onChange={(e) => {
                  setConfirmed(false);
                  setSelected({
                    ...selected,
                    editorial: {
                      ...updateEditorialSchema.parse({}),
                      ...selected.editorial,
                      status: e.target.value as "current" | "superseded",
                    },
                  });
                }}
              >
                <option value="current">No recorded successor</option>
                <option value="superseded">Superseded by a later update</option>
              </select>
            </label>
            {(
              [
                "successorSlug",
                "correctionEn",
                "correctionAr",
                "imageUrl",
                "imageAltEn",
                "imageAltAr",
              ] as const
            ).map((key) => (
              <label className="block" key={key}>
                {
                  {
                    successorSlug: "Later update slug",
                    correctionEn: "Public correction / revision note (English)",
                    correctionAr: "Public correction / revision note (Arabic)",
                    imageUrl: "Representative image HTTPS URL (optional)",
                    imageAltEn: "Image description (English)",
                    imageAltAr: "Image description (Arabic)",
                  }[key]
                }
                <textarea
                  dir={key.endsWith("Ar") ? "rtl" : "ltr"}
                  className={fieldClass}
                  value={selected.editorial?.[key] || ""}
                  onChange={(e) => {
                    setConfirmed(false);
                    setSelected({
                      ...selected,
                      editorial: {
                        ...updateEditorialSchema.parse({}),
                        ...selected.editorial,
                        [key]: ["successorSlug", "imageUrl"].includes(key)
                          ? e.target.value || null
                          : e.target.value,
                      },
                    });
                  }}
                />
              </label>
            ))}
            <label className="block">
              Related legal matter paths (English canonical paths, one per line)
              <textarea
                className={fieldClass}
                value={selected.editorial?.relatedMatterPaths?.join("\n") || ""}
                onChange={(e) => {
                  setConfirmed(false);
                  setSelected({
                    ...selected,
                    editorial: {
                      ...updateEditorialSchema.parse({}),
                      ...selected.editorial,
                      relatedMatterPaths: e.target.value
                        .split("\n")
                        .filter(Boolean),
                    },
                  });
                }}
              />
            </label>
          </fieldset>
          <p className="text-sm">
            Source check: {selected.source_check_status || "Not checked"}{" "}
            {selected.source_checked_at || ""}. Refresh evidence after
            withdrawal if the official text changes; recheck every claim before
            saving.
          </p>
          <label className="block">
            Reviewer name
            <input
              className={fieldClass}
              value={reviewer}
              onChange={(e) => {
                setReviewer(e.target.value);
                setConfirmed(false);
              }}
            />
          </label>
          <label className="block">
            Review / correction note
            <textarea
              className={fieldClass}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
          <label className="flex gap-3 items-start">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            I checked the official source, legal instrument,
            publication/effective dates, applicability, interpretation and both
            language versions.
          </label>
          <div className="flex flex-wrap gap-3">
            {(selected.status === "published"
              ? ["withdraw"]
              : ["save", "publish", "reject", "refresh"]
            ).map((a) => (
              <button
                key={a}
                disabled={busy || (a === "publish" && !confirmed)}
                className="border border-green-800 rounded px-5 py-3 disabled:opacity-40"
                onClick={() => void action(a)}
              >
                {a === "publish" ? "Approve and publish" : a}
              </button>
            ))}
          </div>
        </section>
      ) : (
        <div className="divide-y">
          {!items.length && (
            <p className="py-8">
              No drafts yet. Check configuration and run history before starting
              discovery.
            </p>
          )}
          {items.map((item) => (
            <button
              key={item.id}
              className="w-full text-left py-5 hover:bg-gray-100"
              onClick={() => {
                setSelected(item);
                setEvidenceText(JSON.stringify(item.draft.evidence, null, 2));
                setConfirmed(false);
                setNote("");
              }}
            >
              <span className="text-xs uppercase">{item.status}</span>
              <h3 className="font-semibold">{item.draft.en.title}</h3>
              <p>{item.source_name}</p>
              {item.source_check_status &&
                item.source_check_status !== "unchanged" && (
                  <p className="text-amber-800">
                    Source {item.source_check_status} — needs editorial
                    attention
                  </p>
                )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
