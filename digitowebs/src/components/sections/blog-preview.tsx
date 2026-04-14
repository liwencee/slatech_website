import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const posts = [
  {
    slug: "why-nigerian-businesses-need-professional-website",
    title: "7 Reasons Your Nigerian Business Needs a Professional Website in 2026",
    excerpt:
      "Over 70% of Nigerian consumers research businesses online before buying. A professional website isn't optional — it's your most powerful sales tool in Lagos and beyond.",
    category: "Business",
    categoryColor: "bg-blue-600",
    date: "Apr 10, 2026",
    readTime: "5 min read",
    gradient: "from-blue-600 to-blue-800",
    icon: (
      <svg className="w-10 h-10 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    slug: "how-to-rank-on-google-nigeria-seo-guide",
    title: "How to Rank on Google in Nigeria: SEO Guide for Lagos Businesses",
    excerpt:
      "Step-by-step SEO strategies tailored for Nigerian businesses. Learn how to appear on the first page of Google for keywords your Lagos customers are actually searching.",
    category: "SEO",
    categoryColor: "bg-green-600",
    date: "Apr 5, 2026",
    readTime: "7 min read",
    gradient: "from-green-600 to-emerald-800",
    icon: (
      <svg className="w-10 h-10 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    slug: "ecommerce-in-nigeria-how-to-start-selling-online",
    title: "E-Commerce in Nigeria: How to Start Selling Online from Lagos",
    excerpt:
      "Nigeria's e-commerce market is booming. Discover how Slatech helps Lagos entrepreneurs launch profitable online stores that accept Paystack, bank transfers, and more.",
    category: "E-Commerce",
    categoryColor: "bg-purple-600",
    date: "Mar 28, 2026",
    readTime: "6 min read",
    gradient: "from-purple-600 to-violet-800",
    icon: (
      <svg className="w-10 h-10 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
];

export function BlogSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              Slatech Blog
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Web Design &amp; Digital Marketing{" "}
              <span className="text-primary">Tips for Nigerian Businesses</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Expert insights on website design, SEO, and e-commerce for businesses in Lagos,
              Ikeja, and across Nigeria.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimateOnScroll key={post.slug} animation="fade-up" delay={i * 150}>
              <article className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                {/* Thumbnail */}
                <div className={`aspect-[16/9] bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                    {post.icon}
                  </div>
                  {/* Grid lines decoration */}
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
                  />
                  <span className={`absolute top-3 left-3 px-3 py-1 ${post.categoryColor} text-xs font-semibold text-white rounded-full shadow-sm`}>
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug text-base">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-primary mt-auto"
                  >
                    Read Article
                    <svg className="ml-1 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>

        {/* View All */}
        <AnimateOnScroll animation="fade-up" delay={200}>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center px-7 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary/25"
            >
              View All Articles
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
