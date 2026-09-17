<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Profile;
use App\Models\Referral;
use App\Models\User;
use App\Models\Wallet;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Register a new Contributor or Business account.
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:contributor,business',
            'country_code' => 'nullable|string|max:4',
            'referral_code' => 'nullable|string|max:32',
            'company_name' => 'required_if:role,business|nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        // Check referrer
        $referrer = null;
        if (!empty($validated['referral_code'])) {
            $referrer = User::where('referral_code', strtoupper($validated['referral_code']))->first();
        }

        $user = User::create([
            'uuid' => (string) Str::uuid(),
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'status' => 'active',
            'referrer_id' => $referrer?->id,
            'email_verified_at' => now(), // Demo/default verified
        ]);

        // Create Profile
        Profile::create([
            'user_id' => $user->id,
            'country_code' => $validated['country_code'] ?? 'AE',
            'language' => 'en',
            'contributor_level' => 'starter',
            'fraud_score' => 0,
        ]);

        // Create Wallet
        $wallet = Wallet::create([
            'user_id' => $user->id,
            'currency' => 'USD',
            'available_balance_cents' => 0,
            'pending_balance_cents' => 0,
            'lifetime_earnings_cents' => 0,
            'total_withdrawn_cents' => 0,
        ]);

        // Create Business profile if business role
        if ($user->role === 'business') {
            Business::create([
                'owner_id' => $user->id,
                'company_name' => $validated['company_name'] ?? $user->name . ' Co',
                'status' => 'active',
            ]);
        }

        // Track referral if applicable
        if ($referrer) {
            Referral::create([
                'referrer_id' => $referrer->id,
                'referred_user_id' => $user->id,
                'status' => 'pending',
                'reward_cents' => 100, // $1.00
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'data' => [
                'user' => $user->load(['profile', 'wallet', 'business']),
                'token' => $token,
            ],
        ], 201);
    }

    /**
     * Log in with credentials and return token & full state.
     */
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password.',
            ], 401);
        }

        if ($user->status === 'suspended') {
            return response()->json([
                'success' => false,
                'message' => 'Your account has been suspended for compliance review. Contact support@biznetwork.com.',
            ], 403);
        }

        // Revoke older tokens if needed
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $user->load(['profile', 'wallet', 'business']),
                'token' => $token,
            ],
        ]);
    }

    /**
     * Log out and revoke current token.
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }

    /**
     * Get current authenticated user profile.
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'user' => $request->user()->load(['profile', 'wallet', 'business']),
            ],
        ]);
    }
}
