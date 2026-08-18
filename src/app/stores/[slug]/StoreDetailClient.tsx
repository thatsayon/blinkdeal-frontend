"use client";

import { useState } from "react";
import Image from "next/image";
import type { Store } from "@/types/store";
import type { Coupon } from "@/types/coupon";
import type { Product } from "@/types/product";
import CouponCard from "@/components/coupons/CouponCard";
import ProductCard from "@/components/products/ProductCard";
import { Store as StoreIcon, ExternalLink, Ticket, Package } from "lucide-react";

export default function StoreDetailClient({ store, coupons, products }: { store: Store, coupons: Coupon[], products: Product[] }) {
    const [activeTab, setActiveTab] = useState<'coupons' | 'products'>('coupons');

    return (
        <main className="min-h-screen bg-white pb-24">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                
                {/* Store Header */}
                <div className="mb-12 border-b border-gray-100 pb-10">
                    <div className="flex items-center gap-6 mb-8">
                        <div className={`relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl overflow-hidden ${store.logo_image ? 'bg-white border border-gray-100 shadow-sm' : store.logo_color} font-black text-5xl uppercase`}>
                            {store.logo_image ? (
                                <Image src={store.logo_image} alt={store.name} fill className="object-contain p-3" sizes="96px" />
                            ) : (
                                store.name.charAt(0)
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900">
                                    {store.name}
                                </h1>
                            </div>
                            <a href={store.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                                Visit {store.name} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                    
                    {store.description && (
                        <p className="max-w-3xl text-lg text-gray-500 font-medium leading-relaxed mb-8">
                            {store.description}
                        </p>
                    )}

                    {/* Custom Tabs */}
                    <div className="flex items-center gap-2 p-1.5 bg-gray-100/80 backdrop-blur-md rounded-2xl w-full sm:w-fit mt-8 border border-gray-200/50">
                        <button
                            onClick={() => setActiveTab('coupons')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                                activeTab === 'coupons' 
                                ? 'bg-white text-gray-900 shadow-[0_2px_10px_rgba(0,0,0,0.06)]' 
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                            }`}
                        >
                            <Ticket size={18} className={activeTab === 'coupons' ? 'text-indigo-600' : ''} />
                            Promo Codes
                            <span className={`ml-1.5 px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'coupons' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-500'}`}>
                                {coupons.length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                                activeTab === 'products' 
                                ? 'bg-white text-gray-900 shadow-[0_2px_10px_rgba(0,0,0,0.06)]' 
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                            }`}
                        >
                            <Package size={18} className={activeTab === 'products' ? 'text-indigo-600' : ''} />
                            Products
                            <span className={`ml-1.5 px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'products' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-200 text-gray-500'}`}>
                                {products?.length || 0}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'coupons' ? (
                        /* Coupons List */
                        coupons.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                {coupons.map((coupon) => (
                                    <CouponCard key={coupon.id} coupon={coupon} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
                                <Ticket size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No coupons available</h3>
                                <p className="text-gray-500">Check back later for new {store.name} promo codes.</p>
                            </div>
                        )
                    ) : (
                        /* Products List */
                        products && products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
                                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No products available</h3>
                                <p className="text-gray-500">Check back later for new {store.name} products.</p>
                            </div>
                        )
                    )}
                </div>

            </div>
        </main>
    );
}
