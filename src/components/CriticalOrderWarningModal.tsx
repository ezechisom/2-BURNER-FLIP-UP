import React, { useEffect } from 'react';
import {
  AlertTriangle,
  X,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Truck,
  Ban,
  PhoneCall,
  DollarSign
} from 'lucide-react';
import { formatWhatsAppNumber } from '../config';

interface CriticalOrderWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToForm: () => void;
  whatsappNumber: string;
}

export const CriticalOrderWarningModal: React.FC<CriticalOrderWarningModalProps> = ({
  isOpen,
  onClose,
  onProceedToForm,
  whatsappNumber
}) => {
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

  const cleanNum = formatWhatsAppNumber(whatsappNumber);
  const whatsappUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(
    'Hello! I would like to make some inquiries about the cooker before ordering.'
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Critical Order Warning"
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-rose-500 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP ALERT HEADER */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 p-4 sm:p-5 text-white flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
              <AlertTriangle className="w-6 h-6 text-yellow-300 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase bg-black/30 px-2 py-0.5 rounded text-yellow-200 inline-block mb-1">
                CRITICAL WARNING • READ FIRST
              </span>
              <h3 className="text-base sm:text-lg font-black tracking-tight leading-tight">
                PLEASE DO NOT ORDER IF YOU ARE NOT READY TO BUY!
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close warning"
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* WARNING BODY */}
        <div className="p-5 sm:p-6 space-y-4 text-slate-800 text-xs sm:text-sm">
          
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 font-medium leading-relaxed">
            <p className="font-bold text-rose-900 mb-1">
              ⚠️ We take nationwide delivery very seriously:
            </p>
            We spend heavy courier delivery fees to safely transport and insure each cooker to your doorstep anywhere in Nigeria.
            Fake, unready, or cancelled orders cause our business huge financial losses.
          </div>

          {/* DO NOT ORDER IF LIST */}
          <div className="space-y-2.5">
            <span className="text-xs font-black uppercase text-slate-900 block tracking-wide">
              Please DO NOT proceed if:
            </span>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <Ban className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="text-slate-700">
                <strong className="text-slate-900">Your money is not ready:</strong> You do not yet have the cash or transfer amount set aside.
              </span>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <Ban className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="text-slate-700">
                <strong className="text-slate-900">You are traveling soon:</strong> You will not be at your delivery address within the next 1 to 4 business days.
              </span>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <Ban className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="text-slate-700">
                <strong className="text-slate-900">Unreachable by phone:</strong> You will not answer calls from our delivery dispatch team when they arrive.
              </span>
            </div>
          </div>

          {/* POSITIVE CONFIRMATION */}
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-950 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold leading-tight">
              Only proceed if you are <strong>100% CASH-READY</strong> and <strong>AVAILABLE</strong> to receive and pay for the cooker upon arrival.
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={onProceedToForm}
              className="btn-glow w-full py-4 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all uppercase tracking-tight"
            >
              <span>YES, I AM 100% READY — PROCEED TO FORM</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>I have questions first (WhatsApp)</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel / Not Ready
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
