import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AuditClient } from '@/components/AuditClient';
import { constructMetadata, getBreadcrumbJsonLd } from '@/lib/seo';
import { Activity, ChevronRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Link Health Audit & Realtime Uptime Verification | freebies',
  description: 'Public integrity audit log for freebies directory. Realtime domain reachability monitoring, community dead-link reports, and resolution logs.',
  path: '/audit',
});

export default function AuditPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Audit', url: '/audit' },
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
        <span className="text-slate-900 dark:text-white font-bold">Link Health Audit</span>
      </nav>

      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
            Integrity Transparency
          </span>
          <span className="text-xs font-mono text-slate-500">
            Daily Automated Poller &amp; Community Flags
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Link Health &amp; Domain Verification Audit
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          We maintain high directory standards by continuously checking domain health, detecting ISP blocks, and investigating user reports to ensure all links remain 100% operational.
        </p>
      </header>

      <AuditClient />
    </main>
  );
}
