# BizNetwork Security & Trust Specification

## 1. Security Philosophy & Threat Model

BizNetwork operates in an environment where financial incentives attract malicious actors seeking to game proof submissions, execute automated velocity attacks, exploit referral loops, or attempt unauthorized ledger modifications. This specification establishes the defense-in-depth architecture protecting contributors, businesses, and platform solvency.

---

## 2. Zero-Fee Contributor Guarantee Enforcement

BizNetwork firmly enforces a **Zero-Fee Policy** for all contributors:
- **No Registration Fees**: Account creation is 100% free.
- **No Pay-to-Work Schemes**: Contributors are never charged to unlock higher-tier tasks, view earnings, or upgrade status.
- **No Withdrawal Penalties**: Contributor withdrawals are processed without administrative deduction penalties.
- **Code Enforcement**: In `WalletLedgerService`, debit operations targeting contributor accounts for administrative access are programmatically rejected:
  ```php
  if ($user->role === 'contributor' && in_array($transactionType, ['membership_fee', 'tier_unlock'])) {
      throw new SecurityException("Violation of Contributor Zero-Fee Guarantee.");
  }
  ```

---

## 3. Financial Ledger Integrity & Anti-Tampering

1. **Pessimistic Concurrency Control**:
   Every balance alteration utilizes database row locking (`lockForUpdate()`) within an atomic transaction. This prevents concurrent race conditions (e.g. attempting two simultaneous withdrawals from the same balance).
2. **Double-Entry Balance Invariant**:
   Every transaction records:
   $$\text{balance\_after} = \text{balance\_before} \pm \text{amount}$$
   Any deviation raises an unrecoverable exception, aborting the transaction before commit.
3. **Idempotency Keys**:
   All reward crediting events generate a unique SHA-256 idempotency key:
   $$\text{Key} = \text{hash}(\text{submission\_id} + \text{user\_id} + \text{task\_id})$$
   Attempting to credit the same submission twice is blocked by a unique database constraint.
4. **Integer Cents Precision**:
   Monetary amounts are stored as integers (`BIGINT` cents), eliminating precision leakage from floating-point arithmetic.

---

## 4. Authentication & Authorization (RBAC)

- **Sanctum Token Authentication**: Cryptographically signed personal access tokens hashed with SHA-256.
- **Role Hierarchy**:
  - `contributor`: Restricted to browsing tasks, submitting proofs, viewing personal wallet, and requesting payouts.
  - `business`: Restricted to funding campaigns, viewing campaign analytics, and reviewing applicant proofs.
  - `moderator`: Restricted to the Verification Center and Fraud Reports queue.
  - `admin` / `superadmin`: Access to feature toggles, platform fees, user suspension, and global audit logs.
- **Route Protection**: Enforced server-side via Laravel middleware (`auth:sanctum` and role checks).

---

## 5. Fraud Prevention & Abuse Detection

### 5.1 Duplicate Proof Detection
- Upon proof upload, the system calculates a SHA-256 content checksum and perceptual hash (`file_hash`).
- If an identical hash was previously submitted (by the same user or a colluding account), the submission is flagged as `duplicate_proof` and blocked from auto-approval.

### 5.2 Velocity & Time-to-Complete Anomaly Checks
- Each task defines an `estimated_minutes` parameter.
- If a contributor submits proof in $< 25\%$ of the estimated duration (e.g., submitting a 10-minute task in 15 seconds), the submission is automatically flagged as `velocity_abuse`.

### 5.3 Sybil & Device Clustering
- Contributor IP addresses and User-Agent headers are logged with each submission.
- Multiple accounts submitting proofs from identical IP/device footprints trigger automatic manual review.

---

## 6. Input Validation & Web Application Defense

- **SQL Injection**: Prevented universally via Laravel Eloquent ORM and PDO parameter binding. Raw unparameterized queries are forbidden.
- **Cross-Site Scripting (XSS)**: React 19 escapes rendered HTML by default. Proof notes and instructions are sanitized before output.
- **Cross-Origin Resource Sharing (CORS)**: API CORS policies strictly whitelist verified frontend domains:
  ```php
  'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')],
  'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  ```
- **Rate Limiting**:
  - Public endpoints: 60 requests per minute per IP.
  - Authentication (`/auth/login`, `/auth/register`): 10 requests per minute.
  - Proof submissions: 15 requests per minute.
  - Withdrawal requests: 5 requests per hour.
