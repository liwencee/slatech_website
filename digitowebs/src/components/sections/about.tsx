import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Beautiful Design",
    description: "Clean and modern designs that captivate your audience",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Lightning Fast",
    description: "Optimized for speed and SEO to rank higher on Google",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Secure",
    description: "Protected with SSL and industry-standard security practices",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Mobile-Friendly",
    description: "Responsive designs that look great on every device",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left — Team Photo ── */}
          <AnimateOnScroll animation="slide-left">
            <div className="relative">
              {/* Main image */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/team.png"
                  alt="Slatech Solutions Team — Web Design Agency in Ikeja, Lagos Nigeria"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent" />
                {/* Caption on image */}
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-semibold text-sm">Our Team in Lagos</p>
                  <p className="text-primary text-xs font-medium">Ikeja, Lagos · Nigeria</p>
                </div>
              </div>
              {/* Floating Years Badge */}
              <div
                className="absolute -bottom-5 -right-5 bg-primary text-white px-5 py-3 rounded-xl shadow-xl"
                style={{ animation: "bounce 3s ease-in-out infinite" }}
              >
                <p className="text-2xl font-bold leading-none">5+</p>
                <p className="text-xs mt-0.5">Years Experience</p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* ── Right — Content ── */}
          <AnimateOnScroll animation="slide-right">
            <div>
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
                We Build Digital Experiences That{" "}
                <span className="text-primary">Inspire</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Slatech Solutions is a leading web design agency in Lagos, Nigeria,
                dedicated to transforming ideas into powerful digital experiences.
                We combine creativity with cutting-edge technology to deliver websites
                that not only look stunning but also rank on Google and convert
                visitors into paying customers.
              </p>

              {/* Feature grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex gap-3 group cursor-default p-3 rounded-xl hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg"
              >
                More About Us
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
