import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '../types';
import { api } from '../api/client';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  updateWalletBalance: (newBalanceCents: number) => void;
  creditWallet: (amountCents: number) => void;
  updateKycStatus: (status: 'unverified' | 'pending' | 'verified' | 'rejected') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default realistic demo accounts matching the database seeders
const DEMO_USERS: Record<UserRole, User> = {
  contributor: {
    id: 1,
    uuid: 'c0000000-0000-0000-0000-000000000001',
    name: 'Sarah Jenkins',
    email: 'sarah@ebiznetwork.com',
    role: 'contributor',
    status: 'active',
    referral_code: 'SARAH26',
    profile: {
      id: 1,
      user_id: 1,
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      country_code: 'AE',
      city: 'Dubai',
      language: 'en',
      bio: 'Verified digital task contributor & creator.',
      contributor_level: 'trusted',
      fraud_score: 2,
      completed_tasks_count: 12,
      approval_rate: 98.5,
      interests_json: ['social', 'app-testing', 'survey', 'reviews'],
      kyc_status: 'pending',
      kyc_document_type: 'emirates_id',
      kyc_submitted_at: '2026-09-17T12:00:00Z',
    },
    wallet: {
      id: 1,
      user_id: 1,
      currency: 'AED',
      available_balance_cents: 10450, // AED 104.50
      pending_balance_cents: 1650,    // AED 16.50
      lifetime_earnings_cents: 44000, // AED 440.00
      total_withdrawn_cents: 33550,   // AED 335.50
      is_locked: false,
    },
  },
  business: {
    id: 2,
    uuid: 'b0000000-0000-0000-0000-000000000002',
    name: 'Alexandre Dubois',
    email: 'brand@acme.com',
    role: 'business',
    status: 'active',
    business: {
      id: 1,
      uuid: 'biz-acme-001',
      owner_id: 2,
      company_name: 'Acme Growth Labs',
      website: 'https://acme.example.com',
      industry: 'Consumer Tech & SaaS',
      billing_email: 'billing@acme.example.com',
      status: 'active',
    },
  },
  admin: {
    id: 3,
    uuid: 'a0000000-0000-0000-0000-000000000003',
    name: 'Platform Moderator',
    email: 'admin@biznetwork.com',
    role: 'admin',
    status: 'active',
  },
  superadmin: {
    id: 4,
    uuid: 's0000000-0000-0000-0000-000000000004',
    name: 'Chief Technology Officer',
    email: 'superadmin@biznetwork.com',
    role: 'superadmin',
    status: 'active',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedRole = (localStorage.getItem('biznetwork_active_role') as UserRole) || 'contributor';
    const savedUser = localStorage.getItem(`biznetwork_user_${savedRole}`);
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        // fallback
      }
    }
    return DEMO_USERS[savedRole] || DEMO_USERS.contributor;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('biznetwork_token') || 'demo_token');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const role: UserRole = user?.role || 'contributor';

  // Persist updated user state per role
  const updateAndPersistUser = (updatedUser: User | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem(`biznetwork_user_${updatedUser.role}`, JSON.stringify(updatedUser));
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Attempt real Laravel API login
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success && res.data.data.user) {
        updateAndPersistUser(res.data.data.user);
        setToken(res.data.data.token);
        localStorage.setItem('biznetwork_token', res.data.data.token);
        localStorage.setItem('biznetwork_active_role', res.data.data.user.role);
        setIsLoading(false);
        return true;
      }
    } catch {
      // Fallback to demo accounts for testing matching email
      const matched = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        updateAndPersistUser(matched);
        setToken('demo_token');
        localStorage.setItem('biznetwork_active_role', matched.role);
        setIsLoading(false);
        return true;
      }
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    try {
      api.post('/auth/logout').catch(() => {});
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('biznetwork_token');
    }
  };

  const switchRole = (newRole: UserRole) => {
    const savedUser = localStorage.getItem(`biznetwork_user_${newRole}`);
    let selected = DEMO_USERS[newRole];
    if (savedUser) {
      try {
        selected = JSON.parse(savedUser);
      } catch {
        // fallback
      }
    }
    updateAndPersistUser(selected);
    localStorage.setItem('biznetwork_active_role', newRole);
  };

  const updateWalletBalance = (newBalanceCents: number) => {
    if (user && user.wallet) {
      const updated: User = {
        ...user,
        wallet: {
          ...user.wallet,
          available_balance_cents: newBalanceCents,
        },
      };
      updateAndPersistUser(updated);
    }
  };

  const creditWallet = (amountCents: number) => {
    if (user && user.wallet) {
      const updated: User = {
        ...user,
        profile: user.profile
          ? {
              ...user.profile,
              completed_tasks_count: (user.profile.completed_tasks_count || 0) + 1,
            }
          : undefined,
        wallet: {
          ...user.wallet,
          available_balance_cents: (user.wallet.available_balance_cents || 0) + amountCents,
          lifetime_earnings_cents: (user.wallet.lifetime_earnings_cents || 0) + amountCents,
        },
      };
      updateAndPersistUser(updated);
    }
  };

  const updateKycStatus = (status: 'unverified' | 'pending' | 'verified' | 'rejected') => {
    if (user) {
      const updated: User = {
        ...user,
        profile: user.profile
          ? {
              ...user.profile,
              kyc_status: status,
              kyc_verified_at: status === 'verified' ? new Date().toISOString() : undefined,
            }
          : undefined,
      };
      updateAndPersistUser(updated);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isLoading,
        login,
        logout,
        switchRole,
        updateWalletBalance,
        creditWallet,
        updateKycStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
