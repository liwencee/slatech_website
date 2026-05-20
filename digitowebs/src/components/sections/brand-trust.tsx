"use client";

import Image from "next/image";

// Real client logos — files live in: digitowebs/public/images/clients/
const partners = [
  { name: "Cybera",                logo: "/images/clients/cybera.png"        },
  { name: "BUA Foods",             logo: "/images/clients/bua-foods.png"     },
  { name: "Slimboss Technologies", logo: "/images/clients/slimboss.png"      },
  { name: "SLA Computers",         logo: "/images/clients/sla-computers.png" },
  { name: "Kuda",                  logo: "/images/clients/kuda.png"          },
];

export function BrandTrustBar() {
  // Triple the list so there are always logos filling the viewport
  const track = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 bg-secondary overflow-hidden">
      {/* Heading */}
      <p className="text-center text-white text-lg sm:text-xl font-semibold mb-10 tracking-wide px-4">
        Trusted by{" "}
        <span className="text-primary">500+</span>{" "}
        Businesses Across Nigeria and Beyond
      </p>

      {/* Marquee — edge-fade on both sides */}
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
              className="flex-shrink-0 flex items-center justify-center w-44 h-24 px-5 py-4 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
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
