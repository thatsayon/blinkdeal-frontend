import Link from "next/link";
import { getTrendingCoupons } from "@/lib/api";
import CouponCard from "@/components/coupons/CouponCard";

export default async function TrendingCoupons() {
    const coupons = await getTrendingCoupons();
    // Show only first 6 on the homepage widget
    const trendingCoupons = coupons.slice(0, 6);
    return (
        <section>
            <div className="flex items-end justify-between">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900">Trending Coupons</h3>
                    <p className="mt-1 text-sm text-gray-500">The most popular deals used by shoppers today.</p>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {trendingCoupons.map((coupon) => (
                    <CouponCard key={coupon.id} coupon={coupon} />
                ))}
            </div>

            <div className="mt-10 text-center">
                <Link
                    href="/trending"
                    className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-8 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                >
                    Show all trending coupons
                </Link>
            </div>
        </section>
    );
}
