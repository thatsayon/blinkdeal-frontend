import { getTrendingCoupons } from "@/lib/api";
import CouponCard from "@/components/coupons/CouponCard";
import { TrendingUp } from "lucide-react";

export default async function TrendingClient() {
    const coupons = await getTrendingCoupons();
    
    return (
        <main className="min-h-screen bg-white pb-24">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

                {/* Editorial Header */}
                <div className="mb-16 border-b-2 border-gray-900 pb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                            <TrendingUp size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-orange-600">Live Data</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-900">
                        Trending right now.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-gray-500 font-medium leading-relaxed">
                        The most frequently used and verified promo codes on BlinkDeal over the last 24 hours. Click <strong className="text-gray-700">Reveal</strong> to unlock the full code and get redirected to the store.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {coupons.map((coupon) => (
                        <CouponCard key={coupon.id} coupon={coupon} />
                    ))}
                </div>

            </div>
        </main>
    );
}
