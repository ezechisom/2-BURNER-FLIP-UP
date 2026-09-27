import React, { useState, useEffect } from 'react';
import { Timer, Zap, ShieldAlert, Sparkles, CheckCircle2, RotateCcw, Flame, ArrowRight, ShieldCheck, Power, Wind, AlertTriangle } from 'lucide-react';
import { formatNaira } from '../config';

interface DigitalTimerSimulatorProps {
  onOrderClick: () => void;
}

export const DigitalTimerSimulator: React.FC<DigitalTimerSimulatorProps> = ({ onOrderClick }) => {
  const [activeTab, setActiveTab] = useState<'timer' | 'ffd'>('timer');

  // Timer simulation state
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [timerMinutes, setTimerMinutes] = useState(30);
  const [powerLevel, setPowerLevel] = useState(7); // 1-9
  const [isTestingCutoff, setIsTestingCutoff] = useState(false);
  const [cutoffCountdown, setCutoffCountdown] = useState(3);
  const [cutoffTriggered, setCutoffTriggered] = useState(false);

  // Flame Failure Device simulation state
  const [isGasFlameLit, setIsGasFlameLit] = useState(true);
  const [isSimulatingFlameout, setIsSimulatingFlameout] = useState(false);
  const [ffdCountdown, setFfdCountdown] = useState(3);
  const [ffdTriggered, setFfdTriggered] = useState(false);

  // Handle emergency electric cutoff test simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTestingCutoff && cutoffCountdown > 0) {
      interval = setInterval(() => {
        setCutoffCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTestingCutoff(false);
            setCutoffTriggered(true);
            setIsPowerOn(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestingCutoff, cutoffCountdown]);

  // Handle Flame Failure Device test simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulatingFlameout && ffdCountdown > 0) {
      interval = setInterval(() => {
        setFfdCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsSimulatingFlameout(false);
            setFfdTriggered(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimulatingFlameout, ffdCountdown]);

  const handleStartCutoffTest = () => {
    setIsPowerOn(true);
    setCutoffTriggered(false);
    setCutoffCountdown(3);
    setIsTestingCutoff(true);
  };

  const handleStartFfdTest = () => {
    setIsGasFlameLit(false); // flame blown out
    setFfdTriggered(false);
    setFfdCountdown(3);
    setIsSimulatingFlameout(true);
  };

  const handleResetFfd = () => {
    setIsGasFlameLit(true);
    setIsSimulatingFlameout(false);
    setFfdTriggered(false);
    setFfdCountdown(3);
  };

  const handleResetSimulator = () => {
    setIsPowerOn(true);
    setTimerMinutes(30);
    setPowerLevel(7);
    setIsTestingCutoff(false);
    setCutoffTriggered(false);
    setCutoffCountdown(3);
  };

  const wattage = isPowerOn ? powerLevel * 220 : 0;

  return (
    <section className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden border-b border-blue-900/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-mono font-black uppercase tracking-wider border border-blue-400/30 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>INTERACTIVE SAFETY SIMULATORS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            TEST DIGITAL TIMER AUTO-CUTOFF & FLAME FAILURE DEVICE
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-lg mx-auto leading-relaxed">
            Experience the dual safety engineering firsthand. Switch between the Digital Timer Auto-Cutoff and the Flame Failure Device (FFD) gas leak shield below.
          </p>

          {/* SIMULATOR SWITCH TABS */}
          <div className="inline-flex p-1.5 bg-slate-950/80 rounded-2xl border border-slate-700 mt-6 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('timer')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'timer'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>1. Digital Timer & Electric Auto-Off</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ffd')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'ffd'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>2. Flame Failure Device (FFD) Gas Cutoff</span>
            </button>
          </div>
        </div>

        {/* TAB 1: DIGITAL TIMER & AUTO-OFF SIMULATOR */}
        {activeTab === 'timer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto bg-slate-950/80 border border-blue-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-md animate-in fade-in duration-300">
            
            {/* LEFT: CERAMIC RADIANT ZONE VISUAL SIMULATION */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isPowerOn ? 'bg-red-500 animate-ping' : 'bg-slate-600'}`} />
                <span>Zone 3: Central 2000W Radiant Ceramic Plate</span>
              </div>

              {/* Glowing Burner Ring Graphic */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-slate-700 bg-slate-900/90 flex items-center justify-center shadow-inner overflow-hidden">
                
                {/* Outer Radiant Glow when active */}
                {isPowerOn && (
                  <div
                    className="absolute inset-2 rounded-full transition-all duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, rgba(239, 68, 68, ${0.2 + (powerLevel / 9) * 0.7}) 0%, rgba(220, 38, 38, ${0.1 + (powerLevel / 9) * 0.5}) 55%, transparent 75%)`,
                      filter: `blur(${powerLevel > 5 ? '8px' : '4px'})`
                    }}
                  />
                )}

                {/* Ceramic Spiral Lines */}
                <div
                  className={`w-40 h-40 rounded-full border-4 border-dashed transition-all duration-300 flex items-center justify-center ${
                    isPowerOn
                      ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.9)] animate-pulse'
                      : 'border-slate-800'
                  }`}
                >
                  <div
                    className={`w-24 h-24 rounded-full border-2 transition-all duration-300 flex flex-col items-center justify-center ${
                      isPowerOn
                        ? 'border-amber-400 bg-red-600/30 text-amber-200'
                        : 'border-slate-800 bg-slate-950 text-slate-600'
                    }`}
                  >
                    <Flame className={`w-6 h-6 ${isPowerOn ? 'text-amber-400 animate-bounce' : 'text-slate-700'}`} />
                    <span className="text-[10px] font-mono font-bold mt-1">
                      {isPowerOn ? `${wattage}W` : 'OFF'}
                    </span>
                  </div>
                </div>

                {/* Status Indicator Pill */}
                <div className="absolute bottom-3 bg-slate-950/90 px-3 py-1 rounded-full border border-slate-700 text-[10px] font-mono font-bold">
                  {cutoffTriggered ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> AUTO CUTOFF ACTIVATED (00 MIN)
                    </span>
                  ) : isPowerOn ? (
                    <span className="text-red-400">HEATING ACTIVE (LEVEL P-{powerLevel})</span>
                  ) : (
                    <span className="text-slate-400">ZONE IN STANDBY</span>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 text-center mt-3 max-w-xs">
                Works with <strong className="text-slate-200">all flat pots</strong> (Stainless steel, iron, enamel, ceramic). No special induction pots required!
              </p>
            </div>

            {/* RIGHT: TOUCH CONTROL PANEL & TIMER SIMULATOR */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5 bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-2xl">
              
              {/* Top digital control strip */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase text-slate-300">
                    SMART TOUCH DIGITAL PANEL (1–99 MIN)
                  </span>
                </div>

                {/* Reset Button */}
                <button
                  type="button"
                  onClick={handleResetSimulator}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo</span>
                </button>
              </div>

              {/* LED SCREEN DISPLAY */}
              <div className="bg-black/90 border-2 border-blue-500/40 rounded-xl p-4 flex items-center justify-around shadow-inner">
                {/* Power / Wattage readout */}
                <div className="text-center">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">Heat Level</span>
                  <span className={`text-2xl sm:text-3xl font-mono font-black ${isPowerOn ? 'text-amber-400' : 'text-slate-600'}`}>
                    {isPowerOn ? `P-${powerLevel}` : '--'}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono block mt-0.5">
                    {isPowerOn ? `${wattage} Watts` : '0 Watts'}
                  </span>
                </div>

                <div className="h-10 w-px bg-slate-800" />

                {/* Timer Readout */}
                <div className="text-center">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">Auto Cutoff Timer</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-3xl sm:text-4xl font-mono font-black tracking-wider ${
                      isTestingCutoff
                        ? 'text-red-500 animate-ping'
                        : isPowerOn
                        ? 'text-sky-400'
                        : 'text-slate-600'
                    }`}>
                      {isTestingCutoff ? `0${cutoffCountdown}` : (isPowerOn ? timerMinutes : '00')}
                    </span>
                    <span className="text-xs font-mono text-sky-300 font-bold">MIN</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono block mt-0.5">
                    {isTestingCutoff ? "⚠️ EMERGENCY COUNTDOWN" : "1 to 99 MIN RANGE"}
                  </span>
                </div>
              </div>

              {/* TOUCH CONTROLS INTERACTIVE BUTTONS */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Touch Controls (Click to Test):
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {/* Power toggle */}
                  <button
                    type="button"
                    onClick={() => setIsPowerOn((prev) => !prev)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                      isPowerOn
                        ? 'bg-red-500/20 border-red-500/60 text-red-300 shadow-sm'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    <span>{isPowerOn ? 'POWER ON' : 'POWER OFF'}</span>
                  </button>

                  {/* Timer Decrease */}
                  <button
                    type="button"
                    disabled={!isPowerOn}
                    onClick={() => setTimerMinutes((prev) => Math.max(1, prev - 5))}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer disabled:opacity-40 transition-colors"
                  >
                    <span className="text-sm font-black">- 5 min</span>
                    <span className="text-[10px] text-slate-400">Decrease</span>
                  </button>

                  {/* Timer Increase */}
                  <button
                    type="button"
                    disabled={!isPowerOn}
                    onClick={() => setTimerMinutes((prev) => Math.min(99, prev + 5))}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer disabled:opacity-40 transition-colors"
                  >
                    <span className="text-sm font-black">+ 5 min</span>
                    <span className="text-[10px] text-slate-400">Increase</span>
                  </button>

                  {/* Power Level Step */}
                  <button
                    type="button"
                    disabled={!isPowerOn}
                    onClick={() => setPowerLevel((prev) => (prev >= 9 ? 1 : prev + 1))}
                    className="p-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-800 border border-blue-500/50 text-sky-200 text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer disabled:opacity-40 transition-colors"
                  >
                    <Zap className="w-4 h-4 fill-current text-sky-400" />
                    <span>Heat P-{powerLevel}</span>
                  </button>
                </div>
              </div>

              {/* TEST EMERGENCY CUTOFF BUTTON */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleStartCutoffTest}
                  disabled={isTestingCutoff}
                  className="w-full py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg disabled:opacity-60"
                >
                  <Timer className="w-4 h-4" />
                  <span>
                    {isTestingCutoff
                      ? `Testing Cutoff at 00 Min in ${cutoffCountdown}s...`
                      : "TEST AUTOMATIC POWER CUTOFF SIMULATION (3s)"}
                  </span>
                </button>

                {cutoffTriggered && (
                  <div className="mt-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs flex items-start gap-2 animate-in fade-in duration-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-bold">
                        Automatic Power Cutoff Triggered Successfully!
                      </strong>
                      <span>
                        Timer reached 00 min and severed all electrical power immediately. Your meal won't burn and power won't be wasted!
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Order CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-300">
                  <span>Upgrade your cooking safety today:</span>
                </div>

                <button
                  type="button"
                  onClick={onOrderClick}
                  className="btn-glow-amber w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Order Cooktop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: FLAME FAILURE DEVICE (FFD) GAS SIMULATOR */}
        {activeTab === 'ffd' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto bg-slate-950/80 border border-red-500/40 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-md animate-in fade-in duration-300">
            
            {/* LEFT: GAS BURNER & THERMOCOUPLE GRAPHIC */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isGasFlameLit ? 'bg-emerald-500 animate-ping' : 'bg-red-500'}`} />
                <span>Zone 1: Pure Blue Flame Gas Burner + Thermocouple</span>
              </div>

              {/* Burner Visual */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-slate-700 bg-slate-900/90 flex flex-col items-center justify-center shadow-inner overflow-hidden">
                
                {/* Thermocouple Probe Pin Graphic */}
                <div className="absolute top-8 right-12 z-20 flex items-center gap-1 bg-black/80 px-2 py-0.5 rounded border border-amber-400/40 text-[9px] font-mono text-amber-300">
                  <span className={`w-1.5 h-1.5 rounded-full ${isGasFlameLit ? 'bg-amber-400' : 'bg-slate-500'}`} />
                  <span>FFD Probe</span>
                </div>

                {/* Flame Active or Extinguished */}
                {isGasFlameLit ? (
                  <div className="relative flex flex-col items-center justify-center animate-pulse">
                    <div className="w-28 h-28 rounded-full bg-blue-500/20 blur-md absolute" />
                    <Flame className="w-20 h-20 text-sky-400 fill-blue-500 relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                    <span className="text-[10px] font-mono font-bold text-sky-300 mt-2 z-10">
                      PURE BLUE FLAME ACTIVE
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <Wind className="w-16 h-16 text-slate-400 animate-bounce mb-1" />
                    <span className="text-[11px] font-mono font-bold text-red-400">
                      {isSimulatingFlameout ? "FLAME EXTINGUISHED!" : "BURNER OFF"}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      {isSimulatingFlameout ? `Thermocouple Cooling (${ffdCountdown}s)...` : "Gas Valve Locked Shut"}
                    </span>
                  </div>
                )}

                {/* Status Indicator Pill */}
                <div className="absolute bottom-3 bg-slate-950/90 px-3 py-1 rounded-full border border-slate-700 text-[10px] font-mono font-bold">
                  {ffdTriggered ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> GAS VALVE SNAPPED SHUT (0.00% LEAK)
                    </span>
                  ) : isGasFlameLit ? (
                    <span className="text-sky-300">GAS FLOWING SAFELY (HOT SENSOR)</span>
                  ) : (
                    <span className="text-amber-400">DETECTING FLAMEOUT...</span>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 text-center mt-3 max-w-xs">
                Standard stoves leak continuous gas when wind or soup kills the flame. Our <strong className="text-red-300">Flame Failure Device</strong> seals it immediately!
              </p>
            </div>

            {/* RIGHT: FFD SIMULATOR CONTROLS & EXPLANATION */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5 bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-2xl">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase text-red-300">
                    FLAME FAILURE PROTECTION SIMULATOR
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleResetFfd}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  title="Relight Gas Burner"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Relight Burner</span>
                </button>
              </div>

              {/* Explanatory Box */}
              <div className="bg-black/80 border border-red-500/30 rounded-xl p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-red-300 font-bold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>The Real Kitchen Danger in Nigerian Homes:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  You are boiling egusi or beans, wind blows from the window, or soup boils over and puts out the flame. With ordinary cooktops, raw gas silently fills the house. Turning on a light switch or generator can ignite an explosion!
                </p>
                <p className="text-emerald-300 font-semibold leading-relaxed pt-1">
                  ✓ With our Flame Failure Device (FFD), the thermocouple senses the sudden temperature drop within 5–10 seconds and automatically locks the internal gas solenoid valve, completely cutting off gas flow!
                </p>
              </div>

              {/* SIMULATION TEST ACTION */}
              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={handleStartFfdTest}
                  disabled={isSimulatingFlameout || !isGasFlameLit}
                  className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg disabled:opacity-50"
                >
                  <Wind className="w-4 h-4" />
                  <span>
                    {isSimulatingFlameout
                      ? `FFD Thermocouple Reacting in ${ffdCountdown}s...`
                      : "SIMULATE WIND BLOWING OUT FLAME (TEST FFD)"}
                  </span>
                </button>

                {ffdTriggered && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs space-y-1 animate-in fade-in duration-300">
                    <div className="flex items-center gap-1.5 text-white font-bold text-sm">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>CLICK! GAS VALVE SEALED SHUT BY FFD</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      The thermocouple registered the lack of flame heat and triggered the magnetic safety valve to shut off the gas stream. Zero unburned gas leaked into the kitchen!
                    </p>
                  </div>
                )}
              </div>

              {/* Order Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
                <div className="text-xs text-slate-300">
                  <span>Keep your family and home safe:</span>
                </div>

                <button
                  type="button"
                  onClick={onOrderClick}
                  className="btn-glow-amber w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Order FFD Cooktop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* 3 VALUE CARDS UNDER SIMULATORS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-5xl mx-auto">
          <div className="bg-slate-950/60 border border-red-500/20 rounded-2xl p-4 text-xs">
            <div className="flex items-center gap-2 text-red-400 font-bold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Flame Failure Gas Seal</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Thermocouples on all 4 gas burners shut gas supply in seconds if wind or spilled soup puts out the flame.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-blue-500/20 rounded-2xl p-4 text-xs">
            <div className="flex items-center gap-2 text-sky-400 font-bold mb-1">
              <Timer className="w-4 h-4" />
              <span>1–99 Min Digital Auto-Off</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Program exact cooking time. Power cuts off automatically at 00 minutes so meals never burn or cause fire.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-blue-500/20 rounded-2xl p-4 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
              <Zap className="w-4 h-4" />
              <span>Instant 2000W Ceramic Plate</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Works with any flat-bottom pot. Heats up in seconds so you never get stranded when gas finishes.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
