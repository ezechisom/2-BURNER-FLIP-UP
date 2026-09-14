import React from 'react';
import { ArrowRight, Flame, Truck, MessageCircle } from 'lucide-react';
import { formatNaira } from '../config';

interface StickyMobileCTAProps {
  priceFor3Plus: number;
  onOrderClick: () => void;
  hasPlacedOrder?: boolean;
  whatsappUrl?: string;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({
  priceFor3Plus,
  onOrderClick,
  hasPlacedOrder = false,
  whatsappUrl
}) => {
  return (
    <aside
      id="sticky-mobile-cta"
      aria-label="Quick order action"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-blue-200 px-4 py-2.5 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.12)]"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {hasPlacedOrder ? (
          <>
            <div className="flex flex-col">
              <span className="text-[10px] text-emerald-700 uppercase font-black tracking-wider flex items-center gap-1">
                ✓ ORDER REGISTERED
              </span>
              <div className="text-xs font-bold text-slate-800 leading-tight">
                Instant Dispatch Confirmation
              </div>
            </div>

            <div className="flex items-center gap-2">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow-emerald bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black py-2 px-3 rounded-xl shadow-lg flex items-center gap-1.5 text-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </a>
              )}
              <button
                onClick={onOrderClick}
                className="text-xs text-blue-600 font-bold underline py-1 px-1.5 cursor-pointer"
              >
                +Order
              </button>
            </div>
          </>
        ) : (
          <>
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
              className="btn-glow bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black py-2 px-3.5 rounded-xl shadow-lg flex flex-col items-center justify-center cursor-pointer shrink-0 leading-tight"
            >
              <div className="flex items-center gap-1 text-xs">
                <span>ORDER NOW</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="text-[9px] font-bold text-amber-200 uppercase tracking-tight flex items-center gap-0.5 mt-0.5">
                <Truck className="w-2.5 h-2.5" /> Free Delivery
              </span>
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

