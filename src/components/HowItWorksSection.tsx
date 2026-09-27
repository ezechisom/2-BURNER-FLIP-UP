import React from 'react';
import { Zap, Timer, RefreshCw } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "CHOOSE YOUR FUEL ZONE",
      desc: "Turn on the 4 high-flame gas burners for traditional wok and pot cooking, or touch to activate the central 2000W instant radiant electric plate.",
      icon: Zap
    },
    {
      step: "02",
      title: "SET DIGITAL TIMER & AUTO-OFF",
      desc: "Set your desired cooking duration on the illuminated digital LED display. Walk away with peace of mind—the cooker automatically powers down when time elapses.",
      icon: Timer
    },
    {
      step: "03",
      title: "10-SECOND FLIP-UP CLEANUP",
      desc: "Simply lift the articulated 90° hinged burners upright to wipe down the flat tempered glass in seconds without taking any pieces apart.",
      icon: RefreshCw
    }
  ];

  return (
    <section id="how-it-works-section" className="py-14 sm:py-20 px-4 bg-white text-slate-900 border-b border-blue-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
            Effortless Operation
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            HOW THE 5-BURNER HYBRID COOKTOP WORKS
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Simple 3-step operation engineered for seamless cooking flexibility and zero cleanup stress.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative flex flex-col items-center text-center group hover:border-blue-400 transition-all shadow-sm hover:shadow-md"
              >
                {/* Step Number Pill */}
                <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 text-blue-700 font-mono font-black text-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {item.step}
                </div>

                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 mb-3 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-wider">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
