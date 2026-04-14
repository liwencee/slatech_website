import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { PortfolioSection } from "@/components/sections/portfolio";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { StatsSection } from "@/components/sections/stats";
import { BlogSection } from "@/components/sections/blog-preview";
import { CTASection } from "@/components/sections/cta";
import { ContactSection } from "@/components/sections/contact-preview";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { BrandTrustBar } from "@/components/sections/brand-trust";

export const metadata: Metadata = {
  title: "Slatech Solutions | #1 Web Design Company in Lagos, Ikeja Nigeria",
  description:
    "Slatech Solutions — the best web design company in Lagos, Ikeja, Nigeria. We build beautiful, fast, mobile-friendly websites that rank on Google and convert visitors into paying customers. Free consultation available.",
  keywords: [
    "web design company Lagos Nigeria",
    "web design company Ikeja",
    "website design Lagos",
    "best web design company Nigeria",
    "affordable web design Lagos",
    "web developer Ikeja Lagos",
    "SEO company Nigeria",
    "ecommerce website design Nigeria",
    "website design company Ikeja Lagos",
    "Slatech Solutions",
  ],
  openGraph: {
    title: "Slatech Solutions | #1 Web Design Company in Lagos, Ikeja Nigeria",
    description:
      "Professional web design, e-commerce, SEO & digital services in Lagos, Ikeja and across Nigeria. 10+ years. 500+ clients. Free quote.",
    url: "https://slatech.com.ng",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <BrandTrustBar />
      <PortfolioSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <BlogSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
