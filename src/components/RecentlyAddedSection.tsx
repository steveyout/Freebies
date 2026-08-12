import React, { useState } from 'react';
import { LinkItem } from '../types/fmhy';
import { Sparkles, ExternalLink, Calendar, User, Copy, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface RecentlyAddedSectionProps {
  links: LinkItem[];
  onOpenContributorProfile?: (username: string) => void;
}

export const RecentlyAddedSection: React.FC<RecentlyAddedSectionProps> = ({
  links,
  onOpenContributorProfile,
}) => {
  const { config } = useTheme();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Take top 5 sorted by dateAdded or fallback insertion
  const sortedLinks = [...links]
    .sort((a, b) => {
      const dateA = a.dateAdded || '2026-07-01';
      const dateB = b.dateAdded || '2026-07-01';
      return dateB.localeCompare(dateA);
    })
    .slice(0, 5);

  const handleCopy = (e: React.MouseEvent, url: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Recently';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs backdrop-blur-md transition-colors">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl ${config.bgActive} ${config.textAccent} border ${config.borderActive}`}>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono flex items-center gap-2 text-slate-900 dark:text-white">
              <span>RECENTLY ADDED LINKS</span>
              <span className={`text-[10px] font-mono uppercase ${config.badgeBg} ${config.badgeText} px-2 py-0.5 rounded-full border ${config.badgeBorder}`}>
                Live Index (Top 5)
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">
              Latest resources merged via GitHub Pull Requests & community additions.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 hidden sm:inline-block">
          Auto-updated via PRs
        </span>
      </div>

      {/* Grid of 5 Most Recent Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {sortedLinks.map((item) => {
          const submitter = item.addedBy || 'freebies-community';
          return (
            <div
              key={item.id}
              className="group bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/80 hover:border-slate-300 dark:hover:border-zinc-700 p-3.5 rounded-xl flex flex-col justify-between transition-all hover:-translate-y-0.5 shadow-xs"
            >
              <div>
                {/* Top badges: Date & Contributor */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-zinc-400 font-mono mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className={`w-3 h-3 ${config.textAccent}`} />
                    {formatDate(item.dateAdded)}
                  </span>

                  <button
                    onClick={() => onOpenContributorProfile && onOpenContributorProfile(submitter)}
                    className="flex items-center gap-1 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors font-semibold"
                    title={`View profile for @${submitter}`}
                  >
                    <User className="w-3 h-3" />
                    <span>@{submitter}</span>
                  </button>
                </div>

                {/* Title */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-xs text-slate-900 dark:text-zinc-100 group-hover:underline transition-colors flex items-center justify-between gap-1 mb-1 line-clamp-1"
                >
                  <span className="truncate">{item.title}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 dark:text-zinc-500 shrink-0" />
                </a>

                {/* Brief Description */}
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-2.5">
                  {item.description}
                </p>
              </div>

              {/* Bottom Row */}
              <div className="pt-2 border-t border-slate-200 dark:border-zinc-900 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1">
                  {item.isOpenSource && (
                    <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-900/50 px-1 py-0.2 rounded font-mono">
                      FOSS
                    </span>
                  )}
                  <span className="bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-400 px-1 py-0.2 rounded font-mono truncate max-w-[80px]">
                    {item.subcategory}
                  </span>
                </div>

                <button
                  onClick={(e) => handleCopy(e, item.url, item.id)}
                  className="p-1 rounded text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors"
                  title="Copy Link URL"
                >
                  {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
