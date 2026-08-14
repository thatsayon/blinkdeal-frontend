import type { Metadata } from "next";
import HeroDeals from "@/components/home/HeroDeal";
import TodaysDeals from "@/components/home/TodaysDeals";
import TrendingCoupons from "@/components/home/TrendingCoupons";
import RecentlyAdded from "@/components/home/RecentlyAdded";
import PopularRightNow from "@/components/home/PopularRightNow";
import PopularStores from "@/components/home/PopularStores";
import HowItWorks from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";
import SeoContent from "@/components/home/SeoContent";

export const metadata: Metadata = {
  title: "BlinkDeal — Find the Best Coupon Codes & Deals",
  description:
    "Discover thousands of verified coupon codes and exclusive deals from top brands like Nike, Amazon, Sephora, and more. Save money every time you shop with BlinkDeal.",
  alternates: { canonical: "https://blinkdeal.cc" },
};


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* <Hero /> */}
        <HeroDeals />

        <hr className="my-8 border-gray-100" />

        <TodaysDeals />

        <hr className="my-8 border-gray-100" />

        <TrendingCoupons />

        <hr className="my-8 border-gray-100" />

        <PopularRightNow />

        <hr className="my-8 border-gray-100" />

        <PopularStores />

        <hr className="my-8 border-gray-100" />

        <HowItWorks />

        <hr className="my-8 border-gray-100" />

        <RecentlyAdded />

        <hr className="my-8 border-gray-100" />

        <Newsletter />

        <hr className="my-8 border-gray-100" />

        <SeoContent />
      </div>
    </main>
  );
}
