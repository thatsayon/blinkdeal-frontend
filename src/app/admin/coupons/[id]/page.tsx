"use client";

import { useEffect, useState, use } from "react";
import { fetchAdminAPI } from "@/lib/admin-api";
import { Edit2, Plus, Loader2, Save, X, ArrowLeft, CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Store = { id: number; name: string };
type Category = { id: number; name: string };

type Coupon = {
  id?: number;
  title: string;
  slug: string;
  description: string;
  code: string;
  discount: string;
  expiry: string;
  verified: boolean;
  is_trending: boolean;
  is_today_deal: boolean;
  store: number | "";
  category: number | "";
};

export default function CouponDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === "new";

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const emptyForm: Coupon = { title: "", slug: "", description: "", code: "", discount: "", expiry: "Ongoing", verified: true, is_trending: false, is_today_deal: false, store: "", category: "" };
  const [form, setForm] = useState<Coupon>(emptyForm);
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const promises: Promise<any>[] = [
        fetchAdminAPI<any>("/admin/stores/"),
        fetchAdminAPI<any>("/admin/categories/")
      ];
      
      if (!isNew) {
        promises.push(fetchAdminAPI<Coupon>(`/admin/coupons/${id}/`));
      }

      const results = await Promise.all(promises);
      
      setStores(Array.isArray(results[0]) ? results[0] : results[0].results || []);
      setCategories(Array.isArray(results[1]) ? results[1] : results[1].results || []);
      
      if (!isNew) {
        const couponData = results[2];
        setForm({...couponData, store: couponData.store || "", category: couponData.category || ""});
      }
    } catch (e) {
      console.error("Failed to load data");
      showMessage("error", "Failed to load coupon data.");
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
      const payload = { ...form, store: Number(form.store), category: form.category ? Number(form.category) : null };
      
      if (!isNew) {
        await fetchAdminAPI(`/admin/coupons/${id}/`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await fetchAdminAPI("/admin/coupons/", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      router.push("/admin/coupons");
    } catch (e) {
      showMessage("error", "Error saving coupon. Please try again.");
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
        <Link href="/admin/coupons" className="p-2 text-gray-500 hover:text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {!isNew ? <Edit2 className="w-6 h-6 text-pink-500" /> : <Plus className="w-6 h-6 text-pink-500" />}
            {!isNew ? "Edit Coupon" : "Add New Coupon"}
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Coupon Title</label>
            <input 
              required 
              placeholder="e.g. 20% Off Storewide" 
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
              value={form.title} 
              onChange={(e) => setForm({...form, title: e.target.value})} 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Code</label>
              <input 
                required 
                placeholder="e.g. SAVE20" 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white font-mono uppercase" 
                value={form.code} 
                onChange={(e) => setForm({...form, code: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Discount Label</label>
              <input 
                required 
                placeholder="e.g. 20% OFF" 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.discount} 
                onChange={(e) => setForm({...form, discount: e.target.value})} 
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
                onChange={(e) => setForm({...form, store: e.target.value === "" ? "" : Number(e.target.value)})}
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
                onChange={(e) => setForm({...form, category: e.target.value === "" ? "" : Number(e.target.value)})}
              >
                <option value="">Select a Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry Date</label>
              <input 
                required 
                placeholder="e.g. Ongoing" 
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white" 
                value={form.expiry} 
                onChange={(e) => setForm({...form, expiry: e.target.value})} 
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
                <input type="checkbox" className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500" checked={form.verified} onChange={(e) => setForm({...form, verified: e.target.checked})} />
                <span className="text-sm font-medium text-gray-900 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500"/> Verified</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <input type="checkbox" className="w-5 h-5 text-orange-600 rounded border-gray-300 focus:ring-orange-500" checked={form.is_trending} onChange={(e) => setForm({...form, is_trending: e.target.checked})} />
                <span className="text-sm font-medium text-gray-900 flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-orange-500"/> Trending</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <input type="checkbox" className="w-5 h-5 text-pink-600 rounded border-gray-300 focus:ring-pink-500" checked={form.is_today_deal} onChange={(e) => setForm({...form, is_today_deal: e.target.checked})} />
                <span className="text-sm font-medium text-gray-900 flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-pink-500"/> Today's Deal</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea 
              placeholder="Details, exclusions, terms..." 
              rows={4}
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50 focus:bg-white resize-none" 
              value={form.description} 
              onChange={(e) => setForm({...form, description: e.target.value})} 
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <Link 
              href="/admin/coupons"
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
              {!isNew ? "Update" : "Save"} Coupon
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
