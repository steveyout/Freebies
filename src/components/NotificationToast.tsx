import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  XCircle, 
  X, 
  Sparkles, 
  BookmarkCheck, 
  Copy, 
  Flag,
  Share2
} from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';
export type ToastActionType = 'bookmark' | 'copy' | 'report' | 'share' | 'default';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  actionType?: ToastActionType;
  duration?: number;
}

interface NotificationToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

export const NotificationToastItem: React.FC<NotificationToastItemProps> = ({ toast, onDismiss }) => {
  const duration = toast.duration ?? 3000;
  const [isPaused, setIsPaused] = useState(false);

  // Pick appropriate icon based on actionType or toast.type
  const renderIcon = () => {
    if (toast.actionType === 'bookmark') {
      return <BookmarkCheck className="w-4 h-4 text-amber-400 shrink-0" />;
    }
    if (toast.actionType === 'copy') {
      return <Copy className="w-4 h-4 text-emerald-400 shrink-0" />;
    }
    if (toast.actionType === 'report') {
      return <Flag className="w-4 h-4 text-indigo-400 shrink-0" />;
    }
    if (toast.actionType === 'share') {
      return <Share2 className="w-4 h-4 text-sky-400 shrink-0" />;
    }

    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'info':
        return <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-rose-400 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-blue-400 shrink-0" />;
    }
  };

  // Auto detect action type from message text if not explicitly set
  const detectedActionType = toast.actionType || (
    toast.message.toLowerCase().includes('bookmark') ? 'bookmark' :
    toast.message.toLowerCase().includes('copi') || toast.message.toLowerCase().includes('clipboard') ? 'copy' :
    toast.message.toLowerCase().includes('report') ? 'report' :
    toast.message.toLowerCase().includes('share') ? 'share' : 'default'
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative overflow-hidden pointer-events-auto flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl shadow-xl backdrop-blur-xl border text-xs transition-all ${
        toast.type === 'success'
          ? 'bg-zinc-900/95 dark:bg-zinc-900/95 text-zinc-100 border-emerald-500/40 shadow-emerald-950/20'
          : toast.type === 'info'
          ? 'bg-zinc-900/95 dark:bg-zinc-900/95 text-zinc-100 border-amber-500/40 shadow-amber-950/20'
          : toast.type === 'warning'
          ? 'bg-zinc-900/95 dark:bg-zinc-900/95 text-zinc-100 border-amber-500/60 shadow-amber-950/30'
          : 'bg-zinc-900/95 dark:bg-zinc-900/95 text-zinc-100 border-rose-500/50 shadow-rose-950/30'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {renderIcon()}
        <span className="font-sans text-xs text-slate-100 font-medium leading-snug truncate">
          {toast.message}
        </span>
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors shrink-0 cursor-pointer"
        title="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Dynamic Progress Timer Bar */}
      {duration > 0 && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: isPaused ? '100%' : '0%' }}
          transition={{ duration: isPaused ? 0 : duration / 1000, ease: 'linear' }}
          className={`absolute bottom-0 left-0 h-0.5 ${
            detectedActionType === 'bookmark'
              ? 'bg-amber-400'
              : detectedActionType === 'copy'
              ? 'bg-emerald-400'
              : detectedActionType === 'report'
              ? 'bg-indigo-400'
              : toast.type === 'success'
              ? 'bg-emerald-400'
              : toast.type === 'info'
              ? 'bg-amber-400'
              : toast.type === 'warning'
              ? 'bg-amber-500'
              : 'bg-rose-500'
          }`}
        />
      )}
    </motion.div>
  );
};
