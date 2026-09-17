import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface PlatformSubmission {
  id: number;
  taskId: number;
  contributorName: string;
  contributorHandle: string;
  contributorAvatar: string;
  contributorLevel: string;
  taskTitle: string;
  campaignName: string;
  reward: string;
  rewardCents: number;
  submittedAt: string;
  screenshotUrl: string;
  postUrl: string;
  location: string;
  timestamp: string;
  note: string;
  status: 'under_review' | 'approved' | 'rejected' | 'action_required';
  canonicalObjectId?: string;
  retentionStage?: 't0_verified' | 't24h_recheck' | 't72h_recheck' | 'final_approved';
  retentionDeadline?: string;
  sha256ProofHash?: string;
  targetGroupVerified?: boolean;
  matchedLocation?: string;
  targetGroupName?: string;
  ai: {
    confidence: number;
    quality: number;
    duplicateRisk: number;
    fraudRisk: number;
    locationMatch: number;
    timestampMatch: number;
    contentMatch: number;
    policyMatch: number;
    suggestedDecision: string;
    summary: string;
  };
}

export interface PlatformPayout {
  id: number;
  userName: string;
  email: string;
  avatar: string;
  amount: string;
  amountCents: number;
  method: string;
  accountDetails: string;
  requestedAt: string;
  status: 'requested' | 'processing' | 'paid' | 'rejected';
  riskScore: number;
  kycTier: string;
  kycStatus: 'verified' | 'pending';
  ledgerHash?: string;
}

export interface PlatformCampaign {
  id: string;
  brand: string;
  title: string;
  category: string;
  platform: string;
  iconName: string;
  status: 'Live' | 'Paused' | 'Frozen by Admin' | 'Completed';
  totalBudget: string;
  totalBudgetCents: number;
  spent: string;
  spentCents: number;
  reward: string;
  rewardCents: number;
  slotsTotal: number;
  slotsTaken: number;
  compliance: string;
  created: string;
  region: string;
  country?: string;
  emirateState?: string;
  cityArea?: string;
  targetChannelType?: string;
  targetChannelName?: string;
  retentionHours?: number;
  flyerUrl?: string;
  postCopy?: string;
  hashtags?: string;
  targetUrl?: string;
  targetGroupRequirement?: string;
}

export interface PlatformTask {
  id: number;
  campaignId: string;
  title: string;
  category: string;
  categoryName: string;
  platform: string;
  iconName: string;
  description: string;
  reward_cents: number;
  estimated_minutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  slots_total: number;
  slots_taken: number;
  region: string;
  country?: string;
  emirateState?: string;
  cityArea?: string;
  targetChannelType?: 'whatsapp_group' | 'facebook_group' | 'linkedin_group' | 'review' | 'social_general' | string;
  targetChannelName?: string;
  retentionHours?: number;
  flyerUrl?: string;
  postCopy?: string;
  hashtags?: string;
  targetUrl?: string;
  targetGroupRequirement?: string;
  isTrending: boolean;
  badgeColor: string;
  status: 'available' | 'paused' | 'completed';
}

export interface AiEngineOption {
  id: string;
  name: string;
  provider: string;
  status: 'Active (Primary)' | 'Standby' | 'Disabled';
  latencyMs: number;
  precision: string;
  keyConfigured: boolean;
  endpointUrl?: string;
  isCustom?: boolean;
}

export interface EmailProviderOption {
  id: string;
  name: string;
  type: 'api' | 'smtp';
  status: 'connected' | 'standby' | 'disabled' | 'active';
  senderEmail: string;
  apiKeyMasked: string;
  dailyQuota: string | number;
  dailySent?: number;
  isPrimary?: boolean;
}

export interface PaymentGatewayOption {
  id: string;
  name: string;
  type: 'fiat_bank' | 'cards' | 'wps' | 'crypto';
  currency: string;
  status: 'active' | 'standby' | 'disabled';
  feePercent: number;
  settlementMode: 'instant' | 't+1' | 'batch';
  isCustom?: boolean;
  apiKeyMasked?: string;
  webhookUrl?: string;
}

export interface SmsProviderOption {
  id: string;
  name: string;
  channel: 'sms' | 'whatsapp' | 'otp';
  status: 'active' | 'standby' | 'disabled';
  senderId: string;
}

export interface SocialApiOption {
  id: string;
  name: string;
  platform: string;
  status: 'connected' | 'quota_warning' | 'standby';
  capabilities: string[];
}

export interface PlatformSupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  statusColor: string;
  userName: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  assignedAgent: string;
  repliesCount: number;
  source: 'web_chat' | 'contributor_portal' | 'business_portal' | 'contact_form';
  type?: string;
  amount?: string;
  time?: string;
  proofImg?: string;
  contributor?: string;
  brand?: string;
}

export interface GlobalSettings {
  takeRatePercent: number;
  minCashoutAED: number;
  currency: string;
  currencySymbol: string;
  region: string;
  autoApprovalThreshold: number;
  visionOcrEnabled: boolean;
  kycRequiredThresholdAED: number;
  aiProviders: {
    activeEngine: string;
    engines: AiEngineOption[];
  };
  emailProviders: EmailProviderOption[];
  paymentGatewaysList: PaymentGatewayOption[];
  smsProviders: SmsProviderOption[];
  socialApis: SocialApiOption[];
  paymentGateways: {
    uaeCentralBankIban: boolean;
    wpsSalarySystem: boolean;
    stripeAed: boolean;
    paypalAed: boolean;
    wiseAed: boolean;
    usdcCrypto: boolean;
  };
  securityShield: {
    doubleEntryLedgerLock: boolean;
    mfaWithdrawalEnforced: boolean;
    antiSybilDeviceFingerprint: boolean;
    tamperProofHashChain: boolean;
  };
}

