import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { 
  NotificationToastItem, 
  ToastMessage, 
  ToastType, 
  ToastActionType 
} from '../components/NotificationToast';

export type { ToastType, ToastActionType, ToastMessage };

export interface ToastContextValue {
  showToast: (
    message: string,
    type?: ToastType,
    duration?: number,
    actionType?: ToastActionType
  ) => void;
  toast: {
    success: (msg: string, duration?: number) => void;
    info: (msg: string, duration?: number) => void;
    warning: (msg: string, duration?: number) => void;
    error: (msg: string, duration?: number) => void;
    bookmark: (msg: string, duration?: number) => void;
    copy: (msg: string, duration?: number) => void;
    report: (msg: string, duration?: number) => void;
  };
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((
    message: string,
    type: ToastType = 'success',
    duration = 3000,
    actionType?: ToastActionType
  ) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Auto detect actionType if omitted
    let detectedAction = actionType;
    if (!detectedAction) {
      const lower = message.toLowerCase();
      if (lower.includes('bookmark')) detectedAction = 'bookmark';
      else if (lower.includes('copi') || lower.includes('clipboard')) detectedAction = 'copy';
      else if (lower.includes('report')) detectedAction = 'report';
      else if (lower.includes('share')) detectedAction = 'share';
      else detectedAction = 'default';
    }

    setToasts((prev) => [...prev.slice(-3), { id, message, type, actionType: detectedAction, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const toastHelpers = useMemo(() => ({
    success: (msg: string, duration?: number) => showToast(msg, 'success', duration),
    info: (msg: string, duration?: number) => showToast(msg, 'info', duration),
    warning: (msg: string, duration?: number) => showToast(msg, 'warning', duration),
    error: (msg: string, duration?: number) => showToast(msg, 'error', duration),
    bookmark: (msg: string, duration?: number) => showToast(msg, 'success', duration, 'bookmark'),
    copy: (msg: string, duration?: number) => showToast(msg, 'info', duration, 'copy'),
    report: (msg: string, duration?: number) => showToast(msg, 'success', duration, 'report'),
  }), [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, toast: toastHelpers }}>
      {children}

      {/* Floating Non-Intrusive Toast Container */}
      <div 
        aria-live="polite"
        className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <NotificationToastItem
              key={t.id}
              toast={t}
              onDismiss={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
