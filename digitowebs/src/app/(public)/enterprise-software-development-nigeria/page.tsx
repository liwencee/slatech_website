import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Enterprise Software Development in Nigeria — Slatech Solutions",
  description:
    "Slatech develops enterprise-grade software — ERP, CRM, internal systems and platform integrations — for larger Nigerian organizations with real security and scale requirements.",
  keywords: ["enterprise software development nigeria", "enterprise software company nigeria", "erp development nigeria", "enterprise application development"],
  openGraph: {
    title: "Enterprise Software Development in Nigeria — Slatech Solutions",
    description: "ERP, CRM, internal systems and integrations built for larger Nigerian organizations.",
    url: "https://slatech.com.ng/enterprise-software-development-nigeria",
    type: "website",
    images: [{ url: "/SLATECH  SOLUTIONS LOGO.png", width: 1200, height: 630, alt: "Slatech Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Software Development in Nigeria — Slatech Solutions",
    description: "ERP, CRM, internal systems and integrations built for larger Nigerian organizations.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: { canonical: "https://slatech.com.ng/enterprise-software-development-nigeria" },
};

const objections = [
  {
    question: "Can a Nigerian agency really handle an enterprise-scale system?",
    answer: "Enterprise software isn't defined by company size abroad — it's defined by the complexity of your processes, security requirements and number of users. We scope every enterprise engagement against your actual architecture and security needs, not a generic package.",
  },
  {
    question: "What about data security and access control?",
    answer: "Role-based access control, encrypted data handling and secure authentication are built into enterprise projects from the architecture stage, not added afterward. See our security practices on the Technology page.",
  },
  {
    question: "Will this integrate with systems we already use?",
    answer: "Most enterprise projects need to connect to existing payment gateways, accounting tools, communication platforms or third-party APIs. Integration is scoped as part of the discovery phase, not treated as an afterthought.",
  },
  {
    question: "What happens if our organization grows past the original scope?",
    answer: "Enterprise systems are architected to scale — in users, in data volume and in added functionality — rather than rebuilt from scratch every time the organization grows.",
  },
];

export default function EnterpriseSoftwareDevelopmentNigeriaPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Enterprise Software Development Nigeria", path: "/enterprise-software-development-nigeria" }]} />

      <section className="bg-secondary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Enterprise Software Development
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Enterprise Software Built for <span className="text-primary">Nigerian Organizations</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Larger organizations have requirements a small business website doesn&apos;t —
            security, integrations, access control and scale. Here&apos;s how Slatech answers
            the questions enterprise buyers usually ask first.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10 text-center">
            Questions Enterprise Buyers Ask
          </h2>
          <div className="space-y-4">
            {objections.map((o) => (
              <details key={o.question} className="group bg-accent rounded-xl p-5">
                <summary className="cursor-pointer font-semibold text-foreground list-none flex items-center justify-between gap-4">
                  {o.question}
                  <span className="text-primary shrink-0 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">{o.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">See the Full Enterprise Capability</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            ERP and business management, CRM platforms, customer portals, internal systems
            and system integration — with a defined 8-step process from discovery through
            support. See the full breakdown on our{" "}
            <Link href="/enterprise" className="text-primary font-semibold hover:underline">Enterprise Digital Solutions page</Link>{" "}
            or the stack it&apos;s built on at{" "}
            <Link href="/technology" className="text-primary font-semibold hover:underline">Technology &amp; Engineering</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Request an Enterprise Consultation</h2>
          <p className="text-white/80 mb-8">Tell us about your organization&apos;s systems and requirements.</p>
          <Link href="/contact" className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Talk to Our Team
          </Link>
        </div>
      </section>
    </>
  );
}
