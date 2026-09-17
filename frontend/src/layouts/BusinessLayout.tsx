import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Megaphone,
  BookOpen,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  HelpCircle,
  Bell,
  Search,
  LogOut,
  CheckSquare,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import { EBizLogo } from '../components/common/EBizLogo';

export const BusinessLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/business', icon: LayoutDashboard, exact: true },
    { name: 'Campaigns', path: '/business/campaigns', icon: Megaphone },
    { name: 'Task Library', path: '/business/tasks', icon: BookOpen },
    { name: 'Contributors', path: '/business/contributors', icon: Users },
    { name: 'Reports', path: '/business/reports', icon: BarChart3 },
    { name: 'Payments', path: '/business/billing', icon: CreditCard },
    { name: 'Settings', path: '/business/settings', icon: Settings },
    { name: 'Support', path: '/business/support', icon: HelpCircle },
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
          <Link to="/" className="flex items-center pb-5 border-b border-white/10 mb-6">
            <EBizLogo variant="dark" size="sm" subtitleText="Business Enterprise" />
          </Link>

          {/* Nav Items */}
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

        {/* Sidebar Footer */}
        <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
          <Link
            to="/business/support"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-gray-400" />
            <span>Help &amp; Support</span>
          </Link>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <div>
              <span className="font-extrabold text-white text-xs block">BizNetwork</span>
              <span className="text-[9px] text-gray-400">Real People. Real Results.</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MAIN WRAPPER & TOP BAR
         ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-8">
        
        {/* Top bar with Search & Acme Profile */}
        <header className="bg-white border-b border-[#E7ECF3] sticky top-0 z-20 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
          
          {/* Search input with shortcut hint */}
          <div className="relative w-full max-w-md hidden sm:block">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search campaigns, tasks, or reports..."
              className="w-full pl-10 pr-8 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#168BFF] focus:bg-white transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-gray-200 text-gray-500 text-[10px] font-mono">
              /
            </span>
          </div>

          {/* Right Action Icons & Acme Brands pill */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Escrow Balance Pill in AED */}
            <Link
              to="/business/billing"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold text-[#168BFF] transition-colors shadow-2xs"
            >
              <span className="text-sm">🇦🇪</span>
              <CreditCard className="w-3.5 h-3.5 text-[#168BFF]" />
              <span>Escrow: AED 54,500.00</span>
            </Link>

            <button
              type="button"
              className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 relative transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200">
              <span className="text-xs font-bold text-gray-900 hidden sm:block">
                Acme Brands
              </span>
              <div className="w-8 h-8 rounded-full bg-[#168BFF] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                AB
              </div>
            </div>
          </div>

        </header>

        {/* Dynamic Page Outlet */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};
