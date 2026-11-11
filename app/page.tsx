import React from 'react';
import type { Metadata } from 'next';
import { getAllCategories, getFeaturedResources, getAllResources } from '@/lib/data';
import { HomeClientWrapper } from '@/components/HomeClientWrapper';
import { constructMetadata, getFaqJsonLd } from '@/lib/seo';
import { 
  ShieldCheck, 
  HelpCircle, 
  Tv, 
  Code, 
  Layers, 
  Lock, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'freebies | Curated Mega-Directory of Free Media, HD Streaming & Software',
  description: 'Comprehensively audited mega-directory of verified free streaming portals (FlixHQ, CineJoy), uBlock Origin adblocking shields, open-source software, and AI tools with zero spam.',
  path: '/',
});

const HOMEPAGE_FAQS = [
  {
    question: 'What is freebies and how does it differ from other web directories?',
    answer: 'freebies is an open-source, community-audited mega-directory indexing high-quality free media, streaming platforms, adblocking configurations, open-source software, and AI utilities. Unlike commercial search engines and link aggregators that prioritize paid sponsors, freebies verifies every link for zero paywalls, intrusive malware, and operational uptime.',
  },
  {
    question: 'What are the top recommended free movie and TV streaming platforms?',
    answer: 'Our top priority streaming resources are FlixHQ (https://flixhq.ink) and CineJoy (https://cinejoy.online). Both provide 1080p high-definition playback, multi-language subtitles, fast cloud mirror switchers, and zero mandatory account registration.',
  },
  {
    question: 'How do I protect my privacy and block ads when using directory resources?',
    answer: 'We strongly recommend installing uBlock Origin on Firefox or Chromium browsers and setting your device DNS to an encrypted, filter-enabled resolver such as Quad9 (9.9.9.9) or NextDNS. This shields your browsing from tracking pixels, malicious redirects, and popups.',
  },
  {
    question: 'Are the software applications and developer tools on freebies free to use?',
    answer: 'Yes. Every resource in our software, developer, and utility categories is either FOSS (Free and Open Source Software) under licenses like GPL, MIT, and Apache 2.0, or genuine freeware verified to contain zero bundled adware or telemetry.',
  },
  {
    question: 'How often is the freebies directory updated and audited?',
    answer: 'Our automated GitHub polling hooks and active maintainers audit link health, domain migrations, and community reports daily. Dead or degraded mirrors are automatically flagged in real time.',
  },
  {
    question: 'How can I contribute new tools or report broken links to the repository?',
    answer: 'Anyone can submit new links or propose corrections through GitHub Pull Requests on our repository (steveyout/Freebies) or use the built-in "Submit PR" workflow on this site.',
  },
];

export default function HomePage() {
  const categories = getAllCategories();
  const featuredLinks = getFeaturedResources(8);
  const allFlatLinks = getAllResources();
  const faqJsonLd = getFaqJsonLd(HOMEPAGE_FAQS);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Interactive Hero, Picks, Categories & Tags */}
      <HomeClientWrapper
        categories={categories}
        featuredLinks={featuredLinks}
        allFlatLinks={allFlatLinks}
      />

      {/* Authoritative Directory Guide & Online Privacy Protocol (Avoids Thin Content) */}
      <section className="mt-16 pt-12 border-t border-slate-200 dark:border-zinc-800 space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Editorial Standards &amp; Safety Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The freebies Standard: Curating Free Media &amp; Open Source Without Compromise
          </h2>
          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            Finding high-utility software, developer cloud tiers, and entertainment on the open web should not come at the expense of privacy or security. Here is how our directory operates, what we look for, and how you can browse safely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 w-fit">
              <Tv className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Zero-Friction Streaming
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              We exclusively prioritize platforms that require <strong>no account signup</strong>, credit cards, or personal data. Top-ranked indexers like FlixHQ and CineJoy provide multiple server mirrors (VidCloud, UpCloud, MegaCloud) to bypass ISP throttling and geo-restrictions smoothly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-fit">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              The Essential Privacy Shield
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Every freebies user should operate with <strong>uBlock Origin</strong> enabled. Pairing open-source content blocking with privacy DNS resolvers (such as Quad9 or AdGuard) eliminates malvertising, crypto-miners, and countdown timer walls before they render.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 w-fit">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              FOSS &amp; Audited Freeware
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Software entries are screened for transparent licensing (GPL, MIT, Apache), active repository maintenance, clean installers with zero third-party adware bundles, and portable executable availability for sandbox testing.
            </p>
          </div>
        </div>
      </section>

      {/* Directory FAQ Section with Schema.org FAQPage */}
      <section className="mt-16 pt-12 border-t border-slate-200 dark:border-zinc-800 space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Common Questions About freebies Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
            Answers to frequent inquiries regarding directory links, privacy tools, and contribution workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HOMEPAGE_FAQS.map((faq, idx) => (
            <article
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2.5 shadow-2xs"
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
    </main>
  );
}
