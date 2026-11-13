import type { Metadata } from "next";
import Link from "next/link";
import ResponsivePhoto from "@/components/photos/ResponsivePhoto";
import { heroPhoto } from "@/data/photos";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const heroImageClasses = [
  // Fill the link area, cropping the sides like the original site
  "absolute inset-0 size-full object-cover",
  // Zoom out: quicker, on its own curve
  "transition-[scale] duration-350 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
  // Zoom in on hover or keyboard focus: slower, on a different curve
  "group-hover:scale-107 group-hover:duration-900 group-hover:ease-[cubic-bezier(0.23,1,0.32,1)]",
  "group-focus-visible:scale-107",
].join(" ");

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Xeno Shoots — product photography</h1>
      <Link href="/gallery" className="group relative flex-1 overflow-hidden">
        <span className="sr-only">View the gallery: </span>
        <ResponsivePhoto
          photo={heroPhoto}
          priority
          sizes="(min-width: 48rem) 50vw, 80vh"
          className={heroImageClasses}
        />
      </Link>
    </>
  );
}
