'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { SubCategory, LinkItem } from '@/types/fmhy';
import { LinkCard } from '@/components/LinkCard';
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
    const baseItems: LinkItem[] = (subcategory?.items || []).map((item) => {
      const override = dynamicOverrides.get(item.id);
      if (!override) return item;
      return {
        ...item,
        isStarred: override.isStarred !== undefined ? Boolean(override.isStarred) : Boolean(item.isStarred),
        score: override.score !== undefined ? override.score : item.score,
        upvotesCount: override.upvotesCount !== undefined ? override.upvotesCount : item.upvotesCount,
        downvotesCount: override.downvotesCount !== undefined ? override.downvotesCount : item.downvotesCount,
      };
    });

    return [...baseItems].sort((a, b) => {
      if (a.isStarred && !b.isStarred) return -1;
      if (!a.isStarred && b.isStarred) return 1;
      const scoreDiff = (b.score ?? 0) - (a.score ?? 0);
      if (scoreDiff !== 0) return scoreDiff;
      return (a.title || '').localeCompare(b.title || '');
    });
  }, [subcategory?.items, dynamicOverrides]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <LinkCard
          key={item.id}
          item={item}
          isBookmarked={bookmarkedIds.has(item.id)}
          onToggleBookmark={toggleBookmark}
          onReportBroken={openReportBroken}
          viewMode="grid"
        />
      ))}
    </div>
  );
};
