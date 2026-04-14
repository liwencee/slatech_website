import type { Metadata } from "next";
import Link from "next/link";
import { StatsSection } from "@/components/sections/stats";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Slatech Solutions — 10+ years of experience building stunning, fast, and secure websites for businesses of all sizes.",
};

const team = [
  { name: "Lead Designer", role: "UI/UX Design", color: "bg-primary" },
  { name: "Senior Developer", role: "Full-Stack Development", color: "bg-secondary" },
  { name: "SEO Specialist", role: "Digital Marketing", color: "bg-green-500" },
  { name: "Project Manager", role: "Client Relations", color: "bg-purple-500" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Building Digital <span className="text-primary">Excellence</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Slatech Solutions is a leading web design agency dedicated to transforming
            ideas into powerful digital experiences since 2015.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2015, Slatech Solutions started with a simple mission: to
                  help businesses establish a powerful online presence through
                  exceptional web design and development.
                </p>
                <p>
                  Over the years, we&apos;ve grown from a small team into a
                  full-service digital agency, serving clients across Nigeria
                  and internationally. Our commitment to quality, innovation,
                  and client satisfaction has remained unchanged.
                </p>
                <p>
                  Today, we&apos;ve delivered over 2,000 projects and continue
                  to push the boundaries of what&apos;s possible in web design
                  and development.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] bg-accent rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl font-bold text-primary">10+</p>
                  <p className="text-muted-foreground font-medium mt-2">
                    Years Building the Web
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Team */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A talented team of designers, developers, and strategists working
              together to deliver exceptional results.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.role}
                className="bg-white rounded-2xl p-6 text-center border border-border hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-20 h-20 rounded-full ${member.color} mx-auto mb-4 flex items-center justify-center`}
                >
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-white/80 mb-8">
            Let&apos;s discuss your project and create something amazing
            together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
