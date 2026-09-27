import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, X, ShieldCheck, Flame, Zap } from 'lucide-react';
import { CookerModel } from '../types';

interface LiveOrderEvent {
  customer: string;
  location: string;
  item: string;
  model: CookerModel;
  timeAgo: string;
  avatarText: string;
}

const RECENT_ORDERS: LiveOrderEvent[] = [
  {
    customer: "Chief Mrs. Folashade A.",
    location: "Lekki Phase 1, Lagos",
    item: "5-Burner Built-In Gas + Electric Cooktop",
    model: "5-burner",
    timeAgo: "3 mins ago",
    avatarText: "FA"
  },
  {
    customer: "Engr. Nnamdi K.",
    location: "Maitama, Abuja",
    item: "2-Flip-Up Double Gas Burner (75×45cm)",
    model: "2-burner",
    timeAgo: "6 mins ago",
    avatarText: "NK"
  },
  {
    customer: "Dr. Babatunde O.",
    location: "GRA Phase 2, Port Harcourt",
    item: "Executive Combo Pack (5-Burner + 2-Burner)",
    model: "combo",
    timeAgo: "11 mins ago",
    avatarText: "BO"
  },
  {
    customer: "Mrs. Halima M.",
    location: "Gwarinpa, Abuja",
    item: "5-Burner Built-In Gas + Electric Cooktop",
    model: "5-burner",
    timeAgo: "14 mins ago",
    avatarText: "HM"
  },
  {
    customer: "Pastor Emmanuel E.",
    location: "Ikeja GRA, Lagos",
    item: "2 Units of 5-Burner Hybrid Cooktop",
    model: "5-burner",
    timeAgo: "19 mins ago",
    avatarText: "EE"
  },
  {
    customer: "Barrister Funmi D.",
    location: "Bodija, Ibadan",
    item: "2-Flip-Up Double Gas Burner",
    model: "2-burner",
    timeAgo: "23 mins ago",
    avatarText: "FD"
  }
];

interface LiveSalesNotificationsProps {
  onNotificationClick: (model: CookerModel) => void;
}

export const LiveSalesNotifications: React.FC<LiveSalesNotificationsProps> = ({
  onNotificationClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show initial notification after 6 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    // Loop through notifications every 22 seconds
    const loopInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_ORDERS.length);
        setIsVisible(true);
      }, 1200);
    }, 22000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopInterval);
    };
  }, [isDismissed]);

  // Auto-hide toast after 7 seconds of showing
  useEffect(() => {
    if (isVisible) {
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 7500);
      return () => clearTimeout(hideTimer);
    }
  }, [isVisible]);

  if (isDismissed || !isVisible) return null;

  const currentOrder = RECENT_ORDERS[currentIndex];

  return (
    <aside
      aria-label="Recent buyer activity"
      className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-40 max-w-xs sm:max-w-sm animate-in slide-in-from-bottom-5 fade-in duration-300"
    >
      <div
        onClick={() => onNotificationClick(currentOrder.model)}
        className="bg-white/95 backdrop-blur-md border border-blue-200/90 rounded-2xl p-3 sm:p-3.5 shadow-xl hover:shadow-2xl transition-all cursor-pointer group flex items-start gap-3 relative"
      >
        {/* Dismiss button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[10px] cursor-pointer shadow-xs transition-colors"
          title="Dismiss notification"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Avatar / Badge */}
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
          {currentOrder.avatarText}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Verified Order Placed</span>
            <span className="text-slate-400 font-normal">• {currentOrder.timeAgo}</span>
          </div>

          <p className="text-xs font-bold text-slate-900 truncate mt-0.5">
            {currentOrder.customer}
          </p>

          <p className="text-[11px] text-blue-700 font-semibold truncate">
            {currentOrder.item}
          </p>

          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
            <span>📍 {currentOrder.location}</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">Pay on Delivery</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
