'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home, Compass, Shield } from 'lucide-react';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for observability
    console.error('Unhandled App Router Error:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 mx-auto flex items-center justify-center text-rose-500 shadow-sm">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-rose-500 font-bold bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-900/60">
            Runtime Error Handled
          </span>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Something went wrong
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            An unexpected error occurred while rendering this page. Our safety boundary caught the issue.
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono text-slate-400 dark:text-zinc-500 bg-slate-50 dark:bg-zinc-950 px-2 py-1 rounded-md inline-block">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-medium text-xs shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 font-medium text-xs transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-center gap-4 text-xs text-slate-400 dark:text-zinc-500">
          <Link href="/explore" className="hover:text-amber-500 transition-colors flex items-center gap-1">
            <Compass className="w-3 h-3" />
            <span>Explore Hub</span>
          </Link>
          <span>•</span>
          <Link href="/category/adblocking" className="hover:text-amber-500 transition-colors flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Privacy Tools</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
