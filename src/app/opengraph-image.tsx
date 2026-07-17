import { ImageResponse } from "next/og";

import { getSiteSettings } from "@/lib/data";

export const alt = "Servis Klime Niš";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const settings = await getSiteSettings();

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
          background: "linear-gradient(135deg, #0b1526 0%, #142238 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "#2f6fed",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            ❄
          </div>
          <div style={{ fontSize: 28, color: "#9fb0c9", letterSpacing: 2 }}>
            {settings.city.toUpperCase()}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            marginTop: 40,
            lineHeight: 1.15,
            maxWidth: 950,
          }}
        >
          {settings.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#c3ceda",
            marginTop: 24,
            maxWidth: 850,
          }}
        >
          {settings.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
