import React from 'react';
import { ArrowRight, MessageCircle, Sparkles, Truck, Gift } from 'lucide-react';
import { LandingPageConfig } from '../types';
import { formatNaira, generateWhatsAppLink, CHRISTMAS_CAMPAIGN, isChristmasCampaignActive } from '../config';
import { ChristmasCountdown } from './ChristmasCountdown';

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
  const isPromo = isChristmasCampaignActive();
  const price1 = isPromo ? CHRISTMAS_CAMPAIGN.PROMO_PRICE : CHRISTMAS_CAMPAIGN.STANDARD_PRICE;
  const whatsappUrl = generateWhatsAppLink(config.WHATSAPP_NUMBER, config.PRODUCT_NAME, 1);

  return (
    <section id="final-cta-section" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-white via-slate-50 to-[#123B2A]/10 text-slate-900 border-b-2 border-[#D4AF37]/40 text-center relative overflow-hidden">
      {/* Decorative subtle golden ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 bg-[#B71C1C] border border-[#D4AF37] text-white text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full mb-4 shadow-md">
          <Gift className="w-4 h-4 text-[#F4E07B]" />
          <span>🎄 CHRISTMAS MEGA SALES — ENDS DEC 20</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
          UPGRADE YOUR KITCHEN THIS CHRISTMAS
        </h2>

        {/* Subheadline */}
        <p className="text-slate-600 text-sm sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Order your 5-in-1 Premium Gas + Electric Cooktop now for just <strong className="text-[#B71C1C] font-black">{formatNaira(price1)}</strong> (regularly ₦280,000) and prepare your holiday feasts without disruption.
        </p>

        {/* Pricing Tiers Summary Banner */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-6 bg-white border-2 border-[#D4AF37]/50 px-6 py-3.5 rounded-2xl mb-8 text-xs sm:text-sm shadow-lg">
          <div>
            <span className="text-slate-500">1 Unit — </span>
            <strong className="text-[#B71C1C] font-black">{formatNaira(price1)}</strong>{' '}
            <span className="line-through text-slate-400 text-xs">₦280k</span>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div>
            <span className="text-slate-500">2 Units — </span>
            <strong className="text-[#123B2A] font-bold">{formatNaira(config.PRICE_FOR_2)} EACH</strong>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div>
            <span className="text-slate-500">3+ Units — </span>
            <strong className="text-[#171717] font-black">{formatNaira(config.PRICE_FOR_3_PLUS)} EACH</strong>
          </div>
        </div>

        {/* Countdown display */}
        <div className="max-w-md mx-auto mb-8">
          <ChristmasCountdown variant="hero" />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOrderClick}
            className="btn-xmas-gold w-full sm:w-auto min-w-[300px] font-black text-base py-4 px-8 rounded-2xl shadow-2xl transition-all flex flex-col items-center justify-center cursor-pointer border border-[#D4AF37]"
          >
            <div className="flex items-center gap-2 text-[#171717]">
              <span>{hasPlacedOrder ? "ORDER ANOTHER CHRISTMAS UNIT" : CHRISTMAS_CAMPAIGN.CTA_GET_DEAL}</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </div>
            <div className="text-[11px] font-black text-slate-900/90 uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
              <Truck className="w-3.5 h-3.5" /> FREE DELIVERY NATIONWIDE • PAY ON DELIVERY
            </div>
          </button>

          {hasPlacedOrder && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-w-[240px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base py-4 px-8 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 border border-emerald-400"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
          <span>✓ 12 Months Official Warranty</span>
          <span>✓ Inspected Before Dispatch</span>
          <span>✓ Payment via Cash or Transfer on Arrival</span>
        </div>
      </div>
    </section>
  );
};
