import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Users, Shield } from 'lucide-react';

/**
 * LiveNotes.jsx
 * Real-time collaborative annotation feed via WebSockets.
 */
const LiveNotes = () => {
  const [notes, setNotes] = useState([
    { id: 1, user: 'Analyst_Alpha', text: 'Spotted high-velocity burst in Dubai corridor.', ts: '10:05 AM' },
    { id: 2, user: 'Lead_Investigator', text: 'Assigning TX_482 to priority queue.', ts: '10:08 AM' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newNote = {
      id: Date.now(),
      user: 'You',
      text: input,
      ts: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotes([...notes, newNote]);
    setInput('');
    // In production, we would wss.send(JSON.stringify(newNote))
  };

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-3xl h-full flex flex-col shadow-2xl overflow-hidden">
      <div className="p-6 border-b border-dark-600 bg-dark-900/30 flex justify-between items-center">
        <h3 className="text-xs font-black text-slate-100 uppercase tracking-widest flex items-center">
          <MessageSquare size={16} className="text-primary mr-2" /> Collaboration Feed
        </h3>
        <span className="flex items-center space-x-2">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[10px] font-bold text-slate-500">3 ACTIVE</span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {notes.map((note) => (
          <div key={note.id} className="flex flex-col space-y-1">
             <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-primary uppercase">@{note.user.substring(0, 12)}</span>
                <span className="text-[9px] text-slate-600 font-mono">{note.ts}</span>
             </div>
             <div className="bg-dark-900 border border-dark-700 p-4 rounded-t-xl rounded-br-xl text-xs text-slate-300 leading-relaxed shadow-lg">
                {note.text}
             </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-dark-900/50 border-t border-dark-600">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Broadcast finding..." 
            className="w-full bg-dark-800 border-dark-600 text-xs text-slate-200 pl-4 pr-12 py-4 rounded-2xl focus:border-primary focus:ring-0"
          />
          <button 
            onClick={handleSend}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary-hover p-2 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveNotes;
