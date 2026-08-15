import { NextResponse } from 'next/server';

const BASE_URL = 'https://blinkdeal.cc';

export async function GET() {
    const now = new Date().toISOString();
    
    const pages = [
        { url: BASE_URL, priority: 1.0, changefreq: 'daily' },
        { url: `${BASE_URL}/deals`, priority: 0.9, changefreq: 'daily' },
        { url: `${BASE_URL}/trending`, priority: 0.9, changefreq: 'daily' },
        { url: `${BASE_URL}/stores`, priority: 0.85, changefreq: 'daily' },
        { url: `${BASE_URL}/posts`, priority: 0.85, changefreq: 'daily' },
        { url: `${BASE_URL}/categories`, priority: 0.8, changefreq: 'weekly' },
        { url: `${BASE_URL}/about`, priority: 0.6, changefreq: 'monthly' },
        { url: `${BASE_URL}/contact`, priority: 0.5, changefreq: 'monthly' },
        { url: `${BASE_URL}/advertise`, priority: 0.5, changefreq: 'monthly' },
        { url: `${BASE_URL}/privacy`, priority: 0.3, changefreq: 'yearly' },
        { url: `${BASE_URL}/terms`, priority: 0.3, changefreq: 'yearly' },
        { url: `${BASE_URL}/cookies`, priority: 0.3, changefreq: 'yearly' },
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
    .map(
        (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
