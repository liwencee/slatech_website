"use client";

import { useCounter } from "@/hooks/use-counter";
import { useIntersection } from "@/hooks/use-intersection";

const stats = [
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 2000, suffix: "+", label: "Projects Completed" },
  { value: 500, suffix: "+", label: "Happy Clients" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

function StatItem({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCounter(value, 2500, start);
  return (
    <div className="group text-center rounded-2xl py-4 transition-all duration-300 hover:bg-white/5 hover:-translate-y-1">
      <p className="text-4xl sm:text-5xl font-bold text-primary mb-2 transition-transform duration-300 group-hover:scale-110">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-gray-300 font-medium">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const { ref, isVisible } = useIntersection(0.3);

  return (
    <section className="py-16 bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              start={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
