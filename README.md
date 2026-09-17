# eBizEarn — Digital Task Marketplace & Distributed Marketing Platform
> Official Domain: [ebizearn.com](https://ebizearn.com)

[![Laravel 11](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

---

## 1. Executive Summary

**eBizEarn** (`ebizearn.com`) is an enterprise-grade digital task marketplace and distributed social marketing platform. It connects:
1. **Contributors / Digital Earners**: Individuals performing authentic micro-tasks (app reviews, social sharing, content engagement, community moderation) with **zero registration or unlock fees** and instant AI-assisted payouts.
2. **Businesses & Advertisers**: Brands looking for real, verifiable engagement, social proof, app testing, and word-of-mouth promotion with automated escrow budgets and fraud protection.
3. **Platform Moderators & Administrators**: Operating a high-throughput verification center with side-by-side screenshot proof analysis, automated AI confidence scoring (93%+ heuristic pass), duplicate submission detection, and double-entry financial ledger auditing.

---

## 2. Visual Identity & Design System Harmonization

BizNetwork strictly adheres to the approved reference design:
- **Primary Navy Brand**: `#07182F` (Deep Navy navigation bar, primary CTAs, dark accent banners)
- **Secondary Dark Tone**: `#0D2342` & `#040F1E`
- **Accent Electric Blue**: `#168BFF` (Primary highlights, action badges, active navigation links)
- **Secondary Royal Purple**: `#7257FF` (Gradients, secondary highlights, premium accents)
- **Success Mint**: `#16B364` (Verified payouts, positive balances, approvals)
- **Surface Neutrals**: `#F7F9FC` (Canvas background), `#FFFFFF` (Card surfaces with soft borders `#E4EAF2`)
- **Key Visual Elements**: Floating interactive badges (`+$0.50 Task Completed!`, `Your Balance $28.40`, `New Task Available +$0.40`), human hero photography, 4-step contributor flow, partner logos grid, and live role-switching switcher.

---

## 3. Technology Stack

### Backend
- **Framework**: PHP 8.2+ / Laravel 11.56 REST API (`/api/v1`)
- **Authentication**: Laravel Sanctum token-based authentication
- **Database**: SQLite (local development zero-config) / PostgreSQL & MySQL production-ready
- **Financial Architecture**: Double-entry immutable ledger (`wallets` and `wallet_transactions`), integer minor units (USD cents) to eliminate floating-point rounding errors
- **Services Architecture**:
  - `WalletLedgerService`: Atomic credits, debits, holds, withdrawals, and reversals
  - `AIProviderInterface` & `MockAIProvider`: Multi-signal AI vision verification simulation (93% confidence)
  - `FraudAnalysisService`: Velocity abuse checks, duplicate image hashes, and account clustering
  - `VerificationService`: Automated evaluation and manual moderation workflows

### Frontend
- **Framework**: React 19 / Vite 8 / TypeScript 5.8
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite`
- **Icons**: Lucide React
- **Data Fetching**: Axios API client + TanStack Query ready
- **Routing**: React Router DOM v7 with role-based route guards
- **Animation & Visuals**: Framer Motion subtle micro-interactions & Recharts analytics

---

## 4. Quickstart Guide

### Prerequisites
- PHP 8.2+ with `pdo_sqlite`, `curl`, `mbstring`, `fileinfo`, `openssl`, `sodium`
- Node.js 18+ & npm 9+
- Composer 2.x

### Backend Setup
```bash
cd backend

# 1. Install dependencies
composer install

# 2. Setup environment
cp .env.example .env

# 3. Generate application key
php artisan key:generate

# 4. Run migrations and seed demo data
php artisan migrate:fresh --seed

# 5. Run automated test suite
php artisan test

# 6. Start API server
php artisan serve --port=8000
```
API endpoints will be live at `http://127.0.0.1:8000/api/v1`.

### Frontend Setup
```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Build for production to verify TypeScript integrity
npm run build

# 3. Start development server
npm run dev
```
Frontend will be live at `http://localhost:5173`.

---

## 5. Demo Accounts & Seed Data

The platform comes pre-seeded with rich, realistic production-like data across all 4 personas:

| Persona | Email | Password | Role / Initial State |
| :--- | :--- | :--- | :--- |
| **Contributor** | `sarah@biznetwork.com` | `password123` | Active contributor with **$28.40** available balance, 12 completed tasks, 2 pending submissions in review. |
| **Business** | `brand@acme.com` | `password123` | Acme Growth Labs with 1 active campaign ($500.00 escrow budget, 500 slots, 180 claimed). |
| **Moderator** | `admin@biznetwork.com` | `password123` | Platform Moderator with access to the Verification Queue and Fraud Reports. |
| **Super Admin** | `superadmin@biznetwork.com` | `password123` | Platform CTO with access to Feature Flags, Platform Fee Settings, and Ledger Audit. |

> **Interactive Persona Switcher**: In the bottom-right corner of the frontend, click the floating **"Role Switcher"** widget to instantly switch between all four roles without typing credentials!

---

## 6. Project Structure

```
Biznetwork/
├── backend/
│   ├── app/
│   │   ├── Http/Controllers/Api/   # 7 API Controllers (Auth, Public, Contributor, Business, Admin)
│   │   ├── Models/                 # 18 Eloquent Models with typed relations
│   │   └── Services/               # WalletLedger, FraudAnalysis, Verification, AI Mock
│   ├── config/
│   │   └── platform.php            # Centralized brand, fee, payout, and feature configuration
│   ├── database/
│   │   ├── migrations/             # 23 strict schema migrations
│   │   └── seeders/                # Comprehensive DatabaseSeeder with realistic data
│   ├── routes/
│   │   └── api.php                 # 37 REST API routes under /api/v1
│   └── tests/Feature/              # Automated feature & ledger tests (100% pass)
│
├── frontend/
│   ├── src/
│   │   ├── api/                    # Axios client with bearer token interception
│   │   ├── brand.ts                # Central design tokens and brand constants
│   │   ├── components/common/      # Navbar, Footer, RoleSwitcher
│   │   ├── context/                # AuthContext with 1-click persona switching
│   │   ├── layouts/                # Contributor, Business, Admin layouts
│   │   ├── pages/
│   │   │   ├── public/             # HomePage, Tasks, HowItWorks, ForBusinesses, FAQ, Trust
│   │   │   ├── auth/               # Login, ContributorSignup, BusinessSignup, Onboarding
│   │   │   ├── contributor/        # Dashboard, TaskDetail, SubmitProof, Wallet, MyTasks, Referrals
│   │   │   ├── business/           # Dashboard, CreateCampaignWizard
│   │   │   └── admin/              # VerificationCenter, FraudPage, PayoutsPage, SuperAdminPage
│   │   └── types/                  # Strict TypeScript schemas
│   └── vite.config.ts              # Vite 8 with @tailwindcss/vite
│
└── docs/                           # 12 Comprehensive Engineering Specifications
    ├── ARCHITECTURE.md
    ├── DATABASE_SCHEMA.md
    ├── API_DOCUMENTATION.md
    ├── FRONTEND_ARCHITECTURE.md
    ├── BACKEND_ARCHITECTURE.md
    ├── USER_FLOWS.md
    ├── DESIGN_SYSTEM.md
    ├── SECURITY.md
    ├── DEPLOYMENT.md
    ├── INTEGRATIONS.md
    └── FEATURE_STATUS.md
```

---

## 7. Core Platform Principles

1. **Zero-Fee Contributor Guarantee**: Contributors NEVER pay to register, level up, or withdraw their honest earnings.
2. **Immutable Double-Entry Ledger**: Every balance mutation has an immutable transaction record with `balance_before_cents` and `balance_after_cents`.
3. **Automated AI Pre-Check**: Proof submissions are evaluated in real time with visual OCR and heuristic analysis yielding an automated confidence score (e.g. 93%).
4. **Transparent Feature Status**: All capabilities are explicitly categorized as **Real**, **Mocked External Integration**, or **Not Implemented** in `docs/FEATURE_STATUS.md`.
