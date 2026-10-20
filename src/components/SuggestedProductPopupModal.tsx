import React, { useState, useEffect } from 'react';
import {
  X,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Eye,
  Zap
} from 'lucide-react';
import { formatNaira, ALTERNATIVE_PRODUCT_CONFIG } from '../config';
import { CookerModel } from '../types';

interface SuggestedProductPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSeeDetails: () => void;
  onOrderNow: (model: CookerModel, qty: number) => void;
}

export const SuggestedProductPopupModal: React.FC<SuggestedProductPopupModalProps> = ({
  isOpen,
  onClose,
  onSeeDetails,
  onOrderNow
}) => {
  const [secondsLeft, setSecondsLeft] = useState(15);
  const product = ALTERNATIVE_PRODUCT_CONFIG;
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  // 15-second auto-close countdown when popup opens
  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(15);
      return;
    }

    setSecondsLeft(15);

    // Visual progress ticker every 1 second
    const interval = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    // Independent timer to trigger close safely without state update conflict
    const timeout = setTimeout(() => {
      onCloseRef.current();
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const progressPercentage = (secondsLeft / 15) * 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Alternative Product"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-amber-400 flex flex-col animate-in zoom-in-95 duration-200 max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP AUTO-CLOSE PROGRESS BAR */}
        <div className="w-full bg-slate-900 h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 p-4 sm:p-5 text-white flex items-start justify-between gap-3 shrink-0 border-b border-amber-400/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded tracking-wider mb-1">
                <Sparkles className="w-3 h-3" />
                <span>ALTERNATIVE PRODUCT • MOONLIGHT LUXURY TECH</span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-white tracking-tight uppercase leading-snug">
                2-FLIP-UP DOUBLE GAS BURNER WITH TIMER
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close suggestion"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1 text-slate-900">
          
          {/* Main Visual & Specs Showcase */}
          <div
            onClick={onSeeDetails}
            className="group cursor-pointer rounded-2xl border-2 border-slate-200 hover:border-amber-400 bg-slate-50 overflow-hidden transition-all shadow-sm hover:shadow-md"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              <img
                src="/images/cooker_active_blue_flames.jpg"
                alt="2-Flip-Up Double Gas Burner With Timer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 bg-slate-950/85 backdrop-blur-xs text-amber-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border border-amber-400/40 shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Compact Panel: 75 × 45 cm</span>
              </div>
              <div className="absolute bottom-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg shadow-xs flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Save ₦50,000 Today</span>
              </div>
            </div>

            <div className="p-3.5 space-y-2.5">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-amber-600 transition-colors">
                    2-Flip-Up Double Gas Burner With 0–180m Timer
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    From moonlightcrecent.shop • Tabletop & Flush Built-In
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 line-through block leading-none">
                    ₦220,000
                  </span>
                  <span className="text-base sm:text-lg font-black text-amber-600 leading-tight">
                    {formatNaira(product.NORMAL_PRICE)}
                  </span>
                </div>
              </div>

              {/* 4 Feature Bullet Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-800 text-[11px]">
                    90° Flip-Up 1-Wipe Cleaning
                  </span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-800 text-[11px]">
                    0–180m Auto-Off Safety Timer
                  </span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-slate-200">
                  <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="font-semibold text-slate-800 text-[11px]">
                    Pure Blue Flame • Zero Pot Soot
                  </span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-slate-200">
                  <Truck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span className="font-semibold text-slate-800 text-[11px]">
                    Free Delivery Nationwide • POD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={onSeeDetails}
              className="btn-glow-amber w-full py-3.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-tight flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-slate-950" />
              <span>CLICK TO SEE FULL DETAILS & PHOTOS (₦170,000)</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={() => onOrderNow('2-burner', 1)}
              className="w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-tight flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              <Flame className="w-4 h-4 text-amber-400 fill-current" />
              <span>+ ADD ALTERNATIVE PRODUCT TO FORM (₦170,000)</span>
            </button>
          </div>

          {/* Timer Notice Badge */}
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center text-[11px] text-amber-900 font-medium flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
            <span>
              This alternative product offer closes automatically in <strong>{secondsLeft}s</strong>, after which our Quick Order Form will pop up.
            </span>
          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-center shrink-0 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={onSeeDetails}
            className="text-[11px] font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
          >
            Inspect full specs & photos
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-[11px] text-slate-400 hover:text-slate-700 underline cursor-pointer"
          >
            Close & continue browsing ({secondsLeft}s)
          </button>
        </div>

      </div>
    </div>
  );
};
