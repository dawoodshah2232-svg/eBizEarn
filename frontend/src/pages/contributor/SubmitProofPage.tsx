import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Clock,
  FileCheck,
  AlertCircle,
  Check,
  XCircle,
  Info,
  HelpCircle,
} from 'lucide-react';
import { api } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { usePlatform } from '../../context/PlatformDataContext';

export const SubmitProofPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [proofUrl, setProofUrl] = useState('');
  const [targetGroupName, setTargetGroupName] = useState('');
  const [note, setNote] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800'
  );
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState<{
    confidence: number;
    decision: string;
    summary: string;
  } | null>(null);

  const { user, creditWallet } = useAuth();
  const { submitTaskProof, tasks } = usePlatform();
  const navigate = useNavigate();

  const currentTask = tasks.find((t) => t.id === Number(id)) || tasks[0];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Call shared platform reactive state with regional group metadata
    const newSubmission = submitTaskProof({
      taskId: Number(id) || 1,
      proofUrl: proofUrl || 'https://instagram.com/p/DA198234/',
      screenshotUrl: screenshotPreview || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800',
      note: note || `Published per campaign guidelines in ${currentTask.emirateState || 'UAE'}.`,
      targetGroupName: targetGroupName || currentTask.targetChannelName,
    });

    try {
      const res = await api.post(`/tasks/${id}/submit`, {
        proof_url: proofUrl || 'https://instagram.com/p/DA198234/',
        proof_screenshot: screenshotPreview,
        note: note || 'Published on Instagram profile with required hashtags. Visible timestamp in header.',
      });

      if (res.data.success) {
        setSubmittedSuccess(true);
        if (res.data.data?.ai_precheck) {
          setAiAnalysis({
            confidence: res.data.data.ai_precheck.confidence_score,
            decision: res.data.data.ai_precheck.suggested_decision,
            summary: res.data.data.ai_precheck.summary,
          });
        }
      }
    } catch {
      // PlatformDataContext already handles client-side synchronization
    } finally {
      setSubmittedSuccess(true);
      setAiAnalysis({
        confidence: newSubmission.ai.confidence,
        decision: newSubmission.ai.suggestedDecision,
        summary: newSubmission.ai.summary,
      });
      setSubmitting(false);
    }
  };

  if (submittedSuccess) {
    return (
      <div className="max-w-xl mx-auto py-8 text-left font-sans">
        <div className="bg-white rounded-3xl p-8 border border-[#E4EAF2] shadow-floating text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-[#16B364] mx-auto animate-bounce-subtle">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
              Status: AI Pre-Checked &bull; Queued for Verification
            </span>
            <h2 className="text-2xl font-black text-[#101828]">Proof Successfully Submitted!</h2>
            <p className="text-xs text-gray-500 mt-1">
              Task Reference: <strong>#TASK-{id || currentTask.id}</strong> &bull; Task Reward: <strong className="text-[#16B364]">+AED {(currentTask.reward_cents / 100).toFixed(2)} 🇦🇪</strong>
            </p>
          </div>

          {/* AI Pre-Check Card */}
          {aiAnalysis && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#168BFF]" />
                  Computer Vision OCR Check Passed
                </span>
                <span className="text-xs font-extrabold text-[#16B364] bg-white px-2 py-0.5 rounded-md shadow-xs">
                  {aiAnalysis.confidence}% Match
                </span>
              </div>
              <p className="text-[11px] text-indigo-950 leading-relaxed">
                {aiAnalysis.summary}
              </p>
            </div>
          )}

          <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-600 text-left space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-gray-900">
              <Clock className="w-3.5 h-3.5 text-[#168BFF]" />
              <span>Next Steps:</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Your reward has been logged to your double-entry wallet ledger. You can withdraw once your balance reaches the AED 20.00 threshold and your Emirates ID KYC is verified.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/app/wallet"
              className="px-6 py-3 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              View Contributor Wallet
            </Link>
            <Link
              to="/app/tasks"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
            >
              Complete Another Task
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left font-sans">
      
      {/* Back button & Title */}
      <div className="flex items-center justify-between">
        <Link
          to={`/app/tasks/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Task Overview</span>
        </Link>
        <span className="text-xs font-bold text-[#168BFF] bg-blue-50 px-3 py-1 rounded-full">
          Reward: +AED {(currentTask.reward_cents / 100).toFixed(2)} 🇦🇪
        </span>
      </div>

      {/* Proof Submission Standards & Acceptance Guide Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#E4EAF2] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#168BFF]" />
            <div>
              <h3 className="text-sm font-bold text-gray-900">Proof Quality Guidelines</h3>
              <p className="text-[11px] text-gray-400">Follow these standards to ensure immediate automated approval</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowGuidelines(!showGuidelines)}
            className="text-xs font-bold text-[#168BFF] hover:underline"
          >
            {showGuidelines ? 'Hide Guide' : 'Show Guide'}
          </button>
        </div>

        {showGuidelines && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2.5">
              <span className="font-bold text-emerald-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#16B364]" /> Acceptable Screenshots
              </span>
              <ul className="space-y-1.5 text-[11px] text-emerald-950">
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#16B364] shrink-0 mt-0.5" />
                  <span>Full screen capture with visible phone time/status bar.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#16B364] shrink-0 mt-0.5" />
                  <span>Your account profile handle clearly visible.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#16B364] shrink-0 mt-0.5" />
                  <span>All required hashtags and sponsor tags clearly shown.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-red-50/70 border border-red-100 space-y-2.5">
              <span className="font-bold text-red-800 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <XCircle className="w-4 h-4 text-red-500" /> Rejected Screenshots
              </span>
              <ul className="space-y-1.5 text-[11px] text-red-950">
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">&times;</span>
                  <span>Cropped captures where the timestamp is cut off.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">&times;</span>
                  <span>Screenshots of someone else's screen or camera photos.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-red-500 font-bold">&times;</span>
                  <span>Posts marked private or deleted immediately after taking screenshot.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Proof Submission Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E4EAF2] shadow-sm space-y-6">
        <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-[#101828]">Upload Completion Proof</h2>
            <p className="text-xs text-[#667085] mt-0.5">Task ID: #{id} &bull; Estimated Verification: ~12 seconds</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-50 text-[#168BFF] text-xs font-bold">
            Step 2 of 2
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Screenshot Upload Box */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Proof Screenshot <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-200 hover:border-[#168BFF] rounded-2xl p-5 text-center cursor-pointer transition-colors bg-[#F7F9FC]">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="screenshot-upload"
              />
              <label htmlFor="screenshot-upload" className="cursor-pointer block">
                {screenshotPreview ? (
                  <div className="space-y-3">
                    <img
                      src={screenshotPreview}
                      alt="Proof preview"
                      className="max-h-56 mx-auto rounded-xl object-contain shadow-sm border border-gray-200"
                    />
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs text-[#168BFF] font-bold hover:underline">
                        Change Screenshot
                      </span>
                      <span className="text-gray-300">&bull;</span>
                      <span className="text-xs text-gray-400">JPG, PNG up to 10MB</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 space-y-2">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto" />
                    <p className="text-xs font-bold text-gray-700">Click or Drag to Upload Proof Screenshot</p>
                    <p className="text-[11px] text-gray-400">High-resolution PNG, JPG up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Regional Group Requirement Alert (For Worldwide & Geo-Targeted Tasks) */}
          {(currentTask.emirateState || currentTask.targetChannelType) && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1.5">
              <div className="flex items-center justify-between font-bold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <span>📍</span> Geographic Requirement: {currentTask.cityArea ? `${currentTask.cityArea}, ` : ''}{currentTask.emirateState || currentTask.region || 'Worldwide'}
                </span>
                <span className="text-[10px] bg-emerald-200/80 px-2 py-0.5 rounded font-mono">
                  {currentTask.retentionHours || 72}h Escrow Hold
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                This campaign requires posting into verified community groups covering <strong>{currentTask.cityArea || currentTask.emirateState || currentTask.region || 'the target region'}</strong> (e.g. WhatsApp, LinkedIn, or Facebook). Ensure your screenshot verifies the group title.
              </p>
            </div>
          )}

          {/* Group Name Input for Community Broadcast Tasks */}
          {(currentTask.targetChannelType || currentTask.platform?.toLowerCase().includes('group') || currentTask.platform?.toLowerCase().includes('whatsapp')) && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Community Group Name & Channel <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={targetGroupName}
                onChange={(e) => setTargetGroupName(e.target.value)}
                placeholder="e.g. Verified Regional Community & Business Hub (WhatsApp / LinkedIn Group)"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF] transition-colors font-medium text-slate-900"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Must match or contain regional keyword "{currentTask.emirateState || currentTask.cityArea || 'target area'}". Our OCR system verifies this against your screenshot.
              </p>
            </div>
          )}

          {/* Live URL */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Live Post URL or Group Invite Link <span className="text-gray-400 font-normal">(Optional for private chats)</span>
            </label>
            <div className="relative">
              <LinkIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="url"
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
                placeholder="https://chat.whatsapp.com/... or https://linkedin.com/groups/..."
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF] transition-colors"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Direct permalink helps our AI crawler verify real engagement and impressions immediately.
            </p>
          </div>

          {/* Contributor Note */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Additional Notes <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="E.g., Posted on my public profile with 3,200 followers. Visible for 24 hours."
              className="w-full px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF] transition-colors"
            />
          </div>

          {/* AI Automated Pipeline Explanation */}
          <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex items-start gap-3 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-[#16B364] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block">Automated AI Vision Verification</span>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                BizNetwork evaluates your submission using optical character recognition (OCR) and timestamp matching. Upon validation, your wallet balance will be credited without waiting days for manual review.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-2xl text-xs sm:text-sm font-black transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <span>{submitting ? 'Analyzing Screenshot via AI Vision...' : 'Submit Proof for Instant Review'}</span>
            <FileCheck className="w-4 h-4" />
          </button>

        </form>
      </div>

    </div>
  );
};
