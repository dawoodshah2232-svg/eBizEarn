import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Megaphone,
  DollarSign,
  Users,
  TrendingUp,
  Coins,
  ArrowRight,
  Calendar,
  ChevronDown,
  MoreHorizontal,
  Plus,
} from 'lucide-react';
import {
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
import {
  InstagramLogo,
  TikTokLogo,
  YouTubeLogo,
  FacebookLogo,
  GoogleLogo,
  XTwitterLogo,
} from '../../components/common/PlatformIcons';
import { usePlatform } from '../../context/PlatformDataContext';

export const BusinessDashboardPage: React.FC = () => {
  const { campaigns } = usePlatform();

  // Performance chart data
  const performanceData = [
    { day: 'Apr 1', completions: 220, spend: 110 },
    { day: 'Apr 5', completions: 340, spend: 170 },
    { day: 'Apr 9', completions: 290, spend: 145 },
    { day: 'Apr 13', completions: 420, spend: 210 },
    { day: 'Apr 17', completions: 480, spend: 240 },
    { day: 'Apr 21', completions: 610, spend: 305 },
    { day: 'Apr 25', completions: 750, spend: 375 },
    { day: 'Apr 29', completions: 890, spend: 445 },
  ];

  // Distribution chart data
  const distributionData = [
    { name: 'Social Media Engagement', value: 38, color: '#168BFF' },
    { name: 'App Downloads', value: 22, color: '#18B76A' },
    { name: 'Product Reviews', value: 15, color: '#7357FF' },
    { name: 'Sign Ups', value: 13, color: '#F79009' },
    { name: 'Video Views', value: 12, color: '#20C4E8' },
  ];

  return (
    <div className="space-y-6 text-left font-sans">
      
      {/* =========================================================================
          1. TITLE BAR & DATE RANGE SELECTOR
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Client Campaign Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Launch campaigns, set budgets, and track verified task completions.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E7ECF3] shadow-xs text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors self-start sm:self-auto"
        >
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>Apr 1, 2026 &ndash; Apr 30, 2026</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
        </button>
      </div>

      {/* =========================================================================
          2. FIVE CORE METRICS CARDS (Matching media_1789585455057.jpg)
         ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        {/* Metric 1 */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#168BFF] flex items-center justify-center mb-3">
            <Megaphone className="w-5 h-5" />
          </div>
          <span className="text-xs text-gray-500 font-medium block">Active Campaigns</span>
          <span className="text-2xl sm:text-3xl font-black text-[#101828] mt-1 block">{campaigns.length}</span>
          <span className="text-[11px] text-[#18B76A] font-bold flex items-center gap-0.5 mt-1">
            &uarr; 33% <span className="text-gray-400 font-normal">vs. last month</span>
          </span>
        </div>

        {/* Metric 2 */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#18B76A] flex items-center justify-center mb-3">
            <DollarSign className="w-5 h-5" />
          </div>
          <span className="text-xs text-gray-500 font-medium block">Budget Spent</span>
          <span className="text-2xl sm:text-3xl font-black text-[#101828] mt-1 block">$4,280</span>
          <span className="text-[11px] text-[#18B76A] font-bold flex items-center gap-0.5 mt-1">
            &uarr; 12% <span className="text-gray-400 font-normal">vs. last month</span>
          </span>
        </div>

        {/* Metric 3 */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#7357FF] flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xs text-gray-500 font-medium block">Verified Completions</span>
          <span className="text-2xl sm:text-3xl font-black text-[#101828] mt-1 block">8,943</span>
          <span className="text-[11px] text-[#18B76A] font-bold flex items-center gap-0.5 mt-1">
            &uarr; 28% <span className="text-gray-400 font-normal">vs. last month</span>
          </span>
        </div>

        {/* Metric 4 */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-xs text-gray-500 font-medium block">Conversion Rate</span>
          <span className="text-2xl sm:text-3xl font-black text-[#101828] mt-1 block">2.8%</span>
          <span className="text-[11px] text-[#18B76A] font-bold flex items-center gap-0.5 mt-1">
            &uarr; 0.6% <span className="text-gray-400 font-normal">vs. last month</span>
          </span>
        </div>

        {/* Metric 5 */}
        <div className="col-span-2 md:col-span-1 p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Coins className="w-5 h-5" />
          </div>
          <span className="text-xs text-gray-500 font-medium block">Cost per Task</span>
          <span className="text-2xl sm:text-3xl font-black text-[#101828] mt-1 block">$0.48</span>
          <span className="text-[11px] text-[#18B76A] font-bold flex items-center gap-0.5 mt-1">
            &darr; 18% <span className="text-gray-400 font-normal">vs. last month</span>
          </span>
        </div>

      </div>

      {/* =========================================================================
          3. CREATE NEW CAMPAIGN STEPPER BANNER (Matching media_1789585455057.jpg)
         ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-black text-[#101828]">Create New Campaign</h2>
            <p className="text-xs text-[#667085]">Get your campaign live in a few simple steps.</p>
          </div>
          <Link
            to="/business/campaigns/create"
            className="px-6 py-3 rounded-2xl bg-[#168BFF] hover:bg-[#2F80FF] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
          >
            <span>Create Campaign</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Stepper Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6">
          
          <div className="space-y-1">
            <div className="w-7 h-7 rounded-full bg-[#168BFF] text-white text-xs font-bold flex items-center justify-center mb-2">
              1
            </div>
            <p className="text-xs font-bold text-gray-900">Create Campaign</p>
            <p className="text-[10px] text-gray-400">Name and set goals</p>
          </div>

          <div className="space-y-1">
            <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center mb-2">
              2
            </div>
            <p className="text-xs font-bold text-gray-900">Choose Task Types</p>
            <p className="text-[10px] text-gray-400">Select available tasks</p>
          </div>

          <div className="space-y-1">
            <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center mb-2">
              3
            </div>
            <p className="text-xs font-bold text-gray-900">Upload Creatives</p>
            <p className="text-[10px] text-gray-400">Images, videos, or links</p>
          </div>

          <div className="space-y-1">
            <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center mb-2">
              4
            </div>
            <p className="text-xs font-bold text-gray-900">Set Regions</p>
            <p className="text-[10px] text-gray-400">Target locations</p>
          </div>

          <div className="space-y-1">
            <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center mb-2">
              5
            </div>
            <p className="text-xs font-bold text-gray-900">Set Budget</p>
            <p className="text-[10px] text-gray-400">Daily or total budget</p>
          </div>

          <div className="space-y-1">
            <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center mb-2">
              6
            </div>
            <p className="text-xs font-bold text-gray-900">Launch</p>
            <p className="text-[10px] text-gray-400">Review and go live</p>
          </div>

        </div>
      </div>

      {/* =========================================================================
          4. PERFORMANCE & TASK DISTRIBUTION CHARTS (Split Grid)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: Campaign Performance Bar Chart */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black text-[#101828]">Campaign Performance</h3>
              <p className="text-xs text-[#667085]">Verified completions and spend over time.</p>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-700">
              Last 30 Days &or;
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px', border: '1px solid #E7ECF3' }} />
                <Bar dataKey="completions" fill="#168BFF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 4 Cols: Task Type Distribution Donut Chart */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-black text-[#101828]">Task Type Distribution</h3>
            <p className="text-xs text-[#667085]">Share of completed tasks across campaigns.</p>
          </div>

          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-black text-[#101828]">8,943</span>
              <span className="text-[9px] text-gray-400">Completions</span>
            </div>
          </div>

          {/* Legend list */}
          <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs">
            {distributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600 text-[11px]">{item.name}</span>
                </div>
                <span className="font-bold text-gray-900 text-[11px]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* =========================================================================
          5. RUNNING CAMPAIGNS TABLE (Matching media_1789585455057.jpg)
         ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2">
          <div>
            <h3 className="text-base font-black text-[#101828]">Running Campaigns</h3>
            <p className="text-xs text-[#667085]">Your active campaigns and their live performance.</p>
          </div>
          <Link
            to="/business/campaigns"
            className="text-xs font-bold text-[#168BFF] hover:underline flex items-center gap-1"
          >
            <span>View All Campaigns</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase text-[10px]">
                <th className="py-3 px-3">Campaign Name</th>
                <th className="py-3 px-3">Task Types</th>
                <th className="py-3 px-3">Budget</th>
                <th className="py-3 px-3">Spent</th>
                <th className="py-3 px-3">Verified Completions</th>
                <th className="py-3 px-3">Conversion Rate</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {campaigns.map((c, idx) => {
                const isInstagram = c.platform.toLowerCase().includes('instagram');
                const isTikTok = c.platform.toLowerCase().includes('tiktok');
                const isYouTube = c.platform.toLowerCase().includes('youtube');
                const isFacebook = c.platform.toLowerCase().includes('facebook');
                const IconComp = isInstagram ? InstagramLogo : isTikTok ? TikTokLogo : isYouTube ? YouTubeLogo : isFacebook ? FacebookLogo : GoogleLogo;
                const initials = c.title.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase();
                const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500', 'bg-cyan-500'];
                const bgCol = colors[idx % colors.length];

                return (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-3">
                      <Link to={`/business/campaigns/${c.id}`} className="flex items-center gap-3 group">
                        <div className={`w-8 h-8 rounded-xl ${bgCol} text-white flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform`}>
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-[#168BFF] transition-colors">{c.title}</p>
                          <p className="text-[10px] text-gray-400">{c.brand} &bull; {c.platform}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        <IconComp className="w-4 h-4" />
                        <span className="text-[10px] text-gray-500 font-bold">{c.platform}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-gray-900">{c.totalBudget}</td>
                    <td className="py-3.5 px-3 text-gray-600">{c.spent}</td>
                    <td className="py-3.5 px-3 font-bold text-gray-900">{c.slotsTaken} / {c.slotsTotal}</td>
                    <td className="py-3.5 px-3 text-[#18B76A] font-bold">98.5%</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        c.status === 'Live' ? 'bg-emerald-50 text-[#18B76A]' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Link to={`/business/campaigns/${c.id}`} className="text-xs font-bold text-[#168BFF] hover:underline">
                        View &rarr;
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
