import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Megaphone,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Play,
  Pause,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';
import {
  InstagramLogo,
  TikTokLogo,
  YouTubeLogo,
  FacebookLogo,
  WhatsAppLogo,
} from '../../components/common/PlatformIcons';
import { usePlatform } from '../../context/PlatformDataContext';

export const BusinessCampaignsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'paused' | 'completed' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const { campaigns: platformCampaigns, toggleCampaignStatus } = usePlatform();

  const campaigns = platformCampaigns.map((c) => {
    const isInstagram = c.platform.toLowerCase().includes('instagram');
    const isTikTok = c.platform.toLowerCase().includes('tiktok');
    const isYouTube = c.platform.toLowerCase().includes('youtube');
    const isFacebook = c.platform.toLowerCase().includes('facebook');
    const icon = isInstagram ? InstagramLogo : isTikTok ? TikTokLogo : isYouTube ? YouTubeLogo : isFacebook ? FacebookLogo : WhatsAppLogo;

    const statusColor =
      c.status === 'Live'
        ? 'bg-emerald-50 text-[#16B364] border-emerald-200'
        : c.status === 'Paused'
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : c.status === 'Completed'
        ? 'bg-blue-50 text-[#168BFF] border-blue-200'
        : 'bg-red-50 text-red-700 border-red-200';

    return {
      id: c.id,
      title: c.title,
      platform: c.platform,
      icon,
      status: c.status === 'Live' ? 'Active' : c.status,
      statusColor,
      completed: c.slotsTaken,
      target: c.slotsTotal,
      reward: c.reward,
      spent: c.spent,
      budget: c.totalBudget,
      matchRate: '99.2%',
      created: c.created,
    };
  });

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesTab =
      activeTab === 'all' ? true : c.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel =
      selectedChannel === 'all'
        ? true
        : c.platform.toLowerCase() === selectedChannel.toLowerCase();
    return matchesTab && matchesSearch && matchesChannel;
  });

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. TITLE BAR & ACTION
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Campaigns Management
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Monitor, pause, scale, and launch real-user social media task campaigns.
          </p>
        </div>

        <Link
          to="/business/campaigns/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#168BFF] hover:bg-[#1277dc] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Launch New Campaign</span>
        </Link>
      </div>

      {/* =========================================================================
          2. CORE KPI STRIP
         ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Total Active Budget</span>
          <span className="text-2xl font-black text-[#101828] mt-1 block">$2,347.50</span>
          <span className="text-[10px] text-[#16B364] font-bold block mt-0.5">&uarr; $620 added this week</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Total Verified Proofs</span>
          <span className="text-2xl font-black text-[#101828] mt-1 block">1,555</span>
          <span className="text-[10px] text-gray-400 block mt-0.5">Across 4 active channels</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Avg. AI Verification Match</span>
          <span className="text-2xl font-black text-[#16B364] mt-1 block">99.2%</span>
          <span className="text-[10px] text-gray-400 block mt-0.5">12s median OCR speed</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Active Campaigns</span>
          <span className="text-2xl font-black text-[#168BFF] mt-1 block">
            {campaigns.filter((c) => c.status === 'Active').length}
          </span>
          <span className="text-[10px] text-gray-400 block mt-0.5">1 in draft queue</span>
        </div>
      </div>

      {/* =========================================================================
          3. CAMPAIGNS TABLE & CONTROLS
         ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E7ECF3] shadow-xs overflow-hidden space-y-4">
        
        {/* Search, Status Tabs & Filters */}
        <div className="p-5 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {[
              { id: 'all', label: 'All Campaigns' },
              { id: 'active', label: 'Active' },
              { id: 'paused', label: 'Paused' },
              { id: 'completed', label: 'Completed' },
              { id: 'draft', label: 'Drafts' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#07182F] text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Channel Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full sm:w-40 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 focus:outline-none focus:border-[#168BFF]"
            >
              <option value="all">All Channels</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="facebook">Facebook</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Campaign / Platform</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Progress</th>
                <th className="py-3.5 px-5">Reward &bull; Spend</th>
                <th className="py-3.5 px-5">Match Rate</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredCampaigns.map((c) => {
                const Icon = c.icon;
                const percent = Math.round((c.completed / c.target) * 100);
                return (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <Link
                            to={`/business/campaigns/${c.id}`}
                            className="font-bold text-gray-900 hover:text-[#168BFF] transition-colors line-clamp-1 block"
                          >
                            {c.title}
                          </Link>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {c.id} &bull; Created {c.created}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${c.statusColor}`}>
                        {c.status}
                      </span>
                    </td>

                    <td className="py-4 px-5 min-w-[160px]">
                      <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                        <span className="text-gray-900">{c.completed} / {c.target}</span>
                        <span className="text-gray-500 font-mono">{percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${percent}%` }}
                          className={`h-full rounded-full transition-all ${
                            percent === 100 ? 'bg-[#16B364]' : 'bg-[#168BFF]'
                          }`}
                        />
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-bold text-gray-900">{c.reward} <span className="text-[10px] text-gray-400 font-normal">/ action</span></div>
                      <div className="text-[10px] text-gray-500 font-mono">
                        {c.spent} of {c.budget}
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-mono">
                        {c.matchRate}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {c.status !== 'Completed' && c.status !== 'Draft' && (
                          <button
                            type="button"
                            onClick={() => toggleCampaignStatus(c.id)}
                            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
                            title={c.status === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}
                          >
                            {c.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>
                        )}
                        <Link
                          to={`/business/campaigns/${c.id}`}
                          className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#168BFF] hover:text-white text-gray-700 font-bold text-xs transition-colors"
                        >
                          Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
