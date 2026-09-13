import React from 'react';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import { LandingPageConfig } from '../types';
import { formatNaira } from '../config';
import { useCountdown } from '../hooks/useCountdown';

interface OfferUrgencySectionProps {
  config: LandingPageConfig;
  onClaimOffer: () => void;
}

export const OfferUrgencySection: React.FC<OfferUrgencySectionProps> = ({ config, onClaimOffer }) => {
  const { days, hours, minutes, seconds, isEnded } = useCountdown(
    config.COUNTDOWN_END_DATE,
    config.COUNTDOWN_HOURS
  );

  return (
    <section id="urgency-section" className="py-14 sm:py-20 px-4 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 text-slate-900 border-b border-blue-100 relative">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Promotional Tier Overview</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-6">
          THE MORE YOU ORDER, THE MORE YOU SAVE
        </h2>

        {/* 3 Tier Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-500 block uppercase">1 Unit</span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {formatNaira(config.NORMAL_PRICE)}
            </div>
            <span className="text-xs text-slate-500 block mt-1">Regular single rate</span>
          </div>

          <div className="bg-white border-2 border-blue-400 rounded-xl p-5 relative shadow-sm">
            <div className="absolute -top-2.5 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
              Save ₦10,000
            </div>
            <span className="text-xs font-bold text-blue-700 block uppercase">2 Units</span>
            <div className="text-2xl font-black text-blue-700 mt-1">
              {formatNaira(config.PRICE_FOR_2)} <span className="text-xs font-medium text-slate-500">EACH</span>
            </div>
            <span className="text-xs text-slate-600 block mt-1">₦330,000 Total for 2</span>
          </div>

          <div className="bg-blue-50 border-2 border-blue-600 rounded-xl p-5 relative shadow-md">
            <div className="absolute -top-2.5 right-4 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs">
              Best Value
            </div>
            <span className="text-xs font-bold text-blue-800 block uppercase">3+ Units</span>
            <div className="text-2xl font-black text-blue-800 mt-1">
              {formatNaira(config.PRICE_FOR_3_PLUS)} <span className="text-xs font-medium text-slate-600">EACH</span>
            </div>
            <span className="text-xs text-blue-900 block mt-1">Save ₦30,000+ total</span>
          </div>

        </div>

        {/* Real Countdown Timer Display */}
        <div className="bg-white border border-blue-200 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-8 shadow-lg">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-slate-600 mb-4 font-semibold">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Promotional Countdown</span>
          </div>

          {isEnded ? (
            <div className="text-lg font-bold text-rose-600 tracking-wider">
              OFFER HAS ENDED
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="text-2xl sm:text-4xl font-mono font-black text-slate-900 block">{days}</span>
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-medium">Days</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="text-2xl sm:text-4xl font-mono font-black text-slate-900 block">{hours}</span>
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-medium">Hours</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="text-2xl sm:text-4xl font-mono font-black text-slate-900 block">{minutes}</span>
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-medium">Minutes</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <span className="text-2xl sm:text-4xl font-mono font-black text-blue-600 block">{seconds}</span>
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-medium">Seconds</span>
              </div>
            </div>
          )}
        </div>

        {/* Headline Underneath */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
          DON'T WAIT UNTIL THE OFFER ENDS
        </h3>

        {/* CTA */}
        <button
          onClick={onClaimOffer}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-base py-4 px-10 rounded-xl shadow-xl hover:shadow-blue-500/25 transition-all cursor-pointer"
        >
          <span>CLAIM MY OFFER</span>
          <ArrowRight className="w-5 h-5" />
        </button>

      </div>
    </section>
  );
};
