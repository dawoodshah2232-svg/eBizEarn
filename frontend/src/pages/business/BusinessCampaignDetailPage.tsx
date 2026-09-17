import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Megaphone,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  Users,
  Download,
  Share2,
  Pause,
  Play,
  ExternalLink,
  ShieldCheck,
  Eye,
  Check,
  X,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { InstagramLogo, TikTokLogo, YouTubeLogo, FacebookLogo, WhatsAppLogo } from '../../components/common/PlatformIcons';
import { usePlatform } from '../../context/PlatformDataContext';

export const BusinessCampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { campaigns, toggleCampaignStatus } = usePlatform();
  const campaign = campaigns.find((c) => c.id === id) || campaigns[0];
  const [inspectedSubmission, setInspectedSubmission] = useState<any | null>(null);

  const isLive = campaign.status === 'Live';

  const hourlyVelocity = [
    { hour: '09:00', completions: 18 },
    { hour: '11:00', completions: 42 },
    { hour: '13:00', completions: 65 },
    { hour: '15:00', completions: 89 },
    { hour: '17:00', completions: 110 },
    { hour: '19:00', completions: 95 },
    { hour: '21:00', completions: 61 },
  ];

  const [submissions, setSubmissions] = useState([
    {
      id: 'SUB-19028',
      contributor: 'Sarah Khan',
      handle: '@sarah_creatives',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      timestamp: '4 mins ago',
      matchScore: '99.4%',
      status: 'Approved',
      proofUrl: 'https://instagram.com/stories/sarah_creatives',
      ocrHashtags: '#AuraSummerGlow #HydrationSerum',
      reward: '$0.65',
    },
    {
      id: 'SUB-19024',
      contributor: 'Marcus Vance',
      handle: '@marcus_tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      timestamp: '12 mins ago',
      matchScore: '98.8%',
      status: 'Approved',
      proofUrl: 'https://instagram.com/stories/marcus_tech',
      ocrHashtags: '#AuraSummerGlow',
      reward: '$0.65',
    },
    {
      id: 'SUB-19019',
      contributor: 'Elena Rostova',
      handle: '@elena_daily',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      timestamp: '25 mins ago',
      matchScore: '94.2%',
      status: 'Pending Human Review',
      proofUrl: 'https://instagram.com/stories/elena_daily',
      ocrHashtags: '#AuraSummerGlow #BeautyTip',
      reward: '$0.65',
    },
    {
      id: 'SUB-19001',
      contributor: 'Alex Mercer',
      handle: '@alex_m',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      timestamp: '1 hour ago',
      matchScore: '68.5%',
      status: 'Rejected',
      proofUrl: 'https://instagram.com/stories/alex_m',
      ocrHashtags: 'No brand sticker detected',
      reward: '$0.65',
    },
  ]);

  const handleManualApprove = (subId: string) => {
    setSubmissions(
      submissions.map((s) => (s.id === subId ? { ...s, status: 'Approved' } : s))
    );
    setInspectedSubmission(null);
  };

  const handleManualReject = (subId: string) => {
    setSubmissions(
      submissions.map((s) => (s.id === subId ? { ...s, status: 'Rejected' } : s))
    );
    setInspectedSubmission(null);
  };

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. BREADCRUMB & TOP CONTROLS
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <Link
            to="/business/campaigns"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168BFF] hover:underline mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Campaigns</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-[#101828]">
              {campaign.title}
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                isLive
                  ? 'bg-emerald-50 text-[#16B364] border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {campaign.status}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-mono mt-0.5">
            Campaign ID: {campaign.id} &bull; Created {campaign.created} &bull; Channel: {campaign.platform}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => toggleCampaignStatus(campaign.id)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            {isLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLive ? 'Pause Campaign' : 'Resume'}</span>
          </button>

          <button
            type="button"
            onClick={() => alert(`Exporting campaign report for ${campaign.id}...`)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#07182F] hover:bg-[#0D2342] text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. CAMPAIGN METRICS TILES
         ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Completions</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-gray-900">{campaign.slotsTaken}</span>
            <span className="text-xs text-gray-400 font-mono">/ {campaign.slotsTotal} target ({Math.round((campaign.slotsTaken / (campaign.slotsTotal || 1)) * 100)}%)</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
            <div
              style={{ width: `${Math.min(100, Math.round((campaign.slotsTaken / (campaign.slotsTotal || 1)) * 100))}%` }}
              className="h-full bg-[#168BFF] rounded-full transition-all"
            />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Total Spend</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-gray-900">{campaign.spent}</span>
            <span className="text-xs text-gray-400 font-mono">of {campaign.totalBudget} cap</span>
          </div>
          <span className="text-[10px] text-[#16B364] font-bold block mt-1">Cost Per Action: {campaign.reward}</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">AI Verification Pass Rate</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">99.4%</span>
          <span className="text-[10px] text-gray-400 block mt-1">Multi-signal OCR verified</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Avg. Completion Time</span>
          <span className="text-2xl font-black text-[#168BFF] mt-1 block">2m 14s</span>
          <span className="text-[10px] text-gray-400 block mt-1">Fast mobile turnaround</span>
        </div>
      </div>

      {/* =========================================================================
          3. COMPLETION VELOCITY CHART
         ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 border border-[#E7ECF3] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-gray-900">Hourly Completion Velocity</h2>
            <p className="text-xs text-gray-500">Real-time submissions processed by AI computer vision scanner today</p>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            Peak: 110/hr
          </span>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyVelocity}>
              <XAxis dataKey="hour" stroke="#98A2B3" fontSize={11} tickLine={false} />
              <YAxis stroke="#98A2B3" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#07182F', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
              />
              <Bar dataKey="completions" fill="#168BFF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* =========================================================================
          4. SUBMISSIONS STREAM TABLE
         ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E7ECF3] shadow-xs overflow-hidden space-y-3">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-gray-900">Recent Contributor Submissions</h2>
            <p className="text-xs text-gray-500">Click any submission to inspect screenshot and OCR metadata</p>
          </div>
          <span className="text-xs font-mono font-bold text-gray-500">480 Total Submissions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Contributor</th>
                <th className="py-3.5 px-5">OCR Extracted Tags</th>
                <th className="py-3.5 px-5">AI Confidence</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Reward</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={sub.avatar}
                        alt={sub.contributor}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block">{sub.contributor}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{sub.handle} &bull; {sub.timestamp}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-5">
                    <span className="font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200 block text-[11px]">
                      {sub.ocrHashtags}
                    </span>
                  </td>

                  <td className="py-3.5 px-5 font-mono font-bold text-gray-900">
                    {sub.matchScore}
                  </td>

                  <td className="py-3.5 px-5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        sub.status === 'Approved'
                          ? 'bg-emerald-50 text-[#16B364] border-emerald-200'
                          : sub.status === 'Rejected'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-5 font-bold text-[#16B364]">
                    {sub.reward}
                  </td>

                  <td className="py-3.5 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => setInspectedSubmission(sub)}
                      className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-[#168BFF] hover:text-white text-gray-700 text-xs font-bold transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          INSPECTION MODAL
         ========================================================================= */}
      {inspectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900">Submission Proof Verification</h3>
                <p className="text-xs text-gray-500">{inspectedSubmission.id} &bull; {inspectedSubmission.contributor}</p>
              </div>
              <button
                type="button"
                onClick={() => setInspectedSubmission(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl bg-gray-100 p-4 border border-gray-200 text-center space-y-2">
              <div className="w-full h-48 bg-gray-900 rounded-xl flex items-center justify-center text-gray-400 text-xs font-mono relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-purple-600/20 flex flex-col items-center justify-center p-4 text-center">
                  <InstagramLogo className="w-8 h-8 mb-2" />
                  <span className="font-bold text-white text-sm">{inspectedSubmission.handle}</span>
                  <span className="text-xs text-gray-200 mt-1">{inspectedSubmission.ocrHashtags}</span>
                  <span className="text-[10px] text-emerald-400 mt-2 font-mono">&check; Timestamp: Within 24h &bull; Verified Handle Match</span>
                </div>
              </div>
              <span className="text-[10px] text-gray-500 block">Screenshot captured via native mobile client</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => handleManualReject(inspectedSubmission.id)}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-colors"
              >
                Reject Proof
              </button>
              <button
                type="button"
                onClick={() => handleManualApprove(inspectedSubmission.id)}
                className="px-5 py-2 rounded-xl bg-[#16B364] hover:bg-[#139452] text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-colors"
              >
                Approve &amp; Pay {inspectedSubmission.reward}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
