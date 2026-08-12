import React, { useState } from 'react';
import { 
  RefreshCw, 
  GitPullRequest, 
  CheckCircle2, 
  Clock, 
  Settings, 
  X, 
  Sparkles, 
  Radio, 
  GitCommit, 
  Plus, 
  Activity,
  Zap,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GitHubSyncState, PollingIntervalOption } from '../hooks/useGitHubDataPoller';
import { LinkItem, Category } from '../types/fmhy';
import { useToast } from '../context/ToastContext';

interface GitHubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncState: GitHubSyncState;
  pollingInterval: PollingIntervalOption;
  isPollingEnabled: boolean;
  onTriggerSync: () => void;
  onTogglePolling: (enabled: boolean) => void;
  onChangeInterval: (interval: PollingIntervalOption) => void;
  onSimulatePrMerge: (item: LinkItem) => void;
  remotePrItems: LinkItem[];
  categories: Category[];
}

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({
  isOpen,
  onClose,
  syncState,
  pollingInterval,
  isPollingEnabled,
  onTriggerSync,
  onTogglePolling,
  onChangeInterval,
  onSimulatePrMerge,
  remotePrItems,
  categories,
}) => {
  const { showToast } = useToast();
  
  // State for PR Simulation form inside modal
  const [showSimulateForm, setShowSimulateForm] = useState(false);
  const [simTitle, setSimTitle] = useState('');
  const [simUrl, setSimUrl] = useState('');
  const [simDesc, setSimDesc] = useState('');
  const [simCategory, setSimCategory] = useState(categories[0]?.id || 'adblocking');
  const [simTags, setSimTags] = useState('PR Merge, New Resource');

  if (!isOpen) return null;

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simTitle.trim() || !simUrl.trim()) return;

    const selectedCatObj = categories.find((c) => c.id === simCategory) || categories[0];
    const firstSubcategory = selectedCatObj.subcategories[0]?.id || 'browsers-ext';

    const newItem: LinkItem = {
      id: `gh-pr-${Date.now()}`,
      title: simTitle.trim(),
      url: simUrl.trim().startsWith('http') ? simUrl.trim() : `https://${simUrl.trim()}`,
      description: simDesc.trim() || 'Merged via raw GitHub repository pull request.',
      category: simCategory,
      subcategory: firstSubcategory,
      tags: simTags.split(',').map((t) => t.trim()).filter(Boolean),
      safetyRating: 'Safe',
      isOpenSource: true,
      badge: '✨ GitHub PR Merge',
      dateAdded: new Date().toISOString().split('T')[0],
      addedBy: 'github-bot',
      githubFile: selectedCatObj.githubFile || 'src/data/categories/adblocking.md',
    };

    onSimulatePrMerge(newItem);
    showToast(`Simulated PR merge: "${newItem.title}" merged on GitHub!`, 'success');

    // Reset form
    setSimTitle('');
    setSimUrl('');
    setSimDesc('');
    setShowSimulateForm(false);
  };

  const getTimeAgo = (date: Date | null) => {
    if (!date) return 'Never';
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 5) return 'Just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden font-sans"
        >
          {/* Header Bar */}
          <div className="p-5 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between bg-slate-50 dark:bg-zinc-900/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                <RefreshCw className={`w-5 h-5 ${syncState.isSyncing ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-mono flex items-center gap-2">
                  <span>GitHub Raw Data Poller</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase ${
                    isPollingEnabled
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                      : 'bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                  }`}>
                    {isPollingEnabled ? 'Live Polling Active' : 'Manual Sync Only'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Automatically syncs merged GitHub PRs without reloading the page
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-200/60 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* Sync Controls & Status Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Status Card */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Last Polled
                  </span>
                  <span className="font-bold text-slate-800 dark:text-zinc-200">
                    {getTimeAgo(syncState.lastSyncTime)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <GitCommit className="w-3.5 h-3.5 text-emerald-500" />
                    Commit SHA
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    #{syncState.lastCommitSha}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <GitPullRequest className="w-3.5 h-3.5 text-indigo-500" />
                    PR Merges Synced
                  </span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {remotePrItems.length} items
                  </span>
                </div>
              </div>

              {/* Instant Manual Sync Action */}
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex flex-col justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 font-mono flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Manual Raw Sync
                  </h4>
                  <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 mt-1">
                    Force an immediate re-fetch of raw GitHub repository files right now.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onTriggerSync();
                    showToast('Re-fetching raw GitHub data...', 'info');
                  }}
                  disabled={syncState.isSyncing}
                  className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncState.isSyncing ? 'animate-spin' : ''}`} />
                  <span>{syncState.isSyncing ? 'Syncing GitHub Raw...' : 'Sync Raw Data Now'}</span>
                </button>
              </div>
            </div>

            {/* Polling Interval Configuration */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-zinc-100">
                    Polling Frequency Settings
                  </h4>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPollingEnabled}
                    onChange={(e) => {
                      onTogglePolling(e.target.checked);
                      showToast(
                        e.target.checked
                          ? 'Automatic GitHub background polling enabled'
                          : 'Automatic background polling paused',
                        'info'
                      );
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:after:border-zinc-600 peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {([
                  { label: '30 seconds', value: 30 },
                  { label: '1 minute', value: 60 },
                  { label: '2 minutes', value: 120 },
                  { label: '5 minutes', value: 300 },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onChangeInterval(opt.value as PollingIntervalOption);
                      showToast(`Polling interval updated to ${opt.label}`, 'info');
                    }}
                    disabled={!isPollingEnabled}
                    className={`py-2 px-2.5 rounded-xl text-xs font-mono font-medium border transition-all text-center ${
                      pollingInterval === opt.value && isPollingEnabled
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:border-emerald-400'
                    } disabled:opacity-40`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Simulation Tool for PR Merges */}
            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitPullRequest className="w-4 h-4 text-indigo-500" />
                  <h4 className="text-xs font-bold font-mono text-indigo-950 dark:text-indigo-200">
                    Test GitHub PR Merge Stream
                  </h4>
                </div>

                <button
                  onClick={() => setShowSimulateForm(!showSimulateForm)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showSimulateForm ? 'Cancel' : 'Simulate PR Merge'}</span>
                </button>
              </div>

              <p className="text-xs text-indigo-900/80 dark:text-indigo-300/80">
                Simulate a merged pull request on GitHub. The background poller will immediately catch the update and render the new resource live without refreshing.
              </p>

              {/* PR Simulation Form */}
              <AnimatePresence>
                {showSimulateForm && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleSimulateSubmit}
                    className="pt-3 border-t border-indigo-200 dark:border-indigo-800/60 space-y-2.5"
                  >
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-indigo-900 dark:text-indigo-300 mb-1">
                        Resource Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Librewolf Browser"
                        value={simTitle}
                        onChange={(e) => setSimTitle(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-indigo-300 dark:border-indigo-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-indigo-900 dark:text-indigo-300 mb-1">
                          Resource URL *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="https://librewolf.net"
                          value={simUrl}
                          onChange={(e) => setSimUrl(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-indigo-300 dark:border-indigo-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-indigo-900 dark:text-indigo-300 mb-1">
                          Category
                        </label>
                        <select
                          value={simCategory}
                          onChange={(e) => setSimCategory(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-indigo-300 dark:border-indigo-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-indigo-900 dark:text-indigo-300 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        placeholder="Custom privacy-focused Firefox fork with built-in uBlock..."
                        value={simDesc}
                        onChange={(e) => setSimDesc(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-indigo-300 dark:border-indigo-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Merge PR & Sync Live</span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* List of Recently Synced PR items */}
            {remotePrItems.length > 0 && (
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-800 dark:text-zinc-200 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Recently Merged GitHub Resources ({remotePrItems.length})</span>
                </h4>

                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {remotePrItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/80 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-zinc-100 truncate">
                            {item.title}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                            Merged
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
                          {item.description}
                        </p>
                      </div>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-300 hover:text-amber-500 shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
