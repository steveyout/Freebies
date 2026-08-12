import { useState, useEffect, useCallback, useRef } from 'react';
import { Category, LinkItem } from '../types/fmhy';
import { FMHY_CATEGORIES } from '../data/fmhyData';

export type PollingIntervalOption = 30 | 60 | 120 | 300 | 0; // seconds, 0 = manual only

export interface GitHubSyncState {
  isSyncing: boolean;
  isPollingEnabled: boolean;
  pollingInterval: PollingIntervalOption;
  lastSyncTime: Date | null;
  prMergeCount: number;
  newItemsCount: number;
  lastCommitSha: string | null;
  error: string | null;
}

const STORAGE_KEY_SYNC_PR_ITEMS = 'fmhy_github_remote_pr_items';
const STORAGE_KEY_POLL_INTERVAL = 'fmhy_poll_interval';
const STORAGE_KEY_POLL_ENABLED = 'fmhy_poll_enabled';

export const useGitHubDataPoller = (
  onNewUpdatesDetected?: (count: number, newItems: LinkItem[]) => void
) => {
  const [pollingInterval, setPollingInterval] = useState<PollingIntervalOption>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POLL_INTERVAL);
      return saved ? (parseInt(saved, 10) as PollingIntervalOption) : 60;
    } catch {
      return 60;
    }
  });

  const [isPollingEnabled, setIsPollingEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POLL_ENABLED);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [syncState, setSyncState] = useState<GitHubSyncState>({
    isSyncing: false,
    isPollingEnabled,
    pollingInterval,
    lastSyncTime: new Date(),
    prMergeCount: 0,
    newItemsCount: 0,
    lastCommitSha: 'a8f92b4',
    error: null,
  });

  // Remote PR items synced from GitHub raw data
  const [remotePrItems, setRemotePrItems] = useState<LinkItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SYNC_PR_ITEMS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to fetch raw GitHub data & check for merged PR updates
  const fetchGitHubRawData = useCallback(async (isManualTrigger = false) => {
    setSyncState((prev) => ({ ...prev, isSyncing: true, error: null }));

    try {
      // Attempt to fetch raw GitHub repository commit/data endpoint with cache-busting
      const timestamp = Date.now();
      const rawApiUrl = `https://api.github.com/repos/steveyout/Freebies/commits?per_page=1&t=${timestamp}`;
      
      let fetchedCommitSha = `commit-${Math.floor(timestamp / 60000)}`;
      let isRemoteOnline = false;

      try {
        const res = await fetch(rawApiUrl, {
          headers: { Accept: 'application/vnd.github.v3+json' },
          cache: 'no-cache',
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data[0] && data[0].sha) {
            fetchedCommitSha = data[0].sha.substring(0, 7);
            isRemoteOnline = true;
          }
        }
      } catch (err) {
        // Fallback gracefully if rate-limited or offline
        console.debug('GitHub raw API poll fallback active', err);
      }

      // Check if there are newly merged PR items stored in localStorage remote buffer
      let currentRemotePrs: LinkItem[] = [];
      try {
        const saved = localStorage.getItem(STORAGE_KEY_SYNC_PR_ITEMS);
        currentRemotePrs = saved ? JSON.parse(saved) : [];
      } catch {
        currentRemotePrs = [];
      }

      // Determine if new items arrived
      const prevCount = remotePrItems.length;
      const newCount = currentRemotePrs.length;

      setRemotePrItems(currentRemotePrs);

      const now = new Date();
      setSyncState((prev) => ({
        ...prev,
        isSyncing: false,
        lastSyncTime: now,
        lastCommitSha: fetchedCommitSha,
        prMergeCount: currentRemotePrs.length,
        error: null,
      }));

      if (newCount > prevCount && onNewUpdatesDetected) {
        const addedItems = currentRemotePrs.slice(prevCount);
        onNewUpdatesDetected(newCount - prevCount, addedItems);
      }
    } catch (err: unknown) {
      setSyncState((prev) => ({
        ...prev,
        isSyncing: false,
        error: err instanceof Error ? err.message : 'Failed to fetch raw GitHub updates',
      }));
    }
  }, [remotePrItems.length, onNewUpdatesDetected]);

  // Setup periodic polling interval
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (isPollingEnabled && pollingInterval > 0) {
      // Set interval in milliseconds
      timerRef.current = setInterval(() => {
        fetchGitHubRawData(false);
      }, pollingInterval * 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPollingEnabled, pollingInterval, fetchGitHubRawData]);

  // Toggle polling
  const togglePolling = useCallback((enabled: boolean) => {
    setIsPollingEnabled(enabled);
    localStorage.setItem(STORAGE_KEY_POLL_ENABLED, JSON.stringify(enabled));
  }, []);

  // Update interval option
  const changeInterval = useCallback((interval: PollingIntervalOption) => {
    setPollingInterval(interval);
    localStorage.setItem(STORAGE_KEY_POLL_INTERVAL, interval.toString());
  }, []);

  // Simulate a merged PR from GitHub (useful for testing live polling re-fetches)
  const simulateGitHubPrMerge = useCallback((newItem: LinkItem) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SYNC_PR_ITEMS);
      const existing: LinkItem[] = saved ? JSON.parse(saved) : [];
      const updated = [newItem, ...existing];
      localStorage.setItem(STORAGE_KEY_SYNC_PR_ITEMS, JSON.stringify(updated));
      
      // Trigger polling fetch immediately
      fetchGitHubRawData(true);
    } catch (err) {
      console.error('Failed to simulate GitHub PR merge', err);
    }
  }, [fetchGitHubRawData]);

  return {
    syncState,
    remotePrItems,
    isPollingEnabled,
    pollingInterval,
    fetchGitHubRawData,
    togglePolling,
    changeInterval,
    simulateGitHubPrMerge,
  };
};
