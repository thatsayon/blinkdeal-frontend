// Server component wrapper — exports metadata, renders client component
import type { Metadata } from "next";
import TrendingClient from "./TrendingClient";

export const metadata: Metadata = {
    title: "Trending Coupons & Promo Codes Today",
    description:
        "The most popular and frequently used coupon codes on BlinkDeal right now. All verified and working. Reveal your code and save instantly.",
    alternates: { canonical: "https://blinkdeal.cc/trending" },
    openGraph: {
        title: "Trending Coupons & Promo Codes Today | BlinkDeal",
        description:
            "Browse today's top trending promo codes. Updated hourly with the deals shoppers are using the most.",
    },
};

export default function TrendingPage() {
    return <TrendingClient />;
}
