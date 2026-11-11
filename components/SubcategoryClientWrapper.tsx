'use client';

import React, { useMemo } from 'react';
import { SubCategory, LinkItem } from '@/types/fmhy';
import { LinkCard } from '@/components/LinkCard';
import { useModal } from '@/context/ModalContext';

interface SubcategoryClientWrapperProps {
  subcategory: SubCategory;
}

export const SubcategoryClientWrapper: React.FC<SubcategoryClientWrapperProps> = ({
  subcategory,
}) => {
  const { bookmarkedItems, toggleBookmark, openReportBroken } = useModal();
  const bookmarkedIds = useMemo(() => new Set(bookmarkedItems.map((i) => i.id)), [bookmarkedItems]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {subcategory.items.map((item) => (
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
