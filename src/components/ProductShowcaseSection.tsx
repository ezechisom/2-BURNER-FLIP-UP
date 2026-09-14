import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X, ImageIcon, ShieldCheck, Play, Pause } from 'lucide-react';
import { ProductImageItem } from '../types';

interface ProductShowcaseSectionProps {
  images: ProductImageItem[];
}

const SLIDE_INTERVAL_MS = 3500;

export const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const thumbnailTrackRef = useRef<HTMLDivElement | null>(null);

  const currentImage = images[selectedIndex] || images[0];

  // Observe when section is scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Automatic slideshow timer when in view
  useEffect(() => {
    // Only auto-advance if scrolled in view, user hasn't manually paused, not hovered, lightbox closed, and multiple images
    if (!isInView || !isAutoPlaying || isHovered || lightboxOpen || images.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isInView, isAutoPlaying, isHovered, lightboxOpen, images.length, selectedIndex]);

  // Keep active thumbnail scrolled into view as slideshow plays
  useEffect(() => {
    if (thumbnailTrackRef.current) {
      const activeElement = thumbnailTrackRef.current.children[selectedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedIndex]);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="gallery-section"
      className="py-14 sm:py-20 px-4 bg-slate-50 text-slate-900 border-b border-blue-100"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-blue-600 font-mono text-xs uppercase tracking-widest font-bold">
              Visual Proof & Live Slideshow
            </span>
            {isInView && isAutoPlaying && !isHovered && (
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Slideshow Playing
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            PRODUCT IMAGE SHOWCASE
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Detailed views of the 2-flip-up double burner cooker, burner mechanics, and timer control. Slideshow plays automatically.
          </p>
        </div>

        {/* Main Showcase Container */}
        <div className="bg-white border border-blue-200/80 rounded-3xl p-4 sm:p-6 shadow-xl">
          
          {/* Main Display Stage */}
          <div
            className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center select-none group"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated Slideshow Progress Bar at top of frame */}
            {isInView && isAutoPlaying && !isHovered && !lightboxOpen && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200/60 z-30 overflow-hidden">
                <div
                  key={selectedIndex}
                  className="h-full bg-blue-600 w-full slideshow-progress-bar origin-left"
                />
              </div>
            )}

            {/* Slides with smooth crossfade */}
            {images.map((img, idx) => {
              const isActive = idx === selectedIndex;
              return (
                <div
                  key={img.id || idx}
                  className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out ${
                    isActive
                      ? 'opacity-100 z-10 scale-100'
                      : 'opacity-0 z-0 pointer-events-none scale-[1.03]'
                  }`}
                >
                  {img.isPlaceholder || !img.url ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-inner">
                        <ImageIcon className="w-8 h-8 opacity-70" />
                      </div>
                      <div className="space-y-1">
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-mono font-bold px-3 py-1 rounded uppercase tracking-wider">
                          ADDITIONAL PRODUCT IMAGE
                        </span>
                        <p className="text-slate-600 text-xs sm:text-sm max-w-md pt-1">
                          {img.caption || "Reserved showcase slot. Configurable by the seller."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-contain cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                      onClick={() => setLightboxOpen(true)}
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              );
            })}

            {/* Top Left: Slide Counter & Autoplay status */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <div className="bg-slate-900/85 border border-slate-700 text-white text-xs font-mono px-2.5 py-1 rounded-lg backdrop-blur-sm shadow-md">
                {selectedIndex + 1} / {images.length}
              </div>

              <button
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm border shadow-md transition-all cursor-pointer ${
                  isAutoPlaying
                    ? 'bg-blue-600/90 hover:bg-blue-600 text-white border-blue-400'
                    : 'bg-slate-900/85 hover:bg-slate-800 text-slate-200 border-slate-700'
                }`}
                title={isAutoPlaying ? 'Click to Pause Slideshow' : 'Click to Play Slideshow'}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span className="hidden sm:inline">Playing</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span className="hidden sm:inline">Paused</span>
                  </>
                )}
              </button>
            </div>

            {/* Top Right: Zoom Hint */}
            <button
              onClick={() => setLightboxOpen(true)}
              aria-label="Zoom image"
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white border border-slate-300 text-slate-800 p-2 rounded-xl shadow-md backdrop-blur-sm transition-all cursor-pointer"
              title="Click to zoom in full screen"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white active:bg-slate-100 border border-slate-300 text-slate-800 p-2 sm:p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all cursor-pointer hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white active:bg-slate-100 border border-slate-300 text-slate-800 p-2 sm:p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all cursor-pointer hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Bottom Dots Indicator Overlay */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-slate-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    idx === selectedIndex
                      ? 'w-6 h-2 bg-blue-500 shadow-sm'
                      : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Active Image Caption & Label */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>{currentImage.title}</span>
                {!currentImage.isPlaceholder && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                    Verified Product Photo
                  </span>
                )}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {currentImage.caption}
              </p>
            </div>
            <div className="text-xs text-blue-600 font-medium shrink-0 flex items-center gap-1">
              <span>Automatic Slideshow Active</span>
            </div>
          </div>

          {/* Thumbnail Track (Smooth scrolling with active highlight) */}
          <div
            ref={thumbnailTrackRef}
            className="mt-4 flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth"
          >
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-slate-100 ${
                  selectedIndex === idx
                    ? 'border-blue-600 ring-4 ring-blue-500/30 shadow-md scale-105 opacity-100'
                    : 'border-slate-300 hover:border-blue-400 opacity-60 hover:opacity-100'
                }`}
              >
                {img.isPlaceholder || !img.url ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-1 text-center">
                    <ImageIcon className="w-4 h-4 text-slate-400 mb-0.5" />
                    <span className="text-[8px] font-mono leading-tight">IMAGE {idx + 1}</span>
                  </div>
                ) : (
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
                {selectedIndex === idx && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />
                )}
              </button>
            ))}
          </div>

        </div>

        {/* Reassurance disclaimer */}
        <div className="mt-4 text-center text-xs text-slate-600 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>The photographs above depict the exact 2-flip-up double burner product design you will receive.</span>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && !currentImage.isPlaceholder && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-blue-300 bg-slate-800 border border-slate-700 p-2.5 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="max-w-full max-h-[75vh] object-contain rounded-xl border border-slate-700 shadow-2xl bg-white"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center">
              <h4 className="text-lg font-bold text-white">{currentImage.title}</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{currentImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
