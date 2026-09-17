import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  Play,
  Star,
  CheckCircle2,
  TrendingUp,
  UserPlus,
  Compass,
  Send,
  Wallet,
  Globe,
  Award,
  Users,
  CheckSquare,
  Building,
  Clock,
  Sparkles,
  ChevronDown,
  Gift,
  ShieldAlert,
  Sliders,
  ExternalLink,
  ChevronRight,
  Eye,
  Check,
  Smartphone,
  Trophy,
  HelpCircle,
  Lock,
  Flame,
  MessageCircle,
  Share2,
  ThumbsUp,
  DollarSign,
  Heart,
  BarChart3,
  Cpu,
  Activity,
  CheckCheck,
  RefreshCw,
  Camera,
  Bell,
  Wifi,
} from 'lucide-react';
import {
  GoogleLogo,
  MetaLogo,
  TikTokLogo,
  YouTubeLogo,
  InstagramLogo,
  XTwitterLogo,
  FacebookLogo,
  LinkedInLogo,
  AmazonLogo,
  WhatsAppLogo,
  TelegramLogo,
} from '../../components/common/PlatformIcons';

export const HomePage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedSocialTab, setSelectedSocialTab] = useState<'all' | 'instagram' | 'tiktok' | 'youtube' | 'facebook'>('all');
  const [calculatorHours, setCalculatorHours] = useState<number>(1);
  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const calculatedMonthly = (calculatorHours * 6.50 * 30).toFixed(0);

  const socialFormats = [
    {
      platform: 'Instagram',
      title: 'Story Reposts & Link Stickers',
      reward: '$0.40 - $1.50',
      time: '2 mins',
      slots: '420 slots left',
      desc: 'Share verified promotional creative to your personal story with official brand sticker and campaign tags.',
      icon: InstagramLogo,
      badgeColor: 'bg-pink-50 text-pink-700 border-pink-200',
      tag: 'Most Popular',
      accentColor: 'from-pink-500 to-rose-500',
    },
    {
      platform: 'TikTok',
      title: 'Duets, Sounds & Video Reviews',
      reward: '$2.00 - $8.50',
      time: '5 mins',
      slots: '185 slots left',
      desc: 'Record a quick 15-second authentic reaction duet or use sponsored sound clips to boost brand visibility.',
      icon: TikTokLogo,
      badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      tag: 'High Earning',
      accentColor: 'from-[#20C4E8] to-[#168BFF]',
    },
    {
      platform: 'YouTube',
      title: 'Feedback, Likes & Community Votes',
      reward: '$1.00 - $3.50',
      time: '4 mins',
      slots: '310 slots left',
      desc: 'Watch pre-release video trailers or product demos, leave thoughtful constructive feedback, and subscribe.',
      icon: YouTubeLogo,
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      tag: 'Quick & Easy',
      accentColor: 'from-red-500 to-orange-500',
    },
    {
      platform: 'Facebook',
      title: 'Niche Group & Community Shares',
      reward: '$0.35 - $1.00',
      time: '2 mins',
      slots: '650 slots left',
      desc: 'Share verified brand campaigns and announcements into relevant discussion communities and local groups.',
      icon: FacebookLogo,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      tag: 'High Volume',
      accentColor: 'from-blue-600 to-indigo-600',
    },
    {
      platform: 'WhatsApp',
      title: 'Status Updates & Broadcast Posts',
      reward: '$0.45 - $1.20',
      time: '1 min',
      slots: '290 slots left',
      desc: 'Publish verified business promotions to your WhatsApp Status for 24 hours and submit view screenshot.',
      icon: WhatsAppLogo,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      tag: 'Fastest Completion',
      accentColor: 'from-emerald-500 to-teal-500',
    },
    {
      platform: 'App Testing',
      title: 'Pre-Release Testing & Store Ratings',
      reward: '$1.80 - $5.00',
      time: '5 mins',
      slots: '140 slots left',
      desc: 'Download newly launched iOS or Android apps, test core navigation flows, and leave genuine user ratings.',
      icon: Smartphone,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      tag: 'Top Rated',
      accentColor: 'from-purple-600 to-indigo-600',
    },
  ];

  const filteredTasks = socialFormats.filter((item) => {
    if (selectedSocialTab === 'all') return true;
    return item.platform.toLowerCase() === selectedSocialTab.toLowerCase();
  });

  const tickerItems = [
    { name: 'Sarah K.', action: 'withdrew $18.40 via PayPal', time: '2m ago', flag: '🇦🇪' },
    { name: 'Ahmed R.', action: 'completed TikTok Duet (+$3.50)', time: '4m ago', flag: '🇪🇬' },
    { name: 'Maria L.', action: 'withdrew $32.00 to Wise', time: '5m ago', flag: '🇬🇧' },
    { name: 'David P.', action: 'completed Instagram Story (+$0.65)', time: '7m ago', flag: '🇺🇸' },
    { name: 'Chen W.', action: 'withdrew $45.00 to Bank', time: '9m ago', flag: '🇸🇬' },
    { name: 'Elena M.', action: 'completed YouTube Review (+$2.20)', time: '11m ago', flag: '🇩🇪' },
    { name: 'Rajesh S.', action: 'withdrew $21.50 via UPI / Bank', time: '12m ago', flag: '🇮🇳' },
    { name: 'Chloe B.', action: 'completed App Testing (+$4.00)', time: '14m ago', flag: '🇨🇦' },
  ];

  const faqs = [
    {
      q: 'How do I earn money using my social media accounts?',
      a: 'Brands list verified social media tasks on BizNetwork (such as sharing a story with a brand sticker, doing a 15-second TikTok duet, or posting in a niche Facebook group). You choose any open task, complete it on your phone, upload a screenshot or live link as proof, and our automated AI verifies your submission in seconds to credit your wallet balance.',
    },
    {
      q: 'Do I need a large follower count or influencer status?',
      a: 'No! You do not need thousands of followers. Over 90% of our tasks are designed for everyday social media users. Brands want authentic word-of-mouth engagement and peer recommendations from genuine people, not just sponsored influencer posts.',
    },
    {
      q: 'Is BizNetwork 100% free? Are there any hidden fees?',
      a: 'BizNetwork is 100% free to join and will always remain free. We will never ask you for an upfront registration fee, membership fee, deposit, or account unlock charge. You complete tasks and earn real cash.',
    },
    {
      q: 'How fast can I cash out and what is the minimum payout?',
      a: 'The minimum withdrawal threshold is only $5.00. You can cash out anytime directly to your PayPal, Wise transfer, direct bank account, Revolut, or digital currency (USDT/USDC). Payouts are processed reliably with double-entry ledger security.',
    },
    {
      q: 'How does AI proof verification work?',
      a: 'When you submit a screenshot, our proprietary computer vision algorithm checks the post timestamp, image dimensions, text content, and account handle in seconds. Once verified, funds transfer immediately into your available balance.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#101828] font-sans text-left">
      
      {/* =========================================================================
          1. SIMPLIFIED, HIGH-CONVERTING HERO BANNER
          - Decluttered Left Column with Generous Spacing & High-Contrast Neon CTA
          - Sleek Smartphone Mockup with 4 Popping Notification Bubbles & Reactions
         ========================================================================= */}
      <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden bg-[#07182F] text-white border-b border-white/10 bg-grid-mesh-dark">
        
        {/* Ambient subtle glow meshes */}
        <div className="absolute top-12 left-1/4 w-[450px] h-[450px] bg-[#168BFF]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-6 right-12 w-[400px] h-[400px] bg-[#20C4E8]/12 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Clean, Decluttered, High-Trust Copy */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Subtle Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span>Verified Social Micro-Earning Platform</span>
              </div>

              {/* Bold Headline matching mockup */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-black text-white tracking-tight leading-[1.12]">
                Turn Daily Social Media <br />
                Time Into <span className="text-[#38BDF8]">Verified</span> <br className="hidden sm:inline" />
                Cash Income.
              </h1>

              {/* Subheadline: Large, Readable, Generous Spacing */}
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl font-normal mx-auto lg:mx-0">
                BizNetwork connects forward-thinking brands with verified mobile contributors worldwide. Complete simple tasks on Instagram, TikTok, YouTube, and WhatsApp — get verified in seconds, and cash out starting from $5.00.
              </p>

              {/* Action Buttons: High-Contrast Neon Green Primary CTA + Minimal Outline Secondary CTA */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/signup/contributor"
                  className="bg-[#22C55E] hover:bg-[#16a34a] text-[#07182F] font-black text-sm sm:text-base px-7 py-4 rounded-xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 group"
                >
                  <span>Get Started &amp; Earn Free</span>
                  <ArrowRight className="w-5 h-5 text-[#07182F] group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <a
                  href="#proof-section"
                  className="bg-white/5 hover:bg-white/10 text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <span>View Proof</span>
                </a>
              </div>

            </div>

            {/* RIGHT COLUMN: Sleek Smartphone Mockup with 4 Popping Notification Bubbles */}
            <div className="lg:col-span-6 relative flex justify-center items-center py-6 sm:py-8 select-none">
              
              {/* Atmospheric background aura */}
              <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] bg-gradient-to-tr from-[#0ea5e9]/25 via-[#10b981]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

              {/* Floating Reaction Emojis around phone */}
              <div className="absolute top-2 right-12 sm:right-20 z-30 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-pink-100 flex items-center gap-1.5 text-xs font-bold animate-float-slow">
                <span className="text-base">❤️</span>
                <span className="text-pink-600 font-extrabold">+1 Like</span>
              </div>

              <div className="absolute bottom-28 -right-2 sm:right-4 z-30 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-orange-100 flex items-center gap-1.5 text-xs font-bold animate-float">
                <span className="text-base">🔥</span>
                <span className="text-orange-600 font-extrabold">Hot Task</span>
              </div>

              <div className="absolute -top-3 left-16 sm:left-24 z-30 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-blue-100 flex items-center gap-1.5 text-xs font-bold animate-float-delayed">
                <span className="text-base">👍</span>
                <span className="text-blue-600 font-extrabold">Verified</span>
              </div>

              {/* FLOATING NOTIFICATION BUBBLE 1: Top-Left (+$5.00 Verified Cash) */}
              <div className="absolute -top-4 -left-2 sm:-left-10 z-30 bg-white text-slate-900 px-4 py-3 rounded-2xl shadow-2xl border border-slate-100/90 flex items-center gap-3 animate-float max-w-[215px]">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Instant Payout</div>
                  <div className="text-xs sm:text-sm font-black text-emerald-600">+$5.00 Verified Cash</div>
                </div>
              </div>

              {/* FLOATING NOTIFICATION BUBBLE 2: Top-Right (Upload Review Photo) */}
              <div className="absolute top-12 -right-4 sm:-right-8 z-30 bg-white text-slate-900 px-4 py-3 rounded-2xl shadow-2xl border border-slate-100/90 flex items-center gap-3 animate-float-delayed max-w-[225px]">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Camera className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">New Task</div>
                  <div className="text-xs sm:text-sm font-black text-gray-900">Upload Review Photo</div>
                </div>
              </div>

              {/* FLOATING NOTIFICATION BUBBLE 3: Bottom-Left (Review: TikTok Video) */}
              <div className="absolute bottom-14 -left-4 sm:-left-10 z-30 bg-white text-slate-900 px-4 py-3 rounded-2xl shadow-2xl border border-slate-100/90 flex items-center gap-3 animate-float max-w-[225px]">
                <div className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Sponsored Campaign</div>
                  <div className="text-xs sm:text-sm font-black text-gray-900">Review: TikTok Video</div>
                </div>
              </div>

              {/* FLOATING NOTIFICATION BUBBLE 4: Bottom-Right ($38.90 Total) */}
              <div className="absolute -bottom-3 -right-2 sm:-right-6 z-30 bg-white text-slate-900 px-4 py-3 rounded-2xl shadow-2xl border border-slate-100/90 flex items-center gap-3 animate-float-delayed max-w-[210px]">
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-md font-black text-sm">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Today's Balance</div>
                  <div className="text-xs sm:text-sm font-black text-emerald-600">$38.90 Total</div>
                </div>
              </div>

              {/* THE SLEEK SMARTPHONE MOCKUP BODY */}
              <div className="relative w-[280px] sm:w-[315px] h-[580px] sm:h-[620px] rounded-[48px] border-[8px] sm:border-[10px] border-slate-800 bg-slate-950 p-2 sm:p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(14,165,233,0.2)] ring-1 ring-white/20 transition-transform duration-500 hover:scale-[1.01]">
                
                {/* Dynamic Island pill */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111827] ring-1 ring-[#374151] flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#1d4ed8]/70" />
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1f2937]" />
                </div>

                {/* Glossy screen glass reflection */}
                <div className="absolute -top-16 -left-16 w-60 h-60 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl pointer-events-none z-20" />

                {/* Smartphone Screen Content */}
                <div className="w-full h-full rounded-[38px] overflow-hidden bg-gradient-to-b from-[#0e7490] via-[#047857] to-[#022c22] p-4 pt-10 flex flex-col justify-between text-white relative shadow-inner">
                  
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-1 text-[11px] font-bold text-white/90">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <Wifi className="w-3 h-3 text-white/80" />
                      <div className="w-4 h-2 rounded-sm border border-white/80 p-0.5 flex items-center">
                        <div className="w-full h-full bg-white rounded-2xs" />
                      </div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-xs text-white">
                        A
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          <span>Alex M.</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                        </div>
                        <div className="text-[10px] text-emerald-300 font-medium">Verified Contributor</div>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80">
                      <Bell className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Wallet Balance Widget */}
                  <div className="bg-black/30 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 shadow-lg space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-300 font-medium uppercase tracking-wider">Available Balance</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                        +$5.00 Today
                      </span>
                    </div>
                    <div className="text-2xl font-black text-white tracking-tight">
                      $38.90 <span className="text-xs text-gray-300 font-normal">USD</span>
                    </div>
                    <div className="flex items-center gap-2 pt-0.5">
                      <div className="flex-1 bg-[#22C55E] text-[#07182F] font-black text-[10px] py-1.5 rounded-lg text-center shadow-md">
                        Instant Cashout
                      </div>
                      <div className="flex-1 bg-white/10 text-white font-bold text-[10px] py-1.5 rounded-lg text-center border border-white/10">
                        History
                      </div>
                    </div>
                  </div>

                  {/* Active Task Card */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-black/40 flex items-center justify-center">
                          <TikTokLogo className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-[11px] font-bold text-white">TikTok Sound Promo</span>
                      </div>
                      <span className="text-xs font-black text-emerald-400">+$3.50</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[9px] text-gray-300">
                        <span>AI Proof Scanner</span>
                        <span className="text-emerald-400 font-bold">100% Match</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#20C4E8] to-[#22C55E] rounded-full w-full" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-gray-300 pt-0.5">
                      <span className="flex items-center gap-1 text-emerald-300">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Approved (9.4s)</span>
                      </span>
                      <span className="font-mono text-gray-400">#CP-982</span>
                    </div>
                  </div>

                  {/* Second Task Preview */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-pink-500/30 flex items-center justify-center text-pink-300">
                        <InstagramLogo className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] font-bold text-white">Instagram Story Repost</div>
                        <div className="text-[9px] text-gray-300">2 min &bull; 420 slots left</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-300">+$1.20</span>
                  </div>

                  {/* Phone Bottom Dock Pill */}
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-2 flex items-center justify-around border border-white/10 text-white/70">
                    <div className="p-1 rounded-lg text-[#22C55E]">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div className="p-1 rounded-lg hover:text-white">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                    <div className="p-1 rounded-lg hover:text-white">
                      <Wallet className="w-4 h-4" />
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          DEDICATED HORIZONTAL TRUST BAR (AS SEEN ON & VERIFIED METRICS)
          - Directly below hero section as requested
         ========================================================================= */}
      <section className="bg-white border-b border-gray-200/90 py-5 sm:py-6 shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            
            {/* Left: As Seen On + Partner Brand Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-7">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest shrink-0">
                As Seen On
              </span>
              <div className="flex items-center gap-5 sm:gap-8 text-gray-400">
                
                {/* Bloomberg */}
                <div className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-gray-800">Bloomberg</span>
                </div>

                {/* CNBC */}
                <div className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-black text-xs sm:text-sm tracking-wider text-gray-800 border-2 border-gray-800 px-1.5 py-0.2 rounded">CNBC</span>
                </div>

                {/* Forbes */}
                <div className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-serif italic font-bold text-sm sm:text-base tracking-tight text-gray-800">Forbes</span>
                </div>

                {/* TechCrunch */}
                <div className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-black text-xs sm:text-sm tracking-tight text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">TC</span>
                  <span className="font-bold text-xs sm:text-sm text-gray-800 hidden sm:inline">TechCrunch</span>
                </div>

                {/* WSJ */}
                <div className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                  <span className="font-serif font-black text-xs sm:text-sm tracking-widest text-gray-800">WSJ</span>
                </div>

              </div>
            </div>

            {/* Right: Key Platform Stats (Total Paid Out & Active Users) */}
            <div className="flex items-center justify-center gap-8 sm:gap-12 shrink-0 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
              <div className="text-center lg:text-left lg:border-l lg:border-gray-200 lg:pl-8">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Total Paid Out
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#101828] tracking-tight">
                  $10,000,000+
                </div>
              </div>

              <div className="text-center lg:text-left lg:border-l lg:border-gray-200 lg:pl-8">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Active Users
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#101828] tracking-tight">
                  5,000,000+
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. LIVE PAYOUT MARQUEE TICKER (SOCIAL PROOF IN MOTION)
         ========================================================================= */}
      <section id="proof-section" className="bg-[#040F1E] border-b border-white/10 py-3 overflow-hidden text-xs text-white scroll-mt-20">
        <div className="flex items-center">
          <div className="bg-[#168BFF] text-white font-black px-4 py-1 rounded-r-full text-[10px] uppercase tracking-wider z-10 shrink-0 flex items-center gap-1.5">
            <Flame className="w-3 h-3 fill-white" />
            <span>Live Stream</span>
          </div>

          <div className="animate-marquee flex items-center gap-8 pl-6">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 whitespace-nowrap">
                <span>{item.flag}</span>
                <span className="font-bold text-gray-200">{item.name}</span>
                <span className="text-[#20C4E8] font-semibold">{item.action}</span>
                <span className="text-gray-500 font-mono text-[10px]">&bull; {item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. HOW SOCIAL MEDIA EARNING WORKS (ELIMINATING EMPTY WHITE SPACE)
         ========================================================================= */}
      <section id="how-it-works" className="py-14 sm:py-16 bg-white bg-dot-pattern scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2.5">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#168BFF] text-xs font-bold uppercase tracking-wider border border-blue-100">
              Zero Followers Required
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              6 Ways You Earn Real Cash On Social Media
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
              Brands pay ordinary consumers for authentic exposure and genuine community engagement. Choose the platforms you already use every day.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {[
                { id: 'all', label: 'All Channels' },
                { id: 'instagram', label: 'Instagram' },
                { id: 'tiktok', label: 'TikTok' },
                { id: 'youtube', label: 'YouTube' },
                { id: 'facebook', label: 'Facebook' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedSocialTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedSocialTab === tab.id
                      ? 'bg-[#07182F] text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F9FC] rounded-3xl p-6 sm:p-7 border border-[#E4EAF2] hover:border-[#168BFF]/50 transition-all hover:shadow-xl space-y-4 group relative overflow-hidden"
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${card.accentColor} absolute top-0 left-0`} />

                  <div className="flex items-center justify-between pt-1">
                    <div className="p-3 rounded-2xl bg-white border border-gray-200 shadow-xs group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wide ${card.badgeColor}`}>
                      {card.tag}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">{card.platform} Campaign</span>
                    <h3 className="text-lg font-black text-gray-900 mt-0.5 group-hover:text-[#168BFF] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase block">Reward Range</span>
                      <span className="text-lg font-black text-[#16B364]">{card.reward}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 font-bold uppercase block">Average Time</span>
                      <span className="text-xs font-bold text-gray-700 flex items-center gap-1 justify-end">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {card.time}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-amber-600 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-amber-500" />
                      {card.slots}
                    </span>
                    <Link
                      to="/tasks"
                      className="font-bold text-[#168BFF] hover:underline flex items-center gap-1"
                    >
                      <span>Start Task</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Banner bottom */}
          <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-[#07182F] via-[#0D2342] to-[#07182F] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-lg font-black">Want to complete tasks on your mobile right now?</h4>
              <p className="text-xs text-gray-300">Registration takes 45 seconds. Zero documents or credit cards needed.</p>
            </div>
            <Link
              to="/signup/contributor"
              className="px-8 py-3.5 bg-gradient-brand text-white text-xs sm:text-sm font-black rounded-2xl shadow-lg hover:scale-105 transition-all shrink-0 flex items-center gap-2"
            >
              <span>Join Free &amp; Start Today</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. FREE SCROLLING VS BIZNETWORK (HIGH CONTRAST COMPARISON)
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-[#F7F9FC] border-y border-[#E4EAF2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-purple-50 text-[#7357FF] text-xs font-bold uppercase tracking-wider">
              The Reality Check
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              Stop Scrolling For Free. Get Paid Instead.
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              The average smartphone user spends 2 hours and 27 minutes daily on social media generating zero income. Here is the difference:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Left: The Old Way (Free Scrolling) */}
            <div className="bg-white rounded-3xl p-8 border border-red-200/80 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-extrabold uppercase">
                  <span>❌ What Most People Do</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900">Endless Free Scrolling</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  You spend hours scrolling past algorithm ads, liking random posts, and viewing brand stories without receiving a single penny in return.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    '2.5 hours per day completely uncompensated',
                    'Big tech platforms earn advertising revenue off your attention',
                    'Zero savings, zero earnings, zero side income',
                    'No transparent payout or rewards for your time',
                  ].map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-600 font-semibold">
                      <span className="text-red-500 font-bold shrink-0 mt-0.5">&times;</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 text-center text-xs font-bold text-red-600 bg-red-50/50 p-3 rounded-xl">
                Result: $0.00 Earned &bull; Wasted Hours
              </div>
            </div>

            {/* Right: The BizNetwork Way */}
            <div className="bg-[#07182F] text-white rounded-3xl p-8 shadow-2xl border border-white/15 space-y-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#168BFF]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-[#16B364] text-xs font-extrabold uppercase border border-emerald-500/30">
                  <span>⚡ The BizNetwork Way</span>
                </div>
                <h3 className="text-2xl font-black text-white">Monetized Spare Time</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Spend just 20 to 45 minutes completing verified brand tasks on the same social platforms and build a reliable daily cash balance.
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    'Turn spare minutes into $15–$60+ extra cash every week',
                    'Payouts starting from $5.00 directly to PayPal, Wise, or Bank',
                    'Computer vision AI verifies your proof in seconds',
                    'Level up for higher rewards and 10% daily streak bonuses',
                  ].map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-200 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-[#16B364] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-center text-xs font-extrabold text-[#20C4E8] bg-white/5 p-3 rounded-xl relative z-10">
                Result: Real Money In Your Wallet Whenever You Want
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          5. INTERACTIVE INCOME CALCULATOR
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#16B364] text-xs font-bold uppercase tracking-wider">
              Real Expectations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              Calculate Your Daily &amp; Monthly Potential
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Realistic earnings based on active task completion and current marketplace reward averages.
            </p>
          </div>

          <div className="bg-[#F7F9FC] rounded-3xl p-6 sm:p-10 border border-[#E4EAF2] shadow-sm space-y-8">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-gray-800">
                  How many hours per day can you spend on tasks?
                </label>
                <span className="text-sm font-black text-[#168BFF] px-3 py-1 bg-white border border-gray-200 rounded-xl shadow-xs">
                  {calculatorHours} {calculatorHours === 1 ? 'Hour' : 'Hours'} / Day
                </span>
              </div>
              
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.5"
                value={calculatorHours}
                onChange={(e) => setCalculatorHours(parseFloat(e.target.value))}
                className="w-full accent-[#168BFF] h-2.5 bg-gray-200 rounded-lg cursor-pointer"
              />
              
              <div className="flex justify-between text-[11px] text-gray-400 font-bold">
                <span>Casual (30 mins)</span>
                <span>Active (2 hours)</span>
                <span>Power Earner (4 hours)</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-2xl bg-[#07182F] text-white">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Estimated Weekly Payout</span>
                <div className="text-3xl sm:text-4xl font-black text-[#20C4E8] mt-1">
                  ${(parseFloat(calculatedMonthly) / 4).toFixed(0)} USD
                </div>
                <span className="text-[11px] text-gray-400 mt-1 block">Paid directly to PayPal / Wise</span>
              </div>

              <div className="sm:border-l sm:border-white/10 sm:pl-6">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Estimated 30-Day Potential</span>
                <div className="text-3xl sm:text-4xl font-black text-[#16B364] mt-1">
                  ${calculatedMonthly} USD
                </div>
                <span className="text-[11px] text-gray-400 mt-1 block">Based on $6.50/hr average yield</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs text-gray-500">
                &bull; Cashout starts from $5.00 threshold. Zero platform deduction for contributors.
              </span>
              <Link
                to="/signup/contributor"
                className="px-7 py-3 bg-[#07182F] hover:bg-[#168BFF] text-white font-black text-xs rounded-xl shadow transition-colors flex items-center gap-2"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          6. FOR BUSINESSES & BRANDS BANNER
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-[#07182F] text-white relative overflow-hidden bg-grid-mesh-dark border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-[#20C4E8] text-xs font-bold uppercase tracking-wider border border-white/15">
                For Brands &amp; Digital Marketers
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
                Need 10,000+ Real Humans Behind Your Campaign?
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
                Deploy verified contributors across Instagram, TikTok, Meta, and Google in hours. Stop paying for bot clicks and inflated agency retainers. Pay strictly for verified proof.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/for-businesses"
                  className="px-7 py-3.5 bg-gradient-brand text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>Launch Business Campaign</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/signup/business"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all"
                >
                  Create Business Account
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 rounded-3xl p-6 border border-white/10 backdrop-blur-md space-y-3">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Enterprise Campaign Stats</span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-gray-300">Audience Authenticity</span>
                  <span className="font-bold text-[#16B364]">100% Real Humans</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-gray-300">Average Turnaround</span>
                  <span className="font-bold text-white">Under 4 Hours</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-gray-300">Proof Verification</span>
                  <span className="font-bold text-[#20C4E8]">Computer Vision AI</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-300">Budget Protection</span>
                  <span className="font-bold text-white">Escrow Guaranteed</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          7. TRUST & FREQUENTLY ASKED QUESTIONS
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#168BFF] text-xs font-bold uppercase tracking-wider">
              Transparency First
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Clear answers about earning, proof verification, and getting paid.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F9FC] rounded-2xl border border-[#E4EAF2] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 hover:text-[#168BFF] transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#168BFF] shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-[#168BFF]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. FINAL CALL TO ACTION BANNER
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-[#07182F] text-white relative overflow-hidden text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#20C4E8] border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join 520,000+ Verified Earners Today</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Start Earning From Your Phone In Under 60 Seconds.
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Zero registration fees. Payouts start from $5.00 directly to PayPal, Wise, or Bank. No follower requirements.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/signup/contributor"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-brand text-white font-bold text-xs sm:text-sm rounded-xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>Create Free Account Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/tasks"
              className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all"
            >
              Explore Open Tasks
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
