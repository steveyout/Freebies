'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Database,
  Inbox,
  MessageSquare,
  Vote,
  ShieldCheck,
  TrendingUp,
  Lock,
  Globe,
  RefreshCw,
  ArrowUpRight,
  Sparkles,
  Layers,
  GitPullRequest,
} from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';

interface AdminStats {
  metrics: {
    totalResources: number;
    totalUsers: number;
    publicCommentsCount: number;
    privateCommentsCount: number;
    totalComments: number;
    publicVotesCount: number;
    privateVotesCount: number;
    totalVotes: number;
    pendingSubmissionsCount?: number;
    totalSubmissionsCount?: number;
  };
  recentAuditLogs: Array<{
    id: string;
    adminUsername: string;
    action: string;
    targetType: string;
    targetId?: string;
    details?: string;
    createdAt: string;
  }>;
  topResources: Array<{
    id: string;
    title: string;
    category: string;
    score: number;
    upvotesCount: number;
    downvotesCount: number;
  }>;
  adminUser: {
    username: string;
    email: string;
    role: string;
  };
}

export default function AdminDashboardPage() {
  const { socket, isConnected } = useSocket();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      setRefreshing(true);
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch admin stats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Real-time updates via Socket.IO
  useEffect(() => {
    if (!socket) return;

    const handleUpdate = () => {
      fetchStats();
    };

    socket.on('vote_updated', handleUpdate);
    socket.on('new_comment', handleUpdate);
    socket.on('comment_moderated', handleUpdate);
    socket.on('resource_updated', handleUpdate);
    socket.on('new_submission', handleUpdate);
    socket.on('submission_approved', handleUpdate);
    socket.on('submission_rejected', handleUpdate);

    return () => {
      socket.off('vote_updated', handleUpdate);
      socket.off('new_comment', handleUpdate);
      socket.off('comment_moderated', handleUpdate);
      socket.off('resource_updated', handleUpdate);
      socket.off('new_submission', handleUpdate);
      socket.off('submission_approved', handleUpdate);
      socket.off('submission_rejected', handleUpdate);
    };
  }, [socket]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-3 text-sm">Loading admin dashboard analytics...</p>
      </div>
    );
  }

  const metrics = stats?.metrics;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">System Overview</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Sync
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Realtime metrics for MySQL / SQLite database, IP-restricted votes, and hybrid submissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link
            href="/admin/submissions"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30 transition-all"
          >
            <Inbox className="w-3.5 h-3.5" />
            Review Queue ({metrics?.pendingSubmissionsCount ?? 0})
          </Link>
          <Link
            href="/admin/resources"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Database className="w-3.5 h-3.5" />
            Manage Resources
          </Link>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pending Submissions Queue */}
        <Link
          href="/admin/submissions"
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 shadow-sm relative overflow-hidden transition-all group block"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hybrid Queue</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{metrics?.pendingSubmissionsCount ?? 0}</span>
            <span className="text-xs text-amber-400 font-medium">pending approval</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>UI + GitHub PRs</span>
            <span className="text-amber-400 text-[11px] group-hover:underline">Review &rarr;</span>
          </p>
        </Link>

        {/* Total Resources */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Resources</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{metrics?.totalResources ?? 0}</span>
            <span className="text-xs text-indigo-400 font-medium">in DB</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Live published resources</p>
        </div>

        {/* Public & Private Comments */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Comments & Notes</span>
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{metrics?.totalComments ?? 0}</span>
            <span className="text-xs text-violet-400 font-medium">total entries</span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <Globe className="w-3 h-3" /> {metrics?.publicCommentsCount ?? 0} Public
            </span>
            <span className="inline-flex items-center gap-1 text-amber-400">
              <Lock className="w-3 h-3" /> {metrics?.privateCommentsCount ?? 0} Private
            </span>
          </div>
        </div>

        {/* IP Votes Count */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Community Votes</span>
            <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <Vote className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{metrics?.publicVotesCount ?? 0}</span>
            <span className="text-xs text-pink-400 font-medium">public IP votes</span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
            <span>Limit: 1/IP/item</span>
            <span className="text-slate-400 font-mono">+{metrics?.privateVotesCount ?? 0} private</span>
          </div>
        </div>
      </div>

      {/* Dynamic Ranking & Audit Log Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Dynamically Ranked Resources */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Dynamic Community Ranking</h2>
            </div>
            <Link
              href="/admin/resources"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Rankings reflect real-time community upvotes minus downvotes with strict IP limit enforcement.
          </p>

          <div className="space-y-3">
            {stats?.topResources && stats.topResources.length > 0 ? (
              stats.topResources.map((res, idx) => (
                <div
                  key={res.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 text-center font-mono text-xs font-bold text-indigo-400">
                      #{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-200 truncate">{res.title}</p>
                      <span className="text-[11px] text-slate-500">{res.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="font-mono text-sm font-bold text-emerald-400">
                        {res.score >= 0 ? `+${res.score}` : res.score}
                      </span>
                      <p className="text-[10px] text-slate-500">
                        {res.upvotesCount}▲ / {res.downvotesCount}▼
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-4 text-center">No resources found</p>
            )}
          </div>
        </div>

        {/* Audit Log Feed */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-violet-400" />
              <h2 className="text-base font-bold text-white">System & Admin Audit Log</h2>
            </div>
            <span className="text-xs font-mono text-slate-500">Recent 10 entries</span>
          </div>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {stats?.recentAuditLogs && stats.recentAuditLogs.length > 0 ? (
              stats.recentAuditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/60 text-xs"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-indigo-300">{log.action}</span>
                    <span className="text-slate-500 font-mono">
                      {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-300 mt-1 text-xs truncate">{log.details || 'No details provided'}</p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    By <span className="font-medium text-slate-400">{log.adminUsername}</span> • Type: {log.targetType}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 py-4 text-center">No recent audit logs</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
