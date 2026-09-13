import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, AlertCircle, Plus, Minus } from 'lucide-react';
import { LandingPageConfig, OrderFormData } from '../types';
import { formatNaira, calculatePricing, generateWhatsAppLink, formatWhatsAppNumber, NIGERIAN_STATES } from '../config';

interface OrderFormSectionProps {
  config: LandingPageConfig;
  initialQuantity?: number;
}

export const OrderFormSection: React.FC<OrderFormSectionProps> = ({
  config,
  initialQuantity = 1
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [formData, setFormData] = useState<Omit<OrderFormData, 'quantity'>>({
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
    if (initialQuantity && initialQuantity >= 1) {
      setQuantity(initialQuantity);
    }
  }, [initialQuantity]);

  const pricing = calculatePricing(quantity, {
    NORMAL_PRICE: config.NORMAL_PRICE,
    PRICE_FOR_2: config.PRICE_FOR_2,
    PRICE_FOR_3_PLUS: config.PRICE_FOR_3_PLUS
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleQuantitySelect = (qty: number) => {
    setQuantity(qty);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          fullName: formData.fullName.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          whatsappNumber: (formData.whatsappNumber || formData.phoneNumber).trim(),
          deliveryAddress: formData.deliveryAddress.trim(),
          city: formData.city.trim(),
          state: formData.state,
          email: formData.email ? formData.email.trim() : 'Not provided',
          product: config.PRODUCT_NAME,
          quantity: `${quantity} unit(s)`,
          pricePerUnit: formatNaira(pricing.pricePerUnit),
          totalAmount: formatNaira(pricing.total),
          _subject: `New Order #${orderId}: ${quantity}x ${config.PRODUCT_NAME} - ${formData.fullName.trim()} (${formData.city.trim()}, ${formData.state})`
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
          quantity,
          totalPrice: pricing.total,
          pricePerUnit: pricing.pricePerUnit,
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
            content_name: config.PRODUCT_NAME,
            content_type: 'product',
            num_items: quantity,
            order_id: orderId
          });
          (window as any).fbq('track', 'Lead');
        } catch (pixelErr) {
          console.error('Meta Pixel event dispatch error:', pixelErr);
        }
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const orderWhatsAppUrl = () => {
    const cleanNumber = formatWhatsAppNumber(config.WHATSAPP_NUMBER);
    const msg = `Hello! I just placed an order for ${quantity} unit(s) of 2-Flip-Up Double Gas Burner on your website.\n\nName: ${formData.fullName}\nPhone: ${formData.phoneNumber}\nCity/State: ${formData.city}, ${formData.state}\nTotal: ${formatNaira(pricing.total)}\n\nPlease confirm my order dispatch.`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
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
          <p className="text-slate-600 text-sm sm:text-base">
            Fill in your details below to reserve your 2-flip-up double burner at the promotional price.
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
              Thank you for your order. Our team will contact you shortly to confirm your order and delivery details.
            </p>

            {/* Order Summary Receipt Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto mb-8 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Recipient:</span>
                <span className="font-semibold text-slate-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Phone:</span>
                <span className="font-semibold text-slate-900">{formData.phoneNumber}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Delivery Destination:</span>
                <span className="font-semibold text-slate-900">{formData.city}, {formData.state}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Quantity Ordered:</span>
                <span className="font-semibold text-blue-700">{quantity} Unit(s)</span>
              </div>
              <div className="flex justify-between pt-1 text-sm sm:text-base">
                <span className="font-bold text-slate-700">Total Payable:</span>
                <span className="font-black text-blue-700">{formatNaira(pricing.total)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={orderWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>CHAT WITH US ON WHATSAPP</span>
              </a>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto text-slate-500 hover:text-slate-800 text-xs py-3 px-4 underline cursor-pointer"
              >
                Place Another Order
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

              {/* QUANTITY SELECTOR */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Step 1: Select Quantity Needed
                </label>

                {/* Quick preset buttons: 1, 2, 3, 4, 5+ */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-3">
                  {[1, 2, 3, 4, 5].map((qtyVal) => {
                    const isSelected = quantity === qtyVal || (qtyVal === 5 && quantity >= 5);
                    const singleCalculated = calculatePricing(qtyVal, {
                      NORMAL_PRICE: config.NORMAL_PRICE,
                      PRICE_FOR_2: config.PRICE_FOR_2,
                      PRICE_FOR_3_PLUS: config.PRICE_FOR_3_PLUS
                    });

                    return (
                      <button
                        type="button"
                        key={qtyVal}
                        onClick={() => handleQuantitySelect(qtyVal)}
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
                          {formatNaira(singleCalculated.pricePerUnit)} ea
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Stepper controls for exact quantity fine-tuning */}
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <div className="text-xs text-slate-600">
                    Selected Units: <strong className="text-slate-900 text-sm ml-1">{quantity}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-slate-900 font-mono">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Pricing feedback pill */}
                <div className="mt-2 text-xs text-slate-600 flex items-center justify-between px-1">
                  <span>Unit Rate: <strong className="text-slate-900">{formatNaira(pricing.pricePerUnit)} each</strong></span>
                  {pricing.savings > 0 && (
                    <span className="text-emerald-600 font-bold">You Save {formatNaira(pricing.savings)}!</span>
                  )}
                </div>
              </div>

              {/* DYNAMIC TOTAL BANNER */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-sm">
                <div>
                  <span className="text-xs text-blue-700 uppercase tracking-widest block font-bold">
                    YOUR ORDER CALCULATION
                  </span>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {quantity} × {formatNaira(pricing.pricePerUnit)}
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <span className="text-xs text-slate-500 block font-medium">TOTAL AMOUNT</span>
                  <div className="text-2xl sm:text-3xl font-black text-blue-800 tracking-tight">
                    YOUR TOTAL: {formatNaira(pricing.total)}
                  </div>
                </div>
              </div>

              {/* FORM FIELDS */}
              <div className="space-y-4 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Step 2: Enter Delivery Details
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
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-400 text-white font-black text-base sm:text-lg py-4 px-6 rounded-xl shadow-xl hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 text-white">
                      Processing Your Order...
                    </span>
                  ) : (
                    <>
                      <span>COMPLETE MY ORDER</span>
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
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
