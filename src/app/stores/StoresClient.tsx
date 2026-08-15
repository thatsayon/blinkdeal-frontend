"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Store as StoreIcon, Search, ArrowRight, X } from "lucide-react";
import type { Store } from "@/types/store";

interface StoresClientProps {
    initialStores: Store[];
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("");

function StoresContent({ initialStores }: StoresClientProps) {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

    // Sync search query with URL query parameters (?q=... or ?search=...)
    useEffect(() => {
        const q = searchParams.get("q") || searchParams.get("search") || "";
        if (q) {
            setSearchQuery(q);
        }
    }, [searchParams]);

    const filteredStores = initialStores.filter((store) => {
        const matchesSearch =
            !searchQuery.trim() ||
            store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            store.slug.toLowerCase().includes(searchQuery.toLowerCase());

        const firstChar = store.name.charAt(0).toUpperCase();
        const matchesLetter =
            !selectedLetter ||
            (selectedLetter === "#" ? !/^[A-Z]$/.test(firstChar) : firstChar === selectedLetter);

        return matchesSearch && matchesLetter;
    });

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
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pl-11 pr-10 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                            />
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:text-gray-700"
                                    aria-label="Clear search"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* A-Z Filter */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setSelectedLetter(null)}
                            className={`flex h-10 px-3.5 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                                selectedLetter === null
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                        >
                            All
                        </button>
                        {alphabet.map((letter) => (
                            <button
                                key={letter}
                                onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                                    selectedLetter === letter
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Active Filter Banner */}
                {(searchQuery || selectedLetter) && (
                    <div className="mb-8 flex items-center justify-between rounded-xl bg-blue-50/80 px-4 py-3 border border-blue-100 text-sm text-blue-900">
                        <div className="flex items-center gap-2">
                            <span>
                                Showing {filteredStores.length} stores
                                {searchQuery && (
                                    <> matching <strong className="font-bold">"{searchQuery}"</strong></>
                                )}
                                {selectedLetter && (
                                    <> starting with <strong className="font-bold">"{selectedLetter}"</strong></>
                                )}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedLetter(null);
                            }}
                            className="font-bold text-xs text-blue-700 hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                )}

                {/* Stores Grid */}
                {filteredStores.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {filteredStores.map((store) => (
                            <Link
                                key={store.slug}
                                href={`/stores/${store.slug}`}
                                className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:border-gray-200 hover:bg-gray-50 hover:shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl overflow-hidden ${
                                            store.logo_color || "bg-gray-100 text-gray-900"
                                        } font-black text-xl transition-transform group-hover:scale-105`}
                                    >
                                        {store.logo_image ? (
                                            <img
                                                src={store.logo_image}
                                                alt={`${store.name} logo`}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            store.name.charAt(0)
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 line-clamp-1">{store.name}</h3>
                                        <p className="text-xs font-medium text-gray-500 mt-0.5">{store.coupon_count} coupons</p>
                                    </div>
                                </div>
                                <ArrowRight
                                    size={16}
                                    className="text-gray-300 transition-all group-hover:-translate-x-1 group-hover:text-gray-900 shrink-0"
                                />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                        <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-4">
                            <StoreIcon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No stores found</h3>
                        <p className="mt-2 text-gray-500 max-w-sm">
                            We couldn't find any stores matching your current search criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedLetter(null);
                            }}
                            className="mt-6 px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-black transition-colors"
                        >
                            Reset filters
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function StoresClient({ initialStores }: StoresClientProps) {
    return (
        <Suspense fallback={<main className="min-h-screen bg-white" />}>
            <StoresContent initialStores={initialStores} />
        </Suspense>
    );
}
