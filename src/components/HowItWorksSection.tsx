import React from 'react';
import { ArrowUpFromLine, Timer, UtensilsCrossed } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "FLIP UP",
      desc: "Open the burner into cooking position or flip up when needed for quick, unobstructed surface cleaning.",
      icon: ArrowUpFromLine
    },
    {
      step: "02",
      title: "SET YOUR TIMER",
      desc: "Set your desired cooking time using the built-in timer to keep tabs on your dishes effortlessly.",
      icon: Timer
    },
    {
      step: "03",
      title: "START COOKING",
      desc: "Ignite your gas flame and enjoy a more convenient, controlled, and flexible cooking experience.",
      icon: UtensilsCrossed
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
            HOW THE PRODUCT WORKS
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Simple 3-step process to transform the way you prepare everyday meals.
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
