import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const steps = [
  { n: "01", title: "Discover", description: "We understand your business, users, objectives and technical requirements." },
  { n: "02", title: "Design", description: "We create intuitive user experiences and interfaces that align with your brand and business goals." },
  { n: "03", title: "Develop", description: "Our developers turn approved designs and requirements into reliable, scalable technology." },
  { n: "04", title: "Test", description: "We test functionality, performance, responsiveness, security and user experience before launch." },
  { n: "05", title: "Deploy", description: "We launch your solution and configure the required hosting, infrastructure and integrations." },
  { n: "06", title: "Support & Grow", description: "We continue to provide maintenance, improvements, monitoring and technical support as your business evolves." },
];

export function ProcessSection() {
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              From Idea to Digital Product
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              A Complete Technology <span className="text-primary">Partner</span> for Your Business
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We work with businesses at different stages of growth — from startups
              launching their first digital product to established organizations
              modernizing their operations.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.n} animation="fade-up" delay={i * 100}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 transition-colors duration-300">
                <span className="text-primary font-bold text-sm">{step.n}</span>
                <h3 className="font-bold text-white mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
