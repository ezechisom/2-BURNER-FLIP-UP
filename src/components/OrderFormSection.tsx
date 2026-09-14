import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, AlertCircle, Plus, Minus, Truck, Sparkles, Flame, Zap, Layers } from 'lucide-react';
import { LandingPageConfig, OrderFormData, CookerModel } from '../types';
import {
  formatNaira,
  calculateCombinedPricing,
  formatWhatsAppNumber,
  NIGERIAN_STATES,
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
}

export const OrderFormSection: React.FC<OrderFormSectionProps> = ({
  config,
  initialQuantity = 1,
  initialModel = '2-burner',
  onOrderSuccess,
  onResetOrder
}) => {
  const [selectedModel, setSelectedModel] = useState<CookerModel>(initialModel);
  const [qty2Burner, setQty2Burner] = useState<number>(
    initialModel === '5-burner' ? 0 : (initialModel === 'combo' ? 1 : Math.max(1, initialQuantity))
  );
  const [qty5Burner, setQty5Burner] = useState<number>(
    initialModel === '5-burner' ? Math.max(1, initialQuantity) : (initialModel === 'combo' ? 1 : 0)
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
      } else if (initialModel === '5-burner') {
        setQty2Burner(0);
        setQty5Burner(initialQuantity >= 1 ? initialQuantity : 1);
      } else {
        setQty2Burner(initialQuantity >= 1 ? initialQuantity : 1);
        setQty5Burner(0);
      }
    }
  }, [initialModel, initialQuantity]);

  const handleSelectModelType = (model: CookerModel) => {
    setSelectedModel(model);
    if (model === 'combo') {
      setQty2Burner((prev) => (prev > 0 ? prev : 1));
      setQty5Burner((prev) => (prev > 0 ? prev : 1));
    } else if (model === '5-burner') {
      setQty2Burner(0);
      setQty5Burner((prev) => (prev > 0 ? prev : 1));
    } else {
      setQty2Burner((prev) => (prev > 0 ? prev : 1));
      setQty5Burner(0);
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
      setErrorMsg('Please provide a valid phone number.');
      return;
    }
    if (!formData.deliveryAddress.trim()) {
      setErrorMsg('Please provide your complete delivery street address.');
      return;
    }
    if (!formData.city.trim()) {
      setErrorMsg('Please enter your city/town.');
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
          /* ACTIVE FORM CONTAINER */
          <div className="bg-white border border-blue-200/80 rounded-3xl p-6 sm:p-8 shadow-xl">
            
            <form
              action={config.FORMSPREE_ENDPOINT || "https://formspree.io/f/xljevqpk"}
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              
              {/* Error Box */}
              {errorMsg && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* STEP 1: CHOOSE COOKER OR ORDER BOTH */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center justify-between">
                  <span>Step 1: Select What You Want to Order</span>
                  <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Combo Available
                  </span>
                </label>

                {/* 3 Choice Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  
                  {/* OPTION 1: 2-FLIP-UP GAS BURNER */}
                  <button
                    type="button"
                    onClick={() => handleSelectModelType('2-burner')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      selectedModel === '2-burner' && qty2Burner > 0 && qty5Burner === 0
                        ? 'border-blue-600 bg-blue-50/90 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          <Flame className="w-3 h-3 text-blue-600 fill-current" />
                          75 × 45 cm Panel
                        </span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          selectedModel === '2-burner' && qty2Burner > 0 && qty5Burner === 0 ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                        }`}>
                          {selectedModel === '2-burner' && qty2Burner > 0 && qty5Burner === 0 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>

                      <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                        2-Flip-Up Double Burner
                      </h4>
                      <div className="mt-1 text-[11px] text-blue-700 font-semibold">
                        Panel Size: 75 by 45 cm
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                        2 gas cooking zones, 90° flip-up burners, digital LED timer & tempered glass.
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200 flex items-baseline justify-between">
                      <span className="text-[10px] text-slate-500 font-medium">From</span>
                      <strong className="text-sm font-black text-blue-700">
                        {formatNaira(config.PRICE_FOR_3_PLUS)} - {formatNaira(config.NORMAL_PRICE)}
                      </strong>
                    </div>
                  </button>

                  {/* OPTION 2: 5-BURNER GAS + ELECTRIC HYBRID */}
                  <button
                    type="button"
                    onClick={() => handleSelectModelType('5-burner')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      selectedModel === '5-burner' && qty5Burner > 0 && qty2Burner === 0
                        ? 'border-amber-500 bg-amber-50/90 shadow-md ring-2 ring-amber-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                          <Zap className="w-3 h-3 text-amber-600 fill-current" />
                          90 × 51 cm Panel
                        </span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          selectedModel === '5-burner' && qty5Burner > 0 && qty2Burner === 0 ? 'border-amber-600 bg-amber-600' : 'border-slate-300'
                        }`}>
                          {selectedModel === '5-burner' && qty5Burner > 0 && qty2Burner === 0 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>

                      <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                        5-Burner Gas + Electric
                      </h4>
                      <div className="mt-1 text-[11px] text-amber-800 font-semibold">
                        Panel Size: 90 by 51 cm
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                        4 gas + 1 central 2000W electric zone, digital countdown timer & auto-off key.
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200 flex items-baseline justify-between">
                      <span className="text-[10px] text-slate-500 font-medium">From</span>
                      <strong className="text-sm font-black text-amber-700">
                        {formatNaira(ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_4_PLUS)} - {formatNaira(ALTERNATIVE_PRODUCT_CONFIG.NORMAL_PRICE)}
                      </strong>
                    </div>
                  </button>

                  {/* OPTION 3: ORDER BOTH PRODUCTS (COMBO PACK) */}
                  <button
                    type="button"
                    onClick={() => handleSelectModelType('combo')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      (selectedModel === 'combo') || (qty2Burner > 0 && qty5Burner > 0)
                        ? 'border-emerald-600 bg-emerald-50/90 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:border-emerald-300 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          <Sparkles className="w-3 h-3 text-emerald-600 fill-current" />
                          Order Both (Save ₦20,000)
                        </span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          (selectedModel === 'combo') || (qty2Burner > 0 && qty5Burner > 0) ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                        }`}>
                          {((selectedModel === 'combo') || (qty2Burner > 0 && qty5Burner > 0)) && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>

                      <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                        BOTH COOKERS (COMBO)
                      </h4>
                      <div className="mt-1 text-[11px] text-emerald-700 font-bold">
                        1x 2-Burner (75×45cm) + 1x 5-Burner (90×51cm)
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                        Equip your kitchen with both models or share with family! Delivered in one shipment.
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200 flex items-baseline justify-between">
                      <span className="text-[10px] text-slate-500 font-medium">Bundle Price</span>
                      <strong className="text-sm font-black text-emerald-700">
                        {formatNaira(config.NORMAL_PRICE + ALTERNATIVE_PRODUCT_CONFIG.NORMAL_PRICE - 20000)}
                      </strong>
                    </div>
                  </button>

                </div>
              </div>

              {/* STEP 2: QUANTITY CONFIGURATION */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center justify-between">
                  <span>Step 2: Set Quantity for Your Order</span>
                  {pricing.isCombo || (qty2Burner > 0 && qty5Burner > 0) ? (
                    <span className="text-emerald-700 text-xs font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> ₦20,000 Combo Discount Active!
                    </span>
                  ) : (
                    <span className="text-slate-500 text-xs">Adjust quantities below</span>
                  )}
                </label>

                {/* DUAL QUANTITY SELECTORS (WHEN BOTH PRODUCTS ARE SELECTED) */}
                {(selectedModel === 'combo' || (qty2Burner > 0 && qty5Burner > 0)) ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* 2-Burner Item Box */}
                      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <Flame className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-bold text-slate-900">2-Burner Flip-Up</span>
                          </div>
                          <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            75 × 45 cm
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mb-3">
                          Rate: {formatNaira(pricing.unitPrice2Burner)} each
                        </p>
                        
                        <div className="flex items-center justify-between bg-white border border-blue-200 rounded-xl p-2.5">
                          <span className="text-xs text-slate-600 font-medium">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setQty2Burner((q) => Math.max(1, q - 1))}
                              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold cursor-pointer transition-colors"
                              aria-label="Decrease 2-burner quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-7 text-center font-bold text-slate-900 font-mono text-sm">
                              {qty2Burner}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty2Burner((q) => q + 1)}
                              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold cursor-pointer transition-colors"
                              aria-label="Increase 2-burner quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 text-right text-xs font-bold text-blue-900">
                          Subtotal: {formatNaira(pricing.subtotal2Burner)}
                        </div>
                      </div>

                      {/* 5-Burner Item Box */}
                      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-bold text-slate-900">5-Burner Hybrid</span>
                          </div>
                          <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                            90 × 51 cm
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mb-3">
                          Rate: {formatNaira(pricing.unitPrice5Burner)} each
                        </p>

                        <div className="flex items-center justify-between bg-white border border-amber-200 rounded-xl p-2.5">
                          <span className="text-xs text-slate-600 font-medium">Quantity:</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setQty5Burner((q) => Math.max(1, q - 1))}
                              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold cursor-pointer transition-colors"
                              aria-label="Decrease 5-burner quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-7 text-center font-bold text-slate-900 font-mono text-sm">
                              {qty5Burner}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty5Burner((q) => q + 1)}
                              className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center font-bold cursor-pointer transition-colors"
                              aria-label="Increase 5-burner quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 text-right text-xs font-bold text-amber-950">
                          Subtotal: {formatNaira(pricing.subtotal5Burner)}
                        </div>
                      </div>

                    </div>

                    {/* Combo Discount Confirmation Banner */}
                    <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-900">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                        Combo Bundle Incentive: Extra ₦20,000 off applied automatically!
                      </span>
                      <span className="font-black text-emerald-700">- ₦20,000</span>
                    </div>
                  </div>
                ) : selectedModel === '5-burner' ? (
                  /* SINGLE 5-BURNER QUANTITY SELECTOR */
                  <div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-3">
                      {[1, 2, 3, 4, 5].map((qtyVal) => {
                        const isSelected = qty5Burner === qtyVal || (qtyVal === 5 && qty5Burner >= 5);
                        let unitRate = ALTERNATIVE_PRODUCT_CONFIG.NORMAL_PRICE;
                        if (qtyVal === 2) unitRate = ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_2;
                        else if (qtyVal === 3) unitRate = ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_3;
                        else if (qtyVal >= 4) unitRate = ALTERNATIVE_PRODUCT_CONFIG.PRICE_FOR_4_PLUS;

                        return (
                          <button
                            type="button"
                            key={qtyVal}
                            onClick={() => setQty5Burner(qtyVal)}
                            className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950 border-amber-500 font-black shadow-md scale-102'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-300'
                            }`}
                          >
                            <span className="text-base sm:text-lg font-bold">
                              {qtyVal === 5 ? '5+ PCS' : `${qtyVal} PC`}
                            </span>
                            <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-900 font-bold' : 'text-amber-700 font-medium'}`}>
                              {formatNaira(unitRate)} ea
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <div className="text-xs text-slate-600">
                        Units of 5-Burner (90×51cm): <strong className="text-slate-900 text-sm ml-1">{qty5Burner}</strong>
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

                    {/* Instant Add 2-Burner Switch */}
                    <div className="mt-3 p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Flame className="w-5 h-5 text-blue-600 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Also need the 2-Burner Cooker (75 × 45 cm)?</p>
                          <p className="text-[11px] text-slate-600">Order both together and instantly unlock an extra ₦20,000 combo discount!</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedModel('combo');
                          setQty2Burner(1);
                        }}
                        className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2 px-3.5 rounded-lg shadow transition-all cursor-pointer"
                      >
                        + Add 2-Burner
                      </button>
                    </div>
                  </div>
                ) : (
                  /* SINGLE 2-BURNER QUANTITY SELECTOR */
                  <div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-3">
                      {[1, 2, 3, 4, 5].map((qtyVal) => {
                        const isSelected = qty2Burner === qtyVal || (qtyVal === 5 && qty2Burner >= 5);
                        let unitRate = config.NORMAL_PRICE;
                        if (qtyVal === 2) unitRate = config.PRICE_FOR_2;
                        else if (qtyVal >= 3) unitRate = config.PRICE_FOR_3_PLUS;

                        return (
                          <button
                            type="button"
                            key={qtyVal}
                            onClick={() => setQty2Burner(qtyVal)}
                            className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600 font-black shadow-md scale-102'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300'
                            }`}
                          >
                            <span className="text-base sm:text-lg font-bold">
                              {qtyVal === 5 ? '5+ PCS' : `${qtyVal} PC`}
                            </span>
                            <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-blue-100 font-bold' : 'text-blue-600 font-medium'}`}>
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

                    {/* Instant Add 5-Burner Switch */}
                    <div className="mt-3 p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Zap className="w-5 h-5 text-amber-600 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Want the 5-Burner Hybrid Cooktop (90 × 51 cm) too?</p>
                          <p className="text-[11px] text-slate-600">Order both together and get an automatic ₦20,000 combo discount!</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedModel('combo');
                          setQty5Burner(1);
                        }}
                        className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs py-2 px-3.5 rounded-lg shadow transition-all cursor-pointer"
                      >
                        + Add 5-Burner
                      </button>
                    </div>
                  </div>
                )}

              </div>

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

                {/* PHONE NUMBER & WHATSAPP NUMBER */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-xs font-medium text-slate-600 mb-1">
                      PHONE NUMBER <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 08012345678"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="whatsappNumber" className="block text-xs font-medium text-slate-600 mb-1">
                      WHATSAPP NUMBER (If different)
                    </label>
                    <input
                      type="tel"
                      id="whatsappNumber"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 08012345678"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* DELIVERY ADDRESS */}
                <div>
                  <label htmlFor="deliveryAddress" className="block text-xs font-medium text-slate-600 mb-1">
                    DELIVERY ADDRESS <span className="text-blue-600">*</span>
                  </label>
                  <textarea
                    id="deliveryAddress"
                    name="deliveryAddress"
                    rows={2}
                    required
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    placeholder="e.g. House 14, Admiralty Way, Lekki Phase 1"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none"
                  />
                </div>

                {/* CITY & STATE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-xs font-medium text-slate-600 mb-1">
                      CITY / TOWN <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Ikeja, Ibadan, Port Harcourt"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-xs font-medium text-slate-600 mb-1">
                      STATE <span className="text-blue-600">*</span>
                    </label>
                    <select
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    >
                      {NIGERIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

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

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