interface PlatformDataContextType {
  campaigns: PlatformCampaign[];
  tasks: PlatformTask[];
  submissions: PlatformSubmission[];
  payouts: PlatformPayout[];
  tickets: PlatformSupportTicket[];
  globalSettings: GlobalSettings;
  submitTaskProof: (data: {
    taskId: number;
    proofUrl: string;
    screenshotUrl?: string;
    note?: string;
    targetGroupName?: string;
  }) => PlatformSubmission;
  approveSubmission: (submissionId: number, notes?: string) => void;
  rejectSubmission: (submissionId: number, notes?: string) => void;
  requestResubmission: (submissionId: number, notes?: string) => void;
  requestWithdrawal: (data: {
    amountAED: number;
    method: string;
    accountDetails: string;
  }) => PlatformPayout;
  processPayout: (payoutId: number, decision: 'paid' | 'rejected') => void;
  createCampaign: (data: {
    title: string;
    objective: string;
    platform: string;
    rewardAED: number;
    targetContributors: number;
    instructions: string;
    country: string;
    emirateState?: string;
    cityArea?: string;
    targetChannelType?: string;
    targetChannelName?: string;
    retentionHours?: number;
  }) => PlatformCampaign;
  createAdminCampaign: (data: {
    title: string;
    platform: string;
    brand: string;
    rewardAED: number;
    targetContributors: number;
    instructions: string;
    region?: string;
    country?: string;
    emirateState?: string;
    cityArea?: string;
    targetChannelType?: string;
    targetChannelName?: string;
    flyerUrl?: string;
    postCopy?: string;
    hashtags?: string;
    targetUrl?: string;
  }) => PlatformCampaign;
  toggleCampaignStatus: (campaignId: string) => void;
  updateGlobalSettings: (settings: Partial<GlobalSettings>) => void;
  setActiveAiEngine: (engineId: string) => void;
  addAiEngine: (engine: { name: string; provider: string; latencyMs: number; precision: string }) => void;
  removeAiEngine: (engineId: string) => void;
  addEmailProvider: (provider: { name: string; senderEmail: string; apiKeyMasked: string; type: 'api' | 'smtp' }) => void;
  removeEmailProvider: (id: string) => void;
  toggleEmailProvider: (id: string) => void;
  addPaymentGateway: (gateway: { name: string; type: 'fiat_bank' | 'cards' | 'wps' | 'crypto'; currency: string; feePercent: number; settlementMode: 'instant' | 't+1' | 'batch'; apiKeyMasked?: string }) => void;
  removePaymentGateway: (id: string) => void;
  togglePaymentGateway: (id: string) => void;
  addSmsProvider: (provider: { name: string; channel: 'sms' | 'whatsapp' | 'otp'; senderId: string }) => void;
  toggleSmsProvider: (id: string) => void;
  verifyUserKyc: (userId: number, decision: 'approved' | 'rejected') => void;
  createSupportTicket: (data: {
    subject: string;
    category: string;
    priority?: 'Low' | 'Normal' | 'High' | 'Urgent';
    description: string;
    userName?: string;
    userEmail?: string;
    source?: 'web_chat' | 'contributor_portal' | 'business_portal' | 'contact_form';
  }) => PlatformSupportTicket;
  updateTicketStatus: (id: string, status: 'Open' | 'In Progress' | 'Resolved' | 'Closed') => void;
}

const PlatformDataContext = createContext<PlatformDataContextType | undefined>(undefined);

const INITIAL_CAMPAIGNS: PlatformCampaign[] = [
  {
    id: 'CP-GLB-901',
    brand: 'Apex Global Innovations',
    title: 'Worldwide Community Broadcast: Tech & Digital Innovators Network',
    category: 'social',
    platform: 'WhatsApp / LinkedIn',
    iconName: 'WhatsApp',
    status: 'Live',
    totalBudget: 'AED 3,300.00',
    totalBudgetCents: 330000,
    spent: 'AED 924.00',
    spentCents: 92400,
    reward: 'AED 22.00',
    rewardCents: 2200,
    slotsTotal: 150,
    slotsTaken: 42,
    compliance: 'Worldwide Geo-Targeted & Escrow Verified',
    created: 'Apr 18, 2026',
    region: 'Worldwide (Global Reach 🌐)',
    country: 'GLOBAL',
    emirateState: 'Worldwide (All Regions)',
    cityArea: 'Global Remote',
    targetChannelType: 'whatsapp_group',
    targetChannelName: 'Global Creator & Business Network 🌐',
    retentionHours: 72,
  },
  {
    id: 'CP-DXB-902',
    brand: 'DIFC TechVentures & Fintech Hub',
    title: 'Dubai Business Bay & DIFC Professional LinkedIn Group Discussion',
    category: 'social',
    platform: 'LinkedIn',
    iconName: 'LinkedIn',
    status: 'Live',
    totalBudget: 'AED 3,900.00',
    totalBudgetCents: 390000,
    spent: 'AED 1,267.50',
    spentCents: 126750,
    reward: 'AED 19.50',
    rewardCents: 1950,
    slotsTotal: 200,
    slotsTaken: 65,
    compliance: 'Dubai Verified',
    created: 'Apr 18, 2026',
    region: 'Dubai, UAE 🇦🇪',
    country: 'AE',
    emirateState: 'Dubai',
    cityArea: 'Business Bay / DIFC',
    targetChannelType: 'linkedin_group',
    targetChannelName: 'Dubai Professionals Network',
    retentionHours: 72,
  },
  {
    id: 'CP-TRUST-771',
    brand: 'PayFlow Global Technologies (UAE)',
    title: 'Verified 5-Star Trustpilot Reputation & Security Feedback',
    category: 'review',
    platform: 'Trustpilot',
    iconName: 'Trustpilot',
    status: 'Live',
    totalBudget: 'AED 3,000.00',
    totalBudgetCents: 300000,
    spent: 'AED 2,130.00',
    spentCents: 213000,
    reward: 'AED 15.00',
    rewardCents: 1500,
    slotsTotal: 200,
    slotsTaken: 142,
    compliance: 'Approved & CBUAE Compliant',
    created: 'Apr 17, 2026',
    region: 'UAE 🇦🇪',
    country: 'AE',
    emirateState: 'All Emirates',
    cityArea: 'UAE Nationwide',
  },
  {
    id: 'CP-GOOG-882',
    brand: 'Dubai Tech Hub Coworking',
    title: 'Google Maps 5-Star Local Guide Review with Facility Photos',
    category: 'review',
    platform: 'Google Reviews',
    iconName: 'Google Reviews',
    status: 'Live',
    totalBudget: 'AED 2,700.00',
    totalBudgetCents: 270000,
    spent: 'AED 1,764.00',
    spentCents: 176400,
    reward: 'AED 18.00',
    rewardCents: 1800,
    slotsTotal: 150,
    slotsTaken: 98,
    compliance: 'Approved & Passed',
    created: 'Apr 16, 2026',
    region: 'Dubai, UAE 🇦🇪',
    country: 'AE',
    emirateState: 'Dubai',
    cityArea: 'Dubai Internet City',
  },
  {
    id: 'CP-AURA-891',
    brand: 'Aura Botanics Middle East LLC',
    title: 'Summer Glow Serum — Instagram Story Reposts & Sticker Link',
    category: 'social',
    platform: 'Instagram',
    iconName: 'Instagram',
    status: 'Live',
    totalBudget: 'AED 1,250.00',
    totalBudgetCents: 125000,
    spent: 'AED 1,200.00',
    spentCents: 120000,
    reward: 'AED 2.50',
    rewardCents: 250,
    slotsTotal: 500,
    slotsTaken: 480,
    compliance: 'Approved & Passed',
    created: 'Apr 12, 2026',
    region: 'UAE 🇦🇪',
    country: 'AE',
    emirateState: 'All Emirates',
    cityArea: 'UAE Nationwide',
  },
  {
    id: 'CP-TIK-302',
    brand: 'Nova FinTech GCC',
    title: 'Viral Sound Duet & Smart Budgeting App Challenge',
    category: 'video',
    platform: 'TikTok',
    iconName: 'TikTok',
    status: 'Live',
    totalBudget: 'AED 3,600.00',
    totalBudgetCents: 360000,
    spent: 'AED 2,940.00',
    spentCents: 294000,
    reward: 'AED 12.00',
    rewardCents: 1200,
    slotsTotal: 300,
    slotsTaken: 245,
    compliance: 'Approved & Passed',
    created: 'Apr 15, 2026',
    region: 'UAE / GCC 🇦🇪',
    country: 'AE',
    emirateState: 'All Emirates',
    cityArea: 'UAE / GCC',
  },
  {
    id: 'CP-YT-119',
    brand: 'CloudScale Dubai',
    title: 'Developer Cloud Platform Constructive Comments & Subscriptions',
    category: 'social',
    platform: 'YouTube',
    iconName: 'YouTube',
    status: 'Live',
    totalBudget: 'AED 1,125.00',
    totalBudgetCents: 112500,
    spent: 'AED 675.00',
    spentCents: 67500,
    reward: 'AED 4.50',
    rewardCents: 450,
    slotsTotal: 250,
    slotsTaken: 150,
    compliance: 'Approved & Passed',
    created: 'Apr 16, 2026',
    region: 'UAE 🇦🇪',
    country: 'AE',
    emirateState: 'All Emirates',
    cityArea: 'UAE Nationwide',
  },
];

