import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  DollarSign,
  Users,
  ShieldCheck,
  Receipt,
  Megaphone,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Clock,
  TrendingUp,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { usePlatform } from '../../context/PlatformDataContext';

export const AdminOverviewPage: React.FC = () => {
  const { campaigns, payouts, submissions } = usePlatform();

  const pendingVerificationCount = submissions.filter((s) => s.status === 'under_review').length;
  const pendingPayouts = payouts.filter((p) => p.status === 'requested' || p.status === 'processing');
  const pendingPayoutsTotalCents = pendingPayouts.reduce((acc, p) => acc + (p.amountCents || 0), 0);

  const gmvData = [
    { day: 'Apr 1', gmv: 34000, revenue: 5100 },
    { day: 'Apr 6', gmv: 42000, revenue: 6300 },
    { day: 'Apr 11', gmv: 58000, revenue: 8700 },
    { day: 'Apr 16', gmv: 71000, revenue: 10650 },
    { day: 'Apr 21', gmv: 85000, revenue: 12750 },
    { day: 'Apr 26', gmv: 98000, revenue: 14700 },
    { day: 'Apr 30', gmv: 115000, revenue: 17250 },
  ];

  const liveActivity = [
    { type: 'payout', title: 'Automated PayPal Payout ($18.50)', user: 'Sarah K. (UAE)', time: '1m ago', tag: 'Double-Entry OK' },
    { type: 'submission', title: 'TikTok Duet Proof Verified (+$3.50)', user: 'Marcus V. (USA)', time: '3m ago', tag: 'AI 99.4% Match' },
    { type: 'campaign', title: 'New Campaign Created: $1,500 Escrow', user: 'Acme Brands Inc.', time: '7m ago', tag: 'Funded' },
    { type: 'kyc', title: 'Contributor KYC Verified (Level 3 Pro)', user: 'Chen W. (Singapore)', time: '12m ago', tag: 'ID Approved' },
    { type: 'fraud', title: 'Duplicate IP Submission Blocked', user: 'Flagged Contributor #9021', time: '18m ago', tag: 'Auto-Blocked' },
  ];

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. HEADER & SYSTEM STATUS PILL
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Super Admin Command Center
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Network-wide financial telemetry, user governance, AI proof queue, and system health.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#16B364] border border-emerald-200 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#16B364] animate-ping" />
            <span>All Systems Nominal &bull; OCR AI 99.98%</span>
          </span>
        </div>
      </div>

      {/* =========================================================================
          2. CORE EXECUTIVE METRICS
         ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Total Platform GMV</span>
          <span className="text-2xl sm:text-3xl font-black text-[#101828] mt-1 block">$1,480,250</span>
          <span className="text-[10px] text-[#16B364] font-bold block mt-1">&uarr; +24.8% vs last month</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Platform Net Revenue (15%)</span>
          <span className="text-2xl sm:text-3xl font-black text-[#168BFF] mt-1 block">$222,037.50</span>
          <span className="text-[10px] text-gray-400 block mt-1">Escrow fees automatically taken</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Active Campaigns</span>
          <span className="text-2xl sm:text-3xl font-black text-[#101828] mt-1 block">{campaigns.length}</span>
          <span className="text-[10px] text-[#16B364] font-bold block mt-1">Live in marketplace</span>
        </div>

        <Link to="/admin/payouts" className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs hover:border-amber-300 transition-colors block">
          <span className="text-xs text-gray-500 font-medium block">Pending Payout Queue</span>
          <span className="text-2xl sm:text-3xl font-black text-amber-600 mt-1 block">
            ${(pendingPayoutsTotalCents / 100).toFixed(2)}
          </span>
          <span className="text-[10px] text-amber-700 font-bold block mt-1">
            {pendingPayouts.length} requests ready for release &rarr;
          </span>
        </Link>
      </div>

      {/* =========================================================================
          3. REVENUE VOLUME CHART & QUICK ACTIONS
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E7ECF3] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-gray-900">Gross Merchandise Value &amp; Net Take-Rate</h2>
              <p className="text-xs text-gray-500">Trailing 30 days platform throughput</p>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
              30D GMV
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gmvData}>
                <defs>
                  <linearGradient id="gmvGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#168BFF" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#168BFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="gmv" stroke="#168BFF" strokeWidth={3} fillOpacity={1} fill="url(#gmvGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Action Rails */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E7ECF3] shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-black text-gray-900">Administrative Actions</h2>
            <p className="text-xs text-gray-500">Quick routing for high-priority operations</p>
          </div>

          <div className="space-y-2.5">
            <Link
              to="/admin/payouts"
              className="p-3.5 rounded-2xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200/80 flex items-center justify-between text-xs font-bold text-amber-900 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4 text-amber-700" />
                <span>Review Pending Payouts ({pendingPayouts.length} pending)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
            </Link>

            <Link
              to="/admin/verification"
              className="p-3.5 rounded-2xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200/80 flex items-center justify-between text-xs font-bold text-blue-900 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#168BFF]" />
                <span>AI Verification Queue ({pendingVerificationCount} proofs)</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#168BFF]" />
            </Link>

            <Link
              to="/admin/fraud"
              className="p-3.5 rounded-2xl bg-red-50/60 hover:bg-red-100/70 border border-red-200/80 flex items-center justify-between text-xs font-bold text-red-900 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span>Fraud Radar &amp; Sybil Flags</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-red-600" />
            </Link>

            <Link
              to="/admin/users"
              className="p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center justify-between text-xs font-bold text-gray-800 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-gray-600" />
                <span>Master User Directory</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-600" />
            </Link>
          </div>

          <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-[11px] text-gray-500 font-mono text-center">
            Double-Entry Ledger Integrity: 100% In Sync
          </div>
        </div>

      </div>

      {/* =========================================================================
          4. LIVE ACTIVITY STREAM
         ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E7ECF3] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#168BFF]" />
            <h2 className="text-base font-black text-gray-900">Live Platform Event Stream</h2>
          </div>
          <span className="text-xs text-gray-400 font-mono">Real-Time Ingestion</span>
        </div>

        <div className="divide-y divide-gray-100 text-xs">
          {liveActivity.map((act, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#168BFF]" />
                <div>
                  <span className="font-bold text-gray-900 block">{act.title}</span>
                  <span className="text-gray-400 text-[11px]">{act.user}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-[10px] font-mono font-bold">
                  {act.tag}
                </span>
                <span className="text-gray-400 font-mono text-[11px]">{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
