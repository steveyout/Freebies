'use client';

import React from 'react';
import { useModal } from '@/context/ModalContext';
import { useTheme } from '@/context/ThemeContext';
import { 
  GitPullRequest, 
  Github, 
  FileCode, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Send,
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export const ContributeClient: React.FC = () => {
  const { config } = useTheme();
  const { openContribute, openMarkdownEditor } = useModal();

  return (
    <div className="space-y-8">
      {/* Hybrid Submission Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-amber-500/10 to-rose-500/10 border border-slate-200 dark:border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-mono font-bold uppercase tracking-wider">
              Hybrid Submission Model
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Submit via Web UI or GitHub PR</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            Choose the method that suits your workflow: submit instantly through our web interface for admin review, or submit a GitHub Pull Request with Markdown changes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={openContribute}
            className={`px-5 py-2.5 rounded-xl ${config.buttonBg} text-xs font-bold font-mono flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Submit Resource (UI / PR)</span>
          </button>

          <a
            href="https://github.com/steveyout/Freebies/pulls"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors shadow-2xs"
          >
            <Github className="w-4 h-4" />
            <span>GitHub PRs</span>
          </a>
        </div>
      </div>

      {/* Two Paths Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Method 1: Direct Web Submission */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-4 hover:border-amber-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  1. Direct Web UI Submission
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-zinc-400">
                  Instant, no GitHub account required
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 font-bold">
              Fastest
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Fill out the title, link URL, category, and quick description directly in our submission form. Submissions are queued in the database where moderators review and approve them with one click.
          </p>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 text-[11px] font-mono text-slate-600 dark:text-zinc-400 space-y-1">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Real-time admin notification via Socket.IO</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Duplication checks &amp; anti-spam verification</span>
            </div>
          </div>

          <button
            onClick={openContribute}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-900 dark:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <span>Open Direct Submission Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Method 2: GitHub Pull Request */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-4 hover:border-indigo-500/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                <GitPullRequest className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  2. GitHub Pull Request
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-zinc-400">
                  Version controlled &amp; community audited
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-400 font-bold">
              Git FOSS
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Fork the repository, append your resource to the relevant <code className="text-amber-600 dark:text-amber-400">data/*.md</code> table, and submit a Pull Request. You can also paste your PR link into our queue for accelerated review!
          </p>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 text-[11px] font-mono text-slate-600 dark:text-zinc-400 space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold">
              <FileCode className="w-3.5 h-3.5" />
              <span>Full commit history &amp; markdown diffs</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Auto-synced by live GitHub poller</span>
            </div>
          </div>

          <a
            href="https://github.com/steveyout/Freebies"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-900 dark:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <span>View GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
          <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Acceptable Submissions</span>
          </h3>
          <ul className="text-xs text-slate-600 dark:text-zinc-400 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Zero Registration Required:</strong> Resources with open access are prioritized over accounts requiring signup.</li>
            <li><strong>GPL / MIT / Open Source:</strong> FOSS software with public repositories and verifiable release binaries.</li>
            <li><strong>Clean Video Players:</strong> Streaming platforms featuring minimal redirect ads and multi-server redundancy.</li>
            <li><strong>Functional Tools:</strong> WebAssembly utilities, client-side format converters, and developer free tiers.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
          <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Disallowed Content</span>
          </h3>
          <ul className="text-xs text-slate-600 dark:text-zinc-400 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Mandatory Credit Cards:</strong> Services requesting payment card details for &quot;free trials&quot;.</li>
            <li><strong>Malicious Redirects:</strong> Sites forcing APK/EXE downloads disguised as video players.</li>
            <li><strong>Paid Sponsored Placements:</strong> We do not accept sponsored or commercial affiliate links.</li>
            <li><strong>Dead or Unresponsive Mirrors:</strong> Domains that fail DNS lookup or SSL handshake.</li>
          </ul>
        </div>
      </div>

      {/* Markdown Schema Example */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-amber-500" />
            <span>Markdown Table Row Format (`data/*.md`)</span>
          </span>
          <button
            onClick={() => openMarkdownEditor('streaming.md')}
            className="text-amber-600 dark:text-amber-400 text-[11px] font-bold hover:underline"
          >
            Open in Markdown Studio &rarr;
          </button>
        </div>

        <div className="p-4 rounded-xl bg-zinc-950 text-emerald-400 border border-zinc-800 overflow-x-auto">
          <code>
            | **Platform Name** | [domain.com](https://domain.com) | 1080p HD | ❌ Not Needed | Fast video player, auto-subtitles, zero ads |
          </code>
        </div>
      </div>
    </div>
  );
};
