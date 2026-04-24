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
    <section className="relative bg-secondary overflow-hidden min-h-screen sm:min-h-[92vh] flex items-center">
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left Content ── */}
          <div className="text-white">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-5 sm:mb-6 border border-primary/30 sm:animate-[fade-in-up_0.6s_ease-out]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              #1 Web Design Company in Lagos, Nigeria
            </span>

            {/* Headline */}
            <h1 className="text-[1.75rem] sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6 sm:animate-[fade-in-up_0.6s_ease-out_0.2s_both]">
              Premium{" "}
              <span className="text-primary">{typedText}</span>
              <span className="animate-pulse text-primary">|</span>
              <br />
              <span className="text-white/90">Services in</span>{" "}
              <span className="text-primary">Lagos</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-7 sm:mb-8 sm:animate-[fade-in-up_0.6s_ease-out_0.4s_both]">
              Slatech Solutions is Lagos&apos; most trusted web design agency in Ikeja, Nigeria.
              We build fast, beautiful, SEO-optimised websites that rank on Google
              and convert visitors into paying customers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 sm:animate-[fade-in-up_0.6s_ease-out_0.6s_both]">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 sm:px-7 py-3 sm:py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                Get a Free Quote
                <svg className="ml-2 w-4 sm:w-5 h-4 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-6 sm:px-7 py-3 sm:py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                Our Services
              </Link>
            </div>

            {/* Google Stars Rating */}
            <div className="flex items-center gap-3 mt-6 sm:mt-8 sm:animate-[fade-in-up_0.6s_ease-out_0.7s_both]">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/70 text-sm">
                <span className="text-white font-semibold">5.0</span> Google Rating ·{" "}
                <span className="text-white font-semibold">168</span> Reviews
              </span>
            </div>

            {/* Stats — 2-col grid on mobile, flex row on sm+ */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-6 pt-6 border-t border-white/10 sm:flex sm:items-center sm:gap-6 sm:mt-8 sm:pt-8 sm:animate-[fade-in-up_0.6s_ease-out_0.8s_both]">
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-primary">10+</p>
                <p className="text-xs text-gray-400">Years in Lagos</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-white/20" />
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-primary">2k+</p>
                <p className="text-xs text-gray-400">Projects Done</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-white/20" />
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-xs text-gray-400">Happy Clients</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-white/20" />
              <div className="text-center sm:text-left">
                <p className="text-2xl font-bold text-primary">100%</p>
                <p className="text-xs text-gray-400">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* ── Right Visual ── */}
          <div className="hidden lg:block relative animate-[fade-in-up_0.8s_ease-out_0.4s_both]">
            <div className="relative w-full max-w-lg mx-auto">

              {/* Main Browser Mockup */}
              <div className="relative">
                <div className="bg-gray-800 rounded-2xl p-2 shadow-2xl shadow-black/50">
                  {/* Browser chrome */}
                  <div className="bg-gray-700 rounded-t-xl">
                    <div className="flex items-center gap-2 px-4 py-2.5">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="flex-1 ml-3 h-6 bg-gray-600 rounded-md flex items-center gap-2 px-3">
                        <svg className="w-3 h-3 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                        </svg>
                        <span className="text-[10px] text-green-400 truncate font-medium">slatech.com.ng</span>
                        <svg className="w-3 h-3 text-gray-400 ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Website preview */}
                  <div className="bg-white rounded-b-xl overflow-hidden">
                    {/* Nav */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary rounded-md" />
                        <div className="w-16 h-2.5 bg-secondary/70 rounded" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-1.5 bg-gray-200 rounded" />
                        <div className="w-8 h-1.5 bg-gray-200 rounded" />
                        <div className="w-8 h-1.5 bg-gray-200 rounded" />
                        <div className="w-16 h-5 bg-primary rounded-md" />
                      </div>
                    </div>

                    {/* Hero section in mockup */}
                    <div className="bg-secondary p-4">
                      <div className="w-32 h-2 bg-primary/40 rounded-full mb-2" />
                      <div className="w-48 h-3 bg-white/30 rounded mb-1.5" />
                      <div className="w-36 h-3 bg-white/20 rounded mb-3" />
                      <div className="w-40 h-2 bg-white/10 rounded mb-4" />
                      <div className="flex gap-2 mb-3">
                        <div className="w-20 h-6 bg-primary rounded-lg" />
                        <div className="w-18 h-6 bg-white/20 rounded-lg border border-white/20" />
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-3 h-3 bg-yellow-400/70 rounded-sm" />
                        ))}
                        <div className="ml-2 w-16 h-2 bg-white/20 rounded self-center" />
                      </div>
                    </div>

                    {/* Services strip */}
                    <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50">
                      {["Web Design", "SEO", "E-Commerce"].map((label) => (
                        <div key={label} className="bg-white rounded-lg p-2 shadow-sm border border-gray-100">
                          <div className="w-5 h-5 bg-primary/15 rounded mb-1.5 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-primary/50 rounded-sm" />
                          </div>
                          <div className="w-full h-1.5 bg-gray-200 rounded mb-1" />
                          <div className="w-2/3 h-1 bg-gray-100 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Laptop base */}
                <div className="bg-gray-700 h-3 rounded-b-xl mx-2 mt-0" />
                <div className="bg-gray-600 h-1.5 rounded-b-lg mx-16" />
              </div>

              {/* ── Floating Achievement Badges ── */}

              {/* Google Rating Badge */}
              <div className="absolute -top-5 -left-8 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 hero-float-1 border border-gray-100">
                <div className="w-9 h-9 rounded-xl bg-[#4285F4]/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs font-bold text-gray-800 mt-0.5">5.0 Google Rating</p>
                  <p className="text-[10px] text-gray-500">168 reviews</p>
                </div>
              </div>

              {/* Projects Done Badge */}
              <div className="absolute -right-8 top-12 bg-primary rounded-2xl shadow-xl p-3.5 text-white hero-float-2">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <p className="text-lg font-bold leading-none">500+</p>
                    <p className="text-[10px] text-white/70 mt-0.5">Projects in Nigeria</p>
                  </div>
                </div>
              </div>

              {/* SSL Badge */}
              <div className="absolute -bottom-4 -right-6 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2.5 hero-float-3 border border-gray-100">
                <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">SSL Secured</p>
                  <p className="text-[10px] text-gray-500">Free with every site</p>
                </div>
              </div>

              {/* Lagos Location Badge */}
              <div className="absolute -left-6 bottom-16 bg-white rounded-xl shadow-lg p-2.5 flex items-center gap-2 hero-float-1 border border-gray-100">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-800">Ikeja, Lagos</p>
                  <p className="text-[9px] text-gray-500">Nigeria 🇳🇬</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 animate-bounce">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
