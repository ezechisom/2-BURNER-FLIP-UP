import React from 'react';
import { ShieldCheck, Flame, Timer, Zap, AlertTriangle, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

interface SafetyProtectionSectionProps {
  onOrderClick: () => void;
}

export const SafetyProtectionSection: React.FC<SafetyProtectionSectionProps> = ({ onOrderClick }) => {
  return (
    <section id="safety-section" className="py-14 sm:py-20 px-4 bg-slate-950 text-white relative overflow-hidden border-b border-blue-900/60">
      {/* Background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/20 text-red-300 text-xs font-mono font-black uppercase tracking-wider border border-red-500/30 mb-3">
            <ShieldCheck className="w-4 h-4 text-red-400" />
            <span>CERTIFIED KITCHEN SAFETY TECHNOLOGY</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            FLAME FAILURE DEVICE (FFD) & DIGITAL TIMER AUTO-CUTOFF
          </h2>
          <p className="text-slate-300 text-xs sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Standard stoves pose serious hazards when soup boils over or timers are forgotten. Our executive hybrid cooktop integrates dual-layer active safety sensors that automatically shut off gas leaks and cut electrical power before accidents happen.
          </p>
        </div>

        {/* 2 MAIN SAFETY PILLARS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          
          {/* PILLAR 1: FLAME FAILURE DEVICE (FFD) */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-red-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative group hover:border-red-400 transition-all">
            <div className="absolute -top-3.5 left-6 bg-red-600 text-white text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Gas Safety System</span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mb-2">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                AUTOMATIC FLAME FAILURE DEVICE (FFD)
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Every single gas burner on this cooktop is armed with an ultra-sensitive, high-precision thermocouple probe that continuously monitors burner flame temperatures.
              </p>

              {/* How it works breakdown */}
              <div className="bg-slate-950/90 border border-red-500/20 rounded-2xl p-4 space-y-3 text-xs">
                <div className="font-bold text-red-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>The Hazard On Ordinary Stoves:</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  When strong wind blows from a kitchen window or boiling egusi/soup overflows and extinguishes the flame, ordinary stoves keep pumping flammable gas into the room unnoticed. This creates dangerous explosive risks and toxic gas fumes.
                </p>

                <div className="h-px bg-slate-800 my-2" />

                <div className="font-bold text-emerald-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>How Our FFD Protects You:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Within <strong>5 to 10 seconds</strong> of flame loss, the thermocouple registers the temperature drop and instantly snaps the electromagnetic gas valve shut. The gas supply is stopped dead at the source, preventing leaks, explosions, and fire accidents completely.
                </p>
              </div>

              {/* Key Features List */}
              <ul className="space-y-2 text-xs text-slate-300 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Protection against accidental wind flameouts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automatic shutoff when liquids boil over</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Certified European-standard thermocouple valves</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-red-300 font-mono flex items-center justify-between">
              <span>RESPONSE SPEED: &lt; 10 SECONDS</span>
              <span className="text-emerald-400 font-bold">✓ 100% GAS SEAL</span>
            </div>
          </div>

          {/* PILLAR 2: DIGITAL TIMER & AUTOMATIC POWER CUTOFF */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-sky-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative group hover:border-sky-400 transition-all">
            <div className="absolute -top-3.5 left-6 bg-sky-600 text-white text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 fill-current" />
              <span>Electric Zone Safety System</span>
            </div>

            <div className="space-y-4 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-2">
                <Timer className="w-8 h-8" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                DIGITAL TIMER & AUTOMATIC POWER CUTOFF
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                The central 2000W radiant ceramic burner is controlled by an intelligent microprocessor touch panel with an illuminated countdown timer and emergency safety cutoff.
              </p>

              {/* How it works breakdown */}
              <div className="bg-slate-950/90 border border-sky-500/20 rounded-2xl p-4 space-y-3 text-xs">
                <div className="font-bold text-sky-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Timer className="w-3.5 h-3.5" />
                  <span>1 to 99 Minute Programmable Timer:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Simply tap the <strong className="text-white">+ / -</strong> touch sensors to select your cooking duration (e.g., 20 mins for rice, 45 mins for beans or stew). You can leave the kitchen to attend to phone calls, children, or work with total confidence.
                </p>

                <div className="h-px bg-slate-800 my-2" />

                <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Automatic Power Disconnect at Zero:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  When the digital timer counts down to <strong>00</strong>, the unit emits an audible alert and immediately severs all electrical power to the heating element. Cooking stops instantly, guaranteeing zero burnt pots, no wasted electricity, and no fire breakout.
                </p>
              </div>

              {/* Key Features List */}
              <ul className="space-y-2 text-xs text-slate-300 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Dry-Burn & Overheat Thermal Limiter protection</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Child-Lock touch panel prevents unauthorized tampering</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Acoustic alert notifies you the moment cooking finishes</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-sky-300 font-mono flex items-center justify-between">
              <span>TIMER RANGE: 1–99 MINUTES</span>
              <span className="text-emerald-400 font-bold">✓ AUTO-DISCONNECT</span>
            </div>
          </div>

        </div>

        {/* 4 REASSURANCE POINTS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 text-center">
          <div className="p-2">
            <div className="text-xl sm:text-2xl font-black text-amber-400 mb-1">0%</div>
            <div className="text-xs font-bold text-white">Gas Leak Risk</div>
            <div className="text-[11px] text-slate-400 mt-0.5">FFD shuts gas immediately</div>
          </div>
          <div className="p-2">
            <div className="text-xl sm:text-2xl font-black text-sky-400 mb-1">1–99m</div>
            <div className="text-xs font-bold text-white">Digital LED Timer</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Automated power cutoff</div>
          </div>
          <div className="p-2">
            <div className="text-xl sm:text-2xl font-black text-emerald-400 mb-1">2000W</div>
            <div className="text-xs font-bold text-white">Instant Ceramic Zone</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Works with all flat cookware</div>
          </div>
          <div className="p-2">
            <div className="text-xl sm:text-2xl font-black text-purple-400 mb-1">100%</div>
            <div className="text-xs font-bold text-white">Child-Lock Safe</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Touch sensor security</div>
          </div>
        </div>

        {/* CALL TO ACTION BUTTON */}
        <div className="text-center">
          <button
            type="button"
            onClick={onOrderClick}
            className="btn-glow-amber bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black py-4 px-8 rounded-xl text-sm sm:text-base cursor-pointer shadow-xl transition-all inline-flex items-center gap-2"
          >
            <span>ORDER THIS SAFE HYBRID COOKTOP NOW</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
          <p className="text-[11px] text-slate-400 mt-2">
            Pay on delivery nationwide • Complete manufacturer warranty included
          </p>
        </div>

      </div>
    </section>
  );
};
