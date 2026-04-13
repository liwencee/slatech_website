import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const partners = [
  { name: "TechVault", letters: "TV" },
  { name: "NovaPay", letters: "NP" },
  { name: "CloudSync", letters: "CS" },
  { name: "DataPrime", letters: "DP" },
  { name: "FinEdge", letters: "FE" },
  { name: "SwiftLogic", letters: "SL" },
];

export function BrandTrustBar() {
  return (
    <section className="py-16 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <AnimateOnScroll animation="fade-up">
          <p className="text-center text-white text-lg sm:text-xl font-semibold mb-10 tracking-wide">
            Trusted by{" "}
            <span className="text-primary">500+</span>{" "}
            Businesses Across Nigeria and Beyond
          </p>
        </AnimateOnScroll>

        {/* Logo row */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
          {partners.map((partner, i) => (
            <AnimateOnScroll
              key={partner.name}
              animation={i < 3 ? "slide-left" : "slide-right"}
              delay={i * 80}
            >
              <div className="group flex items-center gap-2.5 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-primary/40">
                {/* Abstract geometric logo mark */}
                <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {partner.letters}
                </div>
                <span className="text-white/70 font-medium text-sm group-hover:text-white transition-colors duration-300">
                  {partner.name}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
