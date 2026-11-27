'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { SubCategory, LinkItem } from '@/types/fmhy';
import { LinkCard } from '@/components/LinkCard';
import { LinkCardSkeleton } from '@/components/LinkCardSkeleton';
import { useModal } from '@/context/ModalContext';
import { useSocket } from '@/hooks/useSocket';

interface SubcategoryClientWrapperProps {
  subcategory: SubCategory;
}

export const SubcategoryClientWrapper: React.FC<SubcategoryClientWrapperProps> = ({
  subcategory,
}) => {
  const { bookmarkedItems = [], toggleBookmark, openReportBroken } = useModal();
  const { socket } = useSocket();
  const bookmarkedIds = useMemo(() => new Set((bookmarkedItems || []).map((i) => i?.id).filter(Boolean)), [bookmarkedItems]);
  const [dynamicOverrides, setDynamicOverrides] = useState<Map<string, any>>(new Map());
  const [visibleCount, setVisibleCount] = useState(24);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/resources')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && Array.isArray(data?.resources)) {
          const map = new Map<string, any>();
          data.resources.forEach((r: any) => map.set(r.id, r));
          setDynamicOverrides(map);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handleResourceUpdated = (updated: any) => {
      if (!updated?.id) return;
      setDynamicOverrides((prev) => {
        const next = new Map(prev);
        next.set(updated.id, { ...next.get(updated.id), ...updated });
        return next;
      });
    };
    const handleVoteUpdated = (payload: any) => {
      if (!payload?.resourceId) return;
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
    };
    socket.on('resource_updated', handleResourceUpdated);
    socket.on('vote_updated', handleVoteUpdated);
    return () => {
      socket.off('resource_updated', handleResourceUpdated);
      socket.off('vote_updated', handleVoteUpdated);
    };
  }, [socket]);

  const items = useMemo(() => {
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

    const baseItems: LinkItem[] = (subcategory?.items || []).map((item) => {
      const norm = normalizeUrl(item.url);
      const override = dynamicOverrides.get(item.id) || (norm ? overridesByUrl.get(norm) : undefined);
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

    return [...baseItems].sort((a, b) => {
      if (a.isSuperStarred && !b.isSuperStarred) return -1;
      if (!a.isSuperStarred && b.isSuperStarred) return 1;
      if (a.isStarred && !b.isStarred) return -1;
      if (!a.isStarred && b.isStarred) return 1;
      const scoreDiff = (b.score ?? 0) - (a.score ?? 0);
      if (scoreDiff !== 0) return scoreDiff;
      return (a.title || '').localeCompare(b.title || '');
    });
  }, [subcategory?.items, dynamicOverrides]);

  const hasMore = visibleCount < items.length;
  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 24, items.length));
            setIsLoadingMore(false);
          }, 150);
        }
      },
      { rootMargin: '250px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, items.length]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleItems.map((item) => (
          <LinkCard
            key={item.id}
            item={item}
            isBookmarked={bookmarkedIds.has(item.id)}
            onToggleBookmark={toggleBookmark}
            onReportBroken={openReportBroken}
            viewMode="grid"
          />
        ))}
        {isLoadingMore && <LinkCardSkeleton count={6} viewMode="grid" />}
      </div>

      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-4">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => Math.min(prev + 24, items.length))}
            className="px-5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-amber-500 text-xs font-mono font-bold text-slate-700 dark:text-zinc-200 shadow-xs transition-colors cursor-pointer"
          >
            Load More ({items.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
};
