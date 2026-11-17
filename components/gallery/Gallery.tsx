"use client";

import { useRef, useState } from "react";
import GalleryGrid from "./GalleryGrid";
import Lightbox from "./Lightbox";
import type { Photo } from "@/data/photos";

type GalleryProps = {
    photos: Photo[];
};

export default function Gallery({ photos }: GalleryProps) {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    function openPhoto(index: number) {
        setCurrentIndex(index);
        dialogRef.current?.showModal();
    }

    function showNext() {
        setCurrentIndex((index) =>
            index === null ? null : (index + 1) % photos.length,
        );
    }

    function showPrevious() {
        setCurrentIndex((index) =>
            index === null ? null : (index - 1 + photos.length) % photos.length,
        );
    }

    return (
        <>
            <GalleryGrid photos={photos} onOpen={openPhoto} />
            <Lightbox
                ref={dialogRef}
                photos={photos}
                currentIndex={currentIndex}
                onNext={showNext}
                onPrevious={showPrevious}
            />
        </>
    );
}
