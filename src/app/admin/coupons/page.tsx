"use client";

import { useEffect, useState } from "react";
import { fetchAdminAPI } from "@/lib/admin-api";
import { Edit2, Trash2, Plus, Ticket, Loader2, X, Search, CheckCircle2, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

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

export default function AdminCouponsList() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const loadData = async () => {
    try {
      const [cpns, strs, cats] = await Promise.all([
        fetchAdminAPI<any>("/admin/coupons/"),
        fetchAdminAPI<any>("/admin/stores/"),
        fetchAdminAPI<any>("/admin/categories/"),
      ]);
      setCoupons(Array.isArray(cpns) ? cpns : cpns.results || []);
      setStores(Array.isArray(strs) ? strs : strs.results || []);
      setCategories(Array.isArray(cats) ? cats : cats.results || []);
    } catch (e) {
      console.error("Failed to load data");
      showMessage("error", "Failed to load coupons data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this coupon? This action cannot be undone.")) return;
    try {
      await fetchAdminAPI(`/admin/coupons/${id}/`, { method: "DELETE" });
      showMessage("success", "Coupon deleted successfully!");
      loadData();
    } catch (e) {
      showMessage("error", "Error deleting coupon.");
    }
  };

  const filteredCoupons = coupons.filter(coupon => 
    coupon.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStoreName = (storeId: number | "") => {
    const store = stores.find(s => s.id === storeId);
    return store ? store.name : "Unknown Store";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Ticket className="w-6 h-6 text-pink-500" />
            Manage Coupons
          </h1>
          <p className="text-gray-500 text-sm mt-1">View, edit, or remove promo codes and deals.</p>
        </div>
        <Link 
          href="/admin/coupons/new"
          className="flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 hover:shadow-md transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Coupon
        </Link>
      </div>

      {/* Notifications */}
      {message && (
        <div className={`p-4 rounded-xl flex items-center justify-between shadow-sm transition-all animate-in slide-in-from-top-2 ${
          message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          <span className="font-medium text-sm">{message.text}</span>
          <button onClick={() => setMessage(null)} className="opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-semibold text-gray-700">All Coupons ({filteredCoupons.length})</h3>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search coupons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex justify-center items-center text-indigo-600">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : filteredCoupons.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <Ticket className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-900">No coupons found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new coupon.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Coupon Details</th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Code & Meta</th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredCoupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                            {getStoreName(coupon.store)}
                          </span>
                          {coupon.verified && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-50 text-green-700 border border-green-200 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                            </span>
                          )}
                          {coupon.is_trending && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-bold text-gray-900 line-clamp-1">{coupon.title}</span>
                        <span className="text-xs font-medium text-green-600 mt-1">{coupon.discount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="inline-flex items-center">
                          <code className="text-xs font-mono font-bold bg-gray-100 text-gray-800 px-2 py-1 rounded border border-gray-200">
                            {coupon.code}
                          </code>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {coupon.expiry}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/admin/coupons/${coupon.id}`}
                          className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(coupon.id!)} 
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
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
