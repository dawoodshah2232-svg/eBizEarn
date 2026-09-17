import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Download,
  CheckCircle2,
  AlertCircle,
  Building,
  DollarSign,
  Receipt,
  ArrowUpRight,
  ShieldCheck,
  X,
} from 'lucide-react';

export const BusinessBillingPage: React.FC = () => {
  const [balance, setBalance] = useState(2840.0);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('1000');
  const [depositSuccess, setDepositSuccess] = useState(false);
  const [autoReload, setAutoReload] = useState(true);

  const invoices = [
    {
      id: 'INV-2026-089',
      date: 'Apr 10, 2026',
      amount: '$1,500.00',
      method: 'Mastercard ending in 8812',
      status: 'Paid',
      campaignRef: 'CP-AURA-891 Budget Refill',
    },
    {
      id: 'INV-2026-064',
      date: 'Mar 25, 2026',
      amount: '$2,000.00',
      method: 'Bank Wire ACH Transfer',
      status: 'Paid',
      campaignRef: 'Spring Q1 Campaign Allocation',
    },
    {
      id: 'INV-2026-031',
      date: 'Mar 02, 2026',
      amount: '$1,000.00',
      method: 'Mastercard ending in 8812',
      status: 'Paid',
      campaignRef: 'Initial Platform Wallet Deposit',
    },
  ];

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const add = parseFloat(depositAmount) || 0;
    setBalance((prev) => prev + add);
    setDepositSuccess(true);
    setTimeout(() => {
      setDepositSuccess(false);
      setShowDepositModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 text-left font-sans max-w-6xl mx-auto">
      
      {/* =========================================================================
          1. HEADER
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Billing &amp; Payments
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Manage your campaign budget wallet, invoices, corporate payment methods, and auto-reload.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowDepositModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#168BFF] hover:bg-[#1277dc] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Funds to Wallet</span>
        </button>
      </div>

      {/* =========================================================================
          2. WALLET BALANCE & PAYMENT METHOD CARDS
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Balance Card */}
        <div className="p-6 rounded-3xl bg-[#07182F] text-white border border-white/10 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-4">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#168BFF]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Available Campaign Balance</span>
            <span className="w-2 h-2 rounded-full bg-[#16B364] animate-pulse" />
          </div>

          <div>
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-gray-300 block mt-1">
              Active in escrow for pending verified tasks
            </span>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-gray-400">Auto-reload active ($500 threshold)</span>
            <button
              type="button"
              onClick={() => setShowDepositModal(true)}
              className="text-[#20C4E8] font-bold hover:underline"
            >
              + Deposit
            </button>
          </div>
        </div>

        {/* Payment Method on File */}
        <div className="p-6 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Primary Payment Method</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#16B364] border border-emerald-200 text-[10px] font-bold">
              Default
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
              MC
            </div>
            <div>
              <span className="text-sm font-black text-gray-900 block">Mastercard &bull;&bull;&bull;&bull; 8812</span>
              <span className="text-xs text-gray-500">Expires 09/28 &bull; Acme Brands Inc.</span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
            <button type="button" className="text-[#168BFF] font-bold hover:underline">
              Change Method
            </button>
            <span className="text-gray-400 text-[11px]">3D Secure Verified</span>
          </div>
        </div>

        {/* Auto-Reload Setting */}
        <div className="p-6 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Campaign Continuity</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoReload}
                onChange={() => setAutoReload(!autoReload)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#168BFF]"></div>
            </label>
          </div>

          <div>
            <h3 className="text-sm font-black text-gray-900">Auto-Replenish Escrow</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              When balance dips under $500, automatically charge $1,000 to keep viral campaigns uninterrupted.
            </p>
          </div>

          <div className="pt-3 border-t border-gray-100 text-[11px] text-[#16B364] font-bold">
            &check; Continuous delivery enabled
          </div>
        </div>

      </div>

      {/* =========================================================================
          3. INVOICES & RECEIPTS HISTORY
         ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E7ECF3] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-gray-900">Tax Invoices &amp; Receipts</h2>
            <p className="text-xs text-gray-500">Official VAT / Tax receipts for corporate accounting and tax deductions</p>
          </div>
          <span className="text-xs font-mono font-bold text-gray-500">3 Total Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Invoice Number</th>
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5">Allocation Description</th>
                <th className="py-3.5 px-5">Amount</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-gray-900">{inv.id}</td>
                  <td className="py-4 px-5 text-gray-600">{inv.date}</td>
                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-900 block">{inv.campaignRef}</span>
                    <span className="text-[10px] text-gray-400">{inv.method}</span>
                  </td>
                  <td className="py-4 px-5 font-black text-gray-900">{inv.amount}</td>
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16B364] border border-emerald-200 text-[10px] font-bold">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          MODAL: DEPOSIT FUNDS
         ========================================================================= */}
      {showDepositModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#168BFF] flex items-center justify-center font-bold">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-gray-900">Add Campaign Funds</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDepositModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {depositSuccess ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#16B364] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-gray-900">Deposit Approved!</h4>
                <p className="text-xs text-gray-500">Funds credited to campaign escrow wallet.</p>
              </div>
            ) : (
              <form onSubmit={handleDeposit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Select Amount (USD)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['500', '1000', '2500'].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setDepositAmount(amt)}
                        className={`py-2 rounded-xl border text-xs font-bold ${
                          depositAmount === amt
                            ? 'border-[#168BFF] bg-blue-50 text-[#168BFF]'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Custom Amount ($)</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
                    min="50"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-1">
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Payment via</span>
                    <span className="font-bold text-gray-900">Mastercard &bull;&bull;&bull;&bull; 8812</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Processing Fee</span>
                    <span className="font-bold text-[#16B364]">0% ($0.00)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#168BFF] hover:bg-[#1277dc] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
                >
                  Confirm &amp; Charge ${depositAmount}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
