<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Enforce role-based access on API routes (server-side).
 *
 * Usage: ->middleware('role:admin') or ->middleware('role:contributor,business')
 *
 * The pseudo-role "admin" matches both "admin" and "superadmin".
 * Every other role name must match the user's role exactly.
 */
class EnsureRole
{
    /**
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $userRole = (string) $user->role;

        foreach ($roles as $role) {
            if ($role === 'admin' && in_array($userRole, ['admin', 'superadmin'], true)) {
                return $next($request);
            }

            if ($userRole === $role) {
                return $next($request);
            }
        }

        return response()->json(['message' => 'Forbidden. Insufficient role.'], 403);
    }
}
