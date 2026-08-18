import { NextResponse } from 'next/server';
import { getStores } from '@/lib/api';
import { Store } from '@/types/store';

const BASE_URL = 'https://blinkdeal.cc';

export const dynamic = 'force-dynamic';

export async function GET() {
    const stores: Store[] = await getStores().catch(() => []);
    const now = new Date().toISOString().split('.')[0] + 'Z';

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${stores
    .filter((store) => store.slug)
    .map((store) => {
        const lastMod = store.updated_at ? new Date(store.updated_at).toISOString().split('.')[0] + 'Z' : now;
        return `  <url>
    <loc>${BASE_URL}/stores/${store.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
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
