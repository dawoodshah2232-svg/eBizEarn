export type UserRole = 'contributor' | 'business' | 'admin' | 'superadmin';
export type UserStatus = 'active' | 'suspended' | 'pending_verification';
export type ContributorLevel = 'starter' | 'explorer' | 'trusted' | 'pro' | 'elite';
export type TaskDifficulty = 'easy' | 'medium' | 'hard';
export type SubmissionStatus = 'submitted' | 'under_review' | 'approved' | 'rejected' | 'action_required';

export interface User {
  id: number;
  uuid: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  referral_code?: string;
  profile?: Profile;
  wallet?: Wallet;
  business?: Business;
}

export interface Profile {
  id: number;
  user_id: number;
  avatar_url?: string;
  phone?: string;
  country_code: string;
  city?: string;
  language: string;
  bio?: string;
  contributor_level: ContributorLevel;
  fraud_score: number;
  completed_tasks_count: number;
  approval_rate: number;
  interests_json?: string[];
  kyc_status?: 'unverified' | 'pending' | 'verified' | 'rejected';
  kyc_document_type?: 'emirates_id' | 'passport' | 'national_id';
  kyc_submitted_at?: string;
  kyc_verified_at?: string;
}

export interface Business {
  id: number;
  uuid: string;
  owner_id: number;
  company_name: string;
  website?: string;
  industry?: string;
  billing_email?: string;
  status: string;
  verified_at?: string;
}

export interface Wallet {
  id: number;
  user_id: number;
  currency: string;
  available_balance_cents: number;
  pending_balance_cents: number;
  lifetime_earnings_cents: number;
  total_withdrawn_cents: number;
  is_locked: boolean;
}

export interface WalletTransaction {
  id: number;
  wallet_id: number;
  type: 'task_reward' | 'referral_reward' | 'withdrawal' | 'withdrawal_reversal' | 'campaign_funding' | 'campaign_refund' | 'admin_adjustment' | 'bonus';
  amount_cents: number;
  balance_after_cents: number;
  currency: string;
  description: string;
  metadata_json?: Record<string, any>;
  created_at: string;
}

export interface TaskCategory {
  id: number;
  slug: string;
  name: string;
  description?: string;
  icon: string;
  is_active: boolean;
  sort_order: number;
}

export interface Campaign {
  id: number;
  uuid: string;
  business_id: number;
  category_id: number;
  title: string;
  objective?: string;
  description: string;
  instructions_markdown?: string;
  proof_requirements_json?: Record<string, boolean>;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  total_budget_cents: number;
  remaining_budget_cents: number;
  reserved_budget_cents: number;
  reward_per_task_cents: number;
  platform_fee_cents: number;
  target_contributors_count: number;
  completed_contributors_count: number;
  target_countries_json?: string[];
  target_languages_json?: string[];
  min_contributor_level: ContributorLevel;
  retention_hours: number;
  business?: Business;
  category?: TaskCategory;
  tasks?: Task[];
}

export interface Task {
  id: number;
  uuid: string;
  campaign_id: number;
  category_id: number;
  title: string;
  reward_cents: number;
  estimated_minutes: number;
  difficulty: TaskDifficulty;
  status: 'available' | 'paused' | 'completed';
  slots_total: number;
  slots_taken: number;
  category?: TaskCategory;
  campaign?: Campaign;
}

export interface TaskSubmission {
  id: number;
  uuid: string;
  task_id: number;
  user_id: number;
  assignment_id?: number;
  status: SubmissionStatus;
  proof_data_json: {
    url?: string;
    text_answer?: string;
    note?: string;
    device?: string;
    location?: string;
  };
  reviewer_id?: number;
  reviewed_at?: string;
  review_notes?: string;
  created_at: string;
  task?: Task;
  user?: User;
  files?: SubmissionFile[];
  aiResult?: AiVerificationResult;
}

export interface SubmissionFile {
  id: number;
  submission_id: number;
  file_type: 'screenshot' | 'video' | 'url' | 'document';
  file_path: string;
  file_url: string;
  file_size_bytes?: number;
  mime_type?: string;
}

export interface AiVerificationResult {
  id: number;
  submission_id: number;
  confidence_score: number;
  risk_score: number;
  duplicate_risk: number;
  proof_quality: number;
  content_match: number;
  policy_match: number;
  suggested_decision: 'approve' | 'reject' | 'flag';
  analysis_summary: string;
}

export interface WithdrawalRequest {
  id: number;
  uuid: string;
  wallet_id: number;
  user_id: number;
  amount_cents: number;
  fee_cents: number;
  currency: string;
  payout_method: string;
  payout_details_json: Record<string, string>;
  status: 'requested' | 'compliance_check' | 'processing' | 'paid' | 'failed' | 'rejected' | 'cancelled';
  created_at: string;
  processed_at?: string;
  user?: User;
}

export interface FraudEvent {
  id: number;
  user_id?: number;
  submission_id?: number;
  event_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details_json?: Record<string, any>;
  status: string;
  created_at: string;
  user?: User;
  submission?: TaskSubmission;
}

export interface FeatureFlag {
  id: number;
  key: string;
  name: string;
  description?: string;
  is_enabled: boolean;
}

export interface AuditLog {
  id: number;
  actor_id?: number;
  action: string;
  entity_type: string;
  entity_id: number;
  before_state_json?: Record<string, any>;
  after_state_json?: Record<string, any>;
  ip_address?: string;
  created_at: string;
  actor?: User;
}
