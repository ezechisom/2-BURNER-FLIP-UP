/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Settings, ShieldCheck, Flame, Phone, MessageCircle, Truck, Zap } from 'lucide-react';
import { INITIAL_CONFIG, generateWhatsAppLink, formatNaira, formatWhatsAppNumber } from './config';
import { LandingPageConfig, CookerModel } from './types';

import { TopUrgencyBar } from './components/TopUrgencyBar';
import { TopAlternativeProductScroll } from './components/TopAlternativeProductScroll';
import { HeroSection } from './components/HeroSection';
import { PriceOfferCards } from './components/PriceOfferCards';
import { ProblemHookSection } from './components/ProblemHookSection';
import { ProductBenefitsSection } from './components/ProductBenefitsSection';
import { ProductShowcaseSection } from './components/ProductShowcaseSection';
import { SafetyProtectionSection } from './components/SafetyProtectionSection';
import { DigitalTimerSimulator } from './components/DigitalTimerSimulator';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PerfectForSection } from './components/PerfectForSection';
import { ProductValueSection } from './components/ProductValueSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { OfferUrgencySection } from './components/OfferUrgencySection';
import { TrustDeliverySection } from './components/TrustDeliverySection';
import { FAQSection } from './components/FAQSection';
import { FinalSalesCTASection } from './components/FinalSalesCTASection';
import { OrderFormSection } from './components/OrderFormSection';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { SellerConfigModal } from './components/SellerConfigModal';
import { HeaderSupportFaq } from './components/HeaderSupportFaq';
import { LiveSalesNotifications } from './components/LiveSalesNotifications';
import { AlternativeProductModal } from './components/AlternativeProductModal';
import { CriticalOrderWarningModal } from './components/CriticalOrderWarningModal';
import { QuickOrderPopupModal } from './components/QuickOrderPopupModal';

