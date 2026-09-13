import React from 'react';
import { useCountdown } from '../hooks/useCountdown';

interface TopUrgencyBarProps {
  countdownEndDate?: string;
  countdownHours?: number;
}

export const TopUrgencyBar: React.FC<TopUrgencyBarProps> = ({
  countdownEndDate,
  countdownHours = 24
}) => {
  const { days, hours, minutes, seconds, isEnded } = useCountdown(countdownEndDate, countdownHours);

  return (
    <aside aria-label="Limited-time promotion" id="top-urgency-bar" className="sticky top-0 z-50 bg-blue-900 text-white border-b border-blue-700/60 shadow-md">
      <div className="max-w-6xl mx-auto px-3 py-2 flex flex-col sm:flex-row items-center justify-between text-center gap-1.5 sm:gap-4">
        {/* Promotional announcement text */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wide text-blue-100">
          <span className="text-base animate-pulse">🔥</span>
          <span className="text-white font-extrabold">LIMITED-TIME OFFER — SAVE MORE WHEN YOU BUY MORE</span>
        </div>

        {/* Countdown display */}
        <div className="flex items-center gap-1 text-xs sm:text-sm font-mono tracking-wider font-semibold">
          {isEnded ? (
            <span className="px-2.5 py-0.5 rounded bg-red-600/90 text-white font-bold tracking-normal uppercase text-xs">
              OFFER HAS ENDED
            </span>
          ) : (
            <div className="flex items-center gap-1 bg-blue-950/80 border border-blue-600/60 px-2.5 py-1 rounded">
              <span className="text-blue-200 text-[10px] sm:text-xs uppercase font-sans mr-1">Ends in:</span>
              <span className="text-white font-bold">{days}</span>
              <span className="text-blue-300 text-[10px]">d :</span>
              <span className="text-white font-bold">{hours}</span>
              <span className="text-blue-300 text-[10px]">h :</span>
              <span className="text-white font-bold">{minutes}</span>
              <span className="text-blue-300 text-[10px]">m :</span>
              <span className="text-white font-bold">{seconds}</span>
              <span className="text-blue-300 text-[10px]">s</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
