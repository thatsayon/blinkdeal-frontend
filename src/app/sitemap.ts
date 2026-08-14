import { MetadataRoute } from "next";
import { getCoupons } from "@/lib/api";

const BASE_URL = "https://blinkdeal.cc";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
        { url: `${BASE_URL}/deals`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
        { url: `${BASE_URL}/trending`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
        { url: `${BASE_URL}/stores`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/advertise`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ];

    // Dynamic coupon detail pages
    const coupons = await getCoupons().catch(() => []);
    
    const couponPages: MetadataRoute.Sitemap = coupons.map((coupon) => ({
        url: `${BASE_URL}/coupons/${coupon.store_slug || coupon.store}/${coupon.slug}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.85,
    }));

    return [...staticPages, ...couponPages];
}
