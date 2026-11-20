import {
  useRef,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
  type TouchEvent,
} from "react";
import ResponsivePhoto from "@/components/photos/ResponsivePhoto";
import type { Photo } from "@/data/photos";
import { cn } from "@/lib/cn";

const SWIPE_THRESHOLD = 50;

const dialogClasses = cn(
  // Full screen, nearly black
  "m-0 h-dvh max-h-none w-full max-w-none bg-black/95 p-0 text-white backdrop:bg-transparent",
  // Centre the photo, but only while open (see the note below)
  "open:flex open:items-center open:justify-center",
  // Fade in and out
  "opacity-0 transition-[opacity,display,overlay] transition-discrete open:opacity-100 starting:open:opacity-0",
);

const imageClasses = cn(
  // Fit the screen, keeping the photo's proportions
  "h-auto max-h-[80dvh] w-auto max-w-[95vw] md:max-h-[90dvh] md:max-w-[90vw]",
  // Each new photo fades in and grows slightly, as in the original
  "transition-[opacity,scale] starting:opacity-0 starting:scale-98",
);

const controlClasses = cn(
  "absolute p-3 leading-none font-light text-white transition-colors hover:text-white/80 focus-visible:text-white/80",
);

type LightboxProps = {
  ref: Ref<HTMLDialogElement>;
  photos: Photo[];
  currentIndex: number | null;
  onNext: () => void;
  onPrevious: () => void;
};

export default function Lightbox({
  ref,
  photos,
  currentIndex,
  onNext,
  onPrevious,
}: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const currentPhoto = currentIndex === null ? null : photos[currentIndex];

  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      event.currentTarget.close();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight") onNext();
    if (event.key === "ArrowLeft") onPrevious();
  }

  function handleTouchStart(event: TouchEvent<HTMLDialogElement>) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDialogElement>) {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;

    const distance = event.changedTouches[0].clientX - start;
    if (Math.abs(distance) < SWIPE_THRESHOLD) return;

    if (distance < 0) {
      onNext();
    } else {
      onPrevious();
    }
  }

  return (
    <dialog
      ref={ref}
      aria-label="Photo viewer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={dialogClasses}
    >
      <form method="dialog">
        <button
          aria-label="Close"
          className={cn(
            controlClasses,
            "top-3.75 right-5 text-[40px] md:top-7.5 md:right-12.5 md:text-[50px]",
          )}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </form>

      {currentPhoto && currentIndex !== null && (
        <>
          <ResponsivePhoto
            key={currentPhoto.name}
            photo={currentPhoto}
            sizes="(min-width: 48rem) 72vh, 95vw"
            className={imageClasses}
          />
          <p aria-live="polite" className="sr-only">
            Photo {currentIndex + 1} of {photos.length}: {currentPhoto.alt}
          </p>
        </>
      )}

      <button
        type="button"
        aria-label="Previous photo"
        onClick={onPrevious}
        className={cn(
          controlClasses,
          "top-1/2 left-1 -translate-y-1/2 text-6xl",
        )}
      >
        <span aria-hidden="true">&lsaquo;</span>
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={onNext}
        className={cn(
          controlClasses,
          "top-1/2 right-1 -translate-y-1/2 text-6xl",
        )}
      >
        <span aria-hidden="true">&rsaquo;</span>
      </button>
    </dialog>
  );
}
