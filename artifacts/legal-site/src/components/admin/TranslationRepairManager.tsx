import { useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, RefreshCw } from "lucide-react";

const API = "/api";

interface AuditItem {
  kind: "blog" | "work";
  id: number;
  slug: string;
  title: string;
  gaps: string[];
}

interface AuditResult {
  audited: number;
  complete: boolean;
  items: AuditItem[];
  sourceAbsent: Array<{
    kind: "work";
    id: number;
    slug: string;
    title: string;
    field: string;
  }>;
}

interface RepairFailure {
  slug: string;
  error: string;
}

interface Props {
  token: string;
}

async function responseError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string };
    return body.error || `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

export function TranslationRepairManager({ token }: Props) {
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [auditing, setAuditing] = useState(false);
  const [repairing, setRepairing] = useState(false);
  const [progress, setProgress] = useState("");
  const [failures, setFailures] = useState<RepairFailure[]>([]);
  const [message, setMessage] = useState("");

  async function runAudit(): Promise<boolean> {
    setAuditing(true);
    setMessage("");
    try {
      const response = await fetch(`${API}/admin/translations/audit`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(await responseError(response));
      setAudit((await response.json()) as AuditResult);
      return true;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The audit failed");
      return false;
    } finally {
      setAuditing(false);
    }
  }

  async function repairAll() {
    if (!audit?.items.length || repairing) return;
    const count = audit.items.length;
    if (!window.confirm(`Translate and repair ${count} published item${count === 1 ? "" : "s"} now?`)) {
      return;
    }

    setRepairing(true);
    setFailures([]);
    const failed: RepairFailure[] = [];
    const items = [...audit.items];
    for (const [index, item] of items.entries()) {
      setProgress(`${index + 1} of ${count}: ${item.slug}`);
      try {
        const response = await fetch(`${API}/admin/translations/backfill`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ kind: item.kind, id: item.id }),
        });
        if (!response.ok) throw new Error(await responseError(response));
      } catch (error) {
        failed.push({
          slug: item.slug,
          error: error instanceof Error ? error.message : "Translation failed",
        });
        setFailures([...failed]);
      }
    }

    setProgress("");
    setRepairing(false);
    const refreshed = await runAudit();
    if (!refreshed) return;
    setMessage(
      failed.length
        ? `Finished with ${failed.length} item${failed.length === 1 ? "" : "s"} needing attention.`
        : `Repair finished for all ${count} audited item${count === 1 ? "" : "s"}.`,
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-5 p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#006C35]">
              Published content
            </p>
            <h1 className="mt-1 text-xl font-bold text-gray-900">
              English and Arabic translation audit
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Check every published blog post and work sample, then translate
              missing or duplicate language fields. Optional facts left blank
              in both languages are preserved rather than invented.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => void runAudit()}
              disabled={auditing || repairing}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {auditing ? <LoaderCircle className="animate-spin" size={16} /> : <RefreshCw size={16} />}
              Audit
            </button>
            <button
              type="button"
              onClick={() => void repairAll()}
              disabled={!audit?.items.length || auditing || repairing}
              className="inline-flex items-center gap-2 rounded-lg bg-[#006C35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00572b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {repairing && <LoaderCircle className="animate-spin" size={16} />}
              {repairing ? "Repairing…" : "Repair all"}
            </button>
          </div>
        </div>
        {progress && (
          <p className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
            {progress}
          </p>
        )}
        {message && (
          <p className="mt-4 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-800">
            {message}
          </p>
        )}
      </div>

      {audit && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-gray-900">Audit results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Checked {audit.audited} published items; {audit.items.length} need translation repair.
              </p>
            </div>
            {audit.complete && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                <CheckCircle2 size={14} /> Complete
              </span>
            )}
          </div>

          {audit.complete ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900">
              All required published fields have distinct English and Arabic
              versions. Optional fields with no source in either language
              remain intentionally blank.
            </div>
          ) : (
            <div className="space-y-3">
              {audit.items.map((item) => (
                <article
                  key={`${item.kind}-${item.id}`}
                  className="rounded-lg border border-amber-200 bg-amber-50/50 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-white px-2 py-0.5 text-xs font-semibold uppercase text-gray-600">
                      {item.kind === "blog" ? "Blog post" : "Work sample"}
                    </span>
                    <span className="font-semibold text-gray-900">{item.title}</span>
                    <span className="text-xs text-gray-500">/{item.slug}</span>
                  </div>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700">
                    {item.gaps.map((gap) => <li key={gap}>{gap}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {failures.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 font-semibold text-red-800">
            <AlertCircle size={17} /> Items needing attention
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {failures.map((failure) => (
              <li key={failure.slug}>
                <span className="font-semibold">{failure.slug}:</span> {failure.error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {audit && audit.sourceAbsent.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-gray-900">
            Optional facts with no source text
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            These fields are blank in both languages and were not generated.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {audit.sourceAbsent.map((item) => (
              <li key={`${item.kind}-${item.id}-${item.field}`}>
                <span className="font-semibold">{item.title}</span>
                <span className="text-gray-500"> /{item.slug}</span>
                <span> — {item.field}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!audit && !auditing && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-600">
          Run an audit to see which published items need translation repair.
        </div>
      )}
    </section>
  );
}