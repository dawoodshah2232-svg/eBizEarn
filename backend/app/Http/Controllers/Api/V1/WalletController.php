<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Referral;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use App\Services\Wallet\WalletLedgerService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WalletController extends Controller
{
    public function __construct(
        protected WalletLedgerService $ledgerService = new WalletLedgerService()
    ) {}

    /**
     * Get wallet details and balance breakdown.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $wallet = Wallet::firstOrCreate(
            ['user_id' => $user->id],
            ['currency' => 'USD', 'available_balance_cents' => 0]
        );

        return response()->json([
            'success' => true,
            'data' => [
                'wallet' => $wallet,
                'min_withdrawal_cents' => (int) config('platform.minWithdrawalCents', 1000),
            ],
        ]);
    }

    /**
     * Get immutable ledger transactions with pagination.
     */
    public function transactions(Request $request): JsonResponse
    {
        $user = $request->user();
        $wallet = $user->wallet;

        if (!$wallet) {
            return response()->json(['success' => true, 'data' => []]);
        }

        $query = WalletTransaction::where('wallet_id', $wallet->id);

        if ($request->filled('type')) {
            $query->where('type', $request->input('type'));
        }

        $transactions = $query->latest('created_at')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $transactions->items(),
            'meta' => [
                'current_page' => $transactions->currentPage(),
                'last_page' => $transactions->lastPage(),
                'total' => $transactions->total(),
            ],
        ]);
    }

    /**
     * Submit a withdrawal request.
     */
    public function withdraw(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'amount_cents' => 'required|integer|min:1000',
            'payout_method' => 'required|in:bank_transfer,paypal,wise,crypto',
            'payout_details' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $withdrawal = $this->ledgerService->requestWithdrawal(
                $request->user(),
                (int) $request->input('amount_cents'),
                $request->input('payout_method'),
                $request->input('payout_details')
            );

            return response()->json([
                'success' => true,
                'message' => 'Withdrawal request submitted successfully.',
                'data' => $withdrawal,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get user referral statistics and referral list.
     */
    public function referrals(Request $request): JsonResponse
    {
        $user = $request->user();
        $referrals = Referral::with('referredUser.profile')
            ->where('referrer_id', $user->id)
            ->latest()
            ->get();

        $totalEarnedCents = WalletTransaction::where('wallet_id', $user->wallet?->id)
            ->where('type', 'referral_reward')
            ->sum('amount_cents');

        $qualifiedCount = $referrals->where('status', 'rewarded')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'referral_code' => $user->referral_code,
                'referral_link' => config('platform.domain') . '/signup/contributor?ref=' . $user->referral_code,
                'total_referred' => $referrals->count(),
                'qualified_referrals' => $qualifiedCount,
                'total_earned_cents' => $totalEarnedCents,
                'reward_per_referral_cents' => 100, // $1.00 per qualified friend
                'referrals' => $referrals,
            ],
        ]);
    }
}
