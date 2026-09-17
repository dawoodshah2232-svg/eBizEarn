# BizNetwork REST API Documentation

- **Base URL**: `http://localhost:8000/api/v1` (Development) / `https://api.biznetwork.com/api/v1` (Production)
- **Protocol**: HTTP/1.1 or HTTP/2 over TLS
- **Format**: `application/json`
- **Authentication**: Laravel Sanctum Bearer Token (`Authorization: Bearer <token>`)

---

## 1. Response Standards

All API responses follow a uniform JSON envelope:

### Success Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully."
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Validation failed or resource not found.",
  "errors": {
    "field_name": [
      "The field_name is required."
    ]
  }
}
```

### HTTP Status Codes
- `200 OK`: Request succeeded.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Invalid request parameters.
- `401 Unauthorized`: Missing or invalid Bearer token.
- `403 Forbidden`: Authenticated user lacks permission.
- `404 Not Found`: Target entity does not exist.
- `422 Unprocessable Entity`: Input validation or business rule violation.
- `429 Too Many Requests`: Rate limit reached.
- `500 Internal Server Error`: Unhandled server exception.

---

## 2. Public Endpoints (No Auth Required)

### 2.1 Brand Configuration & Constants
`GET /config/brand`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "name": "BizNetwork",
      "tagline": "Connect. Complete Tasks. Grow Business.",
      "colors": {
        "primary_navy": "#07182F",
        "primary_blue": "#168BFF",
        "secondary_purple": "#7257FF",
        "accent_mint": "#16B364"
      },
      "zero_fee_guarantee": true,
      "currency": "USD"
    }
  }
  ```

### 2.2 Task Categories
`GET /task-categories`
- Returns all active categories with icon identifiers and task counts.

### 2.3 Task Marketplace Preview
`GET /tasks`
- Query Params: `category`, `difficulty`, `search`, `page`, `per_page`
- Returns paginated list of available tasks.

### 2.4 Task Details
`GET /tasks/{id}`
- Returns task specifications, step-by-step instructions, and proof requirements.

---

## 3. Authentication Endpoints

### 3.1 Register User
`POST /auth/register`
- **Body**:
  ```json
  {
    "name": "Sarah Jenkins",
    "email": "sarah@biznetwork.com",
    "password": "password123",
    "password_confirmation": "password123",
    "role": "contributor",
    "referral_code": "BIZREF99"
  }
  ```
- **Response**: Returns `user` object and Bearer `token`.

### 3.2 Login
`POST /auth/login`
- **Body**:
  ```json
  {
    "email": "sarah@biznetwork.com",
    "password": "password123"
  }
  ```
- **Response**: Returns `user`, `role`, `wallet` preview, and Bearer `token`.

### 3.3 Get Current Profile
`GET /auth/me` *(Requires Auth)*
- Returns full user profile, linked business, and wallet balance.

### 3.4 Logout
`POST /auth/logout` *(Requires Auth)*
- Revokes the current Sanctum access token.

---

## 4. Contributor Endpoints

### 4.1 Contributor Dashboard
`GET /contributor/dashboard`
- Returns available balance, pending rewards, today's earnings, and recommended tasks.

### 4.2 My Assigned Tasks
`GET /contributor/my-tasks`
- Query Params: `status` (`in_progress`, `submitted`, `completed`)
- Returns contributor assignments and current verification statuses.

### 4.3 Start / Claim Task
`POST /tasks/{id}/start`
- Creates a `task_assignment` record with a 60-minute countdown expiration.

### 4.4 Submit Proof
`POST /tasks/{id}/submit`
- **Body**:
  ```json
  {
    "proof_url": "https://facebook.com/groups/post/123456",
    "proof_notes": "Completed post and shared screenshot evidence",
    "proof_file": "<multipart-file-upload>"
  }
  ```
- Triggers `MockAIProvider` analysis yielding automated confidence score and tags.

### 4.5 Wallet Balance & Ledger
`GET /wallet`
- Returns `available_balance_cents`, `pending_balance_cents`, `lifetime_earnings_cents`.

### 4.6 Wallet Transactions Ledger
`GET /wallet/transactions`
- Returns chronological double-entry records with before/after balances.

### 4.7 Request Payout / Withdrawal
`POST /wallet/withdraw`
- **Body**:
  ```json
  {
    "amount_cents": 2500,
    "payout_method": "paypal",
    "payout_details": {
      "paypal_email": "sarah@biznetwork.com"
    }
  }
  ```

### 4.8 Referral Network
`GET /contributor/referrals`
- Returns referral code, share URL, referral count, and earned bonuses.

---

## 5. Business / Advertiser Endpoints

### 5.1 Business Dashboard
`GET /business/dashboard`
- Returns active campaigns, total budget spent, verified submissions, and escrow remaining.

### 5.2 List Campaigns
`GET /business/campaigns`
- Returns campaigns authored by the authenticated business user.

### 5.3 Create Campaign
`POST /business/campaigns`
- **Body**:
  ```json
  {
    "title": "Boost Android App Reviews & Ratings",
    "description": "Download and write genuine feedback for Acme App",
    "category_id": 1,
    "reward_per_task_cents": 50,
    "slots_total": 500,
    "platform_fee_cents": 2500,
    "budget_total_cents": 27500,
    "instructions": [
      "Install app from store",
      "Test features for 3 minutes",
      "Leave positive 5-star rating"
    ],
    "proof_requirements": {
      "screenshot_required": true,
      "url_required": false
    }
  }
  ```

### 5.4 Campaign Status Update
`PATCH /business/campaigns/{id}/status`
- **Body**: `{ "status": "paused" }` or `{ "status": "active" }`

### 5.5 Business Campaign Submissions
`GET /business/submissions`
- Review all contributor submissions across active campaigns.

---

## 6. Admin & Super Admin Endpoints

### 6.1 Verification Queue
`GET /admin/verification-queue`
- Query Params: `status` (`pending`, `ai_verified`, `flagged`), `category_id`

### 6.2 Submission Detail & AI Analysis
`GET /admin/submissions/{id}`
- Returns contributor proof, screenshot URL, and AI heuristics score (e.g. 93%).

### 6.3 Moderation Decision
`POST /admin/submissions/{id}/decision`
- **Body**:
  ```json
  {
    "decision": "approve",
    "rejection_reason": null,
    "admin_notes": "Screenshot authentic and verified"
  }
  ```
- If approved, atomically triggers `WalletLedgerService` crediting contributor.

### 6.4 Fraud Alerts Stream
`GET /admin/fraud-alerts`
- Returns flagged submissions, duplicate image hashes, and rapid velocity incidents.

### 6.5 Payouts Processing
`GET /admin/payouts`
`POST /admin/payouts/{id}/process`
- **Body**: `{ "action": "approve" }` or `{ "action": "reject", "reason": "Invalid IBAN" }`

### 6.6 Feature Flags (Super Admin)
`GET /admin/feature-flags`
`PATCH /admin/feature-flags/{key}`
- Toggle platform subsystems (e.g., `multi_level_affiliate`, `crypto_payouts`).

### 6.7 System Audit Logs
`GET /admin/audit-logs`
- Full administrative audit trail with IP address and timestamp telemetry.
