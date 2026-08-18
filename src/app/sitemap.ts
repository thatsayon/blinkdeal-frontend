import { MetadataRoute } from 'next';
import { getStores, getCoupons, getProducts, getPosts, getCategories } from '@/lib/api';

const BASE_URL = 'https://blinkdeal.cc';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();
    
    // Static Pages
    const pages: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
        { url: `${BASE_URL}/deals`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
        { url: `${BASE_URL}/trending`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
        { url: `${BASE_URL}/stores`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
        { url: `${BASE_URL}/posts`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
        { url: `${BASE_URL}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${BASE_URL}/advertise`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${BASE_URL}/cookies`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    ];

    try {
        const [storesData, couponsData, productsData, postsData, categoriesData] = await Promise.all([
            getStores().catch(() => []),
            getCoupons().catch(() => []),
            getProducts().catch(() => []),
            getPosts().catch(() => []),
            getCategories().catch(() => [])
        ]);

        const storesSitemap: MetadataRoute.Sitemap = storesData
            .filter((store) => store.slug)
            .map((store) => ({
                url: `${BASE_URL}/stores/${store.slug}`,
                lastModified: store.updated_at ? new Date(store.updated_at) : now,
                changeFrequency: 'daily',
                priority: 0.85,
            }));

        const couponsSitemap: MetadataRoute.Sitemap = couponsData
            .filter((coupon) => coupon.slug && (coupon.store_slug || coupon.store))
            .map((coupon) => ({
                url: `${BASE_URL}/coupons/${coupon.store_slug || coupon.store}/${coupon.slug}`,
                lastModified: coupon.updated_at ? new Date(coupon.updated_at) : now,
                changeFrequency: 'daily',
                priority: 0.7,
            }));

        const productsSitemap: MetadataRoute.Sitemap = productsData
            .filter((product) => product.slug && (product.store_slug || product.store))
            .map((product) => ({
                url: `${BASE_URL}/stores/${product.store_slug || product.store}/products/${product.slug}`,
                lastModified: now, // updated_at is not always available based on old code
                changeFrequency: 'daily',
                priority: 0.7,
            }));

        const postsSitemap: MetadataRoute.Sitemap = postsData
            .filter((post) => post.slug)
            .map((post) => ({
                url: `${BASE_URL}/posts/${post.slug}`,
                lastModified: post.updated_at ? new Date(post.updated_at) : (post.published_at ? new Date(post.published_at) : now),
                changeFrequency: 'weekly',
                priority: 0.8,
            }));

        const categoriesSitemap: MetadataRoute.Sitemap = categoriesData
            .filter((category) => category.slug)
            .map((category) => ({
                url: `${BASE_URL}/categories/${category.slug}`,
                lastModified: category.updated_at ? new Date(category.updated_at) : now,
                changeFrequency: 'weekly',
                priority: 0.8,
            }));

        return [
            ...pages,
            ...storesSitemap,
            ...couponsSitemap,
            ...productsSitemap,
            ...postsSitemap,
            ...categoriesSitemap,
        ];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return pages;
    }
}
