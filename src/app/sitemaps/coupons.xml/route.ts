import { NextResponse } from 'next/server';
import { getCoupons } from '@/lib/api';

const BASE_URL = 'https://blinkdeal.cc';

export const dynamic = 'force-dynamic';

export async function GET() {
    const coupons = await getCoupons().catch(() => []);
    const now = new Date().toISOString().split('.')[0] + 'Z';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${coupons
    .filter((coupon) => coupon.slug && (coupon.store_slug || coupon.store))
    .map((coupon) => {
        const lastMod = coupon.updated_at ? new Date(coupon.updated_at).toISOString().split('.')[0] + 'Z' : now;
        return `  <url>
    <loc>${BASE_URL}/coupons/${coupon.store_slug || coupon.store}/${coupon.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('\n')}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
