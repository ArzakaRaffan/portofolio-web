import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import { Providers } from "./_components/Providers";
import "./globals.css";
import { profile } from "@/lib/data";

export const metadata = {
  metadataBase: new URL(profile.site),
  title: "Arzaka Raffan Mawardi · Web & game developer",
  description: "Web and game developer. Computer Science at Universitas Indonesia. Websites for real users, games that win jams.",
  openGraph: {
    title: "Arzaka Raffan Mawardi",
    description: "Web & game developer · Fasilkom UI",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#F2F1EC" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
        {/* Umami: page views + clicks on elements with data-umami-event (projects, CV). Counts the live domain only, not localhost. */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="f8edb1f2-3556-4813-88ac-cb6232c890bc"
          data-domains={new URL(profile.site).host}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
