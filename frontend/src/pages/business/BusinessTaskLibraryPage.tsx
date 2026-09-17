import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Plus,
  ArrowRight,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Filter,
  Search,
  Layers,
} from 'lucide-react';
import {
  InstagramLogo,
  TikTokLogo,
  YouTubeLogo,
  FacebookLogo,
  WhatsAppLogo,
  XTwitterLogo,
} from '../../components/common/PlatformIcons';

export const BusinessTaskLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const templates = [
    {
      id: 'tmpl-ig-story',
      title: 'Instagram Story Repost & Link Sticker',
      category: 'social',
      platform: 'Instagram',
      icon: InstagramLogo,
      badgeColor: 'bg-pink-50 text-pink-700 border-pink-200',
      estCost: '$0.40 - $1.20',
      time: '2 mins',
      avgPassRate: '99.4%',
      proofType: 'Screenshot OCR + Tag Match',
      desc: 'Instruct contributors to share your campaign creative directly to their Instagram Story with an official link sticker pointing to your site.',
      requirements: ['Brand @tag visible', 'Link sticker active', 'Live for 24 hours'],
    },
    {
      id: 'tmpl-tiktok-duet',
      title: 'TikTok Viral Sound Duet & Hashtag Clip',
      category: 'video',
      platform: 'TikTok',
      icon: TikTokLogo,
      badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      estCost: '$2.00 - $6.50',
      time: '5 mins',
      avgPassRate: '98.8%',
      proofType: 'Video URL + Audio Track Match',
      desc: 'Contributors film a 15-second authentic reaction, duet, or dance using your sponsored sound clip and designated brand hashtags.',
      requirements: ['Official sound used', '#Sponsored tag included', 'Minimum 10s video length'],
    },
    {
      id: 'tmpl-yt-feedback',
      title: 'YouTube Thoughtful Feedback & Like',
      category: 'reviews',
      platform: 'YouTube',
      icon: YouTubeLogo,
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      estCost: '$1.00 - $2.50',
      time: '4 mins',
      avgPassRate: '99.1%',
      proofType: 'Screenshot + Channel Handle',
      desc: 'Contributors watch your video demo or trailer for at least 60 seconds, hit like, and leave thoughtful, non-spam constructive commentary.',
      requirements: ['Min 60s watch time', 'Comment &gt; 15 words', 'Public like verified'],
    },
    {
      id: 'tmpl-app-test',
      title: 'iOS / Android App Store Rating & First-Run Test',
      category: 'app',
      platform: 'App Testing',
      icon: Layers,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      estCost: '$1.80 - $4.50',
      time: '6 mins',
      avgPassRate: '97.9%',
      proofType: 'Store Review Screenshot',
      desc: 'Verified mobile contributors download your test build from TestFlight / Play Console, navigate 3 screens, and submit an authentic user rating.',
      requirements: ['App installed on device', 'Genuine feedback submitted', 'Play/App Store review verified'],
    },
    {
      id: 'tmpl-wa-status',
      title: 'WhatsApp Status Promotion & Group Share',
      category: 'messaging',
      platform: 'WhatsApp',
      icon: WhatsAppLogo,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      estCost: '$0.35 - $0.90',
      time: '1 min',
      avgPassRate: '99.6%',
      proofType: 'Status View Screenshot',
      desc: 'Rapid peer-to-peer word of mouth. Contributors post your promotional banner to their WhatsApp Status for 24 hours.',
      requirements: ['Published to status', 'View count captured after 12h', 'Unmodified banner art'],
    },
    {
      id: 'tmpl-x-repost',
      title: 'X (Twitter) Quote Repost with Custom Insight',
      category: 'social',
      platform: 'X (Twitter)',
      icon: XTwitterLogo,
      badgeColor: 'bg-gray-100 text-gray-800 border-gray-200',
      estCost: '$0.50 - $1.40',
      time: '2 mins',
      avgPassRate: '99.2%',
      proofType: 'Tweet URL Verification',
      desc: 'Amplify product announcements by having verified accounts quote-repost your tweet with their genuine opinions and brand mentions.',
      requirements: ['Quote repost with text', '@Brand mention included', 'Public account only'],
    },
  ];

  const filteredTemplates = templates.filter((tmpl) => {
    const matchesCategory =
      selectedCategory === 'all' ? true : tmpl.category === selectedCategory;
    const matchesSearch =
      tmpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.platform.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. HEADER & ACTION
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Task Template Library
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Select high-converting pre-configured task recipes with automatic AI verification rules built-in.
          </p>
        </div>

        <Link
          to="/business/campaigns/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#168BFF] hover:bg-[#1277dc] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Custom Task Builder</span>
        </Link>
      </div>

      {/* =========================================================================
          2. CATEGORY TABS & SEARCH
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-[#E7ECF3] shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Templates' },
            { id: 'social', label: 'Stories & Shares' },
            { id: 'video', label: 'Short Video / Duets' },
            { id: 'reviews', label: 'Reviews & Feedback' },
            { id: 'app', label: 'App Testing' },
            { id: 'messaging', label: 'Direct Messaging' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#07182F] text-white shadow-xs'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
          />
        </div>
      </div>

      {/* =========================================================================
          3. TEMPLATES GRID
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((tmpl) => {
          const Icon = tmpl.icon;
          return (
            <div
              key={tmpl.id}
              className="p-6 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${tmpl.badgeColor}`}>
                    {tmpl.platform}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-gray-900 group-hover:text-[#168BFF] transition-colors line-clamp-1">
                    {tmpl.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {tmpl.desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-2xl bg-gray-50 text-[11px]">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Est. Cost / Task</span>
                    <span className="font-bold text-gray-900">{tmpl.estCost}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Avg. AI Match</span>
                    <span className="font-bold text-[#16B364]">{tmpl.avgPassRate}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                    Automated Verification Requirements:
                  </span>
                  {tmpl.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16B364] shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate('/business/campaigns/create')}
                  className="w-full py-2.5 rounded-xl bg-[#07182F] hover:bg-[#168BFF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