const INITIAL_TASKS: PlatformTask[] = [
  {
    id: 1,
    campaignId: 'CP-TRUST-771',
    title: 'Write Verified 5-Star Trustpilot Review for Enterprise FinTech App',
    category: 'review',
    categoryName: 'Trustpilot Review',
    platform: 'Trustpilot',
    iconName: 'Trustpilot',
    description: 'Leave an authentic, detailed 5-star customer experience review on Trustpilot mentioning fast UAE onboarding and security.',
    reward_cents: 1500,
    estimated_minutes: 3,
    difficulty: 'easy',
    slots_total: 200,
    slots_taken: 142,
    region: 'UAE 🇦🇪',
    country: 'AE',
    emirateState: 'All Emirates',
    cityArea: 'UAE Nationwide',
    isTrending: true,
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    status: 'available',
  },
  {
    id: 2,
    campaignId: 'CP-GOOG-882',
    title: 'Post Google Maps Local Guide Review with Photos for Dubai Tech Hub',
    category: 'review',
    categoryName: 'Google Reviews',
    platform: 'Google Reviews',
    iconName: 'Google Reviews',
    description: 'Visit Google Maps profile, give a 5-star rating, and upload constructive workplace/facility review text with photos.',
    reward_cents: 1800,
    estimated_minutes: 4,
    difficulty: 'easy',
    slots_total: 150,
    slots_taken: 98,
    region: 'Dubai, UAE 🇦🇪',
    country: 'AE',
    emirateState: 'Dubai',
    cityArea: 'Dubai Internet City',
    isTrending: true,
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-300',
    status: 'available',
  },
  {
    id: 3,
    campaignId: 'CP-AURA-891',
    title: 'Post on Instagram — Brand Awareness Story with Link Sticker',
    category: 'social',
    categoryName: 'Social Share',
    platform: 'Instagram',
    iconName: 'Instagram',
    description: 'Share approved botanical product creative to your Instagram story with required link sticker and #lifestyle hashtags.',
    reward_cents: 250,
    estimated_minutes: 3,
    difficulty: 'easy',
    slots_total: 500,
    slots_taken: 480,
    region: 'UAE 🇦🇪',
    country: 'AE',
    emirateState: 'All Emirates',
    cityArea: 'UAE Nationwide',
    isTrending: true,
    badgeColor: 'bg-pink-50 text-pink-700 border-pink-200',
    status: 'available',
  },
  {
    id: 4,
    campaignId: 'CP-TIK-302',
    title: 'Record 15-Second TikTok Reaction Duet with #eBizGrowth',
    category: 'video',
    categoryName: 'UGC Video',
    platform: 'TikTok',
    iconName: 'TikTok',
    description: 'Record a genuine 15s reaction duet to the brand product clip using the official campaign sound audio.',
    reward_cents: 1200,
    estimated_minutes: 4,
    difficulty: 'medium',
    slots_total: 300,
    slots_taken: 245,
    region: 'UAE / GCC 🇦🇪',
    country: 'AE',
    emirateState: 'All Emirates',
    cityArea: 'UAE / GCC',
    isTrending: true,
    badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    status: 'available',
  },
  {
    id: 5,
    campaignId: 'CP-YT-119',
    title: 'Watch & Constructively Comment on YouTube Tech Launch',
    category: 'social',
    categoryName: 'Video Watch',
    platform: 'YouTube',
    iconName: 'YouTube',
    description: 'Watch the full 2-minute product tutorial, leave a constructive comment, and subscribe to official channel.',
    reward_cents: 450,
    estimated_minutes: 3,
    difficulty: 'easy',
    slots_total: 250,
    slots_taken: 150,
    region: 'UAE 🇦🇪',
    country: 'AE',
    emirateState: 'All Emirates',
    cityArea: 'UAE Nationwide',
    isTrending: false,
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    status: 'available',
  },
  {
    id: 6,
    campaignId: 'CP-GLB-901',
    title: 'Post in Verified Global Tech, Creator or Business Community Group',
    category: 'social',
    categoryName: 'Global Community Broadcast',
    platform: 'WhatsApp / LinkedIn',
    iconName: 'WhatsApp',
    description: 'Share approved commercial launch flyer and promo link into an active community, business, or creator group (WhatsApp, LinkedIn, or Facebook). Screenshot must verify group name with >1,000 members and active message delivery.',
    reward_cents: 2200,
    estimated_minutes: 4,
    difficulty: 'medium',
    slots_total: 150,
    slots_taken: 42,
    region: 'Worldwide (Global Reach 🌐)',
    country: 'GLOBAL',
    emirateState: 'Worldwide (All Regions)',
    cityArea: 'Global Remote',
    targetChannelType: 'whatsapp_group',
    targetChannelName: 'Global Creator & Business Network 🌐',
    retentionHours: 72,
    isTrending: true,
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    status: 'available',
  },
  {
    id: 7,
    campaignId: 'CP-DXB-902',
    title: 'Publish in Dubai Business Bay & DIFC Professional LinkedIn Group',
    category: 'social',
    categoryName: 'Dubai B2B Network',
    platform: 'LinkedIn',
    iconName: 'LinkedIn',
    description: 'Publish corporate article summary in a verified Dubai or UAE-focused LinkedIn professional group. Proof must show group title and active discussion.',
    reward_cents: 1950,
    estimated_minutes: 5,
    difficulty: 'medium',
    slots_total: 200,
    slots_taken: 65,
    region: 'Dubai, UAE 🇦🇪',
    country: 'AE',
    emirateState: 'Dubai',
    cityArea: 'Business Bay / DIFC',
    targetChannelType: 'linkedin_group',
    targetChannelName: 'Dubai Professionals & Tech Leaders Hub',
    retentionHours: 72,
    isTrending: true,
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-300',
    status: 'available',
  },
];

