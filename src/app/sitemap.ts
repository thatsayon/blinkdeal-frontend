import { MetadataRoute } from "next";
import { getCoupons, getPosts, getStores } from "@/lib/api";

const BASE_URL = "https://blinkdeal.cc";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    // 1. Static and Hub Pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
        { url: `${BASE_URL}/deals`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${BASE_URL}/trending`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${BASE_URL}/stores`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
        { url: `${BASE_URL}/posts`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
        { url: `${BASE_URL}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/advertise`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ];

    // 2. Dynamic Store Pages (/stores/[slug])
    const stores = await getStores().catch(() => []);
    const storePages: MetadataRoute.Sitemap = stores
        .filter((store) => store.slug)
        .map((store) => ({
            url: `${BASE_URL}/stores/${store.slug}`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.85,
        }));

    // 3. Dynamic Blog Post Pages (/posts/[slug])
    const posts = await getPosts().catch(() => []);
    const postPages: MetadataRoute.Sitemap = posts
        .filter((post) => post.slug)
        .map((post) => ({
            url: `${BASE_URL}/posts/${post.slug}`,
            lastModified: post.updated_at ? new Date(post.updated_at) : (post.published_at ? new Date(post.published_at) : now),
            changeFrequency: "weekly",
            priority: 0.8,
        }));

    // 4. Dynamic Coupon Detail Pages (/coupons/[store]/[slug])
    const coupons = await getCoupons().catch(() => []);
    const couponPages: MetadataRoute.Sitemap = coupons
        .filter((coupon) => coupon.slug && (coupon.store_slug || coupon.store))
        .map((coupon) => ({
            url: `${BASE_URL}/coupons/${coupon.store_slug || coupon.store}/${coupon.slug}`,
            lastModified: coupon.updated_at ? new Date(coupon.updated_at) : now,
            changeFrequency: "daily",
            priority: 0.7,
        }));

    return [...staticPages, ...storePages, ...postPages, ...couponPages];
}
