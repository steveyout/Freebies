import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getAllResources, 
  getResourceById, 
  getRelatedResources 
} from '@/lib/data';
import { ResourceActionsClient } from '@/components/ResourceActionsClient';
import { ResourceCommentsClient } from '@/components/ResourceCommentsClient';
import { 
  constructMetadata, 
  getBreadcrumbJsonLd, 
  getSoftwareApplicationJsonLd 
} from '@/lib/seo';
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

export async function generateStaticParams() {
  const resources = getAllResources();
  return resources.map((r) => ({
    resourceId: r.id,
  }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { resourceId } = await params;
  const result = getResourceById(resourceId);

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
  const result = getResourceById(resourceId);

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
        <span className="text-slate-900 dark:text-white font-bold">{item.title}</span>
      </nav>

      {/* Resource Main Showcase Header */}
      <article className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white font-black text-2xl shadow-md shrink-0">
              {item.title.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                  {domain}
                </span>
                {item.badge && (
                  <span className="text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                {item.isOpenSource && (
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 rounded-full">
                    Open Source
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                {item.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{item.safetyRating}</span>
            </span>
          </div>
        </div>

        {/* Detailed Tagline Description */}
        <p className="text-base sm:text-lg text-slate-700 dark:text-zinc-200 leading-relaxed font-sans">
          {item.description}
        </p>

        {/* Client Interactive Action Buttons (Launch, Bookmark, Rating, Report) */}
        <ResourceActionsClient item={item} />

        {/* Mirror URLs if available */}
        {item.mirrorUrls && item.mirrorUrls.length > 0 && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 space-y-2">
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300">
              Alternate Verified Mirrors:
            </span>
            <div className="flex flex-wrap gap-2">
              {item.mirrorUrls.map((mirror, idx) => (
                <a
                  key={idx}
                  href={mirror}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline bg-white dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-zinc-800 flex items-center gap-1"
                >
                  <span>{mirror.replace(/^https?:\/\//, '')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* In-Depth Technical Specifications & Verification Table */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-4">
        <h2 className="text-base font-bold font-mono text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-500" />
          <span>Technical Specifications &amp; Audit Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">License &amp; Code</span>
            <p className="font-bold text-slate-800 dark:text-zinc-200">
              {item.isOpenSource ? 'Open Source (Audited FOSS)' : 'Verified Free Service'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Registration Policy</span>
            <p className="font-bold text-slate-800 dark:text-zinc-200">
              {item.isNoReg ? 'Zero Registration Required' : 'Optional / Free Account'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Ad Status</span>
            <p className="font-bold text-slate-800 dark:text-zinc-200">
              {item.isNoAds ? 'Ad-Free Experience' : 'Standard (Pair with uBlock)'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Last Community Audit</span>
            <p className="font-bold text-slate-800 dark:text-zinc-200">
              {item.lastVerified || 'Daily Poller Active'}
            </p>
          </div>
        </div>
      </section>

      {/* Safety & Recommended Usage Instructions */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-4">
        <h2 className="text-base font-bold font-mono text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Safe Usage &amp; Privacy Advisory for {item.title}</span>
        </h2>

        <div className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed space-y-2.5 font-sans">
          <p>
            When utilizing <strong>{item.title}</strong>, freebies recommends having an active content blocker like <strong>uBlock Origin</strong> enabled to ensure clean media rendering without unintended third-party tracker requests.
          </p>
          <p>
            Always verify that you are connecting to the verified domain (<strong>{domain}</strong>) shown above. Never download executable installers or browser plugins prompted by secondary redirect screens.
          </p>
        </div>
      </section>

      {/* Interactive Public & Private Comments Component */}
      <ResourceCommentsClient resourceId={item.id} resourceTitle={item.title} />

      {/* Related Alternatives Section */}
      {relatedItems.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-mono text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Similar Curated Alternatives in {category.name}</span>
            </h2>
            <Link
              href={`/category/${category.slug}`}
              className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline"
            >
              View Category &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedItems.map((rel) => (
              <div
                key={rel.id}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {rel.title}
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {rel.safetyRating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mt-1">
                    {rel.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <Link
                    href={`/resource/${rel.id}`}
                    className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
                  >
                    View Review &rarr;
                  </Link>
                  <a
                    href={rel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-slate-600 flex items-center gap-1"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
