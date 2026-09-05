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

export const metadata: Metadata = {
  title: "Slatech Solutions | Client-Centered Web Design Company & Digital Agency in Lagos, Nigeria",
  description:
    "Lagos' #1 web design company. We build fast, SEO-optimised websites for Nigerian businesses. 500+ clients, 5.0 Google rating. Free consultation.",
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
    title: "Slatech Solutions | #1 Web Design Company in Lagos, Nigeria",
    description:
      "Lagos' #1 web design company. We build fast, SEO-optimised websites for Nigerian businesses. 500+ clients, 5.0 Google rating. Free consultation.",
    url: "https://slatech.com.ng",
    type: "website",
    images: [
      {
        url: "/SLATECH  SOLUTIONS LOGO.png",
        width: 1200,
        height: 630,
        alt: "Slatech Solutions - Web Design Lagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slatech Solutions | #1 Web Design Company in Lagos, Nigeria",
    description:
      "Lagos' #1 web design company. We build fast, SEO-optimised websites for Nigerian businesses. 500+ clients, 5.0 Google rating. Free consultation.",
    images: ["/side_SLATECH_SOLUTIONS_LOGO.png"],
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
