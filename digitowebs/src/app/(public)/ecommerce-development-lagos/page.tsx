import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "E-Commerce Development in Lagos, Nigeria — Slatech Solutions",
  description:
    "Slatech builds e-commerce stores for Lagos and Nigerian businesses with Paystack payments, mobile-first checkout and inventory tools built for the local market.",
  keywords: ["ecommerce development lagos", "online store development nigeria", "paystack ecommerce website", "ecommerce website lagos"],
  openGraph: {
    title: "E-Commerce Development in Lagos, Nigeria — Slatech Solutions",
    description: "Online stores built for the Nigerian market — local payments, mobile-first checkout and inventory tools.",
    url: "https://slatech.com.ng/ecommerce-development-lagos",
    type: "website",
    images: [{ url: "/SLATECH  SOLUTIONS LOGO.png", width: 1200, height: 630, alt: "Slatech Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Commerce Development in Lagos, Nigeria — Slatech Solutions",
    description: "Online stores built for the Nigerian market — local payments, mobile-first checkout and inventory tools.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: { canonical: "https://slatech.com.ng/ecommerce-development-lagos" },
};

const localFactors = [
  { title: "Nigerian Payment Methods", description: "Paystack integration for cards, bank transfer and USSD — how Nigerian shoppers actually pay." },
  { title: "Mobile-First Checkout", description: "Most Lagos shoppers buy from a phone on mobile data — every step is built to load fast and convert on small screens." },
  { title: "Delivery & Logistics Fit", description: "Order flows that match how Nigerian sellers actually fulfil — from local dispatch riders to interstate logistics partners." },
  { title: "Inventory & Order Management", description: "A backend your team can actually run — stock levels, order status and customer communication in one place." },
];

export default function EcommerceDevelopmentLagosPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "E-Commerce Development Lagos", path: "/ecommerce-development-lagos" }]} />

      <section className="bg-secondary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            E-Commerce Development in Lagos
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Online Stores Built for <span className="text-primary">How Nigerians Actually Shop</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            A store copied from a foreign template rarely fits the Nigerian market. Slatech
            builds e-commerce platforms around local payments, mobile shopping habits and
            real logistics — not assumptions.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10 text-center">
            Built Around the Nigerian Market
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {localFactors.map((f) => (
              <div key={f.title} className="bg-accent rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">From a Single Store to a Full Platform</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Whether you&apos;re launching your first online store or replacing one that isn&apos;t
            converting, we handle product catalogues, secure checkout and payment integration
            end to end. Read how we approach{" "}
            <Link href="/blog/paystack-integration-guide-ecommerce-nigeria" className="text-primary font-semibold hover:underline">Paystack integration for Nigerian stores</Link>,
            or see the full{" "}
            <Link href="/services#ecommerce" className="text-primary font-semibold hover:underline">E-Commerce Development service</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Sell Online?</h2>
          <p className="text-white/80 mb-8">Tell us what you sell and how you want to fulfil orders — we&apos;ll handle the rest.</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Start Your Store
          </Link>
        </div>
      </section>
    </>
  );
}
