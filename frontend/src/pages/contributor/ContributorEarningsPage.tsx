import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  TrendingUp,
  Award,
  Calendar,
  Wallet,
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const ContributorEarningsPage: React.FC = () => {
  const [tasksPerDay, setTasksPerDay] = useState<number>(12);

  // 7-day earnings historical data
  const chartData = [
    { day: 'Mon', earnings: 3.20 },
    { day: 'Tue', earnings: 4.50 },
    { day: 'Wed', earnings: 2.80 },
    { day: 'Thu', earnings: 5.60 },
    { day: 'Fri', earnings: 6.40 },
    { day: 'Sat', earnings: 4.90 },
    { day: 'Sun', earnings: 5.00 },
  ];

  const categoryBreakdown = [
    { category: 'Social Shares & Posts', earned: '$18.40', percentage: 56, count: 28, color: 'bg-[#168BFF]' },
    { category: 'Mobile App Testing', earned: '$8.50', percentage: 26, count: 4, color: 'bg-[#7357FF]' },
    { category: 'Consumer Surveys', earned: '$4.00', percentage: 12, count: 4, color: 'bg-[#16B364]' },
    { category: 'Referral Rewards', earned: '$1.50', percentage: 6, count: 3, color: 'bg-[#F79009]' },
  ];

  const projectedMonthly = (tasksPerDay * 0.85 * 30).toFixed(2);

  return (
    <div className="space-y-6 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#101828]">Earnings &amp; Performance</h2>
          <p className="text-xs text-[#667085] mt-0.5">
            Detailed breakdown of your completed task rewards, level progression, and payout forecasts.
          </p>
        </div>
        <Link
          to="/app/wallet"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#07182F] hover:bg-[#168BFF] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
        >
          <Wallet className="w-4 h-4" />
          <span>Manage Wallet &amp; Payouts</span>
        </Link>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Lifetime Earned</span>
          <div className="text-2xl sm:text-3xl font-black text-[#101828]">$84.20</div>
          <div className="text-[10px] text-[#16B364] font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+$32.40 this week</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">This Week Earned</span>
          <div className="text-2xl sm:text-3xl font-black text-[#168BFF]">$32.40</div>
          <div className="text-[10px] text-gray-400">7-day rolling total</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Pending Verification</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-500">$1.40</div>
          <div className="text-[10px] text-gray-400">2 tasks under AI review</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Avg. Reward Per Task</span>
          <div className="text-2xl sm:text-3xl font-black text-[#7357FF]">$0.68</div>
          <div className="text-[10px] text-gray-400">Above global median</div>
        </div>
      </div>

      {/* Level Progression & Daily Streak Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Contributor Level Card */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#7357FF] flex items-center justify-center font-black">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current Contributor Rank</span>
                <h3 className="text-base font-bold text-gray-900">Level 3 &bull; Trusted Partner</h3>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-[#7357FF] text-xs font-bold">
              96% Pass Rate
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Progress to Level 4 (Elite Squad):</span>
              <span className="font-bold text-gray-900">21 of 25 Tasks Completed</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#168BFF] to-[#7357FF] w-[84%] rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-[#F7F9FC] border border-gray-100">
              <span className="text-gray-400 block text-[10px] font-semibold">Unlocked Perk</span>
              <span className="font-bold text-gray-800">Priority Verification</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F9FC] border border-gray-100">
              <span className="text-gray-400 block text-[10px] font-semibold">Daily Cashout Limit</span>
              <span className="font-bold text-gray-800">Unlimited</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F9FC] border border-gray-100">
              <span className="text-gray-400 block text-[10px] font-semibold">Next Unlock</span>
              <span className="font-bold text-[#16B364]">+10% Bonus per Task</span>
            </div>
          </div>
        </div>

        {/* Daily Streak Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#07182F] to-[#0D2342] text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>5-Day Streak</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">Day 5/7</span>
            </div>
            <h4 className="text-lg font-black text-white">Daily Earner Streak</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Complete at least 1 task every day to unlock your Sunday streak bonus (+$1.00 cash).
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-gray-400">Bonus in:</span>
            <span className="font-bold text-[#20C4E8]">2 Days Remaining</span>
          </div>
        </div>

      </div>

      {/* 7-Day Performance Chart & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Recharts Area Graph */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">7-Day Earning Trajectory</h3>
              <p className="text-xs text-gray-400">Daily approved rewards in USD</p>
            </div>
            <span className="text-xs font-bold text-[#16B364] bg-emerald-50 px-2.5 py-1 rounded-lg">
              +$32.40 Total
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="earningsArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#168BFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#168BFF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4EAF2" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#667085' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#667085' }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  formatter={(value: any) => [`$${value}`, 'Earnings']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E4EAF2', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="earnings" stroke="#168BFF" strokeWidth={3} fillOpacity={1} fill="url(#earningsArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Category Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Earnings by Category</h3>
            <p className="text-xs text-gray-400">Where your income originates</p>
          </div>

          <div className="space-y-4">
            {categoryBreakdown.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-800">{cat.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-mono">({cat.count} tasks)</span>
                    <span className="font-black text-gray-900">{cat.earned}</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100">
            <Link
              to="/app/tasks"
              className="w-full py-2.5 bg-[#F7F9FC] hover:bg-gray-100 text-gray-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Explore High-Reward Tasks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Projection Simulator Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E4EAF2] shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900">Monthly Income Forecast Simulator</h3>
            <p className="text-xs text-gray-500">Estimate how much you can earn next month by tweaking your daily activity.</p>
          </div>
          <span className="text-sm font-black text-[#168BFF] px-3 py-1 bg-blue-50 rounded-lg">
            {tasksPerDay} Tasks / Day
          </span>
        </div>

        <input
          type="range"
          min="3"
          max="30"
          step="1"
          value={tasksPerDay}
          onChange={(e) => setTasksPerDay(parseInt(e.target.value, 10))}
          className="w-full accent-[#168BFF] h-2 bg-gray-200 rounded-lg cursor-pointer"
        />

        <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">Projected 30-Day Total</span>
            <div className="text-3xl font-black text-[#16B364] mt-0.5">
              ${projectedMonthly} USD
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">Assumes current average task reward rate of $0.85</p>
          </div>

          <Link
            to="/app/tasks"
            className="px-6 py-3 bg-[#07182F] hover:bg-[#168BFF] text-white text-xs font-bold rounded-xl transition-colors shrink-0 shadow-sm"
          >
            Start Available Tasks Now
          </Link>
        </div>
      </div>

    </div>
  );
};
