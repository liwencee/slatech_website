"use client";

import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

/**
 * Profile photos → place 80×80px JPG/PNG images in /public/testimonials/
 *   adebayo.jpg  |  chioma.jpg  |  ibrahim.jpg  |  funke.jpg  |  emeka.jpg
 *
 * Recommended image spec:
 *   Size:    80 × 80 px  (minimum)
 *   Format:  JPG or WebP
 *   Shape:   Square (will be cropped to circle via rounded-full)
 *   Quality: 80 %  —  file size should be under 20 KB each
 */

const testimonials = [
  {
    name: "Adebayo Ogunlade",
    role: "CEO, TravelMax Agency",
    location: "Lagos",
    photo: "/testimonials/adebayo.jpg",
    initials: "AO",
    avatarColor: "bg-primary",
    text: "Slatech Solutions transformed our online presence completely. Their team delivered a stunning website that increased our bookings by 150%. The #1 web agency in Lagos — highly recommended!",
    rating: 5,
  },
  {
    name: "Chioma Nwankwo",
    role: "Founder, ShopNow Store",
    location: "Ikeja, Lagos",
    photo: "/testimonials/chioma.jpg",
    initials: "CN",
    avatarColor: "bg-secondary",
    text: "Working with Slatech was a game-changer for our e-commerce business. The website is fast, secure, and our conversion rates have doubled since launch. Worth every Naira!",
    rating: 5,
  },
  {
    name: "Ibrahim Musa",
    role: "Director, EduLearn Academy",
    location: "Abuja, Nigeria",
    photo: "/testimonials/ibrahim.jpg",
    initials: "IM",
    avatarColor: "bg-green-600",
    text: "Professional, responsive, and creative. They understood our vision from day one and delivered beyond expectations. Our student enrolment went up 40% within 3 months of launching.",
    rating: 5,
  },
  {
    name: "Funke Adeyemi",
    role: "Manager, MediCare Health",
    location: "Ikeja, Lagos",
    photo: "/testimonials/funke.jpg",
    initials: "FA",
    avatarColor: "bg-purple-600",
    text: "From design to deployment the entire process was seamless. Our patients love the new website and it has significantly improved our online appointment bookings. Five stars!",
    rating: 5,
  },
  {
    name: "Emeka Obi",
    role: "Owner, Elite Real Estate",
    location: "Lagos Island",
    photo: "/testimonials/emeka.jpg",
    initials: "EO",
    avatarColor: "bg-orange-500",
    text: "Exceptional quality and attention to detail. The team went above and beyond to ensure our property listings look amazing. We now rank on the first page of Google for key Lagos searches.",
    rating: 5,
  },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({
  photo,
  initials,
  name,
  avatarColor,
}: {
  photo: string;
  initials: string;
  name: string;
  avatarColor: string;
}) {
  return (
    <div className="relative w-14 h-14 shrink-0">
      {/* Fallback colored circle with initials — shown until image loads */}
      <div
        className={`absolute inset-0 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-lg`}
        aria-hidden="true"
      >
        {initials}
      </div>
      {/* Actual photo — hides the fallback when loaded */}
      <Image
        src={photo}
        alt={name}
        width={80}
        height={80}
        className="relative rounded-full object-cover w-14 h-14 border-2 border-white shadow-sm"
        onError={(e) => {
          /* hide broken image so fallback shows */
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Trusted by <span className="text-primary">500+ Businesses</span>{" "}
              Across Nigeria
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Don&apos;t just take our word for it — hear from businesses in Lagos,
              Ikeja, and across Nigeria that we&apos;ve helped succeed online.
            </p>

            {/* Google rating summary */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-foreground font-semibold">5.0</span>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-muted-foreground text-sm">168 Google Reviews</span>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimateOnScroll key={t.name} animation="fade-up" delay={i * 100}>
              <article className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-400 flex flex-col gap-4 h-full">
                {/* Stars */}
                <Stars count={t.rating} />

                {/* Quote */}
                <blockquote className="text-foreground text-sm leading-relaxed flex-1 relative">
                  <span className="text-primary text-3xl font-serif leading-none absolute -top-1 -left-1 opacity-30 select-none">&ldquo;</span>
                  <p className="pl-4">{t.text}</p>
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-border" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar
                    photo={t.photo}
                    initials={t.initials}
                    name={t.name}
                    avatarColor={t.avatarColor}
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                    <p className="text-xs text-primary font-medium mt-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {t.location}
                    </p>
                  </div>
                </div>
              </article>
            </AnimateOnScroll>
          ))}

          {/* CTA Card — 6th slot */}
          <AnimateOnScroll animation="fade-up" delay={500}>
            <div className="bg-secondary rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-5 border border-secondary h-full min-h-[240px]">
              <div>
                <p className="text-white font-bold text-lg leading-snug mb-2">
                  Join 500+ Happy Clients<br />
                  <span className="text-primary">Across Nigeria</span>
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Get a free quote and see why businesses in Lagos &amp; beyond choose Slatech.
                </p>
              </div>
              <a
                href="/contact"
                className="px-6 py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
              >
                Get a Free Quote
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
