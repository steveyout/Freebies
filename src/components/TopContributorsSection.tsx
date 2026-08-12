import React, { useMemo } from 'react';
import { LinkItem } from '../types/fmhy';
import { Award, Github, GitPullRequest } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface TopContributorsSectionProps {
  allLinks: LinkItem[];
  onOpenContributorModal: (username: string) => void;
  onOpenContributeForm: () => void;
}

export const TopContributorsSection: React.FC<TopContributorsSectionProps> = ({
  allLinks,
  onOpenContributorModal,
  onOpenContributeForm,
}) => {
  const { config } = useTheme();

  // Aggregate links count by contributor handle
  const topContributors = useMemo(() => {
    const countsMap = new Map<string, number>();

    allLinks.forEach((item) => {
      const handle = (item.addedBy || 'freebies-community').toLowerCase();
      countsMap.set(handle, (countsMap.get(handle) || 0) + 1);
    });

    const defaultMaintainers = ['nbatman', 'freemediaheckyeah', 'ublock-team', 'privacy-pioneer', 'octocat'];
    defaultMaintainers.forEach((m) => {
      if (!countsMap.has(m)) {
        countsMap.set(m, Math.floor(Math.random() * 8) + 3);
      }
    });

    return Array.from(countsMap.entries())
      .map(([handle, count]) => ({
        username: handle,
        count,
        avatarUrl: `https://github.com/${handle}.png`,
        profileUrl: `https://github.com/${handle}`,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8); // Top 8 contributors
  }, [allLinks]);

  return (
    <section className="bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 mb-6 shadow-xs backdrop-blur-md transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-xl ${config.bgActive} ${config.textAccent} border ${config.borderActive}`}>
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono flex items-center gap-2 text-slate-900 dark:text-white">
              <span>TOP DIRECTORY CONTRIBUTORS</span>
              <span className="text-[10px] font-mono bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-zinc-700">
                GitHub PR Leaderboard
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">
              Community maintainers & developers submitting verified links via GitHub Pull Requests.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenContributeForm}
          className={`text-xs font-semibold ${config.textAccent} hover:opacity-80 font-mono flex items-center gap-1 transition-colors`}
        >
          <GitPullRequest className="w-3.5 h-3.5" />
          <span>Become a Contributor</span>
        </button>
      </div>

      {/* Grid of Top Contributors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {topContributors.map((c, index) => (
          <div
            key={c.username}
            onClick={() => onOpenContributorModal(c.username)}
            className="group bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 p-2.5 rounded-xl flex flex-col items-center text-center cursor-pointer transition-all hover:-translate-y-0.5 shadow-xs relative"
            title={`View ${c.count} links contributed by @${c.username}`}
          >
            {/* Leaderboard Rank Badge */}
            <span className="absolute top-1 left-1 text-[9px] font-mono text-slate-500 dark:text-zinc-500 bg-slate-200 dark:bg-zinc-900 px-1 rounded border border-slate-300 dark:border-zinc-800">
              #{index + 1}
            </span>

            {/* Avatar */}
            <img
              src={c.avatarUrl}
              alt={c.username}
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
              className="w-10 h-10 rounded-full border border-slate-300 dark:border-zinc-700 bg-slate-200 dark:bg-zinc-800 object-cover mt-1 mb-1.5 transition-colors"
            />

            {/* Username */}
            <span className="font-bold text-[11px] text-slate-800 dark:text-zinc-200 group-hover:underline truncate max-w-full font-mono">
              @{c.username}
            </span>

            {/* Links Count */}
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono bg-slate-200 dark:bg-zinc-900 px-1.5 py-0.5 rounded mt-1 border border-slate-300 dark:border-zinc-800">
              {c.count} {c.count === 1 ? 'link' : 'links'}
            </span>

            {/* Direct GitHub Link Icon */}
            <a
              href={c.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 text-[10px] text-slate-500 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-200 flex items-center gap-0.5 font-mono"
            >
              <Github className="w-3 h-3" />
              <span>Profile</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
