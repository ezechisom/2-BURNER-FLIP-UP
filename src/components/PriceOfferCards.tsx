import React from 'react';
import { Tag, Sparkles, CheckCircle, ArrowRight, Truck, Gift } from 'lucide-react';
import { LandingPageConfig } from '../types';
import { formatNaira, CHRISTMAS_CAMPAIGN, isChristmasCampaignActive } from '../config';

interface PriceOfferCardsProps {
  config: LandingPageConfig;
  onSelectTier: (quantity: number) => void;
}

export const PriceOfferCards: React.FC<PriceOfferCardsProps> = ({ config, onSelectTier }) => {
  const isPromo = isChristmasCampaignActive();
  const price1 = isPromo ? CHRISTMAS_CAMPAIGN.PROMO_PRICE : CHRISTMAS_CAMPAIGN.STANDARD_PRICE;
  const originalPrice1 = CHRISTMAS_CAMPAIGN.ORIGINAL_PRICE; // 280,000
  const regularBase = 350000;

  const price2Each = isPromo ? CHRISTMAS_CAMPAIGN.PROMO_PRICE_FOR_2 : CHRISTMAS_CAMPAIGN.STANDARD_PRICE_FOR_2;
  const total2 = price2Each * 2;
  const originalTotal2 = 280000 * 2;
  const save2 = originalTotal2 - total2;

  const price3Each = isPromo ? CHRISTMAS_CAMPAIGN.PROMO_PRICE_FOR_3_PLUS : CHRISTMAS_CAMPAIGN.STANDARD_PRICE_FOR_3_PLUS;
  const total3 = price3Each * 3;
  const originalTotal3 = 280000 * 3;
  const save3 = originalTotal3 - total3;

  return (
    <section id="pricing-section" className="py-14 sm:py-20 px-4 bg-slate-50 text-slate-900 border-b-2 border-[#D4AF37]/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#B71C1C] border border-[#D4AF37] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-3 shadow-sm">
            <Gift className="w-3.5 h-3.5 text-[#F4E07B]" />
            <span>🎄 CHRISTMAS MEGA SALES PACKAGES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            CHOOSE YOUR CHRISTMAS MEGA DEAL
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Take advantage of exclusive holiday pricing before December 20. Free nationwide delivery and inspection on arrival across all Nigerian states.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* 1 UNIT CARD (SINGLE CHRISTMAS DEAL) */}
          <div className="bg-white border-2 border-slate-200 hover:border-[#D4AF37] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl relative">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-[#123B2A] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
                  Christmas Single Deal
                </span>
                <span className="text-xs text-slate-400 font-bold line-through">
                  Reg. {formatNaira(originalPrice1)}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-1">1 UNIT</h3>
              <p className="text-xs text-slate-500 mb-6">5-in-1 Built-In Gas + Electric Cooktop (90 × 51 cm)</p>

              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#B71C1C]">
                    {formatNaira(price1)}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-400 line-through font-bold">
                    {formatNaira(originalPrice1)}
                  </span>
                </div>
                <div className="mt-1.5 inline-block bg-[#123B2A] text-[#F4E07B] text-[11px] font-black uppercase px-2 py-0.5 rounded">
                  SAVE ₦20,000 THIS CHRISTMAS
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>4 Gas Burners + 1 Central 2000W Electric</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Digital LED timer with auto power cutoff</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>90° Flip-up burners for 10-second clean</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Free nationwide delivery + 12-month warranty</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectTier(1)}
              className="btn-xmas-gold w-full font-black py-3.5 px-4 rounded-xl transition-all flex flex-col items-center justify-center cursor-pointer shadow-md border border-[#D4AF37]"
            >
              <div className="flex items-center gap-2 text-sm font-black text-[#171717]">
                <span>ORDER 1 UNIT — {formatNaira(price1)}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="text-[10px] text-slate-900/90 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                <Truck className="w-3 h-3" /> PAY ON ARRIVAL • FREE DELIVERY
              </div>
            </button>
          </div>

          {/* 2 UNITS CARD (DUAL PACK - EXTRA VALUE) */}
          <div className="bg-white border-2 border-[#123B2A] rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl relative">
            <div className="absolute -top-3.5 right-6 bg-[#B71C1C] border border-[#D4AF37] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
              SAVE {formatNaira(save2 + 40000)} TOTAL
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-[#123B2A] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
                  Christmas Dual Pack
                </span>
                <span className="text-xs text-emerald-700 font-bold">₦5,000 extra off / unit</span>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-1">2 UNITS</h3>
              <p className="text-xs text-slate-500 mb-6">2 Complete 5-in-1 Hybrid Cooktops (Great for Gifting)</p>

              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="text-3xl sm:text-4xl font-black text-[#123B2A]">
                  {formatNaira(price2Each)} <span className="text-xs sm:text-sm font-normal text-slate-500">EACH</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-black text-slate-800">TOTAL: {formatNaira(total2)}</span>
                  <span className="text-xs text-slate-400 line-through">{formatNaira(originalTotal2)}</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>2x Complete 5-in-1 Hybrid Cooktops</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Digital timer & auto-off on both cooktops</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>90° Flip-up burners on both units</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 font-bold shrink-0" />
                  <span>Additional bulk discount applied automatically</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectTier(2)}
              className="btn-xmas-gold w-full font-black py-3.5 px-4 rounded-xl transition-all shadow-md flex flex-col items-center justify-center cursor-pointer border border-[#D4AF37]"
            >
              <div className="flex items-center gap-2 text-sm font-black text-[#171717]">
                <span>ORDER 2 UNITS — {formatNaira(total2)}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="text-[10px] text-slate-900/90 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                <Truck className="w-3 h-3" /> FREE NATIONWIDE DELIVERY
              </div>
            </button>
          </div>

          {/* 3+ UNITS CARD (WHOLESALE / ESTATE PACK - BEST VALUE) */}
          <div className="bg-gradient-to-b from-[#123B2A] via-[#171717] to-[#0A2218] text-white border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#171717] text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              BEST CHRISTMAS VALUE
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-[#F4E07B] bg-[#171717] border border-[#D4AF37]/50 px-3 py-1 rounded-md">
                  Wholesale Pack
                </span>
                <span className="text-xs text-[#F4E07B] font-bold">₦10,000 off / unit</span>
              </div>

              <h3 className="text-xl font-black text-white mb-1">3 OR MORE UNITS</h3>
              <p className="text-xs text-slate-300 mb-6">Ideal for Multiple Residences, Family Gifts, or Builders</p>

              <div className="mb-6 pb-6 border-b border-[#D4AF37]/30">
                <div className="text-3xl sm:text-4xl font-black text-[#F4E07B]">
                  {formatNaira(price3Each)} <span className="text-xs sm:text-sm font-normal text-slate-300">EACH</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-black text-slate-200">TOTAL FOR 3: {formatNaira(total3)}</span>
                  <span className="text-xs text-slate-400 line-through">{formatNaira(originalTotal3)}</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-200 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#F4E07B] shrink-0" />
                  <span>3+ Complete 5-in-1 Hybrid Cooktops</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#F4E07B] shrink-0" />
                  <span>Maximum wholesale Christmas pricing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#F4E07B] shrink-0" />
                  <span>Direct priority dispatch across Nigeria</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#F4E07B] shrink-0" />
                  <span>12 Months warranty on every unit</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectTier(3)}
              className="btn-xmas-gold w-full font-black py-4 px-4 rounded-xl transition-all shadow-xl flex flex-col items-center justify-center cursor-pointer border border-[#D4AF37]"
            >
              <div className="flex items-center gap-2 text-sm font-black text-[#171717]">
                <span>ORDER 3+ UNITS ({formatNaira(price3Each)} EA)</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="text-[10px] text-slate-900 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                <Truck className="w-3 h-3" /> PRIORITY NATIONWIDE DISPATCH
              </div>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
