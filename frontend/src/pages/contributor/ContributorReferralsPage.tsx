import React, { useState } from 'react';
import { Gift, Copy, Check, Users, ShieldCheck, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ContributorReferralsPage: React.FC = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralCode = user?.referral_code || 'SARAH26';
  const referralLink = `https://biznetwork.com/signup/contributor?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referredUsers = [
    { id: 1, name: 'Ayesha K.', date: 'Sep 14, 2026', status: 'rewarded', earned: '+$1.00' },
    { id: 2, name: 'Bilal M.', date: 'Sep 15, 2026', status: 'pending_tasks', earned: '$0.00 (Needs 1 task)' },
    { id: 3, name: 'Priya R.', date: 'Sep 16, 2026', status: 'pending_tasks', earned: '$0.00 (Needs 1 task)' },
  ];

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-2xl font-black text-[#101828]">Invite Friends &amp; Earn</h2>
        <p className="text-xs text-[#667085] mt-0.5">
          Share your referral link. Earn $1.00 when your friend completes their first verified task.
        </p>
      </div>

      {/* Referral Link Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E4EAF2] shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#7257FF] flex items-center justify-center">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">Your Exclusive Referral Link</h3>
            <p className="text-xs text-gray-500">Give your friends free entry to verified campaigns.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-mono text-gray-700 select-all"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="px-6 py-2.5 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-[#16B364]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
          </button>
        </div>

        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2 text-xs text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-[#16B364] shrink-0" />
          <span>Qualifying event required: bonus triggers when referred friend completes 1 approved task.</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm">
          <p className="text-xs text-gray-400 font-bold uppercase">Total Friends Invited</p>
          <p className="text-2xl font-black text-gray-900 mt-1">3</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm">
          <p className="text-xs text-gray-400 font-bold uppercase">Qualified Friends</p>
          <p className="text-2xl font-black text-[#16B364] mt-1">1</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm">
          <p className="text-xs text-gray-400 font-bold uppercase">Total Bonus Earned</p>
          <p className="text-2xl font-black text-[#168BFF] mt-1">+$1.00</p>
        </div>
      </div>

      {/* Referral Table */}
      <div className="bg-white rounded-2xl border border-[#E4EAF2] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 font-bold text-xs text-gray-900">
          Referred Users History
        </div>
        <div className="divide-y divide-gray-100">
          {referredUsers.map((r) => (
            <div key={r.id} className="p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                  {r.name[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{r.name}</p>
                  <p className="text-[10px] text-gray-400">{r.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`font-bold ${r.status === 'rewarded' ? 'text-[#16B364]' : 'text-gray-500'}`}>
                  {r.earned}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
