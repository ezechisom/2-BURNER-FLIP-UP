import React from 'react';
import { Sparkles, ArrowRight, Truck, Gift } from 'lucide-react';
import { LandingPageConfig } from '../types';
import { formatNaira, CHRISTMAS_CAMPAIGN, isChristmasCampaignActive } from '../config';
import { ChristmasCountdown } from './ChristmasCountdown';

interface OfferUrgencySectionProps {
  config: LandingPageConfig;
  onClaimOffer: () => void;
}

export const OfferUrgencySection: React.FC<OfferUrgencySectionProps> = ({ config, onClaimOffer }) => {
  const isPromo = isChristmasCampaignActive();
  const price1 = isPromo ? CHRISTMAS_CAMPAIGN.PROMO_PRICE : CHRISTMAS_CAMPAIGN.STANDARD_PRICE;
  const price2 = isPromo ? CHRISTMAS_CAMPAIGN.PROMO_PRICE_FOR_2 : CHRISTMAS_CAMPAIGN.STANDARD_PRICE_FOR_2;
  const price3 = isPromo ? CHRISTMAS_CAMPAIGN.PROMO_PRICE_FOR_3_PLUS : CHRISTMAS_CAMPAIGN.STANDARD_PRICE_FOR_3_PLUS;

  return (
    <section id="urgency-section" className="py-14 sm:py-20 px-4 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 border-b-2 border-[#D4AF37]/30 relative">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#B71C1C] border border-[#D4AF37] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-4 shadow-sm">
          <Gift className="w-3.5 h-3.5 text-[#F4E07B]" />
          <span>CHRISTMAS MEGA SALES COUNTDOWN</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
          SECURE YOUR ₦20,000 SAVINGS BEFORE THE PROMO ENDS
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
          The campaign officially ends December 20, 2026. After this date, pricing automatically returns to standard ₦280,000.
        </p>

        {/* 3 Tier Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
          
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-black text-slate-500 block uppercase">1 Unit</span>
            <div className="text-2xl font-black text-[#B71C1C] mt-1">
              {formatNaira(price1)}
            </div>
            <span className="text-xs text-slate-500 block mt-1 line-through">Was ₦280,000</span>
            <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">Save ₦20,000 (Christmas Deal)</span>
          </div>

          <div className="bg-white border-2 border-[#123B2A] rounded-2xl p-5 relative shadow-sm">
            <div className="absolute -top-2.5 right-4 bg-[#B71C1C] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
              Extra Bulk Off
            </div>
            <span className="text-xs font-black text-[#123B2A] block uppercase">2 Units</span>
            <div className="text-2xl font-black text-[#123B2A] mt-1">
              {formatNaira(price2)} <span className="text-xs font-medium text-slate-500">EACH</span>
            </div>
            <span className="text-xs text-slate-600 block mt-1">{formatNaira(price2 * 2)} Total for 2</span>
          </div>

          <div className="bg-gradient-to-b from-[#123B2A] to-[#171717] text-white border-2 border-[#D4AF37] rounded-2xl p-5 relative shadow-md">
            <div className="absolute -top-2.5 right-4 bg-[#D4AF37] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow-xs">
              Best Value
            </div>
            <span className="text-xs font-black text-[#F4E07B] block uppercase">3+ Units</span>
            <div className="text-2xl font-black text-[#F4E07B] mt-1">
              {formatNaira(price3)} <span className="text-xs font-medium text-slate-300">EACH</span>
            </div>
            <span className="text-xs text-amber-200 block mt-1">Maximum wholesale discount</span>
          </div>

        </div>

        {/* Live Shared Christmas Countdown Timer */}
        <div className="max-w-xl mx-auto mb-8">
          <ChristmasCountdown variant="hero" />
        </div>

        {/* Action Button */}
        <button
          onClick={onClaimOffer}
          className="btn-xmas-gold w-full sm:w-auto font-black text-base sm:text-lg py-4 px-8 rounded-2xl shadow-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 border border-[#D4AF37]"
        >
          <span>🎁 GET CHRISTMAS DEAL — {formatNaira(price1)}</span>
          <ArrowRight className="w-5 h-5 stroke-[3] text-[#171717]" />
        </button>

        <p className="text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5 font-medium">
          <Truck className="w-4 h-4 text-emerald-600" />
          <span>FREE DELIVERY NATIONWIDE • INSPECT AND PAY ON ARRIVAL</span>
        </p>

      </div>
    </section>
  );
};
