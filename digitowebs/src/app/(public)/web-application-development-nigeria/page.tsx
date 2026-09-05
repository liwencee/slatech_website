import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Web Application Development in Nigeria — Slatech Solutions",
  description:
    "Slatech builds secure, accessible-anywhere web applications — customer portals, booking systems, dashboards and marketplaces — for Nigerian businesses.",
  keywords: ["web application development nigeria", "web app development lagos", "customer portal development nigeria"],
  openGraph: {
    title: "Web Application Development in Nigeria — Slatech Solutions",
    description: "Customer portals, booking systems, dashboards and marketplaces built for Nigerian businesses.",
    url: "https://slatech.com.ng/web-application-development-nigeria",
    type: "website",
    images: [{ url: "/SLATECH  SOLUTIONS LOGO.png", width: 1200, height: 630, alt: "Slatech Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Application Development in Nigeria — Slatech Solutions",
    description: "Customer portals, booking systems, dashboards and marketplaces built for Nigerian businesses.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: { canonical: "https://slatech.com.ng/web-application-development-nigeria" },
};

const useCases = [
  { title: "Customer Portals", description: "Give customers secure access to their accounts, documents, orders and service history." },
  { title: "Admin Dashboards", description: "A single view for your team to manage operations, customers and reporting." },
  { title: "Booking & Reservation Systems", description: "Let customers book appointments, services or spaces without a phone call." },
  { title: "Marketplace Platforms", description: "Connect buyers, sellers or service providers on one platform." },
  { title: "Learning Platforms", description: "Deliver courses, track progress and manage students online." },
  { title: "Internal Business Portals", description: "Tools your team uses daily to run internal operations more efficiently." },
];

export default function WebApplicationDevelopmentNigeriaPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Web Application Development Nigeria", path: "/web-application-development-nigeria" }]} />

      <section className="bg-secondary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Web Application Development
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Applications Your Customers and Team Can <span className="text-primary">Access From Anywhere</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A web application is more than a website — it&apos;s a platform your customers
            and employees actually use to interact with your business.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10 text-center">
            What We Build
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u) => (
              <div key={u.title} className="bg-accent rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-2">{u.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{u.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">A Website Shows Information. An Application Does Work.</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            If your business needs customers or staff to log in, complete an action, or
            interact with data — not just read a page — you need a web application, not
            just a website. See the full{" "}
            <Link href="/services#web-applications" className="text-primary font-semibold hover:underline">Web Application Development service</Link>{" "}
            or explore what we build for larger organizations on the{" "}
            <Link href="/enterprise" className="text-primary font-semibold hover:underline">Enterprise Solutions page</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Build a Web Application</h2>
          <p className="text-white/80 mb-8">Tell us what you need your platform to do — we&apos;ll help you scope it.</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  );
}
