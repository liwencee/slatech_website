import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our portfolio of web design projects across industries — travel, healthcare, e-commerce, education, and more.",
};

const projects = [
  { title: "Travel Agency",           category: "Travel",         image: "/igniting hopes.png" },
  { title: "Oil and Gas",             category: "Oil & Gas",      image: "/images/Snipaste_2026-04-14_17-43-34.png" },
  { title: "Elite Real Estate",       category: "Real Estate",    image: "/images/Snipaste_2026-04-14_17-45-47.png" },
  { title: "MediCare Health",         category: "Healthcare",     image: "/images/Snipaste_2026-04-14_17-47-32.png" },
  { title: "EduLearn Academy",        category: "Education",      image: "/images/Snipaste_2026-04-14_17-48-20.png" },
  { title: "ShopNow Store",           category: "E-Commerce",     image: "/images/Snipaste_2026-04-14_17-48-34.png" },
  { title: "BuildRight Construction", category: "Construction",   image: "/images/Snipaste_2026-04-14_17-58-49.png" },
  { title: "GreenLife NGO",           category: "Non-Profit",     image: "/images/Snipaste_2026-04-14_18-00-14.png" },
  { title: "InteriorPro Designs",     category: "Interior Design",image: "/igniting hopes.png" },
  { title: "TechLaunch App",          category: "Technology",     image: "/images/Snipaste_2026-04-14_17-43-34.png" },
  { title: "FoodExpress Delivery",    category: "Food & Beverage",image: "/images/Snipaste_2026-04-14_17-45-47.png" },
  { title: "LegalEdge Law Firm",      category: "Legal",          image: "/images/Snipaste_2026-04-14_17-47-32.png" },
];

const categories = ["All", ...new Set(projects.map((p) => p.category))];

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
            Our Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Our <span className="text-primary">Works</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our latest projects across various industries, each crafted
            with attention to detail and modern design principles.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-border text-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group relative rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.category} website by Slatech Solutions`}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-white font-bold">{project.title}</h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white p-4">
                    <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                    <p className="text-sm text-white/80 mb-3">{project.category}</p>
                    <span className="inline-flex items-center px-4 py-2 border-2 border-white text-sm font-medium rounded-lg">
                      View Project
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
