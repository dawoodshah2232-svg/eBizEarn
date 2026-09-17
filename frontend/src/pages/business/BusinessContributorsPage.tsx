import React, { useState } from 'react';
import {
  Users,
  Search,
  Star,
  CheckCircle2,
  ShieldCheck,
  Filter,
  UserCheck,
  UserX,
  Mail,
  Award,
  Globe,
  Plus,
  MapPin,
  Wifi,
} from 'lucide-react';
import {
  InstagramLogo,
  TikTokLogo,
  YouTubeLogo,
  FacebookLogo,
  XTwitterLogo,
} from '../../components/common/PlatformIcons';

export const BusinessContributorsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const [contributors, setContributors] = useState([
    {
      id: 'USR-8821',
      name: 'Sarah Khan',
      handle: '@sarah_creatives',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
      country: 'United States',
      flag: '🇺🇸',
      workLocation: 'Manhattan, New York 🇺🇸',
      ipAddress: '198.51.100.42',
      isp: 'Verizon Fios US',
      tier: 'Level 3 Pro',
      rating: 4.98,
      tasksCompleted: 482,
      matchRate: '99.4%',
      preferred: true,
      platforms: [
        { name: 'Instagram', icon: InstagramLogo },
        { name: 'TikTok', icon: TikTokLogo },
        { name: 'Twitter', icon: XTwitterLogo },
      ],
    },
    {
      id: 'USR-7734',
      name: 'Marcus Vance',
      handle: '@marcus_tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
      country: 'United Arab Emirates',
      flag: '🇦🇪',
      workLocation: 'Silicon Oasis, Dubai 🇦🇪',
      ipAddress: '194.170.82.14',
      isp: 'Etisalat e& 5G',
      tier: 'Level 3 Pro',
      rating: 4.92,
      tasksCompleted: 310,
      matchRate: '98.9%',
      preferred: true,
      platforms: [
        { name: 'YouTube', icon: YouTubeLogo },
        { name: 'Twitter', icon: XTwitterLogo },
      ],
    },
    {
      id: 'USR-6190',
      name: 'Elena Rostova',
      handle: '@elena_daily',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
      country: 'Germany',
      flag: '🇩🇪',
      workLocation: 'Mitte, Berlin 🇩🇪',
      ipAddress: '91.22.140.76',
      isp: 'Deutsche Telekom Fiber',
      tier: 'Level 2 Verified',
      rating: 4.87,
      tasksCompleted: 195,
      matchRate: '98.2%',
      preferred: false,
      platforms: [
        { name: 'Instagram', icon: InstagramLogo },
        { name: 'TikTok', icon: TikTokLogo },
      ],
    },
    {
      id: 'USR-5012',
      name: 'Chen Wei',
      handle: '@chen_vlogs',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120',
      country: 'Singapore',
      flag: '🇸🇬',
      workLocation: 'Marina Bay, Singapore 🇸🇬',
      ipAddress: '119.74.20.15',
      isp: 'Singtel Fiber Broadband',
      tier: 'Level 3 Pro',
      rating: 4.95,
      tasksCompleted: 520,
      matchRate: '99.6%',
      preferred: true,
      platforms: [
        { name: 'YouTube', icon: YouTubeLogo },
        { name: 'TikTok', icon: TikTokLogo },
      ],
    },
    {
      id: 'USR-4890',
      name: 'Amira Tariq',
      handle: '@amira_t',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120',
      country: 'United Arab Emirates',
      flag: '🇦🇪',
      workLocation: 'Downtown Dubai, UAE 🇦🇪',
      ipAddress: '92.98.41.22',
      isp: 'Du Telecom FTTH',
      tier: 'Level 2 Verified',
      rating: 4.81,
      tasksCompleted: 140,
      matchRate: '97.8%',
      preferred: false,
      platforms: [
        { name: 'Facebook', icon: FacebookLogo },
        { name: 'Instagram', icon: InstagramLogo },
      ],
    },
  ]);

  const togglePreferred = (id: string) => {
    setContributors(
      contributors.map((c) =>
        c.id === id ? { ...c, preferred: !c.preferred } : c
      )
    );
  };

  const filteredContributors = contributors.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.handle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier =
      selectedTier === 'all'
        ? true
        : selectedTier === 'pro'
        ? c.tier.includes('Pro')
        : c.tier.includes('Verified');
    const matchesCountry =
      selectedCountry === 'all'
        ? true
        : c.country.toLowerCase() === selectedCountry.toLowerCase();
    return matchesSearch && matchesTier && matchesCountry;
  });

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. HEADER
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Contributor Talent Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Discover verified contributors, manage preferred creator whitelists, and inspect quality ratings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#16B364] border border-emerald-200 text-xs font-bold">
            &check; 520,000+ Carrier-Verified Contributors
          </span>
        </div>
      </div>

      {/* =========================================================================
          2. SEARCH & FILTER CONTROLS
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#E7ECF3] shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, handle, or user ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#168BFF]"
          >
            <option value="all">All Tiers</option>
            <option value="pro">Level 3 Pro (&gt;98% Quality)</option>
            <option value="verified">Level 2 Verified</option>
          </select>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#168BFF]"
          >
            <option value="all">All Countries</option>
            <option value="United Arab Emirates">🇦🇪 UAE</option>
            <option value="United States">🇺🇸 USA</option>
            <option value="Germany">🇩🇪 Germany</option>
            <option value="Singapore">🇸🇬 Singapore</option>
            <option value="Egypt">🇪🇬 Egypt</option>
          </select>
        </div>
      </div>

      {/* =========================================================================
          3. CONTRIBUTORS TABLE
         ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E7ECF3] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Contributor</th>
                <th className="py-3.5 px-5">Work Location &bull; Verified IP</th>
                <th className="py-3.5 px-5">Tier / Quality</th>
                <th className="py-3.5 px-5">Verified Channels</th>
                <th className="py-3.5 px-5">Total Completed</th>
                <th className="py-3.5 px-5 text-right">Whitelist &bull; Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredContributors.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-[#168BFF]/20"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-gray-900">{c.name}</span>
                          {c.preferred && (
                            <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.2 rounded font-bold">
                              Preferred
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">{c.handle} &bull; {c.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-gray-900 font-semibold text-xs">
                        <MapPin className="w-3.5 h-3.5 text-[#168BFF] shrink-0" />
                        <span>{c.workLocation}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px]">
                        <Wifi className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-800 font-bold">{c.ipAddress}</span>
                        <span className="text-gray-400 font-sans">({c.isp})</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1 text-[#F79009] font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#F79009]" />
                      <span>{c.rating}</span>
                      <span className="text-gray-400 font-normal">({c.matchRate} OCR match)</span>
                    </div>
                    <span className="text-[10px] text-[#168BFF] font-bold block mt-0.5">{c.tier}</span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5">
                      {c.platforms.map((p, i) => {
                        const Icon = p.icon;
                        return (
                          <div
                            key={i}
                            className="p-1 rounded-md bg-gray-100 border border-gray-200 text-gray-700"
                            title={p.name}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                        );
                      })}
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-900">{c.tasksCompleted} tasks</span>
                    <span className="text-[10px] text-gray-400 block">100% payout track</span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => togglePreferred(c.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                          c.preferred
                            ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {c.preferred ? '★ Preferred' : '+ Whitelist'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
