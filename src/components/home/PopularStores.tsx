import Link from "next/link";
import { Tag, Percent, ChevronLeft, ChevronRight } from "lucide-react";
import { getPopularStores } from "@/lib/api";

export default async function PopularStores() {
    const popularStores = await getPopularStores(13); // 1 for featured, 12 for grid
    if (popularStores.length === 0) return null;

    const featuredStore = popularStores[0];
    const gridStores = popularStores.slice(1);

    return (
        <section className="mt-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                
                {/* Left Featured Card */}
                <div className="relative flex w-full shrink-0 flex-col justify-between overflow-hidden rounded-2xl bg-gray-900 text-white lg:w-80 xl:w-96">
                    {/* Background Accent */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black opacity-80"></div>
                    
                    <div className="relative p-8">
                        <p className="text-sm font-bold tracking-widest text-[#d4ff00]">MOST POPULAR</p>
                        <h3 className="mt-2 text-3xl font-bold tracking-tight">Store Of The Month</h3>
                        
                        <Link 
                            href={`/stores/${featuredStore.slug}`}
                            className="group mt-10 flex h-40 w-full items-center justify-center rounded-2xl bg-black/40 border border-white/10 shadow-inner backdrop-blur-sm transition-all hover:bg-black/60 hover:border-white/20"
                        >
                            <span className="text-3xl font-black tracking-widest text-white transition-transform group-hover:scale-105 uppercase">{featuredStore.name}</span>
                        </Link>
                    </div>
                    
                    {/* Bottom Stats */}
                    <div className="relative flex border-t border-white/10 bg-black/40 p-5">
                        <div className="flex flex-1 flex-col items-center justify-center border-r border-white/10">
                            <span className="mb-2 text-[#d4ff00]">
                                <Tag size={20} />
                            </span>
                            <span className="text-sm font-medium text-gray-300">Popular</span>
                        </div>
                        <div className="flex flex-1 flex-col items-center justify-center">
                            <span className="mb-2 text-[#d4ff00]">
                                <Percent size={20} />
                            </span>
                            <span className="text-sm font-medium text-gray-300">Top Deals</span>
                        </div>
                    </div>
                </div>

                {/* Right Grid Section */}
                <div className="flex-1 overflow-hidden">
                    {/* Header & Controls */}
                    <div className="mb-8 flex items-center justify-between">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Popular Stores</h3>
                        
                        <div className="flex items-center gap-3">
                            <button className="p-1 text-gray-400 transition-colors hover:text-gray-900" aria-label="Previous">
                                <ChevronLeft size={24} />
                            </button>
                            <div className="flex items-center gap-1.5 hidden sm:flex">
                                <div className="h-1.5 w-6 rounded-full bg-[#d4ff00]"></div>
                                <div className="h-1.5 w-1.5 rounded-full bg-gray-200"></div>
                                <div className="h-1.5 w-1.5 rounded-full bg-gray-200"></div>
                            </div>
                            <button className="p-1 text-gray-400 transition-colors hover:text-gray-900" aria-label="Next">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                    
                    {/* Stores Grid */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:gap-x-6 md:gap-y-8 xl:grid-cols-4">
                        {gridStores.map((store) => (
                            <Link 
                                key={store.id} 
                                href={`/stores/${store.slug}`}
                                className="group flex flex-col items-center"
                            >
                                {/* Logo Box */}
                                <div className={`flex h-20 sm:h-24 w-full items-center justify-center rounded-2xl border border-gray-100 ${store.logo_color} shadow-sm transition-all duration-300 group-hover:border-gray-200 group-hover:shadow-md group-hover:-translate-y-1`}>
                                    <span className={`text-xl sm:text-2xl font-black tracking-tight`}>
                                        {store.name.substring(0, 10)}
                                    </span>
                                </div>
                                {/* Store Name Below */}
                                <span className="mt-3 text-center text-sm font-semibold text-gray-700 transition-colors group-hover:text-gray-900">
                                    {store.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
