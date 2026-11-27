'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export const NavigationProgressBar: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const safetyRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (safetyRef.current) clearTimeout(safetyRef.current);
    if (hideRef.current) clearTimeout(hideRef.current);
    timerRef.current = null;
    safetyRef.current = null;
    hideRef.current = null;
  };

  const startNavigation = () => {
    clearTimers();
    setVisible(true);
    setIsNavigating(true);
    setProgress(20);

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const step = prev < 50 ? 12 : prev < 80 ? 5 : 1.5;
        return Math.min(90, prev + step);
      });
    }, 150);

    // Safety fallback so bar never gets stuck if navigation is aborted
    safetyRef.current = setTimeout(() => {
      completeNavigation();
    }, 8000);
  };

  const completeNavigation = () => {
    clearTimers();
    setProgress(100);
    setIsNavigating(false);
    hideRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 250);
  };

  // Complete navigation whenever pathname or searchParams updates
  useEffect(() => {
    if (isNavigating || visible) {
      completeNavigation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // Intercept internal link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = (e.target as HTMLElement | null)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      if (target.target && target.target !== '_self') {
        return;
      }

      if (target.hasAttribute('download')) {
        return;
      }

      try {
        const nextUrl = new URL(href, window.location.origin);
        if (nextUrl.origin !== window.location.origin) return;
        const currentFull = window.location.pathname + window.location.search;
        const nextFull = nextUrl.pathname + nextUrl.search;
        if (nextFull === currentFull) return;

        startNavigation();
      } catch {
        // Ignore invalid URLs
      }
    };

    const handlePopState = () => {
      startNavigation();
    };

    document.addEventListener('click', handleClick, true);
    window.addEventListener('popstate', handlePopState);
    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', handlePopState);
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Top Progress Bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[70] h-[3px] bg-transparent pointer-events-none"
      >
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 shadow-[0_0_12px_rgba(245,158,11,0.75)] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating Navigation Spinner */}
      {isNavigating && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-3.5 right-3.5 z-[70] flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 border border-slate-200 dark:border-zinc-700 shadow-lg backdrop-blur-md pointer-events-none"
        >
          <Loader2 className="w-3.5 h-3.5 text-amber-500 animate-spin" />
          <span className="text-[11px] font-mono font-semibold text-slate-700 dark:text-zinc-200">
            Loading...
          </span>
        </div>
      )}
    </>
  );
};
