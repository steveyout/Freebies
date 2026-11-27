'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Category, LinkItem } from '@/types/fmhy';
import { LinkCard } from './LinkCard';
import { LinkCardSkeleton } from './LinkCardSkeleton';
import { useTheme } from '@/context/ThemeContext';
import { useModal } from '@/context/ModalContext';
import { useSocket } from '@/hooks/useSocket';
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
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
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
  const { socket } = useSocket();
  const bookmarkedIds = useMemo(() => new Set(bookmarkedItems.map((i) => i.id)), [bookmarkedItems]);

  const [query, setQuery] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState('all');
  const [onlySuperStarred, setOnlySuperStarred] = useState(false);
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [onlyOpenSource, setOnlyOpenSource] = useState(false);
  const [onlyNoReg, setOnlyNoReg] = useState(false);
  const [onlySafe, setOnlySafe] = useState(false);
  const [sortBy, setSortBy] = useState<'ranking' | 'name' | 'newest'>('ranking');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [visibleCount, setVisibleCount] = useState(24);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Dynamic overrides from database (for live starred priority and vote ranking)
  const [dynamicOverrides, setDynamicOverrides] = useState<Map<string, any>>(new Map());

  // Horizontal scroll container ref
  const badgesScrollRef = useRef<HTMLDivElement>(null);

  const scrollBadges = (offset: number) => {
    if (badgesScrollRef.current) {
      badgesScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleBadgesWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0 && badgesScrollRef.current) {
      badgesScrollRef.current.scrollLeft += e.deltaY;
    }
  };

  useEffect(() => {
    if (!searchParams) return;
    const q = searchParams.get('q');
    if (q !== null) {
      setQuery(q);
    }
  }, [searchParams]);

  // Fetch live database resources to reflect stars & votes
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicResources() {
      try {
        const res = await fetch('/api/resources');
        if (res.ok) {
          const data = await res.json();
          if (data?.resources && isMounted) {
            const map = new Map<string, any>();
            data.resources.forEach((r: any) => {
              map.set(r.id, r);
            });
            setDynamicOverrides(map);
          }
        }
      } catch (err) {
        console.error('Failed to load explore dynamic resources:', err);
      }
    }

    loadDynamicResources();

    return () => {
      isMounted = false;
    };
  }, []);

  // Realtime updates for stars and scores
  useEffect(() => {
    if (!socket) return;

    const handleResourceUpdated = (updatedResource: any) => {
      if (updatedResource?.id) {
        setDynamicOverrides((prev) => {
          const next = new Map(prev);
          next.set(updatedResource.id, {
            ...next.get(updatedResource.id),
            ...updatedResource,
          });
          return next;
        });
      }
    };

    const handleVoteUpdated = (payload: any) => {
      if (payload?.resourceId) {
        setDynamicOverrides((prev) => {
          const next = new Map(prev);
          const current = next.get(payload.resourceId) || {};
          next.set(payload.resourceId, {
            ...current,
            upvotesCount: payload.upvotesCount,
            downvotesCount: payload.downvotesCount,
            score: payload.score,
          });
          return next;
        });
      }
    };

    socket.on('resource_updated', handleResourceUpdated);
    socket.on('vote_updated', handleVoteUpdated);

    return () => {
      socket.off('resource_updated', handleResourceUpdated);
      socket.off('vote_updated', handleVoteUpdated);
    };
  }, [socket]);

  // Merge static links with dynamic overrides (match by id or normalized URL)
  const mergedLinks = useMemo(() => {
    const normalizeUrl = (u?: string) => (u ? u.trim().replace(/\/+$/, '').toLowerCase() : '');
    const overridesByUrl = new Map<string, any>();
    dynamicOverrides.forEach((r) => {
      const norm = normalizeUrl(r?.url);
      if (!norm) return;
      const prev = overridesByUrl.get(norm);
      if (!prev || (r.isSuperStarred && !prev.isSuperStarred) || (r.isStarred && !prev.isStarred)) {
        overridesByUrl.set(norm, r);
      }
    });

    return allFlatLinks.map((link) => {
      const norm = normalizeUrl(link.url);
      const override = dynamicOverrides.get(link.id) || (norm ? overridesByUrl.get(norm) : undefined);
      if (!override) return link;
      return {
        ...link,
        title: override.title ?? link.title,
        url: override.url ?? link.url,
        description: override.description ?? link.description,
        category: override.category ?? link.category,
        subcategory: override.subcategory ?? link.subcategory,
        safetyRating: override.safetyRating ?? link.safetyRating,
        isOpenSource: override.isOpenSource !== undefined ? Boolean(override.isOpenSource) : link.isOpenSource,
        isSuperStarred: override.isSuperStarred !== undefined ? Boolean(override.isSuperStarred) : Boolean(link.isSuperStarred),
        isStarred: override.isStarred !== undefined ? Boolean(override.isStarred) : link.isStarred,
        score: override.score !== undefined ? override.score : link.score,
        upvotesCount: override.upvotesCount !== undefined ? override.upvotesCount : link.upvotesCount,
        downvotesCount: override.downvotesCount !== undefined ? override.downvotesCount : link.downvotesCount,
      };
    });
  }, [allFlatLinks, dynamicOverrides]);

  const filteredLinks = useMemo(() => {
    let list = mergedLinks;

    if (selectedCat !== 'all') {
      list = list.filter((item) => item.category === selectedCat);
    }

    if (onlySuperStarred) {
      list = list.filter((item) => item.isSuperStarred);
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

    // Dynamic ranking: Super Starred first, then Starred, then votes score descending
    return [...list].sort((a, b) => {
      if (a.isSuperStarred && !b.isSuperStarred) return -1;
      if (!a.isSuperStarred && b.isSuperStarred) return 1;

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
  }, [mergedLinks, selectedCat, onlySuperStarred, onlyStarred, onlyOpenSource, onlyNoReg, onlySafe, query, sortBy]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(24);
  }, [selectedCat, onlySuperStarred, onlyStarred, onlyOpenSource, onlyNoReg, onlySafe, query, sortBy]);

  // Lazy load more items with skeleton state on scroll
  const hasMore = visibleCount < filteredLinks.length;
  const visibleLinks = useMemo(() => filteredLinks.slice(0, visibleCount), [filteredLinks, visibleCount]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 24, filteredLinks.length));
            setIsLoadingMore(false);
          }, 150);
        }
      },
      { rootMargin: '250px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, filteredLinks.length]);

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

        {/* Categories Pill Selector with scroll controls */}
        <div className="relative flex items-center group">
          <button
            type="button"
            onClick={() => scrollBadges(-220)}
            aria-label="Scroll left"
            className="hidden sm:flex absolute left-0 z-10 w-6 h-6 -ml-2 items-center justify-center rounded-full bg-white/95 dark:bg-zinc-800/95 border border-slate-200 dark:border-zinc-700 shadow-md text-slate-600 dark:text-zinc-300 hover:text-amber-500 transition-opacity opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div 
            ref={badgesScrollRef}
            onWheel={handleBadgesWheel}
            className="scroll-badges-container flex items-center gap-1.5 overflow-x-auto pb-1 text-xs w-full px-1"
          >
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                selectedCat === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Categories ({mergedLinks.length})
            </button>
            {categories.map((c) => {
              const count = mergedLinks.filter((l) => l.category === c.name).length;
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

          <button
            type="button"
            onClick={() => scrollBadges(220)}
            aria-label="Scroll right"
            className="hidden sm:flex absolute right-0 z-10 w-6 h-6 -mr-2 items-center justify-center rounded-full bg-white/95 dark:bg-zinc-800/95 border border-slate-200 dark:border-zinc-700 shadow-md text-slate-600 dark:text-zinc-300 hover:text-amber-500 transition-opacity opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
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
              onClick={() => setOnlySuperStarred(!onlySuperStarred)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-colors ${
                onlySuperStarred
                  ? 'bg-violet-50 dark:bg-violet-950/40 border-violet-400 text-violet-700 dark:text-violet-300 font-semibold'
                  : 'border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:border-slate-300'
              }`}
            >
              <span>👑</span>
              <span>Super Stars Only</span>
            </button>

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
                  ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-400 text-teal-700 dark:text-teal-300 font-semibold'
                  : 'border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:border-slate-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
              <span>Safe Rating Only</span>
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 text-amber-500 shadow-xs' : 'text-slate-400 hover:text-slate-600'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-1.5 rounded ${viewMode === 'compact' ? 'bg-white dark:bg-zinc-700 text-amber-500 shadow-xs' : 'text-slate-400 hover:text-slate-600'}`}
              title="Compact View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-1">
        <div>
          Showing <span className="font-bold text-slate-900 dark:text-white">{filteredLinks.length}</span> of {mergedLinks.length} resources
          {selectedCat !== 'all' && <span> in <span className="text-amber-500 font-semibold">{selectedCat}</span></span>}
        </div>
      </div>

      {/* Resource Cards */}
      {filteredLinks.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
          <p className="text-base font-semibold text-slate-800 dark:text-zinc-200">No resources found matching your criteria.</p>
          <p className="text-xs text-slate-500 dark:text-zinc-400">Try removing some filters or searching for different keywords.</p>
          <button
            onClick={() => {
              setQuery('');
              setSelectedCat('all');
              setOnlyStarred(false);
              setOnlyOpenSource(false);
              setOnlyNoReg(false);
              setOnlySafe(false);
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-3'
          }>
            {visibleLinks.map((item) => (
              <LinkCard
                key={item.id}
                item={item}
                isBookmarked={bookmarkedIds.has(item.id)}
                onToggleBookmark={toggleBookmark}
                onReportBroken={openReportBroken}
                viewMode={viewMode}
              />
            ))}
            {isLoadingMore && <LinkCardSkeleton count={viewMode === 'grid' ? 6 : 4} viewMode={viewMode} />}
          </div>

          {hasMore && (
            <div ref={loadMoreRef} className="flex flex-col items-center justify-center py-6 space-y-3">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 24, filteredLinks.length))}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-amber-500 text-xs font-mono font-bold text-slate-700 dark:text-zinc-200 shadow-xs transition-colors cursor-pointer"
              >
                Load More ({filteredLinks.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
