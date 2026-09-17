import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
  Users,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  Flame,
  Globe,
  Layers,
  Smartphone,
} from 'lucide-react';
import {
  InstagramLogo,
  TikTokLogo,
  YouTubeLogo,
  GoogleLogo,
  FacebookLogo,
  XTwitterLogo,
  WhatsAppLogo,
  TrustpilotLogo,
  GoogleReviewLogo,
} from '../../components/common/PlatformIcons';
import { usePlatform } from '../../context/PlatformDataContext';

export const PublicTasksPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const { tasks: platformTasks } = usePlatform();

  const categories = [
    { id: 'all', name: 'All Formats' },
    { id: 'community', name: '📢 Community Groups (Global & Local)' },
    { id: 'reviews', name: '⭐ Trustpilot & Google Reviews' },
    { id: 'social', name: 'Social Shares & Posts' },
    { id: 'video', name: 'Video Duets & UGC' },
    { id: 'survey', name: 'Surveys & Polls' },
  ];

  const regions = [
    { id: 'all', name: 'Worldwide (All) 🌐' },
    { id: 'global', name: 'Global Remote 🌍' },
    { id: 'us', name: 'United States 🇺🇸' },
    { id: 'uk', name: 'United Kingdom 🇬🇧' },
    { id: 'uae', name: 'UAE 🇦🇪' },
    { id: 'saudi', name: 'Saudi Arabia 🇸🇦' },
    { id: 'europe', name: 'Europe 🇪🇺' },
    { id: 'asia', name: 'Asia-Pacific 🇸🇬' },
  ];

  const platforms = [
    { id: 'all', name: 'All Channels' },
    { id: 'whatsapp', name: 'WhatsApp Groups', icon: WhatsAppLogo },
    { id: 'linkedin', name: 'LinkedIn Groups', icon: XTwitterLogo },
    { id: 'trustpilot', name: 'Trustpilot', icon: TrustpilotLogo },
    { id: 'google_reviews', name: 'Google Reviews', icon: GoogleReviewLogo },
    { id: 'instagram', name: 'Instagram', icon: InstagramLogo },
    { id: 'tiktok', name: 'TikTok', icon: TikTokLogo },
    { id: 'youtube', name: 'YouTube', icon: YouTubeLogo },
    { id: 'facebook', name: 'Facebook', icon: FacebookLogo },
  ];

  const sampleTasks = platformTasks.map((task) => {
    const p = task.platform.toLowerCase();
    const icon = p.includes('trustpilot')
      ? TrustpilotLogo
      : p.includes('google review') || (p.includes('google') && p.includes('review'))
      ? GoogleReviewLogo
      : p.includes('tiktok')
      ? TikTokLogo
      : p.includes('youtube')
      ? YouTubeLogo
      : p.includes('facebook')
      ? FacebookLogo
      : p.includes('whatsapp')
      ? WhatsAppLogo
      : p.includes('google')
      ? GoogleLogo
      : p.includes('x') || p.includes('twitter')
      ? XTwitterLogo
      : InstagramLogo;

    return {
      ...task,
      icon,
    };
  });

  const filteredTasks = sampleTasks.filter((task) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      task.category === selectedCategory ||
      (selectedCategory === 'community' && (!!task.targetChannelType || task.categoryName.toLowerCase().includes('broadcast') || task.categoryName.toLowerCase().includes('community') || task.title.toLowerCase().includes('group') || task.title.toLowerCase().includes('whatsapp'))) ||
      (selectedCategory === 'reviews' && (task.platform.toLowerCase().includes('trustpilot') || task.platform.toLowerCase().includes('google review') || task.category === 'reviews'));
    
    const matchesPlatform =
      selectedPlatform === 'all' ||
      (selectedPlatform === 'whatsapp' && (task.platform.toLowerCase().includes('whatsapp') || task.title.toLowerCase().includes('whatsapp'))) ||
      (selectedPlatform === 'linkedin' && (task.platform.toLowerCase().includes('linkedin') || task.title.toLowerCase().includes('linkedin'))) ||
      (selectedPlatform === 'trustpilot' && task.platform.toLowerCase().includes('trustpilot')) ||
      (selectedPlatform === 'google_reviews' && (task.platform.toLowerCase().includes('google review') || task.platform.toLowerCase().includes('google'))) ||
      task.platform.toLowerCase().includes(selectedPlatform.toLowerCase());

    const matchesRegion =
      selectedRegion === 'all' ||
      (selectedRegion === 'global' && (!task.country || task.country.toLowerCase().includes('global') || task.region.toLowerCase().includes('global') || task.emirateState?.toLowerCase().includes('world'))) ||
      (selectedRegion === 'us' && ((task.country && task.country.includes('US')) || task.region.toLowerCase().includes('united states') || task.region.toLowerCase().includes('new york') || task.region.toLowerCase().includes('california'))) ||
      (selectedRegion === 'uk' && ((task.country && task.country.includes('GB')) || task.region.toLowerCase().includes('united kingdom') || task.region.toLowerCase().includes('london'))) ||
      (selectedRegion === 'uae' && ((task.country && task.country.includes('AE')) || task.region.toLowerCase().includes('uae') || task.region.toLowerCase().includes('dubai') || task.region.toLowerCase().includes('ajman'))) ||
      (selectedRegion === 'saudi' && ((task.country && task.country.includes('SA')) || task.region.toLowerCase().includes('saudi') || task.region.toLowerCase().includes('riyadh'))) ||
      (selectedRegion === 'europe' && (task.region.toLowerCase().includes('germany') || task.region.toLowerCase().includes('europe') || task.region.toLowerCase().includes('berlin'))) ||
      (selectedRegion === 'asia' && (task.region.toLowerCase().includes('singapore') || task.region.toLowerCase().includes('india') || task.region.toLowerCase().includes('asia'))) ||
      task.region.toLowerCase().includes(selectedRegion.toLowerCase()) ||
      (task.emirateState && task.emirateState.toLowerCase().includes(selectedRegion.toLowerCase()));

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.cityArea && task.cityArea.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.emirateState && task.emirateState.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty = selectedDifficulty === 'all' || task.difficulty === selectedDifficulty;
    
    return matchesCategory && matchesPlatform && matchesRegion && matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-left font-sans">
      
      {/* =========================================================================
          1. BESPOKE MARKETPLACE HERO BANNER
         ========================================================================= */}
      <section className="bg-[#07182F] text-white pt-24 pb-12 sm:pt-28 sm:pb-14 px-4 sm:px-8 border-b border-white/10 relative overflow-hidden bg-grid-mesh-dark">
        <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-[#168BFF]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#20C4E8]">
                <Flame className="w-3.5 h-3.5 fill-[#20C4E8]" />
                <span>1,842 Active Tasks Live in Global Marketplace</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
                Verified Social &amp; Review Marketplace
              </h1>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                Choose tasks from Trustpilot, Google Reviews, Instagram, TikTok, and YouTube across the globe. Follow genuine steps, upload verified proof, and get paid with instant escrow release.
              </p>
            </div>

            {/* Quick Live Stats Pill */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4 shrink-0 text-center font-mono">
              <div>
                <span className="text-[10px] text-gray-400 uppercase block font-sans">Avg Reward</span>
                <span className="text-lg font-black text-[#16B364]">AED 4.50</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase block font-sans">AI Verification</span>
                <span className="text-lg font-black text-[#20C4E8]">12.4s</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] text-gray-400 uppercase block font-sans">Min Cashout</span>
                <span className="text-lg font-black text-amber-400">AED 20.00</span>
              </div>
            </div>
          </div>

          {/* Search & Channel Filters */}
          <div className="pt-2 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tasks by platform, keyword, or campaign title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#20C4E8] backdrop-blur-md"
              />
            </div>

            {/* Platform Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1 hidden sm:inline">Platform:</span>
              {platforms.map((p) => {
                const Icon = p.icon;
                const isActive = selectedPlatform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#168BFF] text-white shadow-md'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    <span>{p.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Region & Granular Location Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider mr-1 flex items-center gap-1">
                <span>🌍 Region / Country:</span>
              </span>
              {regions.map((reg) => {
                const isActive = selectedRegion === reg.id;
                return (
                  <button
                    key={reg.id}
                    type="button"
                    onClick={() => setSelectedRegion(reg.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-emerald-400 text-slate-950 font-black shadow-md'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    {reg.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MARKETPLACE CATALOG (HIGH DENSITY CARDS)
         ========================================================================= */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto bg-dot-pattern">
        
        {/* Secondary Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === c.id
                    ? 'bg-[#07182F] text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <span className="text-xs font-bold text-gray-500">
            Showing {filteredTasks.length} open verified opportunities
          </span>
        </div>

        {/* Task Cards Grid */}
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E4EAF2] shadow-sm space-y-3">
            <CheckCircle2 className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-base font-bold text-gray-900">No tasks found matching your filters</h3>
            <p className="text-xs text-gray-500">Try selecting "Worldwide (All)" or adjusting your search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => {
              const Icon = task.icon;
              const rewardAed = (task.reward_cents / 100).toFixed(2);
              const slotsLeft = task.slots_total - task.slots_taken;
              const progressPct = Math.round((task.slots_taken / task.slots_total) * 100);

              return (
                <div
                  key={task.id}
                  className="bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-sm hover:shadow-xl hover:border-[#168BFF]/40 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border uppercase ${task.badgeColor}`}>
                          {task.platform}
                        </span>
                        {task.emirateState && task.emirateState !== 'All Emirates' && task.emirateState !== 'Worldwide' ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono">
                            📍 {task.cityArea ? `${task.cityArea}, ` : ''}{task.emirateState}
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                            🌐 {task.region || 'Worldwide'}
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="text-base sm:text-lg font-black text-[#16B364]">AED {rewardAed}</span>
                        <span className="block text-[9px] text-gray-400 font-bold">د.إ Net</span>
                      </div>
                    </div>

                    {/* Regional & Channel Requirements Pills */}
                    {(task.cityArea || task.targetChannelType || task.retentionHours) && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        {task.cityArea && (
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                            District: {task.cityArea}
                          </span>
                        )}
                        {task.targetChannelType && (
                          <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md font-medium">
                            💬 {task.targetChannelType === 'whatsapp_group' ? 'WhatsApp Group' : 'LinkedIn Group'}
                          </span>
                        )}
                        <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded-md font-mono">
                          🛡️ {task.retentionHours || 72}h Hold
                        </span>
                      </div>
                    )}

                    <h3 className="text-base font-black text-gray-900 group-hover:text-[#168BFF] transition-colors leading-snug">
                      {task.title}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {task.description}
                    </p>

                    {/* Progress of slots */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-gray-400">{slotsLeft} slots remaining</span>
                        <span className="text-gray-600">{progressPct}% taken</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#168BFF] to-[#20C4E8] rounded-full"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-gray-500 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{task.estimated_minutes} mins</span>
                      <span>&bull;</span>
                      <span className="capitalize">{task.difficulty}</span>
                    </div>

                    <Link
                      to={`/app/tasks/${task.id}`}
                      className="px-4 py-1.5 rounded-xl bg-[#07182F] hover:bg-[#168BFF] text-white font-black text-xs transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <span>Start Task</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </section>

    </div>
  );
};
