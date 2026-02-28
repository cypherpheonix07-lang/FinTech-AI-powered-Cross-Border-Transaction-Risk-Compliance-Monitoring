import React, { useState, useEffect } from 'react';
import realtimeService from '../../services/realtime';
import { MessageCircle, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AnnotationsLayer.jsx
 * Displays live highlights and notes from other analysts.
 */
const AnnotationsLayer = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = realtimeService.subscribeCollab((event) => {
      if (event.type === 'annotation') {
        setNotes(prev => [event.payload, ...prev].slice(0, 5)); // Keep last 5
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="fixed bottom-32 left-8 z-[50] pointer-events-none space-y-3">
      <AnimatePresence>
        {notes.map((note, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-dark-800/90 backdrop-blur-md border border-primary/30 p-4 rounded-2xl shadow-2xl flex items-start space-x-3 w-72"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mt-1">
              <User size={14} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-400">Analyst Log</span>
                <span className="text-[9px] text-slate-600 font-mono">LIVE</span>
              </div>
              <p className="text-xs text-slate-200 leading-tight">
                <span className="font-bold text-primary mr-1">@{note.author.substring(0,6)}:</span>
                {note.text}
              </p>
              <div className="mt-2 text-[9px] text-slate-500 font-bold uppercase flex items-center">
                 <MessageCircle size={10} className="mr-1" /> Related to Graph Update
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnnotationsLayer;
