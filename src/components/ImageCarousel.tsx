"use client";

import { useState, useCallback, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

interface CarouselImage {
  light: string;
  dark: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  className?: string;
}

export const ImageCarousel = memo(function ImageCarousel({ images, className = "" }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imageTransitioning, setImageTransitioning] = useState(false);
  const { resolvedTheme } = useTheme();

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  // Preload images for better performance
  useEffect(() => {
    if (!images || images.length === 0) return;

    const preloadImage = (src: string) => {
      if (loadedImages.has(src)) return;
      
      const img = new window.Image();
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(src));
      };
      img.src = src;
    };

    // Preload current image for both themes
    const currentImage = images[currentIndex];
    if (currentImage) {
      preloadImage(currentImage.light);
      preloadImage(currentImage.dark);
    }

    // Preload next and previous images for both themes
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    
    if (images[nextIndex]) {
      preloadImage(images[nextIndex].light);
      preloadImage(images[nextIndex].dark);
    }
    
    if (images[prevIndex]) {
      preloadImage(images[prevIndex].light);
      preloadImage(images[prevIndex].dark);
    }
  }, [currentIndex, images, loadedImages]);

  // Handle theme transitions smoothly
  useEffect(() => {
    setImageTransitioning(true);
    const timer = setTimeout(() => setImageTransitioning(false), 150);
    return () => clearTimeout(timer);
  }, [resolvedTheme]);

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];
  const currentSrc = resolvedTheme === 'dark' ? currentImage.dark : currentImage.light;
  const isImageLoaded = loadedImages.has(currentSrc);

  return (
    <div className={`relative group ${className}`}>
      <div className="relative overflow-hidden rounded-t-lg aspect-[3/2] bg-gray-100 dark:bg-gray-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Hidden preloaded images for both themes */}
            <Image
              src={currentImage.light}
              alt=""
              fill
              className="object-cover opacity-0 pointer-events-none"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Image
              src={currentImage.dark}
              alt=""
              fill
              className="object-cover opacity-0 pointer-events-none"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Visible image with smooth theme transitions */}
            <div 
              className={`absolute inset-0 transition-opacity duration-150 ${
                imageTransitioning ? 'opacity-75' : 'opacity-100'
              }`}
            >
              <Image
                src={currentSrc}
                alt={currentImage.alt}
                fill
                className={`object-cover rounded-t-lg transition-all duration-300 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                priority={currentIndex === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Loading skeleton */}
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-t-lg" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons - only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Indicators - only show if more than 1 image */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
});