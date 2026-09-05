import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Web Design Company in Lagos, Nigeria — Slatech Solutions",
  description:
    "Looking for a web design company in Lagos? Slatech builds professional, mobile-first, SEO-optimised websites for Nigerian businesses. Based in Ikeja, Lagos.",
  keywords: ["web design company lagos", "web design company nigeria", "professional web design lagos"],
  openGraph: {
    title: "Web Design Company in Lagos, Nigeria — Slatech Solutions",
    description: "Professional, mobile-first, SEO-optimised websites for Nigerian businesses. Based in Ikeja, Lagos.",
    url: "https://slatech.com.ng/web-design-company-lagos",
    type: "website",
    images: [{ url: "/SLATECH  SOLUTIONS LOGO.png", width: 1200, height: 630, alt: "Slatech Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Company in Lagos, Nigeria — Slatech Solutions",
    description: "Professional, mobile-first, SEO-optimised websites for Nigerian businesses. Based in Ikeja, Lagos.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: { canonical: "https://slatech.com.ng/web-design-company-lagos" },
};

const checklist = [
  "A live portfolio you can test on your own phone, not just screenshots",
  "Full ownership of your domain, hosting and code",
  "Mobile-first design — most Lagos internet users browse on mobile",
  "SEO-friendly structure built in from day one",
  "A clear price breakdown with no hidden recurring costs",
  "A named point of contact after launch, not radio silence",
];

export default function WebDesignCompanyLagosPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Web Design Company Lagos", path: "/web-design-company-lagos" }]} />

      <section className="bg-secondary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Web Design Company in Lagos
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            A Web Design Company in Lagos That <span className="text-primary">Builds for Results</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Slatech Solutions is based in Ikeja, Lagos, and designs professional,
            mobile-first, SEO-optimised websites for businesses across Nigeria.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
            What to Look For in a Lagos Web Design Company
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 text-center max-w-2xl mx-auto">
            Lagos has hundreds of web designers, ranging from serious agencies to
            one-person operations working from a template. Here&apos;s what a website
            built with Slatech includes as standard:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {checklist.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-accent rounded-xl px-4 py-3">
                <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">More Than a Website Company</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            If your business grows past a website — an online store, a customer portal, a
            mobile app — the same team can build that too. See our full{" "}
            <Link href="/services" className="text-primary font-semibold hover:underline">range of services</Link>{" "}
            or read <Link href="/why-slatech" className="text-primary font-semibold hover:underline">why businesses choose Slatech</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get a Free Website Consultation</h2>
          <p className="text-white/80 mb-8">Tell us about your business and we&apos;ll recommend the right approach.</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  );
}
