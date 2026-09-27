import React from 'react';
import { Layers, Timer, RefreshCw, Sparkles, Maximize2, Zap, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { LandingPageConfig } from '../types';

interface ProductValueSectionProps {
  config: LandingPageConfig;
  onOrderClick: (quantity?: number) => void;
}

export const ProductValueSection: React.FC<ProductValueSectionProps> = ({ config, onOrderClick }) => {
  const detailImage = config.PRODUCT_IMAGES[1]?.url || "/images/alternative_5burner/cooktop_showroom_active.jpg";

  const valuePoints = [
    {
      title: "Dual-Fuel Hybrid Versatility",
      desc: "4 high-heat gas burners plus an instant 2000W radiant electric plate ensure you never get stranded when gas finishes or electricity goes off.",
      icon: Zap
    },
    {
      title: "Flame Failure Device (FFD) Protection",
      desc: "Sensitive thermocouple on every gas burner shuts off the gas supply within seconds if the flame is blown out by wind or overflowing soup.",
      icon: ShieldCheck
    },
    {
      title: "Digital Timer with Automatic Cutoff",
      desc: "Set exact 1–99 min cooking countdowns. System disconnects power automatically at zero to prevent burnt food, boiling dry, and fire hazards.",
      icon: Timer
    },
    {
      title: "Executive 90 × 51 cm Footprint",
      desc: "Spacious built-in layout comfortably fits 5 large pots and pans at once without bumping or crowding.",
      icon: Maximize2
    },
    {
      title: "90° Flip-Up Burners for 10-Second Clean",
      desc: "Articulated hinges let you lift burners upright to wipe spills in 10 seconds without greasy buildup or dismantling.",
      icon: RefreshCw
    }
  ];

  return (
    <section id="product-value-section" className="py-14 sm:py-20 px-4 bg-slate-50 text-slate-900 border-b border-blue-100">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Product Image Beside Copy */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-lg">
              <div className="rounded-2xl overflow-hidden border border-blue-200 bg-white p-2 shadow-xl">
                <img
                  src={detailImage}
                  alt="5-Burner Hybrid Cooktop Detail"
                  className="w-full h-auto object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-3 text-center text-xs text-slate-500 font-medium">
                {config.PRODUCT_IMAGES[1]?.title || "5-Burner Built-In Gas + Electric Cooktop"}
              </div>
            </div>
          </div>

          {/* Value Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="text-blue-600 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
                All-In-One Flagship Cooktop
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                ONE COMPLETE EXECUTIVE COOKING SETUP
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Rather than settling for standard gas-only stoves or cramped counters, bring intelligent dual-fuel capability, 5-zone capacity, and easy-clean ergonomics into your home.
              </p>
            </div>

            {/* 5 Value Points */}
            <div className="space-y-4 pt-1">
              {valuePoints.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={() => onOrderClick(1)}
                className="btn-glow w-full sm:w-auto inline-flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-sm sm:text-base py-3.5 px-8 rounded-xl shadow-xl transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span>ORDER NOW TODAY</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="text-[11px] font-bold text-blue-100 uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                  <Truck className="w-3.5 h-3.5" /> FREE DELIVERY NATIONWIDE
                </div>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
