import Link from 'next/link'
import BlogCard from '@/components/BlogCard'
import NewsletterForm from '@/components/NewsletterForm'
import { getFeaturedPosts } from '@/lib/content'

export default function Home() {
  const featuredPosts = getFeaturedPosts('blog', 6)

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-ryeo-dark">
        {/* Background Image (placeholder) */}
        <div className="absolute inset-0 bg-gradient-to-b from-ryeo-dark via-ryeo-dark/80 to-ryeo-light opacity-90" />

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl md:text-8xl font-bold text-ryeo-light mb-4 leading-tight">
            RYEO<br />LABS
          </h1>
          <p className="text-xl md:text-3xl text-ryeo-light/80 mb-8 font-light">
            Innovation Laboratory by Anne Reyes
          </p>
          <p className="text-lg text-ryeo-light/60 mb-12">
            Keep Moving Forward
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/about"
              className="px-8 py-3 bg-ryeo-red text-ryeo-light font-semibold rounded-lg hover:bg-ryeo-red/90 transition-colors"
            >
              Learn More
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 border-2 border-ryeo-light text-ryeo-light font-semibold rounded-lg hover:bg-ryeo-light/10 transition-colors"
            >
              Read Blog
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="text-ryeo-light/60">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 md:py-24 bg-ryeo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading-2 mb-6">Who is Anne Reyes?</h2>
              <p className="text-body mb-4">
                I am the founder of Ryeo Labs, an innovation laboratory dedicated to exploring
                technology, building projects, and sharing knowledge about entrepreneurship and
                creative thinking.
              </p>
              <p className="text-body mb-8">
                My mission is to innovate, learn, and inspire others to build the future together.
              </p>
              <Link
                href="/about"
                className="inline-block px-6 py-3 bg-ryeo-red text-ryeo-light font-semibold rounded-lg hover:bg-ryeo-red/90 transition-colors"
              >
                Read Full Story
              </Link>
            </div>
            <div className="relative h-96 bg-ryeo-dark/10 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-ryeo-red/20 to-ryeo-accent/20" />
              <p className="absolute inset-0 flex items-center justify-center text-ryeo-dark/40">
                [Featured Image]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16 md:py-24 bg-ryeo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-heading-2 mb-4">Latest Articles</h2>
            <p className="text-body text-ryeo-dark/70">
              Exploring technology, innovation, and personal growth.
            </p>
          </div>

          {/* Blog Grid */}
          {featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-body text-ryeo-dark/60">
                Blog posts coming soon...
              </p>
            </div>
          )}

          {/* View All Button */}
          {featuredPosts.length > 0 && (
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-block px-6 py-3 bg-ryeo-red text-ryeo-light font-semibold rounded-lg hover:bg-ryeo-red/90 transition-colors"
              >
                View All Articles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-ryeo-red text-ryeo-light">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-heading-2 mb-4 text-ryeo-light">
            Stay Updated
          </h2>
          <p className="text-lg text-ryeo-light/80 mb-8">
            Subscribe to my newsletter to get the latest posts, projects, and insights delivered
            directly to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}
