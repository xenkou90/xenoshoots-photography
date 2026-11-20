import IMAGE_WIDTHS from "@/lib/image-widths.json";
import type { Photo } from "@/data/photos";
import { cn } from "@/lib/cn";

const PHOTO_WIDTH = 1728;
const PHOTO_HEIGHT = 2160;
const LARGEST_WIDTH = Math.max(...IMAGE_WIDTHS);

function photoUrl(name: string, width: number) {
  return `/photos/${name}-${width}.webp`;
}

type ResponsivePhotoProps = {
  photo: Photo;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export default function ResponsivePhoto({
  photo,
  sizes,
  priority = false,
  className,
}: ResponsivePhotoProps) {
  const srcSet = IMAGE_WIDTHS.map(
    (width) => `${photoUrl(photo.name, width)} ${width}w`,
  ).join(", ");

  return (
    // Files are pre-sized at build time by scripts/optimize-images.mts.
    // next/image's own resizing needs a server, which static export doesn't have.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoUrl(photo.name, LARGEST_WIDTH)}
      srcSet={srcSet}
      sizes={sizes}
      width={PHOTO_WIDTH}
      height={PHOTO_HEIGHT}
      alt={photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={cn("text-transparent", className)}
    />
  );
}
