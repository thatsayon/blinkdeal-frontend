"use client";

import { useEffect, useState, use } from "react";
import { fetchAdminAPI } from "@/lib/admin-api";
import { Edit2, Plus, Loader2, Save, X, ArrowLeft, Image as ImageIcon, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import to avoid SSR issues with the editor's DOM APIs
const RichTextEditor = dynamic(() => import("../RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-96 rounded-xl border border-gray-200 bg-gray-50 animate-pulse flex items-center justify-center">
      <span className="text-gray-400 text-sm">Loading editor…</span>
    </div>
  ),
});

type Author = { id: number; name: string };

type Post = {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  cover_image_file?: File | null;
  author: number | "";
  tags: string[];
  published_at: string;
  is_published: boolean;
};

export default function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === "new";

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const getTodayStr = () => new Date().toISOString().slice(0, 16);

  const emptyForm: Post = { 
    title: "", slug: "", excerpt: "", content: "", cover_image: "", 
    author: "", tags: [], published_at: getTodayStr() + ":00Z", is_published: true 
  };
  const [form, setForm] = useState<Post>(emptyForm);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => { loadData(); }, [id]);

  const loadData = async () => {
    try {
      const promises: Promise<any>[] = [fetchAdminAPI<any>("/admin/authors/")];
      if (!isNew) promises.push(fetchAdminAPI<Post>(`/admin/posts/${id}/`));
      const results = await Promise.all(promises);
      setAuthors(Array.isArray(results[0]) ? results[0] : results[0].results || []);
      if (!isNew) {
        const postData = results[1];
        setForm({ ...postData, author: postData.author?.id ?? "" });
      }
    } catch {
      showMessage("error", "Failed to load post data.");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("excerpt", form.excerpt);
      formData.append("content", form.content);
      if (form.author) formData.append("author", String(form.author));
      formData.append("tags", JSON.stringify(form.tags));
      formData.append("published_at", form.published_at);
      formData.append("is_published", String(form.is_published));
      if (form.cover_image_file) {
        formData.append("cover_image", form.cover_image_file);
      }

      if (!isNew) {
        await fetchAdminAPI(`/admin/posts/${id}/`, { method: "PATCH", body: formData });
      } else {
        await fetchAdminAPI("/admin/posts/", { method: "POST", body: formData });
      }
      router.push("/admin/posts");
    } catch {
      showMessage("error", "Error saving post. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleAddTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t)) setForm({ ...form, tags: [...form.tags, t] });
    setTagInput("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-indigo-600">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-24 animate-in fade-in duration-500">

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts" className="p-2 text-gray-500 hover:text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {isNew ? <Plus className="w-6 h-6 text-indigo-500" /> : <Edit2 className="w-6 h-6 text-indigo-500" />}
            {isNew ? "New Post" : "Edit Post"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
            <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
            Published
          </label>
          <button
            onClick={() => handleSubmit()}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 hover:shadow-lg transition-all disabled:opacity-70"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isNew ? "Publish" : "Update"}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-4 p-4 rounded-xl flex items-center justify-between shadow-sm animate-in slide-in-from-top-2 ${
          message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          <span className="text-sm font-medium">{message.text}</span>
          <button onClick={() => setMessage(null)}><X className="w-4 h-4 opacity-60 hover:opacity-100" /></button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col xl:flex-row gap-6">
        
        {/* ── Main Writing Area ── */}
        <div className="flex-1 space-y-5 min-w-0">

          {/* Title & Excerpt card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-6 space-y-3">
            <input
              required
              placeholder="Post Title"
              className="w-full text-3xl font-bold text-gray-900 placeholder:text-gray-300 bg-transparent border-none focus:outline-none focus:ring-0 leading-tight"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <div className="border-t border-gray-100" />
            <textarea
              required
              placeholder="Add a short excerpt or subtitle that summarises the post…"
              rows={2}
              className="w-full text-base text-gray-500 placeholder:text-gray-300 bg-transparent border-none focus:outline-none focus:ring-0 resize-none"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
          </div>

          {/* Rich Text Editor */}
          <RichTextEditor
            value={form.content}
            onChange={(html) => setForm({ ...form, content: html })}
            placeholder="Start writing your post… (Tip: Select text for quick formatting options)"
          />
        </div>

        {/* ── Sidebar Settings ── */}
        <div className="w-full xl:w-80 flex-shrink-0 space-y-5">

          {/* Publish settings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Publish</h3>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">URL Slug</label>
              <input
                placeholder="auto-generated-from-title"
                className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Publish Date</label>
              <input
                type="datetime-local"
                required
                className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all"
                value={form.published_at.slice(0, 16)}
                onChange={(e) => setForm({ ...form, published_at: e.target.value + ":00Z" })}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Author</label>
              <select
                required
                className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all cursor-pointer"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value === "" ? "" : Number(e.target.value) })}
              >
                <option value="" disabled>Select an Author</option>
                {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-1.5"><ImageIcon className="w-4 h-4 text-gray-400" /> Cover Image</h3>
            <input
              type="file"
              accept="image/*"
              required={isNew && !form.cover_image}
              className="w-full border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setForm({ ...form, cover_image_file: file, cover_image: URL.createObjectURL(file) });
                }
              }}
            />
            {form.cover_image && (
              <div className="relative h-36 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm">
                <img src={form.cover_image} alt="Cover preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, cover_image: "", cover_image_file: null })}
                  className="absolute top-2 right-2 p-1 bg-white/90 rounded-md hover:bg-white transition-colors shadow"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Tags</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. deals"
                className="flex-1 border border-gray-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              />
              <button type="button" onClick={handleAddTag} className="px-3.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-semibold text-sm">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {tag}
                  <button type="button" onClick={() => setForm({ ...form, tags: form.tags.filter(t => t !== tag) })} className="hover:text-red-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <p className="text-[11px] text-gray-400">Press Enter to add. Tags categorise your post.</p>
          </div>

        </div>
      </form>
    </div>
  );
}
