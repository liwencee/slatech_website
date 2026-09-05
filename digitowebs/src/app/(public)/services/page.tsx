import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Web Design, SEO & Digital Marketing Services in Lagos",
  description:
    "Professional web design, SEO, branding, social media & graphic design services for Nigerian businesses. Get a free quote from Slatech Solutions today.",
  keywords: [
    "custom software development nigeria",
    "web application development lagos",
    "mobile app development nigeria",
    "cloud devops services lagos",
    "erp software nigeria",
    "crm development nigeria",
    "saas development nigeria",
    "api integration nigeria",
    "wordpress website design lagos",
  ],
  openGraph: {
    title: "Web Design, SEO & Digital Marketing Services in Lagos",
    description:
      "Professional web design, SEO, branding, social media & graphic design services for Nigerian businesses. Get a free quote from Slatech Solutions today.",
    url: "https://slatech.com.ng/services",
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
    title: "Web Design, SEO & Digital Marketing Services in Lagos",
    description:
      "Professional web design, SEO, branding, social media & graphic design services for Nigerian businesses. Get a free quote from Slatech Solutions today.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: {
    canonical: "https://slatech.com.ng/services",
  },
};

const services = [
  {
    id: "website-design",
    number: "01",
    title: "Website Design & Development",
    tagline: "Websites That Do More Than Look Good",
    description:
      "Your website is often the first interaction a potential customer has with your business. We build professional websites that combine strong visual design, intuitive user experience, responsive performance and search-engine-friendly architecture.",
    groups: [
      {
        label: "We Build",
        items: [
          "Corporate websites",
          "Business websites",
          "WordPress websites",
          "Custom websites",
          "Landing pages",
          "Professional service websites",
          "Organization and NGO websites",
          "Membership websites",
          "Web portals",
        ],
      },
      {
        label: "Every Project Can Include",
        items: [
          "UI/UX design",
          "Responsive development",
          "CMS integration",
          "Contact and lead forms",
          "SEO-friendly architecture",
          "Analytics",
          "Security configuration",
          "Performance optimization",
          "Hosting and deployment",
        ],
      },
    ],
    cta: "Build Your Website",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    imageAlt: "Web design workspace with laptop and design tools",
  },
  {
    id: "ecommerce",
    number: "02",
    title: "E-Commerce Development",
    tagline: "Turn Your Website Into a Sales Platform",
    description:
      "We build e-commerce solutions that make it easier for businesses to sell products and services online.",
    groups: [
      {
        label: "Features Can Include",
        items: [
          "Product management",
          "Shopping cart",
          "Secure checkout",
          "Payment gateway integration",
          "Paystack integration",
          "Flutterwave integration",
          "Customer accounts",
          "Order management",
          "Inventory management",
          "Product search and filtering",
          "Discounts and promotions",
          "Delivery configuration",
          "Sales reporting",
          "Admin dashboards",
        ],
      },
    ],
    cta: "Build an Online Store",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    imageAlt: "E-commerce shopping experience on laptop and mobile",
  },
  {
    id: "software",
    number: "03",
    title: "Custom Software Development",
    tagline: "Software Built Around the Way Your Business Works",
    description:
      "Off-the-shelf software doesn't always fit the way your organization operates. We design and develop custom software around your processes, users and business requirements.",
    groups: [
      {
        label: "Solutions Can Include",
        items: [
          "Business management systems",
          "ERP solutions",
          "CRM platforms",
          "Customer portals",
          "Staff management systems",
          "Inventory systems",
          "Booking platforms",
          "School management systems",
          "Membership platforms",
          "Financial management systems",
          "SaaS applications",
          "Workflow automation",
          "API-driven applications",
        ],
      },
    ],
    cta: "Discuss Your Software Project",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    imageAlt: "Software engineers collaborating on custom application development",
  },
  {
    id: "web-applications",
    number: "04",
    title: "Web Application Development",
    tagline: "Powerful Applications Accessible From Anywhere",
    description:
      "We develop web applications that allow businesses and their customers to interact with services, information and business processes through secure online platforms. From customer dashboards to complex administrative systems, we build applications around your requirements.",
    groups: [
      {
        label: "We Can Build",
        items: [
          "Customer portals",
          "Admin dashboards",
          "Booking systems",
          "Reservation systems",
          "Marketplace platforms",
          "Learning platforms",
          "Property platforms",
          "Business portals",
          "Internal company applications",
          "SaaS products",
        ],
      },
    ],
    cta: "Build a Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "Web application dashboard interface on a laptop screen",
  },
  {
    id: "mobile",
    number: "05",
    title: "Mobile Application Development",
    tagline: "Take Your Digital Product to Mobile",
    description:
      "We develop mobile applications that extend your products and services to customers and employees.",
    groups: [
      {
        label: "Mobile Solutions",
        items: [
          "Android applications",
          "iOS applications",
          "Cross-platform applications",
          "Customer applications",
          "Business applications",
          "Service applications",
          "Payment-enabled applications",
          "API integrations",
        ],
      },
    ],
    cta: "Start a Mobile App Project",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    imageAlt: "Mobile application interface displayed on a smartphone",
  },
  {
    id: "cloud-devops",
    number: "06",
    title: "Cloud, DevOps & Infrastructure",
    tagline: "Deploy With Confidence. Scale When You Need To.",
    description:
      "Modern applications need reliable infrastructure. Our cloud and DevOps services help businesses deploy applications efficiently and maintain reliable technology environments.",
    groups: [
      {
        label: "Services Include",
        items: [
          "Cloud deployment",
          "Infrastructure configuration",
          "CI/CD pipelines",
          "Application deployment",
          "Docker environments",
          "Server configuration",
          "Monitoring",
          "Backup strategy",
          "Security configuration",
          "Performance optimization",
          "Infrastructure automation",
        ],
      },
    ],
    cta: "Discuss Your Infrastructure",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    imageAlt: "Cloud infrastructure and server monitoring dashboard",
  },
  {
    id: "seo",
    number: "07",
    title: "SEO & Digital Growth",
    tagline: "Get Found by the People Looking for You",
    description:
      "A great digital product needs visibility. Our SEO services help businesses improve their search visibility, attract relevant visitors and build long-term organic growth.",
    groups: [
      {
        label: "SEO Services",
        items: [
          "Keyword research",
          "Technical SEO",
          "On-page optimization",
          "Local SEO",
          "Content strategy",
          "Website performance",
          "Google Business optimization",
          "SEO reporting",
          "Conversion optimization",
        ],
      },
    ],
    cta: "Grow Your Search Visibility",
    image: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800&q=80",
    imageAlt: "SEO analytics dashboard showing website rankings and traffic",
  },
  {
    id: "hosting",
    aliasId: "management",
    number: "08",
    title: "Website Hosting & Management",
    tagline: "Keep Your Website Secure, Fast and Available",
    description:
      "Launching your website is only the beginning. We provide hosting and website management services designed to keep your digital platform maintained and performing properly.",
    groups: [
      {
        label: "Services Include",
        items: [
          "Website hosting",
          "SSL",
          "Backups",
          "Security monitoring",
          "Software updates",
          "Performance optimization",
          "Uptime monitoring",
          "Content updates",
          "Technical support",
        ],
      },
    ],
    cta: "Explore Website Management",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    imageAlt: "Data center server racks for reliable website hosting",
  },
  {
    id: "branding",
    number: "09",
    title: "Branding & Creative Design",
    tagline: "Build a Brand People Remember",
    description:
      "Your digital presence should look and feel consistent across every customer touchpoint.",
    groups: [
      {
        label: "Creative Services",
        items: [
          "Logo design",
          "Brand identity",
          "Brand guidelines",
          "Business stationery",
          "Marketing materials",
          "Social media graphics",
          "Presentation design",
          "Digital graphics",
        ],
      },
    ],
    cta: "Build Your Brand",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    imageAlt: "Brand identity design materials and mood board",
  },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Digital Solutions Designed <span className="text-primary">Around Your Business</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            From your first website to a complex business application, Slatech provides
            the strategy, design, development and technology services required to build
            and grow your digital presence.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.id} className="relative">
                {/* Anchor-compatibility shim: existing blog posts and nav links
                    point at #management for what is now merged into #hosting. */}
                {service.aliasId && (
                  <span id={service.aliasId} className="absolute -top-24" aria-hidden="true" />
                )}
                <div
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center scroll-mt-24 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <span className="text-primary font-bold text-sm tracking-wider">
                      {service.number} —
                    </span>
                    <h2 className="text-3xl font-bold text-foreground mt-1 mb-2">
                      {service.title}
                    </h2>
                    <p className="text-lg font-semibold text-secondary mb-4">
                      {service.tagline}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    {service.groups.map((group) => (
                      <div key={group.label} className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                          {group.label}
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 text-sm text-foreground"
                            >
                              <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <Link
                      href="/contact"
                      className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      {service.cta}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">{service.number}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One Technology Partner */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            One Technology Partner. <span className="text-primary">Multiple Digital Capabilities.</span>
          </h2>
          <p className="text-muted-foreground mb-6">
            You don&apos;t have to manage separate vendors for every part of your digital project.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-sm font-semibold text-secondary mb-8">
            {["Idea", "Strategy", "Design", "Development", "Integration", "Deployment", "Growth", "Support"].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <span className="px-3 py-1.5 bg-white rounded-full border border-border">{step}</span>
                {i < arr.length - 1 && <span className="text-primary">→</span>}
              </span>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors"
          >
            Discuss Your Project
          </Link>
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
