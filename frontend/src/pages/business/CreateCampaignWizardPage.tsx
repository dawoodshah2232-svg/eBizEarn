import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  ShieldCheck,
  Sparkles,
  Rocket,
  CheckCircle2,
} from 'lucide-react';
import { api } from '../../api/client';
import { usePlatform } from '../../context/PlatformDataContext';
import { COUNTRY_OPTIONS, REGIONAL_REGIONS } from '../../config/geoLocations';

export const CreateCampaignWizardPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { createCampaign } = usePlatform();

  // Form State
  const [title, setTitle] = useState('');
  const [objective, setObjective] = useState('');
  const [description, setDescription] = useState('');
  const [taskType, setTaskType] = useState('community-broadcast');
  const [country, setCountry] = useState('GLOBAL');
  const [emirateState, setEmirateState] = useState('Worldwide (All Regions)');
  const [cityArea, setCityArea] = useState('Global Remote');
  const [targetChannelType, setTargetChannelType] = useState('whatsapp_group');
  const [targetChannelName, setTargetChannelName] = useState('Global Creator & Business Network 🌐');
  const [retentionHours, setRetentionHours] = useState(72);
  const [minLevel, setMinLevel] = useState('starter');
  const [instructions, setInstructions] = useState('1. Share approved commercial flyer & promo link into an active community or business group (WhatsApp, LinkedIn, or Facebook).\n2. Proof screenshot must verify group title, member count > 1,000, and message delivery checkmarks.');
  const [rewardPerTask, setRewardPerTask] = useState('22.00');
  const [numContributors, setNumContributors] = useState('100');
  const [submitting, setSubmitting] = useState(false);
  const [launchedSuccess, setLaunchedSuccess] = useState(false);

  // Calculations (AED Cents)
  const rewardCents = Math.round(parseFloat(rewardPerTask || '0') * 100);
  const contributorsCount = parseInt(numContributors || '0', 10);
  const taskSubtotalCents = rewardCents * contributorsCount;
  const feePercent = 15; // 15% platform fee for 100% automated & admin verification
  const feeCents = Math.round(taskSubtotalCents * (feePercent / 100));
  const totalBudgetCents = taskSubtotalCents + feeCents;

  const handleLaunch = async () => {
    setSubmitting(true);

    const resolvedPlatform =
      taskType === 'community-broadcast'
        ? 'WhatsApp / LinkedIn'
        : taskType === 'reviews'
        ? 'Trustpilot'
        : taskType === 'google-reviews'
        ? 'Google Reviews'
        : taskType === 'social'
        ? 'Instagram'
        : taskType === 'video' || taskType === 'ugc'
        ? 'TikTok'
        : 'Web Portal';

    // Add into shared reactive platform state in AED with granular geo & channel metadata
    createCampaign({
      title: title || `${emirateState} Community Group Brand Broadcast`,
      objective: objective || `Promote in ${emirateState} local community channels`,
      platform: resolvedPlatform,
      rewardAED: parseFloat(rewardPerTask || '22.00'),
      targetContributors: contributorsCount || 100,
      instructions: instructions || `Post in verified ${emirateState} groups and submit screenshot proof.`,
      country: country || 'GLOBAL',
      emirateState: emirateState || 'Worldwide (All Regions)',
      cityArea: cityArea || 'Global Remote',
      targetChannelType: taskType === 'community-broadcast' ? targetChannelType : undefined,
      targetChannelName: taskType === 'community-broadcast' ? targetChannelName : undefined,
      retentionHours: retentionHours || 72,
    });

    try {
      await api.post('/business/campaigns', {
        title: title || `${emirateState} Community Group Brand Broadcast`,
        objective: objective || `Promote in ${emirateState} community channels`,
        description,
        category_id: taskType.includes('review') ? 2 : 1,
        reward_per_task_cents: rewardCents,
        target_contributors_count: contributorsCount,
        instructions_markdown: instructions || 'Follow verified campaign guidelines.',
        target_countries: [country],
        min_contributor_level: minLevel,
      });
    } catch {
      // allow fallback launch in demo
    }
    setSubmitting(false);
    setLaunchedSuccess(true);
  };

  const stepsList = [
    { num: 1, title: 'Details' },
    { num: 2, title: 'Task Type' },
    { num: 3, title: 'Audience' },
    { num: 4, title: 'Content & Proof' },
    { num: 5, title: 'Budget & Fee' },
    { num: 6, title: 'Launch' },
  ];

  if (launchedSuccess) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <div className="bg-white rounded-3xl p-8 border border-[#E4EAF2] shadow-floating space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16B364] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Campaign Launched Successfully!</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Your campaign <strong>"{title || 'New Task Campaign'}"</strong> is now live on the marketplace. Contributor submissions will begin appearing in your dashboard.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/business')}
              className="px-6 py-2.5 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl text-xs font-bold transition-colors"
            >
              Go to Business Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left">
      
      {/* Stepper Indicator */}
      <div className="bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-sm">
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

        <div className="text-center pt-2">
          <h2 className="text-xl font-bold text-[#101828]">
            {step === 1 && 'Step 1: Campaign Details'}
            {step === 2 && 'Step 2: Choose Task Type'}
            {step === 3 && 'Step 3: Target Audience & Requirements'}
            {step === 4 && 'Step 4: Campaign Content & Instructions'}
            {step === 5 && 'Step 5: Budget & Reward Calculator'}
            {step === 6 && 'Step 6: Review & Instant Launch'}
          </h2>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E4EAF2] shadow-sm">
        
        {/* Step 1: Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Campaign Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Middle East Product Launch Social Campaign"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Campaign Objective</label>
              <input
                type="text"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="e.g. Generate 500 organic community shares and genuine impressions"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a clear high-level summary of your brand and what you want contributors to accomplish..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
              />
            </div>
          </div>
        )}

        {/* Step 2: Task Type */}
        {step === 2 && (
          <div className="space-y-3">
            <p className="text-xs text-gray-600 font-medium">Select the primary campaign objective or review service:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'community-broadcast', name: '📢 Community Groups', desc: 'Worldwide WhatsApp, LinkedIn & FB' },
                { id: 'reviews', name: '⭐ Trustpilot Reviews', desc: '5-star trust badge & review' },
                { id: 'google-reviews', name: '⭐ Google Reviews', desc: 'Verified Google Maps feedback' },
                { id: 'social', name: 'Social Campaigns', desc: 'Posts, shares & reach' },
                { id: 'ugc', name: 'UGC & Video', desc: 'Short testimonials & clips' },
                { id: 'survey', name: 'Consumer Surveys', desc: 'Opinions & market research' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTaskType(t.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    taskType === t.id
                      ? 'border-[#168BFF] bg-blue-50/50 shadow-sm ring-2 ring-[#168BFF]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className={`text-xs font-bold ${taskType === t.id ? 'text-[#168BFF]' : 'text-gray-900'}`}>
                    {t.name}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Audience & Granular Geographic Targeting */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Target Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl font-medium"
                >
                  <option value="AE">United Arab Emirates (AED 🇦🇪)</option>
                  <option value="SA">Saudi Arabia (KSA 🇸🇦)</option>
                  <option value="QA">Qatar (QAR 🇶🇦)</option>
                  <option value="KW">Kuwait (KWD 🇰🇼)</option>
                  <option value="US">United States (USD 🇺🇸)</option>
                  <option value="GB">United Kingdom (GBP 🇬🇧)</option>
                  <option value="ALL">Worldwide (Global Contributors)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Min Contributor Level</label>
                <select
                  value={minLevel}
                  onChange={(e) => setMinLevel(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl"
                >
                  <option value="starter">Starter (Open to all)</option>
                  <option value="explorer">Explorer (5+ tasks completed)</option>
                  <option value="trusted">Trusted (98%+ approval rate)</option>
                  <option value="pro">Pro (Tier 3 Emirates ID KYC Verified)</option>
                </select>
              </div>
            </div>

            {/* Granular Regional UAE Emirate & City Drilldown */}
            {country === 'AE' && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="text-base">📍</span> Pinpoint Geographic Targeting (Country → State/Region → District)
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                    OCR Geofenced
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Target Country</label>
                    <select
                      value={country}
                      onChange={(e) => {
                        const newCountry = e.target.value;
                        setCountry(newCountry);
                        const availableStates = Object.keys(REGIONAL_REGIONS[newCountry] || {});
                        const firstState = availableStates[0] || 'Worldwide';
                        setEmirateState(firstState);
                        const availableCities = REGIONAL_REGIONS[newCountry]?.[firstState] || [];
                        setCityArea(availableCities[0] || 'All Areas');
                        setTargetChannelName(`${firstState} Community & Business Network`);
                      }}
                      className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl font-semibold text-slate-800"
                    >
                      {COUNTRY_OPTIONS.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label} ({c.currency})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">State / Province / Region</label>
                    <select
                      value={emirateState}
                      onChange={(e) => {
                        const newSt = e.target.value;
                        setEmirateState(newSt);
                        const availableCities = REGIONAL_REGIONS[country]?.[newSt] || [];
                        setCityArea(availableCities[0] || `${newSt} Center`);
                        setTargetChannelName(`${newSt} Community & Business Network`);
                      }}
                      className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl font-semibold text-slate-800"
                    >
                      {Object.keys(REGIONAL_REGIONS[country] || { 'Worldwide (All Regions)': [] }).map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">City / District / Area</label>
                    <input
                      type="text"
                      value={cityArea}
                      onChange={(e) => setCityArea(e.target.value)}
                      placeholder="e.g. Manhattan, Downtown Dubai, or All Areas"
                      className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl"
                    />
                  </div>
                </div>

                {/* Community Channel & Target Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Target Community Platform</label>
                    <select
                      value={targetChannelType}
                      onChange={(e) => setTargetChannelType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl"
                    >
                      <option value="whatsapp_group">WhatsApp Community Groups (Regional / Local)</option>
                      <option value="linkedin_group">LinkedIn Professional &amp; Industry Network</option>
                      <option value="facebook_group">Facebook Community &amp; Expat Hubs</option>
                      <option value="telegram_group">Telegram Regional Broadcast Channel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Target Group Name / Theme</label>
                    <input
                      type="text"
                      value={targetChannelName}
                      onChange={(e) => setTargetChannelName(e.target.value)}
                      placeholder="e.g. Global Tech Founders / Local Business Network"
                      className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>
                    Contributors will be required to publish exclusively inside active groups matching{' '}
                    <strong>"{emirateState}"</strong> and submit verification showing the group name and member count.
                  </span>
                </div>
              </div>
            )}

            {/* Retention & Anti-Deletion Lock */}
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80">
              <label className="block text-xs font-bold text-amber-900 mb-1">
                Anti-Fraud Retention Lock (PDF Compliance T+0, T+24h, T+72h)
              </label>
              <select
                value={retentionHours}
                onChange={(e) => setRetentionHours(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 text-xs bg-white border border-amber-300 rounded-xl font-medium text-amber-950"
              >
                <option value={72}>72 Hours Hold (Recommended • Guarantees No Deletion &amp; CBUAE Escrow)</option>
                <option value={24}>24 Hours Hold (Fast Turnaround)</option>
                <option value={168}>7 Days Hold (Brand Ambassador &amp; Long-Term Posts)</option>
              </select>
              <p className="text-[10px] text-amber-800 mt-1.5">
                Reward funds remain locked in the contributor's <strong>Pending Retention Balance</strong> until the hold expires, preventing immediate post deletion.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Content & Instructions */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Step-by-Step Instructions for Contributor</label>
              <textarea
                rows={5}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="1. Visit our verified profile at...\n2. Share genuine feedback or publish the creative post...\n3. Take full screenshot with timestamp and submit..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl font-mono focus:outline-none focus:border-[#168BFF]"
              />
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#168BFF] shrink-0" />
              <span>eBiz AI vision system &amp; human moderators use these instructions to audit 100% of proof authenticity.</span>
            </div>
          </div>
        )}

        {/* Step 5: Budget Calculator */}
        {step === 5 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Reward Per Contributor (AED 🇦🇪)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400 font-bold text-xs font-mono">AED</span>
                  <input
                    type="number"
                    step="0.50"
                    min="2.00"
                    value={rewardPerTask}
                    onChange={(e) => setRewardPerTask(e.target.value)}
                    className="w-full pl-12 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl font-bold font-mono"
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">Recommended: AED 12 - 25 for Trustpilot / Google reviews</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Target Number of Contributors</label>
                <input
                  type="number"
                  min="5"
                  value={numContributors}
                  onChange={(e) => setNumContributors(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl font-bold font-mono"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">Verified contributors only</span>
              </div>
            </div>

            {/* Live Cost Breakdown Card */}
            <div className="p-5 rounded-2xl bg-[#F7F9FC] border border-[#E4EAF2] space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Budget Calculation Summary (AED 🇦🇪)
                </h4>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  CBUAE Escrow Protected
                </span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Contributor Rewards ({contributorsCount} &times; AED {rewardPerTask})</span>
                <span className="font-bold text-gray-900 font-mono">AED {(taskSubtotalCents / 100).toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Platform Fee (15% - 100% AI &amp; Admin Auditing Included)</span>
                <span className="font-bold text-gray-900 font-mono">AED {(feeCents / 100).toFixed(2)}</span>
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-between text-sm">
                <div>
                  <span className="font-bold text-gray-900 block">Total Escrow Budget</span>
                  <span className="text-[10px] text-gray-500">Refundable balance if slots are unfilled</span>
                </div>
                <span className="font-black text-[#168BFF] text-lg font-mono">AED {(totalBudgetCents / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Review & Launch */}
        {step === 6 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900">Ready to Deploy on eBiz Network</h3>
            <div className="space-y-2.5 p-4 rounded-2xl bg-gray-50 text-xs">
              <p><strong>Title:</strong> {title || `${emirateState} Community Group Brand Broadcast`}</p>
              <p><strong>Campaign Type:</strong> {taskType === 'community-broadcast' ? 'Local Community Group Broadcast' : taskType.toUpperCase()}</p>
              <p><strong>Geographic Target:</strong> <span className="font-semibold text-emerald-800">🇦🇪 UAE → {emirateState} → {cityArea}</span></p>
              {taskType === 'community-broadcast' && (
                <p><strong>Community Channel:</strong> <span className="font-semibold text-blue-700">{targetChannelName} ({targetChannelType})</span></p>
              )}
              <p><strong>Retention Escrow Lock:</strong> <span className="font-mono text-amber-800 font-semibold">{retentionHours} Hours (T+0, T+24h, T+72h Anti-Deletion Hold)</span></p>
              <p><strong>Contributors:</strong> {contributorsCount} Verified Identity Contributors</p>
              <p><strong>Total Escrow:</strong> <span className="font-mono font-bold text-[#168BFF]">AED {(totalBudgetCents / 100).toFixed(2)}</span></p>
            </div>

            {/* Zero Overhead Banner */}
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#16B364] shrink-0" />
                <span>Zero Verification Overhead for Business Owners</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                All proof screenshots and URLs are 100% verified by eBiz AI computer vision and our dedicated admin compliance team. Payouts are only released after validation.
              </p>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
          ) : <div />}

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLaunch}
              disabled={submitting}
              className="px-8 py-3.5 bg-gradient-brand text-white rounded-xl text-xs font-black shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              <span>{submitting ? 'Escrowing Budget & Deploying...' : 'Launch Campaign'}</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
