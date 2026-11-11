'use client';

import React from 'react';
import Link from 'next/link';
import { Category, LinkItem } from '@/types/fmhy';
import { useModal } from '@/context/ModalContext';
import { RecommendedSection } from '@/components/RecommendedSection';
import { RecentlyAddedSection } from '@/components/RecentlyAddedSection';
import { TagCloudSection } from '@/components/TagCloudSection';
import { getCategoryIcon } from '@/utils/categoryIcons';
import { useTheme } from '@/context/ThemeContext';
import { 
  ShieldCheck, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  ArrowRight,
  Flame,
  Zap,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

interface HomeClientWrapperProps {
  categories: Category[];
  featuredLinks: LinkItem[];
  allFlatLinks: LinkItem[];
}

export const HomeClientWrapper: React.FC<HomeClientWrapperProps> = ({
  categories,
  featuredLinks,
  allFlatLinks,
}) => {
  const { config } = useTheme();
  const { openSearch, bookmarkedItems, toggleBookmark } = useModal();

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-950 border border-slate-200 dark:border-zinc-800 p-6 sm:p-10 shadow-sm">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-rose-500/10 dark:bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Curated &amp; Audited Mega-Directory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
            The Ultimate Index of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-amber-500">Free Media</span>, Tools &amp; Software
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
            Comprehensively audited directory featuring top-tier streaming platforms (FlixHQ, CineJoy), open-source content blockers (uBlock Origin), developer utilities, and AI tools with zero spam, zero paywalls, and daily uptime monitoring.
          </p>

          {/* Quick Search Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={openSearch}
              className="flex-1 flex items-center justify-between px-4 py-3 rounded-2xl bg-white dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 hover:border-amber-500 text-slate-500 dark:text-zinc-400 text-sm font-medium shadow-xs transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                <span>Quick search +{allFlatLinks.length} resources...</span>
              </div>
              <span className="hidden sm:inline-block font-mono text-xs bg-slate-100 dark:bg-zinc-900 px-2 py-0.5 rounded text-slate-400 border border-slate-200 dark:border-zinc-700">
                Ctrl+K
              </span>
            </button>

            <Link
              href="/explore"
              className={`px-5 py-3 rounded-2xl ${config.buttonBg} text-sm font-bold flex items-center justify-center gap-2 shadow-sm shrink-0`}
            >
              <span>Explore Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Live Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-zinc-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-700 dark:text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>{allFlatLinks.length}+</strong> Resources</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>100%</strong> Verified Status</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-zinc-300">
              <Activity className="w-4 h-4 text-amber-500 shrink-0" />
              <span><strong>9</strong> Core Categories</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 dark:text-zinc-300">
              <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Daily GitHub Sync</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Priority Recommended Resources */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>Top Priority Editor Picks</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Community benchmark resources for streaming, privacy, and productivity.
            </p>
          </div>
          <Link
            href="/explore"
            className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <RecommendedSection
          links={featuredLinks}
          onToggleBookmark={toggleBookmark}
          bookmarkedItems={bookmarkedItems}
        />
      </section>

      {/* Categories Grid Hub */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight flex items-center gap-2">
            <span>Directory Categories Hub</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Browse structured sections with detailed safety reviews and verified links.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const linkCount = cat.subcategories.reduce((acc, s) => acc + s.items.length, 0);

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-amber-500/80 dark:hover:border-amber-500/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      {getCategoryIcon(cat.iconName, 'w-5 h-5')}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded-md border border-slate-200 dark:border-zinc-700">
                      {linkCount} resources
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Subcategories preview */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {cat.subcategories.slice(0, 3).map((sub) => (
                      <span
                        key={sub.id}
                        className="text-[10px] font-mono bg-slate-100 dark:bg-zinc-800/60 text-slate-600 dark:text-zinc-400 px-1.5 py-0.5 rounded"
                      >
                        {sub.name}
                      </span>
                    ))}
                    {cat.subcategories.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-400 px-1 py-0.5">
                        +{cat.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recently Added Section */}
      <section className="space-y-4">
        <RecentlyAddedSection links={allFlatLinks} />
      </section>

      {/* Interactive Tag Cloud */}
      <section className="space-y-4">
        <TagCloudSection
          allLinks={allFlatLinks}
          selectedQuery=""
          onSelectTag={(tag) => {
            window.location.href = `/explore?q=${encodeURIComponent(tag)}`;
          }}
          onClearTag={() => {}}
        />
      </section>
    </div>
  );
};
