"use client";

import { useCounter } from "@/hooks/use-counter";
import { useIntersection } from "@/hooks/use-intersection";

/**
 * Deliberately fact-based, not performance-metric-based: total
 * projects/clients/satisfaction numbers must not be published here until
 * verified against internal records and the current Google Business
 * Profile. See the About page content brief for this instruction.
 */
const facts = [
  { kind: "static" as const, value: "2020", label: "Founded" },
  { kind: "counter" as const, value: 6, suffix: "+", label: "Years of Operations" },
  { kind: "static" as const, value: "Digital Products", label: "& Solutions" },
  { kind: "static" as const, value: "Nigeria", label: "& International Clients" },
];

function CounterFact({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCounter(value, 2000, start);
  return (
    <div className="group text-center rounded-2xl py-4 transition-all duration-300 hover:bg-white/5 hover:-translate-y-1">
      <p className="text-4xl sm:text-5xl font-bold text-primary mb-2 transition-transform duration-300 group-hover:scale-110">
        {count}{suffix}
      </p>
      <p className="text-sm text-white font-medium">{label}</p>
    </div>
  );
}

function StaticFact({ value, label }: { value: string; label: string }) {
  return (
    <div className="group text-center rounded-2xl py-4 transition-all duration-300 hover:bg-white/5 hover:-translate-y-1">
      <p className="text-2xl sm:text-3xl font-bold text-primary mb-2 leading-tight transition-transform duration-300 group-hover:scale-105">
        {value}
      </p>
      <p className="text-sm text-white font-medium">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const { ref, isVisible } = useIntersection(0.3);

  return (
    <section className="py-16 bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map((fact) =>
            fact.kind === "counter" ? (
              <CounterFact
                key={fact.label}
                value={fact.value}
                suffix={fact.suffix}
                label={fact.label}
                start={isVisible}
              />
            ) : (
              <StaticFact key={fact.label} value={fact.value} label={fact.label} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
