import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories, getAllResources } from '@/lib/data';
import { ExploreClient } from '@/components/ExploreClient';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';
import { Compass, ChevronRight, Layers, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Explore All Free Resources & Directory Tools | freebies',
  description: 'Instant searchable index of over 700+ free media resources, HD streaming indexers, adblocking tools, open-source software, and AI utilities.',
  path: '/explore',
});

export default function ExplorePage() {
  const categories = getAllCategories();
  const allFlatLinks = getAllResources();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Explore', url: '/explore' },
  ];
  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-amber-500 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 dark:text-white font-bold">Explore Directory</span>
      </nav>

      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 px-2 py-0.5 rounded-md">
            Master Directory Index
          </span>
          <span className="text-xs font-mono text-slate-500">
            {allFlatLinks.length} total verified entries
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Free Resources &amp; Tools
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          Filter through our curated index with real-time keyword search, category scoping, safety checks, and open-source license selectors.
        </p>
      </header>

      <Suspense fallback={<div className="p-12 text-center text-xs font-mono text-slate-500">Loading Directory Explorer...</div>}>
        <ExploreClient
          categories={categories}
          allFlatLinks={allFlatLinks}
        />
      </Suspense>
    </main>
  );
}
