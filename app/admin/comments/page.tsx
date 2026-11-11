'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Lock,
  Globe,
  CheckCircle,
  EyeOff,
  Trash2,
  RefreshCw,
  Search,
  ArrowRightLeft,
  ExternalLink,
} from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';

interface CommentItem {
  id: string;
  resourceId: string;
  authorName: string;
  authorIp?: string;
  content: string;
  isPrivate: boolean;
  status: 'approved' | 'pending' | 'hidden';
  createdAt: string;
  resource?: {
    id: string;
    title: string;
    category: string;
  };
}

export default function AdminCommentsPage() {
  const { socket } = useSocket();
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'public' | 'private' | 'pending'>('all');
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.set('filter', filter);
      if (search.trim()) params.set('search', search.trim());

      const res = await fetch(`/api/admin/comments?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments || []);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [filter, search]);

  // Real-time updates via Socket.IO
  useEffect(() => {
    if (!socket) return;

    const handleNewComment = () => fetchComments();
    const handleCommentModerated = () => fetchComments();
    const handleCommentDeleted = () => fetchComments();

    socket.on('new_comment', handleNewComment);
    socket.on('comment_moderated', handleCommentModerated);
    socket.on('comment_deleted', handleCommentDeleted);

    return () => {
      socket.off('new_comment', handleNewComment);
      socket.off('comment_moderated', handleCommentModerated);
      socket.off('comment_deleted', handleCommentDeleted);
    };
  }, [socket]);

  const handleUpdateStatus = async (id: string, newStatus: 'approved' | 'hidden') => {
    try {
      setActionLoading(id);
      const res = await fetch(`/api/admin/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchComments();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleTogglePrivacy = async (id: string, currentIsPrivate: boolean) => {
    try {
      setActionLoading(id);
      const res = await fetch(`/api/admin/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPrivate: !currentIsPrivate }),
      });
      if (res.ok) {
        fetchComments();
      }
    } catch (err) {
      console.error('Failed to toggle privacy:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this comment?')) return;

    try {
      setActionLoading(id);
      const res = await fetch(`/api/admin/comments/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setComments(prev => prev.filter(c => c.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete comment:', err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl font-bold tracking-tight text-white">Comments & Feedback Moderation</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Manage public community discussions and private team feedback notes.
          </p>
        </div>

        <button
          onClick={fetchComments}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors w-fit"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh List
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {[
            { id: 'all', label: 'All Entries' },
            { id: 'public', label: 'Public Only' },
            { id: 'private', label: 'Private Notes' },
            { id: 'pending', label: 'Pending Review' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filter === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search content, author, IP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Comments List Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            <div className="w-7 h-7 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading moderation list...
          </div>
        ) : comments.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            No comments match the selected filter.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-5 hover:bg-slate-850/50 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm text-slate-200">
                      {comment.authorName}
                    </span>

                    {/* Privacy Badge */}
                    {comment.isPrivate ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/80">
                        <Lock className="w-3 h-3" /> Private Note
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                        <Globe className="w-3 h-3" /> Public Discussion
                      </span>
                    )}

                    {/* Status Badge */}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        comment.status === 'approved'
                          ? 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                          : comment.status === 'hidden'
                          ? 'bg-rose-950 text-rose-400 border border-rose-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {comment.status}
                    </span>

                    <span className="text-[11px] text-slate-500 font-mono">
                      IP: {comment.authorIp || 'N/A'}
                    </span>
                    <span className="text-[11px] text-slate-600 font-mono">•</span>
                    <span className="text-[11px] text-slate-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {comment.content}
                  </p>

                  <div className="flex items-center gap-2 pt-1 text-xs text-indigo-400">
                    <span className="text-slate-500 text-[11px]">Target Resource:</span>
                    <Link
                      href={`/resource/${comment.resourceId}`}
                      target="_blank"
                      className="hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      {comment.resource?.title || comment.resourceId}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                  {/* Toggle Status */}
                  {comment.status === 'approved' ? (
                    <button
                      onClick={() => handleUpdateStatus(comment.id, 'hidden')}
                      disabled={actionLoading === comment.id}
                      title="Hide from public"
                      className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <EyeOff className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(comment.id, 'approved')}
                      disabled={actionLoading === comment.id}
                      title="Approve comment"
                      className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  )}

                  {/* Toggle Privacy */}
                  <button
                    onClick={() => handleTogglePrivacy(comment.id, comment.isPrivate)}
                    disabled={actionLoading === comment.id}
                    title={comment.isPrivate ? 'Switch to Public' : 'Switch to Private'}
                    className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1 text-xs font-medium"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(comment.id)}
                    disabled={actionLoading === comment.id}
                    title="Delete permanently"
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
