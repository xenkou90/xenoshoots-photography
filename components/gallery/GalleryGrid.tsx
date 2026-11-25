import ResponsivePhoto from "@/components/photos/ResponsivePhoto";
import type { Photo } from "@/data/photos";
import { cn } from "@/lib/cn";

const itemClasses = cn(
  // Frame: full-width button that clips the zoomed photo and positions the veil
  "group relative block w-full overflow-hidden",
  // Cream veil: fades in on hover or keyboard focus
  "after:pointer-events-none after:absolute after:inset-0 after:bg-cream/0 after:transition-colors",
  "group-hover:after:bg-cream/10 group-focus-visible:after:bg-cream/10",
);

const imageClasses = cn(
  // Always a 4:5 cell, filled completely
  "aspect-4/5 w-full object-cover",
  // Two properties, two speeds, as in the original CSS
  "[transition:scale_0.5s_ease,filter_0.3s_ease]",
  "group-hover:scale-103 group-focus-visible:brightness-105",
  "group-focus-visible:scale-103 group-focus-visible:brightness-105",
);

type GalleryGridProps = {
  photos: Photo[];
  onOpen: (index: number) => void;
};

export default function GalleryGrid({ photos, onOpen }: GalleryGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-2.5 md:gap-3.75 wide:grid-cols-3 wide:gap-5">
      {photos.map((photo, index) => (
        <li key={photo.name}>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => onOpen(index)}
            className={itemClasses}
          >
            <span className="sr-only">View larger: </span>
            <ResponsivePhoto
              photo={photo}
              priority={index < 3}
              sizes="(min-width: 87.5rem) 17vw, (min-width: 48rem) 25vw, 50vw"
              className={imageClasses}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
