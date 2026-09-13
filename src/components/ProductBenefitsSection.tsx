import React from 'react';
import { Flame, Clock, RefreshCw, Minimize2, Sparkles, ChefHat } from 'lucide-react';

export const ProductBenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: "2-BURNER DESIGN",
      copy: "Cook with two burners at the same time, making it easier to prepare multiple dishes simultaneously.",
      icon: Flame,
      number: "01"
    },
    {
      title: "BUILT-IN TIMER",
      copy: "Keep track of cooking time conveniently with the integrated timer without needing external gadgets.",
      icon: Clock,
      number: "02"
    },
    {
      title: "FLIP-UP DESIGN",
      copy: "The flip-up burner design helps create a more flexible and space-conscious cooking setup with effortless under-surface wipe down.",
      icon: RefreshCw,
      number: "03"
    },
    {
      title: "SPACE-SAVING",
      copy: "A practical choice for kitchens where countertop space matters, delivering high functionality in a compact footprint.",
      icon: Minimize2,
      number: "04"
    },
    {
      title: "MODERN GLASS-TOP LOOK",
      copy: "A sleek black appearance designed to complement modern kitchen spaces with clean, reflective elegance.",
      icon: Sparkles,
      number: "05"
    },
    {
      title: "EVERYDAY CONVENIENCE",
      copy: "Suitable for everyday home cooking and customers looking for a convenient double-burner setup for daily family meals.",
      icon: ChefHat,
      number: "06"
    }
  ];

  return (
    <section id="benefits-section" className="py-14 sm:py-20 px-4 bg-white text-slate-900 border-b border-blue-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
            Engineered For Simplicity
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            WHY YOU'LL LOVE THIS 2-FLIP-UP BURNER
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Every feature is designed to make your daily cooking smoother, cleaner, and more manageable.
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
