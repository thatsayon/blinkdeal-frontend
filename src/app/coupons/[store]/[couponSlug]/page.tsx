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
            alternates: {
                canonical: `https://blinkdeal.cc/coupons/${coupon.store_slug || store}/${coupon.slug}`
            },
            openGraph: {
                title: `${storeName}: ${coupon.title}`,
                description: `Use code ${coupon.code} to get ${coupon.discount} at ${storeName}. Verified and working.`,
                siteName: "BlinkDeal",
                type: "website",
                url: `https://blinkdeal.cc/coupons/${coupon.store_slug || store}/${coupon.slug}`,
                images: [
                    {
                        url: `https://blinkdeal.cc/og/${coupon.slug}.jpg`,
                        width: 1200,
                        height: 630,
                        alt: `${storeName} Coupon`
                    }
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: `${storeName}: ${coupon.title}`,
                description: `Use code ${coupon.code} to get ${coupon.discount} at ${storeName}.`,
                images: [`https://blinkdeal.cc/og/${coupon.slug}.jpg`],
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
            name: `${storeName} — ${coupon.title}`,
            description: `Coupon discount: ${coupon.discount}. ${coupon.description}`,
            discountCode: coupon.code,
            seller: {
                "@type": "Organization",
                name: storeName
            },
            url: `https://blinkdeal.cc/coupons/${coupon.store_slug || store}/${coupon.slug}`
        };

        const isOfferActivated = coupon.code?.trim().toLowerCase() === "offer activated";
        const pageUrl = `https://blinkdeal.cc/coupons/${coupon.store_slug || store}/${coupon.slug}`;

        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://blinkdeal.cc/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Coupons",
                    "item": "https://blinkdeal.cc/trending"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": storeName,
                    "item": pageUrl
                }
            ]
        };

        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": `Is ${isOfferActivated ? "this deal" : "the code " + coupon.code} working?`,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `Yes — our team verified this ${isOfferActivated ? "deal" : "code"}. It is currently active and working.`
                    }
                },
                {
                    "@type": "Question",
                    "name": "When does this offer expire?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": coupon.expiry === "Ongoing" ? "This offer has no set expiry date and is ongoing." : `This offer expires soon — ${coupon.expiry}. We recommend using it as soon as possible.`
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can I stack this with other coupons?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": `Most stores allow one promo code per order. Check ${storeName}'s checkout page for stacking eligibility.`
                    }
                }
            ]
        };

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify([couponSchema, breadcrumbSchema, faqSchema]) }}
                />
                <CouponDetailClient coupon={coupon} />
            </>
        );
    } catch (e) {
        console.error("PAGE ERROR:", e); notFound();
    }
}
