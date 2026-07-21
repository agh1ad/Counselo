import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, ArrowLeft, BriefcaseBusiness, CheckCircle2, Edit2, Eye, FileCheck2, Plus, Save, Trash2, Upload, X } from "lucide-react";

const API = "/api";
const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];

interface WorkSampleAdmin {
  id: number;
  slug: string;
  date: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  workTypeEn: string;
  workTypeAr: string;
  jurisdictionEn: string;
  jurisdictionAr: string;
  clientTypeEn: string;
  clientTypeAr: string;
  challengeEn: string;
  challengeAr: string;
  approachEn: string;
  approachAr: string;
  outcomeEn: string;
  outcomeAr: string;
  seoTitleEn: string;
  seoTitleAr: string;
  seoDescriptionEn: string;
  seoDescriptionAr: string;
  documentLanguage: "ar" | "en" | "bilingual";
  fileName: string;
  fileMimeType: string;
  fileSize: number;
  confidentialityConfirmed: boolean;
  featured: boolean;
  published: boolean;
  hasFile: boolean;
}

type WorkForm = Omit<WorkSampleAdmin, "id" | "hasFile"> & { fileData?: string };

const emptyWork = (): WorkForm => ({
  slug: "",
  date: new Date().toISOString().slice(0, 10),
  titleEn: "", titleAr: "", summaryEn: "", summaryAr: "",
  workTypeEn: "", workTypeAr: "", jurisdictionEn: "", jurisdictionAr: "",
  clientTypeEn: "", clientTypeAr: "", challengeEn: "", challengeAr: "",
  approachEn: "", approachAr: "", outcomeEn: "", outcomeAr: "",
  seoTitleEn: "", seoTitleAr: "", seoDescriptionEn: "", seoDescriptionAr: "",
  documentLanguage: "ar", fileName: "", fileMimeType: "", fileSize: 0,
  confidentialityConfirmed: false, featured: false, published: false,
});

const ARABIC_MAP: Record<string, string> = {
  ا:"a",أ:"a",إ:"i",آ:"a",ب:"b",ت:"t",ث:"th",ج:"j",ح:"h",خ:"kh",د:"d",ذ:"dh",ر:"r",ز:"z",س:"s",ش:"sh",ص:"s",ض:"d",ط:"t",ظ:"z",ع:"a",غ:"gh",ف:"f",ق:"q",ك:"k",ل:"l",م:"m",ن:"n",ه:"h",ة:"h",و:"w",ي:"y",ى:"a",ئ:"y",ؤ:"w",ء:"",
};

function slugify(value: string): string {
  const transliterated = [...value].map((character) => ARABIC_MAP[character] ?? character).join("");
  return transliterated.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function truncate(value: string, max: number): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max + 1).replace(/\s+\S*$/, "").trim();
}

function autoSeoTitle(value: string, arabic: boolean): string {
  if (!value) return "";
  const suffix = arabic ? " | أعمال كاونسلو" : " | CounselO Legal Work";
  return `${truncate(value, 70 - suffix.length)}${suffix}`;
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(new Error("Could not read the selected file"));
    reader.readAsDataURL(file);
  });
}

function Field({ label, value, onChange, textarea = false, rows = 3, dir = "ltr", placeholder = "" }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean; rows?: number; dir?: "ltr" | "rtl"; placeholder?: string }) {
  const className = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white";
  return <label className="block"><span className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</span>{textarea ? <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={rows} dir={dir} placeholder={placeholder} className={`${className} resize-y`} /> : <input value={value} onChange={(event) => onChange(event.target.value)} dir={dir} placeholder={placeholder} className={className} />}</label>;
}

