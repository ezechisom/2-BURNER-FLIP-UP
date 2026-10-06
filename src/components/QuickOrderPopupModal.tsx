import React, { useState } from 'react';
import {
  X,
  Zap,
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Flame,
  Clock,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { LandingPageConfig } from '../types';
import {
  formatNaira,
  NIGERIAN_STATES,
  getStateDeliveryTimeline
} from '../config';

interface QuickOrderPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LandingPageConfig;
  onOrderSuccess?: (details: {
    fullName: string;
    phoneNumber: string;
    state: string;
    city: string;
    quantity: number;
    total: number;
    orderId: string;
    productModel: string;
    productName: string;
  }) => void;
}

export const QuickOrderPopupModal: React.FC<QuickOrderPopupModalProps> = ({
  isOpen,
  onClose,
  config,
  onOrderSuccess
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    deliveryAddress: '',
    city: '',
    state: 'Lagos'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  let unitPrice = config.NORMAL_PRICE;
  if (quantity === 2) unitPrice = config.PRICE_FOR_2;
  else if (quantity === 3) unitPrice = config.PRICE_FOR_3_PLUS;
  else if (quantity >= 4) unitPrice = 265000;

  const totalPrice = unitPrice * quantity;
  const regularTotal = 330000 * quantity;
  const totalSavings = regularTotal - totalPrice;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setErrorMsg('Please enter your active phone number.');
      return;
    }
    if (!formData.deliveryAddress.trim()) {
      setErrorMsg('Please provide your complete delivery street address and city/town.');
      return;
    }
    if (!formData.state) {
      setErrorMsg('Please select your state.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const formspreeEndpoint = config.FORMSPREE_ENDPOINT || "https://formspree.io/f/xljevqpk";
    const orderId = 'QCK-' + Date.now().toString().slice(-6);

    try {
      await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          source: 'Quick 30-Sec Order Popup',
          orderId,
          productModel: '5-Burner Gas + Electric Hybrid Cooktop',
          panelSize: '90 × 51 cm',
          quantity,
          unitPrice,
          totalPrice,
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          deliveryAddress: formData.deliveryAddress,
          city: formData.city || formData.state,
          state: formData.state,
          paymentMethod: 'Payment on Delivery',
          timestamp: new Date().toISOString()
        })
      });

      // Fire Meta Pixel Purchase event if available
      if (typeof window !== 'undefined' && (window as any).fbq) {
        try {
          (window as any).fbq('track', 'Purchase', {
            value: totalPrice,
            currency: 'NGN',
            content_name: '5-Burner Built-In Cooktop (Quick Order)',
            content_type: 'product',
            num_items: quantity
          });
        } catch {
          // ignore tracking error
        }
      }

      // Fire TikTok Pixel PlaceAnOrder & CompletePayment events
      if (typeof window !== 'undefined' && (window as any).ttq) {
        try {
          (window as any).ttq.track('PlaceAnOrder', {
            content_id: orderId,
            content_type: 'product',
            content_name: '5-Burner Built-In Cooktop (Quick Order)',
            quantity: quantity,
            price: totalPrice,
            value: totalPrice,
            currency: 'NGN'
          });
          (window as any).ttq.track('CompletePayment', {
            content_id: orderId,
            content_name: '5-Burner Built-In Cooktop (Quick Order)',
            value: totalPrice,
            currency: 'NGN'
          });
        } catch {
          // ignore tracking error
        }
      }

      setIsSubmitted(true);
      onOrderSuccess?.({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        state: formData.state,
        city: formData.city || formData.state,
        quantity,
        total: totalPrice,
        orderId,
        productModel: '5-burner',
        productName: config.PRODUCT_NAME
      });
    } catch {
      setErrorMsg('Network error. Please try again or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeline = getStateDeliveryTimeline(formData.state);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick Order Pop-Up"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-blue-600 flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-4 sm:p-5 text-white flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded tracking-wider mb-1">
                <Sparkles className="w-3 h-3" />
                <span>⚡ 30-SEC QUICK ORDER • FLASH SALE</span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-white tracking-tight uppercase leading-snug">
                5-BURNER HYBRID COOKTOP (90 × 51 CM)
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick order"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1 text-slate-900">
          {isSubmitted ? (
            /* SUCCESS DISPLAY */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-500">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                QUICK ORDER RECEIVED!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you <strong>{formData.fullName}</strong>! Our dispatch coordinator will call you on{' '}
                <strong>{formData.phoneNumber}</strong> shortly to confirm your delivery to{' '}
                <strong>{formData.city}, {formData.state}</strong>.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl max-w-xs mx-auto text-xs space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Quantity:</span>
                  <span>{quantity} Unit(s)</span>
                </div>
                <div className="flex justify-between font-bold text-blue-700">
                  <span>Amount to Pay on Delivery:</span>
                  <span>{formatNaira(totalPrice)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="btn-glow px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase cursor-pointer"
              >
                Close & Return to Page
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Product Card Header */}
              <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-center gap-3">
                <img
                  src="/images/alternative_5burner/cooktop_showroom_active.jpg"
                  alt="5-Burner Cooktop"
                  className="w-16 h-14 sm:w-20 sm:h-16 object-cover rounded-xl border border-blue-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900 truncate">
                      5-Burner Hybrid Cooktop
                    </span>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded shrink-0">
                      90 × 51 cm
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-blue-700 mt-0.5">
                    {formatNaira(totalPrice)}{' '}
                    <span className="text-[11px] font-normal text-slate-500">
                      ({quantity} {quantity === 1 ? 'unit' : 'units'})
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold truncate">
                    ✓ Free Delivery Nationwide • Pay on Delivery
                  </div>
                </div>
              </div>

              {/* TINY QUANTITY BOXES */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  <span>Select Quantity:</span>
                  <span className="text-blue-700 font-bold font-mono">
                    {formatNaira(totalPrice)} Total
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { qty: 1, label: '1 PC', unit: config.NORMAL_PRICE, note: 'SINGLE HOME', discount: null },
                    { qty: 2, label: '2 PCS', unit: config.PRICE_FOR_2, note: 'Save ₦10,000', discount: 'Save ₦10k' },
                    { qty: 3, label: '3 PCS', unit: config.PRICE_FOR_3_PLUS, note: 'Save ₦30,000', discount: 'Save ₦30k' },
                    { qty: 4, label: '4 PCS', unit: 265000, note: 'Save ₦60,000', discount: 'Save ₦60k' },
                  ].map((opt) => {
                    const isSelected = quantity === opt.qty;
                    return (
                      <button
                        key={opt.qty}
                        type="button"
                        onClick={() => setQuantity(opt.qty)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer relative flex flex-col items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50/95 border-2 border-blue-600 shadow-sm ring-1 ring-blue-500/30'
                            : 'bg-white border border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        {opt.discount && (
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 leading-tight mb-0.5">
                            {opt.discount}
                          </span>
                        )}
                        <span className="text-xs sm:text-sm font-black text-slate-900">{opt.label}</span>
                        <span className="text-[11px] font-bold text-blue-700">
                          {formatNaira(opt.unit)} ea
                        </span>
                        <span className={`text-[9px] font-black uppercase mt-1 tracking-tight ${
                          opt.qty === 1
                            ? 'text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded'
                            : 'text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200'
                        }`}>
                          {opt.note}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Critical Warning in Quick Order */}
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-[11px] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  <strong>CRITICAL NOTE:</strong> Please only fill if your cash/transfer is ready and you are available to receive delivery.
                </span>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* FORM FIELDS */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Chief Emeka Adeleke"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number (Active) <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 0801 234 5678 (Active for calls)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      State <span className="text-rose-600">*</span>
                    </label>
                    <select
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    >
                      {NIGERIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st} ({getStateDeliveryTimeline(st).days})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Delivery Street Address & City / Town <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    name="deliveryAddress"
                    rows={2}
                    required
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    placeholder="Enter house/flat number, street name, nearest landmark / bus stop, and city/town"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white resize-none"
                  />
                </div>
              </div>

              {/* Delivery Timeline Pill */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  Estimated Delivery to {formData.state}:
                </span>
                <span className="font-bold text-emerald-700">
                  {timeline.days}
                </span>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-1 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-glow w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl cursor-pointer transition-all disabled:opacity-50 uppercase tracking-tight"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>SUBMIT QUICK ORDER ({formatNaira(totalPrice)})</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>

                {/* 3 Reassurance Badges */}
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <span className="text-[10px] font-bold text-slate-600 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> 12M Warranty
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 flex items-center justify-center gap-1">
                    <Truck className="w-3 h-3 text-blue-600" /> Free Delivery
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-amber-600" /> Pay On Delivery
                  </span>
                </div>
              </div>

              {/* DIRECT CALL OPTION IN QUICK ORDER POPUP */}
              <div className="mt-2 p-3 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs shadow-md border border-slate-700">
                <div className="flex items-center gap-2 text-center sm:text-left">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                    <PhoneCall className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-300 uppercase block">Prefer direct phone call?</span>
                    <span className="text-[11px] text-slate-300">Call our direct sales desk now</span>
                  </div>
                </div>
                <a
                  href={`tel:${(config.PHONE_NUMBER || config.WHATSAPP_NUMBER || '').replace(/\D/g, '')}`}
                  className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase flex items-center justify-center gap-1.5 shadow shrink-0 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 fill-current" />
                  <span>CALL: {config.PHONE_NUMBER || config.WHATSAPP_NUMBER}</span>
                </a>
              </div>

            </form>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 text-center shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="text-[11px] text-slate-400 hover:text-slate-700 underline cursor-pointer"
          >
            I want to read more details first (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
