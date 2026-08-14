"use client";

import { useEffect, useState, use } from "react";
import { fetchAdminAPI } from "@/lib/admin-api";
import { Edit2, Plus, Loader2, Save, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Category = {
  id?: number;
  name: string;
  slug: string;
  icon: string;
  color: string;
  bg_color: string;
};

export default function CategoryDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<Category>({ name: "", slug: "", icon: "", color: "", bg_color: "" });
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  useEffect(() => {
    if (!isNew) {
      loadCategory();
    }
  }, [id]);

  const loadCategory = async () => {
    try {
      const data = await fetchAdminAPI<Category>(`/admin/categories/${id}/`);
      setForm(data);
    } catch (e) {
      console.error("Failed to load category");
      showMessage("error", "Failed to load category data.");
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
        await fetchAdminAPI(`/admin/categories/${id}/`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
      } else {
        await fetchAdminAPI("/admin/categories/", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      router.push("/admin/categories");
    } catch (e) {
      showMessage("error", "Error saving category. Please try again.");
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
        <Link href="/admin/categories" className="p-2 text-gray-500 hover:text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {!isNew ? <Edit2 className="w-6 h-6 text-indigo-500" /> : <Plus className="w-6 h-6 text-indigo-500" />}
            {!isNew ? "Edit Category" : "Add New Category"}
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
              <input 
                required 
                placeholder="e.g. Electronics" 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.name} 
                onChange={(e) => setForm({...form, name: e.target.value})} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
              <input 
                required 
                placeholder="e.g. electronics" 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.slug} 
                onChange={(e) => setForm({...form, slug: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Icon Name (Lucide)</label>
            <input 
              placeholder="e.g. Laptop" 
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
              value={form.icon} 
              onChange={(e) => setForm({...form, icon: e.target.value})} 
            />
            <p className="text-xs text-gray-500 mt-1.5">Enter the exact name of a Lucide React icon.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Text Color (Tailwind)</label>
              <input 
                placeholder="e.g. text-blue-600" 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.color} 
                onChange={(e) => setForm({...form, color: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Background Color (Tailwind)</label>
              <input 
                placeholder="e.g. bg-blue-50" 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.bg_color} 
                onChange={(e) => setForm({...form, bg_color: e.target.value})} 
              />
            </div>
          </div>

          {(form.color || form.bg_color) && (
            <div className="p-4 rounded-xl border border-gray-100 flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Live Preview:</span>
              <span className={`text-sm font-semibold px-4 py-1.5 rounded-lg ${form.bg_color} ${form.color}`}>
                {form.name || "Preview Label"}
              </span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <Link 
              href="/admin/categories"
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
              {!isNew ? "Update" : "Save"} Category
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
