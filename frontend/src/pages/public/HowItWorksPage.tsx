import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserPlus,
  Compass,
  Send,
  Wallet,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Smartphone,
  Eye,
  Check,
  FileCheck,
  Zap,
  Building,
  Users,
  Target,
  BarChart3,
  HelpCircle,
  Lock,
  DollarSign,
  Layers,
} from 'lucide-react';
import {
  InstagramLogo,
  TikTokLogo,
  YouTubeLogo,
  FacebookLogo,
  WhatsAppLogo,
} from '../../components/common/PlatformIcons';

export const HowItWorksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contributor' | 'business'>('contributor');

  const contributorSteps = [
    {
      num: '01',
      title: 'Create Your Free Account in 45 Seconds',
      subtitle: 'Zero Fees &bull; Instant Access',
      desc: 'Sign up with just your phone number or email. BizNetwork will never charge you an upfront registration fee, membership cost, or deposit. You instantly unlock our open social marketplace.',
      actionTitle: 'Instant Registration',
      actionBadge: '100% Free Forever',
      icon: UserPlus,
      screenMock: (
        <div className="bg-[#07182F] text-white p-5 rounded-2xl border border-white/10 space-y-3 text-xs font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-[#20C4E8]">Quick Onboarding</span>
            <span className="text-[#16B364] font-bold">&check; Verified</span>
          </div>
          <div className="space-y-1.5">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span>Phone Verified</span>
              <span className="text-[#16B364]">&check;</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span>Country Assigned</span>
              <span className="text-[#20C4E8]">Global / 150+</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span>Membership Tier</span>
              <span className="font-bold text-amber-400">Starter (Level 1)</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      title: 'Choose Open Social Media Tasks',
      subtitle: 'Instagram, TikTok, YouTube & More',
      desc: 'Browse hundreds of live tasks filtered by your favorite social channels. Each task clearly states the exact cash reward, estimated time, and remaining slots.',
      actionTitle: 'Select From 1,840+ Tasks',
      actionBadge: '$0.40 - $8.50 Reward',
      icon: Compass,
      screenMock: (
        <div className="bg-[#07182F] text-white p-5 rounded-2xl border border-white/10 space-y-3 text-xs font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-[#20C4E8]">Marketplace Filter</span>
            <span className="text-gray-400 font-mono">1,842 Live</span>
          </div>
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-white/10 border border-pink-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <InstagramLogo className="w-4 h-4" />
                <span className="font-bold">Story Repost + Sticker</span>
              </div>
              <span className="font-black text-[#16B364]">+$0.65</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/10 border border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TikTokLogo className="w-4 h-4 text-white" />
                <span className="font-bold">15s Reaction Duet</span>
              </div>
              <span className="font-black text-[#20C4E8]">+$3.50</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '03',
      title: 'Complete the Action on Your Phone',
      subtitle: 'Takes 1 to 4 Minutes',
      desc: 'Follow the simple step-by-step instructions. Post the creative to your Instagram Story, record a 15-second TikTok duet, or share a recommendation in a Facebook group.',
      actionTitle: 'Natural Everyday Actions',
      actionBadge: '2-3 Mins Avg',
      icon: Smartphone,
      screenMock: (
        <div className="bg-[#07182F] text-white p-5 rounded-2xl border border-white/10 space-y-3 text-xs font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-white">Campaign Instruction Steps</span>
            <span className="text-[#20C4E8] font-mono">3 Steps</span>
          </div>
          <div className="space-y-1.5 text-[11px] text-gray-300">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-[9px]">1</span>
              <span>Download official campaign image</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-[9px]">2</span>
              <span>Post to your Story with tag @aurabotanics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-[9px]">3</span>
              <span>Take uncropped screenshot after posting</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '04',
      title: 'Instant AI Computer Vision Verification',
      subtitle: 'Screenshots Audited in ~12 Seconds',
      desc: 'Upload your proof screenshot or live post URL. Our automated computer vision AI checks timestamps, image resolution, and hashtag compliance in seconds.',
      actionTitle: 'Proprietary Vision OCR',
      actionBadge: '98.2% Auto-Approved',
      icon: ShieldCheck,
      screenMock: (
        <div className="bg-[#07182F] text-white p-5 rounded-2xl border border-white/10 space-y-3 text-xs font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-[#16B364]">AI Screening Telemetry</span>
            <span className="text-gray-400 font-mono">12.4s Latency</span>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-300">Timestamp Match</span>
              <span className="text-[#16B364] font-bold">100% Valid</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-300">Hashtag &amp; Account Handle</span>
              <span className="text-[#16B364] font-bold">Confirmed</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-300">Duplicate Image Hash</span>
              <span className="text-[#16B364] font-bold">Zero Match (Original)</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '05',
      title: 'Immediate Wallet Credit & Cash Out from $5.00',
      subtitle: 'PayPal, Wise, Bank & Crypto',
      desc: 'Upon approval, your reward is credited immediately to your double-entry ledger wallet. Request payouts anytime starting from just $5.00 with zero deduction.',
      actionTitle: 'Double-Entry Accounting',
      actionBadge: '$5.00 Min Cashout',
      icon: Wallet,
      screenMock: (
        <div className="bg-[#07182F] text-white p-5 rounded-2xl border border-white/10 space-y-3 text-xs font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-white">Wallet Balance</span>
            <span className="text-2xl font-black text-[#16B364]">$28.40</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#16B364] text-[11px] font-bold flex items-center justify-between">
            <span>Withdrawal Eligible</span>
            <span>$5.00 Min Met &check;</span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[10px] text-center text-gray-300">
            <span className="p-1 rounded bg-white/5">PayPal</span>
            <span className="p-1 rounded bg-white/5">Wise</span>
            <span className="p-1 rounded bg-white/5">Bank</span>
          </div>
        </div>
      ),
    },
  ];

  const businessSteps = [
    {
      num: '01',
      title: 'Create Your Brand Campaign & Target Audience',
      subtitle: 'Demographics, Geo-Targeting & Platform',
      desc: 'Define your objectives: viral brand awareness, app installs, user feedback surveys, or UGC video reviews. Choose specific country tiers, follower minimums, and platform requirements.',
      actionTitle: 'Precision Targeting',
      actionBadge: '150+ Countries',
      icon: Target,
      screenMock: (
        <div className="bg-[#07182F] text-white p-5 rounded-2xl border border-white/10 space-y-3 text-xs font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-[#20C4E8]">Audience Profile</span>
            <span className="text-[#16B364] font-bold">Configured</span>
          </div>
          <div className="space-y-1.5">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span>Geo Target</span>
              <span className="text-[#20C4E8]">UAE &bull; USA &bull; UK</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span>Channel</span>
              <span className="text-pink-400 font-bold">Instagram &amp; TikTok</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span>Desired Actions</span>
              <span className="text-emerald-400 font-bold">2,500 Submissions</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      title: 'Lock Campaign Budget into Smart Escrow',
      subtitle: 'Zero Waste &bull; 100% Guaranteed Delivery',
      desc: 'Deposit your campaign funds securely via Stripe, Wire, or Corporate Card. Your budget is locked in escrow and only released per verified and approved task completion.',
      actionTitle: 'Escrow Protection',
      actionBadge: '100% Refundable',
      icon: Lock,
      screenMock: (
        <div className="bg-[#07182F] text-white p-5 rounded-2xl border border-white/10 space-y-3 text-xs font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-white">Escrow Allocation</span>
            <span className="text-emerald-400 font-mono font-bold">$1,000.00 USD</span>
          </div>
          <div className="space-y-1 text-[11px] text-gray-300">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span>Reward per Completion:</span>
              <span className="text-white font-bold">$0.40</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span>Total Available Slots:</span>
              <span className="text-white font-bold">2,500 slots</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Unused Slot Policy:</span>
              <span className="text-[#16B364] font-bold">Auto-Refundable</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '03',
      title: 'Mobilize Over 500,000+ Real Micro-Contributors',
      subtitle: 'Authentic Organic Reach &bull; No Bots',
      desc: 'Your campaign instantly goes live across verified mobile earners worldwide. Real people post your media, generate organic impressions, and interact naturally with their own followers.',
      actionTitle: 'Decentralized Workforce',
      actionBadge: '528k+ Active Earners',
      icon: Users,
      screenMock: (
        <div className="bg-[#07182F] text-white p-5 rounded-2xl border border-white/10 space-y-3 text-xs font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-[#20C4E8]">Campaign Velocity</span>
            <span className="text-[#16B364] font-mono">180 Claims/Hour</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex justify-between text-[11px]">
              <span className="text-gray-300">Slots Filled:</span>
              <span className="font-bold text-white">1,480 / 2,500</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-[#168BFF] h-full w-[59%]" />
            </div>
            <span className="text-[10px] text-gray-400 block text-right">59% Completed</span>
          </div>
        </div>
      ),
    },
    {
      num: '04',
      title: 'Automated Computer Vision & Anti-Fraud Audit',
      subtitle: 'Zero Effort Proof Validation',
      desc: 'BizNetwork proprietary vision AI scans every submitted screenshot, validates timestamp against server clock, extracts hashtags with OCR, and detects duplicate image hashes.',
      actionTitle: 'AI Fraud Radar',
      actionBadge: 'Perceptual Hashing',
      icon: ShieldCheck,
      screenMock: (
        <div className="bg-[#07182F] text-white p-5 rounded-2xl border border-white/10 space-y-3 text-xs font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-[#16B364]">Vision OCR Telemetry</span>
            <span className="text-xs text-gray-400">12.4s Avg</span>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-300">Hashtag Verification:</span>
              <span className="text-[#16B364] font-bold">100% Match</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-gray-300">Duplicate Screening:</span>
              <span className="text-[#16B364] font-bold">0 Duplicates Passed</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-300">Auto-Approval Rate:</span>
              <span className="text-white font-bold">98.2%</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '05',
      title: 'Inspect Real-Time Analytics & Verified ROI',
      subtitle: 'Exportable Reports &bull; Certified Reach',
      desc: 'Access your Business Portal dashboard to monitor total impressions, verified links, geo-distribution, and user engagement. Download compliance reports for corporate audits.',
      actionTitle: 'Enterprise Reporting',
      actionBadge: 'Live Telemetry',
      icon: BarChart3,
      screenMock: (
        <div className="bg-[#07182F] text-white p-5 rounded-2xl border border-white/10 space-y-3 text-xs font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="font-bold text-white">Campaign Analytics</span>
            <span className="text-[#20C4E8] font-mono">Live</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="text-gray-400 block">Total Reach</span>
              <span className="text-base font-bold text-white">142,500</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <span className="text-gray-400 block">Avg CPM</span>
              <span className="text-base font-bold text-[#16B364]">$2.80</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentSteps = activeTab === 'contributor' ? contributorSteps : businessSteps;

  const faqs = [
    {
      q: 'Is BizNetwork 100% free for earners to join?',
      a: 'Yes, absolutely. BizNetwork will never charge any registration fee, monthly subscription, or account deposit to contributors. You keep 100% of the rewards you earn with zero withdrawal fees.',
    },
    {
      q: 'What is the minimum cashout amount and how do payouts work?',
      a: 'The minimum withdrawal is just $5.00 USD. We support instant transfers via PayPal (5-15 mins), Wise (2-4 hours), Direct Bank Wire / IBAN (1-2 business days), and USDC Crypto (5-10 mins).',
    },
    {
      q: 'How does BizNetwork verify that tasks are done correctly?',
      a: 'We utilize an advanced AI Computer Vision and OCR pipeline. When a contributor uploads a screenshot or post link, our system verifies device timestamps, hashtag accuracy, account handles, and image uniqueness within ~12 seconds.',
    },
    {
      q: 'How are campaign budgets protected for business advertisers?',
      a: 'Every campaign is backed by smart escrow. Advertisers only pay when a task is completed and verified against strict quality criteria. Any unused slots or expired campaign funds are 100% refundable.',
    },
  ];

  return (
    <div className="text-left font-sans min-h-screen bg-[#F7F9FC]">
      
      {/* =========================================================================
          1. BESPOKE HERO: DUAL JOURNEY INTRO
         ========================================================================= */}
      <section className="relative bg-[#07182F] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 overflow-hidden border-b border-white/10 bg-grid-mesh-dark">
        {/* Ambient Glows */}
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-[#168BFF]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#7357FF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#20C4E8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clear &bull; Transparent &bull; Automated Micro-Tasking</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            How BizNetwork Works For <br />
            <span className="bg-gradient-to-r from-[#20C4E8] via-[#168BFF] to-[#7357FF] bg-clip-text text-transparent">
              {activeTab === 'contributor' ? 'Earners & Social Creators' : 'Brands & Enterprise Advertisers'}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {activeTab === 'contributor'
              ? 'From choosing your first task to withdrawing cash into your bank or PayPal account in 5 straightforward steps. Zero fees to start.'
              : 'Launch targeted social campaigns, lock funds in escrow, mobilize 500k+ verified earners, and pay only for AI-audited results.'}
          </p>

          {/* Dual Perspective Toggle Selector */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setActiveTab('contributor')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'contributor'
                  ? 'bg-gradient-brand text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              For Earners &amp; Contributors
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('business')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'business'
                  ? 'bg-gradient-brand text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              For Brands &amp; Businesses
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. DETAILED STEP-BY-STEP FLOW
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-white bg-dot-pattern">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#168BFF] text-xs font-bold uppercase tracking-wider">
              {activeTab === 'contributor' ? 'Contributor Journey' : 'Advertiser Workflow'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              {activeTab === 'contributor' ? 'From Free Sign-Up to Real Cashout' : 'From Campaign Creation to Verified ROI'}
            </h2>
          </div>

          <div className="space-y-8">
            {currentSteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F9FC] rounded-3xl p-6 sm:p-10 border border-[#E4EAF2] shadow-sm hover:border-[#168BFF]/40 transition-all space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Step Description */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl sm:text-3xl font-black text-[#168BFF] font-mono px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100">
                          {s.num}
                        </span>
                        <div>
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                            {s.subtitle}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
                            {s.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {s.desc}
                      </p>

                      <div className="pt-2 flex items-center gap-3">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#16B364] border border-emerald-200">
                          {s.actionBadge}
                        </span>
                        <span className="text-xs font-bold text-gray-700">
                          {s.actionTitle}
                        </span>
                      </div>
                    </div>

                    {/* Right Simulated Screen Mock */}
                    <div className="md:col-span-5">
                      {s.screenMock}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. TRANSPARENCY & FAQ SECTION
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-[#F8FAFC] border-t border-[#E4EAF2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#168BFF] text-xs font-bold uppercase tracking-wider">
              Transparency First
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
              Everything you need to know about BizNetwork's policies, payments, and security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-xs space-y-2"
              >
                <h3 className="text-sm font-bold text-gray-900 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-[#168BFF] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. BOTTOM CALL TO ACTION
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-[#07182F] text-white relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {activeTab === 'contributor'
              ? 'Ready to Earn From Your Social Presence?'
              : 'Ready to Scale Your Brand with Real Earners?'}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            {activeTab === 'contributor'
              ? 'Join over 528,000 contributors worldwide. 100% free to register. Cash out from $5.00.'
              : 'Launch your campaign in 3 minutes with smart escrow protection and automated AI proof auditing.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={activeTab === 'contributor' ? '/signup/contributor' : '/signup/business'}
              className="px-8 py-3.5 bg-gradient-brand text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>{activeTab === 'contributor' ? 'Sign Up Free as Contributor' : 'Create Business Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={activeTab === 'contributor' ? '/tasks' : '/tasks'}
              className="px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all"
            >
              Explore Live Marketplace
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
