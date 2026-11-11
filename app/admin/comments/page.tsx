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
  CheckSquare,
  Square,
  MinusSquare,
  Check,
} from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

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

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // ConfirmDialog state for delete
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    mode: 'single' | 'bulk';
    targetId?: string;
    targetAuthor?: string;
  }>({
    isOpen: false,
    mode: 'single',
  });

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
    setSelectedIds(new Set()); // Reset selection on filter change
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

  // Bulk selection helpers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === comments.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(comments.map((c) => c.id)));
    }
  };

  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

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

  // Open single delete dialog
  const openSingleDelete = (id: string, author: string) => {
    setDeleteConfirm({
      isOpen: true,
      mode: 'single',
      targetId: id,
      targetAuthor: author,
    });
  };

  // Open bulk delete dialog
  const openBulkDelete = () => {
    if (selectedIds.size === 0) return;
    setDeleteConfirm({
      isOpen: true,
      mode: 'bulk',
    });
  };

  // Execute deletion
  const handleConfirmDelete = async () => {
    if (deleteConfirm.mode === 'single' && deleteConfirm.targetId) {
      const id = deleteConfirm.targetId;
      try {
        setActionLoading(id);
        const res = await fetch(`/api/admin/comments/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setComments((prev) => prev.filter((c) => c.id !== id));
          setSelectedIds((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        }
      } catch (err) {
        console.error('Failed to delete comment:', err);
      } finally {
        setActionLoading(null);
        setDeleteConfirm((prev) => ({ ...prev, isOpen: false }));
      }
    } else if (deleteConfirm.mode === 'bulk') {
      const ids = Array.from(selectedIds);
      try {
        setActionLoading('bulk');
        const res = await fetch('/api/admin/comments/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete', ids }),
        });
        if (res.ok) {
          setComments((prev) => prev.filter((c) => !selectedIds.has(c.id)));
          setSelectedIds(new Set());
        }
      } catch (err) {
        console.error('Failed bulk delete comments:', err);
      } finally {
        setActionLoading(null);
        setDeleteConfirm((prev) => ({ ...prev, isOpen: false }));
      }
    }
  };

  // Bulk Status Update
  const handleBulkStatus = async (status: 'approved' | 'hidden') => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    try {
      setActionLoading('bulk');
      const res = await fetch('/api/admin/comments/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: status === 'approved' ? 'approve' : 'hide', ids }),
      });
      if (res.ok) {
        setComments((prev) =>
          prev.map((c) => (selectedIds.has(c.id) ? { ...c, status } : c))
        );
        setSelectedIds(new Set());
      }
    } catch (err) {
      console.error('Failed bulk status update:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const isAllSelected = comments.length > 0 && selectedIds.size === comments.length;
  const isPartiallySelected = selectedIds.size > 0 && selectedIds.size < comments.length;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl font-bold tracking-tight text-white">Comments &amp; Feedback Moderation</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Manage public community discussions and private team feedback notes.
          </p>
        </div>

        <button
          onClick={fetchComments}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors w-fit cursor-pointer"
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
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filter === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {comments.length > 0 && (
            <button
              type="button"
              onClick={handleSelectAll}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                isAllSelected
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isAllSelected ? (
                <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
              ) : isPartiallySelected ? (
                <MinusSquare className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Square className="w-3.5 h-3.5" />
              )}
              <span>{isAllSelected ? 'Deselect All' : 'Select All'}</span>
            </button>
          )}

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
            {comments.map((comment) => {
              const isSelected = selectedIds.has(comment.id);
              return (
                <div
                  key={comment.id}
                  className={`p-5 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4 ${
                    isSelected ? 'bg-amber-500/10 hover:bg-amber-500/15' : 'hover:bg-slate-850/50'
                  }`}
                >
                  {/* Select Checkbox + Details */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => handleToggleSelect(comment.id)}
                      className={`mt-1 p-1 rounded-lg border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold'
                          : 'border-slate-700 hover:border-slate-500 text-transparent hover:text-slate-600 bg-slate-950/40'
                      }`}
                      aria-label="Toggle selection"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>

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
                        <span className="text-[11px] text-slate-600 font-mono">&bull;</span>
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
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                    {/* Toggle Status */}
                    {comment.status === 'approved' ? (
                      <button
                        onClick={() => handleUpdateStatus(comment.id, 'hidden')}
                        disabled={actionLoading === comment.id}
                        title="Hide from public"
                        className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(comment.id, 'approved')}
                        disabled={actionLoading === comment.id}
                        title="Approve comment"
                        className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}

                    {/* Toggle Privacy */}
                    <button
                      onClick={() => handleTogglePrivacy(comment.id, comment.isPrivate)}
                      disabled={actionLoading === comment.id}
                      title={comment.isPrivate ? 'Switch to Public' : 'Switch to Private'}
                      className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => openSingleDelete(comment.id, comment.authorName)}
                      disabled={actionLoading === comment.id}
                      title="Delete permanently"
                      className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Sticky Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-md rounded-2xl px-5 py-3.5 flex items-center gap-4 text-xs animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2 pr-3 border-r border-slate-700">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span className="font-bold text-white">
              {selectedIds.size} <span className="font-normal text-slate-300">selected</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatus('approved')}
              disabled={actionLoading === 'bulk'}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/30 transition-all disabled:opacity-50 cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Bulk Approve</span>
            </button>

            <button
              onClick={() => handleBulkStatus('hidden')}
              disabled={actionLoading === 'bulk'}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold shadow-md shadow-amber-600/30 transition-all disabled:opacity-50 cursor-pointer"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Bulk Hide</span>
            </button>

            <button
              onClick={openBulkDelete}
              disabled={actionLoading === 'bulk'}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-md shadow-rose-600/30 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bulk Delete ({selectedIds.size})</span>
            </button>

            <button
              onClick={handleClearSelection}
              disabled={actionLoading === 'bulk'}
              className="px-3 py-2 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Styled Delete ConfirmDialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={handleConfirmDelete}
        title={deleteConfirm.mode === 'single' ? 'Permanently Delete Comment' : 'Bulk Delete Comments'}
        description={
          deleteConfirm.mode === 'single'
            ? 'This comment will be permanently removed from discussion threads and database logs.'
            : `Are you sure you want to permanently delete all ${selectedIds.size} selected comments?`
        }
        itemTitle={deleteConfirm.targetAuthor ? `Comment by: ${deleteConfirm.targetAuthor}` : undefined}
        confirmText="Confirm Delete"
        cancelText="Cancel"
        type="danger"
        isLoading={actionLoading === (deleteConfirm.targetId || 'bulk')}
      />
    </div>
  );
}
