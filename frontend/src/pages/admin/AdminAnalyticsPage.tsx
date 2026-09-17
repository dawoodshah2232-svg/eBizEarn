import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Globe,
  PieChart as PieIcon,
  Download,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export const AdminAnalyticsPage: React.FC = () => {
  const gmvGrowth = [
    { month: 'Nov 2025', gmv: 420000, revenue: 63000 },
    { month: 'Dec 2025', gmv: 610000, revenue: 91500 },
    { month: 'Jan 2026', gmv: 850000, revenue: 127500 },
    { month: 'Feb 2026', gmv: 1050000, revenue: 157500 },
    { month: 'Mar 2026', gmv: 1280000, revenue: 192000 },
    { month: 'Apr 2026', gmv: 1480250, revenue: 222037 },
  ];

  const countryDistribution = [
    { name: 'United Arab Emirates', value: 28, color: '#168BFF' },
    { name: 'United States', value: 22, color: '#16B364' },
    { name: 'United Kingdom', value: 16, color: '#7357FF' },
    { name: 'Germany', value: 12, color: '#F79009' },
    { name: 'Singapore', value: 10, color: '#20C4E8' },
    { name: 'Others (145+ Countries)', value: 12, color: '#98A2B3' },
  ];

  const railVolume = [
    { rail: 'PayPal Instant', percent: '48%', amount: '$710,500' },
    { rail: 'Wise Multi-Currency', percent: '26%', amount: '$384,800' },
    { rail: 'Direct Bank ACH/Wire', percent: '18%', amount: '$266,400' },
    { rail: 'Crypto USDC/USDT', percent: '8%', amount: '$118,550' },
  ];

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. HEADER
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Platform Macro Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Network financial performance, take-rate revenues, geographic demographics, and disbursal volumes.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07182F] hover:bg-[#0D2342] text-white text-xs font-bold shadow-xs self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Master Financials</span>
        </button>
      </div>

      {/* =========================================================================
          2. SUMMARY TILES
         ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Trailing 6M GMV</span>
          <span className="text-2xl sm:text-3xl font-black text-[#101828] mt-1 block">$5.69M</span>
          <span className="text-[10px] text-[#16B364] font-bold block mt-1">&uarr; +252% Year-over-Year</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Aggregate Platform Take</span>
          <span className="text-2xl sm:text-3xl font-black text-[#168BFF] mt-1 block">$853,500</span>
          <span className="text-[10px] text-gray-400 block mt-1">Blended 15.0% take-rate margin</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Total Tasks Verified</span>
          <span className="text-2xl sm:text-3xl font-black text-[#101828] mt-1 block">3,492,100</span>
          <span className="text-[10px] text-gray-400 block mt-1">99.2% Computer Vision precision</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Disbursed Contributor Cash</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1 block">$4.83M</span>
          <span className="text-[10px] text-[#16B364] font-bold block mt-1">Zero bad-debt write-offs</span>
        </div>
      </div>

      {/* =========================================================================
          3. GROWTH VISUALIZATIONS
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* GMV Growth */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E7ECF3] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-gray-900">Platform GMV &amp; Net Margin Velocity</h2>
              <p className="text-xs text-gray-500">Monthly Gross Transaction Value (USD)</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#168BFF]">15% Automated Take</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gmvGrowth}>
                <defs>
                  <linearGradient id="gmvArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#168BFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#168BFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#98A2B3" fontSize={11} tickLine={false} />
                <YAxis stroke="#98A2B3" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#07182F', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="gmv" stroke="#168BFF" strokeWidth={2.5} fill="url(#gmvArea)" />
                <Area type="monotone" dataKey="revenue" stroke="#16B364" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Geographic Breakdown */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E7ECF3] shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-black text-gray-900">Geographic Spread</h2>
            <p className="text-xs text-gray-500">Contributor regional density</p>
          </div>

          <div className="space-y-2.5">
            {countryDistribution.map((c, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-gray-800 font-medium">{c.name}</span>
                </div>
                <span className="font-mono font-bold text-gray-900">{c.value}%</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
              Payout Rails Volume Split:
            </span>
            <div className="space-y-1.5">
              {railVolume.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-600">{r.rail}</span>
                  <span className="font-mono font-bold text-gray-900">{r.percent} ({r.amount})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
