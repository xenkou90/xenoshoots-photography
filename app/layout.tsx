import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://xenoshoots.site"),
  title: {
    default: "Xeno Shoots — Product Photography Portfolio",
    template: "%s — Xeno Shoots",
  },
  description:
    "Xeno Shoots — Creative product photography specializing in commercial visuals, brand storytelling, and high-end imagery. Based in Greece.",
  authors: [{ name: "Xeno Shoots" }],
  openGraph: {
    siteName: "Xeno Shoots",
    title: "Xeno Shoots — Product Photography Portfolio",
    description:
      "Creative commercial product photography portfolio by Xeno. Explore premium visuals and brand storytelling.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#545454",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