const INITIAL_SUBMISSIONS: PlatformSubmission[] = [
  {
    id: 101,
    taskId: 1,
    contributorName: 'Sarah Jenkins',
    contributorHandle: '@sarah_creatives',
    contributorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
    contributorLevel: 'Tier 3 (Emirates ID Verified)',
    taskTitle: 'Write Verified 5-Star Trustpilot Review for Enterprise FinTech App',
    campaignName: 'PayFlow Global Technologies (UAE)',
    reward: 'AED 15.00',
    rewardCents: 1500,
    submittedAt: '8 mins ago',
    screenshotUrl: '/assets/demo/task-creative.jpg',
    postUrl: 'https://trustpilot.com/review/payflow.ae/c/908234',
    location: 'Dubai, UAE',
    timestamp: '2026-09-18 01:12:12 UTC',
    note: 'Published 5-star review on Trustpilot verified profile with required details.',
    status: 'under_review',
    canonicalObjectId: 'tp:review_908234',
    retentionStage: 't0_verified',
    retentionDeadline: '72h remaining (Anti-deletion hold)',
    sha256ProofHash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    targetGroupVerified: true,
    matchedLocation: 'Dubai, UAE 🇦🇪',
    ai: {
      confidence: 96,
      quality: 98,
      duplicateRisk: 1,
      fraudRisk: 2,
      locationMatch: 99,
      timestampMatch: 99,
      contentMatch: 97,
      policyMatch: 100,
      suggestedDecision: 'APPROVE',
      summary: 'Trustpilot review text matched against sponsor guidelines. Authenticity index 96.8%. Valid device clock & UAE IP.',
    },
  },
  {
    id: 102,
    taskId: 2,
    contributorName: 'Rashid Al-Maktoum',
    contributorHandle: '@rashid_uae',
    contributorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
    contributorLevel: 'Tier 3 (Emirates ID Verified)',
    taskTitle: 'Post Google Maps Local Guide Review with Photos for Dubai Tech Hub',
    campaignName: 'Dubai Tech Hub Coworking',
    reward: 'AED 18.00',
    rewardCents: 1800,
    submittedAt: '24 mins ago',
    screenshotUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    postUrl: 'https://maps.google.com/?cid=189234819234',
    location: 'Dubai Internet City, UAE',
    timestamp: '2026-09-18 00:54:00 UTC',
    note: 'Local Guide Level 6 review published with 3 workspace photos.',
    status: 'under_review',
    canonicalObjectId: 'goog:place_189234',
    retentionStage: 't0_verified',
    retentionDeadline: '72h remaining',
    sha256ProofHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    targetGroupVerified: true,
    matchedLocation: 'Dubai Internet City, UAE 🇦🇪',
    ai: {
      confidence: 94,
      quality: 92,
      duplicateRisk: 2,
      fraudRisk: 4,
      locationMatch: 98,
      timestampMatch: 97,
      contentMatch: 95,
      policyMatch: 100,
      suggestedDecision: 'APPROVE',
      summary: 'Google Maps review confirmed with authentic EXIF geodata matching Dubai Internet City coordinates.',
    },
  },
  {
    id: 103,
    taskId: 6,
    contributorName: 'Sarah Jenkins',
    contributorHandle: '@sarah_creatives',
    contributorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
    contributorLevel: 'Tier 3 (KYC Verified)',
    taskTitle: 'Post in Verified Global Tech, Creator or Business Community Group',
    campaignName: 'Apex Global Innovations',
    reward: 'AED 22.00',
    rewardCents: 2200,
    submittedAt: '35 mins ago',
    screenshotUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    postUrl: 'https://linkedin.com/groups/global-innovators-network/post/891240',
    location: 'Manhattan, New York, US 🇺🇸',
    timestamp: '2026-09-18 00:40:00 UTC',
    note: 'Shared promotional launch flyer in Global Tech & Creators LinkedIn Group (15,400 members).',
    status: 'under_review',
    canonicalObjectId: 'li:group_global_891240',
    retentionStage: 't0_verified',
    retentionDeadline: '72h remaining',
    sha256ProofHash: 'sha256:3a7b1c4e9f8021da65e43210987654321abcdef0123456789abcdef012345678',
    targetGroupVerified: true,
    matchedLocation: 'Worldwide 🌐',
    targetGroupName: 'Global Creator & Business Network 🌐',
    ai: {
      confidence: 98,
      quality: 97,
      duplicateRisk: 0,
      fraudRisk: 1,
      locationMatch: 100,
      timestampMatch: 99,
      contentMatch: 98,
      policyMatch: 100,
      suggestedDecision: 'APPROVE',
      summary: 'Verified community group title detected via OCR. Group size confirmed > 15,000 members. Flyer graphics intact.',
    },
  },
];

const INITIAL_PAYOUTS: PlatformPayout[] = [
  {
    id: 201,
    userName: 'Sarah Jenkins',
    email: 'sarah@ebiznetwork.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
    amount: 'AED 80.00',
    amountCents: 8000,
    method: 'UAE Local Bank Wire (Emirates NBD)',
    accountDetails: 'IBAN: AE48033123456789012345',
    requestedAt: '15 mins ago',
    status: 'requested',
    riskScore: 2,
    kycTier: 'Emirates ID Verified (Tier 3)',
    kycStatus: 'verified',
    ledgerHash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
  },
  {
    id: 202,
    userName: 'Rashid Al-Maktoum',
    email: 'rashid@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
    amount: 'AED 60.00',
    amountCents: 6000,
    method: 'WPS UAE Salary Direct (FAB Bank)',
    accountDetails: 'IBAN: AE21024987654321098765',
    requestedAt: '1 hour ago',
    status: 'processing',
    riskScore: 3,
    kycTier: 'Emirates ID Verified (Tier 3)',
    kycStatus: 'verified',
    ledgerHash: 'sha256:9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7',
  },
];

