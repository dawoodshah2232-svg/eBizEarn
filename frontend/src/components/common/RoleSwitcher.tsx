import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';
import { Users, Building2, ShieldAlert, Cpu, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoleSwitcher: React.FC = () => {
  const { role, switchRole, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const roles: { key: UserRole; label: string; desc: string; icon: any; route: string }[] = [
    { key: 'contributor', label: 'Contributor (Sarah)', desc: 'AED 104.50 Balance, Tasks, Wallet', icon: Users, route: '/app' },
    { key: 'business', label: 'Business (Acme)', desc: 'Campaign Wizard, Budget, Reports', icon: Building2, route: '/business' },
    { key: 'admin', label: 'Admin (Moderator)', desc: 'Verification Queue (93% AI), Payouts', icon: ShieldAlert, route: '/admin' },
    { key: 'superadmin', label: 'Super Admin', desc: 'Feature Flags, Audit, System Health', icon: Cpu, route: '/admin/super' },
  ];

  return (
    <div className="fixed bottom-5 left-5 z-40">
      {isOpen && (
        <div className="mb-2 w-80 bg-[#07182F] text-white rounded-2xl p-4 shadow-2xl border border-white/20 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#25C5E8]">Demo Role Switcher</p>
              <p className="text-[11px] text-gray-400">Switch persona & live dashboard</p>
            </div>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white font-mono">
              Role: {role}
            </span>
          </div>

          <div className="space-y-1.5 pt-3">
            {roles.map((r) => {
              const Icon = r.icon;
              const isCurrent = role === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => {
                    switchRole(r.key);
                    navigate(r.route);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl flex items-center gap-3 transition-all ${
                    isCurrent
                      ? 'bg-gradient-brand text-white shadow-md'
                      : 'hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${isCurrent ? 'bg-white/20' : 'bg-white/5'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{r.label}</p>
                    <p className={`text-[10px] truncate ${isCurrent ? 'text-white/80' : 'text-gray-400'}`}>
                      {r.desc}
                    </p>
                  </div>
                  {isCurrent && <Check className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#07182F] hover:bg-[#0D2342] text-white px-3.5 py-2 rounded-full shadow-floating border border-white/20 text-xs font-semibold transition-all hover:scale-105"
      >
        <span className="w-2 h-2 rounded-full bg-[#16B364] animate-pulse" />
        <span>Demo: {role.toUpperCase()}</span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5 text-gray-400" />}
      </button>
    </div>
  );
};
