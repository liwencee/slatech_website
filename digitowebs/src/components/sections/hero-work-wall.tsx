import Image from "next/image";

// Real client projects (same screenshots as the portfolio section).
const SHOTS = [
  "/images/Snipaste_2026-04-14_17-43-34.png",
  "/images/Snipaste_2026-04-14_17-45-47.png",
  "/images/Snipaste_2026-04-14_17-47-32.png",
  "/images/Snipaste_2026-04-14_17-48-20.png",
  "/images/Snipaste_2026-04-14_17-48-34.png",
  "/images/Snipaste_2026-04-14_17-58-49.png",
  "/images/Snipaste_2026-04-14_18-00-14.png",
];

const rotate = (n: number) => [...SHOTS.slice(n), ...SHOTS.slice(0, n)];

const ROWS = [
  { shots: rotate(0), reverse: false },
  { shots: rotate(3), reverse: true },
  { shots: rotate(5), reverse: false },
  { shots: rotate(1), reverse: true },
  { shots: rotate(4), reverse: false },
];

/**
 * Phone/tablet hero background: tilted rows of real project screenshots
 * drifting slowly in alternating directions under a brand overlay. Hidden
 * at lg+, where the laptop mockup shows instead; next/image lazy-loading
 * means desktop never downloads these.
 */
export function HeroWorkWall() {
  return (
    <div aria-hidden="true" className="lg:hidden absolute inset-0 overflow-hidden">
      <div className="absolute -inset-[30%] flex flex-col justify-center gap-4 -rotate-12">
        {ROWS.map((row, r) => (
          <div
            key={r}
            className={`flex gap-4 w-max ${row.reverse ? "hero-wall-row-reverse" : "hero-wall-row"}`}
          >
            {/* Two copies so the -50% marquee loop is seamless */}
            {[...row.shots, ...row.shots].map((src, i) => (
              <div
                key={i}
                className="relative w-48 sm:w-60 aspect-[16/10] shrink-0 rounded-xl overflow-hidden ring-1 ring-white/15 shadow-2xl shadow-black/40"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 240px, 192px"
                  quality={60}
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Brand overlay keeps the text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/85 via-secondary/80 to-secondary/95" />
    </div>
  );
}
