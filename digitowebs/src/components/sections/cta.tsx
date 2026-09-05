import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export function CTASection() {
  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary-light/20 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimateOnScroll animation="scale-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Build <span className="text-primary">Something Better</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Whether you are launching a new business, improving an existing digital
            platform or building custom software for your organization, Slatech can help
            you turn your idea into a working digital solution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/25 text-lg hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-primary/40"
            >
              Start a Project
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="https://wa.me/2348076172456"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white hover:text-secondary transition-all duration-300 text-lg hover:scale-105 active:scale-95"
            >
              Talk to Our Team
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
