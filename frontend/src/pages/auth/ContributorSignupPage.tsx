import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, CheckCircle2, Shield, Gift } from 'lucide-react';

export const ContributorSignupPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const refCodeFromUrl = searchParams.get('ref') || '';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('AE');
  const [referralCode, setReferralCode] = useState(refCodeFromUrl);
  const [submitting, setSubmitting] = useState(false);
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Switch to contributor and proceed to onboarding wizard
    setTimeout(() => {
      switchRole('contributor');
      navigate('/onboarding');
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-[#F7F9FC]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E4EAF2] shadow-floating">
        
        {/* Zero Fee Guarantee Alert */}
        <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#16B364] shrink-0 mt-0.5" />
          <div className="text-left">
            <p className="text-xs font-bold text-emerald-900">100% Free to Join & Earn</p>
            <p className="text-[11px] text-emerald-700 leading-snug">
              No registration fees, no $50 upgrade plans, and no deposit required. Ever.
            </p>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-[#101828]">Create Contributor Account</h2>
          <p className="text-xs text-[#667085] mt-1">Start earning from verified digital tasks today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@example.com"
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
              >
                <option value="AE">United Arab Emirates</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="IN">India</option>
                <option value="PK">Pakistan</option>
                <option value="BD">Bangladesh</option>
                <option value="LK">Sri Lanka</option>
                <option value="PH">Philippines</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Referral Code (Optional)</label>
              <div className="relative">
                <Gift className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="e.g. SARAH26"
                  className="w-full pl-8 pr-2 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF] uppercase"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3.5 bg-gradient-brand text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>{submitting ? 'Creating Profile...' : 'Continue to Onboarding'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-[#168BFF] font-bold hover:underline">
            Log in
          </Link>
        </div>

      </div>
    </div>
  );
};
