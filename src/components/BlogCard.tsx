import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/content'

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer h-full">
        {/* Featured Image */}
        <div className="relative overflow-hidden rounded-lg h-64 bg-ryeo-dark/10 mb-4">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Semi-transparent overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-ryeo-dark group-hover:text-ryeo-red transition-colors">
            {post.title}
          </h3>

          <p className="text-ryeo-dark/70 text-sm line-clamp-3">
            {post.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between pt-2">
            <time className="text-xs text-ryeo-dark/50">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            {post.author && (
              <span className="text-xs text-ryeo-dark/50">{post.author}</span>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-ryeo-red/10 text-ryeo-red px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
