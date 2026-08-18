"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck, Tag, ShoppingCart, Info, TrendingUp, Sparkles } from "lucide-react";
import type { Product } from "@/types/product";
import type { Store } from "@/types/store";
import { recordProductClick } from "@/lib/api";

export default function ProductDetailClient({ product, store }: { product: Product, store: Store }) {
    const [isClicked, setIsClicked] = useState(false);

    const handleGetDeal = async () => {
        setIsClicked(true);
        try {
            await recordProductClick(product.slug);
        } catch (error) {
            console.error("Failed to record click", error);
        }
        window.open(product.affiliate_url, "_blank", "noopener,noreferrer");
    };

    return (
        <main className="min-h-screen bg-gray-50/50 pb-24 pt-8">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                
                {/* Back Navigation */}
                <Link 
                    href={`/stores/${store.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8"
                >
                    <ArrowLeft size={16} />
                    Back to {store.name}
                </Link>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        
                        {/* Left: Product Image */}
                        <div className="w-full md:w-5/12 bg-gray-50 border-r border-gray-100 p-8 sm:p-12 flex items-center justify-center relative min-h-[300px]">
                            {product.image ? (
                                <div className="relative w-full aspect-square">
                                    <Image 
                                        src={product.image} 
                                        alt={product.title} 
                                        fill 
                                        className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500" 
                                        sizes="(max-width: 768px) 100vw, 400px" 
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center opacity-30">
                                    <ShoppingCart size={64} className="text-gray-400 mb-4" />
                                    <span className="text-lg font-bold text-gray-500">No Image</span>
                                </div>
                            )}

                            {/* Badges Overlay */}
                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                {product.is_featured && (
                                    <span className="inline-flex items-center gap-1.5 bg-indigo-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                        <Sparkles size={14} className="text-indigo-200" />
                                        Featured
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Right: Product Details */}
                        <div className="w-full md:w-7/12 p-8 sm:p-10 flex flex-col">
                            
                            {/* Store & Category */}
                            <div className="flex items-center gap-3 mb-4">
                                <Link href={`/stores/${store.slug}`} className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl overflow-hidden ${store.logo_image ? 'bg-white border border-gray-100 shadow-sm' : store.logo_color} font-black text-sm uppercase transition-transform hover:scale-105`}>
                                    {store.logo_image ? (
                                        <Image src={store.logo_image} alt={store.name} fill className="object-contain p-1.5" sizes="40px" />
                                    ) : (
                                        store.name.charAt(0)
                                    )}
                                </Link>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-gray-900">{store.name}</span>
                                    {product.category_name && (
                                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                            <Tag size={12} />
                                            {product.category_name}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                                {product.title}
                            </h1>

                            {/* Price Section */}
                            <div className="flex items-end gap-3 mb-8 pb-8 border-b border-gray-100">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500 mb-1">Deal Price</span>
                                    <span className="text-4xl font-black text-indigo-600 tracking-tight">
                                        ${product.discounted_price || product.original_price || "0.00"}
                                    </span>
                                </div>
                                {product.original_price && product.discounted_price && (
                                    <span className="text-lg font-bold text-gray-400 line-through decoration-gray-300 mb-1.5 ml-2">
                                        ${product.original_price}
                                    </span>
                                )}
                            </div>

                            {/* CTA */}
                            <button
                                onClick={handleGetDeal}
                                className={`group relative w-full sm:w-auto overflow-hidden rounded-2xl p-4 sm:px-10 sm:py-5 shadow-lg transition-all active:scale-[0.98] ${
                                    isClicked ? 'bg-green-600 shadow-green-600/20' : 'bg-indigo-600 shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-1'
                                }`}
                            >
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    <span className="text-lg font-black text-white tracking-wide">
                                        {isClicked ? "Deal Activated" : "Get Deal Now"}
                                    </span>
                                    <ExternalLink size={20} className="text-white/80 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>
                                {/* Shine effect */}
                                {!isClicked && (
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                                )}
                            </button>

                            <p className="text-xs text-center sm:text-left text-gray-400 mt-4 font-medium flex items-center justify-center sm:justify-start gap-1.5">
                                <ShieldCheck size={14} className="text-green-500" />
                                Opens {store.name} in a new tab securely.
                            </p>

                            {/* Description */}
                            {product.description && (
                                <div className="mt-10 pt-8 border-t border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Info size={18} className="text-gray-400" />
                                        About this deal
                                    </h3>
                                    <div className="prose prose-sm prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                                        {product.description}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
