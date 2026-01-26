"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface GalleryCarouselProps {
  images: string[];
  title?: string;
  support360?: boolean;
}

export function GalleryCarousel({ images, title, support360 }: GalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div className="relative bg-slate-100">
        <div className="aspect-video overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={title ? `${title} - Image ${currentIndex + 1}` : `Image ${currentIndex + 1}`}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Navigation Controls */}
        {images.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 transition-all hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-slate-900" />
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 transition-all hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-slate-900" />
            </button>
          </>
        )}

        {/* Fullscreen Button */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              className="absolute bottom-4 right-4 rounded-full bg-white/80 p-2 transition-all hover:bg-white"
              aria-label="Fullscreen"
            >
              <Maximize2 className="h-5 w-5 text-slate-900" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-h-screen max-w-4xl">
            <div className="flex items-center justify-center">
              <img
                src={images[currentIndex]}
                alt={title ? `${title} - Image ${currentIndex + 1}` : `Image ${currentIndex + 1}`}
                className="max-h-[80vh] w-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-sm font-medium text-slate-900">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                idx === currentIndex
                  ? "border-blue-500 ring-2 ring-blue-500/50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* 360 View Info */}
      {support360 && (
        <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
          <p className="font-medium">💫 360° Virtual Tour Available</p>
          <p className="mt-1 text-blue-800">Experience this room in 360° with interactive viewing</p>
        </div>
      )}
    </div>
  );
}
