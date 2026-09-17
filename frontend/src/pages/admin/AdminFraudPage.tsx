import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, User, Eye, ArrowRight } from 'lucide-react';

export const AdminFraudPage: React.FC = () => {
  const [filterSeverity, setFilterSeverity] = useState('all');

  const fraudEvents = [
    {
      id: 1,
      eventType: 'duplicate_screenshot_reused',
      userName: 'Alex K.',
      userId: 44,
      severity: 'high',
      score: 68,
      details: 'Identical perceptual hash detected across 2 different accounts on Task #101.',
      ip: '192.168.1.88',
      time: '12 mins ago',
      status: 'flagged',
    },
    {
      id: 2,
      eventType: 'rapid_completion_anomaly',
      userName: 'Farhan T.',
      userId: 78,
      severity: 'medium',
      score: 42,
      details: 'Task completed in 8 seconds (expected minimum 5 minutes).',
      ip: '192.168.4.12',
      time: '45 mins ago',
      status: 'flagged',
    },
    {
      id: 3,
      eventType: 'duplicate_url_cluster',
      userName: 'Samir D.',
      userId: 102,
      severity: 'critical',
      score: 85,
      details: 'Same Facebook permalink submitted by 3 separate user IDs within 10 minutes.',
      ip: '192.168.9.22',
      time: '2 hours ago',
      status: 'under_investigation',
    },
  ];

  const filtered = fraudEvents.filter((ev) => {
    if (filterSeverity === 'all') return true;
    return ev.severity === filterSeverity;
  });

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-2xl font-black text-[#101828]">Fraud Detection &amp; Risk Center</h2>
        <p className="text-xs text-[#667085] mt-0.5">
          Real-time signal analysis: duplicate proof hashing, rapid submission limits, and cluster detection.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        {['all', 'critical', 'high', 'medium'].map((sev) => (
          <button
            key={sev}
            type="button"
            onClick={() => setFilterSeverity(sev)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              filterSeverity === sev
                ? 'bg-[#07182F] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Fraud Cards List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-[#E4EAF2] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  item.severity === 'critical'
                    ? 'bg-red-100 text-red-700'
                    : item.severity === 'high'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                <ShieldAlert className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      item.severity === 'critical'
                        ? 'bg-red-50 text-red-700'
                        : item.severity === 'high'
                        ? 'bg-orange-50 text-orange-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    Risk: {item.severity} ({item.score}%)
                  </span>
                  <span className="text-[10px] text-gray-400">&bull; {item.time}</span>
                </div>

                <h4 className="text-sm font-bold text-gray-900 font-mono">{item.eventType}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{item.details}</p>
                <div className="flex items-center gap-4 text-[10px] text-gray-400 mt-1">
                  <span>User: <strong>{item.userName}</strong> (#{item.userId})</span>
                  <span>IP: {item.ip}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert(`Reviewing user #${item.userId}`)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors"
              >
                Inspect User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
