import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Latest insights, tips, and trends from Slatech Solutions — web design, SEO, e-commerce, and more.",
};

// Static blog posts — newest first
const posts = [
  /* ---- NEW POSTS ---- */
  {
    slug: "what-is-seo-and-why-your-business-needs-it",
    title: "What Is SEO and Why Does Your Nigerian Business Absolutely Need It in 2026?",
    excerpt:
      "Still wondering if SEO is worth it? A plain-English breakdown of what SEO actually is — and why it's the highest-ROI investment your Lagos business can make right now.",
    category: "SEO",
    date: "Apr 22, 2026",
    readTime: "8 min read",
    color: "bg-emerald-600",
  },
  {
    slug: "complete-guide-growing-business-online-nigeria",
    title: "The Complete Guide to Growing Your Business Online in Nigeria (2026 Edition)",
    excerpt:
      "From getting found on Google to converting visitors into loyal paying customers — a step-by-step playbook for Nigerian entrepreneurs who want to build a serious online presence.",
    category: "Business",
    date: "Apr 19, 2026",
    readTime: "10 min read",
    color: "bg-cyan-600",
  },
  {
    slug: "10-reasons-nigerian-business-needs-website-2026",
    title: "10 Reasons Every Nigerian Business Needs a Website in 2026 (Even If You're Winning on Social Media)",
    excerpt:
      "Your Instagram is doing well — so why do you need a website? Here are 10 compelling reasons why Nigeria's fastest-growing businesses never rely on social media alone.",
    category: "Business",
    date: "Apr 16, 2026",
    readTime: "7 min read",
    color: "bg-indigo-600",
  },
  {
    slug: "digital-marketing-strategies-nigerian-businesses",
    title: "5 Digital Marketing Strategies That Actually Drive Results for Nigerian Businesses",
    excerpt:
      "Cut through the noise. These are the five digital marketing moves that consistently generate leads, sales, and growth for businesses across Lagos and Nigeria.",
    category: "Digital Marketing",
    date: "Apr 13, 2026",
    readTime: "8 min read",
    color: "bg-orange-600",
  },
  {
    slug: "how-to-choose-web-designer-lagos",
    title: "How to Choose the Right Web Designer in Lagos: 8 Questions to Ask Before You Pay",
    excerpt:
      "Lagos is full of web designers. How do you choose the right one? Ask these 8 questions and you'll never make the wrong choice or waste your money.",
    category: "Web Design",
    date: "Apr 10, 2026",
    readTime: "6 min read",
    color: "bg-rose-600",
  },
  {
    slug: "social-media-vs-website-nigerian-business",
    title: "Social Media vs Website: What Does Your Nigerian Business Actually Need?",
    excerpt:
      "Instagram or website? WhatsApp Business or contact form? Many Nigerian entrepreneurs invest in the wrong channel. Here's how to decide — and in what order.",
    category: "Business",
    date: "Apr 7, 2026",
    readTime: "7 min read",
    color: "bg-violet-600",
  },
  /* ---- EXISTING POSTS ---- */
  {
    slug: "why-nigerian-businesses-need-professional-website",
    title: "7 Reasons Your Nigerian Business Needs a Professional Website in 2026",
    excerpt:
      "Over 70% of Nigerian consumers research businesses online before buying. A professional website isn't optional — it's your most powerful sales tool in Lagos and beyond.",
    category: "Business",
    date: "Apr 10, 2026",
    readTime: "5 min read",
    color: "bg-blue-600",
  },
  {
    slug: "how-to-rank-on-google-nigeria-seo-guide",
    title: "How to Rank on Google in Nigeria: SEO Guide for Lagos Businesses",
    excerpt:
      "Step-by-step SEO strategies tailored for Nigerian businesses. Learn how to appear on the first page of Google for keywords your Lagos customers are actually searching.",
    category: "SEO",
    date: "Apr 5, 2026",
    readTime: "7 min read",
    color: "bg-green-600",
  },
  {
    slug: "ecommerce-in-nigeria-how-to-start-selling-online",
    title: "E-Commerce in Nigeria: How to Start Selling Online from Lagos",
    excerpt:
      "Nigeria's e-commerce market is booming. Discover how Slatech helps Lagos entrepreneurs launch profitable online stores that accept Paystack, bank transfers, and more.",
    category: "E-Commerce",
    date: "Mar 28, 2026",
    readTime: "6 min read",
    color: "bg-purple-600",
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
