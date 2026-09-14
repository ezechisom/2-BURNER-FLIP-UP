import React, { useState, useRef, useEffect } from 'react';
import {
  Flame,
  Zap,
  Clock,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  CheckCircle2,
  Maximize2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Truck,
  Layers,
  Pause,
  Play
} from 'lucide-react';
import { ALTERNATIVE_PRODUCT_CONFIG, formatNaira } from '../config';

interface AlternativeProductSectionProps {
  onSelectModel: (model: '5-burner', qty?: number) => void;
}

const SLIDE_INTERVAL_MS = 3500;

export const AlternativeProductSection: React.FC<AlternativeProductSectionProps> = ({
  onSelectModel
}) => {
  const product = ALTERNATIVE_PRODUCT_CONFIG;
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const thumbnailTrackRef = useRef<HTMLDivElement | null>(null);

  const currentImage = product.images[selectedSlide] || product.images[0];

  // Auto-observe when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // Automatic slideshow on scroll into view
  useEffect(() => {
    if (!isInView || !isAutoPlaying || isHovered || lightboxOpen || product.images.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setSelectedSlide((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isInView, isAutoPlaying, isHovered, lightboxOpen, product.images.length, selectedSlide]);

  // Keep active thumbnail centered in view
  useEffect(() => {
    if (thumbnailTrackRef.current) {
      const activeEl = thumbnailTrackRef.current.children[selectedSlide] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedSlide]);

  const prevSlide = () => {
    setSelectedSlide((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
  };

  const nextSlide = () => {
    setSelectedSlide((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="alternative-product-section"
      className="py-16 sm:py-24 px-4 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden border-b border-blue-900"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/40 text-sky-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>EXECUTIVE ALTERNATIVE COOKER MODEL</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4">
            LOOKING FOR A BIGGER COOKER? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-200 to-amber-300">
              5-BURNER GAS + ELECTRIC HYBRID
            </span>
          </h2>

          <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
            Need more burners to prepare multiple dishes simultaneously? Upgrade to our executive{' '}
            <strong className="text-white">90cm 5-Zone Built-In Cooktop</strong> featuring{' '}
            <span className="text-amber-300 font-semibold">4 Gas Burners + 1 Central 2000W Electric Ceramic Zone</span>,
            digital timer, and 90° flip-up hinged burners for 1-wipe cleanups.
          </p>
        </div>

        {/* 2-Column Showcase: Interactive Auto-Slideshow Left, Feature & Pricing Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT: Live Interactive Product Slideshow */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-slate-800/80 border-2 border-blue-400/40 rounded-3xl p-3 sm:p-5 shadow-2xl backdrop-blur-md">
              
              {/* Top Bar inside image frame */}
              <div className="flex items-center justify-between gap-2 mb-3 px-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600 text-white font-mono font-bold px-2.5 py-0.5 rounded text-[11px]">
                    {selectedSlide + 1} / {product.images.length}
                  </span>
                  {isInView && isAutoPlaying && !isHovered && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Auto Slideshow
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsAutoPlaying((prev) => !prev)}
                    className="bg-slate-700/80 hover:bg-slate-700 text-slate-200 p-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    title={isAutoPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                  >
                    {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span className="hidden sm:inline">{isAutoPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="bg-slate-700/80 hover:bg-slate-700 text-slate-200 p-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    title="Zoom in full screen"
                  >
                    <ZoomIn className="w-3 h-3" />
                    <span className="hidden sm:inline">Zoom</span>
                  </button>
                </div>
              </div>

              {/* Main Stage Image Frame */}
              <div
                className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 flex items-center justify-center select-none group"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Progress bar */}
                {isInView && isAutoPlaying && !isHovered && !lightboxOpen && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 z-30 overflow-hidden">
                    <div
                      key={selectedSlide}
                      className="h-full bg-amber-400 w-full slideshow-progress-bar origin-left"
                    />
                  </div>
                )}

                {/* Slides with Crossfade */}
                {product.images.map((img, idx) => (
                  <div
                    key={img.id || idx}
                    className={`absolute inset-0 w-full h-full flex items-center justify-center p-2 transition-all duration-700 ease-in-out ${
                      idx === selectedSlide
                        ? 'opacity-100 z-10 scale-100'
                        : 'opacity-0 z-0 pointer-events-none scale-[1.03]'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-contain cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                      onClick={() => setLightboxOpen(true)}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  aria-label="Previous image"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full border border-slate-700 shadow-lg backdrop-blur-sm cursor-pointer transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next image"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full border border-slate-700 shadow-lg backdrop-blur-sm cursor-pointer transition-all hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`transition-all rounded-full cursor-pointer ${
                        idx === selectedSlide
                          ? 'w-5 h-1.5 bg-amber-400 shadow-sm'
                          : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Caption & Title */}
              <div className="mt-3 p-2 bg-slate-900/60 rounded-xl border border-slate-700/60">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{currentImage.title}</span>
                  </h4>
                  <span className="text-[10px] font-mono text-sky-300 uppercase tracking-wider shrink-0 bg-blue-900/60 border border-blue-500/30 px-2 py-0.5 rounded">
                    5-Burner Unit
                  </span>
                </div>
                <p className="text-xs text-blue-200/80 mt-1 leading-relaxed">
                  {currentImage.caption}
                </p>
              </div>

              {/* Thumbnail Strip */}
              <div
                ref={thumbnailTrackRef}
                className="mt-3 flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth"
              >
                {product.images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setSelectedSlide(idx)}
                    className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-slate-950 ${
                      selectedSlide === idx
                        ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105 opacity-100'
                        : 'border-slate-700 hover:border-blue-400 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT: Product Features, Specs Blueprint, Pricing & Order CTA */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            
            {/* Title & Tagline */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/30 mb-2">
                <Zap className="w-3.5 h-3.5 fill-current" />
                Dual-Fuel: 4 Gas + 1 Electric Zone
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                5-Burner Built-In Gas + Electric Cooktop
              </h3>
              <p className="text-blue-200 text-xs sm:text-sm mt-1 leading-relaxed">
                Featuring an executive bevelled black tempered glass finish, illuminated digital countdown timer, 1-touch emergency power cutoff key, and heavy-duty 90° flip-up burners.
              </p>
            </div>

            {/* Core 4 Benefit Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.keyBenefits.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/70 border border-blue-500/20 rounded-xl p-3.5 hover:border-blue-400/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                      {b.badge}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">{b.title}</h4>
                  <p className="text-xs text-blue-200/70 mt-1 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* Official Dimensions & Cutout Specifications Box */}
            <div className="bg-slate-950/80 border border-blue-400/30 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" />
                  Official Blueprint & Cutout Dimensions
                </span>
                <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  Standard Built-in Fit
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">PANEL SIZE</span>
                  <strong className="text-white text-xs sm:text-sm font-black mt-0.5 block">
                    {product.specs.panelDimensions}
                  </strong>
                </div>
                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-amber-500/30">
                  <span className="text-[10px] text-amber-300 block font-mono">CUTOUT HOLE</span>
                  <strong className="text-amber-300 text-xs sm:text-sm font-black mt-0.5 block">
                    {product.specs.cutoutDimensions}
                  </strong>
                </div>
                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-mono">PACKAGE</span>
                  <strong className="text-white text-xs sm:text-sm font-black mt-0.5 block">
                    {product.specs.packageDimensions}
                  </strong>
                </div>
              </div>
            </div>

            {/* Promotional Pricing Box */}
            <div className="bg-gradient-to-br from-blue-900/80 via-slate-900 to-blue-950 border-2 border-amber-400/60 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-blue-800/80 pb-3">
                <div>
                  <span className="text-xs text-amber-300 uppercase tracking-widest font-mono font-bold block">
                    Promotional Direct Pricing
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {formatNaira(product.NORMAL_PRICE)}{' '}
                    <span className="text-xs sm:text-sm font-normal text-blue-200">/ 1 Unit</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block line-through">
                    Reg. {formatNaira(product.REGULAR_PRICE)}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Save {formatNaira(product.REGULAR_PRICE - product.NORMAL_PRICE)} Today
                  </span>
                </div>
              </div>

              {/* Quantity discounts breakdown */}
              <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">1 Unit</span>
                  <strong className="text-white block font-bold">{formatNaira(product.NORMAL_PRICE)}</strong>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-blue-500/40">
                  <span className="text-[10px] text-sky-300 block">2 Units (Each)</span>
                  <strong className="text-sky-300 block font-bold">{formatNaira(product.PRICE_FOR_2)}</strong>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-amber-400/40">
                  <span className="text-[10px] text-amber-300 block">3+ Units (Each)</span>
                  <strong className="text-amber-300 block font-bold">{formatNaira(product.PRICE_FOR_3)}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onSelectModel('5-burner', 1)}
                  className="btn-glow-amber flex-1 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>ORDER THIS 5-BURNER (₦280,000)</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>

                <button
                  onClick={() => setShowComparison((prev) => !prev)}
                  className="bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-600 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>{showComparison ? 'Hide Comparison' : 'Compare Models'}</span>
                </button>
              </div>

              {/* Instant Combo CTA */}
              <button
                type="button"
                onClick={() => onSelectModel('combo', 1)}
                className="mt-2.5 w-full bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 hover:text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Need both? Order 2-Burner (75×45cm) + 5-Burner (90×51cm) & Save ₦20,000</span>
              </button>

              <div className="mt-3 flex items-center justify-between text-[11px] text-blue-200/80 pt-2 border-t border-blue-900/60">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-sky-300" /> Nationwide Delivery
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Physical Inspection Guaranteed
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* COMPARISON DRAWER / TABLE: 2-Burner Flip-Up vs 5-Burner Hybrid */}
        {showComparison && (
          <div className="mt-12 bg-slate-800/95 border-2 border-blue-400/50 rounded-3xl p-4 sm:p-8 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-300 font-bold block mb-1">
                SIDE-BY-SIDE BUYER'S GUIDE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                WHICH COOKER MODEL IS RIGHT FOR YOUR KITCHEN?
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-300 text-xs uppercase font-mono">
                    <th className="py-3 px-3">Feature</th>
                    <th className="py-3 px-3 bg-blue-900/30 text-sky-300 font-bold rounded-t-lg">
                      2-Flip-Up Double Burner
                    </th>
                    <th className="py-3 px-3 bg-amber-950/40 text-amber-300 font-bold rounded-t-lg">
                      5-Burner Gas + Electric Hybrid
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 text-slate-200">
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Cooking Zones</td>
                    <td className="py-3 px-3 bg-blue-900/10">2 Fast Gas Burners</td>
                    <td className="py-3 px-3 bg-amber-950/20 font-bold text-amber-200">
                      5 Zones (4 Gas + 1 Central 2000W Electric)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Fuel Flexibility</td>
                    <td className="py-3 px-3 bg-blue-900/10">LPG Gas</td>
                    <td className="py-3 px-3 bg-amber-950/20 font-bold text-amber-200">
                      Dual Fuel (Gas + Electricity)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Flip-Up Hinged Burners</td>
                    <td className="py-3 px-3 bg-blue-900/10">
                      <span className="text-emerald-400 font-bold">✓ Yes (Lifts 90° to Clean)</span>
                    </td>
                    <td className="py-3 px-3 bg-amber-950/20">
                      <span className="text-emerald-400 font-bold">✓ Yes (Lifts 90° to Clean)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Digital Timer</td>
                    <td className="py-3 px-3 bg-blue-900/10">
                      <span className="text-emerald-400 font-bold">✓ Built-in LED Timer</span>
                    </td>
                    <td className="py-3 px-3 bg-amber-950/20">
                      <span className="text-emerald-400 font-bold">✓ Digital Timer + 1-Touch Auto-Off Key</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Panel Dimensions</td>
                    <td className="py-3 px-3 bg-blue-900/10 font-bold text-sky-200">
                      75 × 45 cm (750 × 450 mm)
                    </td>
                    <td className="py-3 px-3 bg-amber-950/20 font-bold text-amber-200">
                      90 × 51 cm (900 × 510 mm)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Cutout Installation</td>
                    <td className="py-3 px-3 bg-blue-900/10">Tabletop (Non-Slip) or 680×380mm Cutout</td>
                    <td className="py-3 px-3 bg-amber-950/20 font-bold text-amber-200">
                      Built-in Recessed (870 × 480mm Cutout)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Promotional Price</td>
                    <td className="py-3 px-3 bg-blue-900/10 font-black text-sky-300 text-sm">
                      From ₦160,000 (1 Unit: ₦170,000)
                    </td>
                    <td className="py-3 px-3 bg-amber-950/20 font-black text-amber-300 text-sm">
                      From ₦265,000 (1 Unit: ₦280,000)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-semibold text-white">Single Order Action</td>
                    <td className="py-3 px-3 bg-blue-900/10">
                      <button
                        onClick={() => onSelectModel('2-burner', 1)}
                        className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 px-3 rounded cursor-pointer transition-colors"
                      >
                        Choose 2-Burner
                      </button>
                    </td>
                    <td className="py-3 px-3 bg-amber-950/20">
                      <button
                        onClick={() => onSelectModel('5-burner', 1)}
                        className="text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-1.5 px-3 rounded cursor-pointer transition-colors"
                      >
                        Choose 5-Burner
                      </button>
                    </td>
                  </tr>
                  <tr className="border-t-2 border-emerald-500/40">
                    <td className="py-3 px-3 font-bold text-emerald-300">
                      🔥 Best Deal: Order Both
                    </td>
                    <td colSpan={2} className="py-3 px-3 bg-emerald-950/40 text-center">
                      <button
                        onClick={() => onSelectModel('combo', 1)}
                        className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2 px-4 rounded-lg cursor-pointer transition-all shadow inline-flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Order Both Models Together (Save ₦20,000 Combo Discount)</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal for 5-Burner Images */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-amber-300 bg-slate-800 border border-slate-700 p-2.5 rounded-full cursor-pointer transition-colors"
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
