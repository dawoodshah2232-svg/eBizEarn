import React, { useState } from 'react';
import {
  Settings,
  Sliders,
  DollarSign,
  ShieldAlert,
  Save,
  CheckCircle2,
  RefreshCw,
  Lock,
  Cpu,
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [takeRate, setTakeRate] = useState('15.0');
  const [minCashout, setMinCashout] = useState('5.00');
  const [aiThreshold, setAiThreshold] = useState('95.0');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [enablePayPal, setEnablePayPal] = useState(true);
  const [enableWise, setEnableWise] = useState(true);
  const [enableBank, setEnableBank] = useState(true);
  const [enableCrypto, setEnableCrypto] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-left font-sans max-w-5xl mx-auto">
      
      {/* =========================================================================
          1. HEADER
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Global Platform Configuration
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Configure system fees, automated verification tolerance thresholds, and financial disbursement gates.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs text-[#16B364] font-bold flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </span>
        )}
      </div>

      {/* =========================================================================
          2. SETTINGS FORM
         ========================================================================= */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Core Financial Margins */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7ECF3] shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <DollarSign className="w-5 h-5 text-[#168BFF]" />
            <h2 className="text-base font-black text-gray-900">Financial Rules &amp; Margins</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Platform Take-Rate Margin (%)</label>
              <input
                type="number"
                step="0.1"
                value={takeRate}
                onChange={(e) => setTakeRate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
                required
              />
              <span className="text-[10px] text-gray-400">Escrow deduction percentage collected on campaign creation.</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Minimum Contributor Cashout Threshold ($)</label>
              <input
                type="number"
                step="0.50"
                value={minCashout}
                onChange={(e) => setMinCashout(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
                required
              />
              <span className="text-[10px] text-gray-400">Enforces minimum wallet balance before withdrawal is permitted.</span>
            </div>
          </div>
        </div>

        {/* AI Verification Guardrails */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7ECF3] shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <Cpu className="w-5 h-5 text-[#168BFF]" />
            <h2 className="text-base font-black text-gray-900">Computer Vision OCR Tolerance</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Auto-Approval Confidence Threshold (%)</label>
              <input
                type="number"
                step="0.5"
                value={aiThreshold}
                onChange={(e) => setAiThreshold(e.target.value)}
                className="w-full max-w-xs px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
                required
              />
              <span className="text-[10px] text-gray-400 block">
                Submissions with OCR match scores above this threshold are approved instantly. Below this, routed to manual review queue.
              </span>
            </div>
          </div>
        </div>

        {/* Payout Rails Gateways */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7ECF3] shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <Lock className="w-5 h-5 text-[#168BFF]" />
            <h2 className="text-base font-black text-gray-900">Active Payout Rail Gateways</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900 block">PayPal Instant API</span>
                <span className="text-[10px] text-gray-500">Zero fee automated disbursals</span>
              </div>
              <input
                type="checkbox"
                checked={enablePayPal}
                onChange={() => setEnablePayPal(!enablePayPal)}
                className="rounded text-[#168BFF]"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900 block">Wise Transfer Gateway</span>
                <span className="text-[10px] text-gray-500">Multi-currency cross-border accounts</span>
              </div>
              <input
                type="checkbox"
                checked={enableWise}
                onChange={() => setEnableWise(!enableWise)}
                className="rounded text-[#168BFF]"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900 block">Direct Bank ACH / Wire</span>
                <span className="text-[10px] text-gray-500">Direct deposit for US &amp; EU</span>
              </div>
              <input
                type="checkbox"
                checked={enableBank}
                onChange={() => setEnableBank(!enableBank)}
                className="rounded text-[#168BFF]"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900 block">Polygon USDC / USDT (Crypto)</span>
                <span className="text-[10px] text-gray-500">Smart contract treasury vault</span>
              </div>
              <input
                type="checkbox"
                checked={enableCrypto}
                onChange={() => setEnableCrypto(!enableCrypto)}
                className="rounded text-[#168BFF]"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#168BFF] hover:bg-[#1277dc] text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Global Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};
