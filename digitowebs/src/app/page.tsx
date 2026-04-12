import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { PortfolioSection } from "@/components/sections/portfolio";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { StatsSection } from "@/components/sections/stats";
import { BlogSection } from "@/components/sections/blog-preview";
import { CTASection } from "@/components/sections/cta";
import { ContactSection } from "@/components/sections/contact-preview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <PortfolioSection />
      <WhyChooseUsSection />
      <BlogSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
