import { useState, useEffect, useCallback } from "react";
import {
  Plus, Edit2, Trash2, LogOut, Eye, ChevronRight,
  X, Save, AlertCircle, CheckCircle, Globe, ChevronDown,
  ChevronLeft, FileText, Settings,
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

const API = "/api";

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

function SettingsPanel({
  form,
  set,
  slugManual,
  setSlugManual,
  open,
}: {
  form: FormData;
  set: (k: keyof FormData, v: unknown) => void;
  slugManual: boolean;
  setSlugManual: (v: boolean) => void;
  open: boolean;
}) {
  const [seoOpen, setSeoOpen] = useState(false);
  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-600 bg-white";
  const labelCls = "block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1";

  if (!open) return null;

  return (
    <div className="w-72 shrink-0 bg-white border-l border-gray-100 overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
          <Settings size={12} /> Post Settings
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Status */}
        <div>
          <label className={labelCls}>Status</label>
          <div
            onClick={() => set("published", !form.published)}
            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${form.published ? "border-green-300 bg-green-50" : "border-gray-200 bg-gray-50"}`}
          >
            <div>
              <p className={`text-xs font-semibold ${form.published ? "text-green-700" : "text-gray-600"}`}>
                {form.published ? "Published" : "Draft"}
              </p>
              <p className="text-[10px] text-gray-400">{form.published ? "Visible on site" : "Not visible"}</p>
            </div>
            <div className={`w-9 h-5 rounded-full relative transition-colors ${form.published ? "bg-green-600" : "bg-gray-300"}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? "translate-x-4" : "translate-x-0.5"}`} />
            </div>
          </div>
        </div>

        {/* URL */}
        <div>
          <label className={labelCls}>URL Slug</label>
          <div className="flex gap-1.5">
            <input
              value={form.slug}
              onChange={(e) => { setSlugManual(true); set("slug", e.target.value); }}
              placeholder="article-url"
              className={inputCls + " font-mono"}
            />
            <button
              type="button"
              onClick={() => { setSlugManual(false); set("slug", slugify(form.titleEn || form.titleAr)); }}
              title="Auto-generate from title"
              className="shrink-0 px-2 text-[10px] text-green-700 font-bold border border-green-200 rounded-lg hover:bg-green-50"
            >
              Auto
            </button>
          </div>
          {form.slug && (
            <p className="text-[10px] text-gray-400 mt-1 font-mono truncate">qanoni.com/blog/{form.slug}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className={labelCls}>Publish Date</label>
          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
        </div>

        {/* Read time */}
        <div>
          <label className={labelCls}>Read Time (min)</label>
          <input type="number" min={1} max={60} value={form.readTime} onChange={(e) => set("readTime", Number(e.target.value))} className={inputCls} />
        </div>

        {/* Category */}
        <div>
          <label className={labelCls}>Category</label>
          <input value={form.categoryEn} onChange={(e) => set("categoryEn", e.target.value)} placeholder="Family Law" className={inputCls + " mb-1.5"} />
          <input value={form.categoryAr} onChange={(e) => set("categoryAr", e.target.value)} placeholder="قانون الأسرة" dir="rtl" className={inputCls} />
        </div>

        {/* SEO accordion */}
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setSeoOpen((o) => !o)}
            className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 text-[10px] font-bold text-gray-600 uppercase tracking-wide"
          >
            SEO
            <ChevronDown size={12} className={`transition-transform ${seoOpen ? "rotate-180" : ""}`} />
          </button>
          {seoOpen && (
            <div className="p-3 space-y-3">
              <div>
                <label className={labelCls}>SEO Title (EN)</label>
                <input value={form.seoTitleEn} onChange={(e) => set("seoTitleEn", e.target.value)} placeholder="SEO title in English" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>SEO Description (EN)</label>
                <textarea value={form.seoDescriptionEn} onChange={(e) => set("seoDescriptionEn", e.target.value)} rows={2} placeholder="≤160 chars" className={inputCls + " resize-none"} />
              </div>
              <div>
                <label className={labelCls}>عنوان SEO (AR)</label>
                <input value={form.seoTitleAr} onChange={(e) => set("seoTitleAr", e.target.value)} dir="rtl" placeholder="عنوان SEO بالعربية" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>وصف SEO (AR)</label>
                <textarea value={form.seoDescriptionAr} onChange={(e) => set("seoDescriptionAr", e.target.value)} rows={2} dir="rtl" placeholder="≤160 حرف" className={inputCls + " resize-none"} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PostEditor({
  initial,
  token,
  onSave,
  onBack,
}: {
  initial: FormData & { id?: number };
  token: string;
  onSave: () => void;
  onBack: () => void;
}) {
  const [form, setForm] = useState<FormData>({ ...initial });
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [saving, setSaving] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [slugManual, setSlugManual] = useState(!!initial.id);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const set = (key: keyof FormData, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleTitleChange = (v: string, l: "en" | "ar") => {
    if (l === "en") {
      set("titleEn", v);
      if (!slugManual) set("slug", slugify(v));
    } else {
      set("titleAr", v);
      if (!slugManual && !form.titleEn) set("slug", slugify(v));
    }
  };

  const save = useCallback(async (publishState?: boolean) => {
    const payload = publishState !== undefined ? { ...form, published: publishState } : form;
    if (!payload.slug.trim()) {
      setToast({ msg: "Please enter a URL slug.", type: "error" });
      return;
    }
    setSaving(true);
    try {
      const url = initial.id ? `${API}/admin/blog/posts/${initial.id}` : `${API}/admin/blog/posts`;
      const method = initial.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
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

      {/* Top bar — Word-like ribbon */}
      <div className="bg-[#006C35] text-white px-4 py-0 flex items-center gap-0 sticky top-0 z-20 shadow-md">
        {/* Back */}
        <button onClick={onBack} className="flex items-center gap-1.5 px-3 py-3 hover:bg-white/10 text-sm font-medium transition-colors border-r border-white/20">
          <ChevronLeft size={16} /> Posts
        </button>

        {/* Title */}
        <div className="flex-1 px-4 py-2 min-w-0">
          <input
            value={lang === "en" ? form.titleEn : form.titleAr}
            onChange={(e) => handleTitleChange(e.target.value, lang)}
            dir={lang === "ar" ? "rtl" : "ltr"}
            placeholder={lang === "en" ? "Article title…" : "عنوان المقال…"}
            className="w-full bg-transparent text-white placeholder-white/40 text-base font-medium focus:outline-none"
          />
        </div>

        {/* Language toggle */}
        <div className="flex items-center border-r border-white/20 px-3 py-2 gap-1">
          <Globe size={13} className="opacity-60 mr-1" />
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${lang === "en" ? "bg-white text-green-800" : "text-white/70 hover:bg-white/10"}`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("ar")}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${lang === "ar" ? "bg-white text-green-800" : "text-white/70 hover:bg-white/10"}`}
          >
            AR
          </button>
        </div>

        {/* Settings toggle */}
        <button
          onClick={() => setSettingsOpen((o) => !o)}
          className={`px-3 py-3 text-xs font-medium border-r border-white/20 transition-colors ${settingsOpen ? "bg-white/15" : "hover:bg-white/10"}`}
        >
          <Settings size={15} />
        </button>

        {/* Save / Publish */}
        <div className="flex items-center gap-2 px-4">
          <button
            onClick={() => void save()}
            disabled={saving}
            className="px-4 py-1.5 bg-white/15 border border-white/30 text-white text-xs font-semibold rounded-lg hover:bg-white/25 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Draft"}
          </button>
          <button
            onClick={() => void save(!form.published)}
            disabled={saving}
            className="px-4 py-1.5 bg-white text-green-800 text-xs font-bold rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50"
          >
            {form.published ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Document area */}
        <div className="flex-1 overflow-y-auto py-8 px-4 flex justify-center">
          <div className="w-full max-w-3xl">

            {/* Lang badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${lang === "en" ? "bg-green-700 text-white" : "bg-gray-800 text-white"}`}>
                {lang === "en" ? "English" : "العربية"}
              </span>
              {lang === "en" && !form.titleEn && (
                <span className="text-xs text-gray-400">Writing in English</span>
              )}
              {lang === "ar" && !form.titleAr && (
                <span className="text-xs text-gray-400">الكتابة بالعربية</span>
              )}
            </div>

            {/* Paper */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden" style={{ fontFamily: "'Tajawal', 'Georgia', serif" }}>
              {/* Title area */}
              <div className={`px-10 pt-10 pb-4 border-b border-gray-100 ${lang === "ar" ? "rtl" : ""}`} dir={lang === "ar" ? "rtl" : "ltr"}>
                <textarea
                  value={lang === "en" ? form.titleEn : form.titleAr}
                  onChange={(e) => handleTitleChange(e.target.value, lang)}
                  placeholder={lang === "en" ? "Article Title" : "عنوان المقال"}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  rows={1}
                  className="w-full text-3xl font-bold text-gray-900 placeholder-gray-300 focus:outline-none resize-none overflow-hidden leading-tight border-0 bg-transparent"
                  style={{ fontFamily: "inherit" }}
                  onInput={(e) => {
                    const t = e.target as HTMLTextAreaElement;
                    t.style.height = "auto";
                    t.style.height = t.scrollHeight + "px";
                  }}
                />
                <textarea
                  value={lang === "en" ? form.excerptEn : form.excerptAr}
                  onChange={(e) => set(lang === "en" ? "excerptEn" : "excerptAr", e.target.value)}
                  placeholder={lang === "en" ? "Short excerpt shown in the blog listing…" : "مقتطف قصير يظهر في قائمة المدونة…"}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  rows={2}
                  className="w-full mt-3 text-base text-gray-500 placeholder-gray-300 focus:outline-none resize-none leading-relaxed border-0 bg-transparent"
                  style={{ fontFamily: "inherit" }}
                />
              </div>

              {/* Rich text body */}
              <div className="px-6 py-4" dir={lang === "ar" ? "rtl" : "ltr"}>
                {lang === "en" ? (
                  <RichTextEditor
                    key="en"
                    value={form.bodyEn}
                    onChange={(html) => set("bodyEn", html)}
                    placeholder="Start writing your article here…"
                    dir="ltr"
                    minHeight={420}
                  />
                ) : (
                  <RichTextEditor
                    key="ar"
                    value={form.bodyAr}
                    onChange={(html) => set("bodyAr", html)}
                    placeholder="ابدأ كتابة مقالك هنا…"
                    dir="rtl"
                    minHeight={420}
                  />
                )}
              </div>

              <div className="px-10 py-5 border-t border-gray-50 bg-gray-50/50 text-xs text-gray-300 flex items-center gap-4">
                <FileText size={12} />
                {lang === "en" ? "Qanoni Legal Blog — English version" : "مدونة قانوني القانونية — النسخة العربية"}
              </div>
            </div>
          </div>
        </div>

        {/* Right settings panel */}
        <SettingsPanel
          form={form}
          set={set}
          slugManual={slugManual}
          setSlugManual={setSlugManual}
          open={settingsOpen}
        />
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
    const res = await fetch(`${API}/admin/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
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
    setToken("");
    setPosts([]);
  };

  const deletePost = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    const res = await fetch(`${API}/admin/blog/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setToast({ msg: "Post deleted.", type: "success" });
      void fetchPosts();
    } else {
      setToast({ msg: "Delete failed.", type: "error" });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#006C35] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 mb-4 text-2xl">🔒</div>
            <h1 className="text-xl font-bold text-gray-900">Qanoni CMS</h1>
            <p className="text-sm text-gray-500 mt-1">Admin access only</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 pr-10"
                autoFocus
              />
              <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
            {loginErr && <p className="text-xs text-red-600">{loginErr}</p>}
            <button type="submit" className="w-full bg-[#006C35] text-white py-3 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (editing) {
    return (
      <PostEditor
        initial={editing}
        token={token}
        onSave={() => { setEditing(null); void fetchPosts(); }}
        onBack={() => setEditing(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Top bar */}
      <div className="bg-[#006C35] text-white px-6 py-4 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">Qanoni CMS</span>
          <ChevronRight size={14} className="opacity-50" />
          <span className="text-sm opacity-80">Blog Posts</span>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100">
          <LogOut size={15} /> Sign out
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
            <p className="text-sm text-gray-500 mt-0.5">{posts.length} post{posts.length !== 1 ? "s" : ""} total</p>
          </div>
          <button
            onClick={() => setEditing(emptyForm())}
            className="flex items-center gap-2 bg-[#006C35] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors shadow-sm"
          >
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
            <button
              onClick={() => setEditing(emptyForm())}
              className="inline-flex items-center gap-2 bg-[#006C35] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors"
            >
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
                  <tr
                    key={p.id}
                    className={`border-b border-gray-50 hover:bg-gray-50/80 transition-colors cursor-pointer ${i === posts.length - 1 ? "border-0" : ""}`}
                    onClick={() => setEditing({ ...p })}
                  >
                    <td className="px-5 py-4 max-w-xs">
                      <p className="font-semibold text-gray-900 truncate">{p.titleEn || <span className="text-gray-300 italic">Untitled</span>}</p>
                      {p.titleAr && <p className="text-xs text-gray-400 truncate mt-0.5" dir="rtl">{p.titleAr}</p>}
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{p.slug}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{p.categoryEn || "—"}</td>
                    <td className="px-5 py-4 text-gray-400 text-xs">{p.date}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${p.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                        <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-300 hover:text-gray-600 rounded" title="Preview">
                          <Eye size={15} />
                        </a>
                        <button onClick={() => setEditing({ ...p })} className="p-1.5 text-gray-300 hover:text-green-700 rounded" title="Edit">
                          <Edit2 size={15} />
                        </button>
                        <button onClick={() => void deletePost(p.id, p.titleEn)} className="p-1.5 text-gray-300 hover:text-red-600 rounded" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
