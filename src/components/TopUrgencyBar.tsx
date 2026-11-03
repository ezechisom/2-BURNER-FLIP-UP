import React from 'react';
import { Sparkles, Gift } from 'lucide-react';
import { ChristmasCountdown } from './ChristmasCountdown';
import { CHRISTMAS_CAMPAIGN, isChristmasCampaignActive } from '../config';

interface TopUrgencyBarProps {
  countdownEndDate?: string;
  countdownHours?: number;
}

export const TopUrgencyBar: React.FC<TopUrgencyBarProps> = () => {
  const isPromo = isChristmasCampaignActive();

  return (
    <aside
      aria-label="Christmas Mega Sales announcement"
      id="top-urgency-bar"
      className="bg-gradient-to-r from-[#B71C1C] via-[#8B0000] to-[#123B2A] text-white border-b-2 border-[#D4AF37]/70 relative overflow-hidden shadow-md"
    >
      {/* Delicate fairy lights line across top */}
      <div className="absolute top-0 left-0 right-0 h-1 flex items-center justify-around pointer-events-none z-10 overflow-hidden opacity-90">
        {[...Array(24)].map((_, i) => {
          const type = i % 3 === 0 ? 'fairy-light-gold' : i % 3 === 1 ? 'fairy-light-red' : 'fairy-light-green';
          const bg = i % 3 === 0 ? 'bg-[#F4E07B]' : i % 3 === 1 ? 'bg-[#FF5252]' : 'bg-[#4ADE80]';
          return (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${bg} ${type} shrink-0`}
            />
          );
        })}
      </div>

      <div className="max-w-6xl mx-auto px-3 py-2 sm:py-2.5 flex flex-col md:flex-row items-center justify-between text-center gap-2">
        {/* Promotional announcement text requested by user */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-extrabold tracking-wide text-white">
          <span className="text-sm sm:text-base animate-pulse">🎄</span>
          <span className="text-white drop-shadow-sm">
            CHRISTMAS MEGA SALES | WAS <span className="line-through text-amber-200">₦280,000</span> — NOW <span className="text-[#F4E07B] font-black underline decoration-[#D4AF37]">₦260,000</span> | SAVE ₦20,000 | ENDS DEC 20
          </span>
          <span className="text-sm sm:text-base">🎁</span>
        </div>

        {/* Live Countdown Timer in the Bar */}
        {isPromo && (
          <div className="shrink-0 flex items-center justify-center">
            <ChristmasCountdown variant="bar" />
          </div>
        )}
      </div>
    </aside>
  );
};
