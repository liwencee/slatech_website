import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";

export const metadata: Metadata = {
  title: "Our Portfolio — Web Design Projects by Slatech Solutions",
  description:
    "Browse real websites, brands and digital projects we have built for 500+ Nigerian businesses. See our Lagos web design portfolio and get inspired.",
  openGraph: {
    title: "Our Portfolio — Web Design Projects by Slatech Solutions",
    description:
      "Browse real websites, brands and digital projects we have built for 500+ Nigerian businesses. See our Lagos web design portfolio and get inspired.",
    url: "https://slatech.com.ng/portfolio",
    type: "website",
    images: [
      {
        url: "/SLATECH  SOLUTIONS LOGO.png",
        width: 1200,
        height: 630,
        alt: "Slatech Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Portfolio — Web Design Projects by Slatech Solutions",
    description:
      "Browse real websites, brands and digital projects we have built for 500+ Nigerian businesses. See our Lagos web design portfolio and get inspired.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: {
    canonical: "https://slatech.com.ng/portfolio",
  },
};

const moreProjectTypes = [
  { title: "Corporate Websites", description: "Professional websites designed to establish credibility and generate business opportunities.", href: "/services#website-design" },
  { title: "E-Commerce", description: "Online stores and commerce platforms designed around products, customers and payment flows.", href: "/services#ecommerce" },
  { title: "Custom Software", description: "Business systems developed to automate processes and improve operational efficiency.", href: "/services#software" },
  { title: "Web Applications", description: "Secure online platforms connecting businesses, employees and customers.", href: "/services#web-applications" },
  { title: "Mobile Applications", description: "Mobile experiences designed to extend digital products to customers and teams.", href: "/services#mobile" },
];

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }]} />

      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Our Work
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Digital Solutions Built to Solve <span className="text-primary">Real Business Problems</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We don&apos;t measure our work by screenshots alone. Every project starts with
            a business objective and ends with a digital solution designed to create
            measurable value.
          </p>
        </div>
      </section>

      {/* Filter + Grid (client component — needs interactivity) */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioGrid />
        </div>
      </section>

      {/* More Projects — by service type */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">
              More <span className="text-primary">Projects</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {moreProjectTypes.map((type) => (
              <Link
                key={type.title}
                href={type.href}
                className="group bg-accent rounded-2xl p-6 hover:bg-primary/5 border border-transparent hover:border-primary/30 transition-all duration-300 block"
              >
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{type.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{type.description}</p>
                <span className="inline-flex items-center text-sm font-medium text-primary">
                  View Projects
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to See What We Can Build for Your Business?
          </h2>
          <p className="text-white/80 mb-8">
            Every business has different requirements. Let&apos;s discuss your objectives
            and determine the right solution.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </>
  );
}
