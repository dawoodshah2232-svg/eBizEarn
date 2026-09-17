import React, { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  MapPin,
  ShieldCheck,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Star,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  Sparkles,
  Globe,
  Radio,
} from 'lucide-react';
import {
  WhatsAppLogo,
  TrustpilotLogo,
  GoogleReviewLogo,
  InstagramLogo,
  FacebookLogo,
} from './PlatformIcons';

export interface LivePostMockupProps {
  platform: string;
  brandName: string;
  title: string;
  postCopy: string;
  hashtags?: string;
  flyerUrl?: string;
  targetUrl?: string;
  country?: string;
  emirateState?: string;
  cityArea?: string;
  targetGroupName?: string;
  isContributorView?: boolean;
}

export const LivePostMockup: React.FC<LivePostMockupProps> = ({
  platform = 'WhatsApp / LinkedIn',
  brandName = 'Apex Global Innovations',
  title = 'Exclusive Global Launch: Next-Gen Creative Solutions',
  postCopy = 'Exciting news! Discover next-generation digital lifestyle and enterprise solutions designed for creators and businesses worldwide. Verified quality, seamless performance, and trusted by global leaders.',
  hashtags = '#GlobalInnovation #Tech #Verified #BrandSponsor #Worldwide',
  flyerUrl = '/assets/demo/task-creative.jpg',
  targetUrl = 'https://ebiznetwork.com/launch',
  country = 'Global 🌐',
  emirateState = 'Worldwide',
  cityArea = 'All Regions',
  targetGroupName = 'Global Creator & Business Network 🌐 [15k members]',
  isContributorView = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  // Dynamic country flag & formatted location label
  const isGlobal = !country || country.toLowerCase().includes('global') || country.toLowerCase().includes('world');
  const countryFlag = isGlobal
    ? '🌐'
    : country.includes('AE') || country.includes('UAE')
    ? '🇦🇪'
    : country.includes('US')
    ? '🇺🇸'
    : country.includes('UK') || country.includes('GB')
    ? '🇬🇧'
    : country.includes('SA')
    ? '🇸🇦'
    : country.includes('DE')
    ? '🇩🇪'
    : country.includes('CA')
    ? '🇨🇦'
    : country.includes('SG')
    ? '🇸🇬'
    : country.includes('AU')
    ? '🇦🇺'
    : country.includes('IN')
    ? '🇮🇳'
    : '🌐';

  const locationDisplay = isGlobal
    ? 'Worldwide 🌐'
    : `${cityArea ? cityArea + ', ' : ''}${emirateState ? emirateState + ', ' : ''}${country}`;

  // Normalize platform channel
  const p = platform.toLowerCase();
  const isWhatsApp = p.includes('whatsapp') || p.includes('community') || p.includes('broadcast');
  const isTrustpilot = p.includes('trustpilot');
  const isGoogle = p.includes('google');
  const isLinkedIn = p.includes('linkedin');
  const isInstagram = p.includes('instagram') || p.includes('social');
  const isFacebook = p.includes('facebook');

  const fullTextToCopy = `${title}\n\n${postCopy}\n\n${targetUrl ? `🔗 ${targetUrl}` : ''}\n\n${hashtags}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullTextToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleOpenTarget = () => {
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col font-sans">
      {/* 1. Header Bar with Real-Time Mockup Tag & Location Badge */}
      <div className="bg-slate-900 text-white px-3.5 py-2.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold tracking-wide uppercase text-slate-200">
            Real-Time Live Post Mockup
          </span>
          <span className="text-[10px] bg-slate-800 text-cyan-300 px-2 py-0.5 rounded-full font-mono font-semibold">
            {isWhatsApp ? 'WhatsApp Group' : isTrustpilot ? 'Trustpilot' : isGoogle ? 'Google Maps' : isLinkedIn ? 'LinkedIn' : 'Social Post'}
          </span>
        </div>

        {/* Location Geofence Pill */}
        <div className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-medium border border-emerald-400/30">
          <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="truncate max-w-[170px]">
            {locationDisplay}
          </span>
        </div>
      </div>

      {/* 2. Platform Specific Visual Mockup Body */}
      <div className="p-3 sm:p-4 bg-slate-100/70">

        {/* =========================================================================
            MOCKUP VARIANT A: WHATSAPP COMMUNITY GROUP
           ========================================================================= */}
        {isWhatsApp && (
          <div className="max-w-md mx-auto rounded-xl overflow-hidden shadow-md border border-slate-300 bg-[#EFEAE2]">
            {/* WhatsApp Group Header Bar */}
            <div className="bg-[#005E54] text-white px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center font-black text-white text-xs shrink-0 border border-white/30">
                  {countryFlag}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    {targetGroupName || `${cityArea ? cityArea + ' ' : ''}${emirateState || country} Community & Business Network`}
                  </p>
                  <p className="text-[9.5px] text-emerald-100/80 truncate">
                    Sarah, Alex, Michael, Tariq, +1 415..., +44 20..., +971 50...
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-white/90">
                <Video className="w-4 h-4 opacity-80" />
                <Phone className="w-3.5 h-3.5 opacity-80" />
                <MoreVertical className="w-4 h-4 opacity-80" />
              </div>
            </div>

            {/* Chat Messages Stream */}
            <div className="p-3 space-y-2 text-xs">
              {/* Geofence notice pill inside chat */}
              <div className="text-center my-1">
                <span className="bg-[#E1F3FB] text-[#025178] px-2.5 py-1 rounded-lg text-[10px] font-semibold inline-flex items-center gap-1 shadow-2xs">
                  <ShieldCheck className="w-3 h-3 text-[#025178]" />
                  Verified In-Zone Group &bull; {locationDisplay} Members
                </span>
              </div>

              {/* Contributor Message Bubble */}
              <div className="bg-white rounded-xl rounded-tl-none p-2.5 shadow-sm border border-slate-200/80 max-w-[94%] space-y-1.5 text-slate-800">
                {/* Sender name */}
                <div className="flex items-center justify-between text-[11px] font-bold text-[#075E54] pb-0.5 border-b border-slate-100">
                  <span>Verified Contributor</span>
                  <span className="text-[9px] font-mono font-semibold bg-emerald-50 text-emerald-700 px-1 rounded">
                    {countryFlag} {country || 'Global'}
                  </span>
                </div>

                {/* Attached Creative Flyer */}
                {flyerUrl && (
                  <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50 relative group">
                    <img
                      src={flyerUrl}
                      alt="Campaign Creative Preview"
                      className="w-full h-44 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/demo/task-creative.jpg';
                      }}
                    />
                    <div className="absolute top-1.5 right-1.5 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                      Official Flyer
                    </div>
                  </div>
                )}

                {/* Post Headline & Body Copy */}
                <div>
                  <h4 className="font-bold text-xs text-slate-900 leading-snug">{title}</h4>
                  <p className="text-[11.5px] text-slate-700 mt-1 leading-relaxed whitespace-pre-line">
                    {postCopy}
                  </p>
                </div>

                {/* Clickable Link Preview Card */}
                {targetUrl && (
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block bg-slate-50 hover:bg-slate-100 rounded-lg p-2 border border-slate-200 transition-colors text-left"
                  >
                    <div className="flex items-center gap-1 text-[10.5px] font-bold text-[#0066CC] truncate">
                      <Globe className="w-3 h-3 text-[#0066CC] shrink-0" />
                      <span className="truncate">{targetUrl}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">
                      {brandName} &bull; Official Portal
                    </p>
                  </a>
                )}

                {/* Hashtags */}
                {hashtags && (
                  <div className="text-[10.5px] font-semibold text-[#0066CC] leading-tight">
                    {hashtags}
                  </div>
                )}

                {/* Timestamp & Double Blue Ticks */}
                <div className="flex items-center justify-end gap-1 text-[9.5px] text-slate-400 pt-0.5">
                  <span>11:42 AM</span>
                  <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MOCKUP VARIANT B: TRUSTPILOT REVIEW CARD
           ========================================================================= */}
        {isTrustpilot && (
          <div className="max-w-md mx-auto bg-white rounded-xl p-4 shadow-md border border-slate-200 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrustpilotLogo className="w-5 h-5" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{brandName}</h4>
                  <p className="text-[10px] text-slate-500">Reviews &bull; TrustScore 4.9 out of 5</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Verified Business
              </span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-[#00B67A] text-white flex items-center justify-center rounded text-xs font-black shadow-2xs">
                  ★
                </div>
              ))}
              <span className="ml-2 text-xs font-bold text-slate-800">5.0 / 5.0</span>
            </div>

            <div>
              <h5 className="font-bold text-xs text-slate-900">{title}</h5>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed whitespace-pre-line">{postCopy}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <div className="flex items-center gap-1 text-slate-600 font-medium">
                <span>Verified Reviewer {countryFlag}</span>
                <span>&bull;</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> Verified Customer Experience
                </span>
              </div>
              <span>Date of experience: Today</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            MOCKUP VARIANT C: GOOGLE MAPS / GOOGLE REVIEWS
           ========================================================================= */}
        {isGoogle && (
          <div className="max-w-md mx-auto bg-white rounded-xl p-4 shadow-md border border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                VG
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-900">Verified Local Contributor</p>
                  <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-semibold">
                    Local Guide &bull; Level 6
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">420 reviews &bull; 1.2M photo views &bull; {country || 'Global'}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-amber-400 text-sm">
              {'★★★★★'}
              <span className="text-slate-500 text-[10px] font-mono ml-1.5">Just now</span>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-800">{title}</p>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed whitespace-pre-line">{postCopy}</p>
            </div>

            {flyerUrl && (
              <div className="rounded-lg overflow-hidden h-36 w-full bg-slate-100 border border-slate-200">
                <img
                  src={flyerUrl}
                  alt="Review Evidence"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/demo/task-creative.jpg';
                  }}
                />
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-between">
              <span className="truncate max-w-[200px]">{brandName} &bull; {locationDisplay}</span>
              <span className="text-blue-600 font-semibold">Google Maps Review {countryFlag}</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            MOCKUP VARIANT D: LINKEDIN GROUP POST
           ========================================================================= */}
        {isLinkedIn && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <div className="p-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center font-bold text-xs">
                  in
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 truncate">
                    Verified Professional Creator {countryFlag}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    Posted in: {targetGroupName || `${cityArea ? cityArea + ' ' : ''}${emirateState || country} Business Network`}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900">{title}</h4>
              <p className="text-slate-700 whitespace-pre-line leading-relaxed">{postCopy}</p>
              {hashtags && <p className="text-[#0A66C2] font-semibold">{hashtags}</p>}
            </div>

            {flyerUrl && (
              <div className="w-full h-44 bg-slate-100 overflow-hidden border-t border-b border-slate-100">
                <img
                  src={flyerUrl}
                  alt="Post Flyer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/demo/task-creative.jpg';
                  }}
                />
              </div>
            )}

            <div className="p-2.5 bg-slate-50 text-slate-500 text-[10px] flex items-center justify-between border-t border-slate-100">
              <span>184 reactions &bull; 24 comments</span>
              <span className="font-semibold text-slate-700">LinkedIn Group &bull; {locationDisplay}</span>
            </div>
          </div>
        )}

        {/* =========================================================================
            MOCKUP VARIANT E: INSTAGRAM / SOCIAL MEDIA FEED
           ========================================================================= */}
        {isInstagram && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-3 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] font-bold text-slate-900">
                    EB
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {brandName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'ebiz.brand'}
                  </p>
                  <p className="text-[9.5px] text-slate-400 leading-tight">
                    {locationDisplay}
                  </p>
                </div>
              </div>
              <span className="text-slate-400 text-xs">&bull;&bull;&bull;</span>
            </div>

            {/* Flyer Media */}
            <div className="w-full h-52 bg-slate-100 overflow-hidden relative">
              <img
                src={flyerUrl}
                alt="Creative"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/demo/task-creative.jpg';
                }}
              />
            </div>

            {/* Actions & Caption */}
            <div className="p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setLiked(!liked)} className="text-slate-700">
                    <Heart className={`w-4 h-4 ${liked ? 'text-red-500 fill-red-500' : ''}`} />
                  </button>
                  <MessageCircle className="w-4 h-4 text-slate-700" />
                  <Share2 className="w-4 h-4 text-slate-700" />
                </div>
                <Bookmark className="w-4 h-4 text-slate-700" />
              </div>

              <p className="text-[11px] font-bold text-slate-900">1,420 likes</p>

              <div>
                <span className="font-bold text-slate-900 mr-1.5">
                  {brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}
                </span>
                <span className="text-slate-700">{title} &mdash; {postCopy}</span>
                {hashtags && <p className="text-[#0066CC] font-semibold mt-1">{hashtags}</p>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Interactive Action Toolbar: Launch in App & One-Click Copy */}
      <div className="p-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {/* Direct Launch Website / Open in App Button */}
          <button
            type="button"
            onClick={handleOpenTarget}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#07182F] hover:bg-[#168BFF] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Open destination website or native mobile app"
          >
            <span>Launch Website / App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* 1-Click Copy Post Text */}
          <button
            type="button"
            onClick={handleCopy}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              copied
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied Template!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Message Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Real-time sync indicator */}
        <div className="flex items-center justify-end gap-1.5 text-[10px] text-slate-400 font-mono">
          <Sparkles className="w-3 h-3 text-cyan-500" />
          <span>Updates live on form edit</span>
        </div>
      </div>
    </div>
  );
};
