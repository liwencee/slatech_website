import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Latest insights, tips, and trends from DigitoWebs — web design, SEO, e-commerce, and more.",
};

// Static blog posts for now — will be replaced with Supabase queries
const posts = [
  {
    slug: "web-design-trends-2026",
    title: "10 Web Design Trends to Watch in 2026",
    excerpt:
      "Discover the latest web design trends that are shaping the digital landscape this year, from AI-driven layouts to immersive 3D experiences.",
    category: "Design",
    date: "Apr 10, 2026",
    readTime: "5 min read",
    color: "bg-blue-500",
  },
  {
    slug: "boost-seo-rankings",
    title: "How to Boost Your Website's SEO Rankings",
    excerpt:
      "Learn proven strategies to improve your search engine rankings and drive more organic traffic to your website.",
    category: "SEO",
    date: "Apr 5, 2026",
    readTime: "7 min read",
    color: "bg-green-500",
  },
  {
    slug: "mobile-friendly-website",
    title: "Why Every Business Needs a Mobile-Friendly Website",
    excerpt:
      "Mobile traffic accounts for over 60% of web visits. Here's why responsive design is critical for your business success.",
    category: "Business",
    date: "Mar 28, 2026",
    readTime: "4 min read",
    color: "bg-purple-500",
  },
  {
    slug: "ecommerce-conversion-tips",
    title: "5 E-Commerce Conversion Optimization Tips",
    excerpt:
      "Increase your online store's conversion rate with these proven strategies from our e-commerce experts.",
    category: "E-Commerce",
    date: "Mar 20, 2026",
    readTime: "6 min read",
    color: "bg-pink-500",
  },
  {
    slug: "website-security-guide",
    title: "The Ultimate Website Security Guide for 2026",
    excerpt:
      "Protect your website from cyber threats with our comprehensive security guide covering SSL, firewalls, and best practices.",
    category: "Security",
    date: "Mar 15, 2026",
    readTime: "8 min read",
    color: "bg-red-500",
  },
  {
    slug: "choosing-web-hosting",
    title: "How to Choose the Right Web Hosting Provider",
    excerpt:
      "A complete guide to selecting the best hosting solution for your website based on performance, security, and budget.",
    category: "Hosting",
    date: "Mar 10, 2026",
    readTime: "5 min read",
    color: "bg-yellow-500",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Our Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Latest <span className="text-primary">Insights</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights from our
            team of experts.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className={`aspect-[16/9] ${post.color} relative`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 text-xs font-semibold text-foreground rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
