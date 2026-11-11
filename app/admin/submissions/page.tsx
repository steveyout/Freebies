'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Inbox,
  CheckCircle2,
  XCircle,
  ExternalLink,
  GitPullRequest,
  Sparkles,
  Search,
  RefreshCw,
  Clock,
  Send,
  AlertCircle,
  Check,
  ShieldCheck,
  Globe,
  Tag,
} from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';

interface SubmissionItem {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  submissionType: 'ui' | 'github_pr';
  submitterName: string;
  submitterEmail?: string;
  submitterIp?: string;
  githubPrUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

export default function AdminSubmissionsPage() {
  const { socket } = useSocket();
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [typeFilter, setTypeFilter] = useState<'all' | 'ui' | 'github_pr'>('all');
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; message: string; type: 'success' | 'error' } | null>(null);

  const fetchSubmissions = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (typeFilter !== 'all') params.set('type', typeFilter);
      if (search.trim()) params.set('search', search.trim());

      const res = await fetch(`/api/admin/submissions?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
        if (data.counts) setCounts(data.counts);
      }
    } catch (err) {
      console.error('Failed to load submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter, typeFilter, search]);

  // Real-time updates via Socket.IO
  useEffect(() => {
    if (!socket) return;

    const handleNewSubmission = () => fetchSubmissions();
    const handleApproved = () => fetchSubmissions();
    const handleRejected = () => fetchSubmissions();

    socket.on('new_submission', handleNewSubmission);
    socket.on('submission_approved', handleApproved);
    socket.on('submission_rejected', handleRejected);

    return () => {
      socket.off('new_submission', handleNewSubmission);
      socket.off('submission_approved', handleApproved);
      socket.off('submission_rejected', handleRejected);
    };
  }, [socket]);

  const handleApprove = async (id: string, title: string) => {
    try {
      setActionLoading(id);
      const res = await fetch(`/api/admin/submissions/${id}/approve`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ id, message: `Approved and published "${title}" to directory!`, type: 'success' });
        fetchSubmissions();
      } else {
        setFeedback({ id, message: data.error || 'Failed to approve', type: 'error' });
      }
    } catch (err: any) {
      setFeedback({ id, message: err.message || 'Error approving', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string, title: string) => {
    const reason = window.prompt(`Reason for rejecting "${title}" (optional):`);
    if (reason === null) return; // User pressed cancel

    try {
      setActionLoading(id);
      const res = await fetch(`/api/admin/submissions/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ id, message: `Rejected "${title}".`, type: 'success' });
        fetchSubmissions();
      } else {
        setFeedback({ id, message: data.error || 'Failed to reject', type: 'error' });
      }
    } catch (err: any) {
      setFeedback({ id, message: err.message || 'Error rejecting', type: 'error' });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-white">Hybrid Submissions Queue</h1>
                {counts.pending > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                    {counts.pending} Pending Review
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-400 mt-0.5">
                Review and approve resources submitted either directly via the web UI or through GitHub Pull Requests.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={fetchSubmissions}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors w-fit"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Queue
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {[
            { id: 'pending', label: `Pending (${counts.pending})` },
            { id: 'approved', label: `Approved (${counts.approved})` },
            { id: 'rejected', label: `Rejected (${counts.rejected})` },
            { id: 'all', label: `All (${counts.total})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Type filter */}
        <div className="flex items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Sources</option>
            <option value="ui">⚡ Direct UI</option>
            <option value="github_pr">🐙 GitHub PR</option>
          </select>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search title, URL, submitter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm bg-slate-900/60 rounded-2xl border border-slate-800">
            <div className="w-7 h-7 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading submissions...
          </div>
        ) : submissions.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
            No submissions match the current filter.
          </div>
        ) : (
          submissions.map((sub) => (
            <div
              key={sub.id}
              className={`p-5 rounded-2xl bg-slate-900/90 border transition-all ${
                sub.status === 'pending'
                  ? 'border-amber-500/40 hover:border-amber-500/70 shadow-lg shadow-amber-500/5'
                  : sub.status === 'approved'
                  ? 'border-emerald-500/30 hover:border-emerald-500/50'
                  : 'border-slate-800 opacity-70'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Content details */}
                <div className="space-y-2.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Submission Type Badge */}
                    {sub.submissionType === 'github_pr' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-950/80 text-violet-300 border border-violet-800">
                        <GitPullRequest className="w-3.5 h-3.5 text-violet-400" />
                        GitHub Pull Request
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800">
                        <Send className="w-3.5 h-3.5 text-blue-400" />
                        Direct UI Submission
                      </span>
                    )}

                    {/* Status Badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        sub.status === 'pending'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : sub.status === 'approved'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {sub.status}
                    </span>

                    <span className="text-xs text-slate-400 font-medium">
                      Category: <span className="text-slate-200 font-semibold">{sub.category}</span>
                      {sub.subcategory && <span className="text-slate-500 font-mono"> / {sub.subcategory}</span>}
                    </span>

                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(sub.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Title & Link */}
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>{sub.title}</span>
                      <a
                        href={sub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-xs font-mono font-normal hover:underline"
                        title="Open Resource URL"
                      >
                        <span>{sub.url}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>

                  {/* GitHub PR URL if present */}
                  {sub.githubPrUrl && (
                    <div className="p-2.5 rounded-xl bg-violet-950/40 border border-violet-800/60 flex items-center justify-between text-xs text-violet-300">
                      <div className="flex items-center gap-2">
                        <GitPullRequest className="w-4 h-4 text-violet-400 shrink-0" />
                        <span>Registered GitHub Pull Request URL:</span>
                        <a
                          href={sub.githubPrUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono underline text-violet-200 hover:text-white"
                        >
                          {sub.githubPrUrl}
                        </a>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-violet-400" />
                    </div>
                  )}

                  {/* Submitter & IP details */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 font-mono">
                    <span>
                      Submitted by: <strong className="text-slate-300">{sub.submitterName}</strong>
                      {sub.submitterEmail ? ` (${sub.submitterEmail})` : ''}
                    </span>
                    <span>•</span>
                    <span>IP: {sub.submitterIp || 'N/A'}</span>
                    {sub.notes && (
                      <>
                        <span>•</span>
                        <span className="text-amber-300">Note: {sub.notes}</span>
                      </>
                    )}
                    {sub.reviewedBy && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-400">
                          Reviewed by {sub.reviewedBy} at {new Date(sub.reviewedAt!).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                  <a
                    href={sub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Test Link before approving"
                  >
                    <span>Test Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {sub.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(sub.id, sub.title)}
                        disabled={actionLoading === sub.id}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" />
                        <span>{actionLoading === sub.id ? 'Publishing...' : 'Approve & Publish'}</span>
                      </button>

                      <button
                        onClick={() => handleReject(sub.id, sub.title)}
                        disabled={actionLoading === sub.id}
                        className="px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/80 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {feedback && feedback.id === sub.id && (
                <div
                  className={`mt-3 p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                      : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedback.message}</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
