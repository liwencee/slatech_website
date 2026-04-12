import Link from "next/link";

const projects = [
  { title: "TravelMax Agency", category: "Travel", color: "bg-blue-500" },
  { title: "AutoBook Car Rentals", category: "Automotive", color: "bg-green-500" },
  { title: "Elite Real Estate", category: "Real Estate", color: "bg-purple-500" },
  { title: "MediCare Health", category: "Healthcare", color: "bg-red-400" },
  { title: "EduLearn Academy", category: "Education", color: "bg-yellow-500" },
  { title: "ShopNow Store", category: "E-Commerce", color: "bg-pink-500" },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-3">
            Our Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Recent <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Explore our latest work across industries — from travel to healthcare,
            e-commerce to education.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300"
            >
              {/* Placeholder image */}
              <div className={`aspect-[16/10] ${project.color} relative`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-white font-bold text-lg">{project.title}</h3>
                </div>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center text-white">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-white/80 mb-4">{project.category}</p>
                  <span className="inline-flex items-center px-4 py-2 border-2 border-white text-sm font-medium rounded-lg hover:bg-white hover:text-primary transition-colors">
                    View Project
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center px-7 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition-colors"
          >
            See All Our Works
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
