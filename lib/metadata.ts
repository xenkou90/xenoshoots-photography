import type { Metadata } from "next";
import { siteName } from "@/data/site";

export const baseOpenGraph = {
  siteName,
  type: "website",
  locale: "en_US",
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Xeno Shoots logo: the name in white hand-lettered script on a deep purple background, with a zigzag underline beneath 'shoots'",
    },
  ],
} satisfies Metadata["openGraph"];
