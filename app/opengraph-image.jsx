import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

// Link preview for LinkedIn, WhatsApp, X, etc. Rendered once at build time.
export const alt = `${profile.name} · ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F2F1EC", INK = "#0E0E0E", INK_3 = "#8A877F", ACCENT = "#FF4D00";
const font = (f) => readFile(join(process.cwd(), "node_modules/geist/dist/fonts", f));

export default async function Image() {
  const [first, last] = profile.short.split(" ");
  const label = { fontFamily: "Geist Mono", fontSize: 20, letterSpacing: "0.08em", textTransform: "uppercase" };
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "56px 72px", background: PAPER, color: INK, fontFamily: "Geist" }}>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${INK}`, paddingTop: 16, ...label }}>
          <span>// {profile.role}</span>
          <span style={{ color: INK_3 }}>{profile.school}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", fontSize: 196, lineHeight: 0.84, letterSpacing: "-0.055em" }}>
          <span>{first}</span>
          <span style={{ display: "flex", alignItems: "flex-end" }}>
            {last}
            <span style={{ width: 26, height: 26, borderRadius: 13, background: ACCENT, marginLeft: 22, marginBottom: 26 }} />
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 40, borderTop: `1px solid ${INK}`, paddingTop: 16, ...label }}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <span style={{ width: 12, height: 12, borderRadius: 6, background: ACCENT, marginRight: 12 }} />
            {profile.status}
          </span>
          <span style={{ color: INK_3 }}>{new URL(profile.site).host}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: await font("geist-sans/Geist-Medium.ttf"), weight: 500 },
        { name: "Geist Mono", data: await font("geist-mono/GeistMono-Regular.ttf"), weight: 400 },
      ],
    },
  );
}
