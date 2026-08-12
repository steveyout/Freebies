import React, { useState } from 'react';
import { LinkItem } from '../types/fmhy';
import { reportBrokenLink } from '../utils/linkHealth';
import { 
  AlertTriangle, 
  X, 
  CheckCircle2, 
  Send, 
  ExternalLink,
  ShieldAlert,
  ServerOff,
  Lock,
  FileQuestion
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

interface ReportBrokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: LinkItem | null;
  onReportSubmitted?: () => void;
}

const REPORT_REASONS = [
  {
    id: '404',
    title: '404 / Page Not Found',
    description: 'The link opens a broken or missing page.',
    icon: ServerOff,
  },
  {
    id: 'offline',
    title: 'Domain Offline / DNS Error',
    description: 'The website fails to load or domain expired.',
    icon: ShieldAlert,
  },
  {
    id: 'paywall',
    title: 'Paywall / Forced Registration',
    description: 'Resource is no longer free or requires signup/payment.',
    icon: Lock,
  },
  {
    id: 'other',
    title: 'Malware or Changed Content',
    description: 'Site redirects to ads, malware, or unrelated content.',
    icon: FileQuestion,
  },
];

export const ReportBrokenModal: React.FC<ReportBrokenModalProps> = ({
  isOpen,
  onClose,
  item,
  onReportSubmitted,
}) => {
  const { config } = useTheme();
  const { showToast } = useToast();
  const [selectedReason, setSelectedReason] = useState<string>('404');
  const [notes, setNotes] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reasonObj = REPORT_REASONS.find((r) => r.id === selectedReason);

    reportBrokenLink({
      itemId: item.id,
      itemTitle: item.title,
      url: item.url,
      reason: reasonObj ? reasonObj.title : 'Link Issue Reported',
      notes,
      reporter: submitterName.trim() || 'Community Member',
    });

    setIsSubmitted(true);
    showToast(`Report submitted for "${item.title}". Thank you!`, 'success');
    if (onReportSubmitted) onReportSubmitted();

    setTimeout(() => {
      setIsSubmitted(false);
      setNotes('');
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-zinc-950/80 backdrop-blur-sm">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden transition-colors"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-zinc-800 bg-rose-50/50 dark:bg-rose-950/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-zinc-100 font-mono">
                  Report Broken Link
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Flag dead resources for community automated audit & maintenance.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          {isSubmitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
              <h4 className="font-bold text-lg text-slate-900 dark:text-white font-mono">
                Report Logged Successfully!
              </h4>
              <p className="text-xs text-slate-600 dark:text-zinc-400 max-w-xs mx-auto">
                Thank you for keeping FreebiesHub clean. The link status badge has been updated across the directory.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-5 space-y-4 font-sans text-xs">
              
              {/* Resource Info Header */}
              <div className="p-3 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase font-bold">
                    Target Resource
                  </span>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-zinc-200">
                    {item.title}
                  </h4>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span className="truncate max-w-[280px]">{item.url}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Reason Selection Grid */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 mb-2">
                  Select Issue Type:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {REPORT_REASONS.map((r) => {
                    const Icon = r.icon;
                    const isSelected = selectedReason === r.id;
                    return (
                      <div
                        key={r.id}
                        onClick={() => setSelectedReason(r.id)}
                        className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 dark:border-rose-600/80 shadow-xs'
                            : 'bg-white dark:bg-zinc-950/40 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400 dark:text-zinc-500'}`} />
                        <div>
                          <div className={`font-bold text-xs ${isSelected ? 'text-rose-900 dark:text-rose-200' : 'text-slate-800 dark:text-zinc-200'}`}>
                            {r.title}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-zinc-400 leading-tight">
                            {r.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Details / Error Code (Optional):
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Returned 502 Bad Gateway, or domain redirects to spam..."
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              {/* Submitter Handle */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Your Handle / GitHub Handle (Optional):
                </label>
                <input
                  type="text"
                  value={submitterName}
                  onChange={(e) => setSubmitterName(e.target.value)}
                  placeholder="e.g. @octocat or Community Member"
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-2 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-xl text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Flag as Broken</span>
                </button>
              </div>

            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
