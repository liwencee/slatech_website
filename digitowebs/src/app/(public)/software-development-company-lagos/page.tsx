import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Software Development Company in Lagos, Nigeria — Slatech Solutions",
  description:
    "Slatech Solutions is a software development company in Lagos building custom software, web applications and business systems for Nigerian and international organizations.",
  keywords: ["software development company lagos", "software development company nigeria", "custom software lagos"],
  openGraph: {
    title: "Software Development Company in Lagos, Nigeria — Slatech Solutions",
    description: "Custom software, web applications and business systems for Nigerian and international organizations.",
    url: "https://slatech.com.ng/software-development-company-lagos",
    type: "website",
    images: [{ url: "/SLATECH  SOLUTIONS LOGO.png", width: 1200, height: 630, alt: "Slatech Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Company in Lagos, Nigeria — Slatech Solutions",
    description: "Custom software, web applications and business systems for Nigerian and international organizations.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: { canonical: "https://slatech.com.ng/software-development-company-lagos" },
};

const capabilities = [
  { title: "Custom Business Software", description: "ERP, CRM, staff management and financial systems built around how your business actually operates.", href: "/services#software" },
  { title: "Web Applications", description: "Customer portals, booking systems, dashboards and internal tools accessible from any browser.", href: "/services#web-applications" },
  { title: "Mobile Applications", description: "Android, iOS and cross-platform apps that extend your product to customers and staff.", href: "/services#mobile" },
  { title: "Cloud & DevOps", description: "Reliable deployment, monitoring and infrastructure so your software stays available.", href: "/services#cloud-devops" },
];

export default function SoftwareDevelopmentCompanyLagosPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Software Development Company Lagos", path: "/software-development-company-lagos" }]} />

      <section className="bg-secondary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Software Development Company in Lagos
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Software Built for How <span className="text-primary">Your Business Actually Works</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Slatech Solutions is a Lagos-based software development company building
            custom applications for organizations that need more than off-the-shelf tools.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10 text-center">
            What We Build
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((c) => (
              <Link key={c.title} href={c.href} className="group bg-accent rounded-2xl p-6 hover:bg-primary/5 border border-transparent hover:border-primary/30 transition-all duration-300 block">
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Off-the-Shelf Software Doesn&apos;t Always Fit</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Generic tools force your team to adapt to the software instead of the other
            way around. We design and develop custom software around your processes,
            users and requirements — see the full breakdown of what that includes on our{" "}
            <Link href="/enterprise" className="text-primary font-semibold hover:underline">Enterprise Solutions page</Link>,
            or the technologies we build with on our{" "}
            <Link href="/technology" className="text-primary font-semibold hover:underline">Technology page</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have a Software Project in Mind?</h2>
          <p className="text-white/80 mb-8">Tell us what you&apos;re trying to build, automate or improve.</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Discuss Your Project
          </Link>
        </div>
      </section>
    </>
  );
}
