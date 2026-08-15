import { NextResponse } from 'next/server';

const BASE_URL = 'https://blinkdeal.cc';

export async function GET() {
    const sitemaps = [
        'pages.xml',
        'stores.xml',
        'coupons.xml',
        'posts.xml',
        'categories.xml'
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
    .map(
        (sitemap) => `  <sitemap>
    <loc>${BASE_URL}/sitemaps/${sitemap}</loc>
  </sitemap>`
    )
    .join('\n')}
</sitemapindex>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
