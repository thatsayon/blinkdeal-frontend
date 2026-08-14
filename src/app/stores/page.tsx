import type { Metadata } from "next";
import StoresClient from "./StoresClient";
import { getStores } from "@/lib/api";

export const metadata: Metadata = {
    title: "All Stores — Coupon Codes & Promo Codes",
    description: "Browse our complete directory of top retailers and brands. Find verified promo codes for Nike, Amazon, Walmart, Best Buy, Sephora, and hundreds more stores.",
    alternates: { canonical: "https://blinkdeal.cc/stores" },
};

export default async function StoresPage() {
    const stores = await getStores();
    return <StoresClient initialStores={stores} />;
}
