import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getAllCategories, 
  getSubcategory 
} from '@/lib/data';
import { SubcategoryClientWrapper } from '@/components/SubcategoryClientWrapper';
import { 
  constructMetadata, 
  getBreadcrumbJsonLd, 
  getCollectionJsonLd 
} from '@/lib/seo';
import { 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  ArrowLeft,
  ExternalLink,
  Table as TableIcon
} from 'lucide-react';

interface SubcategoryPageProps {
  params: Promise<{
    categorySlug: string;
    subcategorySlug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.flatMap((cat) =>
    cat.subcategories.map((sub) => {
      const subSlug = sub.id.replace(`${cat.id}-`, '') || sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return {
        categorySlug: cat.slug,
        subcategorySlug: subSlug,
      };
    })
  );
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const { categorySlug, subcategorySlug } = await params;
  const result = getSubcategory(categorySlug, subcategorySlug);

  if (!result) {
    return constructMetadata({ title: 'Subcategory Not Found', noIndex: true });
  }

  const { category, subcategory } = result;

  return constructMetadata({
    title: `${subcategory.name} - Free ${category.name} Resources & Tools`,
    description: `Curated index of ${subcategory.name} under ${category.name}. Audited for safety, uptime, and accessibility with zero required signup.`,
    path: `/category/${category.slug}/${subcategorySlug}`,
    keywords: [
      subcategory.name,
      `${subcategory.name} free`,
      `${subcategory.name} online`,
      category.name,
      ...subcategory.items.map((i) => i.title),
    ],
  });
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { categorySlug, subcategorySlug } = await params;
  const result = getSubcategory(categorySlug, subcategorySlug);

  if (!result) {
    notFound();
  }

  const { category, subcategory } = result;

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: category.name, url: `/category/${category.slug}` },
    { name: subcategory.name, url: `/category/${category.slug}/${subcategorySlug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);
  const collectionJsonLd = getCollectionJsonLd(
    subcategory.name,
    `Curated ${subcategory.name} resources under ${category.name}`,
    `/category/${category.slug}/${subcategorySlug}`,
    subcategory.items
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
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
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 dark:text-white font-bold">{subcategory.name}</span>
      </nav>

      {/* Header */}
      <header className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/category/${category.slug}`}
                className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to {category.name}</span>
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {subcategory.name}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-slate-50 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{subcategory.items.length} Verified Entries</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          Curated collection of verified platforms and tools for {subcategory.name}. Each entry is checked for uptime, zero invasive adware, and direct access.
        </p>
      </header>

      {/* Semantic Comparison Table (Helps Crawlers & Readers) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold font-mono text-slate-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-amber-500" />
            <span>Direct Comparison Matrix</span>
          </h2>
          <span className="text-[11px] font-mono text-slate-500">
            Audited &amp; Ranked
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 dark:bg-zinc-950/80 text-[11px] font-mono font-bold text-slate-600 dark:text-zinc-400 border-b border-slate-200 dark:border-zinc-800">
              <tr>
                <th className="p-3">Resource Name</th>
                <th className="p-3">Key Features &amp; Notes</th>
                <th className="p-3">Registration</th>
                <th className="p-3">Safety Rating</th>
                <th className="p-3 text-right">Direct Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
              {subcategory.items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">
                    <Link href={`/resource/${item.id}`} className="hover:text-amber-500 transition-colors">
                      {item.title}
                    </Link>
                    {item.badge && (
                      <span className="ml-2 text-[9px] font-mono bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-1.5 py-0.2 rounded font-bold">
                        {item.badge}
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-zinc-400 max-w-md leading-relaxed">
                    {item.description}
                  </td>
                  <td className="p-3 font-mono text-[11px]">
                    {item.isNoReg ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">❌ Not Needed</span>
                    ) : (
                      <span className="text-slate-500">Optional</span>
                    )}
                  </td>
                  <td className="p-3 font-mono text-[11px]">
                    <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-bold">
                      {item.safetyRating}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Cards View */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold font-mono text-slate-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-500" />
          <span>Interactive Resource Cards</span>
        </h2>
        <SubcategoryClientWrapper subcategory={subcategory} />
      </section>

      {/* Sibling Subcategories Navigation */}
      <section className="pt-8 border-t border-slate-200 dark:border-zinc-800 space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          Other {category.name} Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {category.subcategories
            .filter((s) => s.id !== subcategory.id)
            .map((s) => {
              const sSlug = s.id.replace(`${category.id}-`, '') || s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <Link
                  key={s.id}
                  href={`/category/${category.slug}/${sSlug}`}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-amber-500 text-xs font-mono text-slate-700 dark:text-zinc-300 hover:text-amber-500 transition-colors"
                >
                  <span>{s.name}</span>
                  <span className="ml-1.5 opacity-60">({s.items.length})</span>
                </Link>
              );
            })}
        </div>
      </section>
    </main>
  );
}
