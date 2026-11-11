'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Vote,
  ShieldAlert,
  RotateCcw,
  RefreshCw,
  Search,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Lock,
  Globe,
  Network,
} from 'lucide-react';
import { useSocket } from '@/hooks/useSocket';

interface VoteItem {
  id: string;
  resourceId: string;
  ipAddress: string;
  voteType: 'up' | 'down';
  isPrivate: boolean;
  createdAt: string;
  resource?: {
    id: string;
    title: string;
    category: string;
    score: number;
  };
}

interface IpSummary {
  ip: string;
  publicVotes: number;
  privateVotes: number;
  lastVoted: string;
}

export default function AdminVotesPage() {
  const { socket } = useSocket();
  const [votes, setVotes] = useState<VoteItem[]>([]);
  const [ipAuditSummary, setIpAuditSummary] = useState<IpSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [resettingIp, setResettingIp] = useState<string | null>(null);

  const fetchVotes = async () => {
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set('ip', search.trim());

      const res = await fetch(`/api/admin/votes?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setVotes(data.votes || []);
        setIpAuditSummary(data.ipAuditSummary || []);
      }
    } catch (err) {
      console.error('Failed to fetch votes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, [search]);

  // Real-time updates via Socket.IO
  useEffect(() => {
    if (!socket) return;

    const handleVoteUpdated = () => fetchVotes();
    socket.on('vote_updated', handleVoteUpdated);

    return () => {
      socket.off('vote_updated', handleVoteUpdated);
    };
  }, [socket]);

  const handleResetIp = async (ipAddress: string) => {
    if (!window.confirm(`Are you sure you want to reset all votes recorded from IP ${ipAddress}? This will re-calculate scores dynamically.`)) {
      return;
    }

    try {
      setResettingIp(ipAddress);
      const res = await fetch('/api/admin/votes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ipAddress }),
      });
      if (res.ok) {
        fetchVotes();
      }
    } catch (err) {
      console.error('Failed to reset IP:', err);
    } finally {
      setResettingIp(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Vote className="w-6 h-6 text-pink-400" />
            <h1 className="text-2xl font-bold tracking-tight text-white">IP Vote Enforcement & Dynamic Ranking</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Enforces strict 1-vote-per-IP limit for public community votes, dynamically re-ranking resources in real time.
          </p>
        </div>

        <button
          onClick={fetchVotes}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors w-fit"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Audit
        </button>
      </div>

      {/* Info Notice */}
      <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/50 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-200/90 leading-relaxed">
          <p className="font-semibold text-indigo-300">Sybil & Abuse Prevention Engine</p>
          <p className="mt-0.5 text-indigo-200/70">
            Public community votes are restricted to <strong className="text-white">1 vote per IP address per resource</strong>. Clicking the same vote button retracts it; changing up/down flips the vote without duplicating counts. Private votes allow personal ratings without affecting public ranking.
          </p>
        </div>
      </div>

      {/* IP Audit Summary Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              IP Audit Overview ({ipAuditSummary.length} Unique IPs)
            </h2>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Client IP Address</th>
                  <th className="py-3 px-4">Public Community Votes</th>
                  <th className="py-3 px-4">Private Votes</th>
                  <th className="py-3 px-4">Last Activity</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {ipAuditSummary.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No IP vote records found.
                    </td>
                  </tr>
                ) : (
                  ipAuditSummary.map((item) => (
                    <tr key={item.ip} className="hover:bg-slate-850/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-200">
                        {item.ip}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          <Globe className="w-3 h-3" /> {item.publicVotes}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950 text-amber-300 border border-amber-800">
                          <Lock className="w-3 h-3" /> {item.privateVotes}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {new Date(item.lastVoted).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleResetIp(item.ip)}
                          disabled={resettingIp === item.ip}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-950/60 hover:bg-rose-900 border border-rose-800/80 text-rose-300 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                        >
                          <RotateCcw className={`w-3 h-3 ${resettingIp === item.ip ? 'animate-spin' : ''}`} />
                          Reset IP
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detailed Votes Stream */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Live Votes Log ({votes.length} Entries)
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by IP address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="divide-y divide-slate-800/70 max-h-[460px] overflow-y-auto">
            {votes.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                No individual votes match query.
              </div>
            ) : (
              votes.map((v) => (
                <div
                  key={v.id}
                  className="p-4 hover:bg-slate-850/50 transition-colors flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        v.voteType === 'up'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {v.voteType === 'up' ? <ThumbsUp className="w-4 h-4" /> : <ThumbsDown className="w-4 h-4" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-slate-200">{v.ipAddress}</span>
                        {v.isPrivate ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                            Private
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                            Public IP-Limited
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/resource/${v.resourceId}`}
                        target="_blank"
                        className="text-indigo-400 hover:underline flex items-center gap-1 font-mono text-[11px] mt-0.5"
                      >
                        {v.resource?.title || v.resourceId}
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-500 font-mono shrink-0">
                    {new Date(v.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
