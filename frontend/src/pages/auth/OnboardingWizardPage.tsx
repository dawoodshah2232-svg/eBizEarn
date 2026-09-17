import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, Globe, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const OnboardingWizardPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState('AE');
  const [language, setLanguage] = useState('en');
  const [interests, setInterests] = useState<string[]>(['social', 'app-testing']);
  const [bio, setBio] = useState('Eager digital contributor passionate about testing apps and social campaigns.');
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleInterest = (id: string) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const finishOnboarding = () => {
    navigate('/app');
  };

  const stepsList = [
    { num: 1, title: 'Country' },
    { num: 2, title: 'Language' },
    { num: 3, title: 'Task Interests' },
    { num: 4, title: 'Bio & Profile' },
    { num: 5, title: 'Verification' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-[#F7F9FC]">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 border border-[#E4EAF2] shadow-floating">
        
        {/* Stepper Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {stepsList.map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      step === s.num
                        ? 'bg-[#168BFF] text-white shadow-md'
                        : step > s.num
                        ? 'bg-[#16B364] text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className="text-[10px] font-medium text-gray-500 mt-1 hidden sm:block">
                    {s.title}
                  </span>
                </div>
                {idx < stepsList.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-2 ${
                      step > idx + 1 ? 'bg-[#16B364]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#101828]">
              {step === 1 && 'Select Your Country'}
              {step === 2 && 'Preferred Working Language'}
              {step === 3 && 'Choose Your Task Interests'}
              {step === 4 && 'Complete Your Profile'}
              {step === 5 && 'Free Identity Status'}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Personalize your feed to get matched with eligible, high-reward tasks.
            </p>
          </div>
        </div>

        {/* Step 1: Country */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-gray-600 font-medium">
              We match tasks that are geo-targeted to your location. Choose your primary country of residence:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
                { code: 'US', name: 'United States', flag: '🇺🇸' },
                { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
                { code: 'IN', name: 'India', flag: '🇮🇳' },
                { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
                { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
                { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
                { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
              ].map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCountry(c.code)}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    country === c.code
                      ? 'border-[#168BFF] bg-blue-50/50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <span className="text-xl">{c.flag}</span>
                  <span className="text-xs font-bold text-gray-800">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Language */}
        {step === 2 && (
          <div className="space-y-3">
            <p className="text-xs text-gray-600 font-medium">
              Tasks and instructions will be shown in your selected languages:
            </p>
            {[
              { code: 'en', name: 'English (Default)', native: 'English' },
              { code: 'ar', name: 'Arabic', native: 'العربية' },
              { code: 'ur', name: 'Urdu', native: 'اردو' },
              { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
              { code: 'bn', name: 'Bengali', native: 'বাংলা' },
            ].map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLanguage(l.code)}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  language === l.code
                    ? 'border-[#168BFF] bg-blue-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-gray-800">{l.name}</p>
                  <p className="text-[10px] text-gray-400">{l.native}</p>
                </div>
                {language === l.code && <Check className="w-4 h-4 text-[#168BFF]" />}
              </button>
            ))}
          </div>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <div className="space-y-3">
            <p className="text-xs text-gray-600 font-medium">Select categories you enjoy doing (select all that apply):</p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'social', label: 'Social Media Campaigns', desc: 'Posts & shares' },
                { id: 'survey', label: 'Consumer Surveys', desc: 'Feedback & opinions' },
                { id: 'app-testing', label: 'App Testing', desc: 'iOS & Android UX' },
                { id: 'website-testing', label: 'Website Testing', desc: 'Speed & navigation' },
                { id: 'ugc', label: 'UGC Video & Photo', desc: 'Short clips' },
                { id: 'research', label: 'Market Research', desc: 'Data verification' },
              ].map((item) => {
                const isSelected = interests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#7257FF] bg-purple-50/40 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className={`text-xs font-bold ${isSelected ? 'text-[#7257FF]' : 'text-gray-800'}`}>
                      {item.label}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Bio */}
        {step === 4 && (
          <div className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tell us a bit about your skills</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share your background or the types of tasks you excel at..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
              />
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2 text-[11px] text-blue-800">
              <Sparkles className="w-4 h-4 text-[#168BFF] shrink-0" />
              <span>Great profiles get priority matching on high-value brand campaigns!</span>
            </div>
          </div>
        )}

        {/* Step 5: Verification & Complete */}
        {step === 5 && (
          <div className="space-y-4 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-[#16B364]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">You're Ready to Earn!</h3>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              Your profile is active as a <strong>Starter Contributor</strong>. You have instant access to open tasks without waiting for manual document review. Higher tier tasks unlock automatically as you complete tasks with high accuracy!
            </p>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-left text-xs space-y-1.5 max-w-sm mx-auto">
              <div className="flex items-center gap-2 text-[#16B364] font-semibold">
                <Shield className="w-4 h-4" />
                <span>Zero Upfront Deposit Needed</span>
              </div>
              <p className="text-[11px] text-gray-500 pl-6">
                Your first approved task will credit directly to your ledger wallet.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-[#07182F] hover:bg-[#0D2342] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={finishOnboarding}
              className="px-7 py-3 bg-gradient-brand text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Go to Contributor Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
