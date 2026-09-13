import React, { useState } from 'react';
import { Truck, Package, Headphones, ShieldCheck, FileText, ChevronRight } from 'lucide-react';
import { LandingPageConfig } from '../types';

interface TrustDeliverySectionProps {
  config: LandingPageConfig;
}

export const TrustDeliverySection: React.FC<TrustDeliverySectionProps> = ({ config }) => {
  const [activeTab, setActiveTab] = useState<'delivery' | 'payment' | 'return' | 'warranty'>('delivery');

  const trustBadges = [
    {
      title: "Nationwide Delivery",
      desc: "Dispatched safely to addresses across all 36 states and Abuja.",
      icon: Truck
    },
    {
      title: "Secure Packaging",
      desc: "Robust protective box & cushioning to ensure safe transit to your doorstep.",
      icon: Package
    },
    {
      title: "Customer Support",
      desc: "Dedicated phone & WhatsApp support lines for your order questions.",
      icon: Headphones
    },
    {
      title: "Secure Order Process",
      desc: "Clear direct confirmation directly with our verified team.",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="trust-section" className="py-14 sm:py-20 px-4 bg-white text-slate-900 border-b border-blue-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-blue-600 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
            Reliable Service
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            ORDER WITH CONFIDENCE
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            We prioritize secure packaging, swift dispatch, and transparent customer service.
          </p>
        </div>

        {/* 4 Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center flex flex-col items-center hover:border-blue-300 transition-all shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{badge.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{badge.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Configurable Policy Sections Tabs */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
          <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50 no-scrollbar">
            <button
              onClick={() => setActiveTab('delivery')}
              className={`flex-1 min-w-[140px] py-3.5 px-4 text-xs sm:text-sm font-bold tracking-wider transition-colors cursor-pointer text-center border-b-2 ${
                activeTab === 'delivery'
                  ? 'border-blue-600 text-blue-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              [DELIVERY INFORMATION]
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`flex-1 min-w-[140px] py-3.5 px-4 text-xs sm:text-sm font-bold tracking-wider transition-colors cursor-pointer text-center border-b-2 ${
                activeTab === 'payment'
                  ? 'border-blue-600 text-blue-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              [PAYMENT INFORMATION]
            </button>
            <button
              onClick={() => setActiveTab('return')}
              className={`flex-1 min-w-[140px] py-3.5 px-4 text-xs sm:text-sm font-bold tracking-wider transition-colors cursor-pointer text-center border-b-2 ${
                activeTab === 'return'
                  ? 'border-blue-600 text-blue-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              [RETURN POLICY]
            </button>
            <button
              onClick={() => setActiveTab('warranty')}
              className={`flex-1 min-w-[140px] py-3.5 px-4 text-xs sm:text-sm font-bold tracking-wider transition-colors cursor-pointer text-center border-b-2 ${
                activeTab === 'warranty'
                  ? 'border-blue-600 text-blue-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              [WARRANTY INFORMATION]
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-blue-600 text-xs font-mono font-bold uppercase mb-2">
              <FileText className="w-4 h-4" />
              <span>Official Seller Terms</span>
            </div>

            {activeTab === 'delivery' && (
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Delivery Information</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {config.DELIVERY_INFORMATION}
                </p>
              </div>
            )}

            {activeTab === 'payment' && (
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Payment Information</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {config.PAYMENT_INFORMATION}
                </p>
              </div>
            )}

            {activeTab === 'return' && (
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Return Policy</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {config.RETURN_POLICY}
                </p>
              </div>
            )}

            {activeTab === 'warranty' && (
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Warranty Information</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {config.WARRANTY_INFORMATION}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
