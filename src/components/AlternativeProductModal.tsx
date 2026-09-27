import React, { useState, useEffect } from 'react';
import {
  X,
  Flame,
  Zap,
  Clock,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MessageCircle,
  Maximize2,
  Sparkles,
  Layers
} from 'lucide-react';
import { ALTERNATIVE_PRODUCT_CONFIG, formatNaira, formatWhatsAppNumber } from '../config';
import { CookerModel } from '../types';

interface AlternativeProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModel: (model: CookerModel, qty?: number) => void;
  whatsappNumber: string;
}

export const AlternativeProductModal: React.FC<AlternativeProductModalProps> = ({
  isOpen,
  onClose,
  onSelectModel,
  whatsappNumber
}) => {
  const product = ALTERNATIVE_PRODUCT_CONFIG;
  const [selectedSlide, setSelectedSlide] = useState(0);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentImage = product.images[selectedSlide] || product.images[0];

  const handleChooseModel = (model: CookerModel, qty: number = 1) => {
    onClose();
    // Allow modal close transition before smooth scroll
    setTimeout(() => {
      onSelectModel(model, qty);
    }, 100);
  };

  const cleanNum = formatWhatsAppNumber(whatsappNumber);
  const whatsappUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(
    `Hello! I am inquiring about the 2-Burner Flip-Up Double Gas Cooktop (₦170,000). Please provide more information.`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="2-Burner Flip-Up Gas Cooktop Details"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-slate-100 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-xs">
              <Flame className="w-5 h-5 fill-current" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight uppercase">
                  {product.name}
                </h3>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs hidden sm:inline-block">
                  Compact 75 × 45 cm
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                90° Flip-Up Hinges • Tabletop & Flush Built-in Dual-Purpose • Pure Blue Flame
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close details modal"
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL SCROLLABLE BODY */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6 flex-1 text-slate-900">
          
          {/* TWO COLUMN GRID: LEFT GALLERY, RIGHT SPEC OVERVIEW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT: IMAGE SLIDESHOW (5 COLS) */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 aspect-[4/3] flex items-center justify-center group shadow-md">
                <img
                  src={currentImage.url}
                  alt={currentImage.title}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                
                {/* Image Caption Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-3 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">{currentImage.title}</span>
                    <span className="text-[10px] font-mono bg-slate-800/90 px-1.5 py-0.5 rounded text-slate-300">
                      {selectedSlide + 1} / {product.images.length}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5 font-light">
                    {currentImage.caption}
                  </p>
                </div>

                {/* Left / Right Nav Arrows */}
                <button
                  type="button"
                  onClick={() => setSelectedSlide((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-opacity cursor-pointer shadow-md"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedSlide((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-opacity cursor-pointer shadow-md"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setSelectedSlide(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      selectedSlide === idx
                        ? 'border-amber-500 ring-2 ring-amber-400/40 opacity-100 scale-105'
                        : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: PRICING & QUICK VALUE PILLARS (6 COLS) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Price card */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-amber-900">
                    Promo Discount Price
                  </span>
                  <span className="text-[10px] font-black uppercase bg-emerald-600 text-white px-2 py-0.5 rounded shadow-xs">
                    SAVE ₦50,000
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-black text-slate-950">
                    {formatNaira(product.NORMAL_PRICE)}
                  </span>
                  <span className="text-sm line-through text-slate-400 font-semibold">
                    {formatNaira(product.REGULAR_PRICE)}
                  </span>
                </div>
                <p className="text-xs text-amber-950 mt-1 font-medium">
                  Order 2 units for <strong className="text-slate-950">{formatNaira(product.PRICE_FOR_2 * 2)}</strong> ({formatNaira(product.PRICE_FOR_2)} each).
                </p>
              </div>

              {/* 3 Core Guarantees */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[10px] font-black block uppercase leading-tight">12 Months</span>
                  <span className="text-[9px] text-slate-500 block leading-tight">Warranty</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                  <Truck className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <span className="text-[10px] font-black block uppercase leading-tight">Free Delivery</span>
                  <span className="text-[9px] text-slate-500 block leading-tight">All 36 States</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <span className="text-[10px] font-black block uppercase leading-tight">Pay On</span>
                  <span className="text-[9px] text-slate-500 block leading-tight">Delivery</span>
                </div>
              </div>

              {/* Primary Order Action Button inside Modal */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleChooseModel('2-burner', 1)}
                  className="btn-glow-amber w-full py-3.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  <Flame className="w-4 h-4 fill-current" />
                  <span>ORDER THIS 2-BURNER COOKTOP ({formatNaira(product.NORMAL_PRICE)})</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleChooseModel('combo', 1)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>Order Both 5B + 2B Combo (Save ₦10k)</span>
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 transition-colors"
                    title="Ask on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* KEY FEATURES BREAKDOWN */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
              Why Choose The 2-Burner Flip-Up Cooker
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.keyBenefits.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.title}</span>
                      <span className="text-[9px] font-mono bg-white border border-slate-200 px-1.5 py-0.2 rounded text-slate-600 font-semibold">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SPECIFICATIONS TABLE */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
              Complete Dimensions & Technical Specifications
            </h4>
            <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-slate-200 bg-white">
                <div className="p-3 bg-slate-50/70 font-semibold text-slate-500">Panel Dimensions</div>
                <div className="p-3 font-bold text-slate-900 col-span-1 sm:col-span-2">{product.specs.panelDimensions} (Compact)</div>

                <div className="p-3 bg-slate-50/70 font-semibold text-slate-500">Countertop Cutout</div>
                <div className="p-3 font-bold text-slate-900 col-span-1 sm:col-span-2">{product.specs.cutoutDimensions}</div>

                <div className="p-3 bg-slate-50/70 font-semibold text-slate-500">Installation Type</div>
                <div className="p-3 font-bold text-emerald-800 col-span-1 sm:col-span-2">
                  Dual: Tabletop Ready (non-slip rubber feet) OR Built-In Countertop Flush
                </div>

                <div className="p-3 bg-slate-50/70 font-semibold text-slate-500">Surface Material</div>
                <div className="p-3 font-bold text-slate-900 col-span-1 sm:col-span-2">{product.specs.surfaceMaterial}</div>

                <div className="p-3 bg-slate-50/70 font-semibold text-slate-500">Burner Mechanism</div>
                <div className="p-3 font-bold text-slate-900 col-span-1 sm:col-span-2">{product.specs.burnerMechanism}</div>

                <div className="p-3 bg-slate-50/70 font-semibold text-slate-500">Flame Type</div>
                <div className="p-3 font-bold text-blue-700 col-span-1 sm:col-span-2">Pure Blue Fierce Flame (8-Nozzle Brass, Zero Soot)</div>

                <div className="p-3 bg-slate-50/70 font-semibold text-slate-500">Ignition & Safety</div>
                <div className="p-3 font-bold text-slate-900 col-span-1 sm:col-span-2">
                  {product.specs.ignitionType} + {product.specs.timer}
                </div>

                <div className="p-3 bg-slate-50/70 font-semibold text-slate-500">Gas Compatibility</div>
                <div className="p-3 font-bold text-slate-900 col-span-1 sm:col-span-2">
                  LPG Cooking Gas (compatible with all standard Nigerian gas cylinders)
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="px-5 sm:px-8 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>12 Months Official Warranty Coverage Included</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => handleChooseModel('2-burner', 1)}
              className="btn-glow-amber px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              <span>Order 2-Burner Now (₦170k)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
