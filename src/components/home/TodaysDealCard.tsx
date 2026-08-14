"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Tag } from "lucide-react";
import type { Coupon } from "@/types/coupon";

export default function TodaysDealCard({ deal }: { deal: Coupon }) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // 1. Open affiliate / store link in a new tab immediately
        window.open(deal.store_url, "_blank", "noopener,noreferrer");
        // 2. Navigate current tab to the coupon detail page
        router.push(`/coupons/${deal.store_slug}/${deal.slug}`);
    };

    return (
        <div 
            onClick={handleClick}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-sm cursor-pointer"
        >
            {/* Image Placeholder Section */}
            <div className={`relative h-40 w-full shrink-0 overflow-hidden ${deal.cover_image || deal.store_logo ? 'bg-gray-100' : deal.color || 'bg-blue-50'}`}>
                {deal.cover_image || deal.store_logo ? (
                    <Image src={deal.cover_image || deal.store_logo} alt={deal.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105">
                        <span className="text-2xl font-black uppercase tracking-widest opacity-15">
                            {deal.store}
                        </span>
                    </div>
                )}
                <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm z-10">
                    <Tag size={14} className="text-gray-900" />
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{deal.store}</span>
                    <h4 className="mt-1 text-base font-semibold text-gray-900 line-clamp-1">{deal.title}</h4>
                    <p className="mt-2 text-2xl font-black tracking-tight text-blue-600">{deal.discount}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-sm font-medium text-gray-900 transition-colors group-hover:text-blue-600">
                        Get Deal
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-50 text-gray-400 transition-all group-hover:bg-blue-600 group-hover:text-white">
                        <ArrowUpRight size={14} />
                    </span>
                </div>
            </div>
        </div>
    );
}
