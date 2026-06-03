import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site.config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #060B14 0%, #0A0F1C 55%, #0d1424 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 30,
            color: "#00D9FF",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg,#00F5D4,#7B61FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#04121a",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            V
          </div>
          {siteConfig.name}
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          Building Future-Ready Digital Experiences
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: "#D1D5DB",
            maxWidth: 820,
          }}
        >
          Redesign · Custom Web Apps · AI · Mobile · Cloud · Product
        </div>
      </div>
    ),
    { ...size },
  );
}
