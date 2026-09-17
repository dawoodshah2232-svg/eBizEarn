import React, { useState } from 'react';
import {
  Activity,
  Cpu,
  Server,
  Database,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  HardDrive,
  Radio,
  Terminal,
} from 'lucide-react';

export const AdminSystemHealthPage: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const services = [
    {
      name: 'Laravel REST API Gateway',
      type: 'Core Backend Service',
      status: 'Healthy',
      latency: '24ms',
      uptime: '99.99%',
      icon: Server,
    },
    {
      name: 'PostgreSQL Relational DB Cluster',
      type: 'Double-Entry Ledger & State',
      status: 'Healthy',
      latency: '4ms',
      uptime: '100%',
      icon: Database,
    },
    {
      name: 'Computer Vision AI OCR Engine',
      type: 'Image & Hashtag Scanner',
      status: 'Healthy',
      latency: '1,120ms',
      uptime: '99.98%',
      icon: Cpu,
    },
    {
      name: 'Redis Queue & WebSocket Bus',
      type: 'Async Task Proof Processor',
      status: 'Healthy',
      latency: '1ms',
      uptime: '100%',
      icon: Radio,
    },
    {
      name: 'Multi-Rail Payout Disbursals Gateway',
      type: 'PayPal / Wise / ACH Gateway',
      status: 'Healthy',
      latency: '180ms',
      uptime: '99.95%',
      icon: ShieldCheck,
    },
  ];

  const logs = [
    { time: '02:34:12', level: 'INFO', message: 'Double-entry ledger reconciliation batch #8821 verified (0 discrepancies)' },
    { time: '02:33:45', level: 'INFO', message: 'OCR Engine processed image hash 0x7f9a...b210 in 10.4s (Match: 99.4%)' },
    { time: '02:32:01', level: 'INFO', message: 'Redis queue processed 42 asynchronous task proof dispatches' },
    { time: '02:30:19', level: 'WARN', message: 'High retry rate on webhook endpoint https://test-merchant.io/hook (HTTP 504)' },
    { time: '02:28:44', level: 'INFO', message: 'Automated database incremental snapshot created (s3://backups/pg_dump_0228.enc)' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. HEADER
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            System Health &amp; Infrastructure Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Real-time server latencies, database cluster health, worker queue states, and AI engine uptime.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#168BFF]' : 'text-gray-500'}`} />
          <span>Refresh Telemetry</span>
        </button>
      </div>

      {/* =========================================================================
          2. HARDWARE GAUGES
         ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-gray-500">CPU Compute Load</span>
            <span className="text-[#16B364]">24.2%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="w-[24%] h-full bg-[#16B364] rounded-full" />
          </div>
          <span className="text-[10px] text-gray-400 font-mono block">16 vCPUs (c6g.4xlarge Cluster)</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-gray-500">Memory Allocation</span>
            <span className="text-[#168BFF]">48.6%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="w-[48%] h-full bg-[#168BFF] rounded-full" />
          </div>
          <span className="text-[10px] text-gray-400 font-mono block">31.1 GB of 64 GB in use</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-gray-500">Database Storage NVMe</span>
            <span className="text-[#168BFF]">18.4%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="w-[18%] h-full bg-[#168BFF] rounded-full" />
          </div>
          <span className="text-[10px] text-gray-400 font-mono block">368 GB of 2 TB provisioned</span>
        </div>
      </div>

      {/* =========================================================================
          3. MICROSERVICES STATUS TABLE
         ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E7ECF3] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-black text-gray-900">Distributed Microservices</h2>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#16B364] border border-emerald-200 text-xs font-bold">
            5 / 5 Operational
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Microservice</th>
                <th className="py-3.5 px-5">Role</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Latency</th>
                <th className="py-3.5 px-5 text-right">30d Uptime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((s, i) => {
                const Icon = s.icon;
                return (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#168BFF] flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-gray-900">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-gray-500">{s.type}</td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16B364] border border-emerald-200 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16B364]" />
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-gray-900">{s.latency}</td>
                    <td className="py-4 px-5 text-right font-mono text-emerald-600 font-bold">{s.uptime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          4. LIVE LOGS TERMINAL
         ========================================================================= */}
      <div className="rounded-3xl bg-[#040F1E] border border-white/10 p-5 shadow-2xl space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#20C4E8]" />
            <span className="text-xs font-mono font-bold text-white">Live Platform Production Syslog</span>
          </div>
          <span className="text-[10px] font-mono text-gray-400">Stream: syslog.production.us-east-1</span>
        </div>

        <div className="font-mono text-xs space-y-2 text-gray-300">
          {logs.map((l, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-gray-500">{l.time}</span>
              <span
                className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                  l.level === 'WARN'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}
              >
                {l.level}
              </span>
              <span className="text-gray-200">{l.message}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
