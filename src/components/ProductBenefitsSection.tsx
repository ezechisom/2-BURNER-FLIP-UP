import React from 'react';
import { Flame, Clock, RefreshCw, Maximize2, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export const ProductBenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: "DUAL-FUEL PEACE OF MIND",
      copy: "Never get stranded mid-cooking. Use 4 gas burners during outages, or switch instantly to the 2000W electric zone when gas runs out.",
      icon: Zap,
      number: "01"
    },
    {
      title: "FLAME FAILURE DEVICE (FFD)",
      copy: "Automatic thermocouple safety protection on every gas burner. If wind or boiling soup blows out the flame, gas is cut off in seconds to eliminate gas leak explosion risks.",
      icon: ShieldCheck,
      number: "02"
    },
    {
      title: "DIGITAL TIMER & AUTO-CUTOFF",
      copy: "Program cooking duration from 1 to 99 minutes. Power cuts off automatically the second time elapses, so stews and rice never overboil or burn.",
      icon: Clock,
      number: "03"
    },
    {
      title: "EXECUTIVE 5-ZONE CAPACITY",
      copy: "Spacious 90cm surface comfortably fits 5 large pots simultaneously so whole family banquets are prepared in half the time.",
      icon: Maximize2,
      number: "04"
    },
    {
      title: "90° FLIP-UP HINGED BURNERS",
      copy: "Articulated hinges tilt burners upright effortlessly. Wipe away soup and oil spills in 10 seconds without removing burner parts.",
      icon: RefreshCw,
      number: "05"
    },
    {
      title: "2000W RADIANT CERAMIC ZONE",
      copy: "Instant high-temperature ceramic burner that works with any flat-bottom pot—stainless steel, enamel, cast iron, or ceramic.",
      icon: Flame,
      number: "06"
    }
  ];

  return (
    <section id="benefits-section" className="py-14 sm:py-20 px-4 bg-white text-slate-900 border-b border-blue-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
            Engineered For Excellence
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            WHY YOU'LL LOVE THIS 5-BURNER HYBRID COOKTOP
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Every feature is designed to give you uninterrupted cooking power, spacious freedom, and effortless 1-wipe cleanups.
          </p>
        </div>

        {/* 6 Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 tracking-wide">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.copy}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200 flex items-center text-[11px] text-blue-700 font-bold uppercase tracking-wider">
                  <span>Standard Feature</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
