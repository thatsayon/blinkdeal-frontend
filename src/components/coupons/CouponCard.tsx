"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
import type { Coupon } from "@/types/coupon";

interface CouponCardProps {
    coupon: Coupon;
}

export default function CouponCard({ coupon }: CouponCardProps) {
    const router = useRouter();

    const handleReveal = () => {
        // 1. Open affiliate / store link in a new tab immediately
        window.open(coupon.store_url, "_blank", "noopener,noreferrer");
        // 2. Navigate current tab to the coupon detail page
        router.push(`/coupons/${coupon.store_slug}/${coupon.slug}`);
    };

    const storeName = coupon.store_name || coupon.store || "";

    return (
        <div className="group flex h-full flex-col sm:flex-row overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200">
            
            {/* Left: Cover Image Section */}
            <div className={`relative w-full sm:w-40 md:w-48 shrink-0 overflow-hidden ${coupon.cover_image || coupon.store_logo ? 'bg-gray-100' : coupon.color || 'bg-blue-50'} h-48 sm:h-auto`}>
                {coupon.cover_image || coupon.store_logo ? (
                    <Image src={coupon.cover_image || coupon.store_logo} alt={coupon.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 192px" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <span className="text-5xl font-black uppercase tracking-widest opacity-15">
                            {storeName.charAt(0)}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col lg:flex-row">
                {/* Middle: Store Brand & Info */}
                <div className="flex flex-1 flex-col justify-center p-5 sm:p-6 gap-3">
                    <div className="flex items-center gap-3">
                        <div className={`relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg ${coupon.store_logo ? 'bg-white' : coupon.color || 'bg-gray-100 text-gray-900'} font-black text-xs shadow-sm border border-gray-100/50`}>
                            {coupon.store_logo ? (
                                <Image src={coupon.store_logo} alt={storeName} fill className="object-contain p-1" sizes="32px" />
                            ) : (
                                storeName.charAt(0)
                            )}
                        </div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-gray-500">{storeName}</span>
                    </div>
                    
                    <h4 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 line-clamp-2">
                        {coupon.title}
                    </h4>

                    <div className="mt-1 flex flex-wrap items-center gap-3">
                        {coupon.verified && (
                            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px]">
                                <CheckCircle2 size={12} />
                                Verified
                            </span>
                        )}
                        <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                            <Clock size={14} className="text-gray-400" />
                            {coupon.expiry}
                        </span>
                    </div>
                </div>

                {/* Right: Reveal area */}
                <div className="flex w-full lg:w-48 flex-col items-center justify-center gap-4 border-t border-gray-100 p-5 sm:p-6 lg:border-t-0 lg:border-l lg:border-gray-100 bg-gray-50/50 shrink-0 transition-colors group-hover:bg-gray-50">
                    <div className="text-center">
                        <span className="block text-xl font-black tracking-tight text-emerald-600">{coupon.discount}</span>
                        <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-gray-500">Offer Value</span>
                    </div>

                    {coupon.code && coupon.code.toLowerCase() !== "no code" && coupon.code.trim().toLowerCase() !== "offer activated" ? (
                        <button
                            onClick={handleReveal}
                            className="group/btn relative flex w-full h-11 items-center overflow-hidden rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/50 transition-all hover:border-blue-400 cursor-pointer active:scale-[0.98]"
                        >
                            {/* Half revealed code */}
                            <div className="flex flex-1 items-center justify-start pl-3 h-full">
                                <span className="font-mono text-sm font-black tracking-widest text-blue-900">
                                    {coupon.code.slice(0, 3)}<span className="text-blue-300 blur-[2px] select-none">XXXX</span>
                                </span>
                            </div>
                            
                            {/* Get Code slide-over */}
                            <div className="absolute right-0 top-0 bottom-0 flex w-[65%] items-center justify-center bg-blue-600 shadow-[-8px_0_15px_rgba(37,99,235,0.15)] transition-all duration-300 group-hover/btn:w-full group-hover/btn:bg-blue-700">
                                <span className="text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap">
                                    Show Code
                                </span>
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={handleReveal}
                            className="group/btn flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-black hover:shadow-md active:scale-[0.98]"
                        >
                            Get Deal
                            <ArrowRight size={16} className="ml-2 opacity-80 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
