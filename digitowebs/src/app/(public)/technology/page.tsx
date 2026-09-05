import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Technology & Engineering — The Stack Behind Slatech's Digital Products",
  description:
    "The technologies, tools and engineering practices Slatech uses to build reliable, secure and scalable digital products — from frontend frameworks to cloud infrastructure.",
  keywords: [
    "nextjs development nigeria",
    "react development company lagos",
    "laravel development nigeria",
    "nodejs development lagos",
    "aws cloud services nigeria",
    "devops company nigeria",
    "software engineering lagos",
  ],
  openGraph: {
    title: "Technology & Engineering — The Stack Behind Slatech's Digital Products",
    description:
      "The technologies, tools and engineering practices Slatech uses to build reliable, secure and scalable digital products.",
    url: "https://slatech.com.ng/technology",
    type: "website",
    images: [
      { url: "/SLATECH  SOLUTIONS LOGO.png", width: 1200, height: 630, alt: "Slatech Solutions" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology & Engineering — The Stack Behind Slatech's Digital Products",
    description:
      "The technologies, tools and engineering practices Slatech uses to build reliable, secure and scalable digital products.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: { canonical: "https://slatech.com.ng/technology" },
};

const stackGroups = [
  {
    title: "Frontend Development",
    description: "We create responsive and intuitive interfaces designed for performance and usability.",
    label: "Technologies",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Vue.js"],
  },
  {
    title: "Backend Development",
    description: "We build secure server-side applications, APIs and business logic that power modern digital products.",
    label: "Technologies",
    items: ["PHP", "Laravel", "Node.js", "REST APIs"],
  },
  {
    title: "Databases",
    description: "We design structured data systems that support performance, reliability and scalability.",
    label: "Technologies",
    items: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Mobile Development",
    description: "We create mobile experiences that connect customers, employees and business operations.",
    label: "Technologies",
    items: ["Flutter", "Android", "iOS"],
  },
  {
    title: "Cloud & Infrastructure",
    description: "We help businesses deploy and operate applications using modern infrastructure and automation practices.",
    label: "Technologies & Platforms",
    items: ["AWS", "Docker", "Linux", "CI/CD", "Cloud Infrastructure"],
  },
];

const devopsPractices = [
  "Continuous integration", "Continuous deployment", "Automated testing", "Containerization",
  "Infrastructure automation", "Application monitoring", "Deployment automation", "Version control",
];

const devopsTools = ["Git", "GitHub", "GitHub Actions", "Jenkins", "Docker", "Kubernetes", "Terraform"];

const integrations = ["Paystack", "Flutterwave", "REST APIs", "Email Services", "SMS Services", "Analytics Platforms"];

const securityPractices = [
  "SSL/TLS", "Secure authentication", "Role-based permissions", "Input validation",
  "API security", "Database protection", "Backup strategies", "Access control", "Security monitoring",
];

const principles = [
  { title: "Build for the User", description: "Technology should be intuitive and accessible." },
  { title: "Build for Performance", description: "Fast experiences create better user and business outcomes." },
  { title: "Build for Security", description: "Security is part of the architecture — not an afterthought." },
  { title: "Build for Growth", description: "We consider how the system may evolve as your organization grows." },
  { title: "Build for Maintainability", description: "Good software should be understandable, maintainable and capable of being improved." },
];

export default function TechnologyPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Technology", path: "/technology" }]} />

      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Technology & Engineering
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Modern Technology. Practical Engineering. <span className="text-primary">Business Results.</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We use modern development technologies and engineering practices to create
            digital products that are reliable, maintainable and built for growth.
            Technology should serve the business — not the other way around.
          </p>
        </div>
      </section>

      {/* Stack groups */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {stackGroups.map((group) => (
              <div key={group.title} className="grid lg:grid-cols-3 gap-8 pb-10 border-b border-border last:border-0">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">{group.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{group.description}</p>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="px-4 py-2 bg-accent rounded-full text-sm font-semibold text-secondary">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DevOps & Automation */}
      <section className="py-20 bg-accent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              DevOps <span className="text-primary">& Automation</span>
            </h2>
            <p className="text-muted-foreground">
              Efficient software delivery requires more than writing code. Our engineering
              practices can include:
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {devopsPractices.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-foreground bg-white rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Tools</p>
            <p className="text-secondary font-semibold flex flex-wrap justify-center gap-x-2 gap-y-1">
              {devopsTools.map((item, i) => (
                <span key={item}>
                  {item}{i < devopsTools.length - 1 && <span className="text-primary mx-1">·</span>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Payments & Business Integrations */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Payments <span className="text-primary">& Business Integrations</span>
          </h2>
          <p className="text-muted-foreground mb-6">
            We integrate digital products with services required to operate modern businesses.
          </p>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Examples</p>
          <p className="text-secondary font-semibold flex flex-wrap justify-center gap-x-2 gap-y-1">
            {integrations.map((item, i) => (
              <span key={item}>
                {item}{i < integrations.length - 1 && <span className="text-primary mx-1">·</span>}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Security</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Security is considered throughout the development lifecycle. Depending on the
            project, our approach can include:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {securityPractices.map((item) => (
              <span key={item} className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium text-white">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering principles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">
              Our Engineering <span className="text-primary">Principles</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="bg-accent rounded-2xl p-6 text-center">
                <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Technology Should Solve a Business Problem
          </h2>
          <p className="text-white/80 mb-8">
            You don&apos;t need technology simply because it is new. You need the right
            technology for your business. Let&apos;s determine what that looks like.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Discuss Your Technology Requirements
          </Link>
        </div>
      </section>
    </>
  );
}
