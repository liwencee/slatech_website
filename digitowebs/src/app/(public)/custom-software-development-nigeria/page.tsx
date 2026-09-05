import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Custom Software Development in Nigeria — Slatech Solutions",
  description:
    "Still running your business on spreadsheets and WhatsApp groups? Slatech builds custom software — ERP, CRM, booking systems and business management platforms — for Nigerian organizations.",
  keywords: ["custom software development nigeria", "erp software nigeria", "crm development nigeria", "business management software nigeria"],
  openGraph: {
    title: "Custom Software Development in Nigeria — Slatech Solutions",
    description: "ERP, CRM, booking systems and business management platforms built around your processes.",
    url: "https://slatech.com.ng/custom-software-development-nigeria",
    type: "website",
    images: [{ url: "/SLATECH  SOLUTIONS LOGO.png", width: 1200, height: 630, alt: "Slatech Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development in Nigeria — Slatech Solutions",
    description: "ERP, CRM, booking systems and business management platforms built around your processes.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: { canonical: "https://slatech.com.ng/custom-software-development-nigeria" },
};

const signs = [
  "Different departments track the same information in separate spreadsheets that never match",
  "Staff manage bookings, orders or customer requests through WhatsApp messages that get lost",
  "You've outgrown a generic tool but it's the closest thing available",
  "Reporting means manually copying numbers from three different places",
  "A process that should take minutes takes days because of manual handoffs",
];

export default function CustomSoftwareDevelopmentNigeriaPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Custom Software Development Nigeria", path: "/custom-software-development-nigeria" }]} />

      <section className="bg-secondary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Custom Software Development
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            When Spreadsheets and WhatsApp <span className="text-primary">Aren&apos;t Enough Anymore</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Slatech designs and develops custom software for Nigerian organizations whose
            processes have outgrown generic tools.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
            Signs Your Business Needs Custom Software
          </h2>
          <div className="space-y-3">
            {signs.map((sign) => (
              <div key={sign} className="flex items-start gap-3 bg-accent rounded-xl px-4 py-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">!</span>
                <span className="text-sm text-foreground">{sign}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Built Around Your Actual Requirements</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            We develop business management systems, ERP solutions, CRM platforms, customer
            portals, booking platforms and workflow automation — starting with
            understanding your processes, not a template. See what our development
            process looks like on the{" "}
            <Link href="/enterprise" className="text-primary font-semibold hover:underline">Enterprise Solutions page</Link>,
            or explore the full{" "}
            <Link href="/services#software" className="text-primary font-semibold hover:underline">Custom Software Development service</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Describe Your Process — We&apos;ll Tell You What&apos;s Possible</h2>
          <p className="text-white/80 mb-8">No obligation. Just a real conversation about what you&apos;re dealing with.</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Discuss Your Software Project
          </Link>
        </div>
      </section>
    </>
  );
}
