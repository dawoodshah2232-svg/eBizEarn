import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  CheckSquare,
  Clock,
  Wallet,
  ArrowRight,
  TrendingUp,
  Share2,
  Star,
  Play,
  Globe,
  Plus,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { InstagramLogo, GoogleLogo, YouTubeLogo, FacebookLogo, TikTokLogo } from '../../components/common/PlatformIcons';
import type { Task } from '../../types';
import { api } from '../../api/client';
import { usePlatform } from '../../context/PlatformDataContext';

export const ContributorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { tasks: platformTasks, submissions } = usePlatform();

  // Dynamic user performance calculated from reactive platform submissions
  const approvedCount = submissions.filter(
    (s) => s.status === 'approved' && (s.contributorName.includes('Sarah') || s.contributorName.includes('Jenkins'))
  ).length;
  const pendingCount = submissions.filter(
    (s) => s.status === 'under_review' && (s.contributorName.includes('Sarah') || s.contributorName.includes('Jenkins'))
  ).length;

  const totalCompleted = (user?.profile?.completed_tasks_count || 12) + approvedCount;
  const totalAvailable = platformTasks.length;

  // Weekly earnings chart data matching approved benchmark
  const earningsData = [
    { day: '10 Sep', amount: 12 },
    { day: '11 Sep', amount: 16 },
    { day: '12 Sep', amount: 19 },
    { day: '13 Sep', amount: 24 },
    { day: '14 Sep', amount: 27 },
    { day: '15 Sep', amount: 30 },
    { day: '16 Sep', amount: 32.4 },
  ];

  useEffect(() => {
    api.get('/tasks?per_page=6').then((res) => {
      if (res.data.success && res.data.data?.data) {
        // setTasks(res.data.data.data);
      }
    }).catch(() => {
      // Fallback default tasks
    });
  }, []);

  return (
    <div className="space-y-6 text-left">
      
      {/* =========================================================================
          1. FOUR TOP METRIC CARDS (Matching media_1789585422246.jpg)
         ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Tasks */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium block">Total Tasks</span>
            <span className="text-2xl sm:text-3xl font-black text-[#101828] mt-1 block">
              {totalCompleted + totalAvailable}
            </span>
            <span className="text-[11px] text-[#168BFF] font-semibold flex items-center gap-0.5 mt-0.5">
              +{totalAvailable} available
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#168BFF] flex items-center justify-center">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Completed */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium block">Completed</span>
            <span className="text-2xl sm:text-3xl font-black text-[#101828] mt-1 block">
              {totalCompleted}
            </span>
            <span className="text-[11px] text-[#18B76A] font-semibold flex items-center gap-0.5 mt-0.5">
              100% verified
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#18B76A] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Pending */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium block">Pending Review</span>
            <span className="text-2xl sm:text-3xl font-black text-[#101828] mt-1 block">
              {pendingCount > 0 ? `${pendingCount} Tasks` : `$${((user?.wallet?.pending_balance_cents ?? 450) / 100).toFixed(2)}`}
            </span>
            <span className="text-[11px] text-amber-500 font-semibold flex items-center gap-0.5 mt-0.5">
              {pendingCount > 0 ? 'In AI moderation queue' : 'Under AI review'}
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Available Wallet Balance */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium block">Wallet Balance</span>
            <span className="text-2xl sm:text-3xl font-black text-[#168BFF] mt-1 block">
              ${((user?.wallet?.available_balance_cents ?? 2840) / 100).toFixed(2)}
            </span>
            <Link to="/app/wallet" className="text-[11px] text-[#168BFF] font-semibold hover:underline mt-0.5 block">
              Cash Out &rarr;
            </Link>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-purple-50 text-[#7357FF] flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* =========================================================================
          2. HERO PROMOTIONAL BANNER & RECENT ACTIVITY (Split Grid)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Large Lifestyle Banner Card */}
        <div className="lg:col-span-8 rounded-3xl bg-gradient-to-r from-[#EBF2FF] via-[#F1EEFF] to-[#FAF8FF] border border-[#E7ECF3] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden shadow-xs relative">
          
          <div className="space-y-3 sm:max-w-md z-10 text-left">
            <span className="px-3 py-1 rounded-full bg-[#168BFF]/10 text-[#168BFF] text-xs font-bold uppercase tracking-wider">
              Ready for today's tasks?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#101828] tracking-tight">
              Your Tasks. Your Earnings.
            </h2>
            <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
              Complete simple online tasks, grow your daily income and achieve your financial goals with flexible digital gigs.
            </p>
            <div className="pt-2">
              <Link
                to="/app/tasks"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#168BFF] hover:bg-[#2F80FF] text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Browse Tasks</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-44 sm:w-56 h-44 sm:h-48 rounded-2xl overflow-hidden shadow-lg border-2 border-white shrink-0">
            <img
              src="/assets/demo/contributor-working.jpg"
              alt="Contributor smiling while working on laptop"
              className="w-full h-full object-cover object-center"
            />
          </div>

        </div>

        {/* Right 4 Cols: Recent Activity Card */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
              <span className="text-[10px] text-gray-400">Live Updates</span>
            </div>

            <div className="mt-3 space-y-3 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#18B76A] flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Task Completed</p>
                    <p className="text-[10px] text-gray-400">Instagram Post</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-[#18B76A]">+$0.40</span>
                  <span className="text-[9px] text-gray-400 block">2 min ago</span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#168BFF] flex items-center justify-center shrink-0 mt-0.5">
                    💳
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Payment Received</p>
                    <p className="text-[10px] text-gray-400">Wallet Top-up</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-[#168BFF]">+$12.00</span>
                  <span className="text-[9px] text-gray-400 block">2 hours ago</span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-50 text-[#7357FF] flex items-center justify-center shrink-0 mt-0.5">
                    ★
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">New Task Available</p>
                    <p className="text-[10px] text-gray-400">Facebook Group Post</p>
                  </div>
                </div>
                <span className="text-[9px] text-gray-400">3 hours ago</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-lg bg-cyan-50 text-[#20C4E8] flex items-center justify-center shrink-0 mt-0.5">
                    👥
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Referral Joined</p>
                    <p className="text-[10px] text-gray-400">Your friend joined</p>
                  </div>
                </div>
                <span className="text-[9px] text-gray-400">5 hours ago</span>
              </div>
            </div>
          </div>

          <Link
            to="/app/my-tasks"
            className="mt-4 pt-3 border-t border-gray-100 block text-center text-xs font-bold text-[#168BFF] hover:underline"
          >
            View All History &rarr;
          </Link>
        </div>

      </div>

      {/* =========================================================================
          3. AVAILABLE TASKS GRID & YOUR EARNINGS CHART (Split Grid)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: Available Tasks Cards Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-[#101828]">Available Tasks</h3>
              <p className="text-xs text-gray-500">Pick from verified high-converting tasks</p>
            </div>
            <Link to="/app/tasks" className="text-xs font-bold text-[#168BFF]">View All</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {platformTasks.slice(0, 4).map((task) => {
              const p = task.platform.toLowerCase();
              const IconComp = p.includes('tiktok')
                ? TikTokLogo
                : p.includes('youtube')
                ? YouTubeLogo
                : p.includes('facebook')
                ? FacebookLogo
                : p.includes('google')
                ? GoogleLogo
                : InstagramLogo;

              const bgGrad = p.includes('tiktok')
                ? 'bg-black text-white'
                : p.includes('youtube')
                ? 'bg-[#FF0000] text-white'
                : p.includes('facebook')
                ? 'bg-[#1877F2] text-white'
                : 'bg-gradient-to-tr from-pink-500 to-purple-600 text-white';

              return (
                <div
                  key={task.id}
                  className="p-4 rounded-2xl bg-white border border-[#E7ECF3] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  <div>
                    <div className={`w-9 h-9 rounded-xl ${bgGrad} flex items-center justify-center mb-2.5 shadow-xs`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#168BFF] transition-colors">
                      {task.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">{task.platform} &bull; ~{task.estimated_minutes} mins</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-black text-[#18B76A]">${(task.reward_cents / 100).toFixed(2)}</span>
                    <Link
                      to={`/app/tasks/${task.id}`}
                      className="px-3 py-1 rounded-lg bg-[#168BFF] hover:bg-[#2F80FF] text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      Start Task
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 4 Cols: Your Earnings Chart Card */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-medium block">Your Earnings</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-2xl font-black text-[#101828]">$32.40</span>
                <span className="text-xs font-bold text-[#18B76A]">▲ +12%</span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600">
              Last 7 days
            </span>
          </div>

          <div className="h-40 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData}>
                <defs>
                  <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#168BFF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#168BFF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  formatter={(value: any) => [`$${value}`, 'Earnings']}
                  contentStyle={{ borderRadius: '12px', fontSize: '11px', border: '1px solid #E7ECF3' }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#168BFF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#earnGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500">Available to Cash Out:</span>
            <Link to="/app/wallet" className="font-bold text-[#168BFF] hover:underline">
              Withdraw $28.40 &rarr;
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};
