'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  itemTitle?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
  hasInput?: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemTitle,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  type = 'danger',
  isLoading = false,
  hasInput = false,
  inputLabel,
  inputPlaceholder = 'Enter reason...',
  inputValue = '',
  onInputChange,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 text-slate-100 relative overflow-hidden ring-1 ring-white/10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        {/* Top close button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
              type === 'danger'
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30 shadow-rose-500/10'
                : type === 'warning'
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-amber-500/10'
                : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shadow-indigo-500/10'
            }`}
          >
            {type === 'danger' ? (
              <Trash2 className="w-6 h-6 animate-pulse" />
            ) : type === 'warning' ? (
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            ) : (
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            )}
          </div>

          <div className="space-y-1 pr-6">
            <h3 id="dialog-title" className="text-lg font-bold text-white tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Highlighted item name box */}
        {itemTitle && (
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs font-mono text-slate-300 break-all flex items-center gap-2">
            <span className="text-rose-400 font-bold shrink-0">&bull;</span>
            <span className="truncate">{itemTitle}</span>
          </div>
        )}

        {/* Optional Input Box */}
        {hasInput && (
          <div className="space-y-1.5">
            {inputLabel && (
              <label className="text-xs font-semibold text-slate-300">
                {inputLabel}
              </label>
            )}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange?.(e.target.value)}
              placeholder={inputPlaceholder}
              autoFocus
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer ${
              type === 'danger'
                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
                : type === 'warning'
                ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                {type === 'danger' ? <Trash2 className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{confirmText}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
