import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Building,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import { usePlatform } from '../../context/PlatformDataContext';

export const ContactPage: React.FC = () => {
  const { createSupportTicket } = usePlatform();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('contributor');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createSupportTicket({
      subject: `${topic.toUpperCase()}: Inquiry from ${name}`,
      category: topic === 'contributor' ? 'Contributor Support' : topic === 'business' ? 'Business Campaign' : 'General Inquiry',
      priority: 'Normal',
      description: message,
      userName: name,
      userEmail: email,
      source: 'contact_form',
    });
    setTicketId(created.id);
    setSubmitted(true);
  };

  return (
    <div className="text-left font-sans min-h-screen bg-[#F7F9FC]">
      
      {/* Hero */}
      <section className="relative bg-[#07182F] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 overflow-hidden border-b border-white/10 bg-grid-mesh-dark">
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-[#168BFF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#20C4E8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>24/7 Global Support Network</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            We're Here to Help You Grow.
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Whether you are an earner seeking payout assistance or an enterprise brand planning a viral campaign, our global team is ready.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left 5 Cols: Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#168BFF] uppercase tracking-wider block">Dedicated Desks</span>
              <h2 className="text-2xl font-black text-gray-900 mt-1">Get in Touch Directly</h2>
              <p className="text-xs text-gray-500 mt-1">Select the most relevant channel for rapid resolution.</p>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="p-5 rounded-2xl bg-white border border-[#E4EAF2] shadow-xs space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#168BFF] flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Contributor Support</h3>
                    <p className="text-[11px] text-gray-400">Tasks, proof reviews &amp; payouts</p>
                  </div>
                </div>
                <a href="mailto:support@biznetwork.com" className="text-xs font-bold text-[#168BFF] hover:underline block pt-1">
                  support@biznetwork.com
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E4EAF2] shadow-xs space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#7357FF] flex items-center justify-center">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Enterprise &amp; Brand Inquiries</h3>
                    <p className="text-[11px] text-gray-400">Custom campaigns, SLAs &amp; escrow</p>
                  </div>
                </div>
                <a href="mailto:brands@biznetwork.com" className="text-xs font-bold text-[#7357FF] hover:underline block pt-1">
                  brands@biznetwork.com
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E4EAF2] shadow-xs space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#16B364] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Trust, Safety &amp; Legal</h3>
                    <p className="text-[11px] text-gray-400">Policy violations &amp; verification audits</p>
                  </div>
                </div>
                <a href="mailto:compliance@biznetwork.com" className="text-xs font-bold text-[#16B364] hover:underline block pt-1">
                  compliance@biznetwork.com
                </a>
              </div>

            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2 text-xs">
              <span className="font-bold text-gray-800 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#168BFF]" />
                <span>Response Time Commitment</span>
              </span>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Tickets are typically acknowledged within <strong>15 minutes</strong> for urgent payout questions, and under <strong>2 hours</strong> for general inquiries.
              </p>
            </div>
          </div>

          {/* Right 7 Cols: Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E4EAF2] shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#16B364] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-black text-gray-900">Message Received!</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>. Your ticket has been assigned reference <strong className="text-emerald-700 font-mono">#{ticketId || 'TKT-UAE-8921'}</strong>. A team member from the Dubai Operations Desk will reply to <strong>{email}</strong> shortly.
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setMessage(''); }}
                    className="px-6 py-2.5 bg-[#07182F] text-white rounded-xl text-xs font-bold hover:bg-[#168BFF] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-black text-gray-900">Send Us an Inquiry</h3>
                  <p className="text-xs text-gray-500">Fill out this quick form and our routing bot will deliver it to the right department.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Department / Inquiry Type</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
                  >
                    <option value="contributor">Contributor: Task, Proof or Payout Issue</option>
                    <option value="business">Business: Campaign Launch or Escrow Deposit</option>
                    <option value="compliance">Trust &amp; Safety: Fraud Report or Dispute</option>
                    <option value="press">Partnership or Media Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide relevant details, task IDs, or campaign requirements..."
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#168BFF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#07182F] hover:bg-[#168BFF] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
