import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-500 font-mono font-black text-2xl">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Resource or Category Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
          The requested page or resource could not be found. It may have been moved, renamed, or updated in the latest directory audit.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-4 font-mono text-xs">
        <Link
          href="/"
          className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/explore"
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold flex items-center gap-2 border border-slate-200 dark:border-zinc-700 hover:border-amber-500"
        >
          <Compass className="w-4 h-4 text-amber-500" />
          <span>Explore All Resources</span>
        </Link>
      </div>
    </main>
  );
}
