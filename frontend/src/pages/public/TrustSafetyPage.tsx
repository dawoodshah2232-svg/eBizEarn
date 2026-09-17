import React from 'react';
import { ShieldCheck, Eye, Lock, RefreshCw, AlertTriangle, FileCheck, CheckCircle2 } from 'lucide-react';

export const TrustSafetyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#16B364] text-xs font-bold uppercase tracking-wider">
          Security &amp; Integrity
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
          Trust &amp; Safety at BizNetwork
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          How we protect contributors from scams, ensure brands receive genuine human activity, and enforce zero tolerance for fraud.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            icon: ShieldCheck,
            title: 'AI-Assisted Computer Vision Verification',
            desc: 'Every submission is pre-screened for image clarity, timestamp consistency, and exact instruction compliance before manual review.',
          },
          {
            icon: Eye,
            title: 'Duplicate Screenshot & Proof Hashing',
            desc: 'Perceptual hashing identifies reused screenshots or shared URLs across accounts to prevent reward farming.',
          },
          {
            icon: Lock,
            title: 'Escrowed Financial Protection',
            desc: 'Brand budgets are locked in escrow upfront. Contributor rewards are guaranteed upon proof verification with ledger-backed payouts.',
          },
          {
            icon: RefreshCw,
            title: 'Fair Appeals & Human Oversight',
            desc: 'If a task is rejected, contributors can view the exact reviewer note and submit updated proof or request escalation.',
          },
          {
            icon: FileCheck,
            title: 'Strict Campaign Policy Moderation',
            desc: 'We strictly ban campaigns requesting fake reviews, deceptive testimonials, fake ratings, spam, or misleading claims.',
          },
          {
            icon: CheckCircle2,
            title: 'Transparent Task & Ledger History',
            desc: 'Every dollar earned, pending, or withdrawn is recorded in an immutable ledger with full timestamp and reference logs.',
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16B364] flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
