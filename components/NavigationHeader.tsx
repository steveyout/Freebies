'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { useModal } from '@/context/ModalContext';

export const NavigationHeader: React.FC = () => {
  const {
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
    bookmarkedItems,
    totalLinksCount,
    isSyncing,
    isPollingEnabled,
  } = useModal();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Header
      onOpenSearch={openSearch}
      onOpenContribute={openContribute}
      onOpenGithubGuide={openGithubGuide}
      onOpenBeginnerGuide={openBeginnerGuide}
      onOpenBookmarks={openBookmarks}
      onOpenThemeSwitcher={openThemeSwitcher}
      onOpenLinkHealthAudit={openHealthAudit}
      onOpenGitHubSyncModal={openGitHubSync}
      onOpenSeoStudio={openSeoStudio}
      onOpenMarkdownEditor={openMarkdownEditor}
      isSyncing={isSyncing}
      isPollingEnabled={isPollingEnabled}
      bookmarkedCount={bookmarkedItems.length}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
      totalLinksCount={totalLinksCount}
    />
  );
};
