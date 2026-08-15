import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPostDetail, getPosts } from '@/lib/api';
import PostCard from '@/components/posts/PostCard';
import ShareButtons from '@/components/posts/ShareButtons';
import { notFound } from 'next/navigation';
import { Calendar, ChevronLeft, User, Share2 } from 'lucide-react';

// Force dynamic rendering for SEO
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

// Dynamically generate metadata for SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const post = await getPostDetail(resolvedParams.slug);

    const ogImages = post.cover_image
      ? [
          {
            url: post.cover_image,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ]
      : [];

    const postUrl = `https://blinkdeal.cc/posts/${post.slug}`;

    return {
      title: `${post.title} | BlinkDeal`,
      description: post.excerpt,
      alternates: {
        canonical: postUrl,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: postUrl,
        siteName: 'BlinkDeal',
        locale: 'en_US',
        images: ogImages,
        type: 'article',
        publishedTime: post.published_at,
        authors: post.author?.name ? [post.author.name] : ['BlinkDeal'],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: post.cover_image ? [post.cover_image] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found | BlinkDeal',
      description: 'The requested post could not be found.',
    };
  }
}

export default async function PostDetailPage({ params }: Props) {
  try {
    const resolvedParams = await params;
    const post = await getPostDetail(resolvedParams.slug);

    // Fetch some recent posts for the "More Posts" section
    const recentPosts = await getPosts();
    const relatedPosts = recentPosts.filter(p => p.id !== post.id).slice(0, 3);

    const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      image: post.cover_image ? [post.cover_image] : [],
      datePublished: post.published_at,
      dateModified: post.updated_at || post.published_at,
      author: [
        {
          "@type": post.author?.name ? "Person" : "Organization",
          name: post.author?.name || "BlinkDeal",
        },
      ],
      publisher: {
        "@type": "Organization",
        name: "BlinkDeal",
        logo: {
          "@type": "ImageObject",
          url: "https://blinkdeal.cc/logo.png"
        }
      },
      description: post.excerpt
    };

  return (
    <article className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Hero Section */}
      <header className="pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <Link 
            href="/posts" 
            className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors font-medium text-sm"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to all posts
          </Link>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-700 mb-8">
            {post.author ? (
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-gray-100 flex items-center justify-center">
                  {post.author.avatar ? (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-gray-900">{post.author.name}</span>
                  <span className="text-xs text-gray-500">Author</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  BD
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-gray-900">BlinkDeal</span>
                  <span className="text-xs text-gray-500">Editor</span>
                </div>
              </div>
            )}
            
            <div className="hidden sm:block w-px h-8 bg-gray-200" />
            
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.published_at} className="font-medium text-sm">
                {formattedDate}
              </time>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.cover_image && (
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 max-w-3xl pt-4 pb-12">
        <div className="prose prose-lg md:prose-xl prose-blue max-w-none text-gray-700 mb-16
          prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
          prose-h2:mt-10 prose-h2:mb-5 prose-h2:text-3xl
          prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-2xl prose-img:shadow-md
          prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2
          prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        {/* Share Section */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <Share2 className="w-5 h-5 text-gray-500" />
            <span>Share this article</span>
          </div>
          <ShareButtons title={post.title} />
        </div>
      </main>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-16 border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center tracking-tight">More from BlinkDeal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA Section */}
      <section className="bg-gray-50 border-t border-gray-100 py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay ahead of the deals</h3>
          <p className="text-gray-600 mb-8 text-lg">
            Join our newsletter to get the best shopping guides and savings strategies delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="px-6 py-3.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-grow max-w-sm shadow-sm text-base"
            />
            <button className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors shadow-md hover:shadow-lg text-base">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </article>
  );
  } catch (error) {
    notFound();
  }
}
