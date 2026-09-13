import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { formatNaira } from '../config';

interface StickyMobileCTAProps {
  priceFor3Plus: number;
  onOrderClick: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({
  priceFor3Plus,
  onOrderClick
}) => {
  return (
    <aside
      id="sticky-mobile-cta"
      aria-label="Quick order action"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-blue-200 px-4 py-3 sm:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-blue-700 uppercase font-bold tracking-wider flex items-center gap-1">
            <Flame className="w-3 h-3 text-blue-600 fill-current" />
            Promo Pricing
          </span>
          <div className="text-base font-black text-blue-700 leading-tight">
            FROM {formatNaira(priceFor3Plus)} <span className="text-[10px] font-normal text-slate-500">EACH</span>
          </div>
        </div>

        <button
          onClick={onOrderClick}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-sm py-2.5 px-5 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>ORDER NOW</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </aside>
  );
};
