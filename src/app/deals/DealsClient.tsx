"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, Tag, Zap, X } from "lucide-react";
import type { Coupon } from "@/types/coupon";
import CouponCard from "@/components/coupons/CouponCard";

const filters = ["All Deals", "Fashion", "Electronics", "Home", "Beauty", "General"];

interface DealsClientProps {
    initialCoupons: Coupon[];
}

function DealsContent({ initialCoupons }: DealsClientProps) {
    const searchParams = useSearchParams();
    const [activeFilter, setActiveFilter] = useState("All Deals");
    const [searchQuery, setSearchQuery] = useState("");

    // Sync search query with URL query parameters (?q=... or ?search=...)
    useEffect(() => {
        const q = searchParams.get("q") || searchParams.get("search") || "";
        if (q) {
            setSearchQuery(q);
        }
    }, [searchParams]);

    const filteredCoupons = initialCoupons.filter((coupon) => {
        const catName = (coupon.category_name || coupon.category || "").toLowerCase();
        const matchesCategory =
            activeFilter === "All Deals" || catName === activeFilter.toLowerCase();

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
            !q ||
            coupon.title.toLowerCase().includes(q) ||
            (coupon.store_name || coupon.store || "").toLowerCase().includes(q) ||
            (coupon.description || "").toLowerCase().includes(q) ||
            (coupon.code || "").toLowerCase().includes(q);

        return matchesCategory && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-white pb-24">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Minimalist Editorial Header */}
                <div className="mb-10 border-b-2 border-gray-900 pb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <Zap size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-purple-600">All Offers</span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900">
                                Latest Deals.
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg text-gray-500 font-medium leading-relaxed">
                                Browse our complete collection of verified promo codes, discounts, and offers. Updated daily to ensure you always get the best price.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full lg:w-96 shrink-0">
                            <input
                                type="text"
                                placeholder="Search deals or stores..."
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

                {/* Filters Toolbar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div className="flex flex-wrap items-center gap-2">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                                    activeFilter === filter
                                        ? "bg-gray-900 text-white shadow-md"
                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors shrink-0">
                        <SlidersHorizontal size={16} />
                        Sort by: Newest
                    </button>
                </div>

                {/* Active Search / Filter Banner */}
                {searchQuery && (
                    <div className="mb-6 flex items-center justify-between rounded-xl bg-blue-50/80 px-4 py-3 border border-blue-100 text-sm text-blue-900">
                        <div className="flex items-center gap-2">
                            <span>Showing results for: <strong className="font-bold">"{searchQuery}"</strong></span>
                            <span className="text-xs text-blue-600">({filteredCoupons.length} found)</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="font-bold text-xs text-blue-700 hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                {/* Grid */}
                {filteredCoupons.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {filteredCoupons.map((coupon) => (
                            <CouponCard key={coupon.id} coupon={coupon} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                        <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-4">
                            <Tag size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No deals found</h3>
                        <p className="mt-2 text-gray-500 max-w-sm">
                            We couldn't find any deals matching {searchQuery ? `"${searchQuery}"` : "your current filters"}. Try adjusting your search or category.
                        </p>
                        <button
                            onClick={() => {
                                setActiveFilter("All Deals");
                                setSearchQuery("");
                            }}
                            className="mt-6 px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-black transition-colors"
                        >
                            Clear Filters & Search
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {filteredCoupons.length > 0 && (
                    <div className="mt-16 flex items-center justify-center gap-2 border-t border-gray-100 pt-10">
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-sm font-bold text-gray-400 opacity-50 cursor-not-allowed">&lt;</button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-sm font-bold text-white shadow-sm">1</button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">2</button>
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">3</button>
                        <span className="px-2 text-gray-400">...</span>
                        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">&gt;</button>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function DealsClient({ initialCoupons }: DealsClientProps) {
    return (
        <Suspense fallback={<main className="min-h-screen bg-white" />}>
            <DealsContent initialCoupons={initialCoupons} />
        </Suspense>
    );
}
