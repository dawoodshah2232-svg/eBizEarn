import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Globe,
  Users,
  Award,
  Lock,
  ArrowRight,
  CheckCircle2,
  Cpu,
  BarChart3,
  HeartHandshake,
  DollarSign,
  Sparkles,
  Layers,
} from 'lucide-react';
import {
  GoogleLogo,
  MetaLogo,
  TikTokLogo,
  YouTubeLogo,
  AmazonLogo,
  InstagramLogo,
  FacebookLogo,
} from '../../components/common/PlatformIcons';

export const AboutPage: React.FC = () => {
  const pillars = [
    {
      title: 'Radical Financial Transparency',
      icon: Lock,
      desc: 'Every transaction is recorded via strict double-entry ledger accounting. No hidden fees, no phantom deductions, and zero surprises.',
    },
    {
      title: 'Real Humans, Zero Bots',
      icon: Users,
      desc: 'Our proprietary computer vision and fraud telemetry algorithms audit every submission. We verify authentic humans, preserving brand integrity.',
    },
    {
      title: 'Global Economic Inclusion',
      icon: Globe,
      desc: 'Digital earnings should not be limited by geography. We support contributors in over 150 countries with local and international payout rails.',
    },
    {
      title: 'Protected Escrow Model',
      icon: ShieldCheck,
      desc: 'Businesses only pay for verified, authentic proof of work. Unused funds remain safe in escrow and can be returned or repurposed anytime.',
    },
  ];

  const milestones = [
    { year: '2024', title: 'Platform Launch', desc: 'Introduced BizNetwork with 1,000 pilot contributors and initial social campaigns.' },
    { year: '2025', title: 'Computer Vision AI', desc: 'Deployed automated screenshot and URL verification, cutting review turnaround to under 30 seconds.' },
    { year: '2025', title: 'Global Multi-Rail Payouts', desc: 'Expanded direct payouts to Wise, PayPal, and digital currencies with a low $5.00 cashout threshold.' },
    { year: '2026', title: '500,000+ Contributors', desc: 'Surpassed $2.4M in total disbursed rewards across 150+ countries with 99.1% fraud detection accuracy.' },
  ];

  return (
    <div className="text-left font-sans">
      
      {/* =========================================================================
          HERO SECTION (Corporate Dark Navy #07182F)
         ========================================================================= */}
      <section className="relative bg-[#07182F] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 overflow-hidden border-b border-white/10 bg-grid-mesh-dark">
        {/* Glow ambient */}
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-[#168BFF]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#7357FF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#20C4E8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Global Technology &bull; Decentralized Human Workforce</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Democratizing Digital Work &amp; <br />
            <span className="bg-gradient-to-r from-[#20C4E8] via-[#168BFF] to-[#7357FF] bg-clip-text text-transparent">
              High-Velocity Campaign Distribution.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto font-normal">
            BizNetwork bridges growing brands needing genuine human engagement with a global mobile workforce seeking flexible, transparent, and immediate income from social media and digital tasks.
          </p>

          <div className="pt-1 flex flex-wrap justify-center gap-3">
            <Link
              to="/signup/contributor"
              className="px-7 py-3.5 bg-gradient-brand text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Join as Contributor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/for-businesses"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all"
            >
              Explore for Businesses
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY GLOBAL METRICS STRIP
         ========================================================================= */}
      <section className="bg-white border-b border-[#E4EAF2] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-[#101828]">520,000+</div>
              <p className="text-xs text-gray-500 font-semibold mt-1">Verified Contributors</p>
            </div>
            <div>
              <div className="text-3xl font-black text-[#168BFF]">150+</div>
              <p className="text-xs text-gray-500 font-semibold mt-1">Countries Represented</p>
            </div>
            <div>
              <div className="text-3xl font-black text-[#16B364]">$2.45M+</div>
              <p className="text-xs text-gray-500 font-semibold mt-1">Disbursed to Workers</p>
            </div>
            <div>
              <div className="text-3xl font-black text-[#7357FF]">99.1%</div>
              <p className="text-xs text-gray-500 font-semibold mt-1">Fraud Detection Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE PROBLEM & OUR SOLUTION
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-[#F7F9FC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#168BFF] text-xs font-bold uppercase tracking-wider">
                The Industry Problem
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] leading-tight">
                Traditional Marketing is Broken by Bot Click Fraud &amp; Unfair Gig Retainers.
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Over $35 billion is lost each year to synthetic bot clicks, fake followers, and automated traffic mills that generate zero actual customer conversions. Meanwhile, hardworking individuals looking to earn online are trapped behind high minimum payouts, predatory fees, or scammy survey portals that never pay.
              </p>
              <div className="space-y-2.5">
                {[
                  'Brands waste marketing spend on fake, unverifiable traffic',
                  'Earners face unfair paywalls and delayed cashouts',
                  'No verified proof or accountability in traditional micro-task models',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-gray-700">
                    <div className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                      &times;
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E4EAF2] shadow-sm space-y-4">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#16B364] text-xs font-bold uppercase tracking-wider">
                The BizNetwork Solution
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                A Transparent, Verification-First Human Marketplace.
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                BizNetwork replaces guesswork with verified outcomes. Brands set clear task parameters and escrow funds safely. Contributors complete tasks from their smartphones and upload uncropped proof. Our computer vision engine screens submissions in seconds, releasing funds directly to immutable ledger accounts.
              </p>
              <div className="space-y-2.5">
                {[
                  '100% verified real people with KYC phone authentication',
                  'Double-entry ledger with instant withdrawals from just $5.00',
                  'Zero joining fees, zero subscriptions, zero hidden barriers',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-gray-900">
                    <CheckCircle2 className="w-4 h-4 text-[#16B364] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          OUR CORE PILLARS
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-purple-50 text-[#7357FF] text-xs font-bold uppercase tracking-wider">
              Operating Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828]">
              Built on Trust, Fairness &amp; Technology
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Our core values guide every algorithm, policy, and payout decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F9FC] rounded-3xl p-6 border border-[#E4EAF2] hover:border-[#168BFF]/40 transition-all space-y-3 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#168BFF] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{pillar.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PLATFORM EVOLUTION MILESTONES
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-[#F7F9FC] border-t border-[#E4EAF2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#168BFF] text-xs font-bold uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828]">
              Scaling Sustainable Digital Work
            </h2>
          </div>

          <div className="space-y-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm flex items-start gap-4">
                <span className="text-base font-bold text-[#168BFF] font-mono px-3 py-1 bg-blue-50 rounded-xl shrink-0">
                  {m.year}
                </span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900">{m.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CALL TO ACTION
         ========================================================================= */}
      <section className="py-14 sm:py-16 bg-[#07182F] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Be Part of the Future of Digital Work.
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Whether you want to earn real income on your own terms, or deploy high-impact verified campaigns worldwide, BizNetwork is built for you.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup/contributor"
              className="px-8 py-3.5 bg-gradient-brand text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/for-businesses"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all"
            >
              Enterprise Solutions
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
