import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  ShieldCheck,
  ShieldAlert,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  DollarSign,
  Ban,
  UserCheck,
  X,
  Save,
  FileCheck2,
  ExternalLink,
  Sparkles,
  Camera,
  CreditCard,
  MapPin,
  Wifi,
  Globe,
  MonitorSmartphone,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformDataContext';
import { useAuth } from '../../context/AuthContext';

export const AdminUsersPage: React.FC = () => {
  const { user } = useAuth();
  const { verifyUserKyc, payouts } = usePlatform();

  const [roleFilter, setRoleFilter] = useState<'all' | 'contributor' | 'business' | 'pending_kyc' | 'banned'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [kycActionNotice, setKycActionNotice] = useState<string | null>(null);

  // Active KYC Verification Queue
  const [pendingKycList, setPendingKycList] = useState([
    {
      id: 10,
      userIdStr: 'USR-1001',
      name: user?.name || 'Sarah Jenkins',
      email: user?.email || 'sarah@ebiznetwork.com',
      avatar: user?.profile?.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
      docType: 'Emirates ID (Front & Back)',
      docNumber: '784-1996-8219412-1',
      submittedAt: '12 mins ago',
      livenessScore: '99.4%',
      antiSpoof: 'Passed (3D Depth Verified)',
      ocrStatus: 'Auto-Matched to CBUAE Registry',
      region: 'Dubai, UAE 🇦🇪',
      workLocation: 'Downtown Dubai / Business Bay 🇦🇪',
      ipAddress: '86.96.128.45',
      isp: 'Du Telecom (Residential FTTH)',
      device: 'Chrome 124 on macOS Sonoma',
      geofenceStatus: 'Verified In-Zone (GPS & IP matched)',
      walletBalanceAED: (user?.wallet?.available_balance_cents ? user.wallet.available_balance_cents / 100 : 104.50).toFixed(2),
    },
    {
      id: 6190,
      userIdStr: 'USR-6190',
      name: 'Elena Rostova',
      email: 'elena.rostova@test.de',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
      docType: 'Passport + UAE Residence Visa',
      docNumber: 'P8192041 / UID-981240',
      submittedAt: '35 mins ago',
      livenessScore: '98.1%',
      antiSpoof: 'Passed',
      ocrStatus: 'OCR Validated',
      status: 'Pending Review',
      region: 'Abu Dhabi, UAE 🇦🇪',
      workLocation: 'Al Corniche, Abu Dhabi 🇦🇪',
      ipAddress: '94.200.15.88',
      isp: 'Etisalat e& 5G Mobile',
      device: 'Safari on iPhone 15 Pro',
      geofenceStatus: 'Verified In-Zone',
      walletBalanceAED: '52.10',
    },
    {
      id: 4102,
      userIdStr: 'USR-4102',
      name: 'Tariq Al-Mansoor',
      email: 'tariq.m@ebiznetwork.ae',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
      docType: 'Emirates ID (National Identity)',
      docNumber: '784-1992-1094821-3',
      submittedAt: '1 hour ago',
      livenessScore: '99.7%',
      antiSpoof: 'Passed (Biometric Verified)',
      ocrStatus: 'CBUAE Registry Verified',
      status: 'Pending Review',
      region: 'Sharjah, UAE 🇦🇪',
      workLocation: 'Al Majaz Waterfront, Sharjah 🇦🇪',
      ipAddress: '178.135.92.10',
      isp: 'Du Telecom (Home Broadband)',
      device: 'Edge on Windows 11',
      geofenceStatus: 'Verified In-Zone',
      walletBalanceAED: '84.00',
    },
  ]);

  const [users, setUsers] = useState([
    {
      id: 'USR-1001',
      rawId: 10,
      name: user?.name || 'Sarah Jenkins',
      email: user?.email || 'sarah@ebiznetwork.com',
      role: 'Contributor',
      tier: 'Level 3 Pro Contributor',
      status: 'Active',
      statusColor: 'bg-emerald-50 text-[#16B364] border-emerald-200',
      balance: `AED ${(user?.wallet?.available_balance_cents ? user.wallet.available_balance_cents / 100 : 104.50).toFixed(2)}`,
      lifetimeEarnings: 'AED 5,210.00',
      kyc: user?.profile?.kyc_status === 'verified' ? 'Emirates ID Verified' : 'Pending Review',
      riskScore: 'Low (0.01)',
      country: '🇦🇪 UAE',
      workLocation: 'Downtown Dubai / Business Bay 🇦🇪',
      ipAddress: '86.96.128.45',
      isp: 'Du Telecom UAE',
      device: 'Chrome 124 / macOS Sonoma',
      geofenceStatus: 'In-Zone (Target Perimeter Passed)',
      joined: 'Jan 12, 2026',
    },
    {
      id: 'USR-7734',
      rawId: 7734,
      name: 'Acme Brands Inc. (Alex J.)',
      email: 'alex@acmebrands.com',
      role: 'Business',
      tier: 'Enterprise Client',
      status: 'Active',
      statusColor: 'bg-emerald-50 text-[#16B364] border-emerald-200',
      balance: 'AED 10,420.00',
      lifetimeEarnings: 'AED 53,200.00 Spent',
      kyc: 'Verified (UAE TRN: 100293810)',
      riskScore: 'Low (0.01)',
      country: '🇦🇪 UAE',
      workLocation: 'Dubai Internet City, Dubai 🇦🇪',
      ipAddress: '194.170.82.14',
      isp: 'Etisalat e& Dedicated Fiber',
      device: 'Edge 123 / Windows 11 Enterprise',
      geofenceStatus: 'Enterprise HQ In-Zone',
      joined: 'Feb 04, 2026',
    },
    {
      id: 'USR-6190',
      rawId: 6190,
      name: 'Elena Rostova',
      email: 'elena.rostova@test.de',
      role: 'Contributor',
      tier: 'Level 2 Verified',
      status: 'Active',
      statusColor: 'bg-emerald-50 text-[#16B364] border-emerald-200',
      balance: 'AED 52.10',
      lifetimeEarnings: 'AED 1,800.00',
      kyc: 'Pending Review',
      riskScore: 'Low (0.05)',
      country: '🇦🇪 UAE',
      workLocation: 'Al Corniche, Abu Dhabi 🇦🇪',
      ipAddress: '94.200.15.88',
      isp: 'Etisalat e& 5G',
      device: 'Mobile Safari / iOS 17.4',
      geofenceStatus: 'In-Zone (Abu Dhabi Passed)',
      joined: 'Mar 18, 2026',
    },
    {
      id: 'USR-4102',
      rawId: 4102,
      name: 'Tariq Al-Mansoor',
      email: 'tariq.m@ebiznetwork.ae',
      role: 'Contributor',
      tier: 'Level 3 Pro',
      status: 'Active',
      statusColor: 'bg-emerald-50 text-[#16B364] border-emerald-200',
      balance: 'AED 84.00',
      lifetimeEarnings: 'AED 3,450.00',
      kyc: 'Pending Review',
      riskScore: 'Low (0.02)',
      country: '🇦🇪 UAE',
      workLocation: 'Al Majaz, Sharjah 🇦🇪',
      ipAddress: '178.135.92.10',
      isp: 'Du Telecom FTTH',
      device: 'Edge / Windows 11',
      geofenceStatus: 'In-Zone (Sharjah Passed)',
      joined: 'Mar 22, 2026',
    },
    {
      id: 'USR-9021',
      rawId: 9021,
      name: 'Spam Bot Syndicate 41',
      email: 'proxy98@tempmail.io',
      role: 'Contributor',
      tier: 'Starter',
      status: 'Banned',
      statusColor: 'bg-red-50 text-red-700 border-red-200',
      balance: 'AED 0.00',
      lifetimeEarnings: 'AED 0.00',
      kyc: 'Rejected',
      riskScore: 'Critical (0.98)',
      country: '🌐 Proxy / VPN',
      workLocation: 'Unknown / Datacenter Node',
      ipAddress: '185.220.101.5',
      isp: 'M247 Ltd Tor Exit Node',
      device: 'Headless Chrome / Linux',
      geofenceStatus: 'Spoofed / Blacklisted Proxy',
      joined: 'Apr 02, 2026',
    },
  ]);

  const handleApproveKyc = (userId: number, userName: string) => {
    verifyUserKyc(userId, 'approved');
    setPendingKycList((prev) =>
      prev.map((k) => (k.id === userId ? { ...k, status: 'Verified' } : k))
    );
    setUsers((prev) =>
      prev.map((u) =>
        u.rawId === userId || u.name.includes(userName)
          ? { ...u, kyc: 'Emirates ID Verified' }
          : u
      )
    );
    setKycActionNotice(`KYC successfully approved for ${userName}. Withdrawal lock released & WPS enabled.`);
    setTimeout(() => setKycActionNotice(null), 5000);
  };

  const handleRejectKyc = (userId: number, userName: string) => {
    verifyUserKyc(userId, 'rejected');
    setPendingKycList((prev) =>
      prev.map((k) => (k.id === userId ? { ...k, status: 'Rejected' } : k))
    );
    setUsers((prev) =>
      prev.map((u) =>
        u.rawId === userId || u.name.includes(userName)
          ? { ...u, kyc: 'Rejected' }
          : u
      )
    );
    setKycActionNotice(`KYC rejected for ${userName}. Notification sent requesting clear Emirates ID scan.`);
    setTimeout(() => setKycActionNotice(null), 5000);
  };

  const handleToggleBan = (userId: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === userId) {
          const next = u.status === 'Banned' ? 'Active' : 'Banned';
          return {
            ...u,
            status: next,
            statusColor: next === 'Banned' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-[#16B364] border-emerald-200',
          };
        }
        return u;
      })
    );
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole =
      roleFilter === 'all'
        ? true
        : roleFilter === 'banned'
        ? u.status === 'Banned'
        : roleFilter === 'pending_kyc'
        ? u.kyc.toLowerCase().includes('pending')
        : u.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. HEADER & KPI
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            User Governance &amp; KYC Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Audit contributors, business clients, UAE Emirates ID verifications, and regulatory payout compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-[#16B364] border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16B364] animate-pulse" />
            <span>UAE Regional Vault (AED 🇦🇪)</span>
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#168BFF] border border-blue-100 text-xs font-bold">
            Total Users: 528,490
          </span>
        </div>
      </div>

      {kycActionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#16B364] shrink-0" />
          <span>{kycActionNotice}</span>
        </div>
      )}

      {/* =========================================================================
          1.5 DEDICATED UAE KYC IDENTITY COMPLIANCE QUEUE
         ========================================================================= */}
      <div className="bg-gradient-to-br from-[#07182F] via-[#0A2244] to-[#07182F] text-white rounded-3xl p-6 shadow-md border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#168BFF]/20 border border-[#168BFF]/40 flex items-center justify-center text-[#168BFF]">
              <ShieldCheck className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white">🇦🇪 UAE Central Bank KYC &amp; Identity Verification Queue</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                  Mandatory For Payouts
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                Contributors must pass automated Emirates ID &amp; 3D facial liveness verification before AED withdrawals are unlocked.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 font-medium">Auto-OCR Engine:</span>
            <span className="px-2 py-0.5 rounded-lg bg-white/10 text-cyan-300 font-mono text-[11px] font-bold">
              Gemini 2.0 Flash (412ms)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {pendingKycList.map((k) => {
            const isVerified = k.status === 'Verified';
            return (
              <div
                key={k.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isVerified
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={k.avatar}
                      alt={k.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-400/40"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">{k.name}</h4>
                      <p className="text-[11px] text-gray-400 font-mono">{k.email}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isVerified
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {k.status}
                  </span>
                </div>

                <div className="py-3 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400 text-[11px]">Document Type:</span>
                    <span className="font-semibold text-white">{k.docType}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 font-mono text-[11px]">
                    <span className="text-gray-400">Emirates ID No:</span>
                    <span className="text-cyan-300 font-bold">{k.docNumber}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400 text-[11px]">Biometric Match:</span>
                    <span className="text-emerald-400 font-bold">{k.livenessScore} ({k.antiSpoof})</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400 text-[11px]">Pending Balance:</span>
                    <span className="text-emerald-300 font-black font-mono">AED {k.walletBalanceAED}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 text-[10px]">
                    <span className="text-gray-400">Workplace:</span>
                    <span className="text-cyan-300 font-semibold">{k.workLocation || k.region}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 text-[10px]">
                    <span className="text-gray-400">Client IP &amp; Carrier:</span>
                    <span className="font-mono text-emerald-300 font-bold">{k.ipAddress} <span className="text-gray-400 font-normal font-sans">({k.isp})</span></span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 text-[10px]">
                    <span className="text-gray-400">Compliance:</span>
                    <span className="text-emerald-400 font-medium">{k.geofenceStatus || 'Verified In-Zone'} &bull; {k.submittedAt}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  {isVerified ? (
                    <span className="w-full py-1.5 text-center rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Payouts Unlocked</span>
                    </span>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleApproveKyc(k.id, k.name)}
                        className="flex-1 py-2 rounded-xl bg-[#16B364] hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve KYC</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRejectKyc(k.id, k.name)}
                        className="px-3 py-2 rounded-xl bg-white/10 hover:bg-red-500/20 hover:text-red-300 text-gray-300 font-bold text-xs transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          2. FILTERS & SEARCH
         ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E7ECF3] shadow-xs overflow-hidden space-y-4">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Users' },
              { id: 'contributor', label: 'Contributors' },
              { id: 'business', label: 'Businesses' },
              { id: 'pending_kyc', label: 'Pending KYC 🇦🇪' },
              { id: 'banned', label: 'Banned Accounts' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRoleFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  roleFilter === tab.id
                    ? 'bg-[#07182F] text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or user ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">User Info</th>
                <th className="py-3.5 px-5">Role &bull; Tier</th>
                <th className="py-3.5 px-5">Work Location &bull; Verified IP</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Wallet Balance (AED)</th>
                <th className="py-3.5 px-5">KYC &bull; Risk</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-900 block">{u.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{u.email} &bull; {u.id}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-800 block">{u.role}</span>
                    <span className="text-[10px] text-gray-400">{u.tier}</span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-gray-900 font-semibold text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-[#168BFF] shrink-0" />
                        <span>{u.workLocation}</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[10px]">
                        <Wifi className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-800 font-bold">{u.ipAddress}</span>
                        <span className="truncate max-w-[130px] text-gray-400 font-sans">({u.isp})</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${u.statusColor}`}>
                      {u.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 font-mono">
                    <span className="font-bold text-gray-900 block">{u.balance}</span>
                    <span className="text-[10px] text-gray-400">{u.lifetimeEarnings}</span>
                  </td>

                  <td className="py-4 px-5">
                    <span className={`font-semibold block ${u.kyc.includes('Verified') ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {u.kyc}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Risk: {u.riskScore}</span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedUser(u)}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-[#168BFF] hover:text-white text-gray-700 font-bold text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Manage</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          USER DETAIL DRAWER / MODAL
         ========================================================================= */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900">{selectedUser.name}</h3>
                <p className="text-xs text-gray-500 font-mono">{selectedUser.id} &bull; Joined {selectedUser.joined}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-gray-50 text-xs">
              <div>
                <span className="text-gray-400 text-[10px] block">Role &amp; Level</span>
                <span className="font-bold text-gray-900">{selectedUser.role} &bull; {selectedUser.tier}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">Current Balance</span>
                <span className="font-mono font-bold text-[#16B364]">{selectedUser.balance}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">KYC Status</span>
                <span className="font-bold text-gray-900">{selectedUser.kyc}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">Risk Radar</span>
                <span className="font-mono font-bold text-gray-900">{selectedUser.riskScore}</span>
              </div>
            </div>

            {/* Workplace Location & Live Client IP Inspection Card */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2.5 border border-slate-800">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <span className="text-gray-400 font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Place of Work &amp; Zone</span>
                </span>
                <span className="font-bold text-cyan-300">{selectedUser.workLocation}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <span className="text-gray-400 font-medium flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Client IP &amp; Carrier</span>
                </span>
                <span className="font-mono font-bold text-emerald-400">{selectedUser.ipAddress} <span className="text-gray-400 text-[10px] font-sans">({selectedUser.isp})</span></span>
              </div>
              <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-800">
                <span className="text-gray-400 flex items-center gap-1">
                  <MonitorSmartphone className="w-3 h-3 text-gray-400" />
                  <span>Device Fingerprint</span>
                </span>
                <span className="text-gray-300 font-mono text-[10px]">{selectedUser.device}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Regional Geofence Status</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{selectedUser.geofenceStatus}</span>
                </span>
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl text-xs space-y-1">
              <span className="font-bold text-[#168BFF] block">🇦🇪 UAE Central Bank Compliance</span>
              <p className="text-[11px] text-gray-600">
                User is bound to UAE WPS escrow vault. Verification unlocks automated IBAN direct debit and prepaid card cashouts.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-700 block">Admin Adjustment Note</span>
              <input
                type="text"
                placeholder="Required for any account suspension or balance override..."
                className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 gap-2">
              <button
                type="button"
                onClick={() => handleToggleBan(selectedUser.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  selectedUser.status === 'Banned'
                    ? 'bg-emerald-50 text-[#16B364] hover:bg-emerald-100'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                {selectedUser.status === 'Banned' ? 'Reactivate Account' : 'Ban & Freeze Balance'}
              </button>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="px-5 py-2 rounded-xl bg-[#07182F] text-white text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

