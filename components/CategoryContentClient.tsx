'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Category, SubCategory, LinkItem } from '@/types/fmhy';
import { LinkCard } from '@/components/LinkCard';
import { QuickFilters } from '@/components/QuickFilters';
import { useModal } from '@/context/ModalContext';
import { useTheme } from '@/context/ThemeContext';
import { 
  Filter, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Flame,
  ArrowUpDown,
  Star
} from 'lucide-react';

interface CategoryContentClientProps {
  category: Category;
}

export const CategoryContentClient: React.FC<CategoryContentClientProps> = ({
  category,
}) => {
  const { config } = useTheme();
  const { bookmarkedItems = [], toggleBookmark, openReportBroken } = useModal();

  const [activeSubId, setActiveSubId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [onlyOpenSource, setOnlyOpenSource] = useState(false);
  const [onlyNoReg, setOnlyNoReg] = useState(false);
  const [onlySafe, setOnlySafe] = useState(false);
  const [sortBy, setSortBy] = useState<'ranking' | 'name' | 'newest'>('ranking');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const bookmarkedIds = useMemo(() => new Set((bookmarkedItems || []).map((i) => i?.id).filter(Boolean)), [bookmarkedItems]);

  // Filtered subcategories and items with vote ranking & star priority
  const filteredSubcategories = useMemo(() => {
    let subs = category?.subcategories || [];
    if (activeSubId !== 'all') {
      subs = subs.filter((s) => s.id === activeSubId);
    }

    return subs.map((sub) => {
      const itemsList = sub?.items || [];
      const filteredItems = itemsList.filter((item) => {
        if (!item) return false;
        if (onlyStarred && !item.isStarred) return false;
        if (onlyOpenSource && !item.isOpenSource) return false;
        if (onlyNoReg && !item.isNoReg) return false;
        if (onlySafe && item.safetyRating !== 'Safe') return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = (item.title || '').toLowerCase().includes(q);
          const matchDesc = (item.description || '').toLowerCase().includes(q);
          const matchTags = Array.isArray(item.tags) && item.tags.some((t) => (t || '').toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchTags) return false;
        }

        return true;
      });

      // Sort items: Priority Starred first, then by Votes Score descending
      const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortBy === 'ranking') {
          // 1. Starred priority resources always on top
          if (a.isStarred && !b.isStarred) return -1;
          if (!a.isStarred && b.isStarred) return 1;

          // 2. Ranked by votes score descending
          const scoreA = a.score ?? 0;
          const scoreB = b.score ?? 0;
          if (scoreB !== scoreA) {
            return scoreB - scoreA;
          }

          return (a.title || '').localeCompare(b.title || '');
        }

        if (sortBy === 'name') {
          return (a.title || '').localeCompare(b.title || '');
        }

        if (sortBy === 'newest') {
          const dateA = a.dateAdded || '2026-01-01';
          const dateB = b.dateAdded || '2026-01-01';
          return dateB.localeCompare(dateA);
        }

        return 0;
      });

      return {
        ...sub,
        items: sortedItems,
      };
    }).filter((sub) => sub.items.length > 0);
  }, [category, activeSubId, searchQuery, onlyStarred, onlyOpenSource, onlyNoReg, onlySafe, sortBy]);

  const totalFilteredCount = useMemo(() => {
    return filteredSubcategories.reduce((acc, s) => acc + (s.items?.length || 0), 0);
  }, [filteredSubcategories]);

  const allSubcategories = category?.subcategories || [];

  return (
    <div className="space-y-8">
      {/* Subcategory Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-zinc-800">
        <button
          onClick={() => setActiveSubId('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
            activeSubId === 'all'
              ? `${config?.bgActive || 'bg-amber-500/10'} ${config?.textAccent || 'text-amber-500'} border ${config?.borderActive || 'border-amber-500/30'} shadow-xs`
              : 'bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700'
          }`}
        >
          All Subcategories ({allSubcategories.reduce((acc, s) => acc + (s.items?.length || 0), 0)})
        </button>

        {allSubcategories.map((sub) => {
          const isActive = activeSubId === sub.id;
          const subSlug = sub.id.replace(`${category.id}-`, '') || sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

          return (
            <div key={sub.id} className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setActiveSubId(sub.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? `${config?.bgActive || 'bg-amber-500/10'} ${config?.textAccent || 'text-amber-500'} border ${config?.borderActive || 'border-amber-500/30'} font-bold shadow-xs`
                    : 'bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700'
                }`}
              >
                <span>{sub.name}</span>
                <span className="ml-1.5 font-mono text-[10px] opacity-75">({sub.items?.length || 0})</span>
              </button>

              <Link
                href={`/category/${category.slug}/${subSlug}`}
                className="text-[10px] font-mono text-slate-400 hover:text-amber-500 px-1 py-1"
                title={`Dedicated subcategory page for ${sub.name}`}
              >
                &rarr;
              </Link>
            </div>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Filter ${category?.name || 'resources'}...`}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Sorting & Filter Toggles */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
          {/* Sort Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-zinc-700">
            <ArrowUpDown className="w-3 h-3 text-amber-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[11px] font-bold text-slate-700 dark:text-zinc-300 focus:outline-none cursor-pointer"
            >
              <option value="ranking">Ranked by Votes &amp; Stars</option>
              <option value="name">Alphabetical (A-Z)</option>
              <option value="newest">Recently Added</option>
            </select>
          </div>

          <button
            onClick={() => setOnlyStarred(!onlyStarred)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors cursor-pointer ${
              onlyStarred
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 font-bold'
                : 'bg-slate-50 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800'
            }`}
          >
            ⭐ Priority Stars
          </button>

          <button
            onClick={() => setOnlyOpenSource(!onlyOpenSource)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors cursor-pointer ${
              onlyOpenSource
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 font-bold'
                : 'bg-slate-50 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800'
            }`}
          >
            Open Source
          </button>

          <button
            onClick={() => setOnlyNoReg(!onlyNoReg)}
            className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors cursor-pointer ${
              onlyNoReg
                ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border-sky-300 font-bold'
                : 'bg-slate-50 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800'
            }`}
          >
            No Signup
          </button>

          <div className="flex items-center gap-1 border-l border-slate-200 dark:border-zinc-800 pl-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded text-xs cursor-pointer ${viewMode === 'grid' ? 'text-amber-500 font-bold' : 'text-slate-400'}`}
              title="Grid View"
            >
              Grid
            </button>
            <span className="text-slate-300 dark:text-zinc-700">|</span>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-1 rounded text-xs cursor-pointer ${viewMode === 'compact' ? 'text-amber-500 font-bold' : 'text-slate-400'}`}
              title="Compact View"
            >
              Compact
            </button>
          </div>
        </div>
      </div>

      {/* Subcategory Sections & Ranked Link Cards */}
      {filteredSubcategories.length === 0 ? (
        <div className="text-center py-12 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-400">
          No resources found matching your active filter criteria.
        </div>
      ) : (
        <div className="space-y-10">
          {filteredSubcategories.map((sub) => {
            const subSlug = sub.id.replace(`${category.id}-`, '') || sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            return (
              <section key={sub.id} id={sub.id} className="space-y-4 scroll-mt-20">
                <div className="flex items-baseline justify-between border-b border-slate-200 dark:border-zinc-800 pb-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{sub.name}</span>
                    </h2>
                    <span className="text-xs font-mono text-slate-400 dark:text-zinc-500">
                      ({sub.items.length} ranked)
                    </span>
                  </div>

                  <Link
                    href={`/category/${category.slug}/${subSlug}`}
                    className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>Subcategory Page</span>
                    <span>&rarr;</span>
                  </Link>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sub.items.map((item) => (
                      <LinkCard
                        key={item.id}
                        item={item}
                        isBookmarked={bookmarkedIds.has(item.id)}
                        onToggleBookmark={toggleBookmark}
                        onReportBroken={openReportBroken}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {sub.items.map((item) => (
                      <LinkCard
                        key={item.id}
                        item={item}
                        viewMode="compact"
                        isBookmarked={bookmarkedIds.has(item.id)}
                        onToggleBookmark={toggleBookmark}
                        onReportBroken={openReportBroken}
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};
