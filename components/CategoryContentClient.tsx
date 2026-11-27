'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Category, SubCategory, LinkItem } from '@/types/fmhy';
import { LinkCard } from '@/components/LinkCard';
import { LinkCardSkeleton } from '@/components/LinkCardSkeleton';
import { QuickFilters } from '@/components/QuickFilters';
import { useModal } from '@/context/ModalContext';
import { useTheme } from '@/context/ThemeContext';
import { useSocket } from '@/hooks/useSocket';
import { 
  Filter, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Flame,
  ArrowUpDown,
  Star,
  Award
} from 'lucide-react';

interface CategoryContentClientProps {
  category: Category;
}

export const CategoryContentClient: React.FC<CategoryContentClientProps> = ({
  category,
}) => {
  const { config } = useTheme();
  const { bookmarkedItems = [], toggleBookmark, openReportBroken } = useModal();
  const { socket } = useSocket();

  const [activeSubId, setActiveSubId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [onlyOpenSource, setOnlyOpenSource] = useState(false);
  const [onlyNoReg, setOnlyNoReg] = useState(false);
  const [onlySafe, setOnlySafe] = useState(false);
  const [sortBy, setSortBy] = useState<'ranking' | 'name' | 'newest'>('ranking');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [showAllPriority, setShowAllPriority] = useState(false);
  const [visibleItemsLimit, setVisibleItemsLimit] = useState(24);
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

  // Fetch live database resources for this category to reflect stars & votes
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicCategoryResources() {
      try {
        const res = await fetch(`/api/resources?category=${category?.slug || category?.id}`);
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
        console.error('Failed to load category dynamic resources:', err);
      }
    }

    if (category?.slug || category?.id) {
      loadDynamicCategoryResources();
    }

    return () => {
      isMounted = false;
    };
  }, [category?.slug, category?.id]);

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
          const existing = next.get(payload.resourceId) || {};
          next.set(payload.resourceId, {
            ...existing,
            score: payload.score,
            upvotesCount: payload.upvotesCount,
            downvotesCount: payload.downvotesCount,
          });
          return next;
        });
      }
    };

    const handleResourceCreated = (newResource: any) => {
      if (newResource?.id && (newResource.category === category?.id || newResource.category === category?.slug)) {
        setDynamicOverrides((prev) => {
          const next = new Map(prev);
          next.set(newResource.id, newResource);
          return next;
        });
      }
    };

    const handleResourceDeleted = (payload: any) => {
      if (payload?.id) {
        setDynamicOverrides((prev) => {
          const next = new Map(prev);
          next.delete(payload.id);
          return next;
        });
      }
    };

    socket.on('resource_created', handleResourceCreated);
    socket.on('resource_updated', handleResourceUpdated);
    socket.on('resource_deleted', handleResourceDeleted);
    socket.on('vote_updated', handleVoteUpdated);

    return () => {
      socket.off('resource_created', handleResourceCreated);
      socket.off('resource_updated', handleResourceUpdated);
      socket.off('resource_deleted', handleResourceDeleted);
      socket.off('vote_updated', handleVoteUpdated);
    };
  }, [socket]);

  const bookmarkedIds = useMemo(
    () => new Set((bookmarkedItems || []).map((i) => i?.id).filter(Boolean)),
    [bookmarkedItems]
  );

  // Build subcategories merged with dynamic DB overrides AND newly created DB resources
  const mergedSubcategories = useMemo(() => {
    const rawSubs = category?.subcategories || [];
    const seenIds = new Set<string>();
    const seenUrls = new Set<string>();

    const subsWithOverrides = rawSubs.map((sub) => {
      const mergedItems = (sub?.items || []).map((item) => {
        seenIds.add(item.id);
        if (item.url) seenUrls.add(item.url.toLowerCase());
        const override = dynamicOverrides.get(item.id);
        if (!override) return item;
        return {
          ...item,
          isSuperStarred: override.isSuperStarred !== undefined ? Boolean(override.isSuperStarred) : Boolean(item.isSuperStarred),
          isStarred: override.isStarred !== undefined ? Boolean(override.isStarred) : Boolean(item.isStarred),
          score: override.score !== undefined ? override.score : item.score,
          upvotesCount: override.upvotesCount !== undefined ? override.upvotesCount : item.upvotesCount,
          downvotesCount: override.downvotesCount !== undefined ? override.downvotesCount : item.downvotesCount,
        };
      });
      return { ...sub, items: mergedItems };
    });

    // Append any DB resources not present in static subcategories
    dynamicOverrides.forEach((dbItem) => {
      if (!dbItem?.id) return;
      if (seenIds.has(dbItem.id)) return;
      if (dbItem.url && seenUrls.has(String(dbItem.url).toLowerCase())) return;

      const targetSubName = (dbItem.subcategory || 'General').toLowerCase();
      const targetSub = subsWithOverrides.find((s) => s.name.toLowerCase() === targetSubName);
      if (targetSub) {
        targetSub.items.push(dbItem);
      } else if (subsWithOverrides.length > 0) {
        subsWithOverrides[0].items.push(dbItem);
      } else {
        subsWithOverrides.push({
          id: `${category.id}-${targetSubName.replace(/[^a-z0-9]+/g, '-')}`,
          name: dbItem.subcategory || 'General',
          items: [dbItem],
        });
      }
      seenIds.add(dbItem.id);
    });

    return subsWithOverrides;
  }, [category, dynamicOverrides]);

  // All merged items with dynamic database properties (stars and votes)
  const allMergedCategoryItems = useMemo(() => {
    return mergedSubcategories.flatMap((sub) => sub.items || []);
  }, [mergedSubcategories]);

  // Priority Starred items for the top highlight section (Super Starred first, then Starred)
  const priorityStarredItems = useMemo(() => {
    return allMergedCategoryItems
      .filter((i) => i.isSuperStarred || i.isStarred)
      .sort((a, b) => {
        if (a.isSuperStarred && !b.isSuperStarred) return -1;
        if (!a.isSuperStarred && b.isSuperStarred) return 1;
        if (a.isStarred && !b.isStarred) return -1;
        if (!a.isStarred && b.isStarred) return 1;
        const scoreDiff = (b.score ?? 0) - (a.score ?? 0);
        if (scoreDiff !== 0) return scoreDiff;
        return (a.title || '').localeCompare(b.title || '');
      });
  }, [allMergedCategoryItems]);

  // Filtered subcategories and items with vote ranking & star priority
  const filteredSubcategories = useMemo(() => {
    let subs = mergedSubcategories;
    if (activeSubId !== 'all') {
      subs = subs.filter((s) => s.id === activeSubId);
    }

    return subs.map((sub) => {
      const mergedItems = sub?.items || [];

      const filteredItems = mergedItems.filter((item) => {
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

      // Sort items: Super Starred first, then Starred priority resources ALWAYS on top
      const sortedItems = [...filteredItems].sort((a, b) => {
        if (a.isSuperStarred && !b.isSuperStarred) return -1;
        if (!a.isSuperStarred && b.isSuperStarred) return 1;
        if (a.isStarred && !b.isStarred) return -1;
        if (!a.isStarred && b.isStarred) return 1;

        if (sortBy === 'ranking') {
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
  }, [mergedSubcategories, activeSubId, searchQuery, onlyStarred, onlyOpenSource, onlyNoReg, onlySafe, sortBy]);

  useEffect(() => {
    setVisibleItemsLimit(24);
  }, [activeSubId, searchQuery, onlyStarred, onlyOpenSource, onlyNoReg, onlySafe, sortBy]);

  const totalFilteredItems = useMemo(
    () => filteredSubcategories.reduce((acc, s) => acc + s.items.length, 0),
    [filteredSubcategories]
  );

  const visibleSubcategories = useMemo(() => {
    let remaining = visibleItemsLimit;
    const result: typeof filteredSubcategories = [];
    for (const sub of filteredSubcategories) {
      if (remaining <= 0) break;
      if (sub.items.length <= remaining) {
        result.push(sub);
        remaining -= sub.items.length;
      } else {
        result.push({ ...sub, items: sub.items.slice(0, remaining) });
        remaining = 0;
      }
    }
    return result;
  }, [filteredSubcategories, visibleItemsLimit]);

  const hasMoreItems = visibleItemsLimit < totalFilteredItems;

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el || !hasMoreItems) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleItemsLimit((prev) => Math.min(prev + 24, totalFilteredItems));
            setIsLoadingMore(false);
          }, 150);
        }
      },
      { rootMargin: '250px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMoreItems, isLoadingMore, totalFilteredItems]);

  const allSubcategories = category?.subcategories || [];

  return (
    <div className="space-y-8">
      {/* Scrollable Subcategory Badges Bar with Arrow Buttons & Wheel Support */}
      <div className="relative group/nav border-b border-slate-200 dark:border-zinc-800 pb-2">
        {/* Left Scroll Chevron Button */}
        <button
          type="button"
          onClick={() => scrollBadges(-220)}
          aria-label="Scroll options left"
          className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-md items-center justify-center text-slate-600 dark:text-zinc-300 hover:text-amber-500 opacity-0 group-hover/nav:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Badges Container */}
        <div
          ref={badgesScrollRef}
          onWheel={handleBadgesWheel}
          className="scroll-badges-container flex items-center gap-2 pb-1.5 px-0.5"
        >
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

        {/* Right Scroll Chevron Button */}
        <button
          type="button"
          onClick={() => scrollBadges(220)}
          aria-label="Scroll options right"
          className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-md items-center justify-center text-slate-600 dark:text-zinc-300 hover:text-amber-500 opacity-0 group-hover/nav:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* TOP PRIORITY STARRED SECTION (Highlights Starred Resources in this Category) */}
      {priorityStarredItems.length > 0 && activeSubId === 'all' && !searchQuery.trim() && (
        <section className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-slate-100/50 dark:to-zinc-900/50 border border-amber-500/30 dark:border-amber-500/20 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20 shrink-0">
                <Star className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Top Priority {category.name} Picks
                  </h2>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                    {priorityStarredItems.length} Starred
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-400">
                  Priority-voted and staff-verified essentials in {category.name} pinned for instant access.
                </p>
              </div>
            </div>

            <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 flex items-center gap-1.5 self-start sm:self-center">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Highest Ranked</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(showAllPriority ? priorityStarredItems : priorityStarredItems.slice(0, 6)).map((item) => (
              <LinkCard
                key={`priority-${item.id}`}
                item={item}
                isBookmarked={bookmarkedIds.has(item.id)}
                onToggleBookmark={toggleBookmark}
                onReportBroken={openReportBroken}
              />
            ))}
          </div>

          {priorityStarredItems.length > 6 && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setShowAllPriority((prev) => !prev)}
                className="px-4 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                {showAllPriority
                  ? 'Show Fewer Priority Picks'
                  : `Show All ${priorityStarredItems.length} Priority Picks`}
              </button>
            </div>
          )}
        </section>
      )}

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
            className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors cursor-pointer flex items-center gap-1.5 ${
              onlyStarred
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 font-bold'
                : 'bg-slate-50 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-zinc-800'
            }`}
          >
            <Star className={`w-3 h-3 ${onlyStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>Priority Stars ({priorityStarredItems.length})</span>
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
        <div className="text-center py-12 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-400 space-y-3">
          <p>No resources found matching your active filter criteria.</p>
          {(onlyStarred || onlyOpenSource || onlyNoReg || searchQuery) && (
            <button
              onClick={() => {
                setOnlyStarred(false);
                setOnlyOpenSource(false);
                setOnlyNoReg(false);
                setSearchQuery('');
              }}
              className="text-xs font-mono text-amber-500 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          {visibleSubcategories.map((sub) => {
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

          {isLoadingMore && (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-2'}>
              <LinkCardSkeleton count={viewMode === 'grid' ? 6 : 4} viewMode={viewMode} />
            </div>
          )}

          {hasMoreItems && (
            <div ref={loadMoreRef} className="flex flex-col items-center justify-center py-6 space-y-2">
              <button
                type="button"
                onClick={() => setVisibleItemsLimit((prev) => Math.min(prev + 24, totalFilteredItems))}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-amber-500 text-xs font-mono font-bold text-slate-700 dark:text-zinc-200 shadow-xs transition-colors cursor-pointer"
              >
                Load More ({totalFilteredItems - visibleItemsLimit} remaining)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
