// Portfolio screenshots and alt text describing what each image actually shows.
export const SHOT_ALT: Record<string, string> = {
  "/images/portfolio/ai-office-automation-website.png": "AI office automation website designed by Slatech Solutions",
  "/images/portfolio/pace-it-partner-website.png": "PACE IT partner and tech gadgets website designed by Slatech Solutions",
  "/images/portfolio/electronics-solar-ecommerce-store.png": "Electronics, security and solar e-commerce store built by Slatech Solutions",
  "/images/portfolio/hotel-website-rooms.png": "Hotel website rooms page designed by Slatech Solutions",
  "/images/portfolio/hotel-website-home.png": "Hotel website homepage designed by Slatech Solutions",
  "/images/portfolio/pluto-bv-healthcare-staffing-website.png": "Pluto BV Services healthcare staffing website designed by Slatech Solutions",
  "/images/portfolio/zero-harm-international-hse-website.png": "Zero-Harm International health, safety and environment consultancy website designed by Slatech Solutions",
  "/images/portfolio/igniting-hope-charity-website.png": "Igniting Hope charity website designed by Slatech Solutions",
};

export const altFor = (src: string, fallback: string) => SHOT_ALT[src] ?? fallback;
