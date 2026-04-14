import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrainingPricing } from "@/components/sections/training-pricing";

export const metadata: Metadata = {
  title: "Digital Training",
  description:
    "Learn web design, graphics, SEO and digital marketing with Slatech Solutions. Join our live training classes in Lagos, Nigeria — Basic, Advance, and Masterclass options available.",
};

const stats = [
  { value: "500+", label: "Businesses Trained" },
  { value: "5+", label: "Years Training" },
  { value: "3", label: "Course Levels" },
  { value: "100%", label: "Practical Classes" },
];

export default function TrainingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Slatech Digital Training
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Build Your <span className="text-primary">Digital Skills</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Over the last 5+ years we have helped more than{" "}
            <strong className="text-white">500 SME and MSME businesses</strong> build
            powerful digital brands. Now we&apos;re teaching you how to do the same.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <a
              href="#pricing"
              className="inline-flex items-center px-7 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
            >
              View Pricing
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-7 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
            {stats.map((s) => (
              <div key={s.label} className="py-8 px-6 text-center">
                <p className="text-3xl font-extrabold text-primary">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Training */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
                Why Train With Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
                Learn From <span className="text-primary">Real Practitioners</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our training programme is designed and delivered by the same team that
                  builds websites and manages digital brands for hundreds of Nigerian
                  businesses every year.
                </p>
                <p>
                  Classes are live, practical and hands-on — not pre-recorded videos. You
                  learn by doing real projects from day one, guided by instructors who
                  work in the industry daily.
                </p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Live instructor-led sessions (not pre-recorded)",
                  "Small class sizes for personal attention",
                  "Real projects and portfolio building",
                  "Post-training support & mentorship",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/training.jpg"
                alt="Slatech Digital Training — Lagos Nigeria"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white font-bold text-lg leading-tight">Live Classes</p>
                <p className="text-primary text-sm font-medium">Ikeja, Lagos · Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              Choose Your Level
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Training <span className="text-primary">Packages</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Three class levels designed for beginners through to advanced learners.
              Click any plan to see the full feature list and enrol.
            </p>

            {/* Schedule Banner */}
            <div className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Next cohort: Tue &amp; Thu · 11 AM – 2 PM · April 16 – June 11, 2026
            </div>
          </div>

          <TrainingPricing />
        </div>
      </section>

      {/* FAQ / Schedule Details */}
      <section className="py-16 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Where are classes held?",
                a: "Classes are held at our office — No 2b Olaide Tomori Street, off Simbiat Abiola Way, Ikeja, Lagos. Online attendance may also be available.",
              },
              {
                q: "Do I need any prior experience?",
                a: "No experience is required for the Basic Class. It is designed for complete beginners. The Advance and Masterclass levels build on the foundational skills.",
              },
              {
                q: "What do I need to bring?",
                a: "Bring a laptop (Windows or Mac) and a notepad. Software will be installed during the first class.",
              },
              {
                q: "Is there a payment plan?",
                a: "Yes. Contact us on WhatsApp or via the Contact page to discuss instalment options before registering.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group bg-white rounded-xl border border-border p-5 cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-foreground text-sm list-none">
                  {faq.q}
                  <svg
                    className="w-4 h-4 text-primary shrink-0 transition-transform group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-white/80 mb-8">
            Pick a plan above or reach out to us and we&apos;ll help you choose the right level.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#pricing"
              className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              See Pricing
            </a>
            <a
              href="https://wa.me/2348076172456"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 bg-white/10 text-white font-bold rounded-lg border border-white/30 hover:bg-white/20 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
