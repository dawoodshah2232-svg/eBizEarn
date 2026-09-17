# BizNetwork User Flows & Journey Specifications

This document defines the end-to-end user journeys for the four platform roles: **Contributor**, **Business / Advertiser**, **Moderator**, and **Super Admin**.

---

## 1. Contributor Journey (Earning & Payout Flow)

```mermaid
sequenceDiagram
    autonumber
    actor Contributor
    participant App as React Frontend
    participant API as Laravel Backend
    participant AI as AI Vision Service
    participant Ledger as Wallet Ledger

    Contributor->>App: Visit /register (Zero-Fee Guarantee)
    App->>API: POST /api/v1/auth/register
    API-->>App: Return User & Bearer Token
    Contributor->>App: Complete 5-Step Onboarding Wizard
    Contributor->>App: Browse /app/tasks (Filter by Category/Reward)
    Contributor->>App: Open /app/tasks/{id} (Task Guidelines)
    Contributor->>API: POST /api/v1/tasks/{id}/start (60m Reservation)
    Contributor->>App: Navigate to /app/tasks/{id}/submit
    Contributor->>App: Upload Screenshot Proof & Link
    App->>API: POST /api/v1/tasks/{id}/submit
    API->>AI: analyzeProof(Screenshot, OCR)
    AI-->>API: Confidence 93.00%, Tags: [social_post_detected]
    API-->>App: Submission Accepted (Pending / AI Pre-verified)
    Note over API,Ledger: Moderator or AI Auto-Approves
    API->>Ledger: creditTaskReward(ContributorId, +$0.50)
    Ledger-->>Contributor: Available Balance Updates: $28.40 -> $28.90
    Contributor->>App: Open /app/wallet
    Contributor->>API: POST /api/v1/wallet/withdraw ($25.00 via PayPal)
    API->>Ledger: holdFundsForWithdrawal($25.00)
    Ledger-->>Contributor: Payout Initiated (Processing Queue)
```

### Key Contributor Steps:
1. **Discovery & Onboarding**: Zero registration fees; clear expectations on task verification.
2. **Task Marketplace**: Large cards, transparent reward amounts (`+$0.40`, `+$0.50`), estimated completion minutes, and difficulty tags.
3. **Task Claim**: Locks task slot for 60 minutes to prevent race conditions.
4. **Proof Upload**: Client-side drag-and-drop file preview + live AI confidence badge.
5. **Wallet Ledger**: Real-time balance review with line-item ledger records (`balance_before_cents`, `balance_after_cents`).
6. **Withdrawal**: Minimum \$5.00 threshold; validated against available funds.

---

## 2. Business / Advertiser Journey (Campaign Creation & Escrow)

```mermaid
sequenceDiagram
    autonumber
    actor Business
    participant App as React Frontend
    participant API as Laravel Backend
    participant Escrow as Campaign Escrow

    Business->>App: Visit /business/campaigns/new
    Business->>App: Fill Campaign Details (Title, Description, Category)
    Business->>App: Set Reward ($0.50/task) & Target Slots (500)
    App->>App: Calculate Escrow ($250.00) + Platform Fee ($25.00) = $275.00
    Business->>App: Specify Proof Requirements (Screenshot + URL)
    Business->>API: POST /api/v1/business/campaigns
    API->>Escrow: Reserve Escrow Budget ($275.00)
    API-->>App: Campaign Live (#campaign-uuid)
    Business->>App: Monitor /business/dashboard (Slots claimed: 180 / 500)
    Business->>App: Review Contributor Submissions & Proofs
```

### Key Business Steps:
1. **6-Step Creation Wizard**: Title & Goal -> Category -> Task Reward & Volume -> Instructions -> Proof Rules -> Summary & Escrow.
2. **Transparent Fee Structure**: 10% platform fee added to total rewards; 100% money-back guarantee on unclaimed slots.
3. **Real-time Analytics**: Conversion rates, verified slots, pending reviews, and spend tracking.

---

## 3. Moderator Journey (Verification & Quality Control)

```mermaid
sequenceDiagram
    autonumber
    actor Moderator
    participant App as React Frontend
    participant API as Laravel Backend
    participant AI as AI Heuristic Results
    participant Ledger as Wallet Ledger

    Moderator->>App: Open /admin/verification-queue
    App->>API: GET /api/v1/admin/verification-queue
    API-->>App: Return Pending Submissions
    Moderator->>App: Click Submission #12 (Sarah Jenkins)
    App->>App: Display Side-by-Side: Proof Screenshot vs Campaign Rules
    App->>App: Display AI Confidence (93%) & Vision Heuristics
    alt Approve
        Moderator->>API: POST /api/v1/admin/submissions/12/decision { decision: 'approve' }
        API->>Ledger: Atomic Credit Task Reward
        API-->>App: Submission Marked Approved
    else Reject
        Moderator->>API: POST /api/v1/admin/submissions/12/decision { decision: 'reject', reason: 'Unreadable screenshot' }
        API-->>App: Slot Released Back to Campaign
    end
```

---

## 4. Super Admin Journey (Governance & System Control)

1. **Feature Flag Management**:
   - Access `/superadmin` -> Feature Flags.
   - Live toggle `crypto_payouts`, `multi_level_affiliate`, or `ai_auto_approval`.
   - Backend persists state to `feature_flags` table with immediate propagation.
2. **Platform Financial Settings**:
   - Adjust `min_withdrawal_cents`, `platform_fee_percent`, and daily payout caps.
3. **Security & Audit Logs**:
   - Inspect administrative actions, IP addresses, timestamp telemetry, and anomalous transactions.
