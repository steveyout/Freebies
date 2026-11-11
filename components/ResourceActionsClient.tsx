'use client';

import React, { useState, useEffect } from 'react';
import { LinkItem } from '@/types/fmhy';
import { useModal } from '@/context/ModalContext';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/context/ToastContext';
import { useResourceRealtime } from '@/hooks/useSocket';
import { 
  Star, 
  ExternalLink, 
  Copy, 
  Check, 
  Share2, 
  ThumbsUp, 
  ThumbsDown, 
  AlertTriangle,
  Bookmark,
  Vote as VoteIcon
} from 'lucide-react';

interface ResourceActionsClientProps {
  item: LinkItem;
}

export const ResourceActionsClient: React.FC<ResourceActionsClientProps> = ({ item }) => {
  const { config } = useTheme();
  const { showToast } = useToast();
  const { isBookmarked, toggleBookmark, openReportBroken } = useModal();
  const { liveVotes } = useResourceRealtime(item.id);

  const [copied, setCopied] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [score, setScore] = useState<number>(item.isStarred ? 47 : 14);
  const [upvotes, setUpvotes] = useState<number>(item.isStarred ? 48 : 16);
  const [downvotes, setDownvotes] = useState<number>(item.isStarred ? 1 : 2);
  const [voting, setVoting] = useState(false);

  const bookmarked = isBookmarked(item.id);

  // Fetch initial vote state and score for this IP
  useEffect(() => {
    async function loadVoteStatus() {
      try {
        const res = await fetch(`/api/vote?resourceId=${encodeURIComponent(item.id)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.score !== undefined) setScore(data.score);
          if (data.upvotesCount !== undefined) setUpvotes(data.upvotesCount);
          if (data.downvotesCount !== undefined) setDownvotes(data.downvotesCount);
          if (data.publicVote) setUserVote(data.publicVote);
        }
      } catch (err) {
        // Fallback to static item score
      }
    }
    loadVoteStatus();
  }, [item.id]);

  // Real-time vote updates via Socket.IO
  useEffect(() => {
    if (liveVotes.score !== undefined) {
      setScore(liveVotes.score);
      if (liveVotes.upvotesCount !== undefined) setUpvotes(liveVotes.upvotesCount);
      if (liveVotes.downvotesCount !== undefined) setDownvotes(liveVotes.downvotesCount);
    }
  }, [liveVotes]);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    showToast(`Copied ${item.title} URL to clipboard!`, 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.title} - Freebies Directory`,
          text: item.description,
          url: window.location.href,
        });
        showToast('Shared successfully!', 'success');
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Copied page link to clipboard!', 'info');
    }
  };

  const handleVote = async (type: 'up' | 'down') => {
    if (voting) return;
    setVoting(true);

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resourceId: item.id,
          voteType: type,
          isPrivate: false, // 1 vote per IP address enforced
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit vote');
      }

      setUserVote(data.activeVote);
      if (data.score !== undefined) setScore(data.score);
      if (data.upvotesCount !== undefined) setUpvotes(data.upvotesCount);
      if (data.downvotesCount !== undefined) setDownvotes(data.downvotesCount);

      showToast(data.message || `Vote recorded (1 per IP)`, 'success', 2500);
    } catch (err: any) {
      showToast(err.message || 'Error recording vote', 'error');
    } finally {
      setVoting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Primary Actions Row */}
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-5 py-2.5 rounded-xl ${config.buttonBg} text-sm font-bold flex items-center gap-2 shadow-md hover:scale-102 transition-transform`}
        >
          <span>Launch {item.title}</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        <button
          onClick={() => toggleBookmark(item)}
          className={`px-4 py-2.5 rounded-xl border text-sm font-mono font-bold flex items-center gap-2 transition-colors ${
            bookmarked
              ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300'
              : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border-slate-200 dark:border-zinc-700 hover:border-amber-500'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
          <span>{bookmarked ? 'Saved to Bookmarks' : 'Bookmark Resource'}</span>
        </button>

        <button
          onClick={handleCopy}
          className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 transition-colors"
          title="Copy URL"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>

        <button
          onClick={handleShare}
          className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 transition-colors"
          title="Share Page"
        >
          <Share2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => openReportBroken(item)}
          className="px-3 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
          <span>Report Issue</span>
        </button>
      </div>

      {/* Realtime Dynamic Community Score & IP Voting Widget */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <VoteIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                Score: {score > 0 ? `+${score}` : score}
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                ({upvotes}▲ / {downvotes}▼)
              </span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-zinc-500">
              Community rank enforced: 1 public vote per IP address
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleVote('up')}
            disabled={voting}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              userVote === 'up'
                ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-500/30'
                : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:border-emerald-500'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Upvote</span>
          </button>

          <button
            onClick={() => handleVote('down')}
            disabled={voting}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              userVote === 'down'
                ? 'bg-rose-600 text-white shadow-rose-600/30 ring-2 ring-rose-500/30'
                : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:border-rose-500'
            }`}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>Downvote</span>
          </button>
        </div>
      </div>
    </div>
  );
};
