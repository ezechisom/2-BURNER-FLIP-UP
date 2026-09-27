import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, AlertCircle, AlertTriangle, Ban, Plus, Minus, Truck, Sparkles, Flame, Zap, Layers, PhoneCall } from 'lucide-react';
import { LandingPageConfig, OrderFormData, CookerModel } from '../types';
import {
  formatNaira,
  calculateCombinedPricing,
  formatWhatsAppNumber,
  NIGERIAN_STATES,
  getStateDeliveryTimeline,
  ALTERNATIVE_PRODUCT_CONFIG,
  TWO_BURNER_CONFIG
} from '../config';

interface OrderFormSectionProps {
  config: LandingPageConfig;
  initialQuantity?: number;
  initialModel?: CookerModel;
  onOrderSuccess?: (details: {
    fullName: string;
    phoneNumber: string;
    state: string;
    city: string;
    quantity: number;
    total: number;
    orderId: string;
    productModel: CookerModel;
    productName: string;
    qty2Burner?: number;
    qty5Burner?: number;
  }) => void;
  onResetOrder?: () => void;
  onView2BurnerDetails?: () => void;
}

export const OrderFormSection: React.FC<OrderFormSectionProps> = ({
  config,
  initialQuantity = 1,
  initialModel = '5-burner',
  onOrderSuccess,
  onResetOrder,
  onView2BurnerDetails
}) => {
  const [selectedModel, setSelectedModel] = useState<CookerModel>(initialModel);
  const [qty2Burner, setQty2Burner] = useState<number>(
    initialModel === '2-burner' ? Math.max(1, initialQuantity) : (initialModel === 'combo' ? 1 : 0)
  );
  const [qty5Burner, setQty5Burner] = useState<number>(
    initialModel === '2-burner' ? 0 : (initialModel === 'combo' ? 1 : Math.max(1, initialQuantity))
  );

  const [formData, setFormData] = useState<Omit<OrderFormData, 'quantity' | 'productModel'>>({
    fullName: '',
    phoneNumber: '',
    whatsappNumber: '',
    deliveryAddress: '',
    city: '',
    state: 'Lagos',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialModel) {
      setSelectedModel(initialModel);
      if (initialModel === 'combo') {
        setQty2Burner(1);
        setQty5Burner(1);
      } else if (initialModel === '2-burner') {
        setQty2Burner(initialQuantity >= 1 ? initialQuantity : 1);
        setQty5Burner(0);
      } else {
        setQty2Burner(0);
        setQty5Burner(initialQuantity >= 1 ? initialQuantity : 1);
      }
    }
  }, [initialModel, initialQuantity]);

  const handleSelectModelType = (model: CookerModel) => {
    setSelectedModel(model);
    if (model === 'combo') {
      setQty2Burner((prev) => (prev > 0 ? prev : 1));
      setQty5Burner((prev) => (prev > 0 ? prev : 1));
    } else if (model === '2-burner') {
      setQty2Burner((prev) => (prev > 0 ? prev : 1));
      setQty5Burner(0);
    } else {
      setQty2Burner(0);
      setQty5Burner((prev) => (prev > 0 ? prev : 1));
    }
  };

  const pricing = calculateCombinedPricing(selectedModel, qty2Burner, qty5Burner, config);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate quantities
    if (pricing.totalQuantity <= 0) {
      setErrorMsg('Please select at least 1 cooker unit to order.');
      return;
    }

    // Validate required fields
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setErrorMsg('Please provide your active phone number.');
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
    const orderId = 'ORD-' + Date.now().toString().slice(-6);

    try {
      // Send buyer details directly to Formspree
      await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderId,
          productModel: pricing.mode,
          product: pricing.productName,
          itemsOrdered: pricing.itemsSummary,
          qty2Burner: `${pricing.qty2Burner} unit(s)`,
          qty5Burner: `${pricing.qty5Burner} unit(s)`,
          totalQuantity: `${pricing.totalQuantity} unit(s)`,
          comboDiscount: pricing.comboDiscount > 0 ? formatNaira(pricing.comboDiscount) : 'None',
          totalAmount: formatNaira(pricing.total),
          fullName: formData.fullName.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          whatsappNumber: (formData.whatsappNumber || formData.phoneNumber).trim(),
          deliveryAddress: formData.deliveryAddress.trim(),
          city: formData.city.trim(),
          state: formData.state,
          email: formData.email ? formData.email.trim() : 'Not provided',
          _subject: `New Order #${orderId}: ${pricing.shortName} (${pricing.totalQuantity} units) - ${formData.fullName.trim()} (${formData.city.trim()}, ${formData.state})`
        })
      });
    } catch (err) {
      console.error('Error dispatching order to Formspree:', err);
    } finally {
      // Save order to localStorage for merchant records
      try {
        const existingOrders = JSON.parse(localStorage.getItem('burner_orders') || '[]');
        const newOrder = {
          id: orderId,
          ...formData,
          productModel: pricing.mode,
          productName: pricing.productName,
          itemsOrdered: pricing.itemsSummary,
          qty2Burner: pricing.qty2Burner,
          qty5Burner: pricing.qty5Burner,
          quantity: pricing.totalQuantity,
          totalPrice: pricing.total,
          comboDiscount: pricing.comboDiscount,
          createdAt: new Date().toISOString()
        };
        existingOrders.unshift(newOrder);
        localStorage.setItem('burner_orders', JSON.stringify(existingOrders));
      } catch {
        // storage fallback
      }

      // Trigger Meta Pixel Purchase and Lead events
      if (typeof window !== 'undefined' && (window as any).fbq) {
        try {
          (window as any).fbq('track', 'Purchase', {
            value: pricing.total,
            currency: 'NGN',
            content_name: pricing.productName,
            content_type: 'product',
            num_items: pricing.totalQuantity,
            order_id: orderId
          });
          (window as any).fbq('track', 'Lead');
        } catch (pixelErr) {
          console.error('Meta Pixel event dispatch error:', pixelErr);
        }
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      onOrderSuccess?.({
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        state: formData.state,
        city: formData.city.trim(),
        quantity: pricing.totalQuantity,
        total: pricing.total,
        orderId,
        productModel: pricing.mode,
        productName: pricing.productName,
        qty2Burner: pricing.qty2Burner,
        qty5Burner: pricing.qty5Burner
      });

      // Smooth scroll to success message
      setTimeout(() => {
        const orderSection = document.getElementById('order-form-section');
        if (orderSection) {
          orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const orderWhatsAppUrl = () => {
    const cleanNumber = formatWhatsAppNumber(config.WHATSAPP_NUMBER);
    let itemsText = '';
    if (pricing.qty2Burner > 0 && pricing.qty5Burner > 0) {
      itemsText = `BOTH COOKERS (COMBO PACK):\n• ${pricing.qty2Burner}x 2-Flip-Up Double Burner (75 × 45 cm)\n• ${pricing.qty5Burner}x 5-Burner Built-In Gas + Electric (90 × 51 cm)`;
    } else if (pricing.qty5Burner > 0) {
      itemsText = `${pricing.qty5Burner} unit(s) of 5-Burner Built-In Gas + Electric Cooktop (90 × 51 cm)`;
    } else {
      itemsText = `${pricing.qty2Burner} unit(s) of 2-Flip-Up Double Gas Burner (75 × 45 cm)`;
    }

    const msg = `Hello! I just placed an order on your website.\n\nOrder ID: #${'ORD-' + Date.now().toString().slice(-6)}\nProduct: ${itemsText}\nTotal Payable: ${formatNaira(pricing.total)}\nName: ${formData.fullName}\nPhone: ${formData.phoneNumber}\nDelivery Destination: ${formData.deliveryAddress}, ${formData.city}, ${formData.state}\n\nPlease confirm my delivery dispatch.`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
  };

  const handlePlaceAnotherOrder = () => {
    setIsSubmitted(false);
    onResetOrder?.();
  };

  return (
    <section id="order-form-section" className="py-14 sm:py-20 px-4 bg-slate-50 text-slate-900 relative">
      <div className="max-w-3xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Direct Order Request</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            PLACE YOUR ORDER NOW
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Choose your preferred model or order both cookers together with our special combo discount. Free nationwide delivery across Nigeria.
          </p>
        </div>

        {/* ORDER SUCCESS DISPLAY */}
        {isSubmitted ? (
          <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 sm:p-10 shadow-2xl text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest block mb-1">
              Order Registered Successfully
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              ORDER RECEIVED!
            </h3>

            <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
              Thank you for your order. Our team will contact you shortly on your phone number to confirm your order details and delivery dispatch timeline.
            </p>

            {/* Order Summary Receipt Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto mb-8 space-y-2.5 text-xs sm:text-sm">
              <div className="pb-2 border-b border-slate-200">
                <span className="text-slate-500 block text-[11px] uppercase tracking-wider font-semibold">Items Ordered:</span>
                <div className="mt-1 space-y-1">
                  {pricing.qty2Burner > 0 && (
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span className="flex items-center gap-1.5 text-blue-800">
                        <Flame className="w-3.5 h-3.5 text-blue-600" />
                        2-Flip-Up Burner (75 × 45 cm)
                      </span>
                      <span>{pricing.qty2Burner} Unit(s)</span>
                    </div>
                  )}
                  {pricing.qty5Burner > 0 && (
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span className="flex items-center gap-1.5 text-amber-900">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        5-Burner Hybrid (90 × 51 cm)
                      </span>
                      <span>{pricing.qty5Burner} Unit(s)</span>
                    </div>
                  )}
                </div>
              </div>

              {pricing.comboDiscount > 0 && (
                <div className="flex justify-between pb-2 border-b border-slate-200 text-emerald-700 font-bold">
                  <span>Combo Bonus Savings:</span>
                  <span>- {formatNaira(pricing.comboDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Customer Name:</span>
                <span className="font-semibold text-slate-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Contact Phone:</span>
                <span className="font-semibold text-slate-900">{formData.phoneNumber}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Delivery Destination:</span>
                <span className="font-semibold text-slate-900">{formData.city}, {formData.state}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm sm:text-base">
                <span className="font-bold text-slate-700">Total Payable:</span>
                <span className="font-black text-blue-700">{formatNaira(pricing.total)}</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold text-center pt-1">
                ✓ Free Nationwide Delivery Included • Pay on Delivery
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 max-w-md mx-auto mb-6 text-center">
              <p className="text-emerald-900 text-xs sm:text-sm font-semibold mb-3">
                ⚡ <strong className="text-emerald-800">Fast-Track Your Dispatch:</strong> Click below to confirm your delivery address directly with our warehouse team on WhatsApp.
              </p>
              <a
                href={orderWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow-emerald w-full inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-sm sm:text-base py-4 px-6 rounded-xl shadow-xl transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>CONFIRM ORDER ON WHATSAPP</span>
              </a>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handlePlaceAnotherOrder}
                className="text-slate-500 hover:text-slate-800 text-xs py-2 px-4 underline cursor-pointer transition-colors"
              >
                Need another order? Click here to fill a new form
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* 3 CORE ASSURANCE PILLARS DIRECTLY NEAR THE FORM */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              
              {/* Pillar 1: 12 Months Warranty */}
              <div className="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black uppercase text-emerald-950 tracking-tight">
                    12 MONTHS WARRANTY
                  </h4>
                  <p className="text-[11px] text-emerald-800 leading-snug mt-0.5 font-medium">
                    100% manufacturer warranty. Free repair or replacement for factory defects.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Free Delivery Nationwide */}
              <div className="bg-blue-50/90 border-2 border-blue-300 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Truck className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black uppercase text-blue-950 tracking-tight">
                    FREE DELIVERY NATIONWIDE
                  </h4>
                  <p className="text-[11px] text-blue-800 leading-snug mt-0.5 font-medium">
                    Zero shipping fee to all 36 states and Abuja. Delivered straight to your doorstep.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Payment on Delivery */}
              <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black uppercase text-amber-950 tracking-tight">
                    PAYMENT ON DELIVERY
                  </h4>
                  <p className="text-[11px] text-amber-900 leading-snug mt-0.5 font-medium">
                    No advance payment. Inspect your cooker physically upon delivery before paying.
                  </p>
                </div>
              </div>

            </div>

            {/* CRITICAL WARNING MESSAGE BEFORE THE FORM */}
            <div
              id="critical-warning-banner"
              className="mb-6 rounded-3xl bg-gradient-to-br from-rose-50 via-red-50/80 to-amber-50 border-2 border-rose-500 p-5 sm:p-7 shadow-xl relative overflow-hidden"
            >
              {/* Corner alert accent */}
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <AlertTriangle className="w-7 h-7 text-yellow-300 animate-pulse" />
                </div>

                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-black uppercase tracking-wider mb-2 shadow-xs">
                    <Ban className="w-3.5 h-3.5" />
                    <span>CRITICAL WARNING • READ CAREFULLY BEFORE FILLING</span>
                  </div>

                  <h3 className="text-base sm:text-xl font-black text-rose-950 uppercase tracking-tight leading-snug mb-2">
                    PLEASE DO NOT FILL THIS FORM IF YOU ARE NOT READY TO BUY YET!
                  </h3>

                  <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-medium mb-3">
                    We spend significant delivery and courier logistics funds to dispatch and insure each cooker to your doorstep anywhere in Nigeria.
                    <strong> Unserious orders or buyers who are not available upon delivery cause immense financial loss to our business.</strong>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                    <div className="p-3 rounded-xl bg-white/95 border border-rose-200 text-slate-800 shadow-2xs">
                      <div className="flex items-center gap-1.5 font-bold text-rose-700 mb-1">
                        <Ban className="w-4 h-4 shrink-0 text-rose-600" />
                        <span>Money Not Ready</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-tight">
                        Do NOT order if you do not currently have the payment funds in hand or in your bank account.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/95 border border-rose-200 text-slate-800 shadow-2xs">
                      <div className="flex items-center gap-1.5 font-bold text-rose-700 mb-1">
                        <Ban className="w-4 h-4 shrink-0 text-rose-600" />
                        <span>Traveling Soon</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-tight">
                        Do NOT order if you will be traveling outside your state within the next 1 to 4 business days.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/95 border border-rose-200 text-slate-800 shadow-2xs">
                      <div className="flex items-center gap-1.5 font-bold text-rose-700 mb-1">
                        <Ban className="w-4 h-4 shrink-0 text-rose-600" />
                        <span>Not Reachable</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-tight">
                        Do NOT order if you won't pick up your phone when our delivery dispatch team calls you.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-950 flex items-center gap-2.5 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      Please ONLY fill the form below if you are 100% READY, AVAILABLE, and COMMITTED to receiving your package.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIVE FORM CONTAINER */}
            <div className="bg-white border-2 border-blue-200/90 rounded-3xl p-6 sm:p-8 shadow-xl">
              
              <form
                action={config.FORMSPREE_ENDPOINT || "https://formspree.io/f/xljevqpk"}
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                
                {/* Form Top Guarantee Bar */}
                <div className="bg-slate-950 text-white rounded-2xl p-3 flex flex-wrap items-center justify-around gap-2 text-center text-xs font-bold shadow-md border border-slate-800">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" /> 12 Months Warranty
                  </span>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5 text-sky-300">
                    <Truck className="w-4 h-4" /> Free Delivery Nationwide
                  </span>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <CheckCircle2 className="w-4 h-4" /> Payment on Delivery
                  </span>
                </div>

                {/* Error Box */}
                {errorMsg && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>{errorMsg}</span>
                  </div>
                )}

              {/* STEP 1: QUANTITY SELECTION FOR THE 5-BURNER HYBRID COOKTOP */}
              {selectedModel === '2-burner' ? (
                /* 2-BURNER COOKTOP ORDER VIEW (ONLY SHOWN IF CUSTOMER CLICKED TO SEE 2-BURNER DETAILS) */
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-black shadow-xs">
                        <Flame className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                          Selected from Details
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900">
                          2-Burner Flip-Up Double Gas Cooktop (75 × 45 cm)
                        </h4>
                        <p className="text-[11px] text-amber-900 mt-0.5">
                          {formatNaira(pricing.unitPrice2Burner)} each • Tabletop & Flush Built-in Dual-Purpose
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectModelType('5-burner')}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer shrink-0"
                    >
                      ← Switch back to 5-Burner Flagship
                    </button>
                  </div>

                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
                    <span>Set Quantity for 2-Burner Cooktop:</span>
                    <span className="text-slate-500 font-normal">Choose 1 to 5 units</span>
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-3">
                    {[1, 2, 3, 4, 5].map((qtyVal) => {
                      const isSelected = qty2Burner === qtyVal || (qtyVal === 5 && qty2Burner >= 5);
                      let unitRate = ALTERNATIVE_PRODUCT_CONFIG.NORMAL_PRICE;
                      if (qtyVal === 2) unitRate = ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_2;
                      else if (qtyVal >= 3) unitRate = ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_3_PLUS;

                      return (
                        <button
                          type="button"
                          key={qtyVal}
                          onClick={() => setQty2Burner(qtyVal)}
                          className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 border-amber-500 font-black shadow-md scale-102 ring-2 ring-amber-400/40'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-300'
                          }`}
                        >
                          <span className="text-base sm:text-lg font-bold">
                            {qtyVal === 5 ? '5+ PCS' : `${qtyVal} PC`}
                          </span>
                          <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-950 font-bold' : 'text-amber-800 font-medium'}`}>
                            {formatNaira(unitRate)} ea
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div className="text-xs text-slate-600">
                      Units of 2-Burner (75×45cm): <strong className="text-slate-900 text-sm ml-1">{qty2Burner}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQty2Burner((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
                        aria-label="Decrease 2-burner quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-slate-900 font-mono">
                        {qty2Burner}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty2Burner((q) => q + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
                        aria-label="Increase 2-burner quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* DEFAULT 5-BURNER ORDER VIEW (NO 2-BURNER CLUTTER) */
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center justify-between">
                    <span>Select Quantity for 5-Burner Hybrid Cooktop (90 × 51 cm):</span>
                    <span className="text-[11px] font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Wholesale Tier Rates
                    </span>
                  </label>

                  {/* 3 Tier Choices */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <button
                      type="button"
                      onClick={() => setQty5Burner(1)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        qty5Burner === 1
                          ? 'border-blue-600 bg-blue-50/90 shadow-md ring-2 ring-blue-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-500 block uppercase">1 Unit</span>
                      <div className="text-xl font-black text-slate-900 mt-1">
                        {formatNaira(config.NORMAL_PRICE)}
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-0.5">Regular single rate</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQty5Burner(2)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                        qty5Burner === 2
                          ? 'border-blue-600 bg-blue-50/90 shadow-md ring-2 ring-blue-500/20'
                          : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <span className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        Save ₦10,000
                      </span>
                      <span className="text-xs font-bold text-blue-700 block uppercase">2 Units</span>
                      <div className="text-xl font-black text-blue-700 mt-1">
                        {formatNaira(config.PRICE_FOR_2)}{' '}
                        <span className="text-[10px] font-medium text-slate-500">EACH</span>
                      </div>
                      <span className="text-[11px] text-slate-600 block mt-0.5">
                        {formatNaira(config.PRICE_FOR_2 * 2)} Total for 2
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQty5Burner((q) => (q >= 3 ? q : 3))}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                        qty5Burner >= 3
                          ? 'border-blue-600 bg-blue-50/90 shadow-md ring-2 ring-blue-500/20'
                          : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <span className="absolute -top-2.5 right-3 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs">
                        Best Value
                      </span>
                      <span className="text-xs font-bold text-blue-800 block uppercase">3+ Units</span>
                      <div className="text-xl font-black text-blue-800 mt-1">
                        {formatNaira(config.PRICE_FOR_3_PLUS)}{' '}
                        <span className="text-[10px] font-medium text-slate-500">EACH</span>
                      </div>
                      <span className="text-[11px] text-slate-600 block mt-0.5">
                        Wholesale savings
                      </span>
                    </button>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div className="text-xs text-slate-600">
                      Selected 5-Burner Quantity: <strong className="text-slate-900 text-sm ml-1">{qty5Burner} Unit(s)</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQty5Burner((q) => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
                        aria-label="Decrease 5-burner quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold text-slate-900 font-mono">
                        {qty5Burner}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty5Burner((q) => q + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
                        aria-label="Increase 5-burner quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Subtle link to 2-burner details if requested */}
                  {onView2BurnerDetails && (
                    <div className="mt-2.5 text-center">
                      <p className="text-[11px] text-slate-500">
                        Looking for the compact 2-Burner Cooker (75 × 45 cm) instead?{' '}
                        <button
                          type="button"
                          onClick={onView2BurnerDetails}
                          className="text-blue-700 hover:text-blue-900 underline font-bold cursor-pointer"
                        >
                          Click here to view 2-Burner details & photos
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* DYNAMIC ITEMIZED CALCULATION BANNER */}
              <div className={`border-2 rounded-2xl p-4 sm:p-5 shadow-sm ${
                pricing.isCombo || (qty2Burner > 0 && qty5Burner > 0)
                  ? 'bg-emerald-50/80 border-emerald-300'
                  : selectedModel === '5-burner'
                  ? 'bg-amber-50/80 border-amber-300'
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-xs uppercase tracking-widest block font-bold text-slate-800">
                      ORDER SUMMARY & TOTAL CALCULATION
                    </span>
                    <div className="text-xs text-slate-600 mt-1 space-y-0.5">
                      {pricing.qty2Burner > 0 && (
                        <div>• 2-Burner Flip-Up (75 × 45 cm): {pricing.qty2Burner} × {formatNaira(pricing.unitPrice2Burner)} = <strong className="text-slate-900">{formatNaira(pricing.subtotal2Burner)}</strong></div>
                      )}
                      {pricing.qty5Burner > 0 && (
                        <div>• 5-Burner Hybrid (90 × 51 cm): {pricing.qty5Burner} × {formatNaira(pricing.unitPrice5Burner)} = <strong className="text-slate-900">{formatNaira(pricing.subtotal5Burner)}</strong></div>
                      )}
                      {pricing.comboDiscount > 0 && (
                        <div className="text-emerald-700 font-bold">• Combo Bundle Bonus Discount: -{formatNaira(pricing.comboDiscount)}</div>
                      )}
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-[11px] text-slate-500 block font-semibold uppercase">TOTAL PAYABLE</span>
                    <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                      {formatNaira(pricing.total)}
                    </div>
                    {pricing.savings > 0 && (
                      <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        Total Savings: {formatNaira(pricing.savings)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <Truck className="w-3.5 h-3.5" /> FREE Nationwide Delivery Included
                  </span>
                  <span className="text-slate-500 font-medium">
                    Pay on Delivery Available
                  </span>
                </div>
              </div>

              {/* STEP 3: FORM FIELDS */}
              <div className="space-y-4 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Step 3: Enter Delivery Details
                </label>

                {/* FULL NAME */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-medium text-slate-600 mb-1">
                    FULL NAME <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Adebayo Ogunlesi"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>

                {/* PHONE NUMBER (ACTIVE) */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    PHONE NUMBER (ACTIVE) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 0801 234 5678 (Active for phone calls & dispatch)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>

                {/* DELIVERY STREET ADDRESS & CITY/TOWN */}
                <div>
                  <label htmlFor="deliveryAddress" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    DELIVERY STREET ADDRESS & CITY / TOWN <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="deliveryAddress"
                    name="deliveryAddress"
                    rows={3}
                    required
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your house/flat number, street name, nearest landmark / bus stop, and city/town"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* STATE */}
                <div>
                  <label htmlFor="state" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    SELECT STATE <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  >
                    {NIGERIAN_STATES.map((st) => {
                      const info = getStateDeliveryTimeline(st);
                      return (
                        <option key={st} value={st}>
                          {st} — Estimated: {info.days}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* DYNAMIC ESTIMATED DELIVERY TIMELINE FOR SELECTED STATE */}
                {formData.state && (
                  <div className="p-3.5 bg-gradient-to-r from-blue-50/90 via-sky-50/80 to-emerald-50/70 border border-blue-200 rounded-2xl flex items-start gap-3 shadow-2xs animate-in fade-in duration-200">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Truck className="w-4 h-4 stroke-[2.3]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-black uppercase text-blue-950 flex items-center gap-1.5">
                          <span>Estimated Delivery to {formData.state}:</span>
                          <span className="text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md text-[11px] font-bold">
                            {getStateDeliveryTimeline(formData.state).days}
                          </span>
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          {getStateDeliveryTimeline(formData.state).badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">
                        {getStateDeliveryTimeline(formData.state).note} You will be contacted by our dispatch team prior to arrival. Pay on delivery is 100% accepted.
                      </p>
                    </div>
                  </div>
                )}

                {/* OPTIONAL EMAIL ADDRESS */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-600 mb-1">
                    EMAIL ADDRESS <span className="text-slate-400">(Optional for receipt)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. adebayo@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-order-btn"
                  className={`btn-glow w-full font-black text-base sm:text-lg py-4 px-6 rounded-xl shadow-xl transition-all flex flex-col items-center justify-center cursor-pointer ${
                    pricing.isCombo || (qty2Burner > 0 && qty5Burner > 0)
                      ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white disabled:bg-slate-400'
                      : selectedModel === '5-burner'
                      ? 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 disabled:bg-slate-400'
                      : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white disabled:bg-slate-400'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 text-white">
                      Processing Your Order...
                    </span>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span>CONFIRM ORDER ({formatNaira(pricing.total)})</span>
                        <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mt-0.5 opacity-90">
                        <Truck className="w-3.5 h-3.5" /> FREE NATIONWIDE DELIVERY • PAY ON DELIVERY
                      </div>
                    </>
                  )}
                </button>
              </div>

              {/* Privacy & Guarantee note */}
              <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Your contact details are encrypted and used solely for delivery confirmation.</span>
              </div>

              {/* 3 Reassurance Badges Directly Below Submit Button */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200">
                <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-[11px] font-bold text-emerald-950 flex items-center justify-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>12 Months Warranty</span>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 text-[11px] font-bold text-blue-950 flex items-center justify-center gap-1.5 shadow-2xs">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Free Delivery Nationwide</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] font-bold text-amber-950 flex items-center justify-center gap-1.5 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Payment on Delivery</span>
                </div>
              </div>

              {/* DIRECT CALL OPTION UNDER THE FORM */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3.5 shadow-lg border-2 border-amber-400/40">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                    <PhoneCall className="w-5 h-5 fill-current animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase text-amber-300 tracking-wider block">
                      PREFER TO PLACE ORDER BY DIRECT CALL?
                    </span>
                    <p className="text-xs text-slate-200 font-medium">
                      Call our dispatch line directly to order or ask questions:
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${(config.PHONE_NUMBER || config.WHATSAPP_NUMBER || '').replace(/\D/g, '')}`}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-tight flex items-center justify-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 fill-current" />
                  <span>CALL US: {config.PHONE_NUMBER || config.WHATSAPP_NUMBER}</span>
                </a>
              </div>

            </form>
          </div>
        </div>
      )}

      </div>
    </section>
  );
};
