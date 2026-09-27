import React, { useState } from 'react';
import { Flame, Sparkles, Truck, ArrowRight, Play, Pause, Zap, CheckCircle2 } from 'lucide-react';
import { formatNaira, ALTERNATIVE_PRODUCT_CONFIG } from '../config';
import { CookerModel } from '../types';

interface TopAlternativeProductScrollProps {
  onOpenDetails: () => void;
  onSelectAlternative: (model: CookerModel, qty: number) => void;
}

export const TopAlternativeProductScroll: React.FC<TopAlternativeProductScrollProps> = ({
  onOpenDetails,
  onSelectAlternative
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const tickerContent = (
    <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">
      {/* Product Highlight Item 1 */}
      <div
        className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={onOpenDetails}
        title="Click to view full 2-Burner photos & specifications"
      >
        <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3 fill-current" />
          COMPACT ALTERNATIVE AVAILABLE
        </span>
        <div className="flex items-center gap-2">
          <img
            src="/images/cooker_double_unit.jpg"
            alt="2-Burner Flip-Up Gas Stove"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded object-cover border border-amber-300/40 shrink-0"
          />
          <span className="text-white font-extrabold text-xs sm:text-sm tracking-tight whitespace-nowrap">
            2-Flip-Up Double Gas Burner (75 × 45 cm)
          </span>
        </div>
      </div>

      {/* Feature Pills */}
      <div
        className="hidden md:flex items-center gap-3 text-xs text-sky-200 whitespace-nowrap cursor-pointer hover:text-white transition-colors"
        onClick={onOpenDetails}
      >
        <span className="flex items-center gap-1 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          90° Hinged Flip-Up for 10-Second Clean
        </span>
        <span>•</span>
        <span className="flex items-center gap-1 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          Heavy Duty Cast-Iron Trivets
        </span>
        <span>•</span>
        <span className="flex items-center gap-1 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          Instant Auto-Ignition
        </span>
      </div>

      {/* Price & Action */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="text-right">
          <span className="text-[10px] text-amber-200 uppercase font-mono block leading-none">Only</span>
          <span className="text-amber-300 font-black text-xs sm:text-sm tracking-tight">
            {formatNaira(ALTERNATIVE_PRODUCT_CONFIG.NORMAL_PRICE)}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenDetails}
          className="btn-glow-amber bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black text-[11px] sm:text-xs px-3 py-1.5 rounded-md cursor-pointer transition-all shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current text-slate-950" />
          <span>View 2-Burner Details (₦170k)</span>
          <ArrowRight className="w-3 h-3 stroke-[2.5]" />
        </button>

        <span className="text-emerald-400 text-[10px] font-bold hidden sm:inline-flex items-center gap-1 shrink-0">
          <Truck className="w-3 h-3" /> Free Delivery Nationwide
        </span>
      </div>

      <span className="text-sky-500/60 font-mono text-xs select-none">✦</span>

      {/* Secondary message in the same cycle */}
      <div className="flex items-center gap-2 whitespace-nowrap text-xs text-sky-100">
        <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
        <span className="font-semibold">
          Don't need a 5-burner? The 2-burner flip-up fits any standard kitchen countertop!
        </span>
        <button
          type="button"
          onClick={onOpenDetails}
          className="text-amber-300 hover:text-white underline font-bold text-xs ml-1 cursor-pointer"
        >
          Click to view photos & specs
        </button>
      </div>

      <span className="text-sky-500/60 font-mono text-xs select-none">✦</span>
    </div>
  );

  return (
    <div
      className="relative z-30 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 text-white border-y border-amber-400/30 overflow-hidden shadow-inner py-2"
      aria-label="Alternative Product Scrolling Banner"
    >
      <div className="flex items-center">
        {/* Fixed Mini Label on Desktop */}
        <div className="hidden lg:flex items-center gap-2 pl-4 pr-3 py-0.5 bg-slate-950/90 border-r border-blue-800/80 z-20 shrink-0 text-xs font-bold text-amber-300 uppercase tracking-wider">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
          <span className="text-[11px]">ALTERNATIVE MODEL</span>
        </div>

        {/* Marquee Scrolling Viewport */}
        <div
          className="flex-1 overflow-hidden relative cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`animate-marquee-track flex items-center ${
              isPaused ? 'slideshow-progress-bar-paused' : ''
            }`}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {tickerContent}
            {tickerContent}
            {tickerContent}
            {tickerContent}
          </div>
        </div>

        {/* Play / Pause toggle control */}
        <div className="pr-3 pl-2 hidden sm:flex items-center z-20">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            title={isPaused ? "Resume scroll" : "Pause scroll"}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors text-[10px] flex items-center gap-1 cursor-pointer bg-slate-900/60 border border-slate-700/60"
          >
            {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
            <span className="text-[9px] font-mono">{isPaused ? "PLAY" : "PAUSE"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
