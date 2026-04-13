import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
  content: string[];
}> = {
  "web-design-trends-2026": {
    title: "10 Web Design Trends to Watch in 2026",
    excerpt: "Discover the latest web design trends that are shaping the digital landscape this year.",
    category: "Design",
    date: "Apr 10, 2026",
    readTime: "5 min read",
    color: "bg-blue-500",
    content: [
      "The web design landscape is constantly evolving, and 2026 is no exception. From AI-driven layouts to immersive 3D experiences, this year brings exciting innovations that are reshaping how we think about digital design.",
      "AI-Powered Design is leading the charge. Tools that automatically generate layouts, color schemes, and even content based on user behavior are becoming mainstream. Designers are now focusing more on strategy and creativity while AI handles the heavy lifting of responsive layouts.",
      "Immersive 3D Elements are becoming more accessible thanks to WebGL and Three.js improvements. Websites now feature interactive 3D product showcases, animated backgrounds, and spatial navigation that create memorable user experiences.",
      "Micro-interactions continue to gain importance. Subtle animations on hover, scroll, and click provide visual feedback that makes websites feel alive and responsive. These small details significantly improve user engagement and satisfaction.",
      "Dark mode is no longer optional. With most operating systems and browsers supporting dark themes, websites must offer seamless dark mode experiences. This includes careful color selection for readability and accessibility in both modes.",
      "Minimalist navigation with mega menus and command palettes are replacing traditional navigation bars. Users expect quick access to content through search-first interfaces inspired by apps like Spotlight and VS Code.",
      "Variable fonts are revolutionizing typography on the web. A single font file can now contain multiple weights and styles, reducing load times while providing designers with unprecedented typographic flexibility.",
      "Sustainability in web design is gaining traction. Optimized images, efficient code, green hosting, and reduced data transfer are becoming standard practices as the industry acknowledges its environmental impact.",
      "Accessibility-first design is no longer an afterthought. WCAG 2.2 compliance is becoming a baseline requirement, with designers building inclusive experiences from the ground up rather than retrofitting them later.",
      "These trends collectively point toward a future where websites are faster, more accessible, more sustainable, and more engaging than ever before. Staying ahead of these trends will give your business a competitive edge in the digital landscape.",
    ],
  },
  "boost-seo-rankings": {
    title: "How to Boost Your Website's SEO Rankings",
    excerpt: "Learn proven strategies to improve your search engine rankings and drive more organic traffic.",
    category: "SEO",
    date: "Apr 5, 2026",
    readTime: "7 min read",
    color: "bg-green-500",
    content: [
      "Search Engine Optimization remains one of the most effective ways to drive organic traffic to your website. In 2026, the SEO landscape has evolved significantly, but the fundamentals remain crucial.",
      "Start with thorough keyword research. Use tools like Google Keyword Planner, Ahrefs, or SEMrush to identify keywords your target audience is searching for. Focus on long-tail keywords with lower competition but high intent.",
      "On-page SEO is your foundation. Ensure every page has a unique title tag (under 60 characters), a compelling meta description (under 155 characters), and properly structured headings (H1, H2, H3) that include your target keywords naturally.",
      "Content quality is king. Google's algorithms increasingly prioritize helpful, original content that demonstrates expertise and authority. Write comprehensive articles that thoroughly answer user queries and provide genuine value.",
      "Technical SEO cannot be overlooked. Ensure your site loads in under 3 seconds, is mobile-friendly, has a proper XML sitemap, uses HTTPS, and has clean URL structures. Core Web Vitals are now a significant ranking factor.",
      "Build high-quality backlinks through guest posting, creating shareable content, and building relationships with industry peers. One link from a high-authority domain is worth more than hundreds of low-quality links.",
      "Local SEO is essential for businesses serving specific areas. Claim your Google Business Profile, ensure NAP (Name, Address, Phone) consistency across directories, and actively collect customer reviews.",
    ],
  },
  "mobile-friendly-website": {
    title: "Why Every Business Needs a Mobile-Friendly Website",
    excerpt: "Mobile traffic accounts for over 60% of web visits. Here's why responsive design is critical.",
    category: "Business",
    date: "Mar 28, 2026",
    readTime: "4 min read",
    color: "bg-purple-500",
    content: [
      "In 2026, mobile devices account for over 65% of global web traffic. If your website isn't optimized for mobile, you're losing more than half your potential customers.",
      "Google uses mobile-first indexing, meaning it primarily uses the mobile version of your website for ranking and indexing. A poor mobile experience directly impacts your search engine rankings.",
      "Mobile users have high expectations. They expect pages to load in under 3 seconds, navigation to be thumb-friendly, and content to be easily readable without zooming. Failing to meet these expectations results in high bounce rates.",
      "Responsive design is the solution. Rather than building separate mobile and desktop sites, responsive design adapts your website's layout to fit any screen size. This approach is more maintainable and provides a consistent brand experience.",
      "Key responsive design principles include flexible grid layouts, scalable images, touch-friendly buttons (minimum 44x44 pixels), readable font sizes (minimum 16px), and simplified navigation for smaller screens.",
      "The business impact is clear: companies with mobile-friendly websites see 74% higher mobile conversion rates, 67% more likely that visitors will make a purchase, and significantly lower bounce rates compared to non-optimized competitors.",
    ],
  },
  "ecommerce-conversion-tips": {
    title: "5 E-Commerce Conversion Optimization Tips",
    excerpt: "Increase your online store's conversion rate with these proven strategies.",
    category: "E-Commerce",
    date: "Mar 20, 2026",
    readTime: "6 min read",
    color: "bg-pink-500",
    content: [
      "E-commerce conversion optimization is the art and science of turning website visitors into paying customers. Even small improvements in conversion rate can significantly impact your revenue.",
      "Tip 1: Simplify your checkout process. The average cart abandonment rate is 70%. Reduce the number of form fields, offer guest checkout, support multiple payment methods, and show a clear progress indicator during checkout.",
      "Tip 2: Use high-quality product images and videos. Products with multiple images from different angles convert 58% better. Add zoom functionality, 360-degree views, and short product videos to help customers make confident purchase decisions.",
      "Tip 3: Build trust with social proof. Display customer reviews, ratings, testimonials, and trust badges prominently. Products with reviews convert 270% better than those without. Showcase real customer photos and user-generated content.",
      "Tip 4: Optimize page speed. Every second of delay in page load reduces conversions by 7%. Compress images, minimize code, use a CDN, and implement lazy loading to ensure your store loads lightning fast on all devices.",
      "Tip 5: Implement smart product recommendations. Personalized product suggestions based on browsing history and purchase patterns can increase revenue by 10-30%. Use 'Customers also bought' and 'You may also like' sections strategically.",
    ],
  },
  "website-security-guide": {
    title: "The Ultimate Website Security Guide for 2026",
    excerpt: "Protect your website from cyber threats with our comprehensive security guide.",
    category: "Security",
    date: "Mar 15, 2026",
    readTime: "8 min read",
    color: "bg-red-500",
    content: [
      "Website security is no longer optional — it's a necessity. With cyberattacks increasing by 38% year-over-year, every website owner must take proactive steps to protect their site and user data.",
      "Start with SSL/TLS encryption. An SSL certificate encrypts data transmitted between your website and visitors, protecting sensitive information. Google also uses HTTPS as a ranking signal, making it essential for SEO.",
      "Keep all software updated. Outdated CMS platforms, plugins, and themes are the primary attack vectors. Enable automatic updates where possible, and regularly audit your software stack for known vulnerabilities.",
      "Implement strong authentication. Use multi-factor authentication (MFA) for admin accounts, enforce strong password policies, and limit login attempts to prevent brute-force attacks. Consider passwordless authentication for enhanced security.",
      "Regular backups are your safety net. Automate daily backups stored in multiple locations (on-site and off-site). Test your backup restoration process regularly to ensure you can recover quickly from any incident.",
      "Web Application Firewalls (WAF) provide an essential layer of protection. A WAF filters and monitors HTTP traffic, blocking common attacks like SQL injection, cross-site scripting (XSS), and DDoS attacks before they reach your server.",
      "Security headers add another layer of protection. Implement Content Security Policy (CSP), X-Frame-Options, X-Content-Type-Options, and Strict-Transport-Security headers to prevent various attack vectors.",
      "Regular security audits and penetration testing help identify vulnerabilities before attackers do. Schedule quarterly security reviews and consider bug bounty programs for continuous security monitoring.",
    ],
  },
  "choosing-web-hosting": {
    title: "How to Choose the Right Web Hosting Provider",
    excerpt: "A complete guide to selecting the best hosting solution for your website.",
    category: "Hosting",
    date: "Mar 10, 2026",
    readTime: "5 min read",
    color: "bg-yellow-500",
    content: [
      "Choosing the right web hosting provider is one of the most important decisions for your online presence. Your host affects your website's speed, security, uptime, and ultimately, your business success.",
      "Shared hosting is the most affordable option, suitable for small websites and blogs with moderate traffic. However, you share server resources with other websites, which can impact performance during traffic spikes.",
      "VPS (Virtual Private Server) hosting offers dedicated resources within a shared environment. It's ideal for growing businesses that need more control and performance than shared hosting but aren't ready for a dedicated server.",
      "Dedicated hosting provides an entire server exclusively for your website. This is the best option for high-traffic sites, e-commerce stores, and applications requiring maximum performance, security, and customization.",
      "Cloud hosting distributes your website across multiple servers, providing excellent scalability and reliability. If one server fails, others take over seamlessly. This is ideal for businesses with fluctuating traffic.",
      "Key factors to evaluate: uptime guarantee (aim for 99.9%+), server speed and location, storage and bandwidth limits, SSL certificate inclusion, backup frequency, customer support availability, and scalability options.",
      "At Slatech Solutions, we provide managed hosting with 99.9% uptime, free SSL, daily backups, and 24/7 support. Contact us to find the perfect hosting solution for your needs.",
    ],
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-300 hover:text-primary transition-colors text-sm mb-6"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className={`${post.color} h-64 sm:h-80 relative`}>
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content */}
      <article className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed mb-6"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share & CTA */}
          <div className="border-t border-border mt-12 pt-8">
            <div className="bg-accent rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Need Help With Your Project?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Our team of experts is ready to help you build a website that
                drives results. Get a free consultation today.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all hover:scale-105 active:scale-95"
              >
                Get in Touch
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
