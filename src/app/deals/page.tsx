import type { Metadata } from "next";
import DealsClient from "./DealsClient";
import { getCoupons } from "@/lib/api";

export const metadata: Metadata = {
    title: "Latest Deals & Coupon Codes",
    description:
        "Browse the latest verified deals, promo codes, and discounts across all categories. Filter by store or category to find exactly the offer you need and save instantly.",
    alternates: { canonical: "https://blinkdeal.cc/deals" },
    openGraph: {
        title: "Latest Deals & Coupon Codes | BlinkDeal",
        description:
            "Thousands of verified deals and promo codes updated daily. Filter by Fashion, Electronics, Beauty, Home, and more.",
    },
};

export default async function DealsPage() {
    const coupons = await getCoupons();
    return <DealsClient initialCoupons={coupons} />;
}
