import React, { useState } from 'react';
import { BEGINNER_STEPS } from '../data/fmhyData';
import { 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Globe, 
  ShieldAlert, 
  Zap, 
  FileCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BeginnerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BeginnerGuideModal: React.FC<BeginnerGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8 transition-colors"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-600/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-600/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-zinc-100 flex items-center gap-2 font-mono">
                  freebies Beginner Setup Checklist
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Essential 4-step security checklist before exploring free media sources.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto font-sans">
            
            {BEGINNER_STEPS.map((stepItem, idx) => {
              const isChecked = completedSteps.has(idx);
              return (
                <div
                  key={stepItem.step}
                  onClick={() => toggleStep(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/80 text-slate-900 dark:text-zinc-100'
                      : 'bg-slate-50 dark:bg-zinc-950/40 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <button className="mt-0.5 shrink-0 text-rose-500">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-rose-500 fill-rose-100 dark:fill-rose-950" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 dark:text-zinc-600" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-sm mb-1 ${isChecked ? 'line-through text-slate-400 dark:text-zinc-400' : 'text-slate-900 dark:text-zinc-100'}`}>
                      {stepItem.step}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {stepItem.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-300 space-y-2">
              <span className="font-bold text-rose-600 dark:text-rose-400 font-mono block">
                💡 Golden freebies Rules:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-zinc-400">
                <li>Never run an executable file (<code className="text-rose-600 dark:text-rose-300">.exe</code>) without checking VirusTotal.</li>
                <li>Prefer Firefox or LibreWolf over Chrome for full Manifest V2 uBlock Origin support.</li>
                <li>If a streaming site forces you to turn off adblock, close it immediately!</li>
              </ul>
            </div>

          </div>

          <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/90 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
              {completedSteps.size} of 4 steps completed
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-xs"
            >
              Start Browsing freebies
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
