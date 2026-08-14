import type { Metadata } from "next";
import { getCouponDetail } from "@/lib/api";
import CouponDetailClient from "./CouponDetailClient";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ store: string; couponSlug: string }>;
}

// Dynamic SEO metadata per coupon
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { store, couponSlug } = await params;
        const coupon = await getCouponDetail(store, couponSlug);
        const storeName = coupon.store_name || coupon.store;
        
        return {
            title: `${storeName} Promo Code "${coupon.code}" — ${coupon.discount} | BlinkDeal`,
            description: `Verified ${storeName} coupon code ${coupon.code}: ${coupon.title}. ${coupon.expiry}. Copy and save instantly at BlinkDeal.`,
            openGraph: {
                title: `${storeName}: ${coupon.title}`,
                description: `Use code ${coupon.code} to get ${coupon.discount} at ${storeName}. Verified and working.`,
                siteName: "BlinkDeal",
            },
            twitter: {
                card: "summary",
                title: `${storeName}: ${coupon.title}`,
                description: `Use code ${coupon.code} to get ${coupon.discount} at ${storeName}.`,
            },
        };
    } catch (e) {
        return { title: "Coupon Not Found — BlinkDeal" };
    }
}

export default async function CouponDetailPage({ params }: Props) {
    try {
        const { store, couponSlug } = await params;
        const coupon = await getCouponDetail(store, couponSlug);
        const storeName = coupon.store_name || coupon.store;

        const couponSchema = {
            "@context": "https://schema.org",
            "@type": "DiscountOffer",
            name: coupon.title,
            description: coupon.description,
            discountCode: coupon.code,
            seller: {
                "@type": "Organization",
                name: storeName
            },
            url: `https://blinkdeal.cc/coupons/${coupon.store_slug || store}/${coupon.slug}`
        };

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(couponSchema) }}
                />
                <CouponDetailClient coupon={coupon} />
            </>
        );
    } catch (e) {
        console.error("PAGE ERROR:", e); notFound();
    }
}
