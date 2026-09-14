/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Settings, ShieldCheck, Flame, Phone, MessageCircle, Truck, Zap } from 'lucide-react';
import { INITIAL_CONFIG, generateWhatsAppLink, formatNaira, formatWhatsAppNumber } from './config';
import { LandingPageConfig, CookerModel } from './types';

import { TopUrgencyBar } from './components/TopUrgencyBar';
import { HeroSection } from './components/HeroSection';
import { PriceOfferCards } from './components/PriceOfferCards';
import { ProblemHookSection } from './components/ProblemHookSection';
import { ProductBenefitsSection } from './components/ProductBenefitsSection';
import { ProductShowcaseSection } from './components/ProductShowcaseSection';
import { AlternativeProductSection } from './components/AlternativeProductSection';
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
import { HeaderOptionsMenu } from './components/HeaderOptionsMenu';

export default function App() {
  const [config, setConfig] = useState<LandingPageConfig>(() => {
    try {
      const saved = localStorage.getItem('burner_store_config');
      if (saved) {
        const parsed = JSON.parse(saved);
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
        if (
          !parsed.PRODUCT_IMAGES ||
          parsed.PRODUCT_IMAGES[0]?.url !== INITIAL_CONFIG.PRODUCT_IMAGES[0]?.url ||
          parsed.PRODUCT_IMAGES[0]?.title !== INITIAL_CONFIG.PRODUCT_IMAGES[0]?.title ||
          parsed.PRODUCT_IMAGES[1]?.title !== INITIAL_CONFIG.PRODUCT_IMAGES[1]?.title ||
          parsed.PRODUCT_IMAGES[2]?.title !== INITIAL_CONFIG.PRODUCT_IMAGES[2]?.title ||
          parsed.PRODUCT_IMAGES[3]?.title !== INITIAL_CONFIG.PRODUCT_IMAGES[3]?.title ||
          parsed.PRODUCT_IMAGES[5]?.title !== INITIAL_CONFIG.PRODUCT_IMAGES[5]?.title ||
          parsed.PRODUCT_IMAGES.some((img: { url?: string }) => img.url?.includes('flip_burner_unit') || img.url?.includes('flip_burner_detail'))
        ) {
          parsed.PRODUCT_IMAGES = INITIAL_CONFIG.PRODUCT_IMAGES;
        }
        if (
          !parsed.REVIEWS ||
          parsed.REVIEWS.length < 3 ||
          parsed.REVIEWS.some(
            (rev: { content?: string; author?: string }) =>
              rev.content?.includes('INSERT REAL CUSTOMER') ||
              rev.author?.includes('CUSTOMER NAME')
          )
        ) {
          parsed.REVIEWS = INITIAL_CONFIG.REVIEWS;
        }
        return { ...INITIAL_CONFIG, ...parsed };
      }
    } catch {
      // ignore
    }
    return INITIAL_CONFIG;
  });

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [selectedModel, setSelectedModel] = useState<CookerModel>('2-burner');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);

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

  const scrollToOrderForm = (qty?: number, model?: CookerModel) => {
    if (qty) {
      setSelectedQuantity(qty);
    }
    if (model) {
      setSelectedModel(model);
    }
    const target = document.getElementById('order-form-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
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
                2-FLIP-UP COOKER STORE
              </span>
              <span className="text-[10px] text-blue-600 font-mono tracking-widest hidden sm:block font-bold">
                PREMIUM GAS & HYBRID COOKING APPLIANCES
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick jump to 5-burner upgrade */}
            <button
              onClick={scrollToAlternativeSection}
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              <span>See 5-Burner Hybrid (₦280k)</span>
            </button>

            <a
              href={`tel:${config.PHONE_NUMBER}`}
              className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-700 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>{config.PHONE_NUMBER}</span>
            </a>

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
                onClick={() => scrollToOrderForm(1)}
                className="btn-glow bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-2 rounded-lg cursor-pointer transition-all shadow-md flex items-center gap-1.5"
              >
                <span>{hasPlacedOrder ? "ORDER MORE" : "ORDER NOW"}</span>
              </button>
              <span className="text-[9px] font-bold text-emerald-700 hidden sm:flex items-center gap-0.5 mt-0.5 tracking-tight">
                <Truck className="w-2.5 h-2.5" /> FREE DELIVERY
              </span>
            </div>

            {/* TOP-RIGHT OPTION ICON MENU */}
            <HeaderOptionsMenu
              config={config}
              onSelectModel={(model, qty) => scrollToOrderForm(qty, model)}
              onScrollToSection={scrollToSection}
              onOpenSellerConfig={() => setIsConfigModalOpen(true)}
              whatsappUrl={whatsappConfirmUrl}
            />
          </div>
        </div>
      </header>

      {/* QUICK PRODUCT SWITCHER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white py-2.5 px-4 text-xs border-b border-blue-900/60">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded">
              NEW ALTERNATIVE
            </span>
            <span className="text-slate-200 text-xs font-medium">
              Looking for a bigger kitchen centerpiece? Discover our <strong className="text-amber-300">5-Burner Gas + Electric Hybrid Cooktop</strong>.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToAlternativeSection}
              className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer text-xs transition-colors"
            >
              View 5-Burner Specs & Photos →
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => scrollToOrderForm(1, '5-burner')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-black px-2.5 py-1 rounded cursor-pointer transition-colors"
            >
              Order 5-Burner (₦280k)
            </button>
          </div>
        </div>
      </div>

      {/* MAIN SALES CONTENT FLOW */}
      <main>
        {/* SECTION 2 — HERO SECTION */}
        <HeroSection
          config={config}
          onOrderClick={(qty) => scrollToOrderForm(qty, '2-burner')}
          hasPlacedOrder={hasPlacedOrder}
        />

        {/* SECTION 3 — PRICE OFFER CARDS */}
        <PriceOfferCards config={config} onSelectTier={(qty) => scrollToOrderForm(qty, '2-burner')} />

        {/* SECTION 4 — PROBLEM / EMOTIONAL HOOK */}
        <ProblemHookSection />

        {/* SECTION 5 — PRODUCT BENEFITS */}
        <ProductBenefitsSection />

        {/* SECTION 6 — PRODUCT IMAGE SHOWCASE */}
        <ProductShowcaseSection images={config.PRODUCT_IMAGES} />

        {/* SECTION 7 — ALTERNATIVE PRODUCT SHOWCASE (5-Burner Gas + Electric Hybrid) */}
        <AlternativeProductSection
          onSelectModel={(model, qty) => scrollToOrderForm(qty, model)}
        />

        {/* SECTION 8 — HOW THE PRODUCT WORKS */}
        <HowItWorksSection />

        {/* SECTION 9 — PERFECT FOR */}
        <PerfectForSection />

        {/* SECTION 10 — PRODUCT VALUE */}
        <ProductValueSection config={config} onOrderClick={(qty) => scrollToOrderForm(qty, '2-burner')} />

        {/* SECTION 11 — CUSTOMER REVIEWS */}
        <CustomerReviewsSection reviews={config.REVIEWS} />

        {/* SECTION 12 — OFFER URGENCY */}
        <OfferUrgencySection config={config} onClaimOffer={() => scrollToOrderForm(1)} />

        {/* SECTION 13 — TRUST & DELIVERY */}
        <TrustDeliverySection config={config} />

        {/* SECTION 14 — FAQ */}
        <FAQSection faqs={config.FAQS} />

        {/* SECTION 15 — FINAL SALES CTA */}
        <FinalSalesCTASection
          config={config}
          onOrderClick={() => scrollToOrderForm(1)}
          hasPlacedOrder={hasPlacedOrder}
        />

        {/* SECTION 16 — ORDER FORM */}
        <OrderFormSection
          config={config}
          initialQuantity={selectedQuantity}
          initialModel={selectedModel}
          onOrderSuccess={handleOrderSuccess}
          onResetOrder={handleResetOrder}
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

    </div>
  );
}
