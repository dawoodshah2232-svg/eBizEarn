# BizNetwork External Integrations Architecture

BizNetwork isolates third-party integrations behind strict contracts and interfaces, allowing the platform to run seamlessly in development/mock mode and switch to live third-party services via configuration.

---

## 1. AI Vision & Verification Integration

### Current Status: **Mocked External Integration (High-Fidelity Service Contract)**

BizNetwork abstracts AI visual verification behind `App\Services\AI\AIProviderInterface`. The active provider is determined via `config('platform.ai_provider')`.

```php
namespace App\Services\AI;

use App\Models\TaskSubmission;

interface AIProviderInterface
{
    /**
     * Inspects submitted screenshot proof and URL.
     * Returns structured signals and confidence score.
     */
    public function analyzeProof(TaskSubmission $submission, ?string $filePath): array;
}
```

### Production Upgrade Paths:

#### Option A: Google Cloud Vision API
- **Capabilities**: Document Text Detection (OCR), SafeSearch Moderation, Web Detection.
- **Integration Class**: `App\Services\AI\GoogleVisionProvider`
- **Config**:
  ```env
  GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
  ```

#### Option B: OpenAI GPT-4o / Gemini Flash Vision API
- **Capabilities**: Zero-shot semantic prompt verification (e.g. "Does this screenshot prove the user posted in the Dubai Real Estate Facebook group with the specified message?").
- **Integration Class**: `App\Services\AI\OpenAIVisionProvider`
- **Config**:
  ```env
  OPENAI_API_KEY=sk-...
  AI_MODEL=gpt-4o-mini
  ```

---

## 2. Payment & Payout Gateways

### Current Status: **Mocked External Integration (Ledger Ready)**

The internal financial ledger (`WalletLedgerService`) models double-entry balances, holds, and state transitions. External gateway adapters connect to the ledger events:

### 2.1 Advertiser Funding (Inbound Escrow)
- **Stripe Payment Intents**:
  - Webhook listener receives `payment_intent.succeeded`.
  - Credits advertiser business wallet and transitions campaign from `pending_funding` to `active`.
  - SDK: `stripe/stripe-php`

### 2.2 Contributor Withdrawals (Outbound Payouts)
- **PayPal Payouts REST API**:
  - Endpoint: `POST /v1/payments/payouts`
  - Automated batch payouts triggered on moderator approval.
  - Webhooks: `PAYMENT.PAYOUTS-ITEM.SUCCEEDED`, `PAYMENT.PAYOUTS-ITEM.FAILED`.
- **Wise (formerly TransferWise)**:
  - Used for zero-fee international borderless bank transfers.
  - Profiles created via Wise Recipient API.
- **Crypto USDT (TRC-20 / ERC-20)**:
  - Integration with automated hot wallet infrastructure (Tatum or Fireblocks).
  - Feature-flagged behind `crypto_payouts`.

---

## 3. Cloud File Storage

### Current Status: **Local Disk / S3 Compatible**

Proof screenshots and campaign creative assets are stored via Laravel's `Storage` facade:
```env
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=YOUR_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=biznetwork-proofs
AWS_USE_PATH_STYLE_ENDPOINT=false
```
All uploads are hashed with SHA-256 upon receipt for deduplication and fraud analysis.

---

## 4. Notifications & Communications

- **Transactional Email**: Resend or Amazon SES for onboarding confirmations, verification decisions, and withdrawal alerts.
- **SMS Two-Factor Authentication**: Twilio SMS Verify API for high-value contributor cashouts.
