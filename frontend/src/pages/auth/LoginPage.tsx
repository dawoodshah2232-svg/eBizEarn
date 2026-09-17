import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Lock, Mail, Users, Building2, ShieldCheck, Cpu } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const ok = await login(email, password);
      if (ok) {
        if (email.includes('acme') || email.includes('brand')) {
          navigate('/business');
        } else if (email.includes('admin')) {
          navigate('/admin');
        } else {
          navigate('/app');
        }
      } else {
        setError('Invalid email or password. You can also use the 1-click demo buttons below.');
      }
    } catch {
      setError('Connection error. Please try again or use the demo buttons.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickLogin = (role: 'contributor' | 'business' | 'admin' | 'superadmin') => {
    switchRole(role);
    if (role === 'contributor') navigate('/app');
    else if (role === 'business') navigate('/business');
    else navigate('/admin');
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-[#F7F9FC]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E4EAF2] shadow-floating">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#07182F] flex items-center justify-center mb-3 shadow-md">
            <div className="w-5 h-5 rotate-45 border-2 border-[#25C5E8] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#168BFF]" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-[#101828]">Welcome Back</h2>
          <p className="text-xs text-[#667085] mt-1">Sign in to access your BizNetwork dashboard</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-[11px] text-[#168BFF] font-semibold hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#07182F] hover:bg-[#0D2342] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>{submitting ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Instant Demo Login Buttons */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 text-center mb-3">
            Instant 1-Click Persona Login
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('contributor')}
              className="p-2 rounded-xl border border-gray-200 hover:border-[#168BFF] hover:bg-blue-50/50 text-left transition-all"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
                <Users className="w-3.5 h-3.5 text-[#168BFF]" />
                Sarah ($28.40)
              </div>
              <p className="text-[10px] text-gray-400">Contributor</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('business')}
              className="p-2 rounded-xl border border-gray-200 hover:border-[#7257FF] hover:bg-purple-50/50 text-left transition-all"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
                <Building2 className="w-3.5 h-3.5 text-[#7257FF]" />
                Acme Brand
              </div>
              <p className="text-[10px] text-gray-400">Business CRM</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="p-2 rounded-xl border border-gray-200 hover:border-[#16B364] hover:bg-emerald-50/50 text-left transition-all"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16B364]" />
                Moderator
              </div>
              <p className="text-[10px] text-gray-400">AI Verification</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('superadmin')}
              className="p-2 rounded-xl border border-gray-200 hover:border-[#07182F] hover:bg-gray-100 text-left transition-all"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828]">
                <Cpu className="w-3.5 h-3.5 text-gray-800" />
                Super Admin
              </div>
              <p className="text-[10px] text-gray-400">System Control</p>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Don't have an account?{' '}
          <Link to="/signup/contributor" className="text-[#168BFF] font-bold hover:underline">
            Sign up free
          </Link>
        </div>

      </div>
    </div>
  );
};
