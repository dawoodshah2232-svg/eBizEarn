import React, { useState } from 'react';
import {
  Settings,
  Building,
  Users,
  Key,
  ShieldCheck,
  Save,
  CheckCircle2,
  Copy,
  Plus,
  Trash2,
  Bell,
  Globe,
} from 'lucide-react';

export const BusinessSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'company' | 'team' | 'api' | 'brand'>('company');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  // Company details
  const [companyName, setCompanyName] = useState('Acme Brands Inc.');
  const [website, setWebsite] = useState('https://acmebrands.com');
  const [industry, setIndustry] = useState('Consumer Goods & Cosmetics');
  const [taxId, setTaxId] = useState('TRN-9021892182');

  // Team
  const [team, setTeam] = useState([
    { name: 'Alex Johnson', email: 'alex@acmebrands.com', role: 'Owner / Admin', status: 'Active' },
    { name: 'Maria Chen', email: 'maria.c@acmebrands.com', role: 'Campaign Manager', status: 'Active' },
    { name: 'David Lee', email: 'david@acmebrands.com', role: 'Analyst', status: 'Pending' },
  ]);

  const [webhookUrl, setWebhookUrl] = useState('https://api.acmebrands.com/webhooks/biznetwork');

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('bz_live_99a8b7c6d5e4f3a2b1c0d9e8');
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-left font-sans max-w-6xl mx-auto">
      
      {/* =========================================================================
          1. HEADER
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Business CRM Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Configure your brand identity, manage team member access, and connect developer API webhooks.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs text-[#16B364] font-bold flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </span>
        )}
      </div>

      {/* =========================================================================
          2. SETTINGS TABS
         ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E7ECF3] shadow-xs overflow-hidden">
        <div className="flex items-center gap-2 px-6 border-b border-gray-100 overflow-x-auto">
          {[
            { id: 'company', label: 'Company Profile', icon: Building },
            { id: 'team', label: 'Team Members', icon: Users },
            { id: 'api', label: 'API Keys & Webhooks', icon: Key },
            { id: 'brand', label: 'Brand Guidelines', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-3 border-b-2 text-xs font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-[#168BFF] text-[#168BFF]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6 sm:p-8">
          
          {/* TAB 1: COMPANY PROFILE */}
          {activeTab === 'company' && (
            <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Company Legal Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Official Website URL</label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Primary Industry</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Tax Registration Number (TRN/VAT)</label>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#168BFF] hover:bg-[#1277dc] text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: TEAM MEMBERS */}
          {activeTab === 'team' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-gray-900">Manage Team Access</h3>
                  <p className="text-xs text-gray-500">Add marketing managers or analysts to launch and review campaigns.</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#168BFF] text-white text-xs font-bold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Invite Member</span>
                </button>
              </div>

              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase">
                    <tr>
                      <th className="py-3 px-4">Member</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {team.map((m, i) => (
                      <tr key={i}>
                        <td className="py-3 px-4">
                          <span className="font-bold text-gray-900 block">{m.name}</span>
                          <span className="text-gray-400 text-[11px]">{m.email}</span>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-700">{m.role}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              m.status === 'Active'
                                ? 'bg-emerald-50 text-[#16B364]'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button type="button" className="text-gray-400 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: API & WEBHOOKS */}
          {activeTab === 'api' && (
            <div className="space-y-6 max-w-3xl">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">Live Production API Key</label>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    value="bz_live_99a8b7c6d5e4f3a2b1c0d9e8"
                    readOnly
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={handleCopyApiKey}
                    className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{apiKeyCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <span className="text-[10px] text-gray-400">Use to programmatically launch campaigns via REST API.</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">Event Webhook Endpoint (POST)</label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
                />
                <span className="text-[10px] text-gray-400">Receives verified task proof payloads (`task.completed`, `proof.verified`).</span>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setSavedSuccess(true);
                    setTimeout(() => setSavedSuccess(false), 3000);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#168BFF] text-white font-bold text-xs shadow-md shadow-blue-500/20"
                >
                  Save API Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: BRAND GUIDELINES */}
          {activeTab === 'brand' && (
            <div className="space-y-4 max-w-3xl">
              <div>
                <h3 className="text-sm font-black text-gray-900">Automated Content Quality Guardrails</h3>
                <p className="text-xs text-gray-500">Enforce minimum contributor standards across all launched tasks.</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">Require Level 2+ Verified Contributors Only</span>
                    <span className="text-[10px] text-gray-500">Restricts participation to contributors with &gt;95% past proof approval rate.</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-[#168BFF] focus:ring-0" />
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">Strict OCR Hashtag &amp; Sticker Enforcement</span>
                    <span className="text-[10px] text-gray-500">Auto-reject screenshots where brand tag is cropped or missing link sticker.</span>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded text-[#168BFF] focus:ring-0" />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
