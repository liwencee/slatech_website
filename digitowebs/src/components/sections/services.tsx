import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Website Design & Development",
    description:
      "Professional, responsive and high-performing websites designed around your brand, audience and business objectives.",
    href: "/services#website-design",
    cta: "Explore Website Development",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
    title: "E-Commerce Solutions",
    description:
      "Build an online store that makes it easy for customers to discover, purchase and pay for your products and services.",
    href: "/services#ecommerce",
    cta: "Explore E-Commerce",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z M8 9l-2 2 2 2m8-4l2 2-2 2m-4-6l-2 8" />
      </svg>
    ),
    title: "Custom Software Development",
    description:
      "Turn complex business processes into secure and scalable software designed specifically around how your organization operates.",
    href: "/services#software",
    cta: "Explore Software Development",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Mobile Application Development",
    description:
      "Create mobile experiences that connect your customers, employees and business operations.",
    href: "/services#mobile",
    cta: "Explore Mobile Development",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 001-9.9 6 6 0 00-11.6 2.1A4 4 0 003 15z" />
      </svg>
    ),
    title: "Cloud, DevOps & Infrastructure",
    description:
      "Deploy, manage and scale your applications with reliable infrastructure, automation and modern development practices.",
    href: "/services#cloud-devops",
    cta: "Explore Cloud & DevOps",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "SEO & Digital Growth",
    description:
      "Build visibility, attract the right audience and turn online traffic into measurable business opportunities.",
    href: "/services#seo",
    cta: "Explore SEO",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              What We Build
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Digital Solutions Designed <span className="text-primary">Around Your Business</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              From your first website to a complex business application, we provide the
              strategy, design, development and technology services required to build and
              grow your digital presence.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimateOnScroll key={service.title} animation="fade-up" delay={i * 100}>
              <Link
                href={service.href}
                className="group bg-white rounded-2xl p-7 shadow-sm border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 block hover:bg-primary/[0.02] h-full flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {service.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-primary mt-4">
                  {service.cta}
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
