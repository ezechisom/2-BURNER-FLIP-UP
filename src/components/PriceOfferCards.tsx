import React from 'react';
import { Tag, Sparkles, CheckCircle, ArrowRight, Truck } from 'lucide-react';
import { LandingPageConfig } from '../types';
import { formatNaira } from '../config';

interface PriceOfferCardsProps {
  config: LandingPageConfig;
  onSelectTier: (quantity: number) => void;
}

export const PriceOfferCards: React.FC<PriceOfferCardsProps> = ({ config, onSelectTier }) => {
  const regular1 = config.NORMAL_PRICE;
  const regular2 = regular1 * 2;
  const offer2 = config.PRICE_FOR_2 * 2;
  const save2 = regular2 - offer2;

  const regular3 = regular1 * 3;
  const offer3 = config.PRICE_FOR_3_PLUS * 3;
  const save3 = regular3 - offer3;

  return (
    <section id="pricing-section" className="py-12 sm:py-16 px-4 bg-slate-50 text-slate-900 border-b border-blue-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Direct Promotional Tiers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            GET MORE VALUE WHEN YOU BUY MORE
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Choose your package below. The more units you order, the lower the price per cooker. Perfect for multi-home setups or sharing with family.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* 1 UNIT CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                  Starter Pack
                </span>
                <span className="text-xs text-slate-400 font-medium">Standard Rate</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">1 UNIT</h3>
              <p className="text-xs text-slate-500 mb-6">Complete 2-Flip-Up Double Burner</p>

              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="text-3xl font-extrabold text-slate-900">
                  {formatNaira(config.NORMAL_PRICE)}
                </div>
                <span className="text-xs text-slate-500">Single unit price</span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>1x Double flip-up burner cooker</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Integrated mechanical timer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Full secure transit packing</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectTier(1)}
              className="btn-glow w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl transition-all flex flex-col items-center justify-center cursor-pointer shadow-md"
            >
              <div className="flex items-center gap-2 text-sm font-black">
                <span>ORDER NOW (1 UNIT)</span>
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="text-[10px] text-blue-100 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                <Truck className="w-3 h-3" /> FREE DELIVERY NATIONWIDE
              </div>
            </button>
          </div>

          {/* 2 UNITS CARD */}
          <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-400 transition-all shadow-md relative">
            <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
              SAVE {formatNaira(save2)}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded">
                  Dual Pack
                </span>
                <span className="text-xs text-emerald-600 font-semibold">₦5,000 off per unit</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">2 UNITS</h3>
              <p className="text-xs text-slate-500 mb-6">2 Complete Double Cookers</p>

              <div className="mb-6 pb-6 border-b border-slate-100">
                <div className="text-3xl font-extrabold text-blue-700">
                  {formatNaira(config.PRICE_FOR_2)} <span className="text-sm font-medium text-slate-500">EACH</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">TOTAL: {formatNaira(offer2)}</span>
                  <span className="text-xs text-slate-400 line-through">{formatNaira(regular2)}</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>2x Double flip-up burner cookers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Built-in timer on both units</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 font-semibold shrink-0" />
                  <span>Instant {formatNaira(save2)} bundle savings</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectTier(2)}
              className="btn-glow w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black py-3 px-4 rounded-xl transition-all shadow-md flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="flex items-center gap-2 text-sm font-black">
                <span>ORDER NOW (2 UNITS)</span>
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="text-[10px] text-blue-100 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                <Truck className="w-3 h-3" /> FREE DELIVERY NATIONWIDE
              </div>
            </button>
          </div>

          {/* 3+ UNITS CARD (BEST VALUE) */}
          <div className="bg-gradient-to-b from-blue-900 to-blue-950 text-white border-2 border-blue-400 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              BEST VALUE
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 mt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-200 bg-blue-800/80 border border-blue-400/40 px-2.5 py-1 rounded">
                  Wholesale / Family
                </span>
                <span className="text-xs text-emerald-300 font-bold">SAVE {formatNaira(save3)}+</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">3+ UNITS</h3>
              <p className="text-xs text-blue-200 mb-6">3 or more Complete Cookers</p>

              <div className="mb-6 pb-6 border-b border-blue-800/70">
                <div className="text-3xl font-extrabold text-amber-300">
                  {formatNaira(config.PRICE_FOR_3_PLUS)} <span className="text-sm font-medium text-blue-200">EACH</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-white">TOTAL: {formatNaira(offer3)} (for 3 units)</span>
                  <span className="text-xs text-blue-300/70 line-through">{formatNaira(regular3)}</span>
                </div>
                <span className="text-[11px] text-blue-200 block mt-0.5">Calculated dynamically for 3, 4, 5+ units</span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-blue-100 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>3+ Double flip-up burner units</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Lowest guaranteed unit price</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-300 font-semibold shrink-0" />
                  <span>Save ₦10,000 per unit off regular</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectTier(3)}
              className="btn-glow-amber w-full bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black py-3 px-4 rounded-xl transition-all shadow-xl flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="flex items-center gap-2 text-sm sm:text-base font-black">
                <span>ORDER NOW (3+ UNITS)</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="text-[10px] font-black text-slate-950 uppercase tracking-wider flex items-center gap-1 mt-0.5">
                <Truck className="w-3 h-3" /> FREE DELIVERY NATIONWIDE
              </div>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
