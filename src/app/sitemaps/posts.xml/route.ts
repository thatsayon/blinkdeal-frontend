import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/api';

const BASE_URL = 'https://blinkdeal.cc';

export async function GET() {
    const posts = await getPosts().catch(() => []);
    const now = new Date().toISOString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${posts
    .filter((post) => post.slug)
    .map((post) => {
        const lastMod = post.updated_at 
            ? new Date(post.updated_at).toISOString() 
            : (post.published_at ? new Date(post.published_at).toISOString() : now);
            
        return `  <url>
    <loc>${BASE_URL}/posts/${post.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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
