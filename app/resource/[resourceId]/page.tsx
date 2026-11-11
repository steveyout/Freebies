import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getAllResources, 
  getResourceById, 
  getRelatedResources,
  getCategoryBySlug 
} from '@/lib/data';
import { ResourceActionsClient } from '@/components/ResourceActionsClient';
import { ResourceCommentsClient } from '@/components/ResourceCommentsClient';
import { 
  constructMetadata, 
  getBreadcrumbJsonLd, 
  getSoftwareApplicationJsonLd 
} from '@/lib/seo';
import { Resource, initDb } from '@/db/models';
import { LinkItem, Category, SubCategory } from '@/types/fmhy';
import { 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Layers 
} from 'lucide-react';

interface ResourcePageProps {
  params: Promise<{
    resourceId: string;
  }>;
}

// Allow on-demand server rendering for newly approved resources not in build-time static generation
export const dynamicParams = true;

export async function generateStaticParams() {
  const resources = getAllResources();
  return resources.map((r) => ({
    resourceId: r.id,
  }));
}

async function findResourceItem(resourceId: string): Promise<{ item: LinkItem; category: Category; subcategory?: SubCategory } | undefined> {
  // 1. Try local memory / markdown data first
  const localResult = getResourceById(resourceId);
  if (localResult) return localResult;

  // 2. Query database for dynamically approved resources (e.g. approved submissions like arcmira)
  try {
    await initDb();
    const dbResource = await Resource.findByPk(resourceId);
    if (dbResource) {
      const cat = getCategoryBySlug(dbResource.category) || {
        id: dbResource.category,
        name: dbResource.category.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        slug: dbResource.category,
        description: `Verified directory for ${dbResource.category}`,
        subcategories: [],
      };

      const item: LinkItem = {
        id: dbResource.id,
        title: dbResource.title,
        url: dbResource.url,
        description: dbResource.description,
        category: dbResource.category,
        subcategory: dbResource.subcategory,
        tags: dbResource.tags || [],
        safetyRating: (dbResource.safetyRating as any) || 'Safe',
        badge: dbResource.badge || (dbResource.isStarred ? '⭐ Priority' : undefined),
        score: dbResource.score ?? 0,
        upvotesCount: dbResource.upvotesCount ?? 0,
        downvotesCount: dbResource.downvotesCount ?? 0,
        isStarred: Boolean(dbResource.isStarred),
        isOpenSource: Boolean(dbResource.isOpenSource),
        isNoAds: Boolean(dbResource.isNoAds),
        isNoReg: Boolean(dbResource.isNoReg),
        dateAdded: dbResource.dateAdded || undefined,
        addedBy: dbResource.addedBy || undefined,
      };

      return {
        item,
        category: cat,
        subcategory: {
          id: `${cat.id}-${dbResource.subcategory.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          name: dbResource.subcategory,
          items: [item],
        },
      };
    }
  } catch (err) {
    console.warn(`Could not query database for resource ${resourceId}:`, err);
  }

  return undefined;
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { resourceId } = await params;
  const result = await findResourceItem(resourceId);

  if (!result) {
    return constructMetadata({ title: 'Resource Not Found', noIndex: true });
  }

  const { item, category } = result;

  return constructMetadata({
    title: `${item.title} Review & Features - Free ${category.name} Directory`,
    description: `${item.title}: ${item.description}. Safety Rating: ${item.safetyRating}. Registration: ${item.isNoReg ? 'None needed' : 'Optional'}. Audited on freebies.`,
    path: `/resource/${item.id}`,
    keywords: [
      item.title,
      `${item.title} free`,
      `${item.title} review`,
      `${item.title} alternatives`,
      `${item.title} safe`,
      category.name,
      ...item.tags,
    ],
  });
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { resourceId } = await params;
  const result = await findResourceItem(resourceId);

  if (!result) {
    notFound();
  }

  const { item, category, subcategory } = result;
  const relatedItems = getRelatedResources(item, 3);

  const subSlug = subcategory
    ? subcategory.id.replace(`${category.id}-`, '') || subcategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : '';

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: category.name, url: `/category/${category.slug}` },
    ...(subcategory ? [{ name: subcategory.name, url: `/category/${category.slug}/${subSlug}` }] : []),
    { name: item.title, url: `/resource/${item.id}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);
  const softwareJsonLd = getSoftwareApplicationJsonLd(item, category.name);

  // Clean domain extraction
  let domain = item.url;
  try {
    domain = new URL(item.url).hostname.replace('www.', '');
  } catch {
    // ignore
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      {/* Semantic Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-amber-500 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href={`/category/${category.slug}`} className="hover:text-amber-500 transition-colors">
          {category.name}
        </Link>
        {subcategory && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href={`/category/${category.slug}/${subSlug}`} className="hover:text-amber-500 transition-colors">
              {subcategory.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 dark:text-white font-bold truncate max-w-[200px]">{item.title}</span>
      </nav>

      {/* Hero Header */}
      <header className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                {category.name}
              </span>
              {subcategory && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                  {subcategory.name}
                </span>
              )}
              {item.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  {item.badge}
                </span>
              )}
              {item.isOpenSource && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  Open Source
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {item.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
              {item.description}
            </p>

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Primary External Action CTA */}
          <div className="flex flex-col gap-3 shrink-0 sm:w-60">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer group"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/60 text-xs text-center font-mono text-slate-500 dark:text-zinc-400 truncate">
              {domain}
            </div>
          </div>
        </div>

        {/* Voting & Actions Toolbar */}
        <ResourceActionsClient item={item} />
      </header>

      {/* Safety & Audit Specs Breakdown */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Safety &amp; Adware Rating
          </div>
          <div className="flex items-center gap-2 pt-1">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {item.safetyRating || 'Safe'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            {item.safetyRating === 'Safe'
              ? 'Audited zero malware, zero malicious redirects.'
              : 'Requires adblocker protection.'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Account Registration
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {item.isNoReg ? 'Zero Registration' : 'Registration Optional'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            {item.isNoReg
              ? 'Immediate access without account or credit card.'
              : 'Sign-up optional for extra features.'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Audited Directory Source
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Layers className="w-5 h-5 text-indigo-500" />
            <span className="text-base font-bold text-slate-900 dark:text-white truncate">
              {category.name}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
            {item.dateAdded ? `Indexed on ${item.dateAdded}` : 'Regularly verified mirror'}
          </p>
        </div>
      </section>

      {/* Community Comments & User Feedback Section */}
      <ResourceCommentsClient resourceId={item.id} resourceTitle={item.title} />

      {/* Related Resources in Category */}
      {relatedItems.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Related {category.name} Tools
            </h2>
            <Link
              href={`/category/${category.slug}`}
              className="text-xs font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1"
            >
              <span>View all in {category.name}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedItems.map((rel) => (
              <Link
                key={rel.id}
                href={`/resource/${rel.id}`}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-amber-500/50 transition-all hover:-translate-y-0.5 space-y-2 block"
              >
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                  <span className="truncate">{rel.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2">
                  {rel.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
