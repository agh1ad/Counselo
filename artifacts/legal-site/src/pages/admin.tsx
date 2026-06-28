import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, LogOut, Eye, EyeOff, ChevronRight, X, Save, AlertCircle, CheckCircle } from "lucide-react";

const API = "/api";

type BlogSection = { heading?: string; body: string };

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
  contentEn: BlogSection[];
  contentAr: BlogSection[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

type FormData = Omit<BlogPost, "id" | "createdAt" | "updatedAt">;

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
  contentEn: [{ heading: "", body: "" }],
  contentAr: [{ heading: "", body: "" }],
  published: false,
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function Toast({ msg, type, onClose }: { msg: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${type === "success" ? "bg-green-700 text-white" : "bg-red-600 text-white"}`}>
      {type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {msg}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100"><X size={14} /></button>
    </div>
  );
}

function SectionEditor({
  sections,
  onChange,
  lang,
}: {
  sections: BlogSection[];
  onChange: (s: BlogSection[]) => void;
  lang: "en" | "ar";
}) {
  const isAr = lang === "ar";
  const addSection = () => onChange([...sections, { heading: "", body: "" }]);
  const removeSection = (i: number) => onChange(sections.filter((_, idx) => idx !== i));
  const updateSection = (i: number, field: keyof BlogSection, value: string) => {
    const updated = [...sections];
    updated[i] = { ...updated[i], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {sections.map((s, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-3 bg-gray-50 relative">
          <button
            type="button"
            onClick={() => removeSection(i)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          >
            <X size={14} />
          </button>
          <p className="text-xs font-medium text-gray-500 mb-2">Section {i + 1}</p>
          <input
            value={s.heading ?? ""}
            onChange={(e) => updateSection(i, "heading", e.target.value)}
            placeholder={isAr ? "العنوان (اختياري)" : "Heading (optional)"}
            dir={isAr ? "rtl" : "ltr"}
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-green-600 bg-white"
          />
          <textarea
            value={s.body}
            onChange={(e) => updateSection(i, "body", e.target.value)}
            placeholder={isAr ? "نص الفقرة *" : "Paragraph text *"}
            dir={isAr ? "rtl" : "ltr"}
            rows={4}
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-600 bg-white resize-y"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addSection}
        className="flex items-center gap-1.5 text-sm text-green-700 font-medium hover:text-green-900"
      >
        <Plus size={14} /> {isAr ? "إضافة فقرة" : "Add section"}
      </button>
    </div>
  );
}

function PostForm({
  initial,
  token,
  onSave,
  onCancel,
}: {
  initial: FormData & { id?: number };
  token: string;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<FormData>({ ...initial });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [slugManual, setSlugManual] = useState(!!initial.id);

  const set = (key: keyof FormData, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleTitleEn = (v: string) => {
    set("titleEn", v);
    if (!slugManual) set("slug", slugify(v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug.trim() || !form.titleEn.trim()) {
      setToast({ msg: "Slug and English title are required.", type: "error" });
      return;
    }
    setSaving(true);
    try {
      const url = initial.id
        ? `${API}/admin/blog/posts/${initial.id}`
        : `${API}/admin/blog/posts`;
      const method = initial.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      setToast({ msg: initial.id ? "Post updated!" : "Post created!", type: "success" });
      setTimeout(onSave, 800);
    } catch (err) {
      setToast({ msg: String(err), type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <div className="fixed inset-0 z-40 bg-black/40 flex items-start justify-center overflow-y-auto py-8 px-4">
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-gray-900">
            {initial.id ? "Edit Post" : "New Blog Post"}
          </h2>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-sm text-gray-600">Published</span>
              <div
                onClick={() => set("published", !form.published)}
                className={`w-10 h-5 rounded-full transition-colors relative ${form.published ? "bg-green-600" : "bg-gray-300"}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.published ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
            </label>
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Row: Slug + Date + ReadTime */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Slug *</label>
              <div className="flex gap-2">
                <input
                  value={form.slug}
                  onChange={(e) => {
                    setSlugManual(true);
                    set("slug", e.target.value);
                  }}
                  placeholder="my-article-slug"
                  className={inputCls}
                  required
                />
                <button
                  type="button"
                  onClick={() => { setSlugManual(false); set("slug", slugify(form.titleEn)); }}
                  className="shrink-0 text-xs text-green-700 font-medium px-2 border border-green-200 rounded-lg hover:bg-green-50"
                >
                  Auto
                </button>
              </div>
            </div>
            <div>
              <label className={labelCls}>Date *</label>
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} required />
            </div>
          </div>

          {/* Row: Categories + ReadTime */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Category (EN)</label>
              <input value={form.categoryEn} onChange={(e) => set("categoryEn", e.target.value)} placeholder="Family Law" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Category (AR)</label>
              <input value={form.categoryAr} onChange={(e) => set("categoryAr", e.target.value)} placeholder="قانون الأسرة" dir="rtl" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Read time (min)</label>
              <input type="number" min={1} max={60} value={form.readTime} onChange={(e) => set("readTime", Number(e.target.value))} className={inputCls} />
            </div>
          </div>

          {/* Two-column: EN | AR */}
          <div className="grid grid-cols-2 gap-6 pt-2 border-t border-gray-100">
            {/* EN column */}
            <div className="space-y-4">
              <p className="text-sm font-bold text-green-700 uppercase tracking-wide">English</p>
              <div>
                <label className={labelCls}>Title (EN) *</label>
                <input value={form.titleEn} onChange={(e) => handleTitleEn(e.target.value)} className={inputCls} required placeholder="Post title in English" />
              </div>
              <div>
                <label className={labelCls}>Excerpt (EN)</label>
                <textarea value={form.excerptEn} onChange={(e) => set("excerptEn", e.target.value)} rows={3} className={inputCls + " resize-y"} placeholder="Short description shown in the blog list" />
              </div>
              <div>
                <label className={labelCls}>SEO Title (EN)</label>
                <input value={form.seoTitleEn} onChange={(e) => set("seoTitleEn", e.target.value)} className={inputCls} placeholder="SEO-optimised title" />
              </div>
              <div>
                <label className={labelCls}>SEO Description (EN)</label>
                <textarea value={form.seoDescriptionEn} onChange={(e) => set("seoDescriptionEn", e.target.value)} rows={2} className={inputCls + " resize-y"} placeholder="Meta description (≤160 chars)" />
              </div>
              <div>
                <label className={labelCls}>Content Sections (EN)</label>
                <SectionEditor sections={form.contentEn} onChange={(s) => set("contentEn", s)} lang="en" />
              </div>
            </div>

            {/* AR column */}
            <div className="space-y-4">
              <p className="text-sm font-bold text-green-700 uppercase tracking-wide">العربية</p>
              <div>
                <label className={labelCls}>العنوان (AR)</label>
                <input value={form.titleAr} onChange={(e) => set("titleAr", e.target.value)} dir="rtl" className={inputCls} placeholder="عنوان المقال بالعربية" />
              </div>
              <div>
                <label className={labelCls}>المقتطف (AR)</label>
                <textarea value={form.excerptAr} onChange={(e) => set("excerptAr", e.target.value)} rows={3} dir="rtl" className={inputCls + " resize-y"} placeholder="وصف مختصر يظهر في قائمة المدونة" />
              </div>
              <div>
                <label className={labelCls}>عنوان SEO (AR)</label>
                <input value={form.seoTitleAr} onChange={(e) => set("seoTitleAr", e.target.value)} dir="rtl" className={inputCls} placeholder="العنوان المُحسَّن لمحركات البحث" />
              </div>
              <div>
                <label className={labelCls}>وصف SEO (AR)</label>
                <textarea value={form.seoDescriptionAr} onChange={(e) => set("seoDescriptionAr", e.target.value)} rows={2} dir="rtl" className={inputCls + " resize-y"} placeholder="وصف ميتا (≤160 حرف)" />
              </div>
              <div>
                <label className={labelCls}>أقسام المحتوى (AR)</label>
                <SectionEditor sections={form.contentAr} onChange={(s) => set("contentAr", s)} lang="ar" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-2xl">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-green-700 text-white text-sm font-semibold rounded-lg hover:bg-green-800 disabled:opacity-50 transition-colors"
          >
            <Save size={15} />
            {saving ? "Saving…" : initial.id ? "Update Post" : "Create Post"}
          </button>
        </div>
      </form>
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
      const res = await fetch(`${API}/admin/blog/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-50 mb-4">
              <span className="text-2xl">🔒</span>
            </div>
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
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {loginErr && <p className="text-xs text-red-600">{loginErr}</p>}
            <button
              type="submit"
              className="w-full bg-[#006C35] text-white py-3 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      {editing && (
        <PostForm
          initial={editing}
          token={token}
          onSave={() => { setEditing(null); void fetchPosts(); }}
          onCancel={() => setEditing(null)}
        />
      )}

      {/* Top bar */}
      <div className="bg-[#006C35] text-white px-6 py-4 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">Qanoni CMS</span>
          <ChevronRight size={14} className="opacity-50" />
          <span className="text-sm opacity-80">Blog Posts</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity"
        >
          <LogOut size={15} /> Sign out
        </button>
      </div>

      {/* Main */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
            <p className="text-sm text-gray-500 mt-0.5">{posts.length} post{posts.length !== 1 ? "s" : ""} total</p>
          </div>
          <button
            onClick={() => setEditing(emptyForm())}
            className="flex items-center gap-2 bg-[#006C35] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors"
          >
            <Plus size={16} /> New Post
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading…</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No blog posts yet.</p>
            <button
              onClick={() => setEditing(emptyForm())}
              className="flex items-center gap-2 mx-auto bg-[#006C35] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors"
            >
              <Plus size={15} /> Create your first post
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Slug</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p, i) => (
                  <tr key={p.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i === posts.length - 1 ? "border-0" : ""}`}>
                    <td className="px-5 py-4 font-medium text-gray-900 max-w-xs">
                      <div className="truncate">{p.titleEn || <span className="text-gray-400 italic">Untitled</span>}</div>
                      {p.titleAr && <div className="text-xs text-gray-400 truncate mt-0.5" dir="rtl">{p.titleAr}</div>}
                    </td>
                    <td className="px-5 py-4 text-gray-500 font-mono text-xs">{p.slug}</td>
                    <td className="px-5 py-4 text-gray-600">{p.categoryEn || "—"}</td>
                    <td className="px-5 py-4 text-gray-500">{p.date}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${p.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/blog/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-gray-700 rounded"
                          title="Preview"
                        >
                          <Eye size={15} />
                        </a>
                        <button
                          onClick={() => setEditing({ ...p })}
                          className="p-1.5 text-gray-400 hover:text-green-700 rounded"
                          title="Edit"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => void deletePost(p.id, p.titleEn)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                          title="Delete"
                        >
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
