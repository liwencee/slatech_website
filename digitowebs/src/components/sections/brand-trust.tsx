"use client";

import Image from "next/image";

// Real client logos — upload files to: digitowebs/public/images/clients/
const partners = [
  { name: "Cybera",                logo: "/images/clients/cybera.png",        dark: false },
  { name: "BUA Foods",             logo: "/images/clients/bua-foods.png",     dark: false },
  { name: "Slimboss Technologies", logo: "/images/clients/slimboss.png",      dark: false },
  { name: "SLA Computers",         logo: "/images/clients/sla-computers.png", dark: false },
  { name: "Kuda",                  logo: "/images/clients/kuda.png",          dark: false },
  { name: "Igniting Hope",         logo: "/images/clients/igniting-hope.png", dark: true  },
  { name: "Paystack",              logo: "/images/clients/paystack.png",       dark: false },
  { name: "Care Home",             logo: "/images/clients/care-home.png",     dark: false },
  { name: "MyTech BuddyHub",       logo: "/images/clients/mytech-buddyhub.png", dark: false },
  { name: "Envato",                logo: "/images/clients/envato.png",        dark: true  },
];

export function BrandTrustBar() {
  // Duplicate list so the loop is seamless with no empty gaps
  const track = [...partners, ...partners];

  return (
    <section className="py-16 bg-secondary overflow-hidden">
      {/* Heading */}
      <p className="text-center text-white text-lg sm:text-xl font-semibold mb-10 tracking-wide px-4">
        Trusted by{" "}
        <span className="text-primary">500+</span>{" "}
        Businesses Across Nigeria and Beyond
      </p>

      {/* Marquee — soft edge-fade mask */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex gap-6 items-center animate-marquee w-max">
          {track.map((partner, i) => (
            <div
              key={i}
              className={`flex-shrink-0 flex items-center justify-center w-44 h-24 px-5 py-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 ${
                partner.dark
                  ? "bg-gray-900 border border-white/10"
                  : "bg-white border border-gray-100"
              }`}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={140}
                height={56}
                className="object-contain max-h-14 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
