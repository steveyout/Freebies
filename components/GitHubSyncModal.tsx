'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  GitPullRequest, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { Category, LinkItem } from '../types/fmhy';
import { useToast } from '../context/ToastContext';
import { GitHubSyncState, PollingIntervalOption } from '../hooks/useGitHubDataPoller';

export interface GitHubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  syncState?: GitHubSyncState;
  remotePrItems?: LinkItem[];
  isPollingEnabled?: boolean;
  onTogglePolling?: (enabled: boolean) => void;
  pollingInterval?: PollingIntervalOption;
  onChangeInterval?: (interval: PollingIntervalOption) => void;
  onTriggerSync?: () => void;
  pollIntervalMs?: number;
  onChangePollInterval?: (ms: number) => void;
  isSyncing?: boolean;
  onManualSync?: () => void;
  lastSyncTime?: Date | null;
  syncHistory?: Array<{ timestamp: Date; status: 'success' | 'no-change' | 'error'; message: string }>;
  onSimulatePrMerge: (newItem: LinkItem) => void;
}

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({
  isOpen,
  onClose,
  categories,
  syncState,
  remotePrItems = [],
  isPollingEnabled: propPollingEnabled,
  onTogglePolling,
  pollingInterval,
  onChangeInterval,
  onTriggerSync,
  pollIntervalMs,
  onChangePollInterval,
  isSyncing: propSyncing,
  onManualSync,
  lastSyncTime: propLastSyncTime,
  syncHistory = [],
  onSimulatePrMerge,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'status' | 'simulate' | 'history'>('status');

  const isPolling = propPollingEnabled ?? syncState?.isPollingEnabled ?? true;
  const isSync = propSyncing ?? syncState?.isSyncing ?? false;
  const lastSync = propLastSyncTime ?? syncState?.lastSyncTime ?? null;
  const intervalSeconds = pollingInterval ?? (pollIntervalMs ? Math.round(pollIntervalMs / 1000) : 60);

  // Simulator Form State
  const [simTitle, setSimTitle] = useState('');
  const [simUrl, setSimUrl] = useState('');
  const [simDesc, setSimDesc] = useState('');
  const [simCategory, setSimCategory] = useState(categories[0]?.id || 'streaming');
  const [simTags, setSimTags] = useState('Free, HD, Fast');

  // Countdown timer for next poll
  const [secondsUntilNextPoll, setSecondsUntilNextPoll] = useState(intervalSeconds);

  useEffect(() => {
    if (!isPolling || intervalSeconds <= 0) return;

    setSecondsUntilNextPoll(intervalSeconds);
    const timer = setInterval(() => {
      setSecondsUntilNextPoll((prev) => (prev > 1 ? prev - 1 : intervalSeconds));
    }, 1000);

    return () => clearInterval(timer);
  }, [intervalSeconds, isPolling, lastSync]);

  const handleToggle = () => {
    if (onTogglePolling) {
      onTogglePolling(!isPolling);
    }
  };

  const handleManualSync = () => {
    if (onTriggerSync) {
      onTriggerSync();
    } else if (onManualSync) {
      onManualSync();
    }
  };

  const handleIntervalChange = (sec: number) => {
    if (onChangeInterval) {
      onChangeInterval(sec as PollingIntervalOption);
    }
    if (onChangePollInterval) {
      onChangePollInterval(sec * 1000);
    }
  };

  const handleSimulatePr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simTitle.trim() || !simUrl.trim()) return;

    const selectedCatObj = categories.find((c) => c.id === simCategory) || categories[0];
    const firstSubcategory = selectedCatObj?.subcategories?.[0]?.name || 'Featured';

    const newItem: LinkItem = {
      id: `sim-pr-${Date.now()}`,
      title: simTitle.trim(),
      url: simUrl.trim().startsWith('http') ? simUrl.trim() : `https://${simUrl.trim()}`,
      description: simDesc.trim() || 'Simulated community contribution via GitHub Pull Request merge.',
      category: simCategory,
      subcategory: firstSubcategory,
      tags: simTags.split(',').map((t) => t.trim()).filter(Boolean),
      safetyRating: 'Safe',
      isOpenSource: true,
      badge: '✨ GitHub PR Merge',
      dateAdded: new Date().toISOString().split('T')[0],
      addedBy: 'github-bot',
      githubFile: selectedCatObj?.githubFile || 'data/adblocking.md',
    };

    onSimulatePrMerge(newItem);
    showToast(`Simulated PR merge: "${newItem.title}" merged on GitHub!`, 'success');

    // Reset form
    setSimTitle('');
    setSimUrl('');
    setSimDesc('');
    setActiveTab('status');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>GitHub Continuous Data Poller</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700">
                  Real-time Sync
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Automatic continuous integration with raw GitHub category files &amp; merged PRs.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 dark:border-zinc-800 px-6 bg-slate-50/50 dark:bg-zinc-950/30">
          <button
            onClick={() => setActiveTab('status')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'status'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Poller Status &amp; Controls
          </button>
          <button
            onClick={() => setActiveTab('simulate')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'simulate'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Simulate PR Merge
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'history'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Synced PR Resources ({remotePrItems.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'status' && (
            <div className="space-y-6">
              {/* Status Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    Engine State
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${isPolling ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {isPolling ? 'Active (Live)' : 'Paused'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    Next Polling Cycle
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                      {isPolling && intervalSeconds > 0 ? `in ${secondsUntilNextPoll}s` : 'Paused / Manual'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    Last Verified Sync
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="font-mono text-xs text-slate-900 dark:text-white">
                      {lastSync ? lastSync.toLocaleTimeString() : 'Just initialized'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Polling Interval Controls */}
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Automatic Polling Frequency
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      Background worker automatically fetches GitHub repo commits and syncs category markdown tables.
                    </p>
                  </div>
                  <button
                    onClick={handleToggle}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-colors ${
                      isPolling
                        ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                        : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900'
                    }`}
                  >
                    {isPolling ? 'Pause Poller' : 'Enable Poller'}
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  {[30, 60, 120, 300].map((interval) => (
                    <button
                      key={interval}
                      onClick={() => handleIntervalChange(interval)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-colors ${
                        intervalSeconds === interval
                          ? 'bg-emerald-600 text-white font-bold shadow-xs'
                          : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {interval}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual Trigger */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50">
                <div>
                  <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                    Force Immediate GitHub Sync
                  </h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    Query the live GitHub raw repository right now for new categories and resources.
                  </p>
                </div>
                <button
                  onClick={handleManualSync}
                  disabled={isSync}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSync ? 'animate-spin' : ''}`} />
                  <span>{isSync ? 'Syncing...' : 'Sync Now'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'simulate' && (
            <form onSubmit={handleSimulatePr} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900 text-xs text-indigo-700 dark:text-indigo-300 space-y-1">
                <strong>Simulate Pull Request Event:</strong>
                <p>
                  This triggers the exact same event as a merged PR on GitHub (`pull_request.closed` webhook), injecting a new resource live into the application cache.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Resource Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CineJoy Mirrors (HD)"
                  value={simTitle}
                  onChange={(e) => setSimTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://cinejoy.online"
                  value={simUrl}
                  onChange={(e) => setSimUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Category Destination
                </label>
                <select
                  value={simCategory}
                  onChange={(e) => setSimCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Fast, 1080p, auto-subtitles, multi-mirror backup..."
                  value={simDesc}
                  onChange={(e) => setSimDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98"
              >
                <GitPullRequest className="w-4 h-4" />
                <span>Trigger Merged PR Event</span>
              </button>
            </form>
          )}

          {activeTab === 'history' && (
            <div className="space-y-2">
              {remotePrItems.length === 0 && syncHistory.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  No poll logs recorded yet. Poller is awaiting first tick.
                </div>
              ) : (
                <>
                  {remotePrItems.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-slate-800 dark:text-zinc-200 font-semibold">{item.title}</span>
                        <span className="text-[10px] text-slate-400">({item.category})</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {item.dateAdded || 'Just now'}
                      </span>
                    </div>
                  ))}
                  {syncHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${item.status === 'success' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        <span className="text-slate-800 dark:text-zinc-200">{item.message}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
