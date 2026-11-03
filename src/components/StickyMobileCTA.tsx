import React from 'react';
import { ArrowRight, Truck, MessageCircle } from 'lucide-react';
import { formatNaira, CHRISTMAS_CAMPAIGN, isChristmasCampaignActive } from '../config';

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
  const isPromo = isChristmasCampaignActive();
  const displayPrice = isPromo ? CHRISTMAS_CAMPAIGN.PROMO_PRICE : 280000;

  return (
    <aside
      id="sticky-mobile-cta"
      aria-label="Quick order action"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#123B2A]/95 backdrop-blur-md border-t-2 border-[#D4AF37] px-3.5 py-2 sm:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.35)]"
      style={{ maxHeight: '14vh' }} // Enforces strict <15% mobile viewport height cap
    >
      <div className="flex items-center justify-between gap-2.5 max-w-md mx-auto">
        {hasPlacedOrder ? (
          <>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#F4E07B] uppercase font-black tracking-wider flex items-center gap-1">
                ✓ ORDER REGISTERED
              </span>
              <div className="text-xs font-bold text-white leading-tight">
                Preparing Dispatch
              </div>
            </div>

            <div className="flex items-center gap-2">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2 px-3 rounded-xl shadow-lg flex items-center gap-1.5 text-xs border border-emerald-400"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </a>
              )}
              <button
                onClick={onOrderClick}
                className="text-xs text-[#F4E07B] font-bold underline py-1 px-1.5 cursor-pointer"
              >
                +Order
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#F4E07B] uppercase font-black tracking-wider flex items-center gap-1">
                <span>🎄</span>
                <span>SAVE ₦20,000</span>
              </span>
              <div className="text-sm font-black text-white leading-tight">
                {formatNaira(displayPrice)} <span className="text-[10px] text-slate-300 line-through">₦280k</span>
              </div>
            </div>

            {/* Sticky Mobile Button requested by user: "🎄 ORDER NOW — ₦260,000" */}
            <button
              onClick={onOrderClick}
              className="btn-xmas-gold font-black py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-1.5 cursor-pointer shrink-0 leading-tight border border-[#D4AF37] text-xs"
            >
              <span>{isPromo ? CHRISTMAS_CAMPAIGN.STICKY_MOBILE_CTA : `ORDER NOW — ${formatNaira(displayPrice)}`}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3] text-[#171717]" />
            </button>
          </>
        )}
      </div>
    </aside>
  );
};
