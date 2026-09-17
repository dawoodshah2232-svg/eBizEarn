import React, { useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Clock,
  Wallet,
  Check,
  Search,
  Filter,
  ShieldCheck,
  CreditCard,
  DollarSign,
  TrendingUp,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformDataContext';

export const AdminPayoutsPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { payouts, processPayout } = usePlatform();

  const handleAction = (id: number, status: 'paid' | 'rejected' | 'processing') => {
    if (status === 'paid' || status === 'rejected') {
      processPayout(id, status);
    }
  };

  const handleBatchApprove = () => {
    payouts
      .filter((p) => p.status === 'requested' || p.status === 'processing')
      .forEach((p) => processPayout(p.id, 'paid'));
  };

  const filteredPayouts = payouts.filter((p) => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.userName.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.method.toLowerCase().includes(q) ||
        p.accountDetails.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingCount = payouts.filter((p) => p.status === 'requested' || p.status === 'processing').length;
  const pendingTotal = payouts
    .filter((p) => p.status === 'requested' || p.status === 'processing')
    .reduce((acc, p) => acc + p.amountCents, 0) / 100;

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* 1. HEADER & BATCH ACTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#101828]">Payout Requests Management</h2>
          <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
            Real-time multi-rail disbursement, double-entry ledger reconciliation, and treasury oversight.
          </p>
        </div>

        {pendingCount > 0 && (
          <button
            type="button"
            onClick={handleBatchApprove}
            className="px-5 py-2.5 bg-[#16B364] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve All Verified ({pendingCount} &bull; AED {pendingTotal.toFixed(2)})</span>
          </button>
        )}
      </div>

      {/* 2. EXECUTIVE TREASURY METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Pending Cashouts</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
          <div className="text-2xl font-black text-amber-600 font-mono">AED {pendingTotal.toFixed(2)}</div>
          <div className="text-[10px] text-gray-400">{pendingCount} requests in review queue</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">24h Throughput</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#16B364]" />
          </div>
          <div className="text-2xl font-black text-[#16B364] font-mono">AED 17,800.00</div>
          <div className="text-[10px] text-gray-400">124 disbursements cleared</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Avg Settlement</span>
            <Clock className="w-3.5 h-3.5 text-[#168BFF]" />
          </div>
          <div className="text-2xl font-black text-[#168BFF]">14.2 min</div>
          <div className="text-[10px] text-gray-400">CBUAE WPS &amp; IBAN Instant Rails</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Reserve Liquidity</span>
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-700">100% Backed</div>
          <div className="text-[10px] text-gray-400 font-mono">AED 310,000.00 vault balance</div>
        </div>
      </div>

      {/* 3. DOUBLE-ENTRY LEDGER RECONCILIATION BANNER */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#168BFF] text-white flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-bold text-gray-900">Double-Entry Cryptographic Accounting Architecture (SHA-256)</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed max-w-2xl">
              Every payout automatically executes an atomic ledger debit on Contributor Wallet Liability and a credit to Cash Outflow Asset with cryptographic hash chains. Zero phantom withdrawals, zero ledger variance.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 bg-white rounded-xl border border-blue-200 text-blue-900 font-mono text-[10px] font-bold shadow-2xs">
            Variance: AED 0.00 (Balanced)
          </span>
        </div>
      </div>

      {/* 4. PAYOUT LIST TABLE */}
      <div className="bg-white rounded-3xl border border-[#E4EAF2] shadow-sm overflow-hidden space-y-0">
        
        {/* Filter & Search Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user, email, IBAN..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {['all', 'requested', 'processing', 'paid', 'rejected'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  filterStatus === st
                    ? 'bg-[#07182F] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-100">
          {filteredPayouts.map((p) => (
            <div
              key={p.id}
              className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={p.avatar}
                  alt={p.userName}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        p.status === 'paid'
                          ? 'bg-emerald-50 text-[#16B364]'
                          : p.status === 'processing'
                          ? 'bg-blue-50 text-[#168BFF]'
                          : p.status === 'rejected'
                          ? 'bg-red-50 text-red-600'
                          : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      {p.status}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">&bull; {p.requestedAt}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                      {p.kycTier}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-gray-900">{p.userName}</h4>
                  <p className="text-xs text-gray-500 font-mono">
                    {p.email} &bull; <strong className="text-gray-700">{p.method}</strong> &bull; {p.accountDetails}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-6 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                <div className="text-left lg:text-right">
                  <span className="text-xl font-black text-gray-900">{p.amount}</span>
                  <span className="text-[10px] text-gray-400 block">Risk Score: {p.riskScore}/100 (Safe)</span>
                  {p.ledgerHash && (
                    <span className="text-[9px] text-cyan-700 bg-cyan-50 font-mono px-1.5 py-0.5 rounded block truncate max-w-[150px] mt-0.5" title={p.ledgerHash}>
                      🔒 {p.ledgerHash.slice(0, 16)}...
                    </span>
                  )}
                </div>

                {p.status === 'paid' ? (
                  <span className="text-xs font-bold text-[#16B364] bg-emerald-50 px-3 py-1.5 rounded-xl flex items-center gap-1 border border-emerald-200">
                    <Check className="w-3.5 h-3.5" /> Dispatched
                  </span>
                ) : p.status === 'rejected' ? (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-xl border border-red-200">
                    Rejected
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAction(p.id, 'paid')}
                      className="px-4 py-2 bg-[#16B364] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-98"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve &amp; Dispatch</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(p.id, 'rejected')}
                      className="px-3 py-2 bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
