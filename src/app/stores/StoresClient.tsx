"use client";

import { useState } from "react";
import Link from "next/link";
import { Store as StoreIcon, Search, ArrowRight } from "lucide-react";
import type { Store } from "@/types/store";

interface StoresClientProps {
    initialStores: Store[];
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("");

export default function StoresClient({ initialStores }: StoresClientProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredStores = initialStores.filter(store => 
        store.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-white pb-24">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                
                {/* Minimalist Editorial Header */}
                <div className="mb-12 border-b-2 border-gray-900 pb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <StoreIcon size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-blue-600">Retailers</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900">
                                All Stores.
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg text-gray-500 font-medium leading-relaxed">
                                Browse our complete directory of top brands and retailers. Find verified discounts and promo codes for the stores you love.
                            </p>
                        </div>
                        {/* Search Input */}
                        <div className="relative w-full md:w-80 shrink-0">
                            <input 
                                type="text" 
                                placeholder="Find a store..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pl-11 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                            />
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* A-Z Filter (Visual / Static for aesthetic) */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-2">
                        {alphabet.map((letter) => (
                            <button 
                                key={letter}
                                className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-900 focus:text-white"
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stores Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredStores.map((store) => (
                        <Link 
                            key={store.slug}
                            href={`/stores/${store.slug}`} 
                            className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:border-gray-200 hover:bg-gray-50 hover:shadow-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${store.logo_color || "bg-gray-100 text-gray-900"} font-black text-xl transition-transform group-hover:scale-105`}>
                                    {store.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 line-clamp-1">{store.name}</h3>
                                    <p className="text-xs font-medium text-gray-500 mt-0.5">{store.coupon_count} coupons</p>
                                </div>
                            </div>
                            <ArrowRight size={16} className="text-gray-300 transition-all group-hover:-translate-x-1 group-hover:text-gray-900 shrink-0" />
                        </Link>
                    ))}
                </div>
                
            </div>
        </main>
    );
}
