import ResponsivePhoto from "@/components/photos/ResponsivePhoto";
import type { Photo } from "@/data/photos";

const itemClasses = [
    // Frame: full-width button that clips the zoomed photo and positions the veil
    "group relative block w-full overflow-hidden",
    // White veil: fades in on hover or keyboard focus
    "after:pointer-events-none after:absolute after:inset-0 after:bg-white/0 after:transition-colors",
    "group-hover:after:bg-white/10 group-focus-visible:after:bg-white/10",
].join(" ");

const imageClasses = [
    // Always a 4:5 cell, filled completely
    "aspect-4/5 w-full object-cover",
    // Two properties, two speeds, as in the original CSS
    "[transition:scale_0.5s_ease,filter_0.3s_ease]",
    "group-hover:scale-103 group-focus-visible:brightness-105",
].join(" ");

type GalleryGridProps = {
    photos: Photo[];
    onOpen: (index: number) => void;
};

export default function GalleryGrid({ photos, onOpen }: GalleryGridProps) {
    return (
        <ul className="grid grid-cols-2 gap-2.5 md:gap-2.5 wide:grid-cols-3 wide:gap-5">
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
