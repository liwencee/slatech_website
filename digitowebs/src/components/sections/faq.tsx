import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const faqs = [
  {
    q: "How much does a website cost in Lagos, Nigeria?",
    a: "Website design with Slatech Solutions starts from ₦150,000 for a landing page, with full business and e-commerce websites ranging up to ₦1M+ depending on complexity, features, and number of pages. We offer flexible packages for startups, SMEs, and large corporations — contact us for a free, no-obligation quote tailored to your project.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most business websites are completed within 1–3 weeks, while larger e-commerce or custom web applications can take 3–6 weeks. We agree on a clear timeline with you before starting, and keep you updated with progress reviews throughout the build.",
  },
  {
    q: "What does your website design service include?",
    a: "Every website we design includes custom UI/UX design, responsive mobile-first layouts, brand-aligned aesthetics, fast loading speeds, SEO-optimised structure, and cross-browser compatibility — so your site looks great and performs well on every device.",
  },
  {
    q: "Can you build an online store (e-commerce website)?",
    a: "Yes. We build e-commerce websites with secure payment integration (including Paystack for Nigerian businesses), inventory management, order tracking, product search & filters, abandoned cart recovery, and an analytics dashboard to help you sell online effectively.",
  },
  {
    q: "Do you offer SEO services in Lagos?",
    a: "Yes. Our SEO service covers keyword research and strategy, on-page optimisation, technical SEO audits, link building, content strategy, and monthly analytics reports — designed to boost your organic Google rankings and drive targeted traffic.",
  },
  {
    q: "Do you provide website hosting?",
    a: "Yes. Our hosting plans include a 99.9% uptime guarantee, daily automated backups, a free SSL certificate, CDN integration, 24/7 technical support, and scalable resources — so your site stays fast, secure, and always online.",
  },
  {
    q: "Do you offer website management and maintenance?",
    a: "Yes. Our website management service covers regular software updates, security monitoring, performance optimisation, content updates, uptime monitoring, and monthly reports — so you never have to worry about the technical upkeep of your site.",
  },
  {
    q: "Do you handle branding and logo design?",
    a: "Yes. Our fully managed branding service covers brand identity and logo design, marketing and promotional materials, visual content creation, brand guidelines and strategy, social media graphics, and priority creative support — end-to-end branding so you can focus on running your business.",
  },
  {
    q: "Do you offer web design services outside Lagos?",
    a: "Yes. While our office is based in Ikeja, Lagos, we work with clients across Nigeria and internationally. All communication, design reviews, and project management happen remotely via WhatsApp, email, and video calls, so location is never a barrier.",
  },
  {
    q: "What industries do you work with?",
    a: "We've built websites for real estate, healthcare, education, restaurants, e-commerce, professional services, and more — for startups, SMEs, and large corporations and international firms across Nigeria and beyond.",
  },
  {
    q: "How do I get started with Slatech Solutions?",
    a: "Simply reach out via our contact form, WhatsApp (08076172456), or call us directly. We'll discuss your business goals, recommend the right services, and provide a free quote — usually within 24 hours.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export function FAQSection() {
  return (
    <section className="py-20 lg:py-28 bg-accent/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Everything you need to know about working with Lagos&apos; trusted web design agency.
              Can&apos;t find your answer?{" "}
              <a href="/contact" className="text-primary font-medium hover:underline">
                Reach out to us
              </a>
              .
            </p>
          </div>
        </AnimateOnScroll>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <AnimateOnScroll key={item.q} animation="fade-up" delay={i * 60}>
              <details className="group bg-white rounded-xl border border-border p-5 cursor-pointer transition-all duration-300 hover:border-primary/30">
                <summary className="flex items-center justify-between font-semibold text-foreground text-sm sm:text-base list-none">
                  {item.q}
                  <svg
                    className="w-4 h-4 text-primary shrink-0 ml-4 transition-transform group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
