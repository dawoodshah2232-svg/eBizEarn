import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Terminal,
  X,
  FileCode,
} from 'lucide-react';

export const AdminAuditLogsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  const logs = [
    {
      id: 'AUD-9982',
      timestamp: '2026-04-16 02:24:18 UTC',
      actor: 'SuperAdmin (system.operator)',
      action: 'PAYOUT_BATCH_APPROVED',
      resource: 'Batch #8821 ($18,450.00)',
      ip: '192.168.1.104',
      status: 'Success',
      diff: {
        batch_id: 8821,
        recipients_count: 84,
        total_usd: 18450.0,
        rails: ['paypal', 'wise', 'ach'],
        double_entry_verified: true,
      },
    },
    {
      id: 'AUD-9975',
      timestamp: '2026-04-16 01:50:33 UTC',
      actor: 'ComplianceLead (nadia.m)',
      action: 'CAMPAIGN_FROZEN',
      resource: 'CP-SUS-991 (Crypto Moonshot)',
      ip: '86.98.24.12',
      status: 'Enforced',
      diff: {
        campaign_id: 'CP-SUS-991',
        reason: 'Missing statutory financial risk disclaimer',
        escrow_frozen_usd: 500.0,
      },
    },
    {
      id: 'AUD-9961',
      timestamp: '2026-04-15 22:14:02 UTC',
      actor: 'RiskRadarBot (Automated)',
      action: 'USER_ACCOUNT_BANNED',
      resource: 'USR-9021 (proxy98@tempmail.io)',
      ip: '10.0.4.19',
      status: 'Triggered',
      diff: {
        user_id: 'USR-9021',
        risk_score: 0.98,
        reason: 'Sybil farm duplicate OCR hash detected across 14 accounts',
      },
    },
    {
      id: 'AUD-9944',
      timestamp: '2026-04-15 18:30:11 UTC',
      actor: 'SuperAdmin (system.operator)',
      action: 'PLATFORM_SETTINGS_UPDATED',
      resource: 'Global Configuration',
      ip: '192.168.1.104',
      status: 'Updated',
      diff: {
        setting: 'ai_threshold',
        old_value: 94.5,
        new_value: 95.0,
      },
    },
  ];

  const filteredLogs = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. HEADER
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Immutable Administrative Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Cryptographically sealed ledger of all administrative overrides, balance modifications, and bans.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-mono font-bold self-start sm:self-auto">
          SHA-256 Chain Signed &bull; WORM Compliant
        </span>
      </div>

      {/* =========================================================================
          2. AUDIT LOGS TABLE & SEARCH
         ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E7ECF3] shadow-xs overflow-hidden space-y-4">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit logs by action, actor, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Log ID &bull; Timestamp</th>
                <th className="py-3.5 px-5">Admin Actor</th>
                <th className="py-3.5 px-5">Action Type</th>
                <th className="py-3.5 px-5">Target Resource</th>
                <th className="py-3.5 px-5">IP Address</th>
                <th className="py-3.5 px-5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-900 block">{log.id}</span>
                    <span className="text-[10px] text-gray-400 font-normal">{log.timestamp}</span>
                  </td>

                  <td className="py-4 px-5 font-sans font-bold text-gray-800">
                    {log.actor}
                  </td>

                  <td className="py-4 px-5">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#168BFF] border border-blue-200 text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>

                  <td className="py-4 px-5 font-sans font-medium text-gray-700">
                    {log.resource}
                  </td>

                  <td className="py-4 px-5 text-gray-500">{log.ip}</td>

                  <td className="py-4 px-5 text-right font-sans">
                    <button
                      type="button"
                      onClick={() => setSelectedLog(log)}
                      className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-[#168BFF] hover:text-white text-gray-700 font-bold text-xs transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Diff</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          DIFF MODAL
         ========================================================================= */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900">Audit Record Diff Payload</h3>
                <p className="text-xs text-gray-500 font-mono">{selectedLog.id} &bull; {selectedLog.action}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl bg-[#07182F] p-4 text-emerald-400 font-mono text-xs overflow-x-auto">
              <pre>{JSON.stringify(selectedLog.diff, null, 2)}</pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="px-5 py-2 rounded-xl bg-[#07182F] text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
