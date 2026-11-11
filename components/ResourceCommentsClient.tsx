'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Lock,
  Globe,
  Send,
  ShieldCheck,
  Radio,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useSocket, useResourceRealtime } from '@/hooks/useSocket';
import { useToast } from '@/context/ToastContext';

interface CommentItem {
  id: string;
  resourceId: string;
  authorName: string;
  authorIp?: string;
  content: string;
  isPrivate: boolean;
  status: 'approved' | 'pending' | 'hidden';
  createdAt: string;
}

interface ResourceCommentsClientProps {
  resourceId: string;
  resourceTitle: string;
}

export const ResourceCommentsClient: React.FC<ResourceCommentsClientProps> = ({
  resourceId,
  resourceTitle,
}) => {
  const { showToast } = useToast();
  const { isConnected, latestComments } = useResourceRealtime(resourceId);

  const [activeTab, setActiveTab] = useState<'public' | 'private'>('public');
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Form State
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?resourceId=${encodeURIComponent(resourceId)}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
        setIsAdmin(Boolean(data.isAdmin));
      }
    } catch (err) {
      console.error('Failed to load comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [resourceId]);

  // When real-time comment arrives for this resource, prepend it
  useEffect(() => {
    if (latestComments.length > 0) {
      const newest = latestComments[0];
      setComments((prev) => {
        if (prev.some((c) => c.id === newest.id)) return prev;
        return [newest, ...prev];
      });
    }
  }, [latestComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    setSubmitSuccess(null);

    const isPrivate = activeTab === 'private';

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resourceId,
          authorName: authorName.trim() || 'Anonymous Contributor',
          content: content.trim(),
          isPrivate,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit comment');
      }

      setContent('');
      setSubmitSuccess(data.message);
      showToast(
        isPrivate
          ? 'Private note delivered securely to directory admins'
          : 'Comment posted to community discussion!',
        'success'
      );

      // If public or admin, add immediately to list
      if (!isPrivate || isAdmin) {
        setComments((prev) => {
          if (prev.some((c) => c.id === data.comment.id)) return prev;
          return [data.comment, ...prev];
        });
      }

      setTimeout(() => setSubmitSuccess(null), 5000);
    } catch (err: any) {
      showToast(err.message || 'Error sending comment', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const displayedComments = comments.filter((c) => {
    if (c.status !== 'approved' && !isAdmin) return false;
    if (activeTab === 'public') return !c.isPrivate;
    return c.isPrivate;
  });

  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold font-mono text-slate-900 dark:text-white">
              Discussion &amp; Feedback for {resourceTitle}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Participate in public discussion or send a private note directly to the admins.
          </p>
        </div>

        {/* Real-time sync badge */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-[11px] font-mono text-slate-600 dark:text-zinc-300 w-fit">
          <Radio className={`w-3 h-3 ${isConnected ? 'text-emerald-500 animate-pulse' : 'text-amber-500'}`} />
          <span>{isConnected ? 'Real-time Live' : 'Connecting...'}</span>
        </div>
      </div>

      {/* Tabs: Public Discussion vs Private Note */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-zinc-950 rounded-2xl w-fit border border-slate-200 dark:border-zinc-800">
        <button
          onClick={() => setActiveTab('public')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'public'
              ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Public Community Discussion</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-slate-200 dark:bg-zinc-700 font-mono">
            {comments.filter((c) => !c.isPrivate).length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('private')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'private'
              ? 'bg-white dark:bg-zinc-800 text-amber-600 dark:text-amber-400 shadow-sm'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Private Note to Admin</span>
          {isAdmin && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-500 font-mono font-bold">
              {comments.filter((c) => c.isPrivate).length} Admin
            </span>
          )}
        </button>
      </div>

      {/* Tab Context Banner */}
      {activeTab === 'private' ? (
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200/90 flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Confidential Admin Note:</span>
            <p className="text-[11px] text-amber-800 dark:text-amber-300/80 mt-0.5">
              Messages submitted in this tab are private. Only site administrators and moderators can view and review them in the admin moderation dashboard.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-900 dark:text-indigo-200/90 flex items-start gap-2.5">
          <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Open Community Forum:</span>
            <p className="text-[11px] text-indigo-800 dark:text-indigo-300/80 mt-0.5">
              Share tips, verify compatibility, and discuss mirrors. Respect directory guidelines.
            </p>
          </div>
        </div>
      )}

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-1">
            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              maxLength={40}
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="sm:col-span-2 text-right flex items-center justify-end text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
            {activeTab === 'private' ? '🔒 Marked as Private Note' : '🌐 Marked as Public Comment'}
          </div>
        </div>

        <div>
          <textarea
            rows={3}
            required
            placeholder={
              activeTab === 'private'
                ? 'Type your private note or confidential feedback to the administrators...'
                : 'Write your thoughts, experience, or update for this resource...'
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3.5 rounded-2xl text-xs sm:text-sm bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-mono">
            Markdown supported • IP logged for safety
          </span>

          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className={`px-5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-md transition-all disabled:opacity-50 ${
              activeTab === 'private'
                ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
            }`}
          >
            {submitting ? (
              'Submitting...'
            ) : (
              <>
                <span>{activeTab === 'private' ? 'Send Private Note' : 'Post Comment'}</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {submitSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{submitSuccess}</span>
          </div>
        )}
      </form>

      {/* Comments List */}
      <div className="space-y-3 pt-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          {activeTab === 'public' ? 'Community Comments' : 'Private Notes & Admin Logs'}
        </h3>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">
            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading discussions...
          </div>
        ) : displayedComments.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 dark:text-zinc-500 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl">
            {activeTab === 'public'
              ? 'No public comments yet. Be the first to share your thoughts!'
              : isAdmin
              ? 'No private notes recorded for this resource.'
              : 'Private notes are confidential and only visible to administrators.'}
          </div>
        ) : (
          <div className="space-y-3">
            {displayedComments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950/70 border border-slate-200 dark:border-zinc-800/80 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white font-bold flex items-center justify-center text-[10px]">
                      {comment.authorName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-slate-900 dark:text-zinc-100">
                      {comment.authorName}
                    </span>
                    {comment.isPrivate && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                        <Lock className="w-2.5 h-2.5" /> Private
                      </span>
                    )}
                    {isAdmin && comment.authorIp && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        (IP: {comment.authorIp})
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(comment.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <p className="text-slate-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
