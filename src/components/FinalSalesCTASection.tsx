import React from 'react';
import { ArrowRight, MessageCircle, Clock, Sparkles, Truck } from 'lucide-react';
import { LandingPageConfig } from '../types';
import { formatNaira, generateWhatsAppLink } from '../config';
import { useCountdown } from '../hooks/useCountdown';

interface FinalSalesCTASectionProps {
  config: LandingPageConfig;
  onOrderClick: () => void;
  hasPlacedOrder?: boolean;
}

export const FinalSalesCTASection: React.FC<FinalSalesCTASectionProps> = ({
  config,
  onOrderClick,
  hasPlacedOrder = false
}) => {
  const { days, hours, minutes, seconds, isEnded } = useCountdown(
    config.COUNTDOWN_END_DATE,
    config.COUNTDOWN_HOURS
  );
  const whatsappUrl = generateWhatsAppLink(config.WHATSAPP_NUMBER, config.PRODUCT_NAME, 1);

  return (
    <section id="final-cta-section" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-slate-50 via-blue-50/70 to-blue-100/60 text-slate-900 border-b border-blue-200 text-center relative overflow-hidden">
      {/* Decorative subtle lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Limited Promo Stock</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
          READY TO COOK SMARTER?
        </h2>

        {/* Subheadline */}
        <p className="text-slate-600 text-sm sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Get your 2-Flip-Up Double Burner today and enjoy a more convenient, space-conscious cooking experience.
        </p>

        {/* Pricing Tiers Summary Banner */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-6 bg-white border border-blue-200 px-5 py-3 rounded-2xl mb-8 text-xs sm:text-sm shadow-md">
          <div>
            <span className="text-slate-500">1 PC — </span>
            <strong className="text-slate-900 font-bold">{formatNaira(config.NORMAL_PRICE)}</strong>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div>
            <span className="text-slate-500">2 PCS — </span>
            <strong className="text-blue-700 font-bold">{formatNaira(config.PRICE_FOR_2)} EACH</strong>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div>
            <span className="text-slate-500">3+ PCS — </span>
            <strong className="text-blue-800 font-black">{formatNaira(config.PRICE_FOR_3_PLUS)} EACH</strong>
          </div>
        </div>

        {/* Countdown display */}
        <div className="mb-8 flex items-center justify-center gap-2 text-xs font-mono">
          <Clock className="w-4 h-4 text-blue-600" />
          {isEnded ? (
            <span className="text-rose-600 font-bold">OFFER HAS ENDED</span>
          ) : (
            <span className="text-slate-700 font-semibold">
              PROMO CLOSES IN: <strong className="text-blue-700">{days}d : {hours}h : {minutes}m : {seconds}s</strong>
            </span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOrderClick}
            className="btn-glow w-full sm:w-auto min-w-[280px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-base py-3.5 px-8 rounded-xl shadow-xl transition-all flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>{hasPlacedOrder ? "ORDER ANOTHER UNIT" : "ORDER NOW"}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="text-[11px] font-bold text-blue-100 uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
              <Truck className="w-3.5 h-3.5" /> FREE DELIVERY NATIONWIDE
            </div>
          </button>

          {hasPlacedOrder && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow-emerald w-full sm:w-auto min-w-[240px] bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base py-3.5 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          )}
        </div>

      </div>
    </section>
  );
};
