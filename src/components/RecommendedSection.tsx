import React, { useState } from 'react';
import { LinkItem } from '../types/fmhy';
import { Star, Sparkles, ExternalLink, Copy, Check, ThumbsUp, Code, Globe, Share2 } from 'lucide-react';
import { getUserVotes, saveUserVote, getEffectiveRating, UserVote } from '../utils/ratings';
import { useToast } from '../context/ToastContext';

interface RecommendedSectionProps {
  links: LinkItem[];
  onToggleBookmark: (item: LinkItem) => void;
  bookmarkedItems?: LinkItem[];
  onOpenContributorProfile?: (username: string) => void;
  categoryTitle?: string;
}

export const RecommendedSection: React.FC<RecommendedSectionProps> = ({
  links,
  onToggleBookmark,
  bookmarkedItems = [],
  onOpenContributorProfile,
  categoryTitle,
}) => {
  const { showToast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, UserVote>>(() => getUserVotes());

  // Filter and sort top recommended links (starred or badge with ⭐/🔥/Top/Recommended, or highest rating)
  let filteredRecs = [...links]
    .filter((item) => {
      const isStarred = item.isStarred;
      const isBadgeRec = !!(item.badge && (
        item.badge.includes('⭐') || 
        item.badge.includes('🔥') || 
        item.badge.includes('Top') || 
        item.badge.includes('Must Have') || 
        item.badge.includes('Recommended')
      ));
      const rating = getEffectiveRating(item, votes[item.id] || null);
      return isStarred || isBadgeRec || rating.score >= 4.5;
    })
    .sort((a, b) => {
      if (a.isStarred && !b.isStarred) return -1;
      if (!a.isStarred && b.isStarred) return 1;
      const ratingA = getEffectiveRating(a, votes[a.id] || null).score;
      const ratingB = getEffectiveRating(b, votes[b.id] || null).score;
      return ratingB - ratingA;
    });

  if (filteredRecs.length === 0 && links.length > 0) {
    filteredRecs = [...links].slice(0, 4);
  }

  const recommendedLinks = filteredRecs.slice(0, 6);

  const handleCopy = (e: React.MouseEvent, item: LinkItem) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    showToast(`Copied URL for "${item.title}" to clipboard`, 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = async (e: React.MouseEvent, item: LinkItem) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description || `Check out ${item.title} on FMHY Freebies!`,
          url: item.url,
        });
        showToast(`Shared "${item.title}"!`, 'success');
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          navigator.clipboard.writeText(item.url);
          showToast(`Copied link for "${item.title}" to clipboard!`, 'info');
        }
      }
    } else {
      navigator.clipboard.writeText(item.url);
      showToast(`Copied link for "${item.title}" to clipboard!`, 'info');
    }
  };

  const handleVote = (e: React.MouseEvent, item: LinkItem, currentVote: UserVote) => {
    e.stopPropagation();
    const newVote = currentVote === 'up' ? null : 'up';
    saveUserVote(item.id, newVote);
    setVotes(getUserVotes());
    if (newVote === 'up') {
      showToast(`Upvoted "${item.title}"`, 'success');
    } else {
      showToast(`Removed vote for "${item.title}"`, 'info');
    }
  };

  const handleBookmarkToggle = (item: LinkItem, isBookmarked: boolean) => {
    onToggleBookmark(item);
    if (isBookmarked) {
      showToast(`Removed "${item.title}" from saved bookmarks`, 'info');
    } else {
      showToast(`Bookmarked "${item.title}"!`, 'success');
    }
  };

  if (recommendedLinks.length === 0) return null;

  return (
    <section className="bg-white dark:bg-zinc-900/80 border border-amber-300/80 dark:border-amber-500/30 rounded-2xl p-4 sm:p-5 mb-6 shadow-md backdrop-blur-md transition-colors relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-rose-400/10 dark:bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-200 dark:border-zinc-800 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30 shadow-xs">
            <Star className="w-4 h-4 fill-amber-400 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono flex items-center gap-2 text-slate-900 dark:text-white">
              <span>{categoryTitle ? `TOP PRIORITY ${categoryTitle.toUpperCase()} SOURCES` : 'PRIORITY RECOMMENDED SOURCES'}</span>
              <span className="text-[10px] font-mono font-bold uppercase bg-gradient-to-r from-amber-500 to-rose-500 text-white px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                ⭐ Verified Staff Picks
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">
              Community-starred & essential ad-free resources prioritized for instant access.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800/60">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>{recommendedLinks.length} Curated Essentials</span>
        </div>
      </div>

      {/* Grid of Recommended Links with Pulsing Border Gradient */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {recommendedLinks.map((item) => {
          const isBookmarked = bookmarkedItems.some((b) => b.id === item.id);
          const ratingInfo = getEffectiveRating(item, votes[item.id] || null);
          const userVote = votes[item.id] || null;

          return (
            <div
              key={item.id}
              className="group relative bg-gradient-to-b from-amber-50/90 via-white to-amber-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950/90 border border-amber-300 dark:border-amber-500/40 p-4 rounded-2xl flex flex-col justify-between transition-all hover:-translate-y-1 recommended-gradient-border recommended-glow-pulse shadow-md overflow-hidden"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-500/30 text-[10px] font-mono flex items-center gap-1">
                      {item.isOpenSource ? <Code className="w-3 h-3" /> : <Globe className="w-3 h-3" />}
                      <span>{item.subcategory}</span>
                    </span>

                    {item.badge && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700/60">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleBookmarkToggle(item, isBookmarked)}
                    className="p-1 rounded-lg text-slate-400 hover:text-amber-500 transition-colors"
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Link'}
                  >
                    <Star className={`w-4 h-4 ${isBookmarked ? 'text-amber-500 fill-amber-400' : 'text-amber-400 fill-amber-300'}`} />
                  </button>
                </div>

                {/* Title */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors flex items-center justify-between gap-1.5 mb-1.5"
                >
                  <span className="truncate flex items-center gap-1.5 font-sans">
                    {item.title}
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 animate-pulse" />
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 group-hover:text-amber-500 shrink-0" />
                </a>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-zinc-300 line-clamp-2 leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              {/* Bottom Metadata & Controls */}
              <div className="pt-2.5 border-t border-amber-200/80 dark:border-zinc-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 text-amber-700 dark:text-amber-300 font-bold bg-amber-100/80 dark:bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800/80 text-[11px]">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{ratingInfo.score.toFixed(1)}</span>
                  </div>

                  {item.addedBy && (
                    <button
                      onClick={() => onOpenContributorProfile && onOpenContributorProfile(item.addedBy!)}
                      className="text-[10px] text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors truncate max-w-[90px] hidden sm:inline-block"
                      title={`Added by @${item.addedBy}`}
                    >
                      @{item.addedBy}
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => handleVote(e, item, userVote)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 transition-all ${
                      userVote === 'up'
                        ? 'bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/80'
                        : 'bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 text-slate-600 dark:text-zinc-400'
                    }`}
                    title="Upvote resource"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{ratingInfo.votes}</span>
                  </button>

                  <button
                    onClick={(e) => handleShare(e, item)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-400 transition-colors"
                    title="Share Link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => handleCopy(e, item)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-400 transition-colors"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] flex items-center gap-1 transition-colors shadow-xs"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
