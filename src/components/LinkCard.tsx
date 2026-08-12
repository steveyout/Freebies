import React, { useState, useEffect } from 'react';
import { LinkItem } from '../types/fmhy';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Star, 
  Code, 
  Sparkles,
  Globe,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  CheckCircle2,
  Activity,
  RefreshCw,
  Share2
} from 'lucide-react';
import { motion } from 'motion/react';
import { getUserVotes, saveUserVote, getEffectiveRating, UserVote } from '../utils/ratings';
import { getLinkHealth, checkLinkHealthAsync, LinkHealthRecord } from '../utils/linkHealth';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

interface LinkCardProps {
  item: LinkItem;
  isBookmarked: boolean;
  onToggleBookmark: (item: LinkItem) => void;
  onOpenSourceModal?: (item: LinkItem) => void;
  onReportBroken?: (item: LinkItem) => void;
  onSelectTag?: (tag: string) => void;
  viewMode?: 'grid' | 'list' | 'compact';
}

export const LinkCard: React.FC<LinkCardProps> = ({
  item,
  isBookmarked,
  onToggleBookmark,
  onReportBroken,
  onSelectTag,
  viewMode = 'grid',
}) => {
  const { config } = useTheme();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [userVote, setUserVote] = useState<UserVote>(() => getUserVotes()[item.id] || null);
  const [health, setHealth] = useState<LinkHealthRecord>(() => getLinkHealth(item));

  // Listen for link health updates
  useEffect(() => {
    const handleHealthUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail || customEvent.detail.itemId === item.id) {
        setHealth(getLinkHealth(item));
      }
    };

    window.addEventListener('freebies-link-health-updated', handleHealthUpdate);
    return () => window.removeEventListener('freebies-link-health-updated', handleHealthUpdate);
  }, [item]);

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBookmark(item);
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);
    if (isBookmarked) {
      showToast(`Removed "${item.title}" from saved bookmarks`, 'info');
    } else {
      showToast(`Bookmarked "${item.title}"!`, 'success');
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    showToast(`Copied URL for "${item.title}" to clipboard`, 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (e: React.MouseEvent) => {
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

  const handleVote = (e: React.MouseEvent, voteType: 'up' | 'down') => {
    e.stopPropagation();
    const newVote = userVote === voteType ? null : voteType;
    setUserVote(newVote);
    saveUserVote(item.id, newVote);
    if (newVote === 'up') {
      showToast(`Upvoted "${item.title}"`, 'success');
    } else if (newVote === 'down') {
      showToast(`Downvoted "${item.title}"`, 'warning');
    } else {
      showToast(`Removed vote for "${item.title}"`, 'info');
    }
  };

  const handleRunSinglePing = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await checkLinkHealthAsync(item);
  };

  const ratingInfo = getEffectiveRating(item, userVote);

  const isTopRatedOrRecommended = item.isStarred || 
    !!(item.badge && (item.badge.includes('⭐') || item.badge.includes('🔥') || item.badge.includes('Top') || item.badge.includes('Must Have') || item.badge.includes('Recommended')));

  const isBroken = health.status === 'broken';
  const isDegraded = health.status === 'degraded';
  const isChecking = health.status === 'checking';

  // Render Link Health Badge
  const renderHealthBadge = (compact = false) => {
    if (isChecking) {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800 shrink-0">
          <RefreshCw className="w-3 h-3 animate-spin text-blue-500" />
          <span>Testing...</span>
        </span>
      );
    }

    if (isBroken) {
      return (
        <button
          onClick={handleRunSinglePing}
          title={`Link Flagged as Broken: ${health.reason || 'Offline'}. Click to re-check.`}
          className="inline-flex items-center gap-1 text-[10px] font-mono font-extrabold bg-rose-100 dark:bg-rose-950/90 text-rose-800 dark:text-rose-300 px-2 py-0.5 rounded-md border border-rose-300 dark:border-rose-700/80 shadow-xs shrink-0 animate-pulse hover:scale-105 transition-transform"
        >
          <AlertTriangle className="w-3 h-3 text-rose-600 dark:text-rose-400 shrink-0" />
          <span>{compact ? 'Broken' : 'Link Broken'}</span>
        </button>
      );
    }

    if (isDegraded) {
      return (
        <button
          onClick={handleRunSinglePing}
          title={`Performance Degraded: ${health.reason}. Click to re-check.`}
          className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950/90 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded-md border border-amber-300 dark:border-amber-700/80 shrink-0 hover:scale-105 transition-transform"
        >
          <Activity className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Degraded</span>
        </button>
      );
    }

    return (
      <span 
        title={`Automated Check: ${health.reason || 'Operational'}`}
        className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/50 shrink-0 hidden sm:inline-flex"
      >
        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
        <span>Healthy</span>
      </span>
    );
  };

  // Compact List view item
  if (viewMode === 'compact') {
    return (
      <motion.div 
        whileHover={{ x: 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        id={`link-card-compact-${item.id}`}
        className={`flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-900/40 border transition-all group ${
          isBroken
            ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10'
            : isTopRatedOrRecommended 
            ? 'border-amber-400/50 dark:border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/10 shadow-xs recommended-gradient-border recommended-glow-pulse' 
            : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0 pr-2">
          <motion.button
            onClick={handleBookmarkToggle}
            animate={isBouncing ? { scale: [1, 1.45, 0.8, 1.2, 0.9, 1], rotate: [0, -18, 18, -10, 5, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className="p-1 rounded text-slate-400 dark:text-zinc-500 hover:text-amber-500 transition-colors shrink-0"
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Link'}
          >
            <Star className={`w-3.5 h-3.5 ${isBookmarked || isTopRatedOrRecommended ? 'text-amber-500 fill-amber-400' : ''}`} />
          </motion.button>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-bold text-sm ${isBroken ? 'line-through text-rose-800 dark:text-rose-300' : 'text-slate-800 dark:text-zinc-200'} hover:underline hover:text-amber-500 dark:hover:text-amber-400 transition-colors truncate flex items-center gap-1.5`}
          >
            <span>{item.title}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 shrink-0" />
          </a>

          {/* Health Badge in Compact */}
          {renderHealthBadge(true)}

          {item.badge && !isBroken && (
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 hidden sm:inline-block font-bold ${
              isTopRatedOrRecommended 
                ? 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/60' 
                : 'text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800'
            }`}>
              {item.badge}
            </span>
          )}

          <p className="text-xs text-slate-500 dark:text-zinc-500 truncate hidden md:block">
            {item.description}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Rating Badge in Compact */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-zinc-950/80 px-2 py-0.5 rounded border border-slate-200 dark:border-zinc-800 text-[11px] font-mono">
            <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
            <span className="font-bold text-amber-700 dark:text-amber-300">{ratingInfo.score.toFixed(1)}</span>
          </div>

          {/* Upvote / Downvote Buttons */}
          <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-zinc-950/80 rounded-lg border border-slate-200 dark:border-zinc-800 p-0.5">
            <button
              onClick={(e) => handleVote(e, 'up')}
              className={`p-1 rounded text-[10px] transition-colors ${
                userVote === 'up' 
                  ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 font-bold' 
                  : 'text-slate-500 dark:text-zinc-500 hover:text-emerald-600'
              }`}
              title="Upvote resource"
            >
              <ThumbsUp className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => handleVote(e, 'down')}
              className={`p-1 rounded text-[10px] transition-colors ${
                userVote === 'down' 
                  ? 'text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/80 font-bold' 
                  : 'text-slate-500 dark:text-zinc-500 hover:text-rose-600'
              }`}
              title="Downvote resource"
            >
              <ThumbsDown className="w-3 h-3" />
            </button>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-400 transition-colors"
            title="Share Link"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>

          {/* Report Broken Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onReportBroken) onReportBroken(item);
            }}
            id={`report-broken-compact-${item.id}`}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            title="Report Broken Link"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-400 transition-colors"
            title="Copy URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </motion.div>
    );
  }

  // Standard Grid / List View
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ 
        y: isTopRatedOrRecommended ? -4 : -2, 
        scale: isTopRatedOrRecommended ? 1.015 : 1.005 
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      id={`link-card-${item.id}`}
      className={`relative p-4 rounded-2xl flex flex-col justify-between group transition-all overflow-hidden border shadow-xs ${
        isBroken
          ? 'bg-rose-50/30 dark:bg-zinc-900/80 border-rose-300 dark:border-rose-900/60'
          : isTopRatedOrRecommended
          ? 'bg-gradient-to-b from-amber-50/80 via-white to-amber-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950/90 border-amber-400/80 dark:border-amber-500/60 recommended-gradient-border recommended-glow-pulse shadow-md'
          : 'bg-white dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800/90 hover:border-slate-300 dark:hover:border-zinc-700'
      }`}
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2 mb-2 relative z-10">
          <div className="flex items-center gap-1.5">
            <div className={`p-2 rounded-xl shrink-0 ${
              isBroken
                ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800'
                : isTopRatedOrRecommended 
                ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/20' 
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
            }`}>
              {item.isOpenSource ? <Code className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
            </div>

            {/* Link Health Badge */}
            {renderHealthBadge(false)}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {item.badge && !isBroken && (
              <motion.span 
                animate={isTopRatedOrRecommended ? { scale: [1, 1.04, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className={`text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-md border ${
                  isTopRatedOrRecommended
                    ? 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 border-amber-300 dark:border-amber-500/40 shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700'
                }`}
              >
                {item.badge}
              </motion.span>
            )}
            <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase">
              {item.safetyRating}
            </span>
            <motion.button
              onClick={handleBookmarkToggle}
              id={`bookmark-btn-${item.id}`}
              animate={isBouncing ? { scale: [1, 1.45, 0.8, 1.2, 0.9, 1], rotate: [0, -18, 18, -10, 5, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              className="p-1 rounded-lg text-slate-400 dark:text-zinc-500 hover:text-amber-500 transition-colors"
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this link'}
            >
              <Star className={`w-3.5 h-3.5 ${isBookmarked || isTopRatedOrRecommended ? 'text-amber-500 fill-amber-400' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Title & External Link */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          id={`link-title-${item.id}`}
          className={`font-bold text-sm mb-1 transition-colors flex items-center justify-between gap-1 relative z-10 ${
            isBroken
              ? 'text-rose-900 dark:text-rose-200 line-through'
              : isTopRatedOrRecommended 
              ? 'text-amber-900 dark:text-amber-100 group-hover:text-amber-600 dark:group-hover:text-amber-300' 
              : 'text-slate-900 dark:text-white group-hover:underline'
          }`}
        >
          <span className="line-clamp-1 flex items-center gap-1.5">
            {item.title}
            {isTopRatedOrRecommended && !isBroken && (
              <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400 inline shrink-0 animate-pulse" />
            )}
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 group-hover:text-amber-500 transition-colors shrink-0" />
        </a>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-3 relative z-10">
          {item.description}
        </p>

        {/* Rating Bar Row */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-zinc-950/70 rounded-xl p-2 border border-slate-200 dark:border-zinc-800/70 mb-3">
          {/* Star Rating Display */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-500 dark:text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-300">
              {ratingInfo.score.toFixed(1)}
            </span>
            <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-500">
              ({ratingInfo.votes} votes)
            </span>
          </div>

          {/* Upvote & Downvote Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => handleVote(e, 'up')}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold flex items-center gap-1 transition-all ${
                userVote === 'up'
                  ? 'bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/80 shadow-xs'
                  : 'bg-slate-200/60 dark:bg-zinc-800/60 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-emerald-600'
              }`}
              title={userVote === 'up' ? 'Remove Upvote' : 'Upvote resource'}
            >
              <ThumbsUp className="w-3 h-3" />
              <span>{userVote === 'up' ? 'Upvoted' : 'Up'}</span>
            </button>

            <button
              onClick={(e) => handleVote(e, 'down')}
              className={`p-1 rounded-lg text-[11px] font-mono font-bold flex items-center gap-1 transition-all ${
                userVote === 'down'
                  ? 'bg-rose-100 dark:bg-rose-950/90 text-rose-800 dark:text-rose-400 border border-rose-300 dark:border-rose-700/80 shadow-xs'
                  : 'bg-slate-200/60 dark:bg-zinc-800/60 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-rose-600'
              }`}
              title={userVote === 'down' ? 'Remove Downvote' : 'Downvote resource'}
            >
              <ThumbsDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Tags & Action Footer */}
      <div className="mt-auto flex items-center justify-between gap-1 pt-2 border-t border-slate-200 dark:border-zinc-800/60">
        <div className="flex gap-1 flex-wrap">
          {item.tags.slice(0, 3).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onSelectTag) onSelectTag(tag);
              }}
              className="text-[9px] bg-slate-100 dark:bg-zinc-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-slate-600 hover:text-amber-800 dark:text-zinc-400 dark:hover:text-amber-300 px-1.5 py-0.5 rounded font-mono transition-colors cursor-pointer"
              title={`Filter resources by tag #${tag}`}
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {/* Report Broken Link Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onReportBroken) onReportBroken(item);
            }}
            id={`report-broken-btn-${item.id}`}
            className="p-1.5 rounded-lg bg-slate-100/80 dark:bg-zinc-800/80 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors text-[10px] font-mono flex items-center gap-1"
            title="Report Link as Broken / Dead"
          >
            <AlertTriangle className="w-3 h-3 text-rose-500/90" />
            <span className="hidden sm:inline">Report</span>
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg bg-slate-100/80 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-400 transition-colors text-[10px] font-mono flex items-center gap-1"
            title="Share Link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-100/80 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors text-[10px] font-mono flex items-center gap-1"
            title="Copy Link URL"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
