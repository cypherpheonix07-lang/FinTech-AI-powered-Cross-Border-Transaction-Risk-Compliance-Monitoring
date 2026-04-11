import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Star, 
  MoreVertical, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Phone,
  Building2,
  Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import TransferWizard from '@/components/transfers/TransferWizard';

const MOCK_RECIPIENTS = [
  { id: '1', name: 'Emma Watson', email: 'emma@watson.co.uk', phone: '+44 7700 900077', bank: 'Barclays Bank', verified: true, favorite: true, avatar: 'EW' },
  { id: '2', name: 'TechCorp Ltd', email: 'finance@techcorp.io', phone: '+44 20 7946 0000', bank: 'HSBC UK', verified: true, favorite: true, avatar: 'TC' },
  { id: '3', name: 'Local Cafe', email: 'hello@localcafe.com', phone: '+44 20 7946 0011', bank: 'NatWest', verified: false, favorite: false, avatar: 'LC' },
  { id: '4', name: 'James Blake', email: 'james.b@gmail.com', phone: '+44 7700 900555', bank: 'Monzo', verified: true, favorite: false, avatar: 'JB' },
  { id: '5', name: 'Global Logistics', email: 'ops@globallog.com', phone: '+1 202 555 0101', bank: 'JP Morgan Chase', verified: true, favorite: true, avatar: 'GL' },
];

export default function RecipientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  const filteredRecipients = MOCK_RECIPIENTS.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Recipients</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your verified beneficiaries for rapid, secure transfers.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95 shrink-0">
            <Plus className="w-5 h-5" /> Add New
          </button>
        </div>
      </div>

      {/* Stats Quick Look */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-100 flex items-center gap-2 shrink-0">
          <CheckCircle2 className="w-4 h-4" /> 88% Verified Contacts
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold border border-blue-100 flex items-center gap-2 shrink-0">
          <Star className="w-4 h-4 fill-blue-700" /> 12 Favorites
        </div>
        <div className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 flex items-center gap-2 shrink-0">
          <ShieldCheck className="w-4 h-4" /> AML Whitelist Active
        </div>
      </div>

      {/* Recipients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipients.map((recipient) => (
          <div key={recipient.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-6 right-6 flex items-center gap-1">
              <button className={cn(
                "p-2 rounded-xl transition-all",
                recipient.favorite ? "text-amber-400 bg-amber-50" : "text-slate-300 hover:text-slate-400"
              )}>
                <Star className={cn("w-5 h-5", recipient.favorite && "fill-amber-400")} />
              </button>
              <button className="p-2 text-slate-300 hover:text-slate-600 rounded-xl transition-all">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-[2rem] flex items-center justify-center border-4 border-slate-50 shadow-inner mb-4 relative group-hover:scale-105 transition-transform duration-500">
                <span className="text-2xl font-black text-blue-600 font-mono tracking-tighter">{recipient.avatar}</span>
                {recipient.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-4 border-white">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-1">{recipient.name}</h3>
              <div className="flex items-center gap-1.5 justify-center mb-6">
                 <Building2 className="w-3 h-3 text-slate-400" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{recipient.bank}</span>
              </div>

              <div className="w-full space-y-3 mb-8">
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl group-hover:bg-blue-50/50 transition-colors">
                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="text-xs font-medium text-slate-600 truncate">{recipient.email}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl group-hover:bg-blue-50/50 transition-colors">
                  <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="text-xs font-medium text-slate-600">{recipient.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                <Button 
                  onClick={() => setIsTransferOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-2xl text-xs gap-2 shadow-lg shadow-blue-600/10 active:scale-95"
                >
                  Send Money
                </Button>
                <Button variant="ghost" className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold h-12 rounded-2xl text-xs border border-slate-200/50 active:scale-95">
                  Profile
                </Button>
              </div>
            </div>
            
            {/* Quick action overlay on hover */}
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-white/80 backdrop-blur-sm border-t border-slate-100 flex justify-center">
               <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:underline">
                 View History <ExternalLink className="w-3 h-3" />
               </button>
            </div>
          </div>
        ))}
      </div>

      <TransferWizard 
        isOpen={isTransferOpen} 
        onClose={() => setIsTransferOpen(false)} 
      />
    </div>
  );
}
