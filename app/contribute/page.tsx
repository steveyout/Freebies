import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ContributeClient } from '@/components/ContributeClient';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';
import { GitPullRequest, ChevronRight } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Contribute Links & GitHub PR Guidelines | freebies',
  description: 'Learn how to submit new free resources, propose mirror updates, and contribute via GitHub Pull Requests to the freebies open-source directory.',
  path: '/contribute',
});

export default function ContributePage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contribute', url: '/contribute' },
  ];
  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-amber-500 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 dark:text-white font-bold">Contribute</span>
      </nav>

      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 px-2 py-0.5 rounded-md">
            Open Source Community
          </span>
          <span className="text-xs font-mono text-slate-500">
            steveyout/Freebies GitHub Repository
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contribution Workflow &amp; Guidelines
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          freebies is powered by community submissions and pull requests. Read our curation criteria, acceptable licensing policies, and formatting standards below.
        </p>
      </header>

      <ContributeClient />
    </main>
  );
}