export default function App() {
  const [config, setConfig] = useState<LandingPageConfig>(() => {
    try {
      const saved = localStorage.getItem('burner_store_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Force refresh to new 5-burner main product if old 2-burner was saved as main
        if (
          !parsed.PRODUCT_NAME ||
          parsed.PRODUCT_NAME.includes('2-FLIP-UP') ||
          parsed.NORMAL_PRICE === 170000 ||
          !parsed.PRODUCT_IMAGES ||
          parsed.PRODUCT_IMAGES[0]?.url !== INITIAL_CONFIG.PRODUCT_IMAGES[0]?.url
        ) {
          localStorage.setItem('burner_store_config', JSON.stringify(INITIAL_CONFIG));
          return INITIAL_CONFIG;
        }
        if (parsed.PHONE_NUMBER === '+2348123456789' || !parsed.PHONE_NUMBER) {
          parsed.PHONE_NUMBER = INITIAL_CONFIG.PHONE_NUMBER;
        }
        if (parsed.WHATSAPP_NUMBER === '+2348123456789' || !parsed.WHATSAPP_NUMBER) {
          parsed.WHATSAPP_NUMBER = INITIAL_CONFIG.WHATSAPP_NUMBER;
        }
        if (!parsed.FORMSPREE_ENDPOINT) {
          parsed.FORMSPREE_ENDPOINT = INITIAL_CONFIG.FORMSPREE_ENDPOINT;
        }
        if (!parsed.META_PIXEL_ID) {
          parsed.META_PIXEL_ID = INITIAL_CONFIG.META_PIXEL_ID;
        }
        return { ...INITIAL_CONFIG, ...parsed };
      }
    } catch {
      // ignore
    }
    return INITIAL_CONFIG;
  });

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [selectedModel, setSelectedModel] = useState<CookerModel>('5-burner');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);
  const [is2BurnerModalOpen, setIs2BurnerModalOpen] = useState<boolean>(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState<boolean>(false);
  const [pendingOrder, setPendingOrder] = useState<{ qty: number; model: CookerModel }>({
    qty: 1,
    model: '5-burner'
  });

  // Tracks if the customer has placed an order and finished filling the form
  const [hasPlacedOrder, setHasPlacedOrder] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('burner_has_ordered') === 'true';
    } catch {
      return false;
    }
  });

  const [lastOrderDetails, setLastOrderDetails] = useState<{
    fullName: string;
    phoneNumber: string;
    state: string;
    city: string;
    quantity: number;
    total: number;
    orderId: string;
    productModel?: CookerModel;
    productName?: string;
  } | null>(() => {
    try {
      const saved = sessionStorage.getItem('burner_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Ensure the page always starts at the top when opened so the visitor scrolls down by themselves
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  // Quick Order Form pops up every 30 seconds after opening website
  useEffect(() => {
    if (hasPlacedOrder) return;

    // Recurring 30s interval
    const intervalId = setInterval(() => {
      setIsQuickOrderOpen(true);
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [hasPlacedOrder]);

  const handleOrderSuccess = (details: {
    fullName: string;
    phoneNumber: string;
    state: string;
    city: string;
    quantity: number;
    total: number;
    orderId: string;
    productModel?: CookerModel;
    productName?: string;
  }) => {
    setHasPlacedOrder(true);
    setLastOrderDetails(details);
    try {
      sessionStorage.setItem('burner_has_ordered', 'true');
      sessionStorage.setItem('burner_last_order', JSON.stringify(details));
    } catch {
      // ignore
    }
  };

  const handleResetOrder = () => {
    setHasPlacedOrder(false);
    setLastOrderDetails(null);
    try {
      sessionStorage.removeItem('burner_has_ordered');
      sessionStorage.removeItem('burner_last_order');
    } catch {
      // ignore
    }
  };

  const handleSaveConfig = (newConfig: LandingPageConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('burner_store_config', JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

  // Shows the Critical Warning Message first whenever someone clicks an Order button
  const scrollToOrderForm = (qty?: number, model?: CookerModel) => {
    setPendingOrder({
      qty: qty || selectedQuantity || 1,
      model: model || selectedModel || '5-burner'
    });
    setIsWarningModalOpen(true);
  };

  // Called when customer confirms they are ready in the Critical Warning Modal
  const handleProceedAfterWarning = () => {
    setIsWarningModalOpen(false);
    if (pendingOrder.qty) {
      setSelectedQuantity(pendingOrder.qty);
    }
    if (pendingOrder.model) {
      setSelectedModel(pendingOrder.model);
    }
    setTimeout(() => {
      const target = document.getElementById('critical-warning-banner') || document.getElementById('order-form-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const scrollToAlternativeSection = () => {
    const target = document.getElementById('alternative-product-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // WhatsApp confirmation URL with customer's order specifics (active only after order)
  const whatsappConfirmUrl = useMemo(() => {
    const cleanNumber = formatWhatsAppNumber(config.WHATSAPP_NUMBER);
    if (lastOrderDetails) {
      const prodName = lastOrderDetails.productName || (lastOrderDetails.productModel === '5-burner' ? '5-Burner Built-In Gas + Electric Cooktop' : '2-Flip-Up Double Gas Burner');
      const msg = `Hello! I just completed the order form for ${lastOrderDetails.quantity} unit(s) of ${prodName} on your website.\n\nOrder ID: #${lastOrderDetails.orderId}\nName: ${lastOrderDetails.fullName}\nPhone: ${lastOrderDetails.phoneNumber}\nAddress: ${lastOrderDetails.city}, ${lastOrderDetails.state}\nTotal: ${formatNaira(lastOrderDetails.total)}\n\nPlease confirm my order dispatch.`;
      return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
    }
    return generateWhatsAppLink(
      config.WHATSAPP_NUMBER,
      selectedModel === '5-burner' ? '5-Burner Built-In Gas + Electric Cooktop' : config.PRODUCT_NAME,
      selectedQuantity
    );
  }, [config.WHATSAPP_NUMBER, config.PRODUCT_NAME, selectedQuantity, lastOrderDetails, selectedModel]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white pb-16 sm:pb-0">
      
      {/* SECTION 1 — TOP URGENCY BAR */}
      <TopUrgencyBar
        countdownEndDate={config.COUNTDOWN_END_DATE}
        countdownHours={config.COUNTDOWN_HOURS}
      />

      {/* BRAND / NAVIGATION HEADER */}
      <header className="bg-white border-b border-blue-100 px-4 py-3 sticky top-9 z-40 backdrop-blur-md bg-opacity-95 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black shadow-sm">
              <Flame className="w-5 h-5 fill-current" />
            </span>
            <div>
              <span className="font-extrabold tracking-tight text-slate-900 text-sm sm:text-base uppercase block leading-tight">
                5-BURNER HYBRID COOKER STORE
              </span>
              <span className="text-[10px] text-blue-600 font-mono tracking-widest hidden sm:block font-bold">
                EXECUTIVE DUAL-FUEL GAS & ELECTRIC COOKTOPS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* WhatsApp is displayed in the header ONLY after the customer has placed an order */}
            {hasPlacedOrder && (
              <a
                href={whatsappConfirmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow-emerald hidden sm:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Confirm on WhatsApp</span>
              </a>
            )}

            <div className="flex flex-col items-end">
              <button
                onClick={() => scrollToOrderForm(1, '5-burner')}
                className="btn-glow bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-2 rounded-lg cursor-pointer transition-all shadow-md flex items-center gap-1.5"
              >
                <span>{hasPlacedOrder ? "ORDER MORE" : "ORDER NOW"}</span>
              </button>
              <span className="text-[9px] font-bold text-emerald-700 hidden sm:flex items-center gap-0.5 mt-0.5 tracking-tight">
                <Truck className="w-2.5 h-2.5" /> FREE DELIVERY
              </span>
            </div>

            {/* TOP-RIGHT SUPPORT & FAQ BUTTONS */}
            <HeaderSupportFaq
              config={config}
              onScrollToSection={scrollToSection}
              onOpenSellerConfig={() => setIsConfigModalOpen(true)}
            />
          </div>
        </div>
      </header>

      {/* CONTINUOUS SCROLLING BANNER ACROSS TOP OF PAGE FOR ALTERNATIVE PRODUCT */}
      <TopAlternativeProductScroll
        onOpenDetails={() => setIs2BurnerModalOpen(true)}
        onSelectAlternative={(model, qty) => scrollToOrderForm(qty, model)}
      />

      {/* MAIN SALES CONTENT FLOW */}
      <main>
        {/* SECTION 2 — HERO SECTION */}
        <HeroSection
          config={config}
          onOrderClick={(qty) => scrollToOrderForm(qty, '5-burner')}
          hasPlacedOrder={hasPlacedOrder}
        />

        {/* SECTION 3 — PRICE OFFER CARDS */}
        <PriceOfferCards config={config} onSelectTier={(qty) => scrollToOrderForm(qty, '5-burner')} />

        {/* SECTION 4 — PROBLEM / EMOTIONAL HOOK */}
        <ProblemHookSection />

        {/* SECTION 5 — PRODUCT BENEFITS */}
        <ProductBenefitsSection />

        {/* SECTION 6 — PRODUCT IMAGE SHOWCASE */}
        <ProductShowcaseSection images={config.PRODUCT_IMAGES} />

        {/* SECTION 7 — DUAL KITCHEN SAFETY: FLAME FAILURE DEVICE (FFD) & DIGITAL TIMER AUTO-CUTOFF */}
        <SafetyProtectionSection onOrderClick={() => scrollToOrderForm(1, '5-burner')} />

        {/* SECTION 8 — INTERACTIVE DIGITAL TIMER & AUTO SAFETY OFF SIMULATOR (From maxluxurybathrooms.online) */}
        <DigitalTimerSimulator onOrderClick={() => scrollToOrderForm(1, '5-burner')} />

        {/* SECTION 8 — HOW THE PRODUCT WORKS */}
        <HowItWorksSection />

        {/* SECTION 9 — PERFECT FOR */}
        <PerfectForSection />

        {/* SECTION 10 — PRODUCT VALUE */}
        <ProductValueSection config={config} onOrderClick={(qty) => scrollToOrderForm(qty, '5-burner')} />

        {/* SECTION 11 — CUSTOMER REVIEWS */}
        <CustomerReviewsSection reviews={config.REVIEWS} />

        {/* SECTION 12 — OFFER URGENCY */}
        <OfferUrgencySection config={config} onClaimOffer={() => scrollToOrderForm(1, '5-burner')} />

        {/* SECTION 13 — TRUST & DELIVERY */}
        <TrustDeliverySection config={config} />

        {/* SECTION 14 — FAQ */}
        <FAQSection faqs={config.FAQS} />

        {/* SECTION 15 — FINAL SALES CTA */}
        <FinalSalesCTASection
          config={config}
          onOrderClick={() => scrollToOrderForm(1, '5-burner')}
          hasPlacedOrder={hasPlacedOrder}
        />

        {/* SECTION 16 — ORDER FORM */}
        <OrderFormSection
          config={config}
          initialQuantity={selectedQuantity}
          initialModel={selectedModel}
          onOrderSuccess={handleOrderSuccess}
          onResetOrder={handleResetOrder}
          onView2BurnerDetails={() => setIs2BurnerModalOpen(true)}
        />
      </main>

      {/* FOOTER */}
      <footer className="bg-white text-slate-600 text-xs py-10 px-4 border-t border-blue-200 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-slate-900 font-bold">
            <Flame className="w-4 h-4 text-blue-600 fill-current" />
            <span>2-FLIP-UP & 5-BURNER HYBRID COOKTOPS</span>
          </div>

          <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
            Direct-response promotional landing page. Free nationwide delivery across Nigeria with Pay on Delivery.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500 pt-2">
            <span>© {new Date().getFullYear()} All Rights Reserved.</span>
            <span>•</span>
            <button
              onClick={() => setIsConfigModalOpen(true)}
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
              title="Seller Settings: Edit prices, phone, and policies"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Seller Configuration</span>
            </button>
          </div>
        </div>
      </footer>

      {/* STICKY MOBILE CTA BAR */}
      <StickyMobileCTA
        priceFor3Plus={config.PRICE_FOR_3_PLUS}
        onOrderClick={() => scrollToOrderForm(selectedQuantity)}
        hasPlacedOrder={hasPlacedOrder}
        whatsappUrl={whatsappConfirmUrl}
      />

      {/* LIVE SALES SOCIAL PROOF TOASTS (From maxluxurybathrooms.online) */}
      <LiveSalesNotifications onNotificationClick={(model) => scrollToOrderForm(1, model)} />

      {/* FLOATING WHATSAPP BUTTON — SHOWN ONLY AFTER THE PERSON HAS PLACED AN ORDER */}
      {hasPlacedOrder && (
        <aside
          aria-label="WhatsApp Order Confirmation"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 flex flex-col items-end gap-2"
        >
          <div className="bg-white text-slate-800 text-xs font-bold py-1.5 px-3 rounded-full shadow-lg border border-emerald-200 flex items-center gap-1.5 shadow-slate-900/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Order Placed! Click to confirm on WhatsApp</span>
          </div>
          <a
            href={whatsappConfirmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow-emerald bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105"
            aria-label="Confirm Order on WhatsApp"
            title="Confirm Order on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
            <span className="hidden sm:inline font-black text-sm pr-1">Confirm on WhatsApp</span>
          </a>
        </aside>
      )}

      {/* SELLER CONFIGURATION MODAL */}
      <SellerConfigModal
        config={config}
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onSave={handleSaveConfig}
      />

      {/* 2-BURNER FLIP-UP DETAILS MODAL (Opens from suggested product sliding banner on top) */}
      <AlternativeProductModal
        isOpen={is2BurnerModalOpen}
        onClose={() => setIs2BurnerModalOpen(false)}
        onSelectModel={(model, qty) => scrollToOrderForm(qty, model)}
        whatsappNumber={config.WHATSAPP_NUMBER}
      />

      {/* CRITICAL ORDER WARNING MODAL (Shows when any Order button is clicked before scrolling to form) */}
      <CriticalOrderWarningModal
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        onProceedToForm={handleProceedAfterWarning}
        whatsappNumber={config.WHATSAPP_NUMBER}
      />

      {/* QUICK ORDER POPUP MODAL (Pops up every 30 seconds) */}
      <QuickOrderPopupModal
        isOpen={isQuickOrderOpen}
        onClose={() => setIsQuickOrderOpen(false)}
        config={config}
        onOrderSuccess={(details) => {
          handleOrderSuccess(details);
        }}
      />

    </div>
  );
}
