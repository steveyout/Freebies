import { LinkItem } from '../types/fmhy';

export type UserVote = 'up' | 'down' | null;

export interface RatingsStorage {
  [itemId: string]: UserVote;
}

const STORAGE_KEY = 'freebies_user_votes';

export function getUserVotes(): RatingsStorage {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function saveUserVote(itemId: string, vote: UserVote): RatingsStorage {
  const current = getUserVotes();
  if (vote === null) {
    delete current[itemId];
  } else {
    current[itemId] = vote;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // ignore
  }
  return current;
}

// Generate a deterministic base score between 4.0 and 5.0 for any resource
export function getBaseRating(item: LinkItem): { score: number; votes: number } {
  let hash = 0;
  const str = item.id + item.title;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  let baseScore = 4.2 + (positiveHash % 6) / 10; // 4.2 to 4.7
  let baseVotes = 45 + (positiveHash % 180); // 45 to 225

  if (
    item.isStarred ||
    item.badge?.includes('⭐') ||
    item.badge?.includes('🔥') ||
    item.badge?.includes('Top') ||
    item.badge?.includes('Recommended') ||
    item.badge?.includes('Must Have')
  ) {
    baseScore = 4.7 + (positiveHash % 4) / 10; // 4.7 to 5.0
    baseVotes += 160;
  }

  if (item.isOpenSource) baseScore = Math.min(5.0, baseScore + 0.1);
  if (item.safetyRating === 'Safe') baseScore = Math.min(5.0, baseScore + 0.1);

  return {
    score: Math.round(baseScore * 10) / 10,
    votes: baseVotes,
  };
}

export function getEffectiveRating(
  item: LinkItem,
  userVote: UserVote = null
): {
  score: number;
  votes: number;
  isHighRated: boolean;
} {
  const { score: baseScore, votes: baseVotes } = getBaseRating(item);
  let score = baseScore;
  let votes = baseVotes;

  if (userVote === 'up') {
    votes += 1;
    score = Math.min(5.0, Math.round((baseScore + 0.1) * 10) / 10);
  } else if (userVote === 'down') {
    votes += 1;
    score = Math.max(1.0, Math.round((baseScore - 0.2) * 10) / 10);
  }

  return {
    score,
    votes,
    isHighRated: score >= 4.5 || item.isStarred === true,
  };
}
