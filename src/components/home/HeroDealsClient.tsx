"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Coupon } from "@/types/coupon";

interface HeroDealsClientProps {
    initialDeals: Coupon[];
}

export default function HeroDealsClient({ initialDeals }: HeroDealsClientProps) {
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const displayDeals = initialDeals.map((deal, index) => ({
        tag: index === 0 ? "FEATURED DEAL" : index === 1 ? "POPULAR" : "EXCLUSIVE",
        store: deal.store_name || deal.store,
        title: deal.title,
        description: deal.discount,
        buttonText: deal.code ? "Get Coupon" : "Get Deal",
        color: deal.color || "bg-blue-100 text-blue-900",
        image: deal.cover_image || deal.store_logo,
        href: `/coupons/${deal.store_slug || deal.store}/${deal.slug}`,
        storeUrl: deal.store_url,
    }));

    const handleDealClick = (dealHref: string, storeUrl?: string) => {
        if (storeUrl) {
            window.open(storeUrl, "_blank", "noopener,noreferrer");
        }
        router.push(dealHref);
    };

    const updatePagesAndIndex = () => {
        if (!scrollRef.current) return;
        const el = scrollRef.current;
        const pages = Math.round(el.scrollWidth / el.clientWidth);
        setTotalPages(pages);
        
        const index = Math.round(el.scrollLeft / el.clientWidth);
        setCurrentIndex(index);
    };

    useEffect(() => {
        updatePagesAndIndex();
        window.addEventListener('resize', updatePagesAndIndex);
        return () => window.removeEventListener('resize', updatePagesAndIndex);
    }, []);

    // Auto-play slider
    useEffect(() => {
        if (totalPages <= 1) return;
        
        const intervalId = setInterval(() => {
            setCurrentIndex((prev) => {
                const next = (prev + 1) % totalPages;
                if (scrollRef.current) {
                    const width = scrollRef.current.clientWidth;
                    scrollRef.current.scrollTo({ left: next * width, behavior: "smooth" });
                }
                return next;
            });
        }, 5000);

        return () => clearInterval(intervalId);
    }, [totalPages]);

    const scrollTo = (index: number) => {
        if (!scrollRef.current) return;
        const width = scrollRef.current.clientWidth;
        scrollRef.current.scrollTo({ left: index * width, behavior: "smooth" });
        setCurrentIndex(index);
    };

    // Group deals into pairs for 70/30 pages
    const dealPages = [];
    for (let i = 0; i < displayDeals.length; i += 2) {
        dealPages.push({
            left: displayDeals[i],
            right: displayDeals[i + 1]
        });
    }

    return (
        <section className="relative">
            <div 
                ref={scrollRef}
                        onScroll={updatePagesAndIndex}
                        className="flex snap-x snap-mandatory overflow-x-auto gap-4 sm:gap-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {dealPages.map((page, i) => (
                            <div key={i} className="min-w-full snap-start shrink-0 flex flex-col md:flex-row gap-4 sm:gap-6">
                                
                                {/* Left Card (70%) */}
                                {page.left && (
                                    <div 
                                        onClick={() => handleDealClick(page.left.href, page.left.storeUrl)}
                                        className="cursor-pointer group relative flex w-full md:w-[70%] flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 transition-all hover:border-gray-300 hover:shadow-sm"
                                    >
                                        <div className="relative h-56 sm:h-64 w-full shrink-0 overflow-hidden bg-gray-100">
                                            {page.left.image ? (
                                                <Image src={page.left.image} alt={page.left.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 70vw" priority />
                                            ) : (
                                                <div className={`w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105 ${page.left.color}`}>
                                                    <span className="text-4xl sm:text-5xl font-black uppercase tracking-widest opacity-15">
                                                        {page.left.store}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute left-4 top-4 rounded-md bg-white/95 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold tracking-widest text-gray-900 shadow-sm uppercase z-10">
                                                {page.left.tag}
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                                            <div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{page.left.store}</span>
                                                <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{page.left.title}</h2>
                                                <p className="mt-1 text-base text-gray-500">{page.left.description}</p>
                                            </div>
                                            <div className="mt-6 flex items-center justify-between font-medium text-gray-900">
                                                <span className="text-sm">{page.left.buttonText}</span>
                                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                                    <ArrowUpRight size={18} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Right Card (30%) */}
                                {page.right && (
                                    <div 
                                        onClick={() => handleDealClick(page.right.href, page.right.storeUrl)}
                                        className="cursor-pointer group relative flex w-full md:w-[30%] flex-col overflow-hidden rounded-2xl bg-white border border-gray-200 transition-all hover:border-gray-300 hover:shadow-sm"
                                    >
                                        <div className="relative h-40 sm:h-64 w-full shrink-0 overflow-hidden bg-gray-100">
                                            {page.right.image ? (
                                                <Image src={page.right.image} alt={page.right.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 30vw" />
                                            ) : (
                                                <div className={`w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105 ${page.right.color}`}>
                                                    <span className="text-3xl font-black uppercase tracking-widest opacity-15">
                                                        {page.right.store}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute left-4 top-4 rounded-md bg-white/95 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold tracking-widest text-gray-900 shadow-sm uppercase z-10">
                                                {page.right.tag}
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                                            <div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">{page.right.store}</span>
                                                <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900">{page.right.title}</h2>
                                                <p className="mt-1 text-sm text-gray-500">{page.right.description}</p>
                                            </div>
                                            <div className="mt-5 flex items-center justify-between font-medium text-gray-900">
                                                <span className="text-sm hidden xl:block">{page.right.buttonText}</span>
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 transition-colors group-hover:bg-blue-600 group-hover:text-white ml-auto xl:ml-0">
                                                    <ArrowUpRight size={16} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    {totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-center gap-2">
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollTo(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        currentIndex === idx ? "w-8 bg-gray-900" : "w-2 bg-gray-300 hover:bg-gray-400"
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
        </section>
    );
}