<?php

namespace App\Services\Wallet;

use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use App\Models\WithdrawalRequest;
use Exception;
use Illuminate\Support\Facades\DB;

class WalletLedgerService
{
    /**
     * Credit a wallet with atomic transaction and balance update.
     */
    public function credit(
        Wallet $wallet,
        int $amountCents,
        string $type,
        string $description,
        ?string $refType = null,
        ?int $refId = null,
        ?array $metadata = null
    ): WalletTransaction {
        if ($amountCents <= 0) {
            throw new Exception('Credit amount must be positive.');
        }

        return DB::transaction(function () use ($wallet, $amountCents, $type, $description, $refType, $refId, $metadata) {
            $lockedWallet = Wallet::where('id', $wallet->id)->lockForUpdate()->firstOrFail();

            $newBalance = $lockedWallet->available_balance_cents + $amountCents;
            $newLifetime = $lockedWallet->lifetime_earnings_cents + $amountCents;

            $lockedWallet->update([
                'available_balance_cents' => $newBalance,
                'lifetime_earnings_cents' => $newLifetime,
            ]);

            return WalletTransaction::create([
                'wallet_id' => $lockedWallet->id,
                'type' => $type,
                'amount_cents' => $amountCents,
                'balance_after_cents' => $newBalance,
                'currency' => $lockedWallet->currency,
                'reference_type' => $refType,
                'reference_id' => $refId,
                'description' => $description,
                'metadata_json' => $metadata,
                'created_at' => now(),
            ]);
        });
    }

    /**
     * Debit a wallet atomically ensuring non-negative balance.
     */
    public function debit(
        Wallet $wallet,
        int $amountCents,
        string $type,
        string $description,
        ?string $refType = null,
        ?int $refId = null,
        ?array $metadata = null
    ): WalletTransaction {
        if ($amountCents <= 0) {
            throw new Exception('Debit amount must be positive.');
        }

        return DB::transaction(function () use ($wallet, $amountCents, $type, $description, $refType, $refId, $metadata) {
            $lockedWallet = Wallet::where('id', $wallet->id)->lockForUpdate()->firstOrFail();

            if ($lockedWallet->available_balance_cents < $amountCents) {
                throw new Exception('Insufficient wallet balance.');
            }

            $newBalance = $lockedWallet->available_balance_cents - $amountCents;

            $lockedWallet->update([
                'available_balance_cents' => $newBalance,
            ]);

            return WalletTransaction::create([
                'wallet_id' => $lockedWallet->id,
                'type' => $type,
                'amount_cents' => -$amountCents, // Negative for ledger debit
                'balance_after_cents' => $newBalance,
                'currency' => $lockedWallet->currency,
                'reference_type' => $refType,
                'reference_id' => $refId,
                'description' => $description,
                'metadata_json' => $metadata,
                'created_at' => now(),
            ]);
        });
    }

    /**
     * Request a withdrawal, debiting available balance and moving to pending.
     */
    public function requestWithdrawal(
        User $user,
        int $amountCents,
        string $payoutMethod,
        array $payoutDetails
    ): WithdrawalRequest {
        $minWithdrawal = config('platform.minWithdrawalCents', 1000);
        if ($amountCents < $minWithdrawal) {
            throw new Exception("Minimum withdrawal amount is " . number_format($minWithdrawal / 100, 2) . " USD.");
        }

        return DB::transaction(function () use ($user, $amountCents, $payoutMethod, $payoutDetails) {
            $wallet = Wallet::firstOrCreate(
                ['user_id' => $user->id],
                ['currency' => 'USD', 'available_balance_cents' => 0]
            );

            $lockedWallet = Wallet::where('id', $wallet->id)->lockForUpdate()->firstOrFail();

            if ($lockedWallet->is_locked) {
                throw new Exception('Wallet is currently locked for compliance review.');
            }

            if ($lockedWallet->available_balance_cents < $amountCents) {
                throw new Exception('Insufficient available balance for withdrawal.');
            }

            // Move from available to pending
            $lockedWallet->decrement('available_balance_cents', $amountCents);
            $lockedWallet->increment('pending_balance_cents', $amountCents);

            $withdrawal = WithdrawalRequest::create([
                'wallet_id' => $lockedWallet->id,
                'user_id' => $user->id,
                'amount_cents' => $amountCents,
                'fee_cents' => 0, // Zero fee model
                'currency' => $lockedWallet->currency,
                'payout_method' => $payoutMethod,
                'payout_details_json' => $payoutDetails,
                'status' => 'requested',
            ]);

            WalletTransaction::create([
                'wallet_id' => $lockedWallet->id,
                'type' => 'withdrawal',
                'amount_cents' => -$amountCents,
                'balance_after_cents' => $lockedWallet->available_balance_cents,
                'currency' => $lockedWallet->currency,
                'reference_type' => WithdrawalRequest::class,
                'reference_id' => $withdrawal->id,
                'description' => "Withdrawal request via {$payoutMethod}",
                'metadata_json' => ['payout_method' => $payoutMethod],
                'created_at' => now(),
            ]);

            return $withdrawal;
        });
    }

    /**
     * Approve and mark withdrawal as paid.
     */
    public function approveWithdrawal(WithdrawalRequest $request, ?string $providerTxId = null): WithdrawalRequest
    {
        return DB::transaction(function () use ($request, $providerTxId) {
            $lockedRequest = WithdrawalRequest::where('id', $request->id)->lockForUpdate()->firstOrFail();
            if ($lockedRequest->status === 'paid') {
                return $lockedRequest;
            }

            $wallet = Wallet::where('id', $lockedRequest->wallet_id)->lockForUpdate()->firstOrFail();
            $wallet->decrement('pending_balance_cents', $lockedRequest->amount_cents);
            $wallet->increment('total_withdrawn_cents', $lockedRequest->amount_cents);

            $lockedRequest->update([
                'status' => 'paid',
                'processed_at' => now(),
                'provider_transaction_id' => $providerTxId ?? 'PAY_' . strtoupper(uniqid()),
            ]);

            return $lockedRequest;
        });
    }

    /**
     * Reject withdrawal and reverse funds to available balance.
     */
    public function rejectWithdrawal(WithdrawalRequest $request, string $reason): WithdrawalRequest
    {
        return DB::transaction(function () use ($request, $reason) {
            $lockedRequest = WithdrawalRequest::where('id', $request->id)->lockForUpdate()->firstOrFail();
            if ($lockedRequest->status === 'rejected' || $lockedRequest->status === 'paid') {
                return $lockedRequest;
            }

            $wallet = Wallet::where('id', $lockedRequest->wallet_id)->lockForUpdate()->firstOrFail();
            $wallet->decrement('pending_balance_cents', $lockedRequest->amount_cents);
            $wallet->increment('available_balance_cents', $lockedRequest->amount_cents);

            $lockedRequest->update([
                'status' => 'rejected',
                'admin_notes' => $reason,
                'processed_at' => now(),
            ]);

            WalletTransaction::create([
                'wallet_id' => $wallet->id,
                'type' => 'withdrawal_reversal',
                'amount_cents' => $lockedRequest->amount_cents,
                'balance_after_cents' => $wallet->available_balance_cents,
                'currency' => $wallet->currency,
                'reference_type' => WithdrawalRequest::class,
                'reference_id' => $lockedRequest->id,
                'description' => "Withdrawal reversal: {$reason}",
                'created_at' => now(),
            ]);

            return $lockedRequest;
        });
    }
}
