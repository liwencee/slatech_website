import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const locations = [
  { label: "Web Design in Ikeja", sub: "Our office — meet us in person", href: "/web-design-company-ikeja" },
  { label: "Web Design in Lagos", sub: "For businesses across Lagos", href: "/web-design-company-lagos" },
  { label: "Web Design in Nigeria", sub: "Serving every state remotely", href: "/web-design-company-nigeria" },
];

const solutions = [
  { label: "Software Development", href: "/software-development-company-lagos" },
  { label: "Custom Software", href: "/custom-software-development-nigeria" },
  { label: "Web Applications", href: "/web-application-development-nigeria" },
  { label: "E-Commerce Stores", href: "/ecommerce-development-lagos" },
  { label: "Mobile Apps", href: "/mobile-app-development-lagos" },
  { label: "Enterprise Software", href: "/enterprise-software-development-nigeria" },
  { label: "Website Pricing", href: "/blog/how-much-does-web-design-cost-in-nigeria" },
  { label: "Why Slatech", href: "/why-slatech" },
];

export function LocationsHubSection() {
  return (
    <section className="py-16 lg:py-20 bg-accent/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-center">
            Web Design &amp; Development <span className="text-primary">Across Nigeria</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Based in Ikeja, Lagos — building websites and software for businesses nationwide.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {locations.map((l, i) => (
            <AnimateOnScroll key={l.href} delay={i * 80} className="h-full">
              <Link
                href={l.href}
                className="group h-full flex items-center justify-between gap-4 bg-white rounded-2xl p-5 border border-border hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <span>
                  <span className="block font-bold text-foreground group-hover:text-primary transition-colors">{l.label}</span>
                  <span className="block text-sm text-muted-foreground">{l.sub}</span>
                </span>
                <span className="text-primary text-xl transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll>
          <div className="flex flex-wrap justify-center gap-2">
            {solutions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="px-4 py-2 bg-white rounded-full border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
