"use client";

import Image from "next/image";
import type { Store } from "@/types/store";
import type { Coupon } from "@/types/coupon";
import CouponCard from "@/components/coupons/CouponCard";
import { Store as StoreIcon, ExternalLink } from "lucide-react";

export default function StoreDetailClient({ store, coupons }: { store: Store, coupons: Coupon[] }) {
    return (
        <main className="min-h-screen bg-white pb-24">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                
                {/* Store Header */}
                <div className="mb-16 border-b-2 border-gray-900 pb-10">
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
                                    {store.name} Promo Codes
                                </h1>
                            </div>
                            <a href={store.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                Visit {store.name} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                    
                    {store.description && (
                        <p className="max-w-3xl text-lg text-gray-500 font-medium leading-relaxed mb-8">
                            {store.description}
                        </p>
                    )}
                </div>

                {/* Coupons List */}
                {coupons.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {coupons.map((coupon) => (
                            <CouponCard key={coupon.id} coupon={coupon} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
                        <StoreIcon size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No coupons available right now</h3>
                        <p className="text-gray-500">Check back later for new {store.name} promo codes and deals.</p>
                    </div>
                )}

            </div>
        </main>
    );
}
