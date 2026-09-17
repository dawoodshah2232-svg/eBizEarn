import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  ChevronDown,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const BusinessReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const trendData = [
    { date: 'Apr 1', spend: 320, engagements: 480 },
    { date: 'Apr 6', spend: 450, engagements: 690 },
    { date: 'Apr 11', spend: 380, engagements: 580 },
    { date: 'Apr 16', spend: 610, engagements: 920 },
    { date: 'Apr 21', spend: 750, engagements: 1150 },
    { date: 'Apr 26', spend: 890, engagements: 1380 },
    { date: 'Apr 30', spend: 940, engagements: 1450 },
  ];

  const channelComparison = [
    { channel: 'Instagram', spend: 1240, cpa: '$0.65', returnRate: '4.2x' },
    { channel: 'TikTok', spend: 1850, cpa: '$3.50', returnRate: '5.1x' },
    { channel: 'YouTube', spend: 840, cpa: '$1.80', returnRate: '3.6x' },
    { channel: 'WhatsApp', spend: 520, cpa: '$0.45', returnRate: '3.1x' },
  ];

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. HEADER & EXPORT
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Analytics &amp; ROI Reports
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Evaluate brand reach, cost-per-action efficiency, and real-human social media engagement metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
          >
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{dateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07182F] hover:bg-[#0D2342] text-white text-xs font-bold shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF Report</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. KPI SUMMARY CARDS
         ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Total Verified Engagements</span>
          <span className="text-2xl font-black text-[#101828] mt-1 block">14,820</span>
          <span className="text-[10px] text-[#16B364] font-bold block mt-0.5">&uarr; 28% vs. prior period</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Average Cost Per Action</span>
          <span className="text-2xl font-black text-[#168BFF] mt-1 block">$0.72</span>
          <span className="text-[10px] text-[#16B364] font-bold block mt-0.5">&darr; 14% cheaper than ads</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Aggregate Spend</span>
          <span className="text-2xl font-black text-[#101828] mt-1 block">$4,450.00</span>
          <span className="text-[10px] text-gray-400 block mt-0.5">100% verified ledger proof</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Estimated ROI Multiple</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">4.2x</span>
          <span className="text-[10px] text-gray-400 block mt-0.5">Based on attributed conversions</span>
        </div>
      </div>

      {/* =========================================================================
          3. VISUALIZATION CHARTS
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Spend & Engagement Velocity */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E7ECF3] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-gray-900">Spend vs. Verified Engagements</h2>
              <p className="text-xs text-gray-500">Correlation of advertising budget to real human actions</p>
            </div>
            <span className="text-xs font-bold text-[#168BFF] bg-blue-50 px-2.5 py-1 rounded-full">
              Linear Efficiency
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="date" stroke="#98A2B3" fontSize={11} tickLine={false} />
                <YAxis stroke="#98A2B3" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#07182F', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                />
                <Line type="monotone" dataKey="engagements" stroke="#168BFF" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="spend" stroke="#16B364" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Breakdown */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E7ECF3] shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-black text-gray-900">Channel Efficiency</h2>
            <p className="text-xs text-gray-500">Cost-per-action comparison</p>
          </div>

          <div className="space-y-3">
            {channelComparison.map((ch, i) => (
              <div key={i} className="p-3 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-900">{ch.channel}</span>
                  <span className="text-[#168BFF] font-mono">{ch.cpa} CPA</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
                  <span>Spend: ${ch.spend}</span>
                  <span className="text-[#16B364] font-bold">ROI: {ch.returnRate}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs text-blue-900">
            <strong>Key Takeaway:</strong> TikTok duets delivered highest viral reach while Instagram Story reposts delivered the lowest CPA ($0.65).
          </div>
        </div>

      </div>

    </div>
  );
};
