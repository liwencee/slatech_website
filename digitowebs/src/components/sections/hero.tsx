"use client";

import Link from "next/link";
import { useTyping } from "@/hooks/use-typing";

export function HeroSection() {
  const typedText = useTyping(
    ["Web Design", "E-Commerce", "SEO", "Digital Marketing", "Web Development"],
    80,
    50,
    2000
  );

  return (
    <section className="relative bg-secondary overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient-bg" />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 hero-dot-pattern opacity-[0.07]" />

      {/* Animated glow blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[100px] hero-blob-1" />
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-secondary-light/20 blur-[120px] hero-blob-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[80px] hero-blob-3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-6 border border-primary/30 animate-[fade-in-up_0.6s_ease-out]">
              Turning Ideas into Powerful Digital Brands
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-[fade-in-up_0.6s_ease-out_0.2s_both]">
              The Best{" "}
              <span className="text-primary">{typedText}</span>
              <span className="animate-pulse text-primary">|</span>
              {" "}Company
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg animate-[fade-in-up_0.6s_ease-out_0.4s_both]">
              We help small and large businesses create stunning websites that
              are beautiful, fast, secure, and mobile-friendly. Let us bring
              your vision to life.
            </p>
            <div className="flex flex-wrap gap-4 animate-[fade-in-up_0.6s_ease-out_0.6s_both]">
              <Link
                href="/services"
                className="inline-flex items-center px-7 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95"
              >
                Explore Our Services
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-7 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
              >
                Talk To Us
              </Link>
            </div>

            {/* Trust indicators with icons */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/10 animate-[fade-in-up_0.6s_ease-out_0.8s_both]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">10+</p>
                  <p className="text-xs text-gray-400">Years Experience</p>
                </div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">2k+</p>
                  <p className="text-xs text-gray-400">Projects Delivered</p>
                </div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">500+</p>
                  <p className="text-xs text-gray-400">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual - Browser/Laptop Mockup */}
          <div className="hidden lg:block relative animate-[fade-in-up_0.8s_ease-out_0.4s_both]">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Laptop body */}
              <div className="relative">
                {/* Screen bezel */}
                <div className="bg-gray-800 rounded-t-2xl p-2 shadow-2xl">
                  {/* Browser chrome */}
                  <div className="bg-gray-700 rounded-t-lg">
                    {/* Title bar with traffic lights */}
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      {/* URL bar */}
                      <div className="flex-1 ml-3 h-6 bg-gray-600 rounded-md flex items-center px-3">
                        <svg className="w-3 h-3 text-gray-400 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                        <span className="text-[10px] text-gray-400 truncate">slatechsolutions.com</span>
                      </div>
                    </div>
                  </div>

                  {/* Website content mockup */}
                  <div className="bg-white rounded-b-lg overflow-hidden">
                    {/* Nav bar mockup */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <div className="w-20 h-4 bg-secondary/80 rounded" />
                      <div className="flex gap-3">
                        <div className="w-10 h-2 bg-gray-200 rounded" />
                        <div className="w-10 h-2 bg-gray-200 rounded" />
                        <div className="w-10 h-2 bg-gray-200 rounded" />
                        <div className="w-14 h-5 bg-primary rounded-md" />
                      </div>
                    </div>

                    {/* Hero area mockup */}
                    <div className="p-4">
                      <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-xl p-5 mb-3">
                        <div className="w-24 h-2 bg-primary/40 rounded mb-3" />
                        <div className="w-40 h-3 bg-white/30 rounded mb-2" />
                        <div className="w-32 h-3 bg-white/20 rounded mb-4" />
                        <div className="flex gap-2">
                          <div className="w-16 h-5 bg-primary rounded-md" />
                          <div className="w-16 h-5 bg-white/20 rounded-md" />
                        </div>
                      </div>

                      {/* Cards row */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-gray-50 rounded-lg p-2.5">
                          <div className="w-6 h-6 bg-primary/15 rounded-md mb-2 flex items-center justify-center">
                            <div className="w-3 h-3 bg-primary/40 rounded-sm" />
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded mb-1.5" />
                          <div className="w-3/4 h-1.5 bg-gray-100 rounded" />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2.5">
                          <div className="w-6 h-6 bg-secondary/15 rounded-md mb-2 flex items-center justify-center">
                            <div className="w-3 h-3 bg-secondary/40 rounded-sm" />
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded mb-1.5" />
                          <div className="w-3/4 h-1.5 bg-gray-100 rounded" />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2.5">
                          <div className="w-6 h-6 bg-primary/15 rounded-md mb-2 flex items-center justify-center">
                            <div className="w-3 h-3 bg-primary/40 rounded-sm" />
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded mb-1.5" />
                          <div className="w-3/4 h-1.5 bg-gray-100 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laptop base / keyboard */}
                <div className="relative">
                  <div className="bg-gray-700 h-4 rounded-b-xl mx-2" />
                  <div className="bg-gray-600 h-1.5 rounded-b-lg mx-16" />
                </div>
              </div>

              {/* Floating elements around the mockup */}
              <div className="absolute -top-4 -right-4 w-14 h-14 bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-center hero-float-1">
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="absolute -bottom-2 -left-4 w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hero-float-2">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="absolute top-1/3 -left-8 w-10 h-10 bg-green-400/20 border border-green-400/30 rounded-lg flex items-center justify-center hero-float-3">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
