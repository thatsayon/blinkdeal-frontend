import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/api';

const BASE_URL = 'https://blinkdeal.cc';

export const dynamic = 'force-dynamic';

export async function GET() {
    const products = await getProducts().catch(() => []);
    const now = new Date().toISOString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${products
    .filter((product) => product.slug && (product.store_slug || product.store))
    .map((product) => {
        const lastMod = now; // If products have updated_at, use it here
        return `  <url>
    <loc>${BASE_URL}/stores/${product.store_slug || product.store}/products/${product.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('\n')}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8',
        },
    });
}
