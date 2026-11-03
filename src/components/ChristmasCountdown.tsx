import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, AlertCircle } from 'lucide-react';
import { CHRISTMAS_CAMPAIGN } from '../config';

interface ChristmasCountdownProps {
  className?: string;
  variant?: 'hero' | 'bar' | 'card';
  onExpire?: () => void;
}

export const ChristmasCountdown: React.FC<ChristmasCountdownProps> = ({
  className = '',
  variant = 'hero',
  onExpire
}) => {
  // Campaign ends: December 20, 2026 at 11:59:59 PM West Africa Time (Africa/Lagos, UTC+1)
  const targetTime = new Date(CHRISTMAS_CAMPAIGN.DEADLINE_ISO).getTime();

  const [timeLeft, setTimeLeft] = useState<number>(() => Math.max(0, targetTime - Date.now()));

  useEffect(() => {
    const updateCountdown = () => {
      const remaining = Math.max(0, targetTime - Date.now());
      setTimeLeft(remaining);
      if (remaining <= 0 && onExpire) {
        onExpire();
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetTime, onExpire]);

  const isEnded = timeLeft <= 0;

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (isEnded) {
    return (
      <div
        className={`bg-[#123B2A] border-2 border-[#D4AF37] text-white rounded-xl p-3 sm:p-4 text-center shadow-lg ${className}`}
      >
        <p className="text-sm sm:text-base font-extrabold text-[#F4E07B] flex items-center justify-center gap-2">
          <AlertCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <span>{CHRISTMAS_CAMPAIGN.EXPIRED_MESSAGE}</span>
        </p>
      </div>
    );
  }

  // Announcement Bar Variant
  if (variant === 'bar') {
    return (
      <div className={`flex items-center gap-1.5 sm:gap-2 text-xs font-mono font-bold ${className}`}>
        <span className="text-[#F4E07B] uppercase font-sans text-[11px] font-extrabold flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Ends in:</span>
        </span>
        <div className="flex items-center gap-1 bg-[#171717]/80 border border-[#D4AF37]/60 px-2 py-0.5 rounded text-[#FFFFFF]">
          <span className="text-[#F4E07B]">{pad(days)}</span>
          <span className="text-slate-400 text-[10px]">d :</span>
          <span className="text-[#FFFFFF]">{pad(hours)}</span>
          <span className="text-slate-400 text-[10px]">h :</span>
          <span className="text-[#FFFFFF]">{pad(minutes)}</span>
          <span className="text-slate-400 text-[10px]">m :</span>
          <span className="text-[#F4E07B]">{pad(seconds)}</span>
          <span className="text-slate-400 text-[10px]">s</span>
        </div>
      </div>
    );
  }

  // Hero / Card Variant (Prominent & Luxurious)
  return (
    <div
      className={`bg-gradient-to-br from-[#123B2A] via-[#0A2218] to-[#171717] border-2 border-[#D4AF37]/80 rounded-2xl p-4 sm:p-5 shadow-2xl text-white relative overflow-hidden ${className}`}
    >
      {/* Decorative festive corner ribbon / badge */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#D4AF37]/30 mb-3">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#F4E07B] tracking-wide uppercase">
          <Sparkles className="w-4 h-4 text-[#D4AF37] fill-current animate-pulse" />
          <span>🎄 CHRISTMAS MEGA SALES ENDS IN:</span>
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-white/80 bg-[#B71C1C] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full">
          Dec 20 WAT
        </span>
      </div>

      {/* Countdown Digits Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
        {/* DAYS */}
        <div className="bg-[#171717]/90 border border-[#D4AF37]/50 rounded-xl p-2 sm:p-2.5 shadow-inner flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-black text-[#F4E07B] font-mono tracking-tight tabular-nums">
            {pad(days)}
          </span>
          <span className="text-[10px] sm:text-xs uppercase font-extrabold text-slate-300 tracking-wider mt-0.5">
            Days
          </span>
        </div>

        {/* HOURS */}
        <div className="bg-[#171717]/90 border border-[#D4AF37]/50 rounded-xl p-2 sm:p-2.5 shadow-inner flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight tabular-nums">
            {pad(hours)}
          </span>
          <span className="text-[10px] sm:text-xs uppercase font-extrabold text-slate-300 tracking-wider mt-0.5">
            Hours
          </span>
        </div>

        {/* MINUTES */}
        <div className="bg-[#171717]/90 border border-[#D4AF37]/50 rounded-xl p-2 sm:p-2.5 shadow-inner flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight tabular-nums">
            {pad(minutes)}
          </span>
          <span className="text-[10px] sm:text-xs uppercase font-extrabold text-slate-300 tracking-wider mt-0.5">
            Mins
          </span>
        </div>

        {/* SECONDS */}
        <div className="bg-[#B71C1C]/40 border border-[#B71C1C] rounded-xl p-2 sm:p-2.5 shadow-inner flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-black text-[#F4E07B] font-mono tracking-tight tabular-nums animate-pulse">
            {pad(seconds)}
          </span>
          <span className="text-[10px] sm:text-xs uppercase font-extrabold text-amber-200 tracking-wider mt-0.5">
            Secs
          </span>
        </div>
      </div>
    </div>
  );
};
