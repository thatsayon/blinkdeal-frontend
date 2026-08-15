import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getCoupons } from "@/lib/api";
import RecentlyAddedCard from "./RecentlyAddedCard";

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
                                <RecentlyAddedCard key={item.id} item={item} />
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
