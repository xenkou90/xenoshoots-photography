import ResponsivePhoto from "@/components/photos/ResponsivePhoto";
import type { Photo } from "@/data/photos";

const itemClasses = [
    // Frame: clips the zoomed photo, and positions the white veil
    "group relative overflow-hidden",
    // White veil: fades in over the photo on hover
    "after:pointer-events-none after:absolute after:inset-0 after:bg-white/0 after:transition-colors group-hover:after:bg-white/10",
].join(" ");

const imageClasses = [
    // Always a 4:5 cell, filled completely
    "aspect-4/5 w-full object-cover",
    // Two properties, two speeds, as in the original CSS
    "[transition:scale_0.5s_ease,filter_0.3s_ease]",
    "group-hover:scale-103 group-hover:brightness-105",
].join(" ");

type GalleryGridProps = {
    photos: Photo[];
};

export default function GalleryGrid({ photos }: GalleryGridProps) {
    return (
        <ul className="grid grid-cols-2 gap-2.5 md:gap-3.75 wide:grid-cols-3 wide:gap-5">
            {photos.map((photo, index) => (
                <li key={photo.name} className={itemClasses}>
                    <ResponsivePhoto
                        photo={photo}
                        priority={index < 3}
                        sizes="(min-width: 87.5rem) 17vw, (min-width: 48rem) 25vw, 50vw"
                        className={imageClasses}
                    />
                </li>
            ))}
        </ul>
    );
}
