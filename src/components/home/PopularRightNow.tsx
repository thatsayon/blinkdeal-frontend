import Link from "next/link";
import { Flame, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getPopularStores } from "@/lib/api";

export default async function PopularRightNow() {
    const popularRightNow = await getPopularStores(8);

    return (
        <section>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-100 text-orange-600">
                        <Flame size={24} />
                    </span>
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900">Popular Right Now</h3>
                        <p className="text-sm text-gray-500 mt-0.5">Real-time trending stores based on shopper clicks</p>
                    </div>
                </div>
            </div>
            
            <div className="rounded-2xl border border-gray-100 bg-gray-100 overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px">
                   {popularRightNow.map((item, index) => (
                       <Link 
                           href={`/stores/${item.slug}`}
                           key={item.id} 
                           className="group flex items-center justify-between bg-white p-5 hover:bg-gray-50 transition-colors"
                       >
                            <div className="flex items-center gap-5">
                                <span className={`text-base font-black w-5 text-center ${index < 3 ? 'text-gray-900' : 'text-gray-300'}`}>
                                    {index + 1}
                                </span>
                                <span className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-4 border border-gray-100 bg-gray-50/50 px-3 py-1.5 rounded-lg group-hover:bg-white transition-colors">
                                <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors">{item.clicks} clicks</span>
                                {item.trend === "up" && <TrendingUp size={16} strokeWidth={3} className="text-emerald-500" />}
                                {item.trend === "down" && <TrendingDown size={16} strokeWidth={3} className="text-rose-500" />}
                                {item.trend === "neutral" && <Minus size={16} strokeWidth={3} className="text-gray-400" />}
                            </div>
                       </Link>
                   ))}
                </div>
            </div>
        </section>
    );
}