function WorkEditor({ initial, token, onBack, onSaved }: { initial: WorkForm & { id?: number; hasFile?: boolean }; token: string; onBack: () => void; onSaved: () => void }) {
  const [form, setForm] = useState(initial);
  const [lang, setLang] = useState<"en" | "ar">(initial.titleAr && !initial.titleEn ? "ar" : "en");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const set = (key: keyof WorkForm, value: unknown) => setForm((current) => ({ ...current, [key]: value }));
  const key = (base: string) => `${base}${lang === "en" ? "En" : "Ar"}` as keyof WorkForm;
  const value = (base: string) => String(form[key(base)] ?? "");

  const updateTitle = (title: string) => {
    set(key("title"), title);
    if (!form.slug || !initial.id) set("slug", slugify(title));
    set(key("seoTitle"), autoSeoTitle(title, lang === "ar"));
  };

  const updateSummary = (summary: string) => {
    set(key("summary"), summary);
    set(key("seoDescription"), truncate(summary, 160));
  };

  const chooseFile = async (file?: File) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) { setMessage({ text: "Use PDF, JPG, PNG, or WebP.", error: true }); return; }
    if (file.size > MAX_FILE_SIZE) { setMessage({ text: "The document must be 8 MB or smaller.", error: true }); return; }
    try {
      const fileData = await fileToBase64(file);
      setForm((current) => ({ ...current, fileName: file.name, fileMimeType: file.type, fileSize: file.size, fileData }));
      setMessage({ text: "Document ready to upload.", error: false });
    } catch (error) {
      setMessage({ text: String(error), error: true });
    }
  };

  const save = async (publish?: boolean) => {
    const payload = publish === undefined ? form : { ...form, published: publish };
    if (!payload.slug) { setMessage({ text: "Add a title or URL slug.", error: true }); return; }
    setSaving(true);
    try {
      const response = await fetch(initial.id ? `${API}/admin/work/${initial.id}` : `${API}/admin/work`, {
        method: initial.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Save failed");
      onSaved();
    } catch (error) {
      setMessage({ text: (error as Error).message, error: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-20 bg-[#006C35] text-white px-4 py-3 flex items-center gap-3 shadow">
        <button onClick={onBack} className="flex items-center gap-2 text-sm hover:bg-white/10 px-3 py-2"><ArrowLeft size={16} /> Our Work</button>
        <div className="flex-1 min-w-0"><p className="font-semibold truncate">{form.titleEn || form.titleAr || "New work sample"}</p><p className="text-xs text-white/60">Shared across Saudi Arabia and Syria</p></div>
        <button onClick={() => void save()} disabled={saving} className="border border-white/30 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 disabled:opacity-50"><Save size={14} className="inline me-2" />Save draft</button>
        <button onClick={() => void save(!form.published)} disabled={saving} className="bg-white text-green-800 px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50">{form.published ? "Unpublish" : "Publish"}</button>
      </div>

      <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-[minmax(0,1fr)_320px] gap-6">
        <main className="space-y-6">
          {message && <div className={`p-3 rounded-lg text-sm flex items-center justify-between ${message.error ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}><span>{message.text}</span><button onClick={() => setMessage(null)}><X size={14} /></button></div>}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5"><div><h2 className="font-bold text-gray-900">Public description</h2><p className="text-xs text-gray-500">Add one or both languages. Missing translations fall back to the available text.</p></div><div className="flex bg-gray-100 rounded-lg p-1"><button onClick={() => setLang("en")} className={`px-3 py-1.5 rounded text-xs font-semibold ${lang === "en" ? "bg-white shadow text-green-800" : "text-gray-500"}`}>English</button><button onClick={() => setLang("ar")} className={`px-3 py-1.5 rounded text-xs font-semibold ${lang === "ar" ? "bg-white shadow text-green-800" : "text-gray-500"}`}>العربية</button></div></div>
            <div className="space-y-4" dir={lang === "ar" ? "rtl" : "ltr"}>
              <Field label={lang === "ar" ? "عنوان العمل" : "Work title"} value={value("title")} onChange={updateTitle} dir={lang === "ar" ? "rtl" : "ltr"} placeholder={lang === "ar" ? "مثال: عقد توزيع تجاري" : "Example: Commercial distribution agreement"} />
              <Field label={lang === "ar" ? "ملخص قصير" : "Short summary"} value={value("summary")} onChange={updateSummary} textarea rows={3} dir={lang === "ar" ? "rtl" : "ltr"} />
              <div className="grid sm:grid-cols-2 gap-4"><Field label={lang === "ar" ? "نوع العمل" : "Work type"} value={value("workType")} onChange={(v) => set(key("workType"), v)} dir={lang === "ar" ? "rtl" : "ltr"} placeholder={lang === "ar" ? "صياغة عقد" : "Contract drafting"} /><Field label={lang === "ar" ? "النطاق القانوني" : "Jurisdiction"} value={value("jurisdiction")} onChange={(v) => set(key("jurisdiction"), v)} dir={lang === "ar" ? "rtl" : "ltr"} placeholder={lang === "ar" ? "السعودية / سوريا / عابر للحدود" : "Saudi Arabia / Syria / Cross-border"} /></div>
              <Field label={lang === "ar" ? "نوع العميل (دون اسم)" : "Client type (no name)"} value={value("clientType")} onChange={(v) => set(key("clientType"), v)} dir={lang === "ar" ? "rtl" : "ltr"} placeholder={lang === "ar" ? "شركة تقنية متوسطة" : "Mid-sized technology company"} />
              <Field label={lang === "ar" ? "المسألة أو التحدي" : "Matter or challenge"} value={value("challenge")} onChange={(v) => set(key("challenge"), v)} textarea rows={5} dir={lang === "ar" ? "rtl" : "ltr"} />
              <Field label={lang === "ar" ? "العمل الذي قمنا به" : "Work performed"} value={value("approach")} onChange={(v) => set(key("approach"), v)} textarea rows={5} dir={lang === "ar" ? "rtl" : "ltr"} />
              <Field label={lang === "ar" ? "النتيجة أو القيمة المقدمة (اختياري)" : "Outcome or value delivered (optional)"} value={value("outcome")} onChange={(v) => set(key("outcome"), v)} textarea rows={4} dir={lang === "ar" ? "rtl" : "ltr"} />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5"><h2 className="font-bold text-gray-900 mb-1">Search metadata</h2><p className="text-xs text-gray-500 mb-4">Automatically follows the title and summary; you can refine it afterward.</p><div className="space-y-4" dir={lang === "ar" ? "rtl" : "ltr"}><Field label={lang === "ar" ? "عنوان SEO" : "SEO title"} value={value("seoTitle")} onChange={(v) => set(key("seoTitle"), v)} dir={lang === "ar" ? "rtl" : "ltr"} /><Field label={lang === "ar" ? "وصف SEO" : "SEO description"} value={value("seoDescription")} onChange={(v) => set(key("seoDescription"), v)} textarea rows={3} dir={lang === "ar" ? "rtl" : "ltr"} /></div></div>
        </main>

        <aside className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5"><h2 className="font-bold mb-4">Document</h2><label className="border-2 border-dashed border-gray-200 rounded-xl min-h-44 flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:border-green-500 hover:bg-green-50/40"><Upload size={28} className="text-green-700 mb-3" /><span className="text-sm font-semibold text-gray-800">Upload redacted document</span><span className="text-xs text-gray-400 mt-1">PDF, JPG, PNG, WebP · max 8 MB</span><input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className="hidden" onChange={(event) => void chooseFile(event.target.files?.[0])} /></label>{(form.fileName || initial.hasFile) && <div className="mt-3 bg-green-50 border border-green-100 p-3 text-xs text-green-800 flex gap-2"><FileCheck2 size={15} className="shrink-0" /><span className="break-all">{form.fileName || "Existing uploaded document"}</span></div>}<label className="block mt-4"><span className="block text-xs font-semibold text-gray-600 mb-1.5">Document language</span><select value={form.documentLanguage} onChange={(e) => set("documentLanguage", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm"><option value="ar">Arabic</option><option value="en">English</option><option value="bilingual">Arabic & English</option></select></label></div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4"><h2 className="font-bold">Publishing</h2><label className="block"><span className="block text-xs font-semibold text-gray-600 mb-1.5">URL</span><div className="flex gap-2"><input value={form.slug} onChange={(e) => set("slug", slugify(e.target.value))} className="min-w-0 flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono" /><button onClick={() => set("slug", slugify(form.titleEn || form.titleAr))} className="border border-gray-200 rounded-lg px-2 text-xs">Auto</button></div></label><label className="block"><span className="block text-xs font-semibold text-gray-600 mb-1.5">Completion date</span><input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" /></label><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="h-4 w-4 accent-green-700" />Feature this work</label></div>

          <div className={`border rounded-xl p-5 ${form.confidentialityConfirmed ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}><div className="flex gap-2 mb-3"><AlertTriangle size={18} className={form.confidentialityConfirmed ? "text-green-700" : "text-amber-700"} /><h2 className="font-bold text-sm">Confidentiality confirmation</h2></div><label className="flex items-start gap-3 text-xs leading-relaxed cursor-pointer"><input type="checkbox" checked={form.confidentialityConfirmed} onChange={(e) => set("confidentialityConfirmed", e.target.checked)} className="h-4 w-4 mt-0.5 accent-green-700 shrink-0" /><span>I confirm that the uploaded copy is approved for public display and all client names, signatures, contact details, IDs, financial data, confidential terms, and identifying facts have been removed or irreversibly obscured.</span></label></div>
        </aside>
      </div>
    </div>
  );
}

export function WorkSamplesManager({ token }: { token: string }) {
  const [samples, setSamples] = useState<WorkSampleAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<(WorkForm & { id?: number; hasFile?: boolean }) | null>(null);
  const [message, setMessage] = useState<string>("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/admin/work`, { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error("Could not load work samples");
      setSamples(await response.json() as WorkSampleAdmin[]);
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { void load(); }, [load]);

  const remove = async (sample: WorkSampleAdmin) => {
    if (!confirm(`Delete "${sample.titleEn || sample.titleAr}"?`)) return;
    const response = await fetch(`${API}/admin/work/${sample.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (response.ok) void load(); else setMessage("Delete failed");
  };

  if (editing) return <WorkEditor initial={editing} token={token} onBack={() => setEditing(null)} onSaved={() => { setEditing(null); void load(); }} />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6"><div><h2 className="text-2xl font-bold text-gray-900">Our Work</h2><p className="text-sm text-gray-500 mt-1">{samples.length} sample{samples.length === 1 ? "" : "s"} · {samples.filter((sample) => sample.published).length} published · shared across both regions</p></div><button onClick={() => setEditing(emptyWork())} className="flex items-center gap-2 bg-[#006C35] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800"><Plus size={16} /> Add Work Sample</button></div>
      {message && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">{message}</div>}
      {loading ? <div className="text-center py-20 text-gray-400">Loading…</div> : samples.length === 0 ? <div className="text-center py-24 bg-white border border-gray-100 rounded-2xl"><BriefcaseBusiness size={42} className="mx-auto text-gray-200 mb-4" /><p className="text-gray-500 font-semibold">No work samples yet</p><p className="text-sm text-gray-400 mt-1 mb-5">Upload your first redacted legal document.</p><button onClick={() => setEditing(emptyWork())} className="inline-flex items-center gap-2 bg-[#006C35] text-white px-5 py-2.5 rounded-xl text-sm font-semibold"><Plus size={15} /> Add Work Sample</button></div> : <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden"><table className="w-full text-sm"><thead><tr className="bg-gray-50 border-b border-gray-100 text-left text-xs uppercase tracking-wide text-gray-400"><th className="px-5 py-3.5">Work</th><th className="px-5 py-3.5">Document</th><th className="px-5 py-3.5">Date</th><th className="px-5 py-3.5">Status</th><th className="px-5 py-3.5 text-right">Actions</th></tr></thead><tbody>{samples.map((sample) => <tr key={sample.id} onClick={() => setEditing({ ...sample })} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer"><td className="px-5 py-4"><p className="font-semibold text-gray-900">{sample.titleEn || sample.titleAr}</p><p className="text-xs text-gray-400 mt-1 font-mono">/our-work/{sample.slug}</p></td><td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 text-xs ${sample.hasFile ? "text-green-700" : "text-amber-700"}`}>{sample.hasFile ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}{sample.hasFile ? sample.fileName : "No file"}</span></td><td className="px-5 py-4 text-xs text-gray-500">{sample.date}</td><td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full text-xs ${sample.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>{sample.published ? "Published" : "Draft"}</span></td><td className="px-5 py-4"><div className="flex justify-end gap-1" onClick={(event) => event.stopPropagation()}><a href={`/our-work/${sample.slug}`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-gray-700"><Eye size={15} /></a><button onClick={() => setEditing({ ...sample })} className="p-2 text-gray-400 hover:text-green-700"><Edit2 size={15} /></button><button onClick={() => void remove(sample)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></div>}
    </div>
  );
}
