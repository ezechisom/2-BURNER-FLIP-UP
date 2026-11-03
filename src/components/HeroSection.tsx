import React, { useState, useEffect, useRef } from 'react';
import { Check, MessageCircle, ArrowRight, Truck, PackageCheck, PhoneCall, ShieldCheck, Flame, ChevronLeft, ChevronRight, Gift, Sparkles, Tag } from 'lucide-react';
import { LandingPageConfig } from '../types';
import { formatNaira, generateWhatsAppLink, CHRISTMAS_CAMPAIGN, isChristmasCampaignActive } from '../config';
import { ChristmasCountdown } from './ChristmasCountdown';
import { ChristmasHangingBalls } from './ChristmasHangingBalls';

interface HeroSectionProps {
  config: LandingPageConfig;
  onOrderClick: (quantity?: number) => void;
  hasPlacedOrder?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onOrderClick,
  hasPlacedOrder = false
}) => {
  const isPromo = isChristmasCampaignActive();
  const currentPrice = isPromo ? CHRISTMAS_CAMPAIGN.PROMO_PRICE : CHRISTMAS_CAMPAIGN.STANDARD_PRICE;
  const originalPrice = CHRISTMAS_CAMPAIGN.ORIGINAL_PRICE;
  const savings = CHRISTMAS_CAMPAIGN.SAVINGS;

  const whatsappUrl = generateWhatsAppLink(config.WHATSAPP_NUMBER, "5-in-1 Premium Gas + Electric Cooktop", 1);
  const heroImages = config.PRODUCT_IMAGES.filter((img) => !img.isPlaceholder && Boolean(img.url));
  const effectiveImages = heroImages.length > 0 ? heroImages : [
    { id: 'default', title: config.PRODUCT_NAME, url: '/images/alternative_5burner/cooktop_main_diagram.png', caption: '', isPlaceholder: false }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInView, setIsInView] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  // IntersectionObserver for slideshow efficiency
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
    }, 4500);

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
      className="relative bg-gradient-to-b from-[#123B2A] via-[#171717] to-[#0A2218] text-white pt-6 pb-14 sm:py-16 px-4 border-b-2 border-[#D4AF37]/50 overflow-hidden"
    >
      {/* Subtle Christmas-Themed Luxury Kitchen Background with ambient dark overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/src/assets/images/christmas_luxury_kitchen_backdrop_1793342178322.jpg"
          alt="Luxury Christmas kitchen ambience"
          className="w-full h-full object-cover opacity-20 filter brightness-90 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#123B2A]/90 via-[#171717]/85 to-[#0A2218]/95" />
      </div>

      {/* Subtle ambient warm golden glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/10 blur-3xl pointer-events-none rounded-full z-0" />

      {/* Colourful Christmas Hanging Balls Clustered in Top Corners */}
      <ChristmasHangingBalls variant="cluster-left" className="absolute top-0 left-2 hidden md:block" />
      <ChristmasHangingBalls variant="cluster-right" className="absolute top-0 right-2 hidden md:block" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Campaign Ribbon Kicker */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#B71C1C] border border-[#D4AF37] text-[#FFFFFF] text-xs sm:text-sm font-black uppercase px-4 py-1.5 rounded-full shadow-lg tracking-wider">
            <Sparkles className="w-4 h-4 text-[#F4E07B] fill-current animate-pulse" />
            <span>{CHRISTMAS_CAMPAIGN.HEADLINE}</span>
            <span className="text-[#F4E07B] hidden sm:inline">•</span>
            <span className="text-[#F4E07B] hidden sm:inline">DECEMBER 2026 OFFICIAL DEAL</span>
          </div>
        </div>

        {/* Desktop: 2-column grid; Mobile: Product Image First, then Sales Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* PRODUCT IMAGE SLIDESHOW (Order 1 on Mobile, Desktop Right via lg:order-2) */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex flex-col items-center">
            <div
              className="relative w-full max-w-lg group select-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Festive Christmas Badge */}
              <div className="absolute top-3 left-3 z-20 bg-[#B71C1C] border border-[#D4AF37] text-white text-[11px] sm:text-xs font-black uppercase px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-1.5 tracking-wider">
                <Gift className="w-3.5 h-3.5 text-[#F4E07B]" />
                {isPromo ? "🎄 CHRISTMAS MEGA DEAL" : "5-IN-1 HYBRID"}
              </div>

              {/* Central Spec Badge */}
              <div className="absolute top-3 right-3 z-20 bg-[#171717]/90 backdrop-blur-md text-[#F4E07B] text-[10px] sm:text-[11px] font-bold uppercase px-2.5 py-1 rounded-lg shadow-md border border-[#D4AF37]/50 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Photo {currentSlide + 1} of {effectiveImages.length}</span>
              </div>

              {/* Glass Frame with Slideshow */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#D4AF37] bg-[#171717] shadow-2xl p-2 sm:p-3 transition-transform duration-300 group-hover:border-[#F4E07B] aspect-[4/3] sm:aspect-[16/11]">
                {effectiveImages.map((img, idx) => (
                  <div
                    key={img.id || idx}
                    className={`absolute inset-2 sm:inset-3 rounded-xl overflow-hidden transition-opacity duration-700 ease-in-out flex items-center justify-center bg-[#171717] ${
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

                {/* Slideshow Arrows */}
                {effectiveImages.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      aria-label="Previous product image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#171717]/85 hover:bg-[#B71C1C] text-white p-2.5 rounded-full shadow-lg border border-[#D4AF37]/50 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 stroke-[3]" />
                    </button>
                    <button
                      onClick={nextSlide}
                      aria-label="Next product image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#171717]/85 hover:bg-[#B71C1C] text-white p-2.5 rounded-full shadow-lg border border-[#D4AF37]/50 transition-all cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </>
                )}

                {/* Bottom Dots */}
                {effectiveImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-[#171717]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/40">
                    {effectiveImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`transition-all rounded-full cursor-pointer ${
                          idx === currentSlide
                            ? 'w-6 h-1.5 bg-[#F4E07B] shadow-sm'
                            : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Verified Product Spec Bar */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-300 px-1">
                <span className="flex items-center gap-1 text-[#F4E07B] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  Actual Product Photos (Auto Slideshow)
                </span>
                <span className="text-slate-300 font-mono">900 × 510 mm Panel</span>
              </div>
            </div>

            {/* Prominent Live Countdown Timer in Hero right beside/below product */}
            <div className="w-full max-w-lg mt-5">
              <ChristmasCountdown variant="hero" />
            </div>
          </div>

          {/* SALES COPY & CHRISTMAS PROMOTIONAL OFFER (Order 2 on Mobile, Desktop Left via lg:order-1) */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col space-y-4 text-left">
            
            {/* Supporting Headline */}
            <div className="inline-flex items-center gap-2 self-start bg-[#171717]/80 border border-[#D4AF37]/60 text-[#F4E07B] text-xs sm:text-sm font-semibold px-3.5 py-1 rounded-full shadow-sm">
              <Flame className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
              <span>4 Gas Burners + 1 Central 2000W Electric Zone • 90cm Luxury Glass</span>
            </div>

            {/* Main Headline requested */}
            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              5-IN-1 PREMIUM GAS + ELECTRIC COOKTOP
            </h1>

            {/* Subheadline requested */}
            <p className="text-lg sm:text-xl font-bold text-[#F4E07B] leading-snug">
              "Upgrade Your Kitchen This Christmas for Just {formatNaira(currentPrice)}!"
            </p>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              Experience the ultimate cooking freedom this festive season. If gas finishes while boiling jollof or soup, immediately turn on the central 2000W radiant electric burner. Complete with automatic Flame Failure gas shutoff, 1–99 min digital timer, and 90° flip-up burners for 10-second cleanups.
            </p>

            {/* Core Benefits Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {[
                "🔥 4 High-Power Gas Burners",
                "⚡ 1 Central 2000W Electric Zone",
                "⏱️ Smart Digital Timer & Auto-Off",
                "✨ Premium Black Glass Finish",
                "🧼 90° Flip-Up Easy-Clean Burners",
                "🍳 5 Simultaneous Cooking Zones"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white">
                  <span className="w-5 h-5 rounded-full bg-[#123B2A] border border-[#D4AF37]/60 text-[#F4E07B] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CHRISTMAS PROMOTIONAL PRICING BOX */}
            <div className="bg-white text-slate-900 border-2 border-[#D4AF37] rounded-2xl p-4 sm:p-5 shadow-2xl relative">
              
              {/* Christmas Promotional Ribbon */}
              <div className="inline-flex items-center gap-1.5 bg-[#B71C1C] text-white text-xs font-black uppercase px-3 py-1 rounded-md shadow-md mb-3 border border-[#D4AF37]/50">
                <Tag className="w-3.5 h-3.5 text-[#F4E07B]" />
                <span>{CHRISTMAS_CAMPAIGN.PROMO_LABEL}</span>
              </div>

              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider block font-bold">
                    Christmas Promotional Price
                  </span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl font-black text-[#B71C1C] tracking-tight">
                      {formatNaira(currentPrice)}
                    </span>
                    <span className="text-base sm:text-lg text-slate-400 line-through font-bold">
                      {formatNaira(originalPrice)}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="bg-[#123B2A] text-[#F4E07B] text-xs font-black uppercase px-3 py-1 rounded-lg border border-[#D4AF37]/60 shadow-sm">
                    YOU SAVE {formatNaira(savings)} (~{CHRISTMAS_CAMPAIGN.DISCOUNT_PERCENT}% OFF)
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                    ✓ Free Delivery Nationwide
                  </span>
                </div>
              </div>

              {/* Tier breakdown explanation for bulk buyers */}
              <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-slate-700 gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B71C1C]" />
                  <span>1 Unit: <strong className="text-slate-950 font-bold">{formatNaira(config.NORMAL_PRICE)}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#123B2A]" />
                  <span>2 Units: <strong className="text-slate-950 font-bold">{formatNaira(config.PRICE_FOR_2)} each</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span>3+ Units: <strong className="text-[#B71C1C] font-extrabold">{formatNaira(config.PRICE_FOR_3_PLUS)} each</strong></span>
                </div>
              </div>
            </div>

            {/* HIGH-CONVERSION CHRISTMAS BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                id="hero-order-btn"
                onClick={() => onOrderClick(1)}
                className="btn-xmas-gold w-full flex-1 font-black py-4 px-6 rounded-xl shadow-xl transition-all flex flex-col items-center justify-center cursor-pointer border border-[#D4AF37]"
              >
                <div className="flex items-center gap-2 text-base sm:text-lg font-black text-[#171717]">
                  <span>{hasPlacedOrder ? "ORDER ANOTHER CHRISTMAS UNIT" : CHRISTMAS_CAMPAIGN.CTA_GET_DEAL}</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </div>
                <div className="text-[11px] font-black text-slate-900/90 uppercase tracking-wider flex items-center gap-1 mt-0.5">
                  <Truck className="w-3.5 h-3.5" /> FREE DELIVERY NATIONWIDE • PAYMENT ON ARRIVAL
                </div>
              </button>

              <button
                onClick={() => onOrderClick(1)}
                className="btn-xmas-red w-full sm:w-auto font-black py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <span>{CHRISTMAS_CAMPAIGN.CTA_ORDER_NOW}</span>
              </button>
            </div>

            {/* WhatsApp Alternative if already placed order */}
            {hasPlacedOrder && (
              <a
                id="hero-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 border border-emerald-400/40"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>CHAT ON WHATSAPP ABOUT YOUR ORDER</span>
              </a>
            )}

            {/* Trust and Delivery Guarantees */}
            <div className="pt-2 border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-start gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#F4E07B] shrink-0" />
                <span>🚚 Free Nationwide Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#F4E07B] shrink-0" />
                <span>🛡️ Payment on Delivery (Cash / Transfer)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4 text-[#F4E07B] shrink-0" />
                <span>📦 12 Months Warranty</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
