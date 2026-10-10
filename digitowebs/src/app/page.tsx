import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { TechIntroSection } from "@/components/sections/tech-intro";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { ProcessSection } from "@/components/sections/process";
import { PortfolioSection } from "@/components/sections/portfolio";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { StatsSection } from "@/components/sections/stats";
import { BlogSection } from "@/components/sections/blog-preview";
import { CTASection } from "@/components/sections/cta";
import { ContactSection } from "@/components/sections/contact-preview";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { BrandTrustBar } from "@/components/sections/brand-trust";
import { FAQSection } from "@/components/sections/faq";
import { LocationsHubSection } from "@/components/sections/locations-hub";

export const metadata: Metadata = {
  title: "Web Design Company in Lagos | 4.9★ · 88 Reviews | Slatech",
  description:
    "Web design company in Ikeja, Lagos. Landing pages from ₦100,000, business websites from ₦400,000. Rated 4.9 on Google. Get a free quote today.",
  keywords: [
    "web design company Lagos Nigeria",
    "web design company Ikeja Lagos",
    "website design Lagos",
    "best web design company Nigeria",
    "affordable web design Lagos",
    "web developer Ikeja Lagos",
    "SEO company Nigeria", "WordPress website design Nigeria", "web design services near me Lagos",
    "ecommerce website design Nigeria", "website development company Nigeria", "professional web designers Lagos",
    "website design company Ikeja Lagos",
    "Slatech Solutions", "graphic design company Lagos, logo design Nigeria",
    "branding company Lagos Nigeria, brand identity design Lagos",
    "SEO company Nigeria, SEO services Lagos",
    "website design Lagos, web developer Ikeja Lagos",
    "web design company Lagos Nigeria, branding and web design agency Nigeria",
  ],
  openGraph: {
    title: "Web Design Company in Lagos | 4.9★ · 88 Reviews | Slatech",
    description:
      "Web design company in Ikeja, Lagos. Landing pages from ₦100,000, business websites from ₦400,000. Rated 4.9 on Google. Get a free quote today.",
    url: "https://slatech.com.ng",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design Company in Lagos | 4.9★ · 88 Reviews | Slatech",
    description:
      "Web design company in Ikeja, Lagos. Landing pages from ₦100,000, business websites from ₦400,000. Rated 4.9 on Google. Get a free quote today.",
  },
  alternates: {
    canonical: "https://slatech.com.ng",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <TechIntroSection />
      <AboutSection />
      <ServicesSection />
      <LocationsHubSection />
      <ProcessSection />
      <BrandTrustBar />
      <PortfolioSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <BlogSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