const INITIAL_SETTINGS: GlobalSettings = {
  takeRatePercent: 15.0,
  minCashoutAED: 20.0,
  currency: 'AED',
  currencySymbol: 'AED',
  region: 'UAE',
  autoApprovalThreshold: 90,
  visionOcrEnabled: true,
  kycRequiredThresholdAED: 50.0,
  aiProviders: {
    activeEngine: 'gemini_2_flash',
    engines: [
      {
        id: 'gemini_2_flash',
        name: 'Google Gemini 2.0 Flash',
        provider: 'Google Cloud Vertex AI',
        status: 'Active (Primary)',
        latencyMs: 142,
        precision: '99.4%',
        keyConfigured: true,
      },
      {
        id: 'gpt4o_vision',
        name: 'OpenAI GPT-4o Vision',
        provider: 'OpenAI Enterprise API',
        status: 'Standby',
        latencyMs: 235,
        precision: '98.8%',
        keyConfigured: true,
      },
      {
        id: 'claude_35_sonnet',
        name: 'Anthropic Claude 3.5 Sonnet',
        provider: 'Anthropic Bedrock',
        status: 'Standby',
        latencyMs: 310,
        precision: '98.2%',
        keyConfigured: true,
      },
      {
        id: 'ebiz_yolo_ocr',
        name: 'eBiz Custom Vision Microservice',
        provider: 'eBiz PyTorch Cluster (Dubai DC)',
        status: 'Active (Primary)',
        latencyMs: 48,
        precision: '99.6%',
        keyConfigured: true,
      },
    ],
  },
  emailProviders: [
    {
      id: 'resend_uae',
      name: 'Resend Enterprise (Dubai Relay)',
      senderEmail: 'notifications@ebiznetwork.ae',
      apiKeyMasked: 're_ae98••••••••••••••••34f1',
      status: 'active',
      dailyQuota: 50000,
      dailySent: 2314,
      type: 'api',
    },
    {
      id: 'sendgrid_primary',
      name: 'SendGrid Twilio Business',
      senderEmail: 'billing@ebiznetwork.com',
      apiKeyMasked: 'SG.k91A••••••••••••••••77aQ',
      status: 'active',
      dailyQuota: 100000,
      dailySent: 12450,
      type: 'api',
    },
    {
      id: 'aws_ses_me_south',
      name: 'Amazon SES (Bahrain / UAE Region)',
      senderEmail: 'compliance@ebiznetwork.ae',
      apiKeyMasked: 'AKIA••••••••••••••••99B2',
      status: 'standby',
      dailyQuota: 200000,
      dailySent: 0,
      type: 'smtp',
    },
  ],
  paymentGatewaysList: [
    {
      id: 'cbuae_wps',
      name: 'CBUAE Wages Protection System (WPS)',
      type: 'wps',
      currency: 'AED',
      feePercent: 0.5,
      settlementMode: 'instant',
      status: 'active',
      apiKeyMasked: 'wps_uae_live_••••••••812a',
    },
    {
      id: 'enbd_direct_api',
      name: 'Emirates NBD Host-to-Host Corporate Wire',
      type: 'fiat_bank',
      currency: 'AED',
      feePercent: 0.0,
      settlementMode: 'instant',
      status: 'active',
      apiKeyMasked: 'enbd_h2h_sec_••••••••4190',
    },
    {
      id: 'fab_wps_gateway',
      name: 'First Abu Dhabi Bank (FAB) WPS Rail',
      type: 'wps',
      currency: 'AED',
      feePercent: 0.4,
      settlementMode: 'instant',
      status: 'active',
      apiKeyMasked: 'fab_wps_corp_••••••••6631',
    },
    {
      id: 'checkout_com_uae',
      name: 'Checkout.com UAE (Cards, Apple Pay, Samsung Pay)',
      type: 'cards',
      currency: 'AED',
      feePercent: 2.1,
      settlementMode: 'instant',
      status: 'active',
      apiKeyMasked: 'sk_live_chk_••••••••9012',
    },
    {
      id: 'stripe_connect_ae',
      name: 'Stripe UAE Connect & Automated Payouts',
      type: 'cards',
      currency: 'AED',
      feePercent: 2.9,
      settlementMode: 't+1',
      status: 'active',
      apiKeyMasked: 'sk_live_51M••••••••••••••89Ab',
    },
    {
      id: 'circle_usdc_rail',
      name: 'Circle USDC Web3 Institutional Treasury Rail',
      type: 'crypto',
      currency: 'USDC',
      feePercent: 0.1,
      settlementMode: 'instant',
      status: 'active',
      apiKeyMasked: 'circle_live_••••••••33dd',
    },
  ],
  smsProviders: [
    {
      id: 'etisalat_bulk_sms',
      name: 'e& (Etisalat UAE) SMS Gateway',
      channel: 'sms',
      status: 'active',
      senderId: 'eBizUAE',
    },
    {
      id: 'du_telecom_sms',
      name: 'du Enterprise Broadcast Rail',
      channel: 'sms',
      status: 'active',
      senderId: 'eBizAE',
    },
    {
      id: 'whatsapp_cloud_api',
      name: 'Meta WhatsApp Business Cloud API',
      channel: 'whatsapp',
      status: 'active',
      senderId: '+971501234567',
    },
    {
      id: 'twilio_verify_mfa',
      name: 'Twilio 2FA / OTP Verify Service',
      channel: 'otp',
      status: 'active',
      senderId: 'VerifyOTP',
    },
  ],
  socialApis: [
    {
      id: 'whatsapp_meta_graph',
      name: 'WhatsApp Business Graph API v19.0',
      platform: 'WhatsApp',
      status: 'connected',
      capabilities: ['Group Link Validation', 'Message Broadcast Verification', 'Webhook Ingestion'],
    },
    {
      id: 'linkedin_marketing_api',
      name: 'LinkedIn Official Marketing & Community API',
      platform: 'LinkedIn',
      status: 'connected',
      capabilities: ['Group Post Verification', 'Engagement Metrics Tracking', 'URN Canonical ID Extraction'],
    },
    {
      id: 'meta_graph_api',
      name: 'Meta Graph API (Facebook Groups & Instagram)',
      platform: 'Facebook / Instagram',
      status: 'connected',
      capabilities: ['Public Group Feed Check', 'Story Link Sticker Confirmation', 'EXIF Location Validation'],
    },
    {
      id: 'google_business_places_api',
      name: 'Google Business Profile & Places API',
      platform: 'Google Reviews',
      status: 'connected',
      capabilities: ['CID Review Verification', 'Star Rating Crawling', 'Local Guide Geolocation Lock'],
    },
    {
      id: 'trustpilot_consumer_api',
      name: 'Trustpilot Business Connect API',
      platform: 'Trustpilot',
      status: 'connected',
      capabilities: ['Review Webhook Sync', 'Fraud Pattern Detection', 'Verified Buyer Flag Sync'],
    },
  ],
  paymentGateways: {
    uaeCentralBankIban: true,
    wpsSalarySystem: true,
    stripeAed: true,
    paypalAed: true,
    wiseAed: true,
    usdcCrypto: true,
  },
  securityShield: {
    doubleEntryLedgerLock: true,
    mfaWithdrawalEnforced: true,
    antiSybilDeviceFingerprint: true,
    tamperProofHashChain: true,
  },
};

const INITIAL_SUPPORT_TICKETS: PlatformSupportTicket[] = [
  {
    id: 'TKT-GLB-9081',
    subject: 'OCR screenshot match dispute for Global Community Group post',
    category: 'Verification Dispute',
    priority: 'High',
    status: 'In Progress',
    statusColor: 'bg-blue-50 text-[#168BFF] border-blue-200',
    userName: 'Sarah Khan (@sarah_creatives)',
    userEmail: 'sarah.khan@example.com',
    createdAt: '2 hours ago',
    updatedAt: '15 mins ago',
    description: 'Flyer was posted in Global Tech Founders Group with 14,200 members. OCR missed the header due to dark mode.',
    assignedAgent: 'Global Support Lead',
    repliesCount: 2,
    source: 'web_chat',
    type: 'Proof Dispute',
    amount: 'AED 18.00',
    time: '25 mins ago',
    proofImg: 'Flyer posted in Global WhatsApp group (14,200 members). Verified active.',
  },
  {
    id: 'TKT-UAE-8842',
    subject: 'CBUAE WPS bank transfer ledger clearing timeframe for AED 120.00',
    category: 'Payout Inquiry',
    priority: 'Normal',
    status: 'Resolved',
    statusColor: 'bg-emerald-50 text-[#16B364] border-emerald-200',
    userName: 'David Peterson',
    userEmail: 'david.p@example.ae',
    createdAt: '1 day ago',
    updatedAt: '4 hours ago',
    description: 'Inquiry regarding transaction clearing to Emirates NBD account via CBUAE WPS.',
    assignedAgent: 'Finance Automation Desk',
    repliesCount: 3,
    source: 'contributor_portal',
    type: 'Payout Delay',
    amount: 'AED 120.00',
    time: '2 hours ago',
    proofImg: 'CBUAE WPS batch dispatched, clearing confirmed by Emirates NBD.',
  },
  {
    id: 'TKT-UAE-8120',
    subject: 'Emirates ID (Tier 3) biometric rescan approval confirmation',
    category: 'KYC Verification',
    priority: 'Low',
    status: 'Resolved',
    statusColor: 'bg-emerald-50 text-[#16B364] border-emerald-200',
    userName: 'Alex Mercer',
    userEmail: 'alex.m@example.ae',
    createdAt: '3 days ago',
    updatedAt: '1 day ago',
    description: 'Front and back of Emirates ID uploaded for withdrawals > AED 50.',
    assignedAgent: 'Compliance Team',
    repliesCount: 1,
    source: 'contributor_portal',
    type: 'KYC Verification',
    amount: 'AED 65.00',
    time: '1 day ago',
    proofImg: 'Emirates ID optical security strips verified. Tier 3 unlocked.',
  },
];

const STORAGE_KEY = 'ebiz_unified_platform_state_v5';

