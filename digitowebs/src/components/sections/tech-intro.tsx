import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export function TechIntroSection() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimateOnScroll animation="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Technology Built <span className="text-primary">Around Your Business</span>
          </h2>
          <p className="text-lg font-semibold text-secondary mb-6">
            Your business is unique. Your technology should be too.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We don&apos;t believe in forcing businesses into one-size-fits-all solutions.
            We take the time to understand your objectives, processes, customers and
            challenges before designing and developing the right digital solution.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you need a new website, an online store, a customer portal, a business
            management system or a complete digital product, our team can take your
            project from concept to deployment and ongoing support.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
