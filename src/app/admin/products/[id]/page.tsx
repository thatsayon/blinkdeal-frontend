"use client";

import { useEffect, useState, use } from "react";
import { fetchAdminAPI } from "@/lib/admin-api";
import { Edit2, Plus, Loader2, Save, X, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Store = { id: string; name: string };
type ProductCategory = { id: string; name: string };

type Product = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  original_price: string;
  discounted_price: string;
  affiliate_url: string;
  is_featured: boolean;
  store: string;
  category: string;
};

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === "new";

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const emptyForm: Product = { title: "", slug: "", description: "", image: "", original_price: "", discounted_price: "", affiliate_url: "", is_featured: false, store: "", category: "" };
  const [form, setForm] = useState<Product>(emptyForm);
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const promises: Promise<any>[] = [
        fetchAdminAPI<any>("/admin/stores/"),
        fetchAdminAPI<any>("/admin/product-categories/")
      ];
      
      if (!isNew) {
        promises.push(fetchAdminAPI<Product>(`/admin/products/${id}/`));
      }

      const results = await Promise.all(promises);
      
      setStores(Array.isArray(results[0]) ? results[0] : results[0].results || []);
      setCategories(Array.isArray(results[1]) ? results[1] : results[1].results || []);
      
      if (!isNew) {
        const productData = results[2];
        setForm({...productData, store: productData.store || "", category: productData.category || ""});
      }
    } catch (e) {
      console.error("Failed to load data");
      showMessage("error", "Failed to load product data.");
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
      const payload = { 
        ...form, 
        store: form.store, 
        category: form.category || null,
        original_price: form.original_price || null,
        discounted_price: form.discounted_price || null
      };
      
      if (!isNew) {
        await fetchAdminAPI(`/admin/products/${id}/`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await fetchAdminAPI("/admin/products/", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      router.push("/admin/products");
    } catch (e) {
      showMessage("error", "Error saving product. Please try again.");
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
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="p-2 text-gray-500 hover:text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {!isNew ? <Edit2 className="w-6 h-6 text-indigo-500" /> : <Plus className="w-6 h-6 text-indigo-500" />}
            {!isNew ? "Edit Product" : "Add New Product"}
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Title</label>
            <input 
              required 
              placeholder="e.g. Nike Air Max" 
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
              value={form.title} 
              onChange={(e) => setForm({...form, title: e.target.value})} 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Original Price (optional)</label>
              <input 
                type="number"
                step="0.01"
                placeholder="e.g. 150.00" 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.original_price} 
                onChange={(e) => setForm({...form, original_price: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Discounted Price (optional)</label>
              <input 
                type="number"
                step="0.01"
                placeholder="e.g. 99.99" 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.discounted_price} 
                onChange={(e) => setForm({...form, discounted_price: e.target.value})} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Associated Store</label>
              <select 
                required 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all cursor-pointer" 
                value={form.store} 
                onChange={(e) => setForm({...form, store: e.target.value})}
              >
                <option value="" disabled>Select a Store</option>
                {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category (Optional)</label>
              <select 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 focus:bg-white transition-all cursor-pointer" 
                value={form.category} 
                onChange={(e) => setForm({...form, category: e.target.value})}
              >
                <option value="">Select a Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Affiliate URL</label>
              <input 
                required 
                type="url"
                placeholder="e.g. https://amazon.com/..." 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.affiliate_url} 
                onChange={(e) => setForm({...form, affiliate_url: e.target.value})} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
              <input 
                type="url"
                placeholder="Direct link to image..." 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.image} 
                onChange={(e) => setForm({...form, image: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug (optional)</label>
              <input 
                placeholder="Auto-generated if left blank" 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.slug} 
                onChange={(e) => setForm({...form, slug: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Status Flags</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" checked={form.is_featured} onChange={(e) => setForm({...form, is_featured: e.target.checked})} />
                <span className="text-sm font-medium text-gray-900 flex items-center gap-1.5"><Package className="w-4 h-4 text-indigo-500"/> Featured</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea 
              placeholder="Product details..." 
              rows={4}
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white resize-none" 
              value={form.description} 
              onChange={(e) => setForm({...form, description: e.target.value})} 
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <Link 
              href="/admin/products"
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
              {!isNew ? "Update" : "Save"} Product
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
