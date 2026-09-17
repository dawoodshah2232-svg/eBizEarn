<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\TaskAssignment;
use App\Models\TaskSubmission;
use App\Models\User;
use App\Models\Wallet;
use App\Services\Wallet\WalletLedgerService;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PlatformApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_brand_config_endpoint_returns_success(): void
    {
        $response = $this->getJson('/api/v1/config/brand');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'name' => 'BizNetwork',
                    'defaultCurrency' => 'USD',
                ],
            ]);
    }

    public function test_contributor_login_returns_token_and_wallet(): void
    {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'sarah@biznetwork.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'data' => [
                    'user' => ['id', 'email', 'name', 'role', 'wallet', 'profile'],
                    'token',
                ],
            ]);
    }

    public function test_tasks_list_returns_seeded_tasks(): void
    {
        $response = $this->getJson('/api/v1/tasks');

        $response->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonStructure(['data', 'meta']);

        $this->assertNotEmpty($response->json('data'));
    }

    public function test_wallet_ledger_atomic_credit_and_debit(): void
    {
        $user = User::where('email', 'sarah@biznetwork.com')->first();
        $wallet = $user->wallet;
        $initialBalance = $wallet->available_balance_cents;

        $service = new WalletLedgerService();

        // 1. Credit 500 cents ($5.00)
        $tx = $service->credit($wallet, 500, 'bonus', 'Test performance reward');
        $this->assertEquals($initialBalance + 500, $wallet->fresh()->available_balance_cents);
        $this->assertEquals(500, $tx->amount_cents);

        // 2. Debit 200 cents ($2.00)
        $debitTx = $service->debit($wallet, 200, 'admin_adjustment', 'Test adjustment');
        $this->assertEquals($initialBalance + 300, $wallet->fresh()->available_balance_cents);
        $this->assertEquals(-200, $debitTx->amount_cents);
    }

    public function test_admin_approves_submission_and_credits_contributor(): void
    {
        $admin = User::where('email', 'admin@biznetwork.com')->first();
        $submission = TaskSubmission::where('status', 'under_review')->first();
        $this->assertNotNull($submission);

        $contributor = $submission->user;
        $initialBalance = $contributor->wallet->available_balance_cents;
        $rewardCents = $submission->task->reward_cents;

        Sanctum::actingAs($admin);

        $response = $this->postJson("/api/v1/admin/submissions/{$submission->id}/decision", [
            'decision' => 'approved',
            'notes' => 'Proof verified thoroughly against official campaign criteria.',
        ]);

        $response->assertStatus(200)
            ->assertJson(['success' => true]);

        $this->assertEquals('approved', $submission->fresh()->status);
        $this->assertEquals($initialBalance + $rewardCents, $contributor->wallet->fresh()->available_balance_cents);
    }
}
