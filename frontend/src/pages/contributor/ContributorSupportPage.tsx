import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  Plus,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Send,
  FileText,
  LifeBuoy,
  X,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformDataContext';

export const ContributorSupportPage: React.FC = () => {
  const { tickets, createSupportTicket } = usePlatform();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // New Ticket Form State
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('payout');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const faqs = [
    {
      q: 'Why did my task submission get flagged by the AI scanner?',
      a: 'Submissions are checked by computer vision OCR for live timestamps, correct hashtags, and your verified username. If you cropped the header or submitted a screenshot older than 24 hours, the AI may flag it. You can dispute any decision here for human review.',
    },
    {
      q: 'How long does a withdrawal take to hit my account?',
      a: 'CBUAE Wages Protection System (WPS) and Emirates NBD/FAB instant bank transfers are dispatched within minutes. Digital payouts clear immediately through our automated ledger.',
    },
    {
      q: 'Can I change my connected TikTok or Instagram account?',
      a: 'Yes, head to your Profile -> Connected Social Accounts tab to submit a handle change. Our compliance team verifies handle ownership within a few hours.',
    },
    {
      q: 'What is the minimum cashout threshold?',
      a: 'The minimum withdrawal is strictly AED 20.00. We never charge withdrawal fees or account maintenance fees.',
    },
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject) return;

    createSupportTicket({
      subject: ticketSubject,
      category: ticketCategory === 'payout' ? 'Payout Inquiry' : ticketCategory === 'dispute' ? 'Verification Dispute' : 'General Support',
      priority: 'Normal',
      description: ticketDescription || 'Issue submitted by contributor.',
      source: 'contributor_portal',
    });

    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setShowNewTicketModal(false);
      setTicketSubject('');
      setTicketDescription('');
    }, 1200);
  };

  return (
    <div className="space-y-6 text-left font-sans max-w-6xl mx-auto">
      
      {/* =========================================================================
          1. HEADER & ACTION
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Contributor Helpdesk &amp; Support
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Resolve task verification disputes, payout inquiries, and account questions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowNewTicketModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#168BFF] hover:bg-[#1277dc] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Open New Ticket</span>
        </button>
      </div>

      {/* =========================================================================
          2. SUMMARY STAT CARDS
         ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#168BFF] flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium block">Total Tickets</span>
            <span className="text-2xl font-black text-gray-900 mt-0.5 block">{tickets.length}</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium block">In Progress / Open</span>
            <span className="text-2xl font-black text-gray-900 mt-0.5 block">
              {tickets.filter((t) => t.status !== 'Resolved').length}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7ECF3] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#16B364] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium block">Average Resolution Time</span>
            <span className="text-2xl font-black text-gray-900 mt-0.5 block">1.8 Hours</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. TICKETS TABLE & SEARCH
         ========================================================================= */}
      <div className="bg-white rounded-3xl border border-[#E7ECF3] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search your tickets by subject or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
            />
          </div>

          <div className="flex items-center gap-2">
            {['all', 'open', 'resolved'].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedCategory(filter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === filter
                    ? 'bg-[#07182F] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-5">Ticket ID</th>
                <th className="py-3.5 px-5">Subject</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Priority</th>
                <th className="py-3.5 px-5 text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-gray-900">{t.id}</td>
                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-900 block">{t.subject}</span>
                    <span className="text-[10px] text-gray-400">{t.repliesCount ?? 1} responses</span>
                  </td>
                  <td className="py-4 px-5 text-gray-600 font-medium">{t.category}</td>
                  <td className="py-4 px-5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${t.statusColor}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 font-semibold text-gray-700">{t.priority}</td>
                  <td className="py-4 px-5 text-right text-gray-500 font-mono">{t.updatedAt || t.time || 'Just now'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================================
          4. FREQUENTLY ASKED QUESTIONS
         ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7ECF3] shadow-xs space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <LifeBuoy className="w-5 h-5 text-[#168BFF]" />
          <h2 className="text-base font-black text-gray-900">Instant Answers &amp; Knowledge Base</h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-gray-900 hover:bg-gray-50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      isOpen ? 'rotate-180 text-[#168BFF]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-gray-600 leading-relaxed bg-gray-50/50 border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          MODAL: CREATE NEW TICKET
         ========================================================================= */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative space-y-5 animate-scale-up">
            <button
              type="button"
              onClick={() => setShowNewTicketModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#168BFF] flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-gray-900">Open Support Ticket</h2>
                <p className="text-xs text-gray-500">Dedicated assistance for verified contributors</p>
              </div>
            </div>

            {ticketSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#16B364] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-bold text-gray-900">Ticket Submitted!</h3>
                <p className="text-xs text-gray-500">Our support desk is reviewing your submission.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
                  >
                    <option value="payout">Payout Inquiry &amp; Withdrawal Status</option>
                    <option value="dispute">OCR Task Proof Verification Dispute</option>
                    <option value="social">Connected Social Account Issue</option>
                    <option value="bug">Platform Bug or Technical Error</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Subject</label>
                  <input
                    type="text"
                    placeholder="E.g. Task #4928 proof verification rejected unfairly"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Detailed Description</label>
                  <textarea
                    rows={4}
                    placeholder="Explain what happened, include task IDs or transaction references..."
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:border-[#168BFF]"
                    required
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewTicketModal(false)}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#168BFF] hover:bg-[#1277dc] text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Ticket</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
