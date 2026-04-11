import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Search, 
  ChevronRight, 
  LifeBuoy, 
  ShieldCheck, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    { q: 'How long do international transfers take?', a: 'Most cross-border transfers are settled within 2-4 hours, though some can take up to 24 hours depending on the destination bank.' },
    { q: 'What are the cryptographic proofs?', a: 'Every PathGuard transaction generates a SHA-256 hash that records every hop on our private ledger, ensuring total transparency.' },
    { q: 'Can I cancel a pending transfer?', a: 'Transfers can only be cancelled while in the "Initiated" state. Once they reach the clearing bank, they are immutable.' },
    { q: 'How do I increase my spending limit?', a: 'You can increase limits by completing Advanced Identity Verification (Level 2) in your Security Settings.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">How can we help?</h1>
        <p className="text-slate-500 font-medium">Search our knowledge base or contact a dedicated compliance officer.</p>
        
        <div className="relative mt-8 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search for articles, guides..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] text-lg shadow-xl shadow-slate-200/20 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
          />
        </div>
      </div>

      {/* Support Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
           <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
           </div>
           <h3 className="text-lg font-black text-slate-900 mb-2">Live Chat</h3>
           <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">Real-time support with our specialist banking team.</p>
           <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Online Now
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
           <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 mb-6 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
           </div>
           <h3 className="text-lg font-black text-slate-900 mb-2">Phone Call</h3>
           <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">Speak directly with a compliance officer for large transfers.</p>
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Mon-Fri, 9am - 6pm
           </div>
        </div>

        <div className="bg-blue-950 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-900/20 group hover:scale-[1.02] transition-all cursor-pointer">
           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
              <ShieldCheck className="w-6 h-6" />
           </div>
           <h3 className="text-lg font-black mb-2">Dispute Center</h3>
           <p className="text-xs text-blue-200/50 font-medium leading-relaxed mb-6">Formal investigation requests for specific transactions.</p>
           <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400">
              Start Request <ArrowRight className="w-3 h-3" />
           </button>
        </div>
      </div>

      {/* FAQ & Knowledge Base Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
           <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Frequently Asked</h3>
           </div>
           
           <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="group border-b border-slate-50 last:border-0 pb-4">
                   <button className="w-full flex justify-between items-center text-left py-2">
                     <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{faq.q}</span>
                     <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                   </button>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed hidden group-focus:block mt-2">{faq.a}</p>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200/50">
           <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest">Tutorials & Guides</h3>
           </div>
           <div className="space-y-4">
              {[
                'Understanding PathGuard Ledger',
                'Setting up 2FA correctly',
                'International Transfer Fees Explained',
                'Business vs Personal Wallets'
              ].map((guide) => (
                <button key={guide} className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group">
                   <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{guide}</span>
                   <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-blue-500 transition-colors" />
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Footer Support Banner */}
      <div className="max-w-5xl mx-auto bg-blue-600 p-8 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-600/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="flex items-center gap-6 relative z-10 text-center md:text-left">
             <div className="w-16 h-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md">
                <LifeBuoy className="w-8 h-8" />
             </div>
             <div>
                <h4 className="text-xl font-black">Still have questions?</h4>
                <p className="text-blue-100/70 text-sm font-medium">Our global team is available 24/7 to assist you.</p>
             </div>
          </div>
          <Button className="bg-white text-blue-700 hover:bg-slate-100 font-black px-8 py-6 rounded-2xl text-xs uppercase tracking-widest relative z-10 transition-transform active:scale-95">
             Chat with Us Now
          </Button>
      </div>
    </div>
  );
}
