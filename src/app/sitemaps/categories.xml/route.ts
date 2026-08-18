import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/api';

const BASE_URL = 'https://blinkdeal.cc';

export const dynamic = 'force-dynamic';

export async function GET() {
    const categories = await getCategories().catch(() => []);
    const now = new Date().toISOString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${categories
    .filter((category) => category.slug)
    .map((category) => {
        const lastMod = category.updated_at ? new Date(category.updated_at).toISOString() : now;
        return `  <url>
    <loc>${BASE_URL}/categories/${category.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
