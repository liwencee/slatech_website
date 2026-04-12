import Link from "next/link";

const posts = [
  {
    title: "10 Web Design Trends to Watch in 2026",
    excerpt:
      "Discover the latest web design trends that are shaping the digital landscape this year.",
    category: "Design",
    date: "Apr 10, 2026",
    readTime: "5 min read",
    color: "bg-blue-500",
  },
  {
    title: "How to Boost Your Website's SEO Rankings",
    excerpt:
      "Learn proven strategies to improve your search engine rankings and drive more organic traffic.",
    category: "SEO",
    date: "Apr 5, 2026",
    readTime: "7 min read",
    color: "bg-green-500",
  },
  {
    title: "Why Every Business Needs a Mobile-Friendly Website",
    excerpt:
      "Mobile traffic accounts for over 60% of web visits. Here's why responsive design is critical.",
    category: "Business",
    date: "Mar 28, 2026",
    readTime: "4 min read",
    color: "bg-purple-500",
  },
];

export function BlogSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
            Our Blog
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Latest <span className="text-primary">Insights</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Stay updated with the latest trends, tips, and insights from our
            team of experts.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.title}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className={`aspect-[16/9] ${post.color} relative`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 text-xs font-semibold text-foreground rounded-full">
                  {post.category}
                </span>
              </div>
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-primary">
                  Read More
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center px-7 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            View All Blog Posts
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
