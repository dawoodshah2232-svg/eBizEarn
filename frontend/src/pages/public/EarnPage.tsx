import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Smartphone,
  Award,
  CreditCard,
  Building2,
  Users,
  ChevronRight,
  HelpCircle,
  Star,
  Layers,
  Sparkles,
  Lock,
  Flame,
  Check,
  ExternalLink,
  ThumbsUp,
  Share2,
} from 'lucide-react';
import {
  GoogleLogo,
  MetaLogo,
  TikTokLogo,
  YouTubeLogo,
  AmazonLogo,
  InstagramLogo,
  FacebookLogo,
  WhatsAppLogo,
  TelegramLogo,
} from '../../components/common/PlatformIcons';

export const EarnPage: React.FC = () => {
  // Hero Interactive Social Matrix State
  const [activeChannel, setActiveChannel] = useState<'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'whatsapp'>('instagram');
  const [tasksPerDay, setTasksPerDay] = useState<number>(12);

  const channelData = {
    instagram: {
      name: 'Instagram Stories & Reels',
      reward: '$0.40 - $1.50',
      avgTime: '2 mins',
      liveTasks: '420 tasks live',
      desc: 'Repost sponsored campaign creatives, share brand link stickers on your Story, or tag friends in promotional posts.',
      badge: 'Highest Demand',
      color: 'from-pink-500 to-rose-500',
      icon: InstagramLogo,
      actionExample: 'Share "Aura Botanics Summer Glow" story with link sticker',
      payout: '$0.65',
    },
    tiktok: {
      name: 'TikTok Duets & Video Reactions',
      reward: '$2.00 - $8.50',
      avgTime: '4 mins',
      liveTasks: '185 tasks live',
      desc: 'Record a quick 15-second authentic reaction, duet with a brand product video, or use a sponsored promotional audio sound.',
      badge: 'Highest Payout',
      color: 'from-[#20C4E8] to-[#168BFF]',
      icon: TikTokLogo,
      actionExample: 'Record 15s duet reacting to EcoBottle launch with #EcoHydrate',
      payout: '$3.50',
    },
    youtube: {
      name: 'YouTube Feedback & Reviews',
      reward: '$1.00 - $3.50',
      avgTime: '3 mins',
      liveTasks: '310 tasks live',
      desc: 'Watch pre-release software walkthroughs, write structured and constructive comments, and help test video engagement.',
      badge: 'Fast Review',
      color: 'from-red-500 to-orange-500',
      icon: YouTubeLogo,
      actionExample: 'Watch 2-min FinTech app tutorial and leave constructive feedback',
      payout: '$1.80',
    },
    facebook: {
      name: 'Facebook Communities & Groups',
      reward: '$0.35 - $1.00',
      avgTime: '2 mins',
      liveTasks: '650 tasks live',
      desc: 'Share verified brand campaigns into niche interest groups and local community circles where you are already an active member.',
      badge: 'Easiest Entry',
      color: 'from-blue-600 to-indigo-600',
      icon: FacebookLogo,
      actionExample: 'Post real estate event notice into UAE Expat Entrepreneurs group',
      payout: '$0.50',
    },
    whatsapp: {
      name: 'WhatsApp Status & Broadcasts',
      reward: '$0.45 - $1.20',
      avgTime: '1 min',
      liveTasks: '290 tasks live',
      desc: 'Post verified brand graphics to your WhatsApp Status for 24 hours. Submit view count screenshot the following day.',
      badge: 'Quickest Action',
      color: 'from-emerald-500 to-teal-500',
      icon: WhatsAppLogo,
      actionExample: 'Post seasonal e-commerce flash sale banner to Status for 24h',
      payout: '$0.75',
    },
  };

  const currentChannel = channelData[activeChannel];
  const CurrentIcon = currentChannel.icon;

  const calculatedMonthly = (tasksPerDay * 0.90 * 30).toFixed(0);

  const progressionLevels = [
    {
      level: 'Starter Contributor',
      tier: 'Level 1',
      req: 'Verify phone number & email',
      perk: 'Access to social shares & surveys',
      cap: '$15 / day cap',
      badge: 'bg-gray-100 text-gray-700',
    },
    {
      level: 'Verified Contributor',
      tier: 'Level 2',
      req: '5 verified tasks with 90%+ score',
      perk: 'Unlocks app testing & priority AI review',
      cap: '$45 / day cap',
      badge: 'bg-blue-100 text-[#168BFF]',
    },
    {
      level: 'Trusted Partner',
      tier: 'Level 3',
      req: '25 tasks verified + 95% pass rate',
      perk: 'Unlocks high-paying TikTok & UGC tasks',
      cap: 'No daily cap',
      badge: 'bg-purple-100 text-[#7357FF]',
    },
    {
      level: 'Elite Squad',
      tier: 'Level 4',
      req: 'Top 5% contributors worldwide',
      perk: 'Direct brand campaigns & +10% cash bonus',
      cap: 'Unlimited + Bonuses',
      badge: 'bg-emerald-100 text-[#16B364]',
    },
  ];

  return (
    <div className="text-left font-sans min-h-screen bg-[#F7F9FC]">
      
      {/* =========================================================================
          1. BESPOKE HERO: SOCIAL EARNING COMMAND HUB & INTERACTIVE MATRIX
         ========================================================================= */}
      <section className="relative bg-[#07182F] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 overflow-hidden border-b border-white/10 bg-grid-mesh-dark">
        {/* Ambient neon orbs */}
        <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-[#168BFF]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#7357FF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Title Section */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#20C4E8]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zero Followers Required &bull; 100% Free Forever</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
              Monetize Your Everyday <br />
              <span className="bg-gradient-to-r from-[#20C4E8] via-[#168BFF] to-[#7357FF] bg-clip-text text-transparent">
                Social Media Presence.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Earn from $0.40 to $8.50 per task across Instagram, TikTok, YouTube, Facebook, and WhatsApp. Cash out starting from just <strong className="text-white font-bold">$5.00</strong> to PayPal, Wise, or Bank.
            </p>
          </div>

          {/* Interactive Social Channel Selector Bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {(['instagram', 'tiktok', 'youtube', 'facebook', 'whatsapp'] as const).map((key) => {
              const ch = channelData[key];
              const Icon = ch.icon;
              const isActive = activeChannel === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveChannel(key)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#168BFF] to-[#20C4E8] text-white shadow-xl shadow-[#168BFF]/40 scale-105'
                      : 'bg-white/10 text-gray-300 hover:bg-white/15 border border-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="capitalize">{key}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Live Matrix Hero Card */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/15 border border-white/20 shadow-md">
                    <CurrentIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#20C4E8] uppercase tracking-wider block">
                      Active Channel Focus
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">{currentChannel.name}</h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  {currentChannel.desc}
                </p>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Reward Range</span>
                    <span className="text-lg sm:text-xl font-black text-[#16B364]">{currentChannel.reward}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Average Time</span>
                    <span className="text-sm sm:text-base font-black text-white flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {currentChannel.avgTime}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Availability</span>
                    <span className="text-xs sm:text-sm font-black text-[#20C4E8]">{currentChannel.liveTasks}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    to="/signup/contributor"
                    className="px-8 py-3.5 bg-gradient-brand hover:opacity-95 text-white text-xs sm:text-sm font-black rounded-xl shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <span>Start Earning on {currentChannel.name.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/tasks"
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-bold rounded-xl border border-white/15 transition-all"
                  >
                    View Open Tasks
                  </Link>
                </div>
              </div>

              {/* Right: Live Simulated Task Card */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 text-gray-900 shadow-2xl border border-gray-100 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16B364] animate-ping" />
                    <span className="text-xs font-black text-gray-900 uppercase">Live Task Example</span>
                  </div>
                  <span className="text-base font-black text-[#16B364]">{currentChannel.payout}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Task Title:</span>
                  <h4 className="text-sm font-black text-gray-900">{currentChannel.actionExample}</h4>
                </div>

                <div className="p-3 rounded-xl bg-[#F7F9FC] border border-gray-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-gray-600">
                    <span>Task Requirements:</span>
                    <span className="font-bold text-gray-900">Screenshot Proof</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-600">
                    <span>AI Review Time:</span>
                    <span className="font-bold text-[#168BFF]">12 Seconds</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-600">
                    <span>Payout Eligibility:</span>
                    <span className="font-bold text-[#16B364]">Instant Wallet Credit</span>
                  </div>
                </div>

                <Link
                  to="/signup/contributor"
                  className="w-full py-3 bg-[#07182F] hover:bg-[#168BFF] text-white text-xs font-black rounded-xl text-center block transition-colors shadow-sm"
                >
                  Accept &amp; Start This Task
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. INTERACTIVE EARNING CALCULATOR (DENSE, NO EMPTY SPACE)
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-white bg-dot-pattern">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#16B364] text-xs font-bold uppercase tracking-wider">
              Earning Calculator
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              Estimate Your Monthly Social Earnings
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Drag the slider to see how many tasks you can complete per day.
            </p>
          </div>

          <div className="bg-[#F7F9FC] rounded-3xl p-6 sm:p-10 border border-[#E4EAF2] shadow-sm space-y-8">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-800">
                  Daily Social Tasks Completed
                </label>
                <span className="text-sm font-bold text-[#168BFF] px-3 py-1 bg-white border border-gray-200 rounded-xl shadow-xs">
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
                className="w-full accent-[#168BFF] h-2.5 bg-gray-200 rounded-lg cursor-pointer"
              />
              
              <div className="flex justify-between text-[11px] text-gray-400 font-bold">
                <span>Casual (3 tasks)</span>
                <span>Active (15 tasks)</span>
                <span>Power Earner (30 tasks)</span>
              </div>
            </div>

            {/* Projection cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-2xl bg-[#07182F] text-white">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Estimated Weekly Cashout</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#20C4E8] mt-1">
                  ${(parseFloat(calculatedMonthly) / 4).toFixed(0)} USD
                </div>
                <span className="text-[11px] text-gray-400 mt-1 block">Sent directly to your payment method</span>
              </div>

              <div className="sm:border-l sm:border-white/10 sm:pl-6">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Estimated 30-Day Potential</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#16B364] mt-1">
                  ${calculatedMonthly} USD
                </div>
                <span className="text-[11px] text-gray-400 mt-1 block">Assumes $0.90 average reward yield</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs text-gray-500">
                &bull; Min withdrawal is $5.00. Zero hidden fees, zero membership fees.
              </span>
              <Link
                to="/signup/contributor"
                className="px-6 py-3 bg-[#07182F] hover:bg-[#168BFF] text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2"
              >
                <span>Sign Up Free to Start</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          3. PROGRESSION TIERS & STREAK BONUSES (DENSE INFORMATION DESIGN)
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-[#F7F9FC] border-y border-[#E4EAF2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-purple-50 text-[#7357FF] text-xs font-bold uppercase tracking-wider">
              Merit-Based Rewards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              Level Up for Higher Rewards &amp; Bonuses
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Every verified task improves your contributor score, unlocking higher payouts, instant withdrawals, and daily streak rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {progressionLevels.map((lvl, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${lvl.badge}`}>
                      {lvl.tier}
                    </span>
                    <Award className="w-5 h-5 text-amber-500" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900">{lvl.level}</h4>
                  <div className="text-xs text-gray-500">
                    <span className="font-bold text-gray-700 block">Requirement:</span>
                    {lvl.req}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <div className="text-xs text-gray-800 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16B364] shrink-0" />
                    <span>{lvl.perk}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-bold">
                    Daily Cap: {lvl.cap}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. MULTI-RAIL CASHOUT METHODS ($5.00 MINIMUM)
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#168BFF] text-xs font-bold uppercase tracking-wider">
              Fintech Reliability
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              Get Paid Your Way From Just $5.00
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              No arbitrary $50 or $100 payout traps. As soon as your ledger balance hits $5.00, cash out immediately to your preferred channel.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'PayPal', min: '$5.00 min', time: 'Instant' },
              { name: 'Wise Transfer', min: '$5.00 min', time: 'Under 2h' },
              { name: 'Direct Bank', min: '$5.00 min', time: '1-2 Days' },
              { name: 'Revolut', min: '$5.00 min', time: 'Instant' },
              { name: 'USDT / USDC', min: '$5.00 min', time: '10 Mins' },
              { name: 'Mobile Money', min: '$5.00 min', time: 'Instant' },
            ].map((method, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#E4EAF2] text-center space-y-1 hover:border-[#168BFF]/40 transition-colors">
                <div className="text-xs font-bold text-gray-900">{method.name}</div>
                <div className="text-[10px] font-bold text-[#16B364]">{method.min}</div>
                <div className="text-[9px] text-gray-400">{method.time}</div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#07182F] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-0.5">
              <h4 className="text-sm font-bold">Double-Entry Financial Ledger Protection</h4>
              <p className="text-xs text-gray-300">Every cent earned is cryptographically journaled before and after withdrawal.</p>
            </div>
            <Link
              to="/signup/contributor"
              className="px-5 py-2.5 bg-gradient-brand text-white font-bold text-xs rounded-xl shadow shrink-0"
            >
              Open Earning Wallet
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. BOTTOM CONVERSION BANNER
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-[#07182F] text-white relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Ready to Start Earning From Your Social Accounts?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Join over 520,000 verified contributors globally. 100% free to join. Instant task availability.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup/contributor"
              className="px-8 py-3.5 bg-gradient-brand text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Create Free Account Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/tasks"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all"
            >
              Explore Open Tasks
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
