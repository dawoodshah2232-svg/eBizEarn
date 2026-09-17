import React, { useState } from 'react';
import {
  Megaphone,
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle,
  Pause,
  Play,
  CheckCircle2,
  XCircle,
  Eye,
  DollarSign,
  Building,
  Plus,
  X,
  Sparkles,
  Lock,
  MapPin,
} from 'lucide-react';
import {
  InstagramLogo,
  TikTokLogo,
  YouTubeLogo,
  WhatsAppLogo,
  TrustpilotLogo,
  GoogleReviewLogo,
} from '../../components/common/PlatformIcons';
import { usePlatform } from '../../context/PlatformDataContext';
import { LivePostMockup } from '../../components/common/LivePostMockup';
import { COUNTRY_OPTIONS, REGIONAL_REGIONS } from '../../config/geoLocations';

export const AdminCampaignsOversightPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { campaigns: platformCampaigns, toggleCampaignStatus, createAdminCampaign } = usePlatform();

  // Admin Direct Campaign Creation State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [campaignTitle, setCampaignTitle] = useState('Worldwide Brand Launch & Creator Promotion');
  const [sponsorBrand, setSponsorBrand] = useState('Apex Global Innovations');
  const [platform, setPlatform] = useState('WhatsApp / LinkedIn');
  const [rewardAED, setRewardAED] = useState('25.00');
  const [targetSlots, setTargetSlots] = useState('500');
  const [instructions, setInstructions] = useState('1. Share official flyer into an active local or professional community group with >1,000 members.\n2. Screenshot must show the group name, published post, and delivery timestamps.');
  const [country, setCountry] = useState('GLOBAL');
  const [emirateState, setEmirateState] = useState('Worldwide (All Regions)');
  const [cityArea, setCityArea] = useState('Global Remote');
  const [flyerUrl, setFlyerUrl] = useState('/assets/demo/task-creative.jpg');
  const [postCopy, setPostCopy] = useState('Exciting news! Discover next-generation digital lifestyle and enterprise solutions designed for creators and businesses worldwide. Verified quality, seamless performance, and trusted by global leaders.');
  const [hashtags, setHashtags] = useState('#GlobalLaunch #BrandSponsor #Innovation #Worldwide');
  const [targetUrl, setTargetUrl] = useState('https://ebiznetwork.com/launch');
  const [targetGroupName, setTargetGroupName] = useState('Global Creator & Business Network 🌐 [15k members]');
  const [isDeploying, setIsDeploying] = useState(false);

  const campaigns = platformCampaigns.map((c) => {
    const p = c.platform.toLowerCase();
    const isTrustpilot = p.includes('trustpilot');
    const isGoogle = p.includes('google');
    const isInstagram = p.includes('instagram');
    const isTikTok = p.includes('tiktok');
    const isYouTube = p.includes('youtube');
    const isWhatsApp = p.includes('whatsapp');
    const icon = isTrustpilot
      ? TrustpilotLogo
      : isGoogle
      ? GoogleReviewLogo
      : isInstagram
      ? InstagramLogo
      : isTikTok
      ? TikTokLogo
      : isYouTube
      ? YouTubeLogo
      : WhatsAppLogo;

    const statusColor =
      c.status === 'Live'
        ? 'bg-emerald-50 text-[#16B364] border-emerald-200'
        : c.status === 'Paused'
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : c.status === 'Frozen by Admin'
        ? 'bg-red-50 text-red-700 border-red-200'
        : 'bg-blue-50 text-[#168BFF] border-blue-200';

    return {
      ...c,
      icon,
      statusColor,
      escrow: c.totalBudget,
      progress: `${c.slotsTaken} / ${c.slotsTotal}`,
    };
  });

  const handleDeployCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);

    const rewardNum = parseFloat(rewardAED) || 22.0;
    const slotsNum = parseInt(targetSlots, 10) || 200;

    createAdminCampaign({
      brand: sponsorBrand || 'Apex Global Innovations',
      title: campaignTitle || `${emirateState} Verified Experience Sprint`,
      platform: platform,
      rewardAED: rewardNum,
      targetContributors: slotsNum,
      instructions: instructions || 'Follow verified task guidelines and submit screenshot with reviewer handle.',
      region: country === 'GLOBAL' ? 'Worldwide 🌐' : `${cityArea ? cityArea + ', ' : ''}${emirateState}, ${country}`,
      country: country,
      emirateState: emirateState,
      cityArea: cityArea,
      targetChannelType: platform.toLowerCase().includes('whatsapp') ? 'whatsapp_group' : platform.toLowerCase().includes('review') ? 'review' : 'social_general',
      targetChannelName: targetGroupName,
      flyerUrl: flyerUrl,
      postCopy: postCopy,
      hashtags: hashtags,
      targetUrl: targetUrl,
    });

    setTimeout(() => {
      setIsDeploying(false);
      setIsCreateModalOpen(false);
    }, 600);
  };

  const toggleFreeze = (id: string) => {
    toggleCampaignStatus(id);
  };

  const filtered = campaigns.filter((c) => {
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'frozen'
        ? c.status.includes('Frozen')
        : c.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      c.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. HEADER & CONTROLS
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Campaigns Oversight &amp; Geofence Management
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Audit brand sponsors, review geographic geofences, freeze suspicious campaigns, and release escrow deposits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Launch Network Campaign</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. FILTERS & TABLE
         ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E7ECF3] shadow-xs overflow-hidden space-y-4">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Campaigns' },
              { id: 'live', label: 'Live' },
              { id: 'under review', label: 'Under Review' },
              { id: 'frozen', label: 'Frozen / Flagged' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  filterStatus === tab.id
                    ? 'bg-[#07182F] text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by brand, title, or campaign ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Brand / Campaign</th>
                <th className="py-3.5 px-5">Platform</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Location Geofence</th>
                <th className="py-3.5 px-5">Slots</th>
                <th className="py-3.5 px-5">Escrow</th>
                <th className="py-3.5 px-5 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filtered.map((c) => {
                const Icon = c.icon;
                return (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block">{c.title}</span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {c.brand} &bull; {c.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 font-medium text-gray-700">{c.platform}</td>

                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${c.statusColor}`}>
                        {c.status}
                      </span>
                    </td>

                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        {c.region || 'UAE 🇦🇪'}
                      </span>
                    </td>

                    <td className="py-4 px-5 font-mono text-gray-800 font-medium">{c.progress}</td>

                    <td className="py-4 px-5 font-mono font-bold text-gray-900">{c.escrow}</td>

                    <td className="py-4 px-5 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => toggleCampaignStatus(c.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors inline-flex items-center gap-1 ${
                          c.status === 'Live'
                            ? 'bg-amber-50 hover:bg-amber-100 text-amber-700'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {c.status === 'Live' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        <span>{c.status === 'Live' ? 'Pause' : 'Activate'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          3. ENHANCED ADMIN CAMPAIGN CREATOR MODAL WITH REAL-TIME LIVE POST MOCKUP
         ========================================================================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-6xl w-full p-5 sm:p-7 border border-[#E4EAF2] shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-6 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#168BFF] flex items-center justify-center shadow-2xs">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#101828]">Launch Network Sponsor Campaign</h3>
                  <p className="text-xs text-gray-500">
                    Target specific countries, states, and districts with live real-time post preview
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split Screen: Form on Left, Real-Time Live Mockup on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
              {/* Left 6 Columns: Campaign Settings & Granular Location Selector */}
              <form onSubmit={handleDeployCampaign} className="lg:col-span-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Campaign Title</label>
                    <input
                      type="text"
                      required
                      value={campaignTitle}
                      onChange={(e) => setCampaignTitle(e.target.value)}
                      placeholder="e.g. Trustpilot 5-Star Experience Review"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Sponsor / Brand Name</label>
                    <input
                      type="text"
                      required
                      value={sponsorBrand}
                      onChange={(e) => setSponsorBrand(e.target.value)}
                      placeholder="e.g. Royal Hospitality Group UAE"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF] font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Platform Channel</label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF] font-bold text-gray-800"
                    >
                      <option value="WhatsApp / LinkedIn">WhatsApp / LinkedIn Group</option>
                      <option value="Trustpilot">Trustpilot Review</option>
                      <option value="Google Reviews">Google Maps Review</option>
                      <option value="Instagram">Instagram Post</option>
                      <option value="TikTok">TikTok Sound / UGC</option>
                      <option value="YouTube">YouTube Video</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Reward Per Task (AED 🇦🇪)</label>
                    <input
                      type="number"
                      step="0.50"
                      min="1.00"
                      required
                      value={rewardAED}
                      onChange={(e) => setRewardAED(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF] font-bold text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Target Slots (Users)</label>
                    <input
                      type="number"
                      min="10"
                      required
                      value={targetSlots}
                      onChange={(e) => setTargetSlots(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF] font-bold text-gray-900"
                    />
                  </div>
                </div>

                {/* =========================================================================
                    LOCATION GEOGRAPHIC TARGETING (Country -> State/Emirate -> District)
                   ========================================================================= */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>Geographic Targeting &amp; Geofencing</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-bold">
                      Global &amp; Local Reach
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* Country Selector */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Target Country</label>
                      <select
                        value={country}
                        onChange={(e) => {
                          const newCountry = e.target.value;
                          setCountry(newCountry);
                          const cfg = REGIONAL_REGIONS[newCountry] || REGIONAL_REGIONS.GLOBAL;
                          const firstState = Object.keys(cfg)[0];
                          setEmirateState(firstState);
                          const firstDist = cfg[firstState]?.[0] || 'All Districts';
                          setCityArea(firstDist);
                          const cObj = COUNTRY_OPTIONS.find((c) => c.code === newCountry);
                          const flag = cObj ? cObj.label.split(' ').pop() : '🌐';
                          setTargetGroupName(
                            newCountry === 'GLOBAL'
                              ? 'Global Creator & Business Network 🌐 [15k members]'
                              : `${firstState} Community Network ${flag} [5.2k members]`
                          );
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-emerald-500"
                      >
                        {COUNTRY_OPTIONS.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* State / Province / Region Selector */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">State / Province / Region</label>
                      <select
                        value={emirateState}
                        onChange={(e) => {
                          const newEmirate = e.target.value;
                          setEmirateState(newEmirate);
                          const cfg = REGIONAL_REGIONS[country] || REGIONAL_REGIONS.GLOBAL;
                          const districts = cfg[newEmirate] || ['All Districts'];
                          setCityArea(districts[0]);
                          const cObj = COUNTRY_OPTIONS.find((c) => c.code === country);
                          const flag = cObj ? cObj.label.split(' ').pop() : '🌐';
                          setTargetGroupName(
                            country === 'GLOBAL'
                              ? 'Global Creator & Business Network 🌐 [15k members]'
                              : `${newEmirate} Community Network ${flag} [5.2k members]`
                          );
                        }}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-emerald-500"
                      >
                        {Object.keys(REGIONAL_REGIONS[country] || REGIONAL_REGIONS.GLOBAL).map((em) => (
                          <option key={em} value={em}>
                            {em}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* City / District Selector */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">City / District / Area</label>
                      <select
                        value={cityArea}
                        onChange={(e) => setCityArea(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:ring-1 focus:ring-emerald-500"
                      >
                        {((REGIONAL_REGIONS[country] || REGIONAL_REGIONS.GLOBAL)[emirateState] || ['All Districts']).map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <p className="text-[10.5px] text-slate-500 italic">
                    📍 {country === 'GLOBAL' ? 'Worldwide campaign: Open to all verified creators globally.' : `Target geofence: Only contributors physically located in ${cityArea}, ${emirateState} will receive permission to submit proof.`}
                  </p>
                </div>

                {/* Post Copy / Content (Updates Live Mockup!) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-gray-700">Post Copy / Message Text</label>
                    <span className="text-[10px] text-emerald-600 font-mono font-semibold">Updates live in preview &rarr;</span>
                  </div>
                  <textarea
                    rows={2}
                    value={postCopy}
                    onChange={(e) => setPostCopy(e.target.value)}
                    placeholder="Enter the exact message copy or review prompt..."
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
                  />
                </div>

                {/* Hashtags & Target URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Required Hashtags</label>
                    <input
                      type="text"
                      value={hashtags}
                      onChange={(e) => setHashtags(e.target.value)}
                      placeholder="#BrandSponsor #Launch2026 #SpecialOffer #Worldwide"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Destination URL / App Link</label>
                    <input
                      type="url"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      placeholder="https://yourbrand.com/campaign"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
                    />
                  </div>
                </div>

                {/* Creative Flyer Image Picker */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Creative Image / Flyer</label>
                  <div className="flex items-center gap-2">
                    <select
                      value={flyerUrl}
                      onChange={(e) => setFlyerUrl(e.target.value)}
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
                    >
                      <option value="/assets/demo/task-creative.jpg">Hospitality &amp; Luxury Staycation Flyer</option>
                      <option value="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600">Al Zorah Waterfront Luxury Properties</option>
                      <option value="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600">Luxury Dining &amp; Food Flyer</option>
                      <option value="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600">Corporate &amp; Business Services</option>
                    </select>
                  </div>
                </div>

                {/* Contributor Instructions */}
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Contributor Execution Instructions</label>
                  <textarea
                    rows={2}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="Provide explicit step-by-step instructions for contributors..."
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
                  />
                </div>

                {/* Estimated Escrow Total */}
                <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs text-blue-950">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Lock className="w-4 h-4 text-[#168BFF]" /> Central Bank Escrow Deposit:
                  </span>
                  <span className="text-sm font-black text-[#168BFF]">
                    AED {(parseFloat(rewardAED || '22') * parseInt(targetSlots || '200', 10) * 1.15).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isDeploying}
                    className="w-full py-3 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isDeploying ? (
                      <span>Deploying to {emirateState} Marketplace...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-cyan-300" />
                        <span>Deploy Campaign Instantly ({cityArea}, {emirateState})</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Right 6 Columns: Real-Time Live Post Mockup Container */}
              <div className="lg:col-span-6 flex flex-col justify-start">
                <div className="sticky top-2 space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Live Post Preview (What Contributors Publish)</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Real-time sync</span>
                  </div>

                  {/* Render the reusable LivePostMockup! */}
                  <LivePostMockup
                    platform={platform}
                    brandName={sponsorBrand || 'Royal Hospitality Group UAE'}
                    title={campaignTitle || `${emirateState} Community Broadcast`}
                    postCopy={postCopy}
                    hashtags={hashtags}
                    flyerUrl={flyerUrl}
                    targetUrl={targetUrl}
                    country={country}
                    emirateState={emirateState}
                    cityArea={cityArea}
                    targetGroupName={targetGroupName}
                  />

                  <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200/80 text-[11px] text-emerald-900 leading-relaxed">
                    <p className="font-bold flex items-center gap-1 text-emerald-950">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Automated OCR Verification Assurance:</span>
                    </p>
                    <p className="mt-0.5 text-emerald-800">
                      Our Vision AI will inspect contributor screenshot uploads against this exact mockup, checking group title ({cityArea || emirateState}), image flyer hash, and required hashtags before releasing escrow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
