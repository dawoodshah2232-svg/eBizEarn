import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is BizNetwork free?',
      a: 'Yes, 100% free for contributors. There are strictly NO registration fees, NO deposit requirements, NO $50 or $200 earning upgrade plans, and NO pay-to-work schemes. You sign up, complete tasks, and get paid.',
    },
    {
      q: 'How do I receive tasks?',
      a: 'Once you create an account and complete your basic onboarding preferences (country, language, and interests), available tasks from verified businesses will automatically populate in your dashboard.',
    },
    {
      q: 'How much can I earn?',
      a: 'Earnings depend on task complexity and your contributor tier. Simple social tasks range from $0.30 to $0.50, surveys $1.00 to $2.00, app testing $2.50 to $4.00, and UGC video clips $5.00 to $15.00+.',
    },
    {
      q: 'When do I get paid?',
      a: 'As soon as your task proof is verified by AI and moderator review, funds are instantly credited to your available wallet balance. You can withdraw anytime once your balance reaches $5.00 USD.',
    },
    {
      q: 'Why did my task get rejected?',
      a: 'Tasks may be rejected if proof is missing, screenshots are cropped, timestamps do not match the campaign window, or if duplicate proofs are submitted. Moderators always provide an explicit audit reason.',
    },
    {
      q: 'Which countries are supported?',
      a: 'BizNetwork supports contributors worldwide across 150+ countries including UAE, United States, United Kingdom, India, Pakistan, Bangladesh, Sri Lanka, Philippines, and Nigeria.',
    },
    {
      q: 'How does verification work?',
      a: 'We use an automated AI vision pre-check that assesses screenshot resolution, timestamp authenticity, text relevance, and duplicate image hashing. Once pre-screened, our operations team conducts rapid final verification.',
    },
    {
      q: 'How do businesses create campaigns?',
      a: 'Businesses can create a business profile and use our 6-step self-serve campaign wizard to define objectives, select target geographies, set contributor requirements, fund the escrow budget, and launch in minutes.',
    },
    {
      q: 'How does BizNetwork prevent fraud?',
      a: 'We maintain multi-signal fraud scoring including duplicate screenshot hash matching, duplicate URL tracking, rapid-completion speed limits, IP/VPN anomaly detection, and account reliability ratings.',
    },
  ];

  return (
    <div className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#168BFF] text-xs font-bold uppercase tracking-wider">
          Help Center &amp; Answers
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101828] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Everything you need to know about tasks, payments, and platform safety.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E4EAF2] shadow-sm overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-gray-900 hover:text-[#168BFF] transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
