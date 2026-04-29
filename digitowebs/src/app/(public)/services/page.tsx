import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Web design, e-commerce, SEO, hosting, and management services by Slatech Solutions. Everything you need to succeed online.",
};

const services = [
  {
    id: "website-design",
    title: "Website Design",
    description:
      "Custom website designs that reflect your brand identity and engage visitors. We create responsive, modern layouts that look stunning on every device.",
    features: [
      "Custom UI/UX Design",
      "Responsive & Mobile-First",
      "Brand-Aligned Aesthetics",
      "Fast Loading Speeds",
      "SEO-Optimized Structure",
      "Cross-Browser Compatible",
    ],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    imageAlt: "Web design workspace with laptop and design tools",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Websites",
    description:
      "Powerful online stores with secure payment gateways, inventory management, and conversion-optimized checkout flows that drive sales.",
    features: [
      "Secure Payment Integration",
      "Inventory Management",
      "Order Tracking",
      "Product Search & Filters",
      "Abandoned Cart Recovery",
      "Analytics Dashboard",
    ],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    imageAlt: "E-commerce shopping experience on laptop and mobile",
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    description:
      "Data-driven SEO strategies that boost your organic rankings, drive targeted traffic, and increase conversions for lasting growth.",
    features: [
      "Keyword Research & Strategy",
      "On-Page Optimization",
      "Technical SEO Audit",
      "Link Building",
      "Content Strategy",
      "Monthly Analytics Reports",
    ],
    image: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800&q=80",
    imageAlt: "SEO analytics dashboard showing website rankings and traffic",
  },
  {
    id: "hosting",
    title: "Website Hosting",
    description:
      "Fast, reliable, and secure hosting solutions with 99.9% uptime guarantee, daily backups, and 24/7 technical support.",
    features: [
      "99.9% Uptime Guarantee",
      "Daily Automated Backups",
      "SSL Certificate Included",
      "CDN Integration",
      "24/7 Technical Support",
      "Scalable Resources",
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    imageAlt: "Data center server racks for reliable website hosting",
  },
  {
    id: "management",
    title: "Website Management",
    description:
      "Comprehensive website maintenance including updates, security monitoring, performance optimization, and content updates.",
    features: [
      "Regular Software Updates",
      "Security Monitoring",
      "Performance Optimization",
      "Content Updates",
      "Uptime Monitoring",
      "Monthly Reports",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    imageAlt: "Website management dashboard showing performance metrics and uptime",
  },
  {
    id: "branding",
    title: "Fully Managed Branding Service",
    description:
      "End-to-end branding and graphic design — we handle everything from brand identity creation to visual assets, consistency, and design management so you can focus on growing your business.",
    features: [
      "Brand Identity & Logo Design",
      "Marketing & Promotional Materials",
      "Visual Content Creation",
      "Brand Guidelines & Strategy",
      "Social Media Graphics",
      "Priority Creative Support",
    ],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    imageAlt: "Professional team managing a fully managed website service",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            What We <span className="text-primary">Offer</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            From stunning designs to powerful e-commerce solutions, we provide
            everything you need to succeed online.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
                <div
                  className={`aspect-[4/3] rounded-2xl relative overflow-hidden shadow-xl ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* subtle overlay + number badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-gray-300 mb-8">
            Contact us for a free consultation and we&apos;ll recommend the best
            solution for your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors"
          >
            Talk To Us
          </Link>
        </div>
      </section>
    </>
  );
}
