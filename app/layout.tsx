import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import { ContactProvider } from "@/components/contact/ContactProvider";
import { baseOpenGraph } from "@/lib/metadata";
import { siteUrl } from "@/data/site";
import { structuredData, toJsonLd } from "@/lib/structured-data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Xeno Shoots — Product Photography Portfolio",
    template: "%s — Xeno Shoots",
  },
  description:
    "Xeno Shoots — Creative product photography specializing in commercial visuals, brand storytelling, and high-end imagery. Based in Greece.",
  authors: [{ name: "Xeno Shoots" }],
  openGraph: {
    ...baseOpenGraph,
    title: "Xeno Shoots — Product Photography Portfolio",
    description:
      "Creative commercial product photography portfolio by Xeno. Explore premium visuals and brand storytelling.",
  },
};

export const viewport: Viewport = {
  themeColor: "#545454",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col bg-black text-cream md:h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(structuredData) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-cream focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <ContactProvider>
          <MobileNav />
          <div className="flex flex-1 flex-col md:min-h-0 md:flex-row">
            <Sidebar />
            <main
              id="main"
              tabIndex={-1}
              className="flex flex-1 flex-col md:w-1/2 md:overflow-y-auto"
            >
              {children}
            </main>
          </div>
        </ContactProvider>
      </body>
    </html>
  );
}
