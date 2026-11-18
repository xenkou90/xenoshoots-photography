import type { Metadata } from "next";
import Gallery from "@/components/gallery/Gallery";
import { galleryPhotos } from "@/data/photos";
import { baseOpenGraph } from "@/lib/metadata";

const description =
  "Commercial product photography by Xeno Shoots: products, styled and photographed for brands.";

export const metadata: Metadata = {
  title: "Gallery",
  description,
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    ...baseOpenGraph,
    title: "Gallery — Xeno Shoots",
    description,
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <div className="p-5 md:px-5 md:py-7.5">
      <h1 className="sr-only">Gallery</h1>
      <Gallery photos={galleryPhotos} />
    </div>
  );
}
