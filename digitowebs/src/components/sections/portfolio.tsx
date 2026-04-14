"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const projects = [
  { title: "TravelMax Agency",    category: "Travel",      image: "/igniting hopes.png" },
  { title: "AutoBook Car Rentals",category: "Automotive",  image: "/images/Snipaste_2026-04-14_17-43-34.png" },
  { title: "Elite Real Estate",   category: "Real Estate", image: "/images/Snipaste_2026-04-14_17-45-47.png" },
  { title: "MediCare Health",     category: "Healthcare",  image: "/images/Snipaste_2026-04-14_17-47-32.png" },
  { title: "EduLearn Academy",    category: "Education",   image: "/images/Snipaste_2026-04-14_17-48-20.png" },
  { title: "ShopNow Store",       category: "E-Commerce",  image: "/images/Snipaste_2026-04-14_17-48-34.png" },
  { title: "FoodieHub Delivery",  category: "Food",        image: "/images/Snipaste_2026-04-14_17-58-49.png" },
  { title: "FitPro Gym",          category: "Fitness",     image: "/images/Snipaste_2026-04-14_18-00-14.png" },
  { title: "LegalEase Firm",      category: "Legal",       image: "/igniting hopes.png" },
];

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export function PortfolioSection() {
  const [active, setActive] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  // Number of visible slides depends on screen width (handled via CSS, but we need it for dot logic)
  const getVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }, []);

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [getVisibleCount]);

  const maxSlide = Math.max(0, filtered.length - visibleCount);

  // Reset slide when filter changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [active]);

  // Clamp currentSlide if it exceeds maxSlide
  useEffect(() => {
    if (currentSlide > maxSlide) setCurrentSlide(maxSlide);
  }, [currentSlide, maxSlide]);

  // Auto-scroll
  useEffect(() => {
    if (isHovered || maxSlide <= 0) {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      return;
    }

    autoScrollRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 4000);

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [isHovered, maxSlide]);

  const goTo = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, maxSlide)));
  };

  const prev = () => goTo(currentSlide - 1);
  const next = () => goTo(currentSlide >= maxSlide ? 0 : currentSlide + 1);

  // Calculate the slide percentage for each card
  // Each card is (100 / visibleCount)% wide with gap accounted for via CSS
  const translateX = currentSlide * (100 / visibleCount);

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateOnScroll animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              Our Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Recent <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Explore our latest work across industries — from travel to healthcare,
              e-commerce to education.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Filter Buttons */}
        <AnimateOnScroll animation="fade-up" delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                    : "bg-accent text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Carousel */}
        <AnimateOnScroll animation="fade-up" delay={150}>
          <div
            className="relative group/carousel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Navigation Arrows */}
            {filtered.length > visibleCount && (
              <>
                <button
                  onClick={prev}
                  className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Carousel track */}
            <div className="overflow-hidden rounded-2xl">
              <div
                ref={trackRef}
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${translateX}%)` }}
              >
                {filtered.map((project) => (
                  <div
                    key={project.title}
                    className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2.5"
                  >
                    <div className="group relative rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-2">
                      {/* Project screenshot */}
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <Image
                          src={project.image}
                          alt={`${project.title} — ${project.category} website by Slatech Solutions`}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        {/* Gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="inline-block px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-2">
                            {project.category}
                          </span>
                          <h3 className="text-white font-bold text-lg">{project.title}</h3>
                        </div>
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100">
                        <div className="text-center text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                          <p className="text-sm text-white/80 mb-4">{project.category}</p>
                          <span className="inline-flex items-center px-4 py-2 border-2 border-white text-sm font-medium rounded-lg hover:bg-white hover:text-primary transition-colors cursor-pointer">
                            View Project
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dot indicators */}
            {filtered.length > visibleCount && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentSlide
                        ? "w-8 h-2.5 bg-primary"
                        : "w-2.5 h-2.5 bg-gray-300 hover:bg-primary/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </AnimateOnScroll>

        {/* View All */}
        <AnimateOnScroll animation="fade-up" delay={200}>
          <div className="text-center mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center px-7 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-all hover:scale-105 active:scale-95 hover:shadow-lg"
            >
              See All Our Works
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
