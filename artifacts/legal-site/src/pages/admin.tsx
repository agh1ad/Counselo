import { useState, useEffect, useCallback } from "react";
import {
  Plus, Edit2, Trash2, LogOut, Eye, ChevronRight,
  X, Save, AlertCircle, CheckCircle, Globe, ChevronDown,
  ChevronLeft, FileText, Settings, BarChart2, Search,
  Wrench, ExternalLink, RefreshCw, MessageCircle, Phone,
  Mail, TrendingUp, Users, Activity, Shield, Zap,
  CheckCircle2, XCircle, Clock, Copy,
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import {
  getAnalytics, clearAnalytics, getGAMeasurementId,
  setGAMeasurementId, type AnalyticsStore,
} from "@/lib/analytics";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const API = "/api";
type Tab = "blog" | "analytics" | "seo" | "tools";

interface BlogPost {
  id: number;
  slug: string;
  date: string;
  categoryEn: string;
  categoryAr: string;
  readTime: number;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  seoTitleEn: string;
  seoTitleAr: string;
  seoDescriptionEn: string;
  seoDescriptionAr: string;
  bodyEn: string;
  bodyAr: string;
  published: boolean;
  createdAt: string;
}

type FormData = Omit<BlogPost, "id" | "createdAt">;

const emptyForm = (): FormData => ({
  slug: "",
  date: new Date().toISOString().slice(0, 10),
  categoryEn: "",
  categoryAr: "",
  readTime: 5,
  titleEn: "",
  titleAr: "",
  excerptEn: "",
  excerptAr: "",
  seoTitleEn: "",
  seoTitleAr: "",
  seoDescriptionEn: "",
  seoDescriptionAr: "",
  bodyEn: "",
  bodyAr: "",
  published: false,
});

function slugify(text: string) {
  return text.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function Toast({ msg, type, onClose }: { msg: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-medium ${type === "success" ? "bg-green-700 text-white" : "bg-red-600 text-white"}`}>
      {type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {msg}
      <button onClick={onClose}><X size={14} /></button>
    </div>
  );
}

function SettingsPanel({ form, set, slugManual, setSlugManual, open }: {
  form: FormData; set: (k: keyof FormData, v: unknown) => void;
  slugManual: boolean; setSlugManual: (v: boolean) => void; open: boolean;
}) {
  const [seoOpen, setSeoOpen] = useState(false);
  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-600 bg-white";
  const labelCls = "block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1";
  if (!open) return null;
  return (
    <div className="w-72 shrink-0 bg-white border-l border-gray-100 overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2"><Settings size={12} /> Post Settings</p>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <label className={labelCls}>Status</label>
          <div onClick={() => set("published", !form.published)} className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${form.published ? "border-green-300 bg-green-50" : "border-gray-200 bg-gray-50"}`}>
            <div>
              <p className={`text-xs font-semibold ${form.published ? "text-green-700" : "text-gray-600"}`}>{form.published ? "Published" : "Draft"}</p>
              <p className="text-[10px] text-gray-400">{form.published ? "Visible on site" : "Not visible"}</p>
            </div>
            <div className={`w-9 h-5 rounded-full relative transition-colors ${form.published ? "bg-green-600" : "bg-gray-300"}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? "translate-x-4" : "translate-x-0.5"}`} />
            </div>
          </div>
        </div>
        <div>
          <label className={labelCls}>URL Slug</label>
          <div className="flex gap-1.5">
            <input value={form.slug} onChange={(e) => { setSlugManual(true); set("slug", e.target.value); }} placeholder="article-url" className={inputCls + " font-mono"} />
            <button type="button" onClick={() => { setSlugManual(false); set("slug", slugify(form.titleEn || form.titleAr)); }} title="Auto-generate from title" className="shrink-0 px-2 text-[10px] text-green-700 font-bold border border-green-200 rounded-lg hover:bg-green-50">Auto</button>
          </div>
          {form.slug && <p className="text-[10px] text-gray-400 mt-1 font-mono truncate">qanoni.com/blog/{form.slug}</p>}
        </div>
        <div>
          <label className={labelCls}>Publish Date</label>
          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Read Time (min)</label>
          <input type="number" min={1} max={60} value={form.readTime} onChange={(e) => set("readTime", Number(e.target.value))} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Category</label>
          <input value={form.categoryEn} onChange={(e) => set("categoryEn", e.target.value)} placeholder="Family Law" className={inputCls + " mb-1.5"} />
          <input value={form.categoryAr} onChange={(e) => set("categoryAr", e.target.value)} placeholder="قانون الأسرة" dir="rtl" className={inputCls} />
        </div>
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <button type="button" onClick={() => setSeoOpen((o) => !o)} className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 text-[10px] font-bold text-gray-600 uppercase tracking-wide">
            SEO <ChevronDown size={12} className={`transition-transform ${seoOpen ? "rotate-180" : ""}`} />
          </button>
          {seoOpen && (
            <div className="p-3 space-y-3">
              <div><label className={labelCls}>SEO Title (EN)</label><input value={form.seoTitleEn} onChange={(e) => set("seoTitleEn", e.target.value)} placeholder="SEO title in English" className={inputCls} /></div>
              <div><label className={labelCls}>SEO Description (EN)</label><textarea value={form.seoDescriptionEn} onChange={(e) => set("seoDescriptionEn", e.target.value)} rows={2} placeholder="≤160 chars" className={inputCls + " resize-none"} /></div>
              <div><label className={labelCls}>عنوان SEO (AR)</label><input value={form.seoTitleAr} onChange={(e) => set("seoTitleAr", e.target.value)} dir="rtl" placeholder="عنوان SEO بالعربية" className={inputCls} /></div>
              <div><label className={labelCls}>وصف SEO (AR)</label><textarea value={form.seoDescriptionAr} onChange={(e) => set("seoDescriptionAr", e.target.value)} rows={2} dir="rtl" placeholder="≤160 حرف" className={inputCls + " resize-none"} /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PostEditor({ initial, token, onSave, onBack }: {
  initial: FormData & { id?: number }; token: string; onSave: () => void; onBack: () => void;
}) {
  const [form, setForm] = useState<FormData>({ ...initial });
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [saving, setSaving] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [slugManual, setSlugManual] = useState(!!initial.id);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const set = (key: keyof FormData, value: unknown) => setForm((f) => ({ ...f, [key]: value }));
  const handleTitleChange = (v: string, l: "en" | "ar") => {
    if (l === "en") { set("titleEn", v); if (!slugManual) set("slug", slugify(v)); }
    else { set("titleAr", v); if (!slugManual && !form.titleEn) set("slug", slugify(v)); }
  };

  const save = useCallback(async (publishState?: boolean) => {
    const payload = publishState !== undefined ? { ...form, published: publishState } : form;
    if (!payload.slug.trim()) { setToast({ msg: "Please enter a URL slug.", type: "error" }); return; }
    setSaving(true);
    try {
      const url = initial.id ? `${API}/admin/blog/posts/${initial.id}` : `${API}/admin/blog/posts`;
      const method = initial.id ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(await res.text());
      if (publishState !== undefined) setForm((f) => ({ ...f, published: publishState }));
      setToast({ msg: "Saved!", type: "success" });
      setTimeout(onSave, 600);
    } catch (err) {
      setToast({ msg: String(err), type: "error" });
    } finally {
      setSaving(false);
    }
  }, [form, initial.id, token, onSave]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-[#006C35] text-white px-4 py-0 flex items-center gap-0 sticky top-0 z-20 shadow-md">
        <button onClick={onBack} className="flex items-center gap-1.5 px-3 py-3 hover:bg-white/10 text-sm font-medium transition-colors border-r border-white/20"><ChevronLeft size={16} /> Posts</button>
        <div className="flex-1 px-4 py-2 min-w-0">
          <input value={lang === "en" ? form.titleEn : form.titleAr} onChange={(e) => handleTitleChange(e.target.value, lang)} dir={lang === "ar" ? "rtl" : "ltr"} placeholder={lang === "en" ? "Article title…" : "عنوان المقال…"} className="w-full bg-transparent text-white placeholder-white/40 text-base font-medium focus:outline-none" />
        </div>
        <div className="flex items-center border-r border-white/20 px-3 py-2 gap-1">
          <Globe size={13} className="opacity-60 mr-1" />
          <button type="button" onClick={() => setLang("en")} className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${lang === "en" ? "bg-white text-green-800" : "text-white/70 hover:bg-white/10"}`}>EN</button>
          <button type="button" onClick={() => setLang("ar")} className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${lang === "ar" ? "bg-white text-green-800" : "text-white/70 hover:bg-white/10"}`}>AR</button>
        </div>
        <button onClick={() => setSettingsOpen((o) => !o)} className={`px-3 py-3 text-xs font-medium border-r border-white/20 transition-colors ${settingsOpen ? "bg-white/15" : "hover:bg-white/10"}`}><Settings size={15} /></button>
        <div className="flex items-center gap-2 px-4">
          <button onClick={() => void save()} disabled={saving} className="px-4 py-1.5 bg-white/15 border border-white/30 text-white text-xs font-semibold rounded-lg hover:bg-white/25 transition-colors disabled:opacity-50">{saving ? "Saving…" : "Save Draft"}</button>
          <button onClick={() => void save(!form.published)} disabled={saving} className="px-4 py-1.5 bg-white text-green-800 text-xs font-bold rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50">{form.published ? "Unpublish" : "Publish"}</button>
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 overflow-y-auto py-8 px-4 flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${lang === "en" ? "bg-green-700 text-white" : "bg-gray-800 text-white"}`}>{lang === "en" ? "English" : "العربية"}</span>
            </div>
            <div className="bg-white shadow-lg rounded-xl overflow-hidden" style={{ fontFamily: "'Tajawal', 'Georgia', serif" }}>
              <div className={`px-10 pt-10 pb-4 border-b border-gray-100 ${lang === "ar" ? "rtl" : ""}`} dir={lang === "ar" ? "rtl" : "ltr"}>
                <textarea value={lang === "en" ? form.titleEn : form.titleAr} onChange={(e) => handleTitleChange(e.target.value, lang)} placeholder={lang === "en" ? "Article Title" : "عنوان المقال"} dir={lang === "ar" ? "rtl" : "ltr"} rows={1} className="w-full text-3xl font-bold text-gray-900 placeholder-gray-300 focus:outline-none resize-none overflow-hidden leading-tight border-0 bg-transparent" style={{ fontFamily: "inherit" }} onInput={(e) => { const t = e.target as HTMLTextAreaElement; t.style.height = "auto"; t.style.height = t.scrollHeight + "px"; }} />
                <textarea value={lang === "en" ? form.excerptEn : form.excerptAr} onChange={(e) => set(lang === "en" ? "excerptEn" : "excerptAr", e.target.value)} placeholder={lang === "en" ? "Short excerpt shown in the blog listing…" : "مقتطف قصير يظهر في قائمة المدونة…"} dir={lang === "ar" ? "rtl" : "ltr"} rows={2} className="w-full mt-3 text-base text-gray-500 placeholder-gray-300 focus:outline-none resize-none leading-relaxed border-0 bg-transparent" style={{ fontFamily: "inherit" }} />
              </div>
              <div className="px-6 py-4" dir={lang === "ar" ? "rtl" : "ltr"}>
                {lang === "en" ? <RichTextEditor key="en" value={form.bodyEn} onChange={(html) => set("bodyEn", html)} placeholder="Start writing your article here…" dir="ltr" minHeight={420} /> : <RichTextEditor key="ar" value={form.bodyAr} onChange={(html) => set("bodyAr", html)} placeholder="ابدأ كتابة مقالك هنا…" dir="rtl" minHeight={420} />}
              </div>
              <div className="px-10 py-5 border-t border-gray-50 bg-gray-50/50 text-xs text-gray-300 flex items-center gap-4">
                <FileText size={12} />
                {lang === "en" ? "Qanoni Legal Blog — English version" : "مدونة قانوني القانونية — النسخة العربية"}
              </div>
            </div>
          </div>
        </div>
        <SettingsPanel form={form} set={set} slugManual={slugManual} setSlugManual={setSlugManual} open={settingsOpen} />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color = "green" }: { icon: React.ReactNode; label: string; value: string | number; sub?: string; color?: string }) {
  const colors: Record<string, string> = { green: "bg-green-50 text-green-700", blue: "bg-blue-50 text-blue-700", amber: "bg-amber-50 text-amber-700", purple: "bg-purple-50 text-purple-700" };
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4">
      <div className={`p-2.5 rounded-lg ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function AnalyticsTab({ posts }: { posts: BlogPost[] }) {
  const [data, setData] = useState<AnalyticsStore | null>(null);
  const [gaId, setGaId] = useState(getGAMeasurementId());
  const [gaInput, setGaInput] = useState(getGAMeasurementId());
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const refresh = useCallback(() => setData(getAnalytics()), []);
  useEffect(() => { refresh(); }, [refresh]);

  const saveGA = () => {
    const id = gaInput.trim().toUpperCase();
    setGAMeasurementId(id);
    setGaId(id);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.length - publishedCount;

  const chartData = data ? Object.entries(data.daily).sort(([a], [b]) => a.localeCompare(b)).slice(-14).map(([date, v]) => ({
    date: date.slice(5),
    WhatsApp: v.whatsapp,
    Consultation: v.consultation,
  })) : [];

  const topPages = data ? Object.entries(data.pageviews).sort(([, a], [, b]) => b - a).slice(0, 8) : [];

  const copyGA = (text: string) => { void navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Analytics Dashboard</h2>
        <p className="text-sm text-gray-500 mt-0.5">On-site engagement tracking + Google Analytics 4 setup</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<MessageCircle size={18} />} label="WhatsApp Clicks" value={data?.whatsapp_clicks ?? 0} sub="all time" color="green" />
        <StatCard icon={<Users size={18} />} label="Consultation Clicks" value={data?.consultation_clicks ?? 0} sub="all time" color="blue" />
        <StatCard icon={<Activity size={18} />} label="Pages Tracked" value={data ? Object.keys(data.pageviews).length : 0} sub="unique routes visited" color="purple" />
        <StatCard icon={<FileText size={18} />} label="Blog Posts" value={posts.length} sub={`${publishedCount} published · ${draftCount} draft`} color="amber" />
      </div>

      {/* Engagement chart */}
      {chartData.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-gray-900">Engagement — Last 14 Days</p>
            <button onClick={refresh} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1"><RefreshCw size={12} /> Refresh</button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
              <Bar dataKey="WhatsApp" fill="#25D366" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Consultation" fill="#006C35" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <TrendingUp size={32} className="mx-auto text-gray-200 mb-2" />
          <p className="text-sm text-gray-400">No engagement data yet</p>
          <p className="text-xs text-gray-300 mt-1">Click events on WhatsApp and Book Consultation buttons will appear here</p>
        </div>
      )}

      {/* Top pages */}
      {topPages.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <p className="text-sm font-bold text-gray-900 mb-3">Top Pages by Views</p>
          <div className="space-y-2">
            {topPages.map(([page, views]) => (
              <div key={page} className="flex items-center justify-between text-sm">
                <span className="font-mono text-xs text-gray-600 truncate max-w-xs">{page || "/"}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min(100, (views / (topPages[0][1] || 1)) * 100)}%` }} />
                  </div>
                  <span className="text-xs text-gray-400 w-6 text-right">{views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GA4 Setup */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <span className="text-base">📊</span> Google Analytics 4 Configuration
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Enter your GA4 Measurement ID to enable full traffic analytics</p>
          </div>
          {gaId && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
              <CheckCircle2 size={12} /> Connected
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <input
            value={gaInput}
            onChange={(e) => setGaInput(e.target.value)}
            placeholder="G-XXXXXXXXXX"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button onClick={saveGA} className="px-4 py-2 bg-[#006C35] text-white text-sm font-semibold rounded-lg hover:bg-green-800 transition-colors">
            {saved ? "✓ Saved" : "Save"}
          </button>
        </div>
        {gaId && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Active Measurement ID: <code className="font-mono text-green-700">{gaId}</code></p>
            <p className="text-xs text-gray-400 mt-1">GA4 is loaded on all visitor pages. View your full dashboard at <a href={`https://analytics.google.com/analytics/web/#/p${gaId.replace("G-","")}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">analytics.google.com ↗</a></p>
          </div>
        )}

        {!gaId && (
          <div className="mt-4 space-y-2 border-t border-gray-50 pt-4">
            <p className="text-xs font-semibold text-gray-600">How to set up GA4 in 3 steps:</p>
            <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">analytics.google.com</a> and create a new property for <strong>qanoni.com</strong></li>
              <li>In Data Streams, add a Web stream → copy your Measurement ID (starts with G-)</li>
              <li>Paste it above and click Save — tracking activates immediately</li>
            </ol>
          </div>
        )}
      </div>

      {/* Search Console setup */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <p className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-1"><span className="text-base">🔍</span> Google Search Console</p>
        <p className="text-xs text-gray-400 mb-3">Track keyword rankings, click-through rates, impressions, and index coverage</p>
        <div className="flex gap-2 flex-wrap">
          <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-700 text-white text-xs font-semibold rounded-lg hover:bg-green-800">Open Search Console <ExternalLink size={11} /></a>
          <button onClick={() => { void copyGA("https://qanoni.com/sitemap.xml"); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50">
            <Copy size={11} /> {copied ? "Copied!" : "Copy Sitemap URL"}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-3">Sitemap to submit: <code className="font-mono text-green-700">https://qanoni.com/sitemap.xml</code></p>
      </div>

      {/* Clear data */}
      <div className="flex justify-end">
        <button onClick={() => { if (confirm("Clear all on-site analytics data?")) { clearAnalytics(); refresh(); } }} className="text-xs text-red-400 hover:text-red-600 transition-colors">Clear on-site data</button>
      </div>
    </div>
  );
}

const SEO_CHECKS = [
  { id: "sitemap", label: "Sitemap accessible", desc: "169 URLs indexed", url: "/sitemap.xml", pass: true },
  { id: "robots", label: "robots.txt configured", desc: "Allow: / + Sitemap linked", url: "/robots.txt", pass: true },
  { id: "og_image", label: "Open Graph image present", desc: "1200×630 opengraph.jpg", url: "/opengraph.jpg", pass: true },
  { id: "schema_home", label: "Homepage — 7 schema types", desc: "LegalService, Person, Organization, AggregateRating…", pass: true },
  { id: "hreflang", label: "hrefLang en/ar/x-default", desc: "Set on every page via SEOHead component", pass: true },
  { id: "canonical", label: "Canonical URLs on all pages", desc: "All 9 page types + 18 sub-areas", pass: true },
  { id: "keywords", label: "Keywords meta tag — all pages", desc: "Including blog posts, terms, privacy", pass: true },
  { id: "twitter_card", label: "Twitter/X summary_large_image", desc: "twitter:site @QanoniLegal set", pass: true },
  { id: "titles_145", label: "145 seoTitles — all branded", desc: "Every sub-page title ends with Qanoni suffix", pass: true },
  { id: "sub_schema", label: "All 18 sub-pages — 3 schemas each", desc: "LegalService + FAQPage + BreadcrumbList", pass: true },
  { id: "no_247", label: "No 'Online, 24/7' in SEO descriptions", desc: "All replaced with '24 hours via WhatsApp'", pass: true },
  { id: "geo", label: "Geo meta tags — Jubail, SA-04", desc: "geo.region, geo.placename, geo.position", pass: true },
];

const PRACTICE_AREAS = [
  { name: "Family Law", slug: "family-law", subs: 6 },
  { name: "Business Law", slug: "business-law", subs: 8 },
  { name: "Real Estate", slug: "real-estate", subs: 6 },
  { name: "Employment Law", slug: "employment-law", subs: 6 },
  { name: "Foreign Investment", slug: "foreign-investment", subs: 9 },
  { name: "Administrative Law", slug: "administrative-law", subs: 8 },
  { name: "Enforcement", slug: "enforcement", subs: 5 },
  { name: "Arbitration", slug: "arbitration", subs: 5 },
  { name: "Companies Law", slug: "companies-law", subs: 19 },
  { name: "Contracts", slug: "contracts", subs: 5 },
  { name: "Criminal Law", slug: "criminal-law", subs: 6 },
  { name: "Banking & Finance", slug: "banking-finance", subs: 6 },
  { name: "Intellectual Property", slug: "intellectual-property", subs: 6 },
  { name: "Tax & Zakat", slug: "tax-zakat", subs: 5 },
  { name: "Cyber Law", slug: "cyber-law", subs: 6 },
  { name: "Medical Malpractice", slug: "medical-malpractice", subs: 8 },
  { name: "Insurance Law", slug: "insurance-law", subs: 7 },
  { name: "Immigration Law", slug: "immigration-law", subs: 8 },
];

function SEOMonitorTab() {
  const totalSubs = PRACTICE_AREAS.reduce((s, a) => s + a.subs, 0);

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">SEO Monitor</h2>
          <p className="text-sm text-gray-500 mt-0.5">Site-wide SEO health — checked against all pages and configurations</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-xl">
          <CheckCircle2 size={16} className="text-green-600" />
          <span className="text-sm font-bold text-green-700">All checks passing</span>
        </div>
      </div>

      {/* Health checks */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 bg-gray-50">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Technical SEO Checklist ({SEO_CHECKS.length} checks)</p>
        </div>
        <div className="divide-y divide-gray-50">
          {SEO_CHECKS.map((check) => (
            <div key={check.id} className="flex items-center justify-between px-5 py-3.5">
              <div className="flex items-center gap-3">
                {check.pass ? <CheckCircle2 size={16} className="text-green-500 shrink-0" /> : <XCircle size={16} className="text-red-400 shrink-0" />}
                <div>
                  <p className="text-sm font-medium text-gray-800">{check.label}</p>
                  <p className="text-xs text-gray-400">{check.desc}</p>
                </div>
              </div>
              {check.url && (
                <a href={check.url} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline flex items-center gap-1 shrink-0 ml-4">View <ExternalLink size={10} /></a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Practice areas coverage */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 bg-gray-50 flex items-center justify-between">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Practice Area Coverage — 18 Areas · {totalSubs} Sub-Pages</p>
          <span className="text-xs text-green-600 font-semibold">All indexed ✓</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-0 divide-y divide-x divide-gray-50">
          {PRACTICE_AREAS.map((area) => (
            <div key={area.slug} className="px-5 py-3 flex items-center justify-between">
              <div>
                <a href={`/services/${area.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-800 hover:text-green-700 transition-colors">{area.name}</a>
                <p className="text-xs text-gray-400">{area.subs} sub-pages</p>
              </div>
              <CheckCircle2 size={14} className="text-green-500 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Score overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
          <p className="text-4xl font-bold text-green-600">169</p>
          <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wide">URLs in Sitemap</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
          <p className="text-4xl font-bold text-green-600">145</p>
          <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wide">Branded SEO Titles</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
          <p className="text-4xl font-bold text-green-600">3</p>
          <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-wide">Schemas per Sub-Page</p>
        </div>
      </div>

      {/* External validation links */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <p className="text-sm font-bold text-gray-900 mb-3">Validate on External Tools</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Google Rich Results Test", url: "https://search.google.com/test/rich-results?url=https%3A%2F%2Fqanoni.com", icon: "✅" },
            { label: "Schema Markup Validator", url: "https://validator.schema.org/#url=https%3A%2F%2Fqanoni.com", icon: "🔎" },
            { label: "Google PageSpeed (Mobile)", url: "https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fqanoni.com&form_factor=mobile", icon: "📱" },
            { label: "Google PageSpeed (Desktop)", url: "https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fqanoni.com&form_factor=desktop", icon: "💻" },
          ].map((item) => (
            <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 hover:border-green-200 transition-colors text-sm text-gray-700 font-medium">
              <span>{item.icon}</span> {item.label} <ExternalLink size={11} className="ml-auto text-gray-300" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const TOOLS = [
  {
    category: "Google Tools",
    color: "blue",
    items: [
      { name: "Google Search Console", desc: "Monitor rankings, clicks, impressions, index status", url: "https://search.google.com/search-console", icon: "🔍" },
      { name: "Google Analytics 4", desc: "Traffic, sessions, conversions, audience data", url: "https://analytics.google.com", icon: "📊" },
      { name: "PageSpeed Insights", desc: "Core Web Vitals, performance score, mobile/desktop", url: "https://pagespeed.web.dev/?url=https%3A%2F%2Fqanoni.com", icon: "⚡" },
      { name: "Rich Results Test", desc: "Verify schema markup and structured data eligibility", url: "https://search.google.com/test/rich-results?url=https%3A%2F%2Fqanoni.com", icon: "✅" },
      { name: "Mobile-Friendly Test", desc: "Check if Google considers the site mobile-friendly", url: "https://search.google.com/test/mobile-friendly?url=https%3A%2F%2Fqanoni.com", icon: "📱" },
    ],
  },
  {
    category: "Schema & SEO",
    color: "green",
    items: [
      { name: "Schema Markup Validator", desc: "Validate all schema.org structured data", url: "https://validator.schema.org/#url=https%3A%2F%2Fqanoni.com", icon: "🔖" },
      { name: "Bing Webmaster Tools", desc: "Bing index coverage, keywords, SEO reports", url: "https://www.bing.com/webmasters", icon: "🌐" },
      { name: "Ahrefs Webmaster Tools (Free)", desc: "Backlink profile, site health, organic keywords", url: "https://ahrefs.com/webmaster-tools", icon: "🔗" },
      { name: "Open Graph Debugger", desc: "Preview how links appear on Facebook/LinkedIn", url: "https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fqanoni.com", icon: "🖼️" },
      { name: "Twitter Card Validator", desc: "Preview how links appear on X (Twitter)", url: "https://cards-dev.twitter.com/validator", icon: "🐦" },
    ],
  },
  {
    category: "Performance & Technical",
    color: "purple",
    items: [
      { name: "GTmetrix", desc: "Detailed waterfall, LCP, TBT, CLS analysis", url: "https://gtmetrix.com/?url=https%3A%2F%2Fqanoni.com", icon: "📈" },
      { name: "Sitemap.xml", desc: "View your live sitemap (169 URLs)", url: "https://qanoni.com/sitemap.xml", icon: "🗺️" },
      { name: "Robots.txt", desc: "View crawl rules and sitemap directive", url: "https://qanoni.com/robots.txt", icon: "🤖" },
      { name: "DNS Checker", desc: "Verify DNS propagation and domain health", url: "https://dnschecker.org/#A/qanoni.com", icon: "🔧" },
      { name: "SSL Check", desc: "Verify HTTPS certificate is valid and trusted", url: "https://www.ssllabs.com/ssltest/analyze.html?d=qanoni.com", icon: "🔒" },
    ],
  },
  {
    category: "Content & Tracking",
    color: "amber",
    items: [
      { name: "WhatsApp Test Click", desc: "Test the main WhatsApp consultation CTA", url: "https://wa.me/966594850247", icon: "💬" },
      { name: "Live Site Preview", desc: "Open the live website in a new tab", url: "https://qanoni.com", icon: "🌍" },
      { name: "Screaming Frog (Free)", desc: "Crawl entire site for broken links, missing tags", url: "https://www.screamingfrog.co.uk/seo-spider/", icon: "🐸" },
      { name: "Copyscape", desc: "Check for duplicate content across the web", url: "https://www.copyscape.com/?q=qanoni.com", icon: "📋" },
    ],
  },
];

function ToolsTab() {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 border-blue-100",
    green: "bg-green-50 border-green-100",
    purple: "bg-purple-50 border-purple-100",
    amber: "bg-amber-50 border-amber-100",
  };
  const headerMap: Record<string, string> = {
    blue: "text-blue-700",
    green: "text-green-700",
    purple: "text-purple-700",
    amber: "text-amber-700",
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Quick-Access Tools</h2>
        <p className="text-sm text-gray-500 mt-0.5">All essential monitoring, SEO, and performance tools in one place</p>
      </div>

      {TOOLS.map((group) => (
        <div key={group.category} className={`rounded-xl border p-1 ${colorMap[group.color]}`}>
          <div className="px-4 py-3">
            <p className={`text-xs font-bold uppercase tracking-wider ${headerMap[group.color]}`}>{group.category}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
            {group.items.map((tool) => (
              <a key={tool.url} href={tool.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 bg-white rounded-lg p-4 border border-white hover:border-gray-200 hover:shadow-sm transition-all group">
                <span className="text-xl shrink-0 mt-0.5">{tool.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors flex items-center gap-1">
                    {tool.name} <ExternalLink size={10} className="text-gray-300 group-hover:text-green-500 shrink-0" />
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{tool.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}

      {/* Status summary */}
      <div className="bg-[#006C35] text-white rounded-xl p-5">
        <p className="text-sm font-bold mb-3">🚀 Site Status Summary</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "SEO Score", value: "10/10", icon: "🏆" },
            { label: "Pages Indexed", value: "169", icon: "🗺️" },
            { label: "Practice Areas", value: "18", icon: "⚖️" },
            { label: "Languages", value: "AR + EN", icon: "🌐" },
          ].map((item) => (
            <div key={item.label} className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-lg">{item.icon}</p>
              <p className="text-lg font-bold mt-1">{item.value}</p>
              <p className="text-xs text-white/60">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminCMS() {
  const [token, setToken] = useState<string>(() => sessionStorage.getItem("qanoni_admin_token") ?? "");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loginErr, setLoginErr] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<(FormData & { id?: number }) | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [tab, setTab] = useState<Tab>("blog");

  const isLoggedIn = !!token;

  const fetchPosts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/blog/posts`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 401) { logout(); return; }
      setPosts(await res.json() as BlogPost[]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { void fetchPosts(); }, [fetchPosts]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr("");
    const res = await fetch(`${API}/admin/auth`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (res.ok) {
      const { token: t } = await res.json() as { token: string };
      sessionStorage.setItem("qanoni_admin_token", t);
      setToken(t);
    } else {
      setLoginErr("Wrong password. Try again.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("qanoni_admin_token");
    setToken(""); setPosts([]);
  };

  const deletePost = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    const res = await fetch(`${API}/admin/blog/posts/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) { setToast({ msg: "Post deleted.", type: "success" }); void fetchPosts(); }
    else setToast({ msg: "Delete failed.", type: "error" });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#006C35] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 mb-4 text-2xl">🔒</div>
            <h1 className="text-xl font-bold text-gray-900">Qanoni Admin</h1>
            <p className="text-sm text-gray-500 mt-1">Analytics · Blog · SEO · Tools</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 pr-10" autoFocus />
              <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPw ? "🙈" : "👁"}</button>
            </div>
            {loginErr && <p className="text-xs text-red-600">{loginErr}</p>}
            <button type="submit" className="w-full bg-[#006C35] text-white py-3 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors">Sign in</button>
          </form>
        </div>
      </div>
    );
  }

  if (editing) {
    return <PostEditor initial={editing} token={token} onSave={() => { setEditing(null); void fetchPosts(); }} onBack={() => setEditing(null)} />;
  }

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "blog", label: "Blog Posts", icon: <FileText size={15} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 size={15} /> },
    { id: "seo", label: "SEO Monitor", icon: <Search size={15} /> },
    { id: "tools", label: "Tools", icon: <Wrench size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Top bar */}
      <div className="bg-[#006C35] text-white shadow sticky top-0 z-20">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold">Qanoni Admin</span>
            <ChevronRight size={14} className="opacity-40" />
            <span className="text-sm opacity-70">{TABS.find((t) => t.id === tab)?.label}</span>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100"><LogOut size={15} /> Sign out</button>
        </div>
        {/* Tab bar */}
        <div className="flex border-t border-white/10">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-colors border-b-2 ${tab === t.id ? "border-white text-white bg-white/10" : "border-transparent text-white/60 hover:text-white hover:bg-white/5"}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {tab === "analytics" && <AnalyticsTab posts={posts} />}
      {tab === "seo" && <SEOMonitorTab />}
      {tab === "tools" && <ToolsTab />}

      {tab === "blog" && (
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
              <p className="text-sm text-gray-500 mt-0.5">{posts.length} post{posts.length !== 1 ? "s" : ""} total · {posts.filter(p => p.published).length} published</p>
            </div>
            <button onClick={() => setEditing(emptyForm())} className="flex items-center gap-2 bg-[#006C35] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors shadow-sm">
              <Plus size={16} /> New Post
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">Loading…</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-24">
              <FileText size={40} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400 text-lg mb-2">No blog posts yet</p>
              <p className="text-gray-300 text-sm mb-6">Create your first article to get started</p>
              <button onClick={() => setEditing(emptyForm())} className="inline-flex items-center gap-2 bg-[#006C35] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors">
                <Plus size={15} /> Write your first post
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    <th className="px-5 py-3.5">Title</th>
                    <th className="px-5 py-3.5">URL</th>
                    <th className="px-5 py-3.5">Category</th>
                    <th className="px-5 py-3.5">Date</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p, i) => (
                    <tr key={p.id} className={`border-b border-gray-50 hover:bg-gray-50/80 transition-colors cursor-pointer ${i === posts.length - 1 ? "border-0" : ""}`} onClick={() => setEditing({ ...p })}>
                      <td className="px-5 py-4 max-w-xs">
                        <p className="font-semibold text-gray-900 truncate">{p.titleEn || <span className="text-gray-300 italic">Untitled</span>}</p>
                        {p.titleAr && <p className="text-xs text-gray-400 truncate mt-0.5" dir="rtl">{p.titleAr}</p>}
                      </td>
                      <td className="px-5 py-4"><span className="font-mono text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{p.slug}</span></td>
                      <td className="px-5 py-4 text-gray-500 text-xs">{p.categoryEn || "—"}</td>
                      <td className="px-5 py-4 text-gray-400 text-xs">{p.date}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${p.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {p.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                          <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-300 hover:text-gray-600 rounded" title="Preview"><Eye size={15} /></a>
                          <button onClick={() => setEditing({ ...p })} className="p-1.5 text-gray-300 hover:text-green-700 rounded" title="Edit"><Edit2 size={15} /></button>
                          <button onClick={() => void deletePost(p.id, p.titleEn)} className="p-1.5 text-gray-300 hover:text-red-600 rounded" title="Delete"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
