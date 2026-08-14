import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { getCoupons } from "@/lib/api";

export default async function RecentlyAdded() {
    const coupons = await getCoupons();
    
    // Split into fake groups since seed data all has same created_at
    const groupedCoupons = [
        {
            date: "Today",
            items: coupons.slice(0, 4)
        },
        {
            date: "Yesterday",
            items: coupons.slice(4, 7)
        }
    ];

    return (
        <section>
            {/* Header */}
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h3 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                        Recently Added
                        <span className="relative flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                        </span>
                    </h3>
                    <p className="mt-2 text-sm sm:text-base font-medium text-gray-500">Live feed of the latest deals verified by our community.</p>
                </div>
                <Link 
                    href="/coupons" 
                    className="hidden sm:flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                >
                    View all coupons <ArrowRight size={16} />
                </Link>
            </div>

            {/* Feed */}
            <div className="space-y-12">
                {groupedCoupons.map((group) => (
                    <div key={group.date} className="relative">
                        
                        {/* Date Badge (Flat) */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
                            <Clock size={14} />
                            {group.date}
                        </div>
                        
                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                            {group.items.map((item) => (
                                <Link 
                                    key={item.id}
                                    href={`/coupons/${item.store_slug}/${item.slug}`}
                                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:border-gray-200 hover:bg-gray-50/50"
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
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Mobile View All */}
            <div className="mt-8 sm:hidden">
                <Link 
                    href="/coupons" 
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
                >
                    View all coupons <ArrowRight size={16} />
                </Link>
            </div>
        </section>
    );
}
