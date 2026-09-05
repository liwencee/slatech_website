import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Why Slatech — What Makes Us Different as a Technology Partner",
  description:
    "Not another web design agency selling templates. Here's what actually sets Slatech Solutions apart as a digital product and software development company in Lagos, Nigeria.",
  keywords: [
    "why choose slatech solutions",
    "best software development company lagos",
    "digital agency comparison nigeria",
  ],
  openGraph: {
    title: "Why Slatech — What Makes Us Different as a Technology Partner",
    description: "What actually sets Slatech Solutions apart as a digital product and software development company in Lagos, Nigeria.",
    url: "https://slatech.com.ng/why-slatech",
    type: "website",
    images: [{ url: "/SLATECH  SOLUTIONS LOGO.png", width: 1200, height: 630, alt: "Slatech Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Slatech — What Makes Us Different as a Technology Partner",
    description: "What actually sets Slatech Solutions apart as a digital product and software development company in Lagos, Nigeria.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: { canonical: "https://slatech.com.ng/why-slatech" },
};

const comparisons = [
  { question: "Do you only build websites?", answer: "No. Websites are one of nine service categories we work in — the same team also builds e-commerce platforms, custom software, web applications, mobile apps and cloud infrastructure. If your needs grow past a website, you don't need a new vendor." },
  { question: "Do you use templates?", answer: "Every website and application is built around the specific business's requirements, not a recycled template with a new logo pasted on. Discovery happens before design work starts, every time." },
  { question: "What happens after launch?", answer: "We offer ongoing website management, hosting, and technical support — not a one-time handoff. Our relationship is structured to continue after your project goes live, not end there." },
  { question: "Can you handle something more complex than a website?", answer: "Yes. Beyond web design, we build ERP and CRM systems, customer portals, booking platforms, and SaaS products — see our Enterprise Solutions page for what that looks like in practice." },
  { question: "Is your team local?", answer: "Yes. We're based in Ikeja, Lagos, and work with clients across Nigeria and internationally — meaning real-time communication in your timezone, not an offshore handoff." },
];

export default function WhySlatechPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparisons.map((c) => ({
      "@type": "Question",
      name: c.question,
      acceptedAnswer: { "@type": "Answer", text: c.answer },
    })),
  };

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Why Slatech", path: "/why-slatech" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Why Slatech
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Not Another Agency Selling <span className="text-primary">Templates</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            There are hundreds of web designers and agencies in Lagos. Here's what
            actually sets Slatech apart, in plain terms.
          </p>
        </div>
      </section>

      {/* Real differentiators */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">One Partner, Not a Vendor for Every Project Type</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most Lagos web design agencies stop at websites. If your business later needs
              an online store, a customer portal, a booking system, or a mobile app, you're
              usually starting over with a new vendor who doesn't know your business.
              Slatech covers websites, e-commerce, custom software, web applications,
              mobile apps, cloud infrastructure, SEO, hosting and branding under one roof —
              see the full breakdown on our <Link href="/services" className="text-primary font-semibold hover:underline">Services page</Link>.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Business Problem First, Technology Second</h2>
            <p className="text-muted-foreground leading-relaxed">
              We don&apos;t start a project by picking a template. Every engagement begins
              with understanding what the business actually needs the solution to
              achieve — the same discovery-first approach whether we&apos;re building a
              landing page or an enterprise system. Read more about our approach on the{" "}
              <Link href="/about" className="text-primary font-semibold hover:underline">About page</Link>.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Ownership That Stays With You</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every website and application we build belongs entirely to the client — the
              domain, hosting account, and code are yours from day one. We don&apos;t build
              on locked platforms you can&apos;t leave.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-3">A Real Engineering Stack, Not Guesswork</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our team works with modern, industry-standard technologies — see exactly
              what we use on the <Link href="/technology" className="text-primary font-semibold hover:underline">Technology page</Link> —
              rather than whatever page-builder plugin happens to be cheapest that week.
            </p>
          </div>
        </div>
      </section>

      {/* Quick answers */}
      <section className="py-16 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
            Quick <span className="text-primary">Answers</span>
          </h2>
          <div className="space-y-4">
            {comparisons.map((c) => (
              <details key={c.question} className="group bg-white rounded-xl border border-border p-5 cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-foreground text-sm list-none">
                  {c.question}
                  <svg className="w-4 h-4 text-primary shrink-0 transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">See It for Yourself</h2>
          <p className="text-white/80 mb-8">
            The best way to judge a technology partner is a conversation about your
            actual project — not a sales pitch.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
