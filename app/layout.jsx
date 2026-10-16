import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Providers } from "./_components/Providers";
import "./globals.css";

export const metadata = {
  title: "Arzaka Raffan Mawardi · Web & game developer",
  description: "Web and game developer. Computer Science at Universitas Indonesia. Websites for real users, games that win jams.",
  openGraph: {
    title: "Arzaka Raffan Mawardi",
    description: "Web & game developer · Fasilkom UI",
    type: "website",
  },
};

export const viewport = { themeColor: "#F2F1EC" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
