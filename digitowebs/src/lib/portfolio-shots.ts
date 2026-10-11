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

// Portfolio cards — titles and categories match what each screenshot shows.
// Shared by the homepage carousel and the /portfolio grid.
export const PORTFOLIO_PROJECTS = [
  { title: "Zero-Harm International",      category: "Professional Services", image: "/images/portfolio/zero-harm-international-hse-website.png" },
  { title: "Pluto BV Services",            category: "Healthcare",            image: "/images/portfolio/pluto-bv-healthcare-staffing-website.png" },
  { title: "Igniting Hope",                category: "Non-Profit",            image: "/images/portfolio/igniting-hope-charity-website.png" },
  { title: "PACE IT Partner",              category: "Technology",            image: "/images/portfolio/pace-it-partner-website.png" },
  { title: "AI Office Automation",         category: "Technology",            image: "/images/portfolio/ai-office-automation-website.png" },
  { title: "Electronics & Solar Store",    category: "E-Commerce",            image: "/images/portfolio/electronics-solar-ecommerce-store.png" },
  { title: "Hotel Website",                category: "Hospitality",           image: "/images/portfolio/hotel-website-home.png" },
  { title: "Hotel Rooms & Booking",        category: "Hospitality",           image: "/images/portfolio/hotel-website-rooms.png" },
];
