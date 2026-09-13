import React from 'react';
import { Home, Building2, GraduationCap, ChefHat, Flame, Compass } from 'lucide-react';

export const PerfectForSection: React.FC = () => {
  const useCases = [
    {
      title: "Homes",
      desc: "An everyday dual cooking station for family breakfasts, hearty lunches, and evening stews.",
      icon: Home,
      tag: "Family Living"
    },
    {
      title: "Apartments",
      desc: "Compact footprint fits smartly on small studio counters and city apartment kitchenettes.",
      icon: Building2,
      tag: "Compact Spaces"
    },
    {
      title: "Students",
      desc: "Practical and reliable cooking companion for student lodges and off-campus residences.",
      icon: GraduationCap,
      tag: "Student Life"
    },
    {
      title: "Everyday Cooking",
      desc: "Designed for daily domestic use with straightforward controls and quick cleanup.",
      icon: ChefHat,
      tag: "Daily Prep"
    },
    {
      title: "Busy Kitchens",
      desc: "Allows quick parallel boiling and frying when meal times cannot wait.",
      icon: Flame,
      tag: "Multi-Tasking"
    },
    {
      title: "Outdoor / Additional Cooking Setup",
      desc: "A handy secondary burner setup on balconies, back kitchens, or auxiliary cooking stands.",
      icon: Compass,
      tag: "Secondary Station"
    }
  ];

  return (
    <section id="perfect-for-section" className="py-14 sm:py-20 px-4 bg-slate-50 text-slate-900 border-b border-blue-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
            Versatile Everyday Utility
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            MADE FOR MODERN EVERYDAY COOKING
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Engineered to fit smoothly into diverse lifestyles and kitchen arrangements.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
