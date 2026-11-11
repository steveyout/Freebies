'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Category, LinkItem } from '@/types/fmhy';
import { LinkCard } from './LinkCard';
import { useTheme } from '@/context/ThemeContext';
import { useModal } from '@/context/ModalContext';
import { 
  Search, 
  Filter, 
  Compass, 
  LayoutGrid, 
  List, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  X,
  Code2,
  ArrowUpDown
} from 'lucide-react';

interface ExploreClientProps {
  categories: Category[];
  allFlatLinks: LinkItem[];
}

export const ExploreClient: React.FC<ExploreClientProps> = ({
  categories,
  allFlatLinks,
}) => {
  const { config } = useTheme();
  const searchParams = useSearchParams();
  const initialQuery = searchParams ? (searchParams.get('q') || '') : '';

  const { bookmarkedItems, toggleBookmark, openReportBroken } = useModal();
  const bookmarkedIds = useMemo(() => new Set(bookmarkedItems.map((i) => i.id)), [bookmarkedItems]);

  const [query, setQuery] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState('all');
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [onlyOpenSource, setOnlyOpenSource] = useState(false);
  const [onlyNoReg, setOnlyNoReg] = useState(false);
  const [onlySafe, setOnlySafe] = useState(false);
  const [sortBy, setSortBy] = useState<'ranking' | 'name' | 'newest'>('ranking');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  useEffect(() => {
    if (!searchParams) return;
    const q = searchParams.get('q');
    if (q !== null) {
      setQuery(q);
    }
  }, [searchParams]);

  const filteredLinks = useMemo(() => {
    let list = allFlatLinks;

    if (selectedCat !== 'all') {
      list = list.filter((item) => item.category === selectedCat);
    }

    if (onlyStarred) {
      list = list.filter((item) => item.isStarred);
    }

    if (onlyOpenSource) {
      list = list.filter((item) => item.isOpenSource);
    }

    if (onlyNoReg) {
      list = list.filter((item) => item.isNoReg);
    }

    if (onlySafe) {
      list = list.filter((item) => item.safetyRating === 'Safe');
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((item) => 
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.subcategory.toLowerCase().includes(q) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Dynamic ranking: Starred priority first, then votes score descending
    return [...list].sort((a, b) => {
      if (sortBy === 'ranking') {
        if (a.isStarred && !b.isStarred) return -1;
        if (!a.isStarred && b.isStarred) return 1;

        const scoreA = a.score ?? 0;
        const scoreB = b.score ?? 0;
        if (scoreB !== scoreA) {
          return scoreB - scoreA;
        }

        return a.title.localeCompare(b.title);
      }

      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === 'newest') {
        const dateA = a.dateAdded || '2026-01-01';
        const dateB = b.dateAdded || '2026-01-01';
        return dateB.localeCompare(dateA);
      }

      return 0;
    });
  }, [allFlatLinks, selectedCat, onlyStarred, onlyOpenSource, onlyNoReg, onlySafe, query, sortBy]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
        
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all verified resources, open source tools, or platforms..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Pill Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
              selectedCat === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Categories ({allFlatLinks.length})
          </button>
          {categories.map((c) => {
            const count = allFlatLinks.filter((l) => l.category === c.name).length;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.name)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                  selectedCat === c.name
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {c.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Feature Toggles & View Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-zinc-800/60 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-zinc-700 font-mono">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" />
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
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-colors ${
                onlyStarred
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-700 dark:text-amber-300 font-semibold'
                  : 'border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:border-slate-300'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Priority Stars Only</span>
            </button>

            <button
              onClick={() => setOnlyOpenSource(!onlyOpenSource)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-colors ${
                onlyOpenSource
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400 text-indigo-700 dark:text-indigo-300 font-semibold'
                  : 'border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:border-slate-300'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Open Source / FOSS</span>
            </button>

            <button
              onClick={() => setOnlyNoReg(!onlyNoReg)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-colors ${
                onlyNoReg
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-700 dark:text-emerald-300 font-semibold'
                  : 'border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:border-slate-300'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>No Registration</span>
            </button>

            <button
              onClick={() => setOnlySafe(!onlySafe)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-colors ${
                onlySafe
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-700 dark:text-emerald-300 font-semibold'
                  : 'border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:border-slate-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Safe Rating Only</span>
            </button>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg border border-slate-200 dark:border-zinc-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-2xs text-amber-500' : 'text-slate-500'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-1.5 rounded ${viewMode === 'compact' ? 'bg-white dark:bg-zinc-700 shadow-2xs text-amber-500' : 'text-slate-500'}`}
              title="Compact View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 px-1 font-mono">
        <div>
          Showing <span className="font-bold text-slate-900 dark:text-white">{filteredLinks.length}</span> of {allFlatLinks.length} resources (ranked by votes &amp; priority)
        </div>
        {query && (
          <button
            onClick={() => setQuery('')}
            className="text-amber-600 dark:text-amber-400 hover:underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Links Grid / List */}
      {filteredLinks.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
          <Compass className="w-10 h-10 mx-auto text-slate-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No matching resources found
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
            Try adjusting your search terms or unchecking some filter flags.
          </p>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
          {filteredLinks.map((item) => (
            <LinkCard
              key={item.id}
              item={item}
              isBookmarked={bookmarkedIds.has(item.id)}
              onToggleBookmark={toggleBookmark}
              onReportBroken={openReportBroken}
            />
          ))}
        </div>
      )}
    </div>
  );
};
