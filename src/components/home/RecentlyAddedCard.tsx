"use client";

import Image from "next/image";
import { ArrowRight, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Coupon } from "@/types/coupon";

export default function RecentlyAddedCard({ item }: { item: Coupon }) {
    const router = useRouter();

    const handleDealClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (item.store_url) {
            window.open(item.store_url, "_blank", "noopener,noreferrer");
        }
        router.push(`/coupons/${item.store_slug}/${item.slug}`);
    };

    return (
        <div 
            onClick={handleDealClick}
            className="cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:border-gray-200 hover:bg-gray-50/50"
        >
            {/* Left: Logo & Info */}
            <div className="flex items-center gap-4 sm:gap-5">
                <div className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl overflow-hidden ${item.store_logo ? 'bg-gray-100' : item.color} text-xl font-black transition-transform duration-300 group-hover:scale-105`}>
                    {item.store_logo ? (
                        <Image src={item.store_logo} alt={item.store_name || item.store || 'Store'} fill className="object-cover" sizes="56px" />
                    ) : (
                        item.store_name?.charAt(0) || item.store?.charAt(0)
                    )}
                </div>
                <div>
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 transition-colors group-hover:text-blue-600">
                        {item.store_name || item.store}
                    </h5>
                    <div className="mt-1.5 flex items-center gap-2.5 text-xs font-medium text-gray-500">
                        <span className="flex items-center gap-1 rounded bg-gray-100 px-2 py-0.5 font-bold uppercase tracking-wider text-gray-600">
                            <Tag size={10} />
                            CODE
                        </span>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <span>Just now</span>
                    </div>
                </div>
            </div>
            
            {/* Right: Offer & Action */}
            <div className="flex items-center justify-between sm:justify-end gap-5 border-t border-gray-50 pt-4 sm:border-0 sm:pt-0">
                <span className="text-lg font-black tracking-tight text-emerald-600">
                    {item.discount}
                </span>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <ArrowRight size={18} />
                </div>
            </div>
        </div>
    );
}
