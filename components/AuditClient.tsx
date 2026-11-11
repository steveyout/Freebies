'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getLinkHealthMap, 
  getBrokenReports, 
  resetLinkHealth, 
  checkLinkHealthAsync,
  LinkHealthRecord,
  ReportBrokenPayload 
} from '@/utils/linkHealth';
import { getAllResources } from '@/lib/data';
import { useToast } from '@/context/ToastContext';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck,
  Clock,
  ArrowRight
} from 'lucide-react';

export const AuditClient: React.FC = () => {
  const { showToast } = useToast();
  const [reports, setReports] = useState<ReportBrokenPayload[]>([]);
  const [healthMap, setHealthMap] = useState<Record<string, LinkHealthRecord>>({});
  const [checkingId, setCheckingId] = useState<string | null>(null);

  useEffect(() => {
    setReports(getBrokenReports());
    setHealthMap(getLinkHealthMap());

    const handleUpdate = () => {
      setReports(getBrokenReports());
      setHealthMap(getLinkHealthMap());
    };

    window.addEventListener('freebies-link-health-updated', handleUpdate);
    return () => window.removeEventListener('freebies-link-health-updated', handleUpdate);
  }, []);

  const allResources = getAllResources();
  const brokenRecords = Object.entries(healthMap).filter(([_, rec]) => rec.status === 'broken' || rec.reportsCount > 0);
  const degradedRecords = Object.entries(healthMap).filter(([_, rec]) => rec.status === 'degraded');

  const handleRecheck = async (id: string, url: string, title: string) => {
    setCheckingId(id);
    showToast(`Pinging ${title}...`, 'info');
    const updated = await checkLinkHealthAsync({ id, url, title } as any);
    setCheckingId(null);
    if (updated.status === 'online') {
      showToast(`${title} is Online! Latency: ${updated.latencyMs}ms`, 'success');
    } else {
      showToast(`${title} status: ${updated.status}`, 'warning');
    }
  };

  const handleClearReport = (id: string) => {
    resetLinkHealth(id);
    showToast('Report cleared and status reset to healthy.', 'info');
  };

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Audit Coverage</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {allResources.length}
          </div>
          <p className="text-[11px] text-slate-500">Indexed resources continuously monitored</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Reported Broken</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400">
            {brokenRecords.length}
          </div>
          <p className="text-[11px] text-slate-500">Domains flagged for rotation or repair</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Overall Health Index</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {Math.round(((allResources.length - brokenRecords.length) / allResources.length) * 100)}%
          </div>
          <p className="text-[11px] text-slate-500">High operational integrity</p>
        </div>
      </div>

      {/* Flagged Links Section */}
      <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-mono text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <span>Community Flagged &amp; Degraded Entries</span>
          </h2>
          <span className="text-xs font-mono text-slate-500">
            Realtime Audit Log
          </span>
        </div>

        {brokenRecords.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 text-xs font-mono text-emerald-800 dark:text-emerald-300">
            All directory resources are currently responding normally with zero active community flags!
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-zinc-800">
            {brokenRecords.map(([id, rec]) => {
              const matchedItem = allResources.find((r) => r.id === id);
              const title = matchedItem ? matchedItem.title : id;
              const url = matchedItem ? matchedItem.url : '';

              return (
                <div key={id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {title}
                      </span>
                      <span className="text-[10px] font-mono bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 px-2 py-0.5 rounded font-bold">
                        {rec.status.toUpperCase()} ({rec.reportsCount} flags)
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      Reason: {rec.reason || 'Offline or DNS failure'} • Last checked: {new Date(rec.lastChecked).toLocaleTimeString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {url && (
                      <button
                        onClick={() => handleRecheck(id, url, title)}
                        disabled={checkingId === id}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${checkingId === id ? 'animate-spin' : ''}`} />
                        <span>Recheck Ping</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleClearReport(id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-200 dark:border-emerald-800 transition-colors"
                    >
                      Mark Resolved
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
