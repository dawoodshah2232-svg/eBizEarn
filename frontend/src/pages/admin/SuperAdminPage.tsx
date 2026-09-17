import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  CheckCircle2,
  DollarSign,
  ShieldAlert,
  Flag,
  Activity,
  Calendar,
  ChevronDown,
  ArrowRight,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Check,
  AlertCircle,
  ExternalLink,
  Cpu,
  Sliders,
  Zap,
  Lock,
  Server,
  Key,
  Globe,
  Coins,
  CreditCard,
  Sparkles,
  Mail,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Settings2,
  Send,
  Radio,
  Smartphone,
  Share2,
  Hash,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from 'recharts';
import { usePlatform } from '../../context/PlatformDataContext';

export const SuperAdminPage: React.FC = () => {
  const {
    campaigns,
    payouts,
    submissions,
    globalSettings,
    updateGlobalSettings,
    setActiveAiEngine,
    addAiEngine,
    removeAiEngine,
    addEmailProvider,
    removeEmailProvider,
    toggleEmailProvider,
    addPaymentGateway,
    removePaymentGateway,
    togglePaymentGateway,
    addSmsProvider,
    toggleSmsProvider,
    processPayout,
  } = usePlatform();

  // Master API & Gateway Hub Tab
  const [activeApiTab, setActiveApiTab] = useState<'payment' | 'ai' | 'email' | 'sms' | 'social' | 'security'>('payment');

  // Modals state
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [newGwName, setNewGwName] = useState('');
  const [newGwType, setNewGwType] = useState<'fiat_bank' | 'cards' | 'wps' | 'crypto'>('fiat_bank');
  const [newGwCurrency, setNewGwCurrency] = useState('AED');
  const [newGwFee, setNewGwFee] = useState('0.5');
  const [newGwSettlement, setNewGwSettlement] = useState<'instant' | 't+1' | 'batch'>('instant');
  const [newGwApiKey, setNewGwApiKey] = useState('');

  const [isAddAiModalOpen, setIsAddAiModalOpen] = useState(false);
  const [newAiName, setNewAiName] = useState('');
  const [newAiProvider, setNewAiProvider] = useState('');
  const [newAiLatency, setNewAiLatency] = useState('180');
  const [newAiPrecision, setNewAiPrecision] = useState('99.2%');

  const [isAddEmailModalOpen, setIsAddEmailModalOpen] = useState(false);
  const [newEmailName, setNewEmailName] = useState('');
  const [newEmailSender, setNewEmailSender] = useState('');
  const [newEmailType, setNewEmailType] = useState<'api' | 'smtp'>('api');
  const [newEmailKey, setNewEmailKey] = useState('');

  const [isAddSmsModalOpen, setIsAddSmsModalOpen] = useState(false);
  const [newSmsName, setNewSmsName] = useState('');
  const [newSmsChannel, setNewSmsChannel] = useState<'sms' | 'whatsapp' | 'otp'>('sms');
  const [newSmsSenderId, setNewSmsSenderId] = useState('');

  // AI review donut data
  const aiDonutData = [
    { name: 'Low Risk', value: 649, color: '#168BFF', percent: '52%' },
    { name: 'Needs Review', value: 352, color: '#F79009', percent: '28%' },
    { name: 'High Risk', value: 117, color: '#F04438', percent: '9%' },
    { name: 'Uncertain', value: 130, color: '#7357FF', percent: '11%' },
  ];

  // Fraud line data
  const fraudData = [
    { day: 'Apr 1', blocked: 42, flagged: 20 },
    { day: 'Apr 7', blocked: 68, flagged: 35 },
    { day: 'Apr 14', blocked: 95, flagged: 45 },
    { day: 'Apr 21', blocked: 120, flagged: 55 },
    { day: 'Apr 28', blocked: 145, flagged: 65 },
  ];

  const pendingVerificationCount = submissions.filter((s) => s.status === 'under_review').length;
  const pendingPayoutCount = payouts.filter((p) => p.status === 'requested' || p.status === 'processing').length;

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. HEADER & DATE SELECTOR
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
              Super Admin Control Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16B364] border border-emerald-200 text-[11px] font-bold">
              🇦🇪 UAE Central Bank WPS Connected
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Real-time platform governance, AI model orchestration, bank-grade cryptographic ledger, and multi-rail disbursement.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E7ECF3] shadow-xs text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors self-start sm:self-auto"
        >
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>Apr 1, 2026 &ndash; Apr 30, 2026</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
        </button>
      </div>

      {/* =========================================================================
          ADVANCED PLATFORM TELEMETRY & ENGINE CONTROLS BAR
         ========================================================================= */}
      <div className="bg-[#07182F] text-white p-5 rounded-3xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-sm font-black text-white">Live Platform Engine Governance &amp; Escrow Controls</h3>
          </div>
          <span className="text-[11px] font-mono text-cyan-300">Active Node: prod-core-01 &bull; 0 Errors &bull; SHA-256 Ledger Verified</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-gray-400 text-[10px] uppercase font-bold">Platform Take Rate</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-white">{globalSettings.takeRatePercent}%</span>
              <div className="flex gap-1">
                {[12, 15, 20].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => updateGlobalSettings({ takeRatePercent: rate })}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                      globalSettings.takeRatePercent === rate
                        ? 'bg-[#168BFF] text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-gray-400 text-[10px] uppercase font-bold">Vision OCR Verification</span>
            <div className="flex items-center justify-between mt-1">
              <span className={`text-xs font-bold ${globalSettings.visionOcrEnabled ? 'text-emerald-400' : 'text-amber-400'}`}>
                {globalSettings.visionOcrEnabled ? '● Active (Gemini 2.0)' : '○ Suspended'}
              </span>
              <button
                type="button"
                onClick={() => updateGlobalSettings({ visionOcrEnabled: !globalSettings.visionOcrEnabled })}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold cursor-pointer transition-colors"
              >
                {globalSettings.visionOcrEnabled ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-gray-400 text-[10px] uppercase font-bold">Auto-Approval Threshold</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-cyan-300">&ge; {globalSettings.autoApprovalThreshold}%</span>
              <span className="text-[10px] text-gray-400">Confidence Match</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-gray-400 text-[10px] uppercase font-bold">Min Cashout (AED 🇦🇪)</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-emerald-400">AED {globalSettings.minCashoutAED.toFixed(2)}</span>
              <span className="text-[10px] text-gray-400 font-mono">WPS Rails</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MASTER API & GATEWAY HUB: SUPER ADMIN COMMAND CENTER
         ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E4EAF2] shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-sm">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-gray-900">
                  Master API &amp; Channel Gateway Hub
                </h2>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-mono">
                  Super Admin Root Access
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Full authority to add, remove, test, and toggle payment rails, AI inference models, email relays, and verification channels.
              </p>
            </div>
          </div>

          {/* Quick Active Indicators */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl text-slate-700 font-semibold">
              AI: {globalSettings.aiProviders?.activeEngine.toUpperCase()}
            </span>
            <span className="text-[11px] font-mono bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl text-emerald-800 font-semibold">
              Gateways: {(globalSettings.paymentGatewaysList || []).filter(g => g.status === 'active').length} Active
            </span>
            <span className="text-[11px] font-mono bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-xl text-blue-800 font-semibold">
              Relays: {(globalSettings.emailProviders || []).filter(e => e.status === 'active' || (e.status as any) === 'connected').length} Online
            </span>
          </div>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl">
          {[
            { id: 'payment', name: '💳 Payment Gateways & Rails', count: (globalSettings.paymentGatewaysList || []).length },
            { id: 'ai', name: '🧠 AI Engines & Vision', count: (globalSettings.aiProviders?.engines || []).length },
            { id: 'email', name: '✉️ Email & SMTP Relays', count: (globalSettings.emailProviders || []).length },
            { id: 'sms', name: '📱 SMS & 2FA Gateways', count: (globalSettings.smsProviders || []).length },
            { id: 'social', name: '🌐 Social Verification APIs', count: (globalSettings.socialApis || []).length },
            { id: 'security', name: '🛡️ Cryptographic Shield', count: 4 },
          ].map((tab) => {
            const isActive = activeApiTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveApiTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                <span>{tab.name}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            TAB 1: PAYMENT GATEWAYS & DISBURSEMENT RAILS
           ========================================================================= */}
        {activeApiTab === 'payment' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Connected Payment Gateways &amp; Banking Rails</h3>
                <p className="text-xs text-gray-500">Add or remove CBUAE WPS, card processors, local bank wire, or crypto treasury rails.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPaymentModalOpen(true)}
                className="px-4 py-2 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Payment Gateway</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(globalSettings.paymentGatewaysList || []).map((gw) => {
                const isActive = gw.status === 'active';
                return (
                  <div
                    key={gw.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                      isActive ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-50/60 border-slate-200 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full font-mono ${
                            gw.type === 'wps' ? 'bg-emerald-100 text-emerald-800' :
                            gw.type === 'fiat_bank' ? 'bg-blue-100 text-blue-800' :
                            gw.type === 'crypto' ? 'bg-purple-100 text-purple-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {gw.type}
                          </span>
                          <h4 className="text-xs font-black text-gray-900 mt-1.5 leading-snug">{gw.name}</h4>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                          {isActive ? '● Active' : '○ Disabled'}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1 text-[11px] text-slate-600 font-medium">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Settlement Currency:</span>
                          <span className="font-bold text-slate-900 font-mono">{gw.currency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Processing Fee:</span>
                          <span className="font-bold text-slate-900 font-mono">{gw.feePercent}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Settlement Mode:</span>
                          <span className="capitalize font-mono">{gw.settlementMode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Live API Key:</span>
                          <span className="font-mono text-slate-500 truncate max-w-[130px]">{gw.apiKeyMasked}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => togglePaymentGateway(gw.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex-1 flex items-center justify-center gap-1.5 ${
                          isActive
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {isActive ? <ToggleRight className="w-4 h-4 text-slate-500" /> : <ToggleLeft className="w-4 h-4" />}
                        <span>{isActive ? 'Disable' : 'Enable'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => removePaymentGateway(gw.id)}
                        title="Remove Gateway"
                        className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: AI ENGINES & COMPUTER VISION INFERENCE
           ========================================================================= */}
        {activeApiTab === 'ai' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Configured AI Engines &amp; Vision OCR Models</h3>
                <p className="text-xs text-gray-500">Select active primary engine or connect additional vision microservices.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddAiModalOpen(true)}
                className="px-4 py-2 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add AI Engine</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(globalSettings.aiProviders?.engines || []).map((engine) => {
                const isActive = (globalSettings.aiProviders?.activeEngine || 'gemini_2_flash') === engine.id;
                return (
                  <div
                    key={engine.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                      isActive ? 'border-[#168BFF] bg-blue-50/40 shadow-sm ring-2 ring-[#168BFF]/20' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-xs font-black text-gray-900">{engine.name}</h4>
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">{engine.provider}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
                          {isActive ? '● Active' : 'Standby'}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Inference Latency:</span>
                          <span className="font-mono font-bold text-slate-900">{engine.latencyMs}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">OCR Precision:</span>
                          <span className="font-bold text-emerald-600">{engine.precision}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Key Status:</span>
                          <span className="font-semibold text-emerald-700 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Live &amp; Bound
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      {isActive ? (
                        <span className="w-full py-1.5 text-center rounded-xl bg-blue-100 text-[#168BFF] text-xs font-bold block">
                          Primary Engine
                        </span>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => setActiveAiEngine(engine.id)}
                            className="flex-1 py-1.5 rounded-xl bg-slate-100 hover:bg-[#07182F] hover:text-white text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                          >
                            Set As Primary
                          </button>
                          <button
                            type="button"
                            onClick={() => removeAiEngine(engine.id)}
                            title="Remove Engine"
                            className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: TRANSACTIONAL EMAIL & SMTP RELAYS
           ========================================================================= */}
        {activeApiTab === 'email' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Transactional Email &amp; SMTP Relays</h3>
                <p className="text-xs text-gray-500">Configure outbound email delivery for verification codes, task approvals, and UAE invoices.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddEmailModalOpen(true)}
                className="px-4 py-2 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Email Relay</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(globalSettings.emailProviders || []).map((prov) => {
                const isActive = prov.status === 'active' || (prov.status as any) === 'connected';
                return (
                  <div
                    key={prov.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                      isActive ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-50/60 border-slate-200 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full font-mono bg-blue-100 text-blue-800">
                            {prov.type.toUpperCase()} Relay
                          </span>
                          <h4 className="text-xs font-black text-gray-900 mt-1.5">{prov.name}</h4>
                          <p className="text-[11px] text-slate-500 font-mono mt-0.5">{prov.senderEmail}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                          {isActive ? '● Active' : '○ Standby'}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1 text-[11px] text-slate-600">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Daily Quota:</span>
                          <span className="font-mono font-bold text-slate-900">{typeof prov.dailyQuota === 'number' ? prov.dailyQuota.toLocaleString() : prov.dailyQuota} msgs</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Sent Today:</span>
                          <span className="font-mono font-bold text-emerald-600">{prov.dailySent != null ? prov.dailySent.toLocaleString() : '2,314'} msgs</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">API Key Mask:</span>
                          <span className="font-mono text-slate-500">{prov.apiKeyMasked}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => toggleEmailProvider(prov.id)}
                        className={`flex-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                          isActive
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {isActive ? <ToggleRight className="w-4 h-4 text-slate-500" /> : <ToggleLeft className="w-4 h-4" />}
                        <span>{isActive ? 'Disable' : 'Enable'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => removeEmailProvider(prov.id)}
                        title="Remove Relay"
                        className="p-1.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: SMS, WHATSAPP & 2FA GATEWAYS
           ========================================================================= */}
        {activeApiTab === 'sms' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">SMS, WhatsApp &amp; 2FA Broadcast Rails</h3>
                <p className="text-xs text-gray-500">Manage UAE telecom rails (e&amp;, du) and WhatsApp Cloud API for contributor notifications.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddSmsModalOpen(true)}
                className="px-4 py-2 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add SMS / OTP Rail</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(globalSettings.smsProviders || []).map((sms) => {
                const isActive = sms.status === 'active';
                return (
                  <div
                    key={sms.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                      isActive ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-50/60 border-slate-200 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full font-mono bg-purple-100 text-purple-800">
                            {sms.channel}
                          </span>
                          <h4 className="text-xs font-black text-gray-900 mt-1.5">{sms.name}</h4>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                          {isActive ? '● Active' : '○ Standby'}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1 text-[11px] text-slate-600">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Sender Identifier:</span>
                          <span className="font-mono font-bold text-slate-900">{sms.senderId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Carrier Routing:</span>
                          <span className="font-semibold text-emerald-700">UAE Direct Route</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => toggleSmsProvider(sms.id)}
                        className={`w-full px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                          isActive
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {isActive ? <ToggleRight className="w-4 h-4 text-slate-500" /> : <ToggleLeft className="w-4 h-4" />}
                        <span>{isActive ? 'Disable Gateway' : 'Enable Gateway'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: SOCIAL PLATFORM VERIFICATION APIS
           ========================================================================= */}
        {activeApiTab === 'social' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Official Social Platform Verification APIs</h3>
              <p className="text-xs text-gray-500">Live API webhooks and OCR crawlers connected to verify tasks on external platforms.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(globalSettings.socialApis || []).map((apiOpt) => (
                <div key={apiOpt.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full font-mono bg-blue-50 text-blue-800">
                        {apiOpt.platform}
                      </span>
                      <h4 className="text-xs font-black text-gray-900 mt-1.5">{apiOpt.name}</h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Connected
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Live Capabilities:</span>
                    <div className="flex flex-wrap gap-1">
                      {apiOpt.capabilities.map((cap, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: BANK-GRADE CRYPTOGRAPHIC SECURITY SHIELD
           ========================================================================= */}
        {activeApiTab === 'security' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900">🔒 Bank-Grade Cryptographic Security Shield</h3>
              <p className="text-xs text-gray-500">Immutable audit trails, double-entry hash locks, and 2FA withdrawal gates.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-gray-900 block">Double-Entry Cryptographic Hash Lock (SHA-256)</span>
                  <span className="text-[11px] text-gray-500">Enforces zero phantom variance on contributor wallet credits</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateGlobalSettings({
                      securityShield: {
                        ...globalSettings.securityShield,
                        doubleEntryLedgerLock: !globalSettings.securityShield.doubleEntryLedgerLock,
                      },
                    })
                  }
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    globalSettings.securityShield.doubleEntryLedgerLock ? 'bg-[#168BFF] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {globalSettings.securityShield.doubleEntryLedgerLock ? 'Enforced' : 'Off'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-gray-900 block">Mandatory 2FA SMS/Authenticator Cashout Gate</span>
                  <span className="text-[11px] text-gray-500">Strict secondary factor verification on all AED withdrawals</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateGlobalSettings({
                      securityShield: {
                        ...globalSettings.securityShield,
                        mfaWithdrawalEnforced: !globalSettings.securityShield.mfaWithdrawalEnforced,
                      },
                    })
                  }
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    globalSettings.securityShield.mfaWithdrawalEnforced ? 'bg-[#168BFF] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {globalSettings.securityShield.mfaWithdrawalEnforced ? 'Enforced' : 'Off'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-gray-900 block">Anti-Sybil Device Fingerprinting &amp; Proxy Shield</span>
                  <span className="text-[11px] text-gray-500">Automated blocking of VPN tunnels, multi-accounts, and bots</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateGlobalSettings({
                      securityShield: {
                        ...globalSettings.securityShield,
                        antiSybilDeviceFingerprint: !globalSettings.securityShield.antiSybilDeviceFingerprint,
                      },
                    })
                  }
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    globalSettings.securityShield.antiSybilDeviceFingerprint ? 'bg-[#168BFF] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {globalSettings.securityShield.antiSybilDeviceFingerprint ? 'Enforced' : 'Off'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-gray-900 block">Tamper-Proof Payout Ledger Hash Chain</span>
                  <span className="text-[11px] text-gray-500">Each withdrawal receives irreversible cryptographic proof</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateGlobalSettings({
                      securityShield: {
                        ...globalSettings.securityShield,
                        tamperProofHashChain: !globalSettings.securityShield.tamperProofHashChain,
                      },
                    })
                  }
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    globalSettings.securityShield.tamperProofHashChain ? 'bg-[#168BFF] text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {globalSettings.securityShield.tamperProofHashChain ? 'Enforced' : 'Off'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          MODALS FOR MASTER API HUB (Add Payment Gateway, AI Engine, Email, SMS)
         ========================================================================= */}

      {/* Add Payment Gateway Modal */}
      {isAddPaymentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Connect New Payment Gateway / Rail</h3>
              <button onClick={() => setIsAddPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newGwName.trim()) return;
                addPaymentGateway({
                  name: newGwName,
                  type: newGwType,
                  currency: newGwCurrency,
                  feePercent: parseFloat(newGwFee || '0'),
                  settlementMode: newGwSettlement,
                  apiKeyMasked: newGwApiKey || 'live_key_••••••••9102',
                });
                setNewGwName('');
                setIsAddPaymentModalOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Gateway Name</label>
                <input
                  type="text"
                  required
                  value={newGwName}
                  onChange={(e) => setNewGwName(e.target.value)}
                  placeholder="e.g. Mashreq Bank Direct Host-to-Host"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Channel Type</label>
                  <select
                    value={newGwType}
                    onChange={(e) => setNewGwType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="fiat_bank">Fiat Bank (UAE Wire)</option>
                    <option value="wps">WPS Payroll Rail</option>
                    <option value="cards">Debit/Credit Cards</option>
                    <option value="crypto">Web3 Crypto / USDC</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Currency</label>
                  <select
                    value={newGwCurrency}
                    onChange={(e) => setNewGwCurrency(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="AED">AED (UAE Dirham 🇦🇪)</option>
                    <option value="USDC">USDC (Stablecoin)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fee %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newGwFee}
                    onChange={(e) => setNewGwFee(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                  </input>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Settlement Mode</label>
                  <select
                    value={newGwSettlement}
                    onChange={(e) => setNewGwSettlement(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="instant">Instant (CBUAE IPP)</option>
                    <option value="t+1">T+1 Rolling</option>
                    <option value="batch">Daily Batch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">API Key / Merchant Secret</label>
                <input
                  type="password"
                  value={newGwApiKey}
                  onChange={(e) => setNewGwApiKey(e.target.value)}
                  placeholder="sk_live_••••••••••••••••••••"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPaymentModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl font-bold"
                >
                  Save Gateway
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add AI Engine Modal */}
      {isAddAiModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Connect New AI Inference Engine</h3>
              <button onClick={() => setIsAddAiModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newAiName.trim()) return;
                addAiEngine({
                  name: newAiName,
                  provider: newAiProvider || 'Custom Vision Microservice',
                  latencyMs: parseInt(newAiLatency || '200', 10),
                  precision: newAiPrecision || '98.5%',
                });
                setNewAiName('');
                setIsAddAiModalOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Model / Engine Name</label>
                <input
                  type="text"
                  required
                  value={newAiName}
                  onChange={(e) => setNewAiName(e.target.value)}
                  placeholder="e.g. DeepSeek R1 Vision / Falcon Vision UAE"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Provider &amp; Endpoint</label>
                <input
                  type="text"
                  value={newAiProvider}
                  onChange={(e) => setNewAiProvider(e.target.value)}
                  placeholder="e.g. TII Abu Dhabi Cluster or Groq API"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Latency (ms)</label>
                  <input
                    type="number"
                    value={newAiLatency}
                    onChange={(e) => setNewAiLatency(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Precision %</label>
                  <input
                    type="text"
                    value={newAiPrecision}
                    onChange={(e) => setNewAiPrecision(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddAiModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl font-bold"
                >
                  Deploy Engine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Email Relay Modal */}
      {isAddEmailModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Connect New Email &amp; SMTP Relay</h3>
              <button onClick={() => setIsAddEmailModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newEmailName.trim()) return;
                addEmailProvider({
                  name: newEmailName,
                  senderEmail: newEmailSender || 'notifications@ebiznetwork.ae',
                  type: newEmailType,
                  apiKeyMasked: newEmailKey ? `${newEmailKey.slice(0, 6)}••••••••` : 're_live_••••••••123a',
                });
                setNewEmailName('');
                setIsAddEmailModalOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Provider Name</label>
                <input
                  type="text"
                  required
                  value={newEmailName}
                  onChange={(e) => setNewEmailName(e.target.value)}
                  placeholder="e.g. Postmark UAE Enterprise Relay"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Default Sender Email</label>
                <input
                  type="email"
                  value={newEmailSender}
                  onChange={(e) => setNewEmailSender(e.target.value)}
                  placeholder="e.g. alerts@ebiznetwork.ae"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Relay Protocol</label>
                <select
                  value={newEmailType}
                  onChange={(e) => setNewEmailType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="api">Direct REST API</option>
                  <option value="smtp">Standard TLS SMTP</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">API Key / SMTP Password</label>
                <input
                  type="password"
                  value={newEmailKey}
                  onChange={(e) => setNewEmailKey(e.target.value)}
                  placeholder="••••••••••••••••••••"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddEmailModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl font-bold"
                >
                  Save Email Relay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add SMS / OTP Modal */}
      {isAddSmsModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Add SMS &amp; 2FA Broadcast Gateway</h3>
              <button onClick={() => setIsAddSmsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newSmsName.trim()) return;
                addSmsProvider({
                  name: newSmsName,
                  channel: newSmsChannel,
                  senderId: newSmsSenderId || 'eBizUAE',
                });
                setNewSmsName('');
                setIsAddSmsModalOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Gateway / Carrier Name</label>
                <input
                  type="text"
                  required
                  value={newSmsName}
                  onChange={(e) => setNewSmsName(e.target.value)}
                  placeholder="e.g. Infobip Dubai SMS Hub"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Channel Type</label>
                  <select
                    value={newSmsChannel}
                    onChange={(e) => setNewSmsChannel(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="sms">SMS Text</option>
                    <option value="whatsapp">WhatsApp Direct</option>
                    <option value="otp">OTP / 2FA Verify</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sender ID</label>
                  <input
                    type="text"
                    value={newSmsSenderId}
                    onChange={(e) => setNewSmsSenderId(e.target.value)}
                    placeholder="eBizNotify"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddSmsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl font-bold"
                >
                  Save SMS Rail
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. SIX TOP METRIC CARDS (All denominated in AED 🇦🇪)
         ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* Metric 1 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#168BFF] flex items-center justify-center mb-2">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-[11px] text-gray-500 font-medium block">Total Contributors</span>
          <span className="text-xl sm:text-2xl font-black text-[#101828] mt-0.5 block">254,782</span>
          <span className="text-[10px] text-[#18B76A] font-bold block mt-1">&uarr; +12% vs. last month</span>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#18B76A] flex items-center justify-center mb-2">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-[11px] text-gray-500 font-medium block">Tasks Completed</span>
          <span className="text-xl sm:text-2xl font-black text-[#101828] mt-0.5 block">
            {1842639 + submissions.filter((s) => s.status === 'approved').length}
          </span>
          <span className="text-[10px] text-[#18B76A] font-bold block mt-1">&uarr; +18% verified</span>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#7357FF] flex items-center justify-center mb-2">
            <DollarSign className="w-4 h-4" />
          </div>
          <span className="text-[11px] text-gray-500 font-medium block">Total Payouts (AED)</span>
          <span className="text-xl sm:text-2xl font-black text-[#101828] mt-0.5 block">AED 3,618,500</span>
          <span className="text-[10px] text-[#18B76A] font-bold block mt-1">&uarr; +14% vs. last month</span>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <span className="text-[11px] text-gray-500 font-medium block">Fraud Blocked</span>
          <span className="text-xl sm:text-2xl font-black text-[#101828] mt-0.5 block">AED 177,100</span>
          <span className="text-[10px] text-[#18B76A] font-bold block mt-1">&uarr; +37% vs. last month</span>
        </div>

        {/* Metric 5 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-2">
            <Flag className="w-4 h-4" />
          </div>
          <span className="text-[11px] text-gray-500 font-medium block">Active Campaigns</span>
          <span className="text-xl sm:text-2xl font-black text-[#101828] mt-0.5 block">{campaigns.length}</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">Live in marketplace</span>
        </div>

        {/* Metric 6 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#20C4E8] flex items-center justify-center mb-2">
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-[11px] text-gray-500 font-medium block">Verification Queue</span>
          <span className="text-xl sm:text-2xl font-black text-[#101828] mt-0.5 block">
            {pendingVerificationCount}
          </span>
          <span className="text-[10px] text-purple-600 font-bold block mt-1">Pending AI review</span>
        </div>

      </div>

      {/* =========================================================================
          3. MIDDLE ROW: AI REVIEW DONUT, VERIFICATION QUEUE, FRAUD DETECTION
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Card 1: AI Review Queue Donut (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-black text-[#101828]">AI Review Queue</h3>
            <span className="text-[11px] text-gray-400">1,248 items</span>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={aiDonutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {aiDonutData.map((entry, index) => (
                    <Cell key={`ai-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-base font-black text-[#101828]">1,248</span>
              <span className="text-[9px] text-gray-400">In Review</span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-[11px]">
            {aiDonutData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600 truncate">{item.name}</span>
                </div>
                <span className="font-bold text-gray-900">{item.percent}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Verification Queue Table (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-black text-[#101828]">Verification Queue</h3>
            <span className="text-[11px] font-bold text-[#168BFF] cursor-pointer hover:underline">View all &rarr;</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-gray-400 text-[10px] uppercase font-semibold border-b border-gray-100">
                  <th className="py-2">User</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <tr>
                  <td className="py-2 font-bold text-gray-900">jasmine.k</td>
                  <td className="py-2 text-gray-500">Individual</td>
                  <td className="py-2"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-600 text-[10px] font-bold">Pending</span></td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-gray-900">michael.t</td>
                  <td className="py-2 text-gray-500">Business</td>
                  <td className="py-2"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-600 text-[10px] font-bold">Pending</span></td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-gray-900">globalgoods</td>
                  <td className="py-2 text-gray-500">Business</td>
                  <td className="py-2"><span className="px-2 py-0.5 rounded bg-blue-50 text-[#168BFF] text-[10px] font-bold">Under Review</span></td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-gray-900">sarah.p</td>
                  <td className="py-2 text-gray-500">Individual</td>
                  <td className="py-2"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-600 text-[10px] font-bold">Pending</span></td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-gray-900">greenmarket</td>
                  <td className="py-2 text-gray-500">Business</td>
                  <td className="py-2"><span className="px-2 py-0.5 rounded bg-purple-50 text-[#7357FF] text-[10px] font-bold">Needs Info</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Card 3: Fraud Detection Chart (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-black text-[#101828]">Fraud Detection</h3>
            <span className="text-[11px] text-gray-500">Last 30 days &or;</span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fraudData}>
                <XAxis dataKey="day" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="blocked" stroke="#F04438" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="flagged" stroke="#168BFF" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-around pt-2 border-t border-gray-100 text-[10px]">
            <span className="flex items-center gap-1.5 text-red-600 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Blocked Attempts
            </span>
            <span className="flex items-center gap-1.5 text-[#168BFF] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#168BFF]" /> Flagged Accounts
            </span>
          </div>
        </div>

      </div>

      {/* =========================================================================
          4. LOWER ROW: PAYOUT APPROVALS, SUPPORT TICKETS, CAMPAIGN OVERSIGHT
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Payout Approvals */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-sm font-black text-[#101828]">Payout Approvals</h3>
            <Link to="/admin/payouts" className="text-[11px] font-bold text-[#168BFF] hover:underline">View all &rarr;</Link>
          </div>
          <div className="divide-y divide-gray-50 text-xs">
            {payouts.slice(0, 3).map((p) => (
              <div key={p.id} className="py-2.5 flex items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-gray-900 truncate max-w-[130px]">{p.userName}</p>
                  <p className="text-[10px] text-gray-400 truncate max-w-[130px]">{p.method}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="font-bold text-gray-900 block text-xs">{p.amount}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      p.status === 'paid' ? 'bg-emerald-50 text-[#16B364]' : 'bg-amber-50 text-amber-600'
                    }`}>{p.status}</span>
                  </div>
                  {p.status !== 'paid' && (
                    <button
                      type="button"
                      onClick={() => processPayout(p.id, 'paid')}
                      className="px-2 py-1 bg-[#16B364] hover:bg-emerald-600 text-white rounded-lg text-[10px] font-bold transition-all shadow-xs cursor-pointer"
                    >
                      Pay
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Tickets */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-sm font-black text-[#101828]">Support Tickets</h3>
            <Link to="/admin/support" className="text-[11px] font-bold text-[#168BFF] hover:underline">View all &rarr;</Link>
          </div>
          <div className="divide-y divide-gray-50 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">#48291 &middot; Payout not received</p>
                <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 text-[9px] font-bold">High Priority</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-red-50 text-red-600 text-[9px] font-bold">Open</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">#48287 &middot; Verification issue</p>
                <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 text-[9px] font-bold">Medium</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-[#168BFF] text-[9px] font-bold">In Progress</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">#48263 &middot; Campaign question</p>
                <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[9px] font-bold">Low</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#18B76A] text-[9px] font-bold">Resolved</span>
            </div>
          </div>
        </div>

        {/* Campaign Oversight */}
        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-sm font-black text-[#101828]">Campaign Oversight</h3>
            <Link to="/admin/campaigns" className="text-[11px] font-bold text-[#168BFF] hover:underline">View all &rarr;</Link>
          </div>
          <div className="space-y-3 pt-1 text-xs">
            {campaigns.slice(0, 3).map((c) => {
              const pct = Math.min(100, Math.round((c.slotsTaken / (c.slotsTotal || 1)) * 100));
              return (
                <div key={c.id}>
                  <div className="flex items-center justify-between font-bold text-gray-900">
                    <span className="truncate max-w-[170px]">{c.title}</span>
                    <span className="text-[#168BFF]">{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 mt-1 overflow-hidden">
                    <div className="h-full bg-[#168BFF] rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* =========================================================================
          5. SYSTEM ALERTS TELEMETRY TABLE (Matching media_1789585450820.jpg)
         ========================================================================= */}
      <div className="p-6 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-black text-[#101828]">System Alerts</h3>
          </div>
          <span className="text-[11px] font-bold text-[#168BFF] cursor-pointer hover:underline">View all &rarr;</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-gray-400 text-[10px] uppercase font-semibold border-b border-gray-100">
                <th className="py-2.5">Time</th>
                <th className="py-2.5">Severity</th>
                <th className="py-2.5">Message</th>
                <th className="py-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr>
                <td className="py-2.5 text-gray-500 font-mono text-[11px]">Apr 30, 10:24 AM</td>
                <td className="py-2.5">
                  <span className="flex items-center gap-1.5 font-bold text-red-600 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-red-500" /> Critical
                  </span>
                </td>
                <td className="py-2.5 font-bold text-gray-900">
                  Unusual payout velocity detected for user group (rule #7)
                </td>
                <td className="py-2.5 text-right">
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-600 font-bold text-[10px]">
                    Investigating
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-2.5 text-gray-500 font-mono text-[11px]">Apr 30, 08:17 AM</td>
                <td className="py-2.5">
                  <span className="flex items-center gap-1.5 font-bold text-amber-600 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Warning
                  </span>
                </td>
                <td className="py-2.5 text-gray-800">
                  Increase in failed verification attempts from IP range 194.26.*
                </td>
                <td className="py-2.5 text-right">
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-600 font-bold text-[10px]">
                    Monitoring
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-2.5 text-gray-500 font-mono text-[11px]">Apr 29, 11:03 PM</td>
                <td className="py-2.5">
                  <span className="flex items-center gap-1.5 font-bold text-blue-600 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-[#168BFF]" /> Info
                  </span>
                </td>
                <td className="py-2.5 text-gray-800">
                  Scheduled database maintenance completed successfully
                </td>
                <td className="py-2.5 text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#18B76A] font-bold text-[10px]">
                    Resolved
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
