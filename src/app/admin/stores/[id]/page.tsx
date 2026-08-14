"use client";

import { useEffect, useState, use } from "react";
import { fetchAdminAPI } from "@/lib/admin-api";
import { Edit2, Plus, Loader2, Save, X, ArrowLeft, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Store = {
  id?: number;
  name: string;
  slug: string;
  description: string;
  url: string;
  logo_image: string;
  logo_color: string;
  is_featured: boolean;
};

export default function StoreDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<Store>({ 
    name: "", slug: "", description: "", url: "", logo_image: "", logo_color: "bg-gray-100 text-gray-900", is_featured: false 
  });
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  useEffect(() => {
    if (!isNew) {
      loadStore();
    }
  }, [id]);

  const loadStore = async () => {
    try {
      const data = await fetchAdminAPI<Store>(`/admin/stores/${id}/`);
      setForm(data);
    } catch (e) {
      console.error("Failed to load store");
      showMessage("error", "Failed to load store data.");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!isNew) {
        await fetchAdminAPI(`/admin/stores/${id}/`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await fetchAdminAPI("/admin/stores/", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      router.push("/admin/stores");
    } catch (e) {
      showMessage("error", "Error saving store. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-indigo-600">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/stores" className="p-2 text-gray-500 hover:text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {!isNew ? <Edit2 className="w-6 h-6 text-indigo-500" /> : <Plus className="w-6 h-6 text-indigo-500" />}
            {!isNew ? "Edit Store" : "Add New Store"}
          </h1>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center justify-between shadow-sm transition-all animate-in slide-in-from-top-2 ${
          message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          <span className="font-medium text-sm">{message.text}</span>
          <button onClick={() => setMessage(null)} className="opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Store Name</label>
              <input 
                required 
                placeholder="e.g. Amazon" 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.name} 
                onChange={(e) => setForm({...form, name: e.target.value})} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
              <input 
                required 
                placeholder="e.g. amazon" 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.slug} 
                onChange={(e) => setForm({...form, slug: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Store URL</label>
            <div className="relative">
              <LinkIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                required 
                type="url"
                placeholder="https://..." 
                className="w-full border border-gray-200 pl-10 pr-3 py-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.url} 
                onChange={(e) => setForm({...form, url: e.target.value})} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Logo Image URL (optional)</label>
              <input 
                type="url"
                placeholder="https://..." 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.logo_image} 
                onChange={(e) => setForm({...form, logo_image: e.target.value})} 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Fallback Colors (Tailwind)</label>
              <input 
                placeholder="e.g. bg-blue-100 text-blue-600" 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.logo_color} 
                onChange={(e) => setForm({...form, logo_color: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea 
              placeholder="Brief description of the store..." 
              rows={4}
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white resize-none" 
              value={form.description} 
              onChange={(e) => setForm({...form, description: e.target.value})} 
            />
          </div>

          <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
              checked={form.is_featured} 
              onChange={(e) => setForm({...form, is_featured: e.target.checked})} 
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Featured Store</span>
              <span className="text-xs text-gray-500">Show this store prominently on the homepage</span>
            </div>
          </label>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <Link 
              href="/admin/stores"
              className="px-6 py-3 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center justify-center px-8 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 hover:shadow-md transition-all disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {!isNew ? "Update" : "Save"} Store
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
