import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  getAllCategories, 
  getCategoryBySlug, 
  getCategoryEditorial 
} from '@/lib/data';
import { CategoryContentClient } from '@/components/CategoryContentClient';
import { 
  constructMetadata, 
  getBreadcrumbJsonLd, 
  getCollectionJsonLd, 
  getFaqJsonLd,
  SITE_CONFIG 
} from '@/lib/seo';
import { getCategoryIcon } from '@/utils/categoryIcons';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  HelpCircle, 
  Layers, 
  AlertTriangle 
} from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    categorySlug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) {
    return constructMetadata({ title: 'Category Not Found', noIndex: true });
  }

  const editorial = getCategoryEditorial(category.slug, category.name);
  const totalItems = category.subcategories.reduce((acc, s) => acc + s.items.length, 0);

  return constructMetadata({
    title: `${editorial.title} (${totalItems}+ Verified Resources)`,
    description: editorial.summary,
    path: `/category/${category.slug}`,
    keywords: [
      category.name,
      `${category.name} free`,
      `${category.name} open source`,
      `${category.name} directory`,
      ...category.subcategories.map((s) => s.name),
    ],
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const editorial = getCategoryEditorial(category.slug, category.name);
  const allCategoryItems = category.subcategories.flatMap((s) => s.items);
  const totalItems = allCategoryItems.length;

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/#categories' },
    { name: category.name, url: `/category/${category.slug}` },
  ];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbs);
  const collectionJsonLd = getCollectionJsonLd(
    category.name,
    editorial.summary,
    `/category/${category.slug}`,
    allCategoryItems
  );
  const faqJsonLd = getFaqJsonLd(editorial.faqs);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-10">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Semantic Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-amber-500 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span>Categories</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 dark:text-white font-bold">{category.name}</span>
      </nav>

      {/* Category Hero / Header */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-950 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-md">
              {getCategoryIcon(category.iconName, 'w-8 h-8')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 px-2 py-0.5 rounded-md">
                  Verified Directory Hub
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {category.subcategories.length} subcategories
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
                {category.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs bg-white dark:bg-zinc-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span><strong>{totalItems}</strong> Curated Resources</span>
          </div>
        </div>

        {/* Category Description */}
        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed max-w-4xl">
          {editorial.summary}
        </p>
      </header>

      {/* Editorial Overview & Guide (Avoids Thin Content) */}
      <section className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Overview &amp; Directory Insights</span>
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line space-y-3 font-sans">
            {editorial.longDescription}
          </div>
        </div>

        {/* Feature Highlights & Safety Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-xs font-mono font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Key Standards &amp; Selection Criteria</span>
            </h3>
            <ul className="text-xs text-slate-600 dark:text-zinc-400 space-y-1.5 list-disc list-inside">
              {editorial.keyFeatures.map((feat, idx) => (
                <li key={idx} className="leading-relaxed">{feat}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 space-y-2">
            <h3 className="text-xs font-mono font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span>Recommended Safety &amp; Privacy Protocol</span>
            </h3>
            <ul className="text-xs text-slate-600 dark:text-zinc-400 space-y-1.5 list-disc list-inside">
              {editorial.safetyTips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Subcategories, Filters & Cards Client Component */}
      <section className="space-y-6">
        <CategoryContentClient category={category} />
      </section>

      {/* Category Specific FAQ Section with Schema.org */}
      {editorial.faqs.length > 0 && (
        <section className="pt-10 border-t border-slate-200 dark:border-zinc-800 space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {category.name} FAQs &amp; Help
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {editorial.faqs.map((faq, idx) => (
              <article
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-start gap-2">
                  <span className="text-amber-500 font-mono font-bold shrink-0">Q:</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed pl-5">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
