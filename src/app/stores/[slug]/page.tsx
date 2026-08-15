import type { Metadata } from "next";
import StoreDetailClient from "@/app/stores/[slug]/StoreDetailClient";
import { getStoreDetail, getStoreCoupons } from "@/lib/api";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { slug } = await params;
        const store = await getStoreDetail(slug);
        
        return {
            title: `${store.name} Promo Codes & Coupons | BlinkDeal`,
            description: store.description || `Find the best and verified promo codes for ${store.name} at BlinkDeal.`,
            alternates: { canonical: `https://blinkdeal.cc/stores/${store.slug}` },
        };
    } catch (e) {
        return { title: "Store Not Found — BlinkDeal" };
    }
}

export default async function StoreDetailPage({ params }: Props) {
    try {
        const { slug } = await params;
        const [store, coupons] = await Promise.all([
            getStoreDetail(slug),
            getStoreCoupons(slug)
        ]);

        return <StoreDetailClient store={store} coupons={coupons} />;
    } catch (e) {
        console.error("Store detail page error:", e);
        notFound();
    }
}
