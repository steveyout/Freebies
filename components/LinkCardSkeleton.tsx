'use client';

import React from 'react';

interface LinkCardSkeletonProps {
  count?: number;
  viewMode?: 'grid' | 'compact' | 'list';
}

export const LinkCardSkeleton: React.FC<LinkCardSkeletonProps> = ({
  count = 6,
  viewMode = 'grid',
}) => {
  const items = Array.from({ length: count });

  if (viewMode === 'compact') {
    return (
      <>
        {items.map((_, i) => (
          <div
            key={`skel-compact-${i}`}
            className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 animate-pulse flex items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="h-4 w-40 bg-slate-200 dark:bg-zinc-800 rounded" />
              <div className="h-3 w-3/4 bg-slate-100 dark:bg-zinc-800/70 rounded" />
            </div>
            <div className="h-7 w-20 bg-slate-200 dark:bg-zinc-800 rounded-lg shrink-0" />
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {items.map((_, i) => (
        <div
          key={`skel-grid-${i}`}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 animate-pulse flex flex-col justify-between space-y-4 min-h-[190px]"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="h-5 w-36 bg-slate-200 dark:bg-zinc-800 rounded-md" />
              <div className="h-5 w-14 bg-slate-100 dark:bg-zinc-800/80 rounded-full" />
            </div>
            <div className="space-y-1.5">
              <div className="h-3 w-full bg-slate-100 dark:bg-zinc-800/70 rounded" />
              <div className="h-3 w-5/6 bg-slate-100 dark:bg-zinc-800/70 rounded" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-zinc-800/60">
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-14 bg-slate-200 dark:bg-zinc-800 rounded" />
              <div className="h-5 w-12 bg-slate-100 dark:bg-zinc-800/70 rounded" />
            </div>
            <div className="h-7 w-16 bg-slate-200 dark:bg-zinc-800 rounded-lg" />
          </div>
        </div>
      ))}
    </>
  );
};
