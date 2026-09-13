import React from 'react';
import { Maximize2, Layers, Clock, Sparkles, ArrowDown } from 'lucide-react';

export const ProblemHookSection: React.FC = () => {
  const painPoints = [
    {
      title: "LIMITED KITCHEN SPACE?",
      description: "Countertop clutter slows down meal prep. A compact flip-up design is practical where countertop real estate is precious, keeping your surfaces flexible and tidy.",
      icon: Maximize2,
      badge: "Space Friction"
    },
    {
      title: "NEED TO COOK MORE THAN ONE THING?",
      description: "Cooking dishes one by one wastes valuable hours. The dedicated two-burner setup gives you two active cooking zones so you can boil and fry simultaneously.",
      icon: Layers,
      badge: "Cooking Capacity"
    },
    {
      title: "TIRED OF WATCHING THE CLOCK?",
      description: "Constantly checking timers on phones while running around the kitchen is distracting. The built-in mechanical timer provides convenient, on-device time tracking.",
      icon: Clock,
      badge: "Time Tracking"
    },
    {
      title: "WANT A CLEAN, MODERN KITCHEN LOOK?",
      description: "Bulky, stained conventional stoves detract from your kitchen's aesthetic. The sleek black glass-top finish delivers a sharp, sophisticated visual style that wipes down cleanly.",
      icon: Sparkles,
      badge: "Kitchen Style"
    }
  ];

  return (
    <section id="problem-section" className="py-14 sm:py-20 px-4 bg-white text-slate-900 border-b border-blue-100 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-blue-600 font-mono text-xs uppercase tracking-widest block font-bold mb-2">
            The Daily Kitchen Reality
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            YOUR COOKING SPACE SHOULD WORK FOR YOU — NOT AGAINST YOU.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Preparing good meals shouldn't mean fighting with cramped counters, single-burner bottlenecks, or burnt food from missed timing.
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transition statement */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 border border-blue-500/30 px-6 py-4 rounded-2xl shadow-lg text-white">
            <span className="text-sm sm:text-lg font-black tracking-wide text-white">
              MEET YOUR NEW EVERYDAY COOKING COMPANION.
            </span>
            <span className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 animate-bounce">
              <ArrowDown className="w-4 h-4 stroke-[3]" />
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
