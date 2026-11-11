'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LinkItem } from '@/types/fmhy';
import { SearchModal } from '@/components/SearchModal';
import { ContributeModal } from '@/components/ContributeModal';
import { GitHubWorkflowGuide } from '@/components/GitHubWorkflowGuide';
import { BeginnerGuideModal } from '@/components/BeginnerGuideModal';
import { BookmarksDrawer } from '@/components/BookmarksDrawer';
import { ThemeSwitcherModal } from '@/components/ThemeSwitcherModal';
import { LinkHealthAuditModal } from '@/components/LinkHealthAuditModal';
import { GitHubSyncModal } from '@/components/GitHubSyncModal';
import { MarkdownEditorModal } from '@/components/MarkdownEditorModal';
import { SeoHeadManager } from '@/components/SeoHeadManager';
import { ReportBrokenModal } from '@/components/ReportBrokenModal';
import { useGitHubDataPoller } from '@/hooks/useGitHubDataPoller';
import { useToast } from '@/context/ToastContext';
import { getAllCategories } from '@/lib/data';

interface ModalContextType {
  openSearch: () => void;
  openContribute: () => void;
  openGithubGuide: () => void;
  openBeginnerGuide: () => void;
  openBookmarks: () => void;
  openThemeSwitcher: () => void;
  openHealthAudit: () => void;
  openGitHubSync: () => void;
  openSeoStudio: () => void;
  openMarkdownEditor: (fileId?: string) => void;
  openReportBroken: (item: LinkItem) => void;
  bookmarkedItems: LinkItem[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (item: LinkItem) => void;
  clearAllBookmarks: () => void;
  importBookmarks: (items: LinkItem[]) => void;
  totalLinksCount: number;
  isSyncing: boolean;
  isPollingEnabled: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [isGithubGuideOpen, setIsGithubGuideOpen] = useState(false);
  const [isBeginnerGuideOpen, setIsBeginnerGuideOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isThemeSwitcherOpen, setIsThemeSwitcherOpen] = useState(false);
  const [isHealthAuditOpen, setIsHealthAuditOpen] = useState(false);
  const [isGitHubSyncOpen, setIsGitHubSyncOpen] = useState(false);
  const [isSeoStudioOpen, setIsSeoStudioOpen] = useState(false);
  const [isMarkdownEditorOpen, setIsMarkdownEditorOpen] = useState(false);
  const [targetMarkdownFileId, setTargetMarkdownFileId] = useState('streaming.md');
  const [reportingItem, setReportingItem] = useState<LinkItem | null>(null);

  // Bookmarks
  const [bookmarkedItems, setBookmarkedItems] = useState<LinkItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fmhy_bookmarks');
      if (saved) {
        setBookmarkedItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const isBookmarked = (id: string) => bookmarkedItems.some((i) => i.id === id);

  const toggleBookmark = (item: LinkItem) => {
    setBookmarkedItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      let updated: LinkItem[];
      if (exists) {
        updated = prev.filter((i) => i.id !== item.id);
        showToast(`Removed "${item.title}" from bookmarks`, 'info', 2500, 'bookmark');
      } else {
        updated = [item, ...prev];
        showToast(`Bookmarked "${item.title}"`, 'success', 2500, 'bookmark');
      }
      try {
        localStorage.setItem('fmhy_bookmarks', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const clearAllBookmarks = () => {
    setBookmarkedItems([]);
    try {
      localStorage.removeItem('fmhy_bookmarks');
    } catch {
      // ignore
    }
  };

  const importBookmarks = (items: LinkItem[]) => {
    setBookmarkedItems((prev) => {
      const map = new Map<string, LinkItem>();
      prev.forEach((i) => map.set(i.id, i));
      items.forEach((i) => map.set(i.id, i));
      const updated = Array.from(map.values());
      try {
        localStorage.setItem('fmhy_bookmarks', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // GitHub Poller
  const {
    syncState,
    remotePrItems,
    isPollingEnabled,
    pollingInterval,
    fetchGitHubRawData,
    togglePolling,
    changeInterval,
    simulateGitHubPrMerge,
  } = useGitHubDataPoller((count, newItems) => {
    if (newItems.length > 0) {
      showToast(`GitHub Poller: Synced ${count} new merged PR resource(s)!`, 'success');
    }
  });

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const allCategories = getAllCategories();
  const allFlatLinks = allCategories.flatMap((c) => c.subcategories.flatMap((s) => s.items));
  const totalLinksCount = allFlatLinks.length;
  const defaultCategory = allCategories[0];

  const openSearch = () => setIsSearchOpen(true);
  const openContribute = () => setIsContributeOpen(true);
  const openGithubGuide = () => setIsGithubGuideOpen(true);
  const openBeginnerGuide = () => setIsBeginnerGuideOpen(true);
  const openBookmarks = () => setIsBookmarksOpen(true);
  const openThemeSwitcher = () => setIsThemeSwitcherOpen(true);
  const openHealthAudit = () => setIsHealthAuditOpen(true);
  const openGitHubSync = () => setIsGitHubSyncOpen(true);
  const openSeoStudio = () => setIsSeoStudioOpen(true);
  const openMarkdownEditor = (fileId: string = 'streaming.md') => {
    setTargetMarkdownFileId(fileId);
    setIsMarkdownEditorOpen(true);
  };
  const openReportBroken = (item: LinkItem) => {
    setReportingItem(item);
  };

  const handleAddLocalContribution = (newItem: LinkItem) => {
    try {
      const saved = localStorage.getItem('fmhy_user_contribs');
      const prev = saved ? JSON.parse(saved) : [];
      localStorage.setItem('fmhy_user_contribs', JSON.stringify([newItem, ...prev]));
    } catch {
      // ignore
    }
  };

  return (
    <ModalContext.Provider
      value={{
        openSearch,
        openContribute,
        openGithubGuide,
        openBeginnerGuide,
        openBookmarks,
        openThemeSwitcher,
        openHealthAudit,
        openGitHubSync,
        openSeoStudio,
        openMarkdownEditor,
        openReportBroken,
        bookmarkedItems,
        isBookmarked,
        toggleBookmark,
        clearAllBookmarks,
        importBookmarks,
        totalLinksCount,
        isSyncing: syncState.isSyncing,
        isPollingEnabled,
      }}
    >
      {children}

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        categories={allCategories}
        onSelectCategory={(cat, subId) => {
          setIsSearchOpen(false);
          if (subId) {
            const cleanSub = subId.replace(`${cat.id}-`, '');
            window.location.href = `/category/${cat.slug}/${cleanSub}`;
          } else {
            window.location.href = `/category/${cat.slug}`;
          }
        }}
        bookmarkedIds={new Set(bookmarkedItems.map((i) => i.id))}
        onToggleBookmark={toggleBookmark}
      />

      <ContributeModal
        isOpen={isContributeOpen}
        onClose={() => setIsContributeOpen(false)}
        categories={allCategories}
        onAddLocalContribution={handleAddLocalContribution}
      />

      <GitHubWorkflowGuide
        isOpen={isGithubGuideOpen}
        onClose={() => setIsGithubGuideOpen(false)}
        categories={allCategories}
        activeCategory={defaultCategory}
      />

      <BeginnerGuideModal
        isOpen={isBeginnerGuideOpen}
        onClose={() => setIsBeginnerGuideOpen(false)}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedItems={bookmarkedItems}
        onRemoveBookmark={toggleBookmark}
        onClearAll={clearAllBookmarks}
        onImportBookmarks={importBookmarks}
      />

      <ThemeSwitcherModal
        isOpen={isThemeSwitcherOpen}
        onClose={() => setIsThemeSwitcherOpen(false)}
      />

      <LinkHealthAuditModal
        isOpen={isHealthAuditOpen}
        onClose={() => setIsHealthAuditOpen(false)}
        categories={allCategories}
      />

      <GitHubSyncModal
        isOpen={isGitHubSyncOpen}
        onClose={() => setIsGitHubSyncOpen(false)}
        syncState={syncState}
        remotePrItems={remotePrItems}
        categories={allCategories}
        onTriggerSync={() => fetchGitHubRawData(true)}
        isPollingEnabled={isPollingEnabled}
        onTogglePolling={togglePolling}
        pollingInterval={pollingInterval}
        onChangeInterval={changeInterval}
        onSimulatePrMerge={simulateGitHubPrMerge}
      />

      <MarkdownEditorModal
        isOpen={isMarkdownEditorOpen}
        onClose={() => setIsMarkdownEditorOpen(false)}
        initialFileId={targetMarkdownFileId}
        onSaved={() => {}}
      />

      <SeoHeadManager
        isOpen={isSeoStudioOpen}
        onClose={() => setIsSeoStudioOpen(false)}
        activeCategory={defaultCategory}
      />

      {reportingItem && (
        <ReportBrokenModal
          isOpen={Boolean(reportingItem)}
          onClose={() => setReportingItem(null)}
          item={reportingItem}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
