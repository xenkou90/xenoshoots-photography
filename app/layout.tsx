import type { Metadata } from "next";
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
  title: "Xeno Shoots — Product Photography Portfolio",
  description:
    "Xeno Shoots — Creative product photography specializing in commercial visuals, brand storytelling, and high-end imagery. Based in Greece.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
