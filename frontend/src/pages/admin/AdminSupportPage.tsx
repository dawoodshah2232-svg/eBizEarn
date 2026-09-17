import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Send,
  Eye,
  X,
  MessageSquare,
  FileText,
  UserCheck,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformDataContext';

export const AdminSupportPage: React.FC = () => {
  const { tickets, updateTicketStatus } = usePlatform();
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDispute, setSelectedDispute] = useState<any | null>(null);

  const handleOverrideApprove = (id: string) => {
    updateTicketStatus(id, 'Resolved');
    setSelectedDispute(null);
  };

  const handleUpholdRejection = (id: string) => {
    updateTicketStatus(id, 'Closed');
    setSelectedDispute(null);
  };

  const filtered = tickets.filter((t) => {
    const ticketType = t.type || t.category || '';
    const matchesCategory =
      filterCategory === 'all'
        ? true
        : ticketType.toLowerCase().includes(filterCategory.toLowerCase());
    const contributorName = t.contributor || t.userName || '';
    const matchesSearch =
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contributorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 text-left font-sans max-w-7xl mx-auto">
      
      {/* =========================================================================
          1. HEADER
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Master Dispute &amp; Support Desk
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Resolve proof verification disputes between contributors and brand campaign managers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
            Pending Disputes: {tickets.filter((t) => t.status.includes('Open')).length}
          </span>
        </div>
      </div>

      {/* =========================================================================
          2. FILTERS & TABLE
         ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E7ECF3] shadow-xs overflow-hidden space-y-4">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Disputes' },
              { id: 'proof', label: 'Proof Disputes' },
              { id: 'payout', label: 'Payout Issues' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  filterCategory === tab.id
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
              placeholder="Search disputes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Dispute ID &bull; Subject</th>
                <th className="py-3.5 px-5">Contributor</th>
                <th className="py-3.5 px-5">Brand Client</th>
                <th className="py-3.5 px-5">Escrow</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Arbitration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-900 block">{t.subject}</span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {t.id} &bull; {t.type || t.category} &bull; {t.time || t.createdAt || 'Just now'}
                    </span>
                  </td>

                  <td className="py-4 px-5 font-medium text-gray-800">{t.contributor || t.userName || 'Sarah Khan'}</td>

                  <td className="py-4 px-5 text-gray-600">{t.brand || t.category || 'eBiz Network'}</td>

                  <td className="py-4 px-5 font-mono font-bold text-[#16B364]">{t.amount || 'AED 18.00'}</td>

                  <td className="py-4 px-5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${t.statusColor}`}>
                      {t.status}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedDispute(t)}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-[#168BFF] hover:text-white text-gray-700 font-bold text-xs transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review Dispute</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          DISPUTE ARBITRATION MODAL
         ========================================================================= */}
      {selectedDispute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900">Arbitration &amp; Proof Inspection</h3>
                <p className="text-xs text-gray-500 font-mono">{selectedDispute.id} &bull; Escrow: {selectedDispute.amount}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDispute(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-1">
                <span className="text-gray-500 font-bold block">Contributor Claim:</span>
                <p className="text-gray-800">{selectedDispute.subject}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs space-y-1">
                <span className="text-blue-900 font-bold block">AI OCR Log &amp; Auditor Note:</span>
                <p className="text-blue-800">{selectedDispute.proofImg}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => handleUpholdRejection(selectedDispute.id)}
                className="px-4 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-colors"
              >
                Uphold Rejection (Refund Brand)
              </button>
              <button
                type="button"
                onClick={() => handleOverrideApprove(selectedDispute.id)}
                className="px-5 py-2 rounded-xl bg-[#16B364] hover:bg-[#139452] text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-colors"
              >
                Admin Override &amp; Pay Contributor
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
