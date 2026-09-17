import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sliders,
  DollarSign,
  Globe,
  Cpu,
  BarChart3,
  Layers,
  HelpCircle,
  Clock,
  Sparkles,
  Lock,
  ChevronRight,
  ExternalLink,
  Flame,
  Check,
  Smartphone,
  Share2,
  ThumbsUp,
  MessageSquare,
  Award,
  Star,
  CheckCheck,
} from 'lucide-react';
import {
  GoogleLogo,
  MetaLogo,
  TikTokLogo,
  YouTubeLogo,
  InstagramLogo,
  FacebookLogo,
  WhatsAppLogo,
  TrustpilotLogo,
  GoogleReviewLogo,
} from '../../components/common/PlatformIcons';
import { EBizLogo } from '../../components/common/EBizLogo';

export const ForBusinessesPage: React.FC = () => {
  // Interactive Campaign Simulator State
  const [objective, setObjective] = useState<'reviews' | 'social' | 'testing' | 'survey' | 'ugc'>('reviews');
  const [contributorCount, setContributorCount] = useState<number>(500);
  const [rewardPerTask, setRewardPerTask] = useState<number>(15.00);

  const objectiveConfig = {
    reviews: { defaultReward: 15.00, minReward: 10.00, label: 'Trustpilot & Google Reviews', badge: 'Reputation Shield' },
    social: { defaultReward: 2.50, minReward: 1.50, label: 'Social Engagement & Shares', badge: 'Viral Reach' },
    testing: { defaultReward: 8.00, minReward: 5.00, label: 'App Testing & Store Reviews', badge: 'QA & Installs' },
    survey: { defaultReward: 4.50, minReward: 3.00, label: 'GCC Consumer Market Surveys', badge: 'Insights' },
    ugc: { defaultReward: 18.00, minReward: 12.00, label: 'Authentic UGC & Video Clips', badge: 'Creator Assets' },
  };

  const handleObjectiveSelect = (key: 'reviews' | 'social' | 'testing' | 'survey' | 'ugc') => {
    setObjective(key);
    setRewardPerTask(objectiveConfig[key].defaultReward);
  };

  const contributorBudget = contributorCount * rewardPerTask;
  const platformFee = contributorBudget * 0.15;
  const totalBudget = (contributorBudget + platformFee).toFixed(2);
  const deliveryTime = contributorCount <= 250 ? '2 - 4 hours' : contributorCount <= 1000 ? '6 - 12 hours' : '12 - 24 hours';

  const comparisonRows = [
    {
      feature: 'Audience Authenticity',
      eBiz: '100% Real, Emirates ID & KYC-verified individuals',
      agencies: 'Individual influencers (unpredictable audience)',
      botFarms: 'Fake bot clusters (high ban risk & zero conversion)',
    },
    {
      feature: 'Verification Burden on You',
      eBiz: '0% Effort — eBiz AI & Admin team inspects 100% of proofs',
      agencies: 'High — hours spent coordinating contracts & checking posts',
      botFarms: 'None, but leads to platform account bans & penalization',
    },
    {
      feature: 'Reputation & Review Quality',
      eBiz: 'Constructive 5-star Trustpilot & Google Business reviews',
      agencies: 'Rarely handle direct review platforms',
      botFarms: 'Instantly detected and purged by Google / Trustpilot filters',
    },
    {
      feature: 'Cost Per Verified Action',
      eBiz: 'AED 2.50 – AED 18.00 per confirmed action',
      agencies: 'AED 2,500 – AED 25,000+ upfront flat retainer',
      botFarms: 'Cheap, but causes irreversible brand reputational damage',
    },
    {
      feature: 'Capital Protection',
      eBiz: 'UAE Central Bank compliant escrow: Pay only for approved proofs',
      agencies: 'Non-refundable upfront retainers regardless of output',
      botFarms: 'Zero buyer recourse or financial protection',
    },
  ];

  const caseStudies = [
    {
      brand: 'Royal Crescent Hospitality',
      industry: 'Luxury Hotels & Resorts &bull; Dubai, UAE',
      goal: 'Trustpilot & Google Business Review Sprint',
      stats: '4.9★ Average Rating &bull; 850 Verified Reviews in 48h',
      quote: 'eBiz Network mobilized hundreds of genuine UAE travelers to review their authentic stays on Google and Trustpilot. Our organic local search bookings doubled in 3 weeks without paying exorbitant ad commissions.',
    },
    {
      brand: 'NovaFin GCC Banking',
      industry: 'FinTech & Digital Neobank &bull; Abu Dhabi',
      goal: 'Pre-Release App Store Testing & KYC Flow UX',
      stats: '1,200 Verified Installs &bull; 99.4% Approval Rate',
      quote: 'Before our national rollout, eBiz Network verified users tested our biometric onboarding flow and caught 18 critical device-specific edge cases within 24 hours.',
    },
    {
      brand: 'Al Noor Organic Skincare',
      industry: 'E-Commerce & Luxury Wellness &bull; UAE & KSA',
      goal: 'Instagram Story Repost & TikTok Duet Surge',
      stats: '2,500 Stories Shared &bull; 4.8x ROAS Achieved',
      quote: 'The reach was unprecedented. Rather than paying an agency 20,000 AED for 2 influencers, we mobilized 2,500 everyday beauty lovers across the UAE who generated millions of authentic impressions.',
    },
  ];

  return (
    <div className="text-left font-sans min-h-screen bg-[#F7F9FC]">
      
      {/* =========================================================================
          1. BESPOKE CORPORATE PRESTIGE HERO BANNER
         ========================================================================= */}
      <section className="relative bg-[#07182F] text-white pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden border-b border-white/10 bg-grid-mesh-dark">
        {/* Glow ambient meshes */}
        <div className="absolute top-10 left-1/3 w-[550px] h-[550px] bg-[#168BFF]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-[#20C4E8]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: B2B Authority Messaging */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#20C4E8]">
                <Building2 className="w-3.5 h-3.5" />
                <span>Enterprise Brand Protection &amp; Social Distribution</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#16B364]" />
                <span className="text-white font-mono">UAE 🇦🇪 &bull; GCC &bull; Global</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
                Institutional Reputation, <br />
                <span className="bg-gradient-to-r from-[#20C4E8] via-[#168BFF] to-[#7357FF] bg-clip-text text-transparent">
                  Verified Reviews &amp; Social Scale.
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed font-normal">
                Deploy 10,000+ Emirates ID-verified human contributors across <strong>Trustpilot, Google Business, Instagram, TikTok, and App Stores</strong>. Safeguard your online prestige with automated AI OCR auditing and zero administrative overhead.
              </p>

              {/* Supported Platforms Strip */}
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Supported Networks:</span>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-1.5 text-xs font-bold" title="Trustpilot">
                    <TrustpilotLogo className="w-4 h-4" />
                    <span>Trustpilot</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 flex items-center gap-1.5 text-xs font-bold" title="Google Reviews">
                    <GoogleReviewLogo className="w-4 h-4" />
                    <span>Google Reviews</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 border border-white/15" title="Instagram">
                    <InstagramLogo className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 border border-white/15" title="TikTok">
                    <TikTokLogo className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-2 rounded-xl bg-white/10 border border-white/15" title="YouTube">
                    <YouTubeLogo className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/signup/business"
                  className="px-7 py-4 bg-gradient-brand hover:opacity-95 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>Launch Institutional Campaign</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#simulator"
                  className="px-6 py-4 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <Sliders className="w-4 h-4 text-[#20C4E8]" />
                  <span>AED Budget Simulator</span>
                </a>
              </div>

              {/* Corporate Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-[11px] text-gray-300 font-semibold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16B364] shrink-0" />
                  <span>Zero Verification Overhead</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#20C4E8] shrink-0" />
                  <span>Central Bank Escrow (AED)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#7357FF] shrink-0" />
                  <span>100% KYC Real Humans</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16B364] shrink-0" />
                  <span>Sub-4h Turnaround</span>
                </div>
              </div>

            </div>

            {/* Right Column: Live Enterprise Operations Console */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-[11px] font-mono text-gray-300 ml-1.5">eBiz Enterprise Rep Ops</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#16B364] bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Live Escrow Active
                  </span>
                </div>

                {/* Simulated Campaign Card */}
                <div className="bg-[#040F1E] rounded-2xl p-4 border border-white/10 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-gray-400 text-[10px]">
                    <span>SPONSOR: ROYAL_CRESCENT_UAE</span>
                    <span className="text-[#20C4E8]">ESCROW: 🇦🇪 AED 12,750.00</span>
                  </div>

                  <div className="text-white font-bold text-sm flex items-center gap-2">
                    <TrustpilotLogo className="w-4 h-4" />
                    <span>Trustpilot 5-Star Verified Experience</span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[10px] text-gray-300">
                      <span>425 of 500 Reviews Confirmed</span>
                      <span className="text-[#16B364] font-bold">AED 6,375.00 Disbursed</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#20C4E8] to-[#168BFF] w-[85%] rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                    <div className="p-2 rounded-xl bg-white/5">
                      <div className="text-[9px] text-gray-400 uppercase">Moderation</div>
                      <div className="text-xs font-bold text-emerald-400 mt-0.5">100% eBiz Admin</div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5">
                      <div className="text-[9px] text-gray-400 uppercase">Client Work</div>
                      <div className="text-xs font-bold text-[#20C4E8] mt-0.5">0 Hours</div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5">
                      <div className="text-[9px] text-gray-400 uppercase">Avg Rating</div>
                      <div className="text-xs font-bold text-amber-400 mt-0.5">★ 4.95 / 5.0</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-gray-300">Target Geographies:</span>
                  <span className="font-bold text-white">Dubai, Abu Dhabi, GCC, UK</span>
                </div>

                <Link
                  to="/signup/business"
                  className="w-full py-3.5 bg-gradient-brand text-white font-black text-xs rounded-xl text-center block shadow hover:opacity-95 transition-all"
                >
                  Create Corporate Account
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ZERO VERIFICATION BURDEN CALLOUT BANNER
         ========================================================================= */}
      <section className="py-8 bg-white border-b border-[#E4EAF2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#07182F] to-[#0D2A52] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#168BFF] text-white flex items-center justify-center shrink-0 mt-0.5">
                <CheckCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">Zero Verification Overhead for Business Owners</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#16B364]/20 text-[#16B364] border border-[#16B364]/30 text-[10px] font-black uppercase">
                    100% Automated &amp; Admin Audited
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
                  Unlike conventional platforms that burden your marketing managers with verifying thousands of screenshots and links, <strong>eBiz Network handles 100% of proof auditing</strong>. Our multi-agent AI Vision OCR inspects URLs, timestamps, account legitimacy, and review authenticity. Your team never reviews a single submission.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <div className="text-center px-4 py-2 bg-white/10 rounded-xl border border-white/15">
                <span className="text-[10px] text-gray-400 block uppercase">Client Review Burden</span>
                <span className="text-lg font-black text-[#16B364]">0%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. INTERACTIVE CAMPAIGN BUDGET ESTIMATOR (AED)
         ========================================================================= */}
      <section id="simulator" className="py-14 sm:py-16 bg-white bg-dot-pattern">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#168BFF] text-xs font-bold uppercase tracking-wider">
              UAE AED Budget Simulator
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              Interactive Campaign Cost &amp; Turnaround Calculator
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Customize your campaign parameters and inspect transparent budget breakdowns denominated in United Arab Emirates Dirham (AED).
            </p>
          </div>

          <div className="bg-[#F7F9FC] rounded-3xl p-6 sm:p-10 border border-[#E4EAF2] shadow-sm space-y-8">
            
            {/* Objective Pills */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-800 block">
                1. Select Campaign Objective
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {(['reviews', 'social', 'testing', 'survey', 'ugc'] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleObjectiveSelect(key)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      objective === key
                        ? 'border-[#168BFF] bg-blue-50/60 shadow-sm ring-2 ring-[#168BFF]/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-600 block mb-1">
                      {objectiveConfig[key].badge}
                    </span>
                    <div className={`text-xs font-bold ${objective === key ? 'text-[#168BFF]' : 'text-gray-900'} truncate`}>
                      {objectiveConfig[key].label}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      Rec: AED {objectiveConfig[key].defaultReward.toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contributor volume slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-800">
                  2. Number of Verified Contributors
                </label>
                <span className="text-sm font-bold text-[#168BFF] px-3 py-1 bg-white border border-gray-200 rounded-xl shadow-xs">
                  {contributorCount.toLocaleString()} Contributors
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="50"
                value={contributorCount}
                onChange={(e) => setContributorCount(parseInt(e.target.value, 10))}
                className="w-full accent-[#168BFF] h-2.5 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 font-bold">
                <span>Pilot (50)</span>
                <span>Growth (500)</span>
                <span>Enterprise Scale (3,000)</span>
              </div>
            </div>

            {/* Reward per Task slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-800">
                  3. Reward Paid Per Verified Task (AED 🇦🇪)
                </label>
                <span className="text-sm font-bold text-[#16B364] px-3 py-1 bg-white border border-gray-200 rounded-xl shadow-xs">
                  AED {rewardPerTask.toFixed(2)} د.إ
                </span>
              </div>
              <input
                type="range"
                min={objectiveConfig[objective].minReward}
                max="30.00"
                step="0.50"
                value={rewardPerTask}
                onChange={(e) => setRewardPerTask(parseFloat(e.target.value))}
                className="w-full accent-[#16B364] h-2.5 bg-gray-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 font-bold">
                <span>Min (AED {objectiveConfig[objective].minReward.toFixed(2)})</span>
                <span>Standard</span>
                <span>Executive Incentive (AED 30.00)</span>
              </div>
            </div>

            {/* Budget Output */}
            <div className="p-6 rounded-2xl bg-[#07182F] text-white space-y-4 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="text-gray-300">Direct Contributor Payout Subtotal</span>
                <span className="font-bold text-white">AED {contributorBudget.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="text-gray-300">UAE Central Bank Escrow &amp; AI Vision Moderation Fee (15%)</span>
                <span className="font-bold text-white">AED {platformFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-xs text-gray-300 block">Total Escrowed Budget (100% Refundable)</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#20C4E8] mt-0.5">
                    AED {totalBudget} <span className="text-xs font-normal text-white">د.إ</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-300 block">Estimated Completion</span>
                  <div className="text-sm font-bold text-[#16B364] mt-0.5 flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5" />
                    {deliveryTime}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-500">
                &bull; Unused funds remain safely in your escrow balance and can be refunded or reused anytime without penalties.
              </span>
              <Link
                to="/signup/business"
                className="px-7 py-3.5 bg-gradient-brand text-white text-xs sm:text-sm font-bold rounded-xl shadow hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Deploy Campaign to Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. REAL BUSINESS CASE STUDIES
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-[#F7F9FC] border-y border-[#E4EAF2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#16B364] text-xs font-bold uppercase tracking-wider">
              GCC &amp; Global Outcomes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              Enterprise Reputation &bull; Verified Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              How hospitality chains, retail conglomerates, and fintechs use eBiz Network to solidify online authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-gray-900">{cs.brand}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {cs.industry}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#168BFF] flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-[#168BFF]" />
                    <span>{cs.goal}</span>
                  </div>
                  <p className="text-xs text-gray-600 italic leading-relaxed">
                    "{cs.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <span className="text-xs font-bold text-[#16B364] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{cs.stats}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. COMPARISON MATRIX: EBIZ NETWORK VS AGENCIES & BOTS
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-purple-50 text-[#7357FF] text-xs font-bold uppercase tracking-wider">
              Market Superiority
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              Why Corporate Leaders Choose eBiz Network
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              A transparent comparison between verified micro-action networks, PR retainers, and synthetic spam.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#E4EAF2] shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#07182F] text-white">
                  <th className="p-4 sm:p-5 font-bold">Key Criteria</th>
                  <th className="p-4 sm:p-5 font-bold bg-[#168BFF] text-white">eBiz Network Platform</th>
                  <th className="p-4 sm:p-5 font-bold text-gray-300">Influencer &amp; PR Agencies</th>
                  <th className="p-4 sm:p-5 font-bold text-gray-300">Click &amp; Bot Farms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F7F9FC]'}>
                    <td className="p-4 sm:p-5 font-bold text-gray-900">{row.feature}</td>
                    <td className="p-4 sm:p-5 font-bold text-[#168BFF] bg-blue-50/40">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#16B364] shrink-0" />
                        <span>{row.eBiz}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-gray-600">{row.agencies}</td>
                    <td className="p-4 sm:p-5 text-red-600 font-semibold">{row.botFarms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. BOTTOM B2B CONVERSION
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-[#07182F] text-white relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Ready to Protect &amp; Elevate Your Brand?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Create your corporate account in 2 minutes. Fund via UAE Central Bank WPS, local bank wire, or credit card, and mobilize thousands of verified contributors.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup/business"
              className="px-8 py-4 bg-gradient-brand text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Create Corporate Business Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="px-7 py-4 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all"
            >
              Sign In to Business Portal
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
