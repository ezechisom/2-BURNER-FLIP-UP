import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X, ImageIcon, ShieldCheck } from 'lucide-react';
import { ProductImageItem } from '../types';

interface ProductShowcaseSectionProps {
  images: ProductImageItem[];
}

export const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const currentImage = images[selectedIndex] || images[0];

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
    <section id="gallery-section" className="py-14 sm:py-20 px-4 bg-slate-50 text-slate-900 border-b border-blue-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-blue-600 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
            Visual Proof & Gallery
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            PRODUCT IMAGE SHOWCASE
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Detailed views of the 2-flip-up double burner cooker, burner mechanics, and timer control.
          </p>
        </div>

        {/* Main Showcase Container */}
        <div className="bg-white border border-blue-200/80 rounded-3xl p-4 sm:p-6 shadow-xl">
          
          {/* Main Display Stage */}
          <div
            className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {currentImage.isPlaceholder || !currentImage.url ? (
              <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-inner">
                  <ImageIcon className="w-8 h-8 opacity-70" />
                </div>
                <div className="space-y-1">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-mono font-bold px-3 py-1 rounded uppercase tracking-wider">
                    ADDITIONAL PRODUCT IMAGE
                  </span>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-md pt-1">
                    {currentImage.caption || "Reserved showcase slot. Configurable by the seller."}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={currentImage.url}
                  alt={currentImage.title}
                  className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 hover:scale-105"
                  onClick={() => setLightboxOpen(true)}
                  referrerPolicy="no-referrer"
                />

                {/* Zoom Hint Button */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Zoom image"
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white border border-slate-300 text-slate-800 p-2.5 rounded-xl shadow-md backdrop-blur-sm transition-all cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white active:bg-slate-100 border border-slate-300 text-slate-800 p-2 sm:p-2.5 rounded-full shadow-md backdrop-blur-sm transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white active:bg-slate-100 border border-slate-300 text-slate-800 p-2 sm:p-2.5 rounded-full shadow-md backdrop-blur-sm transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* View Counter Badge */}
            <div className="absolute top-4 left-4 bg-slate-900/80 border border-slate-700 text-white text-xs font-mono px-2.5 py-1 rounded-md backdrop-blur-sm">
              {selectedIndex + 1} / {images.length}
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
            <div className="text-xs text-slate-400 font-mono shrink-0">
              Swipe or tap thumbnails below
            </div>
          </div>

          {/* Thumbnail Track (Touch / Scrollable) */}
          <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-slate-100 ${
                  selectedIndex === idx
                    ? 'border-blue-600 ring-2 ring-blue-500/30 shadow-md scale-105'
                    : 'border-slate-300 hover:border-blue-400 opacity-70 hover:opacity-100'
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
