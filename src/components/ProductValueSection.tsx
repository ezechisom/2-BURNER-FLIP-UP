import React from 'react';
import { Layers, Timer, RefreshCw, Sparkles, Minimize2, ArrowRight, Truck } from 'lucide-react';
import { LandingPageConfig } from '../types';

interface ProductValueSectionProps {
  config: LandingPageConfig;
  onOrderClick: (quantity?: number) => void;
}

export const ProductValueSection: React.FC<ProductValueSectionProps> = ({ config, onOrderClick }) => {
  const detailImage = config.PRODUCT_IMAGES[1]?.url || "/images/burner_flip_hinge.jpg";

  const valuePoints = [
    {
      title: "Two Cooking Zones",
      desc: "Simultaneous dual cooking eliminates bottlenecks so meals are served hot together.",
      icon: Layers
    },
    {
      title: "Built-In Timer",
      desc: "Hands-on timing control helps prevent burnt sauces and overboiled pots.",
      icon: Timer
    },
    {
      title: "Flip-Up Design",
      desc: "Innovative hinge allows lifting the burner to wipe spills in seconds without greasy buildup.",
      icon: RefreshCw
    },
    {
      title: "Modern Appearance",
      desc: "Glossy black tempered surface elevates your countertop visual aesthetic instantly.",
      icon: Sparkles
    },
    {
      title: "Space-Conscious Design",
      desc: "Efficient footprint maximizes usable food preparation room on any counter.",
      icon: Minimize2
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
                  alt="Flip-Up Burner Head and Timer Detail"
                  className="w-full h-auto object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="mt-3 text-center text-xs text-slate-500 font-medium">
                {config.PRODUCT_IMAGES[1]?.title || "Double-Burner Cooker with Timer"}
              </div>
            </div>
          </div>

          {/* Value Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="text-blue-600 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
                All-In-One Cooktop
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                ONE SMARTER COOKING SETUP
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Rather than settling for standard bulky single-function stoves, bring intelligent dual-zone cooking and easy-clean ergonomics into your home.
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
