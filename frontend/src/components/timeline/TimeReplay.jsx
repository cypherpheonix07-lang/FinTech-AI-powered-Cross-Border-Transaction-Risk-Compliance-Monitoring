import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, FastForward, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

/**
 * TimeReplay.jsx
 * A temporal controller to replay transactions in sequence.
 */
const TimeReplay = ({ hops, onStepChange }) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= hops.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          const next = prev + 1;
          onStepChange && onStepChange(next);
          return next;
        });
      }, 1000 / speed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, hops.length, speed, onStepChange]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
    onStepChange && onStepChange(-1);
  };

  const handleManualSeek = (val) => {
    setIsPlaying(false);
    setCurrentStep(val);
    onStepChange && onStepChange(val);
  };

  return (
    <div className="bg-dark-800 border border-dark-600 rounded-3xl p-6 shadow-2xl flex items-center space-x-8">
      <div className="flex items-center space-x-4">
        <button 
          onClick={handleReset}
          className="p-3 bg-dark-700 hover:bg-dark-600 rounded-2xl text-slate-400 transition-all border border-dark-600"
        >
          <RotateCcw size={18} />
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 bg-primary hover:bg-primary-hover rounded-2xl text-white transition-all shadow-lg shadow-primary/20"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
      </div>

      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center space-x-2">
            <Clock size={14} className="text-slate-500" />
            <span className="text-xs font-bold text-slate-300">
               {currentStep === -1 ? 'Standby' : `Step ${currentStep + 1} of ${hops.length}`}
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            {currentStep >= 0 ? hops[currentStep].bank : '---'}
          </div>
        </div>
        
        <div className="relative h-2 bg-dark-900 rounded-full group">
           <input 
             type="range"
             min="-1"
             max={hops.length - 1}
             value={currentStep}
             onChange={(e) => handleManualSeek(parseInt(e.target.value))}
             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
           />
           <div className="absolute inset-0 bg-dark-900 rounded-full" />
           <motion.div 
             className="absolute inset-y-0 left-0 bg-primary rounded-full"
             initial={{ width: 0 }}
             animate={{ width: `${((currentStep + 1) / hops.length) * 100}%` }}
           />
           {/* Marker Dots */}
           <div className="absolute inset-0 flex justify-between px-1 items-center pointer-events-none">
              {hops.map((_, i) => (
                <div key={i} className={clsx(
                  "w-1.5 h-1.5 rounded-full",
                  i <= currentStep ? "bg-white" : "bg-dark-700"
                )} />
              ))}
           </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-1">
         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Velocity</span>
         <button 
           onClick={() => setSpeed(s => s >= 4 ? 1 : s * 2)}
           className="px-3 py-1 bg-dark-700 border border-dark-600 rounded-lg text-[10px] font-black text-primary hover:bg-dark-600 transition-all"
         >
           {speed}x
         </button>
      </div>
    </div>
  );
};

export default TimeReplay;
