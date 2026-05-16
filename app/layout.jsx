import "./globals.css";

export const metadata = {
  title: "Arzaka Raffan Mawardi · Web & game developer",
  description:
    "Computer Science student at Universitas Indonesia. I build websites for real users and small games for itch.io.",
  openGraph: {
    title: "Arzaka Raffan Mawardi",
    description: "Web & game developer · Fasilkom UI ’23",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
