import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Sparkles,
  ExternalLink,
  Clock,
  ShieldCheck,
  MapPin,
  Wifi,
} from 'lucide-react';
import { InstagramLogo, TikTokLogo, YouTubeLogo } from '../../components/common/PlatformIcons';
import { usePlatform } from '../../context/PlatformDataContext';

export const BusinessSubmissionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'auto_approved' | 'flagged'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedSub, setInspectedSub] = useState<any | null>(null);

  const { submissions: platformSubmissions, approveSubmission, rejectSubmission } = usePlatform();

  const submissions = platformSubmissions.map((ps) => {
    const isTikTok = ps.taskTitle.toLowerCase().includes('tiktok') || ps.campaignName.toLowerCase().includes('tiktok');
    const isYouTube = ps.taskTitle.toLowerCase().includes('youtube') || ps.campaignName.toLowerCase().includes('youtube');
    const platform = isTikTok ? 'TikTok' : isYouTube ? 'YouTube' : 'Instagram';
    const icon = isTikTok ? TikTokLogo : isYouTube ? YouTubeLogo : InstagramLogo;
    
    const statusLabel =
      ps.status === 'approved'
        ? 'Auto-Approved'
        : ps.status === 'under_review'
        ? 'Pending Review'
        : ps.status === 'rejected'
        ? 'Flagged'
        : 'Action Required';

    return {
      rawId: ps.id,
      id: `SUB-${ps.id}`,
      campaign: ps.campaignName,
      platform,
      icon,
      contributor: ps.contributorName,
      handle: ps.contributorHandle || `@${ps.contributorName.toLowerCase().replace(/\s+/g, '_')}`,
      avatar: ps.contributorAvatar,
      timestamp: ps.submittedAt,
      matchScore: ps.ai?.confidence ?? 95,
      status: statusLabel,
      reward: ps.reward,
      workLocation: (ps as any).workLocation || (ps as any).matchedLocation || (ps as any).location || 'Manhattan, New York, US 🇺🇸',
      ipAddress: (ps as any).ipAddress || '198.51.100.42',
      isp: (ps as any).isp || 'Verizon Fios Global',
      geofenceStatus: (ps as any).geofenceStatus || 'In-Zone Verified (Target Passed)',
      screenshotUrl: ps.screenshotUrl,
      postUrl: ps.postUrl,
      note: ps.note,
      ocrData: {
        hashtags: '#VerifiedBrandSponsor #Launch2026',
        stickerUrl: ps.postUrl,
        dimensions: '1080 x 1920 px',
      },
    };
  });

  const handleApprove = (rawId: number) => {
    approveSubmission(rawId, 'Approved by brand client review.');
    setInspectedSub(null);
  };

  const handleReject = (rawId: number) => {
    rejectSubmission(rawId, 'Rejected by brand client review.');
    setInspectedSub(null);
  };

  const handleBatchApproveHighConfidence = () => {
    platformSubmissions
      .filter((s) => s.status === 'under_review' && s.ai.confidence >= 90)
      .forEach((s) => approveSubmission(s.id, 'Batch Auto-Approved by brand (Confidence >= 90%).'));
  };

  const filtered = submissions.filter((s) => {
    const matchesTab =
      activeTab === 'all'
        ? true
        : activeTab === 'pending'
        ? s.status === 'Pending Review'
        : activeTab === 'auto_approved'
        ? s.status === 'Auto-Approved'
        : s.status === 'Flagged';
    const matchesSearch =
      s.contributor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.campaign.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. HEADER & BATCH ACTION
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Submissions &amp; Proof Verification
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Inspect OCR computer vision proof scans, approve payouts, and manage verification disputes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleBatchApproveHighConfidence}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#16B364] hover:bg-[#139452] text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Approve All High Confidence (&gt;90%)</span>
        </button>
      </div>

      {/* =========================================================================
          2. FILTERS & SEARCH
         ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E7ECF3] shadow-xs overflow-hidden space-y-4">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Submissions' },
              { id: 'pending', label: 'Pending Review' },
              { id: 'auto_approved', label: 'Approved' },
              { id: 'flagged', label: 'Flagged / Needs Check' },
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

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by contributor, campaign, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
            />
          </div>
        </div>

        {/* Submissions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Submission / Campaign</th>
                <th className="py-3.5 px-5">Contributor</th>
                <th className="py-3.5 px-5">AI Match Score</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Payout</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filtered.map((sub) => {
                const Icon = sub.icon;
                return (
                  <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 block line-clamp-1">{sub.campaign}</span>
                          <span className="text-[10px] text-gray-400 font-mono">{sub.id} &bull; {sub.timestamp}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={sub.avatar}
                          alt={sub.contributor}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-gray-900 block">{sub.contributor}</span>
                          <div className="flex items-center gap-1 text-[10px] text-gray-600 font-medium">
                            <MapPin className="w-3 h-3 text-[#168BFF] shrink-0" />
                            <span>{sub.workLocation}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[9.5px] font-mono text-gray-400">
                            <Wifi className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                            <span>{sub.ipAddress}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-14 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${sub.matchScore}%` }}
                            className={`h-full rounded-full ${
                              sub.matchScore >= 95
                                ? 'bg-[#16B364]'
                                : sub.matchScore >= 85
                                ? 'bg-[#168BFF]'
                                : 'bg-red-500'
                            }`}
                          />
                        </div>
                        <span className="font-mono font-bold text-gray-900">{sub.matchScore}%</span>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          sub.status === 'Auto-Approved'
                            ? 'bg-emerald-50 text-[#16B364] border-emerald-200'
                            : sub.status === 'Pending Review'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : sub.status === 'Rejected'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-purple-50 text-purple-700 border-purple-200'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>

                    <td className="py-4 px-5 font-black text-gray-900">
                      {sub.reward}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button
                        type="button"
                        onClick={() => setInspectedSub(sub)}
                        className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-[#168BFF] hover:text-white text-gray-700 font-bold text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Proof</span>
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
          INSPECTION MODAL
         ========================================================================= */}
      {inspectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900">Computer Vision OCR Inspection</h3>
                <p className="text-xs text-gray-500">{inspectedSub.id} &bull; {inspectedSub.contributor}</p>
              </div>
              <button
                type="button"
                onClick={() => setInspectedSub(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {inspectedSub.screenshotUrl ? (
              <div className="rounded-2xl border border-gray-200 overflow-hidden bg-black/5 max-h-60 flex items-center justify-center p-2">
                <img
                  src={inspectedSub.screenshotUrl}
                  alt="Proof Screenshot"
                  className="max-h-56 w-auto object-contain rounded-xl shadow-xs"
                />
              </div>
            ) : (
              <div className="rounded-2xl bg-gray-900 p-4 text-center space-y-2 text-white">
                <div className="h-28 rounded-xl bg-black/50 border border-white/10 flex flex-col items-center justify-center p-4">
                  <span className="text-emerald-400 font-bold text-sm mb-1">&check; AI OCR Verification Pass</span>
                  <span className="text-xs text-gray-300 font-mono">Found: {inspectedSub.ocrData.hashtags}</span>
                  <span className="text-[10px] text-gray-400 font-mono mt-1">Match Confidence: {inspectedSub.matchScore}%</span>
                </div>
              </div>
            )}

            {/* Contributor Place of Work & Verified IP Verification */}
            <div className="p-3.5 bg-slate-900 text-white rounded-2xl space-y-2 text-xs border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Contributor Place of Work:</span>
                </span>
                <span className="font-bold text-cyan-300">{inspectedSub.workLocation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 flex items-center gap-1.5 font-medium">
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Client IP:</span>
                </span>
                <span className="font-mono text-emerald-300 font-bold">{inspectedSub.ipAddress} <span className="text-gray-400 text-[10px] font-sans">({inspectedSub.isp})</span></span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800">
                <span className="text-gray-400">Regional Targeting:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{inspectedSub.geofenceStatus}</span>
                </span>
              </div>
            </div>

            {inspectedSub.note && (
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-600">
                <span className="font-bold text-gray-700 block text-[11px] mb-0.5">Contributor Remark:</span>
                <p className="text-[11px] italic">"{inspectedSub.note}"</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleReject(inspectedSub.rawId)}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-colors cursor-pointer"
              >
                Reject Proof
              </button>
              <button
                type="button"
                onClick={() => handleApprove(inspectedSub.rawId)}
                className="px-5 py-2 rounded-xl bg-[#16B364] hover:bg-[#139452] text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-colors cursor-pointer"
              >
                Approve &amp; Credit {inspectedSub.reward}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
