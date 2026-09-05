import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Enterprise Digital Solutions — Custom Software for Growing Organizations",
  description:
    "Slatech designs and develops enterprise digital systems — ERP, CRM, customer portals, SaaS platforms and system integrations — built around your organization's actual requirements.",
  keywords: [
    "enterprise software development nigeria",
    "erp software development lagos",
    "crm platform development nigeria",
    "customer portal development lagos",
    "saas development company nigeria",
    "api integration nigeria",
    "enterprise application development lagos",
  ],
  openGraph: {
    title: "Enterprise Digital Solutions — Custom Software for Growing Organizations",
    description:
      "Slatech designs and develops enterprise digital systems built around your organization's actual requirements.",
    url: "https://slatech.com.ng/enterprise",
    type: "website",
    images: [
      { url: "/SLATECH  SOLUTIONS LOGO.png", width: 1200, height: 630, alt: "Slatech Solutions" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Digital Solutions — Custom Software for Growing Organizations",
    description:
      "Slatech designs and develops enterprise digital systems built around your organization's actual requirements.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: { canonical: "https://slatech.com.ng/enterprise" },
};

const enterpriseSolutions = [
  { title: "ERP & Business Management", description: "Connect important business processes through centralized systems." },
  { title: "CRM Platforms", description: "Manage customer relationships, sales activities, communication and business opportunities." },
  { title: "Customer Portals", description: "Give customers secure access to services, accounts, documents and transactions." },
  { title: "Employee & Internal Systems", description: "Build tools that simplify internal operations and improve productivity." },
  { title: "E-Commerce Platforms", description: "Develop scalable commerce platforms for complex product catalogues, payments and order management." },
  { title: "Digital Marketplaces", description: "Create platforms connecting buyers, sellers, service providers or other users." },
  { title: "SaaS Platforms", description: "Turn your business idea into a subscription-based software product." },
  { title: "API & System Integration", description: "Connect your applications with payment platforms, third-party services, databases and other business systems." },
];

const requirements = [
  "Your business model", "Existing systems", "Users and stakeholders", "Operational processes",
  "Integration requirements", "Security requirements", "Reporting requirements",
  "Scalability requirements", "Budget and timeline",
];

const process = [
  { n: "01", title: "Discovery", description: "We understand your business, objectives and technical requirements." },
  { n: "02", title: "Architecture", description: "We define the application architecture, database structure, integrations and infrastructure." },
  { n: "03", title: "UX/UI", description: "We design the user experience and interfaces for the relevant user groups." },
  { n: "04", title: "Development", description: "Our engineering team develops the application according to the approved specifications." },
  { n: "05", title: "Testing", description: "We test functionality, performance, security, responsiveness and integrations." },
  { n: "06", title: "Deployment", description: "We configure the production environment and deploy the application." },
  { n: "07", title: "Training & Handover", description: "We provide the necessary documentation, training and handover." },
  { n: "08", title: "Support & Optimization", description: "We remain available for maintenance, improvements, monitoring and future development." },
];

const engineeringApproach = [
  "Role-based access", "Authentication", "Secure APIs", "Database security", "Backup strategy",
  "SSL/TLS", "Application monitoring", "Performance optimization", "Error logging",
  "Automated deployment", "Scalable infrastructure",
];

const integrations = [
  "Payment Gateways", "SMS", "Email", "CRM", "ERP", "APIs", "Analytics", "Cloud Services", "Authentication Services",
];

const clientTypes = [
  "Established businesses", "Growing companies", "Financial and professional services",
  "Real estate organizations", "Healthcare businesses", "Educational organizations",
  "E-commerce companies", "Technology companies", "NGOs and associations",
  "Government-related projects", "Startups building technology products",
];

export default function EnterprisePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Enterprise", path: "/enterprise" }]} />

      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Enterprise Digital Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Technology Built Around <span className="text-primary">Your Organization</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Growing organizations need technology that can support complex operations,
            multiple users, integrations and evolving business requirements. Slatech works
            with organizations to design and develop digital systems that are built around
            their specific processes and objectives.
          </p>
        </div>
      </section>

      {/* We don't just build software */}
      <section className="py-16 bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            We Don&apos;t Just Build Software.
          </h2>
          <p className="text-lg text-primary font-semibold mb-6">
            We understand the business problem first.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you need to automate internal processes, connect multiple departments
            or provide customers with a digital platform, we develop solutions around your
            organization&apos;s requirements.
          </p>
        </div>
      </section>

      {/* Enterprise solutions grid */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Enterprise Solutions <span className="text-primary">Can Include</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {enterpriseSolutions.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for your business */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Built for <span className="text-primary">Your Business</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enterprise technology cannot be built from assumptions. Our process begins
              with understanding:
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
            {requirements.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-foreground bg-accent rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground">
            We then translate these requirements into a technical solution.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">
              Our Enterprise <span className="text-primary">Development Process</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step) => (
              <div key={step.n} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <span className="text-primary font-bold text-sm">{step.n} —</span>
                <h3 className="font-bold text-white mt-1 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security, performance, scalability */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Security, Performance <span className="text-primary">& Scalability</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enterprise applications must be built with the future in mind. Depending on
              project requirements, our engineering approach can include:
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {engineeringApproach.map((item) => (
              <span key={item} className="px-4 py-2 bg-accent rounded-full text-sm font-medium text-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Technology <span className="text-primary">Integration</span>
          </h2>
          <p className="text-muted-foreground mb-6">
            We can integrate your digital platform with third-party services including:
          </p>
          <p className="text-secondary font-semibold flex flex-wrap justify-center gap-x-2 gap-y-1">
            {integrations.map((item, i) => (
              <span key={item}>
                {item}{i < integrations.length - 1 && <span className="text-primary mx-1">·</span>}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Who We <span className="text-primary">Work With</span>
            </h2>
            <p className="text-muted-foreground">We support:</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {clientTypes.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-foreground bg-accent rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Have a Complex Technology Requirement?
          </h2>
          <p className="text-white/80 mb-8">
            Tell us what you are trying to build, improve or automate. Our team will help
            you determine the right technical approach.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request an Enterprise Consultation
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-white/10 text-white font-bold rounded-lg border border-white/30 hover:bg-white/20 transition-colors"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
