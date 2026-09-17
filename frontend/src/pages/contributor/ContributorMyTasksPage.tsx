import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Search,
  Filter,
  Eye,
  X,
  FileText,
  ShieldCheck,
  ChevronRight,
  Smartphone,
  HelpCircle,
} from 'lucide-react';

import { usePlatform } from '../../context/PlatformDataContext';

interface Submission {
  id: number;
  title: string;
  category: string;
  campaign: string;
  reward: string;
  status: 'approved' | 'under_review' | 'in_progress' | 'action_required' | 'rejected';
  submitted_at: string;
  aiConfidence?: string;
  screenshotUrl?: string;
  postUrl?: string;
  notes?: string;
  timeline: {
    started: string;
    submitted?: string;
    aiVerified?: string;
    approved?: string;
  };
}

export const ContributorMyTasksPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'under_review' | 'approved' | 'action_required' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProof, setSelectedProof] = useState<Submission | null>(null);
  const { submissions: platformSubmissions } = usePlatform();

  const submissions: Submission[] = platformSubmissions.map((ps) => {
    const isVideo = ps.taskTitle.toLowerCase().includes('tiktok') || ps.taskTitle.toLowerCase().includes('video');
    const isSurvey = ps.taskTitle.toLowerCase().includes('survey');
    const category = isVideo ? 'UGC Video' : isSurvey ? 'Survey' : 'Social Share';

    return {
      id: ps.id,
      title: ps.taskTitle,
      category,
      campaign: ps.campaignName,
      reward: ps.reward,
      status: ps.status,
      submitted_at: ps.submittedAt,
      aiConfidence: `${ps.ai?.confidence ?? 94}%`,
      screenshotUrl: ps.screenshotUrl,
      postUrl: ps.postUrl,
      notes: ps.note,
      timeline: {
        started: '20 mins ago',
        submitted: ps.submittedAt,
        aiVerified: `${ps.ai?.confidence ?? 94}% Match (Vision OCR)`,
        approved: ps.status === 'approved' ? 'Approved & Credited to Wallet' : undefined,
      },
    };
  });

  const filtered = submissions.filter((s) => {
    if (filter !== 'all' && s.status !== filter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.campaign.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const countByStatus = {
    all: submissions.length,
    in_progress: submissions.filter((s) => s.status === 'in_progress').length,
    under_review: submissions.filter((s) => s.status === 'under_review').length,
    approved: submissions.filter((s) => s.status === 'approved').length,
    action_required: submissions.filter((s) => s.status === 'action_required').length,
    rejected: submissions.filter((s) => s.status === 'rejected').length,
  };

  return (
    <div className="space-y-6 text-left font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#101828]">My Task Submissions</h2>
          <p className="text-xs text-[#667085] mt-0.5">
            Track your in-progress work, submitted proof verification statuses, and ledger reward credits.
          </p>
        </div>

        <Link
          to="/app/tasks"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#07182F] hover:bg-[#168BFF] text-white text-xs font-bold rounded-xl transition-all shadow-sm shrink-0"
        >
          <span>Find More Tasks</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E4EAF2] shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {[
              { key: 'all', label: 'All Submissions' },
              { key: 'in_progress', label: 'In Progress' },
              { key: 'under_review', label: 'Under Review' },
              { key: 'approved', label: 'Approved' },
              { key: 'action_required', label: 'Action Required' },
              { key: 'rejected', label: 'Rejected' },
            ].map((tab) => {
              const count = countByStatus[tab.key as keyof typeof countByStatus];
              const isActive = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#07182F] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title or campaign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#168BFF]"
            />
          </div>

        </div>
      </div>

      {/* Submissions List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E4EAF2] shadow-sm space-y-3">
          <CheckCircle2 className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-800">No tasks in this category</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            You don't have any tasks matching your selected filters. Explore available tasks in the marketplace to start earning!
          </p>
          <div className="pt-2">
            <Link
              to="/app/tasks"
              className="px-5 py-2.5 bg-[#07182F] text-white text-xs font-bold rounded-xl inline-block"
            >
              Browse Open Tasks
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const isApproved = item.status === 'approved';
            const isUnderReview = item.status === 'under_review';
            const isInProgress = item.status === 'in_progress';

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm hover:border-[#168BFF]/30 transition-all space-y-4"
              >
                {/* Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          isApproved
                            ? 'bg-emerald-50 text-[#16B364]'
                            : isUnderReview
                            ? 'bg-amber-50 text-amber-600'
                            : item.status === 'rejected'
                            ? 'bg-red-50 text-red-600'
                            : 'bg-blue-50 text-[#168BFF]'
                        }`}
                      >
                        {isApproved && <CheckCircle2 className="w-3 h-3" />}
                        {isUnderReview && <Clock className="w-3 h-3" />}
                        {isInProgress && <Clock className="w-3 h-3" />}
                        {item.status === 'rejected' && <AlertCircle className="w-3 h-3" />}
                        <span className="capitalize">{item.status.replace('_', ' ')}</span>
                      </span>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                        {item.category}
                      </span>

                      <span className="text-[10px] text-gray-400">&bull; {item.submitted_at}</span>
                    </div>

                    <h4 className="text-sm font-black text-gray-900">{item.title}</h4>
                    <span className="text-[11px] text-gray-500 block">Campaign: {item.campaign}</span>
                  </div>

                  <div className="text-right sm:shrink-0">
                    <span className="text-lg font-black text-[#16B364]">{item.reward}</span>
                    <span className="text-[10px] text-gray-400 block font-mono">ID: #{item.id}</span>
                  </div>
                </div>

                {/* Timeline Progress Bar */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                      <div className="w-2 h-2 rounded-full bg-[#168BFF]" />
                      <span>Started: {item.timeline.started}</span>
                    </div>

                    {item.timeline.submitted && (
                      <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>Submitted</span>
                      </div>
                    )}

                    {item.timeline.aiVerified && (
                      <div className="flex items-center gap-1.5 text-indigo-700 font-bold">
                        <ShieldCheck className="w-3 h-3 text-[#168BFF]" />
                        <span>AI: {item.aiConfidence}</span>
                      </div>
                    )}

                    {isApproved && item.timeline.approved && (
                      <div className="flex items-center gap-1.5 text-[#16B364] font-bold">
                        <CheckCircle2 className="w-3 h-3 text-[#16B364]" />
                        <span>Credited</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {item.screenshotUrl && (
                      <button
                        type="button"
                        onClick={() => setSelectedProof(item)}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-gray-400" />
                        <span>Inspect Proof</span>
                      </button>
                    )}

                    {item.postUrl && (
                      <a
                        href={item.postUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <span>Live URL</span>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </a>
                    )}
                  </div>

                  <div>
                    {isInProgress ? (
                      <Link
                        to={`/app/tasks/${item.id}/submit`}
                        className="px-4 py-1.5 rounded-lg bg-[#168BFF] hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <span>Submit Proof</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : isApproved ? (
                      <Link
                        to="/app/wallet"
                        className="text-xs text-[#16B364] font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Ledger Transaction Log &rarr;</span>
                      </Link>
                    ) : (
                      <span className="text-[11px] text-gray-400 italic">
                        Moderator confirmation in progress
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Proof Inspection Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedProof(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Proof Inspection #{selectedProof.id}
              </span>
              <h3 className="text-base font-black text-gray-900 mt-0.5">{selectedProof.title}</h3>
            </div>

            {selectedProof.screenshotUrl && (
              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center">
                <img
                  src={selectedProof.screenshotUrl}
                  alt="Proof submission"
                  className="w-full max-h-72 object-contain"
                />
              </div>
            )}

            {selectedProof.postUrl && (
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                <span className="text-gray-500 font-bold block mb-0.5">Submitted Live URL:</span>
                <a
                  href={selectedProof.postUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#168BFF] hover:underline font-mono break-all"
                >
                  {selectedProof.postUrl}
                </a>
              </div>
            )}

            {selectedProof.notes && (
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                <span className="text-gray-500 font-bold block mb-0.5">Submission Note:</span>
                <p className="text-gray-700 italic">"{selectedProof.notes}"</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
              <span className="text-gray-400">AI Confidence Score:</span>
              <span className="font-bold text-[#168BFF]">{selectedProof.aiConfidence || 'Pending'}</span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedProof(null)}
              className="w-full py-2.5 bg-[#07182F] text-white rounded-xl text-xs font-bold"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
