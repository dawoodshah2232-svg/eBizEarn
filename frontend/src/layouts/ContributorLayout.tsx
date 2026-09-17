import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  CheckSquare,
  Wallet,
  Gift,
  Bell,
  User as UserIcon,
  LogOut,
  TrendingUp,
  HelpCircle,
  Share2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import { EBizLogo } from '../components/common/EBizLogo';

export const ContributorLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard, exact: true },
    { name: 'Browse Tasks', path: '/app/tasks', icon: Compass },
    { name: 'My Tasks', path: '/app/my-tasks', icon: CheckSquare },
    { name: 'Earnings', path: '/app/earnings', icon: TrendingUp },
    { name: 'Wallet', path: '/app/wallet', icon: Wallet },
    { name: 'Referrals', path: '/app/referrals', icon: Gift },
    { name: 'Profile', path: '/app/profile', icon: UserIcon },
    { name: 'Support', path: '/app/support', icon: HelpCircle },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex flex-col md:flex-row text-left font-sans">
      
      {/* =========================================================================
          DESKTOP SIDEBAR
         ========================================================================= */}
      <aside className="hidden md:flex flex-col w-64 bg-[#07182F] text-white sticky top-0 h-screen p-5 justify-between shadow-xl z-30 shrink-0">
        <div>
          {/* Logo */}
          <Link to="/" className="flex items-center pb-5 border-b border-white/10 mb-5">
            <EBizLogo variant="dark" size="sm" subtitleText="Contributor Portal" />
          </Link>

          {/* User Quick Card in Sidebar */}
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10 mb-6 flex items-center gap-3">
            <img
              src={user?.profile?.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'}
              alt={user?.name || 'Sarah'}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#168BFF]"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Sarah Khan'}</p>
              <span className="text-[10px] text-gray-300 block truncate">
                Client Contributor
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#168BFF] text-white shadow-md'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom: Invite Friends Promo Card & Logout */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          
          {/* Invite Friends Card */}
          <div className="p-3 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
              <Share2 className="w-4 h-4 text-[#20C4E8]" />
              <span>Invite Friends</span>
            </div>
            <p className="text-[10px] text-gray-300 leading-tight mb-2">
              Share your referral link and earn together!
            </p>
            <Link
              to="/app/referrals"
              className="block w-full py-1.5 rounded-lg bg-[#168BFF] hover:bg-[#2F80FF] text-white text-center font-bold text-xs shadow-xs transition-colors"
            >
              Get Link
            </Link>
          </div>

          {/* Logout button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          MAIN CONTENT WRAPPER
         ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-10">
        
        {/* Top App Header */}
        <header className="bg-white border-b border-[#E7ECF3] sticky top-0 z-20 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div>
            <h1 className="text-base sm:text-lg font-black text-[#101828]">
              Client CRM Dashboard
            </h1>
            <p className="text-[11px] text-[#667085] hidden sm:block">
              Track your tasks, earnings and performance in one place.
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Live Wallet Balance Pill */}
            <Link
              to="/app/wallet"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-black text-emerald-800 transition-colors shadow-2xs"
            >
              <span className="text-sm">🇦🇪</span>
              <Wallet className="w-3.5 h-3.5 text-[#16B364]" />
              <span>AED {((user?.wallet?.available_balance_cents ?? 10450) / 100).toFixed(2)}</span>
            </Link>

            <button
              type="button"
              className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 relative transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#168BFF]" />
            </button>

            <div className="flex items-center gap-2">
              <img
                src={user?.profile?.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'}
                alt={user?.name || 'Sarah'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#168BFF]/30"
              />
              <span className="text-xs font-bold text-gray-900 hidden sm:block">
                {user?.name || 'Sarah Khan'}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Outlet Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* =========================================================================
          MOBILE BOTTOM DOCK NAVIGATION (44px touch targets)
         ========================================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#07182F] border-t border-white/10 px-4 py-2 flex items-center justify-around shadow-2xl">
        <Link
          to="/app"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-bold ${
            location.pathname === '/app' ? 'text-[#168BFF]' : 'text-gray-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link
          to="/app/tasks"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-bold ${
            location.pathname.startsWith('/app/tasks') ? 'text-[#168BFF]' : 'text-gray-400'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Tasks</span>
        </Link>
        <Link
          to="/app/wallet"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-bold ${
            location.pathname.startsWith('/app/wallet') ? 'text-[#168BFF]' : 'text-gray-400'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span>Wallet</span>
        </Link>
        <Link
          to="/app/my-tasks"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-bold ${
            location.pathname.startsWith('/app/my-tasks') ? 'text-[#168BFF]' : 'text-gray-400'
          }`}
        >
          <CheckSquare className="w-5 h-5" />
          <span>My Tasks</span>
        </Link>
      </nav>

    </div>
  );
};
