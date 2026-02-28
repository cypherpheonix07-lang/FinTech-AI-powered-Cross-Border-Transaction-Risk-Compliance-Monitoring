import React, { useState } from 'react';
import { X, Save, MessageSquare, Paperclip, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../app/store';

/**
 * CaseEditor.jsx
 * Side drawer for editing case details, adding comments, and changing status.
 */
const CaseEditor = ({ isOpen, onClose, caseId }) => {
  const { cases, updateCaseStatus, addCommentToCase } = useStore();
  const activeCase = cases.find(c => c.id === caseId);
  const [newComment, setNewComment] = useState('');

  if (!activeCase) return null;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addCommentToCase(caseId, {
      id: Date.now(),
      text: newComment,
      author: 'Current_User',
      time: new Date().toISOString()
    });
    setNewComment('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed right-0 top-0 h-screen w-[500px] bg-dark-800 border-l border-dark-600 shadow-2xl z-50 flex flex-col"
        >
          <div className="p-6 border-b border-dark-600 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Investigation Management</span>
              <h2 className="text-xl font-bold text-slate-100">{activeCase.id}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-full text-slate-500 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Metadata Section */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Case Title</label>
                <div className="text-slate-100 font-medium bg-dark-900 border border-dark-600 p-3 rounded-xl">{activeCase.title}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Status</label>
                  <select 
                    value={activeCase.status}
                    onChange={(e) => updateCaseStatus(caseId, e.target.value)}
                    className="w-full bg-dark-900 border border-dark-600 p-3 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Assigned Analyst</label>
                  <div className="text-slate-100 font-medium bg-dark-900 border border-dark-600 p-3 rounded-xl text-sm italic">{activeCase.analyst}</div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-200 flex items-center">
                <MessageSquare size={16} className="mr-2 text-primary" /> Activity Log
              </h4>
              <div className="space-y-4 bg-dark-900/50 p-4 rounded-3xl border border-dark-700">
                {(activeCase.comments || []).length === 0 ? (
                  <p className="text-xs text-slate-600 italic text-center py-4">No comments yet. Start the investigation discussion.</p>
                ) : (
                  activeCase.comments.map(comment => (
                    <div key={comment.id} className="flex flex-col space-y-1">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[10px] font-bold text-slate-500">{comment.author}</span>
                        <span className="text-[10px] text-slate-600">{new Date(comment.time).toLocaleTimeString()}</span>
                      </div>
                      <div className="bg-dark-700 p-3 rounded-2xl rounded-tl-none text-xs text-slate-300">
                        {comment.text}
                      </div>
                    </div>
                  ))
                )}
                
                <form onSubmit={handleAddComment} className="relative mt-4 pt-4 border-t border-dark-700">
                  <input 
                    type="text" 
                    placeholder="Add observation..."
                    className="w-full bg-dark-800 border border-dark-600 rounded-2xl pl-4 pr-12 py-3 text-xs text-slate-300 focus:outline-none focus:border-primary"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button type="submit" className="absolute right-2 top-6 p-2 text-primary hover:scale-110 transition-transform">
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>

            {/* Evidence Attachments */}
            <div className="space-y-4 pb-20">
              <h4 className="text-sm font-bold text-slate-200 flex items-center">
                <Paperclip size={16} className="mr-2 text-primary" /> Forensic Evidence (Linked)
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {activeCase.txIds.map(tx => (
                  <div key={tx} className="bg-dark-900 border border-dark-600 p-3 rounded-xl text-xs flex justify-between items-center group">
                    <span className="font-mono text-slate-400 group-hover:text-primary transition-colors">{tx}</span>
                    <button className="text-primary hover:underline font-bold">View Explainability</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-dark-600 bg-dark-900/50 flex space-x-4">
            <button className="flex-1 bg-primary text-white font-bold py-3 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center">
               <Save size={18} className="mr-2" /> Global Sync
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaseEditor;
