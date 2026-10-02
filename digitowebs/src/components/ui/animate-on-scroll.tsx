"use client";

import { useEffect, useRef, useState } from "react";

type Animation = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up";

const hiddenClasses: Record<Animation, string> = {
  "fade-up": "translate-y-8 opacity-0",
  "fade-in": "opacity-0",
  "slide-left": "-translate-x-8 opacity-0",
  "slide-right": "translate-x-8 opacity-0",
  "scale-up": "scale-95 opacity-0",
};

// Long staggers make items that scroll in late feel sluggish.
const MAX_DELAY_MS = 400;

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    // Reveal once the element is 15% up from the bottom of the viewport, then
    // stop observing — no per-scroll measuring.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // Tailwind v4 translate-*/scale-* set the individual `translate`/`scale`
      // properties, so those (not `transform`) are what must transition.
      className={`transition-[opacity,translate,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hiddenClasses[animation]
      } ${className}`}
      style={{ transitionDelay: `${Math.min(delay, MAX_DELAY_MS)}ms` }}
    >
      {children}
    </div>
  );
}
