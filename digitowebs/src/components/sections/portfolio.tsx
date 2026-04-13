"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const projects = [
  { title: "TravelMax Agency", category: "Travel", gradient: "from-blue-500 to-cyan-400" },
  { title: "AutoBook Car Rentals", category: "Automotive", gradient: "from-green-500 to-emerald-400" },
  { title: "Elite Real Estate", category: "Real Estate", gradient: "from-purple-500 to-violet-400" },
  { title: "MediCare Health", category: "Healthcare", gradient: "from-red-400 to-rose-300" },
  { title: "EduLearn Academy", category: "Education", gradient: "from-yellow-500 to-amber-400" },
  { title: "ShopNow Store", category: "E-Commerce", gradient: "from-pink-500 to-fuchsia-400" },
  { title: "FoodieHub Delivery", category: "Food", gradient: "from-orange-500 to-yellow-400" },
  { title: "FitPro Gym", category: "Fitness", gradient: "from-teal-500 to-cyan-400" },
  { title: "LegalEase Firm", category: "Legal", gradient: "from-indigo-500 to-blue-400" },
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
                      {/* Gradient image placeholder */}
                      <div className={`aspect-[16/10] bg-gradient-to-br ${project.gradient} relative`}>
                        {/* Gradient overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        {/* Decorative pattern on card */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/30 rounded-xl rotate-12" />
                          <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-white/20 rounded-lg -rotate-6" />
                        </div>
                        {/* Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
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
