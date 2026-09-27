import React, { useState, useRef, useEffect } from 'react';
import {
  HelpCircle,
  Headphones,
  Phone,
  MessageCircle,
  Truck,
  Settings,
  X,
  ChevronRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { LandingPageConfig } from '../types';
import { formatWhatsAppNumber } from '../config';

interface HeaderSupportFaqProps {
  config: LandingPageConfig;
  onScrollToSection: (sectionId: string) => void;
  onOpenSellerConfig: () => void;
}

export const HeaderSupportFaq: React.FC<HeaderSupportFaqProps> = ({
  config,
  onScrollToSection,
  onOpenSellerConfig
}) => {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const supportRef = useRef<HTMLDivElement>(null);

  // Close support popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (supportRef.current && !supportRef.current.contains(event.target as Node)) {
        setIsSupportOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSupportOpen(false);
      }
    };

    if (isSupportOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSupportOpen]);

  const cleanNumber = formatWhatsAppNumber(config.WHATSAPP_NUMBER);
  const supportWhatsAppUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    `Hello! I need customer support regarding the ${config.PRODUCT_NAME} on your website.`
  )}`;
  const phoneCallUrl = `tel:${cleanNumber}`;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      
      {/* FAQ BUTTON — Directly scrolls down to FAQ section */}
      <button
        type="button"
        id="header-faq-btn"
        onClick={() => onScrollToSection('faq-section')}
        className="px-2.5 py-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/50 text-slate-700 hover:text-blue-700 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        title="View Frequently Asked Questions"
      >
        <HelpCircle className="w-4 h-4 text-blue-600 stroke-[2.2]" />
        <span>FAQ</span>
      </button>

      {/* SUPPORT BUTTON & POPOVER */}
      <div ref={supportRef} className="relative inline-block text-left">
        <button
          type="button"
          id="header-support-btn"
          onClick={() => setIsSupportOpen((prev) => !prev)}
          aria-label="Customer Support"
          aria-expanded={isSupportOpen}
          className={`px-2.5 py-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
            isSupportOpen
              ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/20 ring-2 ring-blue-400/30'
              : 'border-slate-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/50 text-slate-700 hover:text-emerald-700'
          }`}
          title="Customer Support & Contact Info"
        >
          <Headphones className={`w-4 h-4 stroke-[2.2] ${isSupportOpen ? 'text-white' : 'text-emerald-600'}`} />
          <span>Support</span>
        </button>

        {/* SUPPORT DROPDOWN POPOVER */}
        {isSupportOpen && (
          <div
            id="support-popover"
            className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Customer Support
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSupportOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                aria-label="Close Support Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Support Channels */}
            <div className="py-2.5 space-y-2">
              {/* WhatsApp Support */}
              <a
                href={supportWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsSupportOpen(false)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors text-emerald-950 font-bold text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </span>
                  <div className="text-left">
                    <span className="block font-bold">Chat on WhatsApp</span>
                    <span className="text-[10px] text-emerald-700 font-normal">Instant reply • 24/7 Support</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </a>

              {/* Direct Phone Call */}
              <a
                href={phoneCallUrl}
                onClick={() => setIsSupportOpen(false)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors text-blue-950 font-bold text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div className="text-left">
                    <span className="block font-bold">Call Customer Care</span>
                    <span className="text-[10px] text-blue-700 font-normal">{config.STORE_PHONE_DISPLAY || config.WHATSAPP_NUMBER}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </a>

              {/* FAQ Shortcut */}
              <button
                type="button"
                onClick={() => {
                  setIsSupportOpen(false);
                  onScrollToSection('faq-section');
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors text-slate-800 font-bold text-xs cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                  <div className="text-left">
                    <span className="block font-bold">Read FAQs & Answers</span>
                    <span className="text-[10px] text-slate-500 font-normal">Specs, warranty & returns</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Support Trust Information */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <Truck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Nationwide delivery with Pay on Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Orders dispatched within 24 to 48 hours</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Every unit inspected before departure</span>
              </div>
            </div>

            {/* Seller Configuration Access */}
            <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Store Management</span>
              <button
                type="button"
                onClick={() => {
                  setIsSupportOpen(false);
                  onOpenSellerConfig();
                }}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer"
              >
                <Settings className="w-3 h-3" />
                <span>Seller Settings</span>
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
