import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  Flame,
  Zap,
  Sparkles,
  Tag,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  Truck,
  Phone,
  MessageCircle,
  Settings,
  ChevronRight
} from 'lucide-react';
import { LandingPageConfig, CookerModel } from '../types';
import { formatNaira, ALTERNATIVE_PRODUCT_CONFIG } from '../config';

interface HeaderOptionsMenuProps {
  config: LandingPageConfig;
  onSelectModel: (model: CookerModel, qty?: number) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenSellerConfig: () => void;
  whatsappUrl?: string;
}

export const HeaderOptionsMenu: React.FC<HeaderOptionsMenuProps> = ({
  config,
  onSelectModel,
  onScrollToSection,
  onOpenSellerConfig,
  whatsappUrl
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleAction = (callback: () => void) => {
    callback();
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      {/* OPTION ICON BUTTON AT THE TOP RIGHT */}
      <button
        type="button"
        id="top-right-option-icon"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Options Menu"
        aria-expanded={isOpen}
        title="Page Options & Navigation"
        className={`p-2 sm:px-2.5 sm:py-2 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
          isOpen
            ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/20 ring-2 ring-blue-400/30'
            : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-700 border-slate-200 hover:border-blue-300'
        }`}
      >
        {isOpen ? (
          <X className="w-5 h-5 stroke-[2.5]" />
        ) : (
          <Menu className="w-5 h-5 stroke-[2.2]" />
        )}
        <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
          Options
        </span>
      </button>

      {/* DROPDOWN MENU PANEL */}
      {isOpen && (
        <div
          id="header-options-dropdown"
          className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Menu & Quick Options
            </span>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              Fast Access
            </span>
          </div>

          {/* SECTION 1: PRODUCT MODELS & COMBO */}
          <div className="mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
              Cooker Models & Ordering
            </span>
            <div className="space-y-1">
              {/* 2-Burner Flip-Up */}
              <button
                type="button"
                onClick={() => handleAction(() => onSelectModel('2-burner', 1))}
                className="w-full text-left p-2 rounded-xl hover:bg-blue-50/80 transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-blue-200"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Flame className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                      2-Flip-Up Burner (75 × 45 cm)
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Double gas zones • From {formatNaira(config.PRICE_FOR_3_PLUS)}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* 5-Burner Hybrid */}
              <button
                type="button"
                onClick={() => handleAction(() => onSelectModel('5-burner', 1))}
                className="w-full text-left p-2 rounded-xl hover:bg-amber-50/80 transition-colors flex items-center justify-between group cursor-pointer border border-transparent hover:border-amber-200"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                      5-Burner Hybrid (90 × 51 cm)
                    </div>
                    <div className="text-[10px] text-slate-500">
                      4 gas + 1 electric • From {formatNaira(ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_4_PLUS)}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Combo Option (Order Both) */}
              <button
                type="button"
                onClick={() => handleAction(() => onSelectModel('combo', 1))}
                className="w-full text-left p-2 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                      <span>Order Both Models (Combo)</span>
                      <span className="text-[9px] font-bold bg-emerald-200 text-emerald-900 px-1 rounded">SAVE ₦20K</span>
                    </div>
                    <div className="text-[10px] text-emerald-800 font-medium">
                      1x 2-Burner + 1x 5-Burner delivered together
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* SECTION 2: PAGE SHORTCUTS */}
          <div className="mb-2 pt-1.5 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
              Explore & Specifications
            </span>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <button
                type="button"
                onClick={() => handleAction(() => onScrollToSection('pricing-section'))}
                className="text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-slate-700 hover:text-blue-700 cursor-pointer transition-colors"
              >
                <Tag className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Pricing Tiers</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(() => onScrollToSection('product-showcase-section'))}
                className="text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-slate-700 hover:text-blue-700 cursor-pointer transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Photo Gallery</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(() => onScrollToSection('alternative-product-section'))}
                className="text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-slate-700 hover:text-amber-700 cursor-pointer transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>5-Burner Showcase</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(() => onScrollToSection('customer-reviews-section'))}
                className="text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-slate-700 hover:text-blue-700 cursor-pointer transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Buyer Reviews</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(() => onScrollToSection('trust-delivery-section'))}
                className="text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-slate-700 hover:text-emerald-700 cursor-pointer transition-colors"
              >
                <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Delivery Info</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction(() => onScrollToSection('faq-section'))}
                className="text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-slate-700 hover:text-blue-700 cursor-pointer transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>FAQs</span>
              </button>
            </div>
          </div>

          {/* SECTION 3: CONTACT & SELLER CONFIG */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <a
                href={`tel:${config.PHONE_NUMBER}`}
                className="flex-1 text-center py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Call Phone</span>
              </a>

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>

            {/* Seller Settings Option */}
            <button
              type="button"
              onClick={() => handleAction(onOpenSellerConfig)}
              className="w-full text-left py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-medium text-xs flex items-center justify-between transition-colors cursor-pointer border border-slate-200"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                <span>Seller Configuration / Settings</span>
              </div>
              <span className="text-[10px] text-blue-600 font-bold">Edit Store</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
