import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/types/post';
import { Calendar, ArrowUpRight } from 'lucide-react';

export default function PostCard({ post }: { post: Post }) {
  const primaryTag = post.tags[0] || 'Article';
  const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={`/posts/${post.slug}`} className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
      <article className="h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        
        {/* Image Container */}
        <div className="relative h-[240px] w-full bg-gray-100 border-b border-black/[0.04] overflow-hidden">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Floating Category Pill */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[11px] font-bold tracking-widest uppercase text-blue-600 rounded-full shadow-sm border border-black/[0.04]">
              {primaryTag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 flex flex-col flex-grow">
          <h2 className="text-xl md:text-[22px] font-bold text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {post.title}
          </h2>
          
          <p className="text-gray-500 line-clamp-3 text-[15px] leading-relaxed mb-6 flex-grow">
            {post.excerpt}
          </p>

          {/* Meta Info (Date & Arrow) */}
          <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-1.5 text-gray-500 text-[13px] font-medium tracking-wide">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.published_at}>{formattedDate}</time>
            </div>
            
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 border border-gray-200 text-gray-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
        
      </article>
    </Link>
  );
}
