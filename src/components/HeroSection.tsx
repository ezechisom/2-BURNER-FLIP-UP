import React, { useState, useEffect, useRef } from 'react';
import { Check, MessageCircle, ArrowRight, Truck, PackageCheck, PhoneCall, ShieldCheck, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { LandingPageConfig } from '../types';
import { formatNaira, generateWhatsAppLink } from '../config';

interface HeroSectionProps {
  config: LandingPageConfig;
  onOrderClick: (quantity?: number) => void;
  hasPlacedOrder?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, onOrderClick, hasPlacedOrder = false }) => {
  const whatsappUrl = generateWhatsAppLink(config.WHATSAPP_NUMBER, config.PRODUCT_NAME, 1);
  const heroImages = config.PRODUCT_IMAGES.filter((img) => !img.isPlaceholder && Boolean(img.url));
  const effectiveImages = heroImages.length > 0 ? heroImages : [
    { id: 'default', title: config.PRODUCT_NAME, url: '/images/cooker_active_blue_flames.jpg', caption: '', isPlaceholder: false }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInView, setIsInView] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  // IntersectionObserver for Hero Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const currentElem = heroRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, []);

  // Auto-play slideshow when Hero is in view
  useEffect(() => {
    if (!isInView || isHovered || effectiveImages.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % effectiveImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isInView, isHovered, effectiveImages.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : effectiveImages.length - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < effectiveImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 text-white pt-6 pb-12 sm:py-16 px-4 border-b border-blue-800/80 relative overflow-hidden"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-400/15 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Desktop: 2-column grid; Mobile: Product Image First, then Sales Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* PRODUCT IMAGE SLIDESHOW (First on Mobile via order-1, Desktop Right via lg:order-2) */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col items-center">
            <div
              className="relative w-full max-w-lg group select-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Product Badge */}
              <div className="absolute top-3 left-3 z-20 bg-blue-600 text-white text-xs font-black uppercase px-3 py-1.5 rounded shadow-lg flex items-center gap-1.5 tracking-wider border border-blue-400/40">
                <Flame className="w-3.5 h-3.5 fill-current" />
                Dual Burner + Built-in Timer
              </div>

              {/* Auto Slideshow Indicator Badge */}
              <div className="absolute top-3 right-3 z-20 bg-slate-900/80 backdrop-blur-md text-sky-200 text-[10px] font-bold uppercase px-2.5 py-1 rounded shadow-md border border-white/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Slideshow {currentSlide + 1}/{effectiveImages.length}</span>
              </div>

              {/* Glass Frame with Slideshow */}
              <div className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-white shadow-2xl p-2 sm:p-3 transition-transform duration-300 group-hover:border-sky-300 aspect-[4/3] sm:aspect-[16/11]">
                {effectiveImages.map((img, idx) => (
                  <div
                    key={img.id || idx}
                    className={`absolute inset-2 sm:inset-3 rounded-xl overflow-hidden transition-opacity duration-700 ease-in-out flex items-center justify-center bg-slate-900 ${
                      idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.title || config.PRODUCT_NAME}
                      className="w-full h-full object-cover rounded-xl shadow-inner transition-transform duration-500 group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}

                {/* Slideshow Arrows (Show on hover or mobile) */}
                {effectiveImages.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      aria-label="Previous hero image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full shadow-lg backdrop-blur-sm transition-all cursor-pointer opacity-80 hover:opacity-100"
                    >
                      <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <button
                      onClick={nextSlide}
                      aria-label="Next hero image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full shadow-lg backdrop-blur-sm transition-all cursor-pointer opacity-80 hover:opacity-100"
                    >
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </>
                )}

                {/* Bottom Dots */}
                {effectiveImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    {effectiveImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Go to hero slide ${idx + 1}`}
                        className={`transition-all rounded-full cursor-pointer ${
                          idx === currentSlide
                            ? 'w-5 h-1.5 bg-sky-400 shadow-sm'
                            : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Verified Product Spec Tag */}
              <div className="mt-3 flex items-center justify-between text-xs text-blue-200 px-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
                  Actual Product Photos (Auto Slideshow)
                </span>
                <span className="text-blue-300">Dual Burner • Glass-Top</span>
              </div>
            </div>
          </div>

          {/* SALES COPY & OFFER (Second on Mobile via order-2, Desktop Left via lg:order-1) */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col space-y-5 text-left">
            
            {/* Supporting Headline pill */}
            <div className="inline-flex items-center gap-2 self-start bg-blue-950/80 border border-blue-400/40 text-sky-200 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full shadow-sm">
              <span>Cook More Conveniently. Save Space. Enjoy More Control.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              UPGRADE YOUR KITCHEN WITH THE 2-FLIP-UP DOUBLE BURNER
            </h1>

            {/* Subheadline */}
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Designed for modern kitchens, this 2-burner flip-up gas cooker combines convenience, a space-saving design and a built-in timer to make everyday cooking easier.
            </p>

            {/* Core Benefits Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                "75 × 45 cm Panel Size (750 × 450 mm)",
                "2 Powerful Gas Cooking Zones",
                "90° Flip-Up Space-Saving Design",
                "Built-In Mechanical Timer"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white">
                  <span className="w-5 h-5 rounded-full bg-sky-400/20 border border-sky-400/50 text-sky-200 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Promotional Pricing Box */}
            <div className="bg-white text-slate-900 border-2 border-blue-400/40 rounded-xl p-4 sm:p-5 shadow-xl relative">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider block font-bold">Special Promotional Pricing</span>
                  <div className="text-2xl sm:text-3xl font-black text-blue-700">
                    FROM {formatNaira(config.PRICE_FOR_3_PLUS)} <span className="text-xs sm:text-sm font-normal text-slate-500">EACH</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block line-through">Reg. {formatNaira(config.NORMAL_PRICE + 30000)}</span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Bulk Discounts Active
                  </span>
                </div>
              </div>

              {/* Tier breakdown explanation */}
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-slate-600 gap-1 sm:gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Buy 1 for <strong className="text-slate-900 font-bold">{formatNaira(config.NORMAL_PRICE)}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Buy 2 for <strong className="text-slate-900 font-bold">{formatNaira(config.PRICE_FOR_2)} each</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Buy 3+ for <strong className="text-blue-700 font-extrabold">{formatNaira(config.PRICE_FOR_3_PLUS)} each</strong></span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                id="hero-order-btn"
                onClick={() => onOrderClick(1)}
                className="btn-glow-amber w-full flex-1 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black py-4 px-6 rounded-xl shadow-xl transition-all flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="flex items-center gap-2 text-base sm:text-lg">
                  <span>{hasPlacedOrder ? "ORDER ANOTHER UNIT" : "ORDER NOW"}</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="text-[11px] font-black text-slate-950/90 uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <Truck className="w-3.5 h-3.5" /> FREE DELIVERY NATIONWIDE
                </div>
              </button>

              {hasPlacedOrder && (
                <a
                  id="hero-whatsapp-btn"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow-emerald w-full sm:w-auto flex-1 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-base py-3.5 px-6 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>CHAT ON WHATSAPP</span>
                </a>
              )}
            </div>

            {/* Editable Trust Statements */}
            <div className="pt-2 border-t border-blue-700/60 flex flex-wrap items-center justify-start gap-4 sm:gap-6 text-xs text-blue-200 font-medium">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-sky-300 shrink-0" />
                <span>🚚 Nationwide Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4 text-sky-300 shrink-0" />
                <span>📦 Secure Packaging</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-sky-300 shrink-0" />
                <span>📞 Customer Support</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
