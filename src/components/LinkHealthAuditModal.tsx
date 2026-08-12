import React, { useState, useEffect } from 'react';
import { Category, LinkItem } from '../types/fmhy';
import { 
  getLinkHealthMap, 
  getBrokenReports, 
  checkLinkHealthAsync, 
  resetLinkHealth, 
  LinkHealthRecord, 
  ReportBrokenPayload 
} from '../utils/linkHealth';
import { 
  Activity, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ExternalLink, 
  RotateCcw, 
  Search,
  CheckCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface LinkHealthAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

export const LinkHealthAuditModal: React.FC<LinkHealthAuditModalProps> = ({
  isOpen,
  onClose,
  categories,
}) => {
  const { config } = useTheme();
  const [healthMap, setHealthMap] = useState<Record<string, LinkHealthRecord>>(() => getLinkHealthMap());
  const [reports, setReports] = useState<ReportBrokenPayload[]>(() => getBrokenReports());
  const [filterTab, setFilterTab] = useState<'all' | 'broken' | 'degraded' | 'reports'>('broken');
  const [isBatchChecking, setIsBatchChecking] = useState(false);
  const [progressCount, setProgressCount] = useState(0);

  // Flatten all items
  const allItems: LinkItem[] = React.useMemo(() => {
    return categories.flatMap((c) => c.subcategories.flatMap((s) => s.items));
  }, [categories]);

  const refreshState = () => {
    setHealthMap(getLinkHealthMap());
    setReports(getBrokenReports());
  };

  useEffect(() => {
    if (isOpen) {
      refreshState();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => refreshState();
    window.addEventListener('freebies-link-health-updated', handleUpdate);
    return () => window.removeEventListener('freebies-link-health-updated', handleUpdate);
  }, []);

  // Compute Statistics
  const stats = React.useMemo(() => {
    let brokenCount = 0;
    let degradedCount = 0;
    let onlineCount = 0;

    allItems.forEach((item) => {
      const rec = healthMap[item.id];
      if (rec?.status === 'broken') brokenCount++;
      else if (rec?.status === 'degraded') degradedCount++;
      else onlineCount++;
    });

    return {
      total: allItems.length,
      brokenCount,
      degradedCount,
      onlineCount,
      reportsCount: reports.length,
      healthScore: allItems.length > 0 
        ? Math.round(((onlineCount + degradedCount * 0.5) / allItems.length) * 100)
        : 100,
    };
  }, [allItems, healthMap, reports]);

  const handleSingleCheck = async (item: LinkItem) => {
    await checkLinkHealthAsync(item);
    refreshState();
  };

  const handleBatchCheck = async () => {
    setIsBatchChecking(true);
    setProgressCount(0);

    // Run ping on up to 15 items sequentially/in batches
    const sampleItems = allItems.slice(0, 15);
    for (let i = 0; i < sampleItems.length; i++) {
      await checkLinkHealthAsync(sampleItems[i]);
      setProgressCount(i + 1);
    }

    setIsBatchChecking(false);
    refreshState();
  };

  const handleResetRecord = (itemId: string) => {
    resetLinkHealth(itemId);
    refreshState();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-zinc-950/80 backdrop-blur-md">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transition-colors"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${config.bgActive} ${config.textAccent} border ${config.borderActive}`}>
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-zinc-100 font-mono flex items-center gap-2">
                  <span>Directory Link Health & Audit</span>
                  <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800/80 font-bold">
                    {stats.healthScore}% Healthy
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Automated connectivity checks & community report review queue.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="p-4 bg-slate-100/60 dark:bg-zinc-950/50 border-b border-slate-200 dark:border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 block">Total Scanned</span>
              <span className="text-base font-bold text-slate-800 dark:text-zinc-200">{stats.total} links</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-rose-200 dark:border-rose-900/50">
              <span className="text-[10px] text-rose-600 dark:text-rose-400 block">Broken / Flagged</span>
              <span className="text-base font-bold text-rose-600 dark:text-rose-400">{stats.brokenCount} items</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-900/50">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 block">Degraded / Slow</span>
              <span className="text-base font-bold text-amber-600 dark:text-amber-400">{stats.degradedCount} items</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-900/50">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">Community Flags</span>
              <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">{stats.reportsCount} logs</span>
            </div>
          </div>

          {/* Controls & Filter Tabs */}
          <div className="p-3 border-b border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-zinc-900">
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <button
                onClick={() => setFilterTab('broken')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  filterTab === 'broken'
                    ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                }`}
              >
                Broken ({stats.brokenCount})
              </button>

              <button
                onClick={() => setFilterTab('degraded')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  filterTab === 'degraded'
                    ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                }`}
              >
                Degraded ({stats.degradedCount})
              </button>

              <button
                onClick={() => setFilterTab('reports')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  filterTab === 'reports'
                    ? `${config.bgActive} ${config.textAccent} border ${config.borderActive}`
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                }`}
              >
                User Reports Log ({reports.length})
              </button>
            </div>

            <button
              onClick={handleBatchCheck}
              disabled={isBatchChecking}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-white ${config.buttonBg} transition-all flex items-center justify-center gap-1.5 disabled:opacity-50`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isBatchChecking ? 'animate-spin' : ''}`} />
              <span>{isBatchChecking ? `Testing (${progressCount}/15)...` : 'Run Health Audit'}</span>
            </button>
          </div>

          {/* List Content */}
          <div className="p-4 overflow-y-auto space-y-3 font-sans flex-1">
            {filterTab === 'reports' ? (
              reports.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-zinc-500 font-mono text-xs">
                  <CheckCheck className="w-8 h-8 mx-auto mb-2 opacity-40 text-emerald-500" />
                  <p>No community flags reported yet!</p>
                </div>
              ) : (
                reports.map((rep, idx) => (
                  <div
                    key={rep.itemId + idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900 dark:text-zinc-100 font-mono">
                          {rep.itemTitle}
                        </span>
                        <span className="text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 px-1.5 py-0.5 rounded font-mono font-bold">
                          {rep.reason}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-zinc-400 font-mono text-[11px]">
                        Note: {rep.notes || 'No extra notes'}
                      </p>
                      <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono block mt-1">
                        Reported by: @{rep.reporter || 'Anonymous'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleResetRecord(rep.itemId)}
                      className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-[11px] font-mono flex items-center gap-1"
                      title="Clear flag & mark operational"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Resolve</span>
                    </button>
                  </div>
                ))
              )
            ) : (
              (() => {
                const filtered = allItems.filter((item) => {
                  const rec = healthMap[item.id];
                  if (filterTab === 'broken') return rec?.status === 'broken';
                  if (filterTab === 'degraded') return rec?.status === 'degraded';
                  return true;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="text-center py-12 text-slate-500 dark:text-zinc-500 font-mono text-xs">
                      <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-40 text-emerald-500" />
                      <p>All items in this category are online and healthy!</p>
                    </div>
                  );
                }

                return filtered.map((item) => {
                  const rec = healthMap[item.id] || { status: 'online', reportsCount: 0 };
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-900 dark:text-zinc-100 font-mono truncate">
                            {item.title}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                              rec.status === 'broken'
                                ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                                : rec.status === 'degraded'
                                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                                : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                            }`}
                          >
                            {rec.status.toUpperCase()}
                          </span>
                        </div>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-mono truncate"
                        >
                          <span className="truncate">{item.url}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>

                        <p className="text-slate-500 dark:text-zinc-400 font-mono text-[10px] mt-1">
                          Reason: {('reason' in rec && rec.reason) || 'Verified'} • {rec.reportsCount} community reports
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleSingleCheck(item)}
                          disabled={rec.status === 'checking'}
                          className="p-1.5 rounded-lg bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors"
                          title="Ping Test Now"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${rec.status === 'checking' ? 'animate-spin' : ''}`} />
                        </button>

                        <button
                          onClick={() => handleResetRecord(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-[11px] font-mono flex items-center gap-1"
                          title="Reset to Online"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Resolve</span>
                        </button>
                      </div>
                    </div>
                  );
                });
              })()
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-3 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-[11px] text-slate-500 dark:text-zinc-400 flex items-center justify-between font-mono">
            <span>FreebiesHub Automated Health Engine</span>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-bold"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
