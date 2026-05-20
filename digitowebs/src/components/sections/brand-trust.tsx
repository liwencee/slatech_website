"use client";

import Image from "next/image";

// ── Replace names/logos with your real clients ──────────────────────
// Upload logo files to: digitowebs/public/images/clients/
// Supported formats: PNG (transparent bg recommended), SVG, WebP
const partners = [
  { name: "TechVault",  logo: "/images/clients/techvault.png"  },
  { name: "NovaPay",    logo: "/images/clients/novapay.png"    },
  { name: "CloudSync",  logo: "/images/clients/cloudsync.png"  },
  { name: "DataPrime",  logo: "/images/clients/dataprime.png"  },
  { name: "FinEdge",    logo: "/images/clients/finedge.png"    },
  { name: "SwiftLogic", logo: "/images/clients/swiftlogic.png" },
];

export function BrandTrustBar() {
  // Duplicate array so the loop appears seamless
  const track = [...partners, ...partners];

  return (
    <section className="py-16 bg-secondary overflow-hidden">
      {/* Heading */}
      <p className="text-center text-white text-lg sm:text-xl font-semibold mb-10 tracking-wide px-4">
        Trusted by{" "}
        <span className="text-primary">500+</span>{" "}
        Businesses Across Nigeria and Beyond
      </p>

      {/* Marquee track — edge-fade mask */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex gap-8 items-center animate-marquee w-max">
          {track.map((partner, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center w-44 h-20 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-default"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={140}
                height={50}
                className="object-contain max-h-12 w-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
