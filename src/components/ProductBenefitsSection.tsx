import React from 'react';
import { Flame, Zap, Clock, Sparkles, RefreshCw, ChefHat, Check } from 'lucide-react';

export const ProductBenefitsSection: React.FC = () => {
  const features = [
    {
      title: "4 Powerful Gas Burners",
      subtitle: "High-Efficiency Blue Flame",
      desc: "Four robust gas burners engineered for rapid boiling, stewing, and frying without producing black soot on pots. Equipped with sensitive thermocouple Flame Failure Devices (FFD) that automatically shut off gas flow if a flame is accidentally blown out.",
      icon: Flame,
      image: "/images/pure_blue_flame.jpg",
      highlight: "Pure Blue Flame • Zero Soot"
    },
    {
      title: "1 Electric Heating Plate",
      subtitle: "Central 2000W Radiant Zone",
      desc: "Heavy-duty central electric ceramic hotplate that powers on instantly using standard electricity or backup generators. Works seamlessly with any flat-bottom cookware—stainless steel, enamel, cast iron, or ceramic pots.",
      icon: Zap,
      image: "/images/alternative_5burner/cooktop_showroom_active.jpg",
      highlight: "2000W Power • All Pots Compatible"
    },
    {
      title: "Smart Digital Timer and Controls",
      subtitle: "1–99 Minute Auto-Cutoff",
      desc: "Illuminated digital LED touch display allows you to set precise countdown timers. The moment your set time elapses, the cooker automatically alerts you and shuts off power to prevent burnt meals and dry-boiled soups.",
      icon: Clock,
      image: "/images/cooker_blue_flames.jpg",
      highlight: "LED Touch Control • Auto Shutoff"
    },
    {
      title: "Premium Black Glass Finish",
      subtitle: "Toughened High-Gloss Glass",
      desc: "Sleek, heat-resistant black tempered glass with bevelled edges that instantly elevates your kitchen decor to modern executive standards. Impervious to heat, scratches, and stains for effortless maintenance.",
      icon: Sparkles,
      image: "/images/alternative_5burner/cooktop_kitchen_installed.jpeg",
      highlight: "Toughened Glass • Scratch Resistant"
    },
    {
      title: "Detachable Burner Design",
      subtitle: "90° Flip-Up Articulated Hinges",
      desc: "Innovative hinged burner mechanism tilts upright smoothly. When palm oil, stew, or boiling broth spills during cooking, lift the burners and wipe the flat glass clean in 10 seconds without disassembling parts.",
      icon: RefreshCw,
      image: "/images/alternative_5burner/cooktop_hinged_burners.png",
      highlight: "10-Second Wipe • Heavy Duty Hinges"
    },
    {
      title: "5 Cooking Zones",
      subtitle: "Executive 90 × 51 cm Space",
      desc: "Expansive 900 × 510 mm surface comfortably fits five family-sized pots simultaneously. Prepare fried chicken, jollof rice, pepper soup, plantains, and boil water all at once with zero pot crowding.",
      icon: ChefHat,
      image: "/images/alternative_5burner/cooktop_main_diagram.png",
      highlight: "90cm Wide • 5 Large Pots Together"
    }
  ];

  return (
    <section id="features-section" className="py-14 sm:py-20 px-4 bg-white text-slate-900 border-b-2 border-[#D4AF37]/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#123B2A] text-[#F4E07B] text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 border border-[#D4AF37]/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Official Product Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            HIGHLIGHTED PRODUCT FEATURES
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real specifications and verified craftsmanship of the 5-in-1 Gas + Electric Cooktop, designed for reliable Nigerian family kitchens.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Photograph Container */}
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="bg-[#123B2A]/90 backdrop-blur-md text-[#F4E07B] border border-[#D4AF37]/60 font-black text-[11px] px-2.5 py-0.5 rounded shadow">
                      {feat.highlight}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#123B2A] text-[#F4E07B] flex items-center justify-center shrink-0 border border-[#D4AF37]/40">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                          {feat.title}
                        </h3>
                        <span className="text-[11px] font-semibold text-[#B71C1C]">
                          {feat.subtitle}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                      {feat.desc}
                    </p>
                  </div>

                  {/* Bottom Verification Tag */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-[#123B2A]">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                    <span>Included in 5-in-1 Cooktop</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
