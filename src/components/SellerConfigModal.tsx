import React, { useState } from 'react';
import { Settings, X, RotateCcw, Check, Save } from 'lucide-react';
import { LandingPageConfig } from '../types';
import { INITIAL_CONFIG } from '../config';

interface SellerConfigModalProps {
  config: LandingPageConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: LandingPageConfig) => void;
}

export const SellerConfigModal: React.FC<SellerConfigModalProps> = ({
  config,
  isOpen,
  onClose,
  onSave
}) => {
  const [localConfig, setLocalConfig] = useState<LandingPageConfig>(config);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setLocalConfig((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSave = () => {
    onSave(localConfig);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setLocalConfig(INITIAL_CONFIG);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl text-slate-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Seller Configuration Panel</h3>
              <p className="text-xs text-slate-500">Edit promotional prices, contacts & policies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Pricing Controls */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-blue-700 uppercase text-xs tracking-wider">
              1. Central Price Settings (in Naira ₦)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 mb-1">1 Unit (Normal Price)</label>
                <input
                  type="number"
                  name="NORMAL_PRICE"
                  value={localConfig.NORMAL_PRICE}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">2 Units (Each)</label>
                <input
                  type="number"
                  name="PRICE_FOR_2"
                  value={localConfig.PRICE_FOR_2}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">3+ Units (Each)</label>
                <input
                  type="number"
                  name="PRICE_FOR_3_PLUS"
                  value={localConfig.PRICE_FOR_3_PLUS}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Controls */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-blue-700 uppercase text-xs tracking-wider">
              2. Seller WhatsApp & Phone Contacts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  name="WHATSAPP_NUMBER"
                  value={localConfig.WHATSAPP_NUMBER}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Support Phone Number</label>
                <input
                  type="text"
                  name="PHONE_NUMBER"
                  value={localConfig.PHONE_NUMBER}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <label className="block text-slate-600 mb-1">Formspree Endpoint (Receives Buyer Order Details)</label>
              <input
                type="text"
                name="FORMSPREE_ENDPOINT"
                value={localConfig.FORMSPREE_ENDPOINT || "https://formspree.io/f/xljevqpk"}
                onChange={handleChange}
                placeholder="https://formspree.io/f/xljevqpk"
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono text-xs focus:border-blue-600 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Connected to Formspree: Buyer orders submitted on the site are automatically emailed to you.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <label className="block text-slate-600 mb-1">Meta Pixel ID (Facebook / Instagram Ads Tracking)</label>
              <input
                type="text"
                name="META_PIXEL_ID"
                value={localConfig.META_PIXEL_ID || "947636671276929"}
                onChange={handleChange}
                placeholder="947636671276929"
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 font-mono text-xs focus:border-blue-600 focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Meta Pixel ID actively tracks PageView, Lead, and Purchase conversions on Facebook/Instagram.
              </p>
            </div>
          </div>

          {/* Policies Controls */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-blue-700 uppercase text-xs tracking-wider">
              3. Policy Statements
            </h4>
            <div>
              <label className="block text-slate-600 mb-1">Delivery Information Text</label>
              <textarea
                name="DELIVERY_INFORMATION"
                rows={2}
                value={localConfig.DELIVERY_INFORMATION}
                onChange={handleChange}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 resize-none focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Payment Information Text</label>
              <textarea
                name="PAYMENT_INFORMATION"
                rows={2}
                value={localConfig.PAYMENT_INFORMATION}
                onChange={handleChange}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 resize-none focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Return Policy Text</label>
              <textarea
                name="RETURN_POLICY"
                rows={2}
                value={localConfig.RETURN_POLICY}
                onChange={handleChange}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 resize-none focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Warranty Information Text</label>
              <textarea
                name="WARRANTY_INFORMATION"
                rows={2}
                value={localConfig.WARRANTY_INFORMATION}
                onChange={handleChange}
                className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 resize-none focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs px-3 py-2 rounded-lg cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900 px-4 py-2 text-xs rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              {savedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Apply Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
