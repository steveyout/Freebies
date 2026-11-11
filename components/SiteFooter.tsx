'use client';

import React from 'react';
import { Footer } from '@/components/Footer';
import { useModal } from '@/context/ModalContext';

export const SiteFooter: React.FC = () => {
  const {
    openContribute,
    openGithubGuide,
    openBeginnerGuide,
    openSeoStudio,
    openMarkdownEditor,
    totalLinksCount,
  } = useModal();

  return (
    <Footer
      totalLinksCount={totalLinksCount}
      onOpenContribute={openContribute}
      onOpenGithubGuide={openGithubGuide}
      onOpenBeginnerGuide={openBeginnerGuide}
      onOpenSeoStudio={openSeoStudio}
      onOpenMarkdownEditor={openMarkdownEditor}
    />
  );
};
