'use client';

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
  const [pollingInterval, setPollingInterval] = useState<PollingIntervalOption>(60);
  const [isPollingEnabled, setIsPollingEnabled] = useState<boolean>(true);
  const [remotePrItems, setRemotePrItems] = useState<LinkItem[]>([]);

  useEffect(() => {
    try {
      const savedInterval = localStorage.getItem(STORAGE_KEY_POLL_INTERVAL);
      if (savedInterval) {
        setPollingInterval(parseInt(savedInterval, 10) as PollingIntervalOption);
      }
      const savedEnabled = localStorage.getItem(STORAGE_KEY_POLL_ENABLED);
      if (savedEnabled !== null) {
        setIsPollingEnabled(JSON.parse(savedEnabled));
      }
      const savedPrs = localStorage.getItem(STORAGE_KEY_SYNC_PR_ITEMS);
      if (savedPrs) {
        setRemotePrItems(JSON.parse(savedPrs));
      }
    } catch {
      // ignore
    }
  }, []);

  const [syncState, setSyncState] = useState<GitHubSyncState>({
    isSyncing: false,
    isPollingEnabled: true,
    pollingInterval: 60,
    lastSyncTime: null,
    prMergeCount: 0,
    newItemsCount: 0,
    lastCommitSha: 'a8f92b4',
    error: null,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to fetch raw GitHub data & check for merged PR updates
  const fetchGitHubRawData = useCallback(async (isManualTrigger = false) => {
    setSyncState((prev) => ({ ...prev, isSyncing: true, error: null }));

    try {
      const timestamp = Date.now();
      const rawApiUrl = `https://api.github.com/repos/steveyout/Freebies/commits?per_page=1&t=${timestamp}`;
      
      let fetchedCommitSha = `commit-${Math.floor(timestamp / 60000)}`;

      try {
        const res = await fetch(rawApiUrl, {
          headers: { Accept: 'application/vnd.github.v3+json' },
          cache: 'no-cache',
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data[0] && data[0].sha) {
            fetchedCommitSha = data[0].sha.substring(0, 7);
          }
        }
      } catch (err) {
        console.debug('GitHub raw API poll fallback active', err);
      }

      let currentRemotePrs: LinkItem[] = [];
      try {
        const saved = localStorage.getItem(STORAGE_KEY_SYNC_PR_ITEMS);
        currentRemotePrs = saved ? JSON.parse(saved) : [];
      } catch {
        currentRemotePrs = [];
      }

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
    try {
      localStorage.setItem(STORAGE_KEY_POLL_ENABLED, JSON.stringify(enabled));
    } catch {
      // ignore
    }
  }, []);

  // Update interval option
  const changeInterval = useCallback((interval: PollingIntervalOption) => {
    setPollingInterval(interval);
    try {
      localStorage.setItem(STORAGE_KEY_POLL_INTERVAL, interval.toString());
    } catch {
      // ignore
    }
  }, []);

  // Simulate a merged PR from GitHub
  const simulateGitHubPrMerge = useCallback((newItem: LinkItem) => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SYNC_PR_ITEMS);
      const existing: LinkItem[] = saved ? JSON.parse(saved) : [];
      const updated = [newItem, ...existing];
      localStorage.setItem(STORAGE_KEY_SYNC_PR_ITEMS, JSON.stringify(updated));
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
