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
  Sparkles,
  PhoneCall,
  Tag,
  Check,
  Info
} from 'lucide-react';
import { LandingPageConfig, CookerModel } from '../types';
import {
  formatNaira,
  NIGERIAN_STATES,
  getStateDeliveryTimeline,
  calculateCombinedPricing,
  ALTERNATIVE_PRODUCT_CONFIG
} from '../config';

interface QuickOrderPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LandingPageConfig;
  initialModel?: CookerModel;
  onOrderSuccess?: (details: {
    fullName: string;
    phoneNumber: string;
    state: string;
    city: string;
    quantity: number;
    total: number;
    orderId: string;
    productModel?: CookerModel;
    productName?: string;
  }) => void;
  onView2BurnerDetails?: () => void;
}

export const QuickOrderPopupModal: React.FC<QuickOrderPopupModalProps> = ({
  isOpen,
  onClose,
  config,
  initialModel = '5-burner',
  onOrderSuccess,
  onView2BurnerDetails
}) => {
  const [selectedModel, setSelectedModel] = useState<CookerModel>(initialModel);
  const [qty5Burner, setQty5Burner] = useState<number>(1);
  const [qty2Burner, setQty2Burner] = useState<number>(1);
  const [includeAlternativeIn5Burner, setIncludeAlternativeIn5Burner] = useState<boolean>(false);
  const [include5BurnerIn2Burner, setInclude5BurnerIn2Burner] = useState<boolean>(false);

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

  // Calculate effective quantities and pricing
  let effectiveQty5 = 0;
  let effectiveQty2 = 0;
  let effectiveMode: CookerModel = selectedModel;

  if (selectedModel === '5-burner') {
    effectiveQty5 = Math.max(1, qty5Burner);
    effectiveQty2 = includeAlternativeIn5Burner ? Math.max(1, qty2Burner) : 0;
  } else if (selectedModel === '2-burner') {
    effectiveQty2 = Math.max(1, qty2Burner);
    effectiveQty5 = include5BurnerIn2Burner ? Math.max(1, qty5Burner) : 0;
  } else {
    // combo
    effectiveQty5 = Math.max(1, qty5Burner);
    effectiveQty2 = Math.max(1, qty2Burner);
  }

  if (effectiveQty5 > 0 && effectiveQty2 > 0) {
    effectiveMode = 'combo';
  } else if (effectiveQty2 > 0 && effectiveQty5 === 0) {
    effectiveMode = '2-burner';
  } else {
    effectiveMode = '5-burner';
  }

  const pricing = calculateCombinedPricing(effectiveMode, effectiveQty2, effectiveQty5, config);

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
          productModel: pricing.mode,
          productName: pricing.productName,
          itemsSummary: pricing.itemsSummary,
          qty5Burner: pricing.qty5Burner,
          qty2Burner: pricing.qty2Burner,
          totalQuantity: pricing.totalQuantity,
          unitPrice5Burner: pricing.unitPrice5Burner,
          unitPrice2Burner: pricing.unitPrice2Burner,
          comboDiscount: pricing.comboDiscount,
          totalPrice: pricing.total,
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
            value: pricing.total,
            currency: 'NGN',
            content_name: pricing.shortName + ' (Quick Order)',
            content_type: 'product',
            num_items: pricing.totalQuantity
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
            content_name: pricing.shortName + ' (Quick Order)',
            quantity: pricing.totalQuantity,
            price: pricing.total,
            value: pricing.total,
            currency: 'NGN'
          });
          (window as any).ttq.track('CompletePayment', {
            content_id: orderId,
            content_name: pricing.shortName + ' (Quick Order)',
            value: pricing.total,
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
        quantity: pricing.totalQuantity,
        total: pricing.total,
        orderId,
        productModel: pricing.mode,
        productName: pricing.productName
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl max-h-[94vh] bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-blue-600 flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-3.5 sm:p-4 text-white flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] sm:text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded tracking-wider mb-0.5">
                <Sparkles className="w-3 h-3" />
                <span>⚡ 30-SEC QUICK ORDER • FLASH SALE</span>
              </div>
              <h3 className="text-xs sm:text-sm font-black text-white tracking-tight uppercase leading-snug">
                {pricing.isCombo
                  ? 'COMBO ORDER: 5-BURNER + ALTERNATIVE 2-BURNER'
                  : selectedModel === '2-burner'
                  ? 'ALTERNATIVE PRODUCT: 2-FLIP-UP GAS COOKTOP (75 × 45 CM)'
                  : '5-BURNER HYBRID COOKTOP (90 × 51 CM)'}
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
        <div className="overflow-y-auto p-3.5 sm:p-5 space-y-3.5 flex-1 text-slate-900">
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
                <strong>{formData.deliveryAddress}, {formData.city || formData.state}, {formData.state}</strong>.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl max-w-sm mx-auto text-xs space-y-1.5 text-left">
                <div className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-1">
                  <span>Selected Products:</span>
                  <span className="text-blue-700">{pricing.shortName}</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  {pricing.itemsSummary}
                </div>
                {pricing.isCombo && (
                  <div className="flex justify-between font-bold text-emerald-700 text-[11px] pt-0.5">
                    <span>Combo Discount Applied:</span>
                    <span>-₦20,000</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-slate-900 pt-1 text-sm border-t border-slate-200">
                  <span>Amount to Pay on Delivery:</span>
                  <span className="text-emerald-700">{formatNaira(pricing.total)}</span>
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
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* MODEL SELECTOR TABS AT TOP OF POPUP FORM */}
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Choose Cooker Model / Package:
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedModel('5-burner');
                    }}
                    className={`py-2 px-1 text-center rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 ${
                      selectedModel === '5-burner' && !pricing.isCombo
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">5-Burner</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedModel('2-burner');
                    }}
                    className={`py-2 px-1 text-center rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 ${
                      selectedModel === '2-burner' && !pricing.isCombo
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">Alternative 2-B</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedModel('combo');
                      setIncludeAlternativeIn5Burner(true);
                      setInclude5BurnerIn2Burner(true);
                    }}
                    className={`py-2 px-1 text-center rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 ${
                      pricing.isCombo
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
                    }`}
                  >
                    <Tag className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span className="truncate">Both (Save ₦20k)</span>
                  </button>
                </div>
              </div>

              {/* VIEW 1: 5-BURNER MODE */}
              {selectedModel === '5-burner' && (
                <div className="space-y-3">
                  {/* 5-Burner Product Card */}
                  <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-center gap-3">
                    <img
                      src="/images/alternative_5burner/cooktop_showroom_active.jpg"
                      alt="5-Burner Cooktop"
                      className="w-16 h-14 sm:w-20 sm:h-16 object-cover rounded-xl border border-blue-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-black text-slate-900 truncate">
                          5-Burner Hybrid Cooktop
                        </span>
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded shrink-0">
                          90 × 51 cm
                        </span>
                      </div>
                      <div className="text-base sm:text-lg font-black text-blue-700 mt-0.5">
                        {formatNaira(pricing.subtotal5Burner)}{' '}
                        <span className="text-[11px] font-normal text-slate-500">
                          ({pricing.qty5Burner} {pricing.qty5Burner === 1 ? 'unit' : 'units'})
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold truncate">
                        ✓ 4 Gas + 1 Electric Zone • 90° Flip-Up Burners
                      </div>
                    </div>
                  </div>

                  {/* 5-Burner Quantity Selector */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      <span>5-Burner Quantity:</span>
                      <span className="text-blue-700 font-bold font-mono">
                        {formatNaira(pricing.subtotal5Burner)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { qty: 1, label: '1 PC', unit: config.NORMAL_PRICE, note: 'SINGLE HOME', discount: null },
                        { qty: 2, label: '2 PCS', unit: config.PRICE_FOR_2, note: 'Save ₦10,000', discount: 'Save ₦10k' },
                        { qty: 3, label: '3 PCS', unit: config.PRICE_FOR_3_PLUS, note: 'Save ₦30,000', discount: 'Save ₦30k' },
                        { qty: 4, label: '4 PCS', unit: 265000, note: 'Save ₦60,000', discount: 'Save ₦60k' },
                      ].map((opt) => {
                        const isSelected = qty5Burner === opt.qty;
                        return (
                          <button
                            key={opt.qty}
                            type="button"
                            onClick={() => setQty5Burner(opt.qty)}
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

                  {/* ★ PROMINENT: ADD ALTERNATIVE PRODUCT ON THE POPUP QUICK FORM ★ */}
                  <div
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      includeAlternativeIn5Burner
                        ? 'bg-amber-50/90 border-amber-500 shadow-sm ring-1 ring-amber-400/40'
                        : 'bg-slate-50 border-dashed border-slate-300 hover:border-amber-400 hover:bg-amber-50/40'
                    }`}
                    onClick={() => setIncludeAlternativeIn5Burner((prev) => !prev)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center shrink-0">
                        <div
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                            includeAlternativeIn5Burner
                              ? 'bg-amber-500 border-amber-600 text-slate-950 font-bold'
                              : 'bg-white border-slate-300'
                          }`}
                        >
                          {includeAlternativeIn5Burner && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>
                      <img
                        src="/images/suggested_2burner/cooker_white_top.png"
                        alt="Alternative 2-Burner"
                        className="w-14 h-12 object-cover rounded-xl border border-slate-200 shrink-0 bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-400 text-slate-950">
                            ALTERNATIVE PRODUCT
                          </span>
                          <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                            SAVE ₦20,000 COMBO
                          </span>
                        </div>
                        <p className="text-xs font-black text-slate-900 leading-snug mt-0.5">
                          + Add 2-Flip-Up Double Gas Burner (75 × 45 cm)
                        </p>
                        <div className="text-[11px] text-slate-600 flex items-center gap-1">
                          <span className="font-bold text-amber-700">+{formatNaira(ALTERNATIVE_PRODUCT_CONFIG.NORMAL_PRICE)}</span>
                          <span>• Compact model with timer</span>
                        </div>
                      </div>
                    </div>

                    {includeAlternativeIn5Burner && (
                      <div
                        className="mt-3 pt-2.5 border-t border-amber-200/80 flex items-center justify-between gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-[11px] font-bold text-slate-800">
                          Alternative 2-Burner Quantity:
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQty2Burner((q) => Math.max(1, q - 1))}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm cursor-pointer shadow-xs"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-black text-xs text-slate-900">
                            {qty2Burner}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty2Burner((q) => Math.min(10, q + 1))}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm cursor-pointer shadow-xs"
                          >
                            +
                          </button>
                          <span className="text-[11px] font-bold text-amber-900 ml-1">
                            ({formatNaira(pricing.subtotal2Burner)})
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* VIEW 2: ALTERNATIVE 2-BURNER MODE */}
              {selectedModel === '2-burner' && (
                <div className="space-y-3">
                  {/* 2-Burner Product Card */}
                  <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center gap-3">
                    <img
                      src="/images/suggested_2burner/cooker_white_top.png"
                      alt="2-Burner Cooktop"
                      className="w-16 h-14 sm:w-20 sm:h-16 object-cover rounded-xl border border-amber-200 shrink-0 bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-400 text-slate-950">
                          ALTERNATIVE PRODUCT
                        </span>
                        <span className="text-xs font-black text-slate-900 truncate">
                          2-Flip-Up Double Gas Burner
                        </span>
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded shrink-0">
                          75 × 45 cm
                        </span>
                      </div>
                      <div className="text-base sm:text-lg font-black text-amber-800 mt-0.5">
                        {formatNaira(pricing.subtotal2Burner)}{' '}
                        <span className="text-[11px] font-normal text-slate-500">
                          ({pricing.qty2Burner} {pricing.qty2Burner === 1 ? 'unit' : 'units'})
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold truncate">
                        ✓ 90° Flip-Up Clean Burners • Integrated Cooking Timer
                      </div>
                    </div>
                  </div>

                  {/* 2-Burner Quantity Selector */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      <span>Alternative 2-Burner Quantity:</span>
                      <span className="text-amber-800 font-bold font-mono">
                        {formatNaira(pricing.subtotal2Burner)}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { qty: 1, label: '1 PC', unit: ALTERNATIVE_PRODUCT_CONFIG.NORMAL_PRICE, note: 'SINGLE HOME', discount: null },
                        { qty: 2, label: '2 PCS', unit: ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_2, note: 'Save ₦10,000', discount: 'Save ₦10k' },
                        { qty: 3, label: '3 PCS', unit: ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_3_PLUS, note: 'Save ₦30,000', discount: 'Save ₦30k' },
                      ].map((opt) => {
                        const isSelected = qty2Burner === opt.qty;
                        return (
                          <button
                            key={opt.qty}
                            type="button"
                            onClick={() => setQty2Burner(opt.qty)}
                            className={`p-2 rounded-xl border text-center transition-all cursor-pointer relative flex flex-col items-center justify-between ${
                              isSelected
                                ? 'bg-amber-50 border-2 border-amber-600 shadow-sm ring-1 ring-amber-500/30'
                                : 'bg-white border border-slate-200 hover:border-amber-300'
                            }`}
                          >
                            {opt.discount && (
                              <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 leading-tight mb-0.5">
                                {opt.discount}
                              </span>
                            )}
                            <span className="text-xs sm:text-sm font-black text-slate-900">{opt.label}</span>
                            <span className="text-[11px] font-bold text-amber-800">
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

                  {/* Add 5-Burner to 2-Burner Order */}
                  <div
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      include5BurnerIn2Burner
                        ? 'bg-blue-50/90 border-blue-500 shadow-sm ring-1 ring-blue-400/40'
                        : 'bg-slate-50 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/40'
                    }`}
                    onClick={() => setInclude5BurnerIn2Burner((prev) => !prev)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center shrink-0">
                        <div
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                            include5BurnerIn2Burner
                              ? 'bg-blue-600 border-blue-700 text-white font-bold'
                              : 'bg-white border-slate-300'
                          }`}
                        >
                          {include5BurnerIn2Burner && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>
                      <img
                        src="/images/alternative_5burner/cooktop_showroom_active.jpg"
                        alt="5-Burner Hybrid"
                        className="w-14 h-12 object-cover rounded-xl border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-blue-600 text-white">
                            FLAGSHIP 5-BURNER
                          </span>
                          <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                            SAVE ₦20,000 COMBO
                          </span>
                        </div>
                        <p className="text-xs font-black text-slate-900 leading-snug mt-0.5">
                          + Add 5-Burner Hybrid Cooktop (90 × 51 cm)
                        </p>
                        <div className="text-[11px] text-slate-600 flex items-center gap-1">
                          <span className="font-bold text-blue-700">+{formatNaira(config.NORMAL_PRICE)}</span>
                          <span>• 4 Gas + 1 Electric zone</span>
                        </div>
                      </div>
                    </div>

                    {include5BurnerIn2Burner && (
                      <div
                        className="mt-3 pt-2.5 border-t border-blue-200/80 flex items-center justify-between gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-[11px] font-bold text-slate-800">
                          5-Burner Quantity:
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQty5Burner((q) => Math.max(1, q - 1))}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm cursor-pointer shadow-xs"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-black text-xs text-slate-900">
                            {qty5Burner}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty5Burner((q) => Math.min(10, q + 1))}
                            className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-sm cursor-pointer shadow-xs"
                          >
                            +
                          </button>
                          <span className="text-[11px] font-bold text-blue-900 ml-1">
                            ({formatNaira(pricing.subtotal5Burner)})
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* VIEW 3: COMBO PACK MODE */}
              {selectedModel === 'combo' && (
                <div className="space-y-3">
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold">
                      <Tag className="w-4 h-4 text-emerald-600 fill-current" />
                      <span>Special Combo Discount: ₦20,000 OFF Applied!</span>
                    </div>
                    <span className="text-[10px] font-black uppercase bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                      BEST VALUE
                    </span>
                  </div>

                  {/* 5-Burner in Combo */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src="/images/alternative_5burner/cooktop_showroom_active.jpg"
                        alt="5-Burner"
                        className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-black text-slate-900 truncate">5-Burner Hybrid (90×51cm)</div>
                        <div className="text-[11px] font-bold text-blue-700">{formatNaira(pricing.subtotal5Burner)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => setQty5Burner((q) => Math.max(1, q - 1))}
                        className="w-6 h-6 rounded-md bg-white border border-slate-300 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="w-5 text-center font-black text-xs">{qty5Burner}</span>
                      <button
                        type="button"
                        onClick={() => setQty5Burner((q) => Math.min(10, q + 1))}
                        className="w-6 h-6 rounded-md bg-white border border-slate-300 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 2-Burner in Combo */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src="/images/suggested_2burner/cooker_white_top.png"
                        alt="2-Burner"
                        className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0 bg-white"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-black text-slate-900 truncate">Alternative 2-Burner (75×45cm)</div>
                        <div className="text-[11px] font-bold text-amber-800">{formatNaira(pricing.subtotal2Burner)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => setQty2Burner((q) => Math.max(1, q - 1))}
                        className="w-6 h-6 rounded-md bg-white border border-slate-300 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="w-5 text-center font-black text-xs">{qty2Burner}</span>
                      <button
                        type="button"
                        onClick={() => setQty2Burner((q) => Math.min(10, q + 1))}
                        className="w-6 h-6 rounded-md bg-white border border-slate-300 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* LIVE PRICING & ORDER BREAKDOWN PILL */}
              <div className="p-3 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl space-y-1.5 text-xs shadow-md">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="truncate pr-2">Order Items:</span>
                  <span className="font-bold text-white text-right shrink-0">
                    {pricing.shortName} ({pricing.totalQuantity} unit{pricing.totalQuantity > 1 ? 's' : ''})
                  </span>
                </div>

                {pricing.isCombo && (
                  <>
                    <div className="flex justify-between items-center text-slate-300 text-[11px]">
                      <span>5-Burner ({pricing.qty5Burner}x):</span>
                      <span>{formatNaira(pricing.subtotal5Burner)}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300 text-[11px]">
                      <span>Alternative 2-Burner ({pricing.qty2Burner}x):</span>
                      <span>{formatNaira(pricing.subtotal2Burner)}</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-400 font-bold text-[11px] border-t border-slate-700 pt-1">
                      <span>Combo Savings:</span>
                      <span>-₦20,000 OFF</span>
                    </div>
                  </>
                )}

                <div className="flex justify-between items-center font-black text-sm pt-1 border-t border-slate-700/80">
                  <span className="text-amber-400">Total Due on Delivery:</span>
                  <span className="text-emerald-400 text-base">{formatNaira(pricing.total)}</span>
                </div>
              </div>

              {/* Critical Note */}
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
                      <span>SUBMIT QUICK ORDER ({formatNaira(pricing.total)})</span>
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
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
          {onView2BurnerDetails && (
            <button
              type="button"
              onClick={onView2BurnerDetails}
              className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>View 2-Burner Alternative Specs</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-[11px] text-slate-400 hover:text-slate-700 underline cursor-pointer ml-auto"
          >
            I want to read more details first (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
