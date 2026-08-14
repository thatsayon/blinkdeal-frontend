import { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/api';
import PostCard from '@/components/posts/PostCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Opt into dynamic rendering to ensure fresh data for SEO
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog & Insights | BlinkDeal',
  description: 'Shopping guides, financial deep-dives, deal adventures, and practical saving tips.',
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PostsPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;

  const allPosts = await getPosts();
  
  // Extract unique tags (used as categories here)
  const categories = Array.from(new Set(allPosts.flatMap(post => post.tags)));

  // Filter
  const filteredPosts = category ? allPosts.filter(p => p.tags.includes(category)) : allPosts;

  // Paginate
  const POSTS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (pageNum > 1) params.set('page', pageNum.toString());
    if (category) params.set('category', category);
    const qs = params.toString();
    return `/posts${qs ? `?${qs}` : ''}`;
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Header Section with Soft Gradient Background */}
      <div className="relative pt-16 pb-8 overflow-hidden">
        {/* Soft Radial Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-radial from-blue-50/80 to-transparent blur-3xl opacity-70"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl text-center">

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#1a1f2c] tracking-tight mb-6 flex items-center justify-center gap-3 flex-wrap">
            Shopping Tips & <span className="text-blue-600 font-serif italic pr-2 font-normal">Insights</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-lg md:text-[19px] max-w-2xl mx-auto leading-relaxed">
            Shopping guides, financial deep-dives, deal adventures, and practical saving tips, from experts who know deals inside out.
          </p>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 md:px-6 pb-24 max-w-[1400px]">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            href="/posts"
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${!category
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/posts?category=${encodeURIComponent(cat)}`}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${category === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {paginatedPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg font-medium">There are currently no articles published. Please check back later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Link
                  href={createPageUrl(currentPage - 1)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 transition-colors ${currentPage <= 1
                    ? 'pointer-events-none opacity-50'
                    : 'hover:bg-gray-50 hover:border-gray-300 text-gray-700'
                    }`}
                  aria-disabled={currentPage <= 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Link>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <Link
                        key={pageNumber}
                        href={createPageUrl(pageNumber)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors ${pageNumber === currentPage
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                          : 'text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        {pageNumber}
                      </Link>
                    );
                  })}
                </div>

                <Link
                  href={createPageUrl(currentPage + 1)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 transition-colors ${currentPage >= totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'hover:bg-gray-50 hover:border-gray-300 text-gray-700'
                    }`}
                  aria-disabled={currentPage >= totalPages}
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </>
        )}
      </main>

    </div>
  );
}
