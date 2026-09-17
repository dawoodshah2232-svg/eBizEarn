import React, { useState } from 'react';
import {
  HelpCircle,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Send,
  CheckCircle2,
  FileText,
  ExternalLink,
  LifeBuoy,
  Plus,
} from 'lucide-react';

export const BusinessSupportPage: React.FC = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('campaign_scaling');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const [tickets, setTickets] = useState([
    {
      id: 'BIZ-4091',
      subject: 'Custom OCR verification rule for Arabic language Instagram sticker',
      category: 'Technical Integration',
      status: 'In Progress',
      statusColor: 'bg-blue-50 text-[#168BFF] border-blue-200',
      sla: 'SLA: 2h Remaining',
      updated: '1 hour ago',
    },
    {
      id: 'BIZ-3820',
      subject: 'Increasing monthly escrow limit to $25,000 for Q2 product rollout',
      category: 'Budget & Billing',
      status: 'Resolved',
      statusColor: 'bg-emerald-50 text-[#16B364] border-emerald-200',
      sla: 'Resolved within 45 mins',
      updated: '2 days ago',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject) return;

    const newTicket = {
      id: `BIZ-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject,
      category: ticketCategory === 'campaign_scaling' ? 'Campaign Strategy' : 'Technical Integration',
      status: 'Open',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
      sla: 'SLA: Under 2 Hours',
      updated: 'Just now',
    };

    setTickets([newTicket, ...tickets]);
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketSubject('');
      setTicketMessage('');
    }, 2500);
  };

  return (
    <div className="space-y-6 text-left font-sans max-w-6xl mx-auto">
      
      {/* =========================================================================
          1. HEADER
         ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#101828]">
            Priority Business Support
          </h1>
          <p className="text-xs sm:text-sm text-[#475467] mt-0.5">
            Dedicated enterprise account assistance, custom campaign configurations, and SLA-backed tickets.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#168BFF] border border-blue-100 text-xs font-bold self-start sm:self-auto">
          &check; Tier 1 Enterprise SLA Active
        </span>
      </div>

      {/* =========================================================================
          2. DEDICATED ACCOUNT MANAGER CARD
         ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#07182F] to-[#0D2342] text-white border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160"
            alt="Account Manager"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#20C4E8]"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-white">Nadia Al-Mansoor</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Online
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">Dedicated Senior Growth Strategist</p>
            <p className="text-[11px] text-gray-400 font-mono mt-1">Direct: nadia.m@biznetwork.com</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-colors flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5 text-[#20C4E8]" />
            <span>Book 30m Strategy Call</span>
          </button>
          <a
            href="mailto:nadia.m@biznetwork.com"
            className="px-4 py-2.5 rounded-xl bg-[#168BFF] hover:bg-[#1277dc] text-xs font-bold text-white shadow-md shadow-blue-500/25 transition-all flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Email</span>
          </a>
        </div>
      </div>

      {/* =========================================================================
          3. TICKET CREATION & ACTIVE TICKETS
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* New Ticket Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-[#E7ECF3] shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-black text-gray-900">Open Priority Ticket</h2>
            <p className="text-xs text-gray-500">Guaranteed response under 2 business hours for enterprise clients</p>
          </div>

          {ticketSubmitted ? (
            <div className="p-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#16B364] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">Ticket Dispatched!</h4>
              <p className="text-xs text-gray-500">Nadia and the technical operations team have been alerted.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Category</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#168BFF]"
                >
                  <option value="campaign_scaling">Campaign Optimization &amp; Scaling</option>
                  <option value="ocr_custom">Custom AI Proof OCR Verification Rules</option>
                  <option value="billing">Escrow Limit &amp; Wire Billing Inquiry</option>
                  <option value="api">Webhooks &amp; API Integration Support</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Subject</label>
                <input
                  type="text"
                  placeholder="E.g. Need to configure custom OCR hashtag matching rule"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#168BFF]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">Message &amp; Requirements</label>
                <textarea
                  rows={4}
                  placeholder="Provide campaign IDs, expected target volume, or technical requirements..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-900 focus:outline-none focus:border-[#168BFF]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#168BFF] hover:bg-[#1277dc] text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Priority Ticket</span>
              </button>
            </form>
          )}
        </div>

        {/* Existing Tickets List */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-[#E7ECF3] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-gray-900">Recent Enterprise Tickets</h2>
            <span className="text-xs text-gray-400 font-mono">{tickets.length} Active</span>
          </div>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-2 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-gray-900">{t.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${t.statusColor}`}>
                    {t.status}
                  </span>
                </div>

                <p className="text-xs font-bold text-gray-800 leading-snug">{t.subject}</p>

                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-200/60">
                  <span>{t.category}</span>
                  <span className="font-mono font-medium text-[#168BFF]">{t.sla}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3 text-xs text-blue-900">
              <LifeBuoy className="w-5 h-5 text-[#168BFF] shrink-0" />
              <span>For emergency platform incidents, call your account hotline directly at <strong>+971 4 800 2496</strong>.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
