import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Heart,
  MessageCircle,
  Share2,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  Download,
  Lock,
  XCircle,
  Info,
} from 'lucide-react';
import {
  InstagramLogo,
  TikTokLogo,
  YouTubeLogo,
  GoogleLogo,
  FacebookLogo,
  WhatsAppLogo,
  TrustpilotLogo,
  GoogleReviewLogo,
} from '../../components/common/PlatformIcons';
import type { Task } from '../../types';
import { api } from '../../api/client';
import { usePlatform } from '../../context/PlatformDataContext';
import { LivePostMockup } from '../../components/common/LivePostMockup';

export const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks: platformTasks } = usePlatform();
  const [task, setTask] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const matchedPlatformTask = platformTasks.find((t) => t.id === Number(id));

  const sampleCaption =
    task?.platform?.toLowerCase().includes('trustpilot') || task?.platform?.toLowerCase().includes('google')
      ? "Exceptional service, highly attentive staff, and rapid delivery in Dubai! Highly recommended for anyone seeking premium quality and genuine hospitality in the UAE."
      : "Better choices, Brighter days. Discover our nourishing organic botanical face oil for radiant daily wellness. #lifestyle #goodvibes #healthy #skincare #UAE";

  useEffect(() => {
    if (matchedPlatformTask) {
      setTask({
        id: matchedPlatformTask.id,
        uuid: `task-${matchedPlatformTask.id}`,
        campaign_id: 1,
        category_id: 1,
        title: matchedPlatformTask.title,
        platform: matchedPlatformTask.platform,
        description: matchedPlatformTask.description,
        reward_cents: matchedPlatformTask.reward_cents,
        estimated_minutes: matchedPlatformTask.estimated_minutes,
        difficulty: matchedPlatformTask.difficulty,
        status: 'available',
        slots_total: matchedPlatformTask.slots_total,
        slots_taken: matchedPlatformTask.slots_taken,
        category: { id: 1, slug: 'social', name: matchedPlatformTask.platform, icon: matchedPlatformTask.platform, is_active: true, sort_order: 1 },
        flyerUrl: matchedPlatformTask.flyerUrl || '/assets/demo/task-creative.jpg',
        postCopy: matchedPlatformTask.postCopy || matchedPlatformTask.description,
        hashtags: matchedPlatformTask.hashtags || '#VerifiedBrandSponsor #Global #Community',
        targetUrl: matchedPlatformTask.targetUrl || 'https://ebiznetwork.com',
        targetGroupRequirement: matchedPlatformTask.targetGroupRequirement || 'Global & Regional Community Network 🌐',
        country: matchedPlatformTask.country || 'Global 🌐',
        emirateState: matchedPlatformTask.emirateState || 'Worldwide',
        cityArea: matchedPlatformTask.cityArea || 'All Regions',
        brandName: matchedPlatformTask.categoryName || 'Ebiz Sponsor Client',
      });
      setLoading(false);
      return;
    }

    api.get(`/tasks/${id}`).then((res) => {
      if (res.data.success) {
        setTask(res.data.data);
      }
    }).catch(() => {
      // Fallback matching reference
      setTask({
        id: Number(id) || 1,
        uuid: 'task-insta-01',
        campaign_id: 1,
        category_id: 1,
        title: 'Instagram Post — Brand Awareness',
        platform: 'Instagram',
        reward_cents: 250,
        estimated_minutes: 5,
        difficulty: 'easy',
        status: 'available',
        slots_total: 500,
        slots_taken: 180,
        category: { id: 1, slug: 'social', name: 'Social Media', icon: 'Instagram', is_active: true, sort_order: 1 },
        flyerUrl: '/assets/demo/task-creative.jpg',
        postCopy: 'Better choices, Brighter days. Discover our nourishing organic botanical face oil for radiant daily wellness. #lifestyle #goodvibes #healthy #skincare #global',
        hashtags: '#lifestyle #goodvibes #healthy #skincare #global',
        targetUrl: 'https://ebiznetwork.com',
        targetGroupRequirement: 'Global Creator & Business Network 🌐',
        country: 'Global 🌐',
        emirateState: 'Worldwide',
        cityArea: 'All Regions',
        brandName: 'Apex Botanical Labs',
      });
    }).finally(() => setLoading(false));
  }, [id, matchedPlatformTask]);

  const handleStartTask = async () => {
    try {
      await api.post(`/tasks/${id}/start`);
    } catch {
      // proceed in demo
    }
    navigate(`/app/tasks/${id}/submit`);
  };

  if (!task) {
    return (
      <div className="p-12 text-center text-gray-500 font-medium">
        Loading task guidelines...
      </div>
    );
  }

  const rewardFormatted = (task.reward_cents / 100).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-left font-sans">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/app/tasks"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
        <span className="text-[11px] font-mono text-gray-400">Task Reference: #TASK-{task.id}</span>
      </div>

      {/* Main Task Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7ECF3] shadow-xs">
        
        {/* Title row */}
        {(() => {
          const p = (task.platform || '').toLowerCase();
          const TaskIcon = p.includes('trustpilot')
            ? TrustpilotLogo
            : p.includes('google')
            ? GoogleReviewLogo
            : p.includes('tiktok')
            ? TikTokLogo
            : p.includes('youtube')
            ? YouTubeLogo
            : p.includes('facebook')
            ? FacebookLogo
            : InstagramLogo;

          return (
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white flex items-center justify-center shrink-0 shadow-sm p-2">
                  <TaskIcon className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-black text-[#101828]">
                      {task.title}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#168BFF] text-[10px] font-bold uppercase">
                      {task.platform || task.category?.name || 'Social Media'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                      🇦🇪 UAE Verified
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16B364] text-[10px] font-bold uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16B364] animate-pulse" />
                      {task.slots_total - task.slots_taken} Slots Available
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#475467] leading-relaxed">
                    {task.description || 'Follow all official instructions carefully, maintain genuine constructive engagement, and upload screenshot proof for automated AI verification.'}
                  </p>
                </div>
              </div>

              {/* Quick Escrow Guarantee Pill */}
              <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-3 sm:text-right shrink-0">
                <span className="text-[10px] font-bold uppercase text-emerald-800 flex items-center sm:justify-end gap-1">
                  <Lock className="w-3 h-3 text-[#16B364]" /> Escrow Secured
                </span>
                <span className="text-lg font-black text-[#16B364] block mt-0.5">+AED {rewardFormatted}</span>
                <span className="text-[10px] text-gray-500 block">Funds pre-locked by UAE sponsor</span>
              </div>
            </div>
          );
        })()}

        {/* 4 Detail Specification Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-gray-100">
            <span className="text-[10px] text-gray-400 font-semibold uppercase block">Payout Reward</span>
            <span className="text-lg font-black text-[#16B364] mt-0.5 block">+AED {rewardFormatted}</span>
            <span className="text-[10px] text-gray-400">Zero platform deduction</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-gray-100">
            <span className="text-[10px] text-gray-400 font-semibold uppercase block">Time to Complete</span>
            <span className="text-sm font-bold text-gray-900 mt-0.5 block flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {task.estimated_minutes} minutes
            </span>
            <span className="text-[10px] text-gray-400">Fast mobile submission</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-gray-100">
            <span className="text-[10px] text-gray-400 font-semibold uppercase block">Difficulty & Tier</span>
            <span className="text-sm font-bold text-gray-900 mt-0.5 block capitalize">
              {task.difficulty} (All Tiers)
            </span>
            <span className="text-[10px] text-gray-400">Open to new contributors</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-gray-100">
            <span className="text-[10px] text-gray-400 font-semibold uppercase block">Account Requirement</span>
            <span className="text-sm font-bold text-gray-900 mt-0.5 block truncate">
              Public Instagram Profile
            </span>
            <span className="text-[10px] text-gray-400">Active &gt; 30 days</span>
          </div>
        </div>

      </div>

      {/* Two Column Section: Creative Preview & Task Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 6 Cols: Creative Preview Card with 1-Click Copy & Download */}
        {/* Left 6 Cols: Real-Time Live Post Mockup & Direct Deep Link Action */}
        <div className="lg:col-span-6 space-y-4">
          <LivePostMockup
            platform={task.platform || 'Instagram'}
            brandName={task.brandName || 'Verified Sponsor'}
            title={task.title}
            postCopy={task.postCopy || task.description || sampleCaption}
            hashtags={task.hashtags || '#lifestyle #goodvibes #healthy #skincare'}
            flyerUrl={task.flyerUrl || '/assets/demo/task-creative.jpg'}
            targetUrl={task.targetUrl || 'https://ebiznetwork.com'}
            country={task.country || 'Global 🌐'}
            emirateState={task.emirateState || 'Worldwide'}
            cityArea={task.cityArea || 'All Regions'}
            targetGroupName={task.targetGroupRequirement || `${task.emirateState || 'Worldwide'} Community & Business Network 🌐`}
            isContributorView={true}
          />
        </div>

        {/* Right 6 Cols: Task Steps & Do's and Don'ts Checklist */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Step Sequence Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E7ECF3] shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Execution Steps</h3>
                <p className="text-[11px] text-gray-400">Complete in order for automatic verification</p>
              </div>
              <span className="text-xs font-semibold text-[#18B76A] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Fast AI Verification
              </span>
            </div>

            <div className="space-y-3.5">
              
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#F8FAFC] border border-gray-100">
                <div className="w-7 h-7 rounded-full bg-[#168BFF] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Download &amp; Save Creative</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Save the official sponsor image to your mobile device or desktop.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#F8FAFC] border border-gray-100">
                <div className="w-7 h-7 rounded-full bg-[#168BFF] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Post on Instagram</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Paste the copied caption with all 4 hashtags and publish as a public post.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#F8FAFC] border border-gray-100">
                <div className="w-7 h-7 rounded-full bg-[#168BFF] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Take Screenshot with Timestamp</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Capture your published post ensuring device clock and your username are visible.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#F8FAFC] border border-gray-100">
                <div className="w-7 h-7 rounded-full bg-[#18B76A] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Submit Proof &amp; Instant Cashout</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Upload your proof screenshot. AI verifies in ~12 seconds and credits +${rewardFormatted} directly to your wallet.
                  </p>
                </div>
              </div>

            </div>

            {/* Large Start Task CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartTask}
                className="w-full py-4 bg-[#168BFF] hover:bg-[#2F80FF] text-white rounded-2xl font-black text-sm transition-all shadow-lg shadow-[#168BFF]/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>Proceed to Submit Proof</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Do's and Don'ts Checklist Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E7ECF3] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#168BFF]" />
              <span>Acceptance Rules: Do's &amp; Don'ts</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <span className="font-bold text-emerald-800 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16B364]" /> Do Follow
                </span>
                <ul className="space-y-1.5 text-[11px] text-emerald-950">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#16B364] font-bold">&bull;</span>
                    <span>Keep post visible for at least 24 hours.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#16B364] font-bold">&bull;</span>
                    <span>Include all 4 hashtags exactly as provided.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#16B364] font-bold">&bull;</span>
                    <span>Capture full screenshot showing device time.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-red-50/60 border border-red-100 space-y-2">
                <span className="font-bold text-red-800 flex items-center gap-1 text-[11px] uppercase tracking-wider">
                  <XCircle className="w-3.5 h-3.5 text-red-500" /> Don't Do
                </span>
                <ul className="space-y-1.5 text-[11px] text-red-950">
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-500 font-bold">&bull;</span>
                    <span>Do not delete or archive post within 48h.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-500 font-bold">&bull;</span>
                    <span>Do not crop out the header or timestamp.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-500 font-bold">&bull;</span>
                    <span>Do not submit duplicate or recycled images.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
