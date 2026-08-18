"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const router = useRouter();

    const handleReveal = () => {
        window.open(product.affiliate_url, "_blank", "noopener,noreferrer");
        router.push(`/stores/${product.store_slug}/products/${product.slug}`);
    };

    const storeName = product.store_name || product.store || "";

    return (
        <div 
            onClick={handleReveal}
            className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 cursor-pointer"
        >
            {/* Image Section */}
            <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                {product.image ? (
                    <Image 
                        src={product.image} 
                        alt={product.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-indigo-50/50">
                        <span className="text-6xl font-black uppercase tracking-widest text-indigo-900/10">
                            {storeName.charAt(0)}
                        </span>
                    </div>
                )}

                {/* Featured Badge */}
                {product.is_featured && (
                    <div className="absolute top-4 left-4 z-10">
                        <span className="flex items-center gap-1.5 bg-indigo-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                            <Sparkles size={12} className="text-indigo-200" />
                            Featured
                        </span>
                    </div>
                )}
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-6 relative">
                {/* Store Icon overlapping the image slightly */}
                <div className="absolute -top-6 right-6">
                    <div className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl ${product.store_logo ? 'bg-white' : product.color || 'bg-gray-900 text-white'} shadow-lg border-2 border-white ring-1 ring-gray-100 font-black text-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                        {product.store_logo ? (
                            <Image src={product.store_logo} alt={storeName} fill className="object-contain p-2" sizes="48px" />
                        ) : (
                            storeName.charAt(0)
                        )}
                    </div>
                </div>

                <span className="block text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">{storeName}</span>
                
                <h4 className="text-lg font-bold tracking-tight text-gray-900 line-clamp-2 mb-4 group-hover:text-indigo-600 transition-colors">
                    {product.title}
                </h4>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-end justify-between">
                    <div className="flex flex-col">
                        {product.original_price && product.discounted_price && (
                            <span className="text-xs font-bold text-gray-400 line-through decoration-gray-300 mb-0.5">
                                ${product.original_price}
                            </span>
                        )}
                        <span className="text-2xl font-black text-gray-900 tracking-tight">
                            ${product.discounted_price || product.original_price || "0.00"}
                        </span>
                    </div>
                    
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-md">
                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:-rotate-45" />
                    </div>
                </div>
            </div>
        </div>
    );
}