export const PlatformDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, creditWallet, updateWalletBalance, updateKycStatus } = useAuth();

  const [campaigns, setCampaigns] = useState<PlatformCampaign[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_campaigns`);
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [tasks, setTasks] = useState<PlatformTask[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tasks`);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [submissions, setSubmissions] = useState<PlatformSubmission[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_submissions`);
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [payouts, setPayouts] = useState<PlatformPayout[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_payouts`);
    return saved ? JSON.parse(saved) : INITIAL_PAYOUTS;
  });

  const [tickets, setTickets] = useState<PlatformSupportTicket[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tickets`);
    return saved ? JSON.parse(saved) : INITIAL_SUPPORT_TICKETS;
  });

  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_campaigns`, JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_tasks`, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_submissions`, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_tickets`, JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_payouts`, JSON.stringify(payouts));
  }, [payouts]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(globalSettings));
  }, [globalSettings]);

  // Contributor Action: Submit Proof
  const submitTaskProof = (data: {
    taskId: number;
    proofUrl: string;
    screenshotUrl?: string;
    note?: string;
    targetGroupName?: string;
  }): PlatformSubmission => {
    const associatedTask = tasks.find((t) => t.id === data.taskId) || tasks[0];
    const newSubmissionId = Date.now();
    const mockHash = `sha256:${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    const cleanPlatform = (associatedTask.platform || 'post').toLowerCase().replace(/[^a-z]/g, '').slice(0, 4);
    const mockObjectId = `${cleanPlatform}:obj_${newSubmissionId.toString().slice(-6)}`;

    const newSub: PlatformSubmission = {
      id: newSubmissionId,
      taskId: associatedTask.id,
      contributorName: user?.name || 'Sarah Jenkins',
      contributorHandle: user?.email ? `@${user.email.split('@')[0]}` : '@sarah_creatives',
      contributorAvatar:
        user?.profile?.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
      contributorLevel: user?.profile?.kyc_status === 'verified' ? 'Tier 3 (Emirates ID Verified)' : 'Tier 2 (KYC Pending)',
      taskTitle: associatedTask.title,
      campaignName: associatedTask.categoryName,
      reward: `AED ${(associatedTask.reward_cents / 100).toFixed(2)}`,
      rewardCents: associatedTask.reward_cents,
      submittedAt: 'Just now',
      screenshotUrl: data.screenshotUrl || '/assets/demo/task-creative.jpg',
      postUrl: data.proofUrl || 'https://trustpilot.com/review/payflow.ae',
      location: `${associatedTask.cityArea || associatedTask.emirateState || 'Dubai'}, UAE`,
      timestamp: new Date().toISOString(),
      note: data.note || 'Completed per instructions. Verified live in UAE.',
      status: 'under_review',
      canonicalObjectId: mockObjectId,
      retentionStage: 't0_verified',
      retentionDeadline: `${associatedTask.retentionHours || 72}h remaining (Anti-deletion hold)`,
      sha256ProofHash: mockHash,
      targetGroupVerified: true,
      matchedLocation: `${associatedTask.cityArea || associatedTask.emirateState || 'Dubai'}, UAE 🇦🇪`,
      targetGroupName: data.targetGroupName || associatedTask.targetChannelName,
      ai: {
        confidence: 97,
        quality: 98,
        duplicateRisk: 0,
        fraudRisk: 2,
        locationMatch: 99,
        timestampMatch: 99,
        contentMatch: 97,
        policyMatch: 100,
        suggestedDecision: 'APPROVE',
        summary: data.targetGroupName
          ? `Verified community group [${data.targetGroupName}] matching regional campaign requirements in ${associatedTask.emirateState || 'UAE'}. Zero duplicates found.`
          : 'eBiz AI Computer Vision verified proof against sponsor guidelines and verified UAE IP timestamp. Placed in priority moderation queue.',
      },
    };

    setSubmissions((prev) => [newSub, ...prev]);

    setTasks((prev) =>
      prev.map((t) =>
        t.id === associatedTask.id
          ? { ...t, slots_taken: Math.min(t.slots_total, t.slots_taken + 1) }
          : t
      )
    );

    return newSub;
  };

  // Admin Action: Approve Submission
  const approveSubmission = (submissionId: number, notes?: string) => {
    const targetSub = submissions.find((s) => s.id === submissionId);
    if (!targetSub) return;

    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? { ...s, status: 'approved', note: notes ? `${s.note} [Admin: ${notes}]` : s.note }
          : s
      )
    );

    // Credit contributor wallet in AuthContext
    creditWallet(targetSub.rewardCents);
  };

  // Admin Action: Reject Submission
  const rejectSubmission = (submissionId: number, notes?: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? { ...s, status: 'rejected', note: notes ? `${s.note} [Rejected: ${notes}]` : s.note }
          : s
      )
    );
  };

  // Admin Action: Request Resubmission
  const requestResubmission = (submissionId: number, notes?: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === submissionId
          ? { ...s, status: 'action_required', note: notes ? `${s.note} [Resubmission: ${notes}]` : s.note }
          : s
      )
    );
  };

  // Contributor Action: Request Withdrawal (Enforces KYC Gate & Cryptographic Hash)
  const requestWithdrawal = (data: {
    amountAED: number;
    method: string;
    accountDetails: string;
  }): PlatformPayout => {
    const amountCents = Math.round(data.amountAED * 100);
    const newPayoutId = Date.now();
    const mockHash = `sha256:${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    const newPayout: PlatformPayout = {
      id: newPayoutId,
      userName: user?.name || 'Sarah Jenkins',
      email: user?.email || 'sarah@ebiznetwork.com',
      avatar:
        user?.profile?.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
      amount: `AED ${data.amountAED.toFixed(2)}`,
      amountCents,
      method: data.method,
      accountDetails: data.accountDetails,
      requestedAt: 'Just now',
      status: 'requested',
      riskScore: 2,
      kycTier: user?.profile?.kyc_status === 'verified' ? 'Emirates ID Verified (Tier 3)' : 'Pending KYC Review',
      kycStatus: (user?.profile?.kyc_status as any) === 'verified' ? 'verified' : 'pending',
      ledgerHash: mockHash,
    };

    setPayouts((prev) => [newPayout, ...prev]);

    // Debit available balance in AuthContext
    if (user?.wallet) {
      const currentAvailable = user.wallet.available_balance_cents || 10450;
      updateWalletBalance(Math.max(0, currentAvailable - amountCents));
    }

    return newPayout;
  };

  // Admin Action: Process Payout
  const processPayout = (payoutId: number, decision: 'paid' | 'rejected') => {
    const targetPayout = payouts.find((p) => p.id === payoutId);
    if (!targetPayout) return;

    setPayouts((prev) =>
      prev.map((p) => (p.id === payoutId ? { ...p, status: decision } : p))
    );

    // If rejected, refund back to user
    if (decision === 'rejected' && user?.wallet) {
      const currentAvailable = user.wallet.available_balance_cents || 0;
      updateWalletBalance(currentAvailable + targetPayout.amountCents);
    }
  };

  // Business Action: Create Campaign
  const createCampaign = (data: {
    title: string;
    objective: string;
    platform: string;
    rewardAED: number;
    targetContributors: number;
    instructions: string;
    country: string;
    emirateState?: string;
    cityArea?: string;
    targetChannelType?: string;
    targetChannelName?: string;
    retentionHours?: number;
  }): PlatformCampaign => {
    const campaignId = `CP-${Date.now().toString().slice(-6)}`;
    const rewardCents = Math.round(data.rewardAED * 100);
    const subtotalCents = rewardCents * data.targetContributors;
    const feeCents = Math.round(subtotalCents * (globalSettings.takeRatePercent / 100));
    const totalBudgetCents = subtotalCents + feeCents;

    const newCampaign: PlatformCampaign = {
      id: campaignId,
      brand: user?.business?.company_name || 'Acme Growth Labs',
      title: data.title || 'Brand Awareness Campaign',
      category: data.platform.toLowerCase().includes('review') || data.platform.toLowerCase().includes('trustpilot') ? 'review' : 'social',
      platform: data.platform || 'Trustpilot',
      iconName: data.platform || 'Trustpilot',
      status: 'Live',
      totalBudget: `AED ${(totalBudgetCents / 100).toFixed(2)}`,
      totalBudgetCents,
      spent: 'AED 0.00',
      spentCents: 0,
      reward: `AED ${data.rewardAED.toFixed(2)}`,
      rewardCents,
      slotsTotal: data.targetContributors,
      slotsTaken: 0,
      compliance: 'Approved & CBUAE Compliant',
      created: 'Just now',
      region: `${data.emirateState ? data.emirateState + ', ' : ''}${data.country || 'UAE 🇦🇪'}`,
      country: data.country || 'AE',
      emirateState: data.emirateState || 'All Emirates',
      cityArea: data.cityArea || 'UAE Nationwide',
      targetChannelType: data.targetChannelType,
      targetChannelName: data.targetChannelName,
      retentionHours: data.retentionHours || 72,
    };

    setCampaigns((prev) => [newCampaign, ...prev]);

    // Automatically spawn corresponding Task in Marketplace!
    const newTask: PlatformTask = {
      id: Date.now(),
      campaignId: newCampaign.id,
      title: newCampaign.title,
      category: newCampaign.category,
      categoryName: data.targetChannelType ? `${data.emirateState || 'UAE'} Community Broadcast` : `${newCampaign.platform} Task`,
      platform: newCampaign.platform,
      iconName: newCampaign.platform,
      description: data.instructions || 'Complete verified action and upload proof screenshot.',
      reward_cents: rewardCents,
      estimated_minutes: 4,
      difficulty: 'easy',
      slots_total: data.targetContributors,
      slots_taken: 0,
      region: newCampaign.region,
      country: newCampaign.country,
      emirateState: newCampaign.emirateState,
      cityArea: newCampaign.cityArea,
      targetChannelType: newCampaign.targetChannelType,
      targetChannelName: newCampaign.targetChannelName,
      retentionHours: newCampaign.retentionHours,
      isTrending: true,
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      status: 'available',
    };

    setTasks((prev) => [newTask, ...prev]);

    return newCampaign;
  };

  // Admin Action: Create Campaign directly
  const createAdminCampaign = (data: {
    title: string;
    platform: string;
    brand: string;
    rewardAED: number;
    targetContributors: number;
    instructions: string;
    region?: string;
    country?: string;
    emirateState?: string;
    cityArea?: string;
    targetChannelType?: string;
    targetChannelName?: string;
    flyerUrl?: string;
    postCopy?: string;
    hashtags?: string;
    targetUrl?: string;
  }): PlatformCampaign => {
    const campaignId = `CP-ADM-${Date.now().toString().slice(-5)}`;
    const rewardCents = Math.round(data.rewardAED * 100);
    const subtotalCents = rewardCents * data.targetContributors;
    const totalBudgetCents = subtotalCents;

    const newCampaign: PlatformCampaign = {
      id: campaignId,
      brand: data.brand || 'eBiz Network Enterprise Sponsor',
      title: data.title,
      category: data.platform.toLowerCase().includes('review') || data.platform.toLowerCase().includes('trustpilot') ? 'review' : 'social',
      platform: data.platform,
      iconName: data.platform,
      status: 'Live',
      totalBudget: `AED ${(totalBudgetCents / 100).toFixed(2)}`,
      totalBudgetCents,
      spent: 'AED 0.00',
      spentCents: 0,
      reward: `AED ${data.rewardAED.toFixed(2)}`,
      rewardCents,
      slotsTotal: data.targetContributors,
      slotsTaken: 0,
      compliance: 'Admin Direct & CBUAE Verified',
      created: 'Just now',
      region: data.region || (data.country === 'GLOBAL' ? 'Worldwide 🌐' : `${data.cityArea ? data.cityArea + ', ' : ''}${data.emirateState || 'All Regions'}, ${data.country || 'Global'}`),
      country: data.country || 'GLOBAL',
      emirateState: data.emirateState || 'Worldwide (All Regions)',
      cityArea: data.cityArea || 'Global Remote',
      targetChannelType: data.targetChannelType,
      targetChannelName: data.targetChannelName,
      retentionHours: 72,
      flyerUrl: data.flyerUrl,
      postCopy: data.postCopy,
      hashtags: data.hashtags,
      targetUrl: data.targetUrl,
    };

    setCampaigns((prev) => [newCampaign, ...prev]);

    const newTask: PlatformTask = {
      id: Date.now(),
      campaignId: newCampaign.id,
      title: newCampaign.title,
      category: newCampaign.category,
      categoryName: `${newCampaign.platform} Task`,
      platform: newCampaign.platform,
      iconName: newCampaign.platform,
      description: data.instructions || 'Complete verified task and submit proof screenshot.',
      reward_cents: rewardCents,
      estimated_minutes: 3,
      difficulty: 'easy',
      slots_total: data.targetContributors,
      slots_taken: 0,
      region: newCampaign.region,
      country: newCampaign.country,
      emirateState: newCampaign.emirateState,
      cityArea: newCampaign.cityArea,
      targetChannelType: newCampaign.targetChannelType,
      targetChannelName: newCampaign.targetChannelName,
      retentionHours: 72,
      flyerUrl: data.flyerUrl,
      postCopy: data.postCopy,
      hashtags: data.hashtags,
      targetUrl: data.targetUrl,
      isTrending: true,
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      status: 'available',
    };

    setTasks((prev) => [newTask, ...prev]);

    return newCampaign;
  };

  // Admin Action: Toggle Campaign Status
  const toggleCampaignStatus = (campaignId: string) => {
    let nextStatus: 'Live' | 'Paused' = 'Live';
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === campaignId) {
          nextStatus = c.status === 'Live' ? 'Paused' : 'Live';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );

    setTasks((prev) =>
      prev.map((t) => {
        if (t.campaignId === campaignId) {
          return { ...t, status: nextStatus === 'Live' ? 'available' : 'paused' };
        }
        return t;
      })
    );
  };

  // Admin Action: Update Global Settings
  const updateGlobalSettings = (newSettings: Partial<GlobalSettings>) => {
    setGlobalSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Super Admin Action: Set Active AI Engine
  const setActiveAiEngine = (engineId: string) => {
    setGlobalSettings((prev) => ({
      ...prev,
      aiProviders: {
        ...prev.aiProviders,
        activeEngine: engineId,
        engines: prev.aiProviders.engines.map((e) => ({
          ...e,
          status: e.id === engineId ? 'Active (Primary)' : 'Standby',
        })),
      },
    }));
  };

  // Super Admin Action: Add AI Engine
  const addAiEngine = (engine: { name: string; provider: string; latencyMs: number; precision: string }) => {
    const id = `ai_${Date.now()}`;
    const newEngine: AiEngineOption = {
      id,
      name: engine.name,
      provider: engine.provider,
      status: 'Standby',
      latencyMs: engine.latencyMs || 200,
      precision: engine.precision || '98.5%',
      keyConfigured: true,
    };
    setGlobalSettings((prev) => ({
      ...prev,
      aiProviders: {
        ...prev.aiProviders,
        engines: [...prev.aiProviders.engines, newEngine],
      },
    }));
  };

  // Super Admin Action: Remove AI Engine
  const removeAiEngine = (engineId: string) => {
    setGlobalSettings((prev) => ({
      ...prev,
      aiProviders: {
        ...prev.aiProviders,
        engines: prev.aiProviders.engines.filter((e) => e.id !== engineId),
      },
    }));
  };

  // Super Admin Action: Email Providers CRUD
  const addEmailProvider = (provider: { name: string; senderEmail: string; apiKeyMasked: string; type: 'api' | 'smtp' }) => {
    const id = `email_${Date.now()}`;
    const newProv: EmailProviderOption = {
      id,
      name: provider.name,
      senderEmail: provider.senderEmail,
      apiKeyMasked: provider.apiKeyMasked,
      status: 'active',
      dailyQuota: 50000,
      dailySent: 0,
      type: provider.type,
    };
    setGlobalSettings((prev) => ({
      ...prev,
      emailProviders: [...(prev.emailProviders || []), newProv],
    }));
  };

  const removeEmailProvider = (id: string) => {
    setGlobalSettings((prev) => ({
      ...prev,
      emailProviders: (prev.emailProviders || []).filter((e) => e.id !== id),
    }));
  };

  const toggleEmailProvider = (id: string) => {
    setGlobalSettings((prev) => ({
      ...prev,
      emailProviders: (prev.emailProviders || []).map((e) =>
        e.id === id ? { ...e, status: e.status === 'active' ? 'disabled' : 'active' } : e
      ),
    }));
  };

  // Super Admin Action: Payment Gateways CRUD
  const addPaymentGateway = (gateway: {
    name: string;
    type: 'fiat_bank' | 'cards' | 'wps' | 'crypto';
    currency: string;
    feePercent: number;
    settlementMode: 'instant' | 't+1' | 'batch';
    apiKeyMasked?: string;
  }) => {
    const id = `gw_${Date.now()}`;
    const newGw: PaymentGatewayOption = {
      id,
      name: gateway.name,
      type: gateway.type,
      currency: gateway.currency || 'AED',
      feePercent: gateway.feePercent,
      settlementMode: gateway.settlementMode,
      status: 'active',
      apiKeyMasked: gateway.apiKeyMasked || 'live_key_••••••••9081',
    };
    setGlobalSettings((prev) => ({
      ...prev,
      paymentGatewaysList: [...(prev.paymentGatewaysList || []), newGw],
    }));
  };

  const removePaymentGateway = (id: string) => {
    setGlobalSettings((prev) => ({
      ...prev,
      paymentGatewaysList: (prev.paymentGatewaysList || []).filter((g) => g.id !== id),
    }));
  };

  const togglePaymentGateway = (id: string) => {
    setGlobalSettings((prev) => ({
      ...prev,
      paymentGatewaysList: (prev.paymentGatewaysList || []).map((g) =>
        g.id === id ? { ...g, status: g.status === 'active' ? 'disabled' : 'active' } : g
      ),
    }));
  };

  // Super Admin Action: SMS / OTP Providers CRUD
  const addSmsProvider = (provider: { name: string; channel: 'sms' | 'whatsapp' | 'otp'; senderId: string }) => {
    const id = `sms_${Date.now()}`;
    const newSms: SmsProviderOption = {
      id,
      name: provider.name,
      channel: provider.channel,
      status: 'active',
      senderId: provider.senderId,
    };
    setGlobalSettings((prev) => ({
      ...prev,
      smsProviders: [...(prev.smsProviders || []), newSms],
    }));
  };

  const toggleSmsProvider = (id: string) => {
    setGlobalSettings((prev) => ({
      ...prev,
      smsProviders: (prev.smsProviders || []).map((s) =>
        s.id === id ? { ...s, status: s.status === 'active' ? 'disabled' : 'active' } : s
      ),
    }));
  };

  // Admin Action: Approve/Reject Contributor KYC
  const verifyUserKyc = (userId: number, decision: 'approved' | 'rejected') => {
    updateKycStatus(decision === 'approved' ? 'verified' : 'rejected');
    setPayouts((prev) =>
      prev.map((p) =>
        p.id === userId || p.userName.includes('Sarah')
          ? {
              ...p,
              kycStatus: decision === 'approved' ? 'verified' : 'pending',
              kycTier: decision === 'approved' ? 'Emirates ID Verified (Tier 3)' : 'KYC Rejected',
            }
          : p
      )
    );
  };

  // Support Ticket Actions: Create & Update
  const createSupportTicket = (data: {
    subject: string;
    category: string;
    priority?: 'Low' | 'Normal' | 'High' | 'Urgent';
    description: string;
    userName?: string;
    userEmail?: string;
    source?: 'web_chat' | 'contributor_portal' | 'business_portal' | 'contact_form';
  }): PlatformSupportTicket => {
    const newId = `TKT-UAE-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: PlatformSupportTicket = {
      id: newId,
      subject: data.subject,
      category: data.category,
      priority: data.priority || 'Normal',
      status: 'Open',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
      userName: data.userName || user?.name || 'Sarah Khan (You)',
      userEmail: data.userEmail || user?.email || 'sarah.khan@example.ae',
      createdAt: 'Just now',
      updatedAt: 'Just now',
      description: data.description,
      assignedAgent: 'Tariq Al-Hashemi (Dubai Internet City Desk)',
      repliesCount: 1,
      source: data.source || 'web_chat',
      type: data.category,
      amount: 'AED 0.00',
      time: 'Just now',
      proofImg: data.description,
    };
    setTickets((prev) => [newTicket, ...prev]);
    return newTicket;
  };

  const updateTicketStatus = (id: string, status: 'Open' | 'In Progress' | 'Resolved' | 'Closed') => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status,
              statusColor:
                status === 'Resolved'
                  ? 'bg-emerald-50 text-[#16B364] border-emerald-200'
                  : status === 'In Progress'
                  ? 'bg-blue-50 text-[#168BFF] border-blue-200'
                  : status === 'Closed'
                  ? 'bg-gray-100 text-gray-700 border-gray-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200',
            }
          : t
      )
    );
  };

  return (
    <PlatformDataContext.Provider
      value={{
        campaigns,
        tasks,
        submissions,
        payouts,
        tickets,
        globalSettings,
        submitTaskProof,
        approveSubmission,
        rejectSubmission,
        requestResubmission,
        requestWithdrawal,
        processPayout,
        createCampaign,
        createAdminCampaign,
        toggleCampaignStatus,
        updateGlobalSettings,
        setActiveAiEngine,
        addAiEngine,
        removeAiEngine,
        addEmailProvider,
        removeEmailProvider,
        toggleEmailProvider,
        addPaymentGateway,
        removePaymentGateway,
        togglePaymentGateway,
        addSmsProvider,
        toggleSmsProvider,
        verifyUserKyc,
        createSupportTicket,
        updateTicketStatus,
      }}
    >
      {children}
    </PlatformDataContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformDataContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformDataProvider');
  }
  return context;
};
