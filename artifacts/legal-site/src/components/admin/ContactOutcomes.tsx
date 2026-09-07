import { useEffect, useState } from "react";
import type { AcquisitionContext } from "@workspace/api-zod/browser";

type Outcome = "new" | "qualified" | "not_qualified" | "engaged" | "closed";
interface Submission { reference: string; region: string; language: string; service: string; createdAt: string; emailStatus: string; }
interface Attribution { reference: string; leadId: string | null; acquisition: AcquisitionContext | null; progress: { status: Outcome; updatedAt: string | null }; }
const labels: Record<Outcome, string> = { new: "Awaiting assessment", qualified: "Qualified enquiry", not_qualified: "Outside our scope", engaged: "Engagement agreed", closed: "Closed" };

export function ContactOutcomes({ token }: { token: string }) {
  const [rows, setRows] = useState<Submission[]>([]);
  const [selected, setSelected] = useState("");
  const [record, setRecord] = useState<Attribution | null>(null);
  const [outcome, setOutcome] = useState<Outcome>("new");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/admin/contact-submissions", { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal })
      .then(async (response) => { if (!response.ok) throw new Error("Could not load enquiry references."); return response.json() as Promise<Submission[]>; })
      .then(setRows).catch((error) => { if (!controller.signal.aborted) setMessage(error instanceof Error ? error.message : "Could not load enquiries."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [token]);
  useEffect(() => {
    setRecord(null); setMessage("");
    if (!selected) return;
    const controller = new AbortController();
    void fetch(`/api/admin/contact-submissions/${encodeURIComponent(selected)}/attribution`, { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal })
      .then(async (response) => { if (!response.ok) throw new Error("Could not load attribution for this enquiry."); return response.json() as Promise<Attribution>; })
      .then((value) => { setRecord(value); setOutcome(value.progress.status); })
      .catch((error) => { if (!controller.signal.aborted) setMessage(error instanceof Error ? error.message : "Could not load attribution."); });
    return () => controller.abort();
  }, [selected, token]);
  async function save() {
    if (!record || saving) return;
    setSaving(true); setMessage("");
    try {
      const response = await fetch(`/api/admin/contact-submissions/${encodeURIComponent(record.reference)}/attribution`, { method: "PATCH", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ status: outcome }) });
      if (!response.ok) throw new Error("Outcome was not saved. Please retry.");
      setRecord(await response.json() as Attribution); setMessage("Enquiry outcome saved.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Outcome was not saved."); }
    finally { setSaving(false); }
  }
  return <section className="max-w-5xl p-6 space-y-5">
    <div><h2 className="text-xl font-bold text-gray-900">Enquiry outcomes</h2><p className="mt-2 text-sm text-gray-600">Review accepted consultation requests against your correspondence, then record the actual outcome. A click or an email delivery is not an agreed engagement.</p></div>
    <label className="block max-w-xl text-sm font-semibold">Enquiry reference <span className="font-normal text-gray-500">(latest 100 accepted requests)</span>
      <select value={selected} onChange={(event) => setSelected(event.target.value)} disabled={loading || saving} className="mt-2 block w-full rounded border border-gray-300 bg-white p-3">
        <option value="">{loading ? "Loading references…" : rows.length ? "Choose an enquiry" : "No accepted enquiries recorded"}</option>
        {rows.map((row) => <option key={row.reference} value={row.reference}>{row.reference} · {row.region.toUpperCase()} · {row.service} · {new Date(row.createdAt).toLocaleDateString()}</option>)}
      </select>
    </label>
    {selected && !record && !message && <p role="status">Loading enquiry attribution…</p>}
    {record && <div className="space-y-5 rounded-xl border bg-white p-5">
      <h3 className="font-semibold">{record.reference}</h3>
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div><dt className="text-gray-500">First landing page</dt><dd className="break-words">{record.acquisition?.landingPath ?? "Not recorded for this request"}</dd></div>
        <div><dt className="text-gray-500">Acquisition source / medium</dt><dd>{record.acquisition ? `${record.acquisition.source} / ${record.acquisition.medium}` : "Not recorded"}</dd></div>
        <div className="sm:col-span-2"><dt className="text-gray-500">Analytics join ID</dt><dd className="break-all font-mono text-xs">{record.leadId ?? "Not available on this older request"}</dd></div>
      </dl>
      <p className="text-sm text-gray-500">Use the join ID to match the confirmed generate_lead event, where analytics was available. The source is coarse browser-reported context, not proof of a search query or an AI citation. This view contains no client narrative or documents.</p>
      <label className="block text-sm font-semibold">Outcome<select value={outcome} onChange={(event) => setOutcome(event.target.value as Outcome)} disabled={saving} className="mt-2 block w-full max-w-sm rounded border border-gray-300 p-3">{Object.entries(labels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <p className="text-sm text-gray-500">Qualified means the team has assessed the enquiry as suitable for the services offered. Select engagement agreed only after an actual agreement. Updates are stored with the protected request; they are not automatically sent to Google.</p>
      <button type="button" onClick={() => void save()} disabled={saving || outcome === record.progress.status} className="rounded bg-green-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{saving ? "Saving…" : "Save outcome"}</button>
      {record.progress.updatedAt && <p className="text-xs text-gray-500">Last recorded: {new Date(record.progress.updatedAt).toLocaleString()}</p>}
    </div>}
    {message && <p role="status" className="text-sm">{message}</p>}
  </section>;
}
