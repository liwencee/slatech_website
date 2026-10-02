"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through words in a fixed-width slot. Every word is stacked in the
 * same grid cell, so the slot is always as wide as the longest word and the
 * surrounding text never shifts. All words are in the server HTML.
 */
export function RotatingWord({
  words,
  interval = 2600,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className={`inline-grid whitespace-nowrap align-bottom ${className}`}>
        {words.map((word, i) => {
          const state =
            i === index
              ? "opacity-100 translate-y-0"
              : i === (index - 1 + words.length) % words.length
                ? "opacity-0 -translate-y-[0.4em]"
                : "opacity-0 translate-y-[0.4em]";
          return (
            <span
              key={word}
              className={`[grid-area:1/1] transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${state}`}
            >
              {word}
            </span>
          );
        })}
      </span>
    </>
  );
}
