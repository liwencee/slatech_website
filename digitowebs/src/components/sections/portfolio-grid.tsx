"use client";

import { useState } from "react";
import Image from "next/image";
import { altFor, PORTFOLIO_PROJECTS as projects } from "@/lib/portfolio-shots";

const categories = ["All", ...new Set(projects.map((p) => p.category))];

export function PortfolioGrid() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
              active === cat
                ? "bg-primary text-white border-primary"
                : "bg-white border-border text-foreground hover:bg-primary hover:text-white hover:border-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((project) => (
          <div
            key={project.title}
            className="group relative rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={project.image}
                alt={altFor(project.image, `${project.title} — ${project.category} website by Slatech Solutions`)}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-2">
                  {project.category}
                </span>
                <h2 className="text-white font-bold">{project.title}</h2>
              </div>
            </div>
            <div className="absolute inset-0 bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-center text-white p-4">
                <h2 className="font-bold text-lg mb-2">{project.title}</h2>
                <p className="text-sm text-white/80 mb-3">{project.category}</p>
                <span className="inline-flex items-center px-4 py-2 border-2 border-white text-sm font-medium rounded-lg">
                  View Project
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
