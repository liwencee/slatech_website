import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StatsSection } from "@/components/sections/stats";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: "About Slatech Solutions — Digital Product & Software Development Company",
  description:
    "Slatech Solutions is a Nigerian digital product and software development company founded in 2020. Meet the team and the mission behind our work in Lagos and beyond.",
  keywords: [
    "digital product company nigeria",
    "software development company lagos",
    "web design agency ikeja",
    "technology partner nigeria",
  ],
  openGraph: {
    title: "About Slatech Solutions — Digital Product & Software Development Company",
    description:
      "Slatech Solutions is a Nigerian digital product and software development company founded in 2020, helping businesses use technology to operate better and grow.",
    url: "https://slatech.com.ng/about",
    type: "website",
    images: [
      { url: "/SLATECH  SOLUTIONS LOGO.png", width: 1200, height: 630, alt: "Slatech Solutions" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Slatech Solutions — Digital Product & Software Development Company",
    description:
      "Slatech Solutions is a Nigerian digital product and software development company founded in 2020, helping businesses use technology to operate better and grow.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
  },
  alternates: { canonical: "https://slatech.com.ng/about" },
};

const team = [
  { name: "DevOps Engineer", role: "Development & Operations", photo: "/images/olalekan.jpg", color: "bg-primary" },
  { name: "Human Resources Manager", role: "People & Culture", photo: "/images/hr-manager.jpg", color: "bg-secondary" },
  { name: "SEO Specialist", role: "Search Engine Optimization", photo: "/images/seo-specialist.jpg", color: "bg-green-500" },
  { name: "Frontend Developer", role: "Development & Operations", photo: "/images/frontend-developer.jpg", color: "bg-purple-500" },
];

const beliefQuestions = [
  "What problem are we solving?",
  "Who will use the solution?",
  "What does the business need to achieve?",
  "What technology is appropriate?",
  "How will the platform scale?",
  "How will we measure success?",
];

const approach = [
  { title: "Strategy Before Technology", description: "We first understand your objectives before recommending a solution." },
  { title: "Design With Purpose", description: "Our interfaces are designed to be attractive, intuitive and aligned with the user's journey." },
  { title: "Engineering for Growth", description: "We build solutions with performance, security, maintainability and future expansion in mind." },
  { title: "Collaboration Throughout", description: "We involve clients throughout the process so that the final product reflects the actual business requirement." },
  { title: "Continuous Improvement", description: "Technology and businesses evolve. We help our clients improve their digital products after launch." },
];

const departments = [
  { title: "Design", description: "UI/UX and visual design professionals focused on creating intuitive digital experiences." },
  { title: "Development", description: "Frontend and backend developers who transform concepts into functional digital products." },
  { title: "DevOps & Infrastructure", description: "Technology professionals focused on deployment, infrastructure, automation, reliability and scalability." },
  { title: "SEO & Digital Growth", description: "Digital specialists focused on search visibility, traffic, performance and online growth." },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />

      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            About Slatech Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Building Digital Solutions for Businesses <span className="text-primary">That Want to Grow</span>
          </h1>
          <div className="space-y-4 text-lg text-gray-300 max-w-2xl mx-auto text-left sm:text-center">
            <p>
              Slatech Solutions is a Nigerian digital product and software development
              company founded in 2020 with a mission to help businesses use technology to
              operate better, reach more customers and grow.
            </p>
            <p>
              We combine strategy, design, development and technology to create digital
              experiences and software solutions that solve real business problems.
            </p>
            <p>
              From websites and e-commerce platforms to custom software, web applications,
              mobile applications and digital infrastructure, we work with organizations
              that want more from technology than simply having an online presence.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground">
                  Slatech began with a simple idea: businesses deserve better digital solutions.
                </p>
                <p>
                  What started with website design and development has evolved into a
                  broader technology partner for businesses looking to establish, improve
                  and scale their digital operations.
                </p>
                <p>
                  Today, we work with startups, SMEs, growing businesses and organizations
                  that require reliable digital products and technology solutions.
                </p>
                <p className="font-semibold text-foreground">
                  Our approach remains simple: understand the business. Solve the problem.
                  Build the right technology. Support the journey.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/olalekan.jpg"
                alt="Olalekan Akindiya — Founder & CEO of Slatech Solutions, Lagos Nigeria"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white font-bold text-lg leading-tight">Olalekan Akindiya</p>
                <p className="text-primary text-sm font-medium">Founder & CEO, Slatech Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-20 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            What We <span className="text-primary">Believe</span>
          </h2>
          <p className="text-lg font-semibold text-secondary mb-4">
            Technology should solve problems.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl mx-auto">
            A beautiful interface is valuable, but it becomes significantly more powerful
            when it improves a business process, generates leads, increases sales, saves
            time or creates a better experience for customers.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            That is why we approach every project from both a business and technology
            perspective. We ask:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {beliefQuestions.map((q) => (
              <div key={q} className="flex items-start gap-3 bg-white rounded-xl px-4 py-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">?</span>
                <span className="text-sm text-foreground">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-secondary rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                To build reliable, innovative and accessible digital solutions that help
                businesses operate, compete and grow in an increasingly digital world.
              </p>
            </div>
            <div className="bg-primary rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/90 leading-relaxed">
                To become a trusted technology partner for businesses in Africa and beyond,
                known for combining creative thinking, strong engineering and genuine
                understanding of our clients&apos; businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">
              Our <span className="text-primary">Approach</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {approach.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founded / operations facts — see stats.tsx for why these replaced project/client/satisfaction counts */}
      <StatsSection />

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Slatech brings together professionals across design, development, technology,
              digital growth and operations.
            </p>
          </div>

          {/* Department blurbs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {departments.map((dept) => (
              <div key={dept.title} className="bg-accent rounded-2xl p-6 text-center">
                <h3 className="font-bold text-foreground mb-2">{dept.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{dept.description}</p>
              </div>
            ))}
          </div>

          {/* Team photo grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <div className={`absolute inset-0 ${member.color} opacity-20`} />
                  <Image
                    src={member.photo}
                    alt={`${member.name} — ${member.role} at Slatech Solutions`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-foreground text-sm">{member.name}</h3>
                  <p className="text-xs text-primary font-medium mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder & CEO */}
      <section className="py-20 bg-accent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl md:col-span-1">
              <Image
                src="/images/olalekan.jpg"
                alt="Olalekan Akindiya — Founder & CEO, Slatech Solutions"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="md:col-span-2">
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-2">
                Founder & CEO
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Olalekan Akindiya</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Olalekan Akindiya leads Slatech Solutions with a focus on combining
                business strategy, technology and digital innovation to help organizations
                build stronger digital operations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Under his leadership, Slatech has evolved from a web-focused digital agency
                into a broader digital solutions and software development company.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Let&apos;s Build the Future of Your Business
          </h2>
          <p className="text-white/80 mb-8">
            Have a business challenge, software idea or digital project? Let&apos;s discuss it.
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
