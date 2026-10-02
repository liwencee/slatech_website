import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Social share card (WhatsApp, Facebook, LinkedIn, X) for every page.
export const alt = "Slatech Solutions — Web Design & Software Development in Lagos, Nigeria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logomark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #115279 0%, #0d3f5e 60%, #1a6d9e 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={96} height={97} alt="" />
          <div style={{ fontSize: 44, fontWeight: 700 }}>Slatech Solutions</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.1 }}>
            Websites, Software &amp; Mobile Apps
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#e91761", marginTop: 16 }}>
            That Move Businesses Forward
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 30,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <div style={{ display: "flex" }}>Ikeja, Lagos · Nigeria</div>
          <div style={{ display: "flex" }}>slatech.com.ng</div>
        </div>
      </div>
    ),
    size
  );
}
